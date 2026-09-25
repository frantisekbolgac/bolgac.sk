---
title: "ZDR, DPA a GDPR pri výbere európskych poskytovateľov AI"
description: "Ako rozlišujem technické garancie, zmluvné pokrytie a dôkazy pri výbere inference poskytovateľa pre citlivé dáta."
image: "/blog/ZDR-DPA-GDPR-poskytovatelia-AI/zdr-dpa-gdpr-sk.jpg"
pubDate: 2026-09-24
tags:
  - ai
  - gdpr
  - data-sovereignty
  - cloud
---

Pri výbere inference poskytovateľa AI sa ľahko pozrieme na dve veci: poskytovateľ má európsku entitu a sľubuje, že dáta nepoužíva na tréning. Ani jedno ani druhé samo osebe nehovorí dosť.

Prvou otázkou nie je, ktorý framework alebo cloud je najlepší. Prvou otázkou je, **aké dáta vôbec posielame, kde ich chceme spracúvať a čo s nimi poskytovateľ urobí**. Až potom prichádza výber konkrétnej služby.

## Čo audit robí a čo nie

Audit bol spravený k **31. 8. 2026**. Ide o časový snímok dôkazov, nie o trvalú záruku ani o právne poradenstvo. Primárne porovnáva komerčne použiteľné hostované inference API prevádzkované právnou entitou v EÚ, ktoré ponúkajú overené spracovanie v EÚ. Anthropic, xAI a Kimi sú doplnené ako porovnávacie profily mimo tejto úzkej európskej časti.

Tvrdenia a dokumentácia, ktoré sa zmenili po 31. auguste 2026, sú uvedené ako aktualizácia stavu k **24. 9. 2026**. ZDR, konkrétne endpointy a regionálne možnosti sa môžu meniť, preto je rozhodujúca vždy aktuálna dokumentácia a konkrétna konfigurácia účtu.

Do hlavnej matice patria:

- synchronné a asynchrónne inference API s možnosťou výberu európskeho spracovania,
- služby určené na reálne použitie v aplikácii alebo automate,
- poskytovatelia, ktorí zverejňujú zmluvné alebo technické podmienky relevantné pre spracovanie.

Mimo hlavnej matice som nechal end-user chat SaaS, čisto GPU/IaaS ponuky, self-host-only produkty, amerických hyperscalerov s možnosťou spracovania v EÚ a úzko špecializované API. Nie preto, že by boli zlé, ale preto, že by porovnanie s nimi porovnávalo iné produkty.

Klasifikácia dát určuje podmienky spracovania, potrebné technické a organizačné opatrenia a rozsah posúdenia. Neznamená automaticky, že poskytovateľa možno alebo nemožno použiť. Osobitné kategórie osobných údajov podľa článku 9 GDPR majú vlastný právny rámec a treba ich posúdiť osobitne; zhoda článku 6 GDPR sama osebe ich nepokrýva.

## Tri vrstvy, ktoré sa nesmú zamieňať

### ZDR je technická vlastnosť konkrétnej služby

ZDR znamená, že **obsah konkrétnej požiadavky a odpovede nie je po spracovaní uložený**. Základné definície ZDR však nestačia na audit: rozsah treba posudzovať pre každý endpoint osobitne vrátane zákonných výnimiek, safety retencie a application state. Ani spoločný základ pre danú platformu nedokazuje zhodný rozsah pre každý produkt, pretože pri partnerskom, regionálnom, batch, stateful alebo „na vyžiadanie“ režime môžu platiť iné podmienky. Nie je to automaticky vlastnosť celej značky poskytovateľa.

Za ZDR nepovažujem:

- šifrovanie prenášaných dát,
- umiestnenie v EÚ,
- tvrdenie, že dáta sa nepoužívajú na tréning,
- neskoršie vymazanie,
- krátkodobú retenciu iba na abuse monitoring alebo debugovanie.

### DPA je zmluvná vrstva

DPA je zmluva podľa článku 28 GDPR, typicky medzi prevádzkovateľom a sprostredkovateľom. V našom reporte ju považujem za dôkaz, že existuje zmluvný rámec, ktorý možno prijať a začleniť do služobnej zmluvy.

DPA samo osebe neurobí používanie služby v súlade s GDPR. Pre zákazníka je právny základ, účel spracovania a DPIA, kde je podľa článku 35 potrebná, samostatnou zodpovednosťou; sprostredkovateľ poskytuje súčinnosť a má vlastné povinnosti podľa článkov 28 a 32 GDPR.

