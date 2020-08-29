import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RootRef from '@material-ui/core/RootRef';
import styles from 'fix-components/Tables/tableStyle-jss';
import { TbTextInput, TbLabel, TbLabelSearch } from 'fix-help/formik';
import { AlertDialogConfirm } from 'fix-containers/UiElements/demos';

let ref    = {};
let rowOver = 0;
let colOver = 0;
let isOver = false;
let colFocus = 0;
let rowFocus = 0;
let widthGrid = 0;
let Rendering = true;
let newLine = false;
let alert = {};

class DataGrid extends React.Component
{
  constructor(props, context) 
  {
    super(props, context);

    ref.tb = React.createRef();
    ref.tb2 = React.createRef();

    this.state = {prevVal: [], val: [], editing: [], dg: []}
    this.props.getData('dgData', this.state.dg, true);

    this.headersRow = [];
    
    widthGrid = 0;
    
    for(let i in props.column)
    {
      if(props.column[i].visible)
      {
        widthGrid += parseInt(props.column[i].width);
  
        if(props.column[i].width === '0')
          this.headersRow.push(<TableCell id={'headersRow' + i}  style={{padding: '0 0'}} key={'headers' + i}>{props.column[i].header}</TableCell>);
        else
          this.headersRow.push(<TableCell id={'headersRow' + i}  style={{padding: '0 20px'}} width={props.column[i].width} key={'headers' + i}>{props.column[i].header}</TableCell>);
      }
    }

    this.dgAdd();
    newLine = false;
    
    for (let c = 0;c<props.column.length; c++)
    {
      this.state['prevVal' + 0 + c] = '';
      this.state['editing' + 0 + c] = false;
    }

    this.props.dg.rowIndex = this.getRowFocus;
    this.props.dg.colIndex = this.getRowFocus;
    this.props.dg.setRowIndexColIndex = this.setRowIndexColIndex;
    this.props.dg.editRowIndexColIndex = this.editRowIndexColIndex;
  }

  getRowFocus() {return rowFocus}
  getColFocus() {return colFocus}

  dg = (row, col, value) =>
  {
    const { dg } = this.state;
    const { column } = this.props;
    
    if(value || value === '')
    {
      dg[row][column[col].item] = value;
    }
    
    this.props.getData('dgData', dg);
    return (dg[row][column[col].item] === undefined) ? '' : dg[row][column[col].item];
  }

  getDataDG = (row, col) =>
  {
    const { dg } = this.state;
    const { column } = this.props;
    
    return (dg[row][column[col].item] === undefined) ? '' : dg[row][column[col].item];
  }

  dgAdd = () =>
  {
    const { dg } = this.state;
    const { column } = this.props;
    const row = dg.length;
    newLine = true;
    
    dg[row] = {};
    this.props.getData('dgData', dg);
    
    for (let col = 0;col<column.length; col++)
    {
      if(column[col].item === 'no')
        this.dg(row, col, parseInt(row)+1);
      else if(column[col].labelRender === 'nominal')
        this.dg(row, col, 0);
      else
        this.dg(row, col, '');
    }
    this.props.getData('dgData', dg, true);
  }

  setRef = e => {
    if(e)
    {
      ref[e.id] = e
    }
  };
  
  componentDidMount()
  {
    this.props.setRef(ref.tb.current);
    let arrTr = ref.tb.current.children[0].children;
    let row, col, contentTR, contentTD;

    for(row in arrTr)
    {
      contentTR = arrTr[row];
      if(typeof contentTR == 'object')
      {
        for(col in contentTR.children)
        {
          contentTD = contentTR.children[col];
          if(typeof contentTD == 'object')
          {
            this.props.getData('td' + row + col, contentTD);
            this.props.getData('tbtxt' + row + col, contentTD.children[0]);
            ref['td' + row + col] = contentTD;
            ref['tbtxt' + row + col] = contentTD.children[0];
          }
        }
      }
    }

    this.setRowIndexColIndex(0, 1);
  }
  
