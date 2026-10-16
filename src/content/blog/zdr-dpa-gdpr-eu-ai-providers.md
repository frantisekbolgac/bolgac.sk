---
title: "Európsky poskytovateľ AI a citlivé dáta: čo naozaj znamenajú ZDR, DPA a GDPR"
description: "Audit desiatich poskytovateľov AI: kde beží model, či sa dáta ukladajú a čo hovorí zmluva. Európska firma ani sľub „netrénujeme“ nestačia."
image: "/blog/ZDR-DPA-GDPR-poskytovatelia-AI/zdr-dpa-gdpr-sk.jpg"
pubDate: 2026-09-24
tags:
  - ai
  - gdpr
  - data-sovereignty
  - cloud
---

**TL;DR:** Keď firma posiela citlivé dáta do AI cez API, nestačí, že poskytovateľ má európsku pobočku a sľubuje, že na dátach netrénuje. Treba overiť tri samostatné veci: či sa obsah po spracovaní naozaj neukladá (ZDR), či existuje zmluva o spracovaní osobných údajov (DPA) a či na to existuje dôkaz v dokumentácii. ZDR pritom neplatí pre poskytovateľa ako celok, ale pre konkrétnu službu, model a nastavenie. Z desiatich preverených poskytovateľov ho bez ďalšieho kroku dokumentujú len traja európski: OVHcloud, STACKIT a IONOS, aj to iba pre vybrané služby.

## O čo ide

Keď aplikácia alebo automat používa AI, posiela text cez API (programové rozhranie) poskytovateľovi, ktorý na svojich serveroch spustí model a vráti odpoveď. Tomuto spusteniu sa hovorí inferencia a firme, ktorá ho robí, inference poskytovateľ.

Pri výbere sa človek najčastejšie pozrie na dve veci: či má poskytovateľ firmu v EÚ a či sľubuje, že dáta nepoužije na tréning modelov. Ani jedno samo osebe nepovie, čo sa s dátami stane. Najprv si preto treba ujasniť, **aké dáta posielame, kde sa smú spracúvať a čo s nimi poskytovateľ urobí**. Až potom má zmysel vyberať konkrétnu službu.

## Rozsah auditu

Audit som spravil k **31. 8. 2026**, zmeny som doplnil k **24. 9. 2026** a celý som ho znova overil proti zdrojom k **16. 10. 2026**. Je to snímka verejných dôkazov k tým dátumom, nie trvalá záruka ani právne poradenstvo. ZDR, endpointy (konkrétne adresy služieb) a regionálne možnosti sa menia, preto rozhoduje vždy aktuálna dokumentácia a nastavenie konkrétneho účtu.

Hlavná časť porovnáva hostované inference API, ktoré prevádzkuje firma so sídlom v EÚ a ktoré ponúkajú overené spracovanie v EÚ. Do porovnania patria:

- synchrónne aj asynchrónne inference API (odpoveď hneď alebo neskôr) s možnosťou zvoliť spracovanie v Európe,
- služby určené na reálne použitie v aplikácii alebo automate,
- poskytovatelia, ktorí zverejňujú zmluvné alebo technické podmienky spracovania.

Anthropic, xAI a Kimi sú doplnené na porovnanie, mimo tejto európskej časti.

Vynechal som chatovacie aplikácie pre koncových používateľov, čistý prenájom GPU a serverov, produkty len na vlastnú inštaláciu, amerických hyperscalerov (veľkých cloudových poskytovateľov) s možnosťou spracovania v EÚ a úzko špecializované API. Porovnával by som iný typ produktu.

Ešte jedna poznámka k dátam. Ich klasifikácia určuje podmienky spracovania, potrebné technické a organizačné opatrenia a rozsah posúdenia. Sama osebe nerozhodne, či poskytovateľa možno použiť. Osobitné kategórie osobných údajov podľa článku 9 GDPR (napr. zdravotné údaje) majú vlastný právny rámec a posudzujú sa osobitne; splnenie článku 6 GDPR ich nepokrýva.

