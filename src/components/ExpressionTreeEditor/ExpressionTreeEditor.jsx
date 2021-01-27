import Konva from 'konva';
import {
  Stage, Layer, Rect, Transformer,
} from 'react-konva';

import React, {
  useCallback,
  useEffect,
  useRef,
  useReducer,
  useState,
} from 'react';
import PropTypes from 'prop-types';

// import { useDispatch } from 'react-redux';
// import { ActionCreators } from 'redux-undo';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Node from './Node';
import Edge from './Edge';
import DragEdge from './DragEdge';
import StageDrawer from '../StageDrawer/StageDrawer';

import reducer from '../store/reducers';
import reducerInitialState from '../store/initialState';

import {
  edgeByChildNode,
  computePiecesPositions,
  computeEdgeParentPos,
  edgeByParentPiece,
  computeEdgeChildPos,
  closestParentPiece,
  edgeById,
  closestChildId,
  nodeById,
  nodePositionById,
  computeNodeWidth,
} from '../utils';

function ExpressionTreeEditor({
  width,
  height,
  fontSize,
  fontFamily,
  errorColor,
  nodeColor,
  selectedNodeColor,
  finalNodeColor,
  rootConnectorColor,
  nodeConnectorColor,
  nodeHoleColor,
  nodeTagColor,
  nodeTextColor,
  nodeDeleteButtonColor,
  edgeColor,
  edgeChildConnectorColor,
  edgeParentConnectorColor,
  selectedEdgeColor,
  draggingEdgeColor,
  dragEdgeColor,
  dragEdgeChildConnectorColor,
  dragEdgeParentConnectorColor,
  selectionRectColor,
  toolbarPrimaryColor,
  toolbarSecondaryColor,
  toolbarButtons,
  drawerFields,
  fullDisabled,
  allowedErrors,
  reportedErrors,
  connectorPlaceholder,
  templateNodes,
  nodeTypes,
  initialState,
  onNodeAdd,
  onNodeDelete,
  onNodeSelect,
  onNodeMove,
  onNodePiecesChange,
  onNodeTypeChange,
  onNodeValueChange,
  onEdgeAdd,
  onEdgeDelete,
  onEdgeUpdate,
  onEdgeSelect,
  onValidate,
}) {
  // Refs
  const stageRef = useRef();
  const layerRef = useRef();
  const selectionRectRef = useRef();
  const selectedRectRef = useRef();
  const transformerRef = useRef();

  const [store, dispatch] = useReducer(reducer, reducerInitialState);
  const {
    nodes,
    edges,
    dragEdge,
    selectedNode,
    addingNode,
    selectedRootNode,
    selectedEdge,
    addValue,
    editValue,
    typeValue,
    nodeValue,
  } = store;

  const removeNode = useCallback((payload) => {
    dispatch({ type: 'removeNode', payload });
  }, [dispatch]);

  const moveNodeTo = useCallback((payload) => {
    dispatch({ type: 'moveNodeTo', payload });
  }, [dispatch]);

  const moveNodeToEnd = useCallback((payload) => {
    dispatch({ type: 'moveNodeToEnd', payload });
  }, [dispatch]);

  const setDragEdge = useCallback((payload) => {
    dispatch({ type: 'setDragEdge', payload });
  }, [dispatch]);

  const moveDragEdgeParentEndTo = useCallback((payload) => {
    dispatch({ type: 'moveDragEdgeParentEndTo', payload });
  }, [dispatch]);

  const moveDragEdgeChildEndTo = useCallback((payload) => {
    dispatch({ type: 'moveDragEdgeChildEndTo', payload });
  }, [dispatch]);

  const removeEdge = useCallback((payload) => {
    dispatch({ type: 'removeEdge', payload });
  }, [dispatch]);

  const addEdge = useCallback((payload) => {
    dispatch({ type: 'addEdge', payload });
  }, [dispatch]);

  const updateEdge = useCallback((payload) => {
    dispatch({ type: 'updateEdge', payload });
  }, [dispatch]);

  const clearDragEdge = useCallback(() => {
    dispatch({ type: 'clearDragEdge' });
  }, [dispatch]);

  const clearNodeSelection = useCallback(() => {
    dispatch({ type: 'clearNodeSelection' });
  }, [dispatch]);

  const addNode = useCallback((payload) => {
    dispatch({ type: 'addNode', payload });
  }, [dispatch]);

  const selectNode = useCallback((payload) => {
    dispatch({ type: 'selectNode', payload });
  }, [dispatch]);

  const clearAdding = useCallback(() => {
    dispatch({ type: 'clearAdding' });
  }, [dispatch]);

  const editValueChange = useCallback((payload) => {
    dispatch({ type: 'editValueChange', payload });
  }, [dispatch]);

  const typeValueChange = useCallback((payload) => {
    dispatch({ type: 'typeValueChange', payload });
  }, [dispatch]);

  const nodeValueChange = useCallback((payload) => {
    dispatch({ type: 'nodeValueChange', payload });
  }, [dispatch]);

  const selectEdge = useCallback((payload) => {
    dispatch({ type: 'selectEdge', payload });
  }, [dispatch]);

  const clearEdgeSelection = useCallback(() => {
    dispatch({ type: 'clearEdgeSelection' });
  }, [dispatch]);

  const selectRootNode = useCallback((payload) => {
    dispatch({ type: 'selectRootNode', payload });
  }, [dispatch]);

  const clearRootSelection = useCallback(() => {
    dispatch({ type: 'clearRootSelection' });
  }, [dispatch]);

  const setInitialState = useCallback((payload) => {
    dispatch({ type: 'setInitialState', payload });
  }, [dispatch]);

  const moveSelectedNodesTo = useCallback((payload) => {
    dispatch({ type: 'moveSelectedNodesTo', payload });
  }, [dispatch]);

  const moveSelectedNodesToEnd = useCallback((payload) => {
    dispatch({ type: 'moveSelectedNodesToEnd', payload });
  }, [dispatch]);

  // Drawer
  const editNode = useCallback((payload) => {
    dispatch({ type: 'editNode', payload });
  }, [dispatch]);

  const addingNodeClick = useCallback(() => {
    dispatch({ type: 'addingNodeClick' });
  }, [dispatch]);

  const addValueChange = useCallback((payload) => {
    dispatch({ type: 'addValueChange', payload });
  }, [dispatch]);

  const nodeTypeEdit = useCallback((payload) => {
    dispatch({ type: 'nodeTypeEdit', payload });
  }, [dispatch]);

  const nodeValueEdit = useCallback((payload) => {
    dispatch({ type: 'nodeValueEdit', payload });
  }, [dispatch]);

  const stageReset = useCallback((payload) => {
    dispatch({ type: 'stageReset', payload });
  }, [dispatch]);

  const uploadState = useCallback((payload) => {
    dispatch({ type: 'uploadState', payload });
  }, [dispatch]);

  const reorderNodes = useCallback((payload) => {
    dispatch({ type: 'reorderNodes', payload });
  }, [dispatch]);

  // Set the theme primary and secondary colors according to the recived props
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: toolbarPrimaryColor,
      },
      secondary: { main: toolbarSecondaryColor },
    },
  });

  // Layout utils
  const xPad = fontSize / 2;
  const yPad = fontSize / 2;
  const oText = new Konva.Text({
    text: 'o',
    fontFamily,
    fontSize,
  });
  const textHeight = oText.fontSize();
  const holeWidth = oText.getTextWidth();
  const nodeHeight = 2 * yPad + textHeight;

  // State hooks
  const [selectedEdgeRef, setSelectedEdgeRef] = useState(null);
  const [pressingMeta, setPressingMeta] = useState(false);
  const [draggingSelectionRect, setDraggingSelectionRect] = useState(false);
  const [isSelectingRectVisible, setIsSelectingRectVisible] = useState(false);
  const [isSelectedRectVisible, setIsSelectedRectVisible] = useState(false);
  const [selectionRectStartPos, setSelectionRectStartPos] = useState({
    x: 0,
    y: 0,
  });
  const [selectionRectEndPos, setSelectionRectEndPos] = useState({
    x: 0,
    y: 0,
  });
  const [currentErrorLocation, setCurrentErrorLocation] = useState({});

  // Effects
  // Initial state setting effect running only on first render
  useEffect(() => {
    setInitialState({
      initialNodes: initialState.initialNodes,
      initialEdges: initialState.initialEdges,
      connectorPlaceholder,
      fontSize,
      fontFamily,
    });
    // dispatch(ActionCreators.clearHistory());
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (selectedNode && !selectedNode.isFinal) {
        clearNodeSelection();
        removeNode({ nodeId: selectedNode.id, onNodeDelete });
      } else if (selectedEdge) {
        setSelectedEdgeRef(null);
        clearEdgeSelection();
        removeEdge({ edgeId: selectedEdge.id, onEdgeDelete });
      }
    } else if (e.key === 'Escape') {
      if (addingNode) {
        clearAdding();
      } else if (selectedNode) {
        clearNodeSelection();
      } else if (selectedEdge) {
        selectedEdgeRef.moveToBottom();
        setSelectedEdgeRef(null);
        clearEdgeSelection();
      }
    } else if (e.key === 'Meta' || e.key === 'Shift') {
      document.body.style.cursor = 'grab';
      setPressingMeta(true);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Meta' || e.key === 'Shift') {
      document.body.style.cursor = 'move';
      setIsSelectingRectVisible(false);
      setDraggingSelectionRect(false);
      const allNodes = stageRef.current.find('.Node').toArray();
      const box = selectionRectRef.current.getClientRect();
      const intersectingNodes = allNodes.filter((node) => Konva.Util.haveIntersection(box, node.getClientRect()));
      intersectingNodes.map((intersectingNode) => intersectingNode.parent.moveToTop());
      selectedRectRef.current.moveToTop();
      transformerRef.current.nodes(intersectingNodes);
      setIsSelectedRectVisible(true);
      selectedRectRef.current.moveToTop();
      setPressingMeta(false);
    }
  };

  // TODO Can this be removed?
  // const onFocus = () => {
  //   document.body.style.cursor = 'move';
  //   setIsSelectingRectVisible(false);
  //   setDraggingSelectionRect(false);
  //   setPressingMeta(false);
  // };

  // Check if the edge that is going to be added/updated is going to create a loop
  // in the tree, by checking if we get to an already visited node on the walking branch
  // while performing an in order tree walk
  function checkIsCreatingLoop(node, visitedBranch, creatingLoop) {
    visitedBranch.push(node.id);
    node.pieces.forEach((piece, i) => {
      if (piece === connectorPlaceholder) {
        const childEdges = edgeByParentPiece(node.id, i, edges);
        childEdges.forEach((edge) => {
          const childNode = nodeById(edge.childNodeId, nodes);
          if (visitedBranch.find((e) => e === childNode.id) !== undefined) {
            creatingLoop = true;
            return [visitedBranch, creatingLoop];
          }
          [visitedBranch, creatingLoop] = checkIsCreatingLoop(
            childNode,
            visitedBranch,
            creatingLoop,
          );
        });
      }
    });
    visitedBranch.pop();
    return [visitedBranch, creatingLoop];
  }

  // Handle drag start event from a node connector by setting up the corresponding DragEdge
  const handleNodeConnectorDragStart = (nodeId, x, y) => {
    if (addingNode) {
      clearAdding();
    }
    const edge = edgeByChildNode(nodeId, edges)[0];
    if (edge) {
      const parentPieceX = computePiecesPositions(
        nodeById(edge.parentNodeId, nodes).pieces,
        connectorPlaceholder,
        fontSize,
        fontFamily,
      )[edge.parentPieceId];
      const parentPos = computeEdgeParentPos(
        edge.parentNodeId,
        parentPieceX,
        nodes,
        fontSize,
        fontFamily,
      );
      const newDragEdge = {
        originalEdgeId: edge.id,
        updateParent: false,
        parentNodeId: edge.parentNodeId,
        parentPieceId: edge.parentPieceId,
        parentX: parentPos.x,
        parentY: parentPos.y - textHeight / 2,
        childX: x,
        childY: y,
      };
      setDragEdge({ dragEdge: newDragEdge });
    } else {
      const newDragEdge = {
        originalEdgeId: null,
        updateParent: true,
        childNodeId: nodeId,
        childX: x,
        childY: y,
        parentX: x,
        parentY: y,
      };
      setDragEdge({ dragEdge: newDragEdge });
    }
  };

  // Handle drag start event from a node hole connector by setting up the corresponding DragEdge
  const handleHoleConnectorDragStart = (nodeId, pieceId, x, y) => {
    if (addingNode) {
      clearAdding();
    }
    const edge = edgeByParentPiece(nodeId, pieceId, edges)[0];
    if (edge) {
      const childPos = computeEdgeChildPos(edge.childNodeId, nodes);
      const newDragEdge = {
        originalEdgeId: edge.id,
        updateParent: true,
        childNodeId: edge.childNodeId,
        childX: childPos.x,
        childY: childPos.y,
        parentX: x,
        parentY: y,
      };
      setDragEdge({ dragEdge: newDragEdge });
    } else {
      const newDragEdge = {
        originalEdgeId: null,
        updateParent: false,
        parentNodeId: nodeId,
        parentPieceId: pieceId,
        parentX: x,
        parentY: y,
        childX: x,
        childY: y,
      };
      setDragEdge({ dragEdge: newDragEdge });
    }
  };

  // Handle maouse move envents on stage checking if we are dragging a DragEdge,
  // moving the correct DragEdge end, or if we are dragging the multiple selection
  // rectangle while pressing a meta key
  const handleStageMouseMove = (e) => {
    e.cancelBubble = true;
    if (dragEdge) {
      document.body.style.cursor = 'grabbing';
      const stagePos = stageRef.current.absolutePosition();
      const pointerPos = stageRef.current.getPointerPosition();
      const stageScale = stageRef.current.scale();
      if (dragEdge.updateParent) {
        moveDragEdgeParentEndTo({
          x: (pointerPos.x - stagePos.x) / stageScale.x,
          y: (pointerPos.y - stagePos.y) / stageScale.y,
        });
      } else {
        moveDragEdgeChildEndTo({
          x: (pointerPos.x - stagePos.x) / stageScale.x,
          y: (pointerPos.y - stagePos.y) / stageScale.y,
        });
      }
    }
    if (draggingSelectionRect && pressingMeta) {
      document.body.style.cursor = 'grabbing';
      const stagePos = stageRef.current.absolutePosition();
      const pointerPos = stageRef.current.getPointerPosition();
      const stageScale = stageRef.current.scale();
      setSelectionRectEndPos({
        x: (pointerPos.x - stagePos.x) / stageScale.x,
        y: (pointerPos.y - stagePos.y) / stageScale.y,
      });
    }
  };

  // Handle stage mouse up event adding/updating an edge if we were dragging a DragEdge,
  // otherwise set up the multiple selection created dragging the selection rectangle
  const handleStageMouseUp = (e) => {
    e.cancelBubble = true;
    if (dragEdge) {
      const stagePos = stageRef.current.absolutePosition();
      const pointerPos = stageRef.current.getPointerPosition();
      const stageScale = stageRef.current.scale();
      // If we are dragging the DragEdge from a hole connector
      if (dragEdge.updateParent) {
        const parentPiece = closestParentPiece(
          (pointerPos.x - stagePos.x) / stageScale.x,
          (pointerPos.y - stagePos.y) / stageScale.y,
          nodes,
          connectorPlaceholder,
          fontSize,
          fontFamily,
        );
        // If we are updating an already existing edge
        if (dragEdge.originalEdgeId) {
          const originalEdge = edgeById(dragEdge.originalEdgeId, edges);
          // If we dropped the DragEdge on a valid location
          if (
            parentPiece
            && originalEdge.childNodeId !== parentPiece.parentNodeId
            && (originalEdge.parentNodeId !== parentPiece.parentNodeId
              || originalEdge.parentPieceId !== parentPiece.parentPieceId)
          ) {
            const foundEdges = edgeByParentPiece(
              parentPiece.parentNodeId,
              parentPiece.parentPieceId,
              edges,
            );
            // Check if the connector is empty, or if it is not,
            // check if we are allowing multiple edges on the same connector
            if (
              (foundEdges.length > 0
                && allowedErrors.multiEdgeOnHoleConnector)
              || foundEdges.length === 0
            ) {
              document.body.style.cursor = 'grab';
              clearDragEdge();
              setSelectedEdgeRef(null);
              clearEdgeSelection();
              const newEdge = {
                id: originalEdge.id,
                childNodeId: originalEdge.childNodeId,
                parentNodeId: parentPiece.parentNodeId,
                parentPieceId: parentPiece.parentPieceId,
              };
              // eslint-disable-next-line no-unused-vars
              const [visitedBranch, creatingLoop] = checkIsCreatingLoop(
                nodeById(originalEdge.childNodeId, nodes),
                [parentPiece.parentNodeId],
                false,
              );
              // Check if the new edge is creating a loop,
              // if the new edge is not creating a loop,
              // or if we are allowing loops to be created, complete the edge update
              if ((allowedErrors.loop && creatingLoop) || !creatingLoop) {
                updateEdge({
                  edgeId: originalEdge.id,
                  newEdge,
                  onEdgeUpdate,
                });
                stageRef.current
                  .find('.Edge')
                  .toArray()
                  .map((edge) => edge.moveToBottom());
              }
            }
            // If we are dropping the DragEdge on an invalid location,
            // clear the DragEdge and remove the original edge
          } else if (!parentPiece) {
            document.body.style.cursor = 'move';
            clearDragEdge();
            setSelectedEdgeRef(null);
            removeEdge({ edgeId: originalEdge.id, onEdgeDelete });
          }
          // If we are dragging from an empty connector without existing edges
        } else {
          // If we dropped the DragEdge on a valid location
          if (
            parentPiece
            && dragEdge.childNodeId !== parentPiece.parentNodeId
          ) {
            const foundEdges = edgeByParentPiece(
              parentPiece.parentNodeId,
              parentPiece.parentPieceId,
              edges,
            );
            // Check if the connector is empty, or if it is not,
            // check if we are allowing multiple edges on the same connector
            if (
              (foundEdges.length > 0
                && allowedErrors.multiEdgeOnHoleConnector)
              || foundEdges.length === 0
            ) {
              document.body.style.cursor = 'grab';
              const newEdge = {
                childNodeId: dragEdge.childNodeId,
                parentNodeId: parentPiece.parentNodeId,
                parentPieceId: parentPiece.parentPieceId,
              };
              clearDragEdge();
              // eslint-disable-next-line no-unused-vars
              const [visitedBranch, creatingLoop] = checkIsCreatingLoop(
                nodeById(dragEdge.childNodeId, nodes),
                [parentPiece.parentNodeId],
                false,
              );
              // Check if the new edge is creating a loop,
              // if the new edge is not creating a loop,
              // or if we are allowing loops to be created, complete the edge adding
              if ((allowedErrors.loop && creatingLoop) || !creatingLoop) {
                addEdge({ edge: newEdge, onEdgeAdd });
                stageRef.current
                  .find('.Edge')
                  .toArray()
                  .map((edge) => edge.moveToBottom());
              }
            }
            // If we are dropping the DragEdge on an invalid location, clear the DragEdge
          } else {
            document.body.style.cursor = 'move';
            clearDragEdge();
          }
        }
        // If we are dragging the DragEdge from a node connector
      } else {
        const childNodeId = closestChildId(
          (pointerPos.x - stagePos.x) / stageScale.x,
          (pointerPos.y - stagePos.y) / stageScale.y,
          nodes,
          fontSize,
          fontFamily,
        );
        // If we are updating an already existing edge
        if (dragEdge.originalEdgeId) {
          const originalEdge = edgeById(dragEdge.originalEdgeId, edges);
          // If we dropped the DragEdge on a valid location
          if (
            childNodeId
            && childNodeId !== originalEdge.parentNodeId
            && originalEdge.childNodeId !== childNodeId
          ) {
            const foundEdges = edgeByChildNode(childNodeId, edges);
            // Check if the connector is empty, or if it is not,
            // check if we are allowing multiple edges on the same connector
            if (
              (foundEdges.length > 0
                && allowedErrors.multiEdgeOnNodeConnector)
              || foundEdges.length === 0
            ) {
              document.body.style.cursor = 'grab';
              clearDragEdge();
              setSelectedEdgeRef(null);
              clearEdgeSelection();
              const newEdge = {
                id: originalEdge.id,
                parentNodeId: originalEdge.parentNodeId,
                parentPieceId: originalEdge.parentPieceId,
                childNodeId,
              };
              // eslint-disable-next-line no-unused-vars
              const [visitedBranch, creatingLoop] = checkIsCreatingLoop(
                nodeById(childNodeId, nodes),
                [originalEdge.parentNodeId],
                false,
              );
              // Check if the new edge is creating a loop,
              // if the new edge is not creating a loop,
              // or if we are allowing loops to be created, complete the edge update
              if ((allowedErrors.loop && creatingLoop) || !creatingLoop) {
                updateEdge({
                  edgeId: dragEdge.originalEdgeId,
                  newEdge,
                  onEdgeUpdate,
                });
                stageRef.current
                  .find('.Edge')
                  .toArray()
                  .map((edge) => edge.moveToBottom());
              }
            }
            // If we are dropping the DragEdge on an invalid location,
            // clear the DragEdge and remove the original edge
          } else if (!childNodeId) {
            document.body.style.cursor = 'move';
            clearDragEdge();
            setSelectedEdgeRef(null);
            removeEdge({ edgeId: originalEdge.id, onEdgeDelete });
          }
          // If we are dragging from an empty connector without existing edges
        } else {
          // If we dropped the DragEdge on a valid location
          if (childNodeId && dragEdge.parentNodeId !== childNodeId) {
            const foundEdges = edgeByChildNode(childNodeId, edges);
            // Check if the connector is empty, or if it is not,
            // check if we are allowing multiple edges on the same connector
            if (
              (foundEdges.length > 0
                && allowedErrors.multiEdgeOnNodeConnector)
              || foundEdges.length === 0
            ) {
              document.body.style.cursor = 'grab';
              const newEdge = {
                parentNodeId: dragEdge.parentNodeId,
                parentPieceId: dragEdge.parentPieceId,
                childNodeId,
              };
              clearDragEdge();
              // eslint-disable-next-line no-unused-vars
              const [visitedBranch, creatingLoop] = checkIsCreatingLoop(
                nodeById(childNodeId, nodes),
                [dragEdge.parentNodeId],
                false,
              );
              // Check if the new edge is creating a loop,
              // if the new edge is not creating a loop,
              // or if we are allowing loops to be created, complete the edge adding
              if ((allowedErrors.loop && creatingLoop) || !creatingLoop) {
                addEdge({ edge: newEdge, onEdgeAdd });
                stageRef.current
                  .find('.Edge')
                  .toArray()
                  .map((edge) => edge.moveToBottom());
              }
            }
            // If we are dropping the DragEdge on an invalid location, clear the DragEdge
          } else {
            document.body.style.cursor = 'move';
            clearDragEdge();
          }
        }
      }
      clearDragEdge();
    }
    // If we were dragging the multiple selection rectangle
    if (draggingSelectionRect && pressingMeta) {
      document.body.style.cursor = 'move';
      setIsSelectingRectVisible(false);
      setDraggingSelectionRect(false);
      const allNodes = stageRef.current.find('.Node').toArray();
      const box = selectionRectRef.current.getClientRect();
      const intersectingNodes = allNodes.filter((node) => Konva.Util.haveIntersection(box, node.getClientRect()));
      intersectingNodes.map((intersectingNode) => intersectingNode.parent.moveToTop());
      selectedRectRef.current.moveToTop();
      transformerRef.current.nodes(intersectingNodes);
      setIsSelectedRectVisible(true);
      selectedRectRef.current.moveToTop();
    }
  };

  // Handle stage click event, if the adding node button has been pressed,
  // add the new node at the clicked location, otherwise clear all selections
  const handleStageClick = (e) => {
    if (addingNode) {
      const stagePos = stageRef.current.absolutePosition();
      const pointerPos = stageRef.current.getPointerPosition();
      const stageScale = stageRef.current.scale();
      const nodeWidth = computeNodeWidth(
        addValue,
        connectorPlaceholder,
        fontSize,
        fontFamily,
      );
      addNode({
        pieces: addValue,
        x: (pointerPos.x - stagePos.x) / stageScale.x,
        y: (pointerPos.y - stagePos.y) / stageScale.y,
        width: nodeWidth,
        type: '',
        value: '',
        isFinal: false,
        onNodeAdd,
      });
      clearAdding();
    } else {
      transformerRef.current.nodes([]);
      setIsSelectedRectVisible(false);
      if (selectedNode) {
        clearNodeSelection();
      }
      if (selectedEdge) {
        selectedEdgeRef.moveToBottom();
        setSelectedEdgeRef(null);
        clearEdgeSelection();
      }
    }
  };

  // Handle node click event, if the adding node button has been pressed,
  // add the new node at the clicked location, otherwise select the clicked node,
  // and setup the edit node field on the side drawer
  const handleNodeClick = (e, nodeId) => {
    if (addingNode) {
      const stagePos = stageRef.current.absolutePosition();
      const pointerPos = stageRef.current.getPointerPosition();
      const stageScale = stageRef.current.scale();
      const nodeWidth = computeNodeWidth(
        addValue,
        connectorPlaceholder,
        fontSize,
        fontFamily,
      );
      addNode({
        pieces: addValue,
        x: (pointerPos.x - stagePos.x) / stageScale.x,
        y: (pointerPos.y - stagePos.y) / stageScale.y,
        width: nodeWidth,
        type: '',
        value: '',
        isFinal: false,
        onNodeAdd,
      });
      clearAdding();
    } else {
      e.currentTarget.moveToTop();
      const selectingNode = nodeById(nodeId, nodes);
      if (selectedEdge) {
        selectedEdgeRef.moveToBottom();
        setSelectedEdgeRef(null);
        clearEdgeSelection();
      }
      if (!selectedNode || selectedNode.id !== selectingNode.id) {
        selectNode({ selectedNode: selectingNode, onNodeSelect });
        if (drawerFields.editField) {
          if (!selectingNode.isFinal) {
            document.getElementById(
              'editField',
            ).value = selectingNode.pieces.join('');
            editValueChange({ editValue: selectingNode.pieces });
          }
          typeValueChange({ typeValue: selectingNode.type });
          if (document.getElementById('valueField')) {
            document.getElementById('valueField').value = selectingNode.value;
          }
          nodeValueChange({ nodeValue: selectingNode.value });
        }
      }
    }
  };

  // Handle node double click event, selecting/deselecting the clicked node as root node
  const handleNodeDblClick = (nodeId) => {
    if (selectedRootNode && selectedRootNode.id === nodeId) {
      clearRootSelection();
    } else {
      const selectedRootNode = nodeById(nodeId, nodes);
      selectRootNode({ selectedRootNode });
    }
  };

  // Handle edge click event, if the adding node button has been pressed,
  // add the new node at the clicked location, otherwise select the clicked edge
  const handleEdgeClick = (e, edgeId) => {
    if (addingNode) {
      const stagePos = stageRef.current.absolutePosition();
      const pointerPos = stageRef.current.getPointerPosition();
      const stageScale = stageRef.current.scale();
      const nodeWidth = computeNodeWidth(
        addValue,
        connectorPlaceholder,
        fontSize,
        fontFamily,
      );
      addNode({
        pieces: addValue,
        x: (pointerPos.x - stagePos.x) / stageScale.x,
        y: (pointerPos.y - stagePos.y) / stageScale.y,
        width: nodeWidth,
        type: '',
        value: '',
        isFinal: false,
        onNodeAdd,
      });
      clearAdding();
    } else {
      e.cancelBubble = true;
      if (selectedNode) {
        clearNodeSelection();
      }
      if (!selectedEdge) {
        e.currentTarget.moveToTop();
        const selectingEdge = edgeById(edgeId, edges);
        setSelectedEdgeRef(e.currentTarget);
        selectEdge({ selectedEdge: selectingEdge, onEdgeSelect });
      } else if (selectedEdgeRef !== e.currentTarget) {
        selectedEdgeRef.moveToBottom();
        e.currentTarget.moveToTop();
        const selectingEdge = edgeById(edgeId, edges);
        setSelectedEdgeRef(e.currentTarget);
        selectEdge({
          selectedEdge: selectingEdge,
          onEdgeSelect,
        });
      }
    }
  };

  // Handle stage mouse down event if we are pressing a meta key,
  // setting up the starting coordinates of the multiple selection rectangle
  const handleStageMouseDown = (e) => {
    if (pressingMeta) {
      e.cancelBubble = true;
      document.body.style.cursor = 'grabbing';
      const stagePos = stageRef.current.absolutePosition();
      const pointerPos = stageRef.current.getPointerPosition();
      const stageScale = stageRef.current.scale();
      setSelectionRectStartPos({
        x: (pointerPos.x - stagePos.x) / stageScale.x,
        y: (pointerPos.y - stagePos.y) / stageScale.y,
      });
      setSelectionRectEndPos({
        x: (pointerPos.x - stagePos.x) / stageScale.x,
        y: (pointerPos.y - stagePos.y) / stageScale.y,
      });
      setIsSelectingRectVisible(true);
      setIsSelectedRectVisible(false);
      setDraggingSelectionRect(true);
      selectionRectRef.current.moveToTop();
    }
  };

  // Handle stage drag move event, updating the stage position to the event coordinates
  const handleStageDragMove = (e) => {
    e.cancelBubble = true;
    const newPos = e.target.absolutePosition();
    stageRef.current.position({ x: newPos.x, y: newPos.y });
  };

  // Handle stage wheel event, zooming in/out the stage scale according to the pointer position
  const handleStageWheel = (e) => {
    clearWheelTimeout();
    e.evt.preventDefault();

    e.evt.deltaY < 0
      ? (document.body.style.cursor = 'zoom-in')
      : (document.body.style.cursor = 'zoom-out');

    const stage = stageRef.current;

    const scaleBy = 1.03;
    const oldScale = stage.scaleX();
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    const pointerPos = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointerPos.x - stage.x()) / oldScale,
      y: (pointerPos.y - stage.y()) / oldScale,
    };

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointerPos.x - mousePointTo.x * newScale,
      y: pointerPos.y - mousePointTo.y * newScale,
    };

    stage.position(newPos);
    stage.batchDraw();
    setWheelTimeout();
  };

  // Timeout functions to set the cursor back to normal after a wheel event
  let wheelTimeout;
  const setWheelTimeout = () => {
    wheelTimeout = setTimeout(() => {
      document.body.style.cursor = 'move';
    }, 300);
  };
  const clearWheelTimeout = () => {
    clearTimeout(wheelTimeout);
  };

  // Handle drag move event on multiple nodes selection,
  // updating the selected nodes positions
  const handleSelectedDragMove = (e) => {
    e.cancelBubble = true;
    moveSelectedNodesTo({
      nodes: transformerRef.current.nodes(),
      delta: { x: e.evt.movementX, y: e.evt.movementY },
    });
  };

  // Handle drag end event on multiple nodes selection,
  // updating the selected nodes to the final positions
  // (different action to be able to filter all the previous
  // moving actions to allow undo/redo working)
  const handleSelectedDragEnd = (e) => {
    e.cancelBubble = true;
    document.body.style.cursor = 'grab';
    moveSelectedNodesToEnd({
      nodes: transformerRef.current.nodes(),
      delta: { x: e.evt.movementX, y: e.evt.movementY },
    });
  };

  return (
    // Provide the theme to all the child elements
    <ThemeProvider theme={theme}>
      {/* Editor container element, necessary for the modals and alerts
      to appear relative to the container and not relative to the viewport */}
      <div
        role="tab"
        id="editorContainer"
        style={{
          position: 'relative',
          border: '2px solid #3f50b5',
          borderRadius: '5px',
          backgroundColor: 'white',
        }}
        tabIndex={0}
        onKeyDown={!fullDisabled && handleKeyDown}
        onKeyUp={!fullDisabled && handleKeyUp}
      >
        {/* Top and side bar component */}
        <StageDrawer
          stageRef={stageRef}
          layerRef={layerRef}
          transformerRef={transformerRef}
          selectedEdgeRef={selectedEdgeRef}
          setSelectedEdgeRef={setSelectedEdgeRef}
          setIsSelectedRectVisible={setIsSelectedRectVisible}
          setCurrentErrorLocation={setCurrentErrorLocation}
          initialState={initialState}
          fontSize={fontSize}
          fontFamily={fontFamily}
          textHeight={textHeight}
          yPad={yPad}
          toolbarButtons={toolbarButtons}
          drawerFields={drawerFields}
          fullDisabled={fullDisabled}
          connectorPlaceholder={connectorPlaceholder}
          templateNodes={templateNodes}
          nodeTypes={nodeTypes}
          reportedErrors={reportedErrors}
          onNodePiecesChange={onNodePiecesChange}
          onNodeTypeChange={onNodeTypeChange}
          onNodeValueChange={onNodeValueChange}
          onValidate={onValidate}
          selectedNode={selectedNode}
          editValue={editValue}
          addingNode={addingNode}
          typeValue={typeValue}
          nodes={nodes}
          selectedRootNode={selectedRootNode}
          nodeValue={nodeValue}
          edges={edges}
          editNode={editNode}
          addingNodeClick={addingNodeClick}
          addValueChange={addValueChange}
          nodeTypeEdit={nodeTypeEdit}
          nodeValueEdit={nodeValueEdit}
          stageReset={stageReset}
          uploadState={uploadState}
          reorderNodes={reorderNodes}
          nodeValueChange={nodeValueChange}
          typeValueChange={typeValueChange}
          // TODO: undo / redo
          // edges: state.editor.present.edges,
          // nodes: state.editor.present.nodes,
          // selectedRootNode: state.editor.present.selectedRootNode,
          // isAddEmpty: state.drawer.addValue.length < 1,
          // isEditEmpty: state.drawer.editValue.length < 1,
          // canUndo: state.editor.past.length > 0,
          // canRedo: state.editor.future.length > 0,
        />
        {/* Stage component containing the layer component */}
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          style={{ cursor: addingNode && 'crosshair' }}
          onMouseMove={!fullDisabled && handleStageMouseMove}
          onTouchMove={!fullDisabled && handleStageMouseMove}
          onMouseUp={!fullDisabled && handleStageMouseUp}
          onTouchEnd={!fullDisabled && handleStageMouseUp}
          onClick={!fullDisabled && handleStageClick}
          onTouchStart={!fullDisabled && handleStageClick}
          draggable={!pressingMeta && !fullDisabled}
          onMouseDown={!fullDisabled && handleStageMouseDown}
          onDragStart={
            !fullDisabled
            && ((e) => {
              document.body.style.cursor = 'grabbing';
            })
          }
          onDragMove={!fullDisabled && ((e) => handleStageDragMove(e))}
          onDragEnd={
            !fullDisabled
            && ((e) => {
              document.body.style.cursor = 'move';
            })
          }
          onWheel={!fullDisabled && handleStageWheel}
          onMouseOver={
            !fullDisabled
            && ((e) => {
              document.body.style.cursor = 'move';
            })
          }
          onMouseLeave={
            !fullDisabled
            && ((e) => {
              document.body.style.cursor = 'default';
            })
          }
        >
          {/* Layer component containing nodes, edges, dragEdge and selection rectangles components */}
          <Layer ref={layerRef}>
            {/* Map all the state edges */}
            {edges.map((edge, i) => (
              <Edge
                key={`Edge-${edge.id}`}
                id={edge.id}
                parentNodeId={edge.parentNodeId}
                parentPieceId={edge.parentPieceId}
                childNodeId={edge.childNodeId}
                beingDragged={dragEdge && dragEdge.originalEdgeId === edge.id}
                selected={selectedEdge && selectedEdge.id === edge.id}
                clearEdgeSelection={clearEdgeSelection}
                parentPieceX={
                  computePiecesPositions(
                    nodeById(edge.parentNodeId, nodes).pieces,
                    connectorPlaceholder,
                    fontSize,
                    fontFamily,
                  )[edge.parentPieceId]
                }
                parentX={nodePositionById(edge.parentNodeId, nodes).x}
                parentY={nodePositionById(edge.parentNodeId, nodes).y}
                childX={nodePositionById(edge.childNodeId, nodes).x}
                childY={nodePositionById(edge.childNodeId, nodes).y}
                childWidth={nodeById(edge.childNodeId, nodes).width}
                fontSize={fontSize}
                fontFamily={fontFamily}
                xPad={xPad}
                yPad={yPad}
                holeWidth={holeWidth}
                textHeight={textHeight}
                errorColor={errorColor}
                edgeColor={edgeColor}
                edgeChildConnectorColor={edgeChildConnectorColor}
                edgeParentConnectorColor={edgeParentConnectorColor}
                selectedEdgeColor={selectedEdgeColor}
                draggingEdgeColor={draggingEdgeColor}
                fullDisabled={fullDisabled}
                selectedEdgeRef={selectedEdgeRef}
                setSelectedEdgeRef={setSelectedEdgeRef}
                draggingSelectionRect={draggingSelectionRect}
                currentErrorLocation={currentErrorLocation}
                onEdgeClick={(e) => handleEdgeClick(e, edge.id)}
                onNodeConnectorDragStart={handleNodeConnectorDragStart}
                onHoleConnectorDragStart={handleHoleConnectorDragStart}
              />
            ))}
            {/* Map all the state nodes */}
            {nodes.map((node, i) => (
              <Node
                key={`Node-${node.id}`}
                id={node.id}
                stageRef={stageRef}
                transformerRef={transformerRef}
                selectedEdgeRef={selectedEdgeRef}
                setSelectedEdgeRef={setSelectedEdgeRef}
                draggingSelectionRect={draggingSelectionRect}
                pressingMeta={pressingMeta}
                currentErrorLocation={currentErrorLocation}
                pieces={node.pieces}
                x={nodePositionById(node.id, nodes).x}
                y={nodePositionById(node.id, nodes).y}
                nodeWidth={node.width}
                nodeHeight={nodeHeight}
                isSelected={selectedNode && selectedNode.id === node.id}
                isSelectedRoot={
                  selectedRootNode && selectedRootNode.id === node.id
                }
                type={node.type}
                value={node.value}
                isFinal={node.isFinal}
                nodes={nodes}
                edges={edges}
                stageWidth={width}
                stageHeight={height}
                fontSize={fontSize}
                fontFamily={fontFamily}
                xPad={xPad}
                yPad={yPad}
                holeWidth={holeWidth}
                textHeight={textHeight}
                errorColor={errorColor}
                nodeColor={nodeColor}
                selectedNodeColor={selectedNodeColor}
                finalNodeColor={finalNodeColor}
                rootConnectorColor={rootConnectorColor}
                nodeConnectorColor={nodeConnectorColor}
                nodeHoleColor={nodeHoleColor}
                nodeTagColor={nodeTagColor}
                nodeTextColor={nodeTextColor}
                nodeDeleteButtonColor={nodeDeleteButtonColor}
                edgeChildConnectorColor={edgeChildConnectorColor}
                edgeParentConnectorColor={edgeParentConnectorColor}
                connectorPlaceholder={connectorPlaceholder}
                fullDisabled={fullDisabled}
                onNodeDelete={onNodeDelete}
                onNodeSelect={onNodeSelect}
                onNodeMove={onNodeMove}
                moveNodeTo={moveNodeTo}
                moveNodeToEnd={moveNodeToEnd}
                removeNode={removeNode}
                clearNodeSelection={clearNodeSelection}
                clearEdgeSelection={clearEdgeSelection}
                nodeValueChange={nodeValueChange}
                onNodeClick={(e) => handleNodeClick(e, node.id)}
                onNodeDblClick={() => handleNodeDblClick(node.id)}
                onNodeConnectorDragStart={handleNodeConnectorDragStart}
                onHoleConnectorDragStart={handleHoleConnectorDragStart}
              />
            ))}
            {/* Multiple selection rectangle component */}
            <Rect
              ref={selectionRectRef}
              x={Math.min(selectionRectStartPos.x, selectionRectEndPos.x)}
              y={Math.min(selectionRectStartPos.y, selectionRectEndPos.y)}
              width={Math.abs(selectionRectEndPos.x - selectionRectStartPos.x)}
              height={Math.abs(selectionRectEndPos.y - selectionRectStartPos.y)}
              fill={selectionRectColor}
              visible={isSelectingRectVisible}
            />
            {/* Multiple selected rectangle component */}
            <Rect
              ref={selectedRectRef}
              x={
                transformerRef.current
                && stageRef.current
                && (transformerRef.current.getClientRect().x
                  - stageRef.current.absolutePosition().x)
                  / stageRef.current.scale().x
              }
              y={
                transformerRef.current
                && stageRef.current
                && (transformerRef.current.getClientRect().y
                  - stageRef.current.absolutePosition().y)
                  / stageRef.current.scale().y
              }
              width={
                transformerRef.current
                && transformerRef.current.getClientRect().width
                  / stageRef.current.scale().x
              }
              height={
                transformerRef.current
                && transformerRef.current.getClientRect().height
                  / stageRef.current.scale().y
              }
              fill="rgba(255, 255, 255, 0)"
              visible={isSelectedRectVisible}
              draggable
              onMouseEnter={() => {
                document.body.style.cursor = 'grab';
              }}
              onDragStart={() => {
                document.body.style.cursor = 'grabbing';
              }}
              onDragMove={handleSelectedDragMove}
              onDragEnd={handleSelectedDragEnd}
              onMouseDown={handleStageMouseDown}
            />
            {/* Transformer component attached to the multiple selected nodes */}
            <Transformer
              ref={transformerRef}
              x={
                transformerRef.current
                && stageRef.current
                && (transformerRef.current.getClientRect().x
                  - stageRef.current.absolutePosition().x)
                  / stageRef.current.scale().x
              }
              y={
                transformerRef.current
                && stageRef.current
                && (transformerRef.current.getClientRect().y
                  - stageRef.current.absolutePosition().y)
                  / stageRef.current.scale().y
              }
              rotateEnabled={false}
              resizeEnabled={false}
              visible={isSelectedRectVisible}
            />
            {/* DragEdge component */}
            {dragEdge && (
              <DragEdge
                key="DragEdge"
                parentX={dragEdge.parentX}
                parentY={dragEdge.parentY}
                childX={dragEdge.childX}
                childY={dragEdge.childY}
                fontSize={fontSize}
                dragEdgeColor={dragEdgeColor}
                dragEdgeChildConnectorColor={dragEdgeChildConnectorColor}
                dragEdgeParentConnectorColor={dragEdgeParentConnectorColor}
              />
            )}
          </Layer>
        </Stage>
      </div>
    </ThemeProvider>
  );
}

