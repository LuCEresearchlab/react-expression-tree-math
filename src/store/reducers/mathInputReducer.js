const reducers = {
  toggleMathInput: (state) => {
    const { isMathInputOpen } = state;

    return {
      ...state,
      isMathInputOpen: !isMathInputOpen,
    };
  },

  setMathLatex: (state, payload) => {
    const { mathLatex } = payload;

    return {
      ...state,
      mathLatex,
    };
  },

  setMathOperator: (state, payload) => {
    const { mathOperator } = payload;

    return {
      ...state,
      mathOperator,
    };
  },
};

export default reducers;
