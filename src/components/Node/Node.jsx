import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Group, Rect } from "react-konva";

import NodeLabel from "./NodeLabel/NodeLabel";
import NodeCommentsButton from "./NodeCommentsButton/NodeCommentsButton";
import NodeDeleteButton from "./NodeDeleteButton/NodeDeleteButton";
import NodeTopConnector from "./NodeTopConnector/NodeTopConnector";
import NodeTypeValue from "./NodeTypeValue/NodeTypeValue";

function Node({
  id,
  labelPieces,
  labelPiecesPosition,
  positionX,
  positionY,
  typeText,
  typeSuperscriptText,
  valueText,
  edges,
  childEdges,
  parentEdges,
  connectorPlaceholder,
  placeholderWidth,
  stageRef,
  stageWidth,
  stageHeight,
  nodeWidth,
  nodeHeight,
  currentErrorLocation,
  setSubtreeVisibility,
  removeNode,
  setCursor,
  isDraggingSelectionRect,
  editableLabel,
  editableType,
  editableValue,
  editableDelete,
  isSelected,
  isSelectedRoot,
  isHighlighted,
  isTypeLabelHighlighted,
  isValueLabelHighlighted,
  visibility,
  isFullDisabled,
  handleNodeClick,
  handleNodeDblClick,
  handleNodeDragStart,
  handleNodeDragMove,
  handleNodeDragEnd,
  handleConnectorDragStart,
  handleConnectorDragMove,
  handleConnectorDragEnd,
  handleConnectorDoubleClick,
  fontSize,
  fontFamily,
  unitFontSizeWidth,
  nodePaddingX,
  nodePaddingY,
  nodeStrokeColor,
  nodeStrokeWidth,
  nodeSelectedStrokeWidth,
  nodeHighlightedStrokeWidth,
  nodeCornerRadius,
  nodeFillColor,
  nodeErrorColor,
  nodeSelectedColor,
  nodeFinalColor,
  nodeHighlightedColor,
  labelStyle,
  topConnectorStyle,
  deleteButtonStyle,
  typeValueStyle,
  isMathNode,
  mathPieces,
  commentable,
  commentThreads,
  setCommentsOpen,
  setCommentsClose,
  isCommentsOpen,
  commentsButtonStyle,
  isCreatingNode,
  isCreatingMathNode,
  addingAnnotationOn,
}) {
  const hasChildEdges = useMemo(() => childEdges.length > 0, [childEdges]);

  const hasParentEdges = useMemo(
    () => parentEdges.map((pieceEdges) => pieceEdges.length > 0),
    [parentEdges],
  );

  const subtreesVisibility = useMemo(
    () =>
      parentEdges.map((pieceEdges) =>
        pieceEdges.length === 0 ||
        pieceEdges.every(
          (pieceEdgeId) =>
            edges[pieceEdgeId].visibility === undefined ||
            edges[pieceEdgeId].visibility === 0,
        )
          ? 0
          : pieceEdges.every(
              (pieceEdgeId) => edges[pieceEdgeId].visibility === 1,
            )
          ? 1
          : 2,
      ),

    [visibility, childEdges, parentEdges, edges],
  );

  const commentThreadsCount = useMemo(
    () => commentThreads.length,
    [commentThreads],
  );

  const handleNodeDeleteButtonClick = useCallback(() => {
    if (!isCreatingNode && !isCreatingMathNode && !addingAnnotationOn) {
      parentEdges.forEach((edgeId, i) => {
        setSubtreeVisibility({
          subtreeStartingNodeId: id,
          subtreeStartingPieceId: i,
          currentVisibility: 2,
        });
      });
      removeNode(id);
    }
  }, [isCreatingNode, isCreatingMathNode, addingAnnotationOn, parentEdges, id]);

  const checkDragBound = useCallback((pos) => {
    const stageScale = stageRef.current.scale();
    let newX = pos.x;
    let newY = pos.y;
    if (pos.x < 0) {
      newX = 0;
    } else if (pos.x > stageWidth - nodeWidth * stageScale.x) {
      newX = stageWidth - nodeWidth * stageScale.x;
    }
    if (pos.y < 0) {
      newY = 0;
    } else if (pos.y > stageHeight - nodeHeight * stageScale.y) {
      newY = stageHeight - nodeHeight * stageScale.y;
    }
    return {
      x: newX,
      y: newY,
    };
  });

  const handlePlaceholderConnectorDragStart = useCallback((e, nodeId) => {
    e.cancelBubble = true;

    const pieceId = e.target.getAttr("plugId");

    if (
      isFullDisabled ||
      visibility !== 0 ||
      subtreesVisibility[pieceId] !== 0
    ) {
      return;
    }

    if (!isMathNode) {
      handleConnectorDragStart(
        true,
        nodeId,
        e.target.parent.parent.parent.x() +
          e.target.parent.parent.x() +
          e.target.parent.x() +
          nodePaddingX +
          labelPiecesPosition[pieceId] +
          placeholderWidth / 2,
        e.target.parent.parent.parent.y() +
          e.target.parent.parent.y() +
          e.target.parent.y() +
          nodePaddingY +
          fontSize / 2,
        pieceId,
      );
    } else {
      handleConnectorDragStart(
        true,
        nodeId,
        e.target.parent.parent.parent.x() +
          e.target.parent.parent.x() +
          e.target.parent.x() +
          e.target.x() +
          e.target.width() / 2,
        e.target.parent.parent.parent.y() +
          e.target.parent.parent.y() +
          e.target.parent.y() +
          e.target.y() +
          e.target.height() / 2,
        pieceId,
      );
    }
  });

  const handleTopNodeConnectorDragStart = useCallback((e) => {
    e.cancelBubble = true;

    if (isFullDisabled || visibility !== 0) {
      return;
    }

    handleConnectorDragStart(
      false,
      id,
      e.target.parent.parent.x() + e.target.parent.x() + nodeWidth / 2,
      e.target.parent.parent.y() + e.target.parent.y(),
    );
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

  /**
   *
   * Compute node color given a style object
   *
   * @param {Object} stl
   */
  const computeColor = (
    defaultColor,
    errorColor,
    selectedColor,
    finalColor,
    highlightColor,
  ) => {
    if (
      currentErrorLocation &&
      currentErrorLocation.node &&
      currentErrorLocation.nodeId === id
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
    if (!editableLabel || !editableType || !editableValue || !editableDelete) {
      return finalColor;
    }
    return defaultColor;
  };

  const computeStrokeWidth = (
    defaultStrokeWidth,
    selectedStrokeWidth,
    highlightedStrokeWidth,
  ) => {
    if (isSelected) {
      return selectedStrokeWidth;
    }
    if (isHighlighted) {
      return highlightedStrokeWidth;
    }
    return defaultStrokeWidth;
  };

  const isVisible = useMemo(() => visibility !== 2, [visibility]);
  const opacity = useMemo(() => (visibility === 1 ? 0.25 : 1), [visibility]);
  const showDeleteButton = useMemo(() => visibility === 0, [visibility]);

  return (
    /**
     * A node is a group composed by:
     *  - Rectangle: the box surrounding the node
     *  - NodeTopConnector: the circle on the top edge, used for connect Edges
     *  - NodeLabel: the content of the node
     *  - NodeDeleteButton: the button for removing the node
     *  - NodeCommentsButton: the button for adding comment threads to the node
     */
    <Group
      key={`Node-${id}`}
      id={id}
      nodeId={id}
      x={positionX}
      y={positionY}
      draggable={!isFullDisabled}
      onClick={handleNodeClick}
      onTap={handleNodeClick}
      onDblClick={handleNodeDblClick}
      onDblTap={handleNodeDblClick}
      onDragStart={handleNodeDragStart}
      onDragMove={handleNodeDragMove}
      onDragEnd={handleNodeDragEnd}
      dragBoundFunc={checkDragBound}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      visible={isVisible}
      opacity={opacity}
    >
      <Rect
        name='Node'
        key={`NodeRect-${id}`}
        width={nodeWidth}
        height={nodeHeight}
        fill={computeColor(
          nodeFillColor,
          nodeErrorColor,
          nodeSelectedColor,
          nodeFinalColor,
          nodeHighlightedColor,
        )}
        stroke={nodeStrokeColor}
        strokeWidth={computeStrokeWidth(
          nodeStrokeWidth,
          nodeSelectedStrokeWidth,
          nodeHighlightedStrokeWidth,
        )}
        cornerRadius={nodeCornerRadius}
      />
      <NodeTopConnector
        nodeId={id}
        nodeWidth={nodeWidth}
        currentErrorLocation={currentErrorLocation}
        hasChildEdges={hasChildEdges}
        isSelectedRoot={isSelectedRoot}
        isFullDisabled={isFullDisabled}
        isSelected={isSelected}
        visibility={visibility}
        handleNodeConnectorDragStart={handleTopNodeConnectorDragStart}
        handleConnectorDragMove={handleConnectorDragMove}
        handleConnectorDragEnd={handleConnectorDragEnd}
        setCursor={setCursor}
        starNumPoints={topConnectorStyle.starNumPoints}
        starInnerRadius={topConnectorStyle.starInnerRadius}
        starOuterRadius={topConnectorStyle.starOuterRadius}
        starStrokeColor={topConnectorStyle.starStrokeColor}
        starStrokeWidth={topConnectorStyle.starStrokeWidth}
        connectorRadius={topConnectorStyle.connectorRadius}
        connectorStrokeColor={topConnectorStyle.connectorStrokeColor}
        connectorStrokeWidth={topConnectorStyle.connectorStrokeWidth}
        connectorFillColor={topConnectorStyle.connectorFillColor}
        connectorErrorColor={topConnectorStyle.connectorErrorColor}
        connectorSelectedColor={topConnectorStyle.connectorSelectedColor}
        connectorEmptyFillColor={topConnectorStyle.connectorEmptyFillColor}
      />
      <NodeLabel
        nodeId={id}
        connectorPlaceholder={connectorPlaceholder}
        labelPieces={labelPieces}
        labelPiecesPosition={labelPiecesPosition}
        nodeHeight={nodeHeight}
        currentErrorLocation={currentErrorLocation}
        hasParentEdges={hasParentEdges}
        subtreesVisibility={subtreesVisibility}
        isFullDisabled={isFullDisabled}
        visibility={visibility}
        handlePlaceholderConnectorDragStart={
          handlePlaceholderConnectorDragStart
        }
        handleConnectorDragMove={handleConnectorDragMove}
        handleConnectorDragEnd={handleConnectorDragEnd}
        handleConnectorDoubleClick={handleConnectorDoubleClick}
        setCursor={setCursor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        paddingX={nodePaddingX}
        paddingY={nodePaddingY}
        placeholderWidth={placeholderWidth}
        nodeTextColor={labelStyle.nodeTextColor}
        placeholderStrokeWidth={labelStyle.placeholderStrokeWidth}
        placeholderStrokeColor={labelStyle.placeholderStrokeColor}
        placeholderFillColor={labelStyle.placeholderFillColor}
        placeholderErrorColor={labelStyle.placeholderErrorColor}
        placeholderRadius={labelStyle.placeholderRadius}
        connectorRadiusSize={labelStyle.connectorRadiusSize}
        connectorStrokeWidth={labelStyle.connectorStrokeWidth}
        connectorFillColor={labelStyle.connectorFillColor}
        connectorStrokeColor={labelStyle.connectorStrokeColor}
        isMathNode={isMathNode}
        mathPieces={mathPieces}
      />
      <NodeDeleteButton
        nodeWidth={nodeWidth}
        nodeHeight={nodeHeight}
        isSelected={isSelected}
        editableDelete={editableDelete}
        isFullDisabled={isFullDisabled}
        isDraggingSelectionRect={isDraggingSelectionRect}
        showDeleteButton={showDeleteButton}
        handleNodeDeleteButtonClick={handleNodeDeleteButtonClick}
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
        isCreatingNode={isCreatingNode}
        isCreatingMathNode={isCreatingMathNode}
        addingAnnotationOn={addingAnnotationOn}
      />
      <NodeTypeValue
        nodeWidth={nodeWidth}
        isTypeLabelHighlighted={isTypeLabelHighlighted}
        isValueLabelHighlighted={isValueLabelHighlighted}
        typeText={typeText}
        typeSuperscriptText={typeSuperscriptText}
        valueText={valueText}
        fontFamily={fontFamily}
        fontSize={typeValueStyle.fontSize}
        unitFontSizeWidth={unitFontSizeWidth}
        strokeWidth={typeValueStyle.strokeWidth}
        radius={typeValueStyle.radius}
        padding={typeValueStyle.padding}
        textTypeColor={typeValueStyle.textTypeColor}
        textValueColor={typeValueStyle.textValueColor}
        fillTypeColor={typeValueStyle.fillTypeColor}
        fillValueColor={typeValueStyle.fillValueColor}
        fillTypeHighlightColor={typeValueStyle.fillTypeHighlightColor}
        fillValueHighlightColor={typeValueStyle.fillValueHighlightColor}
        strokeColor={typeValueStyle.strokeColor}
        pointerDirection={typeValueStyle.pointerDirection}
        pointerWidth={typeValueStyle.pointerWidth}
        pointerHeight={typeValueStyle.pointerHeight}
      />
      <NodeCommentsButton
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

Node.propTypes = {
  id: PropTypes.number.isRequired,
  labelPieces: PropTypes.arrayOf(PropTypes.string).isRequired,
  labelPiecesPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  positionX: PropTypes.number.isRequired,
  positionY: PropTypes.number.isRequired,
  typeText: PropTypes.string,
  typeSuperscriptText: PropTypes.string,
  valueText: PropTypes.string,
  childEdges: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  parentEdges: PropTypes.arrayOf(PropTypes.string),
  connectorPlaceholder: PropTypes.string.isRequired,
  placeholderWidth: PropTypes.number.isRequired,
  stageRef: PropTypes.shape({
    current: PropTypes.shape({
      scale: PropTypes.func,
    }),
  }).isRequired,
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
  nodeWidth: PropTypes.number.isRequired,
  nodeHeight: PropTypes.number.isRequired,
  currentErrorLocation: PropTypes.shape({
    node: PropTypes.string,
    nodeId: PropTypes.number,
  }),
  setSubtreeVisibility: PropTypes.func,
  removeNode: PropTypes.func,
  setCursor: PropTypes.func,
  isDraggingSelectionRect: PropTypes.bool,
  editableLabel: PropTypes.bool,
  editableType: PropTypes.bool,
  editableValue: PropTypes.bool,
  editableDelete: PropTypes.bool,
  isSelected: PropTypes.bool,
  isSelectedRoot: PropTypes.bool,
  isHighlighted: PropTypes.oneOf(PropTypes.bool, PropTypes.string),
  visibility: PropTypes.number,
  isTypeLabelHighlighted: PropTypes.oneOf(PropTypes.bool, PropTypes.string),
  isValueLabelHighlighted: PropTypes.oneOf(PropTypes.bool, PropTypes.string),
  isFullDisabled: PropTypes.bool,
  handleNodeClick: PropTypes.func,
  handleNodeDblClick: PropTypes.func,
  handleNodeDragStart: PropTypes.func,
  handleNodeDragMove: PropTypes.func,
  handleNodeDragEnd: PropTypes.func,
  handleConnectorDragStart: PropTypes.func,
  handleConnectorDragMove: PropTypes.func,
  handleConnectorDragEnd: PropTypes.func,
  handleConnectorDoubleClick: PropTypes.func,
  fontSize: PropTypes.number,
  fontFamily: PropTypes.string,
  unitFontSizeWidth: PropTypes.number,
  nodePaddingX: PropTypes.number,
  nodePaddingY: PropTypes.number,
  nodeStrokeColor: PropTypes.string,
  nodeStrokeWidth: PropTypes.number,
  nodeSelectedStrokeWidth: PropTypes.number,
  nodeHighlightedStrokeWidth: PropTypes.string,
  nodeCornerRadius: PropTypes.number,
  nodeFillColor: PropTypes.string,
  nodeErrorColor: PropTypes.string,
  nodeSelectedColor: PropTypes.string,
  nodeFinalColor: PropTypes.string,
  nodeHighlightedColor: PropTypes.string,
  labelStyle: PropTypes.exact({
    nodeTextColor: PropTypes.string,
    placeholderStrokeWidth: PropTypes.number,
    placeholderStrokeColor: PropTypes.string,
    placeholderFillColor: PropTypes.string,
    placeholderErrorColor: PropTypes.string,
    placeholderRadius: PropTypes.number,
    connectorRadiusSize: PropTypes.number,
    connectorStrokeWidth: PropTypes.number,
    connectorFillColor: PropTypes.string,
    connectorStrokeColor: PropTypes.string,
  }),
  topConnectorStyle: PropTypes.exact({
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
  }),
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
  typeValueStyle: PropTypes.exact({
    fontSize: PropTypes.number,
    strokeWidth: PropTypes.number,
    radius: PropTypes.number,
    padding: PropTypes.number,
    textTypeColor: PropTypes.string,
    textValueColor: PropTypes.string,
    fillTypeColor: PropTypes.string,
    fillValueColor: PropTypes.string,
    fillTypeHighlightColor: PropTypes.string,
    fillValueHighlightColor: PropTypes.string,
    strokeColor: PropTypes.string,
    pointerDirection: PropTypes.string,
    pointerWidth: PropTypes.number,
    pointerHeight: PropTypes.number,
  }),
  isMathNode: PropTypes.bool,
  mathPieces: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      x: PropTypes.number,
      width: PropTypes.number,
      y: PropTypes.number,
      height: PropTypes.number,
      value: PropTypes.string,
      fontSize: PropTypes.number,
    }),
  ),
  commentable: PropTypes.shape({
    addThread: PropTypes.bool,
    deleteThread: PropTypes.bool,
    addComment: PropTypes.bool,
    deleteComment: PropTypes.bool,
  }),
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
  setCommentsOpen: PropTypes.func,
  setCommentsClose: PropTypes.func,
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
  isCreatingNode: PropTypes.bool,
  isCreatingMathNode: PropTypes.bool,
  addingAnnotationOn: PropTypes.bool,
};

Node.defaultProps = {
  typeText: "",
  typeSuperscriptText: "",
  valueText: "",
  childEdges: [],
  parentEdges: [],
  currentErrorLocation: null,
  isDraggingSelectionRect: false,
  editableLabel: false,
  editableType: false,
  editableValue: false,
  editableDelete: false,
  isSelected: false,
  isSelectedRoot: false,
  isHighlighted: false,
  isTypeLabelHighlighted: false,
  isValueLabelHighlighted: false,
  visibility: 0,
  isFullDisabled: false,
  setSubtreeVisibility: () => {},
  removeNode: () => {},
  setCursor: () => {},
  handleNodeClick: () => {},
  handleNodeDblClick: () => {},
  handleNodeDragStart: () => {},
  handleNodeDragMove: () => {},
  handleNodeDragEnd: () => {},
  handleConnectorDragStart: () => {},
  handleConnectorDragMove: () => {},
  handleConnectorDragEnd: () => {},
  handleConnectorDoubleClick: () => {},
  fontSize: 24,
  fontFamily: "Roboto Mono, Courier",
  unitFontSizeWidth: 0.60009765625,
  nodePaddingX: 12,
  nodePaddingY: 12,
  nodeStrokeColor: "#000000",
  nodeStrokeWidth: 1,
  nodeSelectedStrokeWidth: 2,
  nodeHighlightedStrokeWidth: 1,
  nodeCornerRadius: 5,
  nodeFillColor: "#208020",
  nodeErrorColor: "#ff2f2f",
  nodeSelectedColor: "#f2a200",
  nodeFinalColor: "#208080",
  nodeHighlightedColor: "#cc78c5",
  labelStyle: {},
  topConnectorStyle: {},
  deleteButtonStyle: {},
  typeValueStyle: {},
  isMathNode: false,
  mathPieces: [],
  commentable: {
    addThread: true,
    deleteThread: true,
    addComment: true,
    deleteComment: true,
  },
  commentThreads: [],
  setCommentsOpen: () => {},
  setCommentsClose: () => {},
  isCommentsOpen: false,
  commentsButtonStyle: {},
  isCreatingNode: false,
  isCreatingMathNode: false,
  addingAnnotationOn: false,
};

export default Node;
