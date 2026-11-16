/**
 * The WebGL book. Loaded lazily by index.html once the static poster is on screen,
 * then it fades in over the poster at the exact same spot (see framing.js).
 *
 *   ?bloom=0          no post-processing      ?bs=&br=&bt=   bloom strength / radius / threshold
 *   ?debug            HUD with scroll state   ?capture       render assets/poster.png (dev only)
 */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { renderBook } from './typeset.js';
import { W, H, T, FOV, POSTER, frame } from './framing.js';

/* Cover source. The scan is pale and gets a corrective filter; a cover exported from the
   printer's PDF should be dropped in as assets/cover-print.jpg with isScan: false. */
const COVER = { src: 'assets/cover.jpg', isScan: true };

const $ = (id) => document.getElementById(id);
const runway = $('runway'), stage = $('stage'), canvas = $('gl'), poster = $('poster');
const copy = $('copy'), caption = $('caption'), hint = $('hint'), hud = $('hud'), dragHint = $('dragHint'), skip = $('skip');
const params = new URLSearchParams(location.search);
const BLOOM = params.get('bloom') !== '0';
const CAPTURE = params.has('capture');
const DEBUG = params.has('debug');
const fine = matchMedia('(pointer: fine)').matches;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeIO = (t) => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
const seg = (p, a, b) => clamp((p - a) / (b - a));

const COVER_T = 0.006;          // soft cover card
const EPS = 0.0025;             // layer separation

/* ───────────────────────── Renderer / scene ───────────────────────── */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: CAPTURE, preserveDrawingBuffer: CAPTURE, powerPreference: 'high-performance' });
renderer.setClearColor(0x0f0a18, CAPTURE ? 0 : 1);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.28;

const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50);
camera.position.set(0, 0, 6);

// lights: warm key from top-left-front, lavender rim from the left, rose fill from the right
const key = new THREE.DirectionalLight(0xfff2e6, 2.3);
key.position.set(-2.2, 3.2, 4.5);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.left = key.shadow.camera.bottom = -3; key.shadow.camera.right = key.shadow.camera.top = 3;
key.shadow.camera.near = 0.5; key.shadow.camera.far = 15;
key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02; key.shadow.radius = 6;
scene.add(key);
const rim = new THREE.DirectionalLight(0xc9a0ff, 1.4); rim.position.set(-4, 1, -2); scene.add(rim);
const fill = new THREE.DirectionalLight(0xff7eb3, 0.6); fill.position.set(4, -1, 2); scene.add(fill);
scene.add(new THREE.AmbientLight(0x8b5cf6, 0.25));

// atmosphere: three slow-breathing glows far behind the book (additive, so bloom can bleed into them)
const glowTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
  const r = g.createRadialGradient(128, 128, 0, 128, 128, 128); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.35, 'rgba(255,255,255,.35)'); r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r; g.fillRect(0, 0, 256, 256); return new THREE.CanvasTexture(c); })();
const glows = [
  { color: 0x8b5cf6, size: 7.5, pos: [-2.2, 1.0, -4], opacity: 0.075, speed: 0.11 },
  { color: 0xff7eb3, size: 6.0, pos: [3.0, -1.6, -4.5], opacity: 0.045, speed: 0.08 },
  { color: 0xc9a0ff, size: 4.0, pos: [0.6, 0.4, -3.5], opacity: 0.035, speed: 0.14 },
].map((g) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(g.size, g.size), new THREE.MeshBasicMaterial({ map: glowTex, color: g.color, transparent: true, opacity: g.opacity, blending: THREE.AdditiveBlending, depthWrite: false }));
  m.position.set(...g.pos); m.userData = g; m.visible = !CAPTURE; scene.add(m); return m;
});

