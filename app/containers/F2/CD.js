import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  console.log('-------------------');
  console.log('paper comp dialog');
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

class CD extends React.Component
{
  state = {open: false};

  constructor(props, context) {
    super(props, context);

  }
  
  handleClickOpen = () => 
  {
    this.setState({open: true});
  };

  handleClose = () => 
  {
    this.setState({open: false});
  };
  
  render()
  {
    console.log('cd render')
    console.log('tahap 2')

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Subscribe
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
            {console.log('-------------------')}
            {console.log('DialogContentText dialog')}
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CD;