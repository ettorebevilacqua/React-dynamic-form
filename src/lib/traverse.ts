import * as objTraverse from "object-traversal";

/* parent: ArbitraryObject | null; // parent is null when callback is being called on the root `object`
  key: string | null; // key is null when callback is being called on the root `object`
  value: any;
  meta: {
    nodePath?: string | null;
    visitedNodes: WeakSet<ArbitraryObject>;
    depth: number;
  };

  export function reduce<T>(source: object, initialValue: T, fn: (accumulator: T, node: WalkNode) => T): T {
    let val = initialValue;
    for (let node of walkStep(source))
        val = fn(val, node);
    return val;
}

  reduce(
    source: object, 
    initialValue: T, 
    fn: (accumulator: T, node: WalkNode) => T
): T
*/

interface stateNode {
  ctx: objTraverse.TraversalCallbackContext;
  state: any;
}

type stateNodeEvent = (ctx: stateNode) => any;

interface CtxTraverseEvent {
  onObject?: stateNodeEvent;
  onArray?: stateNodeEvent;
  onValue?: stateNodeEvent;
  onNode?: stateNodeEvent;
}

const callBackState = (state: any, events: CtxTraverseEvent) => (
  ctx: objTraverse.TraversalCallbackContext
) => {
  const callBack: stateNodeEvent | undefined = Array.isArray(ctx.value)
    ? events?.onArray
    : typeof ctx.value === "object"
    ? events?.onObject
    : events?.onValue;

  return callBack && callBack({ ctx, state });
};

export function traverse(
  obj: any,
  initialVal: any,
  nodeEvent: CtxTraverseEvent
) {
  objTraverse.traverse(obj, callBackState(initialVal, nodeEvent));
  console.log("zzz a", obj);
  return obj;
}
