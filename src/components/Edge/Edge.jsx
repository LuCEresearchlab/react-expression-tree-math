import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Line, Circle, Group } from "react-konva";

import EdgeCommentsButton from "./EdgeCommentsButton/EdgeCommentsButton";

function Edge({
  id,
  childX,
  childY,
  parentX,
  parentY,
  childNodeId,
  parentNodeId,
  parentPieceId,
  isDragged,
  isFullDisabled,
  isSelected,
  isHighlighted,
  visibility,
  currentErrorLocation,
  handleEdgeClick,
  handleConnectorDragStart,
  handleConnectorDragMove,
  handleConnectorDragEnd,
  setCursor,
  placeholderWidth,
  lineStrokeWidth,
  lineStrokeColor,
  lineSelectedStrokeColor,
  lineDraggingStrokeColor,
  lineErrorStrokeColor,
  lineHighlightColor,
  childConnectorRadiusSize,
  childConnectorStrokeColor,
  childConnectorStrokeWidth,
  childConnectorFillColor,
  childConnectorSelectedFillColor,
  childConnectorDraggingFillColor,
  childConnectorErrorFillColor,
  childConnectorHighlightFillColor,
  parentConnectorRadiusSize,
  parentConnectorStrokeColor,
  parentConnectorStrokeWidth,
  parentConnectorFillColor,
  parentConnectorSelectedFillColor,
  parentConnectorDraggingFillColor,
  parentConnectorErrorFillColor,
  parentConnectorHighlightFillColor,
  commentThreads,
  setCommentsOpen,
  setCommentsClose,
  isCommentsOpen,
  commentsButtonStyle,
}) {
  const handleNodeConnectorDragStart = useCallback((e) => {
    e.cancelBubble = true;
    e.target.stopDrag();

    if (isFullDisabled) {
      return;
    }

    handleConnectorDragStart(false, childNodeId, e.target.x(), e.target.y());
  });

  const handlePlaceholderConnectorDragStart = useCallback((e) => {
    e.cancelBubble = true;
    e.target.stopDrag();

    if (isFullDisabled) {
      return;
    }

    handleConnectorDragStart(
      true,
      parentNodeId,
      e.target.parent.x() + e.target.x() + placeholderWidth / 2,
      e.target.parent.y() + e.target.y() + placeholderWidth * 0.75,
      parentPieceId,
    );
  });

  const handleMouseOverLine = useCallback((e) => {
    e.cancelBubble = true;
    if (isFullDisabled) {
      return;
    }
    setCursor("pointer");
  });

  const handleMouseOverCircle = useCallback((e) => {
    e.cancelBubble = true;
    if (isFullDisabled) {
      return;
    }
    setCursor("grab");
  });

  const handleMouseLeave = useCallback((e) => {
    e.cancelBubble = true;
    if (isFullDisabled) {
      return;
    }
    setCursor("default");
  });

  const onEdgeClick = useCallback((e) => handleEdgeClick(e, id));

  /**
   * Compute color given a style object
   * @param {Object} stl
   */
  const computeColor = (
    defaultColor,
    selectedColor,
    draggingColor,
    errorColor,
    highlightColor,
  ) => {
    if (isDragged) {
      return draggingColor;
    }
    if (
      currentErrorLocation &&
      currentErrorLocation.edge &&
      currentErrorLocation.edgeId === id
    ) {
      return errorColor;
    }
    if (isSelected) {
      return selectedColor;
    }
    if (isHighlighted) {
      // isHighlighted can be either boolean or a string, if it is a boolean
      // we return highlight color
      if (isHighlighted === true) {
        return highlightColor;
      }
      // otherwise we return itself
      return isHighlighted;
    }
    return defaultColor;
  };

  const isVisible = useMemo(() => visibility !== 2, [visibility]);
  const opacity = useMemo(() => (visibility === 1 ? 0.25 : 1), [visibility]);
  const isListening = useMemo(() => visibility === 0, [visibility]);

  const commentThreadsCount = useMemo(
    () => commentThreads.length,
    [commentThreads],
  );

  return (
    // Edge is a Group composed of a Line and two Circles
    <Group
      id={id}
      name='Edge'
      onClick={onEdgeClick}
      onTap={onEdgeClick}
      visible={isVisible}
      opacity={opacity}
      listening={isListening}
      onMouseLeave={handleMouseLeave}
    >
      <Line
        key={`edge-${id}`}
        points={[childX, childY, parentX, parentY]}
        stroke={computeColor(
          lineStrokeColor,
          lineSelectedStrokeColor,
          lineDraggingStrokeColor,
          lineErrorStrokeColor,
          lineHighlightColor,
        )}
        strokeWidth={lineStrokeWidth}
        hitStrokeWidth={10}
        onMouseOver={handleMouseOverLine}
      />
      <Circle
        x={childX}
        y={childY}
        radius={childConnectorRadiusSize}
        fill={computeColor(
          childConnectorFillColor,
          childConnectorSelectedFillColor,
          childConnectorDraggingFillColor,
          childConnectorErrorFillColor,
          childConnectorHighlightFillColor,
        )}
        stroke={childConnectorStrokeColor}
        strokeWidth={childConnectorStrokeWidth}
        // draggable={!isFullDisabled}
        // onDragStart={handleNodeConnectorDragStart}
        // onMouseOver={handleMouseOverCircle}
        // onDragMove={handleConnectorDragMove}
        // onDragEnd={handleConnectorDragEnd}
      />
      <Circle
        x={parentX}
        y={parentY}
        radius={parentConnectorRadiusSize}
        fill={computeColor(
          parentConnectorFillColor,
          parentConnectorSelectedFillColor,
          parentConnectorDraggingFillColor,
          parentConnectorErrorFillColor,
          parentConnectorHighlightFillColor,
        )}
        stroke={parentConnectorStrokeColor}
        strokeWidth={parentConnectorStrokeWidth}
        // draggable={!isFullDisabled}
        // onDragStart={handlePlaceholderConnectorDragStart}
        // onMouseOver={handleMouseOverCircle}
        // onDragMove={handleConnectorDragMove}
        // onDragEnd={handleConnectorDragEnd}
      />
      <EdgeCommentsButton
        childX={childX}
        childY={childY}
        parentX={parentX}
        parentY={parentY}
        commentThreadsCount={commentThreadsCount}
        setCommentsOpen={setCommentsOpen}
        setCommentsClose={setCommentsClose}
        isCommentsOpen={isCommentsOpen}
        iconFillColor={commentsButtonStyle.iconFillColor}
        iconBackgroundColor={commentsButtonStyle.iconBackgroundColor}
        iconStrokeColor={commentsButtonStyle.iconStrokeColor}
        iconStrokeWidth={commentsButtonStyle.iconStrokeWidth}
        counterRadius={commentsButtonStyle.counterRadius}
        counterBackgroundColor={commentsButtonStyle.counterBackgroundColor}
        counterStrokeColor={commentsButtonStyle.counterStrokeColor}
        counterStrokeWidth={commentsButtonStyle.counterStrokeWidth}
        counterTextColor={commentsButtonStyle.counterTextColor}
        counterFontSize={commentsButtonStyle.counterFontSize}
        counterFontFamily={commentsButtonStyle.counterFontFamily}
        isSelected={isSelected}
      />
    </Group>
  );
}

