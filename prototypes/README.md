# Prototypy

Izolované experimenty mimo Astro build (nic odsud se nenasazuje).

## book3d – 3D kniha v hero (WebGL / three.js)

```bash
python3 -m http.server 8787 --directory prototypes
# → http://localhost:8787/book3d/
```

- `index.html` – stránka: nejdřív statický poster, three.js se načte až potom (lazy `import('./scene.js')`)
- `framing.js` – sdílená matematika kamery a pozice zavřené knihy (bez three.js, aby šel poster umístit hned)
- `scene.js` – WebGL scéna, choreografie scrollu (dráha 250vh), listování tažením / šipkami, postprocessing
- `assets/poster.webp` – render zavřené knihy (122 kB), crossfade do 3D na stejném místě
- `KOREKTURA.md` – text ukázky k přečtení autorkou (opravy pak přenést do `pages.json`)
- `typeset.js` – sazba stránek ukázky do textur (Carlito, blok, odsazení, **tučné** / _kurzíva_)
- `pages.json` – text ukázky str. 10–14 (OCR ze skenu PDF + ruční korektura – **ke kontrole autorkou**)
- `assets/cover.jpg` – sken obálky (hledajici.cz, 854×1233) – nahradit tiskovým PDF
- `assets/jaguars.jpg` – ilustrace ze str. 13 ukázky

URL parametry: `?bloom=0` vypne postprocessing, `?bs=&br=&bt=` ladí bloom (síla, poloměr, práh), `?debug` HUD,
`?static` simuluje fallback (bez WebGL / reduced motion / šetření dat → jen poster, bez scroll dráhy).

### Přegenerování posteru (po změně obálky nebo pózy)

1. Spustit pomocný server, který uloží PNG: malý Python POST handler na `127.0.0.1:8788` zapisující do `book3d/assets/`
2. Otevřít `http://localhost:8787/book3d/?capture` → uloží `assets/poster.png` (1440×900 póza, ×2.4, průhledné pozadí)
3. `node -e "require('sharp')('prototypes/book3d/assets/poster.png').resize({width:1100}).webp({quality:84,alphaQuality:90}).toFile('prototypes/book3d/assets/poster.webp')"`

### Co chybí od autorky / tiskárny

- **Obálka z tiskového PDF** (min. ~2000 px na výšku) → `assets/cover-print.jpg`, v `scene.js` přepnout `COVER = { src: 'assets/cover-print.jpg', isScan: false }` a přegenerovat poster
- **Korektura ukázky** v `KOREKTURA.md`
