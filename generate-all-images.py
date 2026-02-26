# pip3 install google-genai Pillow
#
# Generates a unique, photorealistic image for every section of the site.
# Run from the project root:
#   NANO_BANANA_KEY=$(grep NANO_BANANA_KEY .env.local | cut -d= -f2) python3 generate-all-images.py

import os, pathlib, io, sys
from google import genai
from google.genai import types
from PIL import Image

API_KEY = os.environ.get("NANO_BANANA_KEY", "PASTE_YOUR_KEY_HERE")
client  = genai.Client(api_key=API_KEY)
MODEL   = "gemini-3-pro-image-preview"

ROOT   = pathlib.Path(__file__).parent / "public" / "images"
INTRO  = ROOT / "intro"
COURSE = ROOT / "course"
EVENTS = ROOT / "events"
HOME   = ROOT / "home"
HOME.mkdir(exist_ok=True)

# ── Realism boilerplate appended to every prompt ──────────────────────────────
REAL = """
Shot on a Sony A7 IV, 35mm or 85mm prime lens. RAW file, natural colour grading,
slight film grain visible at 100%. Candid — subjects are unaware of the camera
or fully absorbed in the moment. No studio lighting, no posed expressions.
Slight natural imperfections: minor chromatic aberration at edges, natural skin
texture, occasional motion blur on moving hands or hair. Looks like a genuine
photograph taken by a documentary or editorial photographer, not a stock photo
or AI image. No artificial sharpening, no plastic skin, no impossible symmetry.
"""

def make(prompt: str, out: pathlib.Path):
    full = prompt.strip() + "\n\n" + REAL.strip()
    print(f"\n→  {out.relative_to(ROOT.parent.parent)}")
    try:
        resp = client.models.generate_content(
            model=MODEL,
            contents=full,
            config=types.GenerateContentConfig(response_modalities=["TEXT","IMAGE"]),
        )
        for part in resp.candidates[0].content.parts:
            if part.inline_data:
                img = Image.open(io.BytesIO(part.inline_data.data))
                img.save(out)
                print(f"   ✓  saved  ({img.size[0]}×{img.size[1]})")
                return
        print("   ✗  no image in response")
    except Exception as e:
        print(f"   ✗  error: {e}")

# ═══════════════════════════════════════════════════════════════════════════════
# EVENTS
# ═══════════════════════════════════════════════════════════════════════════════

KIRTAN_EVENING = """
Candid documentary photograph of a live kirtan evening inside a warm community hall
in Devon, England.

The hall is packed with 30–40 people of mixed ages and ethnicities, all seated on
the floor on cushions or low chairs arranged in a large circle. The moment captured:
the chanting has reached a joyful crescendo — many people have their eyes closed and
arms gently raised, swaying. Some clap softly. A woman in the foreground, early 30s,
dark hair loosely tied, wearing a rust-orange top, has her face tilted up with a
radiant, unguarded smile — she is completely absorbed. Next to her a man in his 40s
claps with eyes shut. Behind them, row after row of faces all lost in the music.

In the far front of the circle, partially visible, someone plays a harmonium.
The hall has exposed wooden beams. Strings of warm Edison bulbs hang overhead.
Candles flicker in small clusters on the floor. The walls are simple brick or
whitewash. A few potted plants.

Shot from the back-left of the circle at a low angle, 35mm f/1.8. The foreground
woman is sharp; the crowd behind falls into warm bokeh. The left quarter of the
frame is darker — naturally clear for text overlay.

Lighting: practical only — warm Edison bulbs, candlelight. Amber and gold throughout.
No flash. Natural shadows. Slightly underexposed on the edges, correctly exposed
on faces.

Output: 1920×800px wide cinematic banner.
"""

# ═══════════════════════════════════════════════════════════════════════════════
# HOME
# ═══════════════════════════════════════════════════════════════════════════════

