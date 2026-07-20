"""K1 mark: transparent outside; white inset plate; green outline + K1 on top."""
from __future__ import annotations

import os

from PIL import Image, ImageDraw

SRC = r"E:\Projects\kuberfinserve\public\kuberone-logo-source.png"
OUT = r"E:\Projects\kuberfinserve\public\kuberone-logo.png"
TARGETS = [
    OUT,
    r"E:\Projects\kuberapp\apps\admin\public\logo-k1.png",
    r"E:\Projects\kuberapp\apps\admin\public\favicon.png",
    r"E:\Projects\kuberapp\apps\mobile-dsa\assets\logo-k1.png",
    r"E:\Projects\kuberapp\apps\mobile-customer\assets\logo-k1.png",
    r"E:\Projects\kuberapp\packages\branding\logo-k1.png",
    r"E:\Projects\kuberapp\apps\mobile-dsa\assets\favicon.png",
    r"E:\Projects\kuberapp\apps\mobile-customer\assets\favicon.png",
]


def is_content(c: tuple[int, int, int, int]) -> bool:
    r, g, b, a = c
    if a < 200:
        return False
    return not (r >= 245 and g >= 245 and b >= 245)


def main() -> None:
    src = Image.open(SRC).convert("RGBA")
    w, h = src.size
    sp = src.load()

    xs: list[int] = []
    ys: list[int] = []
    for y in range(h):
        for x in range(w):
            if is_content(sp[x, y]):
                xs.append(x)
                ys.append(y)

    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    # Keep white clearly inside gapped/rounded corners of the green frame
    inset = max(52, int(0.085 * (max_x - min_x)))
    radius = max(28, inset - 8)
    print("bbox", min_x, min_y, max_x, max_y, "inset", inset, "radius", radius)

    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(out)
    draw.rounded_rectangle(
        [min_x + inset, min_y + inset, max_x - inset, max_y - inset],
        radius=radius,
        fill=(255, 255, 255, 255),
    )

    op = out.load()
    for y in range(h):
        for x in range(w):
            c = sp[x, y]
            if is_content(c):
                op[x, y] = c

    print("corner", out.getpixel((5, 5)))
    print("gap_tl", out.getpixel((min_x + 10, min_y + 10)))
    print("center", out.getpixel((w // 2, h // 2)))

    for t in TARGETS:
        os.makedirs(os.path.dirname(t), exist_ok=True)
        out.save(t, "PNG")
        print("saved", t)


if __name__ == "__main__":
    main()
