/* eslint-disable no-undef */
import {
  nodeById,
  edgeById,
  edgeByChildNode,
  edgeByParentPiece,
  nodePositionById,
} from "../src/utils/tree";

import reducer from "../src/store/reducers";

let state = {
  expressionTreeEditor: {
    nodes: [],
    edges: [],
    dragEdge: null,
    selectedNode: null,
    selectedEdge: null,
    selectedRootNode: null,

    addingNode: false,
    addValue: [],
    editValue: [],
    typeValue: "",
    nodeValue: "",
  },
};

describe("lookup functions", () => {
  it("nodeById should find node", () => {
    const node = { id: 3 };
    const nodes = [{ id: 1 }, node, { id: 2 }];
    expect(nodeById(node.id, nodes)).toBe(node);
  });
  it("nodeById should throw for null id", () => {
    const nodes = [];
    expect(() => nodeById(null, nodes)).toThrow(Error);
  });
  it("nodeById should throw for undefined id", () => {
    const nodes = [];
    expect(() => nodeById(undefined, nodes)).toThrow(Error);
  });
  it("nodeById should throw if node not found", () => {
    const nodes = [];
    expect(() => nodeById(1, nodes)).toThrow(Error);
  });

  it("edgeById should find edge", () => {
    const edge = { id: 3 };
    const edges = [{ id: 1 }, edge, { id: 2 }];
    expect(edgeById(edge.id, edges)).toBe(edge);
  });
  it("edgeById should throw for null id", () => {
    const edges = [];
    expect(() => edgeById(null, edges)).toThrow(Error);
  });
  it("edgeById should throw for undefined id", () => {
    const edges = [];
    expect(() => edgeById(undefined, edges)).toThrow(Error);
  });
  it("edgeById should throw if edge not found", () => {
    const edges = [];
    expect(() => edgeById(1, edges)).toThrow(Error);
  });

  it("edgeByChildNode should find edge", () => {
    const edge = { id: 3, childNodeId: 5 };
    const edges = [{ id: 1, childNodeId: 2 }, edge, { id: 2, childNodeId: 3 }];
    expect(edgeByChildNode(5, edges)).toStrictEqual([edge]);
  });
  it("edgeByChildNode should return empty array if edge not found", () => {
    const edges = [];
    expect(edgeByChildNode(5, edges)).toStrictEqual([]);
  });

  it("edgeByParentPiece should find edge", () => {
    const edge = { id: 3, parentNodeId: 5, parentPieceId: 10 };
    const edges = [
      { id: 1, parentNodeId: 5, parentPieceId: 6 },
      edge,
      { id: 2, parentNodeId: 6, parentPieceId: 10 },
    ];
    expect(
      edgeByParentPiece(edge.parentNodeId, edge.parentPieceId, edges),
    ).toStrictEqual([edge]);
  });
  it("edgeByParentPiece should return empty array if edge not found", () => {
    const edge = { id: 3, parentNodeId: 5, parentPieceId: 10 };
    const edges = [];
    expect(
      edgeByParentPiece(edge.parentNodeId, edge.parentPieceId, edges),
    ).toStrictEqual([]);
  });

  it("nodePositionById should find node", () => {
    const nodePosition = { x: 10, y: 20 };
    const nodes = [
      { id: 1, x: 20, y: 10 },
      { id: 3, x: 10, y: 20 },
      { id: 2, x: 30, y: 40 },
    ];
    expect(nodePositionById(3, nodes)).toStrictEqual(nodePosition);
  });
  it("nodePositionById should throw for null id", () => {
    const nodes = [
      { id: 1, x: 20, y: 10 },
      { id: 3, x: 10, y: 20 },
      { id: 2, x: 30, y: 40 },
    ];
    expect(() => nodePositionById(undefined, nodes)).toThrow(Error);
  });
  it("nodePositionById should throw for undefined id", () => {
    const nodes = [
      { id: 1, x: 20, y: 10 },
      { id: 3, x: 10, y: 20 },
      { id: 2, x: 30, y: 40 },
    ];
    expect(() => nodePositionById(undefined, nodes)).toThrow(Error);
  });
  it("nodePositionById should throw if node not found", () => {
    const nodes = [];
    expect(() => nodePositionById(1, nodes)).toThrow(Error);
  });
});

