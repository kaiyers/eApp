require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([6],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, \"__esModule\", { value: true });exports.default =\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n{\n\tdata: function data() {\n\t\treturn {\n\t\t\tvaol: '',\n\t\t\tlist: [\n\t\t\t{ 'img': '../../static/video.png', 'title': '超清解析', 'url': 'https://cdn.yangju.vip/k/?url=' }] };\n\n\n\n\n\n\n\n\n\t},\n\tmethods: {\n\t\tsetval: function setval(e) {\n\t\t\tthis.vaol = e.detail.value;\n\t\t},\n\t\tgoplay: function goplay(url) {\n\t\t\tif (this.vaol) {\n\t\t\t\tuni.navigateTo({\n\t\t\t\t\turl: '../ziding/ziding?url=' + this.vaol });\n\n\t\t\t} else {\n\t\t\t\tuni.showToast({\n\t\t\t\t\ttitle: '请先输入视频地址！',\n\t\t\t\t\ticon: \"none\",\n\t\t\t\t\tduration: 1500 });\n\n\t\t\t}\n\t\t} } };\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)[\"default\"]))\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/babel-loader/lib?{\"babelrc\":false,\"retainLines\":true,\"presets\":[[\"D://Program Files (x86)//HBuilderX//plugins//uniapp//node_modules//babel-preset-env\",{\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"not ie <= 8\"]}}],\"D://Program Files (x86)//HBuilderX//plugins//uniapp//node_modules//babel-preset-stage-2\"],\"plugins\":[[\"D://Program Files (x86)//HBuilderX//plugins//uniapp//node_modules//babel-plugin-transform-runtime\",{\"helpers\":false,\"polyfill\":false,\"regenerator\":true,\"moduleName\":\"D://Program Files (x86)//HBuilderX//plugins//uniapp//node_modules//babel-runtime\"}],\"D://Program Files (x86)//HBuilderX//plugins//uniapp//node_modules//babel-plugin-transform-decorators-legacy\"]}!./lib/preprocessor-loader.js?{\"type\":\"js\",\"context\":{\"APP-PLUS\":true}}!./lib/mpvue-loader/lib/selector.js?type=script&index=0!E:/app实例/HX/newsApp/newsApp/pages/video/video.vue\n// module id = 100\n// module chunks = 6\n\n//# sourceURL=uni-app:///pages/video/video.vue?ca2a");

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;\n  return _c('view', [_c('view', [_vm._v(\"\\n\\t\\t请输入需要解析的视频网址\\n\\t\")]), _c('input', {\n    staticClass: \"inp\",\n    attrs: {\n      \"type\": \"text\",\n      \"value\": _vm.vaol,\n      \"eventid\": 'q8F-0'\n    },\n    on: {\n      \"input\": _vm.setval\n    }\n  }), _c('view', {\n    staticClass: \"uni-list\"\n  }, _vm._l((_vm.list), function(item, index) {\n    return _c('view', {\n      key: index,\n      staticClass: \"uni-list-cell\",\n      attrs: {\n        \"hover-class\": \"uni-list-cell-hover\",\n        \"eventid\": 'sXH-1-' + index\n      },\n      on: {\n        \"tap\": function($event) {\n          _vm.goplay(item.url)\n        }\n      }\n    }, [_c('view', {\n      staticClass: \"uni-media-list\"\n    }, [_c('image', {\n      staticClass: \"uni-media-list-logo\",\n      attrs: {\n        \"src\": item.img\n      }\n    }), _c('view', {\n      staticClass: \"uni-media-list-body\"\n    }, [_c('view', {\n      staticClass: \"uni-media-list-text-top\"\n    }, [_vm._v(_vm._s(item.title))]), _c('view', {\n      staticClass: \"uni-media-list-text-bottom\"\n    }, [_vm._v(_vm._s(item.url))])])])])\n  })), _c('view', {\n    staticClass: \"uni-list\",\n    staticStyle: {\n      \"margin-top\": \"40upx\"\n    }\n  }, [_c('navigator', {\n    staticClass: \"uni-list-cell\",\n    attrs: {\n      \"url\": \"../ysts/ysts\"\n    }\n  }, [_c('view', {\n    staticClass: \"uni-list-cell-navigate uni-navigate-right\"\n  }, [_vm._v(\"\\n\\t\\t\\t\\t有声听书吧\\n\\t\\t\\t\")])])], 1)])\n}\nvar staticRenderFns = []\nrender._withStripped = true\nvar esExports = { render: render, staticRenderFns: staticRenderFns }\n/* harmony default export */ __webpack_exports__[\"a\"] = (esExports);\nif (false) {\n  module.hot.accept()\n  if (module.hot.data) {\n     require(\"vue-hot-reload-api\").rerender(\"data-v-63b3f4a6\", esExports)\n  }\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./lib/mpvue-loader/lib/template-compiler?{\"id\":\"data-v-63b3f4a6\",\"hasScoped\":false,\"preserveWhitespace\":false}!./lib/preprocessor-loader.js?{\"type\":\"html\",\"context\":{\"APP-PLUS\":true}}!./lib/mpvue-loader/lib/selector.js?type=template&index=0!E:/app实例/HX/newsApp/newsApp/pages/video/video.vue\n// module id = 101\n// module chunks = 6\n\n");

/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar _mpvuePageFactory = __webpack_require__(2);var _mpvuePageFactory2 = _interopRequireDefault(_mpvuePageFactory);\nvar _video = __webpack_require__(98);var _video2 = _interopRequireDefault(_video);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\nPage((0, _mpvuePageFactory2.default)(_video2.default));\n\n//////////////////\n// WEBPACK FOOTER\n// E:/app实例/HX/newsApp/newsApp/pages/video/video.js\n// module id = 97\n// module chunks = 6\n\n//# sourceURL=uni-app:///pages/video/video.js?397d");

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_loader_babelrc_false_retainLines_true_presets_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_preset_env_modules_commonjs_targets_browsers_1_last_2_versions_not_ie_8_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_preset_stage_2_plugins_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_plugin_transform_runtime_helpers_false_polyfill_false_regenerator_true_moduleName_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_runtime_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_plugin_transform_decorators_legacy_D_Program_Files_x86_HBuilderX_plugins_uniapp_lib_preprocessor_loader_js_type_js_context_APP_PLUS_true_D_Program_Files_x86_HBuilderX_plugins_uniapp_lib_mpvue_loader_lib_selector_type_script_index_0_video_vue__ = __webpack_require__(100);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_loader_babelrc_false_retainLines_true_presets_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_preset_env_modules_commonjs_targets_browsers_1_last_2_versions_not_ie_8_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_preset_stage_2_plugins_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_plugin_transform_runtime_helpers_false_polyfill_false_regenerator_true_moduleName_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_runtime_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_plugin_transform_decorators_legacy_D_Program_Files_x86_HBuilderX_plugins_uniapp_lib_preprocessor_loader_js_type_js_context_APP_PLUS_true_D_Program_Files_x86_HBuilderX_plugins_uniapp_lib_mpvue_loader_lib_selector_type_script_index_0_video_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_loader_babelrc_false_retainLines_true_presets_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_preset_env_modules_commonjs_targets_browsers_1_last_2_versions_not_ie_8_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_preset_stage_2_plugins_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_plugin_transform_runtime_helpers_false_polyfill_false_regenerator_true_moduleName_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_runtime_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_plugin_transform_decorators_legacy_D_Program_Files_x86_HBuilderX_plugins_uniapp_lib_preprocessor_loader_js_type_js_context_APP_PLUS_true_D_Program_Files_x86_HBuilderX_plugins_uniapp_lib_mpvue_loader_lib_selector_type_script_index_0_video_vue__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__D_Program_Files_x86_HBuilderX_plugins_uniapp_lib_mpvue_loader_lib_template_compiler_index_id_data_v_63b3f4a6_hasScoped_false_preserveWhitespace_false_D_Program_Files_x86_HBuilderX_plugins_uniapp_lib_preprocessor_loader_js_type_html_context_APP_PLUS_true_D_Program_Files_x86_HBuilderX_plugins_uniapp_lib_mpvue_loader_lib_selector_type_template_index_0_video_vue__ = __webpack_require__(101);\nvar disposed = false\nfunction injectStyle (ssrContext) {\n  if (disposed) return\n  __webpack_require__(99)\n}\nvar normalizeComponent = __webpack_require__(0)\n/* script */\n\n/* template */\n\n/* styles */\nvar __vue_styles__ = injectStyle\n/* scopeId */\nvar __vue_scopeId__ = null\n/* moduleIdentifier (server only) */\nvar __vue_module_identifier__ = null\nvar Component = normalizeComponent(\n  __WEBPACK_IMPORTED_MODULE_0__D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_loader_babelrc_false_retainLines_true_presets_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_preset_env_modules_commonjs_targets_browsers_1_last_2_versions_not_ie_8_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_preset_stage_2_plugins_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_plugin_transform_runtime_helpers_false_polyfill_false_regenerator_true_moduleName_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_runtime_D_Program_Files_x86_HBuilderX_plugins_uniapp_node_modules_babel_plugin_transform_decorators_legacy_D_Program_Files_x86_HBuilderX_plugins_uniapp_lib_preprocessor_loader_js_type_js_context_APP_PLUS_true_D_Program_Files_x86_HBuilderX_plugins_uniapp_lib_mpvue_loader_lib_selector_type_script_index_0_video_vue___default.a,\n  __WEBPACK_IMPORTED_MODULE_1__D_Program_Files_x86_HBuilderX_plugins_uniapp_lib_mpvue_loader_lib_template_compiler_index_id_data_v_63b3f4a6_hasScoped_false_preserveWhitespace_false_D_Program_Files_x86_HBuilderX_plugins_uniapp_lib_preprocessor_loader_js_type_html_context_APP_PLUS_true_D_Program_Files_x86_HBuilderX_plugins_uniapp_lib_mpvue_loader_lib_selector_type_template_index_0_video_vue__[\"a\" /* default */],\n  __vue_styles__,\n  __vue_scopeId__,\n  __vue_module_identifier__\n)\nComponent.options.__file = \"E:\\\\app实例\\\\HX\\\\newsApp\\\\newsApp\\\\pages\\\\video\\\\video.vue\"\nif (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== \"default\" && key.substr(0, 2) !== \"__\"})) {console.error(\"named exports are not supported in *.vue files.\")}\nif (Component.options.functional) {console.error(\"[vue-loader] video.vue: functional components are not supported with templates, they should use render functions.\")}\n\n/* hot reload */\nif (false) {(function () {\n  var hotAPI = require(\"vue-hot-reload-api\")\n  hotAPI.install(require(\"vue\"), false)\n  if (!hotAPI.compatible) return\n  module.hot.accept()\n  if (!module.hot.data) {\n    hotAPI.createRecord(\"data-v-63b3f4a6\", Component.options)\n  } else {\n    hotAPI.reload(\"data-v-63b3f4a6\", Component.options)\n  }\n  module.hot.dispose(function (data) {\n    disposed = true\n  })\n})()}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Component.exports);\n\n\n//////////////////\n// WEBPACK FOOTER\n// E:/app实例/HX/newsApp/newsApp/pages/video/video.vue\n// module id = 98\n// module chunks = 6\n\n");

/***/ }),

/***/ 99:
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/extract-text-webpack-plugin/dist/loader.js?{\"omit\":1,\"remove\":true}!./node_modules/vue-style-loader!./lib/css-var-loader.js!./node_modules/css-loader?{\"minimize\":false,\"sourceMap\":false}!./lib/mpvue-loader/lib/style-compiler?{\"vue\":true,\"id\":\"data-v-63b3f4a6\",\"scoped\":false,\"hasInlineConfig\":false}!./lib/css-upx-loader.js?{\"baseDpr\":1,\"rpxUnit\":1}!./lib/preprocessor-loader.js?{\"type\":\"js\",\"context\":{\"APP-PLUS\":true}}!./node_modules/postcss-loader/lib?{\"config\":{\"path\":\"D://Program Files (x86)//HBuilderX//plugins//uniapp//.postcssrc.js\"},\"sourceMap\":true}!./lib/preprocessor-loader.js?{\"type\":\"js\",\"context\":{\"APP-PLUS\":true}}!./lib/mpvue-loader/lib/selector.js?type=styles&index=0!E:/app实例/HX/newsApp/newsApp/pages/video/video.vue\n// module id = 99\n// module chunks = 6\n\n");

/***/ })

},[97]);