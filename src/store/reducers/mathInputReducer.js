const reducers = {
  toggleMathInput: (state) => {
    const { isMathInputOpen, isD } = state;

    return {
      ...state,
      isMathInputOpen: !isMathInputOpen,
      isDrawerOpen: false,
      isCommentsOpen: false,
    };
  },

  setCurrentMathSelection: (state, payload) => {
    const { currentMathSelection } = payload;

    return {
      ...state,
      currentMathSelection,
    };
  },

  setIsCreatingMathNode: (state, payload) => {
    const { setValue } = payload;
    return {
      ...state,
      isCreatingMathNode: setValue,
      isCreatingNode: false,
    };
  },
};

export default reducers;
