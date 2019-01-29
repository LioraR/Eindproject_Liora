// change barchart if year changes
function changeBarchart(){
  var currentYear = "2014";

  // the first barchart starts with year 2014
  year = "2014";
  d3.select(".radioButtons").on("change", function() {
    yearFunction(currentYear);
  });


  turnout = [];
  allCountries = Object.keys(window.vote)
  for (var i = 0; i<allCountries.length; i++) {
    turnout.push([allCountries[i], window.vote[allCountries[i]][year]])
  };

  barChart("2014", turnout)
};





function barChart(year, dataBar) {

  if (year == undefined){
    year = "2014";
  };

// dimensions chart
barWidth = (width - 2 * margin.top) / Object.keys(dataBar).length;

// create svg barchart
var g = d3.select("#barChart");

// countries on x-as
var xScale = d3.scaleBand()
    //.domain([0, allCountries.length])
    .range([margin.left, width/2 - (3*margin.right)])
    .domain(dataBar.map(function(d) { return d[0]; }));

// voter percentage on y-as
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height - 2 * margin.bottom, margin.top]);

// delete axis when other year selected
g.selectAll(".axis").remove();

// make y-as
var yAxis = d3.axisLeft(yScale);
g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + [margin.top, 0] + ")")
    .call(yAxis);

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
    return yScale(d[1]);
  })
  .attr("x", function(d, i) {
    return xScale((d[0]))
  })
  .attr('width', barWidth/3)
  .attr('height', function(d){
    return height - 2 * margin.bottom - yScale(d[1])
  })
  .merge(bars)
  .attr('y', function(d, i) {
    return yScale(d[1]);
  })
  .attr('height', function(d){
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
  });

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
