// naam: Liora Rosenberg
// Student number: 11036435
//  this file creates a website that shows a map in with all the voter turnout are depicted


  // scroll down in homepage
  document.documentElement.scrollTop = 2000;

// dimensions
var margin = { top: 50, right: 50, bottom: 50, left: 50 },
      width = screen.width - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom;

              // make title
            //  d3.select("head").append("title").text("Voter Turnout")

var test;
var myFunction;

window.onload = function() {
  var pieCountry = ""
  //var barCountry = ""

// open dropdown menu
  function hoi() {
document.getElementById("myDropdown").classList.toggle("show");
}
myFunction = hoi;

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
}

// Create a dropdown
//var dropdown.append(years)

// function getSelectValue() {
// d3.select("#map > *").remove()
// var selectedValue = document.getElementById("myDropdown").value;
// }
// getSelectValue()

    // distract jasons
    var vote = "EUturnout.json"
    var data = "europe.json"
    var freedomHouse = "freedomHouse.json"
    var invalid = "invalid.json"
    var vap = "vap.json"
    //var final = "final.json"
    var requests = [d3.json(vote), d3.json(data), d3.json(freedomHouse), d3.json(invalid), d3.json(vap)];

    Promise.all(requests).then(function(response) {
        var vote = response[0];
        var data = response[1];
        var freedomHouse = response[2];
        var invalid = response[3]
        var vap = response[4]
        //var final = response[3];
        console.log(vap)

        console.log(freedomHouse)
        //console.log(system)
        console.log(vote)
        console.log(invalid)

        var format = d3.format(",");




        // the colors were picked at this website: http://colorbrewer2.org/#type=sequential&scheme=Blues&n=9
        var color = d3.scaleThreshold()
            .domain([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
            .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)",
                    "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)",
                    "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)", "rgb(3,19,43)"]);

        var svg = d3.select("#map")


        // var svg = d3.select("#map").append("svg")
        //     .attr("width", width)
        //     .attr("height", height)
        //     .append('g')
        //     .attr('class', 'map')


        var projection = d3.geoMercator()
               .scale(width/3)
               .translate([width / 6, (height) *1.5]);

        var path = d3.geoPath().projection(projection);

        makeMap(data, vote);





        function xTest(jaar){
          console.log(jaar);
          console.log(data);
          console.log(vote);

          makeMap(data, vote, jaar)
          pieChart(pieCountry, jaar)


          turnout = []
          console.log(Object.keys(vote))
          allCountries = Object.keys(vote)
          for (var i = 0; i<allCountries.length; i++) {
            turnout.push([allCountries[i], vote[allCountries[i]][jaar]])
            console.log(i)
          }
          console.log(turnout)

          barChart(jaar, turnout)
        }
        test = xTest;

        function makeMap(data, vote, jaar) {

          // create tooltips
          var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {

                var votes = vote[d.properties.NAME][jaar]
                //var votes = Object.values(vote[d.properties.NAME])
                console.log(votes)

                if (votes !== undefined) {
                  // only select countries were data exist
                  return "<strong>Country: </strong><span class='details'>" + d.properties.NAME + "<br></span>" +
                         "<strong>Voter Turnout: </strong><span class='details'>" + votes + "</span>";
                  }

              })

              svg.call(tip);



            if (jaar == undefined){
              jaar = "2014";
            } else {
              // verwijder map
              d3.select("#map > *").remove()
            }
            var IndexbyCountry = {};

            var europe = topojson.feature(data, data.objects.europe).features

          svg.append("g")
              .attr("class", "countries")
              .selectAll("path")
            .data(europe).enter().append("path")
                .attr("d", path)
                .style("fill", function(d) {
                  // if a country is not in the dataset make it white
                  if ((vote[d.properties.NAME] !== undefined) && (vote[d.properties.NAME][jaar] !== undefined)) {
                    return (color(vote[d.properties.NAME][jaar]));
                }
                    return "#A9A9A9"
                })

                .style('stroke', 'white')
                .style('stroke-width', 1.5)
                .style("opacity", 0.8)
                .style("stroke","white")
                .style('stroke-width', 0.3)
                .on('mouseover', function(d) {
                    tip.show(d);

                    d3.select(this)
                        .style("opacity", 1)
                        .style("stroke", "white")
                        .style("stroke-width", 3);
                })
                .on('mouseout', function(d) {
                    tip.hide(d);

                    d3.select(this)
                      .style("opacity", 0.8)
                      .style("stroke", "white")
                      .style("stroke-width", 0.3);
               })
               .on('click', function(d) {
                    d3.select("#chart").selectAll("*").remove().exit()
                    var country = d.properties.NAME;
                    scatterPlot(country)
                    //barChart(country, jaar)
                    lineChart(country)
                    pieChart(country, jaar)
                    lineChartVote(country)
               })

              svg.append("path")
                  .datum(topojson.mesh(europe, function(a, b) { return a.NAME !== b.NAME; }))
                  .attr("class", "names")
                  .attr("d", path);

        };

        // make legend
        legend = svg.selectAll("#map")
          .data([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]).enter()
          .append("g")
          .attr("class", ".legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 800)
            .attr("y", 0)
            .attr("width", 32)
            .attr("height", 20)
            .style("fill", d => color(d))

        // add text to legend
        legend.append("text")
            .attr("x", width - 760)
            .attr("y", 20)
            .text(function(d) {
              return d;
            })

            //var y = system['Austria']['self-government']
            //var x = vote['Austria']["2014"]
            //console.log(x)
            //var data = [x, 100 - x]
            //voterTurnout = data["Voter Turnout"];

            function pieChart(country, jaar) {


              pieCountry = country
              console.log(pieCountry)

              if (jaar == undefined){
                jaar = "2014";
              }
              //else {
              //   // verwijder piechart
              //   d3.select("#pieChart > *").remove()
              // }

            var invalidVote = invalid[country][jaar]
            console.log(invalidVote)
            var turnout = vote[country][jaar];
            console.log(vote[country][jaar])
            var data = [turnout, invalidVote, 100 - turnout - invalidVote]
            console.log(data)

            radius = height /2;

            var arc = d3.arc()
                        .outerRadius(radius)
                        .innerRadius(radius - 200)

            var pie = d3.pie()
                        .value(function(d) {
                          return d;
                        });

            var color2 = d3.scaleThreshold()
                .domain([1, 2, 3])
                .range(["rgb(135,206,250)","rgb(205,17,17)", "rgb(3,19,43)"]);

            var sv = d3.select("#pieChart")
            // var sv = d3.select("#pieChart").append("svg")
            //              .attr('id', 'pieChart')
            //              .attr('width', width/2)
            //              .attr('height', height)
            //              .style('background', 'blue')
            //              .append('g')


                         //.attr('class', 'pieChart')
                         //.attr('transform', "translate(" + width /2 + "," + height /2 + ")")



            var g = sv.selectAll(".arc")
                        .data(pie(data))
                        .enter()
                        .append("a")
                        .attr("transform", "translate(" + [width/4, height/2] + ")")
                        .attr("class", "arc")
                        .on("mouseover", function(d) {

                    // add text
                    var x = d3.select(this)
                              .style("cursor", "pointer")
                              .style("fill", "black")
                              .append("g")
                              .attr("class", "text-group");

                    x.append("text")
                     .attr("class", "text")
                     .text("Votes")
                     .text(function(d) {
                       return d.data;
                     })
                     .attr('text-anchor', 'middle')
                     .attr('dy', '-1em');

                        })
                        .on("mouseout", function(d) {

                      d3.select(this)
                        //.style("cursor", "none")
                        //.style("fill", color(this._current))
                        .select(".text-group").remove();
                      })

              g.append("path")
              .attr("d", arc)
              .style("fill", function(d, i) {console.log(d.data); return color2(i); }
            )

            var x = sv.selectAll("path")
              .data(pie(data))
              .transition()
              .attr("d", arc)

            console.log(x)

            // add text to legend
            var names = ["Voter Turnout", "Invalid Votes", "Not Voted"]

            // make legend
            legend2 = sv.selectAll("pieChart")
              .data([1, 2, 3]).enter()
              .append("g")
              .attr("class", ".legend")
              .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend2.append("rect")
                //.attr("x", 300)
                //.attr("y", 250)
                //.attr("width", 32)
                //.attr("height", 20)
                .attr("x", width - 850)
                .attr("y", 0)
                .attr("width", 32)
                .attr("height", 20)
                //.style("fill", d => color2(d))
                .style("fill", function(d, i) { return color2(i); })


            // add text to legend
            sv.selectAll("textlegend")
                .data(names).enter()
                .append("text")
                .text(function(d) {
                  return d;
                })
                .attr("x", width - 800)
                .attr("y", function(d, i) {

              return i * 20 + 15;

            })


            }






        function barChart(jaar, turnout) {

          console.log(turnout)

          if (jaar == undefined){
            jaar = "2014";
          }
          //pieCountry = country

        //var data = vote[country]
        //console.log(Object.values(data))
        //console.log(data["Voter Turnout"])

        // var years = Object.keys(vap[country])
        // console.log(years)
        //
        // years.forEach(function(y, i){
        //   if (vap[country][years[i]] == null) {
        //     delete vap[country][years[i]]
        //     console.log(vap[country][years[i]])
        //   }
        // })


        // turnout = []
        // console.log(Object.keys(vote))
        // allCountries = Object.keys(vote)
        // for (var i = 0; i<allCountries.length; i++) {
        //   turnout.push([allCountries[i], vote[allCountries[i]][jaar]])
        //   console.log(i)
        // }
        // console.log(turnout)





        //var years = Object.keys(vap["Germany"])
        //var turnout = Object.values(vote[country])
        //var turnout = vote["Germany"][jaar]
        //console.log(turnout)
        //console.log(Object.values(vap["Germany"]))
        //var vapTurnout = Object.values(vap[country])
        //console.log(vapTurnout)
        var vapTurnout = vap["Germany"][jaar]
        console.log(vapTurnout)
        //dataset = [turnout]
        //console.log(dataset)

        // dimensions chart
        barWidth = (width - 2 * margin.top) / Object.keys(data).length;

        // create svg barchart
        g = d3.select("#barChart")

        // var g = d3.select("#barChart").append('svg')
        //     .attr('id', 'barchart')
        //     .attr('width', width/2)
        //     .attr('height', height)
        //     .style('background', 'red')



            // scaling x and y-as
      //var xScale = d3.scaleBand()
          //  .rangeRound([margin.right, height/2 - margin.left])
            //.range([margin.right, width/2 - margin.left])
            //.rangeRound([0, width])


      // countries on x-scale
      //var xScale = d3.scaleBand()
        //.rangeRound([margin.right, height/2 - margin.left])
          //.range([0, width])
          //.domain(sample.map((s) => s.language))

      //var xScale = d3.scaleLinear()
      var xScale =d3.scaleOrdinal()
      //var xScale = d3.scaleBand()
          //.domain([0, allCountries.length])
          .range([margin.left, width/2 - (3*margin.right)])

      xScale.domain(turnout.map(function(d) { return d[0]; }));

      // voter percentage on y-scale
      var yScale = d3.scaleLinear()
          .domain([0, 100])
          .range([height - margin.bottom, margin.top])

      // make y-as
      var yAxis = d3.axisLeft(yScale);
      g.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + [margin.top, 0] + ")")
          .call(yAxis)

      // make x-as
      var xAxis = d3.axisBottom(xScale);
      g.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + [0, height - margin.top] + ")")
          .call(xAxis)

      console.log(xScale("Nederland"))
      //console.log(Object.values(data))
      g.selectAll(".bar")
        .data(turnout)
        //.data(dataset)
        .enter().append("rect")
        .style('fill', function(d) {
            return "rgb(0, 0, 10)";
        })
        // begin op x
        .attr('y', function(d, i) {
          console.log(d[0])
          return yScale(d[1]);
          //return height - margin.top - yScale(d)
        })
        .attr("x", function(d, i) {
          console.log(d)
          //return margin.left + i * width / b.length;
          //return xScale(i) + margin.left;
          return xScale((d[0])[i])
          // /14
        })
        .attr('width', barWidth/25)
        .attr('height', function(d){
          //return yScale(d)
          return height - margin.top - yScale(d[1])
        })
        //.attr("y", height - margin.top)


    }



    // make scatterplot from freedomHouse and turnout
    function scatterPlot(country) {


      // remove null data in dataset
      var years = Object.keys(vote[country])
      console.log(years)

    years.forEach(function(y, i){
      if (vote[country][years[i]] == null) {
        delete vote[country][years[i]]
        console.log(vote[country][years[i]])
      }
    })


    var years = Object.keys(freedomHouse[country])
    console.log(years)

  years.forEach(function(y, i){
    if (freedomHouse[country][years[i]] == null) {
      delete freedomHouse[country][years[i]]
      console.log(freedomHouse[country][years[i]])
    }
  })

      //console.log(vote[country]);
      //console.log(freedomHouse[country]);

      var turnout = Object.values(vote[country]);
      var freedom = Object.values(freedomHouse[country])

      //superlijst= []

      // for (i = 0; i < turnout.length; i++){
      //   obj = {}
      //   obj["turnout"] = turnout[i]
      //   obj["freedom"] = freedom[i]
      //   superlijst.push(obj)
      // }
      //
      // console.log(superlijst);



      grandList = []
      turnout.forEach(function(y, i){
        var obj= [];
        obj["freedom"] = freedom[i];
        obj["turnout"] = turnout[i];

        grandList.push(obj)
      })




      // create svg scatterplot
      var svg3 = d3.select("#scatterPlot")
      // var svg3 = d3.select("#scatterPlot").append('svg')
      //     .attr('id', 'scatterPlot')
      //     .attr('width', width/2)
      //     .attr('height', height)
      //     .style('background', 'red')

      // freedomHouse loopt van 0 tot 4
      var xScale = d3.scaleLinear()
          .domain([0, 4])
          .range([margin.left, width/2.3 - margin.right])

          // voter turnout loopt van 0 tot 100
      var yScale = d3.scaleLinear()
          .domain([0, 100])
          .range([height - margin.bottom, margin.top])

      // make y-as
      var yAxis = d3.axisLeft(yScale);
      svg3.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + [margin.top, 0] + ")")
          .call(yAxis)

      // make x-as
      var xAxis = d3.axisBottom(xScale);
      svg3.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + [0, height - margin.top] + ")")
          .call(xAxis)

          // add label freedomHouse
          svg3.append("text")
              .attr("transform", "translate(" + [width / 4.5, height - margin.bottom / 3] + ")")
              .text("Freedom House")

          // add label percentage Voter Turnout
          svg3.append("text")
              .attr("text-anchor", "middle")
              .attr("transform", "translate(" + [margin.right / 3, height / 3.5 * 2 - margin.left] + ") rotate(-90)")
              .text("Voter Turnout")


      //grandList.push([firstList, secondList])
      svg3.selectAll("circle")
           .data(grandList)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
            return xScale(d.freedom);
            })
            .attr("cy", function(d) {
            return yScale(d.turnout);
            })
            .attr("r", 5)
            .attr("fill", "black")
    }

    function lineChart(country){


      // remove null data in dataset
    var years = Object.keys(freedomHouse[country])

    console.log(freedomHouse[country])
    years.forEach(function(y, i){
      var v = freedomHouse[country][years[i]]
      console.log(v)
      if (freedomHouse[country][years[i]] == null) {
        delete freedomHouse[country][years[i]]
        console.log(freedomHouse[country][years[i]])
      }
    })
    console.log(freedomHouse[country])


      var years = Object.keys(vote[country])
      var freedomHous = Object.values(freedomHouse[country])
      console.log(freedomHouse)
      console.log(years)

      // create SVG element
      var svg_line = d3.select("#lineChart")

      // scaling
      var min = Math.min.apply(null, years)
      var max = Math.max.apply(null, years)
      var minF = Math.min.apply(null, freedomHous)
      var maxF = Math.max.apply(null, freedomHous)

      // scaling x and y-as
      var xScale = d3.scaleLinear()
          .domain([min, max])
          .range([margin.right, width/2 - margin.left])
          //.range([margin.left, width/2 - (3*margin.right)])

      // the highest freedomHouse rating is 1 and the lowest is 4 so the domain ranges from max to min
      var yScale = d3.scaleLinear()
          .domain([maxF, minF])
          .range([height - margin.bottom, margin.top])

      // make y-as
      var yAxis = d3.axisLeft(yScale);
      svg_line.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + [margin.top, 0] + ")")
          .call(yAxis)

      // make x-as
      var xAxis = d3.axisBottom(xScale);
      svg_line.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + [0, height - margin.top] + ")")
          .call(xAxis)

      // add label freedomHouse
      svg_line.append("text")
          .attr("transform", "translate(" + [width / 4.5, height - margin.bottom / 3] + ")")
          .text("Years")

      // add label percentage Voter Turnout
      svg_line.append("text")
          .attr("text-anchor", "middle")
          .attr("transform", "translate(" + [margin.right / 3, height / 3.5 * 2 - margin.left] + ") rotate(-90)")
          .text("Freedom House")

      //var freedomHouse = Object.values(freedomHouse[country])
      //console.log(freedomHouse)

      console.log(Object.values(freedomHouse[country]))
      //var years = Object.keys(vote[country])
      //console.log(years)

      //var freedomHouse = Object.values(vote[country])


      // make line
      var line = d3.line()
                .x(function(d, i) { return xScale(d.years); })
                .y(function(d) { return yScale(d.freedomHous); })
                .curve(d3.curveMonotoneX)

      testdata = []
      years.forEach(function(y, i){
        var obj= {};
        obj["years"] = y;
        obj["freedomHous"] = freedomHous[i];
        testdata.push(obj)
      })
      // var obj = {};
      // obj['years'] = years;
      // obj['freedomHouse'] = freedomHouse;
      // testdata.push(obj)

      var dataset = testdata
      console.log(testdata);
      // [{
      //   "years": 1990,
      //   "freedomHouse": 86
      // }]

      console.log(dataset)
      console.log(vote[country])

      // append the path, bind the data, and call the line generator
      svg_line.append("path")
          .datum(dataset)
          .attr("class", "line")
          .attr("d", line);

          // appends a circle for each datapoint
        svg_line.selectAll(".dot")
        .data(dataset).enter().append("circle")
              .attr("class", "dot") // Assign a class for styling
              .attr("cx", function(d, i) { return xScale(d.years) })
              .attr("cy", function(d) { return yScale(d.freedomHous) })
              .attr("r", 5)
              .on("mouseover", function(d) {
                  toolTip.show(d);

                  d3.select(this)
                    .style("opacity", 1)
                    .style("stroke", "white")
                    .style("stroke-width", 3);

          })
              .on('mouseout', function(d) {
                  toolTip.hide(d);
              })

              // Set tooltips
            var toolTip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {

                    // only select countries were data exist
                    //if (Object.keys(life) !== undefined) {

                         return "<strong>year: </strong><span class='details'>"
                         + d["years"] + "<br></span>"+ "<strong>Freedom House: </strong><span class='details'>" +
                         d["freedomHous"] +"</span>";
        //}
    })
