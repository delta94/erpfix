import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ComSearch from './CompSearch';


class CD extends React.Component
{
  state = {open: true};

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

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog fullWidth={true} maxWidth = {'md'} open={this.state.open} onClose={this.handleClose} children="kosong"
          PaperComponent={() => {return (<ComSearch />)}}/>
      </div>
    );
  }
}

export default CD;