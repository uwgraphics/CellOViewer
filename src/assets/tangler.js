/*jshint esversion: 6 */
// @ts-check

// eslint-disable-next-line no-unused-vars
import { Graph } from "./graph.js";

/**
 * 
 * @param {Graph} graph 
 */
export function primaryParent(graph) {
    // for every node, choose it's primary parent
    graph.nodes.forEach(function (node) {
        node.primaryParent = undefined;
        let maxChildren = 0;
        node.parents.forEach(function(parent) {
            const parentKids = parent.children.length;
            if (parentKids > maxChildren) {
                maxChildren = parentKids;
                node.primaryParent = parent;
            }
        });
    });

    // for every node, get all of the children for which it is primary
    graph.nodes.forEach(node => node.primaryChildren = []);
    graph.nodes.forEach(node => { if (node.primaryParent) node.primaryParent.primaryChildren.push(node);});
}
