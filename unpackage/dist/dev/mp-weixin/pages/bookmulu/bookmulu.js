require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([12],{73:function(t,e,a){"use strict";var n=i(a(1)),o=i(a(74));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(o.default))},74:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(76),o=a.n(n),i=a(77),s=!1;var u=function(t){s||a(75)},r=a(0)(o.a,i.a,u,null,null);r.options.__file="E:\\app实例\\HX\\newsApp\\newsApp\\pages\\bookmulu\\bookmulu.vue",r.esModule&&Object.keys(r.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] bookmulu.vue: functional components are not supported with templates, they should use render functions."),e.default=r.exports},75:function(t,e){},76:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{bookData:[],bookid:"",userData:[]}},onLoad:function(e){this.bookid=e.id,this.userData=t.getStorageSync("user"),this.getBookMeun()},methods:{getBookMeun:function(){t.showLoading({title:"加载中..."});var e=this,a="",n=e.bookid,o=this.userData;o.length&&o.forEach(function(t){t.chapId==n&&(a=t.zhang)}),t.request({url:"https://novel.juhe.im/book-chapters/"+n,data:{},header:{"content-type":"application/json"},method:"GET",success:function(o){t.hideLoading();new Date(o.data.updated.replace("T"," ").replace("Z","").replace(/-/g,"/").split(".")[0]);var i=o.data.chapters;a>1&&t.showModal({title:"提示",content:"亲爱的，你上次读到第"+a+"章，是否继续阅读",success:function(e){if(e.confirm){var o=a-1;t.navigateTo({url:"../bookcontenr/bookcontenr?idx="+o+"&bid="+n})}else e.cancel},fail:function(t){},complete:function(t){}}),i.forEach(function(t,e){t.reading=!1,e==a-1&&(t.reading=!0)}),e.bookData=i,e.maxCap=o.data.chapters.length-1,e.laiYuanName=o.data.name,e.newChap=o.data.chapters[o.data.chapters.length-1]}})},getDetails:function(e){var a=e.target.dataset.idx,n=this.bookid;this.nowCap=a,t.navigateTo({url:"../bookcontenr/bookcontenr?idx="+a+"&bid="+n})}}}}).call(e,a(2).default)},77:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("view",{staticClass:"uni-list"},t._l(t.bookData,function(e,n){return a("view",{key:n,staticClass:"uni-list-cell"},[a("view",{staticClass:"uni-list-cell-navigate",style:{background:e.reading?"#c7d6ed":""},attrs:{"data-idx":n,eventid:"2dt-0-"+n},on:{tap:t.getDetails}},[t._v("\n\t\t\t\t"+t._s(e.title)),a("text",{class:e.isVip?"vip":"novip"},[t._v("VIP")])])])}))])};n._withStripped=!0;var o={render:n,staticRenderFns:[]};e.a=o}},[73]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/bookmulu/bookmulu.js.map