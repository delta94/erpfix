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
import Dialog from '@material-ui/core/Dialog';
import { API } from '../../service';
import { fromJS, List } from 'immutable';

let ref    = {};
let rowIndex = 0;
let rowOver = 0;
let isOver = false;
let init = false;

class CompSearch extends React.Component
{
  maxData = 0;
  focus = {};

  constructor(props, context) 
  {
    super(props, context);

    ref.tb = React.createRef();
    this.state = {
      target: props.target,
      txtsearch: props.txtsearch, dataTable: List([]), title: '',
      header: '', notifMsg: '',  count:0, page:1, limit:4, last_page:1
    }
  }
  
  setRef = e => {if(e) ref[e.id] = e;};
  
  componentWillReceiveProps = (nextProps) =>
  {
    // OPENING
    const {source, current, filter} = nextProps;
    if(!this.props.open && nextProps.open)
    {
      init = true;
      API.GETDATA_COMPSEARCH({target: 'txtsearch', filter, filterSearch: (current)?current:'', page:1, limit: 10, source, operator: 'contains', column: 'All'}).then(this['API_Result']);  
    } 
  }

  shouldComponentUpdate = (nextProps) =>
  {
    // CLOSING
    if(this.props.open && !nextProps.open)
    {
      this.setState({title: '', header: [], dataTable: fromJS([]), count: 1, page: 1, limit: 1, last_page: 1, txtsearch: ''});
      return false;
    }

    return true;
  }

