import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { PapperFix } from 'dan-components';
import "./CR_CSS.css";
import { TbTextInput, TxtInput, TxtSearch, TxtNoTransaksi, TxtComboBox, TbLabel } from 'fix-help/formik';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from 'dan-components/Tables/tableStyle-jss';
import RootRef from '@material-ui/core/RootRef';

let ref    = {};
let colFocus = 1;
let rowFocus = 1;
let changeRowColIndex = false;

class CR extends Component 
{
  constructor(props, context) {
    super(props, context);

    this.setRef = (element) => 
    {
      if(element)
        ref[element.id] = element;
    };

    this.maxCol = 8;
    this.maxData = 3;
    this.maxRow = 5;

    ref.tbData = React.createRef();

    this.state = {

    };

    for (let r = 0;r<this.maxData; r++)
    {
      for (let c = 0;c<this.maxCol; c++)
      {
        this.state['prevVal' + r + c] = '';
        this.state['val' + r + c] = '';
        this.state['editing' + r + c] = false;
      }
    }

    this.state = this.state;
  }
  
  componentDidMount()
  {
    let arrTr = ref.tbData.current.children[1].children;
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
            ref['td' + row + col] = contentTD;
            ref['tbtxt' + row + col] = contentTD.children[0];
          }
        }
      }
    }

    this.setRowIndexColIndex(0, 0);
    ref.txtterimadari.focus();
  }

  tdDblClick = (row, col) =>
  {
    this.setState({['editing' + row  + col] : true});
    ref['tbtxt' + rowFocus + colFocus].focus();
  }

  tdClick = (row, col) =>
  {
    // reset current prev focus
    if((rowFocus != row || colFocus != col) && row < this.maxData)
      this.resetCurrentPrevFocus(rowFocus, colFocus);

    if (typeof ref['td' + row + col] === 'undefined' || row >= this.maxData)
    {
      ref['td' + rowFocus  + colFocus].focus();
      return;
    }

    // set nextFocus
    this.setRowIndexColIndex(row, col);
  }
  
  resetCurrentPrevFocus = (row, col) => 
  {
    const { classes } = this.props;
    if(col == 0)
      if(this.state['editing' + row  + col])
        this.setState({['editing' + row  + col] : false});

    ref['td' + row + col].className = (row%2 == 0) ? classes.tdWhite : classes.tdReset;
  }

  rightKeys = () =>
  {
    // Right Arrow
    if(colFocus == (this.maxCol-1))
    {
      if(rowFocus == (this.maxData-1))
        return;

      // reset current prev focus
      this.resetCurrentPrevFocus(rowFocus, colFocus);

      // set nextFocus
      this.setRowIndexColIndex((rowFocus+1), 0);
    }
    else
    {
      // reset current prev focus
      this.resetCurrentPrevFocus(rowFocus, colFocus);

      // set nextFocus
      this.setRowIndexColIndex(rowFocus, (colFocus+1));
    }
  }

  setRowIndexColIndex = (rowIndex, colIndex) =>
  {
    changeRowColIndex = true;

    rowFocus = rowIndex;
    colFocus = colIndex;

    ref['td' + rowFocus  + colFocus].className = this.props.classes.tdSelected;
    ref['td' + rowFocus  + colFocus].focus();
  }

  leftKeys = () =>
  {
    // Left Arrow
    if(colFocus == 0)
    {
      if(rowFocus == 0)
        return;

      // reset current prev Focus
      this.resetCurrentPrevFocus(rowFocus, colFocus);

      // set nextFocus
      this.setRowIndexColIndex(rowFocus-1, this.maxCol-1);
    }
    else
    {
      // reset current prev Focus
      this.resetCurrentPrevFocus(rowFocus, colFocus);

      // set nextFocus
      this.setRowIndexColIndex(rowFocus, colFocus-1);
    }
  }

  handleBlur = (row, col, value) =>
  {
    if(ref['blur' + row + col] != false)
    {
      this.setState({['editing' + row  + col] : false, ['val' + rowFocus  + colFocus] : value});
    }
  }

  tdOnKeyDown = (e, row, col, value) =>
  {
    switch(e.which) 
    {        
      case 13: // ENTER
        ref['blur' + row + col] = false;
        this.setState({['editing' + row  + col] : false, ['val' + row  + col] : value});
        ref['td' + row  + col].focus();
        e.preventDefault();
        break;
      case 27: // ESC
        ref['blur' + row + col] = false;
        this.setState({['editing' + row  + col] : false, ['val' + row  + col] : this.state['prevVal' + row + col]});
        ref['td' + row  + col].focus();
        e.preventDefault();
        break;
      default:
        ref['blur' + row + col] = true;
    }
  }

  // User navigates table using keyboard
  tableOnKeyDown = e => 
  {
    
    if(!this.state['editing' + rowFocus  + colFocus])
    {
      switch(e.which) 
      {        
        case 9:
          if(!e.shiftKey)
          {
            ref.txttanggal.focus();
            e.preventDefault();
          }
          else if(e.shiftKey)
          {
              ref.txturaian.focus();
              e.preventDefault();
          }
          break;
        case 37: this.leftKeys(); break;
        case 39: this.rightKeys(); break;
        case 38: 
            // Up Arrow
            if (rowFocus-1 < 0)
              return;
              
            // reset current prev Focus
            this.resetCurrentPrevFocus(rowFocus, colFocus);
  
            // set nextFocus
            this.setRowIndexColIndex((rowFocus-1), colFocus);
          break;
        case 40: 
            // Down Arrow
            if (rowFocus+1 >= this.maxData)
              return;
              
            // reset current prev Focus
            this.resetCurrentPrevFocus(rowFocus, colFocus);
  
            // set nextFocus
            this.setRowIndexColIndex((rowFocus+1), colFocus);
          break;
        case 46: 
            // Delete
            this.setState({['val' + rowFocus  + colFocus] : ''});
          break;
        case 113: 
            // F2
            this.setState({['editing' + rowFocus  + colFocus] : true});
          break;
        default:
          if(this.NumToChar(e.which) != '')
          {
            changeRowColIndex = false;

            this.setState({
              ['editing' + rowFocus  + colFocus] : true, 
              ['prevVal' + rowFocus  + colFocus] : this.state['val' + rowFocus + colFocus], 
              ['val' + rowFocus  + colFocus] : ''});
            ref['tbtxt' + rowFocus + colFocus].focus();
          }
          else if(e.which != 9)
          {
              e.preventDefault();
          }

  
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
  
  handleKeyTerimaDari = e =>
  {
    if(e.which == 9 && e.shiftKey)  // SHIFT + TAB
    {
      ref.txtprogress.focus();
      e.preventDefault();
    }
  }

  handleKeyUraian = e =>
  {
    if(e.which == 9 && !e.shiftKey)  // TAB
    {
      ref['td' + rowFocus  + colFocus].className = this.props.classes.tdSelected;
      ref['td' + rowFocus  + colFocus].focus();
      e.preventDefault();
    }
  }
  
  handleKeyTanggal = e =>
  {
    if(e.which == 9 && e.shiftKey)  // SHIFT + TAB
    {
      ref['td' + rowFocus  + colFocus].className = this.props.classes.tdSelected;
      ref['td' + rowFocus  + colFocus].focus();
      e.preventDefault();
    }
  }
  
  handleKeyProgress = e =>
  {
    if(e.which == 9 && !e.shiftKey)  // TAB
    {
      ref.txtterimadari.focus();
      e.preventDefault();
    }
  }

  render() 
  {
    const { classes } = this.props;
    const title = brand.name + ' - Table';
    const description = brand.desc;
    let itemsRow = [], itemsCol = [], itemsContent;  
    let lastTabIndex = 9, width;

    for (let row = 0;row<this.maxRow; row++)
    {
      itemsCol = [];
      for (let col = 0;col<this.maxCol; col++)
      {
        if(row < this.maxData )
        {
          width = 100; itemsContent = [];
          if(row == rowFocus && col == colFocus && this.state['editing' + row + col])
          {
            itemsContent.push(
              <TbTextInput 
                id={'tbtxt' + row + col} 
                type="text" 
                width="98%"
                key={'ii' + row + col}
                value={this.state['val' + row + col]}
                onBlur={(value) => this.handleBlur(row, col, value)}
                onKeyDown={(e, value, def) => this.tdOnKeyDown(e, row, col, value)}/>);
          }
          else
            itemsContent.push(<TbLabel id={'tbtxt' + row + col} key={'ii' + row + col} value={this.state['val' + row + col]} width={width} />);
          
          itemsCol.push(
            <TableCell 
              id={'td' + row + col} 
              style={{padding:"0", margin: '0'}} 
              tabIndex = {9}
              width={width + "px"}
              onClick={() => this.tdClick(row, col)} 
              onDoubleClick={() => this.tdDblClick(row, col)} 
              key={'i' + row + col}>{itemsContent}</TableCell>);
        }
        else
          itemsCol.push(<TableCell key={'i' + row + col} onClick={() => this.tdClick(row, col)} ref={this.setRef}></TableCell>);
      }
      itemsRow.push(<TableRow key={'tr' + row}>{itemsCol}</TableRow>);
    }
    
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        
        <PapperFix title="CRUD" icon="ios-arrow-round-forward" desc="CRUD">
          
          <Grid container>
            <Grid item xs={12} sm={8}>
              <TxtSearch tabIndex={1} key={1} width='170' marginLabel='17%' id='txtterimadari' label='Terima Dari' onKeyDown={this.handleKeyTerimaDari} setRef={this.setRef} placeholder=''  value={this.state['txtterimadari']} />
              <TxtSearch tabIndex={2} key={2} width='170' marginLabel='17%' id='txtakunkas' label='Akun Kas [D]' setRef={this.setRef} placeholder=''  value={this.state['txtakunkas']} />
              <TxtInput tabIndex={3} key={3} width='200' marginLabel='17%' id='txturaian' label='Uraian' onKeyDown={this.handleKeyUraian} setRef={this.setRef} placeholder=''  value={this.state['txturaian']} />
            </Grid>
            <Grid item xs={12} sm={4} style={{paddingLeft:'0px'}}>
              <TxtInput tabIndex={++lastTabIndex} key={lastTabIndex} type='date' width='200' marginLabel='100px' id='txttanggal' label='Tanggal' onKeyDown={this.handleKeyTanggal} setRef={this.setRef} placeholder=''  value={this.state['txttanggal']} />
              <TxtNoTransaksi  tabIndex={++lastTabIndex} key={lastTabIndex} width='140' marginLabel='100px' id='txtntoransaksi' label='No Transaksi' setRef={this.setRef} placeholder=''  value={this.state['txtntoransaksi']} />
              <Grid container>
                <Grid item xs={12} sm={8}>
                  <TxtSearch tabIndex={++lastTabIndex} key={lastTabIndex} width='70' marginLabel='100px' id='txtuang' label='Uang' setRef={this.setRef} placeholder=''  value={this.state['txtuang']} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TxtInput tabIndex={++lastTabIndex} key={lastTabIndex} width='55' marginLabel='43px' id='txtkurs' label='Kurs' setRef={this.setRef} placeholder=''  value={this.state['txtkurs']} />
                </Grid>
              </Grid>
              <TxtComboBox tabIndex={++lastTabIndex} key={lastTabIndex} width='200' marginLabel='100px' id='txtprogress' label='Progress' onKeyDown={this.handleKeyProgress} setRef={this.setRef} placeholder=''  value={this.state['txtprogress']} />
            </Grid>
          </Grid>
          <RootRef rootRef={ref.tbData}>
            <Table key={9} id='table' className={classNames(classes.table, classes.stripped, classes.bordered, classes.hovertd)}
              onKeyDown={this.tableOnKeyDown} ref="tb" style={{margin:0}}>
              <TableHead>
                <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>No Akun</TableCell>
                      <TableCell>Nama Akun</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Foreign Amount</TableCell> 
                      <TableCell>Note</TableCell>
                      <TableCell>Cost Center</TableCell>
                      <TableCell>Divisi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {itemsRow}
              </TableBody>
            </Table>
          </RootRef>
          
        </PapperFix>
      </div>
    );
  }
}

export default withStyles(styles)(CR);