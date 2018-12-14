require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([6],{32:function(t,e,a){"use strict";var n=i(a(1)),r=i(a(33));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(r.default))},33:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(35),r=a.n(n),i=a(39),s=!1;var l=function(t){s||a(34)},c=a(0)(r.a,i.a,l,null,null);c.options.__file="E:\\app实例\\HX\\newsApp\\newsApp\\pages\\rankList\\rankList.vue",c.esModule&&Object.keys(c.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),c.options.functional&&console.error("[vue-loader] rankList.vue: functional components are not supported with templates, they should use render functions."),e.default=c.exports},34:function(t,e){},35:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var n,r=a(36),i=(n=r)&&n.__esModule?n:{default:n};function s(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function n(r,i){try{var s=e[r](i),l=s.value}catch(t){return void a(t)}if(!s.done)return Promise.resolve(l).then(function(t){n("next",t)},function(t){n("throw",t)});t(l)}("next")})}}e.default={data:function(){return{scrollLeft:0,isClickChange:!1,tabIndex:0,female:[],male:[],picture:[],epub:[],tabBars:[{name:"女生",id:"female"},{name:"男生",id:"male"},{name:"出版物",id:"epub"},{name:"漫画",id:"picture"}]}},onShow:function(){var e=this;t.showLoading({title:"加载中..."}),t.request({url:"https://novel.juhe.im/rank-category",data:{},header:{"content-type":"application/json"},method:"GET",success:function(a){t.hideLoading();var n=a.data;e.female=n.female,e.male=n.male,e.picture=n.picture,e.epub=n.epub},fail:function(t){}})},methods:{goDetail:function(e){t.navigateTo({url:"../booklist/booklist?listId="+e.currentTarget.dataset.id})},changeTab:function(e){var a=this;return s(i.default.mark(function n(){var r,s,l,c,o,u,d,f,p;return i.default.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(r=e.target.current,!a.isClickChange){n.next=5;break}return a.tabIndex=r,a.isClickChange=!1,n.abrupt("return");case 5:return n.next=7,a.getElSize("tab-bar");case 7:s=n.sent,l=s.scrollLeft,c=0,o=0;case 11:if(!(o<r)){n.next=19;break}return n.next=14,a.getElSize(a.tabBars[o].id);case 14:u=n.sent,c+=u.width;case 16:o++,n.next=11;break;case 19:return d=t.getSystemInfoSync().windowWidth,n.next=22,a.getElSize(a.tabBars[r].id);case 22:f=n.sent,p=f.width,c+p-l>d&&(a.scrollLeft=c+p-d),c<l&&(a.scrollLeft=c),a.isClickChange=!1,a.tabIndex=r;case 28:case"end":return n.stop()}},n,a)}))()},getElSize:function(e){return new Promise(function(a,n){t.createSelectorQuery().select("#"+e).fields({size:!0,scrollOffset:!0},function(t){a(t)}).exec()})},tapTab:function(t){var e=this;return s(i.default.mark(function a(){var n,r;return i.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(e.tabIndex!==t.target.dataset.current){a.next=4;break}return a.abrupt("return",!1);case 4:return a.next=6,e.getElSize("tab-bar");case 6:n=a.sent,r=n.scrollLeft,e.scrollLeft=r,e.isClickChange=!0,e.tabIndex=t.target.dataset.current;case 11:case"end":return a.stop()}},a,e)}))()}}}}).call(e,a(2).default)},39:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"uni-tab-bar"},[a("scroll-view",{staticClass:"uni-swiper-tab",attrs:{id:"tab-bar","scroll-x":"","scroll-left":t.scrollLeft}},t._l(t.tabBars,function(e,n){return a("view",{key:e.id,class:["swiper-tab-list",t.tabIndex==n?"active":""],attrs:{id:e.id,"data-current":n,eventid:"3i6-0-"+n},on:{tap:t.tapTab}},[t._v(t._s(e.name))])})),a("swiper",{staticClass:"swiper-box",staticStyle:{height:"26.6rem"},attrs:{current:t.tabIndex,duration:"300",eventid:"IGx-5"},on:{change:t.changeTab}},[a("swiper-item",{attrs:{mpcomid:"Mc8-0"}},[a("scroll-view",{staticClass:"list",staticStyle:{height:"26.4rem","padding-left":"2%"},attrs:{"scroll-y":""}},t._l(t.female,function(e,n){return a("view",{key:n,staticClass:"itembtn",attrs:{"data-id":e._id,eventid:"My6-1-"+n},on:{tap:t.goDetail}},[t._v("\n\t\t\t\t\t\t"+t._s(e.shortTitle)+"\n\t\t\t\t\t")])}))],1),a("swiper-item",{attrs:{mpcomid:"C1Z-1"}},[a("scroll-view",{staticClass:"list",staticStyle:{height:"26.4rem","padding-left":"2%"},attrs:{"scroll-y":""}},t._l(t.male,function(e,n){return a("view",{key:n,staticClass:"itembtn",attrs:{"data-id":e._id,eventid:"aJF-2-"+n},on:{tap:t.goDetail}},[t._v("\n\t\t\t\t\t\t"+t._s(e.shortTitle)+"\n\t\t\t\t\t")])}))],1),a("swiper-item",{attrs:{mpcomid:"qqZ-2"}},[a("scroll-view",{staticClass:"list",staticStyle:{height:"26.4rem","padding-left":"2%"},attrs:{"scroll-y":""}},t._l(t.epub,function(e,n){return a("view",{key:n,staticClass:"itembtn",attrs:{"data-id":e._id,eventid:"8BJ-3-"+n},on:{tap:t.goDetail}},[t._v("\n\t\t\t\t\t\t"+t._s(e.shortTitle)+"\n\t\t\t\t\t")])}))],1),a("swiper-item",{attrs:{mpcomid:"LWe-3"}},[a("scroll-view",{staticClass:"list",staticStyle:{height:"26.4rem","padding-left":"2%"},attrs:{"scroll-y":""}},t._l(t.picture,function(e,n){return a("view",{key:n,staticClass:"itembtn",attrs:{"data-id":e._id,eventid:"3FK-4-"+n},on:{tap:t.goDetail}},[t._v("\n\t\t\t\t\t\t"+t._s(e.shortTitle)+"\n\t\t\t\t\t")])}))],1)],1)],1)};n._withStripped=!0;var r={render:n,staticRenderFns:[]};e.a=r}},[32]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/rankList/rankList.js.map