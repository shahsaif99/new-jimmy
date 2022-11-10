(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[55],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/Index.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/addons/Index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var _composables_admin_addons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/composables/admin/addons */ "./resources/js/src/composables/admin/addons.js");
/* harmony import */ var _add_AddAddon_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add/AddAddon.vue */ "./resources/js/src/views/admin/addons/add/AddAddon.vue");
/* harmony import */ var _edit_EditAddon_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./edit/EditAddon.vue */ "./resources/js/src/views/admin/addons/edit/EditAddon.vue");
/* harmony import */ var _Export_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Export.vue */ "./resources/js/src/views/admin/Export.vue");


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    Export: _Export_vue__WEBPACK_IMPORTED_MODULE_8__["default"],
    BOverlay: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BOverlay"],
    AddAddon: _add_AddAddon_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
    EditAddon: _edit_EditAddon_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
    BCard: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BCard"],
    BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BRow"],
    BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BCol"],
    BFormInput: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BFormInput"],
    BButton: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BButton"],
    BTable: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BTable"],
    BDropdown: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BDropdown"],
    BDropdownItem: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BDropdownItem"],
    BPagination: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BPagination"],
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_3___default.a
  },
  setup: function setup(_, context) {
    var _useAddons = Object(_composables_admin_addons__WEBPACK_IMPORTED_MODULE_5__["default"])(),
        fetchAddons = _useAddons.fetchAddons,
        perPage = _useAddons.perPage,
        currentPage = _useAddons.currentPage,
        totalRecords = _useAddons.totalRecords,
        dataMeta = _useAddons.dataMeta,
        perPageOptions = _useAddons.perPageOptions,
        searchQuery = _useAddons.searchQuery,
        sortBy = _useAddons.sortBy,
        isSortDirDesc = _useAddons.isSortDirDesc,
        refListTable = _useAddons.refListTable,
        deleteAddon = _useAddons.deleteAddon,
        tableColumns = _useAddons.tableColumns,
        busy = _useAddons.busy,
        addons = _useAddons.addons,
        respResult = _useAddons.respResult;

    fetchAddons();
    var isAddNewAddonActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["ref"])(false);
    var isEditAddonActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["ref"])(false);
    var isExportActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["ref"])(false);
    var addon = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["ref"])({});
    var filters = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["ref"])({});

    var editAddon = function editAddon(data) {
      isEditAddonActive.value = true;
      addon.value = data;
    };

    var deleteUserConfirmed = /*#__PURE__*/function () {
      var _ref = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee(id) {
        return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return deleteAddon(id);

              case 2:
                if (respResult.value.status === 200) {
                  fetchAddons();
                }

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function deleteUserConfirmed(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    var confirmDelete = /*#__PURE__*/function () {
      var _ref2 = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2(id) {
        return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                context.root.$bvModal.msgBoxConfirm('Please confirm that you want to delete addon.', {
                  title: 'Please Confirm',
                  size: 'sm'
                }).then(function (value) {
                  if (value) {
                    deleteUserConfirmed(id);
                  }
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function confirmDelete(_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    return {
      busy: busy,
      addon: addon,
      addons: addons,
      perPage: perPage,
      sortBy: sortBy,
      filters: filters,
      dataMeta: dataMeta,
      editAddon: editAddon,
      fetchAddons: fetchAddons,
      currentPage: currentPage,
      searchQuery: searchQuery,
      tableColumns: tableColumns,
      totalRecords: totalRecords,
      refListTable: refListTable,
      confirmDelete: confirmDelete,
      isSortDirDesc: isSortDirDesc,
      perPageOptions: perPageOptions,
      isExportActive: isExportActive,
      isEditAddonActive: isEditAddonActive,
      isAddNewAddonActive: isAddNewAddonActive
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/add/AddAddon.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/addons/add/AddAddon.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.json.stringify.js */ "./node_modules/core-js/modules/es.json.stringify.js");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @validations */ "./resources/js/src/@core/utils/validations/validations.js");
/* harmony import */ var _core_comp_functions_forms_form_validation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/comp-functions/forms/form-validation */ "./resources/js/src/@core/comp-functions/forms/form-validation.js");
/* harmony import */ var vue_ripple_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vue-ripple-directive */ "./node_modules/vue-ripple-directive/src/ripple.js");
/* harmony import */ var _composables_admin_addons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/composables/admin/addons */ "./resources/js/src/composables/admin/addons.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_10__);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BRow"],
    BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BCol"],
    BForm: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BForm"],
    BModal: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BModal"],
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_10___default.a,
    BButton: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BButton"],
    BOverlay: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BOverlay"],
    BFormGroup: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BFormGroup"],
    BFormInput: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BFormInput"],
    BFormInvalidFeedback: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BFormInvalidFeedback"],
    // Form Validation
    ValidationProvider: vee_validate__WEBPACK_IMPORTED_MODULE_4__["ValidationProvider"],
    ValidationObserver: vee_validate__WEBPACK_IMPORTED_MODULE_4__["ValidationObserver"]
  },
  directives: {
    Ripple: vue_ripple_directive__WEBPACK_IMPORTED_MODULE_8__["default"]
  },
  model: {
    prop: 'isAddNewAddonActive',
    event: 'update:is-add-new-addon-active'
  },
  props: {
    isAddNewAddonActive: {
      type: Boolean,
      required: true
    }
  },
  data: function data() {
    return {
      required: _validations__WEBPACK_IMPORTED_MODULE_6__["required"]
    };
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var blankAddonData = {
      title: '',
      intervals: [{
        id: 1,
        interval_unit: '',
        interval_length: '',
        amount: ''
      }]
    };

    var _useAddons = Object(_composables_admin_addons__WEBPACK_IMPORTED_MODULE_9__["default"])(),
        busy = _useAddons.busy,
        storeAddon = _useAddons.storeAddon,
        respResult = _useAddons.respResult;

    var addonData = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_5__["ref"])(JSON.parse(JSON.stringify(blankAddonData)));

    var resetAddonData = function resetAddonData() {
      addonData.value = JSON.parse(JSON.stringify(blankAddonData));
    };

    var intervalUnits = [{
      id: 'monthly',
      title: 'Monthly'
    }, {
      id: 'yearly',
      title: 'Yearly'
    }];

    var repeateAgain = function repeateAgain() {
      addonData.value.intervals.push({
        id: addonData.value.intervals.length + 1,
        interval_unit: '',
        interval_length: '',
        amount: ''
      });
    };

    var onSubmit = /*#__PURE__*/function () {
      var _ref2 = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
        return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return storeAddon(addonData.value);

              case 2:
                if (respResult.value.status === 200) {
                  emit('refetch-data');
                  emit('update:is-add-new-addon-active', false);
                }

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function onSubmit() {
        return _ref2.apply(this, arguments);
      };
    }();

    var _formValidation = Object(_core_comp_functions_forms_form_validation__WEBPACK_IMPORTED_MODULE_7__["default"])(resetAddonData),
        refFormObserver = _formValidation.refFormObserver,
        getValidationState = _formValidation.getValidationState,
        resetForm = _formValidation.resetForm;

    return {
      busy: busy,
      onSubmit: onSubmit,
      addonData: addonData,
      resetForm: resetForm,
      repeateAgain: repeateAgain,
      refFormObserver: refFormObserver,
      getValidationState: getValidationState,
      intervalUnits: intervalUnits
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/edit/EditAddon.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/addons/edit/EditAddon.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.json.stringify.js */ "./node_modules/core-js/modules/es.json.stringify.js");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @validations */ "./resources/js/src/@core/utils/validations/validations.js");
/* harmony import */ var _core_comp_functions_forms_form_validation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/comp-functions/forms/form-validation */ "./resources/js/src/@core/comp-functions/forms/form-validation.js");
/* harmony import */ var vue_ripple_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue-ripple-directive */ "./node_modules/vue-ripple-directive/src/ripple.js");
/* harmony import */ var _composables_admin_addons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/composables/admin/addons */ "./resources/js/src/composables/admin/addons.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_11__);




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BCol"],
    BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BRow"],
    BForm: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BForm"],
    BModal: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BModal"],
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_11___default.a,
    BButton: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BButton"],
    BOverlay: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BOverlay"],
    BFormGroup: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BFormGroup"],
    BFormInput: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BFormInput"],
    BFormInvalidFeedback: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BFormInvalidFeedback"],
    // Form Validation
    ValidationProvider: vee_validate__WEBPACK_IMPORTED_MODULE_5__["ValidationProvider"],
    ValidationObserver: vee_validate__WEBPACK_IMPORTED_MODULE_5__["ValidationObserver"]
  },
  directives: {
    Ripple: vue_ripple_directive__WEBPACK_IMPORTED_MODULE_9__["default"]
  },
  model: {
    prop: 'isEditAddonActive',
    event: 'update:is-edit-addon-active'
  },
  props: {
    isEditAddonActive: {
      type: Boolean,
      required: true
    },
    addon: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      required: _validations__WEBPACK_IMPORTED_MODULE_7__["required"]
    };
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _useAddons = Object(_composables_admin_addons__WEBPACK_IMPORTED_MODULE_10__["default"])(),
        busy = _useAddons.busy,
        updateAddon = _useAddons.updateAddon,
        respResult = _useAddons.respResult;

    var addonData = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["ref"])({});
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["watchEffect"])(function () {
      addonData.value = props.addon;
    });
    var intervalUnits = [{
      id: 'monthly',
      title: 'Monthly'
    }, {
      id: 'yearly',
      title: 'Yearly'
    }];

    var repeateAgain = function repeateAgain() {
      // Add new item to the array or create a new array if it doesn't exist
      if (!addonData.value.intervals) {
        addonData.value.intervals = [{
          interval_unit: '',
          interval_length: '',
          amount: ''
        }];
      } else {
        addonData.value.intervals.push({
          id: addonData.value.intervals.length + 1,
          interval_unit: '',
          interval_length: '',
          amount: ''
        });
      }
    };

    var resetAddonData = function resetAddonData() {
      addonData.value = JSON.parse(JSON.stringify(addonData));
    };

    var removeItem = function removeItem(index) {
      addonData.value.intervals.splice(index, 1);
    };

    var onSubmit = /*#__PURE__*/function () {
      var _ref2 = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
        return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return updateAddon(addonData.value);

              case 2:
                if (respResult.value.status === 200) {
                  emit('refetch-data');
                  emit('update:is-edit-addon-active', false);
                }

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function onSubmit() {
        return _ref2.apply(this, arguments);
      };
    }();

    var _formValidation = Object(_core_comp_functions_forms_form_validation__WEBPACK_IMPORTED_MODULE_8__["default"])(resetAddonData),
        refFormObserver = _formValidation.refFormObserver,
        getValidationState = _formValidation.getValidationState,
        resetForm = _formValidation.resetForm;

    return {
      busy: busy,
      onSubmit: onSubmit,
      resetForm: resetForm,
      addonData: addonData,
      removeItem: removeItem,
      repeateAgain: repeateAgain,
      intervalUnits: intervalUnits,
      refFormObserver: refFormObserver,
      getValidationState: getValidationState
    };
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.splice.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.splice.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");
var arrayMethodUsesToLength = __webpack_require__(/*! ../internals/array-method-uses-to-length */ "./node_modules/core-js/internals/array-method-uses-to-length.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.json.stringify.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.json.stringify.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var $stringify = getBuiltIn('JSON', 'stringify');
var re = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = string.charAt(offset - 1);
  var next = string.charAt(offset + 1);
  if ((low.test(match) && !hi.test(next)) || (hi.test(match) && !low.test(prev))) {
    return '\\u' + match.charCodeAt(0).toString(16);
  } return match;
};