### GDPR dôkaz nie je marketingová veta

Na samotné GDPR nestačí, že poskytovateľ má „EU region“. Zaujíma ma, či existuje dôkaz, že:

- konkrétny endpoint alebo model spracúva dáta na požadovanom mieste,
- dáta sa po požiadavke naozaj odstraňujú,
- retenčné výnimky sú známe,
- zmluvná dokumentácia je dostupná,
- rozsah ZDR sa vzťahuje na použitú API funkciu a model.

Bez overiteľného dôkazu je „ZDR“ len tvrdenie.

## Výsledky auditu

Táto tabuľka je doplnená o overený stav DPA tam, kde je možné ho doložiť. `Dokumentované` znamená výslovný dôkaz vo verejnej dokumentácii poskytovateľa; nejde o nezávislé overenie prevádzky klienta ani o právny certifikát. `Dokumentované po schválení alebo zapnutí` vyžaduje ďalší krok na strane zákazníka. `Nespĺňa prísne kritérium` znamená, že dokumentovaná výnimka alebo retencia je mimo ZDR definovaného v tejto tabuľke. `Nepreukázané` znamená, že verejný zdroj nepotvrdil daný bod.

| Poskytovateľ | Miesto inferencie a uloženia | Verdikt ZDR | DPA a dôkaz | Rozsah a výnimky |
|---|---|---|---|---|
| **OVHcloud / OVH SAS** | Gravelines, Francúzsko | **Dokumentované pre synchronné AI Endpoints** | [Verejný DPA](https://us.ovhcloud.com/legal/data-processing-agreement); verejná dokumentácia | Batch a Files používajú uložené vstupné a výstupné súbory s vlastnou retenciou a sú mimo prísneho ZDR. |
| **STACKIT / Schwarz Digits Cloud** | EU01, Germany South | **Dokumentované** | [Verejný DPA](https://stackit.com/en/asset/download/34534/file/STACKIT_data_processing_agreement.pdf?version=12) a Service Certificate | Dokumentácia uvádza, že dáta ani query sa neukladajú a nepoužívajú na tréning. |
| **IONOS Cloud / IONOS SE** | Nemecké dátové centrá; stateless Model Hub | **Dokumentované pre stateless Model Hub** | [DPA](https://www.ionos.co.uk/terms-gtc/data-processing-agreement); verejná dokumentácia | Prompty a výstupy sa podľa aktuálnej dokumentácie nezapisujú do trvalej úložnej infraštruktúry ani po dokončení requestu; zostávajú prevádzkové metadá. |
| **Scaleway SAS** | Paris, Francúzsko | **Nespĺňa prísne kritérium** | [Verejný DPA](https://www-uploads.scaleway.com/DPA_2024_ENG_b0abb5cc26.pdf) a Generative APIs Privacy Policy | V bežnej prevádzke sa správa takmer ako ZDR, ale pri chybách alebo podozrenom zneužití môže zostať HTTP request až dva týždne; anonymné metadá sa môžu uchovávať šesť mesiacov. |
| **Nebius Token Factory / Nebius B.V.** | verejné endpointy bez všeobecnej regionálnej garancie; dedicated endpoint má zmluvný región | **Dokumentované po zapnutí** | [Verejný DPA](https://docs.tokenfactory.nebius.com/legal/dpa) a verejná dokumentácia | Predvolene ukladá prompty a výstupy pre speculative decoding. ZDR ich vypne; Fínsko pri ukladaní je údaj o úložisku, nie dôkaz miesta inferencie. |
| **Mistral AI** | `api.eu.mistral.ai`; EÚ a EFTA; control plane nie je regionálny | **Dokumentované po schválení** | [ZDR](https://docs.mistral.ai/admin/monitor-comply/zero-data-retention) a regionálna [dokumentácia](https://docs.mistral.ai/inference/regional-inference) | Platí pre podporované stateless API pri `pay-as-you-go` a schválení. Nevzťahuje sa na Labs modely ani stateful produkty, ako sú Agents, Batch, Conversations, Libraries, Files a Vibe Work. |
| **OpenAI API / OpenAI Ireland Ltd.** | **Europe (EEA + Switzerland)** cez `eu.api.openai.com` | **Dokumentované po schválení** | [DPA](https://openai.com/policies/data-processing-addendum/) a retention amendment | ZDR sa vzťahuje len na podporované endpointy a modely; systémové metadáta a niektoré funkcie sú mimo ZDR. Konkrétny endpoint a feature treba overiť v aktuálnej tabuľke ZDR. |
| **Anthropic / Anthropic Ireland Limited** | Priamy Claude API: v citovanej dokumentácii nie je doložená EÚ inferencia; regionálna cesta cez partnera je osobitný produkt | **Dokumentované po schválení** | [DPA](https://www.anthropic.com/legal/data-processing-addendum) a regionálna [dokumentácia](https://platform.claude.com/docs/en/manage-claude/data-residency) | Fable 5, Fable 5.1, Mythos 5 a Mythos 5.1 majú 30-dňovú retenciu. Pri označených chat/session vstupoch a výstupoch môže byť ich obsah uložený až dva roky aj pri ZDR. EFS je postupne dostupná architektúra. |
| **xAI / xAI Corp** | predvolený global endpoint nezaručuje región; existuje samostatný US endpoint | **Dokumentované po zapnutí** | [Verejný xAI DPA](https://x.ai/legal/data-processing-addendum) | ZDR je self-serve na úrovni celého teamu. Predvolene sa API requesty a odpovede uchovávajú 30 dní; ZDR túto retenciu vypne a blokuje stateful Responses, Files, Collections, Batch, Deferred completions a uložené image/video výstupy. |
| **Kimi / Moonshot AI PTE. LTD.** | Citovaný ZDR dokument neurčuje oblasť spracovania | **Dokumentované po schválení; rozsah obmedzený** | DPA nebola overená v citovaných zdrojoch | Enterprise ZDR na požiadanie: prompty a odpovede sa mažú po dokončení requestu a enterprise dáta sa netrénujú. Priame nahrávanie obrázkov/videa, tretie-party konektory a prevádzkové dáta sú mimo ZDR. |

## EÚ poskytovatelia

Výsledok nie je hodnotením poskytovateľov. Je to mapa produktových profilov podľa zvolených kritérií.

**OVHcloud, STACKIT a IONOS** ponúkajú jednoduché štandardné inference profily s európskym spracovaním a rôznym rozsahom ZDR. Neznamená to, že všetky časti ich portfolia sú ZDR-eligible. Batch, Files, stateful collections alebo iné API môžu mať iné pravidlá.

**Scaleway** ukazuje, prečo samostatné označenie ZDR môže byť v praxi nepresné. Ak poskytovateľ ponechá request po chybe alebo pri podozrenom zneužití, prísne ZDR neplatí ani pri bežnom nastavení.

**Nebius** dáva explicitnú technickú kontrolu, ale predvolené správanie nie je ZDR. Aj tu je rozhodujúca konfigurácia a konkrétny produkt, nie názov poskytovateľa.

**Mistral** ukazuje ďalšiu hranicu: ZDR môže byť dostupné iba po schválení a iba pre vybrané stateless API. „EU endpoint“ zároveň neznamená automaticky iba členské štáty EÚ, ak dokumentácia zahŕňa EFTA alebo niektoré podmienky umožňujú ďalšie spracovanie.

## OpenAI, Anthropic a xAI

### OpenAI

**OpenAI je iný prípad, ale pre zákazníkov, ktorí spĺňajú podmienky, je to významné.** ZDR nie je iba retenčný prepínač. Je to vstupná podmienka, ktorá umožňuje používať frontier modely bez štandardného ukladania promptov a odpovedí na podporovaných endpointoch. OpenAI najprv posúdi žiadosť zákazníka a následne schváli konkrétny organization alebo project setup.

Podľa OpenAI DPA je OpenAI Ireland Ltd. contracting entity pre zákazníkov s domicilom v EHP alebo vo Švajčiarsku. To neznamená, že všetky dáta fyzicky spracúva v Írsku. OpenAI používa presný názov **Europe (EEA + Switzerland)**, nie „EÚ region“. ZDR platí iba pre podporované endpointy a modely; systémové metadáta, určité funkcie a nepodporované modely alebo endpointy majú vlastné pravidlá. Konkrétny model, endpoint a feature treba vždy porovnať s aktuálnou tabuľkou ZDR.

### Anthropic

**Anthropic** ide opačným smerom. Priamy Claude API má podľa citovanej dokumentácie `inference_geo` hodnoty `global` alebo `us`; európska inferencia preto nie je doložená. Regionálne možnosti cez podporovaného partnera sú osobitná cesta, ktorú treba overiť samostatne. Claude API má ZDR pre konkrétnu organizáciu, ktorý sa aktivuje cez sales. ZDR sa nevztahuje automaticky na všetky nové organizácie. Fable 5, Fable 5.1, Mythos 5 a Mythos 5.1 majú 30-dňovú retenciu a nie sú dostupné pod ZDR, pokiaľ Anthropic výslovne neudelí výnimku.

Anthropic preto v septembri 2026 oznámil Enterprise Frontier Safeguards. Ide o navrhovanú a postupne dostupnú architektúru, nie o všeobecné ZDR Anthropicu: zákazník si drží monitoringové dáta vo vlastnej infraštruktúre, automatické systémy posielajú vlajky ich bezpečnostnému tímu a personál Anthropicu nemá prístup k obsahu. Bez EFS môžu oprávnení zákazníci používať ZDR na Fable 5 a Fable 5.1.

Anthropic tiež uvádza, že pri označení obsahu systémom môžu jeho chat alebo session inputs a outputs zostať uložené až dva roky aj pri ZDR. Túto výnimku nemožno prehliadnuť.

### xAI

**xAI** má podobne self-serve ZDR, ale tentokrát na úrovni celého tímu. Všetky API kľúče v tíme musia používať ZDR; nemožno ho zapnúť iba pre jeden kľúč. ZDR blokuje stateful Responses API, Files, Collections, Batch, Deferred completions a uložené image/video výstupy. API requesty a odpovede sú predvolene uchovávané 30 dní; ZDR túto retenciu vypne. Predvolený global endpoint nezaručuje oblasť spracovania; samostatný US endpoint existuje, ale má užší modelový a funkčný rozsah.

## Veľké čínske modely

Pri veľkých čínskych modeloch sa nedá odpovedať jednou spoločnou známkou:

- **Kimi / Moonshot AI** publikuje ZDR pre enterprise zákazníkov na požiadanie a nezadržiava prompty ani odpovede po dokončení requestu. Dokumentácia neuvádza oblasť spracovania a nezahŕňa priame nahrávanie obrázkov alebo videí, tretie-party konektory ani prevádzkové logy. DPA a oblasť spracovania nie sú v citovaných zdrojoch preukázané.
- **DeepSeek** politika uvádza spracovanie v Číne pre vlastné služby DeepSeek a môže uchovávať údaje počas existencie účtu. Politika zároveň nevyjasňuje spracovanie údajov zákazníkov odovzdaných cez API. V našom audite preto používame stav `unproven`, nie definitívny FAIL. Vypnutie používania dát na zlepšovanie modelu, ak je k dispozícii, nie je ZDR.
- **Qwen cez Alibaba Cloud Model Studio** deklaruje, že zákaznícke dáta nepoužíva na tréning a šifruje ich AES-256. Dokumentácia zároveň uvádza, že Model Studio ukladá dáta generované modelom a aplikáciou. Frankfurt endpoint a spracovanie všetkých operácií v EÚ vyžadujú samostatný zdroj; bez neho je európska rezidencia nepreukázaná.
- **MiniMax** pri tejto kontrole som nenašiel dostatok oficiálnych verejných dôkazov pre jednotnú ZDR, DPA a regionálne spracovanie. Nedostatok dôkazu znamená v audite stav `nedokázané`, nie potvrdené ZDR.
- **Open-weight modely** môžu byť nasadené priamo na vlastnej infraštruktúre alebo cez európskeho inference poskytovateľa. Pri vlastnom hostingu možno dátovú cestu kontrolovať architektúrou, ak sú kontrolované aj prevádzkovanie, úložisko, logy a subdodávatelia. Priama API prvej strany je pritom iná služba než európsky host, ktorý ten istý model spúšťa.

Z toho vyplýva dôležitý rozdiel: **modelová pôvodnosť a inference provider nie sú to isté**. Veľký čínsky model môže byť prevádzkovaný v EÚ s vlastným ZDR, ale jeho priama API cesta môže byť v Číne bez vhodnej retenčnej garancie.

## Ako by som poskytovateľa filtroval

Nie ako návod na zapnutie služby, ale ako poradie rozhodovania:

1. **Dáta.** Najprv rozlišujem dáta podľa typu a citlivosti. Následne určím, či ide o osobné údaje alebo osobitné kategórie osobných údajov podľa článku 9 GDPR. Určím tým podmienky spracovania, potrebné technické a organizačné opatrenia a hranice, ktoré treba overiť. Samotná klasifikácia však nerozhodne, či je poskytovateľ použiteľný; to závisí aj od právneho základu, zmluvy a konkrétnej konfigurácie.
2. **Hranica.** Určím, kam smú dáta ísť a kde musia zostať. Súkromné alebo citlivé dáta, ktoré nemajú opustiť môj zašifrovaný disk, neposielam do inference služby len preto, že poskytovateľ sľubuje ZDR.
3. **Endpoint.** Neoverujem značku, ale konkrétny endpoint, model a režim. Stateless synchronous inference môže mať iné vlastnosti než Batch, Files, Agents alebo stateful collections.
4. **Zmluva.** Overím DPA, úlohu sprostredkovateľa, retenčné výnimky, podmienky spracovania subdodávateľmi a ďalšie dôležité body pred spracovaním produkčných dát.
5. **Dôkaz.** Porovnám technickú dokumentáciu, aktuálne nastavenia a zmluvu. Marketingové označenie nestačí.

Verejné dáta môžu mať inú cestu. Môžu byť zámerne v bežnom cloude, aby boli dostupné, indexovateľné a použiteľné vo vyhľadávaní. To neznamená, že do cloudu patrí všetko. Súkromné údaje môžu zostať na zašifrovanom disku a inference sa pre ne rieši iným spôsobom.

## ZDR, DPA a GDPR nie sú tri náhrady

Poskytovateľ môže mať ZDR, ale bez vhodnej DPA môže chýbať zmluvný rámec potrebný na spracovanie. Právny základ sa však určuje samostatne podľa článku 6 GDPR. Poskytovateľ môže mať DPA, ale bez ZDR môže spracúvať dáta dlhšie, než je potrebné. A poskytovateľ môže mať oboje, ale klient mu stále posiela dáta, ktoré by nemal dostať.

Dátová suverenita sa preto nekončí výberom „európskeho“ cloudu. Vzniká z celého reťazca: klasifikácia dát, miesto spracovania, technická retencia, zmluvná zodpovednosť a spôsob, akým organizácia dokazuje, že tieto veci naozaj platia.

V tomto audite je najdôležitejšia jedna veta: **ZDR nie je všeobecná vlastnosť poskytovateľa. Je to vlastnosť konkrétnej cesty dát cez konkrétnu službu.**

## Zdroje

Zdroje boli overené k 24. 9. 2026. ZDR a regionálne možnosti sa môžu meniť, preto je potrebné pri produkčnom použití overiť aktuálnu dokumentáciu a konkrétny účet.

- [OVHcloud — AI Endpoints: Getting started](https://docs.ovhcloud.com/en/guides/public-cloud/ai-machine-learning/ai-endpoints-getting-started)
- [OVHcloud — Data Processing Agreement](https://us.ovhcloud.com/legal/data-processing-agreement)
- [STACKIT — AI Model Serving FAQ](https://docs.stackit.cloud/products/data-and-ai/ai-model-serving/faq)
- [STACKIT — Data Processing Agreement](https://stackit.com/en/asset/download/34534/file/STACKIT_data_processing_agreement.pdf?version=12)
- [STACKIT — AI Model Serving Service Certificate](https://stackit.com/en/asset/download/34346/file/Service_Certificate_STACKIT_AI_Model_Serving.pdf?version=10)
- [IONOS — AI Model Hub Data Handling](https://docs.ionos.com/cloud/ai/ai-model-hub/governance-and-compliance/data-handling)
- [IONOS — Data Processing Agreement](https://www.ionos.co.uk/terms-gtc/data-processing-agreement)
- [Scaleway — Generative APIs Privacy Policy](https://www.scaleway.com/en/docs/generative-apis/reference-content/data-privacy.md)
- [Scaleway — Data Processing Agreement](https://www-uploads.scaleway.com/DPA_2024_ENG_b0abb5cc26.pdf)
- [Nebius — Legal Quick Guide](https://docs.tokenfactory.nebius.com/legal/legal-quick-guide)
- [Nebius — Data Processing Agreement](https://docs.tokenfactory.nebius.com/legal/dpa)
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
- [Kimi — Zero Data Retention](https://platform.kimi.ai/docs/guide/zero-data-retention)
- [Moonshot AI — Kimi OpenPlatform Terms of Service](https://platform.kimi.ai/docs/agreement/modeluse)
- [DeepSeek — Privacy Policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
- [Alibaba Cloud Model Studio — Security certifications and privacy](https://www.alibabacloud.com/help/en/model-studio/privacy-notice)
- [EUR-Lex — GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
