import sharp from "sharp";
const NNBSP = " ";
const src = `/Users/taylerramsay/Desktop/portfolio/merchant/Screenshot 2026-05-10 at 12.48.13${NNBSP}PM.png`;
const m = await sharp(src).metadata();
console.log("dimensions:", m.width, "x", m.height);

// Save crops at predicted y values from the map
const crops = [
  { y: 200, h: 100, label: "title-y200" },
  { y: 380, h: 130, label: "name-row-y380" },
  { y: 700, h: 130, label: "phone-row-y700" },
  { y: 1080, h: 130, label: "refnum-y1080" },
  { y: 1670, h: 130, label: "cloudreq-y1670" },
  { y: 1850, h: 130, label: "session-y1850" },
];
for (const c of crops) {
  await sharp(src)
    .extract({ left: 0, top: c.y, width: m.width, height: c.h })
    .resize(1200)
    .toFile(`/tmp/probe-${c.label}.png`);
}
console.log("done");
