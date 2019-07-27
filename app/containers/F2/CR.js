import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'fix-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { PapperFix } from 'fix-components';
import { TxtInput, TxtSearch, TxtNoTransaksi, TxtComboBox } from 'fix-help/formik';
import Grid from '@material-ui/core/Grid';
import styles from 'fix-components/Tables/tableStyle-jss';
import CompSearch from 'fix/containers/F2/CompSearch';
import DataGrid from 'fix/containers/F2/DataGrid';
import "./CR_CSS.css";

let ref    = {};
let Rendering = true;
let rowIndex = 0;
let colIndex = 0;

class CR extends Component 
{
  constructor(props, context) 
  {
    super(props, context);
    
    this.focus = {};
    this.state = {openDialog:false, dg: [{no: 1}]};
    
    this.grid = 
    [
      {header: 'No', width: '60', item: 'no', require: false, edit: false, visible: true, labelRender: 'center', itemRender: ''},
      {header: 'No Akun', width: '180', item: 'noakun', require: true, edit: true, visible: true, labelRender: 'search', itemRender: 'search'},
      {header: 'Nama Akun', width: '200', item: 'namaakun', require: false, edit: true, visible: true, labelRender: '', itemRender: ''},
      {header: 'Amount', width: '120', item: 'amount', require: false, edit: true, visible: true, labelRender: '', itemRender: ''},
      {header: 'Foreign Amount', width: '120', item: 'foreignamount', require: false, edit: true, visible: true, labelRender: 'nominal', itemRender: 'nominal'},
      {header: 'Note', width: '300', item: 'note', require: false, edit: true, visible: true, labelRender: '', itemRender: ''},
      {header: 'Cost Center', width: '120', item: 'costcenter', require: false, edit: true, visible: true, labelRender: '', itemRender: ''},
      {header: 'Divisi', width: '120', item: 'divisi', require: false, edit: true, visible: true, labelRender: '', itemRender: ''},
      {header: 'Custom 1', width: '120', item: 'custom1', require: false, edit: true, visible: true, labelRender: '', itemRender: ''},
    ];

    this.progress = [
      {label: 'Draft', value: 0},
      {label: 'Need Approve', value: 1},
      {label: 'Approve 1', value: 5},
      {label: 'Approved', value: 2},
    ]

    this.data = [];
  }

  setRef = e => {if(e)ref[e.id] = e};

  shouldComponentUpdate()
  {
    if(!Rendering)
    {
      Rendering = true;
      return false;
    }
    return true;
  }
  
  componentDidMount()
  {
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
    this.focus.curIndex = 0;

    // ref.txtterimadari.onkeydown = this.handleKeyNavigator;
    // ref.txtakunkas.onkeydown = this.handleKeyNavigator;
    ref.txturaian.onkeydown = this.handleKeyNavigator;
    ref.txttanggal.onkeydown = this.handleKeyNavigator;
    ref.txtnotransaksi.onkeydown = this.handleKeyNavigator;
    ref.txtuang.onkeydown = this.handleKeyNavigator;
    ref.txtkurs.onkeydown = this.handleKeyNavigator;
    // ref.txtprogress.onkeydown = this.handleKeyNavigator;

    this.setFocus(ref.txtterimadari);
  }

  setFocus = (id) =>
  {
    if(id)
    {
      this.focus.curId = id;
      this.focus.curIndex = id.tabIndex;
      id.focus();
    }
    else
      this.focus.curId.focus();
  }

  nextFocus = (id) =>
  {
    let nextId;
    if(id)
    {
      this.focus.curId = id;
      this.focus.curIndex = id.tabIndex;
    }
    if(this.focus.curIndex >= this.focus.maxIndex)
    {
      this.setFocus(ref[this.focus.arrRef[0].id]);
    }
    else
    {  
      for ( let i in this.focus.arrRef)
      {
        if(this.focus.arrRef[i].index === this.focus.curIndex)
        {
          if(i == this.focus.max-1)
          {
            this.setFocus(ref[this.focus.arrRef[0]]);
          }
          else 
          {
            nextId = this.focus.arrRef[(parseInt(i)+1)].id;
            this.setFocus(ref[nextId]);
          }
          break;
        }
      }
    }
  }

