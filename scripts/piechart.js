/* This function makes a piechart from the turnout, non votes and invalid votes */
function pieChart(country, year) {

  pieCountry = country;


  if (year == undefined){
    year = "2014";
  };

// remove null data in invalid Vote
if (window.invalid[countries][years] != null) {
  var invalidVote = (window.invalid[country][year]).toFixed(1);
}
else {
  var invalidVote = (window.invalid[country][year]);
}

// define variables with one decimal
var turnout = (window.vote[country][year]).toFixed(1);
var noVote = (100 - turnout - invalidVote).toFixed(1);
var data = [turnout, invalidVote, noVote];

radius = height /2;

var arc = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 200);

var pie = d3.pie()
            .value(function(d) {
              return d;
            });

var color2 = d3.scaleThreshold()
    .domain([1, 2, 3])
    .range(["rgb(135,206,250)","rgb(205,17,17)", "rgb(3,19,43)"]);

// make svg
var sv = d3.select("#pieChart");

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
          });

  g.append("path")
  .attr("d", arc)
  .style("fill", function(d, i) {return color2(i); }
);

// update piechart
var path = sv.selectAll("path")
  .data(pie(data))
  .transition()
  .duration(3)
  .attr("d", arc);


// add text to legend
var names = ["Voter Turnout", "Invalid Votes", "Not Voted"];

// make legend again
sv.selectAll(".legendRect").remove();
sv.selectAll(".legendText").remove();

legend2 = sv.selectAll("#pieChart")
  .data([1, 2, 3]).enter()
  .append("g")
  .attr("class", ".legend")
  .attr("transform", function(d, i) { return "translate(0," + i * 25 + ")"; });

legend2.append("rect")
    .attr("x", width - 850)
    .attr("y", 0)
    .attr("class", "legendRect")
    .attr("width", 32)
    .attr("height", 20)
    .style("fill", function(d, i) { return color2(i); });

// add text to legend
sv.selectAll("legendText")
    .data(names).enter()
    .append("text")
    .attr("class", "legendText")
    .text(function(d) {
      return d;
    })
    .attr("x", width - 810)
    .attr("y", function(d, i) {

  return i * 25 + 15;

});


};
