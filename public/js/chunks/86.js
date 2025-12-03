(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[86],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attach.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/tasks/attach.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _composables_tasks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/composables/tasks */ "./resources/js/src/composables/tasks.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/router */ "./resources/js/src/router/index.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @axios */ "./resources/js/src/libs/axios.js");



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    BFormGroup: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BFormGroup"],
    BFormRadio: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BFormRadio"],
    BCard: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BCard"]
  },
  setup: function setup() {
    var checklists = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["ref"])([]);
    var _useTasks = Object(_composables_tasks__WEBPACK_IMPORTED_MODULE_3__["default"])(),
      assign = _useTasks.assign,
      dialog = _useTasks.dialog;
    var getAllChecklist = function getAllChecklist() {
      _axios__WEBPACK_IMPORTED_MODULE_7__["default"].get(route("checklist.index")).then(function (response) {
        if (response.status === 200) {
          checklists.value = response.data;
        }
      });
    };
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["onMounted"])(function () {
      getAllChecklist();
    });
    var selectedChecklist = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["computed"])(function () {
      if (!!checklists.length) return undefined;
      return checklists.value.find(function (checklist) {
        return checklist.name === assign.value.checklist.temp;
      });
    });
    var attach = function attach() {
      assign.value.checklist.data = selectedChecklist.value;
      assign.value.checklist.id = selectedChecklist.value.id;
      dialog.show = true;
      _router__WEBPACK_IMPORTED_MODULE_6__["default"].push({
        name: "tasks"
      });
    };
    return {
      checklists: checklists,
      selectedChecklist: selectedChecklist,
      assign: assign,
      attach: attach
    };
  }
});

/***/ }),

/***/ "./node_modules/core-js/internals/is-regexp.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-regexp.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-to-array.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/object-to-array.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var propertyIsEnumerable = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js").f;

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js/internals/string-trim-forced.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/string-trim-forced.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js/internals/whitespaces.js");

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.join.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.join.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.entries.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.entries.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $entries = __webpack_require__(/*! ../internals/object-to-array */ "./node_modules/core-js/internals/object-to-array.js").entries;

