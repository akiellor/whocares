$(function() {
  Math.TAU = Math.PI * 2;       // taoday.com

  var w = 500, h = 500;
  var r = Math.min(w, h) * 0.10;

  var people = {akiellor: ["bt", "RapidFTR"], quad: ["bt"], markryall: ["RapidFTR"]};
  var contributions = [{on: "bt", from: "akiellor", to: "quad"},
                       {on: "RapidFTR", from: "akiellor", to: "markryall"}];

  var label_with = function(svg, people) {
    var distribute_on_circle = function(d) {
      var names = d3.keys(people);

      return names.map(function(n, i) {
        return {
          angle: Math.TAU * (i / names.length),
          label: n
        };
      });
    };

    var flip_for_readability = function(text) {
      return text.attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null })
      .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)" : null })
    };

    return svg.selectAll("g")
      .data(distribute_on_circle(people))
      .enter()
        .append("svg:g")
          .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
              + "translate(" + r + ", 0)";
          }).append("svg:text")
            .text(function(d) { return d.label; })
            .attr("class", function(d) {
              return people[d.label].map(function(c) { return "project-" + c; }).join(' ');
            }).call(flip_for_readability);
  };

  var connect = function(svg, contribs) {
    return svg.append("svg:g")
      .selectAll("path")
        .data(contributions)
        .enter().append("svg:path")
        .attr("d", d3.svg.chord().radius(r).startAngle(0).endAngle(Math.TAU / (Math.random() * 10)))
  };

  var center = d3.select("#viz").append("svg:svg")
    .attr("width", w).attr("height", h)
    .append("svg:g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
      .call(label_with, people);
      //.call(connect, contributions);
});
