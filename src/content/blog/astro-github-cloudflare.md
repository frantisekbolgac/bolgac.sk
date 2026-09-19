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

Priznanie: šablónu som **vibe-codil** s AI asistentom. Infraštruktúru (Git, DNS, pipeline) som si staval rukami a rozumiem každému kroku — pri šablóne som AI nechal generovať a ja som revidoval, pýtal sa na princípy a rozhodoval o looku. Výsledok je kód, ktorému rozumiem, len cesta k nemu bola rýchlejšia.

Výhoda vlastnej šablóny: presne viem, čo sa pri builde stane s každým riadkom. Nevýhoda: všetko si musím postaviť sám. Pre blog je to pár večerov — prijateľná cena za porozumenie.

## Z čoho je to postavené

Päť stavebných blokov, každý s jednou úlohou:

**1. OpenCode** — open-source coding harness bežiaci v termináli. Držal kontext projektu, editoval súbory, púšťal buildy a git operácie. Ja som zadával smer a revidoval výsledky — AI písalo, človek rozhodoval.

**2. Muse Spark 1.3** — jazykový model pripojený do OpenCode. Na základe mojich požiadaviek (konzervatívny look, sidebar, navy paleta, light/dark) spolu vygenerovali tému pre Astro 7. Infraštruktúru som si robil sám, šablóna je vibe-coding.

**3. Astro + Node lokálne** — Node 22 a `astro dev` server s hot-reloadom na porte 8002. Tu sa ladil vzhľad a kontrolovala responzivita skôr, než čokoľvek odišlo von. Build trvá pod dve sekundy, takže cyklus nápad → náhľad je okamžitý.

**4. GitHub** — úložisko zdrojákov a CI v jednom. Každý push do `main` spustí GitHub Actions: čistá inštalácia (`npm ci`), `astro build` vrátane validácie frontmatteru a deploy. Zlý frontmatter = červený build = nič sa nepublikuje.

**5. Cloudflare Workers** — "úložisko aj webserver" v jednom. Hotová statika (`dist/`) sa nasadí ako assets-only worker a servuje sa z edge po celom svete. DNS, TLS certifikát a CDN sú vedľajší produkt toho istého účtu, kde mám aj doménu.

## Čo bude ďalej

RSS a sitemap, vlastná doména namiesto `workers.dev`, vyhľadávanie cez Pagefind a napojenie Obsidianu tak, aby články putovali do repa bez ručného kopírovania. O každom kroku napíšem sem.
