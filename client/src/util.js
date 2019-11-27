import _ from "lodash";

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