  componentDidUpdate()
  {
    this.props.setRef(ref.tb.current);
    let arrTr = ref.tb.current.children[0].children;
    let row, col, contentTR, contentTD;

    for(row in arrTr)
    {
      contentTR = arrTr[row];
      if(typeof contentTR == 'object')
      {
        for(col in contentTR.children)
        {
          contentTD = contentTR.children[col];
          if(typeof contentTD == 'object')
          {
            this.props.getData('td' + row + col, contentTD);
            this.props.getData('tbtxt' + row + col, contentTD.children[0]);

            ref['td' + row + col] = contentTD;
            ref['tbtxt' + row + col] = contentTD.children[0];
          }
        }
      }
    }

    if(newLine)
    {
      newLine = false;
      this.setRowIndexColIndex(rowFocus, colFocus);
    }
  }

  componentWillReceiveProps(nextProps)
  {
    // this.setState({dg: nextProps.dg});
  }
  
  // User navigates table using keyboard
  dgKeyDown = e => 
  {
    const { column, handleOpenDialog } = this.props
    const dg = this.props.data;

    if(!this.state['editing' + rowFocus  + colFocus])
    {
      switch(e.key) 
      {
        case 'Enter':
          if(column[colFocus].labelRender === 'search' && this.getDataDG(rowFocus, colFocus) == '')
          {
            handleOpenDialog('coa', 'tbtxt' + rowFocus + colFocus, '', column[colFocus].item);
            e.preventDefault();
            return;
          }

          for(let i=(parseInt(colFocus)+1) ; i<column.length; i++)
          {
            if(!column[i].skip)
            {
              // reset current prev Focus
              this.resetCurrentPrevFocus(rowFocus, colFocus);

              // set nextFocus
              this.setRowIndexColIndex(rowFocus, i);
              e.preventDefault();
              return;
            }
          }

          // reset current prev Focus
          this.resetCurrentPrevFocus(rowFocus, colFocus);
          
          // set nextFocus
          this.setScroll(0);
          for(let i=0; i<column.length; i++)
          {
            if(column[i].require && this.getDataDG(rowFocus, i) === '')
            {
              this.setRowIndexColIndex(rowFocus, i);
              e.preventDefault();
              return;
            }
          }
          
          if(rowFocus === this.state.dg.length-1)
          { 
            this.dgAdd();
            rowFocus = this.state.dg.length-1;
          }
          else
            rowFocus = parseInt(rowFocus) + 1;
          colFocus = 0;
          for(let i=0; i<column.length; i++)
          {
            if(!column[i].skip)
            {
              colFocus = i;
              break;
            }
          }

          // set nextFocus
          this.setRowIndexColIndex(rowFocus, colFocus);
          this.setState({dg: this.state.dg});
          e.preventDefault();
          break;
        case 'ArrowLeft': 
          // Left Arrow
          if(colFocus == 0)
          {
            if(rowFocus == 0)
              return;
      
            // reset current prev Focus
            this.resetCurrentPrevFocus(rowFocus, colFocus);
      
            // set nextFocus
            this.setRowIndexColIndex(rowFocus-1, this.props.column.length-1);
          }
          else
          {
            // reset current prev Focus
            this.resetCurrentPrevFocus(rowFocus, colFocus);
      
            // set nextFocus
            this.setRowIndexColIndex(rowFocus, colFocus-1);
          }
          e.preventDefault();
          break;
        case 'ArrowRight': 
          // Right Arrow
          if(colFocus == (this.props.column.length-1))
          {
            if(rowFocus == (this.state.dg.length-1))
              return;

            // reset current prev focus
            this.resetCurrentPrevFocus(rowFocus, colFocus);

            // set nextFocus
            this.setRowIndexColIndex(parseInt(rowFocus)+1, 0);
          }
          else if(parseInt(colFocus)+1 <= (this.props.column.length-1))
          {
            // reset current prev focus
            this.resetCurrentPrevFocus(rowFocus, colFocus);

            // set nextFocus
            this.setRowIndexColIndex(rowFocus, parseInt(colFocus)+1);
          }
          e.preventDefault();
          break;
        case 'ArrowUp': 
          if (rowFocus-1 < 0)
            return;
            
          // reset current prev Focus
          this.resetCurrentPrevFocus(rowFocus, colFocus);

          // set nextFocus
          this.setRowIndexColIndex((rowFocus-1), colFocus);
          e.preventDefault();
          break;
        case 'ArrowDown': 
          if (parseInt(rowFocus)+1 >= this.state.dg.length)
          {
            const { column } = this.props;
            for (let col = 0;col<column.length; col++)
            {
              if(column[col].require && this.getDataDG(rowFocus, col) === '')
                return;
            }
            
            // reset current prev Focus
            this.resetCurrentPrevFocus(rowFocus, colFocus);
            this.dgAdd();
            colFocus = 1;
            rowFocus = this.state.dg.length-1;
            this.setState({dg: this.state.dg});
            return;
          }
          
          // reset current prev Focus
          this.resetCurrentPrevFocus(rowFocus, colFocus);

          // set nextFocus
          this.setRowIndexColIndex(parseInt(rowFocus)+1, colFocus);
          e.preventDefault();
          break;
        case 'Delete':
          let message = `Delete baris ke ${parseInt(rowFocus) + 1} ?`;
          this.setRowIndexColIndex(rowFocus, colFocus);
          alert.open(message, (res) => 
            {
              if(res.ok) 
              {
                this.resetCurrentPrevFocus(rowFocus, colFocus);
                dg.splice(rowFocus,1)
                if(rowFocus > dg.length-1)
                  rowFocus = dg.length-1
                if(dg.length === 0)
                {
                  this.dgAdd();
                  rowFocus = 0;
                }
                else
                {
                  console.log('aa')
                  for(let i=rowFocus ; i<dg.length; i++)
                  {
                    dg[i].no = (parseInt(i) + 1);
                  }
                  dg.focus = ref['td' + rowFocus + colFocus];
                  this.props.getData('dgData', dg, true);
                }
              }
              else
              {
              }
              this.setRowIndexColIndex(rowFocus, colFocus);

            }
          );

          e.preventDefault();
          break;
        case 'F2': 
          column[colFocus].edit && this.setState({['editing' + rowFocus  + colFocus] : true});
          e.preventDefault();
          break;
        case 'F12': 
          this.props.handleOpenDialog('coa', 'tbtxt' + rowFocus + colFocus, '', column[colFocus].item, '');
          e.preventDefault();
          break;
        default:
          if(this.NumToChar(e.which) != '' && column[colFocus].edit)
          {
            this.dg(rowFocus, colFocus, '');
            this.setState({ dg: this.state.dg,
              ['editing' + rowFocus  + colFocus] : true, 
              ['prevVal' + rowFocus  + colFocus] : this.getDataDG(rowFocus, colFocus)});
              ref['tbtxt' + rowFocus + colFocus].focus();
          }
          else
            this.props.onKeyDown(e);
      } 
    }    
  };

