(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[68],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/layouts/Main.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/layouts/Main.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _themeConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @themeConfig */ "./resources/js/themeConfig.js");
/* harmony import */ var vue_toastification_composition__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue-toastification/composition */ "./node_modules/vue-toastification/composition/index.js");
/* harmony import */ var vue_toastification_composition__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(vue_toastification_composition__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var _core_app_config_useAppConfig__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core/app-config/useAppConfig */ "./resources/js/src/@core/app-config/useAppConfig.js");
/* harmony import */ var _vueuse_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @vueuse/core */ "./node_modules/@vueuse/core/dist/index.esm.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/store */ "./resources/js/src/store/index.js");






//
//
//
//
//
//
//
//
//
//
//

// This will be populated in `beforeCreate` hook






var LayoutVertical = function LayoutVertical() {
  return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(19), __webpack_require__.e(1), __webpack_require__.e(34)]).then(__webpack_require__.bind(null, /*! @/layouts/vertical/LayoutVertical.vue */ "./resources/js/src/layouts/vertical/LayoutVertical.vue"));
};
var LayoutFull = function LayoutFull() {
  return __webpack_require__.e(/*! import() */ 60).then(__webpack_require__.bind(null, /*! @/layouts/full/LayoutFull.vue */ "./resources/js/src/layouts/full/LayoutFull.vue"));
};
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    // Layouts
    LayoutVertical: LayoutVertical,
    LayoutFull: LayoutFull
  },
  // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
  // Currently, router.currentRoute is not reactive and doesn't trigger any change
  computed: {
    layout: function layout() {
      if (this.$route.meta.layout === 'full') return 'layout-full';
      return "layout-".concat(this.contentLayoutType);
    },
    contentLayoutType: function contentLayoutType() {
      return this.$store.state.appConfig.layout.type;
    }
  },
  beforeCreate: function beforeCreate() {
    // Set colors in theme
    var colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];

    // eslint-disable-next-line no-plusplus
    for (var i = 0, len = colors.length; i < len; i++) {
      _themeConfig__WEBPACK_IMPORTED_MODULE_6__["$themeColors"][colors[i]] = Object(_vueuse_core__WEBPACK_IMPORTED_MODULE_10__["useCssVar"])("--".concat(colors[i]), document.documentElement).value.trim();
    }

    // Set Theme Breakpoints
    var breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

    // eslint-disable-next-line no-plusplus
    for (var _i = 0, _len = breakpoints.length; _i < _len; _i++) {
      _themeConfig__WEBPACK_IMPORTED_MODULE_6__["$themeBreakpoints"][breakpoints[_i]] = Number(Object(_vueuse_core__WEBPACK_IMPORTED_MODULE_10__["useCssVar"])("--breakpoint-".concat(breakpoints[_i]), document.documentElement).value.slice(0, -2));
    }

    // Set RTL
    var isRTL = _themeConfig__WEBPACK_IMPORTED_MODULE_6__["$themeConfig"].layout.isRTL;
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  },
  setup: function setup() {
    var _useAppConfig = Object(_core_app_config_useAppConfig__WEBPACK_IMPORTED_MODULE_9__["default"])(),
      skin = _useAppConfig.skin,
      skinClasses = _useAppConfig.skinClasses;

    // If skin is dark when initialized => Add class to body
    if (skin.value === 'dark') document.body.classList.add('dark-layout');

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    Object(vue_toastification_composition__WEBPACK_IMPORTED_MODULE_7__["provideToast"])({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: 'Vue-Toastification__fade'
    });

    // Set Window Width in store
    _store__WEBPACK_IMPORTED_MODULE_11__["default"].commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth);
    var _useWindowSize = Object(_vueuse_core__WEBPACK_IMPORTED_MODULE_10__["useWindowSize"])(),
      windowWidth = _useWindowSize.width;
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_8__["watch"])(windowWidth, function (val) {
      _store__WEBPACK_IMPORTED_MODULE_11__["default"].commit('app/UPDATE_WINDOW_WIDTH', val);
    });
    return {
      skinClasses: skinClasses
    };
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/layouts/Main.vue?vue&type=template&id=302c2368&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/layouts/Main.vue?vue&type=template&id=302c2368& ***!
  \********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "h-100", class: [_vm.skinClasses], attrs: { id: "app" } },
    [_c(_vm.layout, { tag: "component" })],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/@core/app-config/useAppConfig.js":
/*!***********************************************************!*\
  !*** ./resources/js/src/@core/app-config/useAppConfig.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return usAppConfig; });
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store */ "./resources/js/src/store/index.js");


