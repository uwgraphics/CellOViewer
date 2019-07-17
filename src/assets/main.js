/*jshint esversion: 6 */
// @ts-check

import * as d3 from "d3";

const graph_file_name = "./../../public/cell_type_graph.json"
//const graph_file_name = "GraphData/cell_type_graph.json";
//const graph_file_name = "GraphData/smallDag.json";
//const graph_file_name = "GraphData/nocross.json";
//const graph_file_name = "GraphData/lookahead.json";
//const graph_file_name = "GraphData/twisted.json";
//const graph_file_name = "GraphData/tree3.json";

const doStart = false;

import {Vertex, Link, Graph, analyzeGraph, strifyNodes} from "./graph.js";
import {average, listOfLists} from "./utils.js";
import {drawGraph} from "./draw.js";
import {layout, treeLayout, d3Layout} from "./layout.js";
import {primaryParent} from "./tangler.js";

/* just make the graph data structure given the input data */
/**
 * 
 * @param {Graph} data 
 */
function jsonToGraph(data) {
    // we have a set of node names (in data) with their children
    // make a list of node objects
    // warning: arrow notation can't return an object directly
    let nodes = Object.keys(data).map(name => new Vertex(name) );

    // make a dictionary so that we can find things by name
    // it's called "node" since it lets us find a node
    let node = {};
    nodes.forEach(function(n) { node[n.name] = n;});

    // assign reasonable indecies
    nodes.forEach( (node,idx) => node.index = idx);

    // make links in the correct format
    // now process all of the links - create a list of links, as well
    // as store the graph information in the nodes
    let links = [];
    for (const sourceName in data) {
        data[sourceName].forEach(function(targetName) { // jshint ignore:line
            const source = node[sourceName];
            const target = node[targetName];
            if (!source) console.log(`Bad node ${sourceName} as source`);
            if (!target) console.log(`Bad node ${targetName} as target`);
            if (source && target) {
                let link =  new Link(source,target);
                links.push(link);
                source.children.push(target);
                target.parents.push(source);
            }
        });
    }
    return new Graph(nodes,links);
}



/* given 2 edges (x coordinates) do the edges cross? */
function isCross(p1,c1,p2,c2) {
    return ((p1>p2 && c1<c2) || 
            (p1<p2 && c1>c2)    ) ? 1 : 0;
}

/**
 * Count the number of crossings between two (adjacent) levels
 * @param {Vertex[]} parents 
 * @param {Vertex[]} children
 */
function countCrossingsLevel(parents,children) {
    let count = 0;
    // no easy way to iterate over the links of a level...
    if (parents.length>1) {
        for(let i=0; i<parents.length-1; i++) {
            let p1 = parents[i];
            p1.children.forEach(function(c1) {         // jshint ignore:line
                for(let j=i+1; j<parents.length; j++) {
                    let p2 = parents[j];
                    p2.children.forEach(function(c2) {  // jshint ignore:line
                        count += isCross(p1.levelIdx,c1.levelIdx,p2.levelIdx,c2.levelIdx);
                    }); 
                }
            });
        }
    }
    return count;
}

function countCrossingsGraph(graph, verbose=false) {
    const levels = graph.getLevels();
    let crossings = 0;
    for(let i=0; i<levels.length-1; i++) {
        let lc = countCrossingsLevel(levels[i],levels[i+1]);
        if (verbose) console.log(`level ${i} - ${lc}`);
        crossings += lc;
    }
    if (verbose) console.log(`crossings: ${crossings}`);
    return crossings;
}


function simpleSorter(graph, hlevel=3, pass=0) {
    const levels = graph.getLevels();

    // compare two nodes
    function cmp(a,b) {
        // heuristic one - stick to your primary parent
        if (!a.primaryParent) {
            console.log(`node ${a.index} ${a.name} no primary parent`);
        }
        let ai = a.primaryParent.levelIdx;
        let bi = b.primaryParent.levelIdx;
        if (ai != bi) return ai-bi;
        if (hlevel > 1) {
            // hueristic two - consider all your parents
            // only make sense if at least one has multiple parents
            if ( (a.parents.length > 1) || (b.parents.length > 1)) {
                let ap = average(a.parents.map(p => p.levelIdx));
                let bp = average(b.parents.map(p => p.levelIdx));
                if (ap != bp) return ap-bp;
            } else {
                // generally, looking at your children is a really bad 
                // idea - wait until it becomes useful (when things are stable)
                // and only if you have only 1 child
                if ((pass>5) && (a.children.length==1) && (b.children.length==1)) {
                    // keep diving until someone doesn't have 1 child
                    let ac = a.children[0];
                    let bc = b.children[0];
                    while ( (ac.children.length==1) && (bc.children.length==1)) {
                        ac = ac.children[0];
                        bc = bc.children[0];
                    }
                    let ap = ac.levelIdx;
                    let bp = bc.levelIdx;
                    return ap-bp;
                }
            }
        }
        if (hlevel > 2) {
            // heuristic three - transitive closure of your descendents ancestors
            if (a.dalevel.length && b.dalevel.length) {
                let ap = average(a.dalevel.map(p => p.levelIdx));
                let bp = average(b.dalevel.map(p => p.levelIdx));
                if (ap != bp) return ap-bp;
            }
        }
        return 0; 
    }

    // sort each level
    let idx=0;
    levels.forEach(function(level,li) {
        if (li>0) {
            level.sort( cmp );
        } 
        level.forEach( (n,i) => { n.levelIdx=i; n.index=idx++;});
    });

    // reorder the nodes
    graph.nodes.sort((a,b) => a.index-b.index);
    // make sure the children are sorted correctly
    graph.nodes.forEach(n=>n.primaryChildren.sort((a,b) => a.index-b.index));
    graph.nodes.forEach(n=>n.children.sort((a,b) => a.index-b.index));

}

function readMatt(filename = graph_file_name) {
    console.log("starting D3 JSON fetch...");
    d3.json(filename).then(function (data) {
        let graph = jsonToGraph(data);
        analyzeGraph(graph);
        primaryParent(graph);

        console.log(`crossings at start: ${countCrossingsGraph(graph)}`);

        for(let i=0; i<20; i++) {
            simpleSorter(graph,3,i);
            console.log(`crossings after ${i+1}: ${countCrossingsGraph(graph)}`);
        }

        // console.log(strifyNodes(graph.nodes));
        // graph.orderNodes();
        //console.log(strifyNodes(graph.nodes));

        graph.links.forEach(link => link.color = (link.target.primaryParent==link.source) ? "#42b983 " : "#666");

        // layout(graph);
        d3Layout(graph);

        // graph.nodes.forEach(n=>console.log(`${n.name}: ${n.x},${n.y}`));

        let drawn = drawGraph(graph);

    });
}

readMatt();