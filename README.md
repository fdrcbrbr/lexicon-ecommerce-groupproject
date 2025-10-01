# 🏪 E-handelsplattfrom i Next.js

Detta är en gruppövning  där målet är att skapa en **minimalistisk e-handelsplattform**.

Plattformen visar upp ett urval av produkter från ett externt API, är fullt responsiv och ha interaktiva inslag. 
Målet var att få praktisk erfarenhet av att arbeta med Server Components, 
Client Components, statiska och dynamiska routes, hantering av asynkron data och praktiskt agilt arbete i grupp.


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
Syfte: Projektet är en gruppövning där målet är att bygga en minimalistisk e-handelsplattform med Next.js 15 och App Router. 
Fokus ligger på att ge praktisk erfarenhet av Server Components, Client Components, dynamiska och statiska routes, 
asynkron datahantering samt agilt grupparbete.


Teknologier: Projektet använder Next.js 15 (App Router), TypeScript, React, och ett externt API (t.ex. DummyJSON) för produktdata. 
Styling sker med valfri metod (t.ex. Tailwind CSS eller CSS-moduler). Git och GitHub används för versionshantering och samarbete, 
och WAVE för tillgänglighetstestning.


Funktionalitet: Plattformen inkluderar en startsida med produktöversikt och Hero-sektion, produktsidor med dynamiska routes, 
sök- och pagineringsfunktioner, samt en kontaktsida med formulär. Interaktiva element som "Lägg till i varukorg"-knappar 
och notifikationer implementeras som Client Components.


Design och Tillgänglighet: Designen baseras på en valfri mall (t.ex. från Figma eller Frontend Mentor) och anpassas för 
att vara responsiv och tillgänglig enligt WCAG-riktlinjer. WAVE används för att kontinuerligt testa tillgängligheten 
under utvecklingen.


Arbetsflöde: Projektet är uppdelat i 3-4 sprintar (veckovis) med dagliga Scrum-möten, kodgranskningar via Pull Requests, 
och kontinuerlig uppdatering av ett projekthanteringsverktyg (t.ex. GitHub Projects eller Trello). Målet är att arbeta 
agilt och säkerställa tydlig kommunikation och ansvarsfördelning.


Mål och Redovisning: Projektet avslutas med en redovisning där gruppen visar upp funktionalitet och reflekterar över lärdomar. 
Individuella reflektioner fokuserar på tekniska genombrott, utmaningar, och förbättringsmöjligheter för framtida samarbeten.


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
- [React](https://react.dev/)
  React är ett JavaScript-bibliotek för att bygga interaktiva och återanvändbara
  användargränssnitt med hjälp av komponenter, som effektivt uppdaterar endast de
  nödvändiga delarna av sidan tack vare Virtual DOM.
  
- [Next.js 15 (App router)](https://nextjs.org/)
  Next.js är ett React-ramverk som förenklar utvecklingen av moderna webbapplikationer
  genom att erbjuda server-side rendering (SSR), statisk generering (SSG), routning,
  API-stöd och optimering för SEO och prestanda – allt utöver Reacts grundfunktioner.
  
- [WAVE](https://wave.webaim.org/)
  WAVE (Web Accessibility Evaluation Tool) är ett verktyg för att utvärdera
  tillgängligheten på webbplatser, som hjälper utvecklare att identifiera och
  åtgärda problem enligt   riktlinjer som WCAG (Web Content Accessibility Guidelines)
  för att säkerställa att webbinnehåll är tillgängligt för alla användare,
  inklusive personer med funktionsnedsättningar.
  
- [Tailwind](https://tailwindcss.com/)
  Tailwind CSS är ett utility-first CSS-ramverk som gör det möjligt att snabbt designa
  anpassningsbara gränssnitt direkt i HTML med fördefinierade klasser, vilket minskar behovet
  av skräddarsydd CSS och förenklar responsiv och konsekvent styling.
  
- [Lucide](https://lucide.dev/)
  Lucide är ett öppen källkod-bibliotek med enkla, skalbara och anpassningsbara
  ikoner designade för webbprojekt, optimerade för användning
  med ramverk som React och Next.js.
  
- [Shadcn](https://ui.shadcn.com/)
  shadcn/ui är en samling anpassningsbara och tillgängliga React-komponenter,
  byggda med Radix UI och stylade med Tailwind CSS, som gör det enkelt att skapa
  vackra och funktionella gränssnitt direkt i ditt projekt.

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
