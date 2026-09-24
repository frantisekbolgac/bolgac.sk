---
title: "ZDR, DPA a GDPR pri výbere európskych poskytovateľov AI"
description: "Ako rozlišujem technické garancie, zmluvné pokrytie a dôkazy pri výbere inference poskytovateľa pre citlivé dáta."
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

Audit bol spravený k **31. 8. 2026**. Ide o časový snímok dôkazov, nie o trvalú záruku ani o právne poradenstvo. Primárne porovnáva komerčne použiteľné hostované inference API prevádzkované právnou entitou v EÚ, ktoré ponúkajú overené spracovanie v EÚ. xAI a Kimi sú doplnené ako porovnávacie profily mimo tejto úzkej európskej časti.

Tvrdenia a dokumentácia, ktoré sa zmenili po 31. auguste 2026, sú uvedené ako aktualizácia stavu k **24. 9. 2026**. ZDR, konkrétne endpointy a regionálne možnosti sa môžu meniť, preto je rozhodujúca vždy aktuálna dokumentácia a konkrétna konfigurácia účtu.

Do hlavnej matice patria:

- synchronné a asynchrónne inference API s možnosťou výberu európskeho spracovania,
- služby určené na reálne použitie v aplikácii alebo automate,
- poskytovatelia, ktorí zverejňujú zmluvné alebo technické podmienky relevantné pre spracovanie.

Mimo hlavnej matice som nechal end-user chat SaaS, čisto GPU/IaaS ponuky, self-host-only produkty, amerických hyperscalerov s možnosťou spracovania v EÚ a úzko špecializované API. Nie preto, že by boli zlé, ale preto, že by porovnanie s nimi porovnávalo iné produkty.

## Tri vrstvy, ktoré sa nesmú zamieňať

### ZDR je technická vlastnosť konkrétnej služby

ZDR znamená, že **obsah konkrétnej požiadavky a odpovede nie je po spracovaní uložený**. Rozsah je však potrebné posudzovať endpoint po endpointom vrátane zákonných výnimiek, safety retencie a application state. Nie je to automaticky vlastnosť celej značky poskytovateľa.

Za ZDR nepovažujem:

- šifrovanie prenášaných dát,
- umiestnenie v EÚ,
- tvrdenie, že dáta sa nepoužívajú na tréning,
- neskoršie vymazanie,
- krátkodobú retenciu iba na abuse monitoring alebo debugovanie.

### DPA je zmluvná vrstva

DPA je dohoda medzi prevádzkovateľom a spracovateľom podľa článku 28 GDPR. V našom reporte ju považujem za dôkaz, že existuje zmluvný rámec, ktorý možno prijať a začleniť do služobnej zmluvy.

DPA samo osebe neurobí používanie služby v súlade s GDPR. Pre zákazníka je právny základ, účel spracovania a DPIA samostatnou zodpovednosťou; spracovateľ poskytuje súčinnosť a má vlastné povinnosti podľa článkov 28 a 32 GDPR.

### GDPR dôkaz nie je marketingová veta

Na samotné GDPR nestačí, že poskytovateľ má „EU region“. Zaujíma ma, či existuje dôkaz, že:

- konkrétny endpoint alebo model spracúva dáta na požadovanom mieste,
- dáta sa po požiadavke naozaj odstraňujú,
- retenčné výnimky sú známe,
- zmluvná dokumentácia je dostupná,
- rozsah ZDR sa vzťahuje na použitú API funkciu a model.

Bez overiteľného dôkazu je „ZDR“ len tvrdenie.

## Výsledky auditu

Táto tabuľka je doplnená o overený stav DPA tam, kde je možný ho doložiť. `PASS` znamená **dokumentované ZDR podľa verejnej dokumentácie poskytovateľa**, nie nezávislé overenie prevádzky klienta.

