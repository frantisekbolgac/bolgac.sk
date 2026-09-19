---
title: "Astro + GitHub + Cloudflare: blog bez servera"
description: "Ako som poskladal osobný blog: Obsidian ako editor, GitHub ako CI a Cloudflare ako hosting. Žiadny server, žiadny CMS."
pubDate: 2026-09-19
tags:
  - astro
  - cloudflare
  - github
---

Rozhodol som sa postaviť si osobný blog tak, aby som ho vedel písať z Obsidianu a nemusel sa starať o žiadny server. Výsledok je trojica, kde má každá časť presne jednu úlohu.

## Architektúra

- **Obsidian** — editor. Články sú obyčajné `.md` súbory s frontmatterom (`title`, `pubDate`, `tags`). Žiadne CMS rozhranie, žiadne kopírovanie do webu.
- **GitHub** — zdroj pravdy a CI. Push spustí GitHub Actions: `npm ci`, `astro build` a validácia frontmatteru. Ak je v článku chyba, build zlyhá a na web sa nedostane nič.
- **Cloudflare** — hosting. Hotový priečinok `dist/` sa nasadí ako assets-only worker. Žiadny bežiaci server, len statické súbory na edge.

```
Obsidian (.md) → git push → GitHub Actions (build + validácia) → Cloudflare (statika)
```

## Prečo nie hotová téma

Zvažoval som Quartz aj niekoľko Astro tém (Chirping, Fuwari, AstroPaper). Každá bola buď príliš ťažká, alebo cudzia — kód, ktorému nerozumiem, je kód, ktorý neviem opraviť. Tak som si šablónu napísal sám: sidebar, navy paleta, light/dark režim, nula závislostí nad rámec Astra.

Výhoda vlastnej šablóny: presne viem, čo sa pri builde stane s každým riadkom. Nevýhoda: všetko si musím postaviť sám. Pre blog je to pár večerov — prijateľná cena za porozumenie.

## Čo bude ďalej

RSS a sitemap, vlastná doména namiesto `workers.dev`, vyhľadávanie cez Pagefind a napojenie Obsidianu tak, aby články putovali do repa bez ručného kopírovania. O každom kroku napíšem sem.
