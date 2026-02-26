# pip3 install google-genai Pillow
#
# Usage:
#   python3 generate-images.py
#
# Set your API key in .env.local as NANO_BANANA_KEY=xxx
# OR paste it directly into API_KEY below.

import os
import pathlib
from google import genai
from google.genai import types
from PIL import Image
import io

# ── API Key ──────────────────────────────────────────────────────────────────
API_KEY = os.environ.get("NANO_BANANA_KEY", "PASTE_YOUR_KEY_HERE")

# ── Output paths (relative to this script) ───────────────────────────────────
BASE = pathlib.Path(__file__).parent / "public" / "images"
INTRO  = BASE / "intro"
COURSE = BASE / "course"

client = genai.Client(api_key=API_KEY)
MODEL  = "gemini-3-pro-image-preview"

def generate(prompt: str, out_path: pathlib.Path):
    print(f"\n→ Generating: {out_path.name}")
    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"]
        ),
    )
    for part in response.candidates[0].content.parts:
        if part.inline_data is not None:
            img = Image.open(io.BytesIO(part.inline_data.data))
            img.save(out_path)
            print(f"   ✓ Saved → {out_path}")
            return
    print(f"   ✗ No image returned for {out_path.name}")


# ─────────────────────────────────────────────────────────────────────────────
# IMAGE 1 — breathing-session.jpg
# Used: Homepage hero, Intro page hero, Program overview strip
# Scene: serene group breathwork session, indoor, warm light
# ─────────────────────────────────────────────────────────────────────────────
BREATHING_SESSION = """
Photorealistic photograph of a serene indoor breathwork and meditation session.

A diverse group of 6-8 adults — men and women, ages 25-55, mixed ethnicities —
sit cross-legged in a circle on yoga mats in a bright airy studio. They all have
their eyes gently closed, hands resting on their knees, expressions of deep calm
and inner peace. Some have a faint smile. The atmosphere is warm, safe, and
transformative.

Scene: A clean, minimalist yoga studio with large windows letting in soft golden
afternoon light. Sheer white curtains diffuse the sunlight into a warm glow.
Polished wooden floor. A few plants in the corners. The studio feels like a
sanctuary — calm, sacred, inviting.

Camera: Canon EOS R5, 35mm f/2.0. Wide enough to capture the whole group but
intimate. Slight warm tone, shallow depth of field on faces, background softly
blurred. Shot from slightly above eye level looking across the circle.

Lighting: Warm golden afternoon light flooding from the left through large windows.
Soft and diffused — not harsh. Skin tones look healthy and warm. The whole scene
glows with a golden amber quality.

Colour grade: Warm, golden, soft. Slightly lifted shadows. Reminiscent of premium
wellness brand photography.

Output: 1920x1080 landscape. Photorealistic. Magazine editorial quality.
Indistinguishable from a real photograph. Not AI generated. No artificial artifacts.
"""

# ─────────────────────────────────────────────────────────────────────────────
# IMAGE 2 — meditation-group.jpg
# Used: Offerings card (Free Intro Talk), session intro, credibility section
# Scene: group of people meditating together, diverse, peaceful, communal
# ─────────────────────────────────────────────────────────────────────────────
MEDITATION_GROUP = """
Photorealistic photograph of a group meditation session in a beautiful bright space.

10-12 diverse adults — men and women, ages 20-60, various ethnicities — sit in
rows on meditation cushions with eyes closed. They are dressed in comfortable,
casual-smart clothing (neutral tones — white, cream, soft grey, light blue).
Their posture is upright yet relaxed. Expressions are peaceful and inward.
A sense of collective stillness and shared experience fills the frame.

Scene: A large, light-filled community hall or wellness studio. High ceilings,
whitewashed walls, wooden beams overhead. Natural light floods in from tall windows
on one side. The space feels warm, welcoming, and slightly spiritual without being
religious. A few candles at the front. Simple, beautiful.

Camera: Canon EOS R5, 50mm f/2.8. Shot from the back-left of the room, capturing
the group from behind and slightly to the side so you see faces in the front row.
Depth pulls the viewer into the scene.

Lighting: Soft natural daylight from the right side windows, warm and even.
The faces in the front row catch gentle light. Background row softly blurred.

Colour grade: Clean, warm whites. Soft amber tones. Premium wellness photography.

Output: 1920x1080 landscape. Photorealistic. Indistinguishable from a real
professional photograph. Not AI generated. No artificial artifacts.
"""

