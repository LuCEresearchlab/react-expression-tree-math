const reducers = {
  toggleComments: (state) => {
    const { isCommentsOpen } = state;

    return {
      ...state,
      isCommentsOpen: !isCommentsOpen,
    };
  },
};

export default reducers;
