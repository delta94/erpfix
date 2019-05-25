import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { TextInput, Yup, Formik } from 'fix-help/formik';
import css from 'dan-styles/Form.scss';
import "fix-help/formik.css";
import { Map } from 'immutable';

class FormFilter extends Component 
{
  defaultValue = {};
  valueFormik = {};

  yupValidate = {
    ckode: Yup.string(),
    cnama: Yup.string(),
    ccatatan: Yup.string()
  }
  
  constructor(props)
  {
    super(props)

    const {inputFilter} = props;
    this.defaultValue = {};
    for (const [index, val] of inputFilter.entries())
      this.defaultValue[val.id] = '';

    this.valueForm = {...this.defaultValue};
  }

  sendValues = (e) => 
  {
    e.preventDefault();

    let filter = '';

    Map(this.valueFormik).map((val, param) => 
    {
      if(val != '')
      {
        if(filter != '') 
          filter += ' AND ';  
        
        filter += `${param} LIKE '%${val}%'`;
      }
    });
    this.props.showDataPage(1, filter);
  }

  KeyUp = (e) => 
  {
    switch(e.keyCode)
    {
      case 13: 
        this.sendValues(e);
        break;
      case 27: 
        this.props.closeFormFilter();
        break;
    }
  }

  ResetValues = () => 
  {
    this.props.showDataPage(1, '');
  }
  
  render()
  {
    const { inputFilter, setRef } = this.props;
    return (
      <div id="divFormFilter" ref={setRef}>
        <Formik
          enableReinitialize
          initialValues={this.defaultValue}
          validationSchema= {Yup.object().shape(this.yupValidate)}
          onSubmit={(values, { setSubmitting }) => {setSubmitting(false);}}>
          {
            props => 
            {
              const {values, touched, errors, dirty, handleChange, handleBlur, handleReset, isSubmitting} = props;
              const items = [];

              for (const [index, val] of inputFilter.entries())
              {
                items.push(<TextInput key={index} id={val.id} setRef={setRef} type={val.text} width={val.width} label={val.label} placeholder={val.placeholder} error={touched[val.id] && errors[val.id]} value={values[val.id]} onChange={handleChange} onBlur={handleBlur} /> )
              }
            
              this.valueFormik = values;

              return (
                <form onSubmit={this.sendValues} onKeyUp={this.KeyUp}>
                  <section className={css.bodyForm}>
                  {items}
                  </section>
                  <div className={css.buttonArea}>
                    <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting}>Submit</Button>
                    <Button type="button" className="outline" onClick={ev =>{handleReset(ev);this.ResetValues(ev);}} disabled={!dirty || isSubmitting} >Reset</Button>
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

export default FormFilter;