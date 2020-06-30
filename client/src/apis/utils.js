/*jshint esversion: 6 */
// @ts-check
// eslint-disable-next-line no-unused-vars
// @ts-ignore
/* eslint-disable */
import { Vertex } from "./graph.js";
/**
 *
 * @param {number[]} lst
 */
export function average(lst) {
  if (!lst.length) return 0;
  let sum = lst.reduce((prev, cur) => (cur += prev));
  let avg = sum / lst.length;
  return avg;
}

export function sum(lst) {
  if (!lst.length) return 0;
  return lst.reduce((prev, cur) => (cur += prev));
}

/**
 *
 * @param {number} len
 */
export function listOfLists(len) {
  const array = Array(len);
  for (let i = 0; i < array.length; i++) {
    array[i] = [];
  }
  return array;
}

/* given 2 edges (x coordinates) do the edges cross? */
export function isCross(p1, c1, p2, c2) {
  return (p1 > p2 && c1 < c2) || (p1 < p2 && c1 > c2) ? 1 : 0;
}

/**
 * Count the number of crossings between two (adjacent) levels
 * @param {Vertex[]} parents
 */
export function countCrossingsLevel(parents) {
  let count = 0;
  // no easy way to iterate over the links of a level...
  if (parents.length > 1) {
    for (let i = 0; i < parents.length - 1; i++) {
      let p1 = parents[i];
      p1.children.forEach(function(c1) {
        // jshint ignore:line
        for (let j = i + 1; j < parents.length; j++) {
          let p2 = parents[j];
          p2.children.forEach(function(c2) {
            // jshint ignore:line
            count += isCross(
              p1.levelIdx,
              c1.levelIdx,
              p2.levelIdx,
              c2.levelIdx
            );
          });
        }
      });
    }
  }
  return count;
}

export function countCrossingsGraph(graph) {
  const levels = graph.getLevels();
  let crossings = 0;
  for (let i = 0; i < levels.length - 1; i++) {
    let lc = countCrossingsLevel(levels[i]);
    crossings += lc;
  }
  return crossings;
}

export function simpleSorter(graph, hlevel = 3, pass = 0) {
  const levels = graph.getLevels();

  // compare two nodes
  function cmp(a, b) {
    // heuristic one - stick to your primary parent
    // if (!a.primaryParent) {
    //   console.log(`node ${a.index} ${a.name} no primary parent`);
    // }
    let ai = a.primaryParent.levelIdx;
    let bi = b.primaryParent.levelIdx;
    if (ai != bi) return ai - bi;
    if (hlevel > 1) {
      // hueristic two - consider all your parents
      // only make sense if at least one has multiple parents
      if (a.parents.length > 1 || b.parents.length > 1) {
        let ap = average(a.parents.map(p => p.levelIdx));
        let bp = average(b.parents.map(p => p.levelIdx));
        if (ap != bp) return ap - bp;
      } else {
        // generally, looking at your children is a really bad
        // idea - wait until it becomes useful (when things are stable)
        // and only if you have only 1 child
        if (pass > 5 && a.children.length == 1 && b.children.length == 1) {
          // keep diving until someone doesn't have 1 child
          let ac = a.children[0];
          let bc = b.children[0];
          while (ac.children.length == 1 && bc.children.length == 1) {
            ac = ac.children[0];
            bc = bc.children[0];
          }
          let ap = ac.levelIdx;
          let bp = bc.levelIdx;
          return ap - bp;
        }
      }
    }
    if (hlevel > 2) {
      // heuristic three - transitive closure of your descendents ancestors
      if (a.dalevel.length && b.dalevel.length) {
        let ap = average(a.dalevel.map(p => p.levelIdx));
        let bp = average(b.dalevel.map(p => p.levelIdx));
        if (ap != bp) return ap - bp;
      }
    }
    return 0;
  }

  // sort each level
  let idx = 0;
  levels.forEach(function(level, li) {
    if (li > 0) {
      level.sort(cmp);
    }
    level.forEach((n, i) => {
      n.levelIdx = i;
      n.index = idx++;
    });
  });

  // reorder the nodes
  graph.nodes.sort((a, b) => a.index - b.index);
  // make sure the children are sorted correctly
  graph.nodes.forEach(n => n.primaryChildren.sort((a, b) => a.index - b.index));
  graph.nodes.forEach(n => n.children.sort((a, b) => a.index - b.index));
}
