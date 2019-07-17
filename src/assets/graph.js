/*jshint esversion: 6 */
// @ts-check

import {listOfLists} from "./utils.js";

/**
 * Can't be a Node since that's a reserved term by the DOM
 */
export class Vertex {
    /**
     * make a node
     * @param {string} name 
     * @param {object} params 
     * @param {number} [params.width=10]
     * @param {number} [params.height=10]
     */
    constructor(name, params = {}) {
        this.name = name;
        this.height = "height" in params ? params.height : 10;
        this.width =   "width" in params ? params.width : 10;
        // these are usually added later by the reader
        this.parents =  [];
        this.children = [];
        this.istree = undefined;
        this.index = undefined;         // overl rank (index into nodes list)
        this.phantom =  false;
        // these are added later by the analyzer, but we declare them to have no warnings
        this.depth =  -1;
        this.longest =  -1;
        this.levelIdx = undefined;      // index in the level (where in levels list)
        this.ancestors = new Set();
        this.descendentAncestors = new Set();
        this.dalevel = [];
    
        // these are used for sorting
        this.levelrank = undefined;

        // these are used for drawing
        this.x = undefined;
        this.y = undefined;

        // for the new and improved sorter
        this.primaryParent = undefined;
        /** @type {Vertex[]} */
        this.primaryChildren = [];
        this.grandkidIndex = undefined;

        // used for layout
        this.twidth = undefined;
    }
}

export class Link {
    /**
     * 
     * @param {Vertex} source 
     * @param {Vertex} target 
     * @param {string} color 
     * @param {number} value 
     */
    constructor(source, target, color="#000", value=1) {
        this.source = source;
        this.target = target;
        this.color = color;
        this.value = value;
    }
}

/**
 * @callback NodeFunction
 * @param{Vertex} node
 */

 /**
  * @class
  */
 export class Graph {
    /**
     * 
     * @param {Vertex[]} nodes 
     * @param {Link[]} links 
     * @param {Array} constraints 
     * @param {Array} groups 
     */
    constructor(nodes, links, constraints=[], groups=[]) {
        /** @type {Vertex[]} */
        this.nodes = nodes;
        /** @type {Link[]} */
        this.links = links;
        this.constraints = constraints;
        this.groups = groups;
        this.analysis = undefined;
    }
    /**
     * return a list of the roots
     * @returns {Vertex[]}
     */
    roots() {
        return this.nodes.filter(n => !n.parents.length);
    }
    /**
     * return a list of the leaves
     * @returns {Vertex[]}
     */
    leaves() {
        return this.nodes.filter(n => !n.children.length);
    }

    /**
     * apply a function to each node in breadth first order
     * this only works on level graphs!
     * @param {NodeFunction} nodefunc 
     */
    breadthFirst(nodefunc, nodupes=true) {
        let results = [];
        // start with the roots
        let queue = this.roots();
        // now iterate until we're done
        while(queue.length) {
            const n = queue.shift();
            results.push(nodefunc(n));
            n.children.forEach(function (c) {           // jshint ignore:line
                if (!nodupes || !queue.includes(c)) 
                    queue.push(c);
            });
        }
        return results;
    }

    
    /**
     * get the levels of the graph - it also resets the indecies in the levels
     */
    getLevels() {
        const nodes = this.nodes;
        const maxLongest = Math.max(...nodes.map(n=>n.longest));

        /** @type Vertex[][]] */
        const levels = listOfLists(maxLongest);

        nodes.forEach(n => levels[n.longest-1].push(n));
        levels.forEach(level => level.forEach((node,i) => node.levelIdx=i));

        return levels;
    }

    /**
     * Re-order the nodes based on a breadth first traversal
     * it puts the nodes in order - which means it can mess stuff up
     * It does re-assign indecies based on this new order.
     * It does not re-assign level indecies.
     */
    orderNodes() {
        // beginning with the roots, do a breadth first traversal of the tree to
        // assign indecies
        let idx=0;
        let orderedNodes = [];
        let queue = this.nodes.filter(node=>!node.primaryParent);
        while(queue.length) {
            const node = queue.shift();
            node.index = idx++;
            orderedNodes.push(node);
            node.primaryChildren.forEach(child=>queue.push(child)); // jshint ignore:line
        }
        this.nodes = orderedNodes;
    }

    /** describe the graph to the console */
    describe() {
        const maxDepth = Math.max(...this.nodes.map(n=>n.depth));
        const maxLongest = Math.max(...this.nodes.map(n=>n.longest));

        console.log(`${this.nodes.length} nodes, ${this.links.length} links`);
        console.log(`${this.roots().length} roots, ${this.leaves().length} leaves`);
        console.log(`${maxDepth} max depth, ${maxLongest} max longest`);
        console.log(`${this.nodes.filter(n=>n.istree).length} tree nodes`);

        // count the number of nodes with each amount of parents
        let pCount = {};
        this.nodes.forEach(node => {
            let npars = node.parents.length;
            if (pCount[npars]) {
                pCount[npars]++;
            } else {
                pCount[npars]=1;
            }
        });
        console.log("Parent Count:");
        console.log(pCount);
    }
}