Edge.propTypes = {
  id: PropTypes.number.isRequired,
  childX: PropTypes.number.isRequired,
  childY: PropTypes.number.isRequired,
  parentX: PropTypes.number.isRequired,
  parentY: PropTypes.number.isRequired,
  childNodeId: PropTypes.number.isRequired,
  parentNodeId: PropTypes.number.isRequired,
  parentPieceId: PropTypes.number.isRequired,
  isDragged: PropTypes.bool,
  isFullDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  isHighlighted: PropTypes.oneOfType(PropTypes.bool, PropTypes.string),
  visibility: PropTypes.number,
  currentErrorLocation: PropTypes.shape({
    edge: PropTypes.string,
    edgeId: PropTypes.string,
  }),
  handleEdgeClick: PropTypes.func,
  handleConnectorDragStart: PropTypes.func,
  handleConnectorDragMove: PropTypes.func,
  handleConnectorDragEnd: PropTypes.func,
  setCursor: PropTypes.func,
  placeholderWidth: PropTypes.number.isRequired,
  lineStrokeWidth: PropTypes.number,
  lineStrokeColor: PropTypes.string,
  lineErrorStrokeColor: PropTypes.string,
  lineSelectedStrokeColor: PropTypes.string,
  lineDraggingStrokeColor: PropTypes.string,
  lineHighlightColor: PropTypes.string,
  childConnectorRadiusSize: PropTypes.number,
  childConnectorStrokeColor: PropTypes.string,
  childConnectorStrokeWidth: PropTypes.number,
  childConnectorFillColor: PropTypes.string,
  childConnectorSelectedFillColor: PropTypes.string,
  childConnectorDraggingFillColor: PropTypes.string,
  childConnectorErrorFillColor: PropTypes.string,
  childConnectorHighlightFillColor: PropTypes.string,
  parentConnectorRadiusSize: PropTypes.number,
  parentConnectorStrokeColor: PropTypes.string,
  parentConnectorStrokeWidth: PropTypes.number,
  parentConnectorFillColor: PropTypes.string,
  parentConnectorSelectedFillColor: PropTypes.string,
  parentConnectorDraggingFillColor: PropTypes.string,
  parentConnectorErrorFillColor: PropTypes.string,
  parentConnectorHighlightFillColor: PropTypes.string,
  commentThreads: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.arrayOf(PropTypes.string),
      type: PropTypes.string,
      expanded: PropTypes.bool,
      resolved: PropTypes.bool,
    }),
  ),
  isCommentsOpen: PropTypes.bool,
  commentsButtonStyle: PropTypes.exact({
    iconFillColor: PropTypes.string,
    iconBackgroundColor: PropTypes.string,
    iconStrokeColor: PropTypes.string,
    iconStrokeWidth: PropTypes.number,
    counterRadius: PropTypes.number,
    counterBackgroundColor: PropTypes.string,
    counterStrokeColor: PropTypes.string,
    counterStrokeWidth: PropTypes.number,
    counterTextColor: PropTypes.string,
    counterFontSize: PropTypes.number,
    counterFontFamily: PropTypes.string,
  }),
};