| Poskytovateľ | Spracovanie a úložisko | Verdikt ZDR | DPA a dôkaz | Rozsah a výnimky |
|---|---|---|---|---|
| **OVHcloud / OVH SAS** | Gravelines, Francúzsko | **PASS pre synchronné AI Endpoints** | Verejný DPA; verejná dokumentácia | Batch a Files používajú uložené vstupné a výstupné súbory s vlastnou retenciou a sú mimo prísneho ZDR. |
| **STACKIT / Schwarz Digits Cloud** | EU01, Germany South | **PASS** | Verejný DPA a Service Certificate | Dokumentácia uvádza, že dáta ani query sa neukladajú a nepoužívajú na tréning. |
| **IONOS Cloud / IONOS SE** | Nemecké dátové centrá; stateless Model Hub | **PASS pre stateless Model Hub** | DPA je začlenený do podmienok; verejná dokumentácia | Prompty a výstupy sa nezapisujú do trvalej úložnej infraštruktúry; zostávajú prevádzkové metadá. Dokumentácia hovorí o konci `session`, nie presne o konci `request`. |
| **Scaleway SAS** | Paris, Francúzsko | **FAIL strict ZDR** | Verejný DPA a Generative APIs Privacy Policy | V bežnej prevádzke sa správa takmer ako ZDR, ale pri chybách alebo podozrenom zneužití môže zostať HTTP request až dva týždne; anonymné metadá sa môžu uchovávať šesť mesiacov. |
| **Nebius Token Factory / Nebius B.V.** | Modely v EÚ vo Fínsku/Francúzsku alebo dedicated endpoint v EÚ | **PASS only when enabled** | Verejný DPA | Predvolene ukladá prompty a výstupy pre speculative decoding. ZDR ich vypne; regionálne spracovanie treba overiť pre konkrétny model alebo dedicated endpoint. |
| **Mistral AI** | `api.eu.mistral.ai`; EÚ a EFTA | **PASS after approval** | DPA je dostupný v Data Processing Addendum | Len pre oprávnené organizácie na platenom Scale pláne a podporované stateless API. Nevzťahuje sa na Agents, Batch, Conversations, Libraries, Files, Vibe Work ani Labs modely. |
| **OpenAI API / OpenAI Ireland Ltd.** | EU (EEA + Švajčiaro) cez `eu.api.openai.com` | **PASS after approval** | DPA; schválenie a retention amendment | ZDR je dokumentované pre schválené a podporované endpointy a modely. Konkrétny endpoint a feature treba overiť v aktuálnej tabuľke ZDR. |
| **Anthropic / Anthropic Ireland Limited** | EÚ/EEA regionálne možnosti cez podporované platformy | **PASS after approval** | ZDR sa aktivuje pre konkrétnu organizáciu; regionálne a zmluvné podmienky závisia od cesty | Fable 5, Fable 5.1, Mythos 5 a Mythos 5.1 majú 30-dňovú retenciu; ZDR je dostupné len po výslovnom autorizovaní. EFS má customer-controlled storage a spúšťa sa v fázach. |
| **xAI / xAI Corp** | Defaultný global endpoint nezaručuje región; existuje samostatný US endpoint | **PASS when enabled** | Verejný xAI DPA | ZDR je self-serve na úrovni celého teamu. Predvolene sa API requesty a odpovede uchovávajú 30 dní; ZDR túto retenciu vypne a blokuje stateful Responses, Files, Collections, Batch, Deferred completions a uložené image/video výstupy. |
| **Kimi / Moonshot AI PTE. LTD.** | Citovaný ZDR dokument neurčuje oblasť spracovania | **PASS after approval** | DPA nebola overená v citovaných zdrojoch | Enterprise ZDR na požiadanie: prompty a odpovede sa mažú po dokončení requestu a enterprise dáta sa netrénujú. Priame nahrávanie obrázkov/videa, tretie-party konektory a prevádzkové dáta sú mimo ZDR. |

## EÚ poskytovatelia

Výsledok nie je hodnotením poskytovateľov. Je to mapa produktových profilov podľa zvolených kritérií.

**OVHcloud, STACKIT a IONOS** ponúkajú jednoduché štandardné inference profily s európskym spracovaním a rôznym rozsahom ZDR. Neznamená to, že všetky časti ich portfolia sú ZDR-eligible. Batch, Files, stateful collections alebo iné API môžu mať iné pravidlá.

**Scaleway** ukazuje, prečo samostatné označenie ZDR môže byť v praxi nepresné. Ak poskytovateľ ponechá request po chybe alebo pri podozrenom zneužití, prísne ZDR neplatí ani pri bežnom nastavení.

**Nebius** dáva explicitnú technickú kontrolu, ale predvolené správanie nie je ZDR. Ani tu je rozhodujúca konfigurácia, nie názov produktu.

**Mistral** ukazuje ďalšiu hranicu: ZDR môže byť dostupné iba po schválení a iba pre vybrané stateless API. „EU endpoint“ zároveň neznamená automaticky iba členské štáty EÚ, ak dokumentácia zahŕňa EFTA alebo niektoré podmienky umožňujú ďalšie spracovanie.

