export function exportState(state) {
  const {
    nodes,
    edges,
    selectedRootNode,
    stagePos,
    stageScale,
    connectorPlaceholder,
  } = state;

  return {
    nodes,
    edges,
    selectedRootNode,
    stagePos,
    stageScale,
    connectorPlaceholder,
  };
}

export function createUniqueId() {
  return `_${Math.random().toString(10).substr(2, 9)}`;
}

export function arraysAreEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  let isEqual = true;
  a.forEach((elem, index) => {
    if (a[index] !== b[index]) {
      isEqual = false;
    }
  });

  return isEqual;
}

export function createEmptyNode(id) {
  return {
    id: id || createUniqueId(),
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    pieces: [""],
    piecesPosition: [0],
    type: "",
    typeSuperScript: "",
    value: "",
    isSelected: false,
    isHighlighted: false,
    visibility: 0,
    isTypeLabelHighlighted: false,
    isValueLabelHighlighted: false,
    childEdges: [],
    parentEdges: [[]],
    editable: {
      label: true,
      type: true,
      value: true,
      delete: true,
    },
    isMathNode: false,
    mathPieces: [],
    commentable: {
      addThread: true,
      deleteThread: true,
      resolveThread: true,
      addComment: true,
      deleteComment: true,
    },
    commentThreads: [],
  };
}

export function createEmptyEdge(id) {
  return {
    id: id || createUniqueId(),
    parentNodeId: undefined,
    parentPieceId: undefined,
    childNodeId: undefined,
    childX: 0,
    childY: 0,
    parentX: 0,
    parentY: 0,
    isHighlighted: false,
    visibility: 0,
    commentable: {
      addThread: true,
      deleteThread: true,
      resolveThread: true,
      addComment: true,
      deleteComment: true,
    },
    commentThreads: [],
  };
}

export function createEmptyAnnotation(id) {
  return {
    id: id || createUniqueId(),
    x: 0,
    y: 0,
    text: "",
    color: { hex: "#35BFFF", rgb: [53, 191, 255] },
    editable: {
      value: true,
      delete: true,
    },
  };
}
