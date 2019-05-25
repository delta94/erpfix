import React from 'react';
import { Formik as FormikImport } from "formik";
import classnames from "classnames";
import * as YupImport from "yup";

const InputFeedback = ({ error }) => error ? <div className="input-feedback">{error}</div> : null;

const Label = ({ error, className, children, ...props }) => {
  return (
    <label className="label" {...props}>{children}</label>
  );
};

export const Yup = YupImport;

export const Formik = FormikImport;

export const TextInput = ({type,id,label,error,value,onChange,width,className,onKeyDown,autoFocus,setRef, ...props}) => {
  const classes = classnames("input-group",{"animated shake error": !!error},className);
  return (
    <div className={classes} style={{display: 'flex',flexDirection:'row', margin:0}}>
      <Label htmlFor={id} error={error} style={{width: '20%'}}>{label}</Label>
      <div>
      <input style={{width: `${width}px`}} 
          id={id}
          className="text-input"
          type={type} value={value} ref={setRef || null} onChange={onChange} onKeyDown={onKeyDown} autoFocus={autoFocus || true} {...props}/>
        <InputFeedback error={error} />
      </div>
    </div>
  );
};


export const DisplayFormikState = props =>
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem',
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>;
