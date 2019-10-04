/* eslint-disable no-console */
/*jshint esversion: 6 */
// @ts-check

// eslint-disable-next-line no-unused-vars
import { Graph, strifyNodes } from "./graph.js";
// @ts-ignore
// @ts-ignore
import * as d3 from "d3";

// /**
//  *
//  * @param {Graph} graph
//  * @param {string} selector="body"
//  * @param {Object} params={}
//  * @param {number} [params.height = 800]
//  * @param {number} [params.nodeRadius = 4]
//  * @param {?Boolean} [params.drawPhantoms]
//  * @param {number} [params.bezierVert = 25]
//  */
// export function drawGraphLab(graph, selector = "body", vueThis, params = {}) {

//   let linkType = "paths";
//   let paths;

//   /**
//    * Where the vanilla JavaScript pass the click event to Vue
//    */
//   function update() {
//     switch (linkType) {
//       case "arrows":
//         // draw directed edges with proper padding from node centers
//         paths.attr("d", function(d) {
//           let deltaX = d.target.x - d.source.x,
//             deltaY = d.target.y - d.source.y,
//             dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
//             normX = deltaX / dist,
//             normY = deltaY / dist,
//             sourcePadding = d.source.phantom ? 1 : nodeRadius,
//             targetPadding = d.target.phantom ? 1 : nodeRadius + 2,
//             sourceX = d.source.x + sourcePadding * normX,
//             sourceY = d.source.y + sourcePadding * normY,
//             targetX = d.target.x - targetPadding * normX,
//             targetY = d.target.y - targetPadding * normY;
//           return "M" + sourceX + "," + sourceY + "L" + targetX + "," + targetY;
//         });
//         break; // end arrow update
//       case "lines":
//         paths.attr("x1", d => d.source.x);
//         paths.attr("y1", d => d.source.y);
//         paths.attr("x2", d => d.target.x);
//         paths.attr("y2", d => d.target.y);
//         break;
//       case "paths":
//         paths.attr("d", function(d) {
//           let x1 = d.source.x;
//           let y1 = d.source.y + radius(d.source);
//           let x2 = d.target.x;
//           let y2 = d.target.y - radius(d.target);
//           //return `M${x1},${y1}L${x2},${y2}`;
//           return `M${x1},${y1}C${x1},${y1 + 15},${x2},${y2 - 15},${x2},${y2}`;
//         });
//         break;
//     }

//     // update node positions
//     node
//       .attr("cx", function(d) {
//         return d.x;
//       })
//       .attr("cy", function(d) {
//         return d.y;
//       });
//   }
//   update();
// }

/**
 * New drawwing code - only does Beziers
 * has a few parameters
 * and cannot update node positions
 *
 * @param {Graph} graph
 * @param {string} selector="body"
 * @param {Object} params={}
 * @param {number} [params.height = 800]
 * @param {number} [params.nodeRadius = 5]
 * @param {?Boolean} [params.drawPhantoms]
 * @param {number} [params.bezierVert = 25]
 */
