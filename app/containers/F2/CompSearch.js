import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RootRef from '@material-ui/core/RootRef';
import styles from 'fix-components/Tables/tableStyle-jss';
import Pagination from 'fix-components/Pagination/Pagination';
import { connect } from 'react-redux';
import { API } from '../../service';
import { fromJS, List } from 'immutable';

let ref    = {};
let rowIndex = 0;
let rowOver = 0;
let isOver = false;

class CompSearch extends React.Component
{
  maxData = 0;
  focus = {};


  constructor(props, context) {
    super(props, context);

    ref.tb = React.createRef();
    this.state = {
      id: props.id,
      txtsearch: props.txtsearch, dataTable: List([]), title: '',
      header: '', notifMsg: '',  count:0, page:1, limit:4, last_page:1
    }
  }

  btnSearchClick = (value) =>
  {
    const {header} = this.state;
    const val = (value === undefined) ? ref.txtsearch.value : value;
    let filter = '';
    for(let i in header)
    {
      if(filter !== '') filter += ' OR ';
      filter += `${header[i][0]} LIKE '%${val}%'`;
    } 
    this.showDataPage(1, filter);
  }
  

  componentDidUpdate = () =>
  {
    ref.tbData = ref.tb.current;
    ref.tr = ref.tbData.children[1].children;
    
    if(ref.tr.length !== 0)
    {
      for ( let i in ref.tr)
      {
        if(typeof ref.tr[i] == 'object')
        {
          ref[`tr${i}`] = ref.tr[i]; 
          ref[`tr${i}`].className = (i%2 == 0) ? this.props.classes.tdWhite : this.props.classes.tdReset;
          
          ref[`tr${i}`].addEventListener("mouseover", () => this.tableOnMouseOver(i));
          ref[`tr${i}`].addEventListener("mouseleave", this.tableOnMouseLeave);
          ref[`tr${i}`].addEventListener("click", () => this.tdClick(i));
          ref[`tr${i}`].addEventListener("dblclick", () =>
            { 
              this.props.SetVariable({succes: true, target: this.props.id, data: this.state.dataTable.get(i)});
              this.props.onClose();
            });
        }
      }
  
      ref.txtcolumn.onkeydown = this.handleKeyFirstTabIndex;
      ref.tbData.onkeydown = this.tableOnKeyDown;
  
      this.focus.arrRef = [];
      for ( let n in ref)
      {
        if(ref[n].tabIndex !== undefined)
        {
          if(parseInt(ref[n].tabIndex) >= 0)
          {
            this.focus.arrRef.push({index: ref[n].tabIndex, id: ref[n].id});
          }
        }
      }
      
      this.focus.max = this.focus.arrRef.length;
      this.focus.arrRef.sort((a, b) => parseInt(a.index) - parseInt(b.index));
      this.focus.minIndex = this.focus.arrRef[0].index;
      this.focus.maxIndex = this.focus.arrRef[this.focus.max-1].index;
  
      this.setRowIndex(0);
    }
    
    this.setFocus(ref.txtsearch);
    // ref.txtsearch.focus();
  }

  setFocus = (id) =>
  {
    this.focus.curId = id;
    this.focus.curIndex = id.tabIndex;
    id.focus();
  }

  nextFocus = () =>
  {
    let nextId;
    if(this.focus.curIndex >= this.focus.maxIndex)
    {
      ref[this.focus.arrRef[0].id].focus();
    }
    else
    {  
      for ( let i in this.focus.arrRef)
      {
        if(i == this.focus.max-1)
        {
          this.setFocus(ref[this.focus.arrRef[0].id]);
        }
        else if(this.focus.arrRef[i].index === this.focus.curIndex)
        {
          nextId = this.focus.arrRef[(parseInt(i)+1)].id;
          this.setFocus(ref[nextId]);
          break;
        }
      }
    }
  }

  prevFocus = () =>
  {
    let prevId;
    if(this.focus.curIndex == this.focus.minIndex)
    {
      ref[this.focus.arrRef[this.focus.maxIndex].id].focus();
    }
    else
    {  
      for ( let i in this.focus.arrRef)
      {
        if(this.focus.arrRef[i].index == this.focus.curIndex)
        {
          prevId = this.focus.arrRef[(parseInt(i)-1)].id;
          this.setFocus(ref[prevId]);
          break;
        }
        else if(i == 0)
        {
          this.setFocus(ref[this.focus.arrRef[this.focus.max-1].id]);
        }
      }
    }
  }
  
