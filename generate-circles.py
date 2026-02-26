# pip3 install google-genai Pillow
# Generates 3 square photos for the event explainer section circles

import os, pathlib, io
from google import genai
from google.genai import types
from PIL import Image

API_KEY = os.environ.get("NANO_BANANA_KEY", "PASTE_YOUR_KEY_HERE")
client  = genai.Client(api_key=API_KEY)
MODEL   = "gemini-3-pro-image-preview"
OUT     = pathlib.Path(__file__).parent / "public" / "images" / "events"

REAL = """
Shot on Sony A7 IV, 85mm f/1.4. RAW, natural colour, slight film grain.
Candid — subject unaware of camera. No studio lighting. No posed expressions.
Real skin texture, natural shadows. Looks like a genuine documentary photograph.
Not AI generated. No artificial sharpening. Output: 600x600px square.
"""

def make(prompt, path):
    print(f"\n→ {path.name}")
    resp = client.models.generate_content(
        model=MODEL,
        contents=prompt.strip() + "\n\n" + REAL.strip(),
        config=types.GenerateContentConfig(response_modalities=["TEXT","IMAGE"]),
    )
    for part in resp.candidates[0].content.parts:
        if part.inline_data:
            img = Image.open(io.BytesIO(part.inline_data.data))
            img.save(path)
            print(f"   ✓ saved {img.size[0]}×{img.size[1]}")
            return
    print("   ✗ no image")

KIRTAN_CIRCLE = """
Close-up candid portrait of a woman in her late 20s singing kirtan with total joy.
Her mouth is open in song, eyes closed, one hand raised mid-clap. Warm amber light
from above. The background is a blurred crowd of other singers. Her face fills
most of the square frame — genuine, radiant, completely absorbed in the chanting.
600x600px square crop, tight on the face and raised hand.
"""

MEDITATION_CIRCLE = """
Close-up candid portrait of a man in his 40s in deep guided meditation. Eyes closed,
face completely relaxed and still — a faint expression of inner peace. He is seated
cross-legged in a circle of other meditators, softly blurred behind him. Warm soft
light from a window to his left lights his face beautifully. The image communicates
absolute stillness. 600x600px square, face centred.
"""

SILENCE_CIRCLE = """
Candid photograph of 4-5 people seated in a circle in shared silence after a
meditation. Eyes closed, heads slightly bowed, hands in their laps. The stillness
between them is almost visible. Warm candlelight from the centre of the circle
lights each face softly. The background is dark and blurred. The mood is sacred
and deeply peaceful. 600x600px square, wide enough to show the whole circle.
"""

if __name__ == "__main__":
    print("Generating 3 circle images for event explainer section")
    print("=" * 50)
    make(KIRTAN_CIRCLE,    OUT / "circle-kirtan.jpg")
    make(MEDITATION_CIRCLE, OUT / "circle-meditation.jpg")
    make(SILENCE_CIRCLE,   OUT / "circle-silence.jpg")
    print("\n✓ Done!")
