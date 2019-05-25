import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Checkbox,Select,TextField,Switch} from 'redux-form-material-ui';
import { Field, reduxForm } from 'redux-form/immutable';
import {addAction,addActionFilter,closeAction,closeActionFilter,submitAction,submitActionFilter,removeAction,editAction,closeNotifAction} from './node_modules/dan-actions/CrudTbFrmActions';
import {  Notification, CrudTableForm } from './node_modules/dan-components';
import { Pagination } from '../../../components';

const branch = 'crudTbFrmDemo';
const anchorTable = [
  { name: 'no', label: 'No', initialValue: '', width: '80', hidden: false }, 
  { name: 'akode', label: 'Kode', initialValue: '', width: '80', hidden: false }, 
  { name: 'anama', label: 'Nama', initialValue: '', width: '80', hidden: false }, 
  { name: 'acatatan', label: 'Catatan', initialValue: '', width: 'auto', hidden: false }, 
  { name: 'aaktif', label: 'Aktif', initialValue: '', width: 'auto', hidden: false },
];

const renderRadioGroup = ({ input, ...rest }) => (<RadioGroup {...input} {...rest} valueselected={input.value} onChange={(event, value) => input.onChange(value)} />);

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)? 'Invalid email': undefined);
const styles = theme => ({
  root: {flexGrow: 1,},
  field: {width: '100%',marginBottom: 20},
  fieldBasic: {width: '100%',marginBottom: 20,marginTop: 10},
  inlineWrap: {display: 'flex',flexDirection: 'row'},
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  menu: {
    width: 200,
  }});

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
class CrudTbFormDemo extends Component 
{
  constructor(props, context) {
    super(props, context);
    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onGoFirst = this.onGoFirst.bind(this);
    this.onGoLast = this.onGoLast.bind(this);

    this.state = {
      kode:'', nama:'', catatan:'',
      name: 'Cat in the Hat',
      age: '',
      multiline: 'Controlled',
      currency: 'EUR',
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      columnData: [
        {
          id: 'name',
          numeric: false,
          disablePadding: false,
          label: 'Dessert (100g serving)'
        }, {
          id: 'calories',
          numeric: true,
          disablePadding: false,
          label: 'Calories'
        }, {
          id: 'fat',
          numeric: true,
          disablePadding: false,
          label: 'Fat (g)'
        }, {
          id: 'carbs',
          numeric: true,
          disablePadding: false,
          label: 'Carbs (g)'
        }, {
          id: 'protein',
          numeric: true,
          disablePadding: false,
          label: 'Protein (g)'
        },
      ],
      page: 0,
      rowsPerPage: 5,
      defaultPerPage: 5,
      filterText: '',
      size: 'medium',
      bordered: false,
      stripped: true,
      hovered: false,
      toolbar: true,
      checkcell: false,
      pagination: true
    };
  }

  onPageChange = (page) => {this.props.fetchData({filter: '', sort: '', page, limit: this.props.limit});}

  onPrev() {
    let { page } = this.props;
    if (page > 1) {
      this.props.fetchData({filter: '', sort: '', page: page -= 1, limit: this.props.limit});
      // this.setState({ page: page -= 1 });
    } else {
      this.props.fetchData({filter: '', sort: '', page: 1, limit: this.props.limit});
      // this.setState({ page: 1 });
    }
  }

  onNext(totalPages) {
    let { page } = this.props;
    if (page < totalPages) {
      this.props.fetchData({filter: '', sort: '', page: page += 1, limit: this.props.limit});
    } else {
      this.props.fetchData({filter: '', sort: '', page: totalPages, limit: this.props.limit});
    }
  }

  onGoFirst() {this.props.fetchData({filter: '', sort: '', page: 1, limit: this.props.limit});}

  onGoLast(totalPages) {this.props.fetchData({filter: '', sort: '', page: totalPages, limit: this.props.limit});}