## OpenAI, Anthropic a xAI

### OpenAI

**OpenAI je iný prípad, ale pre zákazníkov, ktorí spĺňajú podmienky, je to významné.** ZDR nie je iba retenčný prepínač. Je to vstupná podmienka, ktorá umožňuje používať frontier modely bez štandardného ukladania promptov a odpovedí na podporovaných endpointoch. OpenAI najprv posúdi žiadosť zákazníka a následne schváli konkrétny organization alebo project setup.

Podľa OpenAI DPA je OpenAI Ireland Ltd. contracting entity pre zákazníkov s domicilom v EHP alebo vo Švajčiarsku. To neznamená, že všetky dáta fyzicky spracúva v Írsku. EÚ region a ZDR treba posudzovať osobitne.

### Anthropic

**Anthropic** ide opačným smerom. Claude API má ZDR pre konkrétnu organizáciu, ktorý sa aktivuje cez sales. ZDR sa nevztahuje automaticky na všetky nové organizácie. Fable 5, Fable 5.1, Mythos 5 a Mythos 5.1 majú 30-dňovú retenciu a nie sú dostupné pod ZDR, pokiaľ Anthropic výslovne neudelí výnimku.

Anthropic preto v septembri 2026 oznámil Enterprise Frontier Safeguards. Zákazník si ukladá monitoringové dáta vo vlastnej cloudovej infraštruktúre, automatizované systémy analyzujú riziká a zákazník dostáva signály; personál Anthropicu nemá prístup k obsahu. Bez EFS môžu oprávnení zákazníci používať ZDR na Fable 5 a Fable 5.1. EFS sa má spúšťať v fázach, takže ide o novú a zatiaľ postupne dostupnú architektúru, nie o všeobecné ZDR Anthropicu.

Anthropic tiež uvádza, že pri označení obsahu systémom môže jeho inputs a outputs zostať uložené aj pri ZDR. Túto výnimku nemožno prehliadnuť.

### xAI

**xAI** má podobne self-serve ZDR, ale tentokrát na úrovni celého tímu. Všetky API kľúče v tíme musia používať ZDR; nemožno ho zapnúť iba pre jeden kľúč. ZDR blokuje stateful Responses API, Files, Collections, Batch, Deferred completions a uložené image/video výstupy. API requesty a odpovede sú predvolene uchovávané 30 dní; ZDR túto retenciu vypne. Defaultný global endpoint nezaručuje oblasť spracovania; samostatný US endpoint existuje, ale má užší modelový a funkčný rozsah.

## Veľké čínske modely

Pri veľkých čínskych modeloch sa nedá odpovedať jednou spoločnou známkou:

- **Kimi / Moonshot AI** publikuje ZDR pre enterprise zákazníkov na požiadanie a nezadržiava prompty ani odpovede po dokončení requestu. Dokumentácia neuvádza oblasť spracovania a nezahŕňa priame nahrávanie obrázkov alebo videí, tretie-party konektory ani prevádzkové logy. Je to silné ZDR, ale nie dôkaz EÚ suverenity.
- **DeepSeek** politika uvádza spracovanie v Číne pre vlastné služby DeepSeek a môže uchovávať údaje počas existencie účtu. Politika zároveň nevyjasňuje spracovanie údajov zákazníkov odovzdaných cez API. V našom audite preto používame stav `unproven`, nie definitívny FAIL. Vypnutie používania dát na zlepšovanie modelu, ak je k dispozícii, nie je ZDR.
- **Qwen cez Alibaba Cloud Model Studio** deklaruje, že zákaznícke dáta nepoužíva na tréning a šifruje ich AES-256. Dokumentácia zároveň uvádza, že Model Studio ukladá dáta generované modelom a aplikáciou. Frankfurt endpoint a spracovanie všetkých operácií v EÚ vyžadujú samostatný zdroj; bez neho je európska rezidencia nepreukázaná.
- **MiniMax** pri tejto kontrole som nenašiel dostatok oficiálnych verejných dôkazov pre jednotnú ZDR, DPA a regionálne spracovanie. Nedostatok dôkazu znamená v audite stav `unproven`, nie PASS.
- **Open-weight modely** môžu byť nasadené priamo na vlastnej infraštruktúre alebo cez európskeho inference poskytovateľa. Pri vlastnom hostingu možno dátovú cestu kontrolovať architektúrou, ak sú kontrolované aj prevádzkovanie, úložisko, logy a subdodávatelia. Priama API prvej strany je pritom iná služba než európsky host, ktorý ten istý model spúšťa.

