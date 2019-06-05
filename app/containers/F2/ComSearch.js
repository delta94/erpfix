import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import { Input, ComboBox, TbLabel } from 'fix-help/formik';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RootRef from '@material-ui/core/RootRef';
import styles from 'dan-components/Tables/tableStyle-jss';

let ref    = {};
let rowIndex = 0;
let rowOver = 0;
let isOver = false;

class ComSearch extends React.Component
{
  state = {open: true};
  maxData = 0;

  constructor(props, context) {
    super(props, context);

    ref.tb = React.createRef();
  }

  componentDidMount = () =>
  {
    ref.tbData = ref.tb.current;
    ref.tr = ref.tbData.children[1].children;
    for ( let i in ref.tr)
    {
      if(typeof ref.tr[i] == 'object')
      {
        ref[`tr${i}`] = ref.tr[i]; 
        ref[`tr${i}`].className = (i%2 == 0) ? this.props.classes.tdWhite : this.props.classes.tdReset;
        
        ref[`tr${i}`].addEventListener("mouseover", () => this.tableOnMouseOver(i));
        ref[`tr${i}`].addEventListener("mouseleave", this.tableOnMouseLeave);
        ref[`tr${i}`].addEventListener("click", () => this.tdClick(i));
      }
    }

    ref.txtcolumn.addEventListener("keydown", this.handleKeyFirstTabIndex);
    ref.txtsearch.addEventListener("keydown", this.searchOnKeyDown);
    ref.tbData.addEventListener("keydown", this.tableOnKeyDown);

    this.setRowIndex(0);
    ref.txtsearch.focus();
  }
  
  setRef = e => 
  {
    if(e)
      ref[e.id] = e;
  };

  handleClickOpen = () => 
  {
    this.setState({open: true});
  };

  handleClose = () => 
  {
    this.setState({open: false});
  };
  
  
  resetCurrentPrevFocus = (row) => 
  {
    const { classes } = this.props;

    ref[`tr${row}`].className = (row%2 == 0) ? classes.tdWhite : classes.tdReset;
  }

  setRowIndex = (row) =>
  {
    rowIndex = parseInt(row);

    if(isOver)
      ref[`tr${rowOver}`].className = this.props.classes.trHover;
      
    ref[`tr${row}`].className = this.props.classes.tdSelected;
    ref[`tr${row}`].focus();
  }

  tdClick = row =>
  {
    // reset current prev focus
    if(rowIndex != row && row < this.maxData)
      this.resetCurrentPrevFocus(rowIndex);

    if (typeof ref[`tr${row}`] === 'undefined' || row >= this.maxData)
    {
      ref[`tr${row}`].focus();
      return;
    }

    // set nextFocus
    this.setRowIndex(row);
  }

  tableOnMouseOver = (row) =>
  {
    const { classes, theme } = this.props;
    isOver = true;
    rowOver = parseInt(row);

    if(parseInt(rowOver) !== parseInt(rowIndex))
      ref[`tr${row}`].className = classes.trHover;
  }

  tableOnMouseLeave = () =>
  {
    isOver = false;
    if(parseInt(rowOver) !== parseInt(rowIndex))
      this.resetCurrentPrevFocus(rowOver);
  }
  searchOnKeyDown
  handleKeyFirstTabIndex = e =>
  {
    if(e.which == 9 && e.shiftKey)  // SHIFT + TAB
    {
      e.preventDefault();
    }
  }

  searchOnKeyDown = e =>
  {
    if(e.which == 40)  
    {
      ref.tbData.focus();
      this.setRowIndex(rowIndex);
      e.preventDefault();
    }
  }

  // User navigates table using keyboard
  tableOnKeyDown = e => 
  {
    switch(e.which) 
    {        
      case 9:
        if(!e.shiftKey)
        {
          ref.txtcolumn.focus();
          e.preventDefault();
        }
        else if(e.shiftKey)
        {
          ref.txtsearch.focus();
          e.preventDefault();
        }
        break;
      case 38: 
          // Up Arrow
          if (rowIndex-1 < 0)
          {
            ref.txtsearch.focus();
            e.preventDefault();
            return;
          }
          // reset current prev Focus
          this.resetCurrentPrevFocus(rowIndex);

          // set nextFocus
          this.setRowIndex((rowIndex-1));
        break;
      case 40: 
          // Down Arrow
          if (rowIndex+1 >= this.maxData)
            return;
            
          // reset current prev Focus
          this.resetCurrentPrevFocus(rowIndex);

          // set nextFocus
          this.setRowIndex((rowIndex+1));
        break;
      default:
        e.preventDefault();
    }
    
  };