describe("editor reducer", () => {
  it("should handle addNode", () => {
    const pieces = ["a", "{{}}", "b"];
    state = reducer(state, {
      type: "addNode",
      payload: {
        pieces,
        x: 10,
        y: 20,
        type: "",
        value: "",
        isFinal: false,
      },
    });
    expect(state.expressionTreeEditor.nodes).toEqual([
      {
        id: 1,
        pieces,
        x: 10,
        y: 20,
        type: "",
        value: "",
        isFinal: false,
      },
    ]);
    state = reducer(state, {
      type: "addNode",
      payload: {
        pieces,
        x: 100,
        y: 200,
        type: "",
        value: "",
        isFinal: false,
      },
    });
    expect(state.expressionTreeEditor.nodes).toEqual([
      {
        id: 1,
        pieces,
        x: 10,
        y: 20,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 2,
        pieces,
        x: 100,
        y: 200,
        type: "",
        value: "",
        isFinal: false,
      },
    ]);
    state = reducer(state, {
      type: "addNode",
      payload: {
        pieces,
        x: 20,
        y: 10,
        type: "",
        value: "",
        isFinal: false,
      },
    });
    expect(state.expressionTreeEditor.nodes).toEqual([
      {
        id: 1,
        pieces,
        x: 10,
        y: 20,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 2,
        pieces,
        x: 100,
        y: 200,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 3,
        pieces,
        x: 20,
        y: 10,
        type: "",
        value: "",
        isFinal: false,
      },
    ]);
    state = reducer(state, {
      type: "addNode",
      payload: {
        pieces,
        x: 200,
        y: 100,
        type: "",
        value: "",
        isFinal: true,
      },
    });
    expect(state.expressionTreeEditor.nodes).toEqual([
      {
        id: 1,
        pieces,
        x: 10,
        y: 20,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 2,
        pieces,
        x: 100,
        y: 200,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 3,
        pieces,
        x: 20,
        y: 10,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 4,
        pieces,
        x: 200,
        y: 100,
        type: "",
        value: "",
        isFinal: true,
      },
    ]);
  });

  it("should handle nodeTypeEdit and nodeValueEdit", () => {
    state = reducer(state, {
      type: "nodeTypeEdit",
      payload: {
        type: "String",
        selectedNodeId: 1,
      },
    });
    state = reducer(state, {
      type: "nodeValueEdit",
      payload: {
        value: '"Hello world!"',
        selectedNodeId: 1,
      },
    });
    expect(state.expressionTreeEditor.nodes).toEqual([
      {
        id: 1,
        pieces: ["a", "{{}}", "b"],
        x: 10,
        y: 20,
        type: "String",
        value: '"Hello world!"',
        isFinal: false,
      },
      {
        id: 2,
        pieces: ["a", "{{}}", "b"],
        x: 100,
        y: 200,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 3,
        pieces: ["a", "{{}}", "b"],
        x: 20,
        y: 10,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 4,
        pieces: ["a", "{{}}", "b"],
        x: 200,
        y: 100,
        type: "",
        value: "",
        isFinal: true,
      },
    ]);
  });

  it("should handle addEdge", () => {
    const edge1 = {
      childNodeId: 2,
      parentNodeId: 1,
      parentPieceId: 1,
    };
    state = reducer(state, {
      type: "addEdge",
      payload: { edge: edge1 },
    });
    expect(state.expressionTreeEditor.edges).toEqual([{ id: 1, ...edge1 }]);
    const edge2 = {
      childNodeId: 3,
      parentNodeId: 2,
      parentPieceId: 1,
    };
    state = reducer(state, {
      type: "addEdge",
      payload: { edge: edge2 },
    });
    expect(state.expressionTreeEditor.edges).toEqual([
      { id: 1, ...edge1 },
      { id: 2, ...edge2 },
    ]);
    const edge3 = {
      childNodeId: 4,
      parentNodeId: 3,
      parentPieceId: 1,
    };
    state = reducer(state, {
      type: "addEdge",
      payload: { edge: edge3 },
    });
    expect(state.expressionTreeEditor.edges).toEqual([
      { id: 1, ...edge1 },
      { id: 2, ...edge2 },
      { id: 3, ...edge3 },
    ]);
  });

  it("should handle updateEdge", () => {
    const newEdge3 = {
      id: 3,
      childNodeId: 1,
      parentNodeId: 1,
      parentPieceId: 1,
    };
    state = reducer(state, {
      type: "updateEdge",
      payload: { edgeId: 3, newEdge: newEdge3 },
    });
    expect(state.expressionTreeEditor.edges).toEqual([
      {
        id: 1,
        childNodeId: 2,
        parentNodeId: 1,
        parentPieceId: 1,
      },
      {
        id: 2,
        childNodeId: 3,
        parentNodeId: 2,
        parentPieceId: 1,
      },
      {
        id: 3,
        childNodeId: 1,
        parentNodeId: 1,
        parentPieceId: 1,
      },
    ]);
  });

  it("should handle selectNode, clearNodeSelection", () => {
    state = reducer(state, {
      type: "selectNode",
      payload: { selectedNode: { id: 2 } },
    });
    expect(state.expressionTreeEditor.selectedNode.id).toEqual(2);
    state = reducer(state, {
      type: "clearNodeSelection",
    });
    expect(state.expressionTreeEditor.selectedNode).toEqual(null);
  });

  it("should handle selectRootNode, clearRootSelection", () => {
    const selectedRootNode = nodeById(1, state.expressionTreeEditor.nodes);
    state = reducer(state, {
      type: "selectRootNode",
      payload: { selectedRootNode },
    });
    expect(state.expressionTreeEditor.selectedRootNode).toEqual(
      selectedRootNode,
    );
    state = reducer(state, {
      type: "clearRootSelection",
      payload: {},
    });
    expect(state.expressionTreeEditor.selectedRootNode).toEqual(null);
  });

  it("should handle selectEdge, clearEdgeSelection", () => {
    state = reducer(state, {
      type: "selectEdge",
      payload: { selectedEdge: { id: 1 } },
    });
    expect(state.expressionTreeEditor.selectedEdge.id).toEqual(1);
    state = reducer(state, {
      type: "clearEdgeSelection",
    });
    expect(state.expressionTreeEditor.selectedEdge).toEqual(null);
  });

  it("should handle moveNodeTo", () => {
    state = reducer(state, {
      type: "moveNodeTo",
      payload: { nodeId: 3, x: 30, y: 40 },
    });
    expect(state.expressionTreeEditor.nodes).toEqual([
      {
        id: 1,
        pieces: ["a", "{{}}", "b"],
        x: 10,
        y: 20,
        type: "String",
        value: '"Hello world!"',
        isFinal: false,
      },
      {
        id: 2,
        pieces: ["a", "{{}}", "b"],
        x: 100,
        y: 200,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 3,
        pieces: ["a", "{{}}", "b"],
        x: 30,
        y: 40,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 4,
        pieces: ["a", "{{}}", "b"],
        x: 200,
        y: 100,
        type: "",
        value: "",
        isFinal: true,
      },
    ]);
    state = reducer(state, {
      type: "moveNodeTo",
      payload: { nodeId: 1, x: 40, y: 30 },
    });
    expect(state.expressionTreeEditor.nodes).toEqual([
      {
        id: 1,
        pieces: ["a", "{{}}", "b"],
        x: 40,
        y: 30,
        type: "String",
        value: '"Hello world!"',
        isFinal: false,
      },
      {
        id: 2,
        pieces: ["a", "{{}}", "b"],
        x: 100,
        y: 200,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 3,
        pieces: ["a", "{{}}", "b"],
        x: 30,
        y: 40,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 4,
        pieces: ["a", "{{}}", "b"],
        x: 200,
        y: 100,
        type: "",
        value: "",
        isFinal: true,
      },
    ]);
  });

  it("should handle setDragEdge, clearDragEdge", () => {
    const dragEdge1 = {
      originalEdgeId: null,
      updateParent: false,
      parentNodeId: 4,
      parentX: 200,
      parentY: 100,
      childX: 40,
      childY: 30,
    };
    state = reducer(state, {
      type: "setDragEdge",
      payload: { dragEdge: dragEdge1 },
    });
    expect(state.expressionTreeEditor.dragEdge).toEqual({ ...dragEdge1 });
    state = reducer(state, { type: "clearDragEdge" });
    expect(state.expressionTreeEditor.dragEdge).toEqual(null);
    const dragEdge2 = {
      originalEdgeId: 3,
      updateParent: false,
      parentNodeId: 3,
      parentPieceId: 1,
      parentX: 30,
      parentY: 40,
      childX: 200,
      childY: 100,
    };
    state = reducer(state, {
      type: "setDragEdge",
      payload: { dragEdge: dragEdge2 },
    });
    expect(state.expressionTreeEditor.dragEdge).toEqual({ ...dragEdge2 });
  });

  it("should handle moveDragEdgeParentEndTo", () => {
    state = reducer(state, {
      type: "moveDragEdgeParentEndTo",
      payload: { x: 10, y: 20 },
    });
    expect(state.expressionTreeEditor.dragEdge.parentX).toEqual(10);
    expect(state.expressionTreeEditor.dragEdge.parentY).toEqual(20);
    state = reducer(state, {
      type: "moveDragEdgeParentEndTo",
      payload: { x: 100, y: 200 },
    });
    expect(state.expressionTreeEditor.dragEdge.parentX).toEqual(100);
    expect(state.expressionTreeEditor.dragEdge.parentY).toEqual(200);
  });

  it("should handle moveDragEdgeChildEndTo", () => {
    state = reducer(state, {
      type: "moveDragEdgeChildEndTo",
      payload: { x: 10, y: 20 },
    });
    expect(state.expressionTreeEditor.dragEdge.childX).toEqual(10);
    expect(state.expressionTreeEditor.dragEdge.childY).toEqual(20);
    state = reducer(state, {
      type: "moveDragEdgeChildEndTo",
      payload: { x: 100, y: 200 },
    });
    expect(state.expressionTreeEditor.dragEdge.childX).toEqual(100);
    expect(state.expressionTreeEditor.dragEdge.childY).toEqual(200);
  });

  it("should handle removeEdge", () => {
    state = reducer(state, {
      type: "removeEdge",
      payload: { edgeId: 3 },
    });
    expect(state.expressionTreeEditor.edges).toEqual([
      {
        id: 1,
        childNodeId: 2,
        parentNodeId: 1,
        parentPieceId: 1,
      },
      {
        id: 2,
        childNodeId: 3,
        parentNodeId: 2,
        parentPieceId: 1,
      },
    ]);
  });

  it("should handle editNode", () => {
    state = reducer(state, {
      type: "editNode",
      payload: {
        pieces: ["a", "{{}}", "c"],
        selectedNodeId: 2,
      },
    });
    expect(state.expressionTreeEditor.nodes).toEqual([
      {
        id: 1,
        pieces: ["a", "{{}}", "b"],
        x: 40,
        y: 30,
        type: "String",
        value: '"Hello world!"',
        isFinal: false,
      },
      {
        id: 2,
        pieces: ["a", "{{}}", "c"],
        x: 100,
        y: 200,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 3,
        pieces: ["a", "{{}}", "b"],
        x: 30,
        y: 40,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 4,
        pieces: ["a", "{{}}", "b"],
        x: 200,
        y: 100,
        type: "",
        value: "",
        isFinal: true,
      },
    ]);
    expect(state.expressionTreeEditor.edges).toEqual([
      {
        id: 1,
        childNodeId: 2,
        parentNodeId: 1,
        parentPieceId: 1,
      },
    ]);
  });

  it("should handle removeNode", () => {
    state = reducer(state, {
      type: "removeNode",
      payload: { nodeId: 2 },
    });
    expect(state.expressionTreeEditor.nodes).toEqual([
      {
        id: 1,
        pieces: ["a", "{{}}", "b"],
        x: 40,
        y: 30,
        type: "String",
        value: '"Hello world!"',
        isFinal: false,
      },
      {
        id: 3,
        pieces: ["a", "{{}}", "b"],
        x: 30,
        y: 40,
        type: "",
        value: "",
        isFinal: false,
      },
      {
        id: 4,
        pieces: ["a", "{{}}", "b"],
        x: 200,
        y: 100,
        type: "",
        value: "",
        isFinal: true,
      },
    ]);
    expect(state.expressionTreeEditor.edges).toEqual([]);
  });

  it("should handle stageReset", () => {
    state = reducer(state, {
      type: "stageReset",
      payload: { initialNodes: [], initialEdges: [] },
    });
    expect(state.expressionTreeEditor).toEqual({
      nodes: [],
      edges: [],
      dragEdge: null,
      selectedNode: null,
      selectedEdge: null,
      selectedRootNode: null,
      addingNode: false,
      addValue: [],
      editValue: [],
      typeValue: "",
      nodeValue: "",
    });
  });
});

