(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"3f07096b28058a8692a8":function(e,t,a){var n=a("af57a772512d7bb4ff24");"string"===typeof n&&(n=[[e.i,n,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};a("1e4534d1d62a11482e97")(n,r);n.locals&&(e.exports=n.locals)},"97ae8bc4c4b7bdf305e0":function(e,t,a){"use strict";a.r(t);var n,r=a("8af190b70a6bc55c6f1b"),o=a.n(r),i=a("0d7f0986bcd2f33d8a2a"),s=a("1037a6e0d5914309f74c"),c=a.n(s),l=a("6938d226fd372a75cbf9"),d=a("4dd2a92e69dcbe1bab10"),u=a("c63fd729d2fbc9bcb59d"),f=a("435859b6b76fb67a754a"),p=a.n(f),h=a("07460803b00a50e0385f"),b=a("2aea235afd5c55b8b19b"),g=a.n(b),v=a("10e4c616cb3b01bafafd"),m=a.n(v),x=a("1551459233b95bf53af9"),w=a.n(x),y=a("eb6b79030a47f0b10efc"),k=a.n(y),D=a("b02fe3f80d4238b52f20"),I=a.n(D),R=a("817b8949a6e078ba5ad0"),C=a.n(R),S=a("ef58856f4f875bd36582"),O=a.n(S),F=a("e799c547a20a503b338f"),P=a.n(F),_=a("b912ecc4473ae8a2ff0b"),A=a.n(_),K=a("2abb2ecfab271efcf057"),N=a.n(K),j=a("f466c6fac21e2bd173f8"),T=a.n(j),E=a("f0d76769f542545382df"),L=a.n(E),U=a("2de20a79156911f204a2"),V=a.n(U),M=a("a289f12938702445a8e7"),q=a.n(M),B=a("ea0b630a63dab025c838"),H=a.n(B),W=a("2c0e81257251908457a7"),G=a("e727e731a9bed8ec3c2a"),J=a.n(G),z=a("299a81d595ed571e9e75"),$=a("54f683fcda7806277002");function X(){return(X=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function Q(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}function Y(e,t,a,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&o)for(var s in o)void 0===t[s]&&(t[s]=o[s]);else t||(t=o||{});if(1===i)t.children=r;else if(i>1){for(var c=new Array(i),l=0;l<i;l++)c[l]=arguments[l+3];t.children=c}return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function Z(e){return(Z="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ee(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function te(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function ae(e,t,a){return t&&te(e.prototype,t),a&&te(e,a),e}function ne(e,t){return!t||"object"!==Z(t)&&"function"!==typeof t?se(e):t}function re(e){return(re=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function oe(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ie(e,t)}function ie(e,t){return(ie=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function se(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ce(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var le,de={},ue=0,fe=0,pe=!1,he=!1,be=Y("option",{value:"All"},"All","All"),ge=Y(L.a,{align:"center"},"hcellno00","No"),ve=function(e){function t(e,a){var n;return ee(this,t),ce(se(se(n=ne(this,re(t).call(this,e,a)))),"maxData",0),ce(se(se(n)),"focus",{}),ce(se(se(n)),"setRef",function(e){e&&(de[e.id]=e)}),ce(se(se(n)),"componentWillReceiveProps",function(e){var t=e.source,a=e.current,r=e.filter;!n.props.open&&e.open&&(he=!0,z.a.GETDATA_COMPSEARCH({target:"txtsearch",filter:r,filterSearch:a||"",page:1,limit:10,source:t,operator:"contains",column:"All"}).then(n.API_Result))}),ce(se(se(n)),"shouldComponentUpdate",function(e){return!(n.props.open&&!e.open)||(n.setState({title:"",header:[],dataTable:Object($.fromJS)([]),count:1,page:1,limit:1,last_page:1,txtsearch:""}),!1)}),ce(se(se(n)),"componentDidUpdate",function(){if(null!==de.tb.current&&n.props.open){if(de.tbData=de.tb.current,de.tr=de.tbData.children[1].children,0!==de.tr.length){var e=function(e){"object"==Z(de.tr[e])&&(de["tr".concat(e)]=de.tr[e],de["tr".concat(e)].className=e%2==0?n.props.classes.tdWhite:n.props.classes.tdReset,de["tr".concat(e)].addEventListener("mouseover",function(){return n.tableOnMouseOver(e)}),de["tr".concat(e)].addEventListener("mouseleave",n.tableOnMouseLeave),de["tr".concat(e)].addEventListener("click",function(){return n.tdClick(e)}),e<n.maxData&&de["tr".concat(e)].addEventListener("dblclick",function(){n.props.SetVariable({succes:!0,target:n.props.target,data:n.state.dataTable.get(e)}),n.props.onClose({target:"cs",succes:!0})}))};for(var t in de.tr)e(t);for(var a in de.cmbcolumn.onkeydown=n.handleKeyFirstTabIndex,de.tbData.onkeydown=n.tableOnKeyDown,n.focus.arrRef=[],de)void 0!==de[a].tabIndex&&parseInt(de[a].tabIndex)>=0&&n.focus.arrRef.push({index:de[a].tabIndex,id:de[a].id});n.focus.max=n.focus.arrRef.length,n.focus.arrRef.sort(function(e,t){return parseInt(e.index)-parseInt(t.index)}),n.focus.minIndex=n.focus.arrRef[0].index,n.focus.maxIndex=n.focus.arrRef[n.focus.max-1].index,n.maxData>0&&n.setRowIndex(0)}n.setFocus(de.txtsearch)}}),ce(se(se(n)),"setFocus",function(e){n.focus.curId=e,n.focus.curIndex=e.tabIndex,e.focus()}),ce(se(se(n)),"nextFocus",function(){var e;if(n.focus.curIndex>=n.focus.maxIndex)de[n.focus.arrRef[0].id].focus();else for(var t in n.focus.arrRef)if(t==n.focus.max-1)n.setFocus(de[n.focus.arrRef[0].id]);else if(n.focus.arrRef[t].index===n.focus.curIndex){e=n.focus.arrRef[parseInt(t)+1].id,n.setFocus(de[e]);break}}),ce(se(se(n)),"prevFocus",function(){var e;if(n.focus.curIndex==n.focus.minIndex)de[n.focus.arrRef[n.focus.maxIndex].id].focus();else for(var t in n.focus.arrRef){if(n.focus.arrRef[t].index==n.focus.curIndex){e=n.focus.arrRef[parseInt(t)-1].id,n.setFocus(de[e]);break}0==t&&n.setFocus(de[n.focus.arrRef[n.focus.max-1].id])}}),ce(se(se(n)),"resetCurrentPrevFocus",function(e){var t=n.props.classes;de["tr".concat(e)].className=e%2==0?t.tdWhite:t.tdReset}),ce(se(se(n)),"setRowIndex",function(e){ue=parseInt(e),pe&&(de["tr".concat(fe)].className=n.props.classes.trHover),de["tr".concat(e)].className=n.props.classes.tdSelected,de.tbData.focus(),de["tr".concat(e)].focus()}),ce(se(se(n)),"tdClick",function(e){e>=n.maxData||(ue!=e&&e<n.maxData&&n.resetCurrentPrevFocus(ue),"undefined"===typeof de["tr".concat(e)]||e>=n.maxData?de["tr".concat(e)].focus():n.setRowIndex(e))}),ce(se(se(n)),"tableOnMouseOver",function(e){var t=n.props.classes;e<n.maxData&&(pe=!0,fe=parseInt(e),parseInt(fe)!==parseInt(ue)&&(de["tr".concat(e)].className=t.trHover))}),ce(se(se(n)),"tableOnMouseLeave",function(){fe<n.maxData&&(pe=!1),parseInt(fe)!==parseInt(ue)&&n.resetCurrentPrevFocus(fe)}),ce(se(se(n)),"handleKeyFirstTabIndex",function(e){"Tab"===e.key&&e.shiftKey&&(n.prevFocus(),e.preventDefault())}),ce(se(se(n)),"handleClose",function(){n.props.SetVariable({succes:!1,target:n.props.target,data:[]}),n.props.onClose({target:"cs",succes:!1})}),ce(se(se(n)),"searchKeyDown",function(e){switch(e.key){case"ArrowDown":ue<n.maxData&&(n.nextFocus(),n.setRowIndex(ue),e.preventDefault());break;case"Enter":""===de.txtsearch.value?(n.nextFocus(),n.setRowIndex(ue)):n.showDataPage(1),e.preventDefault();break;case"Escape":n.handleClose;break;case"PageUp":n.state.page>1&&n.showDataPage(parseInt(n.state.page)-1);break;case"PageDown":n.state.page<n.state.last_page&&n.showDataPage(parseInt(n.state.page)+1);break;case"Home":n.showDataPage(1);break;case"End":n.showDataPage(n.state.last_page)}}),ce(se(se(n)),"focusTable",function(){n.setFocus(de.tbData)}),ce(se(se(n)),"tableOnKeyDown",function(e){switch(e.key){case"Tab":e.shiftKey?e.shiftKey&&(n.prevFocus(),e.preventDefault()):(n.nextFocus(),e.preventDefault());break;case"ArrowUp":if(ue-1<0)return n.prevFocus(),void e.preventDefault();n.resetCurrentPrevFocus(ue),n.setRowIndex(ue-1);break;case"ArrowDown":if(ue<n.maxData){if(ue+1>=n.maxData)return;n.resetCurrentPrevFocus(ue),n.setRowIndex(ue+1)}break;case"Enter":n.handleClickChoose();break;case"Escape":n.handleClose();break;case"PageUp":n.state.page>1&&n.showDataPage(parseInt(n.state.page)-1);break;case"PageDown":n.state.page<n.state.last_page&&n.showDataPage(parseInt(n.state.page)+1);break;default:e.preventDefault()}}),ce(se(se(n)),"showDataPage",function(e){var t=n.props.source,a=de.cmbcolumn[de.cmbcolumn.selectedIndex].value,r=de.cmboperator[de.cmboperator.selectedIndex].value;z.a.GETDATA_COMPSEARCH({target:"txtsearch",filter:"",filterSearch:de.txtsearch.value,page:e,limit:10,source:t,operator:r,column:a}).then(n.API_Result)}),ce(se(se(n)),"API_Result",function(e){var t=e.succes,a=e.data,r=e.target;if(t)switch(r){case"txtsearch":var o=a.data,i=o.current_page*o.per_page-o.per_page;o.data.map(function(e,t){o.data[t].no=t+1+i}),he?n.setState({title:a.title||"",header:a.header||[],dataTable:Object($.fromJS)(o.data)||Object($.fromJS)([]),count:o.total||1,page:o.current_page||1,limit:o.per_page||1,last_page:0==o.last_page?1:o.last_page,txtsearch:n.props.current||""}):n.setState({title:a.title||"",header:a.header||[],dataTable:Object($.fromJS)(o.data)||Object($.fromJS)([]),count:o.total||1,page:o.current_page||1,limit:o.per_page||1,last_page:0==o.last_page?1:o.last_page})}else n.setState({dataTable:Object($.List)([]),title:"",header:"",notifMsg:"",count:0,page:1,limit:4,last_page:1})}),ce(se(se(n)),"handleBlur",function(e,t){n.setState(ce({},e,t))}),ce(se(se(n)),"handleClickChoose",function(){n.state.dataTable.get(ue)?(n.props.SetVariable({succes:!0,target:n.props.target,data:n.state.dataTable.get(ue)}),n.props.onClose({target:"cs",succes:!0})):alert("Select data first")}),de.tb=o.a.createRef(),n.state={target:e.target,txtsearch:e.txtsearch,dataTable:Object($.List)([]),title:"",header:"",notifMsg:"",count:0,page:1,limit:4,last_page:1},n}return oe(t,o.a.Component),ae(t,[{key:"render",value:function(){var e,t,a,n,r=this,i=this.props.classes,s=this.state,c=s.title,l=s.header,d=s.dataTable,u=s.page,f=s.last_page,p=[be];for(var h in l)n=l[h][0],a=l[h][1],p.push(Y("option",{value:n},n,a));var b=["contains","=","!=","<","<=",">",">=","begin with","end with"],v=[];for(var x in b)v.push(Y("option",{value:b[x]},b[x]+x,b[x]));var y,D=[ge],I=[];for(var R in l){switch(parseInt(l[R][3]?0:l[R][3])){case 0:y="left";break;case 1:y="center";break;case 2:y="right";break;default:y="left"}D.push(Y(L.a,{align:y},"hcell"+R,l[R][1]))}d.map(function(e,t){var a=[Y(L.a,{width:"50",align:"center"},"cellno"+e.get("no"),e.get("no"))];for(var n in l){switch(parseInt(l[n][3]?0:l[n][3])){case 0:y="left";break;case 1:y="center";break;case 2:y="right";break;default:y="left"}-1===l[n][2]?a.push(Y(L.a,{align:y},"cell"+(t+n),e.get(l[n][0]))):a.push(Y(L.a,{align:y,width:l[n][2]},"cell"+(t+n),e.get(l[n][0])))}I.push(Y(q.a,{disabled:!0},"row"+t,a))});for(var C=I.length;C<10;C++){var S=[Y(L.a,{width:"50",align:"center",height:"10"},"cellno"+C)];for(var F in l)-1===l[F][2]?S.push(Y(L.a,{},"cell"+(C+F))):S.push(Y(L.a,{width:l[F][2]},"cell"+(C+F)));I.push(Y(q.a,{disabled:!0},"row"+C,S))}return this.maxData=d.size,Y(J.a,{fullWidth:!0,maxWidth:"md",open:this.props.open,onClose:this.handleClose,children:"kosong",PaperComponent:we},void 0,Y(k.a,{id:"draggable-dialog-title",style:{margin:0,padding:"10px 0 5px 20px",cursor:"move"}},void 0,"Cari ",c),Y(w.a,{style:{margin:0,padding:"0 10px 10px 10px"}},void 0,Y("div",{style:{display:"flex",marginBottom:"30px"}},void 0,Y("div",{style:{height:"20px",width:"120px"}},void 0,o.a.createElement("select",(ce(e={id:"cmbcolumn",key:"cmbcolumn",name:"cmbcolumn",className:"text-input",tabIndex:81},"key",81),ce(e,"style",{height:"35px",width:"100%",textAlign:"center"}),ce(e,"ref",this.setRef),ce(e,"title","Column"),e),p)),Y("div",{style:{height:"20px",marginLeft:"10px",width:"120px"}},void 0,o.a.createElement("select",(ce(t={id:"cmboperator",key:"cmboperator",name:"cmboperator",className:"text-input",tabIndex:82},"key",82),ce(t,"style",{height:"35px",width:"100%",textAlign:"center"}),ce(t,"ref",this.setRef),ce(t,"title","Operator"),t),v)),Y("div",{style:{height:"20px",marginLeft:"10px",width:"calc(100% - 50px - 130px - 130px)"}},void 0,Y(xe,{tabIndex:83,keyProp:83,setRef:this.setRef,val:this.state.txtsearch,onBlur:function(e){return r.handleBlur("txtsearch",e)},id:"txtsearch",onKeyDown:this.searchKeyDown})),Y("div",{style:{height:"20px",width:"50px"}},void 0,Y(P.a,{id:"btnsearch",title:"Search",className:i.btn,onClick:function(){return r.showDataPage(1)}},void 0,Y(O.a,{className:i.icon},void 0,"search")))),Y(H.a,{rootRef:de.tb},void 0,Y(N.a,{id:"tbData",tabIndex:84,style:{margin:0},className:A()(i.table,i.bordered,i.small)},84,Y(V.a,{},void 0,Y(q.a,{},void 0,D)),Y(T.a,{},void 0,I)))),Y("div",{style:{marginTop:"-20px",width:"75%"}},void 0,Y(W.a,{curpage:u,totpages:f,boundaryPagesRange:1,siblingPagesRange:1,hideEllipsis:!1,onChange:this.showDataPage})),Y(m.a,{style:{margin:0,padding:0,marginTop:"-35px"}},void 0,Y(g.a,{onClick:this.handleClickChoose,color:"primary"},void 0,"Choose"),Y(g.a,{onClick:this.handleClose,color:"primary"},void 0,"Cancel")))}}]),t}(),me=Object(l.withStyles)(h.a)(ve),xe=function(e){function t(e,a){var n;return ee(this,t),ce(se(se(n=ne(this,re(t).call(this,e,a)))),"componentWillReceiveProps",function(e){he&&(he=!1,n.setState({val:e.val||""}))}),n.state={val:e.val||"",blur:!0},n}return oe(t,o.a.Component),ae(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.id,n=(t.onChange,t.width,t.onKeyDown),r=t.setRef,i=(t.onBlur,t.tabIndex),s=t.keyProp,c=Q(t,["id","onChange","width","onKeyDown","setRef","onBlur","tabIndex","keyProp"]);return o.a.createElement("input",X({type:"text",value:this.state.val||"",ref:r||null,onChange:function(t){return e.setState({val:t.target.value||"",blur:!0})},onKeyDown:n,autoFocus:!0},c,{tabIndex:i,key:s,label:"Search",style:{width:"100%"},id:a,className:"text-input",autoFocus:!0,placeholder:"Filter in here"}))}}]),t}(),we=function(e){return Y(C.a,{cancel:'[class*="MuiDialogContent-root"]'},void 0,o.a.createElement(I.a,e))},ye=a("282d5645b44ba868741e"),ke=a.n(ye),De=a("05c8eb146240928faf44");function Ie(e){return(Ie="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Re(e,t,a,n){le||(le="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),t&&r)for(var i in r)void 0===t[i]&&(t[i]=r[i]);else t||(t=r||{});if(1===o)t.children=n;else if(o>1){for(var s=new Array(o),c=0;c<o;c++)s[c]=arguments[c+3];t.children=s}return{$$typeof:le,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function Ce(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function Se(e){return(Se=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Oe(e,t){return(Oe=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Fe(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Pe(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var _e,Ae={},Ke=0,Ne=0,je=!1,Te=0,Ee=0,Le=0,Ue=!0,Ve=!1,Me={},qe=function(e){function t(e,a){var n,r,i;for(var s in function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,i=Se(t).call(this,e,a),n=!i||"object"!==Ie(i)&&"function"!==typeof i?Fe(r):i,Pe(Fe(Fe(n)),"dg",function(e,t,a){var r=n.state.dg,o=n.props.column;return(a||""===a)&&(r[e][o[t].item]=a),n.props.getData("dgData",r),void 0===r[e][o[t].item]?"":r[e][o[t].item]}),Pe(Fe(Fe(n)),"getDataDG",function(e,t){var a=n.state.dg,r=n.props.column;return void 0===a[e][r[t].item]?"":a[e][r[t].item]}),Pe(Fe(Fe(n)),"dgAdd",function(){var e=n.state.dg,t=n.props.column,a=e.length;Ve=!0,e[a]={},n.props.getData("dgData",e);for(var r=0;r<t.length;r++)"no"===t[r].item?n.dg(a,r,parseInt(a)+1):"nominal"===t[r].labelRender?n.dg(a,r,0):n.dg(a,r,"");n.props.getData("dgData",e,!0)}),Pe(Fe(Fe(n)),"setRef",function(e){e&&(Ae[e.id]=e)}),Pe(Fe(Fe(n)),"dgKeyDown",function(e){var t=n.props,a=t.column,r=t.handleOpenDialog,o=n.props.data;if(!n.state["editing"+Ee+Te])switch(e.key){case"Enter":if("search"===a[Te].labelRender&&""==n.getDataDG(Ee,Te))return r("coa","tbtxt"+Ee+Te,"",a[Te].item),void e.preventDefault();for(var i=parseInt(Te)+1;i<a.length;i++)if(!a[i].skip)return n.resetCurrentPrevFocus(Ee,Te),n.setRowIndexColIndex(Ee,i),void e.preventDefault();n.resetCurrentPrevFocus(Ee,Te),n.setScroll(0);for(var s=0;s<a.length;s++)if(a[s].require&&""===n.getDataDG(Ee,s))return n.setRowIndexColIndex(Ee,s),void e.preventDefault();Ee===n.state.dg.length-1?(n.dgAdd(),Ee=n.state.dg.length-1):Ee=parseInt(Ee)+1,Te=0;for(var c=0;c<a.length;c++)if(!a[c].skip){Te=c;break}n.setRowIndexColIndex(Ee,Te),n.setState({dg:n.state.dg}),e.preventDefault();break;case"ArrowLeft":if(0==Te){if(0==Ee)return;n.resetCurrentPrevFocus(Ee,Te),n.setRowIndexColIndex(Ee-1,n.props.column.length-1)}else n.resetCurrentPrevFocus(Ee,Te),n.setRowIndexColIndex(Ee,Te-1);e.preventDefault();break;case"ArrowRight":if(Te==n.props.column.length-1){if(Ee==n.state.dg.length-1)return;n.resetCurrentPrevFocus(Ee,Te),n.setRowIndexColIndex(parseInt(Ee)+1,0)}else parseInt(Te)+1<=n.props.column.length-1&&(n.resetCurrentPrevFocus(Ee,Te),n.setRowIndexColIndex(Ee,parseInt(Te)+1));e.preventDefault();break;case"ArrowUp":if(Ee-1<0)return;n.resetCurrentPrevFocus(Ee,Te),n.setRowIndexColIndex(Ee-1,Te),e.preventDefault();break;case"ArrowDown":if(parseInt(Ee)+1>=n.state.dg.length){for(var l=n.props.column,d=0;d<l.length;d++)if(l[d].require&&""===n.getDataDG(Ee,d))return;return n.resetCurrentPrevFocus(Ee,Te),n.dgAdd(),Te=1,Ee=n.state.dg.length-1,void n.setState({dg:n.state.dg})}n.resetCurrentPrevFocus(Ee,Te),n.setRowIndexColIndex(parseInt(Ee)+1,Te),e.preventDefault();break;case"Delete":var u="Delete baris ke ".concat(parseInt(Ee)+1," ?");n.setRowIndexColIndex(Ee,Te),Me.open(u,function(e){if(e.ok)if(n.resetCurrentPrevFocus(Ee,Te),o.splice(Ee,1),Ee>o.length-1&&(Ee=o.length-1),0===o.length)n.dgAdd(),Ee=0;else{console.log("aa");for(var t=Ee;t<o.length;t++)o[t].no=parseInt(t)+1;o.focus=Ae["td"+Ee+Te],n.props.getData("dgData",o,!0)}n.setRowIndexColIndex(Ee,Te)}),e.preventDefault();break;case"F2":a[Te].edit&&n.setState(Pe({},"editing"+Ee+Te,!0)),e.preventDefault();break;case"F12":n.props.handleOpenDialog("coa","tbtxt"+Ee+Te,"",a[Te].item,""),e.preventDefault();break;default:var f;if(""!=n.NumToChar(e.which)&&a[Te].edit)n.dg(Ee,Te,""),n.setState((Pe(f={dg:n.state.dg},"editing"+Ee+Te,!0),Pe(f,"prevVal"+Ee+Te,n.getDataDG(Ee,Te)),f)),Ae["tbtxt"+Ee+Te].focus();else n.props.onKeyDown(e)}}),Pe(Fe(Fe(n)),"NumToChar",function(e){if(e>47&&e<58){return"0123456789".charAt(e-48)}if(e>64&&e<91){return"ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(e-65)}if(e>96&&e<123){return"abcdefghijklmnopqrstuvwxyz".charAt(e-97)}if(96==e){return"0".charAt(0)}return""}),Pe(Fe(Fe(n)),"editRowIndexColIndex",function(){n.setState({editing01:!0})}),Pe(Fe(Fe(n)),"setRowIndexColIndex",function(e,t){Ae["td"+Ee+Te]&&(Ee=e,Te=t,n.props.dg.rowIndex=Ee,n.props.dg.colIndex=Te,Ae["td"+Ee+Te].className=n.props.classes.tdSelected,Ae["td"+Ee+Te].focus())}),Pe(Fe(Fe(n)),"tdOnKeyDown",function(e,t,a,r){var o,i;switch(e.key){case"Enter":Ae["blur"+t+a]=!1,n.dg(t,a,r),n.setState((Pe(o={},"editing"+t+a,!1),Pe(o,"dg",n.state.dg),o)),Ae["td"+t+a].focus(),e.preventDefault();break;case"Escape":Ae["blur"+t+a]=!1,n.dg(t,a,n.state["prevVal"+t+a]),n.setState((Pe(i={},"editing"+t+a,!1),Pe(i,"dg",n.state.dg),i)),Ae["td"+t+a].focus(),e.preventDefault();break;default:Ae["blur"+t+a]=!0}}),Pe(Fe(Fe(n)),"handleScroll",function(){Ae.divTable.scrollLeft<=Ae.divHeader.scrollLeftMax?Ae.divHeader.scrollLeft=Ae.divTable.scrollLeft:Ae.divTable.scrollLeft=Ae.divHeader.scrollLeftMax}),Pe(Fe(Fe(n)),"setScroll",function(e){Ae.divHeader.scrollLeft=e,Ae.divTable.scrollLeft=e}),Pe(Fe(Fe(n)),"tdDblClick",function(e,t){n.props.column[t].edit&&(n.setState(Pe({},"editing"+e+t,!0)),Ae["tbtxt"+Ee+Te].focus())}),Pe(Fe(Fe(n)),"tdBlur",function(e,t){var a=n.props.classes;Ee===e&&t===Te&&(Ae["td"+Ee+Te].className=a.tdhover,Ae["td"+Ee+Te].focus())}),Pe(Fe(Fe(n)),"tdOnMouseOver",function(e,t){var a=n.props.classes;Ke=e,Ne=t,je=!0,parseInt(Ee)===parseInt(e)&&parseInt(Te)===parseInt(t)||(Ae["td".concat(e).concat(t)].className=a.tdhover)}),Pe(Fe(Fe(n)),"tdOnMouseLeave",function(e,t){je=!1,parseInt(Ee)===parseInt(e)&&parseInt(Te)===parseInt(t)||n.resetCurrentPrevFocus(e,t)}),Pe(Fe(Fe(n)),"tdClick",function(e,t){if(!n.state["editing"+Ee+Te]){if((Ee!=e||Te!=t)&&e<n.state.dg.length&&n.resetCurrentPrevFocus(Ee,Te),"undefined"===typeof Ae["td"+e+t]||e>=n.state.dg.length)return void Ae["td"+Ee+Te].focus();n.setRowIndexColIndex(e,t)}}),Pe(Fe(Fe(n)),"resetCurrentPrevFocus",function(e,t){var a=n.props.classes;0==t&&n.state["editing"+e+t]&&n.setState(Pe({},"editing"+e+t,!1)),Ae["td"+e+t].className=je&&parseInt(Ke)===parseInt(e)&&parseInt(Ne)===parseInt(t)?a.tdhover:e%2==0?a.tdWhite:a.tdReset}),Pe(Fe(Fe(n)),"handleBlur",function(e,t,a){var r;Ae["blur"+e+t]&&(n.dg(Ee,Te,a),n.setState((Pe(r={},"editing"+e+t,!1),Pe(r,"dg",n.state.dg),r)))}),Pe(Fe(Fe(n)),"handleUpdate",function(e){n.state["editing"+Ee+Te]&&(Ue=!1,n.dg(Ee,Te,e),n.props.getData("dgData",n.state.dg),n.setState({dg:n.state.dg}))}),Ae.tb=o.a.createRef(),Ae.tb2=o.a.createRef(),n.state={prevVal:[],val:[],editing:[],dg:[]},n.props.getData("dgData",n.state.dg,!0),n.headersRow=[],Le=0,e.column)e.column[s].visible&&(Le+=parseInt(e.column[s].width),"0"===e.column[s].width?n.headersRow.push(Re(L.a,{id:"headersRow"+s,style:{padding:"0 0"}},"headers"+s,e.column[s].header)):n.headersRow.push(Re(L.a,{id:"headersRow"+s,style:{padding:"0 20px"},width:e.column[s].width},"headers"+s,e.column[s].header)));n.dgAdd(),Ve=!1;for(var c=0;c<e.column.length;c++)n.state["prevVal0"+c]="",n.state["editing0"+c]=!1;return n.props.dg.rowIndex=n.getRowFocus,n.props.dg.colIndex=n.getRowFocus,n.props.dg.setRowIndexColIndex=n.setRowIndexColIndex,n.props.dg.editRowIndexColIndex=n.editRowIndexColIndex,n}var a,n,r;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Oe(e,t)}(t,o.a.Component),a=t,(n=[{key:"getRowFocus",value:function(){return Ee}},{key:"getColFocus",value:function(){return Te}},{key:"componentDidMount",value:function(){this.props.setRef(Ae.tb.current);var e,t,a,n,r=Ae.tb.current.children[0].children;for(e in r)if("object"==Ie(a=r[e]))for(t in a.children)"object"==Ie(n=a.children[t])&&(this.props.getData("td"+e+t,n),this.props.getData("tbtxt"+e+t,n.children[0]),Ae["td"+e+t]=n,Ae["tbtxt"+e+t]=n.children[0]);this.setRowIndexColIndex(0,1)}},{key:"componentDidUpdate",value:function(){this.props.setRef(Ae.tb.current);var e,t,a,n,r=Ae.tb.current.children[0].children;for(e in r)if("object"==Ie(a=r[e]))for(t in a.children)"object"==Ie(n=a.children[t])&&(this.props.getData("td"+e+t,n),this.props.getData("tbtxt"+e+t,n.children[0]),Ae["td"+e+t]=n,Ae["tbtxt"+e+t]=n.children[0]);Ve&&(Ve=!1,this.setRowIndexColIndex(Ee,Te))}},{key:"componentWillReceiveProps",value:function(e){}},{key:"shouldComponentUpdate",value:function(){return!!Ue||(Ue=!0,!1)}},{key:"render",value:function(){for(var e,t=this,a=this.props,n=a.classes,r=a.column,i=a.id,s=a.width,c=a.height,l=a.tabIndex,d=a.searchFilter,f=a.handleOpenDialog,p=a.SetVariable,h=a.onClose,b=this.props.data,g=[],v=[],m=9,x="",w=function(a){v=[];var o=function(o){if(r[o].visible){if(e=[],x=b[a][r[o].item],a==Ee&&o==Te&&t.state["editing"+a+o]&&r[o].edit)e.push(Re(u.d,{id:"tbtxt"+a+o,type:"text",width:"100%",tabIndex:99,searchFilter:d,idDg:r[o].item,value:x,onUpdate:function(e){return t.handleUpdate(e,a,o)},onBlur:function(e){return t.handleBlur(a,o,e)},onKeyDown:function(e,n,r){return t.tdOnKeyDown(e,a,o,n)},SetVariable:p,handleOpenDialog:f},"ii"+a+o));else switch(r[o].labelRender){case"search":e.push(Re(u.c,{handleOpenDialog:f,classes:n,id:"tbtxt"+a+o,idDg:r[o].item,value:x,searchFilter:d,width:r[o].width},"ii"+a+o));break;case"center":e.push(Re(u.b,{id:"tbtxt"+a+o,align:"center",value:x,width:r[o].width},"ii"+a+o));break;case"right":e.push(Re(u.b,{id:"tbtxt"+a+o,align:"right",value:x,width:r[o].width},"ii"+a+o));break;default:e.push(Re(u.b,{id:"tbtxt"+a+o,value:x,width:r[o].width},"ii"+a+o))}v.push(Re(L.a,{id:"td"+a+o,style:{padding:"0 0",margin:"0"},tabIndex:++m,width:r[o].width,onMouseOver:function(){return t.tdOnMouseOver(a,o)},onMouseLeave:function(){return t.tdOnMouseLeave(a,o)},onClick:function(){return t.tdClick(a,o)},onDoubleClick:function(){return t.tdDblClick(a,o)},onBlur:function(){return t.tdBlur(a,o)}},"i"+a+o,e," "))}};for(var i in r)o(i);g.push(Re(q.a,{},"tr"+a,v))},y=0;y<b.length;y++)w(y);return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{id:"divHeader",ref:this.setRef,style:{width:"".concat(s,"px"),overflow:"hidden"}},Re(H.a,{rootRef:Ae.tb2},void 0,o.a.createElement(N.a,{key:99,className:A()(n.table,n.stripped,n.bordered),ref:"tb2",style:{width:Le}},Re(V.a,{},void 0,Re(q.a,{},void 0,this.headersRow))))),o.a.createElement("div",{id:"divTable",onScroll:this.handleScroll,ref:this.setRef,style:{width:"".concat(s,"px"),height:"".concat(c,"px"),overflowX:"auto"}},Re(H.a,{rootRef:Ae.tb},void 0,o.a.createElement(N.a,{key:9,id:i,tabIndex:l,className:A()(n.table,n.stripped,n.bordered),onKeyDown:this.dgKeyDown,ref:"tb",style:{width:Le}},Re(T.a,{},void 0,g)))),Re("div",{},void 0,Re(De.d,{obj:Me,onClose:h})))}}])&&Ce(a.prototype,n),r&&Ce(a,r),t}(),Be=Object(l.withStyles)(h.a)(qe),He=a("c233babf320cd068509e"),We=a.n(He),Ge=a("29df10ef1bee6d38fd67"),Je=a.n(Ge),ze=a("aaeb9c46d19e83ac4847"),$e=a.n(ze);a("3f07096b28058a8692a8");function Xe(e){return(Xe="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Qe(e,t,a,n){_e||(_e="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),t&&r)for(var i in r)void 0===t[i]&&(t[i]=r[i]);else t||(t=r||{});if(1===o)t.children=n;else if(o>1){for(var s=new Array(o),c=0;c<o;c++)s[c]=arguments[c+3];t.children=s}return{$$typeof:_e,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function Ye(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function Ze(e){return(Ze=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function et(e,t){return(et=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function tt(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function at(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var nt={},rt=!0,ot={},it=Qe("div",{}),st=Qe(We.a,{}),ct=Qe("br",{}),lt=function(e){function t(e,a){var n,r,o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,o=Ze(t).call(this,e,a),n=!o||"object"!==Xe(o)&&"function"!==typeof o?tt(r):o,at(tt(tt(n)),"setRef",function(e){e&&(nt[e.id]=e)}),at(tt(tt(n)),"setFocus",function(e){e?(n.focus.curId=e,n.focus.curIndex=e.tabIndex,e.focus(),"dg"===e.id&&ot.setRowIndexColIndex(ot.rowIndex,ot.colIndex)):n.focus.curId.focus()}),at(tt(tt(n)),"nextFocus",function(e){var t;if(e&&(n.focus.curId=e,n.focus.curIndex=e.tabIndex),n.focus.curIndex>=n.focus.maxIndex)n.setFocus(nt[n.focus.arrRef[0].id]);else for(var a in n.focus.arrRef)if(n.focus.arrRef[a].index===n.focus.curIndex){a==n.focus.max-1?n.setFocus(nt[n.focus.arrRef[0]]):(t=n.focus.arrRef[parseInt(a)+1].id,n.setFocus(nt[t]));break}}),at(tt(tt(n)),"prevFocus",function(e){var t;if(e&&(n.focus.curId=e,n.focus.curIndex=e.tabIndex),n.focus.curIndex==n.focus.minIndex)nt[n.focus.arrRef[n.focus.max-1].id].focus();else for(var a in n.focus.arrRef)if(n.focus.arrRef[a].index===n.focus.curIndex){0===a?n.setFocus(nt[n.focus.arrRef[n.focus.max-1].id]):(t=n.focus.arrRef[parseInt(a)-1].id,n.setFocus(nt[t]));break}}),at(tt(tt(n)),"handleKeyTerimaDari",function(e){"Tab"!==e.key&&"ArrowUp"!==e.key||!e.shiftKey?"ArrowDown"!==e.key&&"Enter"!==e.key||(n.nextFocus(e.target),e.preventDefault()):(nt.txtprogress.focus(),e.preventDefault())}),at(tt(tt(n)),"handleKeyNavigator",function(e){switch(e.key){case"ArrowUp":n.prevFocus(e.target),e.preventDefault();break;case"ArrowDown":case"Enter":n.nextFocus(e.target),e.preventDefault();break;case"Tab":e.shiftKey?e.shiftKey&&n.prevFocus(e.target):n.nextFocus(e.target),e.preventDefault()}}),at(tt(tt(n)),"handleKeyTanggal",function(e){9==e.which&&e.shiftKey}),at(tt(tt(n)),"handleKeyProgress",function(e){9!=e.which||e.shiftKey||(n.setFocus(nt.txtterimadari),e.preventDefault())}),at(tt(tt(n)),"searchFilter",function(e){var t=n.state.dgData,a=n.state,r="",o="",i="",s="",c=0;switch(e){case"txtterimadari":r="contact",i='kaktif=1 and kkode = "'.concat(a.txtterimadari,'"'),s="kaktif=1",c=2,o="kkode asc";break;case"txtmatauang":r="currency",o="ckode asc";break;case"txtakunkas":r="coa",i='(cgd = "D" and caktif = 1) and (ctipe = 0) and (cmatauang = "'+a.txtmatauang+'") and cnomor ="'+a.txtakunkas+'"',s='(cgd = "D" and caktif = 1) and (ctipe = 0) and (cmatauang = "'+a.txtmatauang+'")',c=0,o="cnomor asc";break;case"noakun":r="coa",i='(cgd = "D" and caktif = 1) and (cmatauang = "'+a.txtmatauang+'") and cnomor = "'+t[ot.rowIndex].noakun+'"',s='(cgd = "D" and caktif = 1) and (cmatauang = "'+a.txtmatauang+'")',o="cnomor asc";break;case"costcenter":r="cost_center",i='ccaktif=1 AND cckode = "'+t[ot.rowIndex].costcenter+'"',s="ccaktif=1",o="cckode asc";break;case"divisi":r="division",i='daktif=1 AND dkode = "'+t[ot.rowIndex].divisi+'"',s="daktif=1",o="dkode asc";break;case"subdivisi":r="subdivision",i='sdkode = "'+t[ot.rowIndex].subdivisi+'" AND sddivisi="'+t[ot.rowIndex].divisi+'" AND sdaktif=1',s='sdaktif=1 AND sddivisi="'+t[ot.rowIndex].divisi+'"',o="sddivisi asc";break;case"proyek":r="project",i='paktif=1 AND pkode = "'+t[ot.rowIndex].proyek+'"',s="paktif=1",o="pkode asc"}return{source:r,id:"",sort:o,apifilter:i,apipagenumber:0,apilimit:0,csfilter:s,csfield:c,cscheckbox:!1}}),at(tt(tt(n)),"SetVariable",function(e){var t=e.succes,a=e.target,r=e.data;if(t)switch(a){case"txtterimadari":n.setState({txtterimadari:r.get("kkode"),lbltxtterimadari:r.get("knama")});break;case"txtakunkas":n.setState({txtakunkas:r.get("cnomor"),lbltxtakunkas:r.get("cnama")});break;case"txtmatauang":n.setState({txtmatauang:r.get("ckode")});break;case"noakun":var o=n.state.dgData;o[ot.rowIndex].noakun=r.get("cnomor"),o[ot.rowIndex].namaakun=r.get("cnama"),n.setState({dgData:o})}else switch(a){case"txtterimadari":n.setState({txtterimadari:"",lbltxtterimadari:""});break;case"txtakunkas":n.setState({txtakunkas:"",lbltxtakunkas:""});break;case"txtmatauang":n.setState({txtmatauang:""});break;case"noakun":var i=n.state.dgData;i[ot.rowIndex].noakun="",i[ot.rowIndex].namaakun="",n.setState({dgData:i})}}),at(tt(tt(n)),"handleOpenDialog",function(e,t,a,r,o){nt[t].focus(),n.source=e,n.target=r||t,n.current=a,n.filter=o,n.setState({openDialog:!0})}),at(tt(tt(n)),"handleCloseDialog",function(e){n.state.openDialog?(-1===n.target.indexOf("txt")&&-1===n.target.indexOf("cmb")?(n.setFocus(nt.dg),e&&e.succes):n.setFocus(nt[n.target]),n.setState({openDialog:!1})):-1===n.target.indexOf("txt")&&-1===n.target.indexOf("cmb")&&n.setFocus(nt.dg)}),at(tt(tt(n)),"handleUpdate",function(e,t){rt=!1,n.setState(at({},e,t))}),at(tt(tt(n)),"getData",function(e,t,a){"dgData"===e?(rt=a||!1,n.setState({dgData:t})):nt[e]=t}),at(tt(tt(n)),"dgKeyDown",function(e){"Tab"===e.key&&(e.shiftKey?e.shiftKey&&(n.prevFocus(nt.dg),e.preventDefault()):(n.nextFocus(nt.dg),e.preventDefault()))}),n.focus={},n.state={openDialog:!1,dgData:[{no:1}],txtmatauang:"IDR",txturaian:"",txtkurs:"",txttanggal:""},n.grid=[{header:"No",width:"60",item:"no",require:!1,edit:!1,visible:!0,skip:!0,labelRender:"center",itemRender:""},{header:"No Akun",width:"180",item:"noakun",require:!0,edit:!0,visible:!0,skip:!1,labelRender:"search",itemRender:"search"},{header:"Nama Akun",width:"200",item:"namaakun",require:!1,edit:!0,visible:!0,skip:!0,labelRender:"",itemRender:""},{header:"Amount",width:"120",item:"amount",require:!1,edit:!0,visible:!0,skip:!1,labelRender:"",itemRender:""},{header:"Foreign Amount",width:"120",item:"foreignamount",require:!1,edit:!0,visible:!0,skip:!0,labelRender:"nominal",itemRender:"nominal"},{header:"Note",width:"300",item:"note",require:!1,edit:!0,visible:!0,skip:!1,labelRender:"",itemRender:""},{header:"Cost Center",width:"120",item:"costcenter",require:!1,edit:!0,visible:!0,skip:!1,labelRender:"",itemRender:""},{header:"Divisi",width:"120",item:"divisi",require:!1,edit:!0,visible:!0,skip:!1,labelRender:"",itemRender:""},{header:"Sub Divisi",width:"120",item:"subdivisi",require:!1,edit:!0,visible:!0,skip:!1,labelRender:"",itemRender:""},{header:"Proyek",width:"120",item:"proyek",require:!1,edit:!0,visible:!0,skip:!1,labelRender:"",itemRender:""},{header:"Custom 1",width:"120",item:"custom1",require:!1,edit:!0,visible:!0,skip:!0,labelRender:"",itemRender:""}],n.progress=[{label:"Draft",value:0},{label:"Need Approve",value:1},{label:"Approve 1",value:5},{label:"Approved",value:2}],n.data=[],n}var a,n,s;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&et(e,t)}(t,r["Component"]),a=t,(n=[{key:"shouldComponentUpdate",value:function(){return!!rt||(rt=!0,!1)}},{key:"componentDidMount",value:function(){for(var e in this.focus.arrRef=[],nt)void 0!==nt[e].tabIndex&&parseInt(nt[e].tabIndex)>=0&&this.focus.arrRef.push({index:nt[e].tabIndex,id:nt[e].id});this.focus.max=this.focus.arrRef.length,this.focus.arrRef.sort(function(e,t){return parseInt(e.index)-parseInt(t.index)}),this.focus.minIndex=this.focus.arrRef[0].index,this.focus.maxIndex=this.focus.arrRef[this.focus.max-1].index,this.focus.curIndex=0,nt.txturaian.onkeydown=this.handleKeyNavigator,nt.txttanggal.onkeydown=this.handleKeyNavigator,nt.txtnotransaksi.onkeydown=this.handleKeyNavigator,nt.txtmatauang.onkeydown=this.handleKeyNavigator,nt.txtkurs.onkeydown=this.handleKeyNavigator,this.setFocus(nt.txtterimadari);var t=getComputedStyle(nt.divRoot);nt.width=t.width-20}},{key:"render",value:function(){var e=this,t=c.a.name+" - Table",a=c.a.desc,n=this.props.classes,r=5,s=function(e,t,a){return Qe(P.a,{title:e,onClick:a},void 0,Qe(O.a,{},void 0,t))};return ot.focus&&ot.focus.focus(),o.a.createElement("div",{id:"divRoot",ref:this.setRef},Qe(i.Helmet,{},void 0,Qe("title",{},void 0,t),Qe("meta",{name:"description",content:a}),Qe("meta",{property:"og:title",content:t}),Qe("meta",{property:"og:description",content:a}),Qe("meta",{property:"twitter:title",content:t}),Qe("meta",{property:"twitter:description",content:a})),Qe(d.mb,{title:"CRUD",icon:"ios-arrow-round-forward",desc:"CRUD"},void 0,Qe(ke.a,{className:this.props.classes.toolbar},void 0,"Cash Receipt",it,s("Search","search",function(){return e.showSearch()}),s("Download CSV","cloud_download",function(){return e.clickDownloadCSV()}),s("Print","print",function(){return e.clickPrint()}),s("View Column","view_column",function(){return e.clickViewColumn()}),s("Filter","filter_list",function(){return addNewFilter(anchor)}),s("Show Data","refresh",function(){return e.showData("")}),Qe("div",{},void 0,Qe(Je.a,{title:"Add Item"},void 0,Qe(g.a,{variant:"contained",onClick:function(){return addNew(anchor)},color:"secondary"},void 0,st,"Add New"))),Qe(g.a,{className:n.button,variant:"contained",size:"small"},void 0,Qe(Save,{className:classNames(n.leftIcon,n.iconSmall)}),"Save")),ct,o.a.createElement(p.a,{container:!0,id:"gridContainer",ref:this.setRef},Qe(p.a,{item:!0,xs:12,sm:7},void 0,Qe(u.i,{tabIndex:1,width:"170",marginLabel:"20%",id:"txtterimadari",searchFilter:this.searchFilter,label:"Terima Dari",handleOpenDialog:this.handleOpenDialog,onKeyDown:this.handleKeyTerimaDari,onUpdate:this.handleUpdate,setRef:this.setRef,placeholder:"",value:this.state.txtterimadari,valueName:this.state.lbltxtterimadari,SetVariable:this.SetVariable},1),Qe(u.i,{tabIndex:2,width:"170",marginLabel:"20%",id:"txtakunkas",searchFilter:this.searchFilter,label:"Akun Kas [D]",handleOpenDialog:this.handleOpenDialog,onKeyDown:this.handleKeyNavigator,setRef:this.setRef,placeholder:"",onUpdate:this.handleUpdate,value:this.state.txtakunkas,valueName:this.state.lbltxtakunkas,SetVariable:this.SetVariable},2),Qe(u.g,{tabIndex:3,width:"250",marginLabel:"20%",id:"txturaian",label:"Uraian",setRef:this.setRef,placeholder:"",value:this.state.txturaian},3)),Qe(p.a,{item:!0,xs:12,sm:5},void 0,Qe("div",{style:{width:"300px",float:"right"}},void 0,Qe(u.g,{tabIndex:++r,type:"date",width:"200",marginLabel:"100px",id:"txttanggal",label:"Tanggal",onKeyDown:this.handleKeyTanggal,setRef:this.setRef,placeholder:"",value:this.state.txttanggal},r),Qe(u.h,{tabIndex:++r,width:"140",marginLabel:"100px",id:"txtnotransaksi",label:"No Transaksi",setRef:this.setRef,placeholder:"",value:this.state.txtntoransaksi},r),Qe(p.a,{container:!0},void 0,Qe(p.a,{item:!0,xs:12,sm:8},void 0,Qe(u.i,{tabIndex:++r,width:"70",marginLabel:"100px",searchFilter:this.searchFilter,handleOpenDialog:this.handleOpenDialog,id:"txtmatauang",label:"Uang",setRef:this.setRef,placeholder:"",onKeyDown:this.handleKeyNavigator,SetVariable:this.SetVariable,onUpdate:this.handleUpdate,value:this.state.txtmatauang},r)),Qe(p.a,{item:!0,xs:12,sm:4},void 0,Qe(u.g,{tabIndex:++r,width:"55",marginLabel:"43px",id:"txtkurs",label:"Kurs",setRef:this.setRef,placeholder:"",value:this.state.txtkurs},r))),Qe(u.f,{tabIndex:++r,data:this.progress,width:"200",marginLabel:"100px",id:"txtprogress",label:"Progress",onKeyDown:this.handleKeyProgress,setRef:this.setRef,placeholder:"",value:this.state.txtprogress},r)))),Qe(Be,{id:"dg",column:this.grid,onClose:this.handleCloseDialog,searchFilter:this.searchFilter,getData:this.getData,data:this.state.dgData,width:nt.width,height:200,setRef:this.setRef,tabIndex:4,handleOpenDialog:this.handleOpenDialog,onKeyDown:this.dgKeyDown,SetVariable:this.SetVariable,dg:ot})),Qe(me,{onClose:this.handleCloseDialog,open:this.state.openDialog,SetVariable:this.SetVariable,source:this.source,target:this.target,current:this.current,filter:this.filter}))}}])&&Ye(a.prototype,n),s&&Ye(a,s),t}();t.default=$e()()(Object(l.withStyles)(h.a)(lt))},af57a772512d7bb4ff24:function(e,t,a){(e.exports=a("c138e55a31f3f8960e99")(!1)).push([e.i,".box{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;line-height:20px;position:relative;display:inline-block;background-color:#fff;border:1px solid #ccc;-webkit-box-shadow:0 4px 16px rgba(0,0,0,.5);box-shadow:0 4px 16px rgba(0,0,0,.5);min-width:400px;white-space:normal}",""])}}]);