  NumToChar = num => 
  {
    if (num > 47 && num < 58) 
    {
      const strNums = "0123456789";
      return strNums.charAt(num - 48);
    } 
    else if (num > 64 && num < 91) 
    {
      const strCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return strCaps.charAt(num - 65);
    } 
    else if (num > 96 && num < 123) 
    {
      const strLow = "abcdefghijklmnopqrstuvwxyz";
      return strLow.charAt(num - 97);
    } 
    else if (num == 96) 
    {
      const strNol = "0";
      return strNol.charAt(0);
    } 
    else 
    {
      return '';
    }
  }

  editRowIndexColIndex = () =>
  {
      this.setState({ 'editing01': true});
        // ref['tbtxt' + rowFocus + colFocus].focus();
  }

  setRowIndexColIndex = (rowIndex, colIndex) =>
  {
    if(ref['td' + rowFocus  + colFocus])
    {
      rowFocus = rowIndex;
      colFocus = colIndex;

      this.props.dg.rowIndex = rowFocus;
      this.props.dg.colIndex = colFocus;

      ref['td' + rowFocus  + colFocus].className = this.props.classes.tdSelected;
      ref['td' + rowFocus  + colFocus].focus();
    }
  }

  tdOnKeyDown = (e, row, col, value) =>
  {
    switch(e.key) 
    {        
      case 'Enter': // ENTER
        ref['blur' + row + col] = false;
        this.dg(row, col, value);
        this.setState({['editing' + row  + col] : false, dg: this.state.dg});
        ref['td' + row  + col].focus();
        e.preventDefault();
        break;
      case 'Escape': // ESC
        ref['blur' + row + col] = false;
        this.dg(row, col, this.state['prevVal' + row + col]);
        this.setState({['editing' + row  + col] : false, dg: this.state.dg});
        ref['td' + row  + col].focus();
        e.preventDefault();
        break;
      default:
        ref['blur' + row + col] = true;
    }
  }
  
