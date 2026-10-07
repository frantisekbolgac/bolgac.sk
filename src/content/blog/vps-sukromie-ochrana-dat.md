---
title: "Vlastný server na cudzom počítači: súkromie a ochrana dát na VPS"
description: "Pri prenajatom VPS je root iba časťou príbehu. Ako rozlišujem technický prístup, zmluvné záväzky a kópie, ktoré zostávajú po zmazaní servera."
image: "/blog/vps-sukromie-ochrana-dat/vps-sukromie-ochrana-dat-sk.jpg"
pubDate: 2026-10-07
tags:
  - vps
  - cloud
  - data-sovereignty
  - gdpr
---

*Sú moje dáta na VPS naozaj iba moje?*

**TL;DR:** Na VPS spravuješ vlastný systém, ale infraštruktúru ovláda poskytovateľ. Tvoje dáta preto nie sú automaticky prístupné iba tebe. Šifrovanie pomáha, no šifrovaný disk sám osebe nechráni dáta v pamäti bežiaceho servera. Zmluva určuje, čo poskytovateľ smie robiť; technické riešenie určuje, k čomu sa môže dostať. Pri výbere VPS preto záleží na citlivosti dát, dôveryhodnosti poskytovateľa aj na tom, aké kópie a záznamy zostávajú po zrušení služby.

## Mám vlastný server. Ale čo vlastne vlastním?

Prenajmem si VPS, nainštalujem Linux a prihlásim sa cez SSH. Mám root, môžem inštalovať aplikácie, nastaviť firewall a rozhodovať, čo na serveri pobeží. Je prirodzené začať o ňom hovoriť ako o „vlastnom serveri“.

VPS však beží na fyzickom hardvéri poskytovateľa. Ten spravuje aj virtualizačnú vrstvu — hypervisor, ktorý môjmu serveru prideľuje procesor, pamäť a ďalšie prostriedky. Pod jeho kontrolou zostáva tiež úložisko a sieť.

Root mi dáva kontrolu vo vnútri virtuálneho servera. Poskytovateľ ovláda prostredie, v ktorom tento server beží.

**Akú moc má ten, kto prevádzkuje fyzický hardvér pod mojím prenajatým VPS?**

## Sú moje dáta iba moje?

Pri ochrane dát na VPS sa prelínajú tri otázky. Každá potrebuje vlastnú odpoveď.

**Kto sa k dátam môže dostať?** To závisí od technického riešenia a prístupových oprávnení. Inú ochranu má nešifrovaný disk, inú šifrovaná záloha, ku ktorej poskytovateľ nemá kľúč. Osobitnou otázkou sú dáta v pamäti bežiaceho servera.

**Čo s nimi poskytovateľ smie robiť?** Tu rozhodujú zmluvné podmienky a právne povinnosti. Technická možnosť prístupu sama osebe neznamená oprávnenie čítať obsah. Rovnako zmluvný záväzok dôvernosti neodstraňuje technickú možnosť dostať sa k nemu.

**Čo zostáva uložené a ako dlho?** Okrem aktívneho disku môžu existovať snapshoty, zálohy či prevádzkové záznamy. Zrušenie VPS preto nemusí znamenať súčasné odstránenie všetkých súvisiacich dát.

Tieto rozdiely sú podstatné aj pri čítaní tvrdenia „k vašim dátam nepristupujeme“. Opisuje bežnú prax? Zmluvný záväzok? Alebo technické riešenie, ktoré prístup znemožňuje? Rovnaká veta môže vyjadrovať veľmi odlišnú úroveň ochrany.

Do úvahy vstupuje aj reputácia poskytovateľa. Jeho podnikanie stojí na dôvere zákazníkov a neoprávnený prístup k ich dátam by mohol znamenať stratu klientov, právne následky a poškodenie mena. Má teda aj obchodný dôvod chrániť ich súkromie. Reputačné riziko však samo osebe nezabráni zlyhaniu jednotlivca, bezpečnostnému incidentu ani prístupu na základe zákonnej požiadavky. Je ďalším dôvodom na dôveru, ktorého váha závisí od konkrétneho poskytovateľa.

## Čo môže vidieť poskytovateľ VPS?

Pri dátach na VPS si zvyčajne predstavíme súbory a databázy. Poskytovateľ však môže mať prehľad aj o sieťovej prevádzke a údajoch spojených s naším účtom. Každá z týchto oblastí má iné hranice ochrany.

### Obsah servera

