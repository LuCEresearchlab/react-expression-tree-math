import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Group, Rect, Text } from "react-konva";

import NodeDeleteButton from "../Node/NodeDeleteButton/NodeDeleteButton";

function Annotation({
  id,
  positionX,
  positionY,
  annotationColor,
  annotationText,
  isFullDisabled,
  annotationWidth,
  annotationHeight,
  fontSize,
  fontFamily,
  paddingX,
  paddingY,
  strokeColor,
  strokeWidth,
  stageRef,
  stageWidth,
  stageHeight,
  isSelected,
  isDraggingSelectionRect,
  deleteButtonStyle,
  isCreatingNode,
  isCreatingMathNode,
  addingAnnotationOn,
  editableDelete,
  setCursor,
  removeAnnotation,
  handleAnnotationDragStart,
  handleAnnotationDragMove,
  handleAnnotationDragEnd,
  handleAnnotationClick,
}) {
  const handleAnnotationDeleteButtonClick = useCallback(() => {
    if (!isCreatingNode && !isCreatingMathNode && !addingAnnotationOn) {
      removeAnnotation(id);
    }
  }, [isCreatingNode, isCreatingMathNode, addingAnnotationOn, id]);

  const checkDragBound = useCallback((pos) => {
    const stageScale = stageRef.current.scale();
    let newX = pos.x;
    let newY = pos.y;
    if (pos.x < 0) {
      newX = 0;
    } else if (pos.x > stageWidth - annotationWidth * stageScale.x) {
      newX = stageWidth - annotationWidth * stageScale.x;
    }
    if (pos.y < 0) {
      newY = 0;
    } else if (pos.y > stageHeight - annotationHeight * stageScale.y) {
      newY = stageHeight - annotationHeight * stageScale.y;
    }
    return {
      x: newX,
      y: newY,
    };
  });

  const handleMouseOver = (e) => {
    e.cancelBubble = true;
    if (isFullDisabled) {
      return;
    }
    setCursor("pointer");
  };

  const handleMouseLeave = (e) => {
    e.cancelBubble = true;
    if (isFullDisabled) {
      return;
    }
    setCursor("default");
  };

  const textColor = useMemo(() => {
    const rgb = annotationColor.rgb;
    const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
    return luminance > 186 ? "black" : "white";
  }, [annotationColor]);

  return (
    <Group
      key={`Annotation-${id}`}
      id={id}
      x={positionX}
      y={positionY}
      draggable={!isFullDisabled}
      dragBoundFunc={checkDragBound}
      onDragStart={handleAnnotationDragStart}
      onDragMove={handleAnnotationDragMove}
      onDragEnd={handleAnnotationDragEnd}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={handleAnnotationClick}
      onTap={handleAnnotationClick}
    >
      <Rect
        fill={annotationColor.hex}
        stroke={strokeColor}
        strokeWidth={isSelected ? 3 : strokeWidth}
        cornerRadius={2}
        height={annotationHeight}
        width={annotationWidth}
        // Cannot use shadow because it breaks the screenshot feature
        // (background of annotation parts outside the visible canvas area are cut off)
        // shadowBlur={5}
      />
      <Text
        x={paddingX}
        y={paddingY}
        text={annotationText}
        fill={textColor}
        fontSize={fontSize}
        fontFamily={fontFamily}
      />
      {/* Reusing delete button from Node component */}
      <NodeDeleteButton
        nodeWidth={annotationWidth}
        nodeHeight={annotationHeight}
        isSelected={isSelected}
        editableDelete={editableDelete}
        isFullDisabled={isFullDisabled}
        isDraggingSelectionRect={isDraggingSelectionRect}
        showDeleteButton={true}
        handleNodeDeleteButtonClick={handleAnnotationDeleteButtonClick}
        strokeWidth={deleteButtonStyle.strokeWidth}
        radius={deleteButtonStyle.radius}
        strokeColor={deleteButtonStyle.strokeColor}
        fillColor={deleteButtonStyle.fillColor}
        textColor={deleteButtonStyle.textColor}
        overStrokeColor={deleteButtonStyle.overStrokeColor}
        overFillColor={deleteButtonStyle.overFillColor}
        overTextColor={deleteButtonStyle.overTextColor}
        isCreatingNode={isCreatingNode}
        isCreatingMathNode={isCreatingMathNode}
        addingAnnotationOn={addingAnnotationOn}
      />
    </Group>
  );
}

Annotation.propTypes = {
  id: PropTypes.number,
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  annotationColor: PropTypes.shape({
    hex: PropTypes.string,
    rgb: PropTypes.arrayOf(PropTypes.number),
  }),
  annotationText: PropTypes.string,
  isFullDisabled: PropTypes.bool,
  annotationWidth: PropTypes.number,
  annotationHeight: PropTypes.number,
  fontSize: PropTypes.number,
  fontFamily: PropTypes.string,
  paddingX: PropTypes.number,
  paddingY: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  stageRef: PropTypes.shape({
    current: PropTypes.shape({
      scale: PropTypes.func,
    }),
  }),
  stageWidth: PropTypes.number,
  stageHeight: PropTypes.number,
  isSelected: PropTypes.bool,
  isDraggingSelectionRect: PropTypes.bool,
  deleteButtonStyle: PropTypes.exact({
    strokeWidth: PropTypes.number,
    radius: PropTypes.number,
    strokeColor: PropTypes.string,
    fillColor: PropTypes.string,
    textColor: PropTypes.string,
    overStrokeColor: PropTypes.string,
    overFillColor: PropTypes.string,
    overTextColor: PropTypes.string,
  }),
  isCreatingNode: PropTypes.bool,
  isCreatingMathNode: PropTypes.bool,
  addingAnnotationOn: PropTypes.bool,
  editableDelete: PropTypes.bool,
  setCursor: PropTypes.func,
  handleAnnotationDragStart: PropTypes.func,
  handleAnnotationDragMove: PropTypes.func,
  handleAnnotationDragEnd: PropTypes.func,
  handleAnnotationClick: PropTypes.func,
};

Annotation.defaultProps = {
  id: undefined,
  positionX: undefined,
  positionY: undefined,
  annotationColor: { hex: "#35BFFF", rgb: [53, 191, 255] },
  annotationText: "",
  isFullDisabled: false,
  annotationWidth: 150,
  annotationHeight: 100,
  fontSize: 18,
  fontFamily: "Roboto Mono, Courier",
  paddingX: 12,
  paddingY: 12,
  strokeColor: "black",
  strokeWidth: 0.5,
  isSelected: false,
  isDraggingSelectionRect: false,
  deleteButtonStyle: {},
  isCreatingNode: false,
  isCreatingMathNode: false,
  addingAnnotationOn: false,
  editableDelete: true,
  setCursor: () => {},
  handleAnnotationDragStart: () => {},
  handleAnnotationDragMove: () => {},
  handleAnnotationDragEnd: () => {},
  handleAnnotationClick: () => {},
};

export default Annotation;
