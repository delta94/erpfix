import React from 'react';
import { Formik as FormikImport } from "formik";
import classnames from "classnames";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import * as YupImport from "yup";
import styles from 'fix-components/Tables/tableStyle-jss';
import { withStyles } from '@material-ui/core/styles';
import { API } from '../../service';
import { fromJS } from 'immutable';

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
      <input style={{width: `${width}px`, fontFamily: 'inherit'}} 
          id={id}
          className="text-input"
          type={type} defaultValue={value || ''} ref={setRef || null} onChange={onChange} onKeyDown={onKeyDown} autoFocus={autoFocus || true} {...props}/>
        <InputFeedback error={error} />
      </div>
    </div>
  );
};

export const TxtInput = ({id,label,error,value,width,className,onChange,onKeyDown,autoFocus,setRef,marginLabel, ...props}) => {
  value = value || ''
  const classes = classnames("input-group",{"animated shake error": !!error},className);
  return (
    <div className={classes} style={{display: 'flex',flexDirection:'row', margin:0}}>
      <Label htmlFor={id} error={error} style={{width: marginLabel || '20%', paddingTop: '4px'}}>{label}</Label>
      <div>
      <input style={{width: `${width}px`, fontFamily: 'inherit'}} 
          id={id}
          className="text-input"
          type='text' defaultValue={value || ''} ref={setRef || null} onChange={onChange} onKeyDown={onKeyDown} autoFocus={autoFocus || true} {...props}/>
        <InputFeedback error={error} />
      </div>
    </div>
  );
};

export const TxtComboBox = ({id,label,error,value,onChange,width,className,onKeyDown,autoFocus,setRef,marginLabel,data, ...props}) => {
  const classes = classnames("input-group",{"animated shake error": !!error},className);
  const childData = [];
  for(let i in data)
  {
    childData.push(<option key={data[i].value + '|' + data[i].label} value={data[i].value || ''}>{data[i].label}</option>);
  }
  return (
    <div className={classes} style={{display: 'flex',flexDirection:'row', margin:0}}>
      <Label htmlFor={id} error={error} style={{width: marginLabel || '20%'}}>{label}</Label>
      <select id={id} name={id} className="text-input" style={{height: '35px', width: `${width}px`}} onKeyDown={onKeyDown} ref={setRef || null} {...props}>
        {childData}
      </select>
    </div>
  );
};

export class TbLabelSearch extends React.Component 
{
  refSearch = {};
  state = {openDialog: false}

  mouseOver = () =>
  {
    this.refSearch.style.visibility = 'visible';
  }

  mouseLeave = () =>
  {
    this.refSearch.style.visibility = 'hidden';
  }

  openCompSearch = () =>
  {
    const { id, searchFilter, handleOpenDialog, idDg } = this.props;
    const { csfilter: filter, source } = searchFilter(idDg);
    handleOpenDialog(source, id, '', idDg, filter);
  }

  render() 
  {
    const {value,width, classes} = this.props;
    let val = value || '';
    if(( val.length * 7) >= width)
      val = val.substr(0, Math.floor(width/8)-3 )

    return (
      <div style={{height: '50px', paddingLeft: '10px', paddingTop: '10px'}} onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave} onKeyDown={this.keydown}>
        <div style={{paddingTop: '5px'}}>{val}</div> 
        <div style={{height: '20px',  textAlign: 'right', marginTop: (val)&&'-20px', visibility: 'hidden'}} ref={(e) => this.refSearch = e}>
          <IconButton id="btn" title='Search' className={classes.btn} style={{width:'50px', height:'50px', marginTop: '-15px' }} onClick={() => this.openCompSearch()} >
            <Icon className={classes.icon}>search</Icon>
          </IconButton>
        </div>
      </div>
      );
  }
}

export class TxtSearch extends React.Component 
{
  ref = {};
  state = {fix: true, val: ''}
  blur = false;

  handleKeyInput = e =>
  {
    if(e.key === 'F12') 
    {
      this.openCompSearch();
      e.preventDefault();
    }
    else if(e.key === 'Enter') 
    {
      if(!this.state.check)
      {
        if(typeof this.props.onKeyDown === 'function')
        {
          this.props.onKeyDown(e);
        }
      }
      else if(this.state.val === '')
      {
        this.props.SetVariable({success: false, target: this.props.id, data: []});
      }
      else
      {
        const { id, searchFilter } = this.props;
        const { apifilter: filter, source } = searchFilter(id);

        this.blur = false;
        API.GETDATA_COMPSEARCH({target:'txtsearch', filter, filterSearch: '', page: 1, limit: 1, source}).then(this['API_Result']);    
        e.preventDefault();
      }
    }
    else
    {
      if(typeof this.props.onKeyDown === 'function')
      {
        this.props.onKeyDown(e);
      }
    }
  }

