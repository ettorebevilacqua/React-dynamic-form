import React from "react";

// https://codesandbox.io/s/dynamic-renderer-react-jean182-forked-0s6ptw

/* type aaa = React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>;

interface IKeysToComponentMap {
  form: aaa;
  input: React.FC;
  div: React.FC;
  select: React.FC;
  img: React.FC;
}

interface Config {
  component: string;
  children?: Array<Config>;
  src?: string;
}

*/

const KeysToComponentMap = {
  form: (props) => <form {...props} />,
  input: (props) => <input {...props} />,
  div: (props) => <div {...props} />,
  select: (props) => <select {...props} />,
  img: (props) => <img {...props} />
};

function renderer(config) {
  // if (!KeysToComponentMap[config.component]) return  React.createElement(()=>< />);

  return React.createElement(
    KeysToComponentMap[config.component],
    config.props,
    config.children &&
      (typeof config.children === "string"
        ? config.children
        : config.children.map((c) => renderer(c)))
  );
  // return React.createElement(KeysToComponentMap.form, {}, ["aaaa"]);
}

export default renderer;