  prevFocus = (id) =>
  {
    let prevId;
    if(id)
    {
      this.focus.curId = id;
      this.focus.curIndex = id.tabIndex;
    }
    if(this.focus.curIndex == this.focus.minIndex)
    {
      ref[this.focus.arrRef[this.focus.max-1].id].focus();
    }
    else
    {  
      for ( let i in this.focus.arrRef)
      {
        if(this.focus.arrRef[i].index === this.focus.curIndex)
        {
          if(i === 0)
          {
            this.setFocus(ref[this.focus.arrRef[this.focus.max-1].id]);
          }
          else
          {
            prevId = this.focus.arrRef[(parseInt(i)-1)].id;
            this.setFocus(ref[prevId]);
          }
          break;
        }
      }
    }
  }

  handleKeyTerimaDari = e =>
  {
    if((e.key === 'Tab' || e.key === 'ArrowUp') && e.shiftKey)  // SHIFT + TAB
    {
      ref.txtprogress.focus();
      e.preventDefault();
    }
    else if(e.key === 'ArrowDown' || e.key === 'Enter')
    {
      this.nextFocus(e.target);
      e.preventDefault();
    }
  }

  handleKeyNavigator = e =>
  {
    switch(e.key)
    {
      case 'ArrowUp':
        this.prevFocus(e.target);
        e.preventDefault();
        break;
      case 'ArrowDown':
      case 'Enter':
        this.nextFocus(e.target);
        e.preventDefault();
        break;
    }
  }

  
  handleKeyTanggal = e =>
  {
    if(e.which == 9 && e.shiftKey)  // SHIFT + TAB
    {
      // ref['td' + rowFocus  + colFocus].className = this.props.classes.tdSelected;
      // ref['td' + rowFocus  + colFocus].focus();
      // e.preventDefault();
    }
  }
  
  handleKeyProgress = e =>
  {
    if(e.which == 9 && !e.shiftKey)  // TAB
    {
      this.setFocus(ref.txtterimadari);
      e.preventDefault();
    }
  }

  SetVariable = param =>
  {
    const { succes, target, data } = param;
    if(succes)
    {
      switch(target)
      {
        case 'txtterimadari':
            this.setState({txtterimadari: data.get('kkode'), lbltxtterimadari: data.get('knama')});
          break;
        case 'txtakunkas':
          this.setState({txtakunkas: data.get('cnomor'), lbltxtakunkas: data.get('cnama')});
          break;
        case 'txtuang':
          this.setState({txtuang: data.get('ckode')});
          break;
        case 'noakun':
          const { dg } = this.state;
          dg[rowIndex].noakun = data.get('cnomor');
          dg[rowIndex].namaakun = data.get('cnama');
          this.setState({dg: dg});
          break;
      }
    }
    else
    {
      switch(target)
      {
        case 'txtterimadari':
          this.setState({txtterimadari: '', lbltxtterimadari: ''});
          break;
        case 'txtakunkas':
          this.setState({txtakunkas: '', lbltxtakunkas: ''});
          break;
        case 'txtuang':
          this.setState({txtuang: ''});
          break;
        case 'tbtxt01':
          this.setState({val01: '', val02: ''});
          break;
      }
    }
  }

  handleOpenDialog = (source, target, current, targetDg) =>
  {
    ref[target].focus();
    this.source = source;
    this.target = (targetDg) ? targetDg : target;
    this.current = current;
    this.setState({openDialog:true});
  }

  handleCloseDialog = (param) =>
  {
    if(this.state.openDialog)
    {
      this.setFocus(ref[this.target]);
      this.setState({openDialog:false});
    }
  }

  handleUpdate = (id, value) =>
  {
    Rendering = false;
    this.setState({[id] : value});
  }

  getData = (id, value, render) =>
  {
    if(id === 'dg') 
    {
      Rendering =false ;
      this.setState({dg : value});
    }
    else if(id === 'rowIndex') rowIndex = value;
    else if(id === 'colIndex') colIndex = value;
    else ref[id] = value;
  }
 
