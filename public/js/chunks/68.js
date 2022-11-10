(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[68],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _composables_customer_claims__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/composables/customer/claims */ "./resources/js/src/composables/customer/claims.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var _auth_jwt_useJwt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/auth/jwt/useJwt */ "./resources/js/src/auth/jwt/useJwt.js");
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @validations */ "./resources/js/src/@core/utils/validations/validations.js");


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
  components: {
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_4___default.a,
    BOverlay: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BOverlay"],
    ValidationProvider: vee_validate__WEBPACK_IMPORTED_MODULE_3__["ValidationProvider"],
    ValidationObserver: vee_validate__WEBPACK_IMPORTED_MODULE_3__["ValidationObserver"]
  },
  setup: function setup() {
    var _useClaims = Object(_composables_customer_claims__WEBPACK_IMPORTED_MODULE_5__["default"])(),
        busy = _useClaims.busy,
        saveClaim = _useClaims.saveClaim,
        salePackage = _useClaims.salePackage,
        customerSales = _useClaims.customerSales,
        fetchSalePackage = _useClaims.fetchSalePackage,
        fetchCustomerSales = _useClaims.fetchCustomerSales;

    var claim = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["ref"])({
      item_id: '',
      item_type: '',
      issue_date: '',
      issue_details: '',
      model_number: '',
      item_location: '',
      prior_issue_or_repair: '',
      serial_no: ''
    });
    var planCoveredItem = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["ref"])([]);
    var customerData = JSON.parse(_auth_jwt_useJwt__WEBPACK_IMPORTED_MODULE_7__["default"].getCustomerData());
    var customerConveredProperty = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["ref"])({});

    var getSalePackage = /*#__PURE__*/function () {
      var _ref = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee(saleId) {
        return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                claim.value.item_id = '';
                _context.next = 3;
                return fetchSalePackage(saleId);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function getSalePackage(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    var getPackageDetails = /*#__PURE__*/function () {
      var _ref2 = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2(salePackageItem) {
        return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                planCoveredItem.value = salePackageItem.plan_type.covered_items;

                if (salePackageItem.additional_address) {
                  customerConveredProperty.value = salePackageItem.additional_address;
                } else {
                  customerConveredProperty.value = {
                    address: customerData.address,
                    city: customerData.city,
                    state: customerData.state,
                    zip: customerData.zip
                  };
                }

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function getPackageDetails(_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    var _formValidation = formValidation(),
        refFormObserver = _formValidation.refFormObserver,
        getValidationState = _formValidation.getValidationState,
        resetForm = _formValidation.resetForm;

    var onSubmit = /*#__PURE__*/function () {
      var _ref3 = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee3() {
        return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return saveClaim(claim.value);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function onSubmit() {
        return _ref3.apply(this, arguments);
      };
    }();

    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["onMounted"])(function () {
      fetchCustomerSales();
    });
    return {
      busy: busy,
      claim: claim,
      required: _validations__WEBPACK_IMPORTED_MODULE_8__["required"],
      onSubmit: onSubmit,
      salePackage: salePackage,
      customerData: customerData,
      customerSales: customerSales,
      getSalePackage: getSalePackage,
      planCoveredItem: planCoveredItem,
      getPackageDetails: getPackageDetails,
      customerConveredProperty: customerConveredProperty
    };
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=style&index=0&id=a6b27166&lang=scss&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=style&index=0&id=a6b27166&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(/*! -!../../../../../../node_modules/css-loader/dist/cjs.js!vue-select/dist/vue-select.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-select/dist/vue-select.css");
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
// Module
exports.push([module.i, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-select/dist/vue-select.css":
/*!*******************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-select/dist/vue-select.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ":root{--vs-colors--lightest:rgba(60,60,60,0.26);--vs-colors--light:rgba(60,60,60,0.5);--vs-colors--dark:#333;--vs-colors--darkest:rgba(0,0,0,0.15);--vs-search-input-color:inherit;--vs-search-input-placeholder-color:inherit;--vs-font-size:1rem;--vs-line-height:1.4;--vs-state-disabled-bg:#f8f8f8;--vs-state-disabled-color:var(--vs-colors--light);--vs-state-disabled-controls-color:var(--vs-colors--light);--vs-state-disabled-cursor:not-allowed;--vs-border-color:var(--vs-colors--lightest);--vs-border-width:1px;--vs-border-style:solid;--vs-border-radius:4px;--vs-actions-padding:4px 6px 0 3px;--vs-controls-color:var(--vs-colors--light);--vs-controls-size:1;--vs-controls--deselect-text-shadow:0 1px 0 #fff;--vs-selected-bg:#f0f0f0;--vs-selected-color:var(--vs-colors--dark);--vs-selected-border-color:var(--vs-border-color);--vs-selected-border-style:var(--vs-border-style);--vs-selected-border-width:var(--vs-border-width);--vs-dropdown-bg:#fff;--vs-dropdown-color:inherit;--vs-dropdown-z-index:1000;--vs-dropdown-min-width:160px;--vs-dropdown-max-height:350px;--vs-dropdown-box-shadow:0px 3px 6px 0px var(--vs-colors--darkest);--vs-dropdown-option-bg:#000;--vs-dropdown-option-color:var(--vs-dropdown-color);--vs-dropdown-option-padding:3px 20px;--vs-dropdown-option--active-bg:#5897fb;--vs-dropdown-option--active-color:#fff;--vs-dropdown-option--deselect-bg:#fb5858;--vs-dropdown-option--deselect-color:#fff;--vs-transition-timing-function:cubic-bezier(1,-0.115,0.975,0.855);--vs-transition-duration:150ms}.v-select{font-family:inherit;position:relative}.v-select,.v-select *{box-sizing:border-box}:root{--vs-transition-timing-function:cubic-bezier(1,0.5,0.8,1);--vs-transition-duration:0.15s}@-webkit-keyframes vSelectSpinner{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes vSelectSpinner{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.vs__fade-enter-active,.vs__fade-leave-active{pointer-events:none;transition:opacity var(--vs-transition-duration) var(--vs-transition-timing-function)}.vs__fade-enter,.vs__fade-leave-to{opacity:0}:root{--vs-disabled-bg:var(--vs-state-disabled-bg);--vs-disabled-color:var(--vs-state-disabled-color);--vs-disabled-cursor:var(--vs-state-disabled-cursor)}.vs--disabled .vs__clear,.vs--disabled .vs__dropdown-toggle,.vs--disabled .vs__open-indicator,.vs--disabled .vs__search,.vs--disabled .vs__selected{background-color:var(--vs-disabled-bg);cursor:var(--vs-disabled-cursor)}.v-select[dir=rtl] .vs__actions{padding:0 3px 0 6px}.v-select[dir=rtl] .vs__clear{margin-left:6px;margin-right:0}.v-select[dir=rtl] .vs__deselect{margin-left:0;margin-right:2px}.v-select[dir=rtl] .vs__dropdown-menu{text-align:right}.vs__dropdown-toggle{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:none;border:var(--vs-border-width) var(--vs-border-style) var(--vs-border-color);border-radius:var(--vs-border-radius);display:flex;padding:0 0 4px;white-space:normal}.vs__selected-options{display:flex;flex-basis:100%;flex-grow:1;flex-wrap:wrap;padding:0 2px;position:relative}.vs__actions{align-items:center;display:flex;padding:var(--vs-actions-padding)}.vs--searchable .vs__dropdown-toggle{cursor:text}.vs--unsearchable .vs__dropdown-toggle{cursor:pointer}.vs--open .vs__dropdown-toggle{border-bottom-color:transparent;border-bottom-left-radius:0;border-bottom-right-radius:0}.vs__open-indicator{fill:var(--vs-controls-color);transform:scale(var(--vs-controls-size));transition:transform var(--vs-transition-duration) var(--vs-transition-timing-function);transition-timing-function:var(--vs-transition-timing-function)}.vs--open .vs__open-indicator{transform:rotate(180deg) scale(var(--vs-controls-size))}.vs--loading .vs__open-indicator{opacity:0}.vs__clear{fill:var(--vs-controls-color);background-color:transparent;border:0;cursor:pointer;margin-right:8px;padding:0}.vs__dropdown-menu{background:var(--vs-dropdown-bg);border:var(--vs-border-width) var(--vs-border-style) var(--vs-border-color);border-radius:0 0 var(--vs-border-radius) var(--vs-border-radius);border-top-style:none;box-shadow:var(--vs-dropdown-box-shadow);box-sizing:border-box;color:var(--vs-dropdown-color);display:block;left:0;list-style:none;margin:0;max-height:var(--vs-dropdown-max-height);min-width:var(--vs-dropdown-min-width);overflow-y:auto;padding:5px 0;position:absolute;text-align:left;top:calc(100% - var(--vs-border-width));width:100%;z-index:var(--vs-dropdown-z-index)}.vs__no-options{text-align:center}.vs__dropdown-option{clear:both;color:var(--vs-dropdown-option-color);cursor:pointer;display:block;line-height:1.42857143;padding:var(--vs-dropdown-option-padding);white-space:nowrap}.vs__dropdown-option--highlight{background:var(--vs-dropdown-option--active-bg);color:var(--vs-dropdown-option--active-color)}.vs__dropdown-option--deselect{background:var(--vs-dropdown-option--deselect-bg);color:var(--vs-dropdown-option--deselect-color)}.vs__dropdown-option--disabled{background:var(--vs-state-disabled-bg);color:var(--vs-state-disabled-color);cursor:var(--vs-state-disabled-cursor)}.vs__selected{align-items:center;background-color:var(--vs-selected-bg);border:var(--vs-selected-border-width) var(--vs-selected-border-style) var(--vs-selected-border-color);border-radius:var(--vs-border-radius);color:var(--vs-selected-color);display:flex;line-height:var(--vs-line-height);margin:4px 2px 0;padding:0 .25em;z-index:0}.vs__deselect{fill:var(--vs-controls-color);-webkit-appearance:none;-moz-appearance:none;appearance:none;background:none;border:0;cursor:pointer;display:inline-flex;margin-left:4px;padding:0;text-shadow:var(--vs-controls--deselect-text-shadow)}.vs--single .vs__selected{background-color:transparent;border-color:transparent}.vs--single.vs--loading .vs__selected,.vs--single.vs--open .vs__selected{opacity:.4;position:absolute}.vs--single.vs--searching .vs__selected{display:none}.vs__search::-webkit-search-cancel-button{display:none}.vs__search::-ms-clear,.vs__search::-webkit-search-decoration,.vs__search::-webkit-search-results-button,.vs__search::-webkit-search-results-decoration{display:none}.vs__search,.vs__search:focus{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:none;border:1px solid transparent;border-left:none;box-shadow:none;color:var(--vs-search-input-color);flex-grow:1;font-size:var(--vs-font-size);line-height:var(--vs-line-height);margin:4px 0 0;max-width:100%;outline:none;padding:0 7px;width:0;z-index:1}.vs__search::-moz-placeholder{color:var(--vs-search-input-placeholder-color)}.vs__search:-ms-input-placeholder{color:var(--vs-search-input-placeholder-color)}.vs__search::placeholder{color:var(--vs-search-input-placeholder-color)}.vs--unsearchable .vs__search{opacity:1}.vs--unsearchable:not(.vs--disabled) .vs__search{cursor:pointer}.vs--single.vs--searching:not(.vs--open):not(.vs--loading) .vs__search{opacity:.2}.vs__spinner{align-self:center;-webkit-animation:vSelectSpinner 1.1s linear infinite;animation:vSelectSpinner 1.1s linear infinite;border:.9em solid hsla(0,0%,39%,.1);border-left-color:rgba(60,60,60,.45);font-size:5px;opacity:0;overflow:hidden;text-indent:-9999em;transform:translateZ(0) scale(var(--vs-controls--spinner-size,var(--vs-controls-size)));transition:opacity .1s}.vs__spinner,.vs__spinner:after{border-radius:50%;height:5em;transform:scale(var(--vs-controls--spinner-size,var(--vs-controls-size)));width:5em}.vs--loading .vs__spinner{opacity:1}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=style&index=0&id=a6b27166&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=style&index=0&id=a6b27166&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewClaim.vue?vue&type=style&index=0&id=a6b27166&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=style&index=0&id=a6b27166&lang=scss&scoped=true&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=template&id=a6b27166&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=template&id=a6b27166&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
  return _c("main", { staticClass: "main-website-wrap" }, [
    _c("section", { staticClass: "claimform-section py-5" }, [
      _c("div", { staticClass: "container py-lg-4" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-12" }, [
            _c("div", { staticClass: "panel_s" }, [
              _c(
                "div",
                { staticClass: "panel-body mtop10" },
                [
                  _vm._m(0),
                  _vm._v(" "),
                  _c(
                    "h2",
                    { staticClass: "text-center heading-main mb-md-4" },
                    [
                      _vm._v(
                        "\n                CLAIM SUBMISSION FORM\n              "
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _vm._m(1),
                  _vm._v(" "),
                  _c("div", { staticClass: "row" }, [
                    _vm._m(2),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-10 col-sm-11 col-11" }, [
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "col-md-6" }, [
                          _c(
                            "div",
                            { staticClass: "form-group mb-3" },
                            [
                              _c("label", { attrs: { for: "policy_no" } }, [
                                _vm._v("Service Contract"),
                              ]),
                              _vm._v(" "),
                              _c("v-select", {
                                attrs: {
                                  placeholder: "Service Contract",
                                  options: _vm.customerSales,
                                  clearable: false,
                                  label: "contract_number",
                                  reduce: function (sale) {
                                    return sale.id
                                  },
                                },
                                on: { input: _vm.getSalePackage },
                                model: {
                                  value: _vm.claim.sale_id,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.claim, "sale_id", $$v)
                                  },
                                  expression: "claim.sale_id",
                                },
                              }),
                            ],
                            1
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6" }, [
                          _c(
                            "div",
                            { staticClass: "form-group mb-3" },
                            [
                              _c("label", { attrs: { for: "package" } }, [
                                _vm._v("Package"),
                              ]),
                              _vm._v(" "),
                              _c("v-select", {
                                attrs: {
                                  placeholder: "Package",
                                  options: _vm.salePackage,
                                  clearable: false,
                                  label: "id",
                                },
                                on: { input: _vm.getPackageDetails },
                                scopedSlots: _vm._u([
                                  {
                                    key: "option",
                                    fn: function (ref) {
                                      var plan_type = ref.plan_type
                                      return [
                                        _vm._v(
                                          "\n                            " +
                                            _vm._s(plan_type.title) +
                                            "\n                          "
                                        ),
                                      ]
                                    },
                                  },
                                  {
                                    key: "selected-option",
                                    fn: function (ref) {
                                      var plan_type = ref.plan_type
                                      return [
                                        _vm._v(
                                          "\n                            " +
                                            _vm._s(plan_type.title) +
                                            "\n                          "
                                        ),
                                      ]
                                    },
                                  },
                                ]),
                                model: {
                                  value: _vm.claim.item_id,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.claim, "item_id", $$v)
                                  },
                                  expression: "claim.item_id",
                                },
                              }),
                            ],
                            1
                          ),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "col-md-6" }, [
                          _c("div", { staticClass: "form-group mb-3" }, [
                            _c("label", { attrs: { for: "firstname" } }, [
                              _vm._v("First Name"),
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.customerData.first_name,
                                  expression: "customerData.first_name",
                                },
                              ],
                              staticClass:
                                "form-control custom_input_field rounded-0",
                              attrs: { type: "text", readonly: "" },
                              domProps: { value: _vm.customerData.first_name },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.customerData,
                                    "first_name",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("i", { staticClass: "fa fa-user myicon" }),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6" }, [
                          _c("div", { staticClass: "form-group mb-3" }, [
                            _c("label", { attrs: { for: "lastname" } }, [
                              _vm._v("Last Name"),
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.customerData.last_name,
                                  expression: "customerData.last_name",
                                },
                              ],
                              staticClass:
                                "form-control custom_input_field rounded-0",
                              attrs: { type: "text", readonly: "" },
                              domProps: { value: _vm.customerData.last_name },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.customerData,
                                    "last_name",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("i", { staticClass: "fa fa-user myicon" }),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6" }, [
                          _c("div", { staticClass: "form-group mb-3" }, [
                            _c("label", { attrs: { for: "phone" } }, [
                              _vm._v("Phone"),
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.customerData.phone_number,
                                  expression: "customerData.phone_number",
                                },
                              ],
                              staticClass:
                                "form-control custom_input_field rounded-0",
                              attrs: { type: "text", readonly: "" },
                              domProps: {
                                value: _vm.customerData.phone_number,
                              },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.customerData,
                                    "phone_number",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("i", { staticClass: "fa fa-phone myicon" }),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6" }, [
                          _c("div", { staticClass: "form-group mb-3" }, [
                            _c("label", { attrs: { for: "email" } }, [
                              _vm._v("Email"),
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.customerData.email,
                                  expression: "customerData.email",
                                },
                              ],
                              staticClass:
                                "form-control custom_input_field rounded-0",
                              attrs: { type: "text", readonly: "" },
                              domProps: { value: _vm.customerData.email },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.customerData,
                                    "email",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("i", { staticClass: "fa fa-envelope myicon" }),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-12" }, [
                          _c("div", { staticClass: "form-group mb-3" }, [
                            _c("label", { attrs: { for: "catAddress" } }, [
                              _vm._v("Property Coverage Address"),
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.customerConveredProperty.address,
                                  expression:
                                    "customerConveredProperty.address",
                                },
                              ],
                              staticClass:
                                "form-control custom_input_field rounded-0",
                              attrs: {
                                type: "text",
                                id: "catAddress",
                                readonly: "",
                              },
                              domProps: {
                                value: _vm.customerConveredProperty.address,
                              },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.customerConveredProperty,
                                    "address",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6" }, [
                          _c("div", { staticClass: "form-group mb-3" }, [
                            _c("label", { attrs: { for: "city" } }, [
                              _vm._v("City"),
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.customerConveredProperty.city,
                                  expression: "customerConveredProperty.city",
                                },
                              ],
                              staticClass:
                                "form-control custom_input_field rounded-0",
                              attrs: {
                                type: "text",
                                id: "catCity",
                                readonly: "",
                              },
                              domProps: {
                                value: _vm.customerConveredProperty.city,
                              },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.customerConveredProperty,
                                    "city",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6" }, [
                          _c("div", { staticClass: "row" }, [
                            _c("div", { staticClass: "col-md-6" }, [
                              _c("div", { staticClass: "form-group mb-3" }, [
                                _c("label", { attrs: { for: "state" } }, [
                                  _vm._v("State / Province"),
                                ]),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.customerConveredProperty.state,
                                      expression:
                                        "customerConveredProperty.state",
                                    },
                                  ],
                                  staticClass:
                                    "form-control custom_input_field rounded-0",
                                  attrs: {
                                    type: "text",
                                    "idrounded-0": "",
                                    readonly: "",
                                  },
                                  domProps: {
                                    value: _vm.customerConveredProperty.state,
                                  },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.customerConveredProperty,
                                        "state",
                                        $event.target.value
                                      )
                                    },
                                  },
                                }),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-6" }, [
                              _c("div", { staticClass: "form-group mb-3" }, [
                                _c("label", { attrs: { for: "zip" } }, [
                                  _vm._v("Zip Code"),
                                ]),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.customerConveredProperty.zip,
                                      expression:
                                        "customerConveredProperty.zip",
                                    },
                                  ],
                                  staticClass:
                                    "form-control custom_input_field rounded-0",
                                  attrs: {
                                    type: "text",
                                    id: "rounded-0",
                                    readonly: "",
                                  },
                                  domProps: {
                                    value: _vm.customerConveredProperty.zip,
                                  },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.customerConveredProperty,
                                        "zip",
                                        $event.target.value
                                      )
                                    },
                                  },
                                }),
                              ]),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("hr"),
                  _vm._v(" "),
                  _c("validation-observer", {
                    ref: "refFormObserver",
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function (ref) {
                          var handleSubmit = ref.handleSubmit
                          return [
                            _c(
                              "b-overlay",
                              {
                                attrs: {
                                  show: _vm.busy,
                                  "spinner-variant": "primary",
                                  "spinner-type": "grow",
                                  rounded: "sm",
                                  opacity: "0.20",
                                },
                              },
                              [
                                _c(
                                  "form",
                                  {
                                    staticClass: "bg-white p-md-5 rounded-4",
                                    on: {
                                      submit: function ($event) {
                                        $event.preventDefault()
                                        return handleSubmit(_vm.onSubmit)
                                      },
                                    },
                                  },
                                  [
                                    _c(
                                      "h4",
                                      { staticClass: "headshed mb-0 py-4" },
                                      [
                                        _c("span", [_vm._v("STEP 2")]),
                                        _vm._v(
                                          ": Please Describe the issue:\n                    "
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass: "row",
                                        staticStyle: { height: "100%" },
                                      },
                                      [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "col-md-2 col-sm-1 col-1 d-flex flex-column pb-3",
                                          },
                                          [
                                            _c("div", {
                                              staticClass: "clborderleft col",
                                            }),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "col-md-10 col-sm-11 col-11",
                                          },
                                          [
                                            _c("div", { staticClass: "row" }, [
                                              _c(
                                                "div",
                                                { staticClass: "col-md-6" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "form-group mb-3",
                                                    },
                                                    [
                                                      _c(
                                                        "validation-provider",
                                                        {
                                                          attrs: {
                                                            name: "Item Type",
                                                            rules: "required",
                                                            vid: "item_type",
                                                          },
                                                          scopedSlots: _vm._u(
                                                            [
                                                              {
                                                                key: "default",
                                                                fn: function (
                                                                  ref
                                                                ) {
                                                                  var errors =
                                                                    ref.errors
                                                                  return [
                                                                    _c(
                                                                      "label",
                                                                      {
                                                                        attrs: {
                                                                          for: "myitem_type",
                                                                        },
                                                                      },
                                                                      [
                                                                        _vm._v(
                                                                          "Item Type "
                                                                        ),
                                                                        _c(
                                                                          "span",
                                                                          [
                                                                            _vm._v(
                                                                              "(Dishwasher, Oven,\n                                  etc...)"
                                                                            ),
                                                                          ]
                                                                        ),
                                                                      ]
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "v-select",
                                                                      {
                                                                        attrs: {
                                                                          placeholder:
                                                                            "Item Type",
                                                                          options:
                                                                            _vm.planCoveredItem,
                                                                          clearable: false,
                                                                        },
                                                                        model: {
                                                                          value:
                                                                            _vm
                                                                              .claim
                                                                              .item_type,
                                                                          callback:
                                                                            function (
                                                                              $$v
                                                                            ) {
                                                                              _vm.$set(
                                                                                _vm.claim,
                                                                                "item_type",
                                                                                $$v
                                                                              )
                                                                            },
                                                                          expression:
                                                                            "claim.item_type",
                                                                        },
                                                                      }
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "small",
                                                                      {
                                                                        staticClass:
                                                                          "text-danger",
                                                                      },
                                                                      [
                                                                        _vm._v(
                                                                          _vm._s(
                                                                            errors[0]
                                                                          )
                                                                        ),
                                                                      ]
                                                                    ),
                                                                  ]
                                                                },
                                                              },
                                                            ],
                                                            null,
                                                            true
                                                          ),
                                                        }
                                                      ),
                                                    ],
                                                    1
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "form-group mb-3",
                                                    },
                                                    [
                                                      _c(
                                                        "label",
                                                        {
                                                          attrs: {
                                                            for: "issue_date",
                                                          },
                                                        },
                                                        [
                                                          _vm._v(
                                                            "What Date Did the Issue Start\n                                Occuring"
                                                          ),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.claim
                                                                .issue_date,
                                                            expression:
                                                              "claim.issue_date",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "form-control custom_input_field rounded-0",
                                                        attrs: {
                                                          type: "date",
                                                          id: "issue_date",
                                                          name: "issue_date",
                                                          required: "",
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.claim
                                                              .issue_date,
                                                        },
                                                        on: {
                                                          input: function (
                                                            $event
                                                          ) {
                                                            if (
                                                              $event.target
                                                                .composing
                                                            ) {
                                                              return
                                                            }
                                                            _vm.$set(
                                                              _vm.claim,
                                                              "issue_date",
                                                              $event.target
                                                                .value
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "col-md-6" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "form-group mb-3",
                                                    },
                                                    [
                                                      _c(
                                                        "label",
                                                        {
                                                          attrs: {
                                                            for: "issue_details",
                                                          },
                                                        },
                                                        [
                                                          _vm._v(
                                                            "Item Issue Details"
                                                          ),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c("textarea", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.claim
                                                                .issue_details,
                                                            expression:
                                                              "claim.issue_details",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "form-control custom_input_field",
                                                        attrs: {
                                                          name: "issue_details",
                                                          id: "issue_details",
                                                          rows: "5",
                                                          required: "",
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.claim
                                                              .issue_details,
                                                        },
                                                        on: {
                                                          input: function (
                                                            $event
                                                          ) {
                                                            if (
                                                              $event.target
                                                                .composing
                                                            ) {
                                                              return
                                                            }
                                                            _vm.$set(
                                                              _vm.claim,
                                                              "issue_details",
                                                              $event.target
                                                                .value
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "col-md-6" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "form-group mb-3",
                                                    },
                                                    [
                                                      _c(
                                                        "label",
                                                        {
                                                          attrs: {
                                                            for: "model_number",
                                                          },
                                                        },
                                                        [
                                                          _vm._v(
                                                            "Model Number "
                                                          ),
                                                          _c("span", [
                                                            _vm._v(
                                                              "(If applicable / If not\n                                put\n                                none)"
                                                            ),
                                                          ]),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.claim
                                                                .model_number,
                                                            expression:
                                                              "claim.model_number",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "form-control custom_input_field rounded-0",
                                                        attrs: {
                                                          type: "text",
                                                          id: "model_number",
                                                          name: "model_number",
                                                          required: "",
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.claim
                                                              .model_number,
                                                        },
                                                        on: {
                                                          input: function (
                                                            $event
                                                          ) {
                                                            if (
                                                              $event.target
                                                                .composing
                                                            ) {
                                                              return
                                                            }
                                                            _vm.$set(
                                                              _vm.claim,
                                                              "model_number",
                                                              $event.target
                                                                .value
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "col-md-6" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "form-group mb-3",
                                                    },
                                                    [
                                                      _c(
                                                        "label",
                                                        {
                                                          attrs: {
                                                            for: "item_location",
                                                          },
                                                        },
                                                        [
                                                          _vm._v(
                                                            "Item Location "
                                                          ),
                                                          _c("span", [
                                                            _vm._v(
                                                              "(Garage, Basement,\n                                etc...)"
                                                            ),
                                                          ]),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.claim
                                                                .item_location,
                                                            expression:
                                                              "claim.item_location",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "form-control custom_input_field rounded-0",
                                                        attrs: {
                                                          type: "text",
                                                          id: "item_location",
                                                          name: "item_location",
                                                          required: "",
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.claim
                                                              .item_location,
                                                        },
                                                        on: {
                                                          input: function (
                                                            $event
                                                          ) {
                                                            if (
                                                              $event.target
                                                                .composing
                                                            ) {
                                                              return
                                                            }
                                                            _vm.$set(
                                                              _vm.claim,
                                                              "item_location",
                                                              $event.target
                                                                .value
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "col-md-6" },
                                                [
                                                  _c(
                                                    "label",
                                                    {
                                                      attrs: {
                                                        for: "agreement",
                                                      },
                                                    },
                                                    [
                                                      _vm._v(
                                                        "Prior Issues or Repairs?"
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "form-group mb-3",
                                                    },
                                                    [
                                                      _c(
                                                        "label",
                                                        {
                                                          staticClass:
                                                            "d-inline-flex align-items-center gap-1 mt-2 me-3",
                                                        },
                                                        [
                                                          _c("input", {
                                                            directives: [
                                                              {
                                                                name: "model",
                                                                rawName:
                                                                  "v-model",
                                                                value:
                                                                  _vm.claim
                                                                    .prior_issue_or_repair,
                                                                expression:
                                                                  "claim.prior_issue_or_repair",
                                                              },
                                                            ],
                                                            attrs: {
                                                              type: "radio",
                                                              name: "agreement",
                                                              id: "agreement",
                                                              value: "1",
                                                              required: "",
                                                            },
                                                            domProps: {
                                                              checked: _vm._q(
                                                                _vm.claim
                                                                  .prior_issue_or_repair,
                                                                "1"
                                                              ),
                                                            },
                                                            on: {
                                                              change: function (
                                                                $event
                                                              ) {
                                                                return _vm.$set(
                                                                  _vm.claim,
                                                                  "prior_issue_or_repair",
                                                                  "1"
                                                                )
                                                              },
                                                            },
                                                          }),
                                                          _vm._v(
                                                            "Yes\n                              "
                                                          ),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "label",
                                                        {
                                                          staticClass:
                                                            "d-inline-flex align-items-center gap-1 mt-2",
                                                        },
                                                        [
                                                          _c("input", {
                                                            attrs: {
                                                              type: "radio",
                                                              name: "agreement",
                                                              id: "agreement",
                                                              value: "0",
                                                              required: "",
                                                            },
                                                          }),
                                                          _vm._v(
                                                            "No\n                              "
                                                          ),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "col-md-6" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "form-group mb-3",
                                                    },
                                                    [
                                                      _c(
                                                        "label",
                                                        {
                                                          attrs: {
                                                            for: "serial_no",
                                                          },
                                                        },
                                                        [
                                                          _vm._v(
                                                            "Serial Number"
                                                          ),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.claim
                                                                .serial_no,
                                                            expression:
                                                              "claim.serial_no",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "form-control custom_input_field rounded-0",
                                                        attrs: {
                                                          type: "text",
                                                          id: "serial_no",
                                                          name: "serial_no",
                                                          required: "",
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.claim.serial_no,
                                                        },
                                                        on: {
                                                          input: function (
                                                            $event
                                                          ) {
                                                            if (
                                                              $event.target
                                                                .composing
                                                            ) {
                                                              return
                                                            }
                                                            _vm.$set(
                                                              _vm.claim,
                                                              "serial_no",
                                                              $event.target
                                                                .value
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "col-md-12" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "form-group mb-3 files",
                                                    },
                                                    [
                                                      _c(
                                                        "label",
                                                        {
                                                          attrs: {
                                                            for: "files",
                                                          },
                                                        },
                                                        [
                                                          _vm._v(
                                                            "Include Photos "
                                                          ),
                                                          _c("span", [
                                                            _vm._v(
                                                              "( Optional )"
                                                            ),
                                                          ]),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c("input", {
                                                        staticClass:
                                                          "form-control custom_input_field",
                                                        attrs: {
                                                          type: "file",
                                                          name: "files[]",
                                                          id: "files",
                                                          multiple: "",
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "form-group mb-3 text-center mt-4",
                                                },
                                                [
                                                  _c(
                                                    "button",
                                                    {
                                                      staticClass:
                                                        "btn btn-orange py-3 px-5",
                                                      attrs: { type: "submit" },
                                                    },
                                                    [_vm._v("Submit")]
                                                  ),
                                                ]
                                              ),
                                            ]),
                                          ]
                                        ),
                                      ]
                                    ),
                                  ]
                                ),
                              ]
                            ),
                          ]
                        },
                      },
                    ]),
                  }),
                ],
                1
              ),
            ]),
          ]),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "mylogoy" }, [
      _c(
        "a",
        {
          staticClass: "logo img-responsive navbar-brand logo",
          attrs: { href: "#" },
        },
        [
          _c("img", {
            staticClass: "img-responsive",
            attrs: {
              src: "/images/logo.jpg",
              alt: "Priority Home Warranty",
              width: "250",
            },
          }),
        ]
      ),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h4", { staticClass: "headshed mb-0 py-4" }, [
      _c("span", [_vm._v("STEP 1")]),
      _vm._v(
        ": Please verify your information\n                below:\n              "
      ),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "col-md-2 col-sm-1 col-1 d-flex flex-column pb-3" },
      [_c("div", { staticClass: "clborderleft col" })]
    )
  },
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/@core/utils/validations/validations.js":
/*!*****************************************************************!*\
  !*** ./resources/js/src/@core/utils/validations/validations.js ***!
  \*****************************************************************/
/*! exports provided: required, email, double, min, max, confirmed, regex, between, alpha, integer, digits, alphaDash, alphaNum, length, ext, positive, decimal, password, url */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "required", function() { return required; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "email", function() { return email; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "double", function() { return _double; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "confirmed", function() { return confirmed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regex", function() { return regex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "between", function() { return between; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alpha", function() { return alpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "integer", function() { return integer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "digits", function() { return digits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alphaDash", function() { return alphaDash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alphaNum", function() { return alphaNum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ext", function() { return ext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "positive", function() { return positive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decimal", function() { return decimal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "password", function() { return password; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "url", function() { return url; });
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.test.js */ "./node_modules/core-js/modules/es.regexp.test.js");
/* harmony import */ var core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ "./node_modules/core-js/modules/es.regexp.constructor.js");
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_regexp_sticky_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.regexp.sticky.js */ "./node_modules/core-js/modules/es.regexp.sticky.js");
/* harmony import */ var core_js_modules_es_regexp_sticky_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_sticky_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vee-validate/dist/rules */ "./node_modules/vee-validate/dist/rules.js");
/* harmony import */ var vee_validate_dist_locale_ar_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vee-validate/dist/locale/ar.json */ "./node_modules/vee-validate/dist/locale/ar.json");
var vee_validate_dist_locale_ar_json__WEBPACK_IMPORTED_MODULE_9___namespace = /*#__PURE__*/__webpack_require__.t(/*! vee-validate/dist/locale/ar.json */ "./node_modules/vee-validate/dist/locale/ar.json", 1);
/* harmony import */ var vee_validate_dist_locale_en_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vee-validate/dist/locale/en.json */ "./node_modules/vee-validate/dist/locale/en.json");
var vee_validate_dist_locale_en_json__WEBPACK_IMPORTED_MODULE_10___namespace = /*#__PURE__*/__webpack_require__.t(/*! vee-validate/dist/locale/en.json */ "./node_modules/vee-validate/dist/locale/en.json", 1);
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./validators */ "./resources/js/src/@core/utils/validations/validators.js");










 // eslint-disable-next-line object-curly-newline

 // ////////////////////////////////////////////////////////
// General
// ////////////////////////////////////////////////////////

var required = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('required', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["required"]);
var email = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('email', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["email"]);

var _double = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('double', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["double"]);


var min = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('min', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["min"]);
var max = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('max', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["max"]);
var confirmed = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('confirmed', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["confirmed"]);
var regex = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('regex', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["regex"]);
var between = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('between', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["between"]);
var alpha = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('alpha', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["alpha"]);
var integer = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('integer', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["integer"]);
var digits = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('digits', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["digits"]);
var alphaDash = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('alpha-dash', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["alpha_dash"]);
var alphaNum = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('alpha-num', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["alpha_num"]);
var length = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('length', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["length"]);
var ext = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('ext', vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_8__["ext"]);
var positive = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('positive', {
  validate: _validators__WEBPACK_IMPORTED_MODULE_11__["validatorPositive"],
  message: 'Please enter positive number!'
});
var decimal = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('decimal', {
  validate: function validate(value) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$decimals = _ref.decimals,
        decimals = _ref$decimals === void 0 ? '*' : _ref$decimals,
        _ref$separator = _ref.separator,
        separator = _ref$separator === void 0 ? '.' : _ref$separator;

    if (value === null || value === undefined || value === '') {
      return {
        valid: false
      };
    }

    if (Number(decimals) === 0) {
      return {
        valid: /^-?\d*$/.test(value)
      };
    }

    var regexPart = decimals === '*' ? '+' : "{1,".concat(decimals, "}");
    var regexDeci = new RegExp("^[-+]?\\d*(\\".concat(separator, "\\d").concat(regexPart, ")?([eE]{1}[-]?\\d+)?$"));
    return {
      valid: regexDeci.test(value)
    };
  },
  message: 'The {_field_} field must contain only decimal values'
}); // export const credit = extend('credit-card', {
//   validate: validatorCreditCard,
//   message: 'It is not valid credit card!',
// })

var password = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('password', {
  validate: _validators__WEBPACK_IMPORTED_MODULE_11__["validatorPassword"],
  message: 'Your {_field_} must contain at least one uppercase, one lowercase, one special character and one digit'
});
var url = Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["extend"])('url', {
  validate: _validators__WEBPACK_IMPORTED_MODULE_11__["validatorUrlValidator"],
  message: 'URL is invalid'
}); // Install English and Arabic localizations.

Object(vee_validate__WEBPACK_IMPORTED_MODULE_7__["localize"])({
  en: {
    messages: vee_validate_dist_locale_en_json__WEBPACK_IMPORTED_MODULE_10__.messages,
    names: {
      email: 'Email',
      password: 'Password'
    },
    fields: {
      password: {
        min: '{_field_} is too short, you want to get hacked?'
      }
    }
  },
  ar: {
    messages: vee_validate_dist_locale_ar_json__WEBPACK_IMPORTED_MODULE_9__.messages,
    names: {
      email: 'البريد الإلكتروني',
      password: 'كلمة السر'
    },
    fields: {
      password: {
        min: 'كلمة السر قصيرة جداً سيتم اختراقك'
      }
    }
  }
}); // ////////////////////////////////////////////////////////
// NOTE:
// Quasar validation for reference only
// Remove this note once development is finished and make sure to
// to convert all of them in veevalidate version
// ////////////////////////////////////////////////////////
// export const required = (val) => {
//   return (val && val.length > 0) || '*Field is required'
// }
// export const required_obj = (obj) => {
//   if (obj === null || obj === undefined) return '*Field is required'
//   return (Object.entries(obj).length > 0 && obj.constructor === Object) || '*Field is required'
// }
// export const no_blank_spaces_arr = (arr) => {
//   return arr.every(val => (val.trim() && val.trim().length > 0)) || 'Blank Spaces are not allowed'
// }
// export const url = val => {
//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true
//   // Used
//   // https://stackoverflow.com/questions/4314741/url-regex-validation
//   // Other
//   // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
//   // https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php
//   // https://www.geeksforgeeks.org/how-to-validate-url-using-regular-expression-in-javascript/
//   /* eslint-disable no-useless-escape */
//   const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
//   /* eslint-enable no-useless-escape */
//   return re.test(val) || 'URL is invalid'
// }
// export const date = val => {
//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true
//   // https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns.js
//   return /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(val) || 'Date is invalid'
// }
// export const max = (val, max) => {
//   // If blank return
//   if (val === undefined || val === null) return true
//   return val.length <= max || `More than ${max} characters are not allowed`
// }
// export const max_arr = (val, max) => {
//   return val.length <= max || `More than ${max} values are not allowed`
// }
// export const min = (val, min) => {
//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true
//   return val.length >= min || `Minimum ${min} characters are required`
// }
// export const num_range = (val, min, max) => {
//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true
//   const msg = 'Value is invalid'
//   if (min === null) return val <= max || msg
//   else if (max === null) return val >= min || msg
//   else return (val >= min && val <= max) || msg
// }

/***/ }),

/***/ "./resources/js/src/@core/utils/validations/validators.js":
/*!****************************************************************!*\
  !*** ./resources/js/src/@core/utils/validations/validators.js ***!
  \****************************************************************/
/*! exports provided: validatorPositive, validatorPassword, validatorCreditCard, validatorUrlValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validatorPositive", function() { return validatorPositive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validatorPassword", function() { return validatorPassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validatorCreditCard", function() { return validatorCreditCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validatorUrlValidator", function() { return validatorUrlValidator; });
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.test.js */ "./node_modules/core-js/modules/es.regexp.test.js");
/* harmony import */ var core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_1__);


var validatorPositive = function validatorPositive(value) {
  if (value >= 0) {
    return true;
  }

  return false;
};
var validatorPassword = function validatorPassword(password) {
  /* eslint-disable no-useless-escape */
  var regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
  /* eslint-enable no-useless-escape */

  var validPassword = regExp.test(password);
  return validPassword;
};
var validatorCreditCard = function validatorCreditCard(creditnum) {
  /* eslint-disable no-useless-escape */
  var cRegExp = /^(?:3[47][0-9]{13})$/;
  /* eslint-enable no-useless-escape */

  var validCreditCard = cRegExp.test(creditnum);
  return validCreditCard;
};
var validatorUrlValidator = function validatorUrlValidator(val) {
  if (val === undefined || val === null || val.length === 0) {
    return true;
  }
  /* eslint-disable no-useless-escape */


  var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  /* eslint-enable no-useless-escape */

  return re.test(val);
};

/***/ }),

/***/ "./resources/js/src/composables/customer/claims.js":
/*!*********************************************************!*\
  !*** ./resources/js/src/composables/customer/claims.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useClaims; });
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @axios */ "./resources/js/src/libs/axios.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var ziggy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ziggy-js */ "./node_modules/ziggy-js/dist/index.js");
/* harmony import */ var ziggy_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ziggy_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _toaster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toaster */ "./resources/js/src/composables/customer/toaster.js");






