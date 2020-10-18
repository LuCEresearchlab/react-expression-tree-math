import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddRoundedIcon from "@material-ui/icons/Add";
import UpdateRoundedIcon from "@material-ui/icons/UpdateRounded";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import MenuRoundedIcon from "@material-ui/icons/Menu";
import GetAppRoundedIcon from "@material-ui/icons/GetApp";
import PublishRoundedIcon from "@material-ui/icons/Publish";
import UndoRoundedIcon from "@material-ui/icons/UndoRounded";
import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";
import {
  Drawer,
  IconButton,
  Popover,
  Typography,
  TextField,
  Divider,
} from "@material-ui/core";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toolbarInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "10px 0 0 10px",
  },
  toolbarField: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10px",
    marginBottom: "10px",
  },
  editText: {
    margin: "10px 10px 10px 10px",
  },
  infoPopover: {
    marginLeft: "5px",
  },
  infoPopoverText: {
    border: "2px solid",
    borderRadius: "4px",
    borderColor: theme.palette.primary.main,
    padding: "3px 6px 3px 6px",
    maxWidth: "500px",
  },
}));

function StageDrawer({
  addNode,
  selectedNode,
  editNode,
  addingNode,
  addingNodeClick,
  addValueChange,
  addValue,
  clearAdding,
  selectedEdge,
  edgeTypeEdit,
  stageReset,
  nodes,
  edges,
  nodePositions,
  uploadState,
}) {
  const classes = useStyles();

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [nodeAnchorEl, setNodeAnchorEl] = useState(null);
  const [edgeAnchorEl, setEdgeAnchorEl] = useState(null);
  const [isAddEmpty, setIsAddEmpty] = useState(true);
  const [isEditEmpty, setIsEditEmpty] = useState(true);
  const [isTypeEmpty, setIsTypeEmpty] = useState(true);
  const [editValue, setEditValue] = useState(null);
  const [typeValue, setTypeValue] = useState(null);
  const isNodeInfoOpen = !!nodeAnchorEl;
  const isEdgeInfoOpen = !!edgeAnchorEl;

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleNodeInfoOpen = e => {
    setNodeAnchorEl(e.target);
  };

  const handleNodeInfoClose = () => {
    setNodeAnchorEl(null);
  };

  const handleEdgeInfoOpen = e => {
    setEdgeAnchorEl(e.target);
  };

  const handleEdgeInfoClose = () => {
    setEdgeAnchorEl(null);
  };

  const handleAddChange = value => {
    clearAdding();
    value !== "" ? setIsAddEmpty(false) : setIsAddEmpty(true);
    const addValue = value.split(" ");
    addValueChange({ addValue: addValue });
  };

  const handleNodeCreationClick = () => {
    addingNodeClick();
  };

  const handleEditChange = value => {
    value !== "" ? setIsEditEmpty(false) : setIsEditEmpty(true);
    const editValue = value.split(" ");
    setEditValue(editValue);
  };

  const handleNodeEdit = () => {
    editNode({
      pieces: editValue,
      selectedNodeId: selectedNode.id,
    });
  };

  const handleTypeChange = value => {
    value !== "" ? setIsTypeEmpty(false) : setIsTypeEmpty(true);
    setTypeValue(value);
  };

  const handleEdgeTypeEdit = () => {
    edgeTypeEdit({
      type: typeValue,
      selectedEdgeId: selectedEdge.id,
    });
  };

  const handleStageReset = () => {
    stageReset();
  };

  const handleStateDownload = () => {
    const currentState = {
      nodes,
      edges,
      nodePositions,
    };
    const stateData =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(currentState, null, 4));
    var downloadElement = document.createElement("a");
    downloadElement.setAttribute("href", stateData);
    downloadElement.setAttribute("download", "expression_editor_state.json");
    document.body.appendChild(downloadElement);
    downloadElement.click();
    downloadElement.remove();
  };

  const handleStateUpload = () => {
    var uploadElement = document.getElementById("stateUploadButton");
    uploadElement.click();
  };

  const handleFileChange = file => {
    const fr = new FileReader();
    fr.onload = e => {
      try {
        const state = JSON.parse(e.target.result);
        uploadState({
          nodes: state.nodes,
          edges: state.edges,
          nodePositions: state.nodePositions,
        });
      } catch (e) {
        alert("Invalid JSON file.");
      }
    };
    fr.readAsText(file);
  };

  return (
    <div>
      <IconButton
        onClick={handleDrawerOpen}
        color="primary"
        style={{ position: "absolute", zIndex: "1" }}
      >
        <MenuRoundedIcon />
      </IconButton>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div>
            <IconButton onClick={() => {}} color="primary">
              <UndoRoundedIcon />
            </IconButton>
            <IconButton onClick={handleStageReset} color="primary">
              <NoteAddRoundedIcon />
            </IconButton>
            <IconButton onClick={handleStateDownload} color="primary">
              <GetAppRoundedIcon />
            </IconButton>
            <IconButton onClick={handleStateUpload} color="primary">
              <PublishRoundedIcon />
            </IconButton>
            <input
              id={"stateUploadButton"}
              style={{ display: "none" }}
              type="file"
              accept=".json"
              onChange={e => handleFileChange(e.target.files[0])}
            />
          </div>
          <div>
            <IconButton onClick={handleDrawerClose} color="primary">
              <ChevronLeftRoundedIcon />
            </IconButton>
          </div>
        </div>
        <Divider />
        <div className={classes.toolbarInfo}>
          <Typography variant="h6">Create a new node:</Typography>
          <div>
            <IconButton
              size="small"
              onClick={e => handleNodeInfoOpen(e)}
              color="primary"
            >
              <InfoOutlinedIcon />
            </IconButton>
            <Popover
              className={classes.infoPopover}
              open={isNodeInfoOpen}
              anchorEl={nodeAnchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              onClose={handleNodeInfoClose}
            >
              <Typography className={classes.infoPopoverText} variant="body2">
                Describe the node's pieces in the textfield below. Holes are
                represented by the special {"{{}}"} character combination,
                separated by a space before and after the combination.
              </Typography>
            </Popover>
          </div>
        </div>
        <div className={classes.toolbarField}>
          <TextField
            variant="outlined"
            fullWidth
            size="medium"
            placeholder="ex: {{}} .append( {{}} )"
            margin="dense"
            multiline
            onChange={e => handleAddChange(e.target.value)}
          ></TextField>
          <div>
            <IconButton
              size="medium"
              onClick={() => handleNodeCreationClick()}
              disabled={isAddEmpty}
              color={addingNode ? "secondary" : "primary"}
            >
              <AddRoundedIcon />
            </IconButton>
          </div>
        </div>
        <Divider />
        <div className={classes.toolbarInfo}>
          <Typography variant="h6">Edit an existing node:</Typography>
          <div>
            <IconButton
              size="small"
              onClick={e => handleNodeInfoOpen(e)}
              color="primary"
            >
              <InfoOutlinedIcon />
            </IconButton>
            <Popover
              className={classes.infoPopover}
              open={isNodeInfoOpen}
              anchorEl={nodeAnchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              onClose={handleNodeInfoClose}
            >
              <Typography className={classes.infoPopoverText} variant="body2">
                Describe the node's pieces in the textfield below. Holes are
                represented by the special {"{{}}"} character combination,
                separated by a space before and after the combination.
              </Typography>
            </Popover>
          </div>
        </div>
        {selectedNode ? (
          <div className={classes.toolbarField}>
            <TextField
              variant="outlined"
              fullWidth
              size="medium"
              placeholder='ex: [null, ".append(", null, ")"]'
              margin="dense"
              multiline
              onChange={e => handleEditChange(e.target.value)}
              defaultValue={selectedNode ? selectedNode.pieces.join(" ") : ""}
            ></TextField>
            <div>
              <IconButton
                size="medium"
                onClick={() => handleNodeEdit()}
                disabled={isEditEmpty}
                color="primary"
              >
                <UpdateRoundedIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <Typography className={classes.editText}>
            Start by selecting a node.
          </Typography>
        )}
        <Divider />
        <div className={classes.toolbarInfo}>
          <Typography variant="h6">Add or edit an edge type:</Typography>
          <div>
            <IconButton
              size="small"
              onClick={e => handleEdgeInfoOpen(e)}
              color="primary"
            >
              <InfoOutlinedIcon />
            </IconButton>
            <Popover
              className={classes.infoPopover}
              open={isEdgeInfoOpen}
              anchorEl={edgeAnchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              onClose={handleEdgeInfoClose}
            >
              <Typography className={classes.infoPopoverText} variant="body2">
                Describe the edge type in the textfield below.
              </Typography>
            </Popover>
          </div>
        </div>
        {selectedEdge ? (
          <div className={classes.toolbarField}>
            <TextField
              variant="outlined"
              fullWidth
              size="medium"
              placeholder="ex: Object"
              margin="dense"
              multiline
              onChange={e => {
                handleTypeChange(e.target.value);
              }}
              defaultValue={selectedEdge ? selectedEdge.type : ""}
            ></TextField>
            <div>
              <IconButton
                size="medium"
                onClick={() => handleEdgeTypeEdit()}
                disabled={isTypeEmpty}
                color="primary"
              >
                {selectedEdge.type === "" ? (
                  <AddRoundedIcon />
                ) : (
                  <UpdateRoundedIcon />
                )}
              </IconButton>
            </div>
          </div>
        ) : (
          <Typography className={classes.editText}>
            Start by selecting an edge.
          </Typography>
        )}
        <Divider />
      </Drawer>
    </div>
  );
}

export default StageDrawer;
