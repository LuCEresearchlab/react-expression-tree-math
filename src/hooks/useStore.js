import { useReducer, useMemo, useEffect } from "react";

import actions from "../store/actions";
import reducer from "../store/reducers";
import {
  createSanitizedUtilsProps,
  createInitialState,
} from "../store/initialState";

import createPositionUtils from "../utils/position";

function useStore({
  computeStageWidth,
  autolayout,
  autofit,
  layerRef,
  stageRef,
  shuffleNodes,
  propNodes,
  propSelectedNode,
  propEdges,
  propSelectedEdge,
  propSelectedRootNode,
  propStagePos,
  propStageScale,
  propConnectorPlaceholder,
  propPlaceholderWidth,
  propFontSize,
  propFontFamily,
  propNodePaddingX,
  propNodePaddingY,
  propTemplateNodes,
  propHighlightedNodes,
  propHighlightedEdges,
  propAnnotations,
}) {
  const {
    sanitizedFontSize,
    sanitizedFontFamily,
    sanitizedConnectorPlaceholder,
    sanitizedPlaceholderWidth,
    sanitizedNodePaddingX,
    sanitizedNodePaddingY,
  } = useMemo(
    () =>
      createSanitizedUtilsProps(
        propFontSize,
        propFontFamily,
        propConnectorPlaceholder,
        propPlaceholderWidth,
        propNodePaddingX,
        propNodePaddingY,
      ),
    [
      propFontSize,
      propFontFamily,
      propConnectorPlaceholder,
      propPlaceholderWidth,
      propNodePaddingX,
      propNodePaddingY,
    ],
  );

  const utils = useMemo(
    () =>
      createPositionUtils(
        sanitizedFontSize,
        sanitizedFontFamily,
        sanitizedConnectorPlaceholder,
        sanitizedPlaceholderWidth,
        sanitizedNodePaddingX,
        sanitizedNodePaddingY,
      ),
    [
      sanitizedFontSize,
      sanitizedFontFamily,
      sanitizedConnectorPlaceholder,
      sanitizedPlaceholderWidth,
      sanitizedNodePaddingX,
      sanitizedNodePaddingY,
    ],
  );

  const {
    sanitizedNodes,
    sanitizedEdges,
    sanitizedAnnotations,
    sanitizedStagePos,
    sanitizedStageScale,
  } = useMemo(
    () =>
      utils.sanitizeNodesAndEdges(
        propNodes,
        propEdges,
        propAnnotations,
        propSelectedRootNode,
        propStagePos,
        propStageScale,
        shuffleNodes,
        autolayout,
        autofit,
        layerRef,
        stageRef,
        computeStageWidth,
        true,
        false,
        true,
        propHighlightedNodes,
        propHighlightedEdges,
      ),
    [
      propNodes,
      propEdges,
      propAnnotations,
      propSelectedRootNode,
      propStagePos,
      propStageScale,
      shuffleNodes,
      autolayout,
      autofit,
      layerRef,
      stageRef,
      utils.sanitizeNodesAndEdges,
    ],
  );

  const templateNodesDescription = useMemo(() => {
    if (propTemplateNodes !== undefined && propTemplateNodes !== null) {
      return propTemplateNodes.map((pieces) =>
        utils.createNodeFromPieces(false, pieces),
      );
    }
    return null;
  }, []);

  const [store, dispatch] = useReducer(
    reducer,
    createInitialState(
      sanitizedNodes,
      propSelectedNode,
      sanitizedEdges,
      propSelectedEdge,
      propSelectedRootNode,
      sanitizedStagePos,
      sanitizedStageScale,
      sanitizedConnectorPlaceholder,
      sanitizedPlaceholderWidth,
      sanitizedFontSize,
      sanitizedFontFamily,
      sanitizedNodePaddingX,
      sanitizedNodePaddingY,
      propTemplateNodes,
      templateNodesDescription,
      propHighlightedNodes,
      propHighlightedEdges,
      sanitizedAnnotations,
    ),
  );

  const storeActions = useMemo(() => {
    const temp = actions.reduce((accumulator, item) => {
      accumulator[item.name] = (payload) => {
        dispatch(item.action(payload));
      };
      return accumulator;
    }, {});
    return temp;
  }, [dispatch]);

  useEffect(() => {
    if (sanitizedNodes !== undefined && sanitizedNodes !== null) {
      storeActions.setNodes(sanitizedNodes);
    }
  }, [storeActions, sanitizedNodes]);

  useEffect(() => {
    if (propSelectedNode !== undefined && propSelectedNode !== null) {
      storeActions.setSelectedNode(propSelectedNode);
    } else {
      storeActions.clearSelectedNode();
    }
  }, [storeActions, propSelectedNode]);

  useEffect(() => {
    if (sanitizedEdges !== undefined && sanitizedEdges !== null) {
      storeActions.setEdges(sanitizedEdges);
    }
  }, [storeActions, sanitizedEdges]);

  useEffect(() => {
    if (propSelectedEdge !== undefined && propSelectedEdge !== null) {
      storeActions.setSelectedEdge(propSelectedEdge);
    } else {
      storeActions.clearSelectedEdge();
    }
  }, [storeActions, propSelectedEdge]);

  useEffect(() => {
    if (propSelectedRootNode !== undefined && propSelectedRootNode !== null) {
      storeActions.setSelectedRootNode(propSelectedRootNode);
    } else {
      storeActions.clearSelectedRootNode();
    }
  }, [storeActions, propSelectedRootNode]);

  useEffect(() => {
    if (
      sanitizedConnectorPlaceholder !== undefined &&
      sanitizedConnectorPlaceholder !== null
    ) {
      storeActions.setConnectorPlaceholder({
        connectorPlaceholder: sanitizedConnectorPlaceholder,
      });
    }
  }, [storeActions, sanitizedConnectorPlaceholder]);

  useEffect(() => {
    if (
      sanitizedPlaceholderWidth !== undefined &&
      sanitizedPlaceholderWidth !== null
    ) {
      storeActions.setPlaceholderWidth({
        placeholderWidth: sanitizedPlaceholderWidth,
      });
    }
  }, [storeActions, sanitizedPlaceholderWidth]);

  useEffect(() => {
    if (sanitizedFontSize !== undefined && sanitizedFontSize !== null) {
      storeActions.setFontSize(sanitizedFontSize);
    }
  }, [storeActions, sanitizedFontSize]);

  useEffect(() => {
    if (sanitizedFontFamily !== undefined && sanitizedFontFamily !== null) {
      storeActions.setFontFamily(sanitizedFontFamily);
    }
  }, [storeActions, sanitizedFontFamily]);

  useEffect(() => {
    if (sanitizedNodePaddingX !== undefined && sanitizedNodePaddingX !== null) {
      storeActions.setNodePaddingX(sanitizedNodePaddingX);
    }
  }, [storeActions, sanitizedNodePaddingX]);

  useEffect(() => {
    if (sanitizedNodePaddingY !== undefined && sanitizedNodePaddingY !== null) {
      storeActions.setNodePaddingY(sanitizedNodePaddingY);
    }
  }, [storeActions, sanitizedNodePaddingY]);

  useEffect(() => {
    if (propHighlightedNodes !== undefined && propHighlightedNodes !== null) {
      storeActions.setHighlightedNodes(propHighlightedNodes);
    }
  }, [storeActions, propHighlightedNodes]);

  useEffect(() => {
    if (propHighlightedEdges !== undefined && propHighlightedEdges !== null) {
      storeActions.setHighlightedEdges(propHighlightedEdges);
    }
  }, [storeActions, propHighlightedEdges]);

  return [store, storeActions, utils];
}

export default useStore;
