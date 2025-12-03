(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[79],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/Overview.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/absences/Overview.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var _composables_absences__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/composables/absences */ "./resources/js/src/composables/absences.js");
/* harmony import */ var _core_libs_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/libs/i18n */ "./resources/js/src/@core/libs/i18n/index.js");
/* harmony import */ var _libs_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/libs/i18n */ "./resources/js/src/libs/i18n/index.js");
/* harmony import */ var _core_utils_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @core/utils/filter */ "./resources/js/src/@core/utils/filter.js");
/* harmony import */ var vue_good_table__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue-good-table */ "./node_modules/vue-good-table/dist/vue-good-table.esm.js");
/* harmony import */ var _core_components_statistics_cards_StatisticCardHorizontal_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/components/statistics-cards/StatisticCardHorizontal.vue */ "./resources/js/src/@core/components/statistics-cards/StatisticCardHorizontal.vue");
/* harmony import */ var _PendingRequest_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PendingRequest.vue */ "./resources/js/src/views/absences/PendingRequest.vue");
/* harmony import */ var vue_good_table_dist_vue_good_table_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vue-good-table/dist/vue-good-table.css */ "./node_modules/vue-good-table/dist/vue-good-table.css");
/* harmony import */ var vue_good_table_dist_vue_good_table_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(vue_good_table_dist_vue_good_table_css__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _dialogs_AddAbsence_vue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dialogs/AddAbsence.vue */ "./resources/js/src/views/absences/dialogs/AddAbsence.vue");
/* harmony import */ var _dialogs_EditAbsence_vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dialogs/EditAbsence.vue */ "./resources/js/src/views/absences/dialogs/EditAbsence.vue");



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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