Na nešifrovanom virtuálnom disku sú súbory uložené v čitateľnej podobe. Heslo do Linuxu obmedzuje prihlásenie do systému, ale nechráni pred tým, kto dokáže čítať samotné úložisko. Na získanie obsahu kópie takého disku nemusí poznať moje root heslo.

Obsah môže existovať aj v zálohách a snapshotoch na infraštruktúre poskytovateľa. Ich vytvorenie nevyžaduje prihlásenie do môjho Linuxu — kópiu virtuálneho disku možno urobiť na úrovni úložiska. Preto ma zaujíma aj to, aké kópie poskytovateľ vytvára, kto k nim má prístup a ako dlho ich uchováva.

Šifrovanie disku chráni uložené dáta aj ich kópie, pokiaľ poskytovateľ nemá dešifrovací kľúč. Samostatnou otázkou však zostáva pamäť bežiaceho servera, v ktorej aplikácie pracujú s čitateľnými dátami a kľúčmi. Pri bežnej virtualizácii je hostiteľská vrstva súčasťou prostredia, ktorému v tomto smere dôverujem.

Rozsah prístupu závisí aj od služby. Pri spravovanom serveri môžem poskytovateľovi výslovne zveriť administráciu systému. Pri nespravovanom VPS si ju zabezpečujem sám, no kontrola poskytovateľa nad infraštruktúrou zostáva.

### Sieťová prevádzka

HTTPS a SSH chránia obsah komunikácie pri prenose. Poskytovateľ, cez ktorého sieť spojenie prechádza, však môže vidieť zdrojové a cieľové IP adresy, časovanie či objem prenesených dát. Aj bez čítania obsahu tieto údaje môžu veľa prezradiť o používaní servera.

Dôležité je, kde sa šifrované spojenie končí. Ak HTTPS končí priamo na mojom VPS, samotný prechod cez sieťovú DDoS ochranu nesprístupňuje čitateľný obsah požiadaviek. Ak spojenie ukončuje sprostredkovateľská služba, napríklad reverzný proxy server, tá obsah spracúva a stáva sa ďalšou stranou, ktorej dôverujem.

Zašifrovaný prenos dokumentu na VPS navyše chráni iba cestu. Po prijatí môže aplikácia dokument uložiť a spracovať v čitateľnej podobe.

### Údaje o zákazníkovi

Poskytovateľ má tiež údaje, ktoré mu odovzdám pri registrácii, platbe alebo komunikácii s podporou. Podľa konkrétnej služby môže uchovávať fakturačné údaje, históriu prihlásení či podklady na overenie identity.

Tieto záznamy existujú nezávisle od obsahu môjho servera. Aj keby som na VPS ukladal výhradne zašifrované súbory, poskytovateľ môže vedieť, komu server patrí, kto zaň platí a odkiaľ sa prihlasuje.

**Ochrana obsahu, súkromie prevádzky a anonymita zákazníka sú tri odlišné veci. Každú treba posudzovať samostatne.**

## Šifrovanie pomáha. Rozhoduje však, kde sú kľúče a čitateľné dáta

„Mám to zašifrované“ znie ako hotová odpoveď. Pri VPS však potrebujem vedieť, čo presne šifrujem a pred akým prístupom sa chránim.

### Pri prenose

HTTPS, SSH alebo VPN chránia obsah komunikácie medzi koncami spojenia. Keď dáta dorazia na VPS, aplikácia ich môže dešifrovať a ďalej s nimi pracovať. Ochrana počas prenosu sa tým končí.

VPN navyše presúva časť dôvery ku koncu tunela. Poskytovateľ VPS stále môže vidieť, že s týmto bodom komunikujem, kedy a v akom objeme.

### Pri uložení

Šifrovanie disku, napríklad pomocou LUKS, chráni uložené bloky. Aj počas behu servera zostáva na podkladovom úložisku šifrovaná podoba dát. Odomknutie disku umožní systému čítať a zapisovať cez šifrovaciu vrstvu; neprepíše celý disk do čitateľnej podoby.

Takto sú chránené aj kópie vytvorené zo šifrovaných blokov. Záloha vytvorená kopírovaním súborov zvnútra systému však môže obsahovať už dešifrované dáta. Preto potrebuje vlastné šifrovanie.

Záleží tiež na tom, kto šifrovanie zabezpečuje. Ak poskytovateľ šifruje úložisko a spravuje aj kľúče, chráni ma tým napríklad pri vyradení fyzického disku. Samotné toto opatrenie však nevylučuje jeho prístup k obsahu.

### Pri spracovaní

