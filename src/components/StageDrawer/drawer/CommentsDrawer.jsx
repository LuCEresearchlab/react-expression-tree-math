import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  Drawer,
  IconButton,
  InputAdornment,
  Popover,
  Typography,
  TextField,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  FormLabel,
  Tooltip,
  Switch,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';

// Width of the side drawer
const drawerWidth = 300;

// Top bar and side drawer styles
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    position: 'absolute',
    overflowY: 'auto',
    '@media print': {
      display: 'none',
    },
  },
  drawerAnchorRight: {
    border: '0px',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  drawerContainer: {
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: '#fafafa',
    borderRadius: '0px 0px 15px 0px',
    borderRight: '1px solid #dedede',
    borderBottom: '1px solid #dedede',
  },
  drawerInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '10px 0 0 10px',
  },
  drawerField: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0 10px 10px',
  },
  textField: {
    paddingRight: '10px',
  },
}));

function CommentsDrawer({ isCommentsOpen, containerRef }) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      classes={{ paper: classes.drawerAnchorRight }}
      PaperProps={{
        style: { position: 'relative' },
        display: 'flex',
        justifycontent: 'flex-end',
      }}
      BackdropProps={{ style: { position: 'relative' } }}
      ModalProps={{
        container: containerRef.current,
        style: {
          position: 'absolute',
        },
      }}
      variant="persistent"
      anchor="right"
      open={isCommentsOpen}
    >
      <div className={classes.drawerContainer}>
        <Typography>asfasf</Typography>
      </div>
    </Drawer>
  );
}

CommentsDrawer.propTypes = {
  containerRef: PropTypes.element.isRequired,
  isCommentsOpen: PropTypes.bool.isRequired,
};

CommentsDrawer.defaultProps = {
  containerRef: null,
  isCommentsOpen: false,
};

export default CommentsDrawer;
