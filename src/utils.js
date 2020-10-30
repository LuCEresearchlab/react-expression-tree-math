import Konva from "konva";

// Layout Defaults
export const xPad = 11;
export const yPad = 11;
export const gapWidth = 5;
export const fontFamily = "Ubuntu Mono, Courier";
export const defaultFontSize = 24;
export const oText = new Konva.Text({
  text: "o",
  fontFamily: fontFamily,
  fontSize: defaultFontSize,
});
export const textHeight = oText.fontSize();
export const holeWidth = oText.getTextWidth();
export const targetRange = textHeight;

// Utility Functions
export function nodeById(nodeId, nodes) {
  if (nodeId === undefined || nodeId === null) {
    throw new Error("Illegal nodeId", nodeId);
  }
  const node = nodes.find(node => node.id === nodeId);
  if (!node) {
    throw new Error("Unknown nodeId", nodeId);
  }
  return node;
}

export function nodePositionById(nodeId, nodes) {
  if (nodeId === undefined || nodeId === null) {
    throw new Error("Illegal nodeId", nodeId);
  }
  const node = nodes.find(node => node.id === nodeId);
  if (!node) {
    throw new Error("Unknown nodeId", nodeId);
  }
  return { x: node.x, y: node.y };
}

export function edgeById(edgeId, edges) {
  if (edgeId === undefined || edgeId === null) {
    throw new Error("Illegal edgeId", edgeId);
  }
  const edge = edges.find(edge => edge.id === edgeId);
  if (!edge) {
    throw new Error("Unknown edgeId", edgeId);
  }
  return edge;
}

//TODO: what if we have multiple edges to a child node?
export function edgeByChildNode(childNodeId, edges) {
  return edges.find(edge => edge.childNodeId === childNodeId);
}

//TODO: what if we have multiple edges from a parent piece?
export function edgeByParentPiece(parentNodeId, parentPieceId, edges) {
  return edges.find(
    edge =>
      edge.parentNodeId === parentNodeId && edge.parentPieceId === parentPieceId
  );
}

export const computeEdgeChildPos = (childNodeId, nodes) => {
  const node = nodeById(childNodeId, nodes);
  return {
    x: node.x + xPad + node.width / 2,
    y: node.y,
  };
};

export const computeEdgeParentPos = (
  parentNodeId,
  parentPieceId,
  parentPieceX,
  nodes,
  connectorPlaceholder
) => {
  const node = nodeById(parentNodeId, nodes);
  return {
    x: node.x + xPad + parentPieceX + holeWidth / 2,
    y: node.y + yPad + textHeight,
  };
};

export const distance = (x1, y1, x2, y2) => {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};

export const closestChildId = (x, y, nodes) => {
  let closestNodeId = null;
  let closestDist = null;
  nodes.forEach(node => {
    const pos = computeEdgeChildPos(node.id, nodes);
    const dist = distance(pos.x, pos.y, x, y);
    if (dist < targetRange && (!closestDist || dist < closestDist)) {
      closestDist = dist;
      closestNodeId = node.id;
    }
  });
  return closestNodeId;
};

export const closestParentPiece = (x, y, nodes, connectorPlaceholder) => {
  let closestPiece = null;
  let closestDist = null;
  nodes.forEach(node => {
    const pieces = nodeById(node.id, nodes).pieces;
    pieces.forEach((piece, i) => {
      if (piece === connectorPlaceholder) {
        const pieceX = computePiecesPositions(pieces, connectorPlaceholder)[i];
        const pos = computeEdgeParentPos(
          node.id,
          i,
          pieceX,
          nodes,
          connectorPlaceholder
        );
        const dist = distance(pos.x, pos.y, x, y);
        if (dist < targetRange && (!closestDist || dist < closestDist)) {
          closestDist = dist;
          closestPiece = {
            parentNodeId: node.id,
            parentPieceId: i,
          };
        }
      }
    });
  });
  return closestPiece;
};

export function computePiecesWidths(pieces, connectorPlaceholder) {
  return pieces.map(p => {
    if (p === connectorPlaceholder) {
      const holeText = new Konva.Text({
        text: "o",
        fontFamily: fontFamily,
        fontSize: defaultFontSize,
      });
      return holeText.getTextWidth();
    } else {
      const text = new Konva.Text({
        text: p,
        fontFamily: fontFamily,
        fontSize: defaultFontSize,
      });
      return text.getTextWidth();
    }
  });
}

export function computePiecesPositions(pieces, connectorPlaceholder) {
  const widths = computePiecesWidths(pieces, connectorPlaceholder);
  let pieceX = 0;
  const xes = widths.map(w => {
    let myX = pieceX;
    pieceX += w + gapWidth;
    return myX;
  });
  return xes;
}

export function computeNodeWidth(pieces, connectorPlaceholder) {
  const widths = computePiecesWidths(pieces, connectorPlaceholder);
  let width = gapWidth * (pieces.length - 1);
  for (const w of widths) {
    width += w;
  }
  return width;
}
