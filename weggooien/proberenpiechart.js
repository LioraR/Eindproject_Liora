var data = [30, 30, 30, 30, 30]

var margin = {}
width = 500 - margin.left - margin.right;
height =500 - margin.top - margin.bottom;
radius = width /2;

var arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 50)

var pie = d3.pie()
            .value(function(d) {
              return d;
            });

var svg2 = d3.select("#pie")
             .append("svg")
             .attr('id', 'piechartsvg')
             .attr('width', width)
             .attr('height', height)
             .append('g')
             .attr('transform', "translate(" + width /2 + "," + height /2 + ")")

var g = svg2.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc")

  g.append("path")
  .attr("d", arc)
  .style("fill", "blue")
