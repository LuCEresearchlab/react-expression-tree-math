/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint comma-dangle: ["error", {"functions": "never"}] */
/* eslint no-use-before-define: ["error", { "functions": false }] */

/**
 * Layout an ET diagram.
 * The ET diagram consists of two areas, one placed above the other:
 *
 * 1. The forest area
 * 2. The singleton area
 *
 * Every node that has no parent and no children is a "singleton" node.
 * All singleton nodes are placed into the singleton area.
 * The singleton area contains the singleton nodes placed next to each other.
 *
 * Every node that has either a parent, children, or both is part of a (non-singleton) tree.
 * All (non-singleton) trees are placed in the forest area.
 * The forest area contains the trees, one next to the other.
 *
 * Zero or one of the nodes may be a selected tree root.
 * However, it does not matter whether a node is the selected root or not;
 * if a node is part of a tree, then it is shown in the forest.
 *
 * An ET diagram represented as a dictionary of nodes, a dictionary of edges,
 * and a selected root node id.
 * The ID of the root of the selected tree is given as the selectedRootNodeId.
 * However, which root node is selected does not affect the layout.
 *
 * Below is an example ET forest. That forest contains three nodes and two edges,
 * making up a single tree. That tree is selected (its root node is the selected root node)
 *
 * <code>
    const nodes = {
      n0: {
        pieces: ['#', '+', '#'],
        type: 'Number',
        value: '10',
        x: 320,
        y: 90,
      },
      n1: {
        pieces: ['#', '-', '#'],
        type: 'Boolean',
        value: 'true',
        x: 320,
        y: 120,
      },
      n2: {
        pieces: ['#', '/', '#'],
        type: 'Object',
        value: '',
        x: 320,
        y: 150,
      },
    };
    const edges = {
      e0: {
        parentNodeId: 'n0',
        parentPieceId: 0,
        childNodeId: 'n1',
      },
      e1: {
        parentNodeId: 'n0',
        parentPieceId: 2,
        childNodeId: 'n2',
      },
    };
    const selectedRootNodeId ='n0';
 * </code>
 *
 * @author Matthias.Hauswirth@usi.ch
 */

// constants used in layout computations below
const topMargin = 80;
const leftMarginDrawer = 330;
const leftMarginComments = 430;
const rightMargin = 40;
const nodeHorizontalGap = 20;
const nodeVerticalGap = 60;
const treeGap = 60;
const forestSingletonsGap = 100;
const singletonsAnnotationsGap = 50;

/**
 * Return an array of node IDs for all children of the given parent node ID,
 * sorted in the order of the parent's hole pieces.
 *
 * @param {*} nodeId the parent node ID
 * @param {*} nodes all nodes
 * @param {*} edges all edges
 * @returns the ordered array of child node IDs for the given parent
 */
export function getSortedChildIds(nodeId, nodes, edges) {
  return Object.keys(edges)
    .filter((edgeId) => edges[edgeId].parentNodeId === nodeId)
    .sort(
      (edgeId1, edgeId2) =>
        edges[edgeId1].parentPieceId - edges[edgeId2].parentPieceId,
    )
    .map((edgeId) => edges[edgeId].childNodeId);
}

export function isRootId(nodeId, nodes, edges) {
  return Object.keys(edges).every(
    (edgeId) => edges[edgeId].childNodeId !== nodeId,
  );
}

/**
 * Is this the ID of a singleton node (no partent, no children)?
 *
 * @param {*} nodeId the ID of the node
 * @param {*} nodes all nodes
 * @param {*} edges all edges
 * @returns true if the node with nodeId is a singleton node, false otherwise
 */
export function isSingletonId(nodeId, nodes, edges) {
  return Object.keys(edges).every(
    (edgeId) =>
      edges[edgeId].childNodeId !== nodeId &&
      edges[edgeId].parentNodeId !== nodeId,
  );
}

export function getRootIds(nodes, edges) {
  return Object.keys(nodes).filter((nodeId) => isRootId(nodeId, nodes, edges));
}

export function getNonSingletonRootIds(nodes, edges) {
  return getRootIds(nodes, edges).filter(
    (nodeId) => !isSingletonId(nodeId, nodes, edges),
  );
}