HOME_HERO = """
Wide documentary photograph taken at golden hour on the Devon coast or rolling
green hills of Dartmoor.

A woman in her mid-30s, mixed ethnicity, wearing a loose cream linen shirt and
dark trousers, sits cross-legged on a flat rock or short grass. Eyes gently closed,
hands resting on her knees, face slightly lifted — utterly at peace. She is placed
LEFT of centre, following rule of thirds.

The landscape behind her is breathtaking: golden hills rolling to the horizon,
a silver sliver of sea or estuary visible in the distance, soft clouds catching the
last warm light. Wildflowers and long grass in the immediate foreground, blurred.

The overall colour palette: warm amber and soft gold in the sky, cool green in the
land, the woman lit from the left by last sun. The image has the quality of a
National Geographic editorial — it makes you want to be there.

Shot at 35mm f/2.0. Slight lens flare from the low sun. Natural film grain.

Output: 1920×1080px landscape.
"""

HOME_ABOUT = """
Candid photograph of a small Art of Living community gathering in a Devon village
hall after a meditation session.

8–10 people standing and sitting in loose groups, chatting and laughing. Some hold
mugs of tea. Mixed ages — late 20s to 60s. The atmosphere is warm, post-session
relaxed joy. People look genuinely connected. One woman touches another's arm
laughing. An older man listens intently to a younger person.

The hall is bright and simple: wooden floor, white walls, stacked chairs in the
background. Afternoon natural light from large sash windows on the right casting
long warm rectangles on the floor.

Shot from across the room at 35mm f/2.8. Journalistic, unposed. Some subjects
slightly out of focus. Feels completely real.

Output: 1920×1080px landscape.
"""

HOME_FOOTER = """
Candid editorial photograph of a young woman standing in an open Devon field just
after sunrise, arms loosely open at her sides, face tilted to the sky.

She is not posing — this is a real, unguarded moment of relief and freedom. Early
30s, South Asian heritage, wearing a soft cream jumper and jeans. Hair slightly
tousled by the breeze.

The field stretches behind her into morning mist. Soft pink and gold light on the
horizon. Dew on the grass. Birch or oak trees at the treeline in the far background.

Shot from behind and to the side at 85mm f/1.8 — we see her three-quarter profile.
The sky is the real star of this image. Filmic, slightly underexposed with lifted
shadows for that cinematic editorial feel.

Output: 1920×900px landscape.
"""

# ═══════════════════════════════════════════════════════════════════════════════
# INTRO PAGE
# ═══════════════════════════════════════════════════════════════════════════════

INTRO_HERO = """
Close-up documentary photograph of a man in his late 30s doing Sudarshan Kriya
breathwork in a quiet sunlit room.

He sits upright on a thin meditation cushion, eyes closed, mouth slightly open on
an exhale, chest visibly expanded. Expression of deep inward absorption — not
performed peace, but genuine. He wears a plain navy blue t-shirt.

The room: a yoga studio or spare bedroom converted to a practice space. Morning
light floods in from a large window to his left. A plant in the background, slightly
out of focus. Wooden floor.

Shot tight at 85mm f/1.4 — face and upper torso fill the frame, background completely
blurred to warm cream and green bokeh. The light on his face is beautiful, natural,
slightly warm.

Output: 1920×900px wide.
"""

INTRO_BENEFIT_1 = """
Candid portrait of a woman in her early 40s sitting at a kitchen table, hands
wrapped around a mug of tea, eyes closed with a visible expression of relief and
calm. She has just meditated — there is a quality of 'after' about her.

The kitchen is bright and lived-in: morning light, a small plant on the windowsill,
dishes drying. She wears a soft grey cardigan. Slight shadows under her eyes suggest
she is someone who has been stressed but is finding her way back.

The photograph has the warmth and intimacy of a documentary portrait — not a stock
photo, not staged. Shot at 50mm f/1.8, slightly shallow DOF.

Output: 800×800px square.
"""

INTRO_BENEFIT_2 = """
Candid environmental portrait: a man in his 30s walking briskly and confidently
along a rain-slicked city pavement, shoulders relaxed, slight smile, earphones in,
looking ahead. He looks genuinely energised and present — not stressed, not rushing.

Shot from across the street with a 85mm lens through slight rain. Natural city
light — overcast but bright. Slight motion blur on passing pedestrians behind him.
He is sharp. Feels like a genuine street photography capture.

Output: 800×800px square.
"""

