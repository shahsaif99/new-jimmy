(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[113],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _settings_chapters_Index_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings/chapters/Index.vue */ "./resources/js/src/views/settings/chapters/Index.vue");
//
//
//
//
//
//
//
//
//
//
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
    Chapters: _settings_chapters_Index_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  model: {
    prop: 'isManageChaptersActive',
    event: 'update:is-manage-chapters-active'
  },
  props: {
    isManageChaptersActive: {
      type: Boolean,
      required: true
    }
  },
  setup: function setup() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var _auth_jwt_useJwt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/auth/jwt/useJwt */ "./resources/js/src/auth/jwt/useJwt.js");
/* harmony import */ var _ckeditor_ckeditor5_vue2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ckeditor/ckeditor5-vue2 */ "./node_modules/@ckeditor/ckeditor5-vue2/dist/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_vue2__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_vue2__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ckeditor/ckeditor5-build-classic */ "./node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _composables_handbooks__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/composables/handbooks */ "./resources/js/src/composables/handbooks.js");
/* harmony import */ var vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vue-perfect-scrollbar */ "./node_modules/vue-perfect-scrollbar/dist/index.js");
/* harmony import */ var vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @validations */ "./resources/js/src/@core/utils/validations/validations.js");
/* harmony import */ var _core_comp_functions_forms_form_validation__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @core/comp-functions/forms/form-validation */ "./resources/js/src/@core/comp-functions/forms/form-validation.js");
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var html2pdf_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! html2pdf.js */ "./node_modules/html2pdf.js/dist/html2pdf.js");
/* harmony import */ var html2pdf_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(html2pdf_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _libs_i18n__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @/libs/i18n */ "./resources/js/src/libs/i18n/index.js");
/* harmony import */ var _composables_settingsChapters__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @/composables/settingsChapters */ "./resources/js/src/composables/settingsChapters.js");
/* harmony import */ var _ManageChapters_vue__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ManageChapters.vue */ "./resources/js/src/views/handbooks/ManageChapters.vue");





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BRow"],
    BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BCol"],
    BCard: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BCard"],
    BForm: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BForm"],
    BButton: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BButton"],
    BTab: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BTab"],
    BTabs: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BTabs"],
    BCollapse: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BCollapse"],
    BFormSelect: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BFormSelect"],
    BFormInput: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BFormInput"],
    BFormGroup: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BFormGroup"],
    ManageChapters: _ManageChapters_vue__WEBPACK_IMPORTED_MODULE_18__["default"],
    VuePerfectScrollbar: vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_11___default.a,
    ValidationObserver: vee_validate__WEBPACK_IMPORTED_MODULE_14__["ValidationObserver"],
    ValidationProvider: vee_validate__WEBPACK_IMPORTED_MODULE_14__["ValidationProvider"],
    BFormInvalidFeedback: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BFormInvalidFeedback"],
    ckeditor: _ckeditor_ckeditor5_vue2__WEBPACK_IMPORTED_MODULE_8___default.a.component
  },
  directives: {
    'b-toggle': bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["VBToggle"]
  },
  setup: function setup(_, _ref) {
    var root = _ref.root;
    var isExportActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["ref"])(false);
    var addDocumentActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["ref"])(false);
    var _formValidation = Object(_core_comp_functions_forms_form_validation__WEBPACK_IMPORTED_MODULE_13__["default"])(),
      refFormObserver = _formValidation.refFormObserver,
      getValidationState = _formValidation.getValidationState;
    var perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
      wheelSpeed: 0.3
    };
    var _useHandbooks = Object(_composables_handbooks__WEBPACK_IMPORTED_MODULE_10__["default"])(),
      getHandbook = _useHandbooks.getHandbook,
      documentData = _useHandbooks.handbook,
      updateHandbookChapter = _useHandbooks.updateHandbookChapter,
      storeHandbookChapter = _useHandbooks.storeHandbookChapter,
      getHandbookChapters = _useHandbooks.getHandbookChapters,
      handbookChapters = _useHandbooks.handbookChapters,
      handbookFilters = _useHandbooks.filters;
    var _useSettingsChapters = Object(_composables_settingsChapters__WEBPACK_IMPORTED_MODULE_17__["default"])(),
      fetchChaptersList = _useSettingsChapters.fetchChaptersList,
      chapters = _useSettingsChapters.chapters,
      chapterFilters = _useSettingsChapters.filters;
    var initialState = {
      title: '',
      chapter: '',
      content: '',
      handbook_id: root.$route.params.id
    };
    var formData = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["ref"])(Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__["default"])({}, initialState));
    var documentContent = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["ref"])('');
    var isDocumentOpen = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["ref"])(false);
    var isManageChaptersActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["ref"])(false);
    var editorContent = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["ref"])('');
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["onMounted"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getHandbook(root.$route.params.id);
            case 2:
              chapterFilters.handbook_id = Number(root.$route.params.id);
              handbookFilters.handbook_id = Number(root.$route.params.id);
              _context.next = 6;
              return fetchChaptersList();
            case 6:
              _context.next = 8;
              return getHandbookChapters();
            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    var getDocumentData = function getDocumentData(data) {
      isDocumentOpen.value = true;
      formData.value = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__["default"])({}, data);
      //   editorContent.value = `<table style="border: 1px double #b3b3b3;border-collapse: collapse;border-spacing: 0;height: 100%;width: 100%;"><tbody><tr><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Approved Date')}:<br>${documentData.value.approved_date}</span></td><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Approved By')}:<br>${documentData.value.approved_by}</span></td><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Doc Author')}:<br>${documentData.value.author}</span></td></tr><tr><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Revised No')}:<br>${documentData.value.revision_number}</span></td><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Revised Date')}:<br>${documentData.value.revised_date}</span></td><td style="border: 1px solid #bfbfbf;padding: 0.3rem 1rem !important;"><span >${i18n.t('Doc No')}:<br>${documentData.value.document_number}</span></td></tr></tbody></table><br/>`
    };

    var onSubmit = /*#__PURE__*/function () {
      var _ref3 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2() {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!isDocumentOpen.value) {
                  _context2.next = 5;
                  break;
                }
                _context2.next = 3;
                return updateHandbookChapter(formData.value, formData.value.id);
              case 3:
                _context2.next = 7;
                break;
              case 5:
                _context2.next = 7;
                return storeHandbookChapter(formData.value, root.$route.params.id);
              case 7:
                getHandbookChapters();
              case 8:
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
    var downloadPdf = function downloadPdf() {
      if (isDocumentOpen.value) {
        var opt = {
          margin: 1,
          filename: "".concat(documentData.value.title, ".pdf"),
          image: {
            type: 'jpeg',
            quality: 0.98
          },
          html2canvas: {
            scale: 2
          },
          jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait'
          }
        };
        var htmlContent = "".concat(editorContent.value).concat(document.querySelector('.ck-content').innerHTML);
        html2pdf_js__WEBPACK_IMPORTED_MODULE_15___default()().set(opt).from(htmlContent).save();
      }
    };
    var searchQuery = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["ref"])('');
    var search = function search() {
      handbookFilters.q = searchQuery.value;
      handbookFilters.handbook_id = Number(root.$route.params.id);
      getHandbookChapters();
    };
    var editorConfig = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["ref"])({
      removePlugins: ['ImageUpload', 'EasyImage']
    });
    var tabIndex = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["ref"])(0);
    var localStorageData = JSON.parse(_auth_jwt_useJwt__WEBPACK_IMPORTED_MODULE_7__["default"].getUserData());
    return {
      search: search,
      onSubmit: onSubmit,
      required: _validations__WEBPACK_IMPORTED_MODULE_12__["required"],
      chapters: chapters,
      formData: formData,
      tabIndex: tabIndex,
      downloadPdf: downloadPdf,
      isDocumentOpen: isDocumentOpen,
      getDocumentData: getDocumentData,
      documentData: documentData,
      searchQuery: searchQuery,
      handbookChapters: handbookChapters,
      ClassicEditor: _ckeditor_ckeditor5_build_classic__WEBPACK_IMPORTED_MODULE_9___default.a,
      editorConfig: editorConfig,
      documentContent: documentContent,
      isExportActive: isExportActive,
      refFormObserver: refFormObserver,
      getValidationState: getValidationState,
      addDocumentActive: addDocumentActive,
      localStorageData: localStorageData,
      isManageChaptersActive: isManageChaptersActive,
      perfectScrollbarSettings: perfectScrollbarSettings
    };
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=style&index=0&id=71d01a2e&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=style&index=0&id=71d01a2e&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".modal-lg, .modal-xl {\n  max-width: 1058px;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=0&id=b0dec28a&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=0&id=b0dec28a&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".collapsed > .when-open[data-v-b0dec28a],\n.not-collapsed > .when-closed[data-v-b0dec28a] {\n  display: none;\n}\n.ck.ck-editor[data-v-b0dec28a] {\n  z-index: 100;\n}\n.per-page-selector[data-v-b0dec28a] {\n  width: 90px;\n}\n.indexing-table-scroller[data-v-b0dec28a] {\n  height: 500px;\n}\n.indexing-table-scroller .indexing-table li h4[data-v-b0dec28a] {\n  font-size: 14px;\n}\n[dir] .indexing-table-scroller .indexing-table li h4[data-v-b0dec28a] {\n  margin-bottom: 0px;\n}\n.indexing-table-scroller .indexing-table li a[data-v-b0dec28a] {\n  color: #333;\n  display: block;\n  font-size: 13px;\n}\n[dir] .indexing-table-scroller .indexing-table li a[data-v-b0dec28a] {\n  padding: 5px;\n  border-radius: 5px;\n}\n.indexing-table-scroller .indexing-table li a[data-v-b0dec28a]:hover {\n  color: #FFF;\n}\n[dir=ltr] .indexing-table-scroller .indexing-table li a[data-v-b0dec28a]:hover {\n  background-image: linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7));\n}\n[dir=rtl] .indexing-table-scroller .indexing-table li a[data-v-b0dec28a]:hover {\n  background-image: linear-gradient(-118deg, #7367f0, rgba(115, 103, 240, 0.7));\n}\n[dir=ltr] .indexing-table-scroller .indexing-table li ul[data-v-b0dec28a] {\n  padding-left: 20px;\n}\n[dir=rtl] .indexing-table-scroller .indexing-table li ul[data-v-b0dec28a] {\n  padding-right: 20px;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=1&id=b0dec28a&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=1&id=b0dec28a&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.ck-content p{\n    font-size:12px !important;\n}\n.ck-editor__editable {\n      min-height: 300px !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=style&index=0&id=71d01a2e&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=style&index=0&id=71d01a2e&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ManageChapters.vue?vue&type=style&index=0&id=71d01a2e&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=style&index=0&id=71d01a2e&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=0&id=b0dec28a&lang=scss&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=0&id=b0dec28a&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewHandbook.vue?vue&type=style&index=0&id=b0dec28a&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=0&id=b0dec28a&lang=scss&scoped=true&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=1&id=b0dec28a&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=1&id=b0dec28a&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewHandbook.vue?vue&type=style&index=1&id=b0dec28a&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=1&id=b0dec28a&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=template&id=71d01a2e&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=template&id=71d01a2e& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
      staticClass: "modal-is-manage-chapters-active",
      attrs: {
        "cancel-variant": "outline-secondary",
        centered: "",
        "hide-footer": true,
        title: "Chapters",
        size: "lg",
        id: "is-manage-chapters-active",
        visible: _vm.isManageChaptersActive,
      },
      on: {
        close: function ($event) {
          return _vm.$emit("update:is-manage-chapters-active", false)
        },
        hide: function ($event) {
          return _vm.$emit("update:is-manage-chapters-active", false)
        },
      },
    },
    [_c("div", [_c("Chapters")], 1)]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=template&id=b0dec28a&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=template&id=b0dec28a&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
      _vm.isManageChaptersActive
        ? _c("ManageChapters", {
            attrs: { "is-manage-chapters-active": _vm.isManageChaptersActive },
            on: {
              "update:isManageChaptersActive": function ($event) {
                _vm.isManageChaptersActive = $event
              },
              "update:is-manage-chapters-active": function ($event) {
                _vm.isManageChaptersActive = $event
              },
            },
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "row justify-content-between align-items-center mb-2" },
        [
          _c("div", { staticClass: "col-md-3" }, [
            _c(
              "div",
              { staticClass: "justify-content-between d-flex" },
              [
                _c("b-form-input", {
                  attrs: { type: "text", placeholder: "Search" },
                  on: {
                    keyup: function ($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      ) {
                        return null
                      }
                      return _vm.search()
                    },
                  },
                  model: {
                    value: _vm.searchQuery,
                    callback: function ($$v) {
                      _vm.searchQuery = $$v
                    },
                    expression: "searchQuery",
                  },
                }),
                _vm._v(" "),
                _c(
                  "b-button",
                  {
                    staticClass: "mb-1",
                    attrs: { variant: "primary" },
                    on: {
                      click: function ($event) {
                        return _vm.search()
                      },
                    },
                  },
                  [
                    _c("span", { staticClass: "text-nowrap" }, [
                      _vm._v(_vm._s(_vm.$t("Search..."))),
                    ]),
                  ]
                ),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-auto" },
            [
              _c(
                "b-button",
                {
                  staticClass: "mb-1",
                  attrs: { variant: "primary" },
                  on: {
                    click: function ($event) {
                      _vm.isManageChaptersActive = true
                    },
                  },
                },
                [
                  _c("span", { staticClass: "text-nowrap" }, [
                    _vm._v("Manage Chapters"),
                  ]),
                ]
              ),
            ],
            1
          ),
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "mb-2" }, [
        _c(
          "div",
          { staticClass: "mb-2" },
          [
            _c(
              "b-row",
              [
                _c(
                  "b-col",
                  { attrs: { sm: "3" } },
                  [
                    _c("h3", [_vm._v("Table Of Contents")]),
                    _vm._v(" "),
                    _c(
                      "b-card",
                      [
                        _c(
                          "vue-perfect-scrollbar",
                          {
                            staticClass: "indexing-table-scroller scroll-area",
                            attrs: { settings: _vm.perfectScrollbarSettings },
                          },
                          [
                            _c(
                              "ul",
                              { staticClass: "list-unstyled indexing-table" },
                              _vm._l(
                                _vm.handbookChapters,
                                function (
                                  chapterHandbooks,
                                  chapter,
                                  chapterIndex
                                ) {
                                  return _c("li", { key: chapterIndex }, [
                                    _c("h4", [
                                      _c(
                                        "a",
                                        { attrs: { href: "javascript:;" } },
                                        [
                                          _vm._v(
                                            _vm._s(chapterIndex + 1) +
                                              " " +
                                              _vm._s(chapter)
                                          ),
                                        ]
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "ul",
                                      {
                                        staticClass:
                                          "indexing-table list-unstyled",
                                      },
                                      [
                                        _c("li", [
                                          _c(
                                            "ul",
                                            { staticClass: "list-unstyled" },
                                            _vm._l(
                                              chapterHandbooks,
                                              function (handbook, index2) {
                                                return _c(
                                                  "li",
                                                  { key: index2 },
                                                  [
                                                    _c(
                                                      "a",
                                                      {
                                                        attrs: {
                                                          href: "javascript:;",
                                                        },
                                                        on: {
                                                          click: function (
                                                            $event
                                                          ) {
                                                            return _vm.getDocumentData(
                                                              handbook
                                                            )
                                                          },
                                                        },
                                                      },
                                                      [
                                                        _vm._v(
                                                          " " +
                                                            _vm._s(
                                                              chapterIndex + 1
                                                            ) +
                                                            "." +
                                                            _vm._s(index2 + 1) +
                                                            " " +
                                                            _vm._s(
                                                              handbook.title
                                                            )
                                                        ),
                                                      ]
                                                    ),
                                                  ]
                                                )
                                              }
                                            ),
                                            0
                                          ),
                                        ]),
                                      ]
                                    ),
                                  ])
                                }
                              ),
                              0
                            ),
                          ]
                        ),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("b-col", { attrs: { sm: "6" } }, [
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
                                      "b-card",
                                      [
                                        _c("ckeditor", {
                                          attrs: {
                                            editor: _vm.ClassicEditor,
                                            config: _vm.editorConfig,
                                          },
                                          model: {
                                            value: _vm.formData.content,
                                            callback: function ($$v) {
                                              _vm.$set(
                                                _vm.formData,
                                                "content",
                                                $$v
                                              )
                                            },
                                            expression: "formData.content",
                                          },
                                        }),
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
                                                  variant: "primary",
                                                  type: "submit",
                                                },
                                              },
                                              [
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass: "text-nowrap",
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.isDocumentOpen
                                                          ? "Update"
                                                          : "Add"
                                                      ) + " Document"
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
                        ]),
                      }),
                    ],
                    1
                  ),
                ]),
                _vm._v(" "),
                _c("b-col", { attrs: { sm: "3" } }, [
                  _c(
                    "div",
                    [
                      _c(
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
                                _vm._v("Close"),
                              ]),
                              _c("span", { staticClass: "when-closed" }, [
                                _vm._v("Open"),
                              ]),
                              _vm._v(" Document Details\n              "),
                            ]
                          ),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "b-card",
                        { staticClass: "p-1", attrs: { "no-body": "" } },
                        [
                          _c(
                            "b-collapse",
                            { attrs: { id: "my-collapse", visible: "" } },
                            [
                              _c(
                                "b-tabs",
                                {
                                  model: {
                                    value: _vm.tabIndex,
                                    callback: function ($$v) {
                                      _vm.tabIndex = $$v
                                    },
                                    expression: "tabIndex",
                                  },
                                },
                                [
                                  _c(
                                    "b-tab",
                                    {
                                      scopedSlots: _vm._u([
                                        {
                                          key: "title",
                                          fn: function () {
                                            return [
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "font-weight-bold",
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.$t("Document Details")
                                                    )
                                                  ),
                                                ]
                                              ),
                                            ]
                                          },
                                          proxy: true,
                                        },
                                      ]),
                                    },
                                    [
                                      _vm._v(" "),
                                      _c(
                                        "b-row",
                                        [
                                          _c(
                                            "b-col",
                                            { attrs: { cols: "12", md: "12" } },
                                            [
                                              _c("validation-provider", {
                                                attrs: {
                                                  name: _vm.$t("Title"),
                                                  rules: "required",
                                                },
                                                scopedSlots: _vm._u([
                                                  {
                                                    key: "default",
                                                    fn: function (
                                                      validationContext
                                                    ) {
                                                      return [
                                                        _c(
                                                          "b-form-group",
                                                          {
                                                            attrs: {
                                                              label:
                                                                _vm.$t("Title"),
                                                              "label-for":
                                                                "oname",
                                                            },
                                                          },
                                                          [
                                                            _c("b-form-input", {
                                                              attrs: {
                                                                state:
                                                                  _vm.getValidationState(
                                                                    validationContext
                                                                  ),
                                                                trim: "",
                                                              },
                                                              model: {
                                                                value:
                                                                  _vm.formData
                                                                    .title,
                                                                callback:
                                                                  function (
                                                                    $$v
                                                                  ) {
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
                                                ]),
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
                                                attrs: {
                                                  name: _vm.$t("Chapter"),
                                                  rules: "required",
                                                },
                                                scopedSlots: _vm._u([
                                                  {
                                                    key: "default",
                                                    fn: function (
                                                      validationContext
                                                    ) {
                                                      return [
                                                        _c(
                                                          "b-form-group",
                                                          {
                                                            attrs: {
                                                              label:
                                                                _vm.$t(
                                                                  "Chapter"
                                                                ),
                                                              "label-for":
                                                                "oname",
                                                            },
                                                          },
                                                          [
                                                            _c(
                                                              "b-form-select",
                                                              {
                                                                attrs: {
                                                                  options:
                                                                    _vm.chapters,
                                                                  "text-field":
                                                                    "name",
                                                                  "value-field":
                                                                    "name",
                                                                  state:
                                                                    _vm.getValidationState(
                                                                      validationContext
                                                                    ),
                                                                  trim: "",
                                                                },
                                                                model: {
                                                                  value:
                                                                    _vm.formData
                                                                      .chapter,
                                                                  callback:
                                                                    function (
                                                                      $$v
                                                                    ) {
                                                                      _vm.$set(
                                                                        _vm.formData,
                                                                        "chapter",
                                                                        $$v
                                                                      )
                                                                    },
                                                                  expression:
                                                                    "formData.chapter",
                                                                },
                                                              }
                                                            ),
                                                            _vm._v(" "),
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
                                                ]),
                                              }),
                                            ],
                                            1
                                          ),
                                        ],
                                        1
                                      ),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-tab",
                                    {
                                      scopedSlots: _vm._u([
                                        {
                                          key: "title",
                                          fn: function () {
                                            return [
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "font-weight-bold",
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.$t("Handbook Details")
                                                    )
                                                  ),
                                                ]
                                              ),
                                            ]
                                          },
                                          proxy: true,
                                        },
                                      ]),
                                    },
                                    [
                                      _vm._v(" "),
                                      _vm.documentData
                                        ? _c(
                                            "b-row",
                                            [
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
                                                        _vm._s(_vm.$t("Title"))
                                                      ),
                                                    ]),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.documentData.title
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
                                                        _vm._s(
                                                          _vm.$t("Document No.")
                                                        )
                                                      ),
                                                    ]),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.documentData
                                                          .document_number
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
                                                        _vm._s(
                                                          _vm.$t("Created Date")
                                                        )
                                                      ),
                                                    ]),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.documentData
                                                          .created_at
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
                                                        _vm._s(
                                                          _vm.$t("Revised Date")
                                                        )
                                                      ),
                                                    ]),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.documentData
                                                          .revised_date
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
                                                        _vm._s(
                                                          _vm.$t("Revised No")
                                                        )
                                                      ),
                                                    ]),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.documentData
                                                          .revision_number
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
                                                        _vm._s(
                                                          _vm.$t("Approved By")
                                                        )
                                                      ),
                                                    ]),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.documentData
                                                          .approved_by
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
                                                        _vm._s(
                                                          _vm.$t("Doc Author")
                                                        )
                                                      ),
                                                    ]),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.documentData.author
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
                                                        _vm._s(
                                                          _vm.$t(
                                                            "Approved Date"
                                                          )
                                                        )
                                                      ),
                                                    ]),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.documentData
                                                          .approved_date
                                                      )
                                                    ),
                                                  ]),
                                                ]
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
                            ],
                            1
                          ),
                        ],
                        1
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
        ),
      ]),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/handbooks/ManageChapters.vue":
