import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
let ref    = {};

class AlertDialogConfirm extends React.Component 
{

  state = {open: false};
  cb = {};

  constructor(props, context) 
  {
    super(props, context);

    this.props.obj.open = this.handleClickOpen;
    this.props.obj.close = this.handleClose;

  }

  setRef = e => {(e)&&(ref[(e.id)?e.id:e.props.id] = e)};

  handleClickOpen = (msg, callback) => {
    this.setState({ open: true, msg });
    this.cb = callback;
  };

  handleClose = (param) => {
    const res = {}
    res.ok = (param === 'ok') ? true : false;

    this.cb(res)
    this.setState({ open: false, msg: '' });
    this.props.onClose();
  };

  handleKeyCancel = (e) =>
  {
    if(e.key === 'ArrowRight' || e.key === 'ArrowLeft')
      ReactDOM.findDOMNode(ref.btnok).focus();
  }

  handleKeyOK = (e) =>
  {
    if(e.key === 'ArrowRight' || e.key === 'ArrowLeft')
      ReactDOM.findDOMNode(ref.btncancel).focus(); 
  }

  render() 
  {
    const { msg, open } = this.state;
    return (
      <>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {msg}
          </DialogTitle>
          <DialogActions>
            <Button id='btncancel' onClick={() => this.handleClose('cancel')} onKeyDown={this.handleKeyCancel} ref={this.setRef} color="primary" autoFocus>
              Cancel
            </Button>
            <Button id='btnok' onClick={() => this.handleClose('ok')} onKeyDown={this.handleKeyOK} ref={this.setRef} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(AlertDialogConfirm);