Ak má aplikácia dokument prehľadať, upraviť alebo poslať jazykovému modelu, spravidla potrebuje jeho čitateľný obsah. Ten sa objaví v pamäti servera. Šifrovanie disku túto pamäť nechráni.

Ani kľúč uložený mimo VPS automaticky nerieši celý problém. Ak ho server počas prevádzky dostane a použije na dešifrovanie, v danom okamihu pracuje s kľúčom aj čitateľnými dátami.

Iná situácia nastáva, keď súbor zašifrujem už na svojom počítači a VPS používam iba ako úložisko. Ak mu kľúč nikdy neposkytnem, na uloženie súboru ho nepotrebuje. Zároveň však nemôže bežným spôsobom prehľadávať ani spracúvať jeho obsah.

**Rozhodujúca otázka teda znie: Kde sa moje dáta objavia v čitateľnej podobe a kto túto vrstvu ovláda?**

### Dá sa chrániť aj pamäť pred poskytovateľom?

Pri bežnej VM môže ten, kto ovláda hostiteľskú vrstvu, zachytiť jej pamäť a hľadať v nej čitateľné dáta alebo dešifrovacie kľúče. Šifrovaný disk túto cestu neblokuje.

Technológie označované ako *confidential computing*, napríklad AMD SEV-SNP a Intel TDX, sú navrhnuté tak, aby túto možnosť obmedzili. Procesor šifruje pamäť virtuálneho servera pomocou hardvérovo spravovaných kľúčov a kontroluje prístup k chránenému prostrediu. Aplikácia vnútri naďalej pracuje s čitateľnými dátami, ale hostiteľský softvér k nim nemá mať priamy prístup.

Dôležitou súčasťou je vzdialená atestácia — kryptograficky overiteľný dôkaz o spustenom prostredí. Externá služba môže tento dôkaz skontrolovať a až potom vydať dešifrovací kľúč. Zákazník tak nemusí zostať iba pri uistení poskytovateľa, že ochranu zapol.

Vyžaduje to však podporovaný procesor, správny firmvér a nastavenie platformy, kompatibilný virtualizačný softvér aj spustenie VM v chránenom režime. Ak na atestácii zakladám vydávanie kľúčov, potrebujem tiež správne nastavené overovanie jej výsledkov. Samotný údaj „server beží na AMD EPYC alebo Intel Xeon“ nestačí.

Táto ochrana má význam tam, kde potrebujem spracúvať citlivé dáta na cudzej infraštruktúre a zároveň obmedziť prístup jej administrátorov. Dôvera sa pritom presúva na hardvér, bezpečnostný firmvér a softvér vo vnútri VM. Zraniteľnosti, chyby aplikácie či únik cez výstupy zostávajú možnými cestami k dátam; dostupnosť servera naďalej ovláda poskytovateľ.

**Confidential computing preto nemožno predpokladať pri bežnom VPS. Musí byť konkrétnou, správne nasadenou a overiteľnou vlastnosťou služby.**

## Európsky server, GDPR a DPA: čo mi skutočne hovoria?

„Dáta zostávajú v Európe“ je užitočná informácia. Sama však neodpovedá na otázku, kto k nim môže pristupovať a za akých podmienok.

Pri výbere služby potrebujem rozlíšiť miesto dátového centra, spoločnosť, s ktorou uzatváram zmluvu, a ďalšie subjekty zapojené do prevádzky. Server môže fyzicky stáť v EÚ, zatiaľ čo administrácia, podpora alebo niektoré spracúvanie údajov prebiehajú inde. Relevantná preto môže byť aj jurisdikcia poskytovateľa a ďalších zapojených spoločností.

### Čo rieši GDPR a DPA?

Ak na VPS spracúvam osobné údaje zákazníkov alebo zamestnancov, vstupujú do hry povinnosti podľa GDPR. Pri typickom firemnom použití rozhodujem o účele spracúvania ja a poskytovateľ hostingu pri ukladaní týchto dát vystupuje ako sprostredkovateľ.

Tento vzťah upravuje zmluva o spracúvaní osobných údajov, bežne označovaná ako DPA. Rieši najmä pokyny na spracúvanie, dôvernosť, bezpečnostné opatrenia, zapojenie ďalších sprostredkovateľov, pomoc pri incidentoch a vrátenie alebo vymazanie dát po skončení služby.

Poskytovateľ pritom môže mať pri rôznych údajoch odlišnú úlohu. Pri obsahu mojej zákazníckej databázy môže byť sprostredkovateľom, zatiaľ čo pri údajoch, ktoré potrebuje na vlastnú fakturáciu, vystupuje ako prevádzkovateľ.