// drop shadow: a soft dark ellipse behind and below the floating book, facing the camera
const shadowTex = (() => { const c = document.createElement('canvas'); c.width = 512; c.height = 256; const g = c.getContext('2d');
  const r = g.createRadialGradient(256, 128, 0, 256, 128, 256); r.addColorStop(0, 'rgba(0,0,0,.9)'); r.addColorStop(0.5, 'rgba(0,0,0,.35)'); r.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = r; g.save(); g.scale(1, 0.5); g.fillRect(0, 0, 512, 512); g.restore(); return new THREE.CanvasTexture(c); })();
const contact = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.2), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.7, depthWrite: false }));
contact.position.z = -0.25;
scene.add(contact);

/* ───────────────────────── Textures ───────────────────────── */
const loader = new THREE.TextureLoader();
const maxAniso = renderer.capabilities.getMaxAnisotropy();
const tex = (url) => new Promise((res, rej) => loader.load(url, (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso; res(t); }, undefined, rej));
const canvasTex = (w, h, draw) => {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso; return t;
};
const edgeTex = canvasTex(512, 64, (g, w, h) => {
  g.fillStyle = '#e6dfd0'; g.fillRect(0, 0, w, h);
  for (let x = 0; x < w; x += 2) { g.fillStyle = `rgba(60,40,20,${0.05 + Math.random() * 0.12})`; g.fillRect(x, 0, 1, h); }
});
edgeTex.wrapS = edgeTex.wrapT = THREE.RepeatWrapping;
const edgeTexV = edgeTex.clone(); edgeTexV.center.set(.5, .5); edgeTexV.rotation = Math.PI / 2; edgeTexV.needsUpdate = true;
const endpaperTex = canvasTex(512, 728, (g, w, h) => {
  g.fillStyle = '#efe9dd'; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 9000; i++) { g.fillStyle = `rgba(90,70,40,${Math.random() * .07})`; g.fillRect(Math.random() * w, Math.random() * h, 1, 1); }
});
// spine & back cover need Playfair – drawn after the font is in
const spineAndBack = () => [
  canvasTex(128, 1024, (g, w, h) => {
    const grad = g.createLinearGradient(0, 0, w, 0); grad.addColorStop(0, '#3d2266'); grad.addColorStop(.45, '#6b3fb0'); grad.addColorStop(1, '#4a2a7a');
    g.fillStyle = grad; g.fillRect(0, 0, w, h);
    g.save(); g.translate(w / 2, h / 2); g.rotate(-Math.PI / 2);
    g.fillStyle = '#d9ff4a'; g.font = '700 54px "Playfair Display", serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.letterSpacing = '18px'; g.fillText('TAMBO', 0, 0); g.restore();
  }),
  canvasTex(1024, 1454, (g, w, h) => {
    const grad = g.createRadialGradient(w * .5, h * .3, 0, w * .5, h * .3, h * .8);
    grad.addColorStop(0, '#7a48c8'); grad.addColorStop(.6, '#4a2a7a'); grad.addColorStop(1, '#2e1a4d');
    g.fillStyle = grad; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(217,255,74,.85)'; g.font = '700 64px "Playfair Display", serif'; g.textAlign = 'center'; g.letterSpacing = '24px';
    g.fillText('TAMBO', w / 2, h * .82);
    g.fillStyle = 'rgba(255,255,255,.35)'; g.font = '300 26px Inter, sans-serif'; g.letterSpacing = '6px';
    g.fillText('KAROLÍNA PIŠTĚKOVÁ', w / 2, h * .87);
  }),
];

/* ───────────────────────── Materials ─────────────────────────
   Pages start as blank paper so the closed book can appear without waiting for the typesetting;
   the typeset canvases are swapped in a moment later (nobody sees the pages before scrolling). */
