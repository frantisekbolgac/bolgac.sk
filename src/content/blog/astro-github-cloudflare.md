---
title: "Ako je postavený tento blog: Obsidian, GitHub, Astro a Cloudflare"
description: "Článok píšem ako obyčajný textový súbor, web z neho vznikne automaticky a na serveri nebeží žiadny program. Prečo takto a kde to prestane stačiť."
image: "/blog/blog-architektura/blog-architektura-sk.jpg"
pubDate: 2026-09-19
tags:
  - astro
  - cloudflare
  - github
---

**TL;DR:** Články píšem v Obsidiane ako obyčajné textové súbory. Po nahratí na GitHub z nich nástroj Astro vyrobí hotové stránky a Cloudflare ich doručí čitateľom. Na webe nebeží žiadny program ani databáza, takže je menej vecí, ktoré treba aktualizovať a strážiť. Cena za to: článok neupravím v prehliadači a komentáre ani prihlasovanie tu nebudú. Poskladať to celé trvalo asi hodinu, prevádzka stojí 0 €.

## Prvá otázka nebola, aký redakčný systém

Blog vznikol, lebo som sa čiastočne vrátil do IT.

Pri blogu sa človek zvyčajne najprv pýta, aký redakčný systém (CMS, napríklad WordPress) použiť. Mňa zaujímali iné tri veci: kde budú texty uložené, kto z nich vyrobí web a kde ten web pobeží.

Požiadavky som mal štyri:

- písať v obyčajnom editore na vlastnom počítači,
- každú zmenu vedieť vrátiť späť,
- nestarať sa o server, na ktorom beží program,
- web, ktorý sa ľahko hostí a rýchlo načíta.

WordPress poznám a na túto úlohu ho nepovažujem za dobrý nástroj. Je príliš veľký a plný vecí, ktoré nepotrebujem, počnúc databázou. Zvažoval som aj Quartz, ktorý robí web priamo z poznámok v Obsidiane, ale nepáčil sa mi jeho vzhľad a obmedzené možnosti.

## Štyri kroky od poznámky po web

```
Obsidian (textový súbor .md)
    ↓
GitHub (verzie + automatická kontrola)
    ↓
Astro (z textu hotové stránky)
    ↓
Cloudflare (doručenie čitateľom)
```

**Obsidian** je aplikácia na poznámky. Článok v ňom je obyčajný textový súbor vo formáte Markdown, uložený na mojom disku. Na začiatku súboru je pár riadkov s názvom, dátumom a štítkami (tzv. frontmatter). Tento súbor je originál, všetko ďalej sa vyrába z neho.

**GitHub** uchováva všetky verzie súborov. Keď doň zmenu nahrám, služba GitHub Actions spustí čerstvý virtuálny počítač, nainštaluje presne tie verzie knižníc, ktoré sú zapísané v repozitári, a skúsi web postaviť. Ak v článku chýba povinný údaj, napríklad názov alebo dátum, build zlyhá a nič sa nezverejní. Potom ešte overí, či mapa stránok pre vyhľadávače obsahuje všetky stránky a žiadnu testovaciu adresu.

**Astro** z textových súborov a šablóny vyrobí hotové HTML stránky do priečinka `dist/`. Okrem samotného Astra web potrebuje jedinú knižnicu, na generovanie mapy stránok.

**Cloudflare** dostane hotový priečinok a doručuje ho čitateľom zo serverov po celom svete, cez šifrované spojenie (https). Web beží na Cloudflare Workers v režime, kde sa iba posielajú súbory a nespúšťa sa žiadny kód.

Weby sú dva. Každá zmena ide najprv na testovací web. Keď je v poriadku, otvorím na GitHube pull request, teda žiadosť o prevzatie zmien z testovacej vetvy `staging` do hlavnej vetvy `main`. Po jeho schválení GitHub Actions pošle novú verziu do Cloudflare na bolgac.sk.

Ešte jeden detail: kľúč, ktorým GitHub nahráva web do Cloudflare, má povolené iba prepísať tento web. Keby unikol, útočník prepíše stránku, ale k doméne ani k e-mailu sa nedostane.

## Prečo hotové súbory a nie aplikácia

Najviac zjednodušenia prináša to, že výsledkom je priečinok súborov, nie bežiaci program. Z toho vyplýva:

- na serveri nie je proces, ktorý treba záplatovať a sledovať,
- výsledok sa dá skontrolovať ešte pred zverejnením,
- každá zmena má svoju verziu a dá sa vrátiť,
- doručovanie zvládne Cloudflare sám, bez môjho servera.

Každá zmena, aj oprava preklepu, znamená nahrať novú verziu a počkať na build. Nie je tu administrácia, kde by som text upravil v prehliadači, ani databáza, z ktorej by sa stránka skladala pri každej návšteve. Pri blogu, ktorý sa mení zriedka, mi to neprekáža.

## Šablóna a AI

Hotová téma by bola úplne rozumná voľba. Vlastnú šablónu (bočný panel, jednoduché farby, svetlý a tmavý režim) mi vygeneroval model GLM 5.3 Flash v nástroji OpenCode. Celé poskladanie trvalo asi hodinu, vrátane diskusie o šablóne. Tokeny za model odhadujem do 2 €, a aj to je skôr prehnané. GitHub ani Cloudflare ma za tento blog nestoja nič. Cudzia téma by priniesla vlastné závislosti, ktoré by som musel sledovať bez toho, aby som im rozumel. Podstatné je, že vygenerovanému výsledku rozumiem a viem ho skontrolovať.

Texty píšem po slovensky. AI mi pomáha s korektúrou, formuláciou a prekladom do angličtiny. Tému, rozhodnutia a názory si nechávam.

## Kde to prestane stačiť

Keby som chcel upravovať články v prehliadači, napríklad pre ďalšieho autora, nemusím prerábať celý blog. Pridal by som Pages CMS: open source redakčné rozhranie, ktoré upravuje súbory priamo v repozitári na GitHube, bez vlastnej databázy. Nastavuje sa jedným súborom `.pages.yml` v repozitári a dá sa použiť ich hostovaná aplikácia, takže netreba nič hosťovať.

Komentáre, prihlasovanie alebo obsah na mieru pre konkrétneho čitateľa by si vyžiadali databázu a server.

Menšie veci sa dajú pridať bez prestavby. Mapa stránok pre vyhľadávače takto už pribudla; RSS alebo vyhľadávanie by mohli rovnako. Plnohodnotný backend by už bol nový projekt s vlastnou prevádzkou a vlastnou zodpovednosťou za dáta.

Z pohľadu dátovej suverenity: originály sú čitateľné textové súbory na mojom disku a v mojom repozitári. Cloudflare dostáva iba hotový výsledok. Ak budem chcieť hosting zmeniť, ten istý priečinok `dist/` nasadím inde.