  saveRef = ref => {this.ref = ref;return this.ref;};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() 
  {
    const {openFormFilter,closeFormFilter,addNewFilter,submitFilter,
      last_page, limit, page, count,classes,fetchData,addNew,closeForm,editingId,submit,removeRow,editRow,dataTable,openForm,initValues,initValuesFilter,closeNotif,messageNotif,dataApi} = this.props;
    const trueBool = true;

    const {
      name,
      kode,
      nama,
      catatan
    } = this.state;
    return (
      <div>
        <Notification close={() => closeNotif(branch)} message={messageNotif} />
        
        <div className={classes.rootTable}>
          <CrudTableForm classes={classes} openFormFilter={openFormFilter} closeFormFilter={closeFormFilter} submitFilter={submitFilter} initValuesFilter={initValuesFilter}
          page={page} limit={limit} dataTable={dataTable} openForm={openForm} anchor={anchorTable} title="Nama Tabel" fetchData={fetchData} addNew={addNew} addNewFilter={addNewFilter} editingId={editingId} closeForm={closeForm} submit={submit} removeRow={removeRow} editRow={editRow} branch={branch} initValues={initValues} >
            <div>
              <div><Field name="akode" component={TextField} placeholder="Kode" label="Kode" validate={required} required ref={this.saveRef} withRef className={classes.field} /></div>
              <div><Field name="anama" component={TextField} placeholder="Nama" label="Nama" required validate={[required]} className={classes.field} /></div>
              <div className={classes.field}><Field name="acatatan" className={classes.field} component={TextField} placeholder="Catatan" label="Catatan" multiline={trueBool} rows={4} /></div>
              <div><Field name="aaktif" component={TextField} placeholder="Aktif" label="Aktif" required validate={[required]} className={classes.field} /></div>
            </div>
            <div>
              <div><Field name="kode" component={TextField} placeholder="Kode" label="Kode" ref={this.saveRef} withRef className={classes.field} style={{width: 200, margin: 0}} /></div>
              <div><Field name="nama" component={TextField} placeholder="Nama" label="Nama" className={classes.field} style={{width: 200, margin: 0}} /></div>
              <div><Field name="catatan" component={TextField} placeholder="Catatan" label="Catatan" className={classes.field} style={{width: 250, margin: 0}} /></div>
            </div>
          </CrudTableForm>
        </div>
        <Pagination
          curpage={page}
          totpages={last_page}
          boundaryPagesRange={1}
          onChange={this.onPageChange}
          siblingPagesRange={1}
          hideEllipsis={false}
          onPrev={this.onPrev}
          onNext={() => this.onNext(last_page)}
          onGoFirst={this.onGoFirst}
          onGoLast={() => this.onGoLast(last_page)}
        /> 
      </div>
    );
  }
}

const ReduxFormMapped = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(CrudTbFormDemo);

const mapStateToProps = state => ({
  force: state.getIn([branch]),
  initValues: state.getIn([branch, 'formValues']),
  initValuesFilter: state.getIn([branch, 'formValuesFilter']),
  dataTable: state.getIn([branch, 'dataTable']),
  openForm: state.getIn([branch, 'showFrm']),
  openFormFilter: state.getIn([branch, 'showFrmFilter']),
  messageNotif: state.getIn([branch, 'notifMsg']),
  editingId: state.getIn([branch, 'editingId']),
  page: state.getIn([branch, 'page']),
  limit: state.getIn([branch, 'limit']),
  count: state.getIn([branch, 'count']),
  last_page: state.getIn([branch, 'last_page']),
});

const mapDispatchToProps = dispatch => ({
  fetchData: (pagging) => dispatch({type: `${branch}/GET_DATA`, branch, pagging}),
  addNew: bindActionCreators(addAction, dispatch),
  addNewFilter: bindActionCreators(addActionFilter, dispatch),
  closeForm: bindActionCreators(closeAction, dispatch),
  closeFormFilter: bindActionCreators(closeActionFilter, dispatch),
  submit: bindActionCreators(submitAction, dispatch),
  submitFilter: bindActionCreators(submitActionFilter, dispatch),
  removeRow: bindActionCreators(removeAction, dispatch),
  editRow: bindActionCreators(editAction, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
});

const CRD = connect(mapStateToProps,mapDispatchToProps)(ReduxFormMapped);

export default withStyles(styles)(CRD);