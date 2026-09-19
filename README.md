# TAMBO – web knihy

Landing page knihy **TAMBO** od Karolíny Pištěkové. Postaveno na [Astro](https://astro.build) 7 + Tailwind 4, nasazeno na GitHub Pages (`/Tambo/`).

## Příkazy

```bash
npm install      # závislosti
npm run dev      # dev server → http://localhost:4321/Tambo/
npm run build    # produkční build do dist/
npm run check    # typová kontrola .astro souborů
npm run deploy   # build + nasazení na GitHub Pages
```

## Kde co upravit

| Chci změnit… | Soubor |
|---|---|
| Texty na stránce (CZ / EN) | `src/i18n/cs.json`, `src/i18n/en.json` |
| Recenze | `src/content/testimonials/{cs,en}/*.json` – jeden soubor = jedna recenze |
| Nákupní varianty a ceny | `src/content/products/{cs,en}/*.json` – jeden soubor = jedna karta |
| Barvy, fonty | `src/styles/global.css` (blok `:root` – ve Stacki panel *Variables*) |
| Animace | `src/styles/global.css` (blok `@theme`) |
| Obrázky | `src/assets/` – Astro je při buildu samo zmenší a převede do WebP |
| Kontakty v patičce, odkaz na ukázku | props komponent `Footer.astro` a `Hero.astro` |

Struktura polí pro recenze a produkty je popsaná v `src/content.config.ts` – build odmítne soubor, kterému něco chybí.

## Struktura

```
src/
  pages/index.astro        # česká verze  →  /
  pages/en/index.astro     # anglická verze  →  /en/
  layouts/Base.astro       # <head>, SEO meta, hreflang, scroll-reveal
  components/              # jedna sekce = jedna komponenta
  content/                 # recenze a produkty (content collections)
  i18n/                    # texty rozhraní
  styles/global.css        # design tokeny + globální styly
```

Jazyk se řeší přes vestavěný i18n routing Astra – každá verze má vlastní URL, `Astro.currentLocale` říká komponentám, který slovník použít.

## Práce ve Stacki

Projekt je připravený pro vizuální editor [Stacki](https://stacki.build):

- **Texty** → CMS → *i18n* → Cs / En (nadpisy, tlačítka, popisky)
- **Recenze a produkty** → CMS → *Content collections*
- **Barvy a fonty** → *Variables* (tokeny z `:root` v `global.css`)
- **Styl konkrétního prvku** → vybrat prvek → *Style* → *Typography* atd.

Každý důležitý prvek má jako **první třídu** pojmenovaný selektor (`hero-title`, `review-card`, `product-price`…). Stacki ho použije pro vlastní styly, takže zásah zůstane omezený na ten jeden prvek. Tailwind utility třídy za ním řeší layout a responzivitu – Stacki je nečte, jen zapisuje vlastní CSS do `global.css`.

Pozor: Stacki při každé úpravě přeformátuje celý dotčený `.astro` soubor.
