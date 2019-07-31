/* eslint-disable no-console */
/*jshint esversion: 6 */
// @ts-check

// eslint-disable-next-line no-unused-vars
import { Graph } from "./graph.js";
import * as d3 from "d3";

/**
 *
 * @param {Graph} graph
 * @param {string} selector="body"
 * @param {Object} params={}
 * @param {number} [params.height = 800]
 * @param {number} [params.nodeRadius = 3]
 */
export function drawGraphLab(graph, selector = "body", vueThis, params = {}) {
  console.log(vueThis);
  let height = params.height || 800;
  let nodeRadius = params.nodeRadius || 3;

  const width = Math.max(...graph.nodes.map(n => n.x)) + nodeRadius;

  let svg = d3
    .select(selector)
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${width + 50} ${height + 50}`);

  let linkType = "paths";
  let paths;

  switch (linkType) {
    case "arrows":
      // define arrow markers for graph links
      svg
        .append("svg:defs")
        .append("svg:marker")
        .attr("id", "end-arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 6)
        .attr("markerWidth", 3)
        .attr("markerHeight", 3)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");
      paths = svg
        .selectAll(".link")
        .data(graph.links)
        .enter()
        .append("svg:path");
      break; // end arrows
    case "lines":
      paths = svg
        .selectAll(".link")
        .data(graph.links)
        .enter()
        .append("svg:line");
      break;
    case "paths":
      paths = svg
        .selectAll(".link")
        .data(graph.links)
        .enter()
        .append("svg:path")
        .attr("stroke-width", 0.75)
        .attr("fill", "none");
  }
  paths.style("stroke", link => link.color).attr("class", "link");

  // Assign an id to each circle based on node type
  function nodeId(node) {
    if (node.phantom) {
      return (
        "phantom-" +
        node.name
          .split(" ")
          .join("-")
          .split("(")
          .join("")
          .split(")")
          .join("")
          .replace(/\//g, "-")
      );
    } else {
      return (
        "circle-" +
        node.name
          .split(" ")
          .join("-")
          .split("(")
          .join("")
          .split(")")
          .join("")
          .replace(/\//g, "-")
      );
    }
  }

  function nodeClass(node) {
    if (node.phantom) {
      return "phantom";
    } else {
      return "cell";
    }
  }

  function radius(node) {
    return node.phantom ? 1 : nodeRadius;
  }

  function nodeName(node) {
    return node.name;
  }

  function nodeColor(node) {
    if (node.phantom) return "#42b983";
    if (node.istree) return "#FFF";
    return "#FFF";
  }

  function nodeStroke(node) {
    if (node.phantom) return "none";
    return "#000";
  }

  function handleMouseOver() {
    // Use D3 to select element, change color and size
    let node = d3.select(this);
    node.attr("r", nodeRadius * 2);

    let d3plus = require("d3plus-tooltip");
    // @ts-ignore: This is a notation that d3plus-tooltip uses
    new d3plus.Tooltip()
      .data([{ name: node.attr("name") }])
      .thead([
        function(node) {
          return node.name;
        }
      ])
      .position("#" + node.attr("id"))
      .render();
  }

  function handleMouseOut() {
    d3.select(this).attr("r", nodeRadius);
    d3.select(".d3plus-tooltip").remove();
  }

  function handleMouseClick() {
    vueThis.cellDetailObject = d3.select(this).attr("name");
  }

  let node = svg
    .selectAll(".node")
    .data(graph.nodes)
    .enter()
    .append("circle")
    .attr("id", nodeId)
    .attr("class", nodeClass)
    .attr("r", radius)
    .attr("name", nodeName)
    .style("fill", nodeColor)
    .style("stroke", nodeStroke)
    .style("stoke-width", 0.5);

  node
    .filter(".cell")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .on("click", handleMouseClick);

  console.log(node);
  console.log(graph.nodes);

  function update() {
    switch (linkType) {
      case "arrows":
        // draw directed edges with proper padding from node centers
        paths.attr("d", function(d) {
          let deltaX = d.target.x - d.source.x,
            deltaY = d.target.y - d.source.y,
            dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
            normX = deltaX / dist,
            normY = deltaY / dist,
            sourcePadding = d.source.phantom ? 1 : nodeRadius,
            targetPadding = d.target.phantom ? 1 : nodeRadius + 2,
            sourceX = d.source.x + sourcePadding * normX,
            sourceY = d.source.y + sourcePadding * normY,
            targetX = d.target.x - targetPadding * normX,
            targetY = d.target.y - targetPadding * normY;
          return "M" + sourceX + "," + sourceY + "L" + targetX + "," + targetY;
        });
        break; // end arrow update
      case "lines":
        paths.attr("x1", d => d.source.x);
        paths.attr("y1", d => d.source.y);
        paths.attr("x2", d => d.target.x);
        paths.attr("y2", d => d.target.y);
        break;
      case "paths":
        paths.attr("d", function(d) {
          let x1 = d.source.x;
          let y1 = d.source.y + radius(d.source);
          let x2 = d.target.x;
          let y2 = d.target.y - radius(d.target);
          //return `M${x1},${y1}L${x2},${y2}`;
          return `M${x1},${y1}C${x1},${y1 + 15},${x2},${y2 - 15},${x2},${y2}`;
        });
        break;
    }

    // update node positions
    node
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });
  }
  update();
}
