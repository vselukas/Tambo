# Prototypy

Izolované experimenty mimo Astro build (nic odsud se nenasazuje).

## book3d – 3D kniha v hero (WebGL / three.js)

```bash
python3 -m http.server 8787 --directory prototypes
# → http://localhost:8787/book3d/
```

- `index.html` – scéna, choreografie scrollu, listování tažením, postprocessing
- `typeset.js` – sazba stránek ukázky do textur (Carlito, blok, odsazení, **tučné** / _kurzíva_)
- `pages.json` – text ukázky str. 10–14 (OCR ze skenu PDF + ruční korektura – **ke kontrole autorkou**)
- `assets/cover.jpg` – sken obálky (hledajici.cz, 854×1233) – nahradit tiskovým PDF
- `assets/jaguars.jpg` – ilustrace ze str. 13 ukázky

URL parametry: `?bloom=0` vypne postprocessing, `?bs=&br=&bt=` ladí bloom (síla, poloměr, práh).
