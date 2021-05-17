import { compose, pipe } from "lodash/fp";

let input = "   JavaScript    ";

const trim = (str) => str.trim();
const wrap = (type) => (str) => `<${type}>${str}</${type}>`;
const toLowerCase = (str) => str.toLowerCase();

const transform = pipe(trim, toLowerCase, wrap("div"));
console.log(transform(input));

// Immutable.js

import { Map } from "immutable";

let book = Map({ title: "Harry Potter" });

function publish(book) {
  return book.set("isPublished", true);
}

book = publish(book);

console.log(book.toJS());
