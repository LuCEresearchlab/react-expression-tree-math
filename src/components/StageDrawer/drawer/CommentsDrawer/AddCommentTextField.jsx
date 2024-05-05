import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import {
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import { AddRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  endAdornment: {
    paddingRight: 0,
  },
  textField: {
    paddingRight: "10px",
    marginTop: "20px",
  },
}));

function AddCommentTextField({
  containerRef,
  disabled,
  threadId,
  handleAddComment,
}) {
  const classes = useStyles();

  const [commentValue, setCommentValue] = useState("");
  const [isCommentAddEmpty, setIsCommentAddEmpty] = useState(true);

  const handleCommentChange = useCallback((value) => {
    setCommentValue(value);
    setIsCommentAddEmpty(value.length === 0);
  });

  return (
    <TextField
      className={classes.textField}
      disabled={disabled}
      variant='outlined'
      fullWidth
      size='medium'
      placeholder={"Comment"}
      margin='dense'
      label='Add a comment'
      multiline
      minRows={2}
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
              title={"Add comment"}
              placement='right'
              PopperProps={{
                container: containerRef.current,
              }}
            >
              <span>
                <IconButton
                  size='medium'
                  color='primary'
                  disabled={isCommentAddEmpty}
                  onClick={(e) => {
                    handleAddComment(threadId, commentValue);
                    handleCommentChange("");
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
      value={commentValue}
      onChange={(e) => handleCommentChange(e.target.value)}
    />
  );
}

AddCommentTextField.propTypes = {
  containerRef: PropTypes.element.isRequired,
  disabled: PropTypes.bool,
  threadId: PropTypes.number,
  handleAddComment: PropTypes.func,
};

AddCommentTextField.defaultProps = {
  containerRef: null,
  disabled: false,
  threadId: undefined,
  handleAddComment: () => {},
};

export default AddCommentTextField;
