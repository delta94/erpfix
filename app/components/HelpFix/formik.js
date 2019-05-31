import React from 'react';
import { Formik as FormikImport } from "formik";
import classnames from "classnames";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
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

export const TxtInput = ({id,label,error,value,onChange,width,className,onKeyDown,autoFocus,setRef,marginLabel, ...props}) => {
  const classes = classnames("input-group",{"animated shake error": !!error},className);
  return (
    <div className={classes} style={{display: 'flex',flexDirection:'row', margin:0}}>
      <Label htmlFor={id} error={error} style={{width: marginLabel || '20%'}}>{label}</Label>
      <div>
      <input style={{width: `${width}px`}} 
          id={id}
          className="text-input"
          type='text' value={value} ref={setRef || null} onChange={onChange} onKeyDown={onKeyDown} autoFocus={autoFocus || true} {...props}/>
        <InputFeedback error={error} />
      </div>
    </div>
  );
};

export const TxtComboBox = ({id,label,error,value,onChange,width,className,onKeyDown,autoFocus,setRef,marginLabel, ...props}) => {
  const classes = classnames("input-group",{"animated shake error": !!error},className);
  return (
    <div className={classes} style={{display: 'flex',flexDirection:'row', margin:0}}>
      <Label htmlFor={id} id={id} error={error} style={{width: marginLabel || '20%'}}>{label}</Label>
      <select id={id} name={id} className="text-input" style={{height: '35px', width: `${width}px`}} onKeyDown={onKeyDown} ref={setRef || null} {...props}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="-">Other</option>
      </select>
    </div>
  );
};

export const TxtSearch = ({id,label,error,value,onChange,width,className,onKeyDown,autoFocus,setRef,marginLabel, ...props}) => {
  const classes = classnames("input-group",{"animated shake error": !!error},className);
  return (
    <div className={classes} style={{display: 'flex',flexDirection:'row', margin:0}}>
      <Label htmlFor={id} error={error} style={{width: marginLabel || '20%'}}>{label}</Label>
      <div>
      <input style={{width: `${width}px`}} 
          id={id}
          className="text-input"
          type='text' value={value} ref={setRef || null} onChange={onChange} onKeyDown={onKeyDown} autoFocus={autoFocus || true} {...props}/>
        <InputFeedback error={error} />
      </div>
      <IconButton title='Search' className={classes.btn} style={{padding:3}} >
        <Icon className={classes.icon}>search</Icon>
      </IconButton>
    </div>
  );
};

export const TxtNoTransaksi = ({id,label,error,value,onChange,width,className,onKeyDown,autoFocus,setRef,marginLabel, ...props}) => {
  const classes = classnames("input-group",{"animated shake error": !!error},className);
  return (
    <div className={classes} style={{display: 'flex',flexDirection:'row', margin:0, alignItems:"center"}}>
      <Label htmlFor={id} error={error} style={{width: marginLabel || '20%'}}>{label}</Label>
      <div>
      <input style={{width: `${width}px`}} 
          id={id}
          className="text-input"
          type='text' value={value} ref={setRef || null} onChange={onChange} onKeyDown={onKeyDown} autoFocus={autoFocus || true} {...props}/>
        <InputFeedback error={error} />
      </div>
      <input type="checkbox" className="text-input" id={'cbx' + id} style={{padding:0, margin:0, width:'20px'}}/>
      <Label htmlFor={'cbx' + id} >Auto</Label>
    </div>
  );
};

export const TbLabel = ({value,width}) => 
{
  value = value || '';
  if(( value.length * 7) >= width)
    value = value.substr(0, Math.floor(width/6)-1 )
  return (<div style={{ paddingLeft: '10px'}}>{value}</div>);
};

export class TbTextInput extends React.Component 
{
  state = {val: this.props.value, blur:true}

  render() 
  {
    const {id,value,onChange,width,onKeyDown,setRef,onBlur, ...props} = this.props;
    return (
      <input style={{width: width, padding: '.7rem', paddingTop:'.9rem' } }
        id={id}
        className="tb-text-input"
        type="text"
        value={this.state.val} 
        ref={setRef || null} 
        onChange={(e) => this.setState({val:e.target.value, blur:true})} 
        onKeyDown={(e) => onKeyDown(e, this.state.val)}
        onBlur={() => onBlur(this.state.val)}
        autoFocus={true} {...props} />
      );
  }
}

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