## Tri vrstvy, ktoré sa nesmú zamieňať

### ZDR: technická vlastnosť konkrétnej služby

ZDR (zero data retention, nulové uchovávanie dát) znamená, že **obsah konkrétnej požiadavky a odpovede sa po spracovaní neuloží**. Všeobecná definícia na audit nestačí. Rozsah treba posúdiť pre každý endpoint zvlášť, vrátane zákonných výnimiek, uchovávania kvôli bezpečnosti a stavu aplikácie (napr. uložená konverzácia). Ani spoločný základ celej platformy nedokazuje rovnaký rozsah pre každý produkt. Partnerský, regionálny, dávkový, stavový alebo „na vyžiadanie“ režim môže mať iné podmienky.

Za ZDR nepovažujem:

- šifrovanie prenášaných dát,
- umiestnenie v EÚ,
- sľub, že sa dáta nepoužijú na tréning,
- neskoršie vymazanie,
- krátkodobé uchovanie iba kvôli odhaľovaniu zneužitia alebo ladeniu chýb.

### DPA: zmluvná vrstva

DPA (data processing agreement) je zmluva o spracovaní osobných údajov podľa článku 28 GDPR, typicky medzi prevádzkovateľom (firma, ktorej dáta patria) a sprostredkovateľom (poskytovateľ AI). V audite ju beriem ako dôkaz, že existuje zmluvný rámec, ktorý sa dá prijať a začleniť do zmluvy o službe.

DPA sama nezabezpečí, že používanie služby je v súlade s GDPR. Právny základ, účel spracovania a posúdenie vplyvu (DPIA), kde ho článok 35 vyžaduje, sú zodpovednosťou zákazníka. Sprostredkovateľ poskytuje súčinnosť a má vlastné povinnosti podľa článkov 28 a 32 GDPR.

### GDPR: dôkaz, nie marketingová veta

„EU region“ v ponuke na GDPR nestačí. Hľadám dôkaz, že:

- konkrétny endpoint alebo model spracúva dáta na požadovanom mieste,
- dáta sa po požiadavke naozaj odstraňujú,
- výnimky z uchovávania sú známe,
- zmluvná dokumentácia je dostupná,
- ZDR pokrýva použitú funkciu API aj model.

Bez overiteľného dôkazu je „ZDR“ len tvrdenie.

## Výsledky auditu

Stĺpec ZDR používa štyri stavy:

- **Dokumentované:** výslovný dôkaz vo verejnej dokumentácii poskytovateľa. Nie je to nezávislé overenie prevádzky ani právny certifikát.
- **Dokumentované po schválení / po zapnutí:** zákazník musí urobiť ďalší krok (požiadať, zapnúť).
- **Nespĺňa prísne kritérium:** zdokumentovaná výnimka alebo uchovávanie, ktoré do ZDR podľa tejto tabuľky nepatrí.
- **Nepreukázané:** verejný zdroj daný bod nepotvrdil.

Stĺpec DPA uvádza overený stav zmluvy tam, kde sa dá doložiť.

