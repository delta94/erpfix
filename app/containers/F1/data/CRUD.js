import React from 'react';
import { connect } from 'react-redux';
import { Notification, PapperBlock } from 'dan-components';
import { Pagination } from 'dan-components';
import Form from 'dan-components/Tables/tableParts/Form';
import FormFilter from 'dan-components/Tables/tableParts/FormFilter';
import MainTableForm from 'dan-components/Tables/tableParts/MainTableForm';
import FloatingPanel from 'dan-components/Panel/FloatingPanel';
import PanelFilterData from 'dan-components/Panel/PanelFilterData';
import { HotKeys } from "react-hotkeys";

class CRUD extends React.Component 
{
  constructor(props) 
  {
    super(props);
    primaryKey = props.params.primaryKey;
    source     = props.params.source;

    this.showDataPage(1, '');

    this.setTextInputRef = (element) => 
    {
      if(element)
        refData[element.id] = element;
    };
    refData.filter = {};
    this.setRefFilter = (element) => 
    {
      if(element)
        refData.filter[element.id] = element;
    };
  }

  componentWillMount() 
  {
    const { setDefault} = this.props;
    setDefault();
  }

  showDataPage = (page, filter) => 
  {
    const { params, fetchData } = this.props;
    const { sort, limit } = params;
    filter = (filter == undefined) ? '' : filter; 
    fetchData({ filter, sort, page, limit });
  }

  keyMap = {
    ctrl_r: "ctrl+r",
    ctrl_b: "ctrl+b",
    ctrl_f: "ctrl+f",
    ctrl_shif_f: "ctrl+shift+f",
  };
  
  handlers = {
    ctrl_r: event => 
    {
      this.showDataPage(1, '');
      event.preventDefault()
    },
    ctrl_b: event => 
    {
      const { addNew, closeForm, dataTable, openForm } = this.props;
      if(!openForm)
      {
        addNew(dataTable);
      }
      else
      {
        closeForm();
      }
      event.preventDefault()
    },
    ctrl_f: event => 
    {
      const { valSearchField, setSearchGlobal } = this.props;
      setSearchGlobal(true, true, valSearchField);
      event.preventDefault()
    },
    ctrl_shif_f: event => 
    {
      const { addNewFilter, dataColumn } = this.props;
      addNewFilter(dataColumn);
      event.preventDefault()
    },
  };

  componentDidUpdate(prevProps) 
  {
    const { editingId, params, openForm, openFormFilter } = this.props;
    const { inputFilter, inputForm } = params;

    if(!openForm && prevProps.openForm)
    {
      refData.divCRUD.focus();
    }
    
    if(openForm && !prevProps.openForm)
    {
      if(editingId === '')
      {
        refData.divForm.focus();
        refData[primaryKey].focus();
      }
      else
      {
        for (const [index, value] of inputForm.entries())
          if((value.id !== primaryKey))
          {
            refData.divForm.focus();
            refData[value.id].focus();
            break;
          }
      }
    }
    
    if(openFormFilter && !prevProps.openFormFilter)
    {
      refData.filter.divFormFilter.focus();
      refData.filter[inputFilter[0].id].focus();
    }
  }

