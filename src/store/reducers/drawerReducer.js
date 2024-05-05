/* eslint-disable arrow-body-style */
const reducers = {
  // Invert the addingNode state
  toggleIsCreatingNode: (state) => {
    const { isCreatingNode } = state;
    return {
      ...state,
      isCreatingNode: !isCreatingNode,
      isCreatingMathNode: false,
      addingAnnotationOn: false,
    };
  },

  clearIsCreatingNode: (state) => ({
    ...state,
    isCreatingNode: false,
    isCreatingMathNode: false,
  }),

  toggleDrawer: (state) => {
    const { isDrawerOpen } = state;

    return {
      ...state,
      isDrawerOpen: !isDrawerOpen,
      isCommentsOpen: false,
      isMathInputOpen: false,
    };
  },

  setCreateNodeInputValue: (state, payload) => {
    const { createNodeInputValue } = payload;
    const { isCreatingNode } = state;

    return {
      ...state,
      createNodeInputValue,
      isCreatingNode:
        createNodeInputValue.length === 0 ? false : isCreatingNode,
    };
  },

  setUpdateLabelInputValue: (state, payload) => {
    const { updateLabelInputValue } = payload;
    return {
      ...state,
      updateLabelInputValue,
    };
  },

  setAddEdgeErrorSnackbarMessage: (state, payload) => {
    const { addEdgeErrorMessage } = payload;

    const { currentAddEdgeErrorMessage, currentIsAddEdgeErrorSnackbarOpen } =
      state;
    const isUndefined = addEdgeErrorMessage === undefined;

    return {
      ...state,
      addEdgeErrorMessage: isUndefined
        ? currentAddEdgeErrorMessage
        : addEdgeErrorMessage,
      isAddEdgeErrorSnackbarOpen: isUndefined
        ? currentIsAddEdgeErrorSnackbarOpen
        : true,
      dragEdge: null,
    };
  },

  toggleIsAddEdgeErrorSnackbarOpen: (state) => ({
    ...state,
    isAddEdgeErrorSnackbarOpen: false,
  }),

  setCreateNodeDescription: (state, payload) => {
    const { createNodeDescription } = payload;

    return {
      ...state,
      createNodeDescription,
    };
  },

  setTemplateNodes: (state, payload) => {
    const { templateNodesDescription } = payload;

    return {
      ...state,
      templateNodesDescription,
    };
  },

  setTemplateNodesDescription: (state, payload) => {
    const { templateNodesDescription } = payload;

    return {
      ...state,
      templateNodesDescription,
    };
  },

  undo: (state) => {
    const { undoState, redoState } = state;

    const [lastUndoState, ...remainingUndoState] = undoState;
    const changedKeys = Object.keys(lastUndoState);

    const currentState = {};
    changedKeys.forEach((key) => {
      if (key !== "action") {
        currentState[key] = state[key];
      }
    });

    return {
      ...state,
      undoState: remainingUndoState,
      redoState: [currentState, ...redoState],
      ...lastUndoState,
    };
  },

  redo: (state) => {
    const { undoState, redoState } = state;

    const [lastRedoState, ...remainingRedoState] = redoState;
    const changedKeys = Object.keys(lastRedoState);

    const currentState = {};
    changedKeys.forEach((key) => {
      if (key !== "action") {
        currentState[key] = state[key];
      }
    });

    return {
      ...state,
      redoState: remainingRedoState,
      undoState: [currentState, ...undoState],
      ...lastRedoState,
    };
  },
};

export default reducers;
