/*jshint esversion: 6 */
// @ts-check

/**
 * 
 * @param {number[]} lst 
 */
export function average(lst) {
    if (!lst.length) return 0;
    let sum = lst.reduce((prev,cur) => cur += prev);
    let avg = sum/lst.length;
    return avg;
}

export function sum(lst) {
    if (!lst.length) return 0;
    return lst.reduce((prev,cur) => cur += prev);
}

/**
 * 
 * @param {number} len
 */
export function listOfLists(len) {
    const array = Array(len);
    for(let i=0; i<array.length; i++) { array[i] = []; }
    return array;
}
