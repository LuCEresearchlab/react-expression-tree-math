const reducers = {
  toggleComments: (state) => {
    const { isCommentsOpen } = state;

    return {
      ...state,
      isCommentsOpen: !isCommentsOpen,
      isDrawerOpen: false,
      isMathInputOpen: false,
    };
  },
  setCommentsOpen: (state) => {
    return {
      ...state,
      isCommentsOpen: true,
      isDrawerOpen: false,
      isMathInputOpen: false,
    };
  },
  setCommentsClose: (state) => {
    return {
      ...state,
      isCommentsOpen: false,
      isDrawerOpen: false,
      isMathInputOpen: false,
    };
  },
  setAddingThreadTitle: (state, payload) => {
    const { threadTitle } = payload;
    return {
      ...state,
      addingThreadTitle: threadTitle,
    };
  },
  setAddingThreadType: (state, payload) => {
    const { threadType } = payload;
    return {
      ...state,
      addingThreadType: threadType || "",
    };
  },
  startCommentThread: (state, payload) => {
    const { selection, addingThreadTitle, addingThreadType } = payload;
    if (selection.selectedNode) {
      const { nodes, undoState } = state;
      const selectedNode = selection.selectedNode;
      const node = nodes[selectedNode];

      const newUndoState = {
        action: "startCommentThread",
        nodes,
      };

      return {
        ...state,
        nodes: {
          ...nodes,
          [selectedNode]: {
            ...node,
            commentThreads: [
              ...node.commentThreads,
              {
                title: addingThreadTitle,
                comments: [],
                type: addingThreadType,
                expanded: true,
                resolved: false,
              },
            ],
          },
        },
        addingThreadTitle: "",
        addingThreadType: "",
        undoState: [newUndoState, ...undoState],
        redoState: [],
      };
    } else if (selection.selectedEdge) {
      const { edges, undoState } = state;
      const selectedEdge = selection.selectedEdge;
      const edge = edges[selectedEdge];

      const newUndoState = {
        action: "startCommentThread",
        edges,
      };

      return {
        ...state,
        edges: {
          ...edges,
          [selectedEdge]: {
            ...edge,
            commentThreads: [
              ...edge.commentThreads,
              {
                title: addingThreadTitle,
                comments: [],
                type: addingThreadType,
                expanded: true,
                resolved: false,
              },
            ],
          },
        },
        addingThreadTitle: "",
        addingThreadType: "",
        undoState: [newUndoState, ...undoState],
        redoState: [],
      };
    }
  },
  toggleExpandedThread: (state, payload) => {
    const { selection, threadId } = payload;
    if (selection.selectedNode) {
      const { nodes } = state;
      const selectedNode = selection.selectedNode;
      const node = nodes[selectedNode];
      const comment = node.commentThreads[threadId];
      return {
        ...state,
        nodes: {
          ...nodes,
          [selectedNode]: {
            ...node,
            commentThreads: [
              ...node.commentThreads.slice(0, threadId),
              {
                ...comment,
                expanded: !comment.expanded,
              },
              ...node.commentThreads.slice(threadId + 1),
            ],
          },
        },
      };
    } else if (selection.selectedEdge) {
      const { edges } = state;
      const selectedEdge = selection.selectedEdge;
      const edge = edges[selectedEdge];
      const comment = edge.commentThreads[threadId];
      return {
        ...state,
        edges: {
          ...edges,
          [selectedEdge]: {
            ...edge,
            commentThreads: [
              ...edge.commentThreads.slice(0, threadId),
              {
                ...comment,
                expanded: !comment.expanded,
              },
              ...edge.commentThreads.slice(threadId + 1),
            ],
          },
        },
      };
    }
  },
  shrinkAllThreads: (state) => {
    const { nodes, edges } = state;

    const newNodes = { ...nodes };
    Object.keys(newNodes).forEach((nodeId) => {
      newNodes[nodeId].commentThreads = newNodes[nodeId].commentThreads.map(
        (commentThread) => ({
          ...commentThread,
          expanded: false,
        }),
      );
    });

    const newEdges = { ...edges };
    Object.keys(newEdges).forEach((edgeId) => {
      newEdges[edgeId].commentThreads = newEdges[edgeId].commentThreads.map(
        (commentThread) => ({
          ...commentThread,
          expanded: false,
        }),
      );
    });

    return {
      ...state,
      nodes: newNodes,
      edges: newEdges,
    };
  },
  addComment: (state, payload) => {
    const { selection, threadId, commentValue } = payload;
    if (selection.selectedNode) {
      const { nodes, undoState } = state;
      const selectedNode = selection.selectedNode;
      const node = nodes[selectedNode];
      const thread = node.commentThreads[threadId];

      const newUndoState = {
        action: "addComment",
        nodes,
      };

      return {
        ...state,
        nodes: {
          ...nodes,
          [selectedNode]: {
            ...node,
            commentThreads: [
              ...node.commentThreads.slice(0, threadId),
              {
                ...thread,
                comments: [...thread.comments, commentValue],
              },
              ...node.commentThreads.slice(threadId + 1),
            ],
          },
        },
        undoState: [newUndoState, ...undoState],
        redoState: [],
      };
    } else if (selection.selectedEdge) {
      const { edges, undoState } = state;
      const selectedEdge = selection.selectedEdge;
      const edge = edges[selectedEdge];
      const thread = edge.commentThreads[threadId];

      const newUndoState = {
        action: "addComment",
        edges,
      };

      return {
        ...state,
        edges: {
          ...edges,
          [selectedEdge]: {
            ...edge,
            commentThreads: [
              ...edge.commentThreads.slice(0, threadId),
              {
                ...thread,
                comments: [...thread.comments, commentValue],
              },
              ...edge.commentThreads.slice(threadId + 1),
            ],
          },
        },
        undoState: [newUndoState, ...undoState],
        redoState: [],
      };
    }
  },
  deleteThread: (state, payload) => {
    const { selection, threadId } = payload;
    if (selection.selectedNode) {
      const { nodes, undoState } = state;
      const selectedNode = selection.selectedNode;

      const newUndoState = {
        action: "deleteThread",
        nodes,
      };

      return {
        ...state,
        nodes: {
          ...nodes,
          [selectedNode]: {
            ...nodes[selectedNode],
            commentThreads: [
              ...nodes[selectedNode].commentThreads.slice(0, threadId),
              ...nodes[selectedNode].commentThreads.slice(threadId + 1),
            ],
          },
        },
        undoState: [newUndoState, ...undoState],
        redoState: [],
      };
    } else if (selection.selectedEdge) {
      const { edges, undoState } = state;
      const selectedEdge = selection.selectedEdge;

      const newUndoState = {
        action: "deleteThread",
        edges,
      };

      return {
        ...state,
        edges: {
          ...edges,
          [selectedEdge]: {
            ...edges[selectedEdge],
            commentThreads: [
              ...edges[selectedEdge].commentThreads.slice(0, threadId),
              ...edges[selectedEdge].commentThreads.slice(threadId + 1),
            ],
          },
        },
        undoState: [newUndoState, ...undoState],
        redoState: [],
      };
    }
  },
  deleteComment: (state, payload) => {
    const { selection, threadId, commentId } = payload;
    if (selection.selectedNode) {
      const { nodes, undoState } = state;
      const selectedNode = selection.selectedNode;

      const newUndoState = {
        action: "deleteComment",
        nodes,
      };

      return {
        ...state,
        nodes: {
          ...nodes,
          [selectedNode]: {
            ...nodes[selectedNode],
            commentThreads: [
              ...nodes[selectedNode].commentThreads.slice(0, threadId),
              {
                ...nodes[selectedNode].commentThreads[threadId],
                comments: [
                  ...nodes[selectedNode].commentThreads[
                    threadId
                  ].comments.slice(0, commentId),
                  ...nodes[selectedNode].commentThreads[
                    threadId
                  ].comments.slice(commentId + 1),
                ],
              },
              ...nodes[selectedNode].commentThreads.slice(threadId + 1),
            ],
          },
        },
        undoState: [newUndoState, ...undoState],
        redoState: [],
      };
    } else if (selection.selectedEdge) {
      const { edges, undoState } = state;
      const selectedEdge = selection.selectedEdge;

      const newUndoState = {
        action: "deleteComment",
        edges,
      };

      return {
        ...state,
        edges: {
          ...edges,
          [selectedEdge]: {
            ...edges[selectedEdge],
            commentThreads: [
              ...edges[selectedEdge].commentThreads.slice(0, threadId),
              {
                ...edges[selectedEdge].commentThreads[threadId],
                comments: [
                  ...edges[selectedEdge].commentThreads[
                    threadId
                  ].comments.slice(0, commentId),
                  ...edges[selectedEdge].commentThreads[
                    threadId
                  ].comments.slice(commentId + 1),
                ],
              },
              ...edges[selectedEdge].commentThreads.slice(threadId + 1),
            ],
          },
        },
        undoState: [newUndoState, ...undoState],
        redoState: [],
      };
    }
  },
  toggleResolvedThread: (state, payload) => {
    const { selection, threadId } = payload;
    if (selection.selectedNode) {
      const { nodes, undoState } = state;
      const selectedNode = selection.selectedNode;
      const node = nodes[selectedNode];
      const commentThread = node.commentThreads[threadId];

      const newUndoState = {
        action: "toggleResolvedThread",
        nodes,
      };

      return {
        ...state,
        nodes: {
          ...nodes,
          [selectedNode]: {
            ...node,
            commentThreads: [
              ...node.commentThreads.slice(0, threadId),
              {
                ...commentThread,
                resolved: !commentThread.resolved,
              },
              ...node.commentThreads.slice(threadId + 1),
            ],
          },
        },
        undoState: [newUndoState, ...undoState],
        redoState: [],
      };
    } else if (selection.selectedEdge) {
      const { edges, undoState } = state;
      const selectedEdge = selection.selectedEdge;
      const edge = edges[selectedEdge];
      const commentThread = edge.commentThreads[threadId];

      const newUndoState = {
        action: "toggleResolvedThread",
        edges,
      };

      return {
        ...state,
        edges: {
          ...edges,
          [selectedEdge]: {
            ...edge,
            commentThreads: [
              ...edge.commentThreads.slice(0, threadId),
              {
                ...commentThread,
                resolved: !commentThread.resolved,
              },
              ...edge.commentThreads.slice(threadId + 1),
            ],
          },
        },
        undoState: [newUndoState, ...undoState],
        redoState: [],
      };
    }
  },
  setAnnotationText: (state, payload) => {
    const { addingAnnotationText } = payload;
    const { addingAnnotationOn } = state;

    return {
      ...state,
      addingAnnotationText: addingAnnotationText,
      addingAnnotationOn:
        addingAnnotationText.length === 0 ? false : addingAnnotationOn,
    };
  },
  toggleAddAnnotation: (state) => {
    const { addingAnnotationOn } = state;
    return {
      ...state,
      addingAnnotationOn: !addingAnnotationOn,
      isCreatingNode: false,
      isCreatingMathNode: false,
    };
  },
  setAnnotationColor: (state, payload) => {
    const { addingAnnotationColor } = payload;
    return {
      ...state,
      addingAnnotationColor: addingAnnotationColor,
    };
  },
  createAnnotation: (state, payload) => {
    const {
      undoState,
      annotations,
      addingAnnotationColor,
      addingAnnotationText,
    } = state;
    const { id, x, y, width, height, text, color, editable } = payload;

    const newAnnotation = {
      id,
      x,
      y,
      width,
      height,
      color,
      text,
      editable,
    };

    const newUndoState = {
      action: "creatAnnotation",
      annotations,
    };

    return {
      ...state,
      annotations: { ...annotations, [id]: newAnnotation },
      addingAnnotationOn: false,
      addingAnnotationText: "",
      undoState: [newUndoState, ...undoState],
      redoState: [],
    };
  },
  /* This reducer is used for changing position during dragging, we add the undo state in here
   * instead of 'updateAnnotationCoordinates' and 'updateAnnotationCoordinatesAndFinishDragging', because
   * in here we have the knowledge of the initial position of the annotations before dragging.
   */
  setIsDraggingAnnotation: (state, payload) => {
    const { annotationId } = payload;

    const {
      undoState,
      annotations,
      selectedAnnotation,
      selectedAnnotationEditable,
      selectedNode,
      isSelectedNodeEditable,
      selectedEdge,
      updateLabelInputValue,
      updateTypeInputValue,
      updateValueInputValue,
    } = state;
    const annotation = annotations[annotationId];

    const newUndoState = {
      action: "setIsDraggingAnnotation",
      annotations,
      selectedAnnotation,
      selectedAnnotationEditable,
      selectedNode,
      selectedEdge,
      isSelectedNodeEditable,
      updateLabelInputValue,
      updateTypeInputValue,
      updateValueInputValue,
    };

    return {
      ...state,
      isDraggingAnnotation: true,
      selectedAnnotation: annotationId,
      selectedAnnotationEditable: annotation.editable,
      selectedNode: undefined,
      isSelectedNodeEditable: undefined,
      selectedNodeCommentable: undefined,
      isSelectedNodeMath: undefined,
      isSelectedNodeFullyVisible: undefined,
      selectedEdge: undefined,
      selectedEdgeCommentable: undefined,
      updateLabelInputValue: "",
      updateTypeInputValue: "",
      updateValueInputValue: "",
      updateTypeSuperscript: "",
      undoState: [newUndoState, ...undoState],
      redoState: [],
    };
  },
  // Undo and Redo: look at 'setIsDraggingAnnotation'
  updateAnnotationCoordinates: (state, payload) => {
    const { annotationId, updatedAnnotation } = payload;

    const { annotations } = state;
    const oldAnnotation = annotations[annotationId];

    return {
      ...state,
      annotations: {
        ...annotations,
        [annotationId]: {
          ...oldAnnotation,
          ...updatedAnnotation,
        },
      },
    };
  },
  // Undo and Redo: look at 'setIsDraggingAnnotation'
  updateAnnotationCoordinatesAndFinishDragging: (state, payload) => {
    const { annotationId, updatedAnnotation } = payload;

    const { annotations } = state;
    const oldAnnotation = annotations[annotationId];

    return {
      ...state,
      isDraggingAnnotation: false,
      annotations: {
        ...annotations,
        [annotationId]: {
          ...oldAnnotation,
          ...updatedAnnotation,
        },
      },
    };
  },
  // No Undo and Redo
  setSelectedAnnotation: (state, payload) => {
    const { annotations } = state;
    const { selectedAnnotation } = payload;

    const annotation = annotations[selectedAnnotation];
    return {
      ...state,
      selectedAnnotation,
      selectedAnnotationEditable: annotation.editable,
      updateAnnotationValueText: annotation.text,
      editingAnnotationColor: annotation.color,
      selectedEdge: undefined,
      selectedEdgeCommentable: undefined,
      selectedNode: undefined,
      isSelectedNodeEditable: undefined,
      selectedNodeCommentable: undefined,
      isSelectedNodeMath: undefined,
      isSelectedNodeFullyVisible: undefined,
      updateLabelInputValue: "",
      updateTypeInputValue: "",
      updateValueInputValue: "",
      updateTypeSuperscript: "",
    };
  },
  // No Undo and Redo
  clearSelectedAnnotation: (state) => ({
    ...state,
    selectedAnnotation: undefined,
    selectedAnnotationEditable: undefined,
    updateAnnotationValueText: "",
    editingAnnotationColor: { hex: "#35BFFF", rgb: [53, 191, 255] },
  }),
  clearAddingAnnotation: (state) => ({
    ...state,
    addingAnnotationOn: false,
  }),
  removeAnnotation: (state, payload) => {
    const { annotationId } = payload;
    const { undoState, annotations } = state;

    const newUndoState = {
      action: "removeAnnotation",
      annotations,
      selectedAnnotation: annotationId,
    };

    const newAnnotations = Object.keys(annotations).reduce((acc, id) => {
      if (id !== annotationId) {
        acc[id] = annotations[id];
      }
      return acc;
    }, {});

    return {
      ...state,
      annotations: newAnnotations,
      selectedAnnotation: undefined,
      selectedAnnotationEditable: undefined,
      undoState: [newUndoState, ...undoState],
      redoState: [],
    };
  },
  updateAnnotationValue: (state, payload) => {
    const { undoState, annotations } = state;
    const { selectedAnnotation, updatedAnnotation } = payload;

    const newUndoState = {
      action: "updateAnnotationValue",
      annotations,
    };

    return {
      ...state,
      annotations: {
        ...annotations,
        [selectedAnnotation]: updatedAnnotation,
      },
      undoState: [newUndoState, ...undoState],
      redoState: [],
    };
  },
  setUpdateAnnotationValue: (state, payload) => {
    const { updateAnnotationValueText } = payload;
    return {
      ...state,
      updateAnnotationValueText,
    };
  },
  setEditingAnnotationColor: (state, payload) => {
    const { editingAnnotationColor } = payload;
    return {
      ...state,
      editingAnnotationColor: editingAnnotationColor,
    };
  },
};

export default reducers;
