/*jshint esversion: 6 */
// @ts-check
/* eslint-disable */
import { Graph } from "./graph.js";
import { average, sum } from "./utils.js";

import * as d3 from "d3";

function xLength(graph) {
  const diffs = graph.links.map(link =>
    Math.abs(link.source.x - link.target.x)
  );
  return diffs.reduce((a, b) => (b += a));
}

/** use the d3 layout */
export function d3Layout(graph, levelSep = 100, leftMargin = 10) {
  // @ts-ignore
  let hier = d3.hierarchy(graph.hierarchy());
  // @ts-ignore
  let tree = d3.tree();
  // @ts-ignore
  tree.size([]); // do we have to give it a size?
  // node size is fixed - so instead, use separation to control spacing
  tree.separation(function(a, b) {
    let na = a.data.node;
    let nb = b.data.node;
    if (na && nb) {
      return 1 + (na.phantom ? 2 : 5) + (nb.phantom ? 2 : 5);
    } else {
      return 10;
    }
  });
  tree.nodeSize([1, 1]);
  tree(hier);
  // things are centered at zero, so shift things
  // @ts-ignore
  let left = Math.min(...hier.descendants().map(n => n.x));
  hier.descendants().forEach(n => {
    // @ts-ignore
    n.x -= left - leftMargin;
  });
  // copy the D3 positions into the node positions
  hier.descendants().forEach(function(node) {
    if ((node.data, node)) {
      // @ts-ignore
      node.data.node.x = node.x;
      node.data.node.y = (node.data.node.longest + 1) * levelSep;
    }
  });
}

/**
 *
 * @param {Graph} graph
 */
export function layout(graph) {
  // for debugging - keep a set of nodes (a dictionary) that we'll do print statements
  const examine = {
    129: true
  };

  const width = 1200;
  const topmargin = 50;
  const levelSep = 50;

  const vertexRadius = 5;
  const phantomRadius = 1;
  const spacer = 2;

  function space(node) {
    return spacer + (node.phantom ? phantomRadius : vertexRadius);
  }

  const levels = graph.getLevels();
  // @ts-ignore
  // @ts-ignore
  const links = graph.links;

  // assign indecies based on levels
  // this means creating a new node list
  const orderedNodes = [];
  levels.forEach(level => level.forEach(n => orderedNodes.push(n)));
  orderedNodes.forEach((node, idx) => (node.index = idx));

  // make initial positions
  levels.forEach(function(level, li) {
    let left = 0;
    // @ts-ignore
    // @ts-ignore
    level.forEach(function(n, ni) {
      // @ts-ignore
      // @ts-ignore
      let px = n.parents.length ? Math.min(...n.parents.map(m => m.x)) : 0;
      n.x = left + space(n); // Math.max(px, left+space(n));
      n.y = topmargin + li * levelSep;
      left = n.x + space(n);
    });
  });
  console.log(`Initial Lengths = ${xLength(graph)}`);

  // adjust initial positions to the right
  if (1) {
    // need to go bottom to top
    // levels.forEach( function(level,li)
    for (let li = levels.length - 1; li >= 0; li--) {
      const level = levels[li];
      let right = width;
      // go from right to left shifting things right if they can
      for (let ni = level.length - 1; ni >= 0; ni--) {
        let n = level[ni];

        // if the rightmost thing is a leaf, we might want to move it to
        // make space for other things
        let rightLeaf = width;

        // 4 different heuristics as to where to move to - purely aesthetics
        let nx1 = n.children.length
          ? Math.min(...n.children.map(m => m.x))
          : rightLeaf;
        let nx3 = n.children.length
          ? Math.max(...n.children.map(m => m.x))
          : rightLeaf;
        // @ts-ignore
        // @ts-ignore
        let nx2 = (nx1 + nx3) / 2;
        let na = n.children.length
          ? average(n.children.map(m => m.x))
          : rightLeaf;

        if (n.index in examine) {
          console.log(`right: n.x:${n.x} na:${na} right:${right}`);
        }

        let nx = Math.max(na, n.x);
        n.x = Math.min(nx, right - space(n));
        right = n.x - space(n);
      }
    } // );
  }

  function argmax(lst) {
    let val = lst[0];
    let mi = 0;
    for (let i = 1; i < lst.length; i++) {
      if (lst[i] > val) {
        mi = i;
        val = lst[i];
      }
    }
    return mi;
  }

  function argmin(lst) {
    let val = lst[0];
    let mi = 0;
    for (let i = 1; i < lst.length; i++) {
      if (lst[i] < val) {
        mi = i;
        val = lst[i];
      }
    }
    return mi;
  }

  // greedy pull left
  // if the average of the children of a parent is to the right of the parent
  // then this is a candidate to move to the left
  // a parent should shift its children to the left if they aren't centered
  levels.forEach(function(level) {
    let left = 0;
    level.forEach(function(node) {
      if (node.primaryChildren.length) {
        // we can't count on the ordering of the primary children
        let leftChild =
          node.primaryChildren[argmin(node.primaryChildren.map(n => n.x))];
        let rightChild =
          node.primaryChildren[argmax(node.primaryChildren.map(n => n.x))];
        // console.log(`$N:${node.name} LC:${leftChild.name} RC:${rightChild.name} Left:${left}`)
        // figure out how much shift we want
        let goalDelta = average(node.primaryChildren.map(n => n.x)) - node.x;
        if (goalDelta > 0) {
          // we want to shift left, but how much can we
          let maxShift = leftChild.x - (left + space(leftChild));
          let shift = Math.min(maxShift, goalDelta);
          if (shift > 0) {
            node.primaryChildren.forEach(n => (n.x -= shift));
          }
        }
        // put the boundary to the right of the rightmost child
        left = rightChild.x + space(rightChild);
      }
    });
  });

  console.log(`Final Lengths = ${xLength(graph)}`);

  // Report Out
  console.log(
    `${graph.nodes.length} nodes (w/phantoms), ${graph.links.length} links (w/phantoms)`
  );
  console.log(`${graph.constraints.length} constraints`);
}

