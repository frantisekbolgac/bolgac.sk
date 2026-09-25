---
title: "Jednoduchá architektúra osobného blogu"
description: "Prečo som Obsidian, GitHub, Astro a Cloudflare poskladal ako jednu jednoduchú pipeline: obsah ide cez jednu hranicu a web zostáva statický."
image: "/blog/blog-architektura/blog-architektura-sk.jpg"
pubDate: 2026-09-19
tags:
  - astro
  - cloudflare
  - github
---

Pri blogu sa dá ľahko začať otázkou, aký CMS použiť. Pre mňa bola dôležitejšia iná otázka: **čo je zdroj pravdy, kto zodpovedá za build a kde sa výsledok dostane na internet?**

Odpoveďou je jedna jednoduchá pipeline. Obsah vzniká v Obsidiane, prechádza cez Git, Astro z neho vytvorí statický web a Cloudflare ho doručí návštevníkom. Každá časť má vlastnú zodpovednosť a žiadna nemusí vedieť veľa o ostatných.

## Východiská

Architektúra vychádza zo štyroch požiadaviek:

- články musím vedieť písať v bežnom lokálnom editore,
- každá zmena má mať svoju verziu a môcť sa vrátiť späť,
- publikovanie nesmie vyžadovať správu o bežiacom serveri,
- výsledný web má zostať jednoduchý na hosťovanie a čítanie.

CMS by bol možný, ale pre osobný blog by pribudol ďalší systém, ďalšie používateľské rozhranie a ďalšie miesto, kde sa môže obsah pokaziť. Databáza a aplikačný server by pridali prevádzku, ktorú tu nepotrebujem.

Dôležité je teda nie to, že používam konkrétny framework, ale to, že každý krok má jasnú hranicu.

## Jedna zodpovednosť pre každú vrstvu

```
Obsidian (.md)
    ↓
GitHub (verzie + CI)
    ↓
Astro (build + statické súbory)
    ↓
Cloudflare (CDN + TLS)
```

- **Obsidian je pracovný priestor pre obsah.** Článok je bežný Markdown súbor s frontmatterom. Nie je len export do iného systému, ale zdroj, ktorý môžem commitnúť, upraviť a porovnať.
- **GitHub je zdroj pravdy a miesto validácie.** Git uchováva historianku, GitHub Actions z čistého stavu nainštaluje závislosti a Astro build zastaví, ak je frontmatter alebo štruktúra obsahu chybná.
- **Astro je kompilačná hranica.** Z Markdownu a šablón vytvorí konkrétne stránky, sitemap trás a ďalšie výstupné súbory. Astro nepotrebuje bežať ako aplikácia, aby bol web dostupný.
- **Cloudflare je distribúcia.** Nasadí hotový priečinok `dist/` ako statické súbory a zabezpečí ich doručovanie cez CDN a TLS.

Hranica je dôležitá: **GitHub nenasadzuje ľubovoľné súbory a Cloudflare nepreberá zodpovednosť za chybný build.** Najprv prebehne validácia, až potom sa výstroj dostane na verejnosť.

## Prečo statický výstup

Najväčšie zjednodušenie nie je samotný Astro, ale to, že výsledkom je súborová štruktúra, nie bežiaca aplikácia.

To prináša niekoľko výhod:

- web nemá serverový proces, ktorý treba patchovať a monitorovať,
- výstup je možné skontrolovať ešte pred publikovaním,
- každá zmena je verzovaná a reverzibilná,
- doručovanie vie prevziať CDN a cache,
- hosting škáluje jednoduchšie než aplikácia s databázou.

Výmena je rovnako dôležitá. Každá nová zmena vyžaduje commit a build. Nie je tu redakčné rozhranie, ktorým by som článok zmenil priamo v prehliadači, ani databáza, v ktorej by sa hľadali dáta pri každej požiadavke.

Pre osobný blog je to prijateľný kompromis. Frekvencia zmien je nízka a jednotlivé verzie sú lacné na vytvorenie aj opravu.

## Vlastná šablóna nie je len dizajn

Hotová téma by bola úplne rozumná. Vlastnú šablónu som si nechal preto, že pri takom malom projekte je každá zbytočná závislosť ďalšia vec, ktorú treba spravovať.

Sidebar, jednoduchá paleta a light/dark režim nie sú dôvodom architektúry. Dôvodom je, že celý tok zostáva čitateľný: viem, kde sa obsah vytvára, kde sa validuje, čo sa nasádza a čo hostiteľ iba doručuje.

Šablónu som nechal vygenerovať AI agentmi.

## Obsah a jazyk

Obsah píšem po slovensky. AI pomáha s korektúrou, formuláciou a prekladom do angličtiny. Tému, rozhodnutia a architektonické postoje však ponechávam vo svojich rukách.

## Kde táto architektúra prestane stačiť

Toto riešenie nie je univerzálne. Pri viacerých autoroch by sa mohla objaviť potreba CMS, ktoré rieši role, náhľady a workflow. Pri komentároch, autentifikácii alebo personalizovanom obsahu by už bolo potrebné doplniť databázu a backend.

Aj vtedy by som najprv hľadal samostatnú hranicu, ktorú možno pridať bez prepísania celého systému. RSS, sitemap alebo vyhľadávanie môžu byť rozšíreniami tejto architektúry. Komplexnejší backend už znamená nový problém s prevádzkou, ukladaním dát a zodpovednosťou.

Z hľadiska dátovej suverenity má táto pipeline jednu dôležitú vlastnosť: obsah zostáva v čitateľných Markdown súboroch pod mojím vlastným riadením. Git uchováva jeho verziu, build ho transformuje a Cloudflare dostáva až výsledný artefakt. Hosting teda nie je zdrojom pravdy pre obsah.

## Záver

Hodnota tejto architektúry nie je v tom, že má najmenej nástrojov. V tom, že má jasné zodpovednosti, overiteľný build a jednoduchú hranicu medzi autorstvom, distribúciou a publikovaním.

Pre tento rozsah je to správna výmena: menej runtime zložitosti, viac kontroly nad obsahom a možnosť kedykoľvek jednotlivé časti nahradiť.