Z toho vyplýva dôležitá rozlika: **modelová pôvodnosť a inference provider nie sú to isté**. Veľký čínsky model môže byť prevádzkovaný v EÚ s vlastným ZDR, ale jeho priama API cesta môže byť v Číne bez vhodnej retenčnej garancie.

## Ako by som poskytovateľa filtroval

Nie ako návod na zapnutie služby, ale ako poradie rozhodovania:

1. **Dáta.** Najprv rozlišujem dáta podľa typu a citlivosti. Následne určím, či ide o osobné údaje alebo osobitné kategórie osobných údajov podľa článku 9 GDPR. Toto rozhodne, či vôbec smú poskytovateľa použiť.
2. **Hranica.** Určím, kam smú dáta ísť a kde musia zostať. Súkromné alebo citlivé dáta, ktoré nemajú opustiť môj zašifrovaný disk, neposielam do inference služby len preto, že poskytovateľ sľubuje ZDR.
3. **Endpoint.** Neoverujem značku, ale konkrétny endpoint, model a režim. Stateless synchronous inference môže mať iné vlastnosti než Batch, Files, Agents alebo stateful collections.
4. **Zmluva.** Overím DPA, úlohu spracovateľa, retenčné výnimky, podmienky spracovania subdodávateľmi a ďalšie dôležité body pred spracovaním produkčných dát.
5. **Dôkaz.** Porovnám technickú dokumentáciu, aktuálne nastavenia a zmluvu. Marketingové označenie nestačí.

Verejné dáta môžu mať inú cestu. Môžu byť zámerne v bežnom cloude, aby boli dostupné, indexovateľné a použiteľné vo vyhľadávaní. To neznamená, že do cloudu patrí všetko. Súkromné údaje môžu zostať na zašifrovanom disku a inference sa pre ne rieši iným spôsobom.

## ZDR, DPA a GDPR nie sú tri náhrady

Poskytovateľ môže mať ZDR, ale bez vhodnej DPA môže chýbať zmluvný rámec potrebný na spracovanie. Právny základ sa však určuje samostatne podľa článku 6 GDPR. Poskytovateľ môže mať DPA, ale bez ZDR môže spracúvať dáta dlhšie, než je potrebné. A poskytovateľ môže mať oboje, ale klient mu stále posiela dáta, ktoré by nemal dostať.

Dátová suverenita sa preto nekončí výberom „európskeho“ cloudu. Vzniká z celého reťazca: klasifikácia dát, miesto spracovania, technická retencia, zmluvná zodpovednosť a spôsob, akým organizácia dokazuje, že tieto veci naozaj platia.

V tomto audite je najdôležitejšia jedna veta: **ZDR nie je všeobecná vlastnosť poskytovateľa. Je to vlastnosť konkrétnej cesty dát cez konkrétnu službu.**

## Zdroje

Zdroje boli overené k 24. 9. 2026. ZDR a regionálne možnosti sa môžu meniť, preto je potrebné pri produkčnom použití overiť aktuálnu dokumentciu a konkrétny účet.

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
- [OpenAI — Offering Zero Data Retention for frontier models](https://openai.com/index/offering-zero-data-retention-for-frontier-models/)
- [OpenAI — Data controls in the OpenAI platform](https://developers.openai.com/api/docs/guides/your-data)
- [OpenAI — Introducing data residency in Europe](https://openai.com/index/introducing-data-residency-in-europe/)
- [Anthropic — API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention)
- [Anthropic — Enterprise Frontier Safeguards](https://www.anthropic.com/news/enterprise-frontier-safeguards)
- [xAI — API Security and Zero Data Retention](https://docs.x.ai/developers/faq/security)
- [xAI — Data Processing Addendum](https://x.ai/legal/data-processing-addendum)
- [Kimi — Zero Data Retention](https://platform.kimi.ai/docs/guide/zero-data-retention)
- [Moonshot AI — Kimi OpenPlatform Terms of Service](https://platform.kimi.ai/docs/agreement/modeluse)
- [DeepSeek — Privacy Policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)
- [Alibaba Cloud Model Studio — Security certifications and privacy](https://www.alibabacloud.com/help/en/model-studio/privacy-notice)
- [EUR-Lex — GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