/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BRow"],
    BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BCol"],
    BCard: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BCard"],
    BMedia: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BMedia"],
    BLink: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BLink"],
    BBadge: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BBadge"],
    BButton: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BButton"],
    BAvatar: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BAvatar"],
    BOverlay: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BOverlay"],
    BFormInput: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["BFormInput"],
    VueGoodTable: vue_good_table__WEBPACK_IMPORTED_MODULE_9__["VueGoodTable"],
    AddAbsence: _dialogs_AddAbsence_vue__WEBPACK_IMPORTED_MODULE_13__["default"],
    EditAbsence: _dialogs_EditAbsence_vue__WEBPACK_IMPORTED_MODULE_14__["default"],
    PendingRequest: _PendingRequest_vue__WEBPACK_IMPORTED_MODULE_11__["default"],
    StatisticCardHorizontal: _core_components_statistics_cards_StatisticCardHorizontal_vue__WEBPACK_IMPORTED_MODULE_10__["default"]
  },
  setup: function setup(_, _ref) {
    var root = _ref.root;
    var _useAbsences = Object(_composables_absences__WEBPACK_IMPORTED_MODULE_5__["default"])(),
      busy = _useAbsences.busy,
      filters = _useAbsences.filters,
      absences = _useAbsences.absences,
      respResult = _useAbsences.respResult,
      searchQuery = _useAbsences.searchQuery,
      absencesStats = _useAbsences.absencesStats,
      totalRecords = _useAbsences.totalRecords,
      refListTable = _useAbsences.refListTable,
      deleteAbsence = _useAbsences.deleteAbsence,
      isSortDirDesc = _useAbsences.isSortDirDesc,
      resolveStatus = _useAbsences.resolveStatus,
      fetchAbsences = _useAbsences.fetchAbsences,
      fetchAbsencesStats = _useAbsences.fetchAbsencesStats,
      overviewTableColumns = _useAbsences.overviewTableColumns,
      updateAbsenceStatus = _useAbsences.updateAbsenceStatus;
    var searchTerm = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["ref"])('');
    var pageLength = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["ref"])(10);
    var absenceId = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["ref"])(0);
    var isEditAbsenceActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["ref"])(false);
    var isAddAbsenceActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["ref"])(false);
    var _useI18nUtils = Object(_core_libs_i18n__WEBPACK_IMPORTED_MODULE_6__["useUtils"])(),
      t = _useI18nUtils.t;
    var serverParams = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["ref"])({
      columnFilters: {},
      sort: [{
        field: '',
        type: ''
      }],
      page: 1,
      perPage: 10
    });
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["onMounted"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__["default"])().mark(function _callee() {
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__["default"])().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              filters.group = true;
              _context.next = 3;
              return fetchAbsencesStats();
            case 3:
              _context.next = 5;
              return fetchAbsences(serverParams.value);
            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    var editAbsence = function editAbsence(id) {
      absenceId.value = id;
      isEditAbsenceActive.value = true;
    };
    var deleteConfirmed = /*#__PURE__*/function () {
      var _ref3 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__["default"])().mark(function _callee2(id) {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__["default"])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return deleteAbsence(id);
              case 2:
                if (respResult.value.status === 200) {
                  fetchAbsences(serverParams.value);
                }
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return function deleteConfirmed(_x) {
        return _ref3.apply(this, arguments);
      };
    }();
    var absenceStatusConfirmed = /*#__PURE__*/function () {
      var _ref4 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__["default"])().mark(function _callee3(data) {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__["default"])().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return updateAbsenceStatus(data);
              case 2:
                if (respResult.value.status === 200) {
                  fetchAbsences(serverParams.value);
                }
              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return function absenceStatusConfirmed(_x2) {
        return _ref4.apply(this, arguments);
      };
    }();
    var handleSearch = function handleSearch(query) {
      searchQuery.value = query;
      fetchAbsences(serverParams.value);
    };
    var updateParams = function updateParams(newProps) {
      serverParams.value = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, serverParams.value), newProps);
    };
    var onPageChange = function onPageChange(params) {
      updateParams({
        page: params.currentPage
      });
      fetchAbsences(serverParams.value);
    };
    var onPerPageChange = function onPerPageChange(params) {
      updateParams({
        perPage: params.currentPerPage
      });
      fetchAbsences(serverParams.value);
    };
    var onSortChange = function onSortChange(params) {
      updateParams({
        sort: [{
          type: params.sortType,
          field: overviewTableColumns.value[params.columnIndex].field
        }]
      });
      fetchAbsences(serverParams.value);
    };
    var onColumnFilter = function onColumnFilter(params) {
      updateParams(params);
      fetchAbsences(serverParams.value);
    };
    var confirmStatus = /*#__PURE__*/function () {
      var _ref5 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__["default"])().mark(function _callee4(id, status) {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__["default"])().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                root.$bvModal.msgBoxConfirm(_libs_i18n__WEBPACK_IMPORTED_MODULE_7__["default"].t("Please confirm that you want to ".concat(status, " absence request.")), {
                  title: _libs_i18n__WEBPACK_IMPORTED_MODULE_7__["default"].t('Please Confirm'),
                  size: 'sm',
                  okTitle: _libs_i18n__WEBPACK_IMPORTED_MODULE_7__["default"].t('Confirm'),
                  cancelTitle: _libs_i18n__WEBPACK_IMPORTED_MODULE_7__["default"].t('Cancel')
                }).then(function (value) {
                  if (value) {
                    absenceStatusConfirmed({
                      id: id,
                      status: status
                    });
                  }
                });
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      return function confirmStatus(_x3, _x4) {
        return _ref5.apply(this, arguments);
      };
    }();
    var confirmDelete = /*#__PURE__*/function () {
      var _ref6 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__["default"])().mark(function _callee5(id) {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_1__["default"])().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                root.$bvModal.msgBoxConfirm(_libs_i18n__WEBPACK_IMPORTED_MODULE_7__["default"].t('Please confirm that you want to delete absence.'), {
                  title: _libs_i18n__WEBPACK_IMPORTED_MODULE_7__["default"].t('Please Confirm'),
                  size: 'sm',
                  okTitle: _libs_i18n__WEBPACK_IMPORTED_MODULE_7__["default"].t('Confirm'),
                  cancelTitle: _libs_i18n__WEBPACK_IMPORTED_MODULE_7__["default"].t('Cancel')
                }).then(function (value) {
                  if (value) {
                    deleteConfirmed(id);
                  }
                });
              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
      return function confirmDelete(_x5) {
        return _ref6.apply(this, arguments);
      };
    }();
    return {
      t: t,
      busy: busy,
      filters: filters,
      handleSearch: handleSearch,
      onSortChange: onSortChange,
      absences: absences,
      isAddAbsenceActive: isAddAbsenceActive,
      onColumnFilter: onColumnFilter,
      updateParams: updateParams,
      pageLength: pageLength,
      searchTerm: searchTerm,
      serverParams: serverParams,
      avatarText: _core_utils_filter__WEBPACK_IMPORTED_MODULE_8__["avatarText"],
      absenceId: absenceId,
      absencesStats: absencesStats,
      onPerPageChange: onPerPageChange,
      onPageChange: onPageChange,
      editAbsence: editAbsence,
      confirmStatus: confirmStatus,
      totalRecords: totalRecords,
      refListTable: refListTable,
      isSortDirDesc: isSortDirDesc,
      confirmDelete: confirmDelete,
      resolveStatus: resolveStatus,
      fetchAbsences: fetchAbsences,
      overviewTableColumns: overviewTableColumns,
      isEditAbsenceActive: isEditAbsenceActive
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/PendingRequest.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/absences/PendingRequest.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var _composables_absences__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/composables/absences */ "./resources/js/src/composables/absences.js");
/* harmony import */ var _core_libs_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/libs/i18n */ "./resources/js/src/@core/libs/i18n/index.js");
/* harmony import */ var _libs_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/libs/i18n */ "./resources/js/src/libs/i18n/index.js");
/* harmony import */ var _core_utils_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @core/utils/filter */ "./resources/js/src/@core/utils/filter.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BCol"],
    BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BRow"],
    BCard: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BCard"],
    BLink: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BLink"],
    BMedia: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BMedia"],
    BBadge: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BBadge"],
    BTable: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BTable"],
    BAvatar: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BAvatar"],
    BPagination: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__["BPagination"]
  },
  setup: function setup(_, _ref) {
    var root = _ref.root;
    var _useAbsences = Object(_composables_absences__WEBPACK_IMPORTED_MODULE_4__["default"])(),
      busy = _useAbsences.busy,
      sortBy = _useAbsences.sortBy,
      filters = _useAbsences.filters,
      perPage = _useAbsences.perPage,
      absences = _useAbsences.absences,
      dataMeta = _useAbsences.dataMeta,
      respResult = _useAbsences.respResult,
      refetchData = _useAbsences.refetchData,
      searchQuery = _useAbsences.searchQuery,
      currentPage = _useAbsences.currentPage,
      totalRecords = _useAbsences.totalRecords,
      refListTable = _useAbsences.refListTable,
      deleteAbsence = _useAbsences.deleteAbsence,
      absencesStats = _useAbsences.absencesStats,
      isSortDirDesc = _useAbsences.isSortDirDesc,
      resolveStatus = _useAbsences.resolveStatus,
      fetchAbsences = _useAbsences.fetchAbsences,
      absenceStats = _useAbsences.absenceStats,
      perPageOptions = _useAbsences.perPageOptions,
      updateAbsenceStatus = _useAbsences.updateAbsenceStatus,
      pendingTableColumns = _useAbsences.pendingTableColumns;
    var _useI18nUtils = Object(_core_libs_i18n__WEBPACK_IMPORTED_MODULE_5__["useUtils"])(),
      t = _useI18nUtils.t;
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["onMounted"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              filters.status = 'pending';
              _context.next = 3;
              return fetchAbsences();
            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    var isExportActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(false);
    var absenceId = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(0);
    var deleteConfirmed = /*#__PURE__*/function () {
      var _ref3 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2(id) {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return deleteAbsence(id);
              case 2:
                if (respResult.value.status === 200) {
                  fetchAbsences();
                }
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return function deleteConfirmed(_x) {
        return _ref3.apply(this, arguments);
      };
    }();
    var absenceStatusConfirmed = /*#__PURE__*/function () {
      var _ref4 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee3(data) {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return updateAbsenceStatus(data);
              case 2:
                if (respResult.value.status === 200) {
                  fetchAbsences();
                }
              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return function absenceStatusConfirmed(_x2) {
        return _ref4.apply(this, arguments);
      };
    }();
    var confirmStatus = /*#__PURE__*/function () {
      var _ref5 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee4(id, status) {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                root.$bvModal.msgBoxConfirm(_libs_i18n__WEBPACK_IMPORTED_MODULE_6__["default"].t("Please confirm that you want to ".concat(status, " absence request.")), {
                  title: _libs_i18n__WEBPACK_IMPORTED_MODULE_6__["default"].t('Please Confirm'),
                  okTitle: _libs_i18n__WEBPACK_IMPORTED_MODULE_6__["default"].t('Confirm'),
                  cancelTitle: _libs_i18n__WEBPACK_IMPORTED_MODULE_6__["default"].t('Cancel'),
                  size: 'sm'
                }).then(function (value) {
                  if (value) {
                    absenceStatusConfirmed({
                      id: id,
                      status: status
                    });
                  }
                });
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      return function confirmStatus(_x3, _x4) {
        return _ref5.apply(this, arguments);
      };
    }();
    var confirmDelete = /*#__PURE__*/function () {
      var _ref6 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee5(id) {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                root.$bvModal.msgBoxConfirm(_libs_i18n__WEBPACK_IMPORTED_MODULE_6__["default"].t('Please confirm that you want to delete absence.'), {
                  title: _libs_i18n__WEBPACK_IMPORTED_MODULE_6__["default"].t('Please Confirm'),
                  okTitle: _libs_i18n__WEBPACK_IMPORTED_MODULE_6__["default"].t('Confirm'),
                  cancelTitle: _libs_i18n__WEBPACK_IMPORTED_MODULE_6__["default"].t('Cancel'),
                  size: 'sm'
                }).then(function (value) {
                  if (value) {
                    deleteConfirmed(id);
                  }
                });
              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
      return function confirmDelete(_x5) {
        return _ref6.apply(this, arguments);
      };
    }();
    return {
      t: t,
      busy: busy,
      sortBy: sortBy,
      moment: moment__WEBPACK_IMPORTED_MODULE_8___default.a,
      filters: filters,
      perPage: perPage,
      absences: absences,
      dataMeta: dataMeta,
      avatarText: _core_utils_filter__WEBPACK_IMPORTED_MODULE_7__["avatarText"],
      absenceId: absenceId,
      refetchData: refetchData,
      searchQuery: searchQuery,
      currentPage: currentPage,
      absencesStats: absencesStats,
      absenceStats: absenceStats,
      totalRecords: totalRecords,
      confirmStatus: confirmStatus,
      refListTable: refListTable,
      isSortDirDesc: isSortDirDesc,
      confirmDelete: confirmDelete,
      resolveStatus: resolveStatus,
      perPageOptions: perPageOptions,
      isExportActive: isExportActive,
      fetchAbsences: fetchAbsences,
      pendingTableColumns: pendingTableColumns
    };
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=0&id=89b18452&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=0&id=89b18452&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/**\n    Support for SASS is deprecated as of v3.18.\n\n    The files remain here if your build is dependent on them\n    but they will not receive updates in future releases. All\n    SASS variables have been translated into CSS variables, so\n    migration should be quite simple if you'd like to move over.\n\n    In v4, these files will be removed.\n */\n.v-select {\n  position: relative;\n  font-family: inherit;\n}\n.v-select,\n.v-select * {\n  box-sizing: border-box;\n}\n\n/* KeyFrames */\n@-webkit-keyframes vSelectSpinner-ltr {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n@-webkit-keyframes vSelectSpinner-rtl {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(-360deg);\n}\n}\n@keyframes vSelectSpinner-ltr {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n@keyframes vSelectSpinner-rtl {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(-360deg);\n}\n}\n/* Dropdown Default Transition */\n.vs__fade-enter-active,\n.vs__fade-leave-active {\n  pointer-events: none;\n  transition: opacity 0.15s cubic-bezier(1, 0.5, 0.8, 1);\n}\n.vs__fade-enter,\n.vs__fade-leave-to {\n  opacity: 0;\n}\n\n/** Component States */\n/*\n * Disabled\n *\n * When the component is disabled, all interaction\n * should be prevented. Here we modify the bg color,\n * and change the cursor displayed on the interactive\n * components.\n */\n[dir] .vs--disabled .vs__dropdown-toggle, [dir] .vs--disabled .vs__clear, [dir] .vs--disabled .vs__search, [dir] .vs--disabled .vs__selected, [dir] .vs--disabled .vs__open-indicator {\n  cursor: not-allowed;\n  background-color: rgb(248, 248, 248);\n}\n\n/*\n *  RTL - Right to Left Support\n *\n *  Because we're using a flexbox layout, the `dir=\"rtl\"`\n *  HTML attribute does most of the work for us by\n *  rearranging the child elements visually.\n */\n.v-select[dir=rtl] .vs__actions {\n  padding: 0 3px 0 6px;\n}\n.v-select[dir=rtl] .vs__clear {\n  margin-left: 6px;\n  margin-right: 0;\n}\n.v-select[dir=rtl] .vs__deselect {\n  margin-left: 0;\n  margin-right: 2px;\n}\n.v-select[dir=rtl] .vs__dropdown-menu {\n  text-align: right;\n}\n\n/**\n    Dropdown Toggle\n\n    The dropdown toggle is the primary wrapper of the component. It\n    has two direct descendants: .vs__selected-options, and .vs__actions.\n\n    .vs__selected-options holds the .vs__selected's as well as the\n    main search input.\n\n    .vs__actions holds the clear button and dropdown toggle.\n */\n.vs__dropdown-toggle {\n  appearance: none;\n  display: flex;\n  white-space: normal;\n}\n[dir] .vs__dropdown-toggle {\n  padding: 0 0 4px 0;\n  background: none;\n  border: 1px solid #d8d6de;\n  border-radius: 0.357rem;\n}\n.vs__selected-options {\n  display: flex;\n  flex-basis: 100%;\n  flex-grow: 1;\n  flex-wrap: wrap;\n  position: relative;\n}\n[dir] .vs__selected-options {\n  padding: 0 2px;\n}\n.vs__actions {\n  display: flex;\n  align-items: center;\n}\n[dir=ltr] .vs__actions {\n  padding: 4px 6px 0 3px;\n}\n[dir=rtl] .vs__actions {\n  padding: 4px 3px 0 6px;\n}\n\n/* Dropdown Toggle States */\n[dir] .vs--searchable .vs__dropdown-toggle {\n  cursor: text;\n}\n[dir] .vs--unsearchable .vs__dropdown-toggle {\n  cursor: pointer;\n}\n[dir] .vs--open .vs__dropdown-toggle {\n  border-bottom-color: transparent;\n}\n[dir=ltr] .vs--open .vs__dropdown-toggle {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n[dir=rtl] .vs--open .vs__dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.vs__open-indicator {\n  fill: rgba(60, 60, 60, 0.5);\n  transition: transform 150ms cubic-bezier(1, -0.115, 0.975, 0.855);\n}\n[dir] .vs__open-indicator {\n  transform: scale(1);\n  transition-timing-function: cubic-bezier(1, -0.115, 0.975, 0.855);\n}\n[dir=ltr] .vs--open .vs__open-indicator {\n  transform: rotate(180deg) scale(1);\n}\n[dir=rtl] .vs--open .vs__open-indicator {\n  transform: rotate(-180deg) scale(1);\n}\n.vs--loading .vs__open-indicator {\n  opacity: 0;\n}\n\n/* Clear Button */\n.vs__clear {\n  fill: rgba(60, 60, 60, 0.5);\n}\n[dir] .vs__clear {\n  padding: 0;\n  border: 0;\n  background-color: transparent;\n  cursor: pointer;\n}\n[dir=ltr] .vs__clear {\n  margin-right: 8px;\n}\n[dir=rtl] .vs__clear {\n  margin-left: 8px;\n}\n\n/* Dropdown Menu */\n.vs__dropdown-menu {\n  display: block;\n  box-sizing: border-box;\n  position: absolute;\n  top: calc(100% - 1px);\n  z-index: 1000;\n  width: 100%;\n  max-height: 350px;\n  min-width: 160px;\n  overflow-y: auto;\n  list-style: none;\n}\n[dir] .vs__dropdown-menu {\n  padding: 5px 0;\n  margin: 0;\n  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);\n  border: 1px solid #d8d6de;\n  border-top-style: none;\n  border-radius: 0 0 0.357rem 0.357rem;\n  background: #fff;\n}\n[dir=ltr] .vs__dropdown-menu {\n  left: 0;\n  text-align: left;\n}\n[dir=rtl] .vs__dropdown-menu {\n  right: 0;\n  text-align: right;\n}\n[dir] .vs__no-options {\n  text-align: center;\n}\n\n/* List Items */\n.vs__dropdown-option {\n  line-height: 1.42857143; /* Normalize line height */\n  display: block;\n  color: #333; /* Overrides most CSS frameworks */\n  white-space: nowrap;\n}\n[dir] .vs__dropdown-option {\n  padding: 3px 20px;\n  clear: both;\n  cursor: pointer;\n}\n.vs__dropdown-option--highlight {\n  color: #7367f0 !important;\n}\n[dir] .vs__dropdown-option--highlight {\n  background: rgba(115, 103, 240, 0.12);\n}\n.vs__dropdown-option--deselect {\n  color: #fff;\n}\n[dir] .vs__dropdown-option--deselect {\n  background: #fb5858;\n}\n.vs__dropdown-option--disabled {\n  color: rgba(60, 60, 60, 0.5);\n}\n[dir] .vs__dropdown-option--disabled {\n  background: inherit;\n  cursor: inherit;\n}\n\n/* Selected Tags */\n.vs__selected {\n  display: flex;\n  align-items: center;\n  color: #333;\n  line-height: 1.8;\n  z-index: 0;\n}\n[dir] .vs__selected {\n  background-color: #7367f0;\n  border: 0 solid rgba(60, 60, 60, 0.26);\n  border-radius: 0.357rem;\n  margin: 4px 2px 0px 2px;\n  padding: 0 0.25em;\n}\n.vs__deselect {\n  display: inline-flex;\n  appearance: none;\n  fill: rgba(60, 60, 60, 0.5);\n}\n[dir] .vs__deselect {\n  padding: 0;\n  border: 0;\n  cursor: pointer;\n  background: none;\n  text-shadow: 0 1px 0 #fff;\n}\n[dir=ltr] .vs__deselect {\n  margin-left: 4px;\n}\n[dir=rtl] .vs__deselect {\n  margin-right: 4px;\n}\n\n/* States */\n[dir] .vs--single .vs__selected {\n  background-color: transparent;\n  border-color: transparent;\n}\n.vs--single.vs--open .vs__selected, .vs--single.vs--loading .vs__selected {\n  position: absolute;\n  opacity: 0.4;\n}\n.vs--single.vs--searching .vs__selected {\n  display: none;\n}\n\n/* Search Input */\n/**\n * Super weird bug... If this declaration is grouped\n * below, the cancel button will still appear in chrome.\n * If it's up here on it's own, it'll hide it.\n */\n.vs__search::-webkit-search-cancel-button {\n  display: none;\n}\n.vs__search::-webkit-search-decoration,\n.vs__search::-webkit-search-results-button,\n.vs__search::-webkit-search-results-decoration,\n.vs__search::-ms-clear {\n  display: none;\n}\n.vs__search,\n.vs__search:focus {\n  appearance: none;\n  line-height: 1.8;\n  font-size: 1em;\n  outline: none;\n  width: 0;\n  max-width: 100%;\n  flex-grow: 1;\n  z-index: 1;\n}\n[dir] .vs__search, [dir] .vs__search:focus {\n  border: 1px solid transparent;\n  margin: 4px 0 0 0;\n  padding: 0 7px;\n  background: none;\n  box-shadow: none;\n}\n[dir=ltr] .vs__search, [dir=ltr] .vs__search:focus {\n  border-left: none;\n}\n[dir=rtl] .vs__search, [dir=rtl] .vs__search:focus {\n  border-right: none;\n}\n.vs__search::placeholder {\n  color: #6e6b7b;\n}\n\n/**\n    States\n */\n.vs--unsearchable .vs__search {\n  opacity: 1;\n}\n[dir] .vs--unsearchable:not(.vs--disabled) .vs__search {\n  cursor: pointer;\n}\n.vs--single.vs--searching:not(.vs--open):not(.vs--loading) .vs__search {\n  opacity: 0.2;\n}\n\n/* Loading Spinner */\n.vs__spinner {\n  align-self: center;\n  opacity: 0;\n  font-size: 5px;\n  text-indent: -9999em;\n  overflow: hidden;\n  transition: opacity 0.1s;\n}\n[dir] .vs__spinner {\n  border-top: 0.9em solid rgba(100, 100, 100, 0.1);\n  border-bottom: 0.9em solid rgba(100, 100, 100, 0.1);\n  transform: translateZ(0);\n}\n[dir=ltr] .vs__spinner {\n  border-right: 0.9em solid rgba(100, 100, 100, 0.1);\n  border-left: 0.9em solid rgba(60, 60, 60, 0.45);\n  animation:  vSelectSpinner-ltr 1.1s infinite linear;\n}\n[dir=rtl] .vs__spinner {\n  border-left: 0.9em solid rgba(100, 100, 100, 0.1);\n  border-right: 0.9em solid rgba(60, 60, 60, 0.45);\n  animation:  vSelectSpinner-rtl 1.1s infinite linear;\n}\n.vs__spinner,\n.vs__spinner:after {\n  width: 5em;\n  height: 5em;\n}\n[dir] .vs__spinner, [dir] .vs__spinner:after {\n  border-radius: 50%;\n}\n\n/* Loading Spinner States */\n.vs--loading .vs__spinner {\n  opacity: 1;\n}\n.vs__open-indicator {\n  fill: none;\n}\n[dir] .vs__open-indicator {\n  margin-top: 0.15rem;\n}\n.vs__dropdown-toggle {\n  transition: all 0.25s ease-in-out;\n}\n[dir] .vs__dropdown-toggle {\n  padding: 0.59px 0 4px 0;\n}\n[dir=ltr] .vs--single .vs__dropdown-toggle {\n  padding-left: 6px;\n}\n[dir=rtl] .vs--single .vs__dropdown-toggle {\n  padding-right: 6px;\n}\n.vs__dropdown-option--disabled {\n  opacity: 0.5;\n}\n[dir] .vs__dropdown-option--disabled.vs__dropdown-option--selected {\n  background: #7367f0 !important;\n}\n.vs__dropdown-option {\n  color: #6e6b7b;\n}\n[dir] .vs__dropdown-option, [dir] .vs__no-options {\n  padding: 7px 20px;\n}\n.vs__dropdown-option--selected {\n  background-color: #7367f0;\n  color: #fff;\n  position: relative;\n}\n.vs__dropdown-option--selected::after {\n  content: \"\";\n  height: 1.1rem;\n  width: 1.1rem;\n  display: inline-block;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  right: 20px;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 1.1rem;\n}\n[dir=rtl] .vs__dropdown-option--selected::after {\n  left: 20px;\n  right: unset;\n}\n.vs__dropdown-option--selected.vs__dropdown-option--highlight {\n  color: #fff !important;\n  background-color: #7367f0 !important;\n}\n.vs__clear svg {\n  color: #6e6b7b;\n}\n.vs__selected {\n  color: #fff;\n}\n.v-select.vs--single .vs__selected {\n  color: #6e6b7b;\n  transition: transform 0.2s ease;\n}\n[dir] .v-select.vs--single .vs__selected {\n  margin-top: 5px;\n}\n[dir=ltr] .v-select.vs--single .vs__selected input {\n  padding-left: 0;\n}\n[dir=rtl] .v-select.vs--single .vs__selected input {\n  padding-right: 0;\n}\n[dir=ltr] .vs--single.vs--open .vs__selected {\n  transform: translateX(5px);\n}\n[dir=rtl] .vs--single.vs--open .vs__selected {\n  transform: translateX(-5px);\n}\n.vs__selected .vs__deselect {\n  color: inherit;\n}\n.v-select:not(.vs--single) .vs__selected {\n  font-size: 0.9rem;\n}\n[dir] .v-select:not(.vs--single) .vs__selected {\n  border-radius: 3px;\n  padding: 0 0.6em;\n}\n[dir=ltr] .v-select:not(.vs--single) .vs__selected {\n  margin: 5px 2px 2px 5px;\n}\n[dir=rtl] .v-select:not(.vs--single) .vs__selected {\n  margin: 5px 5px 2px 2px;\n}\n.v-select:not(.vs--single) .vs__deselect svg {\n  vertical-align: text-top;\n}\n[dir] .v-select:not(.vs--single) .vs__deselect svg {\n  transform: scale(0.8);\n}\n.vs__dropdown-menu {\n  top: calc(100% + 1rem);\n}\n[dir] .vs__dropdown-menu {\n  border: none;\n  border-radius: 6px;\n  padding: 0;\n}\n[dir] .vs--open .vs__dropdown-toggle {\n  border-color: #7367f0;\n  border-bottom-color: #7367f0;\n  box-shadow: 0 3px 10px 0 rgba(34, 41, 47, 0.1);\n}\n[dir=ltr] .vs--open .vs__dropdown-toggle {\n  border-bottom-left-radius: 0.357rem;\n  border-bottom-right-radius: 0.357rem;\n}\n[dir=rtl] .vs--open .vs__dropdown-toggle {\n  border-bottom-right-radius: 0.357rem;\n  border-bottom-left-radius: 0.357rem;\n}\n.select-size-lg .vs__selected {\n  font-size: 1rem !important;\n}\n[dir] .select-size-lg.vs--single.vs--open .vs__selected {\n  margin-top: 6px;\n}\n.select-size-lg .vs__dropdown-toggle,\n.select-size-lg .vs__selected {\n  font-size: 1.25rem;\n}\n[dir] .select-size-lg .vs__dropdown-toggle {\n  padding: 5px;\n}\n[dir] .select-size-lg .vs__dropdown-toggle input {\n  margin-top: 0;\n}\n.select-size-lg .vs__deselect svg {\n  vertical-align: middle !important;\n}\n[dir] .select-size-lg .vs__deselect svg {\n  transform: scale(1) !important;\n}\n[dir] .select-size-sm .vs__dropdown-toggle {\n  padding-bottom: 0;\n  padding: 1px;\n}\n[dir] .select-size-sm.vs--single .vs__dropdown-toggle {\n  padding: 2px;\n}\n.select-size-sm .vs__dropdown-toggle,\n.select-size-sm .vs__selected {\n  font-size: 0.9rem;\n}\n[dir] .select-size-sm .vs__actions {\n  padding-top: 2px;\n  padding-bottom: 2px;\n}\n.select-size-sm .vs__deselect svg {\n  vertical-align: middle !important;\n}\n[dir] .select-size-sm .vs__search {\n  margin-top: 0;\n}\n.select-size-sm.v-select .vs__selected {\n  font-size: 0.75rem;\n}\n[dir] .select-size-sm.v-select .vs__selected {\n  padding: 0 0.3rem;\n}\n[dir] .select-size-sm.v-select:not(.vs--single) .vs__selected {\n  margin: 4px 5px;\n}\n[dir] .select-size-sm.v-select.vs--single .vs__selected {\n  margin-top: 1px;\n}\n[dir] .select-size-sm.vs--single.vs--open .vs__selected {\n  margin-top: 4px;\n}\n.dark-layout .vs__dropdown-toggle {\n  color: #b4b7bd;\n}\n[dir] .dark-layout .vs__dropdown-toggle {\n  background: #283046;\n  border-color: #404656;\n}\n.dark-layout .vs__selected-options input {\n  color: #b4b7bd;\n}\n.dark-layout .vs__selected-options input::placeholder {\n  color: #676d7d;\n}\n.dark-layout .vs__actions svg {\n  fill: #404656;\n}\n[dir] .dark-layout .vs__dropdown-menu {\n  background: #283046;\n}\n.dark-layout .vs__dropdown-menu li {\n  color: #b4b7bd;\n}\n.dark-layout .v-select:not(.vs--single) .vs__selected {\n  color: #7367f0;\n}\n[dir] .dark-layout .v-select:not(.vs--single) .vs__selected {\n  background-color: rgba(115, 103, 240, 0.12);\n}\n.dark-layout .v-select.vs--single .vs__selected {\n  color: #b4b7bd !important;\n}\n.dark-layout .vs--disabled .vs__dropdown-toggle,\n.dark-layout .vs--disabled .vs__clear,\n.dark-layout .vs--disabled .vs__search,\n.dark-layout .vs--disabled .vs__selected,\n.dark-layout .vs--disabled .vs__open-indicator {\n  opacity: 0.5;\n}\n[dir] .dark-layout .vs--disabled .vs__dropdown-toggle, [dir] .dark-layout .vs--disabled .vs__clear, [dir] .dark-layout .vs--disabled .vs__search, [dir] .dark-layout .vs--disabled .vs__selected, [dir] .dark-layout .vs--disabled .vs__open-indicator {\n  background-color: #283046;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/Overview.vue?vue&type=style&index=0&id=7d89ab18&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/absences/Overview.vue?vue&type=style&index=0&id=7d89ab18&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.vgt-table thead{\n    display: none;\n}\ntable.vgt-table{\n    font-size: 1rem;\n}\ntable.vgt-table th {\n    font-size: 0.857rem;\n    text-transform: uppercase\n}\n[dir] table.vgt-table td {\n    border: none !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=1&id=89b18452&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=1&id=89b18452&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.per-page-selector {\n    width: 90px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=0&id=89b18452&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=0&id=89b18452&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PendingRequest.vue?vue&type=style&index=0&id=89b18452&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=0&id=89b18452&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/Overview.vue?vue&type=style&index=0&id=7d89ab18&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/absences/Overview.vue?vue&type=style&index=0&id=7d89ab18&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Overview.vue?vue&type=style&index=0&id=7d89ab18&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/Overview.vue?vue&type=style&index=0&id=7d89ab18&lang=css&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=1&id=89b18452&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=1&id=89b18452&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PendingRequest.vue?vue&type=style&index=1&id=89b18452&lang=css& */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=1&id=89b18452&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/Overview.vue?vue&type=template&id=7d89ab18&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/absences/Overview.vue?vue&type=template&id=7d89ab18& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
      _c(
        "b-row",
        _vm._l(_vm.absencesStats, function (stats, index) {
          return _c(
            "b-col",
            { key: index, attrs: { cols: "12", md: "3" } },
            [
              _c("statistic-card-horizontal", {
                attrs: {
                  icon: "CalendarIcon",
                  statistic: _vm.$t(stats.type),
                  "statistic-title":
                    stats.total_days + " " + _vm.$t("request(s)"),
                },
              }),
            ],
            1
          )
        }),
        1
      ),
      _vm._v(" "),
      _vm.isEditAbsenceActive
        ? _c("edit-absence", {
            attrs: {
              "is-edit-absence-active": _vm.isEditAbsenceActive,
              "absence-id": _vm.absenceId,
            },
            on: {
              "update:isEditAbsenceActive": function ($event) {
                _vm.isEditAbsenceActive = $event
              },
              "update:is-edit-absence-active": function ($event) {
                _vm.isEditAbsenceActive = $event
              },
              "refetch-data": _vm.fetchAbsences,
            },
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.isAddAbsenceActive
        ? _c("add-absence", {
            attrs: { "is-add-absence-active": _vm.isAddAbsenceActive },
            on: {
              "update:isAddAbsenceActive": function ($event) {
                _vm.isAddAbsenceActive = $event
              },
              "update:is-add-absence-active": function ($event) {
                _vm.isAddAbsenceActive = $event
              },
              "refetch-data": _vm.fetchAbsences,
            },
          })
        : _vm._e(),
      _vm._v(" "),
      _c("PendingRequest"),
      _vm._v(" "),
      _c(
        "b-card",
        { staticClass: "mb-0 mt-2", attrs: { "no-body": "" } },
        [
          _c("h3", { staticClass: "p-1" }, [
            _vm._v("\n      " + _vm._s(_vm.t("Absence Overview")) + "\n    "),
          ]),
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
              _c("div", { staticClass: "d-flex justify-content-end  mb-2" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "d-flex align-items-center col-md-4 mb-1 mb-md-0",
                  },
                  [
                    _c("b-form-input", {
                      staticClass: "d-inline-block mr-1",
                      attrs: { placeholder: "Search", type: "text" },
                      on: { input: _vm.handleSearch },
                      model: {
                        value: _vm.searchTerm,
                        callback: function ($$v) {
                          _vm.searchTerm = $$v
                        },
                        expression: "searchTerm",
                      },
                    }),
                    _vm._v(" "),
                    _vm.$can("absences-add", "all")
                      ? _c(
                          "b-button",
                          {
                            attrs: { variant: "primary" },
                            on: {
                              click: function ($event) {
                                _vm.isAddAbsenceActive = true
                              },
                            },
                          },
                          [
                            _c("span", { staticClass: "text-nowrap" }, [
                              _vm._v(_vm._s(_vm.t("Add Absence"))),
                            ]),
                          ]
                        )
                      : _vm._e(),
                  ],
                  1
                ),
              ]),
              _vm._v(" "),
              _c("vue-good-table", {
                attrs: {
                  mode: "remote",
                  columns: _vm.overviewTableColumns,
                  rows: _vm.absences,
                  "is-loading": _vm.busy,
                  "total-rows": _vm.totalRecords,
                  "sort-options": {
                    enabled: false,
                  },
                  "search-options": {
                    enabled: true,
                    externalQuery: _vm.searchTerm,
                  },
                  "pagination-options": {
                    enabled: true,
                    perPage: _vm.pageLength,
                  },
                  "group-options": {
                    enabled: true,
                  },
                },
                on: {
                  "on-page-change": _vm.onPageChange,
                  "on-per-page-change": _vm.onPerPageChange,
                  "on-sort-change": _vm.onSortChange,
                  "on-column-filter": _vm.onColumnFilter,
                  "update:isLoading": function ($event) {
                    _vm.busy = $event
                  },
                  "update:is-loading": function ($event) {
                    _vm.busy = $event
                  },
                },
                scopedSlots: _vm._u([
                  {
                    key: "table-header-row",
                    fn: function (props) {
                      return [
                        _c(
                          "b-media",
                          {
                            attrs: { "vertical-align": "center" },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "aside",
                                  fn: function () {
                                    return [
                                      _c("b-avatar", {
                                        attrs: {
                                          size: "32",
                                          src: props.row.children[0].user
                                            .avatar_url,
                                          text: _vm.avatarText(props.row.label),
                                          to: {
                                            name: "users-edit",
                                            params: {
                                              id: props.row.children[0].user.id,
                                            },
                                          },
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
                              "b-link",
                              {
                                attrs: {
                                  to: {
                                    name: "users-edit",
                                    params: {
                                      id: props.row.children[0].user.id,
                                    },
                                  },
                                },
                              },
                              [
                                _vm._v(
                                  "\n              " +
                                    _vm._s(props.row.label) +
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
                  {
                    key: "table-row",
                    fn: function (props) {
                      return [
                        props.column.field === "name"
                          ? _c(
                              "span",
                              { staticClass: "text-nowrap" },
                              [
                                _c("b-avatar", {
                                  staticClass: "mx-1",
                                  attrs: { src: props.row.avatar },
                                }),
                                _vm._v(" "),
                                _c("span", { staticClass: "text-nowrap" }, [
                                  _vm._v(_vm._s(props.row.user.name)),
                                ]),
                              ],
                              1
                            )
                          : props.column.field === "from_date"
                          ? _c("span", [
                              props.index === 0
                                ? _c("p", { staticClass: "font-weight-bold" }, [
                                    _vm._v(
                                      "   " +
                                        _vm._s(_vm.$t("From Date")) +
                                        "\n            "
                                    ),
                                  ])
                                : _vm._e(),
                              _vm._v(
                                "\n            " +
                                  _vm._s(props.row.from_date) +
                                  "\n          "
                              ),
                            ])
                          : props.column.field === "to_date"
                          ? _c("span", [
                              props.index === 0
                                ? _c("p", { staticClass: "font-weight-bold" }, [
                                    _vm._v(
                                      "   " +
                                        _vm._s(_vm.$t("To Date")) +
                                        "\n            "
                                    ),
                                  ])
                                : _vm._e(),
                              _vm._v(
                                "\n            " +
                                  _vm._s(props.row.to_date) +
                                  "\n          "
                              ),
                            ])
                          : props.column.field === "days"
                          ? _c("span", { staticClass: "text-nowrap" }, [
                              props.index === 0
                                ? _c("p", { staticClass: "font-weight-bold" }, [
                                    _vm._v(
                                      "   " +
                                        _vm._s(_vm.$t("Days")) +
                                        "\n            "
                                    ),
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              _c("span", { staticClass: "text-nowrap" }, [
                                _vm._v(
                                  _vm._s(props.row.days) +
                                    " " +
                                    _vm._s(_vm.t("day(s)"))
                                ),
                              ]),
                            ])
                          : props.column.field === "status"
                          ? _c(
                              "span",
                              [
                                props.index === 0
                                  ? _c(
                                      "p",
                                      { staticClass: "font-weight-bold" },
                                      [
                                        _vm._v(
                                          "   " +
                                            _vm._s(_vm.$t("Status")) +
                                            "\n            "
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "b-badge",
                                  {
                                    attrs: {
                                      variant: _vm.resolveStatus(
                                        props.row.status
                                      ),
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n              " +
                                        _vm._s(_vm.$t(props.row.status)) +
                                        "\n            "
                                    ),
                                  ]
                                ),
                              ],
                              1
                            )
                          : props.column.field === "type"
                          ? _c("span", [
                              props.index === 0
                                ? _c("p", { staticClass: "font-weight-bold" }, [
                                    _vm._v(
                                      "   " +
                                        _vm._s(_vm.$t("Type")) +
                                        "\n            "
                                    ),
                                  ])
                                : _vm._e(),
                              _vm._v(
                                "\n            " +
                                  _vm._s(props.row.type) +
                                  "\n          "
                              ),
                            ])
                          : props.column.field === "comments"
                          ? _c("span", [
                              props.index === 0
                                ? _c("p", { staticClass: "font-weight-bold" }, [
                                    _vm._v(
                                      "   " +
                                        _vm._s(_vm.$t("Comments")) +
                                        "\n            "
                                    ),
                                  ])
                                : _vm._e(),
                              _vm._v(
                                "\n            " +
                                  _vm._s(props.row.comments) +
                                  "\n          "
                              ),
                            ])
                          : props.column.field === "approved_date"
                          ? _c("span", [
                              props.index === 0
                                ? _c("p", { staticClass: "font-weight-bold" }, [
                                    _vm._v(
                                      "   " +
                                        _vm._s(_vm.$t("Approved Date")) +
                                        "\n            "
                                    ),
                                  ])
                                : _vm._e(),
                              _vm._v(
                                "\n            " +
                                  _vm._s(props.row.approved_date) +
                                  "\n          "
                              ),
                            ])
                          : props.column.field === "approved_by"
                          ? _c("span", [
                              props.index === 0
                                ? _c("p", { staticClass: "font-weight-bold" }, [
                                    _vm._v(
                                      "   " +
                                        _vm._s(_vm.$t("Approved By")) +
                                        "\n            "
                                    ),
                                  ])
                                : _vm._e(),
                              _vm._v(
                                "\n            " +
                                  _vm._s(props.row.approved_by) +
                                  "\n          "
                              ),
                            ])
                          : props.column.field === "actions"
                          ? _c("span", [
                              props.index === 0
                                ? _c("p", { staticClass: "font-weight-bold" }, [
                                    _vm._v(
                                      "   " +
                                        _vm._s(_vm.$t("Actions")) +
                                        "\n            "
                                    ),
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              _c("div", { staticClass: "text-nowrap" }, [
                                props.row.status == "pending"
                                  ? _c("div", [
                                      _c(
                                        "span",
                                        { staticClass: "text-success" },
                                        [
                                          _c("feather-icon", {
                                            staticClass: "cursor-pointer ml-1",
                                            attrs: {
                                              id:
                                                "accept-request-" +
                                                props.row.id +
                                                "-check-btn",
                                              icon: "CheckIcon",
                                              size: "16",
                                            },
                                            on: {
                                              click: function ($event) {
                                                return _vm.confirmStatus(
                                                  props.row.id,
                                                  "approved"
                                                )
                                              },
                                            },
                                          }),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "text-danger" },
                                        [
                                          _c("feather-icon", {
                                            staticClass: "cursor-pointer ml-1",
                                            attrs: {
                                              id:
                                                "decline-request-" +
                                                props.row.id +
                                                "-cross-btn",
                                              icon: "SlashIcon",
                                              size: "16",
                                            },
                                            on: {
                                              click: function ($event) {
                                                return _vm.confirmStatus(
                                                  props.row.id,
                                                  "declined"
                                                )
                                              },
                                            },
                                          }),
                                        ],
                                        1
                                      ),
                                    ])
                                  : _vm._e(),
                                _vm._v(" "),
                                props.row.status == "approved"
                                  ? _c(
                                      "div",
                                      [
                                        _c("feather-icon", {
                                          staticClass: "mx-1 cursor-pointer",
                                          attrs: {
                                            id:
                                              "user-row-" +
                                              props.row.id +
                                              "-pencil-icon",
                                            icon: "EditIcon",
                                            size: "16",
                                          },
                                          on: {
                                            click: function ($event) {
                                              return _vm.editAbsence(
                                                props.row.id
                                              )
                                            },
                                          },
                                        }),
                                        _vm._v(" "),
                                        _c("feather-icon", {
                                          staticClass: "cursor-pointer",
                                          attrs: {
                                            id:
                                              "delete-request-" +
                                              props.row.id +
                                              "-trash-btn",
                                            icon: "Trash2Icon",
                                            size: "16",
                                          },
                                          on: {
                                            click: function ($event) {
                                              return _vm.confirmDelete(
                                                props.row.id
                                              )
                                            },
                                          },
                                        }),
                                      ],
                                      1
                                    )
                                  : _vm._e(),
                              ]),
                            ])
                          : _vm._e(),
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
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/PendingRequest.vue?vue&type=template&id=89b18452&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/absences/PendingRequest.vue?vue&type=template&id=89b18452& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
      _c(
        "b-card",
        { staticClass: "mb-0 mt-2", attrs: { "no-body": "" } },
        [
          _c("h3", { staticClass: "p-1" }, [
            _vm._v("\n      " + _vm._s(_vm.t("Absence requests")) + "\n    "),
          ]),
          _vm._v(" "),
          _c("b-table", {
            ref: "refListTable",
            staticClass: "position-relative",
            attrs: {
              items: _vm.absences,
              responsive: "",
              fields: _vm.pendingTableColumns,
              "primary-key": "id",
              "sort-by": _vm.sortBy,
              "show-empty": "",
              "empty-text": _vm.t("No matching records found"),
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
                key: "cell(user)",
                fn: function (data) {
                  return [
                    _c(
                      "b-media",
                      {
                        attrs: { "vertical-align": "center" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "aside",
                              fn: function () {
                                return [
                                  _c("b-avatar", {
                                    attrs: {
                                      size: "32",
                                      src: data.item.user.avatar_url,
                                      text: _vm.avatarText(data.item.user.name),
                                      to: {
                                        name: "users-edit",
                                        params: { id: data.item.user.id },
                                      },
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
                          "b-link",
                          {
                            attrs: {
                              to: {
                                name: "users-edit",
                                params: { id: data.item.user.id },
                              },
                            },
                          },
                          [
                            _vm._v(
                              "\n            " +
                                _vm._s(data.item.user.name) +
                                "\n          "
                            ),
                          ]
                        ),
                      ],
                      1
                    ),
                  ]
                },
              },
              {
                key: "head()",
                fn: function (data) {
                  return [_c("span", [_vm._v(_vm._s(_vm.$t(data.label)))])]
                },
              },
              {
                key: "cell(type)",
                fn: function (data) {
                  return [
                    _c("span", [_vm._v(_vm._s(_vm.$t(data.item.type)) + " ")]),
                  ]
                },
              },
              {
                key: "cell(days)",
                fn: function (data) {
                  return [
                    _c("span", [
                      _vm._v(
                        _vm._s(data.item.days) + " " + _vm._s(_vm.t("day(s)"))
                      ),
                    ]),
                  ]
                },
              },
              {
                key: "cell(from_date)",
                fn: function (data) {
                  return [
                    _c("span", [
                      _vm._v(
                        _vm._s(
                          _vm.moment(data.item.from_date).format("YYYY.MM.DD")
                        )
                      ),
                    ]),
                  ]
                },
              },
              {
                key: "cell(to_date)",
                fn: function (data) {
                  return [
                    _c("span", [
                      _vm._v(
                        _vm._s(
                          _vm.moment(data.item.to_date).format("YYYY.MM.DD")
                        )
                      ),
                    ]),
                  ]
                },
              },
              {
                key: "cell(status)",
                fn: function (data) {
                  return [
                    _c("div", { staticClass: "text-nowrap" }, [
                      _c(
                        "span",
                        {
                          staticClass: "align-text-top text-capitalize",
                          class: "text-" + _vm.resolveStatus(data.item.status),
                        },
                        [
                          _c(
                            "b-badge",
                            {
                              attrs: {
                                variant: _vm.resolveStatus(data.item.status),
                              },
                            },
                            [
                              _c("span", [
                                _vm._v(_vm._s(_vm.$t(data.item.status))),
                              ]),
                            ]
                          ),
                        ],
                        1
                      ),
                    ]),
                  ]
                },
              },
              {
                key: "cell(actions)",
                fn: function (data) {
                  return [
                    data.item.status !== "approved"
                      ? _c(
                          "div",
                          { staticClass: "text-nowrap" },
                          [
                            _c(
                              "span",
                              { staticClass: "text-success" },
                              [
                                _c("feather-icon", {
                                  staticClass: "cursor-pointer ml-1",
                                  attrs: {
                                    id:
                                      "accept-request-" +
                                      data.item.id +
                                      "-check-btn",
                                    icon: "CheckIcon",
                                    size: "16",
                                  },
                                  on: {
                                    click: function ($event) {
                                      return _vm.confirmStatus(
                                        data.item.id,
                                        "approved"
                                      )
                                    },
                                  },
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              { staticClass: "text-danger" },
                              [
                                _c("feather-icon", {
                                  staticClass: "cursor-pointer ml-1",
                                  attrs: {
                                    id:
                                      "decline-request-" +
                                      data.item.id +
                                      "-cross-btn",
                                    icon: "SlashIcon",
                                    size: "16",
                                  },
                                  on: {
                                    click: function ($event) {
                                      return _vm.confirmStatus(
                                        data.item.id,
                                        "declined"
                                      )
                                    },
                                  },
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("feather-icon", {
                              staticClass: "cursor-pointer ml-1",
                              attrs: {
                                id:
                                  "delete-request-" +
                                  data.item.id +
                                  "-trash-btn",
                                icon: "Trash2Icon",
                                size: "16",
                              },
                              on: {
                                click: function ($event) {
                                  return _vm.confirmDelete(data.item.id)
                                },
                              },
                            }),
                          ],
                          1
                        )
                      : _vm._e(),
                  ]
                },
              },
            ]),
          }),
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
                          _vm._s(_vm.t("Showing")) +
                            " " +
                            _vm._s(_vm.dataMeta.from) +
                            " " +
                            _vm._s(_vm.t("to")) +
                            " " +
                            _vm._s(_vm.dataMeta.to) +
                            " " +
                            _vm._s(_vm.t("of")) +
                            "\n            " +
                            _vm._s(_vm.dataMeta.of) +
                            " " +
                            _vm._s(_vm.t("entries"))
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

/***/ "./resources/js/src/views/absences/Overview.vue":
/*!******************************************************!*\
  !*** ./resources/js/src/views/absences/Overview.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Overview_vue_vue_type_template_id_7d89ab18___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Overview.vue?vue&type=template&id=7d89ab18& */ "./resources/js/src/views/absences/Overview.vue?vue&type=template&id=7d89ab18&");
/* harmony import */ var _Overview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Overview.vue?vue&type=script&lang=js& */ "./resources/js/src/views/absences/Overview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Overview_vue_vue_type_style_index_0_id_7d89ab18_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Overview.vue?vue&type=style&index=0&id=7d89ab18&lang=css& */ "./resources/js/src/views/absences/Overview.vue?vue&type=style&index=0&id=7d89ab18&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Overview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Overview_vue_vue_type_template_id_7d89ab18___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Overview_vue_vue_type_template_id_7d89ab18___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/absences/Overview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/absences/Overview.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/src/views/absences/Overview.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Overview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/Overview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/absences/Overview.vue?vue&type=style&index=0&id=7d89ab18&lang=css&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/views/absences/Overview.vue?vue&type=style&index=0&id=7d89ab18&lang=css& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_id_7d89ab18_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Overview.vue?vue&type=style&index=0&id=7d89ab18&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/Overview.vue?vue&type=style&index=0&id=7d89ab18&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_id_7d89ab18_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_id_7d89ab18_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_id_7d89ab18_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_style_index_0_id_7d89ab18_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/absences/Overview.vue?vue&type=template&id=7d89ab18&":
/*!*************************************************************************************!*\
  !*** ./resources/js/src/views/absences/Overview.vue?vue&type=template&id=7d89ab18& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_template_id_7d89ab18___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Overview.vue?vue&type=template&id=7d89ab18& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/Overview.vue?vue&type=template&id=7d89ab18&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_template_id_7d89ab18___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Overview_vue_vue_type_template_id_7d89ab18___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/absences/PendingRequest.vue":
/*!************************************************************!*\
  !*** ./resources/js/src/views/absences/PendingRequest.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PendingRequest_vue_vue_type_template_id_89b18452___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PendingRequest.vue?vue&type=template&id=89b18452& */ "./resources/js/src/views/absences/PendingRequest.vue?vue&type=template&id=89b18452&");
/* harmony import */ var _PendingRequest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PendingRequest.vue?vue&type=script&lang=js& */ "./resources/js/src/views/absences/PendingRequest.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _PendingRequest_vue_vue_type_style_index_0_id_89b18452_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PendingRequest.vue?vue&type=style&index=0&id=89b18452&lang=scss& */ "./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=0&id=89b18452&lang=scss&");
/* harmony import */ var _PendingRequest_vue_vue_type_style_index_1_id_89b18452_lang_css___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PendingRequest.vue?vue&type=style&index=1&id=89b18452&lang=css& */ "./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=1&id=89b18452&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _PendingRequest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PendingRequest_vue_vue_type_template_id_89b18452___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PendingRequest_vue_vue_type_template_id_89b18452___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/absences/PendingRequest.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/absences/PendingRequest.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/src/views/absences/PendingRequest.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PendingRequest.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/PendingRequest.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=0&id=89b18452&lang=scss&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=0&id=89b18452&lang=scss& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_style_index_0_id_89b18452_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PendingRequest.vue?vue&type=style&index=0&id=89b18452&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=0&id=89b18452&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_style_index_0_id_89b18452_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_style_index_0_id_89b18452_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_style_index_0_id_89b18452_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_style_index_0_id_89b18452_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=1&id=89b18452&lang=css&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=1&id=89b18452&lang=css& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_style_index_1_id_89b18452_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PendingRequest.vue?vue&type=style&index=1&id=89b18452&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/PendingRequest.vue?vue&type=style&index=1&id=89b18452&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_style_index_1_id_89b18452_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_style_index_1_id_89b18452_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_style_index_1_id_89b18452_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_style_index_1_id_89b18452_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/absences/PendingRequest.vue?vue&type=template&id=89b18452&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/views/absences/PendingRequest.vue?vue&type=template&id=89b18452& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_template_id_89b18452___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PendingRequest.vue?vue&type=template&id=89b18452& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/absences/PendingRequest.vue?vue&type=template&id=89b18452&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_template_id_89b18452___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingRequest_vue_vue_type_template_id_89b18452___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);