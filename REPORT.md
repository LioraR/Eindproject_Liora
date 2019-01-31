De link naar mijn filmpje: https://drive.google.com/file/d/1PWiZrigF6_aZ0mf9aiiAdQda4mNFuW-b/view



Mijn website geeft een beeld van het opkomstpercentage voor de verkiezingen van het Europees Parlement en hoe vrij mensen zijn binnen een specifiek land. De onderzoeksvraag luidt dan ook: “In hoeverre is er een verband tussen de politieke vrijheid en het opkomstpercentage van de Europese Parlement?”

Op de website worden zes visualisaties weergegeven. De kaart van Europa geeft het opkomstpercentage weer en deze wordt geupdate als een ander jaar in het dropdown menu of een andere button (VAP turnout) is geselecteerd. Als een land op de kaart wordt aangeklikt dan zal de donut chart en twee linecharts zichtbaar worden. De donut chart bevat het opkomstpercentage, de ongeldige stemmen en het percentage dat niet is komen stemmen. De eerste linechart geeft een overzicht van het opkomstpercentage over de jaren en de tweede laat de vrijheid (freedomHouse) over de jaren zien. Daarnaast is er nog een scatterplot die het verband tussen de vrijheid in een land en het opkomstpercentage onderzoekt. Verder is er een barchart die het opkomstpercentage van landen laat zien en veranderd wanneer een ander jaar of een van de andere button (VAP turnout) wordt geselecteerd. Bij VAP opkomstpercentage wordt gekeken naar het aantal mensen die oud genoeg zijn om te mogen stemmen terwijl bij het opkomstpercentage gekeken wordt naar wie zich hebben geregistreerd als stemmers.

