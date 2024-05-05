import React from "react";
import PropTypes from "prop-types";

import { Snackbar } from "@material-ui/core";

import { Alert } from "@material-ui/lab";

function CreatingNodeSnackbar({
  isCreatingNode,
  toggleIsCreatingNode,
  isCreatingMathNode,
  setIsCreatingMathNode,
  addingAnnotationOn,
  handleToggleAddAnnotation,
}) {
  return (
    <Snackbar
      style={{ position: "absolute" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={isCreatingNode || isCreatingMathNode || addingAnnotationOn}
      onClose={(e, reason) => {
        if (reason !== "clickaway") {
          if (isCreatingNode) {
            toggleIsCreatingNode();
          } else if (isCreatingMathNode) {
            setIsCreatingMathNode(false);
          } else if (addingAnnotationOn) {
            handleToggleAddAnnotation();
          }
        }
      }}
    >
      <Alert severity='info' variant='standard'>
        Freely position the {isCreatingMathNode && "math"}{" "}
        {isCreatingMathNode || isCreatingNode ? "node" : "annotation"} on the
        stage
      </Alert>
    </Snackbar>
  );
}

CreatingNodeSnackbar.propTypes = {
  isCreatingNode: PropTypes.bool,
  toggleIsCreatingNode: PropTypes.func,
  isCreatingMathNode: PropTypes.bool,
  setIsCreatingMathNode: PropTypes.func,
  addingAnnotationOn: PropTypes.bool,
  handleToggleAddAnnotation: PropTypes.func,
};

CreatingNodeSnackbar.defaultProps = {
  isCreatingNode: false,
  toggleIsCreatingNode: () => {},
  isCreatingMathNode: false,
  setIsCreatingMathNode: () => {},
  addingAnnotationOn: false,
  handleToggleAddAnnotation: () => {},
};

export default CreatingNodeSnackbar;