  handleScroll = () =>
  {
    if(ref.divTable.scrollLeft <= ref.divHeader.scrollLeftMax)
      ref.divHeader.scrollLeft = ref.divTable.scrollLeft;
    else
      ref.divTable.scrollLeft = ref.divHeader.scrollLeftMax;
  }
  
  setScroll = onScroll =>
  {
    ref.divHeader.scrollLeft = onScroll;
    ref.divTable.scrollLeft = onScroll;
  }

  tdDblClick = (row, col) =>
  {
    if(this.props.column[col].edit)
    {
      this.setState({['editing' + row  + col] : true});
      ref['tbtxt' + rowFocus + colFocus].focus();
    }
  }
  
  tdBlur = (row, col) =>
  {
    const { classes } = this.props;

    if(rowFocus === row && col === colFocus)
    {
      ref['td' + rowFocus  + colFocus].className = classes.tdhover;
      ref['td' + rowFocus  + colFocus].focus();
    }
  }
  
  tdOnMouseOver = (row, col) =>
  {
    const { classes } = this.props;

    rowOver = row;
    colOver = col;
    isOver = true;

    if(parseInt(rowFocus) !== parseInt(row) || parseInt(colFocus) !== parseInt(col))
      ref[`td${row}${col}`].className = classes.tdhover;
  }
  
  tdOnMouseLeave = (row, col) =>
  {
    isOver = false;

    if(parseInt(rowFocus) !== parseInt(row) || parseInt(colFocus) !== parseInt(col))
      this.resetCurrentPrevFocus(row, col);
  }

  tdClick = (row, col) =>
  {
    if(!this.state['editing' + rowFocus  + colFocus])
    {
      // reset current prev focus
      if((rowFocus != row || colFocus != col) && row < this.state.dg.length)
        this.resetCurrentPrevFocus(rowFocus, colFocus);

      if (typeof ref['td' + row + col] === 'undefined' || row >= this.state.dg.length)
      {
        ref['td' + rowFocus  + colFocus].focus();
        return;
      }

      // set nextFocus
      this.setRowIndexColIndex(row, col);
    }
  }
  
  resetCurrentPrevFocus = (row, col) => 
  {
    const { classes } = this.props;
    if(col == 0)
      if(this.state['editing' + row  + col])
        this.setState({['editing' + row  + col] : false});

    ref['td' + row + col].className = (isOver && parseInt(rowOver) === parseInt(row) && parseInt(colOver) === parseInt(col)) ? classes.tdhover : (row%2 == 0) ? classes.tdWhite : classes.tdReset;
  }

  handleBlur = (row, col, value) =>
  {
    if(ref['blur' + row + col])
    {
      this.dg(rowFocus, colFocus, value);
      this.setState({['editing' + row  + col] : false, dg: this.state.dg});
    }
  }

  shouldComponentUpdate()
  {
    if(!Rendering)
    {
      Rendering = true;
      return false;
    }
    return true;
  }

  handleUpdate = (val) =>
  {
    if(this.state['editing' + rowFocus  + colFocus])
    {
      Rendering = false;
      this.dg(rowFocus, colFocus, val);
      this.props.getData('dgData', this.state.dg);
      this.setState({dg : this.state.dg});
    }
  }

