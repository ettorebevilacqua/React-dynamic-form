import React from "react";
import { scanner, KeyProp } from "../lib/parseJson";
import Dinamic from "../lib/dinamicComp";
import * as entity from "../lib/entity";

interface Config {
  component: string;
  children?: Array<any> | Array<Config> | string;
  props?: any;
}

const mock1 = {
  a: "ccd",
  b: [3, 4, { c: "pippo", d: [1, 2, 3] }]
};

const mock = {
  a: { c: "", d: [1, 2, 3] }
};

const addComp = (component: string, props: any): any => ({
  component,
  props
});

export const onPropRebuild = (acc: Array<any> = []) => (
  prop: KeyProp,
  val: entity.JSONValue
): void => {
  const addChildren = (accT: Config): Array<any> => {
    // if (!accT) return [];
    accT.children = [];
    return accT.children as Array<any>;
  };

  const elem =
    typeof val !== "object"
      ? addComp("input", { defaultValue: val, key: prop, name: prop })
      : addComp("div", { id: prop, key: prop });

  let accObj: Array<any> = Array.isArray(acc)
    ? acc
    : addChildren(acc as Config);
  accObj.push(elem);
  acc = typeof val !== "object" ? accObj : elem;
};

let state: Array<any> = [];
scanner(mock1, [], onPropRebuild(state));
const config = state;
console.log("xq", config);

/*
const configTest: Array<Config> = [
  {
    component: "div",
    props: { onClick: () => "aaaf", key: 1 },
    children: [
      {
        component: "img",
        props: {
          key: 2,
          src:
            "https://images.pexels.com/photos/2877188/pexels-photo-2877188.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }
      },
      {
        component: "div",
        props: { className: "aaa", key: 3 },
        children: "This is a title"
      }
    ]
  }
];
*/

export default function FormExample() {
  return <div className="App">{config.map((config) => Dinamic(config))}</div>;
}