export function getSingletonNodeIds(nodes, edges) {
  return Object.keys(nodes).filter((nodeId) =>
    isSingletonId(nodeId, nodes, edges),
  );
}

// --- Size computation functions
export function computeDescendantsWidth(rootId, nodes, edges, visitedNodes) {
  return getSortedChildIds(rootId, nodes, edges).reduce(
    (width, childId, index) =>
      width +
      computeTreeWidth(childId, nodes, edges, visitedNodes) +
      (index > 0 ? nodeHorizontalGap : 0),
    0,
  );
}

export function computeTreeWidth(rootId, nodes, edges, visitedNodes) {
  const rootNode = nodes[rootId];
  const myWidth = rootNode.width;
  if (visitedNodes.includes(rootId)) {
    return 0;
  }
  visitedNodes.push(rootId);
  const descendantsWidth = computeDescendantsWidth(
    rootId,
    nodes,
    edges,
    visitedNodes,
  );
  return Math.max(myWidth, descendantsWidth);
}

export function computeTreeHeight(rootId, nodes, edges, visitedNodes) {
  const rootNode = nodes[rootId];
  const myHeight = rootNode.height;
  if (visitedNodes.includes(rootId)) {
    return 0;
  }
  visitedNodes.push(rootId);
  const descendantsHeight = getSortedChildIds(rootId, nodes, edges).reduce(
    (height, childId) =>
      Math.max(height, computeTreeHeight(childId, nodes, edges, visitedNodes)),
    0,
  );
  return (
    myHeight + (descendantsHeight > 0 ? nodeVerticalGap + descendantsHeight : 0)
  );
}

// --- Layout functions (they mutate the nodes!)
export function layoutTree(rootId, nodes, edges, x, y, visitedNodes) {
  if (visitedNodes.includes(rootId)) {
    return [0, 0];
  }
  visitedNodes.push(rootId);
  const rootNode = nodes[rootId];
  const rootWidth = rootNode.width;
  const rootHeight = rootNode.height;
  const descendantsWidth = computeDescendantsWidth(rootId, nodes, edges, [
    rootId,
  ]);
  const rootIndent =
    rootWidth > descendantsWidth ? 0 : (descendantsWidth - rootWidth) / 2;
  const descendantsIndent =
    rootWidth > descendantsWidth ? (rootWidth - descendantsWidth) / 2 : 0;
  let dx = x + descendantsIndent;
  const dy = y + rootHeight + nodeVerticalGap;
  const childIds = getSortedChildIds(rootId, nodes, edges);
  childIds.forEach((childId, index) => {
    const [dw, dh] = layoutTree(childId, nodes, edges, dx, dy, visitedNodes);
    dx += dw + (index < childIds.length - 1 ? nodeHorizontalGap : 0);
  });
  const root = nodes[rootId];
  root.x = x + rootIndent;
  root.y = y;
  const treeWidth = computeTreeWidth(rootId, nodes, edges, []);
  const treeHeight = computeTreeHeight(rootId, nodes, edges, []);
  return [treeWidth, treeHeight];
}

export function placeSingleton(node, x, y) {
  node.x = x;
  node.y = y;
}

