import React from "react";
import camelCase from "lodash/camelCase";
import elementMap from "./elementMap";

export function addElement({ name, type, attributes, children, value = "" }) {
  const Element = elementMap[name];
  if (type === "text") {
    return value;
  }

  if (!Element) {
    return null;
  }

  return (
    <Element {...mapAttributes(attributes)}>
      {children.map((child) => addElement(child))}
    </Element>
  );
}

export function styleStringToJson(style = "") {
  const styleLineRegex = /\s*([a-z-]+:.+?(;|$))\s*/gm;
  const stylePartRegex = /([a-z-]+):\s*(.+?)(;|$)/m;
  console.log(style.match(styleLineRegex));

  const lines = [...style.matchAll(styleLineRegex)]
    .map((l) => l[0] || [])
    .reduce((acc, v) => {
      const [_, key, value] = v.match(stylePartRegex);
      return { ...acc, [camelCase(key)]: value };
    }, {});

  return lines;
}

export function convertAttribute(key = "", value) {
  if (key.startsWith("aria-") || key.startsWith("data-")) {
    return { [key]: value };
  }
  if (key === "style") {
    return { style: styleStringToJson(value) };
  }
  return { [camelCase(key.replace("class", "className"))]: value };
}

export function mapAttributes(attributes = {}) {
  return Object.keys(attributes).reduce((acc, v) => {
    return { ...acc, ...convertAttribute(v, attributes[v]) };
  }, {});
}

export default function Svgson({ src }) {
  return addElement(src);
}
