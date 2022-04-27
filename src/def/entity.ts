export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export interface JSONArray extends Array<JSONValue> {}

var stuff2: JSONObject = { a: { b: 3 } };

stuff2["b"] = 5;

const sObj: JSONObject = JSON.parse('{"a":4, "b":[1,2,"ciao"]}');

type ext = (str: string) => JSONValue;

const fjVal: ext = (key: string) => sObj[key];

const jval: JSONValue = fjVal("b");

const jval2: JSONValue = sObj["b"];

console.log("sobj", sObj);
console.log("sval", jval, jval2);