  handleBlur = () =>
  {
    if(!this.state.check)
    {
      return;
    }
    else if(this.state.val === '')
    {
      this.props.SetVariable({success: false, target: this.props.id, data: []});
    }

    const { id, searchFilter } = this.props;
    const { apifilter: filter, source } = searchFilter(id);

    this.blur = true;
    API.GETDATA_COMPSEARCH({target:'txtsearch', filter, filterSearch: '', page: 1, limit: 1, source}).then(this['API_Result']);    
  }

  API_Result = (param) =>
  {
    const {success, data, target} = param;
    if(success)
    {
      switch(target)
      {
        case 'txtsearch':
          if(data.data.total === 0)
          {
            if(this.blur)
            {
              this.props.SetVariable({success: false, target: this.props.id, data: []});
            }
            else
            {
              this.openCompSearch(this.state.val);
            }
          }
          else
          {
            this.props.SetVariable({success, target: this.props.id, data: fromJS(data.data.data).get(0)});
          }
          break;
      }
    }
    else
    {
      switch(target)
      {
        case 'txtsearch':
            this.props.SetVariable({success: false, target: this.props.id, data: []});
          break;
      }
    }
  }

  setRef = (e) =>
  {
    this.ref.input = e;

    if(typeof this.props.setRef === 'function')
    {
      this.props.setRef(e);
    }
  }

  componentWillReceiveProps = (nextProps) =>
  {
    this.setState({val:nextProps.value || '', check: false});
  }

  handleChange = e =>
  {
    this.setState({val:e.target.value || '', check: true});
    this.props.onUpdate(this.props.id, e.target.value || '');
  }

  openCompSearch = (val) =>
  {
    const { id, searchFilter, handleOpenDialog } = this.props;
    const { csfilter: filter, source } = searchFilter(id);
    handleOpenDialog(source, id, val || '', '', filter);
  }

  render() 
  {
    const {id,label,error,onBlur,onKeyDown,width,className,marginLabel,valueName, tabIndex, props, source, handleOpenDialog } = this.props;
    const classes = classnames("input-group",{"animated shake error": !!error},className);
    return (
      <div className={classes} style={{display: 'flex',flexDirection:'row', margin:0}}>
        <Label htmlFor={id} error={error} style={{width: marginLabel || '20%', paddingTop: '4px'}}>{label}</Label>
        <div>
          <input style={{width: `${width}px`, fontFamily: 'inherit'}} 
              id={id} tabIndex={tabIndex}
              className="text-input"
              type='text' defaultValue={this.props.value || ''} value={this.state.val} ref={this.setRef}
              onKeyDown={this.handleKeyInput} 
              onChange={this.handleChange} 
              // onKeyDown={(e) => onKeyDown(e, this.state.val || '')}
              onBlur={this.handleBlur}
              autoFocus={true} {...props}/>
            <InputFeedback error={error} />
        </div>
        <IconButton title='Search' className={classes.btn} style={{padding:3}} onClick={() => this.openCompSearch()} tabIndex={-1}>
          <Icon className={classes.icon}>search</Icon>
        </IconButton>
        {
          (valueName) && <Label style={{marginTop: '7px', marginLeft: '5px'}}>{valueName}</Label>
        }
        
      </div>
      );
  }
}

export const TxtNoTransaksi = ({id,label,error,value,onChange,width,className,onKeyDown,autoFocus,setRef,marginLabel, ...props}) => {
  const classes = classnames("input-group",{"animated shake error": !!error},className);
  return (
    <div className={classes} style={{display: 'flex',flexDirection:'row', margin:0, alignItems:"center"}}>
      <Label htmlFor={id} error={error} style={{width: marginLabel || '20%'}}>{label}</Label>
      <div>
      <input style={{width: `${width}px`, fontFamily: 'inherit'}} 
          id={id}
          className="text-input"
          type='text' defaultValue={value} ref={setRef || null} onChange={onChange} onKeyDown={onKeyDown} autoFocus={autoFocus || true} {...props}/>
        <InputFeedback error={error} />
      </div>
      <input type="checkbox" className="text-input" id={'cbx' + id} style={{padding:0, margin:0, width:'20px', fontFamily: 'inherit'}}  tabIndex={-1}/>
      <Label htmlFor={'cbx' + id} >Auto</Label>
    </div>
  );
};

export const Input = ({id,label,error,value,onChange,width,className,onKeyDown,autoFocus,setRef, ...props}) => {
  return (
      <input style={{width: `${width}`}}
          id={id}
          className="text-input"
          type='text' defaultValue={value} ref={setRef || null} onChange={onChange} onKeyDown={onKeyDown} autoFocus={autoFocus || true} {...props}/>
  );
};