  dgKeyDown = e => 
  {
    if(e.key === 'Tab') 
    {        
      if(!e.shiftKey)
      {
        this.nextFocus(ref.dg);
        e.preventDefault();
      }
      else if(e.shiftKey)
      {
        this.prevFocus(ref.dg);
        e.preventDefault();
      }
    } 
  };

  render() 
  {
    const title = brand.name + ' - Table';
    const description = brand.desc;

    let lastTabIndex = 5;
    
    return (
      <div id='divRoot'  ref={this.setRef}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        
        <PapperFix title="CRUD" icon="ios-arrow-round-forward" desc="CRUD">
          
          <Grid container id='gridContainer' ref={this.setRef}>
            <Grid item xs={12} sm={7}>
              <TxtSearch tabIndex={1} key={1} width='170' marginLabel='20%' id='txtterimadari' source='contact' primaryKey='kkode' label='Terima Dari' handleOpenDialog={this.handleOpenDialog} onKeyDown={this.handleKeyTerimaDari} onUpdate={this.handleUpdate} setRef={this.setRef} placeholder=''  value={this.state['txtterimadari']} valueName={this.state['lbltxtterimadari']} SetVariable={this.SetVariable}/>
              <TxtSearch tabIndex={2} key={2} width='170' marginLabel='20%' id='txtakunkas' source='coa' primaryKey='cnomor' label='Akun Kas [D]' handleOpenDialog={this.handleOpenDialog} onKeyDown={this.handleKeyNavigator} setRef={this.setRef} placeholder=''  onUpdate={this.handleUpdate} value={this.state['txtakunkas']} valueName={this.state['lbltxtakunkas']} SetVariable={this.SetVariable} />
              <TxtInput tabIndex={3} key={3} width='250' marginLabel='20%' id='txturaian' label='Uraian' setRef={this.setRef} placeholder=''  value={this.state['txturaian']} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <div style={{width: '300px', float: 'right'}}>
              <TxtInput tabIndex={++lastTabIndex} key={lastTabIndex} type='date' width='200' marginLabel='100px' id='txttanggal' label='Tanggal' onKeyDown={this.handleKeyTanggal} setRef={this.setRef} placeholder=''  value={this.state['txttanggal']} />
              <TxtNoTransaksi tabIndex={++lastTabIndex} key={lastTabIndex} width='140' marginLabel='100px' id='txtnotransaksi' label='No Transaksi' setRef={this.setRef} placeholder=''  value={this.state['txtntoransaksi']} />
              <Grid container>
                <Grid item xs={12} sm={8}>
                  <TxtSearch tabIndex={++lastTabIndex} key={lastTabIndex} width='70' marginLabel='100px' source='currency' primaryKey='ckode' handleOpenDialog={this.handleOpenDialog} id='txtuang' label='Uang' setRef={this.setRef} placeholder='' onKeyDown={this.handleKeyNavigator}  onUpdate={this.handleUpdate} value={this.state['txtuang']} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TxtInput tabIndex={++lastTabIndex} key={lastTabIndex} width='55' marginLabel='43px' id='txtkurs' label='Kurs' setRef={this.setRef} placeholder=''  value={this.state['txtkurs']} />
                </Grid>
              </Grid>
              <TxtComboBox tabIndex={++lastTabIndex} data={this.progress} key={lastTabIndex} width='200' marginLabel='100px' id='txtprogress' label='Progress' onKeyDown={this.handleKeyProgress} setRef={this.setRef} placeholder=''  value={this.state['txtprogress']} />
              </div>
            </Grid>
          </Grid>
          <DataGrid id='dg' column={this.grid} getData={this.getData} data={this.state.dg} width={1050} height={200} setRef={this.setRef} tabIndex={4}
            handleOpenDialog={this.handleOpenDialog} onKeyDown={this.dgKeyDown}  />
        </PapperFix>

        <CompSearch onClose={() => this.handleCloseDialog('1')} open={this.state.openDialog} 
        SetVariable={this.SetVariable} source={this.source} target={this.target} current={this.current}/>
        
      </div>
    );
  }
}

export default withStyles(styles)(CR);