# ─────────────────────────────────────────────────────────────────────────────
# IMAGE 3 — teacher-guiding.jpg
# Used: Offerings card (Community), about section, local guides
# Scene: warm, approachable instructor guiding a small group
# ─────────────────────────────────────────────────────────────────────────────
TEACHER_GUIDING = """
Photorealistic photograph of a warm, experienced meditation teacher guiding
a small group of students.

The teacher — a woman in her late 40s, South Asian appearance, warm smile,
wearing a simple white or cream kurta — kneels beside one student, gently
placing a hand on their shoulder with an expression of calm encouragement.
3-4 students sit on mats around her in a bright studio. They all have eyes
closed or are looking at the teacher with trust and openness.

Scene: A beautiful, sunlit yoga studio. Wooden floors, large windows overlooking
a green garden. Plants. Simple and serene. The light is golden and late afternoon.
The room feels intimate, caring, and transformative.

Camera: Canon EOS R5, 85mm f/1.8. Subject (teacher) placed in the LEFT THIRD of
the frame. Students visible behind and to the right, slightly blurred with bokeh.
Shot from slightly above floor level — as if the photographer is also sitting on
a mat nearby.

Lighting: Warm golden window light from the right, casting a gentle glow on the
teacher's face and the student she's guiding. The scene feels real, documentary.

Colour grade: Warm, golden, slightly lifted. Premium yoga and wellness photography.

Output: 1920x1080 landscape. Photorealistic. Documentary-style warmth.
Indistinguishable from a real photograph. Not AI generated. No artificial artifacts.
"""

# ─────────────────────────────────────────────────────────────────────────────
# IMAGE 4 — break-free.webp (used for both intro/ and course/)
# Used: Home footer CTA, course hero
# Scene: liberating, emotional, breakthrough moment — person arms open, free
# ─────────────────────────────────────────────────────────────────────────────
BREAK_FREE = """
Photorealistic photograph of a woman experiencing a profound moment of inner freedom
and breakthrough during a meditation or breathwork session.

A woman, early 30s, mixed South Asian and European appearance, wearing a flowing
cream linen top and loose trousers. She sits on a rock or low hill in an open
natural landscape — the English countryside — with her arms slightly raised and
open to the sides, face tilted gently upward toward the sky. Eyes closed. Expression
of complete peace, release, and deep joy. Not performative — deeply authentic.

Scene: Open rolling Devon countryside. Green hills stretching to the horizon.
Late afternoon golden hour light. Soft clouds in a blue sky catching warm light.
Wildflowers in the foreground slightly blurred. The whole landscape breathes
with her.

Camera: Canon EOS R5, 85mm f/1.8. Subject placed in the CENTRE of the frame but
slightly left. The landscape fills the frame behind her. Shot from slightly below
her eyeline so she appears elevated and free.

Lighting: Golden hour — warm amber light from the left catching her face and arms.
Hair and edges lit with a warm backlight glow. The landscape glows gold.

Colour grade: Warm, golden, saturated but natural. The kind of image that makes
you feel free just looking at it. Cinematic quality.

Output: 1920x1080 landscape. Photorealistic. Cinematic editorial quality.
Indistinguishable from a real photograph. Not AI generated. No artificial artifacts.
"""

# ─────────────────────────────────────────────────────────────────────────────
# IMAGE 5 — sudarshan-kriya.webp
# Used: Course offerings card, numbers section background, course footer CTA
# Scene: person deep in Sudarshan Kriya breathing practice, eyes closed, serene
# ─────────────────────────────────────────────────────────────────────────────
SUDARSHAN_KRIYA = """
Photorealistic close-up photograph of a man deeply absorbed in a rhythmic breathing
meditation practice (Sudarshan Kriya).

The man — early 40s, South Asian or Mediterranean appearance, wearing a simple
white cotton t-shirt — sits upright in a cross-legged meditation posture. Eyes
closed. Chest slightly lifted with a deep inhale. Expression of deep inner focus
and subtle bliss — a faint smile, eyebrows slightly raised, as if experiencing
something profound internally. His hands rest on his knees in a mudra.

Scene: Outdoors in a peaceful garden setting — lush greenery behind him,
dappled morning light filtering through leaves. The background is beautifully
blurred into soft green and golden bokeh. Feels natural, alive, and sacred.

Camera: Canon EOS R5, 85mm f/1.4. Shot from slightly to the right, three-quarter
portrait framing — face and torso visible. Heavy bokeh on the background.
The man occupies the LEFT CENTRE of the frame.

Lighting: Soft morning diffused light, slightly warm. Gentle rim light on his
left shoulder from sunlight behind. Skin tones look healthy and glowing.

Colour grade: Clean, slightly warm, natural greens. Soft and luminous.
Premium wellness photography.

Output: 1920x1080 landscape. Photorealistic. Magazine wellness quality.
Indistinguishable from a real photograph. Not AI generated. No artificial artifacts.
"""

# ─────────────────────────────────────────────────────────────────────────────
# RUN ALL
# ─────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("NanoBanana Pro — Art of Living Image Generator")
    print("=" * 50)

    generate(BREATHING_SESSION, INTRO  / "breathing-session.jpg")
    generate(MEDITATION_GROUP,  INTRO  / "meditation-group.jpg")
    generate(TEACHER_GUIDING,   INTRO  / "teacher-guiding.jpg")
    generate(BREAK_FREE,        INTRO  / "break-free.webp")
    generate(BREAK_FREE,        COURSE / "break-free.webp")   # same image, two locations
    generate(SUDARSHAN_KRIYA,   INTRO  / "sudarshan-kriya.webp")
    generate(SUDARSHAN_KRIYA,   COURSE / "sudarshan-kriya.webp")  # same image, two locations

    print("\n✓ All done! Images saved to public/images/")
    print("  Refresh your dev server to see the new images.")