INTRO_BENEFIT_3 = """
Intimate bedtime photograph of a woman in her 50s — she has just lain down in bed,
white pillows, crisp linen. Her expression is one of genuine deep relaxation —
eyes just closing, face soft, no tension. A small lamp on the bedside table gives
warm low light. Lavender or a plant on the nightstand.

Shot at 50mm f/1.4 from beside the bed, low angle. Warm amber light, deep shadows.
The image communicates deep, earned rest.

Output: 800×800px square.
"""

INTRO_BENEFIT_4 = """
Candid close-up of a young woman in her late 20s sitting cross-legged on a meditation
cushion in a bright living room, eyes closed, slight peaceful smile, hands in mudra.

Shot tight at 85mm f/1.2 — her face fills most of the frame, the room behind her
is completely dissolved into soft warm bokeh. The light is from a window to her
right — one side of her face lit, the other in gentle shadow. Beautiful, real,
unposed.

Output: 800×800px square.
"""

INTRO_SESSION = """
Wide candid photograph of an Art of Living intro talk in progress — 15–20 people
seated in a semicircle in a bright community room. A woman facilitator, South Asian,
late 40s, stands at the front gesturing gently while speaking. The participants look
engaged and open — some leaning forward, nodding.

The room is warm and simple: natural light, chairs arranged informally, a whiteboard
in the background. Feels like a real community event, not a corporate training.

Shot from the back corner at 35mm f/2.8. Journalistic. Some motion. Real.

Output: 1920×900px wide.
"""

INTRO_CREDIBILITY = """
Editorial photograph inside a bright, airy university library or research building.
A researcher — South Asian woman, mid-30s, wearing a white lab coat open over a
colourful blouse — sits at a desk surrounded by journals and a laptop, looking
directly at something on screen with focused intensity.

Bookshelves or filing cabinets visible behind her, slightly out of focus.
Natural light from tall windows to the left. Feels like the science behind
breathwork is real and ongoing.

Shot at 50mm f/2.0. Clean, bright, credible.

Output: 1920×900px wide.
"""

INTRO_FOOTER = """
Candid photograph of a group of five people of mixed ages and backgrounds emerging
from a session into bright afternoon sunlight — they are laughing and relaxed,
some squinting happily into the sun. The energy is unmistakably 'just had a
transformative experience'.

Shot from the doorway at 35mm f/2.0, slightly backlit, so the subjects are silhouetted
and rim-lit by golden afternoon sun. The background is a Devon street or garden,
blurred into warm gold. Feels like the end of something good.

Output: 1920×900px wide.
"""

# ═══════════════════════════════════════════════════════════════════════════════
# COURSE PAGE
# ═══════════════════════════════════════════════════════════════════════════════

COURSE_HERO = """
Wide dramatic landscape photograph: a lone figure sits in meditation on a hilltop
on Dartmoor or the Devon coast at golden hour. The figure is small against the vast
sky — communicating scale, freedom, possibility.

The person faces away from camera, cross-legged, silhouetted against a sky of deep
orange, gold and pale blue. Long grass around them bends in the wind. The horizon
is wide and open.

Shot at 24mm f/8 to keep everything sharp. The scale of the landscape dwarfs the
figure — in the best way. Cinematic. Real.

Output: 1920×900px wide.
"""

COURSE_TEACHER = """
Candid photograph of an experienced yoga and meditation teacher — South Asian woman,
late 40s, warm eyes, wearing a simple white kurta — kneeling beside a student and
gently correcting their sitting posture. Her hand rests lightly on the student's
shoulder; her expression is entirely focused on that one person.

The student: a woman in her 30s sitting cross-legged on a mat, receptive and still.
Two or three other students visible blurred in the background, also practising.

The studio: afternoon light, wooden floor, plants. Real, warm, intimate.

Shot at 85mm f/1.8 from the side. The teacher is the sharp subject.

Output: 1920×900px wide.
"""

COURSE_GROUP = """
Wide candid photograph of a group breathwork session in progress in a spacious
bright studio. 12 people lie on their backs on yoga mats arranged in rows, all in
active Sudarshan Kriya breathwork — visible chest movement, some with fists gently
clenched, fully absorbed. A teacher walks slowly between the rows, observing.

The room: polished wooden floor, large windows, morning light. Quiet and focused.

Shot from the corner of the room at 24mm f/4, from a low angle. Everything visible
but respectful — the privacy and depth of the practice conveyed.

Output: 1920×900px wide.
"""