ExpressionTreeEditor.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fontSize: PropTypes.number,
  fontFamily: PropTypes.string,
  errorColor: PropTypes.string,
  nodeColor: PropTypes.string,
  selectedNodeColor: PropTypes.string,
  finalNodeColor: PropTypes.string,
  rootConnectorColor: PropTypes.string,
  nodeConnectorColor: PropTypes.string,
  nodeHoleColor: PropTypes.string,
  nodeTagColor: PropTypes.string,
  nodeTextColor: PropTypes.string,
  nodeDeleteButtonColor: PropTypes.string,
  edgeColor: PropTypes.string,
  edgeChildConnectorColor: PropTypes.string,
  edgeParentConnectorColor: PropTypes.string,
  selectedEdgeColor: PropTypes.string,
  draggingEdgeColor: PropTypes.string,
  dragEdgeColor: PropTypes.string,
  dragEdgeChildConnectorColor: PropTypes.string,
  dragEdgeParentConnectorColor: PropTypes.string,
  selectionRectColor: PropTypes.string,
  toolbarPrimaryColor: PropTypes.string,
  toolbarSecondaryColor: PropTypes.string,
  connectorPlaceholder: PropTypes.string,
  fullDisabled: PropTypes.bool,
  toolbarButtons: PropTypes.objectOf(PropTypes.bool),
  drawerFields: PropTypes.objectOf(PropTypes.bool),
  templateNodes: PropTypes.arrayOf(PropTypes.string),
  nodeTypes: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      any: PropTypes.bool,
      fixedValues: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  allowedErrors: PropTypes.objectOf(PropTypes.bool),
  reportedErrors: PropTypes.objectOf(PropTypes.objectOf(PropTypes.bool)),
  initialState: PropTypes.shape({
    initialNodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    initialEdges: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  onNodeAdd: PropTypes.func,
  onNodeDelete: PropTypes.func,
  onNodeSelect: PropTypes.func,
  onNodePiecesChange: PropTypes.func,
  onNodeTypeChange: PropTypes.func,
  onNodeValueChange: PropTypes.func,
  onEdgeAdd: PropTypes.func,
  onEdgeDelete: PropTypes.func,
  onEdgeUpdate: PropTypes.func,
  onEdgeSelect: PropTypes.func,
  onValidate: PropTypes.func,
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      pieces: PropTypes.arrayOf(PropTypes.string),
      x: PropTypes.number,
      y: PropTypes.number,
      type: PropTypes.string,
      value: PropTypes.string,
      isFinal: PropTypes.bool,
    }),
  ),
  selectedNode: PropTypes.shape({
    pieces: PropTypes.arrayOf(PropTypes.string),
    x: PropTypes.number,
    y: PropTypes.number,
    type: PropTypes.string,
    value: PropTypes.string,
    isFinal: PropTypes.bool,
  }),
  selectedRootNode: PropTypes.shape({
    pieces: PropTypes.arrayOf(PropTypes.string),
    x: PropTypes.number,
    y: PropTypes.number,
    type: PropTypes.string,
    value: PropTypes.string,
    isFinal: PropTypes.bool,
  }),
  edges: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)),
  selectedEdge: PropTypes.objectOf(PropTypes.number),
  dragEdge: PropTypes.shape({
    originalEdgeId: PropTypes.number,
    updateParent: PropTypes.bool,
    parentNodeId: PropTypes.number,
    parentPieceId: PropTypes.number,
    parentX: PropTypes.number,
    parentY: PropTypes.number,
    childX: PropTypes.number,
    childY: PropTypes.number,
  }),
  addValue: PropTypes.arrayOf(PropTypes.string),
  addingNode: PropTypes.bool,
};

