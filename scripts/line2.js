function lineChart(country){

// remove null data in dataset
var years = Object.keys(window.freedomHouse[country]);

years.forEach(function(y, i){
  var v = window.freedomHouse[country][years[i]]
  if (window.freedomHouse[country][years[i]] == null) {
    delete window.freedomHouse[country][years[i]]
  }
});

  var years = Object.keys(window.freedomHouse[country]);
  var freedomHous = Object.values(window.freedomHouse[country]);
  console.log(years)
  console.log(freedomHous)
  console.log(window.freedomHouse)

  // remove linechart when other country is selected
    d3.select("#testID").remove();

  // create SVG element
  var svg_line = d3.select("#lineChart").append("svg").attr("id", "testID").attr("height", 550).attr("width", totalWidth/2 - (margin.left + margin.right));

  // scaling
  var min = Math.min.apply(null, years);
  var max = Math.max.apply(null, years);
  var minF = Math.min.apply(null, freedomHous);
  var maxF = Math.max.apply(null, freedomHous);

  // scaling x and y-as
  var xScale = d3.scaleLinear()
      .domain([min, max])
      .range([margin.right, width/2 - margin.left]);

  // the highest window.freedomHouse rating is 1 and the lowest is 4 so the domain ranges from max to min
  var yScale = d3.scaleLinear()
      .domain([maxF, minF])
      .range([height - margin.bottom, margin.top]);

  // make y-as
  var yAxis = d3.axisLeft(yScale);
  svg_line.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + [margin.top, 0] + ")")
      .call(yAxis);

  // make x-as
  var xAxis = d3.axisBottom(xScale);
  svg_line.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + [0, height - margin.top] + ")")
      .call(xAxis);

  // add label window.freedomHouse
  svg_line.append("text")
      .attr("transform", "translate(" + [width / 4.5, height - margin.bottom / 3] + ")")
      .text("Years");

  // add label percentage Voter Turnout
  svg_line.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + [margin.right / 3, height / 3.5 * 2 - margin.left] + ") rotate(-90)")
      .text("Freedom House");

  // make line
  var line = d3.line()
            .x(function(d, i) { return xScale(d.years); })
            .y(function(d) { return yScale(d.freedomHous); })
            .curve(d3.curveMonotoneX);

  // add only data that is defined
  dataset = []
  years.forEach(function(y, i) {
    var obj= {};
    if(freedomHous[i] !== undefined){
    obj["years"] = y;
    obj["freedomHous"] = freedomHous[i];
    dataset.push(obj)
  }
});

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

                return "<strong>Country: </strong><span class='details'>" + country + "<br></span>" +
                       "<strong>Year: </strong><span class='details'>" + d["years"] + "<br></span>" +
                       "<strong>Voter Turnout: </strong><span class='details'>" + d["freedomHous"] + "</span>";

      })

            svg_line.call(toolTip);
};
