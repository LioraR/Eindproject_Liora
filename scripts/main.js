// naam: Liora Rosenberg
// Student number: 11036435
//  this file creates a website that shows a map in with all the voter turnout are depicted

// dimensions
var margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = screen.width - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

var totalWidth = screen.width;

// start at this hight at vote.html page
document.documentElement.scrollTop = 70;

// define click functions
var selectYear;
var openFunction;
var mapFunction;
var barFunction;
var donutFunction;
var scatterFunction;
var lineFunction;
var lineVFunction;
var button;
var button1;
var button2;


window.onload = function() {
        var pieCountry = "";

        // scroll down in homepage
        function scroll() {
            document.documentElement.scrollTop = 850;
        };

        button = scroll


        function scroll1() {
            document.documentElement.scrollTop = 1650;
        };

        button1 = scroll1


        function scroll2() {
            document.documentElement.scrollTop = 2000;
        };

        button2 = scroll2



        // https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
        // info button at map
        function mapClickFunction() {
            var x = document.getElementById("myDIV");
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        };

        mapFunction = mapClickFunction;

        // info button at bar Chart
        function barClickFunction() {
          var x = document.getElementById("selectBarchart");
          if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
        };

        barFunction = barClickFunction;


        function donutClickFunction() {
          var x = document.getElementById("selectDonutchart");
          if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
        };

        donutFunction = donutClickFunction;

        function scatterClickFunction() {
          var x = document.getElementById("selectScatterplot");
          if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
        };

        scatterFunction = scatterClickFunction;


        function lineClickFunction() {
          var x = document.getElementById("selectLine");
          if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
        };

        lineFunction = lineClickFunction;

        function lineVClickFunction() {
          var x = document.getElementById("selectLineVote");
          if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
        };

        lineVFunction = lineVClickFunction;

        // open dropdown menu
        // https://www.w3schools.com/howto/howto_js_dropdown.asp
        function open() {
            document.getElementById("myDropdown").classList.toggle("show");
        };

        openFunction = open;

        // Close the dropdown menu if the user clicks outside of it
        window.onclick = function(event) {

            if (!event.target.matches('.dropbtn')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        };


        // distract jasons
        var vote = "https://raw.githubusercontent.com/LioraR/Eindproject_Liora/master/data/EUturnout.json"
        var data = "https://raw.githubusercontent.com/LioraR/Eindproject_Liora/master/data/europe.json"
        var freedomHouse = "https://raw.githubusercontent.com/LioraR/Eindproject_Liora/master/data/freedomHouse.json"
        var invalid = "https://raw.githubusercontent.com/LioraR/Eindproject_Liora/master/data/invalid.json"
        var vap = "https://raw.githubusercontent.com/LioraR/Eindproject_Liora/master/data/vap.json"
        var requests = [d3.json(vote), d3.json(data), d3.json(freedomHouse), d3.json(invalid), d3.json(vap)];

        Promise.all(requests).then(function(response) {

                    window.vote = response[0];
                    window.data = response[1];
                    window.freedomHouse = response[2];
                    window.invalid = response[3];
                    window.vap = response[4];

                    var format = d3.format(",");

                    makeMap(window.data, window.vote);
                    selectYear = yearFunction;
                    changeBarchart()
                    scatterPlot()

}).catch(function(e) {
    throw (e);
});
};