const PAPER = 0xf4efe4;
const paper = () => new THREE.MeshStandardMaterial({ roughness: 0.92, metalness: 0, color: PAPER });
const setPageMap = (mat, canvasEl, mirrored) => {
  const t = new THREE.CanvasTexture(canvasEl); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso;
  if (mirrored) { t.wrapS = THREE.RepeatWrapping; t.repeat.x = -1; t.offset.x = 1; }   // seen from behind
  mat.map = t; mat.color.set(0xffffff); mat.needsUpdate = true;
};
const edgeMat = new THREE.MeshStandardMaterial({ map: edgeTex, roughness: 0.95 });
const edgeMatV = new THREE.MeshStandardMaterial({ map: edgeTexV, roughness: 0.95 });
const purple = new THREE.MeshStandardMaterial({ color: 0x4a2a7a, roughness: 0.55 });
const endpaper = new THREE.MeshStandardMaterial({ map: endpaperTex, roughness: 0.9 });

/* ───────────────────────── Bendable sheet (page or soft cover) ─────────────────────────
   A plane hinged on x = 0. Each frame the vertices are re-laid along a curve whose local angle
   lags behind the hinge angle towards the free edge (and a little more at the top corner),
   which is what a real sheet does when it is pushed over from the spine. */
class Sheet {
  constructor({ width, height, front, back, segX = 42, segY = 14, lag = 0.55, twist = 0.35, rest = 0.05 }) {
    this.w = width; this.h = height; this.lag = lag; this.twist = twist; this.rest = rest;
    this.geo = new THREE.PlaneGeometry(width, height, segX, segY);
    this.segX = segX; this.segY = segY;
    this.group = new THREE.Group();
    const f = new THREE.Mesh(this.geo, front); f.castShadow = true; f.receiveShadow = true;
    const b = new THREE.Mesh(this.geo, back); b.castShadow = false; b.receiveShadow = true;
    front.side = THREE.FrontSide; back.side = THREE.BackSide;
    if (back.map) { back.map.wrapS = THREE.RepeatWrapping; back.map.repeat.x = -1; back.map.offset.x = 1; }
    this.group.add(f, b);
    this.angle = -1; this.set(0);
  }
  set(theta) {
    if (Math.abs(theta - this.angle) < 1e-4) return;
    this.angle = theta;
    const pos = this.geo.attributes.position;
    const cols = this.segX + 1, rows = this.segY + 1;
    const bend = Math.sin(theta) * this.lag;
    const rest = Math.sin(theta / 2) * this.rest;      // fore-edge lifts a little once the sheet lies on the left
    for (let r = 0; r < rows; r++) {
      const v = 1 - r / this.segY;                     // PlaneGeometry rows run top → bottom
      const tw = 1 + this.twist * (v - 0.5);           // top corner lags a bit more than the bottom
      let x = 0, z = 0;
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        if (c > 0) {
          const u = c / this.segX, step = this.w / this.segX;
          const a = theta - bend * tw * Math.pow(u, 1.6) - rest * u;
          x += Math.cos(a) * step; z += Math.sin(a) * step;
        }
        pos.setXYZ(i, x, (v - 0.5) * this.h, z);
      }
    }
    pos.needsUpdate = true;
    this.geo.computeVertexNormals();
  }
}

/* ───────────────────────── Assemble the book ───────────────────────── */
const pivot = new THREE.Group();     // rotation centre (book centre when closed → spine when open)
const book = new THREE.Group();      // spine at x = 0
pivot.add(book); scene.add(pivot);

