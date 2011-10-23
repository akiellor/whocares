$(function() {
  Math.TAU = Math.PI * 2;       // taoday.com

  var w = h = 500;
  var r = Math.min(w, h) * 0.33;

  var people = [{who: "akiellor", on: ["bt", "RapidFTR"]}, {who: "quad", on: ["bt"]}, {who: "markryall", on: ["RapidFTR"]}];
  var contributions = [{on: "bt", from: "akiellor", to: "quad"},
                       {on: "RapidFTR", from: "akiellor", to: "markryall"}];

  var label_with = function(g, p) {
    var flip_for_readability = function(text) {
      return text.attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null })
      .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)" : null })
    };

    return g.selectAll("g")
      .data(d3.values(p))
      .enter()
        .append("svg:g")
          .attr("transform", function(d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
              + "translate(" + r + ", 0)";
          }).append("svg:text")
            .text(function(d) { return d.label; })
            .attr("class", function(d) {
              return d.projects.map(function(c) { return "project-" + c; }).join(" ");
            }).call(flip_for_readability);
  };

  var connect = function(g, c) {
    console.log(c);
    return g.append("svg:g")
      .selectAll("path")
        .data(c)
        .enter().append("svg:path")
          .attr("class", function(d) { return "project-" + d.on; })
          .attr("d", d3.svg.chord().radius(r));
  };

  var distribute_on_circle = function(p) {
    return _.tap({}, function(rv) {
      _.each(p, function(e, i, l) {
        rv[e.who] = {
          angle: Math.TAU * (i / l.length),
          label: e.who,
          projects: e.on
        };
      });
    });
  };

  var link = function(rp, c) {
    return _.map(c, function(e) {
      return {
        on: e.on,
        source: {
          startAngle: rp[e.from].angle - 0.025,
          endAngle: rp[e.from].angle + 0.025
        },
        target: {
          startAngle: rp[e.to].angle - 0.025,
          endAngle: rp[e.to].angle + 0.025
        }
      };
    });
  };

  var renderable_people = distribute_on_circle(people);
  var chords = link(renderable_people, contributions);

  var center = d3.select("#viz").append("svg:svg")
    .attr("width", "100%").attr("height", "100%")
    .attr("viewBox", "0 0 " + w + " " + h)
    .append("svg:g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
      .call(label_with, renderable_people)
      .call(connect, chords);
});
