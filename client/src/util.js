import _ from "lodash";
import * as d3 from "d3";

export const FORMAT_TO_ID = cellName => {
  return cellName
    .split(" ")
    .join("-")
    .split("(")
    .join("")
    .split(")")
    .join("")
    .split(",")
    .join("")
    .replace(/\//g, "-");
};

export const GENERATE_LIST_COPY = originalList => {
  return Object.entries(_.cloneDeep(originalList));
};