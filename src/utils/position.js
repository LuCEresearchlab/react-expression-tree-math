/* eslint-disable no-loop-func */
import Konva from "konva";
import { layout } from "./layout";
import { createEmptyEdge, createEmptyNode } from "./state";

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

const createPositionUtils = (
  fontSize,
  fontFamily,
  connectorPlaceholder,
  placeholderWidth,
  nodePaddingX,
  nodePaddingY,
) => {
  const placeholderMiddle = placeholderWidth / 2;
  const gapWidth = fontSize / 5;

  // TODO adjust if fontFamily is changed from default
  const unitFontSizeWidth = 0.60009765625;
  const charWidth = fontSize * unitFontSizeWidth;

  // Compute the edge's child position having the child node id
  const computeEdgeChildPos = (childNodeId, nodes) => {
    const node = nodes[childNodeId];
    return {
      x: node.x + node.width / 2,
      y: node.y,
    };
  };

  // Compute the edge's parent position having the parent node and the parent piece ids,
  const computeEdgeParentPos = (parentNodeId, parentPieceX, nodes) => {
    const node = nodes[parentNodeId];
    return {
      x: node.x + nodePaddingX + parentPieceX + placeholderMiddle,
      y: node.y + nodePaddingY + fontSize / 2,
    };
  };

  // Compute a labele piece width
  const computePieceWidth = (text) => {
    if (text === connectorPlaceholder) {
      return placeholderWidth;
    }
    return text.length * charWidth;
  };

  // Compute all the label pieces width
  const computePiecesWidth = (pieces) => pieces.map(computePieceWidth);

  // Compute all the label pieces X coordinate positions
  const computeLabelPiecesXCoordinatePositions = (pieces) => {
    const labelPiecesWidth = computePiecesWidth(pieces);
    let pieceX = 0;
    const xes = labelPiecesWidth.map((w) => {
      const myX = pieceX;
      pieceX += w + gapWidth;
      return myX;
    });
    return xes;
  };

  // Compute the node width
  const computeNodeWidth = (isMathNode, pieces) => {
    if (isMathNode) {
      const minX = Math.min(
        ...pieces.map((piece) =>
          piece.type === "line" ? piece.linePoints.x1 : piece.x,
        ),
      );
      const maxX = Math.max(
        ...pieces.map((piece) =>
          piece.type === "line"
            ? piece.linePoints.x2
            : piece.type == "hole"
            ? piece.x + piece.width
            : piece.x + unitFontSizeWidth * piece.fontSize * piece.value.length,
        ),
      );
      return 2 * nodePaddingX + maxX - minX;
    } else {
      const piecesWidth = computePiecesWidth(pieces);
      const totalGapsWidth = 2 * nodePaddingX + gapWidth * (pieces.length - 1);
      const totalWidth = piecesWidth.reduce(
        (acc, width) => acc + width,
        totalGapsWidth,
      );
      return totalWidth;
    }
  };

  const computeNodeHeight = (isMathNode, pieces) => {
    if (isMathNode) {
      const minY = Math.min(
        ...pieces.map((piece) =>
          piece.type === "line" ? piece.linePoints.y1 : piece.y,
        ),
      );
      const maxY = Math.max(
        ...pieces.map((piece) =>
          piece.type === "line"
            ? piece.linePoints.y2
            : piece.type == "hole"
            ? piece.y + piece.height
            : piece.y + piece.fontSize,
        ),
      );
      return 2 * nodePaddingY + maxY - minY;
    } else {
      return 2 * nodePaddingY + fontSize;
    }
  };

  // Parse the nodes's pieces from a textfield string into the pieces array
  const parseLabelPieces = (label) => {
    const splittedArray = label.split(connectorPlaceholder);
    // TODO this is a temporary solution, there must be a better way to do this.
    const labelPieces = splittedArray.reduce((acc, piece, index) => {
      if (index === splittedArray.length - 1) {
        acc.push(piece);
      } else {
        acc.push(piece);
        acc.push(connectorPlaceholder);
      }
      return acc;
    }, []);
    return labelPieces;
  };

  const parseMathPieces = (mathPieces) => {
    const parsedMathPieces = mathPieces.map((mathPiece) =>
      mathPiece.type !== "line"
        ? {
            ...mathPiece,
            x: mathPiece.x + nodePaddingX,
            y: mathPiece.y + nodePaddingY,
          }
        : {
            ...mathPiece,
            linePoints: {
              ...mathPiece.linePoints,
              x1: mathPiece.linePoints.x1 + nodePaddingX,
              y1: mathPiece.linePoints.y1 + nodePaddingY,
              x2: mathPiece.linePoints.x2 + nodePaddingX,
              y2: mathPiece.linePoints.y2 + nodePaddingY,
            },
          },
    );
    return parsedMathPieces;
  };

  // Compute the closest child notd given an (x, y) point coordinate
  const closestChildId = (x, y, nodes) => {
    let closestNodeId = null;
    let closestDist = null;
    Object.keys(nodes).forEach((id) => {
      const pos = computeEdgeChildPos(id, nodes);
      const dist = distance(pos.x, pos.y, x, y);
      if (dist < fontSize && (!closestDist || dist < closestDist)) {
        closestDist = dist;
        closestNodeId = id;
      }
    });
    return closestNodeId;
  };

  // Compute the closest parent piece given an (x, y) point coordinate
  const closestParentPiece = (x, y, nodes) => {
    let closestPiece = null;
    let closestDist = Number.MAX_VALUE;
    Object.keys(nodes).forEach((id) => {
      if (!nodes[id].isMathNode) {
        const { pieces } = nodes[id];
        const piecesXCoordinates =
          computeLabelPiecesXCoordinatePositions(pieces);
        pieces.forEach((piece, i) => {
          if (piece === connectorPlaceholder) {
            const pieceX = piecesXCoordinates[i];
            const pos = computeEdgeParentPos(id, pieceX, nodes);
            const dist = distance(pos.x, pos.y, x, y);
            if (dist < fontSize && dist < closestDist) {
              closestDist = dist;
              closestPiece = {
                parentNodeId: id,
                parentPieceId: i,
              };
            }
          }
        });
      } else {
        const { mathPieces, x: nodeX, y: nodeY } = nodes[id];
        mathPieces.forEach((mathPiece, i) => {
          if (mathPiece.type === "hole") {
            const pos = {
              x: nodeX + mathPiece.x + mathPiece.width / 2,
              y: nodeY + mathPiece.y + mathPiece.height / 2,
            };
            const dist = distance(pos.x, pos.y, x, y);
            if (
              Math.abs(x - pos.x) < mathPiece.width / 2 + fontSize &&
              Math.abs(y - pos.y) < mathPiece.height / 2 + fontSize &&
              dist < closestDist
            ) {
              closestDist = dist;
              closestPiece = {
                parentNodeId: id,
                parentPieceId: i,
              };
            }
          }
        });
      }
    });
    return closestPiece;
  };

  const reorderChildNodes = (
    currentNode,
    nodes,
    edges,
    previouslyVisitedNodes,
    previousTreeDepth,
  ) => {
    const currentTreeDepth = previousTreeDepth + 1;

    const currentVisitedNodes = [...previouslyVisitedNodes, currentNode.id];

    const orderedChilds = currentNode.pieces.reduce(
      (accumulator, piece, pieceId) => {
        if (piece === connectorPlaceholder) {
          const edgesToParentIds = nodes[currentNode.id].parentEdges[pieceId];
          const edgesToParent = edgesToParentIds.map((id) => edges[id]);
          edgesToParent.forEach((edge) => {
            const childNode = nodes[edge.childNodeId];
            if (
              currentVisitedNodes.find((e) => e === childNode.id) === undefined
            ) {
              accumulator = [
                ...accumulator,
                ...reorderChildNodes(
                  childNode,
                  nodes,
                  edges,
                  currentVisitedNodes,
                  currentTreeDepth,
                ),
              ];
            }
          });
        }
        return accumulator;
      },
      [],
    );

    return [
      {
        id: currentNode.id,
        depth: previousTreeDepth,
      },
      ...orderedChilds,
    ];
  };

  const computeOrderedPositions = (
    startingX,
    startingY,
    spaceBetweenNodes,
    orderedNodes,
    nodes,
  ) => {
    const orderedNodesPositions = [];
    let depth = 0;
    let currentDepthNodes = orderedNodes.filter((n) => n.depth === depth);
    while (currentDepthNodes.length > 0) {
      if (depth === 0) {
        const node = nodes[currentDepthNodes[0].id];
        orderedNodesPositions.push({
          ...node,
          x: startingX - node.width / 2,
          y: startingY,
        });
      } else {
        const nodeReference = [];
        const relativeNodePosition = [0];
        let totalLevelWidth = 0;
        currentDepthNodes.forEach((n, index) => {
          const node = nodes[n.id];
          nodeReference.push(node);
          if (index !== currentDepthNodes.length - 1) {
            relativeNodePosition.push(
              relativeNodePosition[index] + node.width + spaceBetweenNodes,
            );
            totalLevelWidth += node.width + spaceBetweenNodes;
          } else {
            relativeNodePosition.push(relativeNodePosition[index] + node.width);
            totalLevelWidth += node.width;
          }
        });

        const levelStartingX = startingX - totalLevelWidth / 2;
        currentDepthNodes.forEach((n, index) => {
          orderedNodesPositions.push({
            ...nodeReference[index],
            x: levelStartingX + relativeNodePosition[index],
            y: startingY + depth * 100,
          });
        });
      }

      depth += 1;
      currentDepthNodes = orderedNodes.filter((n) => n.depth === depth);
    }

    return orderedNodesPositions;
  };

  const reorderNodes = (nodes, edges, selectedRootNode) => {
    if (selectedRootNode === undefined || selectedRootNode === null) {
      return nodes;
    }

    const rootNode = nodes[selectedRootNode];
    const orderedNodes = reorderChildNodes(rootNode, nodes, edges, [], 0);

    const startingX = 550;
    const startingY = 100;
    const spaceBetweenNodes = 50;
    const orderedNodesPositions = computeOrderedPositions(
      startingX,
      startingY,
      spaceBetweenNodes,
      orderedNodes,
      nodes,
    );

    const unconnectedStartingX = 50;
    const unconnectedStartingY = 400;
    let unconnectedCount = 0;

    const newNodesState = Object.keys(nodes).reduce((accumulator, id) => {
      const foundNode = orderedNodesPositions.find((n) => id === n.id);
      if (foundNode !== undefined) {
        accumulator[id] = {
          ...foundNode,
        };
      } else {
        unconnectedCount += 1;
        accumulator[id] = {
          ...nodes[id],
          x: unconnectedStartingX,
          y: unconnectedStartingY + unconnectedCount * fontSize * 4,
        };
      }
      return accumulator;
    }, {});

    return newNodesState;
  };

  const computeEdgeChildCoordinates = (childNode) => {
    const { width: childWidth } = childNode;

    let { x: childX, y: childY } = childNode;

    childX += childWidth / 2;

    return {
      childX,
      childY,
    };
  };

  const computeEdgeParentCoordinates = (parentNode, parentPieceId) => {
    let { x: parentX, y: parentY } = parentNode;
    if (!parentNode.isMathNode) {
      const { pieces: parentPieces } = parentNode;
      const parentPieceX =
        computeLabelPiecesXCoordinatePositions(parentPieces)[parentPieceId];
      parentX += nodePaddingX + parentPieceX + placeholderWidth / 2;
      parentY += nodePaddingY + fontSize / 2;
    } else {
      const { mathPieces: parentPieces } = parentNode;
      const parentPiece = parentPieces[parentPieceId];
      parentX += parentPiece.x + parentPiece.width / 2;
      parentY += parentPiece.y + parentPiece.height / 2;
    }
    return {
      parentX,
      parentY,
    };
  };

  const computeEdgeCoordinates = (childNode, parentNode, parentPieceId) => {
    const { childX, childY } = computeEdgeChildCoordinates(childNode);
    const { parentX, parentY } = computeEdgeParentCoordinates(
      parentNode,
      parentPieceId,
    );

    return {
      childX,
      childY,
      parentX,
      parentY,
    };
  };

  const computeEdgesCoordinates = (edges, nodes) =>
    Object.keys(edges).reduce((accumulator, id) => {
      const { childNodeId, parentNodeId, parentPieceId } = edges[id];

      const childNode = nodes[childNodeId];
      const parentNode = nodes[parentNodeId];

      const { childX, childY, parentX, parentY } = computeEdgeCoordinates(
        childNode,
        parentNode,
        parentPieceId,
      );

      accumulator[id] = {
        ...edges[id],
        id,
        childX,
        childY,
        parentX,
        parentY,
      };
      return accumulator;
    }, {});

  const convertArrayNodesToObject = (nodes) => {
    const objectNodes = {};
    nodes.forEach((node) => {
      const id = `_${node.id}`;
      const { pieces, mathPieces, isMathNode, x, y, type, value } = node;

      objectNodes[id] = {
        id,
        x,
        y,
        type,
        value,
        pieces,
        mathPieces,
        isMathNode,
      };
    });
    return objectNodes;
  };

  const convertArrayEdgesToObject = (edges) => {
    const objectEdges = {};
    edges.forEach((edge) => {
      const newEdge = createEmptyEdge(edge.id);
      const { id } = newEdge;

      const { parentNodeId, parentPieceId, childNodeId } = edge;

      objectEdges[id] = {
        ...newEdge,
        parentNodeId: `_${parentNodeId}`,
        parentPieceId,
        childNodeId: `_${childNodeId}`,
      };
    });

    return objectEdges;
  };

  const sanitizeNodesAndEdges = (
    nodes,
    edges,
    selectedRootNode,
    stagePos,
    stageScale,
    shuffleNodes = false,
    autolayout,
    autofit,
    layerRef,
    stageRef,
    computeStageWidth,
    isDrawerOpen,
    showDrawer,
    highlightedNodes,
    highlightedEdges,
  ) => {
    if (Array.isArray(nodes)) {
      nodes = convertArrayNodesToObject(nodes);
    }

    if (shuffleNodes) {
      const propNodesKeys = Object.keys(nodes).sort(() => 0.5 - Math.random());
      nodes = propNodesKeys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: nodes[key],
        }),
        {},
      );
    }

    let sanitizedNodes = Object.keys(nodes).reduce((accumulator, id) => {
      const newNode = createEmptyNode(id);

      const isMathNode = nodes[id].isMathNode;
      const pieces = isMathNode ? nodes[id].mathPieces : nodes[id].pieces;

      const isHighlightedNode = highlightedNodes.includes(id);

      accumulator[id] = {
        ...newNode,
        ...nodes[id],
        height: computeNodeHeight(isMathNode, pieces),
        width: computeNodeWidth(isMathNode, pieces),
        piecesPosition:
          !isMathNode && computeLabelPiecesXCoordinatePositions(pieces),
        childEdges: [],
        parentEdges: [],
        isHighlighted: isHighlightedNode,
      };
      pieces.forEach(() => accumulator[id].parentEdges.push([]));
      return accumulator;
    }, {});

    if (Array.isArray(edges)) {
      edges = convertArrayEdgesToObject(edges);
    }

    let sanitizedEdges = computeEdgesCoordinates(edges, sanitizedNodes);

    Object.keys(sanitizedEdges).forEach((id) => {
      const { childNodeId, parentNodeId, parentPieceId } = edges[id];

      if (sanitizedNodes[childNodeId]) {
        sanitizedNodes[childNodeId].childEdges.push(id);
      }
      if (
        sanitizedNodes[parentNodeId] &&
        sanitizedNodes[parentNodeId].parentEdges[parentPieceId]
      ) {
        sanitizedNodes[parentNodeId].parentEdges[parentPieceId].push(id);
      }
    });

    if (autolayout) {
      //TODO: Determine whether need to clone nodes before calling layout
      /*
      // Call old layout (reorder) code
      const orderedNodes = reorderNodes(
        nodes,
        edges,
        selectedRootNode,
      );
      */
      // Structured clone is a deep clone
      // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
      // eslint-disable-next-line no-undef
      sanitizedNodes = structuredClone(sanitizedNodes);
      // const orderedNodes = sanitizedNodes;
      const [diagramWidth, diagramHeight] = layout(
        sanitizedNodes,
        sanitizedEdges,
        selectedRootNode,
        isDrawerOpen && showDrawer,
        computeStageWidth(),
      );
      //console.log('node layout: diagram width: ', diagramWidth, 'diagram height: ', diagramHeight);

      sanitizedEdges = computeEdgesCoordinates(sanitizedEdges, sanitizedNodes);
      stagePos = { x: 0, y: 0 };
      stageScale = { x: 1, y: 1 };
    }

    if (autofit && layerRef.current && stageRef.current) {
      const paddingLeft = isDrawerOpen && showDrawer ? 330 : 30;
      const paddingRight = 30;
      const paddingTop = 30;
      const paddingBottom = 30;
      // get the bounding box of layer contents
      const box = layerRef.current.getClientRect({
        relativeTo: stageRef.current,
      });
      const scale = Math.min(
        (stageRef.current.width() - paddingLeft - paddingRight) / box.width,
        (stageRef.current.height() - paddingTop - paddingBottom) / box.height,
      );
      const x = paddingLeft - box.x * scale;
      const y = paddingTop - box.y * scale;

      stagePos = { x, y };
      stageScale = { x: scale, y: scale };
    }

    Object.keys(sanitizedEdges).forEach((edgeId) => {
      sanitizedEdges[edgeId].isHighlighted = highlightedEdges.includes(edgeId);
    });

    return {
      sanitizedNodes,
      sanitizedEdges,
      sanitizedStagePos: stagePos,
      sanitizedStageScale: stageScale,
    };
  };

  const updateEdgeChildCoordinates = (edgeIds, edges, childNode) => {
    const updatedEdges = edgeIds.reduce((accumulator, id) => {
      const { childX, childY } = computeEdgeChildCoordinates(childNode);

      accumulator[id] = {
        ...edges[id],
        id,
        childX,
        childY,
      };
      return accumulator;
    }, {});

    return updatedEdges;
  };

  const createNodeFromPieces = (isMathNode, pieces, id) => {
    const newNode = createEmptyNode(id);

    pieces = isMathNode ? parseMathPieces(pieces) : parseLabelPieces(pieces);
    const piecesPosition = !isMathNode
      ? computeLabelPiecesXCoordinatePositions(pieces)
      : [];

    const nodeWidth = computeNodeWidth(isMathNode, pieces);
    const nodeHeight = computeNodeHeight(isMathNode, pieces);

    const parentEdges = pieces.reduce((accumulator) => {
      accumulator.push([]);
      return accumulator;
    }, []);

    return {
      ...newNode,
      height: nodeHeight,
      width: nodeWidth,
      pieces: isMathNode ? [] : pieces,
      mathPieces: isMathNode ? pieces : [],
      isMathNode,
      piecesPosition,
      parentEdges,
    };
  };
  return {
    unitFontSizeWidth,
    createNodeFromPieces,
    closestChildId,
    closestParentPiece,
    computeEdgeChildPos,
    computeEdgeParentPos,
    computeLabelPiecesXCoordinatePositions,
    updateEdgeChildCoordinates,
    computeNodeHeight,
    computeNodeWidth,
    parseLabelPieces,
    sanitizeNodesAndEdges,
    computeEdgesCoordinates,
    computeEdgeCoordinates,
    computeEdgeChildCoordinates,
    computeEdgeParentCoordinates,
    reorderNodes,
  };
};

export default createPositionUtils;
