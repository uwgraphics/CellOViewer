/* eslint-disable no-console */
/*jshint esversion: 6 */
// @ts-check

// eslint-disable-next-line no-unused-vars
import { Graph, strifyNodes } from "./graph.js";
import * as d3 from "d3";

/**
 *
 * @param {Node} layout
 * @param {Object} selector
 * @param {number} width
 * @param {number} height
 */
export function drawGraph(layout, selector, width, height) {
  //Placeholder for D3-DAG library version to be placed here
}

/**
 *
 * @param {Graph} graph
 * @param {string} selector="body"
 * @param {Object} params={}
 * @param {number} [params.height = 800]
 * @param {number} [params.nodeRadius = 3]
 */
export function drawGraph2(graph, selector = "body", params = {}) {
  let height = params.height || 800;
  let nodeRadius = params.nodeRadius || 3;

  const width = Math.max(...graph.nodes.map(n => n.x)) + nodeRadius;

  let svg = d3
    .select(selector)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

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
        .attr("stroke-width", 1)
        .attr("fill", "none");
  }
  paths.style("stroke", link => link.color).attr("class", "link");

  function nodeColor(node) {
    if (node.phantom) return "#42b983";
    if (node.istree) return "#FFF";
    return "#FFF";
  }

  function radius(d) {
    return d.phantom ? 2 : nodeRadius;
  }

  let node = svg
    .selectAll(".node")
    .data(graph.nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", radius)
    .style("fill", nodeColor)
    .style("stroke", "#000")
    .style("stoke-width", 0.5);

  node.append("title").text(function(d) {
    return `${
      d.index
    }:${d.name} ${strifyNodes(d.dalevel, "index")} tw:${d.twidth}`;
  });

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
