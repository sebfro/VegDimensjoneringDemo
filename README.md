## vegbilder-opplasting-web



```bash

npm run dev

# kjører unit-tester

npm run itest

npx playwright install

# Kjører eslint, typescript, export og test

npm run verify

```


Åpne [http://localhost:3000](http://localhost:3000) for å se applikasjonene


Set opp prettier og eslint i webstorm: https://blog.jetbrains.com/webstorm/2016/08/using-external-tools/

Under components mappen er det per dags dato to mapper.

domain mappen er komponenter som enten brukes av en fil eller kun på en side.

atoms er mindre komponenter som gjenbrukes regelmessig. F.eks. knapper.

routes mappen er innholder den øverste komponenten til en ny side.

lib inneholder hjelpe metoder og globale verdier som Urls.

## Utvikling

Flere npm pakker for å tegne grafer ligger i package.json. Vi må bestemme oss for hvilken vi skal bruke og fjerne de andre.
Per dags dato er det recharts som mest sannynlig blir valgt. d3 kan brukes til å gjøre mer avanserte ting. Kan eventuelt
beholdes i tillegg til recharts. Se pakkene under for referanse:
"chart.js": "^4.3.0",
"d3": "^7.8.5",
"react-chartjs-2": "^5.2.0",
"recharts": "^2.7.2",