  componentDidUpdate = () =>
  {    
    if(ref.tb.current === null || !this.props.open)
      return;

      
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
          if(i < this.maxData)
          {
            ref[`tr${i}`].addEventListener("dblclick", () =>
              { 
                this.props.SetVariable({success: true, target: this.props.target, data: this.state.dataTable.get(i)});
                this.props.onClose({target:'cs', success: true});
              });
          }
        }
      }
  
      ref.cmbcolumn.onkeydown = this.handleKeyFirstTabIndex;
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
  
      if(this.maxData > 0)
        this.setRowIndex(0);
    }
    
    this.setFocus(ref.txtsearch);
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
      for (let i in this.focus.arrRef)
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
    if(row >= this.maxData)
      return;

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
    const { classes } = this.props;
    if(row < this.maxData)
    {
      isOver = true;
      rowOver = parseInt(row);
  
      if(parseInt(rowOver) !== parseInt(rowIndex))
        ref[`tr${row}`].className = classes.trHover;
    }
  }

  tableOnMouseLeave = () =>
  {
    if(rowOver < this.maxData)
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

  handleClose = () =>
  {
    this.props.SetVariable({success: false, target: this.props.target, data: []});
    this.props.onClose({target:'cs', success: false});
  }

  searchKeyDown = (e) =>
  {
    switch(e.key) 
    {       
      case 'ArrowDown': 
        if(rowIndex < this.maxData)
        {
          this.nextFocus();
          this.setRowIndex(rowIndex);
          e.preventDefault();
        }
        break;
      case 'Enter': 
        if(ref.txtsearch.value === '')
        {
          this.nextFocus();
          this.setRowIndex(rowIndex);
        }
        else
        {
          this.showDataPage(1);
        }
        e.preventDefault();
        break;
      case 'Escape': 
        this.handleClose;
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
      case 'Home': 
        this.showDataPage(1)
        break;
      case 'End': 
        this.showDataPage(this.state.last_page)
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
          if(rowIndex < this.maxData)
          {
            if (rowIndex+1 >= this.maxData)
              return;
              
            // reset current prev Focus
            this.resetCurrentPrevFocus(rowIndex);

            // set nextFocus
            this.setRowIndex((rowIndex+1));
          }
        break;
      case 'Enter': 
          this.handleClickChoose();
        break;
      case 'Escape': 
          this.handleClose();
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
  
  showDataPage = (page) => 
  {
    const { source } = this.props;
    let column = ref.cmbcolumn[ref.cmbcolumn.selectedIndex].value;
    let operator = ref.cmboperator[ref.cmboperator.selectedIndex].value;
    API.GETDATA_COMPSEARCH({target:'txtsearch', filter:'', filterSearch: ref.txtsearch.value, page, limit: 10, source, operator, column}).then(this['API_Result']);    
  }

  API_Result = (param) =>
  {
    const {success, data, target} = param;
    if(success)
    {
      switch(target)
      {
        case 'txtsearch':
          let dataTable = data.data;
          let no = (dataTable.current_page*dataTable.per_page)-dataTable.per_page;
          dataTable.data.map((val, i) => {
            dataTable.data[i]['no'] = (i+1+no);
          });

          if(init)
          {
            this.setState({
              title: data.title || '', 
              header: data.header || [], 
              dataTable: fromJS(dataTable.data)  || fromJS([]),
              count: dataTable.total || 1,
              page: dataTable.current_page || 1,
              limit: dataTable.per_page || 1,
              last_page: (dataTable.last_page==0) ? 1 : dataTable.last_page,
              txtsearch: this.props.current || ''
            });
          }
          else
          {
            this.setState({
              title: data.title || '', 
              header: data.header || [], 
              dataTable: fromJS(dataTable.data) || fromJS([]),
              count: dataTable.total || 1,
              page: dataTable.current_page || 1,
              limit: dataTable.per_page || 1,
              last_page: (dataTable.last_page==0) ? 1 : dataTable.last_page,
            });
          }
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

  handleClickChoose = () =>
  {
    if(this.state.dataTable.get(rowIndex))
    {
      this.props.SetVariable({success: true, target: this.props.target, data: this.state.dataTable.get(rowIndex)});
      this.props.onClose({target:'cs', success: true});
    }
    else
      alert('Select data first');
  }

  render()
  {
    const { classes } = this.props;
    const { title, header, dataTable, page, last_page } = this.state;
    const childDataColumn = [<option key={'All'} value='All'>All</option>]; 
    let label, value;
    for(let i in header)
    {
      value = header[i][0];
      label = header[i][1];
      childDataColumn.push(<option key={value} value={value}>{label}</option>);
    } 

    const arrOperator = ['contains', '=', '!=', '<', '<=', '>', '>=', 'begin with', 'end with'];
    const childDataOperator = [];
    for(let c in arrOperator)
    {
      childDataOperator.push(<option key={arrOperator[c] + c} value={arrOperator[c]}>{arrOperator[c]}</option>);
    }

    const headerCell = [<TableCell key={'hcellno00'} align='center'>No</TableCell>];
    const content = [];

    // Header
    let alignCase, alignOpsion;
    for( let i in header)
    {
      alignOpsion = parseInt((header[i][3]) ? 0 : header[i][3]);
      switch(alignOpsion)
      {
        case 0: alignCase = 'left';break;
        case 1: alignCase = 'center';break;
        case 2: alignCase = 'right';break;
        default: alignCase = 'left';
      }

      headerCell.push(<TableCell key={'hcell' + i} align={alignCase}>{header[i][1]}</TableCell>);
    }

    // Content
    let width = 0;
    dataTable.map((item, index) => 
    {
      let cell = [<TableCell key={'cellno' + item.get('no')} width='50' align='center'>{item.get('no')}</TableCell>];

      for( let c in header)
      {
        alignOpsion = parseInt((header[c][3]) ? 0 : header[c][3]);
        switch(alignOpsion)
        {
          case 0: alignCase = 'left';break;
          case 1: alignCase = 'center';break;
          case 2: alignCase = 'right';break;
          default: alignCase = 'left';
        }
        width = header[c][2];
        if(width === -1)
          cell.push(<TableCell key={'cell' + (index+c)} align={alignCase}>{item.get(header[c][0])}</TableCell>);
        else
          cell.push(<TableCell key={'cell' + (index+c)} align={alignCase} width={header[c][2]}>{item.get(header[c][0])}</TableCell>);
      }

      content.push(<TableRow key={'row' + index}  disabled={true}>{cell}</TableRow>);
    })

    for(let i = content.length ;i<10; i++)
    {
      let cell = [<TableCell key={'cellno' + i} width='50' align='center' height='10'/>];
      for( let c in header)
      {
        width = header[c][2];
        if(width === -1)
          cell.push(<TableCell key={'cell' + (i+c)} />);
        else
          cell.push(<TableCell key={'cell' + (i+c)} width={header[c][2]}/>);
      }
      content.push(<TableRow key={'row' + i}  disabled={true}>{cell}</TableRow>);
    }

    this.maxData = dataTable.size; 

    return (
      <Dialog fullWidth={true} maxWidth = {'md'} open={this.props.open} onClose={this.handleClose} children="kosong" PaperComponent={DialogPaper}>
          <DialogTitle id="draggable-dialog-title" style={{margin:0, padding:'10px 0 5px 20px', cursor: 'move'}}>
            Cari {title}
          </DialogTitle>
          <DialogContent style={{margin: 0, padding: '0 10px 10px 10px'}}>
            <div style={{display: 'flex', marginBottom:'30px'}}>
              <div style={{height: '20px', width: '120px'}}>
                <select id='cmbcolumn' key='cmbcolumn' name='cmbcolumn' className="text-input" tabIndex={81} key={81}
                  style={{height: '35px', width: `100%`, textAlign: 'center'}} 
                  ref={this.setRef} title='Column'>
                  {childDataColumn}
                </select>
              </div>
              <div style={{height: '20px', marginLeft: '10px',width: '120px'}}>
                <select id='cmboperator' key='cmboperator' name='cmboperator' className="text-input" tabIndex={82} key={82}
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
                <IconButton id="btnsearch" title='Search' className={classes.btn} onClick={() => this.showDataPage(1)}>
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
          
          <div style={{marginTop: '-20px', width: '75%'}}>
            <Pagination curpage={page} totpages={last_page} boundaryPagesRange={1} siblingPagesRange={1} hideEllipsis={false} onChange={this.showDataPage}/> 
          </div>
          <DialogActions style={{margin: 0, padding: 0, marginTop: '-35px'}}>
            {/* <Button onClick={this.focusTable} color="primary">
              Add New
            </Button> */}
            <Button onClick={this.handleClickChoose} color="primary">
              Choose
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

export default withStyles(styles)(CompSearch);

class CompInput extends React.Component 
{
  constructor(props, context) 
  {
    super(props, context);
    this.state = {val: props.val || '', blur:true}
  }

  componentWillReceiveProps = (nextProps) =>
  {
    if(init)
    {
      init = false;
      this.setState({val:nextProps.val || ''});
    }
  }

  render() 
  {
    const {id,onChange,width,onKeyDown,setRef,onBlur, tabIndex, keyProp, ...props} = this.props;
    return (
      <input
        type="text"
        value={this.state.val || ''} 
        ref={setRef || null} 
        onChange={(e) => this.setState({val:e.target.value || '', blur:true})} 
        onKeyDown={onKeyDown}
        autoFocus={true} {...props} tabIndex={tabIndex} 
        key={keyProp} 
        label='Search' style={{width: `100%`}} id={id} className="text-input" autoFocus={true} placeholder='Filter in here'/>
      );
  }
}

const DialogPaper = (props) => 
{
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}