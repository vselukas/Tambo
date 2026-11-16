/**
 * Shared framing maths – no three.js here on purpose, so the page can place the static poster
 * in exactly the spot where the 3D book will appear, long before three.js has downloaded.
 */
export const W = 1, H = 1.42, T = 0.072;   // A5 paperback, world units
export const FOV = 30;
export const MOBILE_MAX = 860;

/** World rect (book units at scale 1, relative to the pivot) that assets/poster.webp covers. */
export const POSTER = { x0: -0.9, x1: 0.9, y0: -1.0, y1: 0.9 };

/** Camera distance, visible extents and the closed-book pose for a stage of w × h CSS px. */
export function frame(w, h) {
  const aspect = w / h, mobile = w <= MOBILE_MAX;
  const tan = Math.tan((FOV / 2) * Math.PI / 180);
  // the OPEN spread (2 × W, one page on phones) fills the viewport – that is when people read
  const spreadW = mobile ? W * 1.12 : 2 * W * 1.10, spreadH = H * (mobile ? 1.5 : 1.42);
  const d = Math.max(spreadW / (2 * tan * aspect), spreadH / (2 * tan));
  const visH = 2 * d * tan, visW = visH * aspect;
  // closed: smaller, beside the headline (desktop) or above it (phones)
  const poseScale = mobile
    ? Math.min(1, (visW * 0.62) / W, (visH * 0.46) / H)
    : Math.min(1, (visW * 0.36) / W, (visH * 0.60) / H);
  const closedX = mobile ? 0 : -visW * 0.26;
  const closedY = mobile ? visH * 0.18 : 0;
  return { mobile, aspect, d, visW, visH, poseScale, closedX, closedY, pxPerUnit: h / visH };
}

/** Where the poster image goes, in CSS px inside the stage. */
export function posterRect(w, h) {
  const f = frame(w, h);
  const s = f.poseScale * f.pxPerUnit;                 // px per book unit
  const cx = w / 2 + f.closedX * f.pxPerUnit, cy = h / 2 - f.closedY * f.pxPerUnit;
  return { left: cx + POSTER.x0 * s, top: cy - POSTER.y1 * s, width: (POSTER.x1 - POSTER.x0) * s, height: (POSTER.y1 - POSTER.y0) * s };
}
