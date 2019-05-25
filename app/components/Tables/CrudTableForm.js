import React from 'react';
import Form from './tableParts/Form';
import FormFilter from './tableParts/FormFilter';
import MainTableForm from './tableParts/MainTableForm';
import FloatingPanel from '../Panel/FloatingPanel';
import PanelFilterData from '../Panel/PanelFilterData';
import { submitAction } from '../../actions/CrudTbFrmActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CrudTableForm extends React.Component
{
  sendValues = (values) => 
  {
    const { submitabc, branch, editingId, source, primaryKey } = this.props;
    submitabc(values, branch, editingId, source, primaryKey);
  }

  render() 
  {
    const {params, page,openFormFilter,closeFormFilter,addNewFilter,source,primaryKey,inputFilter,inputForm,isSubmitting,
      limit,title,dataTable,openForm,closeForm,removeRow,addNew,editRow,anchor,branch,initValues, editingId,fetchData} = this.props;
      console.log(`render CrudTableForm`);
    return (
      <div>
        <FloatingPanel openForm={openForm} branch={branch} closeForm={closeForm} editingId={editingId}>
          <Form sendValues={this.sendValues} initValues={initValues} branch={branch} closeForm={closeForm} branch={branch} isSubmitting={isSubmitting} inputForm={inputForm}/>
        </FloatingPanel>
        <PanelFilterData openFormFilter={openFormFilter} branch={branch} closeFormFilter={closeFormFilter} editingId={editingId}>
          <FormFilter source={source} primaryKey={primaryKey} branch={branch} inputFilter={inputFilter}/>
        </PanelFilterData>
        <MainTableForm
          params={params}
          primaryKey={primaryKey}
          source={source}
          title={title}
          addNew={addNew}
          addNewFilter={addNewFilter}
          items={dataTable}
          removeRow={removeRow}
          editRow={editRow}
          anchor={anchor}
          branch={branch}
          page={page}
          limit={limit}
          fetchData={fetchData}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  submitabc: bindActionCreators(submitAction, dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(CrudTableForm);