COURSE_FOUNDER = """
Wide-angle candid photograph taken at a large Art of Living celebration or
satsang event — hundreds of people gathered in a beautiful outdoor setting or large
hall, all seated, a sense of collective joy and devotion in the air.

Shot from the back of the crowd looking toward the front — the scale of community
is the point. Warm golden lighting. Colourful clothing. Flowers.
Feels real — like a photograph from a news report or documentary.

Shot at 24mm f/5.6. Slightly warm colour grade.

Output: 1920×900px wide.
"""

COURSE_NUMBERS = """
Abstract meditative photograph: extreme close-up of a person's hands resting in
a mudra (thumb and forefinger touching) against the backdrop of their lap and a
wooden floor. Soft, beautiful light from the side. The skin texture is real and
human. A thin mala bracelet on one wrist.

Shot at 100mm macro f/2.8. Shallow DOF — only the hands sharp, everything else
soft warm bokeh. The image communicates stillness, practice, depth.

Output: 1920×900px wide.
"""

COURSE_FOOTER = """
Candid photograph taken at the end of a 3-day Art of Living Part 1 course —
participants standing in a loose group outside the venue (a village hall or retreat
centre in Devon), laughing, hugging, exchanging numbers. The body language says
transformation: open postures, genuine smiles, real connection.

The building behind them is simple English brick or stone. Late afternoon light.
Some people have their eyes red from crying happy tears. Real, unguarded.

Shot at 35mm f/2.0, slightly wide. Documentary.

Output: 1920×900px wide.
"""

COURSE_ABOUT = """
Candid wide photograph of a large outdoor Art of Living festival or gathering in
India or a European setting — thousands of people in white clothing spread across
a vast green field or hillside, sitting in meditation together at dawn. The scale
is humbling. Mist on the horizon. Soft pink morning light.

Shot with a wide lens from slightly elevated position. Feels like a real news
photograph of a genuine spiritual movement with global reach.

Output: 1920×900px wide.
"""

# ═══════════════════════════════════════════════════════════════════════════════
# GENERATE ALL
# ═══════════════════════════════════════════════════════════════════════════════

images = [
    # Events
    (KIRTAN_EVENING,    EVENTS / "kirtan-evening.jpg"),
    # Home
    (HOME_HERO,         HOME   / "hero-bg.jpg"),
    (HOME_ABOUT,        HOME   / "about-community.jpg"),
    (HOME_FOOTER,       HOME   / "footer-freedom.jpg"),
    # Intro
    (INTRO_HERO,        INTRO  / "hero-breathwork.jpg"),
    (INTRO_BENEFIT_1,   INTRO  / "benefit-calm.jpg"),
    (INTRO_BENEFIT_2,   INTRO  / "benefit-energy.jpg"),
    (INTRO_BENEFIT_3,   INTRO  / "benefit-sleep.jpg"),
    (INTRO_BENEFIT_4,   INTRO  / "benefit-focus.jpg"),
    (INTRO_SESSION,     INTRO  / "session-community.jpg"),
    (INTRO_CREDIBILITY, INTRO  / "credibility-research.jpg"),
    (INTRO_FOOTER,      INTRO  / "footer-group.jpg"),
    # Course
    (COURSE_HERO,       COURSE / "hero-landscape.jpg"),
    (COURSE_TEACHER,    COURSE / "teacher-class.jpg"),
    (COURSE_GROUP,      COURSE / "group-breathwork.jpg"),
    (COURSE_FOUNDER,    COURSE / "founder-crowd.jpg"),
    (COURSE_NUMBERS,    COURSE / "numbers-hands.jpg"),
    (COURSE_FOOTER,     COURSE / "footer-graduates.jpg"),
    (COURSE_ABOUT,      COURSE / "about-global.jpg"),
]

if __name__ == "__main__":
    # Allow running a single image by passing the filename as arg
    # e.g. python3 generate-all-images.py kirtan-evening.jpg
    target = sys.argv[1] if len(sys.argv) > 1 else None

    print("NanoBanana Pro — Full Site Image Generation")
    print(f"Generating {len(images)} unique images\n" + "═" * 50)

    for prompt, path in images:
        if target and target not in str(path):
            continue
        make(prompt, path)

    print("\n✓ All done!")