  render()
  {
    const { classes, column, id, width, height, tabIndex, searchFilter, handleOpenDialog, SetVariable, onClose } = this.props;
    const dg = this.props.data;
    let itemsRow = [], itemsCol = [], itemsContent;  
    let lastTabIndex = 9, valItem = '';
    for (let row = 0;row<dg.length; row++)
    {
      itemsCol = [];
      for(let col in column)
      {
        if(column[col].visible)
        {
          itemsContent = [];
          valItem = dg[row][column[col].item];
          if(row == rowFocus && col == colFocus && this.state['editing' + row + col] && column[col].edit)
          {
            itemsContent.push(
              <TbTextInput id={'tbtxt' + row + col} type="text" width="100%" key={'ii' + row + col} tabIndex={99} searchFilter={searchFilter} idDg={column[col].item}
                value={valItem} onUpdate={(val) => this.handleUpdate(val, row, col)} onBlur={(value) => this.handleBlur(row, col, value)}
                onKeyDown={(e, value, def) => this.tdOnKeyDown(e, row, col, value)} SetVariable={SetVariable} handleOpenDialog={handleOpenDialog}/>);
          }
          else
          {
            switch(column[col].labelRender)
            {
              case 'search': itemsContent.push(<TbLabelSearch handleOpenDialog={handleOpenDialog} classes={classes} id={'tbtxt' + row + col} key={'ii' + row + col} idDg={column[col].item} value={valItem} searchFilter={searchFilter} width={column[col].width} />);break;
              case 'center': itemsContent.push(<TbLabel id={'tbtxt' + row + col} key={'ii' + row + col} align='center' value={valItem} width={column[col].width} />);break;
              case 'right': itemsContent.push(<TbLabel id={'tbtxt' + row + col} key={'ii' + row + col} align='right' value={valItem} width={column[col].width} />);break;
              default: 
              itemsContent.push(<TbLabel id={'tbtxt' + row + col} key={'ii' + row + col} value={valItem} width={column[col].width} />);
            }
          }       
          
          itemsCol.push(
            <TableCell id={'td' + row + col} style={{padding:"0 0", margin: '0'}} tabIndex = {++lastTabIndex} width={column[col].width}
              onMouseOver={() => this.tdOnMouseOver(row, col)}
              onMouseLeave={() => this.tdOnMouseLeave(row, col)}
              onClick={() => this.tdClick(row, col)} 
              onDoubleClick={() => this.tdDblClick(row, col)} 
              onBlur={() => this.tdBlur(row, col)} 
              key={'i' + row + col}>{itemsContent} </TableCell>);
        }
      }
      itemsRow.push(<TableRow key={'tr' + row}>{itemsCol}</TableRow>);
    }
    
    return (
      <>
        <div id="divHeader" ref={this.setRef} style={{width: `${width}px`,  overflow: `hidden`}}>
          <RootRef rootRef={ref.tb2}>
            <Table key={99} className={classNames(classes.table, classes.stripped, classes.bordered)} ref="tb2" style={{width: widthGrid}}>
              <TableHead><TableRow>{this.headersRow}</TableRow></TableHead>
            </Table>
          </RootRef>
        </div>
        <div id="divTable" onScroll={this.handleScroll} ref={this.setRef} style={{width: `${width}px`, height: `${height}px`,overflowX: "auto"}}>
          <RootRef rootRef={ref.tb}>
            <Table key={9} id={id} tabIndex={tabIndex} 
              className={classNames(classes.table, classes.stripped, classes.bordered)} onKeyDown={this.dgKeyDown} ref="tb" style={{width: widthGrid}}>
              <TableBody>{itemsRow}</TableBody>
            </Table>
          </RootRef>
        </div>
        <div>
          <AlertDialogConfirm obj={alert} onClose={onClose} />
        </div>
      </>
    );
  }
}

export default withStyles(styles)(DataGrid);