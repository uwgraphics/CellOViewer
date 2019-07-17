/*jshint esversion: 6 */
// @ts-check

import { Graph } from "./graph.js";
import { average, sum } from "./utils.js";
import d3 from "d3";

function xLength(graph) {
  const diffs = graph.links.map(link =>
    Math.abs(link.source.x - link.target.x)
  );
  return diffs.reduce((a, b) => (b += a));
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
  const height = 1000;
  const topmargin = 50;
  const levelSep = 50;

  const vertexRadius = 5;
  const phantomRadius = 1;
  const spacer = 2;

  const rightLeafHeuristic = 0;
  const placeChildHeuristic = 0;

  function space(node) {
    return spacer + (node.phantom ? phantomRadius : vertexRadius);
  }

  const levels = graph.getLevels();
  const links = graph.links;

  // assign indecies based on levels
  // this means creating a new node list
  const orderedNodes = [];
  levels.forEach(level => level.forEach(n => orderedNodes.push(n)));
  orderedNodes.forEach((node, idx) => (node.index = idx));

  // make initial positions
  levels.forEach(function(level, li) {
    let left = 0;
    level.forEach(function(n, ni) {
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
  if (0) {
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
  }

  console.log(`Final Lengths = ${xLength(graph)}`);

  // Report Out
  console.log(
    `${graph.nodes.length} nodes (w/phantoms), ${
      graph.links.length
    } links (w/phantoms)`
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
  const levelSep = 50;

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
  if (1) {
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
}

/**
 * Christophs tree layout based on the level with most points as
 * starting point for the layout.
 * @param {Graph} graph
 */
export function treeLayoutChristoph(graph) {
  // parameters (should be passed)
  const topmargin = 50;
  const levelSep = 50;

  const vertexRadius = 5;
  const phantomRadius = 5;
  const spacer = 2;

  function space(node) {
    return spacer + (node.phantom ? phantomRadius : vertexRadius);
  }

  function minwid(node) {
    return spacer + 2 * (node.phantom ? phantomRadius : vertexRadius);
  }

  function createLengthCenteredIterator(center_index, in_array, out_array) {
    out_array.push(center_index);

    while (out_array.length < in_array.length) {
      let min_index = Math.max(Math.min(...out_array) - 1, 0);
      let max_index = Math.max(Math.max(...out_array) + 1);

      let lower_value = levels[Math.max(min_index, 0)];
      let upper_value = levels[Math.max(max_index, in_array.length)];

      if (lower_value >= upper_value) {
        if (!out_array.includes(min_index)) {
          out_array.push(min_index);
        }
        if (!out_array.includes(max_index)) {
          out_array.push(max_index);
        }
      } else {
        if (!out_array.includes(max_index)) {
          out_array.push(max_index);
        }
        if (!out_array.includes(min_index)) {
          out_array.push(min_index);
        }
      }
    }
  }

  function createCenteredIterator(array_length, out_array) {
    out_array.push(Math.floor(array_length / 2));

    while (out_array.length < array_length) {
      let min_index = Math.max(Math.min(...out_array) - 1, 0);
      let max_index = Math.min(Math.max(...out_array) + 1, array_length);

      if (!out_array.includes(min_index)) {
        out_array.push(min_index);
      }
      if (!out_array.includes(max_index) && max_index < array_length) {
        out_array.push(max_index);
      }
    }
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

  // Get the biggest level/level with most elements
  let biggestLevel = 0;
  let biggestIndex = -1;
  let levelSizeList = [];

  levels.forEach(function(element, index) {
    if (element.length > biggestLevel) {
      biggestIndex = index;
      biggestLevel = element.length;
    }
  });

  // Get a list of indices sorted by the amount of nodes
  createLengthCenteredIterator(biggestIndex, levels, levelSizeList);

  // Set the maximum size
  let global_max_position = levels[biggestIndex].length * 11;

  // Start laying out the points from the widest to the narrowest level
  levelSizeList.forEach(function(level_index, li) {
    let level = levels[level_index];
    let left = 0;

    level.forEach(function(node, i) {
      // Leftmost
      node.x = left + space(node);
      node.y = topmargin + level_index * levelSep;
      left += node.width;
    });

    // The occupied space in the current level
    let level_min = global_max_position;
    let level_max = 0;

    // Compress levels below the widest level
    if (level_index > levelSizeList[0]) {
      let centered = [];
      createCenteredIterator(levels[level_index - 1].length, centered);

      // Initilize used space variables
      level_min =
        levels[level_index - 1][centered[0]].x -
        space(levels[level_index - 1][centered[0]]) / 2;
      level_max =
        levels[level_index - 1][centered[0]].x +
        space(levels[level_index - 1][centered[0]]) / 2;

      // Iterate over all nodes strating from the center
      centered.forEach(function(centered_index) {
        // Get the parents of the current level starting from the center
        let el = levels[level_index - 1][centered_index];

        // Get the related childs from the current level
        let childs = el.primaryChildren;
        childs.sort((a, b) =>
          a.index > b.index ? 1 : b.index > a.index ? -1 : 0
        );

        // Compute the needed area with the parent node in the center
        let extent = sum(childs.map(n => n.width));
        let min_pos = el.x - extent / 2;
        let max_pos = el.x + extent / 2;

        // Check right side positioning
        if (centered_index > centered[0] && childs.length > 0) {
          // If there is a overlap move it to the right
          if (min_pos < level_max) {
            min_pos = level_max;
            max_pos = min_pos + extent;
          }
          // If not, move it as far as possible to the left
          else {
            min_pos = Math.max(level_max, el.x + space(childs[0]) / 2 - extent);
            max_pos = min_pos + extent;
          }
        }

        // Check left side
        if (centered_index < centered[0] && childs.length > 0) {
          // If there is a overlap move it to the right
          if (max_pos > level_min) {
            min_pos = level_min - extent;
            max_pos = level_min;
          }
          // If not, move it as far as possible to the right
          else {
            max_pos = Math.min(
              level_min,
              el.x - space(childs[childs.length - 1]) + extent
            );
            min_pos = max_pos - extent;
          }
        }

        // Update used space
        if (childs.length > 0) {
          level_min = Math.min(level_min, min_pos);
          level_max = Math.max(level_max, max_pos);
        }

        // Set node positions
        childs.forEach(function(child, i) {
          child.x = min_pos + space(child);
          min_pos += child.width;
        });
      });
    }

    // Compress levels above the widest level
    if (level_index < levelSizeList[0]) {
      let centered = [];
      createCenteredIterator(levels[level_index].length, centered);

      // Initilize used space variables
      level_min = global_max_position / 2;
      level_max = global_max_position / 2;

      centered.forEach(function(centered_index, i) {
        let el = level[centered_index];
        let childs = el.primaryChildren;
        childs.sort((a, b) =>
          a.index > b.index ? 1 : b.index > a.index ? -1 : 0
        );

        let min_pos = level_min - el.width / 2;
        let max_pos = level_max + el.width / 2;

        // Compute the needed area with the parent node in the center
        if (childs.length > 0) {
          min_pos = Math.min(...childs.map(n => n.x)) - childs[0].width / 2;
          max_pos =
            Math.max(...childs.map(n => n.x)) +
            childs[childs.length - 1].width / 2;
        } else {
          min_pos = level_min;
          max_pos = level_max;
        }

        // Check right side positioning
        if (centered_index > centered[0]) {
          // If there is a overlap move it to the right
          if (min_pos < level_max) {
            min_pos = level_max;
            max_pos = min_pos + el.width;
          } else if (childs.length == 0) {
            min_pos = level_max;
            max_pos = level_min + el.width;
          }
          // If not, move it as far as possible to the left
          else {
            min_pos = Math.max(level_max, min_pos);
            max_pos = min_pos + el.width;
          }
        }

        // Check left side
        if (centered_index < centered[0]) {
          let unset_points = Math.floor((centered.length - i) / 2);

          // If there is a overlap move it to the left
          if (max_pos > level_min) {
            max_pos = level_min;
            min_pos = max_pos - el.width;
          } else if (childs.length == 0) {
            max_pos = level_min;
            min_pos = max_pos - el.width;
          } else if (min_pos < unset_points * vertexRadius * 2) {
            max_pos = unset_points * vertexRadius * 2;
            min_pos = max_pos - el.width;
          }
          // If not, move it as far as possible to the right
          else {
            max_pos = Math.min(level_min, max_pos);
            min_pos = max_pos - el.width;
          }
        }

        // Update used space
        level_min = Math.min(level_min, min_pos);
        level_max = Math.max(level_max, max_pos);

        let extent = max_pos - min_pos;
        // Set node positions
        el.x = max_pos - extent / 2;
      });
    }
  });
}
