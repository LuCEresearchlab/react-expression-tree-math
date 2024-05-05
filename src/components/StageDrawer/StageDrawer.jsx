import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import { InputComponent } from "react-math-formula-editor";
import ToolbarActions from "./toolbar/ToolbarActions";

import EditorDrawer from "./drawer/EditorDrawer";
import CommentsDrawer from "./drawer/CommentsDrawer/CommentsDrawer";

import DialogEditorInfo from "./dialogs/DialogEditorInfo";
import DialogConfirmReset from "./dialogs/DialogConfirmReset";

import CreatingNodeSnackbar from "./snackbars/CreatingNodeSnackbar";
import AddEdgeErrorSnackbar from "./snackbars/AddEdgeErrorSnackbar";

function StageDrawer({
  containerRef,
  editorHeight,
  selectedRootNode,
  connectorPlaceholder,
  downloadKey,
  isCreatingNode,
  isAddEdgeErrorSnackbarOpen,
  isFullDisabled,
  isDrawerOpen,
  isFullScreen,
  isSelectedNodeEditable,
  isSelectedNodeMath,
  isSelectedNodeFullyVisible,
  createNodeInputValue,
  updateLabelInputValue,
  updateTypeInputValue,
  updateTypeSuperscript,
  updateValueInputValue,
  showToolbar,
  showToolbarButtons,
  showDrawer,
  showDrawerSections,
  templateNodes,
  allowFreeTypeUpdate,
  allowFreeValueUpdate,
  templateNodeTypesAndValues,
  hasStateToUndo,
  hasStateToRedo,
  isAllVisible,
  currentError,
  toggleDrawer,
  addEdgeErrorMessage,
  toggleIsCreatingNode,
  toggleIsAddEdgeErrorSnackbarOpen,
  setCreateNodeInputValue,
  setUpdateLabelInputValue,
  handleResetState,
  handleUpdateLabelPiecesChange,
  handleUpdateNodeTypeChange,
  handleUpdateTypeSuperscriptChange,
  handleUpdateNodeValueChange,
  handleUndoButtonAction,
  handleRedoButtonAction,
  handleZoomOutButtonAction,
  handleZoomInButtonAction,
  handleZoomToFitButtonAction,
  handleZoomToActualSizeButtonAction,
  handleReorderNodesButtonAction,
  handleAllVisibleButtonAction,
  handleUploadStateButtonAction,
  handleTakeScreenshotButtonAction,
  handleFullScreenButtonAction,
  handleSelectedNodeEditableLabelChange,
  handleSelectedNodeEditableDeleteChange,
  handleSelectedNodeEditableTypeChange,
  handleSelectedNodeEditableValueChange,
  createNodeDescription,
  nodeFontSize,
  nodeFontFamily,
  nodePaddingX,
  nodePaddingY,
  nodeStyle,
  drawerPlaceholders,
  isMathInputOpen,
  setCurrentMathSelection,
  isCreatingMathNode,
  setIsCreatingMathNode,
  toggleMathInput,
  isCommentsOpen,
  toggleComments,
  isSelectedNode,
  isSelectedEdge,
  threadsEnabledActions,
  selectedNodeCommentable,
  selectedEdgeCommentable,
  selectionCommentThreads,
  toggleExpandedThread,
  addingThreadTitle,
  addingThreadType,
  annotationOnFunctions,
  selectedAnnotationEditable,
  addingAnnotationText,
  updateAnnotationValueText,
  addingAnnotationOn,
  addingAnnotationColor,
  editingAnnotationColor,
  handleAnnotationChange,
  handleAnnotationValueUpdate,
  handleAnnotationValueUpdateChange,
  handleEditingAnnotationColorChange,
  handleAnnotationColorChange,
  handleToggleAddAnnotation,
  handleAddingThreadTitleChange,
  handleAddingThreadTypeChange,
  handleStartCommentThread,
  handleToggleExpandedThread,
  handleShrinkAllThreads,
  handleAddComment,
  handleDeleteThread,
  handleDeleteComment,
  handleToggleResolvedThread,
}) {
  const [isDialogConfigResetOpen, setIsDialogConfigResetOpen] = useState(false);
  const [isDialogEditorInfoOpen, setIsDialogEditorInfoOpen] = useState(false);

  const {
    showDrawerButton,
    showMathInputButton,
    showEditorInfoButton,
    showStateResetButton,
    showUndoButton,
    showRedoButton,
    showZoomOutButton,
    showZoomInButton,
    showZoomToFitButton,
    showZoomToActualSizeButton,
    showReorderNodesButton,
    showAllVisibleButton,
    showUploadStateButton,
    showTakeScreenshotButton,
    showFullScreenButton,
    showCommentsButton,
  } = showToolbarButtons;

  const handleEditorInfoButtonAction = useCallback(() => {
    setIsDialogEditorInfoOpen(!isDialogEditorInfoOpen);
  });

  const handleStateResetButtonAction = useCallback(() => {
    setIsDialogConfigResetOpen(!isDialogConfigResetOpen);
  });

  return (
    <>
      {!isFullDisabled && (
        <>
          {showToolbar && (
            <ToolbarActions
              containerRef={containerRef}
              downloadKey={downloadKey}
              selectedRootNode={selectedRootNode}
              isFullScreen={isFullScreen}
              isDrawerOpen={isDrawerOpen}
              showDrawerButton={showDrawerButton}
              showEditorInfoButton={showEditorInfoButton}
              showStateResetButton={showStateResetButton}
              showUndoButton={showUndoButton}
              showRedoButton={showRedoButton}
              showZoomOutButton={showZoomOutButton}
              showZoomInButton={showZoomInButton}
              showZoomToFitButton={showZoomToFitButton}
              showZoomToActualSizeButton={showZoomToActualSizeButton}
              showReorderNodesButton={showReorderNodesButton}
              showAllVisibleButton={showAllVisibleButton}
              showUploadStateButton={showUploadStateButton}
              showTakeScreenshotButton={showTakeScreenshotButton}
              showFullScreenButton={showFullScreenButton}
              handleDrawerButtonAction={toggleDrawer}
              handleEditorInfoButtonAction={handleEditorInfoButtonAction}
              handleStateResetButtonAction={handleStateResetButtonAction}
              handleUndoButtonAction={handleUndoButtonAction}
              handleRedoButtonAction={handleRedoButtonAction}
              handleZoomOutButtonAction={handleZoomOutButtonAction}
              handleZoomInButtonAction={handleZoomInButtonAction}
              handleZoomToFitButtonAction={handleZoomToFitButtonAction}
              handleZoomToActualSizeButtonAction={
                handleZoomToActualSizeButtonAction
              }
              handleReorderNodesButtonAction={handleReorderNodesButtonAction}
              handleAllVisibleButtonAction={handleAllVisibleButtonAction}
              handleUploadStateButtonAction={handleUploadStateButtonAction}
              handleTakeScreenshotButtonAction={
                handleTakeScreenshotButtonAction
              }
              handleFullScreenButtonAction={handleFullScreenButtonAction}
              hasStateToUndo={hasStateToUndo}
              hasStateToRedo={hasStateToRedo}
              isAllVisible={isAllVisible}
              isMathInputOpen={isMathInputOpen}
              showMathInputButton={showMathInputButton}
              handleMathInputButtonAction={toggleMathInput}
              isCommentsOpen={isCommentsOpen}
              showCommentsButton={showCommentsButton}
              handleCommentsButtonAction={toggleComments}
            />
          )}
          {showDrawer && (
            <EditorDrawer
              editorHeight={editorHeight}
              containerRef={containerRef}
              connectorPlaceholder={connectorPlaceholder}
              isDrawerOpen={isDrawerOpen}
              isCreatingNode={isCreatingNode}
              isSelectedNodeEditable={isSelectedNodeEditable}
              isSelectedNodeMath={isSelectedNodeMath}
              isSelectedNodeFullyVisible={isSelectedNodeFullyVisible}
              templateNodes={templateNodes}
              showDrawerSections={showDrawerSections}
              handleUpdateLabelPiecesChange={handleUpdateLabelPiecesChange}
              handleUpdateNodeTypeChange={handleUpdateNodeTypeChange}
              handleUpdateTypeSuperscriptChange={
                handleUpdateTypeSuperscriptChange
              }
              handleUpdateNodeValueChange={handleUpdateNodeValueChange}
              handleSelectedNodeEditableLabelChange={
                handleSelectedNodeEditableLabelChange
              }
              handleSelectedNodeEditableDeleteChange={
                handleSelectedNodeEditableDeleteChange
              }
              handleSelectedNodeEditableTypeChange={
                handleSelectedNodeEditableTypeChange
              }
              handleSelectedNodeEditableValueChange={
                handleSelectedNodeEditableValueChange
              }
              templateNodeTypesAndValues={templateNodeTypesAndValues}
              createNodeInputValue={createNodeInputValue}
              updateLabelInputValue={updateLabelInputValue}
              updateTypeInputValue={updateTypeInputValue}
              updateTypeSuperscript={updateTypeSuperscript}
              updateValueInputValue={updateValueInputValue}
              toggleIsCreatingNode={toggleIsCreatingNode}
              setCreateNodeInputValue={setCreateNodeInputValue}
              setUpdateLabelInputValue={setUpdateLabelInputValue}
              allowFreeTypeUpdate={allowFreeTypeUpdate}
              allowFreeValueUpdate={allowFreeValueUpdate}
              createNodeDescription={createNodeDescription}
              nodeFontSize={nodeFontSize}
              nodeFontFamily={nodeFontFamily}
              nodePaddingX={nodePaddingX}
              nodePaddingY={nodePaddingY}
              nodeStyle={nodeStyle}
              createNodeInputPlaceholder={
                drawerPlaceholders.createNodeInputPlaceholder
              }
              editNodeInputPlaceholder={
                drawerPlaceholders.editNodeInputPlaceholder
              }
              typeInputPlaceholder={drawerPlaceholders.typeInputPlaceholder}
              valueInputPlaceholder={drawerPlaceholders.valueInputPlaceholder}
            />
          )}
          {isMathInputOpen && (
            <InputComponent
              setCurrentMathSelection={setCurrentMathSelection}
              isCreatingMathNode={isCreatingMathNode}
              setIsCreatingMathNode={setIsCreatingMathNode}
            />
          )}
          {isCommentsOpen && (
            <CommentsDrawer
              editorHeight={editorHeight}
              isCommentsOpen={isCommentsOpen}
              containerRef={containerRef}
              selectionCommentThreads={selectionCommentThreads}
              isSelection={isSelectedNode || isSelectedEdge}
              selectionCommentable={
                selectedNodeCommentable || selectedEdgeCommentable
              }
              threadsEnabledActions={threadsEnabledActions}
              addingThreadTitle={addingThreadTitle}
              addingThreadType={addingThreadType}
              annotationOnFunctions={annotationOnFunctions}
              addingAnnotationText={addingAnnotationText}
              updateAnnotationValueText={updateAnnotationValueText}
              addingAnnotationOn={addingAnnotationOn}
              selectedAnnotationEditable={selectedAnnotationEditable}
              addingAnnotationColor={addingAnnotationColor}
              editingAnnotationColor={editingAnnotationColor}
              handleAnnotationColorChange={handleAnnotationColorChange}
              handleToggleAddAnnotation={handleToggleAddAnnotation}
              handleStartCommentThread={handleStartCommentThread}
              handleAddingThreadTitleChange={handleAddingThreadTitleChange}
              handleAddingThreadTypeChange={handleAddingThreadTypeChange}
              handleEditingAnnotationColorChange={
                handleEditingAnnotationColorChange
              }
              handleToggleExpandedThread={handleToggleExpandedThread}
              handleShrinkAllThreads={handleShrinkAllThreads}
              handleAddComment={handleAddComment}
              handleDeleteThread={handleDeleteThread}
              handleDeleteComment={handleDeleteComment}
              handleToggleResolvedThread={handleToggleResolvedThread}
              handleAnnotationChange={handleAnnotationChange}
              handleAnnotationValueUpdate={handleAnnotationValueUpdate}
              handleAnnotationValueUpdateChange={
                handleAnnotationValueUpdateChange
              }
            />
          )}
          <DialogConfirmReset
            containerRef={containerRef}
            isDialogOpen={isDialogConfigResetOpen}
            setIsDialogOpen={setIsDialogConfigResetOpen}
            handleConfirmAction={handleResetState}
          />
          <DialogEditorInfo
            containerRef={containerRef}
            isDialogOpen={isDialogEditorInfoOpen}
            setIsDialogOpen={setIsDialogEditorInfoOpen}
          />
          <AddEdgeErrorSnackbar
            addEdgeErrorMessage={addEdgeErrorMessage}
            toggleIsAddEdgeErrorSnackbarOpen={toggleIsAddEdgeErrorSnackbarOpen}
            isAddEdgeErrorSnackbarOpen={isAddEdgeErrorSnackbarOpen}
          />
          <CreatingNodeSnackbar
            isCreatingNode={isCreatingNode}
            toggleIsCreatingNode={toggleIsCreatingNode}
            isCreatingMathNode={isCreatingMathNode}
            setIsCreatingMathNode={setIsCreatingMathNode}
            addingAnnotationOn={addingAnnotationOn}
            handleToggleAddAnnotation={handleToggleAddAnnotation}
          />
        </>
      )}
    </>
  );
}