// @ts-ignore
// @ts-ignore
export function drawGraph(graph, selector = "body", vueThis, params = {}) {
  let nodeRadius = params.nodeRadius || 4;
  let bvert = params.bezierVert || 15;
  let height = params.height || 935;
  const width = Math.max(...graph.nodes.map(n => n.x)) + nodeRadius;

  let svg = d3
    // @ts-ignore
    .select(selector)
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${width} ${height + 20}`)
    .call(
      // @ts-ignore
      d3.zoom().on("zoom", function() {
        // @ts-ignore
        svg.attr("transform", d3.event.transform);
      })
    )
    .append("g");

  let paths;

  // create the Bezier segment from x1,y1 to x2,y2 - assuming that x1,y1 was the last point
  // note that the derivatives go vertically
  function cseg(x1, y1, x2, y2) {
    // I made this a variable to experiment with computing better values
    // nothing works well
    let bv = bvert;
    return `C${x1},${y1 + nodeRadius + bv},${x2},${y2 -
      nodeRadius -
      bv},${x2},${y2 - nodeRadius}`;
  }

  function formatToId(cellName) {
    return cellName
      .split(" ")
      .join("-")
      .split("(")
      .join("")
      .split(")")
      .join("")
      .replace(/\//g, "-");
  }

  // @ts-ignore
  function pathId(links) {
    return (
      "path-" +
      formatToId(links["source"]["name"]) +
      "---" +
      formatToId(links["target"]["name"])
    );
  }

  // we only create links for the non-phantom source nodes
  // we then trace through the phantom nodes
  paths = svg
    .selectAll(".link")
    .data(graph.links.filter(link => !link.source.phantom))
    .enter()
    .append("svg:path")
    .attr("id", pathId)
    .attr("stroke-width", 0.75)
    .attr("fill", "none")
    .attr("d", function(d) {
      // start at the beginning of the first source
      let x1 = d.source.x;
      let y1 = d.source.y + nodeRadius;
      let pstr = `M${x1},${y1}`;
      let next = d.target;
      // traverse phantom nodes
      while (next.phantom) {
        let x2 = next.x;
        let y2 = next.y;
        pstr += cseg(x1, y1, x2, y2);
        // vertical line through the node's location
        pstr += `L${x2},${y2 + nodeRadius}`;
        next = next.children[0];
        x1 = x2;
        y1 = y2;
      }
      // now we go to the final place
      let x2 = next.x;
      let y2 = next.y;
      pstr += cseg(x1, y1, x2, y2);
      return pstr;
    });

  paths.style("stroke", link => link.color).attr("class", "link");
  paths.on("mouseover", function handle() {
    // @ts-ignore
    d3.select(this).style("stroke", "#FF6F61");
  });
  paths.on("mouseout", function handle(d) {
    // @ts-ignore
    d3.select(this).style("stroke", d.color);
  });

  /**
   * Assign an id to each circle based on node type
   * @param {Object} node
   */
  // Assign an id to each circle based on node type
  // @ts-ignore
  function nodeId(node) {
    if (node.phantom) {
      return "phantom-" + formatToId(node.name);
    } else {
      return "circle-" + formatToId(node.name);
    }
  }

  // @ts-ignore
  function handleMouseOver() {
    // Use D3 to select element, change color and size
    // @ts-ignore
    let node = d3.select(this);
    node.attr("r", nodeRadius * 2);

    // @ts-ignore
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

  // @ts-ignore
  function handleMouseOut() {
    // @ts-ignore
    d3.select(this).attr("r", nodeRadius);
    // @ts-ignore
    d3.select(".d3plus-tooltip").remove();
  }

  function handleMouseClick() {
    // @ts-ignore
    vueThis.selectedCellName = d3.select(this).attr("name");
  }

  function nodeClass(node) {
    if (node.phantom) {
      return "phantom";
    } else {
      return "cell";
    }
  }

  function nodeColor(node) {
    if (node.phantom) return "#42b98300";
    if (node.istree) return "#FFF";
    return "#FFF";
  }

  function nodeName(node) {
    return node.name;
  }

  function nodeStroke(node) {
    if (node.phantom) return "none";
    return "#000";
  }

  let node = svg
    .selectAll(".node")
    .data(
      params.drawPhantoms ? graph.nodes : graph.nodes.filter(n => !n.phantom)
    )
    .enter()
    .append("circle")
    .attr("name", nodeName)
    .attr("id", nodeId)
    .attr("class", nodeClass)
    .attr("r", nodeRadius)
    .style("fill", nodeColor)
    .style("stroke", nodeStroke)
    .style("stroke-width", 0.5)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

  node
    .filter(".cell")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .on("click", handleMouseClick);

  node.append("title").text(function(d) {
    return `${
      d.index
    }:${d.name} ${strifyNodes(d.dalevel, "index")} tw:${d.twidth}`;
  });
}
