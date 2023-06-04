import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import { InputComponent } from "react-math-formula-editor";
import ToolbarActions from "./toolbar/ToolbarActions";

import EditorDrawer from "./drawer/EditorDrawer";
import CommentsDrawer from "./drawer/CommentsDrawer";

import DialogEditorInfo from "./dialogs/DialogEditorInfo";
import DialogConfirmReset from "./dialogs/DialogConfirmReset";

import CreatingNodeSnackbar from "./snackbars/CreatingNodeSnackbar";
import AddEdgeErrorSnackbar from "./snackbars/AddEdgeErrorSnackbar";

function StageDrawer({
  containerRef,
  selectedRootNode,
  connectorPlaceholder,
  downloadKey,
  isCreatingNode,
  isAddEdgeErrorSnackbarOpen,
  isFullDisabled,
  isDrawerOpen,
  isFullScreen,
  isSelectedNodeEditable,
  createNodeInputValue,
  updateLabelInputValue,
  updateTypeInputValue,
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
  isSelectedNodeMath,
  isCommentsOpen,
  toggleComments,
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
              containerRef={containerRef}
              connectorPlaceholder={connectorPlaceholder}
              isDrawerOpen={isDrawerOpen}
              isCreatingNode={isCreatingNode}
              isSelectedNodeEditable={isSelectedNodeEditable}
              templateNodes={templateNodes}
              showDrawerSections={showDrawerSections}
              handleUpdateLabelPiecesChange={handleUpdateLabelPiecesChange}
              handleUpdateNodeTypeChange={handleUpdateNodeTypeChange}
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
              isSelectedNodeMath={isSelectedNodeMath}
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
              isCommentsOpen={isCommentsOpen}
              containerRef={containerRef}
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
          />
        </>
      )}
    </>
  );
}

StageDrawer.propTypes = {
  containerRef: PropTypes.element.isRequired,
  selectedRootNode: PropTypes.number,
  connectorPlaceholder: PropTypes.string,
  downloadKey: PropTypes.string,
  isCreatingNode: PropTypes.bool,
  isAddEdgeErrorSnackbarOpen: PropTypes.bool,
  isFullDisabled: PropTypes.bool,
  isDrawerOpen: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  isSelectedNodeEditable: PropTypes.shape({
    label: PropTypes.bool,
    type: PropTypes.bool,
    value: PropTypes.bool,
    delete: PropTypes.bool,
  }),
  createNodeInputValue: PropTypes.string,
  updateLabelInputValue: PropTypes.string,
  updateTypeInputValue: PropTypes.string,
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
  isSelectedNodeMath: PropTypes.bool,
  isCommentsOpen: PropTypes.bool,
  showCommentsButton: PropTypes.bool,
  toggleComments: PropTypes.func,
};

StageDrawer.defaultProps = {
  connectorPlaceholder: "{{}}",
  selectedRootNode: undefined,
  downloadKey: "expressiontutor",
  isCreatingNode: false,
  isAddEdgeErrorSnackbarOpen: false,
  isFullDisabled: false,
  isDrawerOpen: true,
  isFullScreen: false,
  isSelectedNodeEditable: undefined,
  createNodeInputValue: "",
  updateLabelInputValue: "",
  updateTypeInputValue: "",
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
  isSelectedNodeMath: false,
  setIsCreatingMathNode: () => {},
  isCommentsOpen: false,
  toggleComments: () => {},
};

export default StageDrawer;