![image](https://user-images.githubusercontent.com/44025069/52066436-d9175900-2578-11e9-8fff-4f5a62dfadf5.png)


## mapstructuur
De data van freedomhouse, ongeldige stemmen, vap-opkomstpercentage en het opkomstpercentage worden allemaal ingeladen in een csv bestand en via python omgezet naar een jason bestand. In de map data staan alle deze vier bestanden in zowel de map CSV, jason en python en daarnaast is er nog een kaart van europa die wordt ingeladen als json (europe.json). In de map docs staat de foto die ik heb gebruikt voor de homepagina en in de map styles is de style.md te vinden en het css bestand. De javascript bestanden staan allemaal in de map scripts.

## code uitleg  
De javascript code voor deze visualisaties zijn allemaal in verschillende files gezet. Naast de code voor een specifieke visualisatie is er main bestand, een d3-tip bestand en een bestand voor het update van de jaren. De d3-tip zorgt ervoor dat we kunnen hover over de data en deze dan zichtbaar wordt. Ik heb een tooltip gebruikt voor de kaart, de barchart, de scatterplot en de linecharts. De waardes van het opkomstpercentage, de ongeldige stemmen en het opkomstpercentage van de niet-stemmers wordt in de donut chart ook weergegeven als je er met de muis over heen gaat. In het main bestand worden verschillende functies aangeroepen zoals makemap, changebarchart en de scatterplot. Daarnaast worden er in datzelfde bestand knoppen aangemaakt waaronder de informatiebuttons, de buttons op de homepage en de radiobuttons (VAP turnout vs turnout).

In de year functie zullen de kaart en de barchart als zodanig worden veranderd, in diezelfde functie wordt ook de barchart upgedate bij het aanklikken van de radiobutton van de VAP-turnout. Binnen barchart.js zijn er twee functies namelijk voor het update van de barchart en voor het aanmaken van de barchart.

# kaart europa
De opkomst bij de Europese parlementsverkiezingen van 2014 verschijnen als eerst op de kaart van Europa. Wanneer een ander jaar in het vervolgkeuzemenu wordt geselecteerd, wordt de kaart dienovereenkomstig bijgewerkt. De kaart heeft meerdere interactieve functies, zoals over de kaart zweven en vervolgens het opkomstpercentage zien. De kaart is verder een gekoppelde weergave via de on click functie naar twee lijndiagrammen en een donut chart. Deze worden allemaal geupdate als een ander land is geselecteerd.

# Barchart
Het opkomstpercentage van de verkiezingen voor het Europees Parlement in elk land is zichtbaar en wanneer een ander jaar wordt geselecteerd in het vervolgkeuzemenu, wordt het staafdiagram bijgewerkt. Het is ook mogelijk om op de radiobutton van de VAP-turnout te klikken. De opkomst voor de stemgerechtigde leeftijd (VAP) is een percentage dat wordt berekend door te kijken naar de leeftijd van de stemgerechtigde leeftijd in vergelijking met de mensen die hebben gestemd. Integendeel, de opkomst van de kiezer wordt gedefinieerd als een percentage van de mensen die hebben gestemd uit de stemgerechtigde bevolking. De populatie met een niet-staatsburgerschap wordt niet meegeteld in de telling van de opkomst van de kiezer.

# Donut chart
Het donut chart wordt bijgewerkt wanneer er op een land op de kaart geklikt wordt en wanneer een jaar in het vervolgkeuzemenu is geselecteerd. U kunt met de muis over het ringdiagram bewegen en vervolgens worden het aantal ongeldige stemmen, de opkomst en het percentage mensen dat niet heeft gestemd weergegeven.

# scatterplot
De punten in de scatterplot vertegenwoordigen alle verkiezingsresultaten per land per jaar. De kleuren vertegenwoordigen meerdere landen en meer informatie wordt getoond als de muis boven de punten wordt gehouden. Een scatterplot is bedoeld om verschillende soorten correlaties vast te stellen en volgens onze onderzoeksvraag willen we zien of er een relatie bestaat tussen de vrijheid van een land en de opkomst van de kiezer. Het freedomHouse varieert van 1 (veel vrijheid) tot 4 (geen vrijheid). In Europa is er veel vrijheid, dus het is moeilijk om een aantal correlaties vast te stellen.

# linechart freedomHouse
Het lijndiagram geeft de hoeveelheid vrijheid in de loop van de jaren in een bepaald land weer en het wordt aangepast als een nieuw land op de kaart van Europa wordt geselecteerd. The Freedom House is een onafhankelijke organisatie die de democratie en vrijheid over de hele wereld analyseert en de schaal voor de data loopt van 1 (veel vrijheid) tot 4 (geen vrijheid).

# linechart opkomstpercentage
Dit lijndiagram toont het opkomstpercentage in de loop van de jaren in een bepaald land en wordt bijgewerkt als een ander land wordt geselecteerd op de kaart. Het opkomstpercentage wordt gedefinieerd als het percentage mensen dat heeft gestemd uit de voor stemmingen in aanmerking komende bevolking. De opkomst in veel landen is in de loop der jaren afgenomen, maar in 1984 namen minder landen deel aan de verkiezingen voor het Europees Parlement.


## verdedigen beslissingen
Deze onderzoeksvraag is enigszins veranderd over de tijd aangezien ik er geen goede visualisaties bij kon bedenken. Eerst luiden de onderzoeksvraag: “In hoeverre is er een verband tussen de politieke systemen en het opkomstpercentage van de Europese Parlement?”" Een piechart moest namelijk op 100% uitkomen en daarin kon ik dus niet alle politieke systemen visualiseren. En in de scatterplot kon ik ook geen verband ontdekken aangezien politieke systemen, nominale variabele zijn. Ik wilde wel een verband onderzoeken en heb daarom politieke systemen veranderd in politieke vrijheid. Hoe vrij mensen zich voelen is relevant voor hoe hoog het opkomstpercentage kan zijn.   

Ik had voor een lange tijd maar een javascript bestand en toen ik deze op probeerde te splitsen was dit een uitdaging. Uiteindelijk heb ik besloten dat de variabele in een window.onload te zetten mooier was dan maar een javascript file aanhouden.

Eerste had ik drie pagina's waar er vanuit de navbar doorverwezen kon worden. Ik had echter maar weinig geschreven in mijn referentiepagina waardoor ik de tekst hiervan toe heb gevoegd aan mijn homepagina.

In de scatterplot heb ik gebruik gemaakt van kleuren waar geen onderscheid door kleurenblinden in te maken is. Deze keuze heb ik gemaakt aangezien ik niet 28 kleuren kon vinden die ook voor kleurenblinden goed te zien waren.

## Conclusie
Vier weken heb ik gewerkt aan een website met zes visualisaties, een dropdown menu, informatiebuttons en radiobuttons. In dit proces heb ik verschillende keuzes gemaakt die ik hierboven heb uitgelegd. Het antwoord op de onderzoeksvraag is niet eenduidig. In Europa voelt de bevolking zich al enigszins vrij (tussen 1 en 2) waardoor het lastig te zien is of vrijheid invloed heeft op het opkomstpercentage.

Vervolg onderzoek kan deze onderzoeksvraag hanteren en dan kijken naar hoe vrijheid invloed heeft op nationale verkiezingen. In de hele wereld is er namelijk meer verschil in politieke vrijheid dan enkel in Europa.

# uitdagingen
Van te voren had ik nog niet goed in mijn hoofd wat ik precies wilde doen. Daardoor is ook in mijn proces.md zichtbaar dat ik soms visualisatie heb gemaakt die ik vervolgens weer anders heb ingericht of vermaakt. Zo was ik van plan eerst een barchart te maken met het vap turnout, het opkomstpercentage en de ongeldige stemmen maar dat heb ik veranderd naar een barchart met het opkomstpercentage.