/**
 * New version - use tree layout first (which will be too wide) and then try to do some packing for conciseness
 * @param {Graph} graph
 */
export function treeLayout(graph) {
  // parameters (should be passed)
  const topmargin = 50;
  const levelSep = 65;

  const vertexRadius = 5;
  const phantomRadius = 2;
  const spacer = 2;

  function space(node) {
    return spacer + (node.phantom ? phantomRadius : vertexRadius);
  }

  function minwid(node) {
    return spacer + 2 * (node.phantom ? phantomRadius : vertexRadius);
  }

  const levels = graph.getLevels();

  // compute various vertex properties - needs to be done from bottom to top
  for (let li = levels.length - 1; li >= 0; li--) {
    const level = levels[li];
    // figure out the twidth of each node - the twidth includes the "left" spacer
    level.forEach(function(node) {
      // jshint ignore:line
      node.twidth = Math.max(
        minwid(node),
        sum(node.primaryChildren.map(n => n.twidth))
      );
    });
  }

  // in theory, if we use the twidths, we shoud get a left leaning tree layout
  levels.forEach(function(level, li) {
    let left = vertexRadius;
    level.forEach(function(node) {
      node.x = Math.max(
        left + space(node),
        node.primaryParent ? node.primaryParent.x : 0
      );
      node.y = topmargin + li * levelSep;
      // left += node.twidth;
      left = node.x - space(node) + node.twidth;
    });
  });

  // we have a left leaning tree, center parents over their kids (if we can move them that far right)
  for (let ni = graph.nodes.length - 1; ni >= 0; ni--) {
    const node = graph.nodes[ni];
    if (node.primaryChildren.length) {
      const goalX = average(node.primaryChildren.map(n => n.x));
      const neighbor = graph.nodes[ni + 1];
      if (neighbor.longest == node.longest) {
        const maxX = neighbor.x - space(node) - space(neighbor) + spacer;
        node.x = Math.min(maxX, goalX);
      } else {
        node.x = goalX;
      }
    }
  }
}