  render() 
  {
    const { params, openFormFilter, closeFormFilter, addNewFilter, submitForm, last_page, isSubmitting, editingId,
            addNew, closeForm, removeRow, editRow, dataTable, openForm, initValues, closeNotif, messageNotif,
            showSearchField, isFocusedField, valSearchField, setSearchGlobal } = this.props;
    const { dataColumn, inputFilter } = params;
    page = this.props.page;
    limit = this.props.limit;
    return (
      <div id="divCRUD" ref={this.setTextInputRef}>
        <HotKeys keyMap={this.keyMap} handlers={this.handlers}>
          <PapperBlock title="CRUD" icon="ios-arrow-round-forward" desc="CRUD">
            <Notification close={() => closeNotif()} message={messageNotif} />
            
            <FloatingPanel openForm={openForm} closeForm={closeForm} editingId={editingId} setRef={this.setTextInputRef}>
              <Form submitForm={submitForm} openForm={openForm} initValues={initValues} closeForm={closeForm} editingId={editingId} isSubmitting={isSubmitting} 
                    params={params} setRef={this.setTextInputRef}/>
            </FloatingPanel>

            <PanelFilterData openFormFilter={openFormFilter} closeFormFilter={closeFormFilter} setRef={this.setRefFilter}>
              <FormFilter inputFilter={inputFilter} closeFormFilter={closeFormFilter} showDataPage={this.showDataPage} setRef={this.setRefFilter}/>
            </PanelFilterData>

            <MainTableForm params={params} addNew={addNew} addNewFilter={addNewFilter} items={dataTable} 
              removeRow={removeRow} editRow={editRow} anchor={dataColumn} showDataPage={this.showDataPage}
              showSearchField={showSearchField} isFocusedField={isFocusedField} setSearchGlobal={setSearchGlobal}
              valSearchField={valSearchField} setRef={this.setTextInputRef} />
                    
            <Pagination curpage={page} totpages={last_page} boundaryPagesRange={1} siblingPagesRange={1} hideEllipsis={false} onChange={this.showDataPage}/> 
          </PapperBlock>
        </HotKeys>
      </div>
    );
  }
}

const branch   = 'crudTbFrmDemo';
let primaryKey = '';
let source     = '';
let page       = '';
let limit      = '';
let refData    = {};

const mapStateToProps = state => ({
  isSubmitting: state.getIn([branch, 'isSubmitting']),
  initValues: state.getIn([branch, 'formValuesInput']),
  dataTable: state.getIn([branch, 'dataTable']),
  openForm: state.getIn([branch, 'showFrm']),
  openFormFilter: state.getIn([branch, 'showFrmFilter']),
  messageNotif: state.getIn([branch, 'notifMsg']),
  editingId: state.getIn([branch, 'editingId']),
  page: state.getIn([branch, 'page']),
  limit: state.getIn([branch, 'limit']),
  last_page: state.getIn([branch, 'last_page']),
  showSearchField: state.getIn([branch, 'showSearchField']),
  isFocusedField: state.getIn([branch, 'isFocusedField']),
});

const mapDispatchToProps = dispatch => ({
  fetchData: (pagging) => dispatch({ type: `${branch}/GET_DATA`, branch, pagging, source, primaryKey }),
  submitForm: (newData, editingId) => dispatch({ type: `${branch}/SUBMIT_DATA`, branch, newData, editingId, source, primaryKey }),
  addNew: (anchor) => dispatch({ type: `${branch}/ADD_NEW`, branch, anchor }),
  addNewFilter: (anchor) => dispatch({ type: `${branch}/ADD_NEW_FILTER`, branch, anchor }),
  closeForm: () => dispatch({ type: `${branch}/CLOSE_FORM`, branch }),
  closeFormFilter: () => dispatch({ type: `${branch}/CLOSE_FORM_FILTER`, branch }),
  removeRow: (item) => dispatch({ type: `${branch}/REMOVE_ROW_FORM`, branch, item, pagging:{page, limit}, source, primaryKey }),
  editRow: (item) => dispatch({ type: `${branch}/EDIT_ROW_FORM`, branch, item}),
  closeNotif: () => dispatch({ type: `${branch}/CLOSE_NOTIF`, branch }),
  setDefault: () => dispatch({ type: `${branch}/SET_DEFAULT`, branch }),
  setSearchGlobal: (showSearchField, isFocusedField, valSearchField) => dispatch({ type: `${branch}/SET_SEARCH_GLOBAL`, branch, showSearchField, isFocusedField, valSearchField}),
});

export default connect(mapStateToProps, mapDispatchToProps)(CRUD);