ExpressionTreeEditor.defaultProps = {
  fontSize: 24,
  fontFamily: 'Ubuntu Mono, Courier',
  connectorPlaceholder: '{{}}',
  errorColor: '#ff2f2f',
  nodeColor: '#208020',
  selectedNodeColor: '#3f51b5',
  finalNodeColor: '#208080',
  rootConnectorColor: 'black',
  nodeConnectorColor: 'black',
  nodeHoleColor: '#104010',
  nodeTagColor: '#3f51b5',
  nodeTextColor: 'white',
  nodeDeleteButtonColor: 'red',
  edgeColor: 'black',
  edgeChildConnectorColor: '#00c0c3',
  edgeParentConnectorColor: '#c33100',
  selectedEdgeColor: '#3f51b5',
  draggingEdgeColor: '#f0f0f0',
  dragEdgeColor: 'black',
  dragEdgeChildConnectorColor: '#00c0c3',
  dragEdgeParentConnectorColor: '#c33100',
  selectionRectColor: 'rgba(0,0,255,0.2)',
  toolbarPrimaryColor: '#3f51b5',
  toolbarSecondaryColor: '#f50057',
  templateNodes: [],
  initialState: { initialNodes: [], initialEdges: [] },
  nodeTypes: [
    { type: 'String', any: true, fixedValues: [] },
    { type: 'Number', any: true, fixedValues: [] },
    { type: 'Boolean', any: false, fixedValues: ['true', 'false'] },
    { type: 'Object', any: true, fixedValues: [] },
    { type: 'Undefined', any: false, fixedValues: ['undefined'] },
    { type: 'Null', any: false, fixedValues: ['null'] },
  ],
  allowedErrors: {
    loop: true,
    multiEdgeOnHoleConnector: true,
    multiEdgeOnNodeConnector: true,
  },
  reportedErrors: {
    structureErrors: {
      loop: true,
      multiEdgeOnHoleConnector: true,
      multiEdgeOnNodeConnector: true,
    },
    completenessErrors: {
      emptyPieceConnector: true,
      missingNodeType: true,
      missingNodeValue: true,
    },
  },
  toolbarButtons: {
    drawerButton: true,
    reset: true,
    undo: true,
    redo: true,
    reorder: true,
    validate: true,
    download: true,
    upload: true,
    screenshot: true,
    zoomIn: true,
    zoomOut: true,
    info: true,
    zoomToFit: true,
    fullScreen: true,
  },
  drawerFields: { addField: true, editField: true },
  fullDisabled: false,
  onNodeAdd(node) {
    console.log('onNodeAdd', node);
  },
  onNodeDelete(nodeId) {
    console.log('onNodeDelete', nodeId);
  },
  onNodeSelect(node) {
    console.log('onNodeSelect', node);
  },
  onNodeMove(nodeId, position) {
    console.log('onNodeMove', nodeId, position);
  },
  onNodePiecesChange(nodePieces) {
    console.log('onNodePiecesChange', nodePieces);
  },
  onNodeTypeChange(nodeType) {
    console.log('onNodeTypeChange', nodeType);
  },
  onNodeValueChange(nodeValue) {
    console.log('onNodeValueChange', nodeValue);
  },
  onEdgeAdd(edge) {
    console.log('onEdgeAdd', edge);
  },
  onEdgeDelete(edgeId) {
    console.log('onEdgeDelete', edgeId);
  },
  onEdgeUpdate(edge) {
    console.log('onEdgeUpdate', edge);
  },
  onEdgeSelect(edge) {
    console.log('onEdgeSelect', edge);
  },
  onValidate(nodes, edges, errors) {
    console.log('onValidate', nodes, edges, errors);
  },
};

export default ExpressionTreeEditor;