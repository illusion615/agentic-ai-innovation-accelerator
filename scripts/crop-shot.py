#!/usr/bin/env python3
"""Trim the blank band Playwright leaves on captures from this browser.

The embedded browser renders at devicePixelRatio 1.8 while the screenshot is
written at 2x, so every capture carries ~10% dead rows at the bottom. Cropping
to the last painted row keeps the deck's screenshots flush instead of sitting on
a white shelf. Usage: crop-shot.py <file.png> [...]
"""
import struct
import sys
import zlib


def read_png(path):
    data = open(path, 'rb').read()
    if data[:8] != b'\x89PNG\r\n\x1a\n':
        raise SystemExit(f'{path}: not a PNG')
    pos, idat, width, height, bpp = 8, bytearray(), 0, 0, 3
    while pos < len(data):
        length = struct.unpack('>I', data[pos:pos + 4])[0]
        kind = data[pos + 4:pos + 8]
        body = data[pos + 8:pos + 8 + length]
        if kind == b'IHDR':
            width, height, depth, colour = struct.unpack('>IIBB', body[:10])
            if depth != 8:
                raise SystemExit(f'{path}: only 8-bit supported')
            bpp = {0: 1, 2: 3, 4: 2, 6: 4}[colour]
        elif kind == b'IDAT':
            idat += body
        pos += 12 + length
    raw = zlib.decompress(bytes(idat))
    stride = width * bpp
    rows, prev = [], bytearray(stride)
    i = 0
    for _ in range(height):
        f = raw[i]
        i += 1
        line = bytearray(raw[i:i + stride])
        i += stride
        if f == 1:
            for x in range(bpp, stride):
                line[x] = (line[x] + line[x - bpp]) & 255
        elif f == 2:
            for x in range(stride):
                line[x] = (line[x] + prev[x]) & 255
        elif f == 3:
            for x in range(stride):
                a = line[x - bpp] if x >= bpp else 0
                line[x] = (line[x] + ((a + prev[x]) >> 1)) & 255
        elif f == 4:
            for x in range(stride):
                a = line[x - bpp] if x >= bpp else 0
                b = prev[x]
                c = prev[x - bpp] if x >= bpp else 0
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[x] = (line[x] + pr) & 255
        rows.append(bytes(line))
        prev = line
    return width, height, bpp, rows


def write_png(path, width, rows, bpp):
    colour = {1: 0, 2: 4, 3: 2, 4: 6}[bpp]
    raw = b''.join(b'\x00' + r for r in rows)

    def chunk(kind, body):
        return (struct.pack('>I', len(body)) + kind + body
                + struct.pack('>I', zlib.crc32(kind + body) & 0xFFFFFFFF))

    png = (b'\x89PNG\r\n\x1a\n'
           + chunk(b'IHDR', struct.pack('>IIBBBBB', width, len(rows), 8, colour, 0, 0, 0))
           + chunk(b'IDAT', zlib.compress(raw, 9))
           + chunk(b'IEND', b''))
    open(path, 'wb').write(png)


def crop(path):
    width, height, bpp, rows = read_png(path)
    stride = width * bpp
    last = 0
    for y in range(height):
        row = rows[y]
        if any(row[x] < 245 for x in range(0, stride, bpp * 7)):
            last = y
    keep = last + 1
    if keep >= height:
        print(f'{path}: nothing to trim ({width}x{height})')
        return
    write_png(path, width, rows[:keep], bpp)
    print(f'{path}: {width}x{height} -> {width}x{keep}')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    for f in sys.argv[1:]:
        crop(f)
