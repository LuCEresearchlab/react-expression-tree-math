import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import typeToIconMapping from "./threadTypesMapping";
import AddCommentTextField from "./AddCommentTextField";

import {
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Typography,
  IconButton,
  ListItemIcon,
  Collapse,
  TextField,
  Tooltip,
  Button,
  InputAdornment,
  Switch,
} from "@material-ui/core";

import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { ColorPicker } from "material-ui-color";

import {
  ExpandLessRounded,
  ExpandMoreRounded,
  InfoRounded,
  HelpRounded,
  BugReportRounded,
  WarningRounded,
  CancelRounded,
  DeleteRounded,
  AddRounded,
  CheckRounded,
} from "@material-ui/icons";
import { blue } from "@material-ui/core/colors";

// Width of the side drawer
const drawerWidth = 400;

// Top bar and side drawer styles
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    position: "absolute",
    overflowY: "auto",
    "@media print": {
      display: "none",
    },
  },
  drawerInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "10px 0 0 10px",
  },
  drawerAnchorLeft: {
    border: "0px",
    backgroundColor: "rgba(0,0,0,0)",
  },
  drawerContainer: {
    overflowX: "hidden",
    overflowY: "auto",
    backgroundColor: "#fafafa",
    borderRadius: "0px 0px 15px 0px",
    borderRight: "1px solid #dedede",
    borderBottom: "1px solid #dedede",
  },
  drawerField: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 0 10px 10px",
  },
  textField: {
    paddingRight: "10px",
    marginTop: "20px",
  },
  nestedItem: {
    paddingLeft: theme.spacing(4),
  },
  button: {
    paddingRight: "10px",
    marginBottom: "20px",
  },
  endAdornment: {
    paddingRight: 0,
  },
  threadDivider: { height: "2px" },
  sectionDivider: { height: "3px" },
  threadTitleTypography: {
    whiteSpace: "pre-line",
    overflowWrap: "anywhere",
    display: "-webkit-box",
    overflowY: "auto",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
  },
  threadCommentTypography: {
    whiteSpace: "pre-line",
    overflowWrap: "anywhere",
    display: "-webkit-box",
    overflowY: "auto",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 5,
  },
  commentsContainer: {
    maxHeight: "185px",
    overflowY: "auto",
  },
  resolvedBackground: {
    backgroundColor: "#e6ffe6",
  },
  unresolvedBackground: {
    backgroundColor: "#ffebe6",
  },
  colorPicker: {
    margin: " 15px 5px 0 0",
  },
  addAnnotationDrawerField: {
    marginTop: "-10px",
  },
}));

