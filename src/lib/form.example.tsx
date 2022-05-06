import React from "react";
import { scanner, KeyProp } from "../lib/parseJson";
import { Autoform, createSchema } from "react-hook-form-auto";
import Dinamic from "../lib/dinamicComp";
import * as entity from "../lib/entity";
import * as traverse from "../lib/traverse";

interface Config {
  component: string;
  children?: Array<any> | Array<Config> | string;
  props?: any;
}

const mock1 = {
  a: "ccd",
  b: [3, 4, { c: "pippo", d: [1, 2, 3] }]
};

const addComp = (component: string, props: any): any => ({
  component,
  props
});

export const onPropRebuild = (
  prop: KeyProp,
  val: entity.JSONValue,
  acc: Array<any>
): any => {
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
  return acc;
};

/* const config = scanner(mock1, [], onPropRebuild);
console.log("xq", config);
*/

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

const types = {
  string: "string",
  number: "number",
  boolean: "boolean"
  // array: (chem)=>'[]'
};
const getType = (val: any) => {
  const typeVal = typeof val;
  const isObj = ["object"].indexOf(typeVal) > -1;
  const isArray = Array.isArray(val);

  if (isArray) return "array";
  if (isObj) return "object";
  return { type: typeVal };
};
/*
string	Value is a string	<input type="text" />
number	Value is a number	<input type="number" />
range	Between two numbers	<input type="range" />
[<schema>]	Each array item is valid	Renders as array
<schema>	Value follows schema	Renders as submodel
select	Value belongs to set	<select />
radios	Value belongs to set	<Radio />
boolean	Value is boolean	<input type="checkbox />
password
*/

const config = null;
const isValidNode = (stateNode: any) => stateNode && stateNode.ctx;
const setParent = (parent: any, key: any, val: any) =>
  parent && { ...parent, [key]: val };

const scan = () => {
  const res = traverse.traverse(
    mock1,
    {},
    {
      onValue: (stateNode) => {
        // console.log("onValue c ", stateNode.ctx);
        if (!isValidNode(stateNode)) return false;
        const ctx = stateNode && stateNode.ctx;
        const key = ctx.key ? ctx.key : "";
        const parent = ctx.parent ? ctx.parent : {};
        parent[key] = ctx.value ? getType(ctx.value) : "string"; // setParent(ctx.parent, key, getType(ctx.value));

        console.log("onValue", stateNode.ctx);
      },
      onArray: (stateNode) => {
        if (!isValidNode(stateNode)) return false;
        //  console.log("onAr", stateNode.ctx);
      },
      onObject: (stateNode) => {
        if (!isValidNode(stateNode)) return false;
        // createSchema;
        //  console.log("onObj", stateNode.ctx);
      }
    }
  );
  console.log("result ", mock1.a);
};

scan();

export default function FormExample() {
  return (
    <div className="App">
      <h3>Auto form </h3>
    </div>
  );
}
