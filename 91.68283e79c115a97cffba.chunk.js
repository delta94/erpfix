(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{d79db9bbd3168c842690:function(e,t,o){"use strict";o.r(t);var n,r=o("8af190b70a6bc55c6f1b"),i=o.n(r),a=o("0d7f0986bcd2f33d8a2a"),c=(o("8a2d1b95e05b6a321e74"),o("921c0b8c557fe6ba5da8")),u=o.n(c),f=o("9b4cf02f7f3c4453e043"),l=o.n(f),s=o("6938d226fd372a75cbf9"),p=o("1037a6e0d5914309f74c"),b=o.n(p),d=o("4dd2a92e69dcbe1bab10"),m=o("387190e83edf0e5eb8f6");function y(e){return(y="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,t,o,r){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});if(1===a)t.children=r;else if(a>1){for(var u=new Array(a),f=0;f<a;f++)u[f]=arguments[f+3];t.children=u}return{$$typeof:n,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}function h(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function S(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var O=function(e){function t(){var e,o,n,r,i,a,c;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var u=arguments.length,f=new Array(u),l=0;l<u;l++)f[l]=arguments[l];return n=this,o=!(r=(e=w(t)).call.apply(e,[this].concat(f)))||"object"!==y(r)&&"function"!==typeof r?S(n):r,i=S(S(o)),c={valueForm:[]},(a="state")in i?Object.defineProperty(i,a,{value:c,enumerable:!0,configurable:!0,writable:!0}):i[a]=c,o}var o,n,r;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(t,i.a.Component),o=t,(n=[{key:"submitForm",value:function(e){var t=this;setTimeout(function(){t.setState({valueForm:e}),console.log("You submitted:\n\n".concat(t.state.valueForm)),window.location.href="/app"},500)}},{key:"render",value:function(){var e=this,t=b.a.name+" - Register Version 2",o=b.a.desc,n=this.props.classes;return v("div",{className:n.rootFull},void 0,v(a.Helmet,{},void 0,v("title",{},void 0,t),v("meta",{name:"description",content:o}),v("meta",{property:"og:title",content:t}),v("meta",{property:"og:description",content:o}),v("meta",{property:"twitter:title",content:t}),v("meta",{property:"twitter:description",content:o})),v("div",{className:n.containerSide},void 0,v(l.a,{smDown:!0},void 0,v("div",{className:n.opening},void 0,v(u.a,{variant:"h3",component:"h1",className:n.opening,gutterBottom:!0},void 0,"Hi...nice to meet you"),v(u.a,{variant:"h6",component:"p",className:n.subpening},void 0,"Just register to join with us"))),v("div",{className:n.sideFormWrap},void 0,v(d.Bb,{onSubmit:function(t){return e.submitForm(t)}}))))}}])&&h(o.prototype,n),r&&h(o,r),t}();t.default=Object(s.withStyles)(m.a)(O)}}]);