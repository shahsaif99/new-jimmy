(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[112],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Add.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/procedures/Add.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_pad_start_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.pad-start.js */ "./node_modules/core-js/modules/es.string.pad-start.js");
/* harmony import */ var core_js_modules_es_string_pad_start_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_pad_start_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @validations */ "./resources/js/src/@core/utils/validations/validations.js");
/* harmony import */ var _core_comp_functions_forms_form_validation__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @core/comp-functions/forms/form-validation */ "./resources/js/src/@core/comp-functions/forms/form-validation.js");
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var _ckeditor_ckeditor5_vue2__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ckeditor/ckeditor5-vue2 */ "./node_modules/@ckeditor/ckeditor5-vue2/dist/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_vue2__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_vue2__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ckeditor/ckeditor5-build-classic */ "./node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _composables_documents__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @/composables/documents */ "./resources/js/src/composables/documents.js");
/* harmony import */ var _composables_category__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @/composables/category */ "./resources/js/src/composables/category.js");
/* harmony import */ var _composables_tags__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @/composables/tags */ "./resources/js/src/composables/tags.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_20__);










//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    ckeditor: _ckeditor_ckeditor5_vue2__WEBPACK_IMPORTED_MODULE_15___default.a.component,
    BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_10__["BCol"],
    BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_10__["BRow"],
    BForm: bootstrap_vue__WEBPACK_IMPORTED_MODULE_10__["BForm"],
    BButton: bootstrap_vue__WEBPACK_IMPORTED_MODULE_10__["BButton"],
    BFormGroup: bootstrap_vue__WEBPACK_IMPORTED_MODULE_10__["BFormGroup"],
    BFormInput: bootstrap_vue__WEBPACK_IMPORTED_MODULE_10__["BFormInput"],
    BFormSelect: bootstrap_vue__WEBPACK_IMPORTED_MODULE_10__["BFormSelect"],
    ValidationObserver: vee_validate__WEBPACK_IMPORTED_MODULE_14__["ValidationObserver"],
    ValidationProvider: vee_validate__WEBPACK_IMPORTED_MODULE_14__["ValidationProvider"],
    BFormInvalidFeedback: bootstrap_vue__WEBPACK_IMPORTED_MODULE_10__["BFormInvalidFeedback"],
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_20___default.a
  },
  model: {
    prop: 'addDocumentActive',
    event: 'update:add-document-active'
  },
  props: {
    addDocumentActive: {
      type: Boolean,
      required: true
    }
  },
  setup: function setup(_, _ref) {
    var emit = _ref.emit;
    var _formValidation = Object(_core_comp_functions_forms_form_validation__WEBPACK_IMPORTED_MODULE_13__["default"])(),
      refFormObserver = _formValidation.refFormObserver,
      getValidationState = _formValidation.getValidationState,
      resetForm = _formValidation.resetForm;
    var _useCategories = Object(_composables_category__WEBPACK_IMPORTED_MODULE_18__["default"])(),
      fetchCategories = _useCategories.fetchCategories,
      categories = _useCategories.categories,
      fetchSubCategories = _useCategories.fetchSubCategories,
      subcategories = _useCategories.subcategories;
    var initialState = {
      title: '',
      category_id: '',
      subcategory_id: '',
      created_date: '',
      document_number: '',
      revised_date: '',
      revision_number: '',
      author: '',
      approved_by: '',
      type: '',
      content: '',
      tag_ids: [],
      status: ''
    };
    var rteref = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_11__["ref"])(null);
    var rte = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_11__["ref"])(null);
    var formData = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_11__["ref"])(Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__["default"])({}, initialState));
    var _useDocuments = Object(_composables_documents__WEBPACK_IMPORTED_MODULE_17__["default"])(),
      storeDocument = _useDocuments.storeDocument,
      respResult = _useDocuments.respResult;
    var _useTags = Object(_composables_tags__WEBPACK_IMPORTED_MODULE_19__["default"])(),
      tags = _useTags.tags;
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_11__["onMounted"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
      var editor1cfg;
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetchCategories();
            case 2:
              if (rteref.value) {
                editor1cfg = {};
                editor1cfg.toolbar = "mytoolbar";
                editor1cfg.toolbar_mytoolbar = "{bold,italic}|{fontname,fontsize}|{forecolor,backcolor}" + " #{paragraphs:toggle,fontname:toggle,inlinestyle,lineheight}" + "/{insertlink,unlink,insertblockquote,insertemoji,insertchars,inserttable,insertimage,insertvideo,insertdocument}" + "#{undo,redo,fullscreenenter,fullscreenexit,togglemore }";
                rte.value = new RichTextEditor(rteref.value, editor1cfg);
              }
            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    var showSubCategories = function showSubCategories(id) {
      fetchSubCategories(id);
      // formData.value.category_id = categories.value.find(item => item.id === id)
    };

    var contentUpdate = function contentUpdate(data) {
      formData.value.content = data;
    };
    var onSubmit = /*#__PURE__*/function () {
      var _ref3 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2() {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                formData.value.content = formData.value.content;
                _context2.next = 3;
                return storeDocument(formData.value);
              case 3:
                if (respResult.value.status === 200) {
                  emit('refetch-data');
                  emit('update:add-document-active', false);
                }
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return function onSubmit() {
        return _ref3.apply(this, arguments);
      };
    }();
    var editorConfig = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_11__["ref"])({
      removePlugins: ['ImageUpload', 'EasyImage']
    });
    var digits = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_11__["ref"])([0, 0, 0]);
    var increaseRevision = function increaseRevision(index) {
      if (digits.value[index] < 9) {
        digits.value.splice(index, 1, digits.value[index] + 1);
      }
    };
    var decreaseRevision = function decreaseRevision(index) {
      if (digits.value[index] > 0) {
        digits.value.splice(index, 1, digits.value[index] - 1);
      }
    };
    var revision_number = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_11__["computed"])(function () {
      return Number(digits.value.join(''));
    });
    var setRevisionNumber = function setRevisionNumber(value) {
      var strValue = value.toString().padStart(3, '0');
      digits.value = strValue.split('').map(Number);
    };
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_11__["watch"])(revision_number, function () {
      formData.value.revision_number = revision_number.value;
    });
    return {
      formData: formData,
      required: _validations__WEBPACK_IMPORTED_MODULE_12__["required"],
      onSubmit: onSubmit,
      categories: categories,
      resetForm: resetForm,
      showSubCategories: showSubCategories,
      subcategories: subcategories,
      editorConfig: editorConfig,
      contentUpdate: contentUpdate,
      ClassicEditor: _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_16___default.a,
      refFormObserver: refFormObserver,
      getValidationState: getValidationState,
      tags: tags,
      digits: digits,
      increaseRevision: increaseRevision,
      decreaseRevision: decreaseRevision,
      setRevisionNumber: setRevisionNumber,
      rteref: rteref
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/procedures/Index.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js */ "./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_from_entries_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.from-entries.js */ "./node_modules/core-js/modules/es.object.from-entries.js");
/* harmony import */ var core_js_modules_es_object_from_entries_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_from_entries_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_entries_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.entries.js */ "./node_modules/core-js/modules/es.object.entries.js");
/* harmony import */ var core_js_modules_es_object_entries_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_entries_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_string_pad_start_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.string.pad-start.js */ "./node_modules/core-js/modules/es.string.pad-start.js");
/* harmony import */ var core_js_modules_es_string_pad_start_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_pad_start_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ "./node_modules/core-js/modules/es.array.find-index.js");
/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_object_values_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.object.values.js */ "./node_modules/core-js/modules/es.object.values.js");
/* harmony import */ var core_js_modules_es_object_values_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_values_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_array_flat_map_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.array.flat-map.js */ "./node_modules/core-js/modules/es.array.flat-map.js");
/* harmony import */ var core_js_modules_es_array_flat_map_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_flat_map_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_array_unscopables_flat_map_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.array.unscopables.flat-map.js */ "./node_modules/core-js/modules/es.array.unscopables.flat-map.js");
/* harmony import */ var core_js_modules_es_array_unscopables_flat_map_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_unscopables_flat_map_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ "./node_modules/core-js/modules/es.regexp.constructor.js");
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_regexp_sticky_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/es.regexp.sticky.js */ "./node_modules/core-js/modules/es.regexp.sticky.js");
/* harmony import */ var core_js_modules_es_regexp_sticky_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_sticky_js__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! split.js */ "./node_modules/split.js/dist/split.es.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var _auth_jwt_useJwt__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @/auth/jwt/useJwt */ "./resources/js/src/auth/jwt/useJwt.js");
/* harmony import */ var _ckeditor_ckeditor5_vue2__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @ckeditor/ckeditor5-vue2 */ "./node_modules/@ckeditor/ckeditor5-vue2/dist/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_vue2__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_vue2__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @ckeditor/ckeditor5-build-classic */ "./node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var _composables_documents__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @/composables/documents */ "./resources/js/src/composables/documents.js");
/* harmony import */ var vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! vue-perfect-scrollbar */ "./node_modules/vue-perfect-scrollbar/dist/index.js");
/* harmony import */ var vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @validations */ "./resources/js/src/@core/utils/validations/validations.js");
/* harmony import */ var _core_comp_functions_forms_form_validation__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @core/comp-functions/forms/form-validation */ "./resources/js/src/@core/comp-functions/forms/form-validation.js");
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var html2pdf_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! html2pdf.js */ "./node_modules/html2pdf.js/dist/html2pdf.js");
/* harmony import */ var html2pdf_js__WEBPACK_IMPORTED_MODULE_40___default = /*#__PURE__*/__webpack_require__.n(html2pdf_js__WEBPACK_IMPORTED_MODULE_40__);
/* harmony import */ var _libs_i18n__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @/libs/i18n */ "./resources/js/src/libs/i18n/index.js");
/* harmony import */ var _Add_vue__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./Add.vue */ "./resources/js/src/views/procedures/Add.vue");
/* harmony import */ var _category_add_AddCategory_vue__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ../category/add/AddCategory.vue */ "./resources/js/src/views/category/add/AddCategory.vue");
/* harmony import */ var _views_procedures_dialogs_ManageTags_vue__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @/views/procedures/dialogs/ManageTags.vue */ "./resources/js/src/views/procedures/dialogs/ManageTags.vue");
/* harmony import */ var _composables_category__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! @/composables/category */ "./resources/js/src/composables/category.js");
/* harmony import */ var _composables_tags__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @/composables/tags */ "./resources/js/src/composables/tags.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_47___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_47__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_48___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_48__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! @/router */ "./resources/js/src/router/index.js");





























//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




// eslint-disable-next-line import/no-cycle



// eslint-disable-next-line import/no-cycle















