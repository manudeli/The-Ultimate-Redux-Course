import { compose, pipe } from "lodash/fp";

let input = "   JavaScript    ";

const trim = (str) => str.trim();
const wrap = (type) => (str) => `<${type}>${str}</${type}>`;
const toLowerCase = (str) => str.toLowerCase();

const transform = pipe(trim, toLowerCase, wrap("div"));
console.log(transform(input));

const person = {
  name: "John",
  address: {
    country: "USA",
    city: "San Francisco",
  },
};
const updated = {
  ...person,
  address: {
    ...person.address,
    city: "New York",
  },
  name: "Bob",
};
console.log(person);
console.log(updated);
