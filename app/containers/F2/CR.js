import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'fix-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { PapperFix } from 'fix-components';
import { TxtInput, TxtSearch, TxtNoTransaksi, TxtComboBox } from 'fix-help/formik';
import Grid from '@material-ui/core/Grid';
import styles from 'fix-components/Tables/tableStyle-jss';
import CompSearch from 'fix/containers/F2/CompSearch';
import Toolbar from '@material-ui/core/Toolbar';
import DataGrid from 'fix/containers/F2/DataGrid';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import "./CR_CSS.css";
import { API } from '../../service';

let ref    = {};
let Rendering = true;
let dg = {};

class CR extends Component 
{
  constructor(props, context) 
  {
    super(props, context);
    
    this.focus = {};
    this.state = {openDialog:false, dgData: [{no: 1}], txtmatauang: 'IDR',
                  txturaian: '', txtkurs: '', txttanggal: ''}
    this.grid = 
    [
      {header: 'No', width: '60', item: 'no', require: false, edit: false, visible: true, skip: true, labelRender: 'center', itemRender: ''},
      {header: 'No Akun', width: '180', item: 'noakun', require: true, edit: true, visible: true, skip: false, labelRender: 'search', itemRender: 'search'},
      {header: 'Nama Akun', width: '200', item: 'namaakun', require: false, edit: true, visible: true, skip: true, labelRender: '', itemRender: ''},
      {header: 'Amount', width: '120', item: 'amount', require: false, edit: true, visible: true, skip: false, labelRender: '', itemRender: ''},
      {header: 'Foreign Amount', width: '120', item: 'foreignamount', require: false, edit: true, visible: true, skip: true, labelRender: 'nominal', itemRender: 'nominal'},
      {header: 'Note', width: '300', item: 'note', require: false, edit: true, visible: true, skip: false, labelRender: '', itemRender: ''},
      {header: 'Cost Center', width: '120', item: 'costcenter', require: false, edit: true, visible: true, skip: false, labelRender: '', itemRender: ''},
      {header: 'Divisi', width: '120', item: 'divisi', require: false, edit: true, visible: true, skip: false, labelRender: '', itemRender: ''},
      {header: 'Sub Divisi', width: '120', item: 'subdivisi', require: false, edit: true, visible: true, skip: false, labelRender: '', itemRender: ''},
      {header: 'Proyek', width: '120', item: 'proyek', require: false, edit: true, visible: true, skip: false, labelRender: '', itemRender: ''},
      {header: 'Custom 1', width: '120', item: 'custom1', require: false, edit: true, visible: true, skip: true, labelRender: '', itemRender: ''},
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
    ref.txtmatauang.onkeydown = this.handleKeyNavigator;
    ref.txtkurs.onkeydown = this.handleKeyNavigator;
    // ref.txtprogress.onkeydown = this.handleKeyNavigator;

    this.setFocus(ref.txtterimadari);
    let computedStyle = getComputedStyle(ref.divRoot);
    ref.width = computedStyle.width - 20;
    // console.log(computedStyle.width);
  }

  setFocus = id =>
  {
    if(id)
    {
      this.focus.curId = id;
      this.focus.curIndex = id.tabIndex;
      id.focus();

      if(id.id === 'dg')
      {
        dg.setRowIndexColIndex(dg.rowIndex, dg.colIndex);
      }
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
      case 'Tab':
          if(!e.shiftKey)
            this.nextFocus(e.target);
          else if(e.shiftKey)
            this.prevFocus(e.target);
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

  searchFilter = target =>
  {
    const { dgData } = this.state;
    const s = this.state;

    let source = '', id = '',  sort = '', apifilter = '', apipagenumber = 0, apilimit = 0, csfilter = '', csfield = 0, cscheckbox = false;

    switch(target)
    {
      case 'txtterimadari':
        source = 'contact';
        apifilter = `kaktif=1 and kkode = "${s.txtterimadari}"`;
        csfilter = 'kaktif=1';
        csfield = 2;
        sort = 'kkode asc';
        break;
      case "txtmatauang":
        source = 'currency';
        // apifilter = 'caktif=1 AND ckode = "'+s.txtmatauang+'"';
        // csfilter = 'caktif=1';
        sort = 'ckode asc';
        break
      case "txtakunkas":
        source = 'coa';
        apifilter = '(cgd = "D" and caktif = 1) and (ctipe = 0) and (cmatauang = "'+s.txtmatauang+'") and cnomor ="'+s.txtakunkas+'"';
        csfilter = '(cgd = "D" and caktif = 1) and (ctipe = 0) and (cmatauang = "'+s.txtmatauang+'")';
        csfield = 0;
        sort = 'cnomor asc';
        break;
      case "noakun":
        source = "coa";
        apifilter = '(cgd = "D" and caktif = 1) and (cmatauang = "'+s.txtmatauang+'") and cnomor = "'+dgData[dg.rowIndex].noakun+'"';
        csfilter = '(cgd = "D" and caktif = 1) and (cmatauang = "'+s.txtmatauang+'")';
        sort = 'cnomor asc';
        break;
      case "costcenter": 
        source = "cost_center";
        apifilter = 'ccaktif=1 AND cckode = "'+dgData[dg.rowIndex].costcenter+'"';
        csfilter = 'ccaktif=1';
        sort = 'cckode asc';
        break;
      case "divisi":
        source = "division";
        apifilter = 'daktif=1 AND dkode = "'+dgData[dg.rowIndex].divisi+'"';
        csfilter = 'daktif=1';
        sort = 'dkode asc';
        break;
      case "subdivisi":
        source = "subdivision";
        apifilter = 'sdkode = "'+dgData[dg.rowIndex].subdivisi+'" AND sddivisi="'+dgData[dg.rowIndex].divisi+'" AND sdaktif=1';
        csfilter = 'sdaktif=1 AND sddivisi="'+dgData[dg.rowIndex].divisi+'"';
        sort = 'sddivisi asc';
        break;
      case "proyek":
        source = "project";
        apifilter = 'paktif=1 AND pkode = "'+dgData[dg.rowIndex].proyek+'"';
        csfilter = 'paktif=1';
        sort = 'pkode asc';
        break;
    }

    return {source , id,  sort, apifilter, apipagenumber, apilimit, csfilter, csfield, cscheckbox};
  }

  SetVariable = param =>
  {
    const { success, target, data } = param;
    if(success)
    {
      switch(target)
      {
        case 'txtterimadari':
          this.setState({txtterimadari: data.get('kkode'), lbltxtterimadari: data.get('knama')});
          break;
        case 'txtakunkas':
          this.setState({txtakunkas: data.get('cnomor'), lbltxtakunkas: data.get('cnama')});
          break;
        case 'txtmatauang':
          this.setState({txtmatauang: data.get('ckode')});
          break;
        case 'noakun':
          const { dgData } = this.state;
          dgData[dg.rowIndex].noakun = data.get('cnomor');
          dgData[dg.rowIndex].namaakun = data.get('cnama');
          this.setState({dgData: dgData});
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
        case 'txtmatauang':
          this.setState({txtmatauang: ''});
          break;
        case 'noakun':
          const { dgData } = this.state;
          dgData[dg.rowIndex].noakun = '';
          dgData[dg.rowIndex].namaakun = '';
          this.setState({dgData: dgData});
          break;
      }
    }
  }

  handleOpenDialog = (source, target, current, targetDg, filter) =>
  {
    ref[target].focus();
    this.source = source;
    this.target = (targetDg) ? targetDg : target;
    this.current = current;
    this.filter = filter;
    this.setState({openDialog: true});
  }

  handleCloseDialog = (param) =>
  {
    if(this.state.openDialog)
    {
      if(this.target.indexOf('txt') === -1 && this.target.indexOf('cmb') === -1)
      {
        this.setFocus(ref.dg)
        if(param)
        {
          if(param.success)
          {
          }
          else
          {
          }
        }
      }
      else
        this.setFocus(ref[this.target]);
      this.setState({openDialog:false});
    }
    else if(this.target.indexOf('txt') === -1 && this.target.indexOf('cmb') === -1)
    {
      this.setFocus(ref.dg)
    }
  }

  handleUpdate = (id, value) =>
  {
    Rendering = false;
    this.setState({[id] : value});
  }

  getData = (id, value, render) =>
  {
    if(id === 'dgData') 
    {
      Rendering = (render) ? render : false;
      this.setState({dgData : value});
    }
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

  clickSave = () =>
  {
    const userid = 1;
    const isUpdate = 1;
    const target = 'txtsearch';
    const source = 'cr';
    const utama = '{"crid":"76", "crcabang":"KI", "crlokasi":"I", "crsumber":"CR", "crautonotransaksi":"1", "crnotransaksi":"KIWIPCR20190114", "crtgl":"2019-01-15", "crkodepa":"19", "crkontak":"1", "crkontakperson":"", "crnorek":"110101.001", "cruraian":"Plastik Pembungkus", "crcatatan":"", "crmatauang":"IDR", "crkurs":"1", "crjumlah":"1500000", "crjumlahvalas":"0", "crjumlahbayar":"0", "crjumlahbayarvalas":"0", "crstatusbayar":"0", "crtgllunas":"1971-01-01", "crstatus":"2", "crstatussebelumnya":"0", "crjmlrevisi":"1", "crcetakanke":"0", "crisclose":"0", "crinputuser":"1", "crinputtgl":"2019-01-17", "crmodifikasiuser":"1", "crmodifikasitgl":"2019-05-23", "crposting":"1",  "crpostingtgl":"1971-01-01", "crcustomtext1":"", "crcustomtext2":"", "crcustomtext3":"", "crcustomtext4":"", "crcustomtext5":"", "crcustomint1":"0", "crcustomint2":"0", "crcustomint3":"0", "crcustomdbl1":"0", "crcustomdbl2":"0", "crcustomdbl3":"0", "crcustomdate1":"1971-01-01", "crcustomdate2":"1971-01-01", "crcustomdate3":"1971-01-01"}';
    const detail = '[{"idcrdetail":"0", "idcr":"0", "norek":"110101.001", "matauang":"IDR", "kurs":"1", "jumlah":"500000", "jumlahvalas":"0", "catatan":"", "costcenter":"", "divisi":"", "subdivisi":"", "proyek":"", "urutan":"1", "isclose":"0", "customtext1":"", "customtext2":"", "customtext3":"", "customdbl1":"0", "customdbl2":"0", "customdbl3":"0", "customdate1":"1971-01-01", "customdate2":"1971-01-01", "customdate3":"1971-01-01"},{"idcrdetail":"0", "idcr":"0", "norek":"110101.001", "matauang":"IDR", "kurs":"1", "jumlah":"500000", "jumlahvalas":"0", "catatan":"", "costcenter":"", "divisi":"", "subdivisi":"", "proyek":"", "urutan":"2", "isclose":"0", "customtext1":"", "customtext2":"", "customtext3":"", "customdbl1":"0", "customdbl2":"0", "customdbl3":"0", "customdate1":"1971-01-01", "customdate2":"1971-01-01", "customdate3":"1971-01-01"}]';
    API.SAVE_TRANSACTION({target, source, userid, isUpdate, utama, detail}).then(this['API_Result']);  
  }

  render() 
  {
    const { classes } = this.props;
    const title = brand.name + ' - Table';
    const description = brand.desc;

    let lastTabIndex = 5;

    const addIcon = (title, idIcon, handleClick) => 
    {
      return (
        <IconButton title={title} onClick={handleClick} >
          <Icon >{idIcon}</Icon>
        </IconButton>
      )
    };
    
    if(dg.focus)
    dg.focus.focus();
    
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

        <Toolbar className={classes.toolbar} >
          <div className={classes.title}>
            <Typography variant="h6">Cash Receipt</Typography>
          </div> 
          <div className={classes.spacer} />
          {addIcon('Reset', 'refresh', () => this.showData(''))}
          {addIcon('Open Transaction', 'folder_open', () => this.showData(''))}
          {addIcon('Save', 'save', () => this.clickSave(''))}
        </Toolbar>
        <br />

          <Grid container id='gridContainer' ref={this.setRef}>
            <Grid item xs={12} sm={7}>
              <TxtSearch tabIndex={1} key={1} width='170' marginLabel='20%' id='txtterimadari' searchFilter={this.searchFilter} label='Terima Dari' handleOpenDialog={this.handleOpenDialog} onKeyDown={this.handleKeyTerimaDari} onUpdate={this.handleUpdate} setRef={this.setRef} placeholder=''  value={this.state['txtterimadari']} valueName={this.state['lbltxtterimadari']} SetVariable={this.SetVariable}/>
              <TxtSearch tabIndex={2} key={2} width='170' marginLabel='20%' id='txtakunkas' searchFilter={this.searchFilter} label='Akun Kas [D]' handleOpenDialog={this.handleOpenDialog} onKeyDown={this.handleKeyNavigator} setRef={this.setRef} placeholder=''  onUpdate={this.handleUpdate} value={this.state['txtakunkas']} valueName={this.state['lbltxtakunkas']} SetVariable={this.SetVariable} />
              <TxtInput tabIndex={3} key={3} width='250' marginLabel='20%' id='txturaian' label='Uraian' setRef={this.setRef} placeholder=''  value={this.state['txturaian']} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <div style={{width: '300px', float: 'right'}}>
              <TxtInput tabIndex={++lastTabIndex} key={lastTabIndex} type='date' width='200' marginLabel='100px' id='txttanggal' label='Tanggal' onKeyDown={this.handleKeyTanggal} setRef={this.setRef} placeholder=''  value={this.state['txttanggal']} />
              <TxtNoTransaksi tabIndex={++lastTabIndex} key={lastTabIndex} width='140' marginLabel='100px' id='txtnotransaksi' label='No Transaksi' setRef={this.setRef} placeholder=''  value={this.state['txtntoransaksi']} />
              <Grid container>
                <Grid item xs={12} sm={8}>
                  <TxtSearch tabIndex={++lastTabIndex} key={lastTabIndex} width='70' marginLabel='100px' searchFilter={this.searchFilter} handleOpenDialog={this.handleOpenDialog} id='txtmatauang' label='Uang' setRef={this.setRef} placeholder='' onKeyDown={this.handleKeyNavigator}  SetVariable={this.SetVariable} onUpdate={this.handleUpdate} value={this.state['txtmatauang']} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TxtInput tabIndex={++lastTabIndex} key={lastTabIndex} width='55' marginLabel='43px' id='txtkurs' label='Kurs' setRef={this.setRef} placeholder=''  value={this.state['txtkurs']} />
                </Grid>
              </Grid>
              <TxtComboBox tabIndex={++lastTabIndex} data={this.progress} key={lastTabIndex} width='200' marginLabel='100px' id='txtprogress' label='Progress' onKeyDown={this.handleKeyProgress} setRef={this.setRef} placeholder=''  value={this.state['txtprogress']} />
              </div>
            </Grid>
          </Grid>
          <DataGrid id='dg' column={this.grid} onClose={this.handleCloseDialog} searchFilter={this.searchFilter} getData={this.getData} data={this.state.dgData} width={ref.width} height={200} setRef={this.setRef} tabIndex={4}
            handleOpenDialog={this.handleOpenDialog} onKeyDown={this.dgKeyDown} SetVariable={this.SetVariable} dg={dg} />
        </PapperFix>

        <CompSearch onClose={this.handleCloseDialog} open={this.state.openDialog} 
        SetVariable={this.SetVariable} source={this.source} target={this.target} current={this.current} filter={this.filter}/>
        
      </div>
    );
  }
}

export default withWidth()(withStyles(styles)(CR));