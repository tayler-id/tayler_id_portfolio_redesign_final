#!/usr/bin/env node
// Redacts PII in Merchant Portal screenshots before publishing on www.tayler.id.
//
// Reads:  ~/Desktop/portfolio/REDACTION_MAP.yaml
// Source: ~/Desktop/portfolio/merchant/Screenshot 2026-05-10 at HH.MM.SS PM.png
// Writes: public/assets/versatile/merchant-portal/HH-MM-SS.png
//
// Usage:  node tools/redact-merchant-portal.mjs

import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import os from "os";

const home = os.homedir();
const SRC_DIR = path.join(home, "Desktop/portfolio/merchant");
const MAP_FILE = path.join(home, "Desktop/portfolio/REDACTION_MAP.yaml");
const OUT_DIR = path.join(
  home,
  "Projects/tayler_id_portfolio_redesign_final/public/assets/versatile/merchant-portal"
);

// macOS screenshot filenames use U+202F (narrow no-break space) before "PM", not a regular space.
const NNBSP = " ";
const srcFilenameForKey = (key) =>
  `Screenshot 2026-05-10 at ${key}${NNBSP}PM.png`;
const outFilenameForKey = (key) =>
  key.replace(/\./g, "-") + ".png";

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function resolveBoxes(map, key) {
  const entry = map.screenshots[key];
  if (!entry) return [];

  let boxes;
  if (entry.same_as) {
    boxes = [...(map.screenshots[entry.same_as]?.boxes || [])];
  } else {
    boxes = [...(entry.boxes || [])];
  }

  for (const g of map.global || []) {
    const exclude = g.applies_when?.not_filenames || [];
    if (!exclude.includes(key)) {
      boxes.push({ kind: g.name, description: g.description, box: g.box });
    }
  }

  return boxes;
}

async function blurBoxes(srcPath, outPath, boxes) {
  const meta = await sharp(srcPath).metadata();

  if (boxes.length === 0) {
    await sharp(srcPath).toFile(outPath);
    return { width: meta.width, height: meta.height, count: 0 };
  }

  const overlays = await Promise.all(
    boxes.map(async (b) => {
      const x = clamp(b.box.x, 0, meta.width - 1);
      const y = clamp(b.box.y, 0, meta.height - 1);
      const w = clamp(b.box.w, 1, meta.width - x);
      const h = clamp(b.box.h, 1, meta.height - y);
      const blurred = await sharp(srcPath)
        .extract({ left: x, top: y, width: w, height: h })
        .blur(60)
        .toBuffer();
      return { input: blurred, top: y, left: x };
    })
  );

  await sharp(srcPath).composite(overlays).toFile(outPath);
  return { width: meta.width, height: meta.height, count: boxes.length };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const raw = await fs.readFile(MAP_FILE, "utf8");
  const map = yaml.load(raw);

  const keys = Object.keys(map.screenshots);
  const report = [];

  for (const key of keys) {
    const srcPath = path.join(SRC_DIR, srcFilenameForKey(key));
    const outPath = path.join(OUT_DIR, outFilenameForKey(key));

    try {
      await fs.access(srcPath);
    } catch {
      report.push({ key, status: "MISSING_SOURCE", srcPath });
      continue;
    }

    try {
      const boxes = resolveBoxes(map, key);
      const r = await blurBoxes(srcPath, outPath, boxes);
      report.push({
        key,
        status: "OK",
        boxes: r.count,
        out: outPath,
        dims: `${r.width}x${r.height}`,
      });
    } catch (e) {
      report.push({ key, status: "ERROR", error: e.message });
    }
  }

  const lines = [
    `Redaction report — ${new Date().toISOString()}`,
    `Source : ${SRC_DIR}`,
    `Map    : ${MAP_FILE}`,
    `Output : ${OUT_DIR}`,
    "",
  ];
  for (const r of report) {
    if (r.status === "OK") {
      lines.push(
        `OK    ${r.key}  →  ${path.basename(r.out)}  (${r.boxes} boxes blurred, ${r.dims})`
      );
    } else if (r.status === "MISSING_SOURCE") {
      lines.push(`MISS  ${r.key}  →  source not found: ${r.srcPath}`);
    } else {
      lines.push(`ERR   ${r.key}  →  ${r.error}`);
    }
  }

  const text = lines.join("\n");
  await fs.writeFile(path.join(OUT_DIR, "_redaction-report.txt"), text);
  console.log(text);

  const ok = report.filter((r) => r.status === "OK").length;
  console.log(`\n${ok}/${report.length} redacted PNGs written.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