StageDrawer.propTypes = {
  containerRef: PropTypes.element.isRequired,
  editorHeight: PropTypes.number,
  selectedRootNode: PropTypes.number,
  connectorPlaceholder: PropTypes.string,
  downloadKey: PropTypes.string,
  isCreatingNode: PropTypes.bool,
  isAddEdgeErrorSnackbarOpen: PropTypes.bool,
  isFullDisabled: PropTypes.bool,
  isDrawerOpen: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  isSelectedNode: PropTypes.bool,
  isSelectedEdge: PropTypes.bool,
  isSelectedNodeEditable: PropTypes.shape({
    label: PropTypes.bool,
    type: PropTypes.bool,
    value: PropTypes.bool,
    delete: PropTypes.bool,
  }),
  isSelectedNodeMath: PropTypes.bool,
  isSelectedNodeFullyVisible: PropTypes.bool,
  createNodeInputValue: PropTypes.string,
  updateLabelInputValue: PropTypes.string,
  updateTypeInputValue: PropTypes.string,
  updateTypeSuperscript: PropTypes.string,
  updateValueInputValue: PropTypes.string,
  showToolbar: PropTypes.bool,
  showToolbarButtons: PropTypes.shape({
    showDrawerButton: PropTypes.bool,
    showMathInputButton: PropTypes.bool,
    showEditorInfoButton: PropTypes.bool,
    showStateResetButton: PropTypes.bool,
    showUndoButton: PropTypes.bool,
    showRedoButton: PropTypes.bool,
    showZoomOutButton: PropTypes.bool,
    showZoomInButton: PropTypes.bool,
    showZoomToFitButton: PropTypes.bool,
    showZoomToActualSizeButton: PropTypes.bool,
    showReorderNodesButton: PropTypes.bool,
    showAllVisibleButton: PropTypes.bool,
    showUploadStateButton: PropTypes.bool,
    showTakeScreenshotButton: PropTypes.bool,
    showFullScreenButton: PropTypes.bool,
  }),
  showDrawer: PropTypes.bool,
  showDrawerSections: PropTypes.shape({
    addNodeField: PropTypes.bool,
    templateDropdown: PropTypes.bool,
    editLabelField: PropTypes.bool,
    editValueField: PropTypes.bool,
    editTypeField: PropTypes.bool,
    editFinalNodeField: PropTypes.bool,
  }),
  templateNodes: PropTypes.arrayOf(PropTypes.string),
  allowFreeTypeUpdate: PropTypes.bool,
  allowFreeValueUpdate: PropTypes.bool,
  templateNodeTypesAndValues: PropTypes.shape({}),
  hasStateToUndo: PropTypes.bool,
  hasStateToRedo: PropTypes.bool,
  isAllVisible: PropTypes.bool,
  currentError: PropTypes.number,
  addEdgeErrorMessage: PropTypes.string,
  toggleIsAddEdgeErrorSnackbarOpen: PropTypes.func,
  toggleDrawer: PropTypes.func,
  toggleIsCreatingNode: PropTypes.func,
  setCreateNodeInputValue: PropTypes.func,
  setUpdateLabelInputValue: PropTypes.func,
  handleResetState: PropTypes.func,
  handleUpdateLabelPiecesChange: PropTypes.func,
  handleUpdateNodeTypeChange: PropTypes.func,
  handleUpdateTypeSuperscriptChange: PropTypes.func,
  handleUpdateNodeValueChange: PropTypes.func,
  handleUndoButtonAction: PropTypes.func,
  handleRedoButtonAction: PropTypes.func,
  handleZoomOutButtonAction: PropTypes.func,
  handleZoomInButtonAction: PropTypes.func,
  handleZoomToFitButtonAction: PropTypes.func,
  handleZoomToActualSizeButtonAction: PropTypes.func,
  handleReorderNodesButtonAction: PropTypes.func,
  handleAllVisibleButtonAction: PropTypes.func,
  handleUploadStateButtonAction: PropTypes.func,
  handleTakeScreenshotButtonAction: PropTypes.func,
  handleFullScreenButtonAction: PropTypes.func,
  handleSelectedNodeEditableLabelChange: PropTypes.func,
  handleSelectedNodeEditableDeleteChange: PropTypes.func,
  handleSelectedNodeEditableTypeChange: PropTypes.func,
  handleSelectedNodeEditableValueChange: PropTypes.func,
  createNodeDescription: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    pieces: PropTypes.arrayOf(PropTypes.string),
    piecesPosition: PropTypes.arrayOf(PropTypes.number),
    type: PropTypes.string,
    value: PropTypes.string,
    isSelected: PropTypes.bool,
  }),
  nodeFontSize: PropTypes.number,
  nodeFontFamily: PropTypes.string,
  nodePaddingX: PropTypes.number,
  nodePaddingY: PropTypes.number,
  nodeStyle: PropTypes.exact({
    nodeStrokeColor: PropTypes.string,
    nodeStrokeWidth: PropTypes.number,
    nodeSelectedStrokeWidth: PropTypes.number,
    nodeCornerRadius: PropTypes.number,
    nodeFillColor: PropTypes.string,
    nodeErrorColor: PropTypes.string,
    nodeSelectedColor: PropTypes.string,
    nodeFinalColor: PropTypes.string,
    labelStyle: PropTypes.exact({
      nodeTextColor: PropTypes.string,
      placeholderStrokeWidth: PropTypes.number,
      placeholderStrokeColor: PropTypes.string,
      placeholderFillColor: PropTypes.string,
      placeholderErrorColor: PropTypes.string,
      placeholderRadius: PropTypes.number,
      connectorRadiusSize: PropTypes.number,
      connectorStrokeWidth: PropTypes.number,
      connectorFillColor: PropTypes.string,
      connectorStrokeColor: PropTypes.string,
    }),
    topConnectorStyle: PropTypes.exact({
      starNumPoints: PropTypes.number,
      starInnerRadius: PropTypes.number,
      starOuterRadius: PropTypes.number,
      starStrokeColor: PropTypes.string,
      starStrokeWidth: PropTypes.number,
      connectorRadius: PropTypes.number,
      connectorStrokeColor: PropTypes.string,
      connectorStrokeWidth: PropTypes.number,
      connectorFillColor: PropTypes.string,
      connectorErrorColor: PropTypes.string,
      connectorSelectedColor: PropTypes.string,
      connectorEmptyFillColor: PropTypes.string,
    }),
    deleteButtonStyle: PropTypes.exact({
      strokeWidth: PropTypes.number,
      radius: PropTypes.number,
      strokeColor: PropTypes.string,
      fillColor: PropTypes.string,
      textColor: PropTypes.string,
      overStrokeColor: PropTypes.string,
      overFillColor: PropTypes.string,
      overTextColor: PropTypes.string,
    }),
    typeValueStyle: PropTypes.exact({
      strokeWidth: PropTypes.number,
      radius: PropTypes.number,
      padding: PropTypes.number,
      textColor: PropTypes.string,
      fillColor: PropTypes.string,
      strokeColor: PropTypes.string,
      pointerDirection: PropTypes.string,
      pointerWidth: PropTypes.number,
      pointerHeight: PropTypes.number,
    }),
  }),
  drawerPlaceholders: PropTypes.shape({
    createNodeInputPlaceholder: PropTypes.string,
    editNodeInputPlaceholder: PropTypes.string,
    typeInputPlaceholder: PropTypes.string,
    valueInputPlaceholder: PropTypes.string,
  }),
  toggleMathInput: PropTypes.func,
  setCurrentMathSelection: PropTypes.func,
  isCreatingMathNode: PropTypes.bool,
  setIsCreatingMathNode: PropTypes.func,
  isCommentsOpen: PropTypes.bool,
  showCommentsButton: PropTypes.bool,
  toggleComments: PropTypes.func,
  selectedNodeCommentable: PropTypes.shape({
    addThread: PropTypes.bool,
    deleteThread: PropTypes.bool,
    resolveThread: PropTypes.bool,
    addComment: PropTypes.bool,
    deleteComment: PropTypes.bool,
  }),
  selectedEdgeCommentable: PropTypes.shape({
    addThread: PropTypes.bool,
    deleteThread: PropTypes.bool,
    resolveThread: PropTypes.bool,
    addComment: PropTypes.bool,
    deleteComment: PropTypes.bool,
  }),
  selectionCommentThreads: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      comments: PropTypes.arrayOf(PropTypes.string),
      type: PropTypes.string,
      expanded: PropTypes.bool,
      resolved: PropTypes.bool,
    }),
  ),
  addingThreadTitle: PropTypes.string,
  addingThreadType: PropTypes.string,
  annotationOnFunctions: PropTypes.shape({
    addAnnotation: PropTypes.bool,
    removeAnnotation: PropTypes.bool,
    editAnnotation: PropTypes.bool,
  }),
  addingAnnotationText: PropTypes.string,
  updateAnnotationValueText: PropTypes.string,
  addingAnnotationOn: PropTypes.bool,
  selectedAnnotationEditable: PropTypes.shape({
    value: PropTypes.bool,
    delete: PropTypes.bool,
  }),
  addingAnnotationColor: PropTypes.shape({
    hex: PropTypes.string,
    rgb: propTypes.arrayOf(PropTypes.number),
  }),
  editingAnnotationColor: PropTypes.shape({
    hex: PropTypes.string,
    rgb: propTypes.arrayOf(PropTypes.number),
  }),
  handleAnnotationColorChange: PropTypes.func,
  handleAnnotationChange: PropTypes.func,
  handleAnnotationValueUpdate: PropTypes.func,
  handleAnnotationValueUpdateChange: PropTypes.func,
  handleEditingAnnotationColorChange: PropTypes.func,
  handleToggleAddAnnotation: PropTypes.func,
  handleAddingThreadTitleChange: PropTypes.func,
  handleAddingThreadTypeChange: PropTypes.func,
  handleStartCommentThread: PropTypes.func,
  handleToggleExpandedThread: PropTypes.func,
  handleShrinkAllThreads: PropTypes.func,
  handleAddComment: PropTypes.func,
  handleDeleteThread: PropTypes.func,
  handleDeleteComment: PropTypes.func,
  handleToggleResolvedThread: PropTypes.func,
};