const build = async () => {
  const [coverRaw] = await Promise.all([tex(COVER.src), document.fonts.load('700 54px "Playfair Display"')]);
  const coverMap = (() => {
    if (!COVER.isScan) return coverRaw;
    // the scan is pale – push contrast and saturation back to where the printed cover sits
    const img = coverRaw.image; const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const g = c.getContext('2d');
    g.filter = 'contrast(1.28) saturate(1.35) brightness(0.86)'; g.drawImage(img, 0, 0);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso; return t;
  })();
  const [spineTex, backTex] = spineAndBack();

  const backCover = new THREE.Mesh(
    new THREE.BoxGeometry(W + 0.012, H + 0.02, COVER_T),
    [purple, purple, purple, purple, endpaper, new THREE.MeshPhysicalMaterial({ map: backTex, roughness: 0.4, clearcoat: 0.5, clearcoatRoughness: 0.3 })]
  );
  backCover.position.set((W + 0.012) / 2 - 0.006, 0, -COVER_T / 2);
  backCover.castShadow = backCover.receiveShadow = true;
  book.add(backCover);

  const spine = new THREE.Mesh(
    new THREE.BoxGeometry(COVER_T, H + 0.02, T + COVER_T * 2),
    [purple, new THREE.MeshPhysicalMaterial({ map: spineTex, roughness: 0.4, clearcoat: 0.5, clearcoatRoughness: 0.3 }), purple, purple, purple, purple]
  );
  spine.position.set(-COVER_T / 2 - 0.003, 0, T / 2);
  spine.castShadow = spine.receiveShadow = true;
  book.add(spine);

  // page materials: [p1 front, p2 back, p3 front, p4 back, p5 block top]
  const pm = [paper(), paper(), paper(), paper(), paper()];
  const block = new THREE.Mesh(new THREE.BoxGeometry(W - 0.006, H - 0.006, T), [edgeMat, edgeMat, edgeMatV, edgeMatV, pm[4], pm[4]]);
  block.position.set((W - 0.006) / 2, 0, T / 2);
  block.castShadow = block.receiveShadow = true;
  book.add(block);

  const pages = [
    new Sheet({ width: W - 0.006, height: H - 0.006, front: pm[0], back: pm[1], lag: 0.62, twist: 0.4, rest: 0.035 }),
    new Sheet({ width: W - 0.006, height: H - 0.006, front: pm[2], back: pm[3], lag: 0.62, twist: 0.4, rest: 0.035 }),
  ];
  pages.forEach((s) => book.add(s.group));

  // soft front cover: bends a little, laminated
  const coverFront = new THREE.MeshPhysicalMaterial({ map: coverMap, roughness: 0.42, metalness: 0, clearcoat: 0.55, clearcoatRoughness: 0.28, reflectivity: 0.35, envMapIntensity: 0.6 });
  const cover = new Sheet({ width: W + 0.012, height: H + 0.02, front: coverFront, back: endpaper.clone(), segX: 28, segY: 8, lag: 0.22, twist: 0.08, rest: 0.02 });
  book.add(cover.group);

  // typeset in the background – the closed book is already showing
  const pagesReady = renderBook('pages.json').then((canvases) => {
    window.__pages = canvases;
    canvases.forEach((c, i) => setPageMap(pm[i], c, i === 1 || i === 3));
  });

  return { pages, cover, pagesReady };
};

/* ───────────────────────── Inputs ───────────────────────── */
let tmx = 0, tmy = 0, mx = 0, my = 0, tp = 0, p = 0;
let hover = 0, hoverT = 0;
if (fine) addEventListener('mousemove', (e) => { tmx = e.clientX / innerWidth - .5; tmy = e.clientY / innerHeight - .5; });
const onScroll = () => { tp = clamp(scrollY / (runway.offsetHeight - innerHeight)); };
addEventListener('scroll', onScroll, { passive: true }); onScroll();
p = tp;   // a reload in the middle of the runway should not animate from the top

/* ───────────────────────── Post-processing + camera framing ───────────────────────── */
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
// threshold must sit ABOVE lit paper (linear HDR ≈ 1.2) so only highlights glow
const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), +(params.get('bs') ?? 0.22), +(params.get('br') ?? 0.5), +(params.get('bt') ?? 1.6));
composer.addPass(bloom);
composer.addPass(new OutputPass());

let F = frame(1, 1);
function frameCamera() {
  const w = stage.clientWidth, h = stage.clientHeight;
  F = frame(w, h);
  renderer.setSize(w, h, false);
  composer.setPixelRatio(renderer.getPixelRatio()); composer.setSize(w, h);
  camera.aspect = F.aspect; camera.position.z = F.d; camera.updateProjectionMatrix();
}
if (!CAPTURE) { frameCamera(); addEventListener('resize', frameCamera); }