function CommentsDrawer({
  editorHeight,
  isCommentsOpen,
  containerRef,
  selectionCommentThreads,
  isSelection,
  threadsEnabledActions,
  selectionCommentable,
  addingThreadTitle,
  addingThreadType,
  annotationOnFunctions,
  addingAnnotationText,
  updateAnnotationValueText,
  addingAnnotationOn,
  selectedAnnotationEditable,
  addingAnnotationColor,
  editingAnnotationColor,
  handleAnnotationColorChange,
  handleAnnotationChange,
  handleAnnotationValueUpdate,
  handleAnnotationValueUpdateChange,
  handleEditingAnnotationColorChange,
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
  const classes = useStyles();

  const [isStartThreadExpanded, setIsStartThreadExpanded] = useState(true);
  const [isAddAnnotationExpanded, setIsAddAnnotationExpanded] = useState(true);
  const [isEditAnnotationExpanded, setIsEditAnnotationExpanded] =
    useState(true);

  const isUpdateAnnotationDisabled = useMemo(() => {
    return updateAnnotationValueText.trim().length === 0;
  }, [updateAnnotationValueText]);

  const isAddCommentDisabled = useMemo(() => {
    return (
      addingThreadTitle.length === 0 ||
      addingThreadType === null ||
      addingThreadType.length === 0
    );
  }, [addingThreadTitle, addingThreadType]);

  const allThreadsShrinked = useMemo(() => {
    return selectionCommentThreads.every((thread) => !thread.expanded);
  }, [selectionCommentThreads]);

  const isAddAnnotationDisabled = useMemo(() => {
    return addingAnnotationText.trim().length === 0;
  }, [addingAnnotationText]);

  const annotationPalette = useMemo(
    () => ({
      red: "#ff0000",
      blue: "#0000ff",
      green: "#00ff00",
      yellow: "yellow",
      cyan: "cyan",
      lime: "lime",
      gray: "gray",
      orange: "orange",
      purple: "purple",
      black: "black",
      white: "white",
      pink: "pink",
      darkblue: "darkblue",
    }),
    [],
  );

  return (
    <Drawer
      className={classes.drawer}
      classes={{ paper: classes.drawerAnchorLeft }}
      PaperProps={{
        style: { position: "relative", maxHeight: editorHeight },
      }}
      BackdropProps={{ style: { position: "relative" } }}
      ModalProps={{
        container: containerRef.current,
        style: {
          position: "absolute",
        },
      }}
      variant='persistent'
      anchor='left'
      open={isCommentsOpen}
    >
      <div className={classes.drawerContainer}>
        {annotationOnFunctions.addAnnotation && (
          <>
            <div className={classes.drawerInfo}>
              <Typography variant='h6'>
                Add annotation into the stage:
              </Typography>
              {isAddAnnotationExpanded ? (
                <IconButton
                  color='primary'
                  onClick={() => setIsAddAnnotationExpanded(false)}
                >
                  <Tooltip
                    arrow
                    title={"Shrink annotation creation"}
                    placement='top'
                    PopperProps={{
                      container: containerRef.current,
                    }}
                  >
                    <ExpandLessRounded />
                  </Tooltip>
                </IconButton>
              ) : (
                <IconButton
                  color='primary'
                  onClick={() => setIsAddAnnotationExpanded(true)}
                >
                  <Tooltip
                    arrow
                    title={"Expand annotation creation"}
                    placement='top'
                    PopperProps={{
                      container: containerRef.current,
                    }}
                  >
                    <ExpandMoreRounded />
                  </Tooltip>
                </IconButton>
              )}
            </div>
            <Collapse in={isAddAnnotationExpanded} timeout='auto'>
              <div
                className={`${classes.drawerField} ${classes.addAnnotationDrawerField}`}
              >
                <Tooltip
                  arrow
                  title={"Annotation color"}
                  placement='top'
                  PopperProps={{
                    container: containerRef.current,
                  }}
                >
                  <span className={classes.colorPicker}>
                    <ColorPicker
                      value={addingAnnotationColor.hex}
                      onChange={(color) => {
                        handleAnnotationColorChange({
                          hex: "#" + color.hex,
                          rgb: color.rgb,
                        });
                      }}
                      palette={annotationPalette}
                      hideTextfield
                      inputFormats={[]}
                    />
                  </span>
                </Tooltip>
                <TextField
                  className={classes.textField}
                  variant='outlined'
                  fullWidth
                  size='medium'
                  placeholder={"Adding annotation text"}
                  margin='dense'
                  label='Add Annotation'
                  multiline
                  minRows={1}
                  maxRows={5}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    className: classes.input,
                    classes: {
                      adornedEnd: classes.endAdornment,
                    },
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Tooltip
                          arrow
                          title={
                            addingAnnotationOn
                              ? "Clear adding"
                              : "Add annotation"
                          }
                          placement='right'
                          PopperProps={{
                            container: containerRef.current,
                          }}
                        >
                          <span>
                            <IconButton
                              size='medium'
                              color={
                                addingAnnotationOn ? "secondary" : "primary"
                              }
                              disabled={isAddAnnotationDisabled}
                              onClick={() => {
                                handleToggleAddAnnotation();
                              }}
                            >
                              <AddRounded />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  autoComplete='off'
                  value={addingAnnotationText}
                  onChange={(e) => handleAnnotationChange(e.target.value)}
                />
              </div>
            </Collapse>
            <Divider className={classes.sectionDivider} />
          </>
        )}
        {annotationOnFunctions.editAnnotation &&
          selectedAnnotationEditable &&
          selectedAnnotationEditable.value && (
            <>
              <div className={classes.drawerInfo}>
                <Typography variant='h6'>Edit annotation content:</Typography>
                {isEditAnnotationExpanded ? (
                  <IconButton
                    color='primary'
                    onClick={() => setIsEditAnnotationExpanded(false)}
                  >
                    <Tooltip
                      arrow
                      title={"Shrink annotation editing"}
                      placement='top'
                      PopperProps={{
                        container: containerRef.current,
                      }}
                    >
                      <ExpandLessRounded />
                    </Tooltip>
                  </IconButton>
                ) : (
                  <IconButton
                    color='primary'
                    onClick={() => setIsEditAnnotationExpanded(true)}
                  >
                    <Tooltip
                      arrow
                      title={"Expand annotation editing"}
                      placement='top'
                      PopperProps={{
                        container: containerRef.current,
                      }}
                    >
                      <ExpandMoreRounded />
                    </Tooltip>
                  </IconButton>
                )}
              </div>
              <Collapse in={isEditAnnotationExpanded} timeout='auto'>
                <div
                  className={`${classes.drawerField} ${classes.addAnnotationDrawerField}`}
                >
                  <Tooltip
                    arrow
                    title={"Annotation color"}
                    placement='top'
                    PopperProps={{
                      container: containerRef.current,
                    }}
                  >
                    <span className={classes.colorPicker}>
                      <ColorPicker
                        value={editingAnnotationColor.hex}
                        onChange={(color) => {
                          handleEditingAnnotationColorChange({
                            hex: "#" + color.hex,
                            rgb: color.rgb,
                          });
                        }}
                        palette={annotationPalette}
                        hideTextfield
                        inputFormats={[]}
                      />
                    </span>
                  </Tooltip>
                  <TextField
                    className={classes.textField}
                    variant='outlined'
                    fullWidth
                    size='medium'
                    placeholder={"Editing annotation text"}
                    margin='dense'
                    label='Edit Annotation'
                    multiline
                    minRows={1}
                    maxRows={5}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      className: classes.input,
                      classes: {
                        adornedEnd: classes.endAdornment,
                      },
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Tooltip
                            arrow
                            title={"Confirm edit"}
                            placement='right'
                            PopperProps={{
                              container: containerRef.current,
                            }}
                          >
                            <span>
                              <IconButton
                                size='medium'
                                color='primary'
                                disabled={isUpdateAnnotationDisabled}
                                onClick={() => {
                                  handleAnnotationValueUpdate();
                                }}
                              >
                                <CheckRounded />
                              </IconButton>
                            </span>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    autoComplete='off'
                    value={updateAnnotationValueText}
                    onChange={(e) =>
                      handleAnnotationValueUpdateChange(e.target.value)
                    }
                  />
                </div>
              </Collapse>
              <Divider className={classes.sectionDivider} />
            </>
          )}
        {threadsEnabledActions.startThread &&
          selectionCommentable &&
          selectionCommentable.addThread && (
            <>
              <div className={classes.drawerInfo}>
                <Typography variant='h6'>Start a comment thread:</Typography>
                {isStartThreadExpanded ? (
                  <IconButton
                    color='primary'
                    onClick={() => setIsStartThreadExpanded(false)}
                  >
                    <Tooltip
                      arrow
                      title={"Shrink thread creation"}
                      placement='top'
                      PopperProps={{
                        container: containerRef.current,
                      }}
                    >
                      <ExpandLessRounded />
                    </Tooltip>
                  </IconButton>
                ) : (
                  <IconButton
                    color='primary'
                    onClick={() => setIsStartThreadExpanded(true)}
                  >
                    <Tooltip
                      arrow
                      title={"Expand thread creation"}
                      placement='top'
                      PopperProps={{
                        container: containerRef.current,
                      }}
                    >
                      <ExpandMoreRounded />
                    </Tooltip>
                  </IconButton>
                )}
              </div>
              <Collapse in={isStartThreadExpanded} timeout='auto'>
                <div className={classes.drawerField}>
                  <Typography variant='body1' color='textPrimary'>
                    Thread type:
                  </Typography>
                </div>
                <div className={classes.drawerField}>
                  <ToggleButtonGroup
                    exclusive
                    value={addingThreadType}
                    onChange={(e, value) => handleAddingThreadTypeChange(value)}
                  >
                    {Object.keys(typeToIconMapping).map((typeKey) => (
                      <ToggleButton
                        value={typeToIconMapping[typeKey].value}
                        key={typeToIconMapping[typeKey].value}
                        style={{ color: typeToIconMapping[typeKey].color }}
                      >
                        <Tooltip
                          arrow
                          title={typeToIconMapping[typeKey].title}
                          placement='top'
                          PopperProps={{
                            container: containerRef.current,
                          }}
                        >
                          <span>{typeToIconMapping[typeKey].icon}</span>
                        </Tooltip>
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </div>
                <div className={classes.drawerField}>
                  <TextField
                    className={classes.textField}
                    variant='outlined'
                    fullWidth
                    size='medium'
                    placeholder={"Thread Title"}
                    margin='dense'
                    label='Title'
                    multiline
                    minRows={1}
                    maxRows={3}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      className: classes.input,
                    }}
                    autoComplete='off'
                    value={addingThreadTitle}
                    onChange={(e) =>
                      handleAddingThreadTitleChange(e.target.value)
                    }
                  />
                </div>
                <div className={`${classes.drawerField} ${classes.button}`}>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={handleStartCommentThread}
                    fullWidth
                    disabled={isAddCommentDisabled}
                  >
                    Start Thread
                  </Button>
                </div>
              </Collapse>
              <Divider className={classes.sectionDivider} />
            </>
          )}
        <div className={classes.drawerInfo}>
          <Typography variant='h6'>Comment Threads:</Typography>
          <IconButton
            color='primary'
            disabled={allThreadsShrinked}
            onClick={() => handleShrinkAllThreads()}
          >
            <Tooltip
              arrow
              title={"Shrink all threads"}
              placement='top'
              PopperProps={{
                container: containerRef.current,
              }}
            >
              <ExpandLessRounded />
            </Tooltip>
          </IconButton>
        </div>
        {selectionCommentThreads.length === 0 ? (
          <div className={classes.drawerField}>
            <Typography variant='body1' color='textPrimary'>
              {isSelection
                ? "No comment threads yet"
                : "No selected node or edge"}
            </Typography>
          </div>
        ) : (
          <Divider className={classes.threadDivider} />
        )}
        <List disablePadding>
          {selectionCommentThreads.map((commentThread, i) => (
            <span key={`commentThread-${i}`}>
              <>
                <ListItem
                  className={
                    commentThread.resolved
                      ? classes.resolvedBackground
                      : classes.unresolvedBackground
                  }
                >
                  <ListItemAvatar>
                    <Avatar alt='avatar'>
                      {typeToIconMapping[commentThread.type].icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        className={classes.threadTitleTypography}
                        variant='h6'
                      >
                        {commentThread.title +
                          ` (${commentThread.comments.length} comment${
                            commentThread.comments.length === 1 ? "" : "s"
                          })`}
                      </Typography>
                    }
                  />
                  <div>
                    {threadsEnabledActions.toggleResolved &&
                      selectionCommentable.resolveThread && (
                        <Tooltip
                          arrow
                          title={
                            `${commentThread.resolved ? "Reopen" : "Resolve"}` +
                            " Thread"
                          }
                          placement='top'
                          PopperProps={{
                            container: containerRef.current,
                          }}
                        >
                          <Switch
                            checked={commentThread.resolved}
                            onClick={(e) => handleToggleResolvedThread(i)}
                            size='small'
                            color='primary'
                          />
                        </Tooltip>
                      )}
                    {threadsEnabledActions.removeThread &&
                      selectionCommentable.deleteThread && (
                        <IconButton
                          color='primary'
                          onClick={(e) => handleDeleteThread(i)}
                        >
                          <Tooltip
                            arrow
                            title={"Delete Thread"}
                            placement='top'
                            PopperProps={{
                              container: containerRef.current,
                            }}
                          >
                            <DeleteRounded />
                          </Tooltip>
                        </IconButton>
                      )}
                    {commentThread.expanded ? (
                      <IconButton
                        color='primary'
                        onClick={(e) => handleToggleExpandedThread(i)}
                      >
                        <Tooltip
                          arrow
                          title={"Shrink thread"}
                          placement='top'
                          PopperProps={{
                            container: containerRef.current,
                          }}
                        >
                          <ExpandLessRounded />
                        </Tooltip>
                      </IconButton>
                    ) : (
                      <IconButton
                        color='primary'
                        onClick={(e) => handleToggleExpandedThread(i)}
                      >
                        <Tooltip
                          arrow
                          title={"Expand thread"}
                          placement='top'
                          PopperProps={{
                            container: containerRef.current,
                          }}
                        >
                          <ExpandMoreRounded />
                        </Tooltip>
                      </IconButton>
                    )}
                  </div>
                </ListItem>
                <Collapse in={commentThread.expanded} timeout='auto'>
                  <>
                    <Divider />
                    {threadsEnabledActions.addComment &&
                      selectionCommentable.addComment && (
                        <div className={classes.drawerField}>
                          <AddCommentTextField
                            containerRef={containerRef}
                            disabled={commentThread.resolved}
                            threadId={i}
                            handleAddComment={handleAddComment}
                          />
                        </div>
                      )}
                    {commentThread.comments.length === 0 && (
                      <div className={classes.drawerField}>
                        <Typography variant='body1' color='textPrimary'>
                          No comments yet
                        </Typography>
                      </div>
                    )}
                    {commentThread.comments.length !== 0 && <Divider />}
                    <List className={classes.commentsContainer} disablePadding>
                      {commentThread.comments.map((comment, j) => (
                        <span key={`commentThread-${i}-comment-${j}`}>
                          <ListItem className={classes.nestedItem}>
                            <ListItemText
                              primaryTypographyProps={{
                                component: "div",
                              }}
                              primary={
                                <Typography
                                  className={classes.threadCommentTypography}
                                  component='div'
                                  variant='body2'
                                  color='textPrimary'
                                >
                                  {commentThread.comments[j]}
                                </Typography>
                              }
                            />
                            {threadsEnabledActions.removeThread &&
                              selectionCommentable.deleteComment && (
                                <IconButton
                                  disabled={commentThread.resolved}
                                  color='primary'
                                  onClick={(e) => handleDeleteComment(i, j)}
                                >
                                  <Tooltip
                                    arrow
                                    title={"Delete comment"}
                                    placement='top'
                                    PopperProps={{
                                      container: containerRef.current,
                                    }}
                                  >
                                    <DeleteRounded />
                                  </Tooltip>
                                </IconButton>
                              )}
                          </ListItem>
                          {j < commentThread.comments.length - 1 && <Divider />}
                        </span>
                      ))}
                    </List>
                  </>
                </Collapse>
              </>
              {i < selectionCommentThreads.length - 1 && (
                <Divider className={classes.threadDivider} />
              )}
            </span>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

CommentsDrawer.propTypes = {
  editorHeight: PropTypes.number,
  containerRef: PropTypes.element.isRequired,
  isCommentsOpen: PropTypes.bool.isRequired,
  selectionCommentThreads: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.arrayOf(PropTypes.string),
      type: PropTypes.string,
      expanded: PropTypes.bool,
      resolved: PropTypes.bool,
    }),
  ),
  isSelection: PropTypes.bool,
  threadsEnabledActions: PropTypes.shape({
    startThread: PropTypes.bool,
    removeThread: PropTypes.bool,
    addComment: PropTypes.bool,
    removeComment: PropTypes.bool,
    toggleResolved: PropTypes.bool,
  }),
  selectionCommentable: PropTypes.shape({
    addThread: PropTypes.bool,
    deleteThread: PropTypes.bool,
    resolveThread: PropTypes.bool,
    addComment: PropTypes.bool,
    deleteComment: PropTypes.bool,
  }),
  addingThreadTitle: PropTypes.string,
  addingThreadType: PropTypes.string,
  annotationOnFunctions: PropTypes.shape({
    addAnnotation: PropTypes.bool,
    removeAnnotation: PropTypes.bool,
    editAnnotation: PropTypes.bool,
  }),
  selectedAnnotationEditable: PropTypes.shape({
    value: PropTypes.bool,
    delete: PropTypes.bool,
  }),
  addingAnnotationText: PropTypes.string,
  updateAnnotationValueText: PropTypes.string,
  addingAnnotationOn: PropTypes.bool,
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
  handleStartCommentThread: PropTypes.func,
  handleAddingThreadTitleChange: PropTypes.func,
  handleAddingThreadTypeChange: PropTypes.func,
  handleToggleExpandedThread: PropTypes.func,
  handleShrinkAllThreads: PropTypes.func,
  handleAddComment: PropTypes.func,
  handleDeleteThread: PropTypes.func,
  handleDeleteComment: PropTypes.func,
  handleToggleResolvedThread: PropTypes.func,
};

CommentsDrawer.defaultProps = {
  editorHeight: 300,
  containerRef: null,
  isCommentsOpen: false,
  selectionCommentThreads: [],
  isSelection: false,
  selectionCommentable: undefined,
  threadsEnabledActions: {
    startThread: true,
    removeThread: true,
    addComment: true,
    removeComment: true,
    toggleResolved: true,
  },
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
  handleStartCommentThread: () => {},
  handleAddingThreadTitleChange: () => {},
  handleAddingThreadTypeChange: () => {},
  handleToggleExpandedThread: () => {},
  handleShrinkAllThreads: () => {},
  handleAddComment: () => {},
  handleDeleteThread: () => {},
  handleDeleteComment: () => {},
  handleToggleResolvedThread: () => {},
};

export default CommentsDrawer;