  render()
  {
    const { classes, props } = this.props;
    
    const arrColumn = 
    [
      [120, 'kode', 'Kode'],
      [120, 'nama', 'Nama'],
      [120, 'kategori', 'Kategori'],
      [120, 'nohp', 'No. HP'],
      [120, 'alamat', 'Alamat'],
      [120, 'kota', 'Kota'],
    ];

    const arrContent = 
    [
      {kode:'Kode 1', nama:'Nama 1', kategori:'Customer', nohp:'', alamat:'', kota:''},
      {kode:'Kode 2', nama:'Nama 2', kategori:'Customer', nohp:'', alamat:'', kota:''},
      {kode:'Kode 3', nama:'Nama 3', kategori:'Customer', nohp:'', alamat:'', kota:''},
      {kode:'Kode 4', nama:'Nama 4', kategori:'Customer', nohp:'', alamat:'', kota:''},
      {kode:'Kode 5', nama:'Nama 5', kategori:'Customer', nohp:'', alamat:'', kota:''},
      {kode:'Kode 6', nama:'Nama 6', kategori:'Customer', nohp:'', alamat:'', kota:''},
      {kode:'Kode 7', nama:'Nama 7', kategori:'Customer', nohp:'', alamat:'', kota:''},
      {kode:'Kode 8', nama:'Nama 8', kategori:'Customer', nohp:'', alamat:'', kota:''},
      {kode:'Kode 9', nama:'Nama 9', kategori:'Customer', nohp:'', alamat:'', kota:''},
      {kode:'Kode 10', nama:'Nama 10', kategori:'Customer', nohp:'', alamat:'', kota:''},
    ];

    const arrColumnField = [{label:'All', value:''}];
    for(let i in arrColumn)
    {
      arrColumnField.push({label:arrColumn[i][2], value:arrColumn[i][1]});
    } 

    const arrOperator = 
    [
      {label: 'contains', value: ''},
      {label: '=', value: ''},
      {label: '!=', value: ''},
      {label: '<', value: ''},
      {label: '<=', value: ''},
      {label: '>', value: ''},
      {label: '>=', value: ''},
      {label: 'begin with', value: ''},
      {label: 'end with', value: ''},
    ];

    const header = [<TableCell key={'hcellno00'}>No</TableCell>];
    const content = [];

    // Header
    for( let i in arrColumn)
    {
      header.push(<TableCell key={'hcell' + i}>{arrColumn[i][2]}</TableCell>);
    }

    // Content
    for( let r in arrContent )
    {
      let cell = [<TableCell key={'cellno' + (r+0)}>{(parseInt(r)+1)}</TableCell>];

      for( let c in arrColumn)
      {
        cell.push(<TableCell key={'cell' + (r+c)}>{arrContent[r][arrColumn[c][1]]}</TableCell>);
      }

      content.push(<TableRow key={'row' + r} >{cell}</TableRow>);
    }

    this.maxData = content.length; 

    return (
      <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper>
      <DialogTitle id="draggable-dialog-title" style={{margin:0, padding:'10px 0 5px 20px', cursor: 'move'}}>
          Cari Kontak
        </DialogTitle>
        <DialogContent style={{margin: 0, padding: '0 10px 10px 10px'}}>
          <div style={{display: 'flex', marginBottom:'30px'}}>
            <div style={{height: '20px', width: '120px'}}>
              <ComboBox tabIndex={1} key={1} width='100%' id='txtcolumn' toolTip='Column' data={arrColumnField} setRef={this.setRef} />
            </div>
            <div style={{height: '20px', marginLeft: '10px',width: '120px'}}>
              <ComboBox tabIndex={2} key={2} width='100%' id='txtoperator' toolTip='Operator' data={arrOperator} setRef={this.setRef} />
            </div>
            <div style={{height: '20px', marginLeft: '10px',width: `calc(100% - 50px - 130px - 130px)`}}>
              <Input tabIndex={3} key={3} type='text' width='100%' id='txtsearch' label='Search' value='abc' onChange={()=>{}}  placeholder='Filter in here' setRef={this.setRef}   />
            </div>
            <div style={{height: '20px', width: '50px'}}>
              <IconButton id="btnsearch" title='Search' className={classes.btn} >
                <Icon className={classes.icon}>search</Icon>
              </IconButton>
            </div>
          </div>
          
        <RootRef rootRef={ref.tb}>
          <Table key={4} tabIndex={4} style={{margin:0}}
            className={classNames(classes.table, classes.bordered, classes.small)}>
            <TableHead><TableRow>{header}</TableRow></TableHead>
            <TableBody>{content}</TableBody>
          </Table>
        </RootRef>
        </DialogContent>
        <DialogActions style={{margin: 0, padding: 0}}>
          <Button onClick={this.handleClose} color="primary">
            Add New
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Choose
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
        </Paper>
      </Draggable>
    );
  }
}

export default withStyles(styles)(ComSearch);