/* ───────────────────────── Manual page turning (after the scroll sequence) ─────────────────────────
   Drag (or ← →) on the stage: left = next page, right = previous. */
const manual = { active: false, targets: [1, 1], angles: [1, 1] };
const turn = (dir) => {
  const t = manual.targets;
  if (dir > 0) { const i = t.indexOf(0); if (i >= 0) t[i] = 1; }
  else { const i = t.lastIndexOf(1); if (i >= 0) t[i] = 0; }
};
let dragX = null;
stage.addEventListener('pointerdown', (e) => { if (manual.active) dragX = e.clientX; });
addEventListener('pointermove', (e) => {
  if (dragX === null || !manual.active) return;
  const dx = e.clientX - dragX;
  if (Math.abs(dx) < 130) return;                 // one page per flick, not per pixel
  turn(dx < 0 ? 1 : -1); dragX = e.clientX;
});
addEventListener('pointerup', () => { dragX = null; });
addEventListener('keydown', (e) => {
  if (!manual.active) return;
  if (e.key === 'ArrowRight') turn(1); else if (e.key === 'ArrowLeft') turn(-1);
});
stage.style.touchAction = 'pan-y';

/* ───────────────────────── One frame of the choreography ─────────────────────────
   Runway is 250vh → 150vh of scroll: pose, open, two page turns, then the reader takes over. */
function pose(pages, cover, t) {
  const mobile = F.mobile;
  const sPose  = easeIO(seg(p, 0.00, 0.20));   // posed tilt → face-on
  const sOpen  = easeIO(seg(p, 0.16, 0.48));   // cover opens
  let sPage1 = easeIO(seg(p, 0.46, 0.70));
  let sPage2 = easeIO(seg(p, 0.68, 0.90));
  const idle = 1 - sPose;

  manual.active = p > 0.96;
  if (manual.active) {
    manual.angles[0] = lerp(manual.angles[0], manual.targets[0], 0.06);
    manual.angles[1] = lerp(manual.angles[1], manual.targets[1], 0.06);
    sPage1 = easeIO(manual.angles[0]); sPage2 = easeIO(manual.angles[1]);
  } else { manual.targets = [1, 1]; manual.angles = [sPage1, sPage2]; }

  // orientation: posed → read like a book on a table, top edge slightly AWAY from the reader
  const ry = lerp(-0.46, -0.03, sPose) + mx * (0.30 * idle + 0.08 * (1 - idle));
  const rx = lerp(-0.04, -0.075, sPose) + -my * (0.16 * idle + 0.05 * (1 - idle));
  pivot.rotation.set(rx, ry, 0);

  const scale = lerp(F.poseScale, 1, sOpen);
  pivot.scale.setScalar(scale);
  const openX = mobile ? -W / 2 : 0;
  pivot.position.x = lerp(F.closedX, openX, sOpen);
  pivot.position.y = lerp(F.closedY, mobile ? 0.02 : -0.03, sOpen) + Math.sin(t * 1.1) * 0.02 * idle;
  book.position.x = -W / 2 * (1 - sOpen);

  // teaser: the cover lifts a touch while the pointer is over the closed book
  if (fine && idle > 0.5) {
    const c = new THREE.Vector3(pivot.position.x, pivot.position.y, T).project(camera);
    const halfW = (W * scale) / F.visW, halfH = (H * scale * 0.5) / F.visH;
    hoverT = Math.abs(tmx * 2 - c.x) < halfW && Math.abs(-tmy * 2 - c.y) < halfH ? 1 : 0;
  } else hoverT = 0;
  hover = lerp(hover, hoverT, 0.08);

  const layerZ = (k, s) => T + EPS * ((3 - k) + (2 * k) * s);   // k: 0 cover, 1 page1, 2 page2
  cover.group.position.z = layerZ(0, sOpen);     cover.set(Math.PI * sOpen + 0.09 * hover * idle);
  pages[0].group.position.z = layerZ(1, sPage1); pages[0].set(Math.PI * sPage1);
  pages[1].group.position.z = layerZ(2, sPage2); pages[1].set(Math.PI * sPage2);

  glows.forEach((g, i) => { const u = g.userData; const k = 1 + 0.12 * Math.sin(t * u.speed * 6 + i); g.scale.set(k, k, 1); g.position.x = u.pos[0] + Math.sin(t * u.speed * 4 + i) * 0.25; });
  contact.position.x = pivot.position.x + (mobile ? W / 2 * scale : 0) + 0.10 * scale;
  contact.position.y = pivot.position.y - (H / 2) * scale * 0.72;
  contact.scale.set(lerp(0.62, 1.15, sOpen) * scale, lerp(0.55, 0.45, sOpen) * scale, 1);
  contact.material.opacity = 0.75 - 0.3 * sOpen;

  return { sPose, sOpen, sPage1, sPage2 };
}

