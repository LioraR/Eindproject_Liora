// naam: Liora Rosenberg
// Student number: 11036435
//  this file creates a website that shows a map in with all the voter turnout are depicted


// scroll down in homepage
document.documentElement.scrollTop = 2000;

// dimensions
var margin = { top: 50, right: 50, bottom: 50, left: 50 },
      width = screen.width - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom;

var totalWidth = "Total Width: " + screen.width;

var test;
var myFunction;

window.onload = function() {
  var pieCountry = ""

// open dropdown menu
  function open() {
    document.getElementById("myDropdown").classList.toggle("show");
}
myFunction = open;

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



    // distract jasons
    var vote = "EUturnout.json"
    var data = "europe.json"
    var freedomHouse = "freedomHouse.json"
    var invalid = "invalid.json"
    var vap = "vap.json"
    var requests = [d3.json(vote), d3.json(data), d3.json(freedomHouse), d3.json(invalid), d3.json(vap)];

    Promise.all(requests).then(function(response) {

        var currentYear = "2014";

        var vote = response[0];
        var data = response[1];
        var freedomHouse = response[2];
        var invalid = response[3]
        var vap = response[4]

        //console.log(vap)
        //console.log(freedomHouse)
        //console.log(vote)
        //console.log(invalid)

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



        function xTest(year){

          makeMap(data, vote, year)
          // pieChart(pieCountry, year)
          //console.log(d3.select("#turnoutRadioButton")._groups["0"]["0"].checked);
          currentYear = year;

          // make list with country and voterTurnout
          turnout = []
          allCountries = Object.keys(vote)
          for (var i = 0; i<allCountries.length; i++) {
            turnout.push([allCountries[i], vote[allCountries[i]][year]])
          }

          // make list with country and VAP turnout
          vapTurnout = []
          for (var i = 0; i<allCountries.length; i++) {
            vapTurnout.push([allCountries[i], vap[allCountries[i]][year]])
          }

          // if button pushed change barchartdata
          if(d3.select("#turnoutRadioButton")._groups["0"]["0"].checked){
            barChart(year, turnout)
          }

          else {
            barChart(year, vapTurnout)
          }
        }
        test = xTest;





        function makeMap(data, vote, year) {

          // create tooltips
          var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                if (vote[d.properties.NAME]) {
                  if (vote[d.properties.NAME][year]) {
                    var votes = vote[d.properties.NAME][year]
                    return "<strong>Country: </strong><span class='details'>" + d.properties.NAME + "<br></span>" +
                           "<strong>Voter Turnout: </strong><span class='details'>" + votes + "</span>";
                  }

                  // confirm that data is missing
                  else {
                    return "<strong>Country: </strong><span class='details'>" + d.properties.NAME + "<br></span>" +
                           "<strong>Voter Turnout: </strong><span class='details'>" + "No data" + "</span>";
                  };
                }
                else {
                  return "Country not in EU";
                };
              })

              svg.call(tip);


            // always use year 2014
            if (year == undefined){
              year = "2014";
            } else {
              // when year change, change map
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
                  if ((vote[d.properties.NAME] !== undefined) && (vote[d.properties.NAME][year] !== undefined)) {
                    return (color(vote[d.properties.NAME][year]));
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

               // if country is click upon change scatterplot, linecharts and piechart
               .on('click', function(d) {
                    //d3.select("#chart").selectAll("*").remove().exit()
                    //d3.select("#lineChart").selectAll("*").exit().remove();
                    var country = d.properties.NAME;
                    scatterPlot(country)
                    lineChart(country)
                    pieChart(country, year)
                    lineChartVote(country)
               })

              svg.append("path")
                  .datum(topojson.mesh(europe, function(a, b) { return a.NAME !== b.NAME; }))
                  .attr("class", "names")
                  .attr("d", path);

        // make legend
        svg.selectAll(".legendRect").remove();
        svg.selectAll(".legendText").remove();
        legend = svg.selectAll("#map")
          .data([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]).enter()
          .append("g")
          .attr("class", ".legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 800)
            .attr("y", 0)
            .attr("class", "legendRect")
            .attr("width", 32)
            .attr("height", 20)
            .style("fill", d => color(d))

        // add text to legend
        legend.append("text")
            .attr("x", width - 760)
            .attr("y", 20)
            .attr("class", "legendText")
            .text(function(d) {
              return d;
            })

      };



            function pieChart(country, year) {


              pieCountry = country

              if (year == undefined){
                year = "2014";
              }


            // define variables
            var invalidVote = invalid[country][year]
            var turnout = vote[country][year];
            var data = [turnout, invalidVote, 100 - turnout - invalidVote]

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

            // make svg
            var sv = d3.select("#pieChart")

            var g = sv.selectAll(".arc")
                        .data(pie(data))
                        .enter()
                        .append("a")
                        .attr("transform", "translate(" + [width/4, height/2] + ")")
                        .attr("class", "arc")
                        .on("mouseover", function(d) {

                    // show amount of votes
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
                        .select(".text-group").remove();
                      })

              g.append("path")
              .attr("d", arc)
              .style("fill", function(d, i) {console.log(d.data); return color2(i); }
            )

            // update piechart
            var x = sv.selectAll("path")
              .data(pie(data))
              .transition()
              .attr("d", arc)


            // add text to legend
            var names = ["Voter Turnout", "Invalid Votes", "Not Voted"]

            // make legend
            legend2 = sv.selectAll("pieChart")
              .data([1, 2, 3]).enter()
              .append("g")
              .attr("class", ".legend")
              .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend2.append("rect")
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






            // change barchart if year changes
            function changeBarchart(){
              year = "2014";
              d3.select(".radioButtons").on("change", function() {
                xTest(currentYear);
              });


              turnout = []
              allCountries = Object.keys(vote)
              for (var i = 0; i<allCountries.length; i++) {
                turnout.push([allCountries[i], vote[allCountries[i]][year]])
              }

              barChart("2014", turnout)
            }

        changeBarchart()


        function barChart(year, dataBar) {

          if (year == undefined){
            year = "2014";
          }

        // dimensions chart
        barWidth = (width - 2 * margin.top) / Object.keys(dataBar).length;

        // create svg barchart
        var g = d3.select("#barChart")

        // countries on x-as
        var xScale = d3.scaleBand()
            //.domain([0, allCountries.length])
            .range([margin.left, width/2 - (3*margin.right)])
            .domain(dataBar.map(function(d) { return d[0]; }));

        // voter percentage on y-as
        var yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height - 2 * margin.bottom, margin.top])

        // delete axis when other year selected
        g.selectAll(".axis").remove();

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
            .attr("transform", "translate(" + [0, height - 2 * margin.bottom] + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
              return "rotate(-65)"
            });


        var bars = g.selectAll("rect")
                    .data(dataBar);

        bars.enter().append("rect")
          .style('fill', function(d) {
              return "rgb(0, 0, 10)";
          })
          .attr('y', function(d, i) {
            console.log(d[0])
            return yScale(d[1]);
            //return height - margin.top - yScale(d)
          })
          .attr("x", function(d, i) {
            console.log(d[0])
            //return margin.left + i * width / b.length;
            //return xScale(i) + margin.left;
            return xScale((d[0]))
            // /14
          })
          .attr('width', barWidth/3)
          .attr('height', function(d){
            //return yScale(d)
            return height - 2 * margin.bottom - yScale(d[1])
          })
          .merge(bars)
          .attr('y', function(d, i) {
            console.log(d[0])
            return yScale(d[1]);
            //return height - margin.top - yScale(d)
          })
          .attr('height', function(d){
            //return yScale(d)
            return height - 2 * margin.bottom - yScale(d[1])
          })
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

                return "<strong>Country: </strong><span class='details'>" + (d[0]) + "<br></span>" +
                       "<strong>Voter Turnout: </strong><span class='details'>" + (d[1]) + "<br></span>" +
                       "<strong>year: </strong><span class='details'>" + year + "</span>";

      })

            g.call(toolTip);
}

          //.attr("y", height - margin.top)





    // make scatterplot from freedomHouse and turnout
    function scatterPlot(country) {

      // remove null data in dataset
      var years = Object.keys(vote[country])

    years.forEach(function(y, i){
      if (vote[country][years[i]] == null) {
        delete vote[country][years[i]]
      }
    })


    var years = Object.keys(freedomHouse[country])

  years.forEach(function(y, i){
    if (freedomHouse[country][years[i]] == null) {
      delete freedomHouse[country][years[i]]
    }
  })


      var turnout = Object.values(vote[country]);
      var freedom = Object.values(freedomHouse[country])


      grandList = []
      turnout.forEach(function(y, i){
        var obj= [];
        if(freedom[i] !== undefined){
          obj["freedom"] = freedom[i];
          obj["turnout"] = turnout[i];

          grandList.push(obj)
        }

      })


      // create svg scatterplot
      var svg3 = d3.select("#scatterPlot")

      // freedomHouse rating is from 4 untill 0
      var xScale = d3.scaleLinear()
          .domain([0, 4])
          .range([margin.left, width/2.3 - margin.right])

      // voter turnout is in percentage (0-100)
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


      // create circles in scatterplot
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

    years.forEach(function(y, i){
      var v = freedomHouse[country][years[i]]
      if (freedomHouse[country][years[i]] == null) {
        delete freedomHouse[country][years[i]]
      }
    })

      var years = Object.keys(vote[country])
      var freedomHous = Object.values(freedomHouse[country])


      // remove linechart when other country is selected
      if (d3.select("#testID")){
          d3.select("#testID").remove();
      }

      // create SVG element
      var svg_line = d3.select("#lineChart").append("svg").attr("id", "testID").attr("height", 550).attr("width", totalWidth/2 - (margin.left + margin.right))

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

      // make line
      var line = d3.line()
                .x(function(d, i) { return xScale(d.years); })
                .y(function(d) { return yScale(d.freedomHous); })
                .curve(d3.curveMonotoneX)

      // add only data that is defined
      testdata = []
      years.forEach(function(y, i){
        var obj= {};
        if(freedomHous[i] !== undefined){
        obj["years"] = y;
        obj["freedomHous"] = freedomHous[i];
        testdata.push(obj)
      }
    })


      var dataset = testdata
      //.log(testdata);

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

      years.forEach(function(y, i){
        var v = vote[country][years[i]]
        if (vote[country][years[i]] == null) {
          delete vote[country][years[i]]
        }
      })

      var voterTurnout = Object.values(vote[country])


      // change linechart when select different country
      if (d3.select("#testID2")) {
          d3.select("#testID2").remove();
      }

      // create SVG element
      var svg_line2 = d3.select("#lineChart2").append("svg").attr("id", "testID2").attr("height", 550).attr("width", totalWidth/2 - (margin.left + margin.right))

      // scaling
      var min = Math.min.apply(null, years)
      var max = Math.max.apply(null, years)
      var minF = Math.min.apply(null, voterTurnout)
      var maxF = Math.max.apply(null, voterTurnout)

      // scaling x and y-as
      var xScale = d3.scaleLinear()
          .domain([min, max])
          .range([margin.right, width/2.3 - margin.left])

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


      var dataset = testdata

      // append the path, bind the data, and call the line generator
      svg_line2.append("path")
          .datum(dataset)
          .attr("class", "line")
          .attr("d", line);

        // appends a circle for each datapoint
        svg_line2.selectAll(".dot")
        .data(dataset).enter().append("circle")
              .attr("class", "dot")
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