// `Object.entries` method
// https://tc39.github.io/ecma262/#sec-object.entries
$({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.trim.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.trim.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $trim = __webpack_require__(/*! ../internals/string-trim */ "./node_modules/core-js/internals/string-trim.js").trim;
var forcedStringTrimMethod = __webpack_require__(/*! ../internals/string-trim-forced */ "./node_modules/core-js/internals/string-trim-forced.js");

// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attach.vue?vue&type=style&index=0&id=21e30a20&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/tasks/attach.vue?vue&type=style&index=0&id=21e30a20&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".attach-checklist {\n  display: flex;\n  gap: 20px;\n}\n[dir] .attach-checklist .attach-card {\n  margin: 0px;\n  border-radius: 0px;\n}\n.attach-checklist .radios-container {\n  min-width: 350px;\n}\n[dir] .attach-checklist .form-group {\n  margin: 0 !important;\n}\n.attach-checklist .custom-checkbox .custom-control-label,\n.custom-radio .custom-control-label {\n  font-size: 16px !important;\n  font-weight: 600;\n}\n.attach-checklist {\n  /* Style the menu */\n}\n[dir] .attach-checklist .task-card {\n  cursor: pointer;\n}\n.attach-checklist .sub-heading {\n  height: 40px;\n  font-size: x-large;\n}\n[dir] .attach-checklist .sub-heading {\n  border: none;\n  border-bottom: 1px solid gray;\n  background: transparent;\n  margin-top: 5px;\n}\n.attach-checklist .sub-heading:focus-visible {\n  outline: none;\n}\n[dir] .attach-checklist .sub-heading:focus-visible {\n  border: none;\n  border-bottom: 1px solid #0096fd;\n}\n[dir=ltr] .attach-checklist .add-attachment {\n  margin-left: 4px;\n}\n[dir=rtl] .attach-checklist .add-attachment {\n  margin-right: 4px;\n}\n.attach-checklist .attachment-label {\n  font-size: medium;\n}\n[dir] .attach-checklist .attachment-label {\n  cursor: not-allowed !important;\n  margin-top: 5px;\n}\n.attach-checklist .attachment {\n  height: 15px;\n  fill: gray;\n}\n.attach-checklist .name-label {\n  font-weight: bolder;\n  font-size: x-large;\n}\n.attach-checklist .name-input {\n  height: 60px;\n  font-size: xx-large;\n  font-weight: bolder;\n}\n[dir] .attach-checklist .name-input {\n  background: transparent;\n  border: 1px solid gainsboro;\n}\n.attach-checklist .enter-name {\n  width: 80%;\n}\n[dir=ltr] .attach-checklist .add-header {\n  margin-left: 0px;\n}\n[dir=rtl] .attach-checklist .add-header {\n  margin-right: 0px;\n}\n.attach-checklist .svg-icon {\n  fill: white;\n  max-width: 60px;\n  min-width: 50px;\n}\n[dir] .attach-checklist .svg-icon {\n  background: #0096fd;\n  padding: 10px;\n  border-radius: 5px;\n}\n.attach-checklist .task-icon {\n  color: white;\n  max-width: 60px;\n  min-width: 50px;\n  font-size: x-large;\n}\n[dir] .attach-checklist .task-icon {\n  padding: 20px;\n  border-radius: 5px;\n}\n.attach-checklist .steps-div {\n  min-height: 120px;\n}\n[dir] .attach-checklist .steps-div {\n  padding-top: 20px;\n}\n.attach-checklist .discription-input {\n  width: 75%;\n  height: 40px;\n}\n[dir] .attach-checklist .discription-input {\n  border-radius: 5px;\n}\n.attach-checklist .step-select {\n  width: 15%;\n  height: 40px;\n}\n[dir] .attach-checklist .step-select {\n  border-radius: 5px;\n}\n[dir] .attach-checklist .custom-switch {\n  margin-top: 12px;\n  cursor: not-allowed !important;\n}\n[dir=ltr] .attach-checklist .custom-switch {\n  margin-left: 18px;\n}\n[dir=rtl] .attach-checklist .custom-switch {\n  margin-right: 18px;\n}\n.attach-checklist .task-icon {\n  font-size: x-large;\n}\n[dir] .attach-checklist .temp {\n  border: 1px solid;\n  padding: 3px;\n  cursor: pointer;\n}\n[dir=ltr] .attach-checklist .temp {\n  margin-left: 10px;\n}\n[dir=rtl] .attach-checklist .temp {\n  margin-right: 10px;\n}\n.attach-checklist .temp-button {\n  color: black;\n}\n[dir] .attach-checklist .temp-button {\n  background-color: transparent;\n  cursor: not-allowed !important;\n}\n[dir] .attach-checklist input[type=radio].btn-check:checked + label.btn.temp-button {\n  background-color: #eff2ff;\n}\n.attach-checklist .section-btn {\n  color: #0096fd !important;\n}\n[dir] .attach-checklist .section-btn {\n  background-color: transparent !important;\n  border: 1px solid #0096fd !important;\n}\n[dir] .attach-checklist .drag-handle {\n  cursor: grabbing;\n}\n.attach-checklist .uploaded-image {\n  height: 300px;\n  width: 300px;\n}\n[dir] .attach-checklist .uploaded-image {\n  border-radius: 5px;\n  border: 1px solid #f4f4f4;\n}\n.attach-checklist .dlt-img {\n  top: 5px;\n  color: white;\n  font-weight: 900;\n  color: red;\n}\n[dir] .attach-checklist .dlt-img {\n  cursor: pointer;\n}\n[dir=ltr] .attach-checklist .dlt-img {\n  right: 5px;\n}\n[dir=rtl] .attach-checklist .dlt-img {\n  left: 5px;\n}\n.attach-checklist .dlt-img:hover {\n  font-size: larger;\n  color: red;\n}\n.attach-checklist .name-input::placeholder {\n  font-weight: 400;\n  opacity: 0.5;\n}\n.attach-checklist .menu {\n  position: absolute;\n  top: 260px;\n  z-index: 999;\n  max-width: 600px;\n}\n[dir] .attach-checklist .menu {\n  background-color: white;\n  border: 1px solid #ccc;\n  padding: 10px;\n  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;\n  border-radius: 5px;\n}\n[dir=ltr] .attach-checklist .menu {\n  left: 130px;\n}\n[dir=rtl] .attach-checklist .menu {\n  right: 130px;\n}\n.attach-checklist .menu ul {\n  list-style-type: none;\n}\n[dir] .attach-checklist .menu ul {\n  padding: 0;\n  margin: 0;\n}\n[dir] .attach-checklist .menu li {\n  padding: 5px 0;\n  cursor: pointer;\n}\n[dir] .attach-checklist .menu li:hover {\n  background-color: #f0f0f0;\n}\n.attach-checklist .bi-pencil {\n  bottom: 0;\n  height: 30px;\n  width: 30px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n[dir] .attach-checklist .bi-pencil {\n  background: white;\n  border: 1px solid gray;\n  padding: px;\n  border-radius: 10px;\n}\n[dir=ltr] .attach-checklist .bi-pencil {\n  right: -5px;\n}\n[dir=rtl] .attach-checklist .bi-pencil {\n  left: -5px;\n}\n.attach-checklist .title-icon {\n  height: 100% !important;\n  width: 100% !important;\n  max-width: 100%;\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 40px;\n  color: white;\n}\n[dir] .attach-checklist .title-icon {\n  text-align: center;\n}\n.attach-checklist .alphabet-grid {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n}\n.attach-checklist .alphabet-grid .item {\n  width: calc(16.666% - 20px);\n}\n[dir] .attach-checklist .alphabet-grid .item {\n  margin-bottom: 20px;\n  text-align: center;\n  padding: 2px;\n  border-radius: 5px;\n}\n.attach-checklist .alphabet-grid .item:hover {\n  color: brown;\n}\n.attach-checklist .circle {\n  height: 30px;\n  width: 30px;\n}\n[dir] .attach-checklist .circle {\n  border-radius: 20px;\n}\n@media (max-width: 617px) {\n.attach-checklist .add-header {\n    flex-direction: column;\n    justify-content: start;\n    align-items: start !important;\n}\n[dir=ltr] .attach-checklist .enter-name {\n    margin-left: 0px !important;\n}\n[dir=rtl] .attach-checklist .enter-name {\n    margin-right: 0px !important;\n}\n.attach-checklist .menu {\n    max-width: 300px;\n    top: 220px;\n}\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attach.vue?vue&type=style&index=0&id=21e30a20&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/tasks/attach.vue?vue&type=style&index=0&id=21e30a20&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./attach.vue?vue&type=style&index=0&id=21e30a20&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attach.vue?vue&type=style&index=0&id=21e30a20&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attach.vue?vue&type=template&id=21e30a20&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/tasks/attach.vue?vue&type=template&id=21e30a20& ***!
  \**************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "attach-checklist" }, [
    _c(
      "div",
      { staticClass: "radios-container" },
      [
        _vm._l(_vm.checklists, function (checklist, index) {
          return _c("b-form-group", {
            key: index,
            scopedSlots: _vm._u(
              [
                {
                  key: "default",
                  fn: function (ref) {
                    var ariaDescribedby = ref.ariaDescribedby
                    return [
                      _c(
                        "b-card",
                        {
                          staticClass: "attach-card p-1 text-capitalize",
                          staticStyle: { "max-width": "350px" },
                        },
                        [
                          _c(
                            "b-form-radio",
                            {
                              attrs: {
                                "aria-describedby": ariaDescribedby,
                                name: "checklist-radios",
                                value: checklist.name,
                              },
                              model: {
                                value: _vm.assign.checklist.temp,
                                callback: function ($$v) {
                                  _vm.$set(_vm.assign.checklist, "temp", $$v)
                                },
                                expression: "assign.checklist.temp",
                              },
                            },
                            [_vm._v(_vm._s(checklist.name))]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "d-flex justify-content-between mt-1 align-items-center",
                              staticStyle: { "margin-left": "26px" },
                            },
                            [
                              _c("p", [
                                _c("strong", [
                                  _vm._v(_vm._s(checklist.sections.length)),
                                ]),
                                _vm._v(
                                  "\n                        Items\n                    "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("p", [
                                _c("strong", [_vm._v("0")]),
                                _vm._v(" Attachments"),
                              ]),
                            ]
                          ),
                        ],
                        1
                      ),
                    ]
                  },
                },
              ],
              null,
              true
            ),
          })
        }),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass:
              "btn btn-primary d-flex justify-content-center align-items-center mt-4 w-100",
            staticStyle: { "font-size": "18px" },
            attrs: { disabled: !_vm.assign.checklist.temp },
            on: { click: _vm.attach },
          },
          [
            _c("i", { staticClass: "bi bi-paperclip" }),
            _vm._v("\n            Attach\n        "),
          ]
        ),
      ],
      2
    ),
    _vm._v(" "),
    _vm.selectedChecklist
      ? _c(
          "div",
          { staticClass: "w-100 py-2" },
          [
            _c("b-card", { staticClass: "row align-items-start add-header" }, [
              _c(
                "div",
                {
                  staticClass: "d-flex flex-column enter-name text-capitalize",
                },
                [
                  _c("h3", [_vm._v(_vm._s(_vm.selectedChecklist.name))]),
                  _vm._v(" "),
                  _c("div", [
                    _c("p", [
                      _vm._v(
                        "Created by : " +
                          _vm._s(_vm.selectedChecklist.user_name)
                      ),
                    ]),
                  ]),
                ]
              ),
              _vm._v(" "),
              _vm.selectedChecklist.title_img
                ? _c(
                    "div",
                    {
                      staticClass: "position-relative mt-1",
                      staticStyle: { "max-width": "300px" },
                    },
                    [
                      _c("img", {
                        staticClass: "uploaded-image",
                        attrs: { src: _vm.selectedChecklist.title_img },
                      }),
                      _vm._v(" "),
                      _c("i", {
                        staticClass: "bi bi-x-lg position-absolute dlt-img",
                        on: {
                          click: function ($event) {
                            _vm.selectedChecklist.title_img = ""
                          },
                        },
                      }),
                    ]
                  )
                : _vm._e(),
            ]),
            _vm._v(" "),
            _vm._l(_vm.selectedChecklist.sections, function (section, index) {
              return _c(
                "b-card",
                { key: index },
                [
                  _c(
                    "h2",
                    {
                      staticStyle: {
                        "font-size": "28px",
                        "font-weight": "600",
                      },
                    },
                    [
                      _vm._v(
                        "\n                " +
                          _vm._s(section.name) +
                          "\n            "
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _vm._l(section.tasks, function (task, taskIndex) {
                    return _c(
                      "div",
                      {
                        key: taskIndex,
                        staticClass: "w-100 card steps mt-1 d-flex steps-div",
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "d-flex align-items-center pb-2" },
                          [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: task.name,
                                  expression: "task.name",
                                },
                              ],
                              staticClass: "discription-input ml-1",
                              attrs: {
                                placeholder: "Enter discription  ",
                                required: "",
                              },
                              domProps: { value: task.name },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(task, "name", $event.target.value)
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: task.type,
                                    expression: "task.type",
                                  },
                                ],
                                staticClass: "step-select ml-1",
                                on: {
                                  change: function ($event) {
                                    var $$selectedVal = Array.prototype.filter
                                      .call(
                                        $event.target.options,
                                        function (o) {
                                          return o.selected
                                        }
                                      )
                                      .map(function (o) {
                                        var val =
                                          "_value" in o ? o._value : o.value
                                        return val
                                      })
                                    _vm.$set(
                                      task,
                                      "type",
                                      $event.target.multiple
                                        ? $$selectedVal
                                        : $$selectedVal[0]
                                    )
                                  },
                                },
                              },
                              [
                                _c(
                                  "option",
                                  { domProps: { value: task.type } },
                                  [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(task.type) +
                                        "\n                        "
                                    ),
                                  ]
                                ),
                              ]
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        task.type === "Temperature"
                          ? _c("div", { staticClass: "d-flex" }, [
                              _c(
                                "label",
                                {
                                  staticClass: "btn temp-button",
                                  staticStyle: { color: "#7367f0" },
                                  style:
                                    task.param === "F"
                                      ? "background-color: #eff2ff;"
                                      : "",
                                },
                                [
                                  _vm._v(
                                    "°F (Fehrenheit)\n                    "
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "label",
                                {
                                  staticClass: "btn temp-button text-danger",
                                  style:
                                    task.param === "C"
                                      ? "background-color: #eff2ff;"
                                      : "",
                                },
                                [_vm._v("°C\n                    ")]
                              ),
                              _vm._v(" "),
                              _c(
                                "label",
                                {
                                  staticClass: "btn temp-button text-primary",
                                  style:
                                    task.param === "K"
                                      ? "background-color: #eff2ff;"
                                      : "",
                                },
                                [_vm._v("K\n                    ")]
                              ),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        task.type === "Cost"
                          ? _c("div", { staticClass: "d-flex" }, [
                              _c(
                                "label",
                                {
                                  staticClass: "btn temp-button",
                                  staticStyle: { color: "#7367f0" },
                                  style:
                                    task.param === "$"
                                      ? "background-color: #eff2ff;"
                                      : "",
                                },
                                [_vm._v("$ USD\n                    ")]
                              ),
                              _vm._v(" "),
                              _c(
                                "label",
                                {
                                  staticClass: "btn temp-button text-danger",
                                  style:
                                    task.param === "€"
                                      ? "background-color: #eff2ff!important;"
                                      : "",
                                },
                                [_vm._v("€ EURO\n                    ")]
                              ),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "d-flex align-items-center" },
                          [
                            _c(
                              "div",
                              { staticClass: "custom-control custom-switch" },
                              [
                                _c(
                                  "label",
                                  {
                                    staticClass:
                                      "custom-control-label attachment-label",
                                    attrs: {
                                      for: "task_" + index + "_" + taskIndex,
                                    },
                                  },
                                  [_vm._v("Required image")]
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            !task.img
                              ? _c(
                                  "label",
                                  { staticClass: "attachment-label ml-1" },
                                  [
                                    _c(
                                      "svg",
                                      {
                                        staticClass: "attachment",
                                        attrs: {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          viewBox: "0 0 448 512",
                                        },
                                      },
                                      [
                                        _c("path", {
                                          attrs: {
                                            d: "M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z",
                                          },
                                        }),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "add-attachment" },
                                      [_vm._v("Add Attachement ")]
                                    ),
                                  ]
                                )
                              : _vm._e(),
                          ]
                        ),
                        _vm._v(" "),
                        task.img
                          ? _c(
                              "div",
                              {
                                staticClass: "position-relative my-1",
                                staticStyle: {
                                  "margin-left": "20px",
                                  "max-width": "300px",
                                },
                              },
                              [
                                _c("img", {
                                  staticClass: "uploaded-image",
                                  attrs: { src: task.img },
                                }),
                                _vm._v(" "),
                                _c("i", {
                                  staticClass:
                                    "bi bi-x-lg position-absolute dlt-img",
                                  on: {
                                    click: function ($event) {
                                      task.img = ""
                                    },
                                  },
                                }),
                              ]
                            )
                          : _vm._e(),
                      ]
                    )
                  }),
                ],
                2
              )
            }),
          ],
          2
        )
      : _vm._e(),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/tasks/attach.vue":
/*!*************************************************!*\
  !*** ./resources/js/src/views/tasks/attach.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _attach_vue_vue_type_template_id_21e30a20___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attach.vue?vue&type=template&id=21e30a20& */ "./resources/js/src/views/tasks/attach.vue?vue&type=template&id=21e30a20&");
/* harmony import */ var _attach_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attach.vue?vue&type=script&lang=js& */ "./resources/js/src/views/tasks/attach.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _attach_vue_vue_type_style_index_0_id_21e30a20_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attach.vue?vue&type=style&index=0&id=21e30a20&lang=scss& */ "./resources/js/src/views/tasks/attach.vue?vue&type=style&index=0&id=21e30a20&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _attach_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _attach_vue_vue_type_template_id_21e30a20___WEBPACK_IMPORTED_MODULE_0__["render"],
  _attach_vue_vue_type_template_id_21e30a20___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/tasks/attach.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/tasks/attach.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/src/views/tasks/attach.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_attach_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./attach.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attach.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_attach_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/tasks/attach.vue?vue&type=style&index=0&id=21e30a20&lang=scss&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/views/tasks/attach.vue?vue&type=style&index=0&id=21e30a20&lang=scss& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_attach_vue_vue_type_style_index_0_id_21e30a20_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./attach.vue?vue&type=style&index=0&id=21e30a20&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attach.vue?vue&type=style&index=0&id=21e30a20&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_attach_vue_vue_type_style_index_0_id_21e30a20_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_attach_vue_vue_type_style_index_0_id_21e30a20_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_attach_vue_vue_type_style_index_0_id_21e30a20_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_attach_vue_vue_type_style_index_0_id_21e30a20_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/tasks/attach.vue?vue&type=template&id=21e30a20&":
/*!********************************************************************************!*\
  !*** ./resources/js/src/views/tasks/attach.vue?vue&type=template&id=21e30a20& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_attach_vue_vue_type_template_id_21e30a20___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./attach.vue?vue&type=template&id=21e30a20& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attach.vue?vue&type=template&id=21e30a20&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_attach_vue_vue_type_template_id_21e30a20___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_attach_vue_vue_type_template_id_21e30a20___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);