Edge.defaultProps = {
  isDragged: false,
  isFullDisabled: false,
  isSelected: false,
  isHighlighted: false,
  visibility: 0,
  currentErrorLocation: null,
  handleEdgeClick: () => {},
  handleConnectorDragStart: () => {},
  handleConnectorDragMove: () => {},
  handleConnectorDragEnd: () => {},
  setCursor: () => {},
  lineStrokeWidth: 6,
  lineStrokeColor: "#000000",
  lineErrorStrokeColor: "#ff2f2f",
  lineSelectedStrokeColor: "#f2a200",
  lineDraggingStrokeColor: "#f2d280",
  lineHighlightColor: "#cc78c5",
  childConnectorRadiusSize: 6,
  childConnectorStrokeColor: "#000000",
  childConnectorStrokeWidth: 0,
  childConnectorFillColor: "#555555",
  childConnectorSelectedFillColor: "#f2a200",
  childConnectorDraggingFillColor: "#f2d280",
  childConnectorErrorFillColor: "#ff2f2f",
  childConnectorHighlightFillColor: "#cc78c5",
  parentConnectorRadiusSize: 6,
  parentConnectorStrokeColor: "#000000",
  parentConnectorStrokeWidth: 0,
  parentConnectorFillColor: "#555555",
  parentConnectorSelectedFillColor: "#f2a200",
  parentConnectorDraggingFillColor: "#f2d280",
  parentConnectorErrorFillColor: "#ff2f2f",
  parentConnectorHighlightFillColor: "#cc78c5",
  commentThreads: [],
  isCommentsOpen: false,
  commentsButtonStyle: {},
};

export default Edge;