StageDrawer.defaultProps = {
  editorHeight: 300,
  connectorPlaceholder: "{{}}",
  selectedRootNode: undefined,
  downloadKey: "expressiontutor",
  isCreatingNode: false,
  isAddEdgeErrorSnackbarOpen: false,
  isFullDisabled: false,
  isDrawerOpen: true,
  isFullScreen: false,
  isSelectedNode: false,
  isSelectedEdge: false,
  threadsEnabledActions: PropTypes.shape({
    startThread: PropTypes.bool,
    removeThread: PropTypes.bool,
    addComment: PropTypes.bool,
    removeComment: PropTypes.bool,
    toggleResolved: PropTypes.bool,
  }),
  isSelectedNodeEditable: undefined,
  isSelectedNodeMath: undefined,
  isSelectedNodeFullyVisible: undefined,
  createNodeInputValue: "",
  updateLabelInputValue: "",
  updateTypeInputValue: "",
  updateTypeSuperscript: "",
  updateValueInputValue: "",
  showToolbar: true,
  showToolbarButtons: {
    showDrawerButton: true,
    showMathInputButton: true,
    showEditorInfoButton: true,
    showStateResetButton: true,
    showUndoButton: true,
    showRedoButton: true,
    showZoomOutButton: true,
    showZoomInButton: true,
    showZoomToFitButton: true,
    showZoomToActualSizeButton: true,
    showReorderNodesButton: true,
    showAllVisibleButton: true,
    showUploadStateButton: true,
    showTakeScreenshotButton: true,
    showFullScreenButton: true,
    showCommentsButton: true,
  },
  showDrawer: true,
  showDrawerSections: {
    addNodeField: true,
    templateDropdown: true,
    editLabelField: true,
    editValueField: true,
    editTypeField: true,
    editFinalNodeField: false,
  },
  templateNodes: undefined,
  allowFreeTypeUpdate: true,
  allowFreeValueUpdate: true,
  templateNodeTypesAndValues: undefined,
  hasStateToUndo: false,
  hasStateToRedo: false,
  isAllVisible: true,
  currentError: undefined,
  addEdgeErrorMessage: "",
  toggleIsAddEdgeErrorSnackbarOpen: () => {},
  toggleDrawer: () => {},
  toggleIsCreatingNode: () => {},
  setCreateNodeInputValue: () => {},
  setUpdateLabelInputValue: () => {},
  handleResetState: () => {},
  handleUpdateLabelPiecesChange: () => {},
  handleUpdateNodeTypeChange: () => {},
  handleUpdateTypeSuperscriptChange: () => {},
  handleUpdateNodeValueChange: () => {},
  handleUndoButtonAction: () => {},
  handleRedoButtonAction: () => {},
  handleZoomOutButtonAction: () => {},
  handleZoomInButtonAction: () => {},
  handleZoomToFitButtonAction: () => {},
  handleZoomToActualSizeButtonAction: () => {},
  handleReorderNodesButtonAction: () => {},
  handleAllVisibleButtonAction: () => {},
  handleUploadStateButtonAction: () => {},
  handleTakeScreenshotButtonAction: () => {},
  handleFullScreenButtonAction: () => {},
  handleSelectedNodeEditableLabelChange: () => {},
  handleSelectedNodeEditableDeleteChange: () => {},
  handleSelectedNodeEditableTypeChange: () => {},
  handleSelectedNodeEditableValueChange: () => {},
  createNodeDescription: undefined,
  nodeFontSize: 24,
  nodeFontFamily: "Roboto Mono, Courier",
  nodePaddingX: 12,
  nodePaddingY: 12,
  nodeStyle: {},
  drawerPlaceholders: {},
  toggleMathInput: () => {},
  setCurrentMathSelection: () => {},
  isCreatingMathNode: false,
  setIsCreatingMathNode: () => {},
  isCommentsOpen: false,
  toggleComments: () => {},
  threadsEnabledActions: {
    startThread: true,
    removeThread: true,
    addComment: true,
    removeComment: true,
    toggleResolved: true,
  },
  selectedNodeCommentable: undefined,
  selectedEdgeCommentable: undefined,
  selectionCommentThreads: [],
  addingThreadTitle: "",
  addingThreadType: "",
  annotationOnFunctions: {
    addAnnotation: true,
    removeAnnotation: true,
    editAnnotation: true,
  },
  selectedAnnotationEditable: undefined,
  addingAnnotationText: "",
  updateAnnotationValueText: "",
  addingAnnotationOn: false,
  addingAnnotationColor: { hex: "#35BFFF", rgb: [53, 191, 255] },
  editingAnnotationColor: { hex: "#35BFFF", rgb: [53, 191, 255] },
  handleAnnotationColorChange: () => {},
  handleAnnotationChange: () => {},
  handleAnnotationValueUpdate: () => {},
  handleAnnotationValueUpdateChange: () => {},
  handleEditingAnnotationColorChange: () => {},
  handleToggleAddAnnotation: () => {},
  handleAddingThreadTitleChange: () => {},
  handleAddingThreadTypeChange: () => {},
  handleStartCommentThread: () => {},
  handleToggleExpandedThread: () => {},
  handleShrinkAllThreads: () => {},
  handleAddComment: () => {},
  handleDeleteThread: () => {},
  handleDeleteComment: () => {},
  handleToggleResolvedThread: () => {},
};

export default StageDrawer;
