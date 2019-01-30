  // make scatterplot from freedomHouse and turnout
function scatterPlot() {

  list = [];

  // loop over all datapoints
  for (countries in window.vote){
    for (years in window.vote[countries]){

      //remove if data is null
      if (window.vote[countries][years] != null && window.freedomHouse[countries][years] != null){
        list.push({
          "Country": countries,
          "Year": years,
          "Vote": window.vote[countries][years],
          "freedomhouse": window.freedomHouse[countries][years]
        })
      }
    }
  }

  // remove linechart when other country is selected
  d3.select("#testID3").remove();

  // create SVG element
  var svg3 = d3.select("#scatterPlot").append("svg").attr("id", "testID3").attr("height", 550).attr("width", totalWidth/2 - (margin.left + margin.right));

  // window.freedomHouse rating is from 4 untill 0
  var xScale = d3.scaleLinear()
      .domain([0, 4])
      .range([margin.left, width/2.3 - margin.right]);

  // voter turnout is in percentage (0-100)
  var yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);

  // make y-as
  var yAxis = d3.axisLeft(yScale);
  svg3.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + [margin.top, 0] + ")")
      .call(yAxis);

  // make x-as
  var xAxis = d3.axisBottom(xScale);
  svg3.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + [0, height - margin.top] + ")")
      .call(xAxis);

  // add label window.freedomHouse
  svg3.append("text")
      .attr("transform", "translate(" + [width / 4.5, height - margin.bottom / 3] + ")")
      .text("Freedom House");

  // add label percentage Voter Turnout
  svg3.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + [margin.right / 3, height / 3.5 * 2 - margin.left] + ") rotate(-90)")
      .text("Voter Turnout");


  //add color
  dict ={};
  // the chosen colors are not based on colorblindness
  var color3 = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928", "#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f", "#1b9e77", "#d95f02", "#7570b3", "#e7298a"]

  var allCountries = Object.keys(window.vote)
  console.log(allCountries)
  count = 0;
  allCountries.forEach(function(datapoint, i) {
    if (!(allCountries in dict)){
      dict[allCountries[i]] = color3[count]
      count++
    }
  });


// make legend
legend3 = svg3.selectAll(".legend")
  .data(Object.keys(dict))
  .enter()
  .append("g")
  .attr("class", ".legend")
  .attr("transform", function(d, i) { return "translate(0," + i * 17 + ")"; });

  legend3.append("rect")
    .attr("x", width - 980)
    .attr("y", 10)
    .attr("width", 26)
    .attr("height", 15)
    .style("fill", function(d, i) {
      return (Object.values(dict)[i])
    });

    //add text to legend
    legend3.append("text")
      .attr("x", width - 950)
      .attr("y", 22)
      .text(function(d){
        return d;
      });


  // create circles in scatterplot
  svg3.selectAll("circle")
       .data(list)
       .enter()
       .append("circle")
       .attr("cx", function(d) {

        return xScale(d.freedomhouse);
        })
        .attr("cy", function(d) {
        return yScale(d.Vote);
        })
        .attr("r", 5)
        .attr("fill", function(d){
          return dict[d.Country]
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

              return "<strong>Year: </strong><span class='details'>" + d.Country + "<br></span>" +
                     "<strong>Year: </strong><span class='details'>" + d.Year + "<br></span>" +
                     "<strong>Voter Turnout: </strong><span class='details'>" + d.Vote + "<br></span>" +
                     "<strong>Freedom: </strong><span class='details'>" + d.freedomhouse + "</span>";


    });

          svg3.call(toolTip);

};