function usAppConfig() {
  // ------------------------------------------------
  // isVerticalMenuCollapsed
  // ------------------------------------------------
  var isVerticalMenuCollapsed = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__["computed"])({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_1__["default"].state.verticalMenu.isVerticalMenuCollapsed;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].commit('verticalMenu/UPDATE_VERTICAL_MENU_COLLAPSED', val);
    }
  });

  // ------------------------------------------------
  // RTL
  // ------------------------------------------------
  var isRTL = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__["computed"])({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_1__["default"].state.appConfig.layout.isRTL;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].commit('appConfig/TOGGLE_RTL', val);
    }
  });

  // ------------------------------------------------
  // Skin
  // ------------------------------------------------
  var skin = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__["computed"])({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_1__["default"].state.appConfig.layout.skin;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].commit('appConfig/UPDATE_SKIN', val);
    }
  });
  var skinClasses = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__["computed"])(function () {
    if (skin.value === 'bordered') return 'bordered-layout';
    if (skin.value === 'semi-dark') return 'semi-dark-layout';

    // Do not return any class for dark layout because dark layout updates class in body
    // Do not return any class for light layout as that is default layout
    return null;
  });

  // ------------------------------------------------
  // routerTransition
  // ------------------------------------------------
  var routerTransition = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__["computed"])({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_1__["default"].state.appConfig.layout.routerTransition;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].commit('appConfig/UPDATE_ROUTER_TRANSITION', val);
    }
  });

  // *===============================================---*
  // *--------- LAYOUT ---------------------------------------*
  // *===============================================---*

  // ------------------------------------------------
  // layoutType
  // ------------------------------------------------

  var layoutType = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__["computed"])({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_1__["default"].state.appConfig.layout.type;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].commit('appConfig/UPDATE_LAYOUT_TYPE', val);
    }
  });

  // Reset skin if skin is semi-dark and move to horizontal layout
  Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__["watch"])(layoutType, function (val) {
    if (val === 'horizontal' && skin.value === 'semi-dark') skin.value = 'light';
  });

  // ------------------------------------------------
  // Content Width (Full/Boxed)
  // ------------------------------------------------
  var contentWidth = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__["computed"])({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_1__["default"].state.appConfig.layout.contentWidth;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].commit('appConfig/UPDATE_CONTENT_WIDTH', val);
    }
  });

  // ------------------------------------------------
  // isNavMenuHidden
  // ------------------------------------------------
  var isNavMenuHidden = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__["computed"])({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_1__["default"].state.appConfig.layout.menu.hidden;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].commit('appConfig/UPDATE_NAV_MENU_HIDDEN', val);
    }
  });

  // *===============================================---*
  // *--------- NAVBAR ---------------------------------------*
  // *===============================================---*

  var navbarBackgroundColor = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__["computed"])({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_1__["default"].state.appConfig.layout.navbar.backgroundColor;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].commit('appConfig/UPDATE_NAVBAR_CONFIG', {
        backgroundColor: val
      });
    }
  });
  var navbarType = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__["computed"])({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_1__["default"].state.appConfig.layout.navbar.type;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].commit('appConfig/UPDATE_NAVBAR_CONFIG', {
        type: val
      });
    }
  });

  // *===============================================---*
  // *--------- FOOTER ---------------------------------------*
  // *===============================================---*

  var footerType = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_0__["computed"])({
    get: function get() {
      return _store__WEBPACK_IMPORTED_MODULE_1__["default"].state.appConfig.layout.footer.type;
    },
    set: function set(val) {
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].commit('appConfig/UPDATE_FOOTER_CONFIG', {
        type: val
      });
    }
  });
  return {
    isVerticalMenuCollapsed: isVerticalMenuCollapsed,
    isRTL: isRTL,
    skin: skin,
    skinClasses: skinClasses,
    routerTransition: routerTransition,
    // Navbar
    navbarBackgroundColor: navbarBackgroundColor,
    navbarType: navbarType,
    // Footer
    footerType: footerType,
    // Layout
    layoutType: layoutType,
    contentWidth: contentWidth,
    isNavMenuHidden: isNavMenuHidden
  };
}

/***/ }),

/***/ "./resources/js/src/layouts/Main.vue":
/*!*******************************************!*\
  !*** ./resources/js/src/layouts/Main.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Main_vue_vue_type_template_id_302c2368___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Main.vue?vue&type=template&id=302c2368& */ "./resources/js/src/layouts/Main.vue?vue&type=template&id=302c2368&");
/* harmony import */ var _Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Main.vue?vue&type=script&lang=js& */ "./resources/js/src/layouts/Main.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Main_vue_vue_type_template_id_302c2368___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Main_vue_vue_type_template_id_302c2368___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/layouts/Main.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/layouts/Main.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/src/layouts/Main.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Main.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/layouts/Main.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/layouts/Main.vue?vue&type=template&id=302c2368&":
/*!**************************************************************************!*\
  !*** ./resources/js/src/layouts/Main.vue?vue&type=template&id=302c2368& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_302c2368___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Main.vue?vue&type=template&id=302c2368& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/layouts/Main.vue?vue&type=template&id=302c2368&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_302c2368___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Main_vue_vue_type_template_id_302c2368___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);