export const ComboBox = ({id,label,error,value,toolTip, onChange,width,className,onKeyDown,autoFocus,setRef,data, ...props}) => {
  const classes = classnames("input-group",{"animated shake error": !!error},className);
  const childData = [];
  for(let i in data)
  {
    childData.push(<option key={data[i].value + '@' + data[i].label} value={data[i].value || ''}>{data[i].label}</option>);
  }
  return (
    <div className={classes} style={{display: 'flex',flexDirection:'row', margin:0}}>
      <select id={id} key={id} name={id} className="text-input"
       style={{height: '35px', width: `${width}`, textAlign: 'center'}} 
       onKeyDown={onKeyDown} ref={setRef || null} {...props}
       title={toolTip}>
        {childData}
      </select>
    </div>
  );
};

export const TbLabel = ({value,width, align}) => 
{
  value = value || '';
  if(( value.length * 7) >= width)
    value = value.substr(0, Math.floor(width/6)-1 )
  return (<div style={{ paddingLeft: (!align) && '10px', textAlign: align}}>{value}</div>);
};


export class TbTextInput extends React.Component 
{
  state = {val: ''}

  openCompSearch = () =>
  {
    const { id, searchFilter, handleOpenDialog, idDg } = this.props;
    const { csfilter: filter, source } = searchFilter(idDg);
    handleOpenDialog(source, id, '', idDg, filter);
  }

  handleKeyDown = e =>
  {
    if(e.key === 'Tab') 
    {
      e.preventDefault();
    }
    else if(e.key === 'F12') 
    {
      this.openCompSearch('');
      e.preventDefault();
    }
    else if(e.key === 'Enter') 
    {
      const { idDg, searchFilter } = this.props;
      const { apifilter: filter, source } = searchFilter(idDg);
      if(source)
      {
        if(this.state.val === '')
        {
          this.props.SetVariable({success: false, target: this.props.id, data: []});
        }
        else
        {
          this.props.SetVariable({success: false, target: this.props.id, data: []});
          API.GETDATA_COMPSEARCH({target:'txtsearch', filter, filterSearch: '', page: 1, limit: 1, source}).then(this['API_Result']);    
          // e.preventDefault();
        }
      }
      this.props.onKeyDown(e, this.state.val || '');
    }
    else
    {
      this.props.onKeyDown(e, this.state.val || '');
    }
  }

  API_Result = (param) =>
  {
    const {success, data, target} = param;
    if(success)
    {
      switch(target)
      {
        case 'txtsearch':
          if(data.data.total === 0)
          {
            this.openCompSearch(this.state.val);
          }
          else
            this.props.SetVariable({success, target: this.props.idDg, data: fromJS(data.data.data).get(0)});
          break;
      }
    }
    else
    {
      switch(target)
      {
        case 'txtsearch':
          break;
      }
    }
  }


  render() 
  {
    const {id,value,onChange,width,onKeyDown,setRef,onBlur,onUpdate, ...props} = this.props;
    return (
      <input style={{width: width, padding: '.7rem', paddingTop:'.8rem', paddingLeft:'.6rem', fontFamily: 'inherit', height:'50px'}}
        id={id}
        className="tb-text-input"
        type="text"
        defaultValue={this.props.value || ''} 
        value={this.state.val}
        ref={setRef || null}
        onChange={(e) => {this.setState({val:e.target.value || ''});onUpdate(e.target.value || '')}} 
        onKeyDown={this.handleKeyDown}
        onBlur={() => onBlur(this.state.val || '')}
        autoFocus={true} {...props} />
      );
  }
}

class TbTextSearchComp extends React.Component 
{
  state = {val: '', blur:true}

  render() 
  {
    const {id,value,onChange,width,onKeyDown,setRef,onBlur, classes,...props} = this.props;
    return (
      <div>
        <input style={{width: width, padding: '.7rem', paddingTop:'.9rem', fontFamily: 'inherit'}}
          id={id}
          className="tb-text-input"
          type="text"
          defaultValue={this.props.value || ''} 
          value={this.state.val}
          ref={setRef || null} 
          onChange={(e) => this.setState({val:e.target.value || '', blur:true})} 
          onKeyDown={(e) => onKeyDown(e, this.state.val || '')}
          onBlur={() => onBlur(this.state.val || '')}
          autoFocus={true} {...props} />
          
          <div style={{height: '20px', width: '50px'}}>
            <IconButton id="btnsearch" title='Search' className={classes.btn} >
              <Icon className={classes.icon}>search</Icon>
            </IconButton>
          </div>
      </div>
    );
  }
}
export const TbTextSearch = withStyles(styles)(TbTextSearchComp);

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
