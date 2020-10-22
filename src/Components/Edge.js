import React from "react";
import { Line, Text } from "react-konva";
import {
  xPad,
  yPad,
  holeWidth,
  textHeight,
  computePiecesPositions,
  computeNodeWidth,
} from "../utils.js";

function Edge({
  id,
  connectorPlaceholder,
  parentPieces,
  parentPieceId,
  childPieces,
  parentX,
  parentY,
  childX,
  childY,
  beingDragged,
  onEdgeClick,
  selected,
  type,
}) {
  const xes = computePiecesPositions(parentPieces, connectorPlaceholder);
  const childWidth = computeNodeWidth(childPieces, connectorPlaceholder);

  return [
    <Line
      key={"Edge-Line-" + id}
      points={[
        parentX + xPad + xes[parentPieceId] + holeWidth / 2,
        parentY + yPad + textHeight / 2,
        childX + xPad + childWidth / 2,
        childY,
      ]}
      stroke={beingDragged ? "#f0f0f0" : selected ? "red" : "black"}
      strokeWidth={5}
      onClick={onEdgeClick}
    />,
    <Text
      key={"Edge-Text-" + id}
      x={childX + xPad + childWidth / 2}
      y={childY - 30}
      fill="red"
      fontFamily={"Arial"}
      fontSize={20}
      text={type}
    />,
  ];
}

export default Edge;
