/* This function changes the map and barchart when a different year in dropdown-menu is selected */
function yearFunction(year) {

    makeMap(data, window.vote, year)

    currentYear = year;

    // make list with country and voterTurnout
    turnout = []
    allCountries = Object.keys(window.vote)
    for (var i = 0; i < allCountries.length; i++) {
        turnout.push([allCountries[i], window.vote[allCountries[i]][year]])
    };

    // make list with country and VAP turnout
    vapTurnout = []
    for (var i = 0; i < allCountries.length; i++) {
        vapTurnout.push([allCountries[i], window.vap[allCountries[i]][year]])
    };

    // if button pushed change barchartdata
    if (d3.select("#turnoutRadioButton")._groups["0"]["0"].checked) {
        barChart(year, turnout)
    }
    else {
        barChart(year, vapTurnout)
    }
};
