(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[100],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/router */ "./resources/js/src/router/index.js");
/* harmony import */ var ziggy_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ziggy-js */ "./node_modules/ziggy-js/dist/index.js");
/* harmony import */ var ziggy_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ziggy_js__WEBPACK_IMPORTED_MODULE_5__);


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





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'EquipmentDetail',
  setup: function setup() {
    var equipment = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_2__["ref"])({});
    var fetchEquipment = /*#__PURE__*/function () {
      var _ref = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee(toolId) {
        var response;
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios__WEBPACK_IMPORTED_MODULE_3___default.a.get(ziggy_js__WEBPACK_IMPORTED_MODULE_5___default()('equipments.getDetails', {
                  tool_id: toolId
                }));
              case 3:
                response = _context.sent;
                equipment.value = response.data.data;
                _context.next = 10;
                break;
              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.error('Error fetching equipment details:', _context.t0);
              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));
      return function fetchEquipment(_x) {
        return _ref.apply(this, arguments);
      };
    }();
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_2__["onMounted"])(function () {
      var toolId = _router__WEBPACK_IMPORTED_MODULE_4__["default"].history.current.params.tool_id;
      if (toolId) {
        fetchEquipment(toolId);
      }
    });
    var formatDate = function formatDate(date) {
      if (!date) return 'N/A';
      var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      return new Date(date).toLocaleDateString(undefined, options);
    };
    var getStatusClass = function getStatusClass(status) {
      return status === 'storage' ? 'status-storage' : 'status-active';
    };
    return {
      equipment: equipment,
      formatDate: formatDate,
      getStatusClass: getStatusClass
    };
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=style&index=0&id=12a521f8&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=style&index=0&id=12a521f8&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.equipment-detail-modern[data-v-12a521f8] {\n  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n[dir] .equipment-detail-modern[data-v-12a521f8] {\n  background-color: #f4f6f9;\n  padding: 2rem;\n}\n.detail-container[data-v-12a521f8] {\n  display: flex;\n  overflow: hidden;\n  max-width: 1200px;\n  width: 100%;\n}\n[dir] .detail-container[data-v-12a521f8] {\n  background-color: white;\n  border-radius: 16px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\n}\n.detail-container.no-image .equipment-info-wrapper[data-v-12a521f8] {\n  flex: 0 0 100%;\n  max-width: 100%;\n}\n.equipment-image-wrapper[data-v-12a521f8] {\n  position: relative;\n  flex: 0 0 40%;\n  max-width: 40%;\n}\n.image-backdrop[data-v-12a521f8] {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n}\n[dir=ltr] .image-backdrop[data-v-12a521f8] {\n  left: 0;\n  background: linear-gradient(\n    135deg, \n    rgba(33, 150, 243, 0.2) 0%, \n    rgba(33, 150, 243, 0.05) 100%\n  );\n}\n[dir=rtl] .image-backdrop[data-v-12a521f8] {\n  right: 0;\n  background: linear-gradient(\n    -135deg, \n    rgba(33, 150, 243, 0.2) 0%, \n    rgba(33, 150, 243, 0.05) 100%\n  );\n}\n.equipment-image[data-v-12a521f8] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  position: relative;\n  z-index: 2;\n}\n.equipment-info-wrapper[data-v-12a521f8] {\n  flex: 0 0 60%;\n  max-width: 60%;\n}\n[dir] .equipment-info-wrapper[data-v-12a521f8] {\n  padding: 2.5rem;\n  background-color: white;\n}\n.header-section[data-v-12a521f8] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n[dir] .header-section[data-v-12a521f8] {\n  margin-bottom: 2rem;\n}\n.equipment-name[data-v-12a521f8] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  color: #2c3e50;\n}\n[dir] .equipment-name[data-v-12a521f8] {\n  margin: 0;\n}\n.status-chip[data-v-12a521f8] {\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 0.8rem;\n}\n[dir] .status-chip[data-v-12a521f8] {\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n}\n.status-storage[data-v-12a521f8] {\n  color: #4338ca;\n}\n[dir] .status-storage[data-v-12a521f8] {\n  background-color: #e0e7ff;\n}\n.status-active[data-v-12a521f8] {\n  color: #047857;\n}\n[dir] .status-active[data-v-12a521f8] {\n  background-color: #d1fae5;\n}\n.info-grid[data-v-12a521f8] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1.5rem;\n}\n.info-item[data-v-12a521f8] {\n  display: flex;\n  flex-direction: column;\n}\n.info-label[data-v-12a521f8] {\n  font-size: 0.875rem;\n  color: #6b7280;\n  text-transform: uppercase;\n  font-weight: 600;\n}\n[dir] .info-label[data-v-12a521f8] {\n  margin-bottom: 0.5rem;\n}\n.info-value[data-v-12a521f8] {\n  font-size: 1rem;\n  color: #1f2937;\n  font-weight: 500;\n}\n@media (max-width: 1024px) {\n.detail-container[data-v-12a521f8] {\n    flex-direction: column;\n}\n.equipment-image-wrapper[data-v-12a521f8],\n  .equipment-info-wrapper[data-v-12a521f8] {\n    max-width: 100%;\n    flex: 0 0 100%;\n}\n.equipment-image-wrapper[data-v-12a521f8] {\n    height: 300px;\n}\n.info-grid[data-v-12a521f8] {\n    grid-template-columns: 1fr;\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=style&index=0&id=12a521f8&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=style&index=0&id=12a521f8&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EquipmentDetails.vue?vue&type=style&index=0&id=12a521f8&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=style&index=0&id=12a521f8&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=template&id=12a521f8&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=template&id=12a521f8&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "equipment-detail-modern" }, [
    _c(
      "div",
      {
        staticClass: "detail-container",
        class: { "no-image": !_vm.equipment.image_url },
      },
      [
        _vm.equipment.image_url
          ? _c("div", { staticClass: "equipment-image-wrapper" }, [
              _c("div", { staticClass: "image-backdrop" }),
              _vm._v(" "),
              _c("img", {
                staticClass: "equipment-image",
                attrs: {
                  src: _vm.equipment.image_url,
                  alt: _vm.equipment.name,
                },
              }),
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "equipment-info-wrapper" }, [
          _c("div", { staticClass: "header-section" }, [
            _c("h1", { staticClass: "equipment-name" }, [
              _vm._v(_vm._s(_vm.equipment.name)),
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "status-chip",
                class: _vm.getStatusClass(_vm.equipment.status),
              },
              [
                _vm._v(
                  "\n                    " +
                    _vm._s(_vm.equipment.status) +
                    "\n                "
                ),
              ]
            ),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "info-grid" }, [
            _c("div", { staticClass: "info-item" }, [
              _c("span", { staticClass: "info-label" }, [
                _vm._v("Equipment ID"),
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "info-value" }, [
                _vm._v(_vm._s(_vm.equipment.tool_id)),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "info-item" }, [
              _c("span", { staticClass: "info-label" }, [_vm._v("Supplier")]),
              _vm._v(" "),
              _c("span", { staticClass: "info-value" }, [
                _vm._v(_vm._s(_vm.equipment.supplier || "N/A")),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "info-item" }, [
              _c("span", { staticClass: "info-label" }, [_vm._v("Category")]),
              _vm._v(" "),
              _c("span", { staticClass: "info-value" }, [
                _vm._v(
                  "\n                        " +
                    _vm._s(
                      _vm.equipment.category
                        ? _vm.equipment.category.name
                        : "N/A"
                    ) +
                    "\n                    "
                ),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "info-item" }, [
              _c("span", { staticClass: "info-label" }, [
                _vm._v("Serial Number"),
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "info-value" }, [
                _vm._v(_vm._s(_vm.equipment.serial_number)),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "info-item" }, [
              _c("span", { staticClass: "info-label" }, [
                _vm._v("Certificate Number"),
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "info-value" }, [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.equipment.certificate_number || "N/A") +
                    "\n                    "
                ),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "info-item" }, [
              _c("span", { staticClass: "info-label" }, [
                _vm._v("Valid Until"),
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "info-value" }, [
                _vm._v(
                  "\n                        " +
                    _vm._s(_vm.formatDate(_vm.equipment.valid_until)) +
                    "\n                    "
                ),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "info-item" }, [
              _c("span", { staticClass: "info-label" }, [
                _vm._v("Storage Location"),
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "info-value" }, [
                _vm._v(
                  "\n                        " +
                    _vm._s(
                      _vm.equipment.storage_location
                        ? _vm.equipment.storage_location.name
                        : "N/A"
                    ) +
                    "\n                    "
                ),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "info-item" }, [
              _c("span", { staticClass: "info-label" }, [_vm._v("Procedure")]),
              _vm._v(" "),
              _c("span", { staticClass: "info-value" }, [
                _vm._v(
                  "\n                        " +
                    _vm._s(
                      _vm.equipment.procedure
                        ? _vm.equipment.procedure.title
                        : "N/A"
                    ) +
                    "\n                    "
                ),
              ]),
            ]),
          ]),
        ]),
      ]
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/equipments/EquipmentDetails.vue":
/*!****************************************************************!*\
  !*** ./resources/js/src/views/equipments/EquipmentDetails.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EquipmentDetails_vue_vue_type_template_id_12a521f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EquipmentDetails.vue?vue&type=template&id=12a521f8&scoped=true& */ "./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=template&id=12a521f8&scoped=true&");
/* harmony import */ var _EquipmentDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EquipmentDetails.vue?vue&type=script&lang=js& */ "./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _EquipmentDetails_vue_vue_type_style_index_0_id_12a521f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EquipmentDetails.vue?vue&type=style&index=0&id=12a521f8&scoped=true&lang=css& */ "./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=style&index=0&id=12a521f8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _EquipmentDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EquipmentDetails_vue_vue_type_template_id_12a521f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EquipmentDetails_vue_vue_type_template_id_12a521f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "12a521f8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/equipments/EquipmentDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EquipmentDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EquipmentDetails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EquipmentDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=style&index=0&id=12a521f8&scoped=true&lang=css&":
/*!*************************************************************************************************************************!*\
  !*** ./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=style&index=0&id=12a521f8&scoped=true&lang=css& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EquipmentDetails_vue_vue_type_style_index_0_id_12a521f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EquipmentDetails.vue?vue&type=style&index=0&id=12a521f8&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=style&index=0&id=12a521f8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EquipmentDetails_vue_vue_type_style_index_0_id_12a521f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EquipmentDetails_vue_vue_type_style_index_0_id_12a521f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EquipmentDetails_vue_vue_type_style_index_0_id_12a521f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EquipmentDetails_vue_vue_type_style_index_0_id_12a521f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=template&id=12a521f8&scoped=true&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=template&id=12a521f8&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EquipmentDetails_vue_vue_type_template_id_12a521f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EquipmentDetails.vue?vue&type=template&id=12a521f8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/equipments/EquipmentDetails.vue?vue&type=template&id=12a521f8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EquipmentDetails_vue_vue_type_template_id_12a521f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EquipmentDetails_vue_vue_type_template_id_12a521f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);