/*!*************************************************************!*\
  !*** ./resources/js/src/views/handbooks/ManageChapters.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ManageChapters_vue_vue_type_template_id_71d01a2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ManageChapters.vue?vue&type=template&id=71d01a2e& */ "./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=template&id=71d01a2e&");
/* harmony import */ var _ManageChapters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ManageChapters.vue?vue&type=script&lang=js& */ "./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ManageChapters_vue_vue_type_style_index_0_id_71d01a2e_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ManageChapters.vue?vue&type=style&index=0&id=71d01a2e&lang=scss& */ "./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=style&index=0&id=71d01a2e&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ManageChapters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ManageChapters_vue_vue_type_template_id_71d01a2e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ManageChapters_vue_vue_type_template_id_71d01a2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/handbooks/ManageChapters.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageChapters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ManageChapters.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageChapters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=style&index=0&id=71d01a2e&lang=scss&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=style&index=0&id=71d01a2e&lang=scss& ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageChapters_vue_vue_type_style_index_0_id_71d01a2e_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ManageChapters.vue?vue&type=style&index=0&id=71d01a2e&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=style&index=0&id=71d01a2e&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageChapters_vue_vue_type_style_index_0_id_71d01a2e_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageChapters_vue_vue_type_style_index_0_id_71d01a2e_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageChapters_vue_vue_type_style_index_0_id_71d01a2e_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageChapters_vue_vue_type_style_index_0_id_71d01a2e_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=template&id=71d01a2e&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=template&id=71d01a2e& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageChapters_vue_vue_type_template_id_71d01a2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ManageChapters.vue?vue&type=template&id=71d01a2e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ManageChapters.vue?vue&type=template&id=71d01a2e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageChapters_vue_vue_type_template_id_71d01a2e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManageChapters_vue_vue_type_template_id_71d01a2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/handbooks/ViewHandbook.vue":
/*!***********************************************************!*\
  !*** ./resources/js/src/views/handbooks/ViewHandbook.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewHandbook_vue_vue_type_template_id_b0dec28a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewHandbook.vue?vue&type=template&id=b0dec28a&scoped=true& */ "./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=template&id=b0dec28a&scoped=true&");
