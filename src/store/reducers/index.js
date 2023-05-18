import treeReducers from './treeEditorReducer';
import globalsReducers from './globalsReducer';
import strageReducers from './stageReducer';
import drawerReducers from './drawerReducer';
import mathInputReducers from './mathInputReducer';
import commentsReducers from './commentsReducer';
import utilityReducers from './utilityReducer';

export const reducers = {
  ...globalsReducers,
  ...strageReducers,
  ...treeReducers,
  ...drawerReducers,
  ...mathInputReducers,
  ...commentsReducers,
  ...utilityReducers,
};

function reducer(state, action) {
  const { type, payload } = action;

  if (!(type in reducers))
    throw new Error(`Unknown action: ${type}, ${payload}`);
  return reducers[type](state, payload);
}

export default reducer;