/* ───────────────────────── Poster capture (dev tool) ─────────────────────────
   Renders the closed pose for a 1440 × 900 stage, cropped to the POSTER rect, transparent,
   and posts it to a local helper that writes assets/poster.png. */
async function capture(pages, cover) {
  const k = 2.4, w = 1440, h = 900;
  F = frame(w, h);
  camera.aspect = F.aspect; camera.position.z = F.d; camera.updateProjectionMatrix();
  tp = p = 0; mx = my = 0;
  pose(pages, cover, 0);
  const s = F.poseScale * F.pxPerUnit;
  const cx = w / 2 + F.closedX * F.pxPerUnit, cy = h / 2 - F.closedY * F.pxPerUnit;
  const x = (cx + POSTER.x0 * s) * k, y = (cy - POSTER.y1 * s) * k;
  const cw = Math.round((POSTER.x1 - POSTER.x0) * s * k), ch = Math.round((POSTER.y1 - POSTER.y0) * s * k);
  camera.setViewOffset(w * k, h * k, x, y, cw, ch);
  renderer.setPixelRatio(1); renderer.setSize(cw, ch, false);
  renderer.render(scene, camera);
  const blob = await new Promise((r) => canvas.toBlob(r, 'image/png'));
  const res = await fetch('http://127.0.0.1:8788/save?name=poster.png', { method: 'POST', body: blob });
  canvas.style.opacity = 1; poster.style.display = 'none';
  return `${cw}×${ch} → ${res.status}`;
}

/* ───────────────────────── Run ───────────────────────── */
build().then(async ({ pages, cover, pagesReady }) => {
  if (CAPTURE) { window.__capture = await capture(pages, cover); return; }
  const t0 = performance.now();
  let first = true;
  const tick = (now) => {
    mx = lerp(mx, tmx, .07); my = lerp(my, tmy, .07);
    p = lerp(p, tp, .12);
    const s = pose(pages, cover, (now - t0) / 1000);

    dragHint.classList.toggle('on', manual.active && fine);
    copy.style.opacity = (1 - s.sPose).toFixed(3);
    copy.style.transform = `translate3d(0, ${F.mobile ? 0 : -50}%, 0) translateY(${-60 * s.sPose}px)`;
    copy.style.pointerEvents = s.sPose > .5 ? 'none' : '';
    caption.classList.toggle('on', p > .84);
    skip.classList.toggle('on', p > .06 && p < .84);
    hint.style.opacity = p > .05 ? 0 : 1;

    if (BLOOM) composer.render(); else renderer.render(scene, camera);
    if (first) { first = false; canvas.classList.add('on'); poster.classList.add('off'); }   // hand-off: same pose, same spot
    if (DEBUG) hud.textContent = `p ${p.toFixed(2)}  open ${s.sOpen.toFixed(2)}  p1 ${s.sPage1.toFixed(2)}  p2 ${s.sPage2.toFixed(2)}  bloom ${BLOOM ? 'on' : 'off'}`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  await pagesReady;
}).catch((e) => { console.error(e); document.documentElement.classList.add('static'); });   // keep the poster