/* harmony import */ var _ViewHandbook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewHandbook.vue?vue&type=script&lang=js& */ "./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ViewHandbook_vue_vue_type_style_index_0_id_b0dec28a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ViewHandbook.vue?vue&type=style&index=0&id=b0dec28a&lang=scss&scoped=true& */ "./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=0&id=b0dec28a&lang=scss&scoped=true&");
/* harmony import */ var _ViewHandbook_vue_vue_type_style_index_1_id_b0dec28a_lang_css___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ViewHandbook.vue?vue&type=style&index=1&id=b0dec28a&lang=css& */ "./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=1&id=b0dec28a&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _ViewHandbook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ViewHandbook_vue_vue_type_template_id_b0dec28a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ViewHandbook_vue_vue_type_template_id_b0dec28a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "b0dec28a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/handbooks/ViewHandbook.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewHandbook.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=0&id=b0dec28a&lang=scss&scoped=true&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=0&id=b0dec28a&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_style_index_0_id_b0dec28a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewHandbook.vue?vue&type=style&index=0&id=b0dec28a&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=0&id=b0dec28a&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_style_index_0_id_b0dec28a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_style_index_0_id_b0dec28a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_style_index_0_id_b0dec28a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_style_index_0_id_b0dec28a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=1&id=b0dec28a&lang=css&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=1&id=b0dec28a&lang=css& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_style_index_1_id_b0dec28a_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewHandbook.vue?vue&type=style&index=1&id=b0dec28a&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=style&index=1&id=b0dec28a&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_style_index_1_id_b0dec28a_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_style_index_1_id_b0dec28a_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_style_index_1_id_b0dec28a_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_style_index_1_id_b0dec28a_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=template&id=b0dec28a&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=template&id=b0dec28a&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_template_id_b0dec28a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ViewHandbook.vue?vue&type=template&id=b0dec28a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/handbooks/ViewHandbook.vue?vue&type=template&id=b0dec28a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_template_id_b0dec28a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewHandbook_vue_vue_type_template_id_b0dec28a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);