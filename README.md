# 🏪 E-handelsplattfrom i Next.js


---
## 📦 Innehållsförteckning
- 📖 [Om projektet](#omprojektet)
- f(🗶) [Funktioner](#funktioner)
- ✨ [Teknologier](#teknologier)
- 🛠️ [Installation](#installation)
- 🚀 [Användning](#användning)
- 🧱 [Projektstruktur](#projektstruktur)
- 📝  [Arbetsflöde](#arbetsflöde)
- 🔄 [Sprintplan](#sprintplan)
- 🤝 [Bidra](#bidra)
- 👨‍🏫 [Lärdomar](#lärdomar)
- ™️ [Licens](#licens)
- 📫 [Kontakt](#kontakt)

  ---
  
## Om projektet
📖
Detta är en gruppövning  där målet är att skapa en **minimalistisk e-handelsplattform**.

Plattformen visar upp ett urval av produkter från ett externt API, är fullt responsiv och ha interaktiva inslag. 
Målet var att få praktisk erfarenhet av att arbeta med Server Components, 
Client Components, statiska och dynamiska routes, hantering av asynkron data och praktiskt agilt arbete i grupp.

---

## Funktioner
f(🗶)
- Startsida
- Hero med CTA
- Produktgrid
- Sökfält
- Sidonav med filter
- Kontaktsida med formulär
- Admin sida (skapa/uppdatera/deleta produkter)

---

## Teknologier
✨
- [Next.js 15 (App router)](https://nextjs.org/)
- [WAVE](https://wave.webaim.org/)
- [React](https://react.dev/)

---

## Installation
🛠️
```bash
# Klona repo
git clone https://github.com/BlackestDawn/lexicon-ecommerce-groupproject

# Gå in projektmappen
cd lexicon-ecommerce-groupproject

#Installera beroenden
npm install

#Starta utvecklingsserver
npm run dev
```

---

## Användning
🚀 
* Startsida -> visar produkter + hero
* Om oss -> statisk sida med test och bild
* Produktsida -> visar och filtrerar produkter
* Kontakt -> info + formulär
* Admin -> Hantera produktlista

---

## Projektstruktur
🧱
```
|-- app/
|  |--page.tsx                      # Startsida
|  |--about/page.tsx                # Om oss
|  |--contact/page.tsx              # Kontakter
|  |--products/page.tsx             # Produktgrid
|     |--[id]/page.tsx              # Dynamisk produkts routing
|  |---admin/page.tsx               # Admins landing sida
|     |--conmponents/               # Återanvändbara komponenter
|     |--lib/                       # Action file
|     |--products/page.tsx          # Produktlista
|        |--add-product/page.tsx    # Återanvändbara komponenter
|        |--[id]/page.tsx           # Dynamisk produkts routing
|--components/                      # Återanvändbara komponenter
|--data/                            # Fetching och datahantering
|--hooks/                           # React hooks
|--lib/                             # Utility och Interfaces
```

---

## Arbetsflöde
📝

* Grupparbetat i agila sprintar
* Figma fil för design
* Kanban på Trello
* Featured tickets/brancher på GitHub
* Delade Pull Requests
* Retrospektiv med Miro

---

## Sprintplan
🔄

### Sprint 1 - Grundläggande struktur
* Valt Dummyjson som API för produkter
* Design anpassad på Figma
* Skapat en Nextjs projekt med grundstruktur
* Skapat en GitHub repo med gemensam kontroll över PRs
* Globala filer för design och ramverk stöd
* Fetch av produkter
* Statisk hemsida redo

### Sprint 2 - Dynamisk routing & Interaktion
* Skapat card för produktedetaljer
* Dynamisk routing för id hantering
* Client/Server komponenter för produktsidan
* Skapat en GitHub repo med gemensam kontroll över PRs
* CTA som landar på produktgrid
* Sidonav för filtrering av olika slags produkter

### Sprint 3 - Skapa & Ta bort produkter
* Admin route för produkthantering
* Sida för admins produktlista
* Dynamisk metadata
* Informations sida med kontaktformulär
* CTA som landar på produktgrid
* Formulär för att skapa nya produkter

### Sprint 4 - Slutliga operationer
* Merging av sista features
* Refaktorering
* Granskning av tillgänglighet med WAVE
* Skapat Read_Me
* Användning av olika ramverk

---

## Bidra
🤝

Vill du bidra?

1. Forka projektet
2. Skapa en feature-branch (`git checkout ......`)
3. Commit & push
4. Skicka en Pull Request

---

## Lärdomar
👨‍🏫

* GitHub samarbete
* SCRUM med dagliga standups samt veckans retrospektiv
* Sprint planering med kanban
* 

---

## Licens
™️

Detta projekt är utvecklat i utbildningssyfte och är inte avsett för produktion.

---

## Kontakt
📫
- [Blackest dawn](https://github.com/BlackestDawn)
- [Diskokatten](https://github.com/Discokatten)
- [Looziolooz](https://github.com/Looziolooz)
- [fdrcbrbr](https://github.com/fdrcbrbr)
