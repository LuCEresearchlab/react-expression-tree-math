const actions = [
  {
    name: "setNodes",
    action: (nodes) => ({
      type: "setNodes",
      payload: {
        nodes,
      },
    }),
  },
  {
    name: "createNode",
    action: ({
      id,
      pieces,
      piecesPosition,
      x,
      y,
      width,
      height,
      type,
      value,
      isSelected,
      visibility,
      childEdges,
      parentEdges,
      editable,
      isMathNode,
      mathPieces,
      commentable,
      commentThreads,
    }) => ({
      type: "createNode",
      payload: {
        id,
        pieces,
        piecesPosition,
        x,
        y,
        width,
        height,
        type,
        value,
        isSelected,
        visibility,
        childEdges,
        parentEdges,
        editable,
        isMathNode,
        mathPieces,
        commentable,
        commentThreads,
      },
    }),
  },
  {
    name: "removeNode",
    action: (nodeId) => ({
      type: "removeNode",
      payload: {
        nodeId,
      },
    }),
  },
  {
    name: "updateNode",
    action: ({ updatedEdges, pieces, piecesPosition, width, parentEdges }) => ({
      type: "updateNode",
      payload: {
        updatedEdges,
        pieces,
        piecesPosition,
        width,
        parentEdges,
      },
    }),
  },
  {
    name: "updateNodeCoordinates",
    action: ({ updatedEdges, nodeId, updatedNode }) => ({
      type: "updateNodeCoordinates",
      payload: {
        updatedEdges,
        nodeId,
        updatedNode,
      },
    }),
  },
  {
    name: "updateNodeCoordinatesAndFinishDragging",
    action: ({ updatedEdges, nodeId, updatedNode }) => ({
      type: "updateNodeCoordinatesAndFinishDragging",
      payload: {
        updatedEdges,
        nodeId,
        updatedNode,
      },
    }),
  },
  {
    name: "updateNodeType",
    action: (type) => ({
      type: "updateNodeType",
      payload: {
        type,
      },
    }),
  },
  {
    name: "updateNodeTypeSuperscript",
    action: (typeSuperscript) => ({
      type: "updateNodeTypeSuperscript",
      payload: {
        typeSuperscript,
      },
    }),
  },
  {
    name: "updateNodeValue",
    action: (value) => ({
      type: "updateNodeValue",
      payload: {
        value,
      },
    }),
  },
  {
    name: "setSelectedNode",
    action: (selectedNode) => ({
      type: "setSelectedNode",
      payload: {
        selectedNode,
      },
    }),
  },
  {
    name: "clearSelectedNode",
    action: () => ({
      type: "clearSelectedNode",
    }),
  },
  {
    name: "setSelectedRootNode",
    action: (selectedRootNode) => ({
      type: "setSelectedRootNode",
      payload: {
        selectedRootNode,
      },
    }),
  },
  {
    name: "clearSelectedRootNode",
    action: () => ({
      type: "clearSelectedRootNode",
    }),
  },
  {
    name: "setHighlightedNodes",
    action: (highlightedNodes) => ({
      type: "setHighlightedNodes",
      payload: {
        highlightedNodes,
      },
    }),
  },
  {
    name: "setSubtreeVisibility",
    action: ({
      subtreeStartingNodeId,
      subtreeStartingPieceId,
      currentVisibility,
    }) => ({
      type: "setSubtreeVisibility",
      payload: {
        subtreeStartingNodeId,
        subtreeStartingPieceId,
        currentVisibility,
      },
    }),
  },
  {
    name: "setAllVisible",
    action: () => ({
      type: "setAllVisible",
    }),
  },
  {
    name: "setEdges",
    action: (edges) => ({
      type: "setEdges",
      payload: {
        edges,
      },
    }),
  },
  {
    name: "createEdge",
    action: ({
      childNodeId,
      parentNodeId,
      parentPieceId,
      childX,
      childY,
      parentX,
      parentY,
    }) => ({
      type: "createEdge",
      payload: {
        childNodeId,
        parentNodeId,
        parentPieceId,
        childX,
        childY,
        parentX,
        parentY,
      },
    }),
  },
  {
    name: "removeEdge",
    action: (edgeId) => ({
      type: "removeEdge",
      payload: {
        edgeId,
      },
    }),
  },
  {
    name: "updateChildEdge",
    action: ({ edgeId, newEdge }) => ({
      type: "updateChildEdge",
      payload: {
        edgeId,
        newEdge,
      },
    }),
  },
  {
    name: "updateParentEdge",
    action: ({ edgeId, newEdge }) => ({
      type: "updateParentEdge",
      payload: {
        edgeId,
        newEdge,
      },
    }),
  },
  {
    name: "setSelectedEdge",
    action: (selectedEdge) => ({
      type: "setSelectedEdge",
      payload: {
        selectedEdge,
      },
    }),
  },
  {
    name: "clearSelectedEdge",
    action: () => ({
      type: "clearSelectedEdge",
    }),
  },
  {
    name: "setHighlightedEdges",
    action: (highlightedEdges) => ({
      type: "setHighlightedEdges",
      payload: {
        highlightedEdges,
      },
    }),
  },
  {
    name: "setDragEdge",
    action: (dragEdge) => ({
      type: "setDragEdge",
      payload: {
        dragEdge,
      },
    }),
  },
  {
    name: "clearDragEdge",
    action: () => ({
      type: "clearDragEdge",
    }),
  },
  {
    name: "updateDragEdgeParentCoordinates",
    action: ({ x, y }) => ({
      type: "updateDragEdgeParentCoordinates",
      payload: {
        x,
        y,
      },
    }),
  },
  {
    name: "updateDragEdgeChildCoordinates",
    action: ({ x, y }) => ({
      type: "updateDragEdgeChildCoordinates",
      payload: {
        x,
        y,
      },
    }),
  },
  {
    name: "setNodeEditability",
    action: ({ nodeId, allowLabel, allowDelete, allowValue, allowType }) => ({
      type: "setNodeEditability",
      payload: {
        nodeId,
        allowLabel,
        allowDelete,
        allowValue,
        allowType,
      },
    }),
  },
  {
    name: "stageReset",
    action: ({
      nodes,
      selectedNode,
      edges,
      selectedEdge,
      selectedRootNode,
      stagePos,
      stageScale,
      connectorPlaceholder,
      annotations,
    }) => ({
      type: "stageReset",
      payload: {
        nodes,
        selectedNode,
        edges,
        selectedEdge,
        selectedRootNode,
        stagePos,
        stageScale,
        connectorPlaceholder,
        annotations,
      },
    }),
  },
  {
    name: "setStartingOrderedNodes",
    action: ({ nodes, edges, annotations, stagePos, stageScale }) => ({
      type: "setStartingOrderedNodes",
      payload: {
        nodes,
        edges,
        annotations,
        stagePos,
        stageScale,
      },
    }),
  },
  {
    name: "setOrderedNodes",
    action: ({ nodes, edges, annotations, stagePos, stageScale }) => ({
      type: "setOrderedNodes",
      payload: {
        nodes,
        edges,
        annotations,
        stagePos,
        stageScale,
      },
    }),
  },
  {
    name: "setIsDraggingNode",
    action: (nodeId) => ({
      type: "setIsDraggingNode",
      payload: {
        nodeId,
      },
    }),
  },
  {
    name: "moveNodeToEnd",
    action: (payload) => ({ type: "moveNodeToEnd", payload }),
  },
  {
    name: "nodeValueChange",
    action: (payload) => ({ type: "nodeValueChange", payload }),
  },
  {
    name: "setConnectorPlaceholder",
    action: (payload) => ({ type: "setConnectorPlaceholder", payload }),
  },
  {
    name: "setPlaceholderWidth",
    action: (payload) => ({ type: "setPlaceholderWidth", payload }),
  },

  // Globals
  {
    name: "setFontSize",
    action: (fontSize) => ({
      type: "setFontSize",
      payload: {
        fontSize,
      },
    }),
  },
  {
    name: "setFontFamily",
    action: (fontFamily) => ({
      type: "setFontFamily",
      payload: {
        fontFamily,
      },
    }),
  },
  {
    name: "setNodePaddingX",
    action: (nodePaddingX) => ({
      type: "setNodePaddingX",
      payload: {
        nodePaddingX,
      },
    }),
  },
  {
    name: "setNodePaddingY",
    action: (nodePaddingY) => ({
      type: "setNodePaddingY",
      payload: {
        nodePaddingY,
      },
    }),
  },
  // Drawer
  {
    name: "setAddEdgeErrorSnackbarMessage",
    action: (addEdgeErrorMessage) => ({
      type: "setAddEdgeErrorSnackbarMessage",
      payload: {
        addEdgeErrorMessage,
      },
    }),
  },
  {
    name: "toggleIsAddEdgeErrorSnackbarOpen",
    action: () => ({
      type: "toggleIsAddEdgeErrorSnackbarOpen",
    }),
  },
  {
    name: "toggleIsCreatingNode",
    action: () => ({
      type: "toggleIsCreatingNode",
    }),
  },
  {
    name: "clearIsCreatingNode",
    action: () => ({
      type: "clearIsCreatingNode",
    }),
  },
  {
    name: "toggleDrawer",
    action: () => ({
      type: "toggleDrawer",
    }),
  },
  {
    name: "setCreateNodeInputValue",
    action: (createNodeInputValue) => ({
      type: "setCreateNodeInputValue",
      payload: {
        createNodeInputValue,
      },
    }),
  },
  {
    name: "setUpdateLabelInputValue",
    action: (updateLabelInputValue) => ({
      type: "setUpdateLabelInputValue",
      payload: {
        updateLabelInputValue,
      },
    }),
  },
  {
    name: "setCreateNodeDescription",
    action: (createNodeDescription) => ({
      type: "setCreateNodeDescription",
      payload: {
        createNodeDescription,
      },
    }),
  },
  {
    name: "setTemplateNodes",
    action: (templateNodes) => ({
      type: "setTemplateNodes",
      payload: {
        templateNodes,
      },
    }),
  },
  {
    name: "setTemplateNodesDescription",
    action: (templateNodesDescription) => ({
      type: "setTemplateNodesDescription",
      payload: {
        templateNodesDescription,
      },
    }),
  },
  // Stage
  {
    name: "toggleFullScreen",
    action: () => ({
      type: "toggleFullScreen",
    }),
  },
  {
    name: "exitFullScreen",
    action: () => ({
      type: "exitFullScreen",
    }),
  },
  {
    name: "setStagePos",
    action: (stagePos) => ({
      type: "setStagePos",
      payload: {
        stagePos,
      },
    }),
  },
  {
    name: "setStageScale",
    action: (stageScale) => ({
      type: "setStageScale",
      payload: {
        stageScale,
      },
    }),
  },
  {
    name: "setStagePos",
    action: (stagePos) => ({
      type: "setStagePos",
      payload: {
        stagePos,
      },
    }),
  },
  {
    name: "setStagePositionAndScale",
    action: ({ stagePos, stageScale }) => ({
      type: "setStagePositionAndScale",
      payload: {
        stagePos,
        stageScale,
      },
    }),
  },
  {
    name: "zoomStage",
    action: (zoomMultiplier) => ({
      type: "zoomStage",
      payload: {
        zoomMultiplier,
      },
    }),
  },
  {
    name: "zoomStageWheel",
    action: ({ stageScale, stagePos }) => ({
      type: "zoomStageWheel",
      payload: {
        stageScale,
        stagePos,
      },
    }),
  },
  // Undo - Redo
  {
    name: "undo",
    action: () => ({
      type: "undo",
    }),
  },
  {
    name: "redo",
    action: () => ({
      type: "redo",
    }),
  },
  // Utility
  {
    name: "resetEdges",
    action: () => ({
      type: "resetEdges",
    }),
  },
  {
    name: "resetTypeLabels",
    action: () => ({
      type: "resetTypeLabels",
    }),
  },
  {
    name: "resetValueLabels",
    action: () => ({
      type: "resetValueLabels",
    }),
  },
  {
    name: "resetRootNode",
    action: () => ({
      type: "resetRootNode",
    }),
  },
  // Math Input
  {
    name: "toggleMathInput",
    action: () => ({
      type: "toggleMathInput",
    }),
  },
  {
    name: "setCurrentMathSelection",
    action: (currentMathSelection) => ({
      type: "setCurrentMathSelection",
      payload: {
        currentMathSelection,
      },
    }),
  },
  {
    name: "setIsCreatingMathNode",
    action: (setValue) => ({
      type: "setIsCreatingMathNode",
      payload: {
        setValue,
      },
    }),
  },
  // Comments
  {
    name: "toggleComments",
    action: () => ({
      type: "toggleComments",
    }),
  },
  {
    name: "setCommentsOpen",
    action: () => ({
      type: "setCommentsOpen",
    }),
  },
  {
    name: "setCommentsClose",
    action: () => ({
      type: "setCommentsClose",
    }),
  },
  {
    name: "updateGlobalState",
    action: ({ nodes, edges, selectedRootNode, stagePos, stageScale }) => ({
      type: "updateGlobalState",
      payload: {
        nodes,
        edges,
        selectedRootNode,
        stagePos,
        stageScale,
      },
    }),
  },
  {
    name: "setAddingThreadTitle",
    action: (threadTitle) => ({
      type: "setAddingThreadTitle",
      payload: {
        threadTitle,
      },
    }),
  },
  {
    name: "setAddingThreadType",
    action: (threadType) => ({
      type: "setAddingThreadType",
      payload: {
        threadType,
      },
    }),
  },
  {
    name: "startCommentThread",
    action: ({ selection, addingThreadTitle, addingThreadType }) => ({
      type: "startCommentThread",
      payload: {
        selection,
        addingThreadTitle,
        addingThreadType,
      },
    }),
  },
  {
    name: "toggleExpandedThread",
    action: ({ selection, threadId }) => ({
      type: "toggleExpandedThread",
      payload: {
        selection,
        threadId,
      },
    }),
  },
  {
    name: "shrinkAllThreads",
    action: () => ({
      type: "shrinkAllThreads",
    }),
  },
  {
    name: "addComment",
    action: ({ selection, threadId, commentValue }) => ({
      type: "addComment",
      payload: {
        selection,
        threadId,
        commentValue,
      },
    }),
  },
  {
    name: "deleteThread",
    action: ({ selection, threadId }) => ({
      type: "deleteThread",
      payload: {
        selection,
        threadId,
      },
    }),
  },
  {
    name: "deleteComment",
    action: ({ selection, threadId, commentId }) => ({
      type: "deleteComment",
      payload: {
        selection,
        threadId,
        commentId,
      },
    }),
  },
  {
    name: "toggleResolvedThread",
    action: ({ selection, threadId }) => ({
      type: "toggleResolvedThread",
      payload: {
        selection,
        threadId,
      },
    }),
  },
  {
    name: "setAnnotationText",
    action: (addingAnnotationText) => ({
      type: "setAnnotationText",
      payload: {
        addingAnnotationText,
      },
    }),
  },
  {
    name: "toggleAddAnnotation",
    action: () => ({
      type: "toggleAddAnnotation",
    }),
  },
  {
    name: "setAnnotationColor",
    action: (addingAnnotationColor) => ({
      type: "setAnnotationColor",
      payload: {
        addingAnnotationColor,
      },
    }),
  },
  {
    name: "setEditingAnnotationColor",
    action: (editingAnnotationColor) => ({
      type: "setEditingAnnotationColor",
      payload: {
        editingAnnotationColor,
      },
    }),
  },
  {
    name: "createAnnotation",
    action: ({ id, x, y, width, height, text, color, editable }) => ({
      type: "createAnnotation",
      payload: {
        id,
        x,
        y,
        width,
        height,
        text,
        color,
        editable,
      },
    }),
  },
  {
    name: "setIsDraggingAnnotation",
    action: (annotationId) => ({
      type: "setIsDraggingAnnotation",
      payload: {
        annotationId,
      },
    }),
  },
  {
    name: "updateAnnotationCoordinates",
    action: ({ annotationId, updatedAnnotation }) => ({
      type: "updateAnnotationCoordinates",
      payload: {
        annotationId,
        updatedAnnotation,
      },
    }),
  },
  {
    name: "updateAnnotationCoordinatesAndFinishDragging",
    action: ({ annotationId, updatedAnnotation }) => ({
      type: "updateAnnotationCoordinatesAndFinishDragging",
      payload: {
        annotationId,
        updatedAnnotation,
      },
    }),
  },
  {
    name: "setSelectedAnnotation",
    action: (selectedAnnotation) => ({
      type: "setSelectedAnnotation",
      payload: {
        selectedAnnotation,
      },
    }),
  },
  {
    name: "clearSelectedAnnotation",
    action: () => ({
      type: "clearSelectedAnnotation",
    }),
  },
  {
    name: "clearAddingAnnotation",
    action: () => ({
      type: "clearAddingAnnotation",
    }),
  },
  {
    name: "removeAnnotation",
    action: (annotationId) => ({
      type: "removeAnnotation",
      payload: {
        annotationId,
      },
    }),
  },
  {
    name: "updateAnnotationValue",
    action: ({ selectedAnnotation, updatedAnnotation }) => ({
      type: "updateAnnotationValue",
      payload: {
        selectedAnnotation,
        updatedAnnotation,
      },
    }),
  },
  {
    name: "setUpdateAnnotationValue",
    action: (updateAnnotationValueText) => ({
      type: "setUpdateAnnotationValue",
      payload: {
        updateAnnotationValueText,
      },
    }),
  },
];

export default actions;