function useClaims() {
  var busy = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(false);
  var respResult = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(null);
  var claims = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])([]);
  var customerSales = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])([]);
  var errors = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])('');
  var salePackage = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])([]);
  var toast = Object(_toaster__WEBPACK_IMPORTED_MODULE_5__["default"])();
  var totalRecords = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(0);

  var fetchClaimsByCustomer = /*#__PURE__*/function () {
    var _ref = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
      var response, total;
      return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('customer.sales.index'));

            case 3:
              response = _context.sent;
              claims.value = response.data.data;
              total = response.data.meta.total;
              totalRecords.value = total;
              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (_context.t0.message === 'Network Error') {
                toast.error(_context.t0.message);
              } else {
                respResult.value = _context.t0;
                toast.error(_context.t0.response.data.message);
              }

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));

    return function fetchClaimsByCustomer() {
      return _ref.apply(this, arguments);
    };
  }();

  var fetchCustomerSales = /*#__PURE__*/function () {
    var _ref2 = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2() {
      var response;
      return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('customer.fetch.sales'));

            case 3:
              response = _context2.sent;
              customerSales.value = response.data;
              _context2.next = 11;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

              if (_context2.t0.message === 'Network Error') {
                toast.error(_context2.t0.message);
              } else {
                respResult.value = _context2.t0;
                toast.error(_context2.t0.response.data.message);
              }

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    return function fetchCustomerSales() {
      return _ref2.apply(this, arguments);
    };
  }();

  var fetchSalePackage = /*#__PURE__*/function () {
    var _ref3 = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee3(saleId) {
      var response;
      return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('customer.sale.package', saleId));

            case 3:
              response = _context3.sent;
              salePackage.value = response.data;
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);

              if (_context3.t0.message === 'Network Error') {
                toast.error(_context3.t0.message);
              } else {
                respResult.value = _context3.t0;
                toast.error(_context3.t0.response.data.message);
              }

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));

    return function fetchSalePackage(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  var saveClaim = /*#__PURE__*/function () {
    var _ref4 = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee4(data) {
      var response;
      return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              errors.value = '';
              _context4.prev = 1;
              busy.value = true;
              _context4.next = 5;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('customer.claims.store'), data);

            case 5:
              response = _context4.sent;
              respResult.value = response;
              toast.success(response.data.message);
              _context4.next = 13;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](1);

              if (_context4.t0.message === 'Network Error') {
                toast.error(_context4.t0.message);
              } else {
                if (_context4.t0.response.status === 422) {
                  errors.value = _context4.t0.response.data.errors;
                }

                respResult.value = _context4.t0;
                toast.error(_context4.t0.response.data.message);
              }

            case 13:
              _context4.prev = 13;
              busy.value = false;
              return _context4.finish(13);

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 10, 13, 16]]);
    }));

    return function saveClaim(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();

  return {
    busy: busy,
    errors: errors,
    claims: claims,
    saveClaim: saveClaim,
    respResult: respResult,
    salePackage: salePackage,
    customerSales: customerSales,
    fetchSalePackage: fetchSalePackage,
    fetchCustomerSales: fetchCustomerSales,
    fetchClaimsByCustomer: fetchClaimsByCustomer
  };
}

