// the colors were picked at this website: http://colorbrewer2.org/#type=sequential&scheme=Blues&n=9
var color = d3.scaleThreshold()
    .domain([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)",
            "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)",
            "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)", "rgb(3,19,43)"]);

var svg = d3.select("#map");

var projection = d3.geoMercator()
    .scale(width / 3)
    .translate([width / 6, (height) * 1.5]);

var path = d3.geoPath().projection(projection);


/* This function makes a map of Europe based on the voter turnout*/
function makeMap(data, vote, year) {

    var svg = d3.select("#map");

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
      });

      svg.call(tip);


    // start with year 2014
    if (year == undefined){
      year = "2014";
    }
    else {
      // change map when year is different
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

          // if a country is not in the dataset make it grey
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
            var country = d.properties.NAME;
            if (vote[d.properties.NAME]) {
              lineChart(country)
              pieChart(country, year)
              lineChartVote(country)
            }
       });

      svg.append("path")
          .datum(topojson.mesh(europe, function(a, b) { return a.NAME !== b.NAME; }))
          .attr("class", "names")
          .attr("d", path);

// make legend again
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
    .style("fill", d => color(d));

// add text to legend
legend.append("text")
    .attr("x", width - 760)
    .attr("y", 17)
    .attr("class", "legendText")
    .text(function(d) {
      return d;
    });

};
