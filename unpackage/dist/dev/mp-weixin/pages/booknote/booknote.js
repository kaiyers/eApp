require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([1],{64:function(t,e,o){"use strict";var a=n(o(1)),i=n(o(65));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},65:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(67),i=o.n(a),n=o(72),s=!1;var r=function(t){s||o(66)},c=o(0)(i.a,n.a,r,null,null);c.options.__file="E:\\app实例\\HX\\newsApp\\newsApp\\pages\\booknote\\booknote.vue",c.esModule&&Object.keys(c.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),c.options.functional&&console.error("[vue-loader] booknote.vue: functional components are not supported with templates, they should use render functions."),e.default=c.exports},66:function(t,e){},67:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var a=s(o(68)),i=s(o(7)),n=s(o(4));function s(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{items:["书籍信息","相关推荐","评论","作者书库"],current:0,activeColor:"#007aff",styleType:"button",bookid:"",bookdetail:{},sourceList:[],relatedBooks:[],comments:[],otherbookList:[],author:"",userData:[]}},components:{uniSegmentedControl:a.default,uniTag:n.default},onLoad:function(t){this.bookid=t.bookid},onShow:function(){this.userData=t.getStorageSync("user"),this.getMoreData(this.bookid)},methods:{onClickItem:function(e){t.hideLoading(),this.current!==e&&(this.current=e),0==e?this.getMoreData():1==e?this.relatedBook():2==e?this.comment():3==e&&this.authorOtherBook()},readSelf:function(e){t.navigateTo({url:"../booknote/booknote?bookid="+e})},getMoreData:function(e){var o=this;t.showLoading({title:"加载中..."}),t.request({url:"https://novel.juhe.im/book-info/"+e,data:{},header:{"content-type":"application/json"},method:"GET",success:function(e){t.hideLoading(),t.setNavigationBarTitle({title:e.data.title}),e.data.cover=decodeURIComponent(e.data.cover).replace("/agent/","");var a=new Date(e.data.updated.replace("T"," ").replace("Z","").replace(/-/g,"/").split(".")[0]);e.data.updated=i.default.newDate(a.getTime()+288e5,"YMDHMS"),console.log("书籍信息",e),o.bookdetail=e.data,o.author=e.data.author,o.getBookSource()}})},getBookSource:function(){var e=this,o=this,a="",i=this.userData;i.length&&i.forEach(function(t){t.bId==e.bookid&&(a=t.name)}),t.request({url:"https://novel.juhe.im/book-sources?view=summary&book="+this.bookid,data:{},header:{"content-type":"application/json"},method:"GET",success:function(t){t.data.forEach(function(t){t.name==a&&(t.sl=!0)}),o.sourceList=t.data}})},relatedBook:function(e){var o=this;t.request({url:"http://novel.juhe.im/recommend/"+this.bookid,data:{},header:{"content-type":"application/json"},method:"GET",success:function(t){t.data.books.forEach(function(t){t.cover=decodeURIComponent(t.cover).replace("/agent/","")}),o.relatedBooks=t.data.books}})},comment:function(e){var o=this;t.request({url:"http://api.zhuishushenqi.com/post/by-book?book="+this.bookid+"&sort=updated&start=0&limit=4000",data:{},header:{"content-type":"application/json"},method:"GET",success:function(t){t.data.posts.forEach(function(t){var e=new Date(t.updated.replace("T"," ").replace("Z","").replace(/-/g,"/").split(".")[0]);t.updated=i.default.newDate(e.getTime()+288e5,"YMDHMS")}),console.log("评论区",t),o.comments=t.data.posts}})},authorOtherBook:function(){var e=this;t.showLoading({title:"加载中..."}),t.request({url:"http://novel.juhe.im/author-books?author="+encodeURIComponent(e.author),data:{},header:{"content-type":"application/json"},method:"GET",success:function(o){t.hideLoading();var a=o.data;a.books.forEach(function(t){t.cover=decodeURIComponent(t.cover).replace("/agent/","")}),e.otherbookList=a.books}})},goread:function(e){var o=e.currentTarget.dataset.idx,a=this.bookdetail,i=this.userData,n=this.sourceList,s=1;i.length&&i.forEach(function(t){t.bId==a._id&&(s=t.zhang)});var r={bId:a._id,title:a.title,zhang:s,url:a.cover,name:n[o].name,chapId:n[o]._id};i.length?i.forEach(function(t){t.bId==a._id?(t.name=n[o].name,t.chapId=n[o]._id):i.unshift(r)}):i.unshift(r);var c={};i=i.reduce(function(t,e){return!c[e.title]&&(c[e.title]=t.push(e)),t},[]),t.setStorageSync("user",i),t.navigateTo({url:"../bookmulu/bookmulu?id="+n[o]._id})}}}}).call(e,o(2).default)},68:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(70),i=o.n(a),n=o(71),s=!1;var r=function(t){s||o(69)},c=o(0)(i.a,n.a,r,null,null);c.options.__file="E:\\app实例\\HX\\newsApp\\newsApp\\components\\uni-segmented-control.vue",c.esModule&&Object.keys(c.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),c.options.functional&&console.error("[vue-loader] uni-segmented-control.vue: functional components are not supported with templates, they should use render functions."),e.default=c.exports},69:function(t,e){},70:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"segmented-control",props:{current:{type:Number,default:0},values:{type:Array,default:function(){return[]}},activeColor:{type:String,default:"#007aff"},styleType:{type:String,default:"button"}},data:function(){return{currentIndex:this.current}},watch:{current:function(t){t!==this.currentIndex&&(this.currentIndex=t)}},computed:{wrapStyle:function(){var t="";switch(this.styleType){case"text":t="border:0;";break;default:t="border-color: "+this.activeColor}return t},itemStyle:function(){var t="";switch(this.styleType){case"text":t="color:#000;border-left:0;";break;default:t="color:"+this.activeColor+";border-color:"+this.activeColor+";"}return t},activeStyle:function(){var t="";switch(this.styleType){case"text":t="color:"+this.activeColor+";border-left:0;border-bottom-style:solid;";break;default:t="color:#fff;border-color:"+this.activeColor+";background-color:"+this.activeColor}return t}},methods:{onClick:function(t){this.currentIndex!==t&&(this.currentIndex=t,this.$emit("clickItem",t))}}}},71:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("view",{staticClass:"segmented-control",class:t.styleType,style:t.wrapStyle},t._l(t.values,function(e,a){return o("view",{key:a,staticClass:"segmented-control-item",class:t.styleType,style:a===t.currentIndex?t.activeStyle:t.itemStyle,attrs:{eventid:"LWM-0-"+a},on:{click:function(e){t.onClick(a)}}},[t._v("\n\t\t"+t._s(e)+"\n\t")])}))};a._withStripped=!0;var i={render:a,staticRenderFns:[]};e.a=i},72:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("view",[o("view",{staticClass:"uni-padding-wrap uni-common-mt",staticStyle:{position:"fixed",background:"#fff",height:"70upx","padding-top":"30upx","margin-top":"0","z-index":"100"}},[o("uni-segmented-control",{attrs:{current:t.current,values:t.items,styleType:t.styleType,activeColor:t.activeColor,eventid:"28F-0",mpcomid:"V5Y-0"},on:{clickItem:t.onClickItem}})],1),o("view",{staticClass:"content"},[o("view",{directives:[{name:"show",rawName:"v-show",value:0===t.current,expression:"current === 0"}]},[o("image",{staticClass:"bookImg",attrs:{mode:"widthFix",src:t.bookdetail.cover}}),o("view",{staticClass:"title"},[t._v(t._s(t.bookdetail.title))]),o("view",t._l(t.bookdetail.tags,function(t,e,a){return o("view",{key:a,staticClass:"tag-view"},[o("uni-tag",{attrs:{text:t,type:"success",size:"small",mpcomid:"qgH-1-"+e}})],1)})),o("navigator",{staticClass:"at",attrs:{url:"../bookauthor/bookauthor?author=bookdetail.author"}},[t._v(t._s(t.bookdetail.author))]),o("view",{staticClass:"at"},[t._v(t._s(t.bookdetail.lastChapter))]),o("view",{staticClass:"at"},[t._v("更新于 "+t._s(t.bookdetail.updated))]),o("view",t._l(t.sourceList,function(e,a,i){return o("view",{key:i,staticClass:"tag-view",attrs:{"data-idx":a,eventid:"EK1-1-"+a},on:{tap:t.goread}},[o("uni-tag",{attrs:{text:e.name,inverted:"true",type:e.sl?"primary":"danger",circle:!0,mpcomid:"ZSI-2-"+a}})],1)})),o("view",{staticClass:"at lt"},[t._v(t._s(t.bookdetail.longIntro))])],1),o("view",{directives:[{name:"show",rawName:"v-show",value:1===t.current,expression:"current === 1"}]},[o("view",{staticClass:"uni-product-list"},t._l(t.relatedBooks,function(e,a){return o("view",{key:a,staticClass:"uni-product",attrs:{eventid:"HE4-2-"+a},on:{tap:function(o){t.readSelf(e._id)}}},[o("view",{staticClass:"image-view"},[o("image",{staticClass:"uni-product-image",attrs:{src:e.cover}})]),o("view",{staticClass:"uni-product-title"},[t._v(t._s(e.title))]),o("view",{staticClass:"uni-product-price"},[o("text",{staticClass:"uni-product-price-original"},[t._v(t._s(e.author))]),o("text",{staticClass:"uni-product-tip"},[t._v(t._s(e.majorCate))])])])}))]),o("view",{directives:[{name:"show",rawName:"v-show",value:2===t.current,expression:"current === 2"}]},[o("view",{staticClass:"uni-comment"},t._l(t.comments,function(e,a){return o("view",{key:a,staticClass:"uni-comment-list"},[t._m(0,!0),o("view",{staticClass:"uni-comment-body"},[o("view",{staticClass:"uni-comment-top"},[o("text",[t._v(t._s(e.author.nickname))])]),o("view",{staticClass:"uni-comment-content"},[t._v(t._s(e.title))]),o("view",{staticClass:"uni-comment-content"},[t._v(t._s(e.content))]),o("view",{staticClass:"uni-comment-date"},[o("text",[t._v(t._s(e.updated))])])])])}))]),o("view",{directives:[{name:"show",rawName:"v-show",value:3===t.current,expression:"current === 3"}]},[o("view",{staticClass:"uni-product-list"},t._l(t.otherbookList,function(e,a){return o("view",{key:a,staticClass:"uni-product",attrs:{eventid:"t5G-3-"+a},on:{tap:function(o){t.readSelf(e._id)}}},[o("view",{staticClass:"image-view"},[o("image",{staticClass:"uni-product-image",attrs:{src:e.cover}})]),o("view",{staticClass:"uni-product-title"},[t._v(t._s(e.title))]),o("view",{staticClass:"uni-product-price"},[o("text",{staticClass:"uni-product-price-original"},[t._v(t._s(e.author))]),o("text",{staticClass:"uni-product-tip"},[t._v(t._s(e.majorCate))])])])}))])])])};a._withStripped=!0;var i={render:a,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("view",{staticClass:"uni-comment-face"},[e("image",{attrs:{src:"http://img1.imgtn.bdimg.com/it/u=3006625703,782606588&fm=26&gp=0.jpg",mode:"widthFix"}})])}]};e.a=i}},[64]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/booknote/booknote.js.map