var FORCED = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

if ($stringify) {
  // https://github.com/tc39/proposal-well-formed-stringify
  $({ target: 'JSON', stat: true, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var result = $stringify.apply(null, arguments);
      return typeof result == 'string' ? result.replace(re, fix) : result;
    }
  });
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=0&id=1bd2e620&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=0&id=1bd2e620&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".per-page-selector[data-v-1bd2e620] {\n  width: 90px;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=1&id=1bd2e620&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=1&id=1bd2e620&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/**\n    Support for SASS is deprecated as of v3.18.\n\n    The files remain here if your build is dependent on them\n    but they will not receive updates in future releases. All\n    SASS variables have been translated into CSS variables, so\n    migration should be quite simple if you'd like to move over.\n\n    In v4, these files will be removed.\n */\n.v-select {\n  position: relative;\n  font-family: inherit;\n}\n.v-select,\n.v-select * {\n  box-sizing: border-box;\n}\n\n/* KeyFrames */\n@-webkit-keyframes vSelectSpinner-ltr {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n@-webkit-keyframes vSelectSpinner-rtl {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(-360deg);\n}\n}\n@keyframes vSelectSpinner-ltr {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n@keyframes vSelectSpinner-rtl {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(-360deg);\n}\n}\n/* Dropdown Default Transition */\n.vs__fade-enter-active,\n.vs__fade-leave-active {\n  pointer-events: none;\n  transition: opacity 0.15s cubic-bezier(1, 0.5, 0.8, 1);\n}\n.vs__fade-enter,\n.vs__fade-leave-to {\n  opacity: 0;\n}\n\n/** Component States */\n/*\n * Disabled\n *\n * When the component is disabled, all interaction\n * should be prevented. Here we modify the bg color,\n * and change the cursor displayed on the interactive\n * components.\n */\n[dir] .vs--disabled .vs__dropdown-toggle, [dir] .vs--disabled .vs__clear, [dir] .vs--disabled .vs__search, [dir] .vs--disabled .vs__selected, [dir] .vs--disabled .vs__open-indicator {\n  cursor: not-allowed;\n  background-color: rgb(248, 248, 248);\n}\n\n/*\n *  RTL - Right to Left Support\n *\n *  Because we're using a flexbox layout, the `dir=\"rtl\"`\n *  HTML attribute does most of the work for us by\n *  rearranging the child elements visually.\n */\n.v-select[dir=rtl] .vs__actions {\n  padding: 0 3px 0 6px;\n}\n.v-select[dir=rtl] .vs__clear {\n  margin-left: 6px;\n  margin-right: 0;\n}\n.v-select[dir=rtl] .vs__deselect {\n  margin-left: 0;\n  margin-right: 2px;\n}\n.v-select[dir=rtl] .vs__dropdown-menu {\n  text-align: right;\n}\n\n/**\n    Dropdown Toggle\n\n    The dropdown toggle is the primary wrapper of the component. It\n    has two direct descendants: .vs__selected-options, and .vs__actions.\n\n    .vs__selected-options holds the .vs__selected's as well as the\n    main search input.\n\n    .vs__actions holds the clear button and dropdown toggle.\n */\n.vs__dropdown-toggle {\n  appearance: none;\n  display: flex;\n  white-space: normal;\n}\n[dir] .vs__dropdown-toggle {\n  padding: 0 0 4px 0;\n  background: none;\n  border: 1px solid #d8d6de;\n  border-radius: 0.357rem;\n}\n.vs__selected-options {\n  display: flex;\n  flex-basis: 100%;\n  flex-grow: 1;\n  flex-wrap: wrap;\n  position: relative;\n}\n[dir] .vs__selected-options {\n  padding: 0 2px;\n}\n.vs__actions {\n  display: flex;\n  align-items: center;\n}\n[dir=ltr] .vs__actions {\n  padding: 4px 6px 0 3px;\n}\n[dir=rtl] .vs__actions {\n  padding: 4px 3px 0 6px;\n}\n\n/* Dropdown Toggle States */\n[dir] .vs--searchable .vs__dropdown-toggle {\n  cursor: text;\n}\n[dir] .vs--unsearchable .vs__dropdown-toggle {\n  cursor: pointer;\n}\n[dir] .vs--open .vs__dropdown-toggle {\n  border-bottom-color: transparent;\n}\n[dir=ltr] .vs--open .vs__dropdown-toggle {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n[dir=rtl] .vs--open .vs__dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.vs__open-indicator {\n  fill: rgba(60, 60, 60, 0.5);\n  transition: transform 150ms cubic-bezier(1, -0.115, 0.975, 0.855);\n}\n[dir] .vs__open-indicator {\n  transform: scale(1);\n  transition-timing-function: cubic-bezier(1, -0.115, 0.975, 0.855);\n}\n[dir=ltr] .vs--open .vs__open-indicator {\n  transform: rotate(180deg) scale(1);\n}\n[dir=rtl] .vs--open .vs__open-indicator {\n  transform: rotate(-180deg) scale(1);\n}\n.vs--loading .vs__open-indicator {\n  opacity: 0;\n}\n\n/* Clear Button */\n.vs__clear {\n  fill: rgba(60, 60, 60, 0.5);\n}\n[dir] .vs__clear {\n  padding: 0;\n  border: 0;\n  background-color: transparent;\n  cursor: pointer;\n}\n[dir=ltr] .vs__clear {\n  margin-right: 8px;\n}\n[dir=rtl] .vs__clear {\n  margin-left: 8px;\n}\n\n/* Dropdown Menu */\n.vs__dropdown-menu {\n  display: block;\n  box-sizing: border-box;\n  position: absolute;\n  top: calc(100% - 1px);\n  z-index: 1000;\n  width: 100%;\n  max-height: 350px;\n  min-width: 160px;\n  overflow-y: auto;\n  list-style: none;\n}\n[dir] .vs__dropdown-menu {\n  padding: 5px 0;\n  margin: 0;\n  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);\n  border: 1px solid #d8d6de;\n  border-top-style: none;\n  border-radius: 0 0 0.357rem 0.357rem;\n  background: #fff;\n}\n[dir=ltr] .vs__dropdown-menu {\n  left: 0;\n  text-align: left;\n}\n[dir=rtl] .vs__dropdown-menu {\n  right: 0;\n  text-align: right;\n}\n[dir] .vs__no-options {\n  text-align: center;\n}\n\n/* List Items */\n.vs__dropdown-option {\n  line-height: 1.42857143; /* Normalize line height */\n  display: block;\n  color: #333; /* Overrides most CSS frameworks */\n  white-space: nowrap;\n}\n[dir] .vs__dropdown-option {\n  padding: 3px 20px;\n  clear: both;\n  cursor: pointer;\n}\n.vs__dropdown-option--highlight {\n  color: #7367f0 !important;\n}\n[dir] .vs__dropdown-option--highlight {\n  background: rgba(115, 103, 240, 0.12);\n}\n.vs__dropdown-option--deselect {\n  color: #fff;\n}\n[dir] .vs__dropdown-option--deselect {\n  background: #fb5858;\n}\n.vs__dropdown-option--disabled {\n  color: rgba(60, 60, 60, 0.5);\n}\n[dir] .vs__dropdown-option--disabled {\n  background: inherit;\n  cursor: inherit;\n}\n\n/* Selected Tags */\n.vs__selected {\n  display: flex;\n  align-items: center;\n  color: #333;\n  line-height: 1.8;\n  z-index: 0;\n}\n[dir] .vs__selected {\n  background-color: #7367f0;\n  border: 0 solid rgba(60, 60, 60, 0.26);\n  border-radius: 0.357rem;\n  margin: 4px 2px 0px 2px;\n  padding: 0 0.25em;\n}\n.vs__deselect {\n  display: inline-flex;\n  appearance: none;\n  fill: rgba(60, 60, 60, 0.5);\n}\n[dir] .vs__deselect {\n  padding: 0;\n  border: 0;\n  cursor: pointer;\n  background: none;\n  text-shadow: 0 1px 0 #fff;\n}\n[dir=ltr] .vs__deselect {\n  margin-left: 4px;\n}\n[dir=rtl] .vs__deselect {\n  margin-right: 4px;\n}\n\n/* States */\n[dir] .vs--single .vs__selected {\n  background-color: transparent;\n  border-color: transparent;\n}\n.vs--single.vs--open .vs__selected, .vs--single.vs--loading .vs__selected {\n  position: absolute;\n  opacity: 0.4;\n}\n.vs--single.vs--searching .vs__selected {\n  display: none;\n}\n\n/* Search Input */\n/**\n * Super weird bug... If this declaration is grouped\n * below, the cancel button will still appear in chrome.\n * If it's up here on it's own, it'll hide it.\n */\n.vs__search::-webkit-search-cancel-button {\n  display: none;\n}\n.vs__search::-webkit-search-decoration,\n.vs__search::-webkit-search-results-button,\n.vs__search::-webkit-search-results-decoration,\n.vs__search::-ms-clear {\n  display: none;\n}\n.vs__search,\n.vs__search:focus {\n  appearance: none;\n  line-height: 1.8;\n  font-size: 1em;\n  outline: none;\n  width: 0;\n  max-width: 100%;\n  flex-grow: 1;\n  z-index: 1;\n}\n[dir] .vs__search, [dir] .vs__search:focus {\n  border: 1px solid transparent;\n  margin: 4px 0 0 0;\n  padding: 0 7px;\n  background: none;\n  box-shadow: none;\n}\n[dir=ltr] .vs__search, [dir=ltr] .vs__search:focus {\n  border-left: none;\n}\n[dir=rtl] .vs__search, [dir=rtl] .vs__search:focus {\n  border-right: none;\n}\n.vs__search::placeholder {\n  color: #6e6b7b;\n}\n\n/**\n    States\n */\n.vs--unsearchable .vs__search {\n  opacity: 1;\n}\n[dir] .vs--unsearchable:not(.vs--disabled) .vs__search {\n  cursor: pointer;\n}\n.vs--single.vs--searching:not(.vs--open):not(.vs--loading) .vs__search {\n  opacity: 0.2;\n}\n\n/* Loading Spinner */\n.vs__spinner {\n  align-self: center;\n  opacity: 0;\n  font-size: 5px;\n  text-indent: -9999em;\n  overflow: hidden;\n  transition: opacity 0.1s;\n}\n[dir] .vs__spinner {\n  border-top: 0.9em solid rgba(100, 100, 100, 0.1);\n  border-bottom: 0.9em solid rgba(100, 100, 100, 0.1);\n  transform: translateZ(0);\n}\n[dir=ltr] .vs__spinner {\n  border-right: 0.9em solid rgba(100, 100, 100, 0.1);\n  border-left: 0.9em solid rgba(60, 60, 60, 0.45);\n  animation:  vSelectSpinner-ltr 1.1s infinite linear;\n}\n[dir=rtl] .vs__spinner {\n  border-left: 0.9em solid rgba(100, 100, 100, 0.1);\n  border-right: 0.9em solid rgba(60, 60, 60, 0.45);\n  animation:  vSelectSpinner-rtl 1.1s infinite linear;\n}\n.vs__spinner,\n.vs__spinner:after {\n  width: 5em;\n  height: 5em;\n}\n[dir] .vs__spinner, [dir] .vs__spinner:after {\n  border-radius: 50%;\n}\n\n/* Loading Spinner States */\n.vs--loading .vs__spinner {\n  opacity: 1;\n}\n.vs__open-indicator {\n  fill: none;\n}\n[dir] .vs__open-indicator {\n  margin-top: 0.15rem;\n}\n.vs__dropdown-toggle {\n  transition: all 0.25s ease-in-out;\n}\n[dir] .vs__dropdown-toggle {\n  padding: 0.59px 0 4px 0;\n}\n[dir=ltr] .vs--single .vs__dropdown-toggle {\n  padding-left: 6px;\n}\n[dir=rtl] .vs--single .vs__dropdown-toggle {\n  padding-right: 6px;\n}\n.vs__dropdown-option--disabled {\n  opacity: 0.5;\n}\n[dir] .vs__dropdown-option--disabled.vs__dropdown-option--selected {\n  background: #7367f0 !important;\n}\n.vs__dropdown-option {\n  color: #6e6b7b;\n}\n[dir] .vs__dropdown-option, [dir] .vs__no-options {\n  padding: 7px 20px;\n}\n.vs__dropdown-option--selected {\n  background-color: #7367f0;\n  color: #fff;\n  position: relative;\n}\n.vs__dropdown-option--selected::after {\n  content: \"\";\n  height: 1.1rem;\n  width: 1.1rem;\n  display: inline-block;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  right: 20px;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 1.1rem;\n}\n[dir=rtl] .vs__dropdown-option--selected::after {\n  left: 20px;\n  right: unset;\n}\n.vs__dropdown-option--selected.vs__dropdown-option--highlight {\n  color: #fff !important;\n  background-color: #7367f0 !important;\n}\n.vs__clear svg {\n  color: #6e6b7b;\n}\n.vs__selected {\n  color: #fff;\n}\n.v-select.vs--single .vs__selected {\n  color: #6e6b7b;\n  transition: transform 0.2s ease;\n}\n[dir] .v-select.vs--single .vs__selected {\n  margin-top: 5px;\n}\n[dir=ltr] .v-select.vs--single .vs__selected input {\n  padding-left: 0;\n}\n[dir=rtl] .v-select.vs--single .vs__selected input {\n  padding-right: 0;\n}\n[dir=ltr] .vs--single.vs--open .vs__selected {\n  transform: translateX(5px);\n}\n[dir=rtl] .vs--single.vs--open .vs__selected {\n  transform: translateX(-5px);\n}\n.vs__selected .vs__deselect {\n  color: inherit;\n}\n.v-select:not(.vs--single) .vs__selected {\n  font-size: 0.9rem;\n}\n[dir] .v-select:not(.vs--single) .vs__selected {\n  border-radius: 3px;\n  padding: 0 0.6em;\n}\n[dir=ltr] .v-select:not(.vs--single) .vs__selected {\n  margin: 5px 2px 2px 5px;\n}\n[dir=rtl] .v-select:not(.vs--single) .vs__selected {\n  margin: 5px 5px 2px 2px;\n}\n.v-select:not(.vs--single) .vs__deselect svg {\n  vertical-align: text-top;\n}\n[dir] .v-select:not(.vs--single) .vs__deselect svg {\n  transform: scale(0.8);\n}\n.vs__dropdown-menu {\n  top: calc(100% + 1rem);\n}\n[dir] .vs__dropdown-menu {\n  border: none;\n  border-radius: 6px;\n  padding: 0;\n}\n[dir] .vs--open .vs__dropdown-toggle {\n  border-color: #7367f0;\n  border-bottom-color: #7367f0;\n  box-shadow: 0 3px 10px 0 rgba(34, 41, 47, 0.1);\n}\n[dir=ltr] .vs--open .vs__dropdown-toggle {\n  border-bottom-left-radius: 0.357rem;\n  border-bottom-right-radius: 0.357rem;\n}\n[dir=rtl] .vs--open .vs__dropdown-toggle {\n  border-bottom-right-radius: 0.357rem;\n  border-bottom-left-radius: 0.357rem;\n}\n.select-size-lg .vs__selected {\n  font-size: 1rem !important;\n}\n[dir] .select-size-lg.vs--single.vs--open .vs__selected {\n  margin-top: 6px;\n}\n.select-size-lg .vs__dropdown-toggle,\n.select-size-lg .vs__selected {\n  font-size: 1.25rem;\n}\n[dir] .select-size-lg .vs__dropdown-toggle {\n  padding: 5px;\n}\n[dir] .select-size-lg .vs__dropdown-toggle input {\n  margin-top: 0;\n}\n.select-size-lg .vs__deselect svg {\n  vertical-align: middle !important;\n}\n[dir] .select-size-lg .vs__deselect svg {\n  transform: scale(1) !important;\n}\n[dir] .select-size-sm .vs__dropdown-toggle {\n  padding-bottom: 0;\n  padding: 1px;\n}\n[dir] .select-size-sm.vs--single .vs__dropdown-toggle {\n  padding: 2px;\n}\n.select-size-sm .vs__dropdown-toggle,\n.select-size-sm .vs__selected {\n  font-size: 0.9rem;\n}\n[dir] .select-size-sm .vs__actions {\n  padding-top: 2px;\n  padding-bottom: 2px;\n}\n.select-size-sm .vs__deselect svg {\n  vertical-align: middle !important;\n}\n[dir] .select-size-sm .vs__search {\n  margin-top: 0;\n}\n.select-size-sm.v-select .vs__selected {\n  font-size: 0.75rem;\n}\n[dir] .select-size-sm.v-select .vs__selected {\n  padding: 0 0.3rem;\n}\n[dir] .select-size-sm.v-select:not(.vs--single) .vs__selected {\n  margin: 4px 5px;\n}\n[dir] .select-size-sm.v-select.vs--single .vs__selected {\n  margin-top: 1px;\n}\n[dir] .select-size-sm.vs--single.vs--open .vs__selected {\n  margin-top: 4px;\n}\n.dark-layout .vs__dropdown-toggle {\n  color: #b4b7bd;\n}\n[dir] .dark-layout .vs__dropdown-toggle {\n  background: #283046;\n  border-color: #404656;\n}\n.dark-layout .vs__selected-options input {\n  color: #b4b7bd;\n}\n.dark-layout .vs__selected-options input::placeholder {\n  color: #676d7d;\n}\n.dark-layout .vs__actions svg {\n  fill: #404656;\n}\n[dir] .dark-layout .vs__dropdown-menu {\n  background: #283046;\n}\n.dark-layout .vs__dropdown-menu li {\n  color: #b4b7bd;\n}\n.dark-layout .v-select:not(.vs--single) .vs__selected {\n  color: #7367f0;\n}\n[dir] .dark-layout .v-select:not(.vs--single) .vs__selected {\n  background-color: rgba(115, 103, 240, 0.12);\n}\n.dark-layout .v-select.vs--single .vs__selected {\n  color: #b4b7bd !important;\n}\n.dark-layout .vs--disabled .vs__dropdown-toggle,\n.dark-layout .vs--disabled .vs__clear,\n.dark-layout .vs--disabled .vs__search,\n.dark-layout .vs--disabled .vs__selected,\n.dark-layout .vs--disabled .vs__open-indicator {\n  opacity: 0.5;\n}\n[dir] .dark-layout .vs--disabled .vs__dropdown-toggle, [dir] .dark-layout .vs--disabled .vs__clear, [dir] .dark-layout .vs--disabled .vs__search, [dir] .dark-layout .vs--disabled .vs__selected, [dir] .dark-layout .vs--disabled .vs__open-indicator {\n  background-color: #283046;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=0&id=1bd2e620&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=0&id=1bd2e620&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=0&id=1bd2e620&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=0&id=1bd2e620&lang=scss&scoped=true&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=1&id=1bd2e620&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=1&id=1bd2e620&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=1&id=1bd2e620&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=1&id=1bd2e620&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/Index.vue?vue&type=template&id=1bd2e620&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/addons/Index.vue?vue&type=template&id=1bd2e620&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
      _c("add-addon", {
        attrs: { "is-add-new-addon-active": _vm.isAddNewAddonActive },
        on: {
          "update:isAddNewAddonActive": function ($event) {
            _vm.isAddNewAddonActive = $event
          },
          "update:is-add-new-addon-active": function ($event) {
            _vm.isAddNewAddonActive = $event
          },
          "refetch-data": _vm.fetchAddons,
        },
      }),
      _vm._v(" "),
      _c("edit-addon", {
        attrs: {
          "is-edit-addon-active": _vm.isEditAddonActive,
          addon: _vm.addon,
        },
        on: {
          "update:isEditAddonActive": function ($event) {
            _vm.isEditAddonActive = $event
          },
          "update:is-edit-addon-active": function ($event) {
            _vm.isEditAddonActive = $event
          },
          "refetch-data": _vm.fetchAddons,
        },
      }),
      _vm._v(" "),
      _c("Export", {
        attrs: {
          "is-export-active": _vm.isExportActive,
          filters: _vm.filters,
          "export-url": "/export/addons",
        },
        on: {
          "update:isExportActive": function ($event) {
            _vm.isExportActive = $event
          },
          "update:is-export-active": function ($event) {
            _vm.isExportActive = $event
          },
        },
      }),
      _vm._v(" "),
      _c(
        "b-card",
        { staticClass: "mb-0", attrs: { "no-body": "" } },
        [
          _c(
            "div",
            { staticClass: "m-2" },
            [
              _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    {
                      staticClass:
                        "d-flex align-items-center justify-content-start mb-1 mb-md-0",
                      attrs: { cols: "12", md: "8" },
                    },
                    [
                      _c("label", [_vm._v("Show")]),
                      _vm._v(" "),
                      _c("v-select", {
                        staticClass: "per-page-selector d-inline-block mx-50",
                        attrs: {
                          options: _vm.perPageOptions,
                          clearable: false,
                        },
                        model: {
                          value: _vm.perPage,
                          callback: function ($$v) {
                            _vm.perPage = $$v
                          },
                          expression: "perPage",
                        },
                      }),
                      _vm._v(" "),
                      _c("label", [_vm._v("entries")]),
                      _vm._v(" "),
                      _c(
                        "b-button",
                        {
                          staticClass: "d-inline-block ml-1",
                          attrs: { variant: "primary" },
                          on: {
                            click: function ($event) {
                              _vm.isExportActive = true
                            },
                          },
                        },
                        [
                          _c("span", { staticClass: "text-nowrap" }, [
                            _vm._v("Export"),
                          ]),
                        ]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("b-col", { attrs: { cols: "12", md: "4" } }, [
                    _c(
                      "div",
                      {
                        staticClass:
                          "d-flex align-items-center justify-content-end",
                      },
                      [
                        _c("b-form-input", {
                          staticClass: "d-inline-block mr-1",
                          attrs: { placeholder: "Search..." },
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
                            attrs: { variant: "primary" },
                            on: {
                              click: function ($event) {
                                _vm.isAddNewAddonActive = true
                              },
                            },
                          },
                          [
                            _c("span", { staticClass: "text-nowrap" }, [
                              _vm._v("Add Addon"),
                            ]),
                          ]
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
          _vm._v(" "),
          _c(
            "b-overlay",
            {
              attrs: {
                id: "overlay-background",
                show: _vm.busy,
                variant: "transparent",
                rounded: "sm",
              },
            },
            [
              _c("b-table", {
                ref: "refListTable",
                staticClass: "position-relative",
                attrs: {
                  items: _vm.addons,
                  responsive: "",
                  fields: _vm.tableColumns,
                  "primary-key": "id",
                  "sort-by": _vm.sortBy,
                  "show-empty": "",
                  "empty-text": "No matching records found",
                  "sort-desc": _vm.isSortDirDesc,
                },
                on: {
                  "update:sortBy": function ($event) {
                    _vm.sortBy = $event
                  },
                  "update:sort-by": function ($event) {
                    _vm.sortBy = $event
                  },
                  "update:sortDesc": function ($event) {
                    _vm.isSortDirDesc = $event
                  },
                  "update:sort-desc": function ($event) {
                    _vm.isSortDirDesc = $event
                  },
                },
                scopedSlots: _vm._u([
                  {
                    key: "cell(actions)",
                    fn: function (data) {
                      return [
                        _c(
                          "b-dropdown",
                          {
                            attrs: { variant: "link", "no-caret": "" },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "button-content",
                                  fn: function () {
                                    return [
                                      _c("feather-icon", {
                                        staticClass: "align-middle text-body",
                                        attrs: {
                                          icon: "MoreVerticalIcon",
                                          size: "16",
                                        },
                                      }),
                                    ]
                                  },
                                  proxy: true,
                                },
                              ],
                              null,
                              true
                            ),
                          },
                          [
                            _vm._v(" "),
                            _c(
                              "b-dropdown-item",
                              {
                                on: {
                                  click: function ($event) {
                                    return _vm.editAddon(data.item)
                                  },
                                },
                              },
                              [
                                _c("feather-icon", {
                                  attrs: { icon: "EditIcon" },
                                }),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  { staticClass: "align-middle ml-50" },
                                  [_vm._v("Edit")]
                                ),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-dropdown-item",
                              {
                                on: {
                                  click: function ($event) {
                                    return _vm.confirmDelete(data.item.id)
                                  },
                                },
                              },
                              [
                                _c("feather-icon", {
                                  attrs: { icon: "TrashIcon" },
                                }),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  { staticClass: "align-middle ml-50" },
                                  [_vm._v("Delete")]
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
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "mx-2 mb-2" },
            [
              _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    {
                      staticClass:
                        "d-flex align-items-center justify-content-center justify-content-sm-start",
                      attrs: { cols: "12", sm: "6" },
                    },
                    [
                      _c("span", { staticClass: "text-muted" }, [
                        _vm._v(
                          "Showing " +
                            _vm._s(_vm.dataMeta.from) +
                            " to " +
                            _vm._s(_vm.dataMeta.to) +
                            " of " +
                            _vm._s(_vm.dataMeta.of) +
                            " entries"
                        ),
                      ]),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    {
                      staticClass:
                        "d-flex align-items-center justify-content-center justify-content-sm-end",
                      attrs: { cols: "12", sm: "6" },
                    },
                    [
                      _c("b-pagination", {
                        staticClass: "mb-0 mt-1 mt-sm-0",
                        attrs: {
                          "total-rows": _vm.totalRecords,
                          "per-page": _vm.perPage,
                          "first-number": "",
                          "last-number": "",
                          "prev-class": "prev-item",
                          "next-class": "next-item",
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "prev-text",
                            fn: function () {
                              return [
                                _c("feather-icon", {
                                  attrs: {
                                    icon: "ChevronLeftIcon",
                                    size: "18",
                                  },
                                }),
                              ]
                            },
                            proxy: true,
                          },
                          {
                            key: "next-text",
                            fn: function () {
                              return [
                                _c("feather-icon", {
                                  attrs: {
                                    icon: "ChevronRightIcon",
                                    size: "18",
                                  },
                                }),
                              ]
                            },
                            proxy: true,
                          },
                        ]),
                        model: {
                          value: _vm.currentPage,
                          callback: function ($$v) {
                            _vm.currentPage = $$v
                          },
                          expression: "currentPage",
                        },
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
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/add/AddAddon.vue?vue&type=template&id=6d7a9b6f&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/addons/add/AddAddon.vue?vue&type=template&id=6d7a9b6f& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
      attrs: {
        "cancel-variant": "outline-secondary",
        centered: "",
        "hide-footer": true,
        title: "Add Addon",
        size: "lg",
        visible: _vm.isAddNewAddonActive,
      },
      on: {
        close: function ($event) {
          return _vm.$emit("update:is-add-new-addon-active", false)
        },
        hide: function ($event) {
          return _vm.$emit("update:is-add-new-addon-active", false)
        },
      },
    },
    [
      _c("validation-observer", {
        ref: "refPersonalObserver",
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
                      "b-form",
                      {
                        staticClass: "p-2",
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
                        _c("validation-provider", {
                          attrs: { name: "Title", rules: "required" },
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "default",
                                fn: function (validationContext) {
                                  return [
                                    _c(
                                      "b-form-group",
                                      { attrs: { "label-for": "title" } },
                                      [
                                        _c("b-form-input", {
                                          attrs: {
                                            id: "title",
                                            state:
                                              _vm.getValidationState(
                                                validationContext
                                              ),
                                            trim: "",
                                            placeholder: "Title",
                                          },
                                          model: {
                                            value: _vm.addonData.title,
                                            callback: function ($$v) {
                                              _vm.$set(
                                                _vm.addonData,
                                                "title",
                                                $$v
                                              )
                                            },
                                            expression: "addonData.title",
                                          },
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "b-form-invalid-feedback",
                                          {
                                            attrs: {
                                              state:
                                                _vm.getValidationState(
                                                  validationContext
                                                ),
                                            },
                                          },
                                          [
                                            _vm._v(
                                              "\n              " +
                                                _vm._s(
                                                  validationContext.errors[0]
                                                ) +
                                                "\n            "
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
                        }),
                        _vm._v(" "),
                        _vm._l(_vm.addonData.intervals, function (item, index) {
                          return _c(
                            "b-row",
                            {
                              key: item.id,
                              ref: "row",
                              refInFor: true,
                              attrs: { id: item.id },
                            },
                            [
                              _c(
                                "b-col",
                                { attrs: { md: "4", lg: "3" } },
                                [
                                  _c("validation-provider", {
                                    attrs: {
                                      name: "Interval Unit",
                                      rules: "required",
                                      vid: "interval-unit-" + item.id,
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
                                                    label: "Interval Unit",
                                                    "label-for":
                                                      "interval_" + index,
                                                  },
                                                },
                                                [
                                                  _c("v-select", {
                                                    attrs: {
                                                      placeholder:
                                                        "Interval Unit",
                                                      options:
                                                        _vm.intervalUnits,
                                                      reduce: function (
                                                        interval
                                                      ) {
                                                        return interval.id
                                                      },
                                                      clearable: false,
                                                      label: "title",
                                                      "input-id":
                                                        "interval_" + index,
                                                    },
                                                    model: {
                                                      value: item.interval_unit,
                                                      callback: function ($$v) {
                                                        _vm.$set(
                                                          item,
                                                          "interval_unit",
                                                          $$v
                                                        )
                                                      },
                                                      expression:
                                                        "item.interval_unit",
                                                    },
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "b-form-invalid-feedback",
                                                    {
                                                      attrs: {
                                                        state:
                                                          _vm.getValidationState(
                                                            validationContext
                                                          ),
                                                      },
                                                    },
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
                                  }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-col",
                                { attrs: { md: "3", lg: "3" } },
                                [
                                  _c("validation-provider", {
                                    attrs: {
                                      name: "Interval Length",
                                      rules: "required",
                                      vid: "interval-length-" + item.id,
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
                                                    label: "Interval Length",
                                                    "label-for":
                                                      "interval_length_" +
                                                      index,
                                                  },
                                                },
                                                [
                                                  _c("b-form-input", {
                                                    attrs: {
                                                      id:
                                                        "interval_length_" +
                                                        index,
                                                      type: "number",
                                                      min: "1",
                                                      max: "20",
                                                    },
                                                    model: {
                                                      value:
                                                        item.interval_length,
                                                      callback: function ($$v) {
                                                        _vm.$set(
                                                          item,
                                                          "interval_length",
                                                          $$v
                                                        )
                                                      },
                                                      expression:
                                                        "item.interval_length",
                                                    },
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "b-form-invalid-feedback",
                                                    {
                                                      attrs: {
                                                        state:
                                                          _vm.getValidationState(
                                                            validationContext
                                                          ),
                                                      },
                                                    },
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
                                  }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-col",
                                { attrs: { md: "3", lg: "3" } },
                                [
                                  _c("validation-provider", {
                                    attrs: {
                                      name: "Amount",
                                      rules: "required|decimal",
                                      vid: "amount-" + item.id,
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
                                                    label: "Amount",
                                                    "label-for": "amount",
                                                  },
                                                },
                                                [
                                                  _c("b-form-input", {
                                                    attrs: {
                                                      id: "amount",
                                                      placeholder: "",
                                                    },
                                                    model: {
                                                      value: item.amount,
                                                      callback: function ($$v) {
                                                        _vm.$set(
                                                          item,
                                                          "amount",
                                                          $$v
                                                        )
                                                      },
                                                      expression: "item.amount",
                                                    },
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "b-form-invalid-feedback",
                                                    {
                                                      attrs: {
                                                        state:
                                                          _vm.getValidationState(
                                                            validationContext
                                                          ),
                                                      },
                                                    },
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
                                  }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-col",
                                {
                                  staticClass: "mb-50",
                                  attrs: { lg: "2", md: "2" },
                                },
                                [
                                  index > 0
                                    ? _c(
                                        "b-button",
                                        {
                                          staticClass: "mt-0 mt-md-2",
                                          attrs: {
                                            variant: "danger",
                                            size: "sm",
                                          },
                                          on: {
                                            click: function ($event) {
                                              return _vm.removeItem(index)
                                            },
                                          },
                                        },
                                        [
                                          _c("feather-icon", {
                                            staticClass: "mr-25",
                                            attrs: { icon: "XIcon" },
                                          }),
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("b-col", { attrs: { cols: "12" } }, [
                                _c("hr"),
                              ]),
                            ],
                            1
                          )
                        }),
                        _vm._v(" "),
                        _c(
                          "b-button",
                          {
                            attrs: { variant: "primary", size: "sm" },
                            on: { click: _vm.repeateAgain },
                          },
                          [
                            _c("feather-icon", {
                              staticClass: "mr-25",
                              attrs: { icon: "PlusIcon" },
                            }),
                            _vm._v(" "),
                            _c("span", [_vm._v("Add New")]),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "d-flex mt-2" },
                          [
                            _c(
                              "b-button",
                              {
                                directives: [
                                  {
                                    name: "ripple",
                                    rawName: "v-ripple.400",
                                    value: "rgba(255, 255, 255, 0.15)",
                                    expression: "'rgba(255, 255, 255, 0.15)'",
                                    modifiers: { 400: true },
                                  },
                                ],
                                staticClass: "mr-2",
                                attrs: { variant: "primary", type: "submit" },
                              },
                              [_vm._v("\n            Add\n          ")]
                            ),
                            _vm._v(" "),
                            _c(
                              "b-button",
                              {
                                directives: [
                                  {
                                    name: "ripple",
                                    rawName: "v-ripple.400",
                                    value: "rgba(186, 191, 199, 0.15)",
                                    expression: "'rgba(186, 191, 199, 0.15)'",
                                    modifiers: { 400: true },
                                  },
                                ],
                                attrs: {
                                  type: "button",
                                  variant: "outline-secondary",
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.$emit(
                                      "update:is-add-new-addon-active",
                                      false
                                    )
                                  },
                                },
                              },
                              [_vm._v("\n            Cancel\n          ")]
                            ),
                          ],
                          1
                        ),
                      ],
                      2
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
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/edit/EditAddon.vue?vue&type=template&id=11b6e773&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/admin/addons/edit/EditAddon.vue?vue&type=template&id=11b6e773& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
      attrs: {
        "cancel-variant": "outline-secondary",
        centered: "",
        "hide-footer": true,
        title: "Update Addon",
        size: "lg",
        visible: _vm.isEditAddonActive,
      },
      on: {
        close: function ($event) {
          return _vm.$emit("update:is-edit-addon-active", false)
        },
        hide: function ($event) {
          return _vm.$emit("update:is-edit-addon-active", false)
        },
      },
    },
    [
      _c("validation-observer", {
        ref: "refPersonalObserver",
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
                      "b-form",
                      {
                        staticClass: "p-2",
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
                        _c("validation-provider", {
                          attrs: { name: "Title", rules: "required" },
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "default",
                                fn: function (validationContext) {
                                  return [
                                    _c(
                                      "b-form-group",
                                      { attrs: { "label-for": "title" } },
                                      [
                                        _c("b-form-input", {
                                          attrs: {
                                            id: "title",
                                            state:
                                              _vm.getValidationState(
                                                validationContext
                                              ),
                                            trim: "",
                                            placeholder: "Title",
                                          },
                                          model: {
                                            value: _vm.addonData.title,
                                            callback: function ($$v) {
                                              _vm.$set(
                                                _vm.addonData,
                                                "title",
                                                $$v
                                              )
                                            },
                                            expression: "addonData.title",
                                          },
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "b-form-invalid-feedback",
                                          {
                                            attrs: {
                                              state:
                                                _vm.getValidationState(
                                                  validationContext
                                                ),
                                            },
                                          },
                                          [
                                            _vm._v(
                                              "\n              " +
                                                _vm._s(
                                                  validationContext.errors[0]
                                                ) +
                                                "\n            "
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
                        }),
                        _vm._v(" "),
                        _vm._l(_vm.addonData.intervals, function (item, index) {
                          return _c(
                            "b-row",
                            {
                              key: item.id,
                              ref: "row",
                              refInFor: true,
                              attrs: { id: item.id },
                            },
                            [
                              _c(
                                "b-col",
                                { attrs: { md: "4", lg: "3" } },
                                [
                                  _c("validation-provider", {
                                    attrs: {
                                      name: "Interval Unit",
                                      rules: "required",
                                      vid: "interval-unit-" + item.id,
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
                                                    label: "Interval Unit",
                                                    "label-for":
                                                      "interval_" + index,
                                                  },
                                                },
                                                [
                                                  _c("v-select", {
                                                    attrs: {
                                                      placeholder:
                                                        "Interval Unit",
                                                      options:
                                                        _vm.intervalUnits,
                                                      reduce: function (
                                                        interval
                                                      ) {
                                                        return interval.id
                                                      },
                                                      clearable: false,
                                                      label: "title",
                                                      "input-id":
                                                        "interval_" + index,
                                                    },
                                                    model: {
                                                      value: item.interval_unit,
                                                      callback: function ($$v) {
                                                        _vm.$set(
                                                          item,
                                                          "interval_unit",
                                                          $$v
                                                        )
                                                      },
                                                      expression:
                                                        "item.interval_unit",
                                                    },
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "b-form-invalid-feedback",
                                                    {
                                                      attrs: {
                                                        state:
                                                          _vm.getValidationState(
                                                            validationContext
                                                          ),
                                                      },
                                                    },
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
                                  }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-col",
                                { attrs: { md: "3", lg: "3" } },
                                [
                                  _c("validation-provider", {
                                    attrs: {
                                      name: "Interval Length",
                                      rules: "required",
                                      vid: "interval-length-" + item.id,
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
                                                    label: "Interval Length",
                                                    "label-for":
                                                      "interval_length_" +
                                                      index,
                                                  },
                                                },
                                                [
                                                  _c("b-form-input", {
                                                    attrs: {
                                                      id:
                                                        "interval_length_" +
                                                        index,
                                                      type: "number",
                                                      min: "1",
                                                      max: "20",
                                                    },
                                                    model: {
                                                      value:
                                                        item.interval_length,
                                                      callback: function ($$v) {
                                                        _vm.$set(
                                                          item,
                                                          "interval_length",
                                                          $$v
                                                        )
                                                      },
                                                      expression:
                                                        "item.interval_length",
                                                    },
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "b-form-invalid-feedback",
                                                    {
                                                      attrs: {
                                                        state:
                                                          _vm.getValidationState(
                                                            validationContext
                                                          ),
                                                      },
                                                    },
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
                                  }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-col",
                                { attrs: { md: "3", lg: "3" } },
                                [
                                  _c("validation-provider", {
                                    attrs: {
                                      name: "Amount",
                                      rules: "required|decimal",
                                      vid: "amount-" + item.id,
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
                                                    label: "Amount",
                                                    "label-for": "amount",
                                                  },
                                                },
                                                [
                                                  _c("b-form-input", {
                                                    attrs: {
                                                      id: "amount",
                                                      placeholder: "",
                                                    },
                                                    model: {
                                                      value: item.amount,
                                                      callback: function ($$v) {
                                                        _vm.$set(
                                                          item,
                                                          "amount",
                                                          $$v
                                                        )
                                                      },
                                                      expression: "item.amount",
                                                    },
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "b-form-invalid-feedback",
                                                    {
                                                      attrs: {
                                                        state:
                                                          _vm.getValidationState(
                                                            validationContext
                                                          ),
                                                      },
                                                    },
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
                                  }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-col",
                                {
                                  staticClass: "mb-50",
                                  attrs: { lg: "2", md: "2" },
                                },
                                [
                                  index > 0
                                    ? _c(
                                        "b-button",
                                        {
                                          staticClass: "mt-0 mt-md-2",
                                          attrs: {
                                            variant: "danger",
                                            size: "sm",
                                          },
                                          on: {
                                            click: function ($event) {
                                              return _vm.removeItem(index)
                                            },
                                          },
                                        },
                                        [
                                          _c("feather-icon", {
                                            staticClass: "mr-25",
                                            attrs: { icon: "XIcon" },
                                          }),
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("b-col", { attrs: { cols: "12" } }, [
                                _c("hr"),
                              ]),
                            ],
                            1
                          )
                        }),
                        _vm._v(" "),
                        _c(
                          "b-button",
                          {
                            attrs: { variant: "primary", size: "sm" },
                            on: { click: _vm.repeateAgain },
                          },
                          [
                            _c("feather-icon", {
                              staticClass: "mr-25",
                              attrs: { icon: "PlusIcon" },
                            }),
                            _vm._v(" "),
                            _c("span", [_vm._v("Add New")]),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "d-flex mt-2" },
                          [
                            _c(
                              "b-button",
                              {
                                directives: [
                                  {
                                    name: "ripple",
                                    rawName: "v-ripple.400",
                                    value: "rgba(255, 255, 255, 0.15)",
                                    expression: "'rgba(255, 255, 255, 0.15)'",
                                    modifiers: { 400: true },
                                  },
                                ],
                                staticClass: "mr-2",
                                attrs: { variant: "primary", type: "submit" },
                              },
                              [_vm._v("\n            Update\n          ")]
                            ),
                            _vm._v(" "),
                            _c(
                              "b-button",
                              {
                                directives: [
                                  {
                                    name: "ripple",
                                    rawName: "v-ripple.400",
                                    value: "rgba(186, 191, 199, 0.15)",
                                    expression: "'rgba(186, 191, 199, 0.15)'",
                                    modifiers: { 400: true },
                                  },
                                ],
                                attrs: {
                                  type: "button",
                                  variant: "outline-secondary",
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.$emit(
                                      "update:is-edit-addon-active",
                                      false
                                    )
                                  },
                                },
                              },
                              [_vm._v("\n            Cancel\n          ")]
                            ),
                          ],
                          1
                        ),
                      ],
                      2
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
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/composables/admin/addons.js":
/*!******************************************************!*\
  !*** ./resources/js/src/composables/admin/addons.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useAddons; });
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @axios */ "./resources/js/src/libs/axios.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var ziggy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ziggy-js */ "./node_modules/ziggy-js/dist/index.js");
/* harmony import */ var ziggy_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ziggy_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _toaster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toaster */ "./resources/js/src/composables/admin/toaster.js");






function useAddons() {
  var busy = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(false);
  var respResult = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(null);
  var addons = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])([]);
  var errors = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])('');
  var toast = Object(_toaster__WEBPACK_IMPORTED_MODULE_5__["default"])();
  var perPage = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(10);
  var totalRecords = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(0);
  var currentPage = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(1);
  var perPageOptions = [10, 25, 50, 100];
  var searchQuery = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])('');
  var sortBy = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])('id');
  var isSortDirDesc = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(true);
  var refListTable = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(null);
  var tableColumns = [{
    key: 'id',
    sortable: false
  }, {
    key: 'title',
    sortable: true
  }, {
    key: 'actions'
  }];
  var dataMeta = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["computed"])(function () {
    var localItemsCount = refListTable.value ? refListTable.value.localItems.length : 0;
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalRecords.value
    };
  });

  var fetchAddons = /*#__PURE__*/function () {
    var _ref = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
      var response, total;
      return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('admin.addons.index'), {
                params: {
                  q: searchQuery.value,
                  perPage: perPage.value,
                  page: currentPage.value,
                  sortBy: sortBy.value,
                  sortDesc: isSortDirDesc.value
                }
              });

            case 3:
              response = _context.sent;
              addons.value = response.data.data;

              if (response.data.meta) {
                total = response.data.meta.total;
                totalRecords.value = total;
              }

              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (_context.t0.message === 'Network Error') {
                toast.error(_context.t0.message);
              } else {
                respResult.value = _context.t0;
                toast.error(_context.t0.response.data.message);
              }

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function fetchAddons() {
      return _ref.apply(this, arguments);
    };
  }();

  var storeAddon = /*#__PURE__*/function () {
    var _ref2 = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2(data) {
      var response;
      return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              errors.value = '';
              _context2.prev = 1;
              busy.value = true;
              _context2.next = 5;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('admin.addons.store'), data);

            case 5:
              response = _context2.sent;
              respResult.value = response;
              toast.success(response.data.message);
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);

              if (_context2.t0.message === 'Network Error') {
                toast.error(_context2.t0.message);
              } else {
                respResult.value = _context2.t0;
                toast.error(_context2.t0.response.data.message);
              }

            case 13:
              _context2.prev = 13;
              busy.value = false;
              return _context2.finish(13);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 10, 13, 16]]);
    }));

    return function storeAddon(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var updateAddon = /*#__PURE__*/function () {
    var _ref3 = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee3(data) {
      var response;
      return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              errors.value = '';
              _context3.prev = 1;
              busy.value = true;
              _context3.next = 5;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].put(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('admin.addons.update', data.id), data);

            case 5:
              response = _context3.sent;
              respResult.value = response;
              toast.success(response.data.message);
              _context3.next = 13;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](1);

              if (_context3.t0.message === 'Network Error') {
                toast.error(_context3.t0.message);
              } else {
                respResult.value = _context3.t0;
                toast.error(_context3.t0.response.data.message);
              }

            case 13:
              _context3.prev = 13;
              busy.value = false;
              return _context3.finish(13);

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 10, 13, 16]]);
    }));

    return function updateAddon(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  var deleteAddon = /*#__PURE__*/function () {
    var _ref4 = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee4(id) {
      var response;
      return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              busy.value = true;
              _context4.next = 4;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"]["delete"](ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('admin.addons.destroy', id));

            case 4:
              response = _context4.sent;
              toast.success(response.data.message);
              respResult.value = response;
              _context4.next = 12;
              break;

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);

              if (_context4.t0.message === 'Network Error') {
                toast.error(_context4.t0.message);
              } else {
                respResult.value = _context4.t0;
                toast.error(_context4.t0.response.data.message);
              }

            case 12:
              _context4.prev = 12;
              busy.value = false;
              return _context4.finish(12);

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 9, 12, 15]]);
    }));

    return function deleteAddon(_x3) {
      return _ref4.apply(this, arguments);
    };
  }();

  Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["watch"])([currentPage, searchQuery], function () {
    fetchAddons();
  });
  return {
    searchQuery: searchQuery,
    busy: busy,
    sortBy: sortBy,
    addons: addons,
    errors: errors,
    perPage: perPage,
    dataMeta: dataMeta,
    currentPage: currentPage,
    storeAddon: storeAddon,
    respResult: respResult,
    deleteAddon: deleteAddon,
    updateAddon: updateAddon,
    fetchAddons: fetchAddons,
    totalRecords: totalRecords,
    tableColumns: tableColumns,
    isSortDirDesc: isSortDirDesc,
    perPageOptions: perPageOptions
  };
}

/***/ }),

/***/ "./resources/js/src/views/admin/addons/Index.vue":
/*!*******************************************************!*\
  !*** ./resources/js/src/views/admin/addons/Index.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_1bd2e620_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=1bd2e620&scoped=true& */ "./resources/js/src/views/admin/addons/Index.vue?vue&type=template&id=1bd2e620&scoped=true&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/src/views/admin/addons/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Index_vue_vue_type_style_index_0_id_1bd2e620_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Index.vue?vue&type=style&index=0&id=1bd2e620&lang=scss&scoped=true& */ "./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=0&id=1bd2e620&lang=scss&scoped=true&");
/* harmony import */ var _Index_vue_vue_type_style_index_1_id_1bd2e620_lang_scss___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Index.vue?vue&type=style&index=1&id=1bd2e620&lang=scss& */ "./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=1&id=1bd2e620&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_1bd2e620_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_1bd2e620_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1bd2e620",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/admin/addons/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/admin/addons/Index.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/src/views/admin/addons/Index.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=0&id=1bd2e620&lang=scss&scoped=true&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=0&id=1bd2e620&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_1bd2e620_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=0&id=1bd2e620&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=0&id=1bd2e620&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_1bd2e620_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_1bd2e620_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_1bd2e620_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_1bd2e620_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=1&id=1bd2e620&lang=scss&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=1&id=1bd2e620&lang=scss& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_1bd2e620_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=1&id=1bd2e620&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/Index.vue?vue&type=style&index=1&id=1bd2e620&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_1bd2e620_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_1bd2e620_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_1bd2e620_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_1bd2e620_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/admin/addons/Index.vue?vue&type=template&id=1bd2e620&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/views/admin/addons/Index.vue?vue&type=template&id=1bd2e620&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_1bd2e620_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=1bd2e620&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/Index.vue?vue&type=template&id=1bd2e620&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_1bd2e620_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_1bd2e620_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/admin/addons/add/AddAddon.vue":
/*!**************************************************************!*\
  !*** ./resources/js/src/views/admin/addons/add/AddAddon.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddAddon_vue_vue_type_template_id_6d7a9b6f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddAddon.vue?vue&type=template&id=6d7a9b6f& */ "./resources/js/src/views/admin/addons/add/AddAddon.vue?vue&type=template&id=6d7a9b6f&");
/* harmony import */ var _AddAddon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddAddon.vue?vue&type=script&lang=js& */ "./resources/js/src/views/admin/addons/add/AddAddon.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AddAddon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddAddon_vue_vue_type_template_id_6d7a9b6f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AddAddon_vue_vue_type_template_id_6d7a9b6f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/admin/addons/add/AddAddon.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/admin/addons/add/AddAddon.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/src/views/admin/addons/add/AddAddon.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddAddon.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/add/AddAddon.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/admin/addons/add/AddAddon.vue?vue&type=template&id=6d7a9b6f&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/views/admin/addons/add/AddAddon.vue?vue&type=template&id=6d7a9b6f& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddon_vue_vue_type_template_id_6d7a9b6f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddAddon.vue?vue&type=template&id=6d7a9b6f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/add/AddAddon.vue?vue&type=template&id=6d7a9b6f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddon_vue_vue_type_template_id_6d7a9b6f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddAddon_vue_vue_type_template_id_6d7a9b6f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/admin/addons/edit/EditAddon.vue":
/*!****************************************************************!*\
  !*** ./resources/js/src/views/admin/addons/edit/EditAddon.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditAddon_vue_vue_type_template_id_11b6e773___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditAddon.vue?vue&type=template&id=11b6e773& */ "./resources/js/src/views/admin/addons/edit/EditAddon.vue?vue&type=template&id=11b6e773&");
/* harmony import */ var _EditAddon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditAddon.vue?vue&type=script&lang=js& */ "./resources/js/src/views/admin/addons/edit/EditAddon.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditAddon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditAddon_vue_vue_type_template_id_11b6e773___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditAddon_vue_vue_type_template_id_11b6e773___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/admin/addons/edit/EditAddon.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/admin/addons/edit/EditAddon.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/src/views/admin/addons/edit/EditAddon.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditAddon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EditAddon.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/edit/EditAddon.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditAddon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/admin/addons/edit/EditAddon.vue?vue&type=template&id=11b6e773&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/views/admin/addons/edit/EditAddon.vue?vue&type=template&id=11b6e773& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditAddon_vue_vue_type_template_id_11b6e773___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EditAddon.vue?vue&type=template&id=11b6e773& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/admin/addons/edit/EditAddon.vue?vue&type=template&id=11b6e773&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditAddon_vue_vue_type_template_id_11b6e773___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditAddon_vue_vue_type_template_id_11b6e773___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);