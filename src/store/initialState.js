export const defaultProps = {
  // Global
  fontSize: 24,
  fontFamily: "Roboto Mono, Courier",
  nodePaddingX: 12,
  nodePaddingY: 12,
  connectorPlaceholder: "#",
  placeholderWidth: 16,
  isDraggingNode: false,
  // Stage
  isFullScreen: false,
  stagePos: { x: 0, y: 0 },
  stageScale: { x: 1, y: 1 },
  // Tree
  nodes: {},
  edges: {},
  dragEdge: null,
  selectedNode: null,
  selectedEdge: null,
  selectedRootNode: null,
  highlightedNodes: [],
  highlightedEdges: [],
  // Drawer
  isDrawerOpen: true,
  addEdgeErrorMessage: "",
  isAddEdgeErrorSnackbarOpen: false,
  isCreatingNode: false,
  isSelectedNodeEditable: {
    label: true,
    type: true,
    value: true,
    delete: true,
  },
  createNodeInputValue: "",
  createNodeDescription: undefined,
  templateNodes: undefined,
  templateNodesDescription: undefined,
  updateLabelInputValue: "",
  updateTypeInputValue: "",
  updateValueInputValue: "",
  currentError: undefined,
  // Undo - Redo
  undoState: [],
  redoState: [],
  // Math Input
  isMathInputOpen: false,
  currentMathSelection: [],
  isCreatingMathNode: false,
  isSelectedNodeMathNode: false,
  // Comments
  isCommentsOpen: false,
};

export const createSanitizedUtilsProps = (
  propFontSize,
  propFontFamily,
  propConnectorPlaceholder,
  propPlaceholderWidth,
  propNodePaddingX,
  propNodePaddingY,
) => ({
  sanitizedFontSize: propFontSize || defaultProps.fontSize,
  sanitizedFontFamily: propFontFamily || defaultProps.fontFamily,
  sanitizedConnectorPlaceholder:
    propConnectorPlaceholder || defaultProps.connectorPlaceholder,
  sanitizedPlaceholderWidth:
    propPlaceholderWidth || defaultProps.placeholderWidth,
  sanitizedNodePaddingX: propNodePaddingX || defaultProps.defaultNodePaddingX,
  sanitizedNodePaddingY: propNodePaddingY || defaultProps.defaultNodePaddingY,
});

export const createInitialState = (
  nodes,
  selectedNode,
  edges,
  selectedEdge,
  selectedRootNode,
  stagePos,
  stageScale,
  connectorPlaceholder,
  placeholderWidth,
  fontSize,
  fontFamily,
  nodePaddingX,
  nodePaddingY,
  templateNodes,
  templateNodesDescription,
  highlightedNodes,
  highlightedEdges,
) => ({
  // Global
  fontSize: fontSize || defaultProps.fontSize,
  fontFamily: fontFamily || defaultProps.fontFamily,
  nodePaddingX: nodePaddingX || defaultProps.defaultNodePaddingX,
  nodePaddingY: nodePaddingY || defaultProps.defaultNodePaddingY,
  connectorPlaceholder:
    connectorPlaceholder || defaultProps.connectorPlaceholder,
  placeholderWidth: placeholderWidth || defaultProps.placeholderWidth,
  isDraggingNode: defaultProps.isDraggingNode,
  // Stage
  isFullScreen: defaultProps.isFullScreen,
  stagePos: stagePos || defaultProps.stagePos,
  stageScale: stageScale || defaultProps.stageScale,
  // Tree
  nodes: nodes || defaultProps.nodes,
  edges: edges || defaultProps.edges,
  dragEdge: defaultProps.dragEdge,
  selectedNode: selectedNode || defaultProps.selectedNode,
  selectedEdge: selectedEdge || defaultProps.selectedEdge,
  selectedRootNode: selectedRootNode || defaultProps.selectedRootNode,
  highlightedNodes: highlightedNodes || defaultProps.highlightedNodes,
  highlightedEdges: highlightedEdges || defaultProps.highlightedEdges,
  // Drawer
  isDrawerOpen: defaultProps.isDrawerOpen,
  addEdgeErrorMessage: defaultProps.addEdgeErrorMessage,
  isAddEdgeErrorSnackbarOpen: defaultProps.isAddEdgeErrorSnackbarOpen,
  isCreatingNode: defaultProps.isCreatingNode,
  isSelectedNodeEditable: {
    label: defaultProps.isSelectedNodeEditable.label,
    type: defaultProps.isSelectedNodeEditable.type,
    value: defaultProps.isSelectedNodeEditable.value,
    delete: defaultProps.isSelectedNodeEditable.delete,
  },
  createNodeInputValue: defaultProps.createNodeInputValue,
  createNodeDescription: defaultProps.createNodeDescrpiton,
  templateNodes: templateNodes || defaultProps.templateNodes,
  templateNodesDescription:
    templateNodesDescription || defaultProps.templateNodesDescription,
  updateLabelInputValue: defaultProps.updateLabelInputValue,
  updateTypeInputValue: defaultProps.updateTypeInputValue,
  updateValueInputValue: defaultProps.updateValueInputValue,
  // Undo - Redo
  undoState: defaultProps.undoState,
  redoState: defaultProps.redoState,
  // Math Input
  isMathInputOpen: defaultProps.isMathInputOpen,
  currentMathSelection: defaultProps.currentMathSelection,
  isCreatingMathNode: defaultProps.isCreatingMathNode,
  isSelectedNodeMathNode: defaultProps.isSelectedNodeMathNode,
  // Comments
  isCommentsOpen: defaultProps.isCommentsOpen,
});