DPA potrebujem mať riadne uzatvorenú. Jej absencia však automaticky nevypína zákonné povinnosti — môže znamenať, že potrebný zmluvný rámec chýba.

### Odbočka: dáta advokátskej kancelárie

Predstavme si, že advokátska kancelária na VPS ukladá spisy alebo prevádzkuje aplikáciu, ktorá prehľadáva klientove dokumenty. Medzi nimi sú návrhy zmlúv, obchodné plány, komunikácia s klientom aj stratégia súdneho sporu.

Podľa [§ 23 zákona o advokácii](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2003/586/20260817) sa mlčanlivosť vzťahuje na všetky skutočnosti, o ktorých sa advokát dozvedel v súvislosti s výkonom advokácie, s výnimkami ustanovenými zákonom. Jej rozsah teda presahuje osobné údaje. Aj dokument firemného klienta bez jediného mena môže obsahovať informácie chránené mlčanlivosťou.

**DPA preto nestačí ako odpoveď na ochranu celého advokátskeho spisu.** Potrebujem vedieť aj to, aký záväzok dôvernosti sa vzťahuje na jeho ostatný obsah a na ľudí, ktorí k nemu môžu pristupovať.

Pri bežnom VPS sa tento problém prejaví veľmi konkrétne. Ak aplikácia otvára dokumenty, ich čitateľný obsah je v pamäti servera. Ak sú disky nešifrované, čitateľný obsah môže byť aj v ich kópiách. Šifrovanie disku pomáha pri ochrane uložených blokov, ale samo osebe neodstráni prístup cez hostiteľskú vrstvu počas spracovania.

Pred nasadením preto potrebujem odpovede na konkrétne otázky:

- Môžu pracovníci poskytovateľa pristupovať k diskom alebo pamäti VM? Za akých okolností, s akým schválením a evidenciou?
- Pokrýva záväzok dôvernosti celý obsah klientskych dokumentov, alebo zmluva rieši iba osobné údaje?
- Kto má prístup k zálohám, kde vznikajú a kedy sa mažú?
- Ako poskytovateľ postupuje pri požiadavke na vydanie dát a kedy môže informovať kanceláriu?

Samotná možnosť prístupu poskytovateľa ešte nedokazuje porušenie mlčanlivosti. Znamená však, že označenie „náš vlastný server“ nie je dostatočným vysvetlením ochrany klientskych spisov.