/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    // Export,
    BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BRow"],
    BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BCol"],
    BCard: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BCard"],
    BForm: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BForm"],
    BButton: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BButton"],
    BCollapse: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BCollapse"],
    BFormSelect: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BFormSelect"],
    BFormInput: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BFormInput"],
    BFormGroup: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BFormGroup"],
    addProcedure: _Add_vue__WEBPACK_IMPORTED_MODULE_42__["default"],
    BFormRadio: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BFormRadio"],
    AddCategory: _category_add_AddCategory_vue__WEBPACK_IMPORTED_MODULE_43__["default"],
    BFormRadioGroup: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BFormRadioGroup"],
    VuePerfectScrollbar: vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_36___default.a,
    ValidationObserver: vee_validate__WEBPACK_IMPORTED_MODULE_39__["ValidationObserver"],
    ValidationProvider: vee_validate__WEBPACK_IMPORTED_MODULE_39__["ValidationProvider"],
    BFormInvalidFeedback: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BFormInvalidFeedback"],
    ckeditor: _ckeditor_ckeditor5_vue2__WEBPACK_IMPORTED_MODULE_33___default.a.component,
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_47___default.a,
    BDropdown: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BDropdown"],
    BDropdownItem: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BDropdownItem"],
    BOverlay: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BOverlay"],
    BBadge: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BBadge"],
    ManageDialog: _views_procedures_dialogs_ManageTags_vue__WEBPACK_IMPORTED_MODULE_44__["default"],
    BTooltip: bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["BTooltip"]
  },
  directives: {
    'b-toggle': bootstrap_vue__WEBPACK_IMPORTED_MODULE_29__["VBToggle"]
  },
  setup: function setup(_, context) {
    var isExportActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])(false);
    var addDocumentActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])(false);
    var isAddCategoryActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])(false);
    var searchSelectRef = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])(null);
    var _formValidation = Object(_core_comp_functions_forms_form_validation__WEBPACK_IMPORTED_MODULE_38__["default"])(),
      refFormObserver = _formValidation.refFormObserver,
      getValidationState = _formValidation.getValidationState;
    var perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
      wheelSpeed: 0.3
    };
    var _useDocuments = Object(_composables_documents__WEBPACK_IMPORTED_MODULE_35__["default"])(),
      getDocuments = _useDocuments.getDocuments,
      documentsData = _useDocuments.documentsData,
      updateDocument = _useDocuments.updateDocument,
      filters = _useDocuments.filters,
      deleteDocument = _useDocuments.deleteDocument,
      searchDocumentOptions = _useDocuments.searchDocumentOptions,
      searchDocuments = _useDocuments.searchDocuments,
      generatePDF = _useDocuments.generatePDF,
      filterDocuments = _useDocuments.filterDocuments;
    var _useCategories = Object(_composables_category__WEBPACK_IMPORTED_MODULE_45__["default"])(),
      fetchCategories = _useCategories.fetchCategories,
      categories = _useCategories.categories,
      fetchSubCategories = _useCategories.fetchSubCategories,
      subcategories = _useCategories.subcategories;
    var _useTags = Object(_composables_tags__WEBPACK_IMPORTED_MODULE_46__["default"])(),
      tagDialog = _useTags.tagDialog,
      getTags = _useTags.getTags,
      tags = _useTags.tags;
    var initialState = {
      title: '',
      category: '',
      subcategory: '',
      created_date: '',
      document_number: '',
      revised_date: '',
      revision_number: '',
      author: '',
      approved_by: '',
      approved_date: '',
      type: '',
      content: '',
      status: ''
    };
    var digits = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])([0, 0, 0]);
    var increaseRevision = function increaseRevision(index) {
      if (digits.value[index] < 9) {
        digits.value.splice(index, 1, digits.value[index] + 1);
      }
    };
    var decreaseRevision = function decreaseRevision(index) {
      if (digits.value[index] > 0) {
        digits.value.splice(index, 1, digits.value[index] - 1);
      }
    };
    var revision_number = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["computed"])(function () {
      return Number(digits.value.join(''));
    });
    var processedDocumentsData = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["computed"])(function () {
      if (documentsData.value.length === 0 || documentsData.value.length === undefined) return [];
      return documentsData.value.filter(function (category) {
        if (category.title !== "0-Unknown") {
          category.documents = Object.fromEntries(Object.entries(category.documents).filter(function (_ref) {
            var _ref2 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];
            return key !== "0-Unknown";
          }));
          return true;
        }
        return false;
      });
    });
    var setRevisionNumber = function setRevisionNumber(value) {
      if (value === null) return;
      var strValue = value.toString().padStart(3, '0');
      digits.value = strValue.split('').map(Number);
    };
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["watch"])(revision_number, function () {
      documentData.value.revision_number = revision_number.value;
    });
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["watch"])(function () {
      return filters;
    }, function (newVal) {
      filterDocuments();
    }, {
      deep: true
    });
    var documentData = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])(Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])({}, initialState));
    var isDocumentOpen = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])(false);
    var isDocumentEdit = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])(false);
    var editDocument = function editDocument() {
      isDocumentOpen.value = false;
      isDocumentEdit.value = true;
      setTimeout(function () {
        if (rteref.value) {
          rte.value = new RichTextEditor(rteref.value, editor1cfg);
        }
      }, 50);
    };
    var cancelEditDocument = function cancelEditDocument() {
      isDocumentOpen.value = true;
      isDocumentEdit.value = false;
      var editorRef = document.querySelector(".richtexteditor");
      if (editorRef) {
        editorRef.remove();
      }
    };
    var editorContent = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])('');
    var searchQuery = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])('');
    var rteref = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])(null);
    var rte = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])(null);
    var editor1cfg = {};
    editor1cfg.toolbar = "mytoolbar";
    editor1cfg.toolbar_mytoolbar = "{bold,italic}|{fontname,fontsize}|{forecolor,backcolor}" + " #{paragraphs:toggle,fontname:toggle,inlinestyle,lineheight}" + "/{insertlink,unlink,insertblockquote,insertemoji,insertchars,inserttable,insertimage,insertvideo,insertdocument}" + "#{undo,redo,fullscreenenter,fullscreenexit,togglemore }";
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["onMounted"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
      var findDocumentById, doc;
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getDocuments();
            case 2:
              getTags();
              Object(split_js__WEBPACK_IMPORTED_MODULE_30__["default"])(['#split-0', '#split-1', '#split-2'], {
                gutterSize: 7,
                minSize: 400
              });
              if (_router__WEBPACK_IMPORTED_MODULE_49__["default"].history.current.query.id) {
                findDocumentById = function findDocumentById(data, id) {
                  var _iterator = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(data),
                    _step;
                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      var item = _step.value;
                      // Check if the item contains 'documents' as an object with keys
                      if (item.documents) {
                        for (var key in item.documents) {
                          var documentGroup = item.documents[key];

                          // If 'documents' is an array, search recursively
                          if (Array.isArray(documentGroup.documents)) {
                            var result = findDocumentById(documentGroup.documents, id);
                            if (result) {
                              return result;
                            }
                          }
                        }
                      }
                    }

                    // If the item itself has an 'id' that matches, return it
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                  var _iterator2 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(data),
                    _step2;
                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      var _doc = _step2.value;
                      if (_doc.id === id) {
                        return _doc;
                      }
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }
                  return null; // Return null if no match is found
                };
                doc = findDocumentById(documentsData.value, Number(_router__WEBPACK_IMPORTED_MODULE_49__["default"].history.current.query.id));
                if (doc) {
                  getDocument(doc, doc.docId);
                }
              }
            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    var search = function search() {
      filters.q = searchQuery.value;
      getDocuments();
    };
    var docNumber = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])('');
    var getDocument = function getDocument(data, docId) {
      var clearQuery = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (clearQuery) searchQuery.value = '';
      var editorRef = document.querySelector(".richtexteditor");
      if (editorRef) {
        editorRef.remove();
      }
      fetchCategories();
      fetchSubCategories(data.category_id);
      docNumber.value = docId;
      isDocumentOpen.value = true;
      isDocumentEdit.value = false;
      documentData.value = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])({}, data);
      setRevisionNumber(documentData.value.revision_number);
      editorContent.value = "<table style=\"\nborder-collapse: collapse;\nborder-spacing: 0;\nheight: 100%;\nwidth: 100%;\n\">\n<tr>\n            <td style=\"border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important\"><span\n                ><span style=\"text-transform: uppercase;font-size: 11px;\">".concat(_libs_i18n__WEBPACK_IMPORTED_MODULE_41__["default"].t('Created Date'), ":<br /></span><span style=\"font-size: 15px;\">").concat(documentData.value.created_date, "</span></span\n            ></td>\n            <td style=\"border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important\"><span\n                ><span style=\"text-transform: uppercase;font-size: 11px;\">").concat(_libs_i18n__WEBPACK_IMPORTED_MODULE_41__["default"].t('Revised Date'), ":<br /></span><span style=\"font-size: 15px;\">").concat(documentData.value.revised_date, "</span></span\n            ></td>\n            <td style=\"border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important\" colspan=\"2\"><span><span style=\"text-transform: uppercase;font-size: 11px;\">").concat(_libs_i18n__WEBPACK_IMPORTED_MODULE_41__["default"].t('Doc Author'), ":<br /></span>").concat(documentData.value.author, "</span></td>\n                <td rowspan=\"2\" style=\"border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important; border-left: none;\"><span style=\"font-size:20px; color:#186784;\">adger energi</span></td>\n            </tr>\n\n          <tr>\n            <td style=\"border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important\"><span\n                ><span style=\"text-transform: uppercase;font-size: 11px;\">").concat(_libs_i18n__WEBPACK_IMPORTED_MODULE_41__["default"].t('Doc. no'), ":<br /></span><span style=\"font-size: 15px;\">").concat(docId, "</span></span\n            ></td>\n\n            <td style=\"border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important\"><span\n                ><span style=\"text-transform: uppercase;font-size: 11px;\">").concat(_libs_i18n__WEBPACK_IMPORTED_MODULE_41__["default"].t('Revision No.'), ":<br /></span>").concat(revisionNumberFormatter(documentData.value.revision_number), "</span\n            ></td>\n            <td style=\"border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important\"><span\n                ><span style=\"text-transform: uppercase;font-size: 11px;\">").concat(_libs_i18n__WEBPACK_IMPORTED_MODULE_41__["default"].t('Approved By'), ":<br /></span><span style=\"font-size: 15px;\">").concat(documentData.value.approved_by, "</span></span\n            ></td>\n            <td style=\"border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important\"><span\n                ><span style=\"text-transform: uppercase;font-size: 11px;\">").concat(_libs_i18n__WEBPACK_IMPORTED_MODULE_41__["default"].t('Approved Date'), ":<br /></span><span style=\"font-size: 15px;\">").concat(documentData.value.approved_date, "</span></span\n            ></td>\n          </tr>\n    <tr>\n      <td colspan=\"5\" style=\"border: 1px solid #bfbfbf; padding:0.1rem 0.1rem !important;border-top: none;\" class=\"text-center\">\n        <p class=\"p-0 m-0\" ><strong>").concat(documentData.value.title, "</strong></p>\n      </td>\n    </tr>\n  </table>");
    };
    var selectSearchDocument = function selectSearchDocument(data, docId) {
      getDocument(data, docId, false);
      searchDocumentOptions.value = [];
      searchQuery.value = filters.q;
    };
    var onSubmit = /*#__PURE__*/function () {
      var _ref4 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2() {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                searchQuery.value = '';
                filters.q = '';
                documentData.value.content = rte.value.getHTMLCode();
                _context2.next = 5;
                return updateDocument(documentData.value);
              case 5:
                getDocument(documentData.value);
                getDocuments();
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return function onSubmit() {
        return _ref4.apply(this, arguments);
      };
    }();
    var downloadPdf = function downloadPdf() {
      if (isDocumentOpen.value) {
        var opt = {
          margin: 0.5,
          filename: "".concat(documentData.value.title, ".pdf"),
          image: {
            type: 'jpeg',
            quality: 0.98
          },
          html2canvas: {
            scale: 1
          },
          jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait'
          }
        };
        var contentHtml = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])('');
        if (isDocumentEdit) {
          contentHtml.value = document.querySelector('.ck-content').innerHTML;
        } else {
          contentHtml.value = document.querySelector('.ck-content').innerHTML;
        }
        var htmlContent = "".concat(contentHtml.value);
        html2pdf_js__WEBPACK_IMPORTED_MODULE_40___default()().set(opt).from(htmlContent).save();
      }
    };
    var showSubCategories = function showSubCategories(id) {
      fetchSubCategories(id);
      // formData.value.category_id = categories.value.find(item => item.id === id)
    };

    // get object index number
    var getIndex = function getIndex(obj, value) {
      var keys = Object.keys(obj);

      //   with 0 if index is less than 10
      if (keys.indexOf(value) + 1 < 10) {
        return "0".concat(keys.indexOf(value) + 1);
      }
      return keys.indexOf(value) + 1;
    };
    var getIndex2 = function getIndex2(obj, value) {
      var keys = Object.keys(obj);
      return keys.indexOf(value) + 1;
    };

    // getIndexByValue
    var getIndexByValue = function getIndexByValue(obj, value) {
      console.log(value);
      //  find value in objecct by subcategory name
      //   const keys = Object.keys(obj)
      // check subcategory value in object and return index
      var index = Object.values(obj).findIndex(function (item, i) {
        if (item.subcategory === value) {
          return i;
        }
      });
      console.log(index + 1);

      //   with 0 if index is less than 10
      if (index + 1 < 10) {
        return "0".concat(index + 1);
      }
      return index + 1;
    };
    var editorConfig = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["ref"])({
      // removePlugins: ['ImageUpload', 'EasyImage'],
    });
    var deleteConfirmed = /*#__PURE__*/function () {
      var _ref5 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee3() {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return deleteDocument(documentData.value.id);
              case 2:
                _context3.next = 4;
                return getDocuments();
              case 4:
                isDocumentOpen.value = false;
                documentData.value = {};
              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return function deleteConfirmed() {
        return _ref5.apply(this, arguments);
      };
    }();
    var deleteDocumentEntry = /*#__PURE__*/function () {
      var _ref6 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee4() {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (isDocumentOpen.value) {
                  context.root.$bvModal.msgBoxConfirm(_libs_i18n__WEBPACK_IMPORTED_MODULE_41__["default"].t('Please confirm that you want to delete document.'), {
                    title: _libs_i18n__WEBPACK_IMPORTED_MODULE_41__["default"].t('Please Confirm'),
                    size: 'sm'
                  }).then(function (value) {
                    if (value) {
                      deleteConfirmed();
                    }
                  });
                }
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      return function deleteDocumentEntry() {
        return _ref6.apply(this, arguments);
      };
    }();
    var localStorageData = JSON.parse(_auth_jwt_useJwt__WEBPACK_IMPORTED_MODULE_32__["default"].getUserData());
    var formattedOptions = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_31__["computed"])(function () {
      // Flatten documents hierarchy
      return searchDocumentOptions.value.map(function (option) {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__["default"])({}, option), {}, {
          documentsFlat: option.documents.flatMap(function (item) {
            return item.documents;
          })
        });
      });
    });

    // Debounced search function
    var searchDocument = Object(lodash__WEBPACK_IMPORTED_MODULE_48__["debounce"])( /*#__PURE__*/function () {
      var _ref7 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee5(loading, searchValue) {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                filters.q = searchValue;
                _context5.next = 3;
                return searchDocuments();
              case 3:
                loading(false);
              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
      return function (_x, _x2) {
        return _ref7.apply(this, arguments);
      };
    }(), 350);

    // Search handler
    var onSearch = function onSearch(searchValue, loading) {
      if (searchValue.length) {
        loading(true);
        searchDocument(loading, searchValue);
      }
    };
    var highlightedContent = function highlightedContent(content) {
      if (searchQuery.value.trim() !== '') {
        // Escape special characters in the search query for regex
        var escapeRegex = function escapeRegex(string) {
          return string.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
        };
        var searchTerm = escapeRegex(searchQuery.value.trim());
        var regex = new RegExp("(".concat(searchTerm, ")"), 'gi');

        // Use a temporary container to safely handle HTML content
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;

        // Function to replace text while preserving HTML structure
        var replaceText = function replaceText(node) {
          if (node.nodeType === Node.TEXT_NODE) {
            var parentNode = node.parentNode;
            var newHtml = node.textContent.replace(regex, '<span class="highlight">$1</span>');
            if (newHtml !== node.textContent) {
              var fragment = document.createDocumentFragment();
              var div = document.createElement('div');
              div.innerHTML = newHtml;
              while (div.firstChild) {
                fragment.appendChild(div.firstChild);
              }
              parentNode.replaceChild(fragment, node);
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            Array.from(node.childNodes).forEach(replaceText);
          }
        };
        replaceText(tempDiv);
        return tempDiv.innerHTML;
      } else {
        return content;
      }
    };
    var boldContent = function boldContent(content) {
      var inputValue = document.querySelector(".vs__search").value;
      if (inputValue !== '') {
        var regex = new RegExp("(".concat(inputValue, ")"), 'gi');
        return content.replace(regex, '<span style="font-weight:700">$1</span>');
      } else {
        return content;
      }
    };
    var revisionNumberFormatter = function revisionNumberFormatter(number) {
      if (number === null) return;
      var digits = number.toString().split('');
      if (digits.length === 1) {
        return "0.0.".concat(digits[0]);
      }
      if (digits.length === 2) {
        return "0.".concat(digits[0], ".").concat(digits[1]);
      }
      if (digits.length === 3) {
        return "".concat(digits[0], ".").concat(digits[1], ".").concat(digits[2]);
      }
      return digits.join('.');
    };
    return {
      highlightedContent: highlightedContent,
      revisionNumberFormatter: revisionNumberFormatter,
      filters: filters,
      digits: digits,
      increaseRevision: increaseRevision,
      decreaseRevision: decreaseRevision,
      onSearch: onSearch,
      search: search,
      onSubmit: onSubmit,
      required: _validations__WEBPACK_IMPORTED_MODULE_37__["required"],
      getIndex2: getIndex2,
      searchQuery: searchQuery,
      docNumber: docNumber,
      getIndex: getIndex,
      getDocuments: getDocuments,
      editDocument: editDocument,
      downloadPdf: downloadPdf,
      categories: categories,
      showSubCategories: showSubCategories,
      subcategories: subcategories,
      isDocumentEdit: isDocumentEdit,
      isDocumentOpen: isDocumentOpen,
      getDocument: getDocument,
      editorContent: editorContent,
      documentData: documentData,
      documentsData: documentsData,
      getIndexByValue: getIndexByValue,
      ClassicEditor: _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_34___default.a,
      editorConfig: editorConfig,
      isExportActive: isExportActive,
      deleteDocumentEntry: deleteDocumentEntry,
      refFormObserver: refFormObserver,
      getValidationState: getValidationState,
      addDocumentActive: addDocumentActive,
      localStorageData: localStorageData,
      isAddCategoryActive: isAddCategoryActive,
      perfectScrollbarSettings: perfectScrollbarSettings,
      searchDocumentOptions: searchDocumentOptions,
      formattedOptions: formattedOptions,
      selectSearchDocument: selectSearchDocument,
      searchSelectRef: searchSelectRef,
      generatePDF: generatePDF,
      tagDialog: tagDialog,
      tags: tags,
      cancelEditDocument: cancelEditDocument,
      boldContent: boldContent,
      rteref: rteref,
      processedDocumentsData: processedDocumentsData
    };
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Add.vue?vue&type=style&index=0&id=1f09de7c&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/procedures/Add.vue?vue&type=style&index=0&id=1f09de7c&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "#add-document-active___BV_modal_outer_ {\n  z-index: 1000000 !important;\n}\n.per-page-selector {\n  width: 90px;\n}\n:root {\n  --ck-z-default: 10555 !important;\n  --ck-z-modal: calc(var(--ck-z-default) + 999) !important;\n}\n.ck-editor__editable {\n  min-height: 300px;\n}\n.editor .ck .ck-toolbar__items {\n  z-index: 1 !important;\n}\n.rte-modern.rte-desktop.rte-toolbar-default {\n  min-width: 0 !important;\n}\n.revision_dot {\n  width: 5px;\n  height: 5px;\n  position: absolute;\n  bottom: 0px;\n}\n[dir] .revision_dot {\n  border-radius: 50%;\n  background: #6e6b7b;\n}\n[dir=ltr] .revision_dot {\n  right: -7px;\n}\n[dir=rtl] .revision_dot {\n  left: -7px;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=0&id=da5bad26&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=0&id=da5bad26&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "[dir] hr[data-v-da5bad26] {\n  margin: 0;\n  padding: 0px;\n}\n.bold[data-v-da5bad26] {\n  font-weight: 700 !important;\n}\n.collapsed > .when-open[data-v-da5bad26],\n.not-collapsed > .when-closed[data-v-da5bad26] {\n  display: none;\n}\n.ck.ck-editor[data-v-da5bad26] {\n  z-index: 100;\n}\n.per-page-selector[data-v-da5bad26] {\n  width: 90px;\n}\n.indexing-table-scroller[data-v-da5bad26] {\n  height: 100%;\n}\n.indexing-table-scroller .indexing-table li h4[data-v-da5bad26] {\n  font-size: 14px;\n}\n[dir] .indexing-table-scroller .indexing-table li h4[data-v-da5bad26] {\n  margin-bottom: 0px;\n}\n.indexing-table-scroller .indexing-table li a[data-v-da5bad26] {\n  color: #333;\n  display: block;\n  font-size: 13px;\n}\n[dir] .indexing-table-scroller .indexing-table li a[data-v-da5bad26] {\n  padding: 0px;\n  border-radius: 5px;\n}\n.indexing-table-scroller .indexing-table li a[data-v-da5bad26]:hover {\n  color: #FFF;\n}\n[dir=ltr] .indexing-table-scroller .indexing-table li a[data-v-da5bad26]:hover {\n  background-image: linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7));\n}\n[dir=rtl] .indexing-table-scroller .indexing-table li a[data-v-da5bad26]:hover {\n  background-image: linear-gradient(-118deg, #7367f0, rgba(115, 103, 240, 0.7));\n}\n[dir=ltr] .indexing-table-scroller .indexing-table li ul[data-v-da5bad26] {\n  padding-left: 20px;\n}\n[dir=rtl] .indexing-table-scroller .indexing-table li ul[data-v-da5bad26] {\n  padding-right: 20px;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=2&id=da5bad26&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=2&id=da5bad26&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "[dir] .highlight {\n  background-color: yellow !important;\n  padding: 2px 4px;\n}\n\n/**\n    Support for SASS is deprecated as of v3.18.\n\n    The files remain here if your build is dependent on them\n    but they will not receive updates in future releases. All\n    SASS variables have been translated into CSS variables, so\n    migration should be quite simple if you'd like to move over.\n\n    In v4, these files will be removed.\n */\n.v-select {\n  position: relative;\n  font-family: inherit;\n}\n.v-select,\n.v-select * {\n  box-sizing: border-box;\n}\n\n/* KeyFrames */\n@-webkit-keyframes vSelectSpinner-ltr {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n@-webkit-keyframes vSelectSpinner-rtl {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(-360deg);\n}\n}\n@keyframes vSelectSpinner-ltr {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n@keyframes vSelectSpinner-rtl {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(-360deg);\n}\n}\n/* Dropdown Default Transition */\n.vs__fade-enter-active,\n.vs__fade-leave-active {\n  pointer-events: none;\n  transition: opacity 0.15s cubic-bezier(1, 0.5, 0.8, 1);\n}\n.vs__fade-enter,\n.vs__fade-leave-to {\n  opacity: 0;\n}\n\n/** Component States */\n/*\n * Disabled\n *\n * When the component is disabled, all interaction\n * should be prevented. Here we modify the bg color,\n * and change the cursor displayed on the interactive\n * components.\n */\n[dir] .vs--disabled .vs__dropdown-toggle, [dir] .vs--disabled .vs__clear, [dir] .vs--disabled .vs__search, [dir] .vs--disabled .vs__selected, [dir] .vs--disabled .vs__open-indicator {\n  cursor: not-allowed;\n  background-color: rgb(248, 248, 248);\n}\n\n/*\n *  RTL - Right to Left Support\n *\n *  Because we're using a flexbox layout, the `dir=\"rtl\"`\n *  HTML attribute does most of the work for us by\n *  rearranging the child elements visually.\n */\n.v-select[dir=rtl] .vs__actions {\n  padding: 0 3px 0 6px;\n}\n.v-select[dir=rtl] .vs__clear {\n  margin-left: 6px;\n  margin-right: 0;\n}\n.v-select[dir=rtl] .vs__deselect {\n  margin-left: 0;\n  margin-right: 2px;\n}\n.v-select[dir=rtl] .vs__dropdown-menu {\n  text-align: right;\n}\n\n/**\n    Dropdown Toggle\n\n    The dropdown toggle is the primary wrapper of the component. It\n    has two direct descendants: .vs__selected-options, and .vs__actions.\n\n    .vs__selected-options holds the .vs__selected's as well as the\n    main search input.\n\n    .vs__actions holds the clear button and dropdown toggle.\n */\n.vs__dropdown-toggle {\n  appearance: none;\n  display: flex;\n  white-space: normal;\n}\n[dir] .vs__dropdown-toggle {\n  padding: 0 0 4px 0;\n  background: none;\n  border: 1px solid #d8d6de;\n  border-radius: 0.357rem;\n}\n.vs__selected-options {\n  display: flex;\n  flex-basis: 100%;\n  flex-grow: 1;\n  flex-wrap: wrap;\n  position: relative;\n}\n[dir] .vs__selected-options {\n  padding: 0 2px;\n}\n.vs__actions {\n  display: flex;\n  align-items: center;\n}\n[dir=ltr] .vs__actions {\n  padding: 4px 6px 0 3px;\n}\n[dir=rtl] .vs__actions {\n  padding: 4px 3px 0 6px;\n}\n\n/* Dropdown Toggle States */\n[dir] .vs--searchable .vs__dropdown-toggle {\n  cursor: text;\n}\n[dir] .vs--unsearchable .vs__dropdown-toggle {\n  cursor: pointer;\n}\n[dir] .vs--open .vs__dropdown-toggle {\n  border-bottom-color: transparent;\n}\n[dir=ltr] .vs--open .vs__dropdown-toggle {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n[dir=rtl] .vs--open .vs__dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.vs__open-indicator {\n  fill: rgba(60, 60, 60, 0.5);\n  transition: transform 150ms cubic-bezier(1, -0.115, 0.975, 0.855);\n}\n[dir] .vs__open-indicator {\n  transform: scale(1);\n  transition-timing-function: cubic-bezier(1, -0.115, 0.975, 0.855);\n}\n[dir=ltr] .vs--open .vs__open-indicator {\n  transform: rotate(180deg) scale(1);\n}\n[dir=rtl] .vs--open .vs__open-indicator {\n  transform: rotate(-180deg) scale(1);\n}\n.vs--loading .vs__open-indicator {\n  opacity: 0;\n}\n\n/* Clear Button */\n.vs__clear {\n  fill: rgba(60, 60, 60, 0.5);\n}\n[dir] .vs__clear {\n  padding: 0;\n  border: 0;\n  background-color: transparent;\n  cursor: pointer;\n}\n[dir=ltr] .vs__clear {\n  margin-right: 8px;\n}\n[dir=rtl] .vs__clear {\n  margin-left: 8px;\n}\n\n/* Dropdown Menu */\n.vs__dropdown-menu {\n  display: block;\n  box-sizing: border-box;\n  position: absolute;\n  top: calc(100% - 1px);\n  z-index: 1000;\n  width: 100%;\n  max-height: 350px;\n  min-width: 160px;\n  overflow-y: auto;\n  list-style: none;\n}\n[dir] .vs__dropdown-menu {\n  padding: 5px 0;\n  margin: 0;\n  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);\n  border: 1px solid #d8d6de;\n  border-top-style: none;\n  border-radius: 0 0 0.357rem 0.357rem;\n  background: #fff;\n}\n[dir=ltr] .vs__dropdown-menu {\n  left: 0;\n  text-align: left;\n}\n[dir=rtl] .vs__dropdown-menu {\n  right: 0;\n  text-align: right;\n}\n[dir] .vs__no-options {\n  text-align: center;\n}\n\n/* List Items */\n.vs__dropdown-option {\n  line-height: 1.42857143; /* Normalize line height */\n  display: block;\n  color: #333; /* Overrides most CSS frameworks */\n  white-space: nowrap;\n}\n[dir] .vs__dropdown-option {\n  padding: 3px 20px;\n  clear: both;\n  cursor: pointer;\n}\n.vs__dropdown-option--highlight {\n  color: #7367f0 !important;\n}\n[dir] .vs__dropdown-option--highlight {\n  background: rgba(115, 103, 240, 0.12);\n}\n.vs__dropdown-option--deselect {\n  color: #fff;\n}\n[dir] .vs__dropdown-option--deselect {\n  background: #fb5858;\n}\n.vs__dropdown-option--disabled {\n  color: rgba(60, 60, 60, 0.5);\n}\n[dir] .vs__dropdown-option--disabled {\n  background: inherit;\n  cursor: inherit;\n}\n\n/* Selected Tags */\n.vs__selected {\n  display: flex;\n  align-items: center;\n  color: #333;\n  line-height: 1.8;\n  z-index: 0;\n}\n[dir] .vs__selected {\n  background-color: #7367f0;\n  border: 0 solid rgba(60, 60, 60, 0.26);\n  border-radius: 0.357rem;\n  margin: 4px 2px 0px 2px;\n  padding: 0 0.25em;\n}\n.vs__deselect {\n  display: inline-flex;\n  appearance: none;\n  fill: rgba(60, 60, 60, 0.5);\n}\n[dir] .vs__deselect {\n  padding: 0;\n  border: 0;\n  cursor: pointer;\n  background: none;\n  text-shadow: 0 1px 0 #fff;\n}\n[dir=ltr] .vs__deselect {\n  margin-left: 4px;\n}\n[dir=rtl] .vs__deselect {\n  margin-right: 4px;\n}\n\n/* States */\n[dir] .vs--single .vs__selected {\n  background-color: transparent;\n  border-color: transparent;\n}\n.vs--single.vs--open .vs__selected, .vs--single.vs--loading .vs__selected {\n  position: absolute;\n  opacity: 0.4;\n}\n.vs--single.vs--searching .vs__selected {\n  display: none;\n}\n\n/* Search Input */\n/**\n * Super weird bug... If this declaration is grouped\n * below, the cancel button will still appear in chrome.\n * If it's up here on it's own, it'll hide it.\n */\n.vs__search::-webkit-search-cancel-button {\n  display: none;\n}\n.vs__search::-webkit-search-decoration,\n.vs__search::-webkit-search-results-button,\n.vs__search::-webkit-search-results-decoration,\n.vs__search::-ms-clear {\n  display: none;\n}\n.vs__search,\n.vs__search:focus {\n  appearance: none;\n  line-height: 1.8;\n  font-size: 1em;\n  outline: none;\n  width: 0;\n  max-width: 100%;\n  flex-grow: 1;\n  z-index: 1;\n}\n[dir] .vs__search, [dir] .vs__search:focus {\n  border: 1px solid transparent;\n  margin: 4px 0 0 0;\n  padding: 0 7px;\n  background: none;\n  box-shadow: none;\n}\n[dir=ltr] .vs__search, [dir=ltr] .vs__search:focus {\n  border-left: none;\n}\n[dir=rtl] .vs__search, [dir=rtl] .vs__search:focus {\n  border-right: none;\n}\n.vs__search::placeholder {\n  color: #6e6b7b;\n}\n\n/**\n    States\n */\n.vs--unsearchable .vs__search {\n  opacity: 1;\n}\n[dir] .vs--unsearchable:not(.vs--disabled) .vs__search {\n  cursor: pointer;\n}\n.vs--single.vs--searching:not(.vs--open):not(.vs--loading) .vs__search {\n  opacity: 0.2;\n}\n\n/* Loading Spinner */\n.vs__spinner {\n  align-self: center;\n  opacity: 0;\n  font-size: 5px;\n  text-indent: -9999em;\n  overflow: hidden;\n  transition: opacity 0.1s;\n}\n[dir] .vs__spinner {\n  border-top: 0.9em solid rgba(100, 100, 100, 0.1);\n  border-bottom: 0.9em solid rgba(100, 100, 100, 0.1);\n  transform: translateZ(0);\n}\n[dir=ltr] .vs__spinner {\n  border-right: 0.9em solid rgba(100, 100, 100, 0.1);\n  border-left: 0.9em solid rgba(60, 60, 60, 0.45);\n  animation:  vSelectSpinner-ltr 1.1s infinite linear;\n}\n[dir=rtl] .vs__spinner {\n  border-left: 0.9em solid rgba(100, 100, 100, 0.1);\n  border-right: 0.9em solid rgba(60, 60, 60, 0.45);\n  animation:  vSelectSpinner-rtl 1.1s infinite linear;\n}\n.vs__spinner,\n.vs__spinner:after {\n  width: 5em;\n  height: 5em;\n}\n[dir] .vs__spinner, [dir] .vs__spinner:after {\n  border-radius: 50%;\n}\n\n/* Loading Spinner States */\n.vs--loading .vs__spinner {\n  opacity: 1;\n}\n.vs__open-indicator {\n  fill: none;\n}\n[dir] .vs__open-indicator {\n  margin-top: 0.15rem;\n}\n.vs__dropdown-toggle {\n  transition: all 0.25s ease-in-out;\n}\n[dir] .vs__dropdown-toggle {\n  padding: 0.59px 0 4px 0;\n}\n[dir=ltr] .vs--single .vs__dropdown-toggle {\n  padding-left: 6px;\n}\n[dir=rtl] .vs--single .vs__dropdown-toggle {\n  padding-right: 6px;\n}\n.vs__dropdown-option--disabled {\n  opacity: 0.5;\n}\n[dir] .vs__dropdown-option--disabled.vs__dropdown-option--selected {\n  background: #7367f0 !important;\n}\n.vs__dropdown-option {\n  color: #6e6b7b;\n}\n[dir] .vs__dropdown-option, [dir] .vs__no-options {\n  padding: 7px 20px;\n}\n.vs__dropdown-option--selected {\n  background-color: #7367f0;\n  color: #fff;\n  position: relative;\n}\n.vs__dropdown-option--selected::after {\n  content: \"\";\n  height: 1.1rem;\n  width: 1.1rem;\n  display: inline-block;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  right: 20px;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 1.1rem;\n}\n[dir=rtl] .vs__dropdown-option--selected::after {\n  left: 20px;\n  right: unset;\n}\n.vs__dropdown-option--selected.vs__dropdown-option--highlight {\n  color: #fff !important;\n  background-color: #7367f0 !important;\n}\n.vs__clear svg {\n  color: #6e6b7b;\n}\n.vs__selected {\n  color: #fff;\n}\n.v-select.vs--single .vs__selected {\n  color: #6e6b7b;\n  transition: transform 0.2s ease;\n}\n[dir] .v-select.vs--single .vs__selected {\n  margin-top: 5px;\n}\n[dir=ltr] .v-select.vs--single .vs__selected input {\n  padding-left: 0;\n}\n[dir=rtl] .v-select.vs--single .vs__selected input {\n  padding-right: 0;\n}\n[dir=ltr] .vs--single.vs--open .vs__selected {\n  transform: translateX(5px);\n}\n[dir=rtl] .vs--single.vs--open .vs__selected {\n  transform: translateX(-5px);\n}\n.vs__selected .vs__deselect {\n  color: inherit;\n}\n.v-select:not(.vs--single) .vs__selected {\n  font-size: 0.9rem;\n}\n[dir] .v-select:not(.vs--single) .vs__selected {\n  border-radius: 3px;\n  padding: 0 0.6em;\n}\n[dir=ltr] .v-select:not(.vs--single) .vs__selected {\n  margin: 5px 2px 2px 5px;\n}\n[dir=rtl] .v-select:not(.vs--single) .vs__selected {\n  margin: 5px 5px 2px 2px;\n}\n.v-select:not(.vs--single) .vs__deselect svg {\n  vertical-align: text-top;\n}\n[dir] .v-select:not(.vs--single) .vs__deselect svg {\n  transform: scale(0.8);\n}\n.vs__dropdown-menu {\n  top: calc(100% + 1rem);\n}\n[dir] .vs__dropdown-menu {\n  border: none;\n  border-radius: 6px;\n  padding: 0;\n}\n[dir] .vs--open .vs__dropdown-toggle {\n  border-color: #7367f0;\n  border-bottom-color: #7367f0;\n  box-shadow: 0 3px 10px 0 rgba(34, 41, 47, 0.1);\n}\n[dir=ltr] .vs--open .vs__dropdown-toggle {\n  border-bottom-left-radius: 0.357rem;\n  border-bottom-right-radius: 0.357rem;\n}\n[dir=rtl] .vs--open .vs__dropdown-toggle {\n  border-bottom-right-radius: 0.357rem;\n  border-bottom-left-radius: 0.357rem;\n}\n.select-size-lg .vs__selected {\n  font-size: 1rem !important;\n}\n[dir] .select-size-lg.vs--single.vs--open .vs__selected {\n  margin-top: 6px;\n}\n.select-size-lg .vs__dropdown-toggle,\n.select-size-lg .vs__selected {\n  font-size: 1.25rem;\n}\n[dir] .select-size-lg .vs__dropdown-toggle {\n  padding: 5px;\n}\n[dir] .select-size-lg .vs__dropdown-toggle input {\n  margin-top: 0;\n}\n.select-size-lg .vs__deselect svg {\n  vertical-align: middle !important;\n}\n[dir] .select-size-lg .vs__deselect svg {\n  transform: scale(1) !important;\n}\n[dir] .select-size-sm .vs__dropdown-toggle {\n  padding-bottom: 0;\n  padding: 1px;\n}\n[dir] .select-size-sm.vs--single .vs__dropdown-toggle {\n  padding: 2px;\n}\n.select-size-sm .vs__dropdown-toggle,\n.select-size-sm .vs__selected {\n  font-size: 0.9rem;\n}\n[dir] .select-size-sm .vs__actions {\n  padding-top: 2px;\n  padding-bottom: 2px;\n}\n.select-size-sm .vs__deselect svg {\n  vertical-align: middle !important;\n}\n[dir] .select-size-sm .vs__search {\n  margin-top: 0;\n}\n.select-size-sm.v-select .vs__selected {\n  font-size: 0.75rem;\n}\n[dir] .select-size-sm.v-select .vs__selected {\n  padding: 0 0.3rem;\n}\n[dir] .select-size-sm.v-select:not(.vs--single) .vs__selected {\n  margin: 4px 5px;\n}\n[dir] .select-size-sm.v-select.vs--single .vs__selected {\n  margin-top: 1px;\n}\n[dir] .select-size-sm.vs--single.vs--open .vs__selected {\n  margin-top: 4px;\n}\n.dark-layout .vs__dropdown-toggle {\n  color: #b4b7bd;\n}\n[dir] .dark-layout .vs__dropdown-toggle {\n  background: #283046;\n  border-color: #404656;\n}\n.dark-layout .vs__selected-options input {\n  color: #b4b7bd;\n}\n.dark-layout .vs__selected-options input::placeholder {\n  color: #676d7d;\n}\n.dark-layout .vs__actions svg {\n  fill: #404656;\n}\n[dir] .dark-layout .vs__dropdown-menu {\n  background: #283046;\n}\n.dark-layout .vs__dropdown-menu li {\n  color: #b4b7bd;\n}\n.dark-layout .v-select:not(.vs--single) .vs__selected {\n  color: #7367f0;\n}\n[dir] .dark-layout .v-select:not(.vs--single) .vs__selected {\n  background-color: rgba(115, 103, 240, 0.12);\n}\n.dark-layout .v-select.vs--single .vs__selected {\n  color: #b4b7bd !important;\n}\n.dark-layout .vs--disabled .vs__dropdown-toggle,\n.dark-layout .vs--disabled .vs__clear,\n.dark-layout .vs--disabled .vs__search,\n.dark-layout .vs--disabled .vs__selected,\n.dark-layout .vs--disabled .vs__open-indicator {\n  opacity: 0.5;\n}\n[dir] .dark-layout .vs--disabled .vs__dropdown-toggle, [dir] .dark-layout .vs--disabled .vs__clear, [dir] .dark-layout .vs--disabled .vs__search, [dir] .dark-layout .vs--disabled .vs__selected, [dir] .dark-layout .vs--disabled .vs__open-indicator {\n  background-color: #283046;\n}\n.select-search {\n  /* List Items */\n}\n.select-search .vs__selected {\n  display: none;\n}\n.select-search .vs__actions {\n  display: none;\n}\n[dir] .select-search .vs__dropdown-menu li {\n  background-color: transparent;\n}\n.select-search .vs__dropdown-option {\n  line-height: 1.42857143;\n  /* Normalize line height */\n  display: block;\n  color: #333;\n  /* Overrides most CSS frameworks */\n  white-space: nowrap;\n  color: black !important;\n}\n[dir] .select-search .vs__dropdown-option {\n  padding: 3px 20px;\n  clear: both;\n}\n[dir] .select-search .vs__dropdown-option:hover {\n  cursor: pointer;\n  background: transparent !important;\n}\n[dir] .select-search .vs__dropdown-option--highlight {\n  background: transparent !important;\n}\n.select-search .vs__dropdown-option--highlight:hover {\n  color: black !important;\n}\n[dir] .select-search .vs__dropdown-option--highlight:hover {\n  cursor: pointer;\n  background: transparent !important;\n}\n.dark-layout a {\n  color: #d0d2d6 !important;\n}\n.dark-layout span {\n  color: #d0d2d6 !important;\n}\n.revision_dot {\n  width: 5px;\n  height: 5px;\n  position: absolute;\n  bottom: 0px;\n}\n[dir] .revision_dot {\n  border-radius: 50%;\n  background: #6e6b7b;\n}\n[dir=ltr] .revision_dot {\n  right: -7px;\n}\n[dir=rtl] .revision_dot {\n  left: -7px;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=1&id=da5bad26&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=1&id=da5bad26&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n  /* .ck-content p{\n      font-size:12px !important;\n  } */\n.split {\n    display: flex;\n    flex-direction: row;\n}\n.show-gutter{\n.gutter {\n   display: none !important;\n}\n}\n[dir] .gutter {\n    background-color: #eee;\n    background-repeat: no-repeat;\n    background-position: 50%;\n}\n[dir] .gutter.gutter-horizontal {\n    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');\n    cursor: col-resize;\n    margin-top:30px;\n    margin-bottom:30px;\n}\n  ", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Add.vue?vue&type=style&index=0&id=1f09de7c&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/procedures/Add.vue?vue&type=style&index=0&id=1f09de7c&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Add.vue?vue&type=style&index=0&id=1f09de7c&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Add.vue?vue&type=style&index=0&id=1f09de7c&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=0&id=da5bad26&lang=scss&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=0&id=da5bad26&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=0&id=da5bad26&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=0&id=da5bad26&lang=scss&scoped=true&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=2&id=da5bad26&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=2&id=da5bad26&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=2&id=da5bad26&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=2&id=da5bad26&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=1&id=da5bad26&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=1&id=da5bad26&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=1&id=da5bad26&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=1&id=da5bad26&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Add.vue?vue&type=template&id=1f09de7c&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/procedures/Add.vue?vue&type=template&id=1f09de7c& ***!
  \****************************************************************************************************************************************************************************************************************/
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
    "b-modal",
    {
      staticClass: "modal-add-document-active",
      attrs: {
        "cancel-variant": "outline-secondary",
        centered: "",
        "hide-footer": true,
        title: "Add Document",
        size: "lg",
        "no-enforce-focus": "",
        id: "add-document-active",
        visible: _vm.addDocumentActive,
      },
      on: {
        close: function ($event) {
          return _vm.$emit("update:add-document-active", false)
        },
        hide: function ($event) {
          return _vm.$emit("update:add-document-active", false)
        },
      },
    },
    [
      _c(
        "div",
        [
          _c("validation-observer", {
            ref: "refFormObserver",
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function (ref) {
                  var handleSubmit = ref.handleSubmit
                  return [
                    _c(
                      "b-form",
                      {
                        on: {
                          submit: function ($event) {
                            $event.preventDefault()
                            return handleSubmit(_vm.onSubmit)
                          },
                          reset: function ($event) {
                            $event.preventDefault()
                            return _vm.resetForm($event)
                          },
                        },
                      },
                      [
                        _c(
                          "b-row",
                          [
                            _c(
                              "b-col",
                              {
                                staticClass:
                                  "my-2 justify-content-around d-flex",
                                attrs: { sm: "12" },
                              },
                              [
                                _c("label", [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.formData.type,
                                        expression: "formData.type",
                                      },
                                    ],
                                    attrs: {
                                      value: "Procedure",
                                      type: "radio",
                                      name: "type",
                                      id: "",
                                    },
                                    domProps: {
                                      checked: _vm.formData.type == "Procedure",
                                      checked: _vm._q(
                                        _vm.formData.type,
                                        "Procedure"
                                      ),
                                    },
                                    on: {
                                      change: function ($event) {
                                        return _vm.$set(
                                          _vm.formData,
                                          "type",
                                          "Procedure"
                                        )
                                      },
                                    },
                                  }),
                                  _vm._v(" " + _vm._s(_vm.$t("Procedure"))),
                                ]),
                                _vm._v(" "),
                                _c("label", [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.formData.type,
                                        expression: "formData.type",
                                      },
                                    ],
                                    attrs: {
                                      value: "Document",
                                      type: "radio",
                                      name: "type",
                                      id: "",
                                    },
                                    domProps: {
                                      checked: _vm.formData.type == "Document",
                                      checked: _vm._q(
                                        _vm.formData.type,
                                        "Document"
                                      ),
                                    },
                                    on: {
                                      change: function ($event) {
                                        return _vm.$set(
                                          _vm.formData,
                                          "type",
                                          "Document"
                                        )
                                      },
                                    },
                                  }),
                                  _vm._v(" " + _vm._s(_vm.$t("Document"))),
                                ]),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              { attrs: { cols: "12", md: "12" } },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: _vm.$t("Document Title"),
                                    rules: "required",
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "b-form-group",
                                              {
                                                attrs: {
                                                  label:
                                                    _vm.$t("Document Title"),
                                                  "label-for": "oname",
                                                },
                                              },
                                              [
                                                _c("b-form-input", {
                                                  attrs: {
                                                    placeholder:
                                                      _vm.$t("Document Title"),
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                    trim: "",
                                                  },
                                                  model: {
                                                    value: _vm.formData.title,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.formData,
                                                        "title",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "formData.title",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c("b-form-invalid-feedback", [
                                                  _vm._v(
                                                    "\n                  " +
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      ) +
                                                      "\n                "
                                                  ),
                                                ]),
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
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              { attrs: { cols: "6", md: "6" } },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: _vm.$t("Category"),
                                    rules: "required",
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "b-form-group",
                                              {
                                                attrs: {
                                                  label: _vm.$t("Category"),
                                                  "label-for": "cname",
                                                },
                                              },
                                              [
                                                _c("b-form-select", {
                                                  attrs: {
                                                    id: "category",
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                    trim: "",
                                                    "value-field": "id",
                                                    "text-field": "name",
                                                    options: _vm.categories,
                                                    placeholder:
                                                      _vm.$t("Category"),
                                                  },
                                                  on: {
                                                    change:
                                                      _vm.showSubCategories,
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.formData.category_id,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.formData,
                                                        "category_id",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "formData.category_id",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c("b-form-invalid-feedback", [
                                                  _vm._v(
                                                    "\n                  " +
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      ) +
                                                      "\n                "
                                                  ),
                                                ]),
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
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              { attrs: { cols: "6", md: "6" } },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: _vm.$t("SubCategory"),
                                    rules: "required",
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "b-form-group",
                                              {
                                                attrs: {
                                                  label: _vm.$t("SubCategory"),
                                                  "label-for": "address",
                                                },
                                              },
                                              [
                                                _c("b-form-select", {
                                                  attrs: {
                                                    id: "subcategory",
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                    trim: "",
                                                    "value-field": "id",
                                                    "text-field": "name",
                                                    options: _vm.subcategories,
                                                    placeholder:
                                                      _vm.$t("SubCategory"),
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.formData
                                                        .subcategory_id,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.formData,
                                                        "subcategory_id",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "formData.subcategory_id",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c("b-form-invalid-feedback", [
                                                  _vm._v(
                                                    "\n                  " +
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      ) +
                                                      "\n                "
                                                  ),
                                                ]),
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
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              { attrs: { cols: "6", md: "6" } },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: _vm.$t("Created Date"),
                                    rules: "required",
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "b-form-group",
                                              {
                                                attrs: {
                                                  label: _vm.$t("Created Date"),
                                                  "label-for": "created_date",
                                                },
                                              },
                                              [
                                                _c("b-form-input", {
                                                  attrs: {
                                                    type: "date",
                                                    placeholder: "",
                                                    trim: "",
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.formData.created_date,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.formData,
                                                        "created_date",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "formData.created_date",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c("b-form-invalid-feedback", [
                                                  _vm._v(
                                                    "\n                  " +
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      ) +
                                                      "\n                "
                                                  ),
                                                ]),
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
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              { attrs: { cols: "6", md: "6" } },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: _vm.$t("Doc. no"),
                                    rules: "required",
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "b-form-group",
                                              {
                                                attrs: {
                                                  label: _vm.$t("Doc. no"),
                                                  "label-for": "registered",
                                                },
                                              },
                                              [
                                                _c("b-form-input", {
                                                  attrs: {
                                                    trim: "",
                                                    placeholder:
                                                      _vm.$t("Doc. no"),
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                    type: "number",
                                                    pattern: "[0-9]",
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.formData
                                                        .document_number,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.formData,
                                                        "document_number",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "formData.document_number",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c("b-form-invalid-feedback", [
                                                  _vm._v(
                                                    "\n                  " +
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      ) +
                                                      "\n                "
                                                  ),
                                                ]),
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
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              { attrs: { cols: "6", md: "6" } },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: _vm.$t("Revised Date"),
                                    rules: "required",
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "b-form-group",
                                              {
                                                attrs: {
                                                  label: _vm.$t("Revised Date"),
                                                  "label-for": "revised_date",
                                                },
                                              },
                                              [
                                                _c("b-form-input", {
                                                  attrs: {
                                                    type: "date",
                                                    trim: "",
                                                    placeholder:
                                                      _vm.$t("Revised Date"),
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.formData.revised_date,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.formData,
                                                        "revised_date",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "formData.revised_date",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c("b-form-invalid-feedback", [
                                                  _vm._v(
                                                    "\n                  " +
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      ) +
                                                      "\n                "
                                                  ),
                                                ]),
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
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              { attrs: { cols: "6", md: "6" } },
                              [
                                _c("validation-provider", {
                                  attrs: { name: _vm.$t("Revision No.") },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "b-form-group",
                                              {
                                                attrs: {
                                                  label: _vm.$t("Revision No."),
                                                  "label-for":
                                                    "revision_number",
                                                },
                                              },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass: "d-flex",
                                                    staticStyle: {
                                                      gap: "10px",
                                                    },
                                                  },
                                                  _vm._l(
                                                    _vm.digits,
                                                    function (digit, index) {
                                                      return _c(
                                                        "div",
                                                        {
                                                          key: index,
                                                          staticClass:
                                                            "position-realtive d-flex justify-items-center align-items-center flex-column",
                                                        },
                                                        [
                                                          _c("i", {
                                                            staticClass:
                                                              "bi bi-caret-up-fill cursor-pointer",
                                                            staticStyle: {
                                                              "font-size":
                                                                "20px",
                                                              height: "24px",
                                                            },
                                                            on: {
                                                              click: function (
                                                                $event
                                                              ) {
                                                                return _vm.increaseRevision(
                                                                  index
                                                                )
                                                              },
                                                            },
                                                          }),
                                                          _vm._v(" "),
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "d-flex align-items-end position-relative",
                                                            },
                                                            [
                                                              _c(
                                                                "b-form-input",
                                                                {
                                                                  staticStyle: {
                                                                    width:
                                                                      "30px",
                                                                    padding:
                                                                      "0px 8px",
                                                                    "text-align":
                                                                      "center",
                                                                  },
                                                                  attrs: {
                                                                    type: "tel",
                                                                    maxlength:
                                                                      "1",
                                                                  },
                                                                  model: {
                                                                    value:
                                                                      _vm
                                                                        .digits[
                                                                        index
                                                                      ],
                                                                    callback:
                                                                      function (
                                                                        $$v
                                                                      ) {
                                                                        _vm.$set(
                                                                          _vm.digits,
                                                                          index,
                                                                          $$v
                                                                        )
                                                                      },
                                                                    expression:
                                                                      "digits[index]",
                                                                  },
                                                                }
                                                              ),
                                                              _vm._v(" "),
                                                              index + 1 <
                                                              _vm.digits.length
                                                                ? _c("span", {
                                                                    staticClass:
                                                                      "revision_dot",
                                                                  })
                                                                : _vm._e(),
                                                            ],
                                                            1
                                                          ),
                                                          _vm._v(" "),
                                                          _c("i", {
                                                            staticClass:
                                                              "bi bi-caret-down-fill cursor-pointer",
                                                            staticStyle: {
                                                              "font-size":
                                                                "20px",
                                                              height: "20px",
                                                            },
                                                            on: {
                                                              click: function (
                                                                $event
                                                              ) {
                                                                return _vm.decreaseRevision(
                                                                  index
                                                                )
                                                              },
                                                            },
                                                          }),
                                                        ]
                                                      )
                                                    }
                                                  ),
                                                  0
                                                ),
                                                _vm._v(" "),
                                                _c("b-form-invalid-feedback", [
                                                  _vm._v(
                                                    "\n                  " +
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      ) +
                                                      "\n                "
                                                  ),
                                                ]),
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
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              { attrs: { cols: "6", md: "6" } },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: _vm.$t("Doc Author"),
                                    rules: "required",
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "b-form-group",
                                              {
                                                attrs: {
                                                  label: _vm.$t("Doc Author"),
                                                  "label-for": "author",
                                                },
                                              },
                                              [
                                                _c("b-form-input", {
                                                  attrs: {
                                                    trim: "",
                                                    placeholder:
                                                      _vm.$t("Doc Author"),
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                  },
                                                  model: {
                                                    value: _vm.formData.author,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.formData,
                                                        "author",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "formData.author",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c("b-form-invalid-feedback", [
                                                  _vm._v(
                                                    "\n                  " +
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      ) +
                                                      "\n                "
                                                  ),
                                                ]),
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
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              { attrs: { cols: "6", md: "6" } },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: _vm.$t("Status"),
                                    rules: "required",
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "b-form-group",
                                              {
                                                attrs: {
                                                  label: _vm.$t("Status"),
                                                  "label-for": "address",
                                                },
                                              },
                                              [
                                                _c("b-form-select", {
                                                  attrs: {
                                                    id: "type",
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                    options: [
                                                      "Published",
                                                      "Draft",
                                                    ],
                                                    placeholder:
                                                      _vm.$t("Status"),
                                                  },
                                                  model: {
                                                    value: _vm.formData.status,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.formData,
                                                        "status",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "formData.status",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c("b-form-invalid-feedback", [
                                                  _vm._v(
                                                    "\n                  " +
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      ) +
                                                      "\n                "
                                                  ),
                                                ]),
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
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              { attrs: { cols: "6", md: "6" } },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: _vm.$t("Approved By"),
                                    rules: "required",
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "b-form-group",
                                              {
                                                attrs: {
                                                  label: _vm.$t("Approved By"),
                                                  "label-for": "approved_by",
                                                },
                                              },
                                              [
                                                _c("b-form-input", {
                                                  attrs: {
                                                    trim: "",
                                                    placeholder:
                                                      _vm.$t("Approved By"),
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.formData.approved_by,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.formData,
                                                        "approved_by",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "formData.approved_by",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c("b-form-invalid-feedback", [
                                                  _vm._v(
                                                    "\n                  " +
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      ) +
                                                      "\n                "
                                                  ),
                                                ]),
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
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              { attrs: { cols: "6", md: "6" } },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: _vm.$t("Approved Date"),
                                    rules: "required",
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "b-form-group",
                                              {
                                                attrs: {
                                                  label:
                                                    _vm.$t("Approved Date"),
                                                  "label-for": "approved_date",
                                                },
                                              },
                                              [
                                                _c("b-form-input", {
                                                  attrs: {
                                                    type: "date",
                                                    placeholder:
                                                      _vm.$t("Approved Date"),
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.formData
                                                        .approved_date,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.formData,
                                                        "approved_date",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "formData.approved_date",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c("b-form-invalid-feedback", [
                                                  _vm._v(
                                                    "\n                  " +
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      ) +
                                                      "\n                "
                                                  ),
                                                ]),
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
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              { attrs: { cols: "12", md: "12" } },
                              [
                                _c("validation-provider", {
                                  attrs: { name: _vm.$t("Tags") },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "b-form-group",
                                              {
                                                attrs: {
                                                  label: _vm.$t("Tags"),
                                                  "label-for": "oname",
                                                },
                                              },
                                              [
                                                _c("v-select", {
                                                  attrs: {
                                                    getOptionLabel: function (
                                                      item
                                                    ) {
                                                      return item.name
                                                    },
                                                    placeholder: "Add tags",
                                                    options: _vm.tags.data,
                                                    multiple: "",
                                                  },
                                                  model: {
                                                    value: _vm.formData.tag_ids,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.formData,
                                                        "tag_ids",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "formData.tag_ids",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c("b-form-invalid-feedback", [
                                                  _vm._v(
                                                    "\n                  " +
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      ) +
                                                      "\n                "
                                                  ),
                                                ]),
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
                                }),
                              ],
                              1
                            ),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "b-row",
                          [
                            _c(
                              "b-col",
                              { staticClass: "editor", attrs: { cols: "12" } },
                              [
                                _c("ckeditor", {
                                  attrs: {
                                    editor: _vm.ClassicEditor,
                                    config: _vm.editorConfig,
                                  },
                                  model: {
                                    value: _vm.formData.content,
                                    callback: function ($$v) {
                                      _vm.$set(_vm.formData, "content", $$v)
                                    },
                                    expression: "formData.content",
                                  },
                                }),
                              ],
                              1
                            ),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex align-items-center justify-content-end mt-3",
                          },
                          [
                            _c(
                              "b-button",
                              { attrs: { variant: "primary", type: "submit" } },
                              [
                                _c("span", { staticClass: "text-nowrap" }, [
                                  _vm._v(_vm._s(_vm.$t("Submit"))),
                                ]),
                              ]
                            ),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                  ]
                },
              },
            ]),
          }),
        ],
        1
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=template&id=da5bad26&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/procedures/Index.vue?vue&type=template&id=da5bad26&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
    [
      _vm.addDocumentActive
        ? _c("addProcedure", {
            attrs: { "add-document-active": _vm.addDocumentActive },
            on: {
              "refetch-data": _vm.getDocuments,
              "update:addDocumentActive": function ($event) {
                _vm.addDocumentActive = $event
              },
              "update:add-document-active": function ($event) {
                _vm.addDocumentActive = $event
              },
            },
          })
        : _vm._e(),
      _vm._v(" "),
      _c("AddCategory", {
        attrs: { "is-add-category-active": _vm.isAddCategoryActive },
        on: {
          "update:isAddCategoryActive": function ($event) {
            _vm.isAddCategoryActive = $event
          },
          "update:is-add-category-active": function ($event) {
            _vm.isAddCategoryActive = $event
          },
        },
      }),
      _vm._v(" "),
      _c(
        "b-overlay",
        {
          attrs: {
            id: "overlay-background",
            variant: "transparent",
            rounded: "sm",
          },
        },
        [
          _c("b-card", [
            _c("div", { staticClass: "d-flex  w-100" }, [
              _c(
                "div",
                { staticClass: "w-100 d-flex", staticStyle: { gap: "5px" } },
                [
                  _c(
                    "v-select",
                    {
                      key: _vm.searchQuery.length,
                      ref: "searchSelectRef",
                      staticClass: "select-search",
                      staticStyle: { width: "100%" },
                      attrs: {
                        "model-value": _vm.searchQuery,
                        placeholder:
                          _vm.searchQuery !== ""
                            ? _vm.searchQuery
                            : "Search documents...",
                        getOptionLabel: function (item) {
                          return item.title
                        },
                        filterable: false,
                        options: _vm.formattedOptions,
                      },
                      on: { search: _vm.onSearch },
                      scopedSlots: _vm._u([
                        {
                          key: "no-options",
                          fn: function (ref) {
                            var search = ref.search
                            var searching = ref.searching
                            return [
                              searching
                                ? [
                                    _vm._v(
                                      "\n                        No results found for "
                                    ),
                                    _c("em", [_vm._v(_vm._s(search))]),
                                    _vm._v(".\n                      "),
                                  ]
                                : _c(
                                    "em",
                                    { staticStyle: { opacity: "0.5" } },
                                    [
                                      _vm._v(
                                        "Start typing to search for a documents."
                                      ),
                                    ]
                                  ),
                            ]
                          },
                        },
                        {
                          key: "option",
                          fn: function (ref) {
                            var documentsFlat = ref.documentsFlat
                            return _vm._l(documentsFlat, function (subItem) {
                              return _c(
                                "div",
                                {
                                  key: subItem.id,
                                  staticClass:
                                    "d-flex w-100 justify-content-between py-1",
                                  on: {
                                    click: function ($event) {
                                      return _vm.selectSearchDocument(
                                        subItem,
                                        subItem.docId
                                      )
                                    },
                                  },
                                },
                                [
                                  _c("div", {
                                    staticClass: "d-block text-truncate",
                                    staticStyle: { width: "300px" },
                                    domProps: {
                                      innerHTML: _vm._s(
                                        _vm.boldContent(subItem.title)
                                      ),
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    [
                                      subItem.title_hits > 0
                                        ? _c(
                                            "b-badge",
                                            {
                                              attrs: {
                                                pill: "",
                                                variant: "warning",
                                              },
                                            },
                                            [
                                              _vm._v(
                                                " " +
                                                  _vm._s(subItem.title_hits) +
                                                  " TREFF | TITTEL  "
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      subItem.content_hits > 0
                                        ? _c(
                                            "b-badge",
                                            {
                                              attrs: {
                                                pill: "",
                                                variant: "primary",
                                              },
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(subItem.content_hits) +
                                                  " TITTLE"
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                    ],
                                    1
                                  ),
                                ]
                              )
                            })
                          },
                        },
                      ]),
                    },
                    [
                      _c("template", { slot: "no-options" }, [
                        _vm._v(
                          "\n                      type to search documents...\n                    "
                        ),
                      ]),
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c("v-select", {
                    staticStyle: { width: "250px" },
                    attrs: {
                      getOptionLabel: function (item) {
                        return item.label
                      },
                      placeholder: "Filters: tags",
                      reduce: function (option) {
                        return option.value
                      },
                      options: _vm.tags.options,
                      multiple: "",
                    },
                    model: {
                      value: _vm.filters.tags,
                      callback: function ($$v) {
                        _vm.$set(_vm.filters, "tags", $$v)
                      },
                      expression: "filters.tags",
                    },
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "col-auto" },
                [
                  _c(
                    "b-button",
                    {
                      attrs: { variant: "primary" },
                      on: {
                        click: function ($event) {
                          return _vm.generatePDF(_vm.documentData)
                        },
                      },
                    },
                    [
                      _c("span", { staticClass: "text-nowrap" }, [
                        _vm._v(_vm._s(_vm.$t("Doc. reg"))),
                      ]),
                    ]
                  ),
                  _vm._v(" "),
                  _vm.isDocumentOpen
                    ? _c(
                        "b-button",
                        {
                          attrs: { variant: "primary" },
                          on: { click: _vm.editDocument },
                        },
                        [
                          _c("span", { staticClass: "text-nowrap" }, [
                            _vm._v(_vm._s(_vm.$t("Edit"))),
                          ]),
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isDocumentOpen
                    ? _c(
                        "b-button",
                        {
                          attrs: { variant: "danger" },
                          on: { click: _vm.deleteDocumentEntry },
                        },
                        [
                          _c("span", { staticClass: "text-nowrap" }, [
                            _vm._v(_vm._s(_vm.$t("Delete"))),
                          ]),
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "b-button",
                    {
                      attrs: { variant: "primary" },
                      on: {
                        click: function ($event) {
                          _vm.addDocumentActive = true
                        },
                      },
                    },
                    [
                      _c("span", { staticClass: "text-nowrap" }, [
                        _vm._v(_vm._s(_vm.$t("Add"))),
                      ]),
                    ]
                  ),
                ],
                1
              ),
            ]),
          ]),
        ],
        1
      ),
      _vm._v(" "),
      _vm.isDocumentOpen || _vm.isDocumentEdit
        ? _c(
            "div",
            { staticClass: "justify-content-end d-flex mb-1" },
            [
              _c(
                "b-button",
                {
                  directives: [
                    {
                      name: "b-toggle",
                      rawName: "v-b-toggle:my-collapse",
                      arg: "my-collapse",
                    },
                  ],
                  staticClass: "flat-primary",
                  attrs: { size: "sm" },
                },
                [
                  _c("span", { staticClass: "when-open" }, [
                    _vm._v(_vm._s(_vm.$t("Close"))),
                  ]),
                  _c("span", { staticClass: "when-closed" }, [
                    _vm._v(_vm._s(_vm.$t("Open"))),
                  ]),
                  _vm._v(" " + _vm._s(_vm.$t("Document Details")) + "\n    "),
                ]
              ),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c("div", [
        _c("div", [
          _c(
            "div",
            {
              staticClass: "split",
              class:
                !_vm.isDocumentOpen && !_vm.isDocumentEdit ? "show-gutter" : "",
            },
            [
              _c(
                "div",
                { attrs: { id: "split-0" } },
                [
                  _c("h3", [
                    _vm._v(
                      "\n            " +
                        _vm._s(_vm.$t("Table Of Contents")) +
                        "\n          "
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "b-card",
                    { staticStyle: { "min-height": "60vh" } },
                    [
                      _vm.processedDocumentsData.length > 0
                        ? _c(
                            "vue-perfect-scrollbar",
                            {
                              staticClass:
                                "indexing-table-scroller scroll-area",
                              attrs: { settings: _vm.perfectScrollbarSettings },
                            },
                            [
                              _c(
                                "ul",
                                { staticClass: "list-unstyled indexing-table" },
                                _vm._l(
                                  _vm.processedDocumentsData,
                                  function (document, key) {
                                    return _c(
                                      "li",
                                      { key: key + document.title },
                                      [
                                        _c("h4", [
                                          _c(
                                            "a",
                                            {
                                              staticClass:
                                                "d-block text-truncate",
                                              staticStyle: {
                                                "font-weight": "700",
                                                "font-size": "16px",
                                              },
                                            },
                                            [
                                              _vm._v(
                                                "\n                      " +
                                                  _vm._s(document.title) +
                                                  " \n                    "
                                              ),
                                            ]
                                          ),
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "ul",
                                          { staticClass: "list-unstyled" },
                                          _vm._l(
                                            document.documents,
                                            function (subDocument, subIndex) {
                                              return _c(
                                                "li",
                                                { key: subIndex },
                                                [
                                                  _c("h4", [
                                                    _c(
                                                      "a",
                                                      {
                                                        staticStyle: {
                                                          "font-weight": "700",
                                                          "font-size": "16px",
                                                        },
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                          " +
                                                            _vm._s(
                                                              subDocument.title
                                                            ) +
                                                            "\n                        "
                                                        ),
                                                      ]
                                                    ),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "ul",
                                                    {
                                                      staticClass:
                                                        "list-unstyled",
                                                    },
                                                    _vm._l(
                                                      subDocument.documents,
                                                      function (
                                                        subSubDocument,
                                                        subSubIndex
                                                      ) {
                                                        return _c(
                                                          "li",
                                                          { key: subSubIndex },
                                                          [
                                                            _c("h4", [
                                                              _c(
                                                                "a",
                                                                {
                                                                  staticClass:
                                                                    "d-block text-truncate",
                                                                  staticStyle: {
                                                                    "font-weight":
                                                                      "400",
                                                                    "font-size":
                                                                      "16px",
                                                                  },
                                                                  on: {
                                                                    click:
                                                                      function (
                                                                        $event
                                                                      ) {
                                                                        return _vm.getDocument(
                                                                          subSubDocument,
                                                                          subSubDocument.docId
                                                                        )
                                                                      },
                                                                  },
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                            " +
                                                                      _vm._s(
                                                                        subSubDocument.docId
                                                                      ) +
                                                                      "-" +
                                                                      _vm._s(
                                                                        subSubDocument.title
                                                                      ) +
                                                                      "\n                            "
                                                                  ),
                                                                ]
                                                              ),
                                                            ]),
                                                          ]
                                                        )
                                                      }
                                                    ),
                                                    0
                                                  ),
                                                ]
                                              )
                                            }
                                          ),
                                          0
                                        ),
                                      ]
                                    )
                                  }
                                ),
                                0
                              ),
                            ]
                          )
                        : _c("div", [
                            _vm._v("No Documents or Procedures found"),
                          ]),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { attrs: { id: "split-1" } },
                [
                  _c(
                    "b-tooltip",
                    {
                      attrs: { target: "tooltip-target-1", triggers: "hover" },
                    },
                    [
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.documentData.title) +
                          "\n          "
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "h3",
                    {
                      staticClass: "d-block text-truncate",
                      attrs: { id: "tooltip-target-1" },
                    },
                    [_vm._v(_vm._s(_vm.documentData.title))]
                  ),
                  _vm._v(" "),
                  _vm.isDocumentOpen
                    ? [
                        _c(
                          "b-card",
                          {
                            staticClass: "p-1 ck-content",
                            attrs: { "no-body": "" },
                          },
                          [
                            _vm.documentData.type == "Procedure"
                              ? _c("div", {
                                  domProps: {
                                    innerHTML: _vm._s(_vm.editorContent),
                                  },
                                })
                              : _vm._e(),
                            _vm._v(" "),
                            _c("div", {
                              domProps: {
                                innerHTML: _vm._s(
                                  _vm.highlightedContent(
                                    _vm.documentData.content
                                  )
                                ),
                              },
                            }),
                          ]
                        ),
                      ]
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isDocumentEdit && !_vm.isDocumentOpen
                    ? [
                        _vm.isDocumentEdit && !_vm.isDocumentOpen
                          ? _c("textarea", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.documentData.content,
                                  expression: "documentData.content",
                                },
                              ],
                              ref: "rteref",
                              staticStyle: { width: "100%" },
                              attrs: { id: "rteref" },
                              domProps: { value: _vm.documentData.content },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.documentData,
                                    "content",
                                    $event.target.value
                                  )
                                },
                              },
                            })
                          : _vm._e(),
                      ]
                    : _vm._e(),
                ],
                2
              ),
              _vm._v(" "),
              _c("div", { attrs: { id: "split-2" } }, [
                _c(
                  "div",
                  {},
                  [
                    _c(
                      "h3",
                      {
                        staticClass: "d-block text-truncate",
                        staticStyle: { opacity: "0" },
                      },
                      [
                        _vm._v(
                          "\n              " +
                            _vm._s(_vm.documentData.title) +
                            "\n            "
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "b-collapse",
                      { attrs: { id: "my-collapse", visible: "" } },
                      [
                        _vm.isDocumentEdit && !_vm.isDocumentOpen
                          ? _c(
                              "div",
                              [
                                _c("validation-observer", {
                                  ref: "refFormObserver",
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (ref) {
                                          var handleSubmit = ref.handleSubmit
                                          return [
                                            _c(
                                              "b-form",
                                              {
                                                on: {
                                                  submit: function ($event) {
                                                    $event.preventDefault()
                                                    return handleSubmit(
                                                      _vm.onSubmit
                                                    )
                                                  },
                                                  reset: function ($event) {
                                                    $event.preventDefault()
                                                    return _vm.resetForm($event)
                                                  },
                                                },
                                              },
                                              [
                                                _c(
                                                  "b-card",
                                                  {
                                                    staticClass: "p-1",
                                                    attrs: { "no-body": "" },
                                                  },
                                                  [
                                                    _c(
                                                      "b-row",
                                                      [
                                                        _c(
                                                          "b-col",
                                                          {
                                                            staticClass:
                                                              "justify-content-start d-flex",
                                                            attrs: { sm: "12" },
                                                          },
                                                          [
                                                            _c("i", {
                                                              staticClass:
                                                                "bi bi-x cursor-pointer",
                                                              staticStyle: {
                                                                "font-size":
                                                                  "20px",
                                                                height: "24px",
                                                              },
                                                              on: {
                                                                click:
                                                                  _vm.cancelEditDocument,
                                                              },
                                                            }),
                                                          ]
                                                        ),
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    _vm.documentData
                                                      ? _c(
                                                          "b-row",
                                                          [
                                                            _c(
                                                              "b-col",
                                                              {
                                                                staticClass:
                                                                  "mb-2 justify-content-around d-flex",
                                                                attrs: {
                                                                  sm: "12",
                                                                },
                                                              },
                                                              [
                                                                _c("label", [
                                                                  _c("input", {
                                                                    directives:
                                                                      [
                                                                        {
                                                                          name: "model",
                                                                          rawName:
                                                                            "v-model",
                                                                          value:
                                                                            _vm
                                                                              .documentData
                                                                              .type,
                                                                          expression:
                                                                            "documentData.type",
                                                                        },
                                                                      ],
                                                                    attrs: {
                                                                      value:
                                                                        "Procedure",
                                                                      type: "radio",
                                                                      name: "type",
                                                                      id: "",
                                                                    },
                                                                    domProps: {
                                                                      checked:
                                                                        _vm
                                                                          .documentData
                                                                          .type ==
                                                                        "Procedure",
                                                                      checked:
                                                                        _vm._q(
                                                                          _vm
                                                                            .documentData
                                                                            .type,
                                                                          "Procedure"
                                                                        ),
                                                                    },
                                                                    on: {
                                                                      change:
                                                                        function (
                                                                          $event
                                                                        ) {
                                                                          return _vm.$set(
                                                                            _vm.documentData,
                                                                            "type",
                                                                            "Procedure"
                                                                          )
                                                                        },
                                                                    },
                                                                  }),
                                                                  _vm._v(
                                                                    "  " +
                                                                      _vm._s(
                                                                        _vm.$t(
                                                                          "Procedure"
                                                                        )
                                                                      )
                                                                  ),
                                                                ]),
                                                                _vm._v(" "),
                                                                _c("label", [
                                                                  _c("input", {
                                                                    directives:
                                                                      [
                                                                        {
                                                                          name: "model",
                                                                          rawName:
                                                                            "v-model",
                                                                          value:
                                                                            _vm
                                                                              .documentData
                                                                              .type,
                                                                          expression:
                                                                            "documentData.type",
                                                                        },
                                                                      ],
                                                                    attrs: {
                                                                      value:
                                                                        "Document",
                                                                      type: "radio",
                                                                      name: "type",
                                                                      id: "",
                                                                    },
                                                                    domProps: {
                                                                      checked:
                                                                        _vm
                                                                          .documentData
                                                                          .type ==
                                                                        "Document",
                                                                      checked:
                                                                        _vm._q(
                                                                          _vm
                                                                            .documentData
                                                                            .type,
                                                                          "Document"
                                                                        ),
                                                                    },
                                                                    on: {
                                                                      change:
                                                                        function (
                                                                          $event
                                                                        ) {
                                                                          return _vm.$set(
                                                                            _vm.documentData,
                                                                            "type",
                                                                            "Document"
                                                                          )
                                                                        },
                                                                    },
                                                                  }),
                                                                  _vm._v(
                                                                    "  " +
                                                                      _vm._s(
                                                                        _vm.$t(
                                                                          "Document"
                                                                        )
                                                                      )
                                                                  ),
                                                                ]),
                                                              ]
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "b-col",
                                                              {
                                                                attrs: {
                                                                  cols: "12",
                                                                  md: "12",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "validation-provider",
                                                                  {
                                                                    attrs: {
                                                                      name: _vm.$t(
                                                                        "Document Title"
                                                                      ),
                                                                      rules:
                                                                        "required",
                                                                    },
                                                                    scopedSlots:
                                                                      _vm._u(
                                                                        [
                                                                          {
                                                                            key: "default",
                                                                            fn: function (
                                                                              validationContext
                                                                            ) {
                                                                              return [
                                                                                _c(
                                                                                  "b-form-group",
                                                                                  {
                                                                                    attrs:
                                                                                      {
                                                                                        label:
                                                                                          _vm.$t(
                                                                                            "Document Title"
                                                                                          ),
                                                                                        "label-for":
                                                                                          "oname",
                                                                                      },
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "b-form-input",
                                                                                      {
                                                                                        attrs:
                                                                                          {
                                                                                            placeholder:
                                                                                              _vm.$t(
                                                                                                "Document Title"
                                                                                              ),
                                                                                            state:
                                                                                              _vm.getValidationState(
                                                                                                validationContext
                                                                                              ),
                                                                                            trim: "",
                                                                                          },
                                                                                        model:
                                                                                          {
                                                                                            value:
                                                                                              _vm
                                                                                                .documentData
                                                                                                .title,
                                                                                            callback:
                                                                                              function (
                                                                                                $$v
                                                                                              ) {
                                                                                                _vm.$set(
                                                                                                  _vm.documentData,
                                                                                                  "title",
                                                                                                  $$v
                                                                                                )
                                                                                              },
                                                                                            expression:
                                                                                              "documentData.title",
                                                                                          },
                                                                                      }
                                                                                    ),
                                                                                    _vm._v(
                                                                                      " "
                                                                                    ),
                                                                                    _c(
                                                                                      "b-form-invalid-feedback",
                                                                                      [
                                                                                        _vm._v(
                                                                                          "\n                              " +
                                                                                            _vm._s(
                                                                                              validationContext
                                                                                                .errors[0]
                                                                                            ) +
                                                                                            "\n                            "
                                                                                        ),
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
                                                                  }
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "b-col",
                                                              {
                                                                attrs: {
                                                                  cols: "6",
                                                                  md: "6",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "validation-provider",
                                                                  {
                                                                    attrs: {
                                                                      name: _vm.$t(
                                                                        "Category"
                                                                      ),
                                                                      rules:
                                                                        "required",
                                                                    },
                                                                    scopedSlots:
                                                                      _vm._u(
                                                                        [
                                                                          {
                                                                            key: "default",
                                                                            fn: function (
                                                                              validationContext
                                                                            ) {
                                                                              return [
                                                                                _c(
                                                                                  "b-form-group",
                                                                                  {
                                                                                    attrs:
                                                                                      {
                                                                                        label:
                                                                                          _vm.$t(
                                                                                            "Category"
                                                                                          ),
                                                                                        "label-for":
                                                                                          "cname",
                                                                                      },
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "b-form-select",
                                                                                      {
                                                                                        attrs:
                                                                                          {
                                                                                            id: "category",
                                                                                            state:
                                                                                              _vm.getValidationState(
                                                                                                validationContext
                                                                                              ),
                                                                                            trim: "",
                                                                                            "value-field":
                                                                                              "id",
                                                                                            "text-field":
                                                                                              "name",
                                                                                            options:
                                                                                              _vm.categories,
                                                                                            placeholder:
                                                                                              _vm.$t(
                                                                                                "Category"
                                                                                              ),
                                                                                          },
                                                                                        on: {
                                                                                          change:
                                                                                            _vm.showSubCategories,
                                                                                        },
                                                                                        model:
                                                                                          {
                                                                                            value:
                                                                                              _vm
                                                                                                .documentData
                                                                                                .category_id,
                                                                                            callback:
                                                                                              function (
                                                                                                $$v
                                                                                              ) {
                                                                                                _vm.$set(
                                                                                                  _vm.documentData,
                                                                                                  "category_id",
                                                                                                  $$v
                                                                                                )
                                                                                              },
                                                                                            expression:
                                                                                              "documentData.category_id",
                                                                                          },
                                                                                      }
                                                                                    ),
                                                                                    _vm._v(
                                                                                      " "
                                                                                    ),
                                                                                    _c(
                                                                                      "b-form-invalid-feedback",
                                                                                      [
                                                                                        _vm._v(
                                                                                          "\n                  " +
                                                                                            _vm._s(
                                                                                              validationContext
                                                                                                .errors[0]
                                                                                            ) +
                                                                                            "\n                "
                                                                                        ),
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
                                                                  }
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "b-col",
                                                              {
                                                                attrs: {
                                                                  cols: "6",
                                                                  md: "6",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "validation-provider",
                                                                  {
                                                                    attrs: {
                                                                      name: _vm.$t(
                                                                        "SubCategory"
                                                                      ),
                                                                      rules:
                                                                        "required",
                                                                    },
                                                                    scopedSlots:
                                                                      _vm._u(
                                                                        [
                                                                          {
                                                                            key: "default",
                                                                            fn: function (
                                                                              validationContext
                                                                            ) {
                                                                              return [
                                                                                _c(
                                                                                  "b-form-group",
                                                                                  {
                                                                                    attrs:
                                                                                      {
                                                                                        label:
                                                                                          _vm.$t(
                                                                                            "SubCategory"
                                                                                          ),
                                                                                        "label-for":
                                                                                          "address",
                                                                                      },
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "b-form-select",
                                                                                      {
                                                                                        attrs:
                                                                                          {
                                                                                            id: "subcategory",
                                                                                            state:
                                                                                              _vm.getValidationState(
                                                                                                validationContext
                                                                                              ),
                                                                                            trim: "",
                                                                                            "value-field":
                                                                                              "id",
                                                                                            "text-field":
                                                                                              "name",
                                                                                            options:
                                                                                              _vm.subcategories,
                                                                                            placeholder:
                                                                                              _vm.$t(
                                                                                                "SubCategory"
                                                                                              ),
                                                                                          },
                                                                                        model:
                                                                                          {
                                                                                            value:
                                                                                              _vm
                                                                                                .documentData
                                                                                                .subcategory_id,
                                                                                            callback:
                                                                                              function (
                                                                                                $$v
                                                                                              ) {
                                                                                                _vm.$set(
                                                                                                  _vm.documentData,
                                                                                                  "subcategory_id",
                                                                                                  $$v
                                                                                                )
                                                                                              },
                                                                                            expression:
                                                                                              "documentData.subcategory_id",
                                                                                          },
                                                                                      }
                                                                                    ),
                                                                                    _vm._v(
                                                                                      " "
                                                                                    ),
                                                                                    _c(
                                                                                      "b-form-invalid-feedback",
                                                                                      [
                                                                                        _vm._v(
                                                                                          "\n                  " +
                                                                                            _vm._s(
                                                                                              validationContext
                                                                                                .errors[0]
                                                                                            ) +
                                                                                            "\n                "
                                                                                        ),
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
                                                                  }
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "b-col",
                                                              {
                                                                attrs: {
                                                                  cols: "6",
                                                                  md: "6",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "validation-provider",
                                                                  {
                                                                    attrs: {
                                                                      name: _vm.$t(
                                                                        "Created Date"
                                                                      ),
                                                                    },
                                                                    scopedSlots:
                                                                      _vm._u(
                                                                        [
                                                                          {
                                                                            key: "default",
                                                                            fn: function (
                                                                              validationContext
                                                                            ) {
                                                                              return [
                                                                                _c(
                                                                                  "b-form-group",
                                                                                  {
                                                                                    attrs:
                                                                                      {
                                                                                        label:
                                                                                          _vm.$t(
                                                                                            "Created Date"
                                                                                          ),
                                                                                        "label-for":
                                                                                          "created_date",
                                                                                      },
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "b-form-input",
                                                                                      {
                                                                                        attrs:
                                                                                          {
                                                                                            type: "date",
                                                                                            placeholder:
                                                                                              "",
                                                                                            trim: "",
                                                                                            state:
                                                                                              _vm.getValidationState(
                                                                                                validationContext
                                                                                              ),
                                                                                          },
                                                                                        model:
                                                                                          {
                                                                                            value:
                                                                                              _vm
                                                                                                .documentData
                                                                                                .created_date,
                                                                                            callback:
                                                                                              function (
                                                                                                $$v
                                                                                              ) {
                                                                                                _vm.$set(
                                                                                                  _vm.documentData,
                                                                                                  "created_date",
                                                                                                  $$v
                                                                                                )
                                                                                              },
                                                                                            expression:
                                                                                              "documentData.created_date",
                                                                                          },
                                                                                      }
                                                                                    ),
                                                                                    _vm._v(
                                                                                      " "
                                                                                    ),
                                                                                    _c(
                                                                                      "b-form-invalid-feedback",
                                                                                      [
                                                                                        _vm._v(
                                                                                          "\n                              " +
                                                                                            _vm._s(
                                                                                              validationContext
                                                                                                .errors[0]
                                                                                            ) +
                                                                                            "\n                            "
                                                                                        ),
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
                                                                  }
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "b-col",
                                                              {
                                                                attrs: {
                                                                  cols: "6",
                                                                  md: "6",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "validation-provider",
                                                                  {
                                                                    attrs: {
                                                                      name: _vm.$t(
                                                                        "Doc. no"
                                                                      ),
                                                                    },
                                                                    scopedSlots:
                                                                      _vm._u(
                                                                        [
                                                                          {
                                                                            key: "default",
                                                                            fn: function (
                                                                              validationContext
                                                                            ) {
                                                                              return [
                                                                                _c(
                                                                                  "b-form-group",
                                                                                  {
                                                                                    attrs:
                                                                                      {
                                                                                        label:
                                                                                          _vm.$t(
                                                                                            "Doc. no"
                                                                                          ),
                                                                                        "label-for":
                                                                                          "registered",
                                                                                      },
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "b-form-input",
                                                                                      {
                                                                                        attrs:
                                                                                          {
                                                                                            trim: "",
                                                                                            placeholder:
                                                                                              _vm.$t(
                                                                                                "Doc. no"
                                                                                              ),
                                                                                            state:
                                                                                              _vm.getValidationState(
                                                                                                validationContext
                                                                                              ),
                                                                                          },
                                                                                        model:
                                                                                          {
                                                                                            value:
                                                                                              _vm
                                                                                                .documentData
                                                                                                .document_number,
                                                                                            callback:
                                                                                              function (
                                                                                                $$v
                                                                                              ) {
                                                                                                _vm.$set(
                                                                                                  _vm.documentData,
                                                                                                  "document_number",
                                                                                                  $$v
                                                                                                )
                                                                                              },
                                                                                            expression:
                                                                                              "documentData.document_number",
                                                                                          },
                                                                                      }
                                                                                    ),
                                                                                    _vm._v(
                                                                                      " "
                                                                                    ),
                                                                                    _c(
                                                                                      "b-form-invalid-feedback",
                                                                                      [
                                                                                        _vm._v(
                                                                                          "\n                              " +
                                                                                            _vm._s(
                                                                                              validationContext
                                                                                                .errors[0]
                                                                                            ) +
                                                                                            "\n                            "
                                                                                        ),
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
                                                                  }
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "b-col",
                                                              {
                                                                attrs: {
                                                                  cols: "6",
                                                                  md: "6",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "validation-provider",
                                                                  {
                                                                    attrs: {
                                                                      name: _vm.$t(
                                                                        "Revised Date"
                                                                      ),
                                                                    },
                                                                    scopedSlots:
                                                                      _vm._u(
                                                                        [
                                                                          {
                                                                            key: "default",
                                                                            fn: function (
                                                                              validationContext
                                                                            ) {
                                                                              return [
                                                                                _c(
                                                                                  "b-form-group",
                                                                                  {
                                                                                    attrs:
                                                                                      {
                                                                                        label:
                                                                                          _vm.$t(
                                                                                            "Revised Date"
                                                                                          ),
                                                                                        "label-for":
                                                                                          "revised_date",
                                                                                      },
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "b-form-input",
                                                                                      {
                                                                                        attrs:
                                                                                          {
                                                                                            type: "date",
                                                                                            trim: "",
                                                                                            placeholder:
                                                                                              _vm.$t(
                                                                                                "Revised Date"
                                                                                              ),
                                                                                            state:
                                                                                              _vm.getValidationState(
                                                                                                validationContext
                                                                                              ),
                                                                                          },
                                                                                        model:
                                                                                          {
                                                                                            value:
                                                                                              _vm
                                                                                                .documentData
                                                                                                .revised_date,
                                                                                            callback:
                                                                                              function (
                                                                                                $$v
                                                                                              ) {
                                                                                                _vm.$set(
                                                                                                  _vm.documentData,
                                                                                                  "revised_date",
                                                                                                  $$v
                                                                                                )
                                                                                              },
                                                                                            expression:
                                                                                              "documentData.revised_date",
                                                                                          },
                                                                                      }
                                                                                    ),
                                                                                    _vm._v(
                                                                                      " "
                                                                                    ),
                                                                                    _c(
                                                                                      "b-form-invalid-feedback",
                                                                                      [
                                                                                        _vm._v(
                                                                                          "\n                              " +
                                                                                            _vm._s(
                                                                                              validationContext
                                                                                                .errors[0]
                                                                                            ) +
                                                                                            "\n                            "
                                                                                        ),
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
                                                                  }
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "b-col",
                                                              {
                                                                attrs: {
                                                                  cols: "6",
                                                                  md: "6",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "validation-provider",
                                                                  {
                                                                    attrs: {
                                                                      name: _vm.$t(
                                                                        "Revision No."
                                                                      ),
                                                                    },
                                                                    scopedSlots:
                                                                      _vm._u(
                                                                        [
                                                                          {
                                                                            key: "default",
                                                                            fn: function (
                                                                              validationContext
                                                                            ) {
                                                                              return [
                                                                                _c(
                                                                                  "b-form-group",
                                                                                  {
                                                                                    attrs:
                                                                                      {
                                                                                        label:
                                                                                          _vm.$t(
                                                                                            "Revision No."
                                                                                          ),
                                                                                        "label-for":
                                                                                          "revision_number",
                                                                                      },
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "div",
                                                                                      {
                                                                                        staticClass:
                                                                                          "d-flex",
                                                                                        staticStyle:
                                                                                          {
                                                                                            gap: "10px",
                                                                                          },
                                                                                      },
                                                                                      _vm._l(
                                                                                        _vm.digits,
                                                                                        function (
                                                                                          digit,
                                                                                          index
                                                                                        ) {
                                                                                          return _c(
                                                                                            "div",
                                                                                            {
                                                                                              key: index,
                                                                                              staticClass:
                                                                                                "position-realtive d-flex justify-items-center align-items-center flex-column",
                                                                                            },
                                                                                            [
                                                                                              _c(
                                                                                                "i",
                                                                                                {
                                                                                                  staticClass:
                                                                                                    "bi bi-caret-up-fill cursor-pointer",
                                                                                                  staticStyle:
                                                                                                    {
                                                                                                      "font-size":
                                                                                                        "20px",
                                                                                                      height:
                                                                                                        "24px",
                                                                                                    },
                                                                                                  on: {
                                                                                                    click:
                                                                                                      function (
                                                                                                        $event
                                                                                                      ) {
                                                                                                        return _vm.increaseRevision(
                                                                                                          index
                                                                                                        )
                                                                                                      },
                                                                                                  },
                                                                                                }
                                                                                              ),
                                                                                              _vm._v(
                                                                                                " "
                                                                                              ),
                                                                                              _c(
                                                                                                "div",
                                                                                                {
                                                                                                  staticClass:
                                                                                                    "d-flex align-items-end position-relative",
                                                                                                },
                                                                                                [
                                                                                                  _c(
                                                                                                    "b-form-input",
                                                                                                    {
                                                                                                      staticStyle:
                                                                                                        {
                                                                                                          width:
                                                                                                            "30px",
                                                                                                          padding:
                                                                                                            "0px 8px",
                                                                                                          "text-align":
                                                                                                            "center",
                                                                                                        },
                                                                                                      attrs:
                                                                                                        {
                                                                                                          type: "tel",
                                                                                                          maxlength:
                                                                                                            "1",
                                                                                                        },
                                                                                                      model:
                                                                                                        {
                                                                                                          value:
                                                                                                            _vm
                                                                                                              .digits[
                                                                                                              index
                                                                                                            ],
                                                                                                          callback:
                                                                                                            function (
                                                                                                              $$v
                                                                                                            ) {
                                                                                                              _vm.$set(
                                                                                                                _vm.digits,
                                                                                                                index,
                                                                                                                $$v
                                                                                                              )
                                                                                                            },
                                                                                                          expression:
                                                                                                            "digits[index]",
                                                                                                        },
                                                                                                    }
                                                                                                  ),
                                                                                                  _vm._v(
                                                                                                    " "
                                                                                                  ),
                                                                                                  index +
                                                                                                    1 <
                                                                                                  _vm
                                                                                                    .digits
                                                                                                    .length
                                                                                                    ? _c(
                                                                                                        "span",
                                                                                                        {
                                                                                                          staticClass:
                                                                                                            "revision_dot",
                                                                                                        }
                                                                                                      )
                                                                                                    : _vm._e(),
                                                                                                ],
                                                                                                1
                                                                                              ),
                                                                                              _vm._v(
                                                                                                " "
                                                                                              ),
                                                                                              _c(
                                                                                                "i",
                                                                                                {
                                                                                                  staticClass:
                                                                                                    "bi bi-caret-down-fill cursor-pointer",
                                                                                                  staticStyle:
                                                                                                    {
                                                                                                      "font-size":
                                                                                                        "20px",
                                                                                                      height:
                                                                                                        "20px",
                                                                                                    },
                                                                                                  on: {
                                                                                                    click:
                                                                                                      function (
                                                                                                        $event
                                                                                                      ) {
                                                                                                        return _vm.decreaseRevision(
                                                                                                          index
                                                                                                        )
                                                                                                      },
                                                                                                  },
                                                                                                }
                                                                                              ),
                                                                                            ]
                                                                                          )
                                                                                        }
                                                                                      ),
                                                                                      0
                                                                                    ),
                                                                                    _vm._v(
                                                                                      " "
                                                                                    ),
                                                                                    _c(
                                                                                      "b-form-invalid-feedback",
                                                                                      [
                                                                                        _vm._v(
                                                                                          "\n                              " +
                                                                                            _vm._s(
                                                                                              validationContext
                                                                                                .errors[0]
                                                                                            ) +
                                                                                            "\n                            "
                                                                                        ),
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
                                                                  }
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "b-col",
                                                              {
                                                                attrs: {
                                                                  cols: "6",
                                                                  md: "6",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "validation-provider",
                                                                  {
                                                                    attrs: {
                                                                      name: _vm.$t(
                                                                        "Doc Author"
                                                                      ),
                                                                    },
                                                                    scopedSlots:
                                                                      _vm._u(
                                                                        [
                                                                          {
                                                                            key: "default",
                                                                            fn: function (
                                                                              validationContext
                                                                            ) {
                                                                              return [
                                                                                _c(
                                                                                  "b-form-group",
                                                                                  {
                                                                                    attrs:
                                                                                      {
                                                                                        label:
                                                                                          _vm.$t(
                                                                                            "Doc Author"
                                                                                          ),
                                                                                        "label-for":
                                                                                          "author",
                                                                                      },
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "b-form-input",
                                                                                      {
                                                                                        attrs:
                                                                                          {
                                                                                            trim: "",
                                                                                            placeholder:
                                                                                              _vm.$t(
                                                                                                "Doc Author"
                                                                                              ),
                                                                                            state:
                                                                                              _vm.getValidationState(
                                                                                                validationContext
                                                                                              ),
                                                                                          },
                                                                                        model:
                                                                                          {
                                                                                            value:
                                                                                              _vm
                                                                                                .documentData
                                                                                                .author,
                                                                                            callback:
                                                                                              function (
                                                                                                $$v
                                                                                              ) {
                                                                                                _vm.$set(
                                                                                                  _vm.documentData,
                                                                                                  "author",
                                                                                                  $$v
                                                                                                )
                                                                                              },
                                                                                            expression:
                                                                                              "documentData.author",
                                                                                          },
                                                                                      }
                                                                                    ),
                                                                                    _vm._v(
                                                                                      " "
                                                                                    ),
                                                                                    _c(
                                                                                      "b-form-invalid-feedback",
                                                                                      [
                                                                                        _vm._v(
                                                                                          "\n                              " +
                                                                                            _vm._s(
                                                                                              validationContext
                                                                                                .errors[0]
                                                                                            ) +
                                                                                            "\n                            "
                                                                                        ),
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
                                                                  }
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "b-col",
                                                              {
                                                                attrs: {
                                                                  cols: "6",
                                                                  md: "6",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "validation-provider",
                                                                  {
                                                                    attrs: {
                                                                      name: _vm.$t(
                                                                        "Status"
                                                                      ),
                                                                      rules:
                                                                        "required",
                                                                    },
                                                                    scopedSlots:
                                                                      _vm._u(
                                                                        [
                                                                          {
                                                                            key: "default",
                                                                            fn: function (
                                                                              validationContext
                                                                            ) {
                                                                              return [
                                                                                _c(
                                                                                  "b-form-group",
                                                                                  {
                                                                                    attrs:
                                                                                      {
                                                                                        label:
                                                                                          _vm.$t(
                                                                                            "Status"
                                                                                          ),
                                                                                        "label-for":
                                                                                          "address",
                                                                                      },
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "b-form-select",
                                                                                      {
                                                                                        attrs:
                                                                                          {
                                                                                            id: "type",
                                                                                            state:
                                                                                              _vm.getValidationState(
                                                                                                validationContext
                                                                                              ),
                                                                                            options:
                                                                                              [
                                                                                                "Published",
                                                                                                "Draft",
                                                                                              ],
                                                                                            placeholder:
                                                                                              _vm.$t(
                                                                                                "Status"
                                                                                              ),
                                                                                          },
                                                                                        model:
                                                                                          {
                                                                                            value:
                                                                                              _vm
                                                                                                .documentData
                                                                                                .type,
                                                                                            callback:
                                                                                              function (
                                                                                                $$v
                                                                                              ) {
                                                                                                _vm.$set(
                                                                                                  _vm.documentData,
                                                                                                  "type",
                                                                                                  $$v
                                                                                                )
                                                                                              },
                                                                                            expression:
                                                                                              "documentData.type",
                                                                                          },
                                                                                      }
                                                                                    ),
                                                                                    _vm._v(
                                                                                      " "
                                                                                    ),
                                                                                    _c(
                                                                                      "b-form-invalid-feedback",
                                                                                      [
                                                                                        _vm._v(
                                                                                          "\n                              " +
                                                                                            _vm._s(
                                                                                              validationContext
                                                                                                .errors[0]
                                                                                            ) +
                                                                                            "\n                            "
                                                                                        ),
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
                                                                  }
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "b-col",
                                                              {
                                                                attrs: {
                                                                  cols: "6",
                                                                  md: "6",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "validation-provider",
                                                                  {
                                                                    attrs: {
                                                                      name: _vm.$t(
                                                                        "Approved Date"
                                                                      ),
                                                                    },
                                                                    scopedSlots:
                                                                      _vm._u(
                                                                        [
                                                                          {
                                                                            key: "default",
                                                                            fn: function (
                                                                              validationContext
                                                                            ) {
                                                                              return [
                                                                                _c(
                                                                                  "b-form-group",
                                                                                  {
                                                                                    attrs:
                                                                                      {
                                                                                        label:
                                                                                          _vm.$t(
                                                                                            "Approved Date"
                                                                                          ),
                                                                                        "label-for":
                                                                                          "approved_date",
                                                                                      },
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "b-form-input",
                                                                                      {
                                                                                        attrs:
                                                                                          {
                                                                                            type: "date",
                                                                                            placeholder:
                                                                                              _vm.$t(
                                                                                                "Approved Date"
                                                                                              ),
                                                                                            state:
                                                                                              _vm.getValidationState(
                                                                                                validationContext
                                                                                              ),
                                                                                          },
                                                                                        model:
                                                                                          {
                                                                                            value:
                                                                                              _vm
                                                                                                .documentData
                                                                                                .approved_date,
                                                                                            callback:
                                                                                              function (
                                                                                                $$v
                                                                                              ) {
                                                                                                _vm.$set(
                                                                                                  _vm.documentData,
                                                                                                  "approved_date",
                                                                                                  $$v
                                                                                                )
                                                                                              },
                                                                                            expression:
                                                                                              "documentData.approved_date",
                                                                                          },
                                                                                      }
                                                                                    ),
                                                                                    _vm._v(
                                                                                      " "
                                                                                    ),
                                                                                    _c(
                                                                                      "b-form-invalid-feedback",
                                                                                      [
                                                                                        _vm._v(
                                                                                          "\n                              " +
                                                                                            _vm._s(
                                                                                              validationContext
                                                                                                .errors[0]
                                                                                            ) +
                                                                                            "\n                            "
                                                                                        ),
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
                                                                  }
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "b-col",
                                                              {
                                                                attrs: {
                                                                  cols: "6",
                                                                  md: "6",
                                                                },
                                                              },
                                                              [
                                                                _c(
                                                                  "validation-provider",
                                                                  {
                                                                    attrs: {
                                                                      name: _vm.$t(
                                                                        "Approved By"
                                                                      ),
                                                                    },
                                                                    scopedSlots:
                                                                      _vm._u(
                                                                        [
                                                                          {
                                                                            key: "default",
                                                                            fn: function (
                                                                              validationContext
                                                                            ) {
                                                                              return [
                                                                                _c(
                                                                                  "b-form-group",
                                                                                  {
                                                                                    attrs:
                                                                                      {
                                                                                        label:
                                                                                          _vm.$t(
                                                                                            "Approved By"
                                                                                          ),
                                                                                        "label-for":
                                                                                          "approved_by",
                                                                                      },
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "b-form-input",
                                                                                      {
                                                                                        attrs:
                                                                                          {
                                                                                            trim: "",
                                                                                            placeholder:
                                                                                              _vm.$t(
                                                                                                "Approved By"
                                                                                              ),
                                                                                            state:
                                                                                              _vm.getValidationState(
                                                                                                validationContext
                                                                                              ),
                                                                                          },
                                                                                        model:
                                                                                          {
                                                                                            value:
                                                                                              _vm
                                                                                                .documentData
                                                                                                .approved_by,
                                                                                            callback:
                                                                                              function (
                                                                                                $$v
                                                                                              ) {
                                                                                                _vm.$set(
                                                                                                  _vm.documentData,
                                                                                                  "approved_by",
                                                                                                  $$v
                                                                                                )
                                                                                              },
                                                                                            expression:
                                                                                              "documentData.approved_by",
                                                                                          },
                                                                                      }
                                                                                    ),
                                                                                    _vm._v(
                                                                                      " "
                                                                                    ),
                                                                                    _c(
                                                                                      "b-form-invalid-feedback",
                                                                                      [
                                                                                        _vm._v(
                                                                                          "\n                              " +
                                                                                            _vm._s(
                                                                                              validationContext
                                                                                                .errors[0]
                                                                                            ) +
                                                                                            "\n                            "
                                                                                        ),
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
                                                                  }
                                                                ),
                                                              ],
                                                              1
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "b-col",
                                                              {
                                                                attrs: {
                                                                  cols: "12",
                                                                  md: "12",
                                                                },
                                                              },
                                                              [
                                                                _c("p", [
                                                                  _vm._v(
                                                                    "Tags:"
                                                                  ),
                                                                ]),
                                                                _vm._v(" "),
                                                                _c("v-select", {
                                                                  attrs: {
                                                                    getOptionLabel:
                                                                      function (
                                                                        item
                                                                      ) {
                                                                        return item.name
                                                                      },
                                                                    placeholder:
                                                                      "Add tags",
                                                                    options:
                                                                      _vm.tags
                                                                        .data,
                                                                    multiple:
                                                                      "",
                                                                  },
                                                                  model: {
                                                                    value:
                                                                      _vm
                                                                        .documentData
                                                                        .tag_ids,
                                                                    callback:
                                                                      function (
                                                                        $$v
                                                                      ) {
                                                                        _vm.$set(
                                                                          _vm.documentData,
                                                                          "tag_ids",
                                                                          $$v
                                                                        )
                                                                      },
                                                                    expression:
                                                                      "documentData.tag_ids",
                                                                  },
                                                                }),
                                                              ],
                                                              1
                                                            ),
                                                          ],
                                                          1
                                                        )
                                                      : _vm._e(),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "mt-2 justify-content-end d-flex",
                                                      },
                                                      [
                                                        _c(
                                                          "b-button",
                                                          {
                                                            staticClass: "mb-1",
                                                            attrs: {
                                                              variant:
                                                                "primary",
                                                            },
                                                          },
                                                          [
                                                            _c(
                                                              "span",
                                                              {
                                                                staticClass:
                                                                  "text-nowrap",
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "Send for approval"
                                                                ),
                                                              ]
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "b-button",
                                                          {
                                                            staticClass:
                                                              "mb-1 ml-2",
                                                            attrs: {
                                                              variant:
                                                                "primary",
                                                              type: "submit",
                                                            },
                                                          },
                                                          [
                                                            _c(
                                                              "span",
                                                              {
                                                                staticClass:
                                                                  "text-nowrap",
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "Update Document"
                                                                ),
                                                              ]
                                                            ),
                                                          ]
                                                        ),
                                                      ],
                                                      1
                                                    ),
                                                  ],
                                                  1
                                                ),
                                              ],
                                              1
                                            ),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    false,
                                    2562765836
                                  ),
                                }),
                              ],
                              1
                            )
                          : _vm._e(),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "b-collapse",
                      { attrs: { id: "my-collapse", visible: "" } },
                      [
                        _vm.isDocumentOpen && !_vm.isDocumentEdit
                          ? _c(
                              "b-card",
                              { staticClass: "p-1", attrs: { "no-body": "" } },
                              [
                                _c(
                                  "b-row",
                                  [
                                    _c(
                                      "b-col",
                                      {
                                        staticClass:
                                          "mb-2 justify-content-around d-flex",
                                        attrs: { sm: "12" },
                                      },
                                      [
                                        _c("label", [
                                          _c("input", {
                                            attrs: {
                                              type: "radio",
                                              name: "type",
                                              disabled: "",
                                              id: "",
                                            },
                                            domProps: {
                                              checked:
                                                _vm.documentData.type ==
                                                "Procedure",
                                            },
                                          }),
                                          _vm._v(
                                            "  " + _vm._s(_vm.$t("Procedure"))
                                          ),
                                        ]),
                                        _vm._v(" "),
                                        _c("label", [
                                          _c("input", {
                                            attrs: {
                                              type: "radio",
                                              name: "type",
                                              disabled: "",
                                              id: "",
                                            },
                                            domProps: {
                                              checked:
                                                _vm.documentData.type ==
                                                "Document",
                                            },
                                          }),
                                          _vm._v(
                                            "  " + _vm._s(_vm.$t("Document"))
                                          ),
                                        ]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      {
                                        staticClass: "mb-2",
                                        attrs: { sm: "12" },
                                      },
                                      [
                                        _c("h6", [
                                          _c("strong", [
                                            _vm._v(
                                              _vm._s(_vm.$t("Document Title"))
                                            ),
                                          ]),
                                        ]),
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(_vm.documentData.title)
                                          ),
                                        ]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      {
                                        staticClass: "mb-2",
                                        attrs: { sm: "6" },
                                      },
                                      [
                                        _c("h6", [
                                          _c("strong", [
                                            _vm._v(_vm._s(_vm.$t("Category"))),
                                          ]),
                                        ]),
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(
                                              _vm.documentData.category.name
                                            )
                                          ),
                                        ]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      {
                                        staticClass: "mb-2",
                                        attrs: { sm: "6" },
                                      },
                                      [
                                        _c("h6", [
                                          _c("strong", [
                                            _vm._v(
                                              _vm._s(_vm.$t("SubCategory"))
                                            ),
                                          ]),
                                        ]),
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(
                                              _vm.documentData.subcategory.name
                                            )
                                          ),
                                        ]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      {
                                        staticClass: "mb-2",
                                        attrs: { sm: "6" },
                                      },
                                      [
                                        _c("h6", [
                                          _c("strong", [
                                            _vm._v(
                                              _vm._s(_vm.$t("Created Date"))
                                            ),
                                          ]),
                                        ]),
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(
                                              _vm.documentData.created_date
                                            )
                                          ),
                                        ]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      {
                                        staticClass: "mb-2",
                                        attrs: { sm: "6" },
                                      },
                                      [
                                        _c("h6", [
                                          _c("strong", [
                                            _vm._v(_vm._s(_vm.$t("Doc. no"))),
                                          ]),
                                        ]),
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(_vm.documentData.docId)
                                          ),
                                        ]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      {
                                        staticClass: "mb-2",
                                        attrs: { sm: "6" },
                                      },
                                      [
                                        _c("h6", [
                                          _c("strong", [
                                            _vm._v(
                                              _vm._s(_vm.$t("Revised Date"))
                                            ),
                                          ]),
                                        ]),
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(
                                              _vm.documentData.revised_date
                                            )
                                          ),
                                        ]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      {
                                        staticClass: "mb-2",
                                        attrs: { sm: "6" },
                                      },
                                      [
                                        _c("h6", [
                                          _c("strong", [
                                            _vm._v(
                                              _vm._s(_vm.$t("Revision No."))
                                            ),
                                          ]),
                                        ]),
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(
                                              _vm.revisionNumberFormatter(
                                                _vm.documentData.revision_number
                                              )
                                            )
                                          ),
                                        ]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      {
                                        staticClass: "mb-2",
                                        attrs: { sm: "6" },
                                      },
                                      [
                                        _c("h6", [
                                          _c("strong", [
                                            _vm._v(
                                              _vm._s(_vm.$t("Doc Author"))
                                            ),
                                          ]),
                                        ]),
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(_vm.documentData.author)
                                          ),
                                        ]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      {
                                        staticClass: "mb-2",
                                        attrs: { sm: "6" },
                                      },
                                      [
                                        _c("h6", [
                                          _c("strong", [
                                            _vm._v(_vm._s(_vm.$t("Status"))),
                                          ]),
                                        ]),
                                        _vm._v(" "),
                                        _c("span", [_vm._v("Published")]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      {
                                        staticClass: "mb-2",
                                        attrs: { sm: "6" },
                                      },
                                      [
                                        _c("h6", [
                                          _c("strong", [
                                            _vm._v(
                                              _vm._s(_vm.$t("Approved Date"))
                                            ),
                                          ]),
                                        ]),
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(
                                              _vm.documentData.approved_date
                                            )
                                          ),
                                        ]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      {
                                        staticClass: "mb-2",
                                        attrs: { sm: "6" },
                                      },
                                      [
                                        _c("h6", [
                                          _c("strong", [
                                            _vm._v(
                                              _vm._s(_vm.$t("Approved By"))
                                            ),
                                          ]),
                                        ]),
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(_vm.documentData.approved_by)
                                          ),
                                        ]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("b-col", { attrs: { cols: "12" } }, [
                                      _c("strong", [
                                        _vm._v(_vm._s(_vm.$t("Tags"))),
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "d-flex align-item-center text-capitalize mt-1",
                                          staticStyle: { gap: "5px" },
                                        },
                                        _vm._l(
                                          _vm.documentData.tag_ids,
                                          function (item, index) {
                                            return _c(
                                              "p",
                                              {
                                                key: index,
                                                staticStyle: {
                                                  background: "#f4f4f4",
                                                  padding: "5px",
                                                  "border-radius": "3px",
                                                },
                                              },
                                              [
                                                _vm._v(
                                                  "\n                            " +
                                                    _vm._s(item.name) +
                                                    "\n                          "
                                                ),
                                              ]
                                            )
                                          }
                                        ),
                                        0
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _c("b-col", { attrs: { cols: "12" } }, [
                                      _c(
                                        "button",
                                        {
                                          staticClass: "btn btn-primary",
                                          on: { click: _vm.downloadPdf },
                                        },
                                        [
                                          _c("feather-icon", {
                                            staticClass: "mr-1",
                                            attrs: { icon: "DownloadIcon" },
                                          }),
                                          _vm._v(
                                            "\n                      " +
                                              _vm._s(_vm.$t("Download PDF")) +
                                              "\n                    "
                                          ),
                                        ],
                                        1
                                      ),
                                    ]),
                                  ],
                                  1
                                ),
                              ],
                              1
                            )
                          : _vm._e(),
                      ],
                      1
                    ),
                  ],
                  1
                ),
              ]),
            ]
          ),
        ]),
      ]),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/procedures/Add.vue":
/*!***************************************************!*\
  !*** ./resources/js/src/views/procedures/Add.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Add_vue_vue_type_template_id_1f09de7c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Add.vue?vue&type=template&id=1f09de7c& */ "./resources/js/src/views/procedures/Add.vue?vue&type=template&id=1f09de7c&");
/* harmony import */ var _Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Add.vue?vue&type=script&lang=js& */ "./resources/js/src/views/procedures/Add.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Add_vue_vue_type_style_index_0_id_1f09de7c_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Add.vue?vue&type=style&index=0&id=1f09de7c&lang=scss& */ "./resources/js/src/views/procedures/Add.vue?vue&type=style&index=0&id=1f09de7c&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Add_vue_vue_type_template_id_1f09de7c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Add_vue_vue_type_template_id_1f09de7c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/procedures/Add.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/procedures/Add.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/src/views/procedures/Add.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Add.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Add.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/procedures/Add.vue?vue&type=style&index=0&id=1f09de7c&lang=scss&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/views/procedures/Add.vue?vue&type=style&index=0&id=1f09de7c&lang=scss& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_style_index_0_id_1f09de7c_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Add.vue?vue&type=style&index=0&id=1f09de7c&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Add.vue?vue&type=style&index=0&id=1f09de7c&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_style_index_0_id_1f09de7c_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_style_index_0_id_1f09de7c_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_style_index_0_id_1f09de7c_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_style_index_0_id_1f09de7c_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/procedures/Add.vue?vue&type=template&id=1f09de7c&":
/*!**********************************************************************************!*\
  !*** ./resources/js/src/views/procedures/Add.vue?vue&type=template&id=1f09de7c& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_1f09de7c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Add.vue?vue&type=template&id=1f09de7c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Add.vue?vue&type=template&id=1f09de7c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_1f09de7c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Add_vue_vue_type_template_id_1f09de7c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/procedures/Index.vue":
/*!*****************************************************!*\
  !*** ./resources/js/src/views/procedures/Index.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_da5bad26_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=da5bad26&scoped=true& */ "./resources/js/src/views/procedures/Index.vue?vue&type=template&id=da5bad26&scoped=true&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/src/views/procedures/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Index_vue_vue_type_style_index_0_id_da5bad26_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Index.vue?vue&type=style&index=0&id=da5bad26&lang=scss&scoped=true& */ "./resources/js/src/views/procedures/Index.vue?vue&type=style&index=0&id=da5bad26&lang=scss&scoped=true&");
/* harmony import */ var _Index_vue_vue_type_style_index_1_id_da5bad26_lang_css___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Index.vue?vue&type=style&index=1&id=da5bad26&lang=css& */ "./resources/js/src/views/procedures/Index.vue?vue&type=style&index=1&id=da5bad26&lang=css&");
/* harmony import */ var _Index_vue_vue_type_style_index_2_id_da5bad26_lang_scss___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Index.vue?vue&type=style&index=2&id=da5bad26&lang=scss& */ "./resources/js/src/views/procedures/Index.vue?vue&type=style&index=2&id=da5bad26&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");








/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_5__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_da5bad26_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_da5bad26_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "da5bad26",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/procedures/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/procedures/Index.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/src/views/procedures/Index.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/procedures/Index.vue?vue&type=style&index=0&id=da5bad26&lang=scss&scoped=true&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/src/views/procedures/Index.vue?vue&type=style&index=0&id=da5bad26&lang=scss&scoped=true& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_da5bad26_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=0&id=da5bad26&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=0&id=da5bad26&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_da5bad26_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_da5bad26_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_da5bad26_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_da5bad26_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/procedures/Index.vue?vue&type=style&index=1&id=da5bad26&lang=css&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/views/procedures/Index.vue?vue&type=style&index=1&id=da5bad26&lang=css& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_da5bad26_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=1&id=da5bad26&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=1&id=da5bad26&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_da5bad26_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_da5bad26_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_da5bad26_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_da5bad26_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/procedures/Index.vue?vue&type=style&index=2&id=da5bad26&lang=scss&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/views/procedures/Index.vue?vue&type=style&index=2&id=da5bad26&lang=scss& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_2_id_da5bad26_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=2&id=da5bad26&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=style&index=2&id=da5bad26&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_2_id_da5bad26_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_2_id_da5bad26_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_2_id_da5bad26_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_2_id_da5bad26_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/procedures/Index.vue?vue&type=template&id=da5bad26&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/views/procedures/Index.vue?vue&type=template&id=da5bad26&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_da5bad26_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=da5bad26&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/procedures/Index.vue?vue&type=template&id=da5bad26&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_da5bad26_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_da5bad26_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);