  setRef = e => 
  {
    if(e)
      ref[e.id] = e;
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
    ref.tbData.focus();
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
  
  handleKeyFirstTabIndex = e =>
  {
    if(e.key === 'Tab' && e.shiftKey)  // SHIFT + TAB
    {
      this.prevFocus();
      e.preventDefault();
    }
  }

  searchKeyDown = (e) =>
  {
    switch(e.key) 
    {       
      case 'ArrowDown': 
        this.nextFocus();
        this.setRowIndex(rowIndex);
        e.preventDefault();
        break;
      case 'Enter': 
        this.btnSearchClick();
        e.preventDefault();
        break;
      case 'Escape': 
        this.props.onClose();
        break;
      case 'PageUp': 
        if(this.state.page > 1)
        {
          this.showDataPage(parseInt(this.state.page)-1)
        }
        break;
      case 'PageDown': 
        if(this.state.page < this.state.last_page)
        {
          this.showDataPage(parseInt(this.state.page)+1)
        }
        break;
    }
  }

  focusTable = () =>
  {
    this.setFocus(ref.tbData);
  }

  // User navigates table using keyboard
  tableOnKeyDown = e => 
  {
    switch(e.key) 
    {        
      case 'Tab':
        if(!e.shiftKey)
        {
          this.nextFocus();
          e.preventDefault();
        }
        else if(e.shiftKey)
        {
          this.prevFocus();
          e.preventDefault();
        }
        break;
      case 'ArrowUp': 
          if (rowIndex-1 < 0)
          {
            this.prevFocus();
            e.preventDefault();
            return;
          }
          // reset current prev Focus
          this.resetCurrentPrevFocus(rowIndex);

          // set nextFocus
          this.setRowIndex((rowIndex-1));
        break;
      case 'ArrowDown': 
          if (rowIndex+1 >= this.maxData)
            return;
            
          // reset current prev Focus
          this.resetCurrentPrevFocus(rowIndex);

          // set nextFocus
          this.setRowIndex((rowIndex+1));
        break;
      case 'Enter': 
          this.props.SetVariable({succes: true, target: this.props.id, data: this.state.dataTable.get(rowIndex)});
          this.props.onClose();
        break;
      case 'Escape': 
          this.props.onClose();
        break;
      case 'PageUp': 
        if(this.state.page > 1)
        {
          this.showDataPage(parseInt(this.state.page)-1)
        }
        break;
      case 'PageDown': 
        if(this.state.page < this.state.last_page)
        {
          this.showDataPage(parseInt(this.state.page)+1)
        }
        break;
      default:
        e.preventDefault();
    }
    
  };
  
  showDataPage = (page, filter2) => 
  {
    const { header } = this.state;
    const val = ref.txtsearch.value
    let filter = '';
    for(let i in header)
    {
      if(filter !== '') filter += ' OR ';
      filter += `${header[i][0]} LIKE '%${val}%'`;
    } 
    API.GET_DATA_SEARCH({target: 'txtsearch', filter, page, limit: 10, source}).then(this['API_Result']);    
  }

  API_Result = (param) =>
  {
    const {succes, data, target} = param;
    if(succes)
    {
      switch(target)
      {
        case 'txtsearch':
          let dataTable = data.data;
          let no = (dataTable.current_page*dataTable.per_page)-dataTable.per_page;
          dataTable.data.map((val, i) => {
            dataTable.data[i]['no'] = (i+1+no);
          });
          this.setState({
            title: data.title, 
            header: data.header, 
            dataTable: fromJS(dataTable.data),
            count: dataTable.total,
            page: dataTable.current_page,
            limit: dataTable.per_page,
            last_page: (dataTable.last_page==0) ? 1 : dataTable.last_page,
          });
          break;
      }
    }
    else
    {
      this.setState({
        dataTable: List([]), title: '',
        header: '', notifMsg: '',  count:0, page:1, limit:4, last_page:1
      });
    }
  }

  handleBlur = (id, value) =>
  {
    this.setState({[id] : value});
  }

  render()
  {
    const { classes } = this.props;
    const { page, last_page, txtsearch } = this.state;
    const { title, header, dataTable } = this.state;
    const childDataColumn = [<option key={value + '@' + 'All'} value={value}>All</option>]; 
    let label, value;
    for(let i in header)
    {
      value = header[i][0];
      label = header[i][1];
      childDataColumn.push(<option key={value + '@' + label} value={value}>{label}</option>);
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
    const childDataOperator = [];
    for(let c in arrOperator)
    {
      value = arrOperator[c].value;
      label = arrOperator[c].label;
      childDataOperator.push(<option key={label + '@' + c} value={value}>{label}</option>);
    }

    const headerCell = [<TableCell key={'hcellno00'} align='center'>No</TableCell>];
    const content = [];

    // Header
    for( let i in header)
    {
      headerCell.push(<TableCell key={'hcell' + i} align={header[i][3]}>{header[i][1]}</TableCell>);
    }

    // Content
    let width = 0;
    dataTable.map((item, index) => 
    {
      let cell = [<TableCell key={'cellno' + item.get('no')} width='50' align='center'>{item.get('no')}</TableCell>];

      for( let c in header)
      {
        width = header[c][2];
        if(width === -1)
          cell.push(<TableCell key={'cell' + (index+c)} align={header[c][3]}>{item.get(header[c][0])}</TableCell>);
        else
          cell.push(<TableCell key={'cell' + (index+c)} align={header[c][3]} width={header[c][2]}>{item.get(header[c][0])}</TableCell>);
      }

      content.push(<TableRow key={'row' + index}  disabled={true}>{cell}</TableRow>);
    })

    this.maxData = content.length; 

    return (
      <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper>
          <DialogTitle id="draggable-dialog-title" style={{margin:0, padding:'10px 0 5px 20px', cursor: 'move'}}>
            Cari {title}
          </DialogTitle>
          <DialogContent style={{margin: 0, padding: '0 10px 10px 10px'}}>
            <div style={{display: 'flex', marginBottom:'30px'}}>
              <div style={{height: '20px', width: '120px'}}>
                <select id='txtcolumn' key='txtcolumn' name='txtcolumn' className="text-input" tabIndex={81} key={81}
                  style={{height: '35px', width: `100%`, textAlign: 'center'}} 
                  ref={this.setRef} title='Column'>
                  {childDataColumn}
                </select>
              </div>
              <div style={{height: '20px', marginLeft: '10px',width: '120px'}}>
                <select id='txtoperator' key='txtoperator' name='txtoperator' className="text-input" tabIndex={82} key={82}
                  style={{height: '35px', width: `100%`, textAlign: 'center'}} 
                  ref={this.setRef} title='Operator'>
                  {childDataOperator}
                </select>
              </div>
              <div style={{height: '20px', marginLeft: '10px', width: `calc(100% - 50px - 130px - 130px)`}}>
                <CompInput tabIndex={83} keyProp={83} setRef={this.setRef} val={this.state.txtsearch}
                  onBlur={(value) => this.handleBlur('txtsearch', value)} id='txtsearch'
                  onKeyDown={this.searchKeyDown}/>
              </div>
              <div style={{height: '20px', width: '50px'}}>
                <IconButton id="btnsearch" title='Search' className={classes.btn} onClick={this.btnSearchClick}>
                  <Icon className={classes.icon}>search</Icon>
                </IconButton>
              </div>
            </div>
            
            <RootRef rootRef={ref.tb}>
              <Table id="tbData" key={84} tabIndex={84} style={{margin:0}}
                className={classNames(classes.table, classes.bordered, classes.small)}>
                <TableHead><TableRow>{headerCell}</TableRow></TableHead>
                <TableBody>{content}</TableBody>
              </Table>
            </RootRef>
          </DialogContent>
          <div style={{float: 'left', marginTop: '-20px'}}>
            <Pagination curpage={page} totpages={last_page} boundaryPagesRange={1} siblingPagesRange={1} hideEllipsis={false} onChange={this.showDataPage}/> 
          </div>
          <DialogActions style={{margin: 0, padding: 0, border: '10px'}}>
            <Button onClick={this.focusTable} color="primary">
              Add New
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Choose
            </Button>
            <Button onClick={this.props.onClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Paper>
      </Draggable>
    );
  }
}

const branch   = 'compSearch';
let primaryKey = '';
let source     = 'contact';

const mapStateToProps = state => ({
  txtsearch: state.getIn([branch, 'txtsearch']),
  cmbcolumn: state.getIn([branch, 'cmbcolumn']),
  cmboperator: state.getIn([branch, 'cmboperator']),
  dataTable: state.getIn([branch, 'dataTable']),
  title: state.getIn([branch, 'title']),
  header: state.getIn([branch, 'header']),
  page: state.getIn([branch, 'page']),
  last_page: state.getIn([branch, 'last_page']),
});

const mapDispatchToProps = dispatch => ({
  fetchData: (pagging, txtsearch, cmbcolumn, cmbopeartor) => dispatch({ type: `${branch}/GET_DATA`, branch, pagging, source, primaryKey, txtsearch, cmbcolumn, cmbopeartor}),
  resetData: () => dispatch({ type: `${branch}/RESET_DATA_FORM`, branch}),
});

export default withStyles(styles)(CompSearch);
// const TxtSearch = withStyles(styles)(CompSearch);
// const TxtSearch = connect(mapStateToProps, mapDispatchToProps)(CompSearch);
// export default connect(mapStateToProps, mapDispatchToProps)(TxtSearch);

class CompInput extends React.Component 
{
  constructor(props, context) 
  {
    super(props, context);
    this.state = {val: props.val, blur:true}
  }

  render() 
  {
    const {id,onChange,width,onKeyDown,setRef,onBlur, tabIndex, keyProp, ...props} = this.props;
    return (
      <input
        type="text"
        value={this.state.val} 
        ref={setRef || null} 
        onChange={(e) => this.setState({val:e.target.value, blur:true})} 
        onKeyDown={onKeyDown}
        // onBlur={() => onBlur(this.state.val)}
        autoFocus={true} {...props} tabIndex={tabIndex} 
        key={keyProp} 
        label='Search' style={{width: `100%`}} id={id} className="text-input" autoFocus={true} placeholder='Filter in here'/>
      );
  }
}