svg_line.call(toolTip);
    }


    function lineChartVote(country){

      // remove null data in dataset
      var years = Object.keys(vote[country])
      console.log(years)

    years.forEach(function(y, i){
      var v = vote[country][years[i]]
      console.log(v)
      if (vote[country][years[i]] == null) {
        delete vote[country][years[i]]
        console.log(vote[country][years[i]])
      }
    })

      var voterTurnout = Object.values(vote[country])
      console.log(voterTurnout)
      console.log(years)

      // create SVG element
      var svg_line2 = d3.select("#lineChart2")

      // scaling
      var min = Math.min.apply(null, years)
      var max = Math.max.apply(null, years)
      var minF = Math.min.apply(null, voterTurnout)
      var maxF = Math.max.apply(null, voterTurnout)

      // scaling x and y-as
      var xScale = d3.scaleLinear()
          .domain([min, max])
          .range([margin.right, width/2.3 - margin.left])
          //.range([margin.left, width/2 - (3*margin.right)])

      var yScale = d3.scaleLinear()
          .domain([minF, maxF])
          .range([height - margin.bottom, margin.top])

      // make y-as
      var yAxis = d3.axisLeft(yScale);
      svg_line2.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + [margin.top, 0] + ")")
          .call(yAxis)

      // make x-as
      var xAxis = d3.axisBottom(xScale);
      svg_line2.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + [0, height - margin.top] + ")")
          .call(xAxis)

      // add label freedomHouse
      svg_line2.append("text")
          .attr("transform", "translate(" + [width / 4.5, height - margin.bottom / 3] + ")")
          .text("Years")

      // add label percentage Voter Turnout
      svg_line2.append("text")
          .attr("text-anchor", "middle")
          .attr("transform", "translate(" + [margin.right / 3, height / 3.5 * 2 - margin.left] + ") rotate(-90)")
          .text("Voter Turnout")

      //var freedomHouse = Object.values(freedomHouse[country])
      //console.log(freedomHouse)

      console.log(Object.values(vote[country]))
      //var years = Object.keys(vote[country])
      //console.log(years)

      //var freedomHouse = Object.values(vote[country])


      // make line
      var line = d3.line()
                .x(function(d, i) { return xScale(d.years); })
                .y(function(d) { return yScale(d.voterTurnout); })
                .curve(d3.curveMonotoneX)

      testdata = []
      years.forEach(function(y, i){
        var obj= {};
        obj["years"] = y;
        obj["voterTurnout"] = voterTurnout[i];
        testdata.push(obj)
      })
      // var obj = {};
      // obj['years'] = years;
      // obj['freedomHouse'] = freedomHouse;
      // testdata.push(obj)

      var dataset = testdata
      console.log(testdata);
      // [{
      //   "years": 1990,
      //   "freedomHouse": 86
      // }]

      console.log(dataset)
      console.log(vote[country])

      // append the path, bind the data, and call the line generator
      svg_line2.append("path")
          .datum(dataset)
          .attr("class", "line")
          .attr("d", line);

          // appends a circle for each datapoint
        svg_line2.selectAll(".dot")
        .data(dataset).enter().append("circle")
              .attr("class", "dot") // Assign a class for styling
              .attr("cx", function(d, i) { return xScale(d.years) })
              .attr("cy", function(d) { return yScale(d.voterTurnout) })
              .attr("r", 5)
              .on("mouseover", function(d) {
                  toolTip.show(d);

                  d3.select(this)
                    .style("opacity", 1)
                    .style("stroke", "white")
                    .style("stroke-width", 3);

          })
              .on('mouseout', function(d) {
                  toolTip.hide(d);
              })

              // Set tooltips
            var toolTip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {

                    // only select countries were data exist
                    //if (Object.keys(life) !== undefined) {

                         return "<strong>year: </strong><span class='details'>"
                         + d["years"] + "<br></span>"+ "<strong>Voter Turnout: </strong><span class='details'>" +
                         d["voterTurnout"] +"</span>";
        //}
    })
svg_line2.call(toolTip);
    }

    }).catch(function(e) {
        throw (e);
    });
};
