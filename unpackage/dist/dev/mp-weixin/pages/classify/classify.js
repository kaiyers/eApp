require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([10],{27:function(t,e,o){"use strict";var i=n(o(1)),s=n(o(28));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(s.default))},28:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o(30),s=o.n(i),n=o(31),a=!1;var r=function(t){a||o(29)},c=o(0)(s.a,n.a,r,null,null);c.options.__file="E:\\app实例\\HX\\newsApp\\newsApp\\pages\\classify\\classify.vue",c.esModule&&Object.keys(c.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),c.options.functional&&console.error("[vue-loader] classify.vue: functional components are not supported with templates, they should use render functions."),e.default=c.exports},29:function(t,e){},30:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{categoryList:["女生","男生","漫画","出版物"],subCategoryList:[],height:0,categoryActive:0,scrollTop:0,scrollHeight:0}},methods:{scroll:function(t){this.scrollHeight=t.detail.scrollHeight},categoryClickMain:function(t){this.categoryActive=t,console.log(t),0==t?this.subCategoryList=this.categroy.female:1==t?this.subCategoryList=this.categroy.male:2==t?this.subCategoryList=this.categroy.picture:3==t&&(this.subCategoryList=this.categroy.press),this.scrollTop=-this.scrollHeight*t},getBookStyle:function(){t.showLoading({title:"加载中..."});var e=this;t.request({url:"https://novel.juhe.im/categories",data:{},header:{"content-type":"application/json"},method:"GET",success:function(o){t.hideLoading();var i=o.data;i.female.forEach(function(t){t.img=decodeURIComponent(t.bookCover[0]).replace("/agent/","")}),i.male.forEach(function(t){t.img=decodeURIComponent(t.bookCover[0]).replace("/agent/","")}),i.picture.forEach(function(t){t.img=decodeURIComponent(t.bookCover[0]).replace("/agent/","")}),i.press.forEach(function(t){t.img=decodeURIComponent(t.bookCover[0]).replace("/agent/","")}),e.categroy=i,e.subCategoryList=i.female}})},gonext:function(e){var o="";0==this.categoryActive?o="female":1==this.categoryActive?o="male":2==this.categoryActive?o="picture":3==this.categoryActive&&(o="press"),console.log(e,o),t.navigateTo({url:"../booknav/booknav?mername="+e+"&gender="+o})}},onLoad:function(){this.height=t.getSystemInfoSync().windowHeight},onShow:function(){this.getBookStyle()}}}).call(e,o(2).default)},31:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("view",{staticClass:"container"},[o("view",{staticClass:"page-body"},[o("scroll-view",{staticClass:"nav-left",style:"height:"+t.height+"px",attrs:{"scroll-y":""}},t._l(t.categoryList,function(e,i){return o("view",{key:i,staticClass:"nav-left-item",class:i==t.categoryActive?"active":"",attrs:{eventid:"oQu-0-"+i},on:{tap:function(e){t.categoryClickMain(i)}}},[t._v("\n\t\t\t\t"+t._s(e)+"\n\t\t\t")])})),o("scroll-view",{staticClass:"nav-right",style:"height:"+t.height+"px",attrs:{"scroll-y":"","scroll-top":t.scrollTop,"scroll-with-animation":"",eventid:"LqM-2"},on:{scroll:t.scroll}},t._l(t.subCategoryList,function(e,i){return o("view",{key:i,staticClass:"nav-right-item",attrs:{id:0===i?"first":"",eventid:"fB6-1-"+i},on:{tap:function(o){t.gonext(e.name)}}},[o("image",{attrs:{src:e.img}}),o("view",[t._v(t._s(e.name))])])}))],1)])};i._withStripped=!0;var s={render:i,staticRenderFns:[]};e.a=s}},[27]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/classify/classify.js.map