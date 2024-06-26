import React, { useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { Circle, Group, Star } from "react-konva";

function NodeTopConnector({
  nodeId,
  nodeWidth,
  currentErrorLocation,
  hasChildEdges,
  isSelectedRoot,
  isFullDisabled,
  isSelected,
  visibility,
  handleNodeConnectorDragStart,
  handleConnectorDragMove,
  handleConnectorDragEnd,
  setCursor,
  starNumPoints,
  starInnerRadius,
  starOuterRadius,
  starStrokeColor,
  starStrokeWidth,
  connectorRadius,
  connectorStrokeColor,
  connectorStrokeWidth,
  connectorFillColor,
  connectorErrorColor,
  connectorSelectedColor,
  connectorEmptyFillColor,
}) {
  const starRef = useRef();
  const circleRef = useRef();

  const x = useMemo(() => nodeWidth / 2, [nodeWidth]);

  const handleMouseOver = (e) => {
    if (isFullDisabled || visibility !== 0) {
      return;
    }

    e.cancelBubble = true;
    setCursor("grab");
  };

  /**
   * Compute connector color given a style object
   * @param {Object} stl
   */
  const computeColor = (
    defaultColor,
    errorColor,
    selectedColor,
    emptyColor,
  ) => {
    if (
      currentErrorLocation &&
      currentErrorLocation.nodeConnector &&
      currentErrorLocation.nodeId === nodeId
    ) {
      return errorColor;
    }
    if (isSelected) {
      return selectedColor;
    }
    if (hasChildEdges) {
      return defaultColor;
    }
    return emptyColor;
  };

  return (
    <Group>
      {isSelectedRoot ? (
        <Star
          key={`NodeConnector-${nodeId}`}
          ref={starRef}
          x={x}
          y={0}
          numPoints={starNumPoints}
          innerRadius={starInnerRadius}
          outerRadius={starOuterRadius}
          fill={computeColor(
            connectorFillColor,
            connectorErrorColor,
            connectorSelectedColor,
            connectorEmptyFillColor,
          )}
          stroke={starStrokeColor}
          strokeWidth={starStrokeWidth}
          draggable={!isFullDisabled}
          onMouseOver={handleMouseOver}
          onDragStart={handleNodeConnectorDragStart}
          onDragMove={handleConnectorDragMove}
          onDragEnd={handleConnectorDragEnd}
          dragBoundFunc={() => starRef.current.getAbsolutePosition()}
        />
      ) : (
        <Circle
          key={`NodeConnector-${nodeId}`}
          ref={circleRef}
          x={x}
          y={0}
          radius={connectorRadius}
          fill={computeColor(
            connectorFillColor,
            connectorErrorColor,
            connectorSelectedColor,
            connectorEmptyFillColor,
          )}
          stroke={connectorStrokeColor}
          strokeWidth={connectorStrokeWidth}
          draggable={!isFullDisabled}
          onMouseOver={handleMouseOver}
          onDragStart={handleNodeConnectorDragStart}
          onDragMove={handleConnectorDragMove}
          onDragEnd={handleConnectorDragEnd}
          dragBoundFunc={() => circleRef.current.getAbsolutePosition()}
        />
      )}
    </Group>
  );
}

NodeTopConnector.propTypes = {
  nodeId: PropTypes.number.isRequired,
  nodeWidth: PropTypes.number.isRequired,
  currentErrorLocation: PropTypes.shape({
    nodeConnector: PropTypes.string,
    nodeId: PropTypes.string,
  }),
  hasChildEdges: PropTypes.bool,
  isSelectedRoot: PropTypes.bool,
  isFullDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  visibility: PropTypes.number,
  handleNodeConnectorDragStart: PropTypes.func,
  handleConnectorDragMove: PropTypes.func,
  handleConnectorDragEnd: PropTypes.func,
  setCursor: PropTypes.func,
  starNumPoints: PropTypes.number,
  starInnerRadius: PropTypes.number,
  starOuterRadius: PropTypes.number,
  starStrokeColor: PropTypes.string,
  starStrokeWidth: PropTypes.number,
  connectorRadius: PropTypes.number,
  connectorStrokeColor: PropTypes.string,
  connectorStrokeWidth: PropTypes.number,
  connectorFillColor: PropTypes.string,
  connectorErrorColor: PropTypes.string,
  connectorSelectedColor: PropTypes.string,
  connectorEmptyFillColor: PropTypes.string,
};

NodeTopConnector.defaultProps = {
  currentErrorLocation: null,
  hasChildEdges: false,
  isSelectedRoot: false,
  isFullDisabled: false,
  isSelected: false,
  visibility: 0,
  handleNodeConnectorDragStart: () => {},
  handleConnectorDragMove: () => {},
  handleConnectorDragEnd: () => {},
  setCursor: () => {},
  starNumPoints: 5,
  starInnerRadius: 5,
  starOuterRadius: 10,
  starStrokeColor: "#000000",
  starStrokeWidth: 0,
  connectorRadius: 6,
  connectorStrokeColor: "#000000",
  connectorStrokeWidth: 0,
  connectorFillColor: "#000000",
  connectorErrorColor: "#ff2f2f",
  connectorSelectedColor: "#000000",
  connectorEmptyFillColor: "#104020",
};

export default NodeTopConnector;