export function layout(
  nodes,
  edges,
  annotations,
  selectedRootNodeId,
  hasLeftMarginDrawer,
  hasLeftMarginComments,
  canvasWidth,
) {
  // top/left position of the drawing
  const x = hasLeftMarginDrawer
    ? leftMarginDrawer
    : hasLeftMarginComments
    ? leftMarginComments
    : topMargin;
  const y = topMargin;
  // width/height of forest part of the drawing
  let forestWidth = 0;
  let forestHeight = 0;
  let forestLevel = 0;
  let forestLevelsWidth = [0];
  let forestLevelsMaxHeight = [0];
  getNonSingletonRootIds(nodes, edges).forEach((rootId) => {
    const [treeWidth, treeHeight] = layoutTree(
      rootId,
      nodes,
      edges,
      x + forestWidth,
      y +
        forestLevelsMaxHeight.slice(0, forestLevel).reduce((a, b) => a + b, 0) +
        forestLevel * treeGap,
      [],
    );
    forestWidth += treeWidth + treeGap;
    forestLevelsWidth[forestLevel] += treeWidth + treeGap;
    forestLevelsMaxHeight[forestLevel] = Math.max(
      forestLevelsMaxHeight[forestLevel],
      treeHeight,
    );
    const forestNewLevel = x + forestWidth + rightMargin > canvasWidth;
    if (forestNewLevel) {
      forestWidth = 0;
      forestLevel += 1;
      forestLevelsMaxHeight.push(0);
      forestLevelsWidth.push(0);
    }
  });
  forestHeight =
    forestLevelsMaxHeight.reduce((a, b) => a + b, 0) + forestLevel * treeGap;
  // width/height of singletons part of the drawing
  let singletonsWidth = 0;
  let singletonsHeight = 0;
  let singletonsLevel = 0;
  let singletonsLevelsMaxHeight = [0];
  let singletonsLevelsWidth = [0];
  getSingletonNodeIds(nodes, edges).forEach((nodeId) => {
    const node = nodes[nodeId];
    const nodeWidth = node.width;
    const nodeHeight = node.height;
    const singletonsNewLevel =
      x + singletonsWidth + nodeWidth + rightMargin > canvasWidth;
    if (singletonsNewLevel) {
      singletonsWidth = 0;
      singletonsLevel += 1;
      singletonsLevelsMaxHeight.push(0);
      singletonsLevelsWidth.push(0);
    }
    placeSingleton(
      node,
      x + singletonsWidth,
      y +
        forestHeight +
        (forestHeight === 0 ? 0 : forestSingletonsGap) +
        singletonsLevelsMaxHeight
          .slice(0, singletonsLevel)
          .reduce((a, b) => a + b, 0) +
        singletonsLevel * nodeVerticalGap,
    );
    singletonsWidth += nodeWidth + nodeHorizontalGap;
    singletonsLevelsWidth[singletonsLevel] += nodeWidth + nodeHorizontalGap;
    singletonsLevelsMaxHeight[singletonsLevel] = Math.max(
      singletonsLevelsMaxHeight[singletonsLevel],
      nodeHeight,
    );
  });
  singletonsHeight =
    singletonsLevelsMaxHeight.reduce((a, b) => a + b, 0) +
    singletonsLevel * nodeVerticalGap;

  // width/height of annotations part of the drawing
  let annotationsWidth = 0;
  let annotationsHeight = 0;
  let annotationsLevel = 0;
  let annotationsLevelsMaxHeight = [0];
  let annotationsLevelsWidth = [0];
  Object.keys(annotations).forEach((annotationId) => {
    const annotation = annotations[annotationId];
    const annotationWidth = annotation.width;
    const annotationHeight = annotation.height;
    const annotationsNewLevel =
      x + annotationsWidth + annotationWidth + rightMargin > canvasWidth;
    if (annotationsNewLevel) {
      annotationsWidth = 0;
      annotationsLevel += 1;
      annotationsLevelsMaxHeight.push(0);
      annotationsLevelsWidth.push(0);
    }
    placeSingleton(
      annotation,
      x + annotationsWidth,
      y +
        forestHeight +
        (forestHeight === 0 ? 0 : forestSingletonsGap) +
        singletonsHeight +
        (singletonsHeight === 0 ? 0 : singletonsAnnotationsGap) +
        annotationsLevelsMaxHeight
          .slice(0, annotationsLevel)
          .reduce((a, b) => a + b, 0) +
        annotationsLevel * nodeVerticalGap,
    );
    annotationsWidth += annotationWidth + nodeHorizontalGap;
    annotationsLevelsWidth[annotationsLevel] +=
      annotationWidth + nodeHorizontalGap;
    annotationsLevelsMaxHeight[annotationsLevel] = Math.max(
      annotationsLevelsMaxHeight[annotationsLevel],
      annotationHeight,
    );
  });
  annotationsHeight =
    annotationsLevelsMaxHeight.reduce((a, b) => a + b, 0) +
    annotationsLevel * nodeVerticalGap;

  // return width/height of the drawing
  return [
    Math.max(
      Math.max(...forestLevelsWidth),
      Math.max(...singletonsLevelsWidth),
      Math.max(...annotationsLevelsWidth),
    ),
    forestHeight +
      (forestHeight === 0 ? 0 : forestSingletonsGap) +
      singletonsHeight +
      (singletonsHeight === 0 ? 0 : singletonsAnnotationsGap) +
      annotationsHeight,
  ];
}
