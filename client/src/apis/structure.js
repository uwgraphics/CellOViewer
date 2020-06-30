import { Link, Graph, Vertex } from "./graph.js";

/* just make the graph data structure given the input data */
/**
 *
 * @param {Graph} data
 */
export function jsonToGraph(data) {
  // we have a set of node names (in data) with their children
  // make a list of node objects
  // warning: arrow notation can't return an object directly
  let nodes = Object.keys(data).map(name => new Vertex(name));

  // make a dictionary so that we can find things by name
  // it's called "node" since it lets us find a node
  let node = {};
  nodes.forEach(function(n) {
    node[n.name] = n;
  });

  // assign reasonable indecies
  nodes.forEach((node, idx) => (node.index = idx));

  // make links in the correct format
  // now process all of the links - create a list of links, as well
  // as store the graph information in the nodes
  let links = [];
  for (const sourceName in data) {
    data[sourceName].forEach(function(targetName) {
      const source = node[sourceName];
      const target = node[targetName];
      // if (!source) console.log(`Bad node ${sourceName} as source`);
      // if (!target) console.log(`Bad node ${targetName} as target`);
      if (source && target) {
        let link = new Link(source, target);
        links.push(link);
        source.children.push(target);
        target.parents.push(source);
      }
    });
  }

  return new Graph(nodes, links);
}