describe("drawer reducer", () => {
  it("should handle addingNodeClick and clearAdding", () => {
    state = reducer(state, {
      type: "addingNodeClick",
    });
    expect(state.expressionTreeEditor.addingNode).toEqual(true);
    state = reducer(state, {
      type: "addingNodeClick",
    });
    expect(state.expressionTreeEditor.addingNode).toEqual(false);
    state = reducer(state, {
      type: "addingNodeClick",
    });
    expect(state.expressionTreeEditor.addingNode).toEqual(true);
    state = reducer(state, {
      type: "clearAdding",
    });
    expect(state.expressionTreeEditor.addingNode).toEqual(false);
  });

  it("should handle addValueChange", () => {
    state = reducer(state, {
      type: "addValueChange",
      payload: { addValue: ["a", "{{}}", "b"] },
    });
    expect(state.expressionTreeEditor.addValue).toEqual(["a", "{{}}", "b"]);
  });

  it("should handle editValueChange", () => {
    state = reducer(state, {
      type: "editValueChange",
      payload: { editValue: ["a", "{{}}", "c"] },
    });
    expect(state.expressionTreeEditor.editValue).toEqual(["a", "{{}}", "c"]);
  });

  it("should handle typeValueChange", () => {
    state = reducer(state, {
      type: "typeValueChange",
      payload: { typeValue: "String" },
    });
    expect(state.expressionTreeEditor.typeValue).toEqual("String");
  });

  it("should handle nodeValueChange", () => {
    state = reducer(state, {
      type: "nodeValueChange",
      payload: { nodeValue: '"Hello World!' },
    });
    expect(state.expressionTreeEditor.nodeValue).toEqual('"Hello World!');
  });
});
