import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { TextInput, Yup, Formik } from 'fix-help/formik';
import { Map } from 'immutable';
import css from 'dan-styles/Form.scss';
import "fix-help/formik.css";
import { dateNow, formatDate } from '../../../service';

class Form extends Component 
{
  valueFormik = {...this.props.initValues};
  
  yupValidate = Yup.object().shape({
    ckode: Yup.string(),
    cnama: Yup.string(),
    ccatatan: Yup.string()
  })

  sendValues = e => 
  {
    e.preventDefault();
    
    const { params, editingId, submitForm } = this.props;
    const { dataFormatDate } = params;
    let item = Map(this.valueFormik);

    item.map((val, col) => {
      Object.keys(dataFormatDate).map((i) => {
        if(col === dataFormatDate[i])
        {
          item = item.set(col, formatDate(val, "/"))
        }
      });

      if(editingId === '')
      {
        if(col.indexOf('inputtgl') === 1)
          item = item.set(col, dateNow())
  
        if(col.indexOf('inputuser') === 1)
          item = item.set(col, '1')
      }
      else
      {
        if(col.indexOf('modifikasitgl') === 1)
          item = item.set(col, dateNow())

        if(col.indexOf('modifikasiuser') === 1)
          item = item.set(col, '1')
      }

    });

    submitForm(item, editingId);
  }

  KeyUp = e => 
  {
    if(e.keyCode === 27) 
      this.props.closeForm();
  }
  
  render() 
  {
    const { params, initValues, isSubmitting, editingId, openForm, setRef } = this.props;
    const { inputForm, primaryKey } = params;
    return (
      <div id="divForm" ref={setRef} >
        <Formik enableReinitialize initialValues={initValues} validationSchema={this.yupValidate}>
          {
            props => 
            {
              const {values,touched, errors, dirty, handleChange, handleBlur, handleReset} = props;
              const items = [];  

              idFocus = primaryKey;
              if(editingId !== '')
                for (const [index, value] of inputForm.entries())
                  if((value.id !== primaryKey))
                  {
                    idFocus = value.id;
                    break;
                  }

              for (const [index, val] of inputForm.entries())
                  items.push(<TextInput key={index} id={val.id} type={val.text} width={val.width} label={val.label} 
                    placeholder={val.placeholder || ''} error={touched[val.id] && errors[val.id]} value={values[val.id] || ''} 
                    onChange={handleChange} onBlur={handleBlur} setRef={setRef} autoFocus={true}
                    disabled={(val.id !== primaryKey || editingId === '') ? false : true } /> )

              this.valueFormik = values;

              // if(openForm && firstOpen)
              // {
              //   this[idFocus].focus();
              //   console.log(idFocus + ' focus()');
              //   // firstOpen = false;
              // }

              // if(!openForm)
              // {
              //   firstOpen = true;
              // }

              return (
                <form onSubmit={this.sendValues} onKeyUp={this.KeyUp}>
                  <section className={css.bodyForm}>
                  {items}
                  </section>
                  <div className={css.buttonArea}>
                    <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting}>Submit</Button>
                    <Button type="button" className="outline" onClick={handleReset} disabled={!dirty || isSubmitting} >Reset</Button>
                  </div>
                </form>
              );
            }
          }
        </Formik>
      </div>
    );
  }
}

let firstOpen = true;
let idFocus = '';

export default Form;