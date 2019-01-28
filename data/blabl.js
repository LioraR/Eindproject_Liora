function lineChartVote(country){

  // remove null data in dataset
  var years = Object.keys(vote[country]);

  years.forEach(function(y, i){
    var v = vote[country][years[i]]
    if (vote[country][years[i]] == null) {
      delete vote[country][years[i]]
    }
  });

  // years need to be defined again
  var years = Object.keys(vote[country]);
  var voterTurnout = Object.values(vote[country]);


  // change linechart when select different country
  d3.select("#testID2").remove();

  // create SVG element
  var svgLineVote = d3.select("#lineChart2").append("svg").attr("id", "testID2").attr("height", 550).attr("width", totalWidth/2 - (margin.left + margin.right));

  // scaling
  var min = Math.min.apply(null, years);
  var max = Math.max.apply(null, years);
  var minF = Math.min.apply(null, voterTurnout);
  var maxF = Math.max.apply(null, voterTurnout);

  // scaling x and y-as
  var xScale = d3.scaleLinear()
      .domain([min, max])
      .range([margin.right, width/2.3 - margin.left]);

  var yScale = d3.scaleLinear()
      .domain([minF, maxF])
      .range([height - margin.bottom, margin.top]);

  // make y-as
  var yAxis = d3.axisLeft(yScale);
  svgLineVote.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + [margin.top, 0] + ")")
      .call(yAxis);

  // make x-as
  var xAxis = d3.axisBottom(xScale);
  svgLineVote.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + [0, height - margin.top] + ")")
      .call(xAxis);

  // add label freedomHouse
  svgLineVote.append("text")
      .attr("transform", "translate(" + [width / 4.5, height - margin.bottom / 3] + ")")
      .text("Years");

  // add label percentage Voter Turnout
  svgLineVote.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + [margin.right / 3, height / 3.5 * 2 - margin.left] + ") rotate(-90)")
      .text("Voter Turnout");

  // make line
  var line = d3.line()
            .x(function(d, i) { return xScale(d.years); })
            .y(function(d) { return yScale(d.voterTurnout); })
            .curve(d3.curveMonotoneX);

  testdata = []
  years.forEach(function(y, i){
    if(voterTurnout[i] !== undefined){
      var obj= {};
      obj["years"] = y;
      obj["voterTurnout"] = voterTurnout[i];
      testdata.push(obj)
  }
  })


  var dataset = testdata

  // append the path, bind the data, and call the line generator
  svgLineVote.append("path")
      .datum(dataset)
      .attr("class", "line")
      .attr("d", line);

    // appends a circle for each datapoint
    svgLineVote.selectAll(".dot")
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
          });

          // Set tooltips
        var toolTip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {

                     return "<strong>year: </strong><span class='details'>"
                     + d["years"] + "<br></span>"+ "<strong>Voter Turnout: </strong><span class='details'>" +
                     d["voterTurnout"] +"</span>";
})
          svgLineVote.call(toolTip);

}
