# pip3 install google-genai Pillow

import os
import pathlib
from google import genai
from google.genai import types
from PIL import Image
import io

API_KEY = os.environ.get("NANO_BANANA_KEY", "PASTE_YOUR_KEY_HERE")

BASE = pathlib.Path(__file__).parent / "public" / "images" / "events"

client = genai.Client(api_key=API_KEY)
MODEL  = "gemini-3-pro-image-preview"

SATSANG_HERO = """
Photorealistic photograph of a joyful kirtan and satsang gathering —
people singing devotional music together, clapping, with hands raised and eyes closed
in pure communal joy. This is NOT yoga. NO yoga poses. NO stretching.
People are SEATED and SINGING and CLAPPING.

Scene: An intimate indoor evening event — 20 to 30 adults seated in rows or a
semicircle, all singing together. Most have their eyes closed or raised to the
ceiling. Many are clapping. Some have hands pressed together in prayer. A few
have arms raised naturally. The energy is warm, alive, deeply devotional and joyful.
People are dressed casually — jeans, kurtas, soft tops, scarves.

Foreground right: A woman in her late 20s — visible face, radiant joyful expression,
eyes closed, mouth open in song, one hand raised mid-clap. She is the emotional
anchor of the image and sits in the RIGHT HALF of the frame.
Behind her, more people singing and clapping, all in various states of joyful abandon.
The left third of the frame shows the edge of the crowd — slightly darker, naturally
leaving space for text overlay.

Venue: A warm community hall or yoga centre. Low warm amber and golden lighting —
candles and warm spotlights. Fairy lights or string lights visible in the background.
The scene glows with warmth. Wooden floors. Cushions and low seating. Simple and
beautiful. This could be Devon, England — intimate and local.

Camera: Canon EOS R5, 85mm f/1.4. Shot from eye level from the front-left of the room.
The woman is sharp in the right two-thirds. The left side is darker. Heavy bokeh
on the background crowd.

Lighting: Warm amber and golden stage lighting from above. Candlelight warmth.
Faces lit warmly from the front. Glowing, alive, intimate.

Colour grade: Rich warm amber and gold. Deep warm shadows. Filmic. The kind of image
that makes you feel the energy of the room just by looking at it.
Similar to a concert photographer capturing a spiritual music event.

Output: 1920x800 wide cinematic banner. Photorealistic. Concert photography quality.
Indistinguishable from a real photograph. Not AI generated. No artificial artifacts.
No yoga. No stretching. Only seated singing and clapping.
"""

def generate(prompt, out_path):
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
    print(f"   ✗ No image returned")

if __name__ == "__main__":
    print("NanoBanana Pro — Satsang Hero Image (v2)")
    print("=" * 40)
    generate(SATSANG_HERO, BASE / "satsang-hero.jpg")
    print("\n✓ Done! Check public/images/events/satsang-hero.jpg")
