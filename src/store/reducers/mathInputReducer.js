const reducers = {
  toggleMathInput: (state) => {
    const { isMathInputOpen } = state;

    return {
      ...state,
      isMathInputOpen: !isMathInputOpen,
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