| Poskytovateľ | Kde beží model a kde sú dáta | ZDR | Zmluva (DPA) a dôkaz | Rozsah a výnimky |
|---|---|---|---|---|
| **OVHcloud / OVH SAS** | Gravelines, Francúzsko | **Dokumentované pre synchronné AI Endpoints** | [DPA](https://contract.eu.ovhapis.com/1.0/pdf/OVH_Data_Protection_Agreement-gb.pdf); verejná dokumentácia | Batch a Files pracujú s uloženými súbormi a sú mimo prísneho ZDR. Výstupné a chybové súbory z Batch sa automaticky mažú po 15 dňoch; lehotu pre vstupné súbory dokumentácia neuvádza. |
| **STACKIT / Schwarz Digits Cloud** | región EU01; konkrétne dátové centrum dokumentácia ani certifikát neuvádzajú | **Dokumentované** | [Verejný DPA](https://stackit.com/en/asset/download/34534/file/STACKIT_data_processing_agreement.pdf?version=12) a Service Certificate | Dáta ani dotazy sa neukladajú ani nepoužívajú na tréning. Podľa certifikátu sa požiadavky nezálohujú; e-mail a subject ID zostávajú 30 dní v logoch služby. |
| **IONOS Cloud / IONOS SE** | Nemecké dátové centrá; stateless Model Hub | **Dokumentované pre stateless Model Hub** | [DPA](https://www.ionos.co.uk/terms-gtc/data-processing-agreement); verejná dokumentácia | Prompty a výstupy sa podľa aktuálnej dokumentácie nezapisujú do trvalej úložnej infraštruktúry ani po dokončení requestu; zostávajú prevádzkové metadáta. |
| **Scaleway SAS** | Paris, Francúzsko | **Nespĺňa prísne kritérium** | [Verejný DPA](https://www-uploads.scaleway.com/DPA_2024_ENG_b0abb5cc26.pdf) a Generative APIs Privacy Policy | V bežnej prevádzke sa správa takmer ako ZDR, ale pri chybách alebo podozrenom zneužití môže zostať HTTP request až dva týždne; anonymné metadáta sa môžu uchovávať šesť mesiacov. |
| **Nebius Token Factory / Nebius B.V.** | verejné endpointy bez záruky regiónu (miesto určované dynamicky); dedicated endpoint má zmluvne pevný región | **Dokumentované po zapnutí** | [Verejný DPA](https://docs.nebius.com/legal/dpa) (účinný od 15. 9. 2026) a verejná dokumentácia | Predvolene ukladá prompty a výstupy pre speculative decoding. ZDR sa zapína pre celú organizáciu a ukladanie vypne; Fínsko je miesto úložiska, nie dôkaz miesta inferencie. |
| **Mistral AI** | `api.eu.mistral.ai`; EÚ a EFTA; control plane nie je regionálny | **Dokumentované po schválení** | [ZDR](https://docs.mistral.ai/admin/monitor-comply/zero-data-retention) a regionálna [dokumentácia](https://docs.mistral.ai/inference/regional-inference) | Platí pre podporované stateless API na platených plánoch, po schválení (žiadosť môže byť zamietnutá). Nevzťahuje sa na Labs modely ani stateful produkty: Agents, Batch, Conversations, Libraries, Files, Vibe Work a Chat. |
| **OpenAI API / OpenAI Ireland Ltd.** | **Europe (EEA + Switzerland)** cez `eu.api.openai.com`; vyžaduje schválenie kontrol abuse monitoringu | **Dokumentované po schválení** | [DPA](https://openai.com/policies/data-processing-addendum/) a retention amendment | ZDR sa vzťahuje len na podporované endpointy a modely; systémové dáta a niektoré funkcie sú mimo ZDR. Obrázky označené ako možné CSAM sa uchovávajú na ručnú kontrolu aj pri ZDR. |
| **Anthropic / Anthropic Ireland Limited** | Priamy Claude API: v citovanej dokumentácii nie je doložená EÚ inferencia; regionálna cesta cez partnera je osobitný produkt | **Dokumentované po schválení** | [DPA](https://www.anthropic.com/legal/data-processing-addendum) a regionálna [dokumentácia](https://platform.claude.com/docs/en/manage-claude/data-residency) | Fable 5, Fable 5.1, Mythos 5 a Mythos 5.1 majú 30-dňovú retenciu. Pri označených chat/session vstupoch a výstupoch môže byť ich obsah uložený až dva roky aj pri ZDR. EFS je postupne dostupná architektúra. |
| **xAI (dnes SpaceXAI, divízia SpaceX)** | predvolený global endpoint nezaručuje región; samostatný US endpoint (len grok-4.7 a grok-4.6) | **Dokumentované po zapnutí** | [DPA](https://x.ai/legal/data-processing-addendum) pod značkou SpaceXSI, zmluvná strana SpaceXAI LLC, účinná od 22. 9. 2026 | ZDR platí pre celý tím; zapína ho admin v konzole, niektoré tímy cez sales. Predvolene sa requesty a odpovede uchovávajú 30 dní; ZDR to vypne a blokuje stateful Responses, Files, Collections, Batch, Deferred completions a uložené image/video výstupy. |
| **Kimi / Moonshot AI PTE. LTD.** | Citovaný ZDR dokument neurčuje oblasť spracovania | **Dokumentované po schválení; rozsah obmedzený** | DPA nie je v citovaných zdrojoch; podmienky sa riadia právom Singapuru | Enterprise ZDR na požiadanie: prompty a odpovede sa mažú hneď po vrátení odpovede. Mimo ZDR: Batch API, nahrávanie obrázkov a videí cez File Upload API, konektory tretích strán a prevádzkové dáta. Bežné podmienky dovoľujú použiť obsah zákazníka na vývoj služieb, ak sa písomne nedohodne inak. |

## Európski poskytovatelia

Tabuľka nie je rebríček. Je to mapa produktov podľa zvolených kritérií.

**OVHcloud, STACKIT a IONOS** ponúkajú jednoduché inference služby so spracovaním v Európe a rôznym rozsahom ZDR. Neplatí to pre celé ich portfólio. Dávkové spracovanie, súbory, stavové kolekcie alebo iné API môžu mať iné pravidlá.

**Scaleway** ukazuje, prečo samotné označenie ZDR môže byť nepresné. Keď poskytovateľ ponechá požiadavku po chybe alebo pri podozrení na zneužitie, prísne ZDR neplatí, aj keď sa v bežnej prevádzke správa takmer ako ZDR.

**Nebius** dáva výslovné technické nastavenie, ale predvolene ZDR nie je. Rozhoduje konfigurácia a konkrétny produkt, nie meno poskytovateľa.

**Mistral** ukazuje ďalšiu hranicu: ZDR je dostupné iba na platených plánoch, až po schválení a iba pre vybrané bezstavové API. Regionálne spracovanie v EÚ stojí 1,1-násobok bežnej ceny a nepodporuje stavové funkcie ako Agents, Batch či Files API. „EU endpoint“ zároveň nemusí znamenať iba členské štáty EÚ, ak dokumentácia zahŕňa aj EFTA alebo niektoré podmienky umožňujú ďalšie spracovanie.

## OpenAI, Anthropic a xAI

### OpenAI

Pre zákazníkov, ktorí splnia podmienky, je ZDR pri OpenAI podstatné: od 19. 8. 2026 umožňuje používať najvýkonnejšie (frontier) modely bez štandardného ukladania promptov a odpovedí na podporovaných endpointoch. ZDR podlieha predchádzajúcemu schváleniu OpenAI a prijatiu dodatočných podmienok. Ani pri ZDR sa nevymaže všetko: obrázky označené ako možné CSAM (zneužívanie detí) sa uchovávajú na ručnú kontrolu. Bez ZDR sa logy abuse monitoringu predvolene uchovávajú až 30 dní.

Podľa DPA je zmluvnou stranou pre zákazníkov so sídlom v EHP alebo vo Švajčiarsku OpenAI Ireland Ltd. To neznamená, že dáta sa fyzicky spracúvajú v Írsku. OpenAI používa presný názov **Europe (EEA + Switzerland)**, nie „EÚ región“. Európska rezidencia vyžaduje schválenie kontrol abuse monitoringu (napr. ZDR) a nastavuje sa pri vytvorení projektu; existujúci projekt sa dodatočne prepnúť nedá. Systémové dáta (účet, metadáta, údaje o používaní) sa môžu spracúvať a ukladať aj mimo zvoleného regiónu. ZDR platí len pre podporované endpointy a modely; nepodporované modely, endpointy a niektoré funkcie majú vlastné pravidlá. Konkrétny model, endpoint a funkciu treba vždy porovnať s aktuálnou tabuľkou ZDR.

### Anthropic

Priame Claude API má podľa citovanej dokumentácie pre parameter `inference_geo` hodnoty `global` alebo `us`, takže inferencia v EÚ doložená nie je. Regionálne možnosti cez podporovaného partnera sú samostatná cesta a treba ich overiť zvlášť. ZDR na Claude API sa aktivuje pre konkrétnu organizáciu cez obchodné oddelenie a automaticky sa nevzťahuje na nové organizácie. Fable 5, Fable 5.1, Mythos 5 a Mythos 5.1 sú takzvané Covered Models s povinnou 30-dňovou retenciou a pod ZDR nie sú dostupné, pokiaľ to Anthropic výslovne nepovolí. Organizácia so ZDR ich môže sprístupniť v jednom workspace tak, že preň zapne 30-dňovú retenciu; ostatné workspaces ostanú na ZDR.

1. 9. 2026 Anthropic oznámil Enterprise Frontier Safeguards (EFS), architektúru, ktorá sa má spúšťať postupne od jesene 2026. Nie je to všeobecné ZDR: zákazník môže monitorovacie dáta držať vo vlastnom cloudovom účte a pod vlastnými šifrovacími kľúčmi, automatické systémy posielajú upozornenia priamo jeho tímu a ľudská kontrola zamestnancami Anthropicu sa nevyžaduje. Kým EFS nebude pripravené, oprávnení zákazníci dostanú ZDR na Fable 5 a Fable 5.1. O Mythos modeloch oznámenie nehovorí.

Anthropic tiež uvádza, že ak systém obsah označí, vstupy a výstupy chatu alebo session môžu zostať uložené až dva roky, aj pri ZDR. Túto výnimku nemožno prehliadnuť.

### xAI

xAI už nie je samostatná firma: je to SpaceXAI, divízia SpaceX, a podľa oznámenia z 4. 10. 2026 sa má premenovať na SpaceXSI. Aktuálna DPA (účinná od 22. 9. 2026) je pod značkou SpaceXSI so zmluvnou stranou SpaceXAI LLC.

ZDR si zákazník zapne sám (niektoré tímy cez obchodné oddelenie), ale vždy pre celý tím. Všetky API kľúče v tíme musia ZDR používať; nedá sa zapnúť iba pre jeden kľúč. ZDR blokuje stavové funkcie: Responses API, Files, Collections, Batch, Deferred completions a uložené výstupy obrázkov a videa. Bez ZDR sa API požiadavky a odpovede uchovávajú 30 dní. Predvolený globálny endpoint nezaručuje miesto spracovania; samostatný US endpoint existuje, ale ponúka len modely grok-4.7 a grok-4.6.

## Veľké čínske modely

Tu sa nedá odpovedať jednou spoločnou známkou:

- **Kimi / Moonshot AI** zverejňuje ZDR pre enterprise zákazníkov na požiadanie: prompty a odpovede maže hneď po vrátení odpovede. Dokumentácia neuvádza miesto spracovania a ZDR nepokrýva Batch API, nahrávanie obrázkov a videí cez File Upload API, konektory tretích strán ani prevádzkové dáta. Bežné podmienky dovoľujú použiť obsah zákazníka na vývoj služieb, ak sa písomne nedohodne inak, a riadia sa právom Singapuru. DPA a miesto spracovania v citovaných zdrojoch preukázané nie sú.
- **DeepSeek** v zásadách ochrany súkromia uvádza spracovanie v Číne pre vlastné služby a možnosť uchovávať údaje, kým existuje účet. Údaje koncových používateľov aplikácií, ktoré vývojári postavia nad DeepSeek, z politiky výslovne vyníma (prevádzkovateľom je vývojár), ale nevyjasňuje, ako sa tieto údaje poslané cez API spracúvajú. Politika je aktualizovaná k 10. 2. 2026. V audite má preto stav nepreukázané, nie definitívne „nevyhovuje“. Vypnutie použitia dát na zlepšovanie modelu, ak je dostupné, nie je ZDR.
- **Qwen cez Alibaba Cloud Model Studio** deklaruje, že zákaznícke dáta nikdy nepoužije na tréning a dáta prenášané pri budovaní aplikácií a tréningu šifruje AES-256. Dokumentácia zároveň uvádza, že Model Studio ukladá dáta generované modelom a aplikáciou. Endpoint vo Frankfurte a spracovanie všetkých operácií v EÚ potrebujú samostatný zdroj; bez neho je európska rezidencia nepreukázaná.
- **MiniMax:** pri tejto kontrole som nenašiel dosť oficiálnych verejných dôkazov o ZDR, DPA ani regionálnom spracovaní. Chýbajúci dôkaz znamená stav nepreukázané, nie potvrdené ZDR.
- **Open-weight modely** (modely so zverejnenými váhami) sa dajú spustiť na vlastnej infraštruktúre alebo u európskeho inference poskytovateľa. Pri vlastnom hostingu sa dá cesta dát kontrolovať architektúrou, ak sú pod kontrolou aj prevádzka, úložisko, logy a subdodávatelia. Priame API autora modelu je pritom iná služba než európsky hosting, ktorý ten istý model spúšťa.

Z toho vyplýva dôležitý rozdiel: **pôvod modelu a inference poskytovateľ nie sú to isté**. Čínsky model môže bežať v EÚ s vlastným ZDR, zatiaľ čo jeho priame API môže spracúvať dáta v Číne bez vhodnej záruky uchovávania.

## Ako by som poskytovateľa vyberal

Nie je to návod na zapnutie služby, ale poradie rozhodovania:

1. **Dáta.** Rozdelím dáta podľa typu a citlivosti a určím, či ide o osobné údaje alebo osobitné kategórie podľa článku 9 GDPR. Tým určím podmienky spracovania, potrebné opatrenia a hranice, ktoré treba overiť. Klasifikácia sama nerozhodne, či je poskytovateľ použiteľný; to závisí aj od právneho základu, zmluvy a konkrétneho nastavenia.
2. **Hranica.** Určím, kam smú dáta ísť a kde musia zostať. Súkromné alebo citlivé dáta, ktoré nemajú opustiť môj zašifrovaný disk, neposielam do inference služby len preto, že poskytovateľ sľubuje ZDR.
3. **Endpoint.** Neoverujem značku, ale konkrétny endpoint, model a režim. Priame volanie modelu môže mať iné vlastnosti než Batch, Files, Agents alebo stavové kolekcie.
4. **Zmluva.** Pred spracovaním produkčných dát overím DPA, úlohu sprostredkovateľa, výnimky z uchovávania a podmienky pre subdodávateľov.
5. **Dôkaz.** Porovnám technickú dokumentáciu, aktuálne nastavenia a zmluvu. Marketingové označenie nestačí.

Verejné dáta môžu ísť inou cestou. Môžu byť zámerne v bežnom cloude, aby boli dostupné, indexovateľné a vyhľadateľné. Súkromné údaje môžu zostať na zašifrovanom disku a inferencia sa pre ne rieši inak.

## Prečo nestačí jedna z troch vecí

Poskytovateľ môže mať ZDR, ale bez vhodnej DPA chýba zmluvný rámec na spracovanie osobných údajov (právny základ sa pritom určuje samostatne podľa článku 6 GDPR). Môže mať DPA, ale bez ZDR môže dáta držať dlhšie, než je potrebné. A môže mať oboje, a klient mu aj tak posiela dáta, ktoré by nemal dostať.

Dátová suverenita sa preto nekončí výberom „európskeho“ cloudu. Skladá sa z celého reťazca: klasifikácia dát, miesto spracovania, technické uchovávanie, zmluvná zodpovednosť a spôsob, akým organizácia dokazuje, že to všetko naozaj platí.

## Zdroje

Zdroje boli znova overené k 16. 10. 2026. Bez nového overenia (stránka nedostupná pre automatické čítanie alebo neotvorená) zostali: DPA IONOS, STACKIT a Scaleway, Mistral Help Center, DPA Anthropicu a OpenAI retention amendment. ZDR a regionálne možnosti sa môžu meniť, preto treba pri produkčnom použití overiť aktuálnu dokumentáciu a konkrétny účet.

- [OVHcloud — AI Endpoints: Getting started](https://docs.ovhcloud.com/en/guides/public-cloud/ai-machine-learning/ai-endpoints-getting-started)
- [OVHcloud — Data Processing Agreement (EU)](https://contract.eu.ovhapis.com/1.0/pdf/OVH_Data_Protection_Agreement-gb.pdf)
- [OVHcloud — AI Endpoints capabilities](https://docs.ovhcloud.com/en/guides/public-cloud/ai-machine-learning/ai-endpoints-capabilities)
- [OVHcloud — AI Endpoints: Batch mode](https://docs.ovhcloud.com/en/guides/public-cloud/ai-machine-learning/ai-endpoints-batch-mode)
- [STACKIT — AI Model Serving FAQ](https://docs.stackit.cloud/products/data-and-ai/ai-model-serving/faq)
- [STACKIT — AI Model Serving](https://stackit.com/en/products/data-ai/stackit-ai-model-serving)
- [STACKIT — Data Processing Agreement](https://stackit.com/en/asset/download/34534/file/STACKIT_data_processing_agreement.pdf?version=12)
- [STACKIT — AI Model Serving Service Certificate](https://stackit.com/en/asset/download/34346/file/Service_Certificate_STACKIT_AI_Model_Serving.pdf?version=10)
- [IONOS — AI Model Hub Data Handling](https://docs.ionos.com/cloud/ai/ai-model-hub/governance-and-compliance/data-handling)
- [IONOS — Data Processing Agreement](https://www.ionos.co.uk/terms-gtc/data-processing-agreement)
- [Scaleway — Generative APIs Privacy Policy](https://www.scaleway.com/en/docs/generative-apis/reference-content/data-privacy.md)
- [Scaleway — Data Processing Agreement](https://www-uploads.scaleway.com/DPA_2024_ENG_b0abb5cc26.pdf)
- [Nebius — Legal Quick Guide](https://docs.tokenfactory.nebius.com/legal/legal-quick-guide)
- [Nebius — Data Processing Agreement](https://docs.nebius.com/legal/dpa)
- [Mistral — Zero Data Retention](https://docs.mistral.ai/admin/monitor-comply/zero-data-retention)
- [Mistral — ZDR Help Center](https://help.mistral.ai/en/articles/347612-can-i-activate-zero-data-retention-zdr)
- [Mistral — Regional inference](https://docs.mistral.ai/inference/regional-inference)
- [OpenAI — Offering Zero Data Retention for frontier models](https://openai.com/index/offering-zero-data-retention-for-frontier-models/)
- [OpenAI — Data Processing Addendum](https://openai.com/policies/data-processing-addendum/)
- [OpenAI — Data controls in the OpenAI platform](https://developers.openai.com/api/docs/guides/your-data)
- [OpenAI — Introducing data residency in Europe](https://openai.com/index/introducing-data-residency-in-europe/)
- [Anthropic — API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)
- [Anthropic — Data residency](https://platform.claude.com/docs/en/manage-claude/data-residency)
- [Anthropic — Enterprise Frontier Safeguards](https://www.anthropic.com/news/enterprise-frontier-safeguards)
- [xAI — API Security and Zero Data Retention](https://docs.x.ai/developers/faq/security)
- [xAI — Data Processing Addendum](https://x.ai/legal/data-processing-addendum)
- [Not a Tesla App — SpaceXAI will be renamed SpaceXSI (5. 10. 2026)](https://www.notateslaapp.com/news/4770/musk-spacexai-will-be-renamed-spacexsi-dropping-ai)
- [Kimi — Zero Data Retention](https://platform.kimi.ai/docs/guide/zero-data-retention)
- [Moonshot AI — Kimi OpenPlatform Terms of Service](https://platform.kimi.ai/docs/agreement/modeluse)
- [DeepSeek — Privacy Policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
- [Alibaba Cloud Model Studio — Security certifications and privacy](https://www.alibabacloud.com/help/en/model-studio/privacy-notice)
- [EUR-Lex — GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