Slovenská advokátska komora publikovala odporúčania pre nákup a používanie cloudových služieb v [Bulletine slovenskej advokácie 10/2017](https://info.sak.sk/wp-content/uploads/2023/03/BSA_10_2017.pdf). Ide o starší podklad; nenahrádza posúdenie dnešnej konkrétnej služby.

### Právny záväzok a technická ochrana

GDPR a DPA určujú povinnosti a zodpovednosť. Nešifrujú pamäť ani nevytvárajú technickú prekážku prístupu.

Právny rámec má napriek tomu praktickú hodnotu: zaväzuje poskytovateľa, umožňuje kontrolovať plnenie povinností a vytvára základ na nápravu či vyvodenie zodpovednosti. Technické opatrenia zase môžu obmedziť, k akým dátam sa vôbec dokáže dostať. Obe vrstvy sa dopĺňajú.

Osobitnou otázkou sú zákonné požiadavky orgánov. Poskytovateľ môže byť povinný odovzdať určité údaje a za niektorých okolností nesmie zákazníka informovať. Rozsah závisí od príslušného práva a konkrétnej požiadavky; samotné označenie „európsky hosting“ túto možnosť nevylučuje.

**Pri ochrane dát preto potrebujem vedieť nielen to, kde server stojí, ale aj kto službu poskytuje, kto sa podieľa na jej prevádzke a aké záväzky voči mne má.**

## Zmazal som VPS. Zmizli aj moje dáta?

Kliknutím na „zmazať server“ odstránim konkrétny virtuálny počítač. Čo sa stane s jeho diskom, zálohami a ďalšími záznamami, závisí od služby a jej podmienok.

Snapshot môže byť samostatný objekt, ktorý zostane uložený aj po zmazaní servera. Rovnako môžu zostať ďalšie pripojené disky alebo zálohy s vlastnou dobou uchovávania. Pri odchode preto potrebujem skontrolovať všetky úložiská a kópie, ktoré som vytvoril alebo objednal.

### Odstránenie služby a vymazanie dát

Ani odstránenie virtuálneho disku nemusí znamenať okamžité prepísanie jeho obsahu na fyzickom médiu. Úložný systém môže najprv uvoľniť pridelený priestor a definitívne odstránenie zabezpečiť ďalším postupom. Pri vhodne navrhnutom šifrovanom úložisku môže byť súčasťou takého postupu zničenie príslušného kľúča.

Pre zákazníka sú preto dôležité konkrétne odpovede: **Čo sa maže, v akej lehote, akým spôsobom a na ktoré kópie sa tento postup vzťahuje?**

Údaje o účte, faktúry či bezpečnostné záznamy majú samostatný životný cyklus. Niektoré poskytovateľ potrebuje uchovávať aj po ukončení služby, napríklad pre zákonné povinnosti. Ich retenciu nemožno zamieňať s retenciou obsahu servera.

### Kópie, ktoré vznikli mojou prevádzkou

Ďalšie dáta môžu zostať mimo poskytovateľa VPS. Databázu som exportoval na notebook, dokumenty synchronizoval do iného úložiska a zálohy posielal do ďalšieho cloudu. Chybový report mohol zachytiť obsah požiadavky alebo časť dokumentu.

Zmazanie pôvodného servera tieto kópie neodstráni.

Problém môže vzniknúť aj pri obnove: dokument vymažem z aplikácie, ale obnovením staršej zálohy sa do nej vráti. Ak potrebujem zabezpečiť jeho odstránenie, musím vedieť, ako sa vymazanie premietne do záloh a prípadnej obnovy.

**Kontrola nad dátami zahŕňa aj prehľad o tom, kde vznikajú ich kópie a kedy zanikajú. Samotné tlačidlo „zmazať VPS“ tento prehľad nenahrádza.**

## Čo teda na VPS patrí?

Rozhodnutie začína tým, čo na serveri chcem robiť a aké následky by malo sprístupnenie dát cudzej osobe.

Pri verejnom webe je väčšina obsahu určená na zverejnenie. Chrániť však potrebujem administrátorské prístupy, prihlasovacie kľúče a prípadné údaje z formulárov. Verejný obsah neznamená, že na serveri nie je nič dôverné.

Pri firemnej aplikácii môže VPS uchovávať zákaznícke údaje, objednávky alebo interné dokumenty. Tu už výber poskytovateľa, zmluvné podmienky a zabezpečenie patria k rozhodnutiu o tom, komu tieto informácie zverujem.

Pri úložisku záloh môžem hranicu dôvery výrazne posunúť: dáta zašifrujem pred odoslaním a dešifrovací kľúč ponechám mimo VPS. Server potom uchováva kópie, ktorých obsah nepotrebuje poznať.

Pri spracúvaní citlivých dokumentov je situácia náročnejšia. Ak ich aplikácia alebo jazykový model na VPS potrebuje čítať, musím počítať s ich čitateľnou podobou počas spracovania. Podľa požadovanej ochrany môžem zvoliť dôveryhodného poskytovateľa s primeranými záväzkami, overiteľné confidential computing prostredie alebo spracovanie na vlastnej infraštruktúre. Aj tú však musím vedieť bezpečne spravovať.

### Pred nasadením si položím päť otázok

- **Aké dáta tam posielam?** Potrebuje aplikácia celý dokument, alebo jej stačí vybraná časť?
- **Kde sa objavia v čitateľnej podobe?** Na mojom zariadení, na VPS alebo aj v ďalšej službe?
- **Komu tým dávam dôveru?** Poskytovateľovi infraštruktúry, správcovi aplikácie aj prípadným ďalším dodávateľom?
- **Aké kópie vznikajú?** Na diskoch, v zálohách, logoch a monitoringu?
- **Ako odídem?** Dokážem dáta preniesť, odstrániť zostávajúce kópie a zrušiť prístupové údaje?

VPS mi môže dať veľa slobody: vyberám softvér, spravujem systém a rozhodujem o prevádzke. S touto kontrolou preberám aj zodpovednosť za aktualizácie, prístupy, aplikácie a zálohovanie.

**Moje dáta na VPS môžu byť dobre chránené. Potrebujem však vedieť, ktorú ochranu zabezpečujem ja, ktorú poskytovateľ a kde mu stále musím dôverovať.**

V ďalšom článku sa pozrieme na konkrétnych poskytovateľov. Rovnaké otázky položíme ich dokumentácii a zmluvným podmienkam: čo garantujú, čo vysvetľujú a čo zostáva nezodpovedané.
