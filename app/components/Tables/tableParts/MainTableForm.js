import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import AddIcon from '@material-ui/icons/Add';
import css from 'dan-styles/Table.scss';
import RowReadOnly from './RowReadOnly';
import styles from '../tableStyle-jss';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';

class MainTableForm extends React.Component 
{
  showData = (val) => 
  {
    const {showDataPage, params} = this.props;
    const filter = (val === '') ? '' : params.paramFilterGlobal(val);
    showDataPage(1, filter);
  }

  handleChange = e => 
  {
    const { showSearchField, setSearchGlobal } = this.props;
    setSearchGlobal(showSearchField, true, e.target.value);
    this.showData(e.target.value);

  }

  handleKeyUp = e =>
  {
    switch(e.keyCode)
    {
      case 13: // Enter
        const { valSearchField, setSearchGlobal } = this.props;
        setSearchGlobal(false, false, valSearchField);
        break;
      case 27: // ESC
        this.showData('');
        this.hideSearch();
        break;
    }
  }

  getSearch = classes => 
  {
    const { isFocusedField, valSearchField } = this.props;

    return (
      <Grid id="div_search" style={{display: 'flex',flexDirection:'row', width:'150%'}}>
        <Icon className={classes.icon} style={{margin:10,marginTop:13 }}>search</Icon>
        <Input id="inp_search" style={{width:'150%', height: 40, marginTop: 5, marginBottom: 5}} autoFocus={isFocusedField} 
          value={valSearchField}
          onChange={this.handleChange}
          key={isFocusedField}
          onBlur={this.deFocus}
          onKeyUp={this.handleKeyUp} /> 
        <IconButton title="Close" className={classes.btn} onClick={() => this.hideSearch()}>
          <Icon className={classes.icon}>close</Icon>
        </IconButton>
      </Grid>
    );
  }

  deFocus = () => 
  {
    const { showSearchField, valSearchField, setSearchGlobal } = this.props;
    setSearchGlobal(showSearchField, false, valSearchField);
  }
  showSearch = () => 
  { 
    const { valSearchField, setSearchGlobal } = this.props;
    setSearchGlobal(true, false, valSearchField);
  }

  hideSearch = () => 
  { 
    const { isFocusedField, setSearchGlobal } = this.props;
    setSearchGlobal(false, isFocusedField, '');
  }

  getTitle = classes => {
    return (
      <div className={classes.title}>
        <Typography variant="h6">CRUD</Typography>
      </div> 
    );
  }

  clickDownloadCSV = () => {}
  clickPrint = () => {}
  clickViewColumn = () => {}

  render() 
  {
    const { setRef, classes, items, removeRow, editRow, addNew, addNewFilter, anchor, width, showSearchField, inputFocus, setInputFocus} = this.props;
    const getHead = dataArray => dataArray.map((item, index) => 
      {
        if (!item.hidden) 
          return (
            <TableCell padding="none" key={index.toString()} width={item.width}>{item.label}</TableCell>
          );
        return false;
      }
    );

    const getItems = dataArray => 
      dataArray.map(item => (
        <RowReadOnly item={item} removeRow={() => removeRow(item)} key={item.get('id')} editRow={() => editRow(item)} anchor={anchor}/>
      ));

    const addIcon = (title, idIcon, handleClick) => 
    {
      return (
        <IconButton title={title} className={classes.btn} onClick={handleClick} >
          <Icon className={classes.icon}>{idIcon}</Icon>
        </IconButton>
      )
    };

    return (
      <div id="divMainTableForm" ref={setRef}>
        <Toolbar className={classes.toolbar} >
          {(showSearchField) ? this.getSearch(classes) : this.getTitle(classes)}
          <div className={classes.spacer} />
          {addIcon('Search', 'search', () => this.showSearch())}
          {addIcon('Download CSV', 'cloud_download', () => this.clickDownloadCSV())}
          {addIcon('Print', 'print', () => this.clickPrint())}
          {addIcon('View Column', 'view_column', () => this.clickViewColumn())}
          {addIcon('Filter', 'filter_list', () => addNewFilter(anchor))}
          {addIcon('Show Data', 'refresh', () => this.showData(''))}
          <div className={classes.actions}>
            <Tooltip title="Add Item">
              <Button variant="contained" onClick={() => addNew(anchor)} color="secondary" className={classes.button}>
                <AddIcon className={classNames(isWidthUp('sm', width) && classes.leftIcon, classes.iconSmall)} />
                {isWidthUp('sm', width) && 'Add New'}
              </Button>
            </Tooltip>
          </div>
        </Toolbar>

        <div className={classes.rootTable}  style={{marginTop: 0, border: 1}}>
  

          <Table className={classNames(css.tableCrud, classes.table, classes.stripped)}>
            <TableHead><TableRow>{ getHead(anchor) }</TableRow></TableHead>
            <TableBody>{getItems(items)}</TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withWidth()(withStyles(styles)(MainTableForm));