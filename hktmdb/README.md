# Hvordan starte opp prosjekt

Gå inn i hktmdb > client og skriv `npm install`.

Når alt er installert, gå inn i hktmdb > server og skriv `npm run start`.

Gå så inn i hktmdb > client og skriv `npm run start`, her også.


# **Prosjekt 3 - Dokumentasjon**


hktMDB er en nettside som henter data for filmer og skuespillere fra en database. Her har man mulighet til å søke på filmer eller skuespillere, og se mer detaljert informasjon om det som søkes på. En bruker har mulighet til å lage en bruker og logge inn på nettsiden, som vil gi tilgang til å skrive anmeldelser (reviews) til filmer. Disse vises for andre brukere.


### **Krav til innhold og funksjonalitet**

* Nettsiden har et input felt der en bruker kan skrive i, som vil returnere filmer/personer som matcher det som blir funnet i databasen.
* Resultatene blir vist i en liste, og det vises 5 elementer av gangen. Brukeren kan laste flere elementer ved å trykke på en vis mer-knapp.
* Det er mulighet for å trykke på elementene som lastes inn, og det vil da vises detaljert informasjon om elementet. Disse plasseres i en div under resultatene.
* Det er mulighet for å filtrere resultatene basert på hva som er skrevet inn i input-feltet, sortere etter årstall eller tittel, og å velge mellom hvilket årstall man vil hente data fra.
* Brukeren kan legge inn reviews på filmer de selv velger, der de kan skrive litt om hva de syntes om filmen, en tittel, og en score fra 1 til 10. Brukeren må logge inn før de kan se eller lage reviews.
* Nettsiden er en film/person database, og tematikken til nettsiden er sentrert rundt dette.
* Databasen er installert på virtual machine, og man kan koble seg opp mot den ved å bruke en gitt bolt-adresse.



### **Krav til bruk av teknologi**

#### **Apollo**


Vi valgte å sette opp prosjektet vårt via GRAND-Stack (npm install grand-stack-app), da GRAND-stack kommer med neo4j, apollo og react templates. Vi valgte å bruke Neo4j som backend database, og installerte den på virtual machine. Vi brukte så Apollo til å koble sammen klient og server, og GraphQL for å hente ut data via queries. 

#### **Neo4j**

Neo4j er databasen vår installert på virtual machine. Neo4j er en graph database, som gir oversikt over noder og relasjoner som er i databasen. Dette gjorde det oversiktlig og enkelt å se strukturen til databasen og hva/hvordan vi skulle hente ut data. Neo4j kom innebygd med en eksempel film-database, som var relativt stor i størrelse. Vi valgte å bruke denne for prosjektet vårt, og sentrere tematikken for nettsiden rundt denne.

#### **GraphQL**

Vi valgte å bruke GraphQL som query api. Vi hadde lyst til å prøve en ny teknologi, og etter litt research kom vi fram til at vi ville gå for GraphQL. Syntaksen her var enkel, og lot oss hente data ved bruk av queries og resolvers. Dessuten er GraphQL godt støttet for bruk sammen med Neo4j, og ved å opprette skjemaer for data som skulle hentes ble GraphQL-koden automatisk oversatt til Cypher (via et GraphQL til Cypher execution lag), som er graph query språket Neo4j bruker. Et krav i oppgaven var at data skulle hentes inn dynamisk; vi løste dette ved å bruke fetchMore-hooken fra GraphQL, som lot oss hente neste “rekke” med data, basert på et offset. Slik slapp vi at data som allerede var hentet ble lastet inn på nytt, og vi slapp å lagre dataen i for eksempel en typescript liste. Alt av data hentes altså inn dynamisk.


#### **Mobx**

Valget av komponent for state management ble MobX. Etter å ha lest om både MobX og Redux kom vi fram til at MobX hadde funksjonalitet som passet prosjektet vårt greit. Ved bruk av useObserver-hooken og UseEffect, oppdatere GraphQL spørringer og andre funksjoner for å laste inn data dynamisk fra databasen. 

#### **Auth0**

Andre tredjeparts komponenter vi valgte å ta i bruk var Auth0. Denne komponenten lot oss lage autoriserte brukere, som vi så kunne logge inn med og legge inn data i databasen basert på et access Token. Slik fikk vi implementert funksjonalitet som lar enkelt brukere legge inn og eventuelt slette data unik for deres token. Dette ble reviews for filmer i databasen, som vil igjen vises for andre, men kan kun slettes av de som har laget reviewet. Å implementere denne komponenten tok mye tid og var vanskelig.
