import React from "react";

import Dinamic from "../lib/dinamicComp";

interface Config {
  component: string;
  children?: Array<Config> | string;
  props?: any;
}

const config: Array<Config> = [
  {
    component: "div",
    props: { onClicl: "aa", key: 1 },
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

export default function DinamicExample() {
  return <div className="App">{config.map((config) => Dinamic(config))}</div>;
}