/**
 * turn something with a forEach into a string (works for sets)
 * @param {*} lst 
 */
export function strifyNodes(lst,field="name") {
    let s = "[";
    lst.forEach(v => s += v[field]+" ");
    s += "]";
    return s;
}

/**
 * Given a graph, change things such that all links are 1 level
 * this means that longer links get broken into a series of steps with phantom nodes inserted
 * @param {Graph} graph 
 */
function phantomGraph(graph) {
    // a list of all of the long links
    const longLinks = graph.links.filter(link => link.target.longest - link.source.longest > 1);
    // links are only the links of the correct length
    const links = graph.links.filter(link => link.target.longest - link.source.longest == 1);
    // save the old links
    // @ts-ignore
    graph.oldLinks = graph.links;
    
    // break up the long links
    longLinks.forEach(function(link,li) {
        // disconnect child and parent
        link.target.parents.splice(link.target.parents.indexOf(link.source),1);
        link.source.children.splice(link.source.children.indexOf(link.target),1);
        let prev = link.source;
        for (let level = link.source.longest + 1; level < link.target.longest; level++) {
            let nnode = new Vertex(`connector-${li}-${level}`);
            nnode.phantom = true;
            nnode.parents.push(prev);
            nnode.longest = level;
            nnode.depth = link.source.depth + 1;
            nnode.istree = false;
            prev.children.push(nnode);
            graph.nodes.push(nnode);
            links.push(new Link(prev,nnode));
            prev = nnode;  
        } 
        link.target.parents.push(prev);
        prev.children.push(link.target);
        links.push(new Link(prev, link.target));
    });

    graph.links = links;
}


/**
 * analyze a graph in place
 * this just adds information to the nodes (in place) 
 * depth, longest, istree, index
 * if we level the graph, we add phantom nodes BEFORE doing ancestry
 * @param {Graph} graph 
 * @param {boolean} [level=true]
 */
export function analyzeGraph(graph, level=true) {
    // some analysis
    let roots = graph.roots();

    // Depths
    // do a simple breadth-first search to get depth - where depth is shortest path to a root
    // start with the roots 
    let queue = [];
    roots.forEach(x => {x.depth=1; queue.push(x);});
    // now iterate until we're done
    while(queue.length) {
        const n = queue.shift();
        n.children.forEach(child => {       // jshint ignore:line
            if (child.depth < 1) {
                child.depth = n.depth+1;
                queue.push(child);
            }
        });
    }

    // a tricker thing is to find the LONGEST path to a node
    // I am doing this inefficiently - each node may be visited multiple times
    // each time it is updated
    queue = [];
    roots.forEach(x => {x.longest=1; queue.push(x);});
    // now iterate until we're done
    while(queue.length) {
        const n = queue.shift();
        const newLong = n.longest+1;
        n.children.forEach(child => {           // jshint ignore:line
            if (child.longest < newLong) {
                child.longest = newLong;
                queue.push(child);
            }
        });
    }

    // Is the subtree below a node a tree?
    // this requires that: each child is a tree, and each child has 1 parent
    // we cache this within the node
    function isTree(n) {                        // jshint ignore:line
        if (n.istree != undefined) return n.istree;
        // look for a child that makes us not a tree
        let istree = true;
        n.children.forEach(function(child) {
            if (!isTree(child) || (child.parents.length>1) ) {
                istree = false;
             }
        });
        n.istree = istree;
        return istree;
    }
    graph.nodes.forEach(n=>isTree(n));

    // add the phantom nodes if need be
    if (level) phantomGraph(graph);

    // assign indecies based on order - AFTER phantom nodes added
    graph.nodes.forEach( (n,i) => n.index = i);

    // analyses after adding the phantoms
    let levels = graph.getLevels();

    // ancestor sets - a place where naive breadth first actually makes sense
    graph.breadthFirst(function(node) {
        node.children.forEach(function(child) {
            node.ancestors.forEach(ancestor=>child.ancestors.add(ancestor));
            child.ancestors.add(node);
        });
    });

    // work bottom up, rather than using breadth first
    for(let li=levels.length-1; li>=0; li--) {
        const level = levels[li];
        level.forEach(function(node){
            node.children.forEach(function(child) {
                child.ancestors.forEach(a => node.descendentAncestors.add(a));
                child.descendentAncestors.forEach(a => node.descendentAncestors.add(a));
            });
        });
    }
    // find the das at the level above the node
    graph.nodes.forEach(function(node) {
        node.dalevel = [...node.descendentAncestors].filter(n=> n.longest == node.longest);
    });
}