/***/ }),

/***/ "./resources/js/src/composables/customer/toaster.js":
/*!**********************************************************!*\
  !*** ./resources/js/src/composables/customer/toaster.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return toaster; });
/* harmony import */ var vue_toastification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/esm/index.js");

function toaster() {
  // const toast = useToast()
  var pluginOptions = {
    timeout: 4000
  }; // Create the interface

  var toast = Object(vue_toastification__WEBPACK_IMPORTED_MODULE_0__["createToastInterface"])(pluginOptions);

  var success = function success(msg) {
    toast.success(msg, {
      timeout: 5000
    });
  };

  var error = function error(msg) {
    toast.error(msg, {
      timeout: 5000
    });
  };

  return {
    success: success,
    error: error
  };
}

/***/ }),

/***/ "./resources/js/src/views/customer/claims/NewClaim.vue":
/*!*************************************************************!*\
  !*** ./resources/js/src/views/customer/claims/NewClaim.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewClaim_vue_vue_type_template_id_a6b27166_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewClaim.vue?vue&type=template&id=a6b27166&scoped=true& */ "./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=template&id=a6b27166&scoped=true&");
/* harmony import */ var _NewClaim_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewClaim.vue?vue&type=script&lang=js& */ "./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _NewClaim_vue_vue_type_style_index_0_id_a6b27166_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NewClaim.vue?vue&type=style&index=0&id=a6b27166&lang=scss&scoped=true& */ "./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=style&index=0&id=a6b27166&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _NewClaim_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewClaim_vue_vue_type_template_id_a6b27166_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewClaim_vue_vue_type_template_id_a6b27166_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "a6b27166",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/customer/claims/NewClaim.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewClaim_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewClaim.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewClaim_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=style&index=0&id=a6b27166&lang=scss&scoped=true&":
/*!***********************************************************************************************************************!*\
  !*** ./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=style&index=0&id=a6b27166&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewClaim_vue_vue_type_style_index_0_id_a6b27166_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewClaim.vue?vue&type=style&index=0&id=a6b27166&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=style&index=0&id=a6b27166&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewClaim_vue_vue_type_style_index_0_id_a6b27166_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewClaim_vue_vue_type_style_index_0_id_a6b27166_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewClaim_vue_vue_type_style_index_0_id_a6b27166_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewClaim_vue_vue_type_style_index_0_id_a6b27166_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=template&id=a6b27166&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=template&id=a6b27166&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewClaim_vue_vue_type_template_id_a6b27166_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewClaim.vue?vue&type=template&id=a6b27166&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/customer/claims/NewClaim.vue?vue&type=template&id=a6b27166&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewClaim_vue_vue_type_template_id_a6b27166_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewClaim_vue_vue_type_template_id_a6b27166_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);