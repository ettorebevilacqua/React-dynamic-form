import * as entity from "./entity";
export const isPrimitive = (val: entity.JSONValue) =>
  ["string", "boolean", "number"].indexOf(typeof val) > -1;

export type KeyProp = string | number;

export type PropEvent = (prop: KeyProp, val: entity.JSONValue, acc: any) => any;

const scan = (
  cb: PropEvent,
  obj: entity.JSONObject | entity.JSONArray,
  acc: any
): any => {
  const objT = obj as any;
  return Object.keys(obj).map((key) =>
    obj.hasOwnProperty(key) ? (acc = cb(key, objT[key], acc)) : acc
  );
};

export function scanner(
  obj: entity.JSONObject | entity.JSONArray,
  acc: any,
  onElem: PropEvent
): void {
  const _onProp: PropEvent = (
    prop: KeyProp,
    val: entity.JSONValue,
    acc: entity.JSONValue
  ) =>
    isPrimitive(val)
      ? onElem(prop, val, acc)
      : scan(_onProp, val as entity.JSONObject, onElem(prop, val, acc));

  scan(_onProp, obj, acc);
  return acc;
}

/*
const mock1 = {
  a: "",
  b: [3, 4, { c: "", d: [1, 2, 3] }]
};

export const onPropRebuild = (
  prop: KeyProp,
  val: entity.JSONValue,
  acc: entity.JSONValue
): entity.JSONValue => {
  let accObj = acc as entity.JSONObject;
  accObj[prop] = typeof val !== "object" ? val : Array.isArray(val) ? [] : {};

  return typeof val !== "object" ? accObj : accObj[prop];
};

const a = scanner(mock1, {}, onPropRebuild);
console.log("xzs", a);
*/
