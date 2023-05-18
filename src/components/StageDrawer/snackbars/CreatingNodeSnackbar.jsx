import React from "react";
import PropTypes from "prop-types";

import { Snackbar } from "@material-ui/core";

import { Alert } from "@material-ui/lab";

function CreatingNodeSnackbar({
  isCreatingNode,
  toggleIsCreatingNode,
  isCreatingMathNode,
  setIsCreatingMathNode,
}) {
  return (
    <Snackbar
      style={{ position: "absolute" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={isCreatingNode || isCreatingMathNode}
      onClose={(e, reason) => {
        if (reason !== "clickaway") {
          if (isCreatingNode) {
            toggleIsCreatingNode();
          } else {
            setIsCreatingMathNode(false);
          }
        }
      }}
    >
      <Alert severity='info' variant='standard'>
        Freely position the {isCreatingMathNode && "math"} node on the stage
      </Alert>
    </Snackbar>
  );
}

CreatingNodeSnackbar.propTypes = {
  isCreatingNode: PropTypes.bool,
  toggleIsCreatingNode: PropTypes.func,
  isCreatingMathNode: PropTypes.bool,
  setIsCreatingMathNode: PropTypes.func,
};

CreatingNodeSnackbar.defaultProps = {
  isCreatingNode: false,
  toggleIsCreatingNode: () => {},
  isCreatingMathNode: false,
  setIsCreatingMathNode: () => {},
};

export default CreatingNodeSnackbar;
