(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{e868c06b27e194b8ef08:function(e,t,a){"use strict";a.r(t);var n,i=a("8af190b70a6bc55c6f1b"),o=a.n(i),l=a("90d85001242f09b43bdd"),r=a("299a81d595ed571e9e75");function d(e){return(d="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function b(e,t){return!t||"object"!==d(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var p=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),b(this,c(t).apply(this,arguments))}var a,i,d;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,o.a.Component),a=t,(i=[{key:"render",value:function(){var e={source:"bank",primaryKey:"bkode",dataColumn:[{name:"no",label:"No",initialValue:"",width:"80",hidden:!1},{name:"bkode",label:"Kode",initialValue:"",width:"80",hidden:!1},{name:"bnama",label:"Nama",initialValue:"",width:"80",hidden:!1},{name:"bcatatan",label:"Catatan",initialValue:"",width:"auto",hidden:!1},{name:"baktif",label:"Aktif",initialValue:"",width:"auto",hidden:!1},{name:"binputuser",label:"",initialValue:"0",width:"",hidden:!0},{name:"binputtgl",label:"",initialValue:r.c,width:"",hidden:!0},{name:"bmodifikasiuser",label:"",initialValue:"0",width:"",hidden:!0},{name:"bmodifikasitgl",label:"",initialValue:r.c,width:"",hidden:!0}],dataFormatDate:["binputtgl","bmodifikasitgl"],inputForm:[{id:"bkode",type:"text",width:100,label:"Kode",placeholder:"Kode"},{id:"bnama",type:"text",width:100,label:"nama",placeholder:"Nama"},{id:"bcatatan",type:"text",width:200,label:"Catatan",placeholder:"Catatan"},{id:"baktif",type:"text",width:200,label:"Aktif",placeholder:"Aktif"}],inputFilter:[{id:"bkode",type:"text",width:100,label:"Kode",placeholder:"Kode"},{id:"bnama",type:"text",width:100,label:"nama",placeholder:"Nama"},{id:"bcatatan",type:"text",width:200,label:"Catatan",placeholder:"Catatan"}],paramFilterGlobal:function(e){return'bkode LIKE "%'.concat(e,'%" OR bnama LIKE "%').concat(e,'%" OR bcatatan LIKE "%').concat(e,'%"')},sort:"bkode ASC",limit:4};return function(e,t,a,i){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,l=arguments.length-3;if(t||0===l||(t={children:void 0}),t&&o)for(var r in o)void 0===t[r]&&(t[r]=o[r]);else t||(t=o||{});if(1===l)t.children=i;else if(l>1){for(var d=new Array(l),u=0;u<l;u++)d[u]=arguments[u+3];t.children=d}return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}(l.a,{params:e})}}])&&u(a.prototype,i),d&&u(a,d),t}();t.default=p}}]);