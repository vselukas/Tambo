/**
 * Typesets book pages into <canvas> elements, ready to be used as textures.
 * Input: pages.json (blocks: chapter | time | para | image), inline **bold** and _italic_.
 * Output: one canvas per page at print-like resolution (A5 ratio).
 */

const PAGE = {
  w: 1536, h: 2172,                 // 1 : 1.414
  margin: { top: 172, bottom: 150, inner: 140, outer: 140 },
  body: { size: 38, line: 49, family: 'Carlito', color: '#1f1b17' },   // Carlito = metric clone of Calibri, the book's face
  chapter: { size: 48, weight: 700, after: 34 },
  time: { size: 38, weight: 700, before: 26, after: 4 },
  indent: 58,
  paraGap: 0,                       // the original uses indents, not gaps
  paper: '#f7f3ea',
  ink: '#1f1b17',
};

/** Split marked-up text into words carrying a style: { text, bold, italic }. */
function tokenize(text) {
  const words = [];
  let bold = false, italic = false;
  // split on spaces but keep markers attached to words, then peel markers
  for (let raw of text.split(/\s+/)) {
    if (!raw) continue;
    let leadB = 0, leadI = 0, trailB = 0, trailI = 0;
    while (raw.startsWith('**')) { raw = raw.slice(2); leadB++; }
    while (raw.startsWith('_')) { raw = raw.slice(1); leadI++; }
    // trailing markers may sit before punctuation: "déle.**" or "miluju_…"
    const m = raw.match(/^(.*?)(\*\*|_)([^\w]*)$/u);
    let tail = '';
    if (m && (m[2] === '**' || m[2] === '_')) {
      raw = m[1]; tail = m[3];
      if (m[2] === '**') trailB++; else trailI++;
    }
    if (leadB) bold = true; if (leadI) italic = true;
    words.push({ text: raw + tail, bold, italic });
    if (trailB) bold = false; if (trailI) italic = false;
  }
  return words;
}

function font(size, { bold = false, italic = false, weight } = {}) {
  return `${italic ? 'italic ' : ''}${weight ?? (bold ? 700 : 400)} ${size}px ${PAGE.body.family}, system-ui, sans-serif`;
}

/** Greedy line breaking + justification. Returns lines of positioned words. */
function layoutParagraph(ctx, words, width, firstIndent) {
  const space = (bold) => { ctx.font = font(PAGE.body.size, { bold }); return ctx.measureText(' ').width; };
  const measure = (w) => { ctx.font = font(PAGE.body.size, w); return ctx.measureText(w.text).width; };
  const lines = [];
  let line = [], lineW = 0, avail = width - firstIndent;
  for (const w of words) {
    const ww = measure(w);
    const sp = line.length ? space(w.bold) : 0;
    if (line.length && lineW + sp + ww > avail) {
      lines.push({ words: line, width: lineW, avail, indent: lines.length ? 0 : firstIndent });
      line = []; lineW = 0; avail = width;
    }
    line.push({ ...w, w: ww, sp: line.length ? sp : 0 });
    lineW += (line.length > 1 ? sp : 0) + ww;
  }
  if (line.length) lines.push({ words: line, width: lineW, avail, indent: lines.length ? 0 : firstIndent, last: true });
  return lines;
}

function drawLines(ctx, lines, x0, y, lineH) {
  const limit = PAGE.h - PAGE.margin.bottom;
  for (const ln of lines) {
    if (y > limit) { console.warn('typeset: page overflow, dropped a line:', ln.words.map((w) => w.text).join(' ')); break; }
    const gaps = ln.words.length - 1;
    const slack = ln.avail - ln.width;
    // justify unless it is the last line or the stretch would look ugly
    const justify = !ln.last && gaps > 0 && slack / gaps < 22;
    const extra = justify ? slack / gaps : 0;
    let x = x0 + ln.indent;
    for (const w of ln.words) {
      x += w.sp + (w.sp ? extra : 0);
      ctx.font = font(PAGE.body.size, w);
      ctx.fillText(w.text, x, y);
      x += w.w;
    }
    y += lineH;
  }
  return y;
}

function paperBackground(ctx, w, h) {
  ctx.fillStyle = PAGE.paper; ctx.fillRect(0, 0, w, h);
  // faint fibre noise so the paper does not read as a flat colour under the lights
  const img = ctx.getImageData(0, 0, w, h), d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 9;
    d[i] += n; d[i + 1] += n; d[i + 2] += n * 0.8;
  }
  ctx.putImageData(img, 0, 0);
}

const loadImage = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });

/** Render one page description to a canvas. `side` = 'recto' (odd, right) | 'verso' (even, left). */
export async function renderPage(page, side = 'recto') {
  const c = document.createElement('canvas');
  c.width = PAGE.w; c.height = PAGE.h;
  const ctx = c.getContext('2d');
  paperBackground(ctx, PAGE.w, PAGE.h);

  const left = side === 'recto' ? PAGE.margin.inner : PAGE.margin.outer;
  const width = PAGE.w - PAGE.margin.inner - PAGE.margin.outer;
  let y = PAGE.margin.top;
  ctx.fillStyle = PAGE.ink; ctx.textBaseline = 'alphabetic';

  for (const b of page.blocks) {
    if (b.type === 'chapter') {
      ctx.font = font(PAGE.chapter.size, { weight: PAGE.chapter.weight });
      ctx.fillText(b.text, left, y + PAGE.chapter.size * 0.8);
      y += PAGE.chapter.size + PAGE.chapter.after;
    } else if (b.type === 'time') {
      y += PAGE.time.before;
      ctx.font = font(PAGE.time.size, { weight: PAGE.time.weight });
      ctx.fillText(b.text, left, y + PAGE.time.size * 0.8);
      y += PAGE.body.line + PAGE.time.after;
    } else if (b.type === 'para') {
      const lines = layoutParagraph(ctx, tokenize(b.text), width, b.indent ? PAGE.indent : 0);
      y = drawLines(ctx, lines, left, y + PAGE.body.size * 0.8, PAGE.body.line) - PAGE.body.size * 0.8 + PAGE.paraGap;
    } else if (b.type === 'image') {
      const img = await loadImage(b.src);
      const iw = width * (b.width ?? 0.7), ih = iw * img.height / img.width;
      y += 40;
      ctx.drawImage(img, left + (width - iw) / 2, y, iw, ih);
      y += ih;
    }
  }

  // folio
  ctx.font = font(30); ctx.fillStyle = PAGE.ink; ctx.textAlign = 'center';
  ctx.fillText(`– ${page.number} –`, PAGE.w / 2, PAGE.h - PAGE.margin.bottom + 60);
  ctx.textAlign = 'left';
  return c;
}

/** Render every page of pages.json. Waits for the fonts first so nothing falls back to Arial. */
export async function renderBook(url) {
  const pages = await (await fetch(url)).json();
  await Promise.all([
    document.fonts.load(`400 ${PAGE.body.size}px ${PAGE.body.family}`),
    document.fonts.load(`700 ${PAGE.body.size}px ${PAGE.body.family}`),
    document.fonts.load(`italic 400 ${PAGE.body.size}px ${PAGE.body.family}`),
  ]);
  const out = [];
  for (const p of pages) out.push(await renderPage(p, p.number % 2 ? 'recto' : 'verso'));
  return out;
}
