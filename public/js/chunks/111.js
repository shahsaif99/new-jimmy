(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[111],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");

//
//
//
//
//
//
//
//
//
//
//
//
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
    BCard: bootstrap_vue__WEBPACK_IMPORTED_MODULE_1__["BCard"],
    BAvatar: bootstrap_vue__WEBPACK_IMPORTED_MODULE_1__["BAvatar"]
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    statistic: {
      type: [Number, String],
      required: true
    },
    statisticTitle: {
      type: [Number, String],
      "default": ''
    },
    color: {
      type: String,
      "default": 'primary'
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/Index.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/avvik-listings/Index.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _composables_avvikRuh__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/composables/avvikRuh */ "./resources/js/src/composables/avvikRuh.js");
/* harmony import */ var _core_libs_i18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/libs/i18n */ "./resources/js/src/@core/libs/i18n/index.js");
/* harmony import */ var _libs_i18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/libs/i18n */ "./resources/js/src/libs/i18n/index.js");
/* harmony import */ var vue_flatpickr_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vue-flatpickr-component */ "./node_modules/vue-flatpickr-component/dist/vue-flatpickr.min.js");
/* harmony import */ var vue_flatpickr_component__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(vue_flatpickr_component__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _core_components_statistics_cards_StatisticCardVertical_vue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @core/components/statistics-cards/StatisticCardVertical.vue */ "./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue");
/* harmony import */ var vue_apexcharts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vue-apexcharts */ "./node_modules/vue-apexcharts/dist/vue-apexcharts.js");
/* harmony import */ var vue_apexcharts__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(vue_apexcharts__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _themeConfig__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @themeConfig */ "./resources/js/themeConfig.js");
/* harmony import */ var _Create_vue__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Create.vue */ "./resources/js/src/views/avvik-listings/Create.vue");
/* harmony import */ var _Edit_vue__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Edit.vue */ "./resources/js/src/views/avvik-listings/Edit.vue");
/* harmony import */ var _sidebar_AvvikDetailsSidebar_vue__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./sidebar/AvvikDetailsSidebar.vue */ "./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue");






//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BCol"],
    BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BRow"],
    BCard: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BCard"],
    BTable: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BTable"],
    BButton: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BButton"],
    vSelect: vue_select__WEBPACK_IMPORTED_MODULE_8___default.a,
    BOverlay: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BOverlay"],
    BBadge: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BBadge"],
    BCardBody: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BCardBody"],
    flatPickr: vue_flatpickr_component__WEBPACK_IMPORTED_MODULE_12___default.a,
    BFormInput: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BFormInput"],
    BPagination: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BPagination"],
    BDropdown: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BDropdown"],
    BCardTitle: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BCardTitle"],
    VueApexCharts: vue_apexcharts__WEBPACK_IMPORTED_MODULE_14___default.a,
    BDropdownItem: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BDropdownItem"],
    EditAvvikListing: _Edit_vue__WEBPACK_IMPORTED_MODULE_17__["default"],
    CreateAvvikListing: _Create_vue__WEBPACK_IMPORTED_MODULE_16__["default"],
    StatisticCardVertical: _core_components_statistics_cards_StatisticCardVertical_vue__WEBPACK_IMPORTED_MODULE_13__["default"],
    AvvikDetailsSidebar: _sidebar_AvvikDetailsSidebar_vue__WEBPACK_IMPORTED_MODULE_18__["default"]
  },
  setup: function setup(_, _ref) {
    var root = _ref.root;
    var _useAvvikRuh = Object(_composables_avvikRuh__WEBPACK_IMPORTED_MODULE_9__["default"])(),
      busy = _useAvvikRuh.busy,
      sortBy = _useAvvikRuh.sortBy,
      filters = _useAvvikRuh.filters,
      perPage = _useAvvikRuh.perPage,
      student = _useAvvikRuh.student,
      dataMeta = _useAvvikRuh.dataMeta,
      avvikruhListings = _useAvvikRuh.avvikruhListings,
      avvikDataFromComposable = _useAvvikRuh.avvikData,
      respResult = _useAvvikRuh.respResult,
      refetchData = _useAvvikRuh.refetchData,
      searchQuery = _useAvvikRuh.searchQuery,
      currentPage = _useAvvikRuh.currentPage,
      tableColumns = _useAvvikRuh.tableColumns,
      totalRecords = _useAvvikRuh.totalRecords,
      refListTable = _useAvvikRuh.refListTable,
      resolveStatus = _useAvvikRuh.resolveStatus,
      isSortDirDesc = _useAvvikRuh.isSortDirDesc,
      perPageOptions = _useAvvikRuh.perPageOptions,
      avvikStatistics = _useAvvikRuh.avvikStatistics,
      deleteAvvikListing = _useAvvikRuh.deleteAvvikListing,
      fetchAvvikListings = _useAvvikRuh.fetchAvvikListings,
      getAvvikListing = _useAvvikRuh.getAvvikListing;
    var _useI18nUtils = Object(_core_libs_i18n__WEBPACK_IMPORTED_MODULE_10__["useUtils"])(),
      t = _useI18nUtils.t;
    var avvikTotal = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__["ref"])(0);
    var isExportActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__["ref"])(false);
    var isAddAvvikListingActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__["ref"])(false);
    var isEditAvvikListingActive = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__["ref"])(false);
    var avvikData = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__["ref"])({});

    // Sidebar state
    var isDetailsSidebarVisible = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__["ref"])(false);
    var selectedAvvikDetails = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__["ref"])(null);
    var detailsLoading = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__["ref"])(false);
    var onRowClicked = /*#__PURE__*/function () {
      var _ref2 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee(item) {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isDetailsSidebarVisible.value = true;
                detailsLoading.value = true;
                selectedAvvikDetails.value = null;
                _context.next = 5;
                return getAvvikListing(item.id);
              case 5:
                selectedAvvikDetails.value = avvikDataFromComposable.value;
                detailsLoading.value = false;
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function onRowClicked(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    var deleteConfirmed = /*#__PURE__*/function () {
      var _ref3 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2(id) {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return deleteAvvikListing(id);
              case 2:
                if (respResult.value.status === 200) {
                  fetchAvvikListings();
                }
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return function deleteConfirmed(_x2) {
        return _ref3.apply(this, arguments);
      };
    }();
    var editAvvikListing = function editAvvikListing(item) {
      avvikData.value = item;
      isEditAvvikListingActive.value = true;
    };
    var confirmDelete = /*#__PURE__*/function () {
      var _ref4 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee3(id) {
        return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                root.$bvModal.msgBoxConfirm(_libs_i18n__WEBPACK_IMPORTED_MODULE_11__["default"].t('Please confirm that you want to delete avvik.'), {
                  title: _libs_i18n__WEBPACK_IMPORTED_MODULE_11__["default"].t('Please Confirm'),
                  size: 'sm',
                  okTitle: _libs_i18n__WEBPACK_IMPORTED_MODULE_11__["default"].t('Confirm'),
                  cancelTitle: _libs_i18n__WEBPACK_IMPORTED_MODULE_11__["default"].t('Cancel')
                }).then(function (value) {
                  if (value) {
                    deleteConfirmed(id);
                  }
                });
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return function confirmDelete(_x3) {
        return _ref4.apply(this, arguments);
      };
    }();
    var monthlyChart = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__["ref"])({
      series: [{
        name: 'Number of Avvik',
        data: []
      }, {
        name: 'Number of Uønsket hendelse',
        data: [-145, -80, -60, -180, -100, -60, -85, -75, -100]
      }],
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          },
          type: 'line',
          dropShadow: {
            enabled: true,
            top: 18,
            left: 2,
            blur: 5,
            opacity: 0.2
          },
          offsetX: -10
        },
        stroke: {
          curve: 'smooth',
          width: 4
        },
        grid: {
          borderColor: '#ebe9f1',
          padding: {
            top: -20,
            bottom: 5,
            left: 20
          }
        },
        legend: {
          show: false
        },
        colors: ['#df87f2', '#f66d9b'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            inverseColors: false,
            gradientToColors: [_themeConfig__WEBPACK_IMPORTED_MODULE_15__["$themeColors"].primary],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        markers: {
          size: 0,
          hover: {
            size: 5
          }
        },
        xaxis: {
          labels: {
            offsetY: 5,
            style: {
              colors: '#b9b9c3',
              fontSize: '0.857rem'
            }
          },
          axisTicks: {
            show: false
          },
          categories: [],
          axisBorder: {
            show: false
          },
          tickPlacement: 'on'
        },
        yaxis: {
          tickAmount: 5,
          labels: {
            style: {
              colors: '#b9b9c3',
              fontSize: '0.857rem'
            },
            formatter: function formatter(val) {
              return val > 999 ? "".concat((val / 1000).toFixed(1), "k") : val;
            }
          }
        },
        tooltip: {
          x: {
            show: false
          }
        }
      }
    });
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__["onMounted"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee4() {
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return fetchAvvikListings();
            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));

    // watch(avvikStatistics, () => {
    //   if (!busy.value) {
    //     monthlyChart.value.series[0].data = avvikStatistics.value.avvikListingsMonthlyDeviation
    //     monthlyChart.value.series[1].data = avvikStatistics.value.avvikListingsMonthlyUnwantedInnciednt
    //     monthlyChart.value.chartOptions.xaxis.categories = avvikStatistics.value.avvikListingsMonthlyLabels
    //   }
    // })

    // watch monthlyChart

    var filterRecords = function filterRecords() {
      fetchAvvikListings();
    };
    var resetFilter = function resetFilter() {
      Object.keys(filters).forEach(function (index) {
        filters[index] = null;
      });
      fetchAvvikListings();
    };
    var pickerConfig = {
      mode: 'range',
      dateFormat: 'Y-m-d'
    };
    return {
      t: t,
      busy: busy,
      sortBy: sortBy,
      filters: filters,
      student: student,
      perPage: perPage,
      dataMeta: dataMeta,
      avvikData: avvikData,
      avvikStatistics: avvikStatistics,
      filterRecords: filterRecords,
      refetchData: refetchData,
      resetFilter: resetFilter,
      avvikTotal: avvikTotal,
      resolveStatus: resolveStatus,
      searchQuery: searchQuery,
      monthlyChart: monthlyChart,
      avvikruhListings: avvikruhListings,
      currentPage: currentPage,
      tableColumns: tableColumns,
      pickerConfig: pickerConfig,
      totalRecords: totalRecords,
      refListTable: refListTable,
      isSortDirDesc: isSortDirDesc,
      editAvvikListing: editAvvikListing,
      confirmDelete: confirmDelete,
      perPageOptions: perPageOptions,
      isExportActive: isExportActive,
      fetchAvvikListings: fetchAvvikListings,
      deleteAvvikListing: deleteAvvikListing,
      isAddAvvikListingActive: isAddAvvikListingActive,
      isEditAvvikListingActive: isEditAvvikListingActive,
      isDetailsSidebarVisible: isDetailsSidebarVisible,
      selectedAvvikDetails: selectedAvvikDetails,
      detailsLoading: detailsLoading,
      onRowClicked: onRowClicked
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var _core_libs_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/libs/i18n */ "./resources/js/src/@core/libs/i18n/index.js");
/* harmony import */ var html2pdf_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! html2pdf.js */ "./node_modules/html2pdf.js/dist/html2pdf.js");
/* harmony import */ var html2pdf_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(html2pdf_js__WEBPACK_IMPORTED_MODULE_6__);




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    BBadge: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BBadge"],
    BButton: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BButton"],
    BSidebar: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BSidebar"],
    BSpinner: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BSpinner"],
    BDropdown: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BDropdown"],
    BDropdownItem: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BDropdownItem"]
  },
  model: {
    prop: 'isVisible',
    event: 'update:is-visible'
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    avvikDetails: {
      type: Object,
      "default": null
    },
    loading: {
      type: Boolean,
      "default": false
    }
  },
  setup: function setup(props) {
    var _useI18nUtils = Object(_core_libs_i18n__WEBPACK_IMPORTED_MODULE_5__["useUtils"])(),
      t = _useI18nUtils.t;
    var getStatusDotClass = function getStatusDotClass(status) {
      if (status === 'Closed') {
        return 'bg-success';
      }
      if (status === 'Open') {
        return 'bg-warning';
      }
      return 'bg-primary';
    };
    var generatePdfHtml = function generatePdfHtml() {
      var data = props.avvikDetails;
      if (!data) return '';
      return "\n        <div style=\"font-family: Arial, sans-serif; padding: 20px; font-size: 12px;\">\n          <!-- Header -->\n          <div style=\"display: flex; justify-content: space-between; align-items: center; padding-bottom: 50px;\">\n            <h1 style=\"margin: 0; font-size: 18px; \">".concat(data.type || 'HSE DEVIATION', "</h1>\n            <div style=\"text-align: right; color: #666;\">[LOGO]</div>\n          </div>\n\n          <!-- Border after header -->\n          <div style=\"border-bottom: 2px solid ; margin-bottom: 50px;\"></div>\n\n          <!-- Title Section -->\n          <div style=\"display: flex; justify-content: space-between; align-items: center; padding-bottom: 50px;\">\n            <h2 style=\"margin: 0; font-size: 20px; font-weight: bold;\">").concat(data.title || 'Title of the deviation', "</h2>\n            <div style=\"font-size: 12px;\"><strong>REGISTERED DATE</strong> ").concat(data.date || '-', "</div>\n          </div>\n\n          <!-- Border after title -->\n          <div style=\"border-bottom: 2px solid ; margin-bottom: 20px;\"></div>\n\n          <!-- Two Column Layout -->\n          <div style=\"display: flex; gap: 40px;\">\n            <!-- Left Column - Details -->\n            <div style=\"min-width:500px\">\n              <table style=\"width: 100%; border-collapse: collapse; border: 2px solid #333;\">\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">ID:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">S-").concat(data.id || '-', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">STATUS:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.close_status || data.status || '-', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">TIME OF INCIDENT:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.time_of_incident || '-', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">REGISTERED DATE:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.date || '-', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">REGISTERED BY:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.registered_by || '-', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">PROCESSED BY:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.user ? data.user.name : '-', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">TYPE:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.type || '-', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">PROJECT:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.project ? data.project.name : '-', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">CATEGORY:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.event_type || '-', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">LOCATION:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.location || '-', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">SEVERITY:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.severity || '-', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">RESULT IN ABSENCE:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.resulted_in_absence ? 'Yes' : 'No', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">MEDICAL TREATMENT:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.medical_treatment_needed ? 'Yes' : 'No', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">DAYS:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.days_of_absence ? data.days_of_absence + ' days' : '-', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">CLOSED:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.close_date || '-', "</td>\n                </tr>\n                <tr>\n                  <td style=\"padding: 12px 8px; font-weight: bold; white-space: nowrap; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-left: 2px solid #333;\">CLOSED BY:</td>\n                  <td style=\"padding: 12px 8px; text-align: start; vertical-align: middle; border-top: 2px solid #333; border-bottom: 2px solid #333; border-right: 2px solid #333;\">").concat(data.closed_by ? data.closed_by.name : '-', "</td>\n                </tr>\n              </table>\n            </div>\n\n            <!-- Right Column - Descriptions -->\n            <div style=\"flex: 1.2;\">\n              <div style=\"margin-bottom: 25px;\">\n                <h3 style=\"font-size: 13px; font-weight: bold; margin-bottom: 8px; \">DESCRIPTION OF DEVIATION:</h3>\n                <p style=\"margin: 0; line-height: 1.5; \">").concat(data.description || '-', "</p>\n              </div>\n\n              <div style=\"margin-bottom: 25px;\">\n                <h3 style=\"font-size: 13px; font-weight: bold; margin-bottom: 8px; \">DESCRIPTION OF THE OUTCOME OF THE INCIDENT</h3>\n                <p style=\"margin: 0; line-height: 1.5; \">").concat(data.casual_analysis || '-', "</p>\n              </div>\n\n              <div style=\"margin-bottom: 25px;\">\n                <h3 style=\"font-size: 13px; font-weight: bold; margin-bottom: 8px; \">DESCRIPTION OF IMMEDIATE ACTIONS:</h3>\n                <p style=\"margin: 0; line-height: 1.5; \">").concat(data.immediate_action || '-', "</p>\n              </div>\n\n              <div style=\"margin-bottom: 25px;\">\n                <h3 style=\"font-size: 13px; font-weight: bold; margin-bottom: 8px; \">COMMENT ON CLOSING INCIDENT:</h3>\n                <p style=\"margin: 0; line-height: 1.5; \">").concat(data.close_comment || '-', "</p>\n              </div>\n            </div>\n          </div>\n        </div>\n      ");
    };
    var viewReport = function viewReport() {
      var _props$avvikDetails;
      var htmlContent = generatePdfHtml();
      var newWindow = window.open('', '_blank');
      newWindow.document.write("\n        <html>\n          <head>\n            <title>Avvik Report - S-".concat(((_props$avvikDetails = props.avvikDetails) === null || _props$avvikDetails === void 0 ? void 0 : _props$avvikDetails.id) || '', "</title>\n            <style>\n              body { margin: 0; padding: 20px; }\n              @media print {\n                body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n              }\n            </style>\n          </head>\n          <body>\n            ").concat(htmlContent, "\n          </body>\n        </html>\n      "));
      newWindow.document.close();
    };
    var downloadReport = function downloadReport() {
      var _props$avvikDetails2;
      var htmlContent = generatePdfHtml();
      var opt = {
        margin: 0.5,
        filename: "Avvik-Report-S-".concat(((_props$avvikDetails2 = props.avvikDetails) === null || _props$avvikDetails2 === void 0 ? void 0 : _props$avvikDetails2.id) || 'unknown', ".pdf"),
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        html2canvas: {
          scale: 2
        },
        jsPDF: {
          unit: 'in',
          format: 'a4',
          orientation: 'portrait'
        }
      };
      html2pdf_js__WEBPACK_IMPORTED_MODULE_6___default()().set(opt).from(htmlContent).save();
    };
    return {
      t: t,
      getStatusDotClass: getStatusDotClass,
      viewReport: viewReport,
      downloadReport: downloadReport
    };
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=0&id=3d0aa666&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=0&id=3d0aa666&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".per-page-selector {\n  width: 90px;\n}\n[dir] .cursor-pointer {\n  cursor: pointer;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=1&id=3d0aa666&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=1&id=3d0aa666&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(/*! -!../../../../../node_modules/css-loader/dist/cjs.js!flatpickr/dist/flatpickr.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/flatpickr/dist/flatpickr.css");
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
// Module
exports.push([module.i, "/**\n    Support for SASS is deprecated as of v3.18.\n\n    The files remain here if your build is dependent on them\n    but they will not receive updates in future releases. All\n    SASS variables have been translated into CSS variables, so\n    migration should be quite simple if you'd like to move over.\n\n    In v4, these files will be removed.\n */\n.v-select {\n  position: relative;\n  font-family: inherit;\n}\n.v-select,\n.v-select * {\n  box-sizing: border-box;\n}\n\n/* KeyFrames */\n@-webkit-keyframes vSelectSpinner-ltr {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n@-webkit-keyframes vSelectSpinner-rtl {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(-360deg);\n}\n}\n@keyframes vSelectSpinner-ltr {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n@keyframes vSelectSpinner-rtl {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(-360deg);\n}\n}\n/* Dropdown Default Transition */\n.vs__fade-enter-active,\n.vs__fade-leave-active {\n  pointer-events: none;\n  transition: opacity 0.15s cubic-bezier(1, 0.5, 0.8, 1);\n}\n.vs__fade-enter,\n.vs__fade-leave-to {\n  opacity: 0;\n}\n\n/** Component States */\n/*\n * Disabled\n *\n * When the component is disabled, all interaction\n * should be prevented. Here we modify the bg color,\n * and change the cursor displayed on the interactive\n * components.\n */\n[dir] .vs--disabled .vs__dropdown-toggle, [dir] .vs--disabled .vs__clear, [dir] .vs--disabled .vs__search, [dir] .vs--disabled .vs__selected, [dir] .vs--disabled .vs__open-indicator {\n  cursor: not-allowed;\n  background-color: rgb(248, 248, 248);\n}\n\n/*\n *  RTL - Right to Left Support\n *\n *  Because we're using a flexbox layout, the `dir=\"rtl\"`\n *  HTML attribute does most of the work for us by\n *  rearranging the child elements visually.\n */\n.v-select[dir=rtl] .vs__actions {\n  padding: 0 3px 0 6px;\n}\n.v-select[dir=rtl] .vs__clear {\n  margin-left: 6px;\n  margin-right: 0;\n}\n.v-select[dir=rtl] .vs__deselect {\n  margin-left: 0;\n  margin-right: 2px;\n}\n.v-select[dir=rtl] .vs__dropdown-menu {\n  text-align: right;\n}\n\n/**\n    Dropdown Toggle\n\n    The dropdown toggle is the primary wrapper of the component. It\n    has two direct descendants: .vs__selected-options, and .vs__actions.\n\n    .vs__selected-options holds the .vs__selected's as well as the\n    main search input.\n\n    .vs__actions holds the clear button and dropdown toggle.\n */\n.vs__dropdown-toggle {\n  appearance: none;\n  display: flex;\n  white-space: normal;\n}\n[dir] .vs__dropdown-toggle {\n  padding: 0 0 4px 0;\n  background: none;\n  border: 1px solid #d8d6de;\n  border-radius: 0.357rem;\n}\n.vs__selected-options {\n  display: flex;\n  flex-basis: 100%;\n  flex-grow: 1;\n  flex-wrap: wrap;\n  position: relative;\n}\n[dir] .vs__selected-options {\n  padding: 0 2px;\n}\n.vs__actions {\n  display: flex;\n  align-items: center;\n}\n[dir=ltr] .vs__actions {\n  padding: 4px 6px 0 3px;\n}\n[dir=rtl] .vs__actions {\n  padding: 4px 3px 0 6px;\n}\n\n/* Dropdown Toggle States */\n[dir] .vs--searchable .vs__dropdown-toggle {\n  cursor: text;\n}\n[dir] .vs--unsearchable .vs__dropdown-toggle {\n  cursor: pointer;\n}\n[dir] .vs--open .vs__dropdown-toggle {\n  border-bottom-color: transparent;\n}\n[dir=ltr] .vs--open .vs__dropdown-toggle {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n}\n[dir=rtl] .vs--open .vs__dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.vs__open-indicator {\n  fill: rgba(60, 60, 60, 0.5);\n  transition: transform 150ms cubic-bezier(1, -0.115, 0.975, 0.855);\n}\n[dir] .vs__open-indicator {\n  transform: scale(1);\n  transition-timing-function: cubic-bezier(1, -0.115, 0.975, 0.855);\n}\n[dir=ltr] .vs--open .vs__open-indicator {\n  transform: rotate(180deg) scale(1);\n}\n[dir=rtl] .vs--open .vs__open-indicator {\n  transform: rotate(-180deg) scale(1);\n}\n.vs--loading .vs__open-indicator {\n  opacity: 0;\n}\n\n/* Clear Button */\n.vs__clear {\n  fill: rgba(60, 60, 60, 0.5);\n}\n[dir] .vs__clear {\n  padding: 0;\n  border: 0;\n  background-color: transparent;\n  cursor: pointer;\n}\n[dir=ltr] .vs__clear {\n  margin-right: 8px;\n}\n[dir=rtl] .vs__clear {\n  margin-left: 8px;\n}\n\n/* Dropdown Menu */\n.vs__dropdown-menu {\n  display: block;\n  box-sizing: border-box;\n  position: absolute;\n  top: calc(100% - 1px);\n  z-index: 1000;\n  width: 100%;\n  max-height: 350px;\n  min-width: 160px;\n  overflow-y: auto;\n  list-style: none;\n}\n[dir] .vs__dropdown-menu {\n  padding: 5px 0;\n  margin: 0;\n  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);\n  border: 1px solid #d8d6de;\n  border-top-style: none;\n  border-radius: 0 0 0.357rem 0.357rem;\n  background: #fff;\n}\n[dir=ltr] .vs__dropdown-menu {\n  left: 0;\n  text-align: left;\n}\n[dir=rtl] .vs__dropdown-menu {\n  right: 0;\n  text-align: right;\n}\n[dir] .vs__no-options {\n  text-align: center;\n}\n\n/* List Items */\n.vs__dropdown-option {\n  line-height: 1.42857143; /* Normalize line height */\n  display: block;\n  color: #333; /* Overrides most CSS frameworks */\n  white-space: nowrap;\n}\n[dir] .vs__dropdown-option {\n  padding: 3px 20px;\n  clear: both;\n  cursor: pointer;\n}\n.vs__dropdown-option--highlight {\n  color: #7367f0 !important;\n}\n[dir] .vs__dropdown-option--highlight {\n  background: rgba(115, 103, 240, 0.12);\n}\n.vs__dropdown-option--deselect {\n  color: #fff;\n}\n[dir] .vs__dropdown-option--deselect {\n  background: #fb5858;\n}\n.vs__dropdown-option--disabled {\n  color: rgba(60, 60, 60, 0.5);\n}\n[dir] .vs__dropdown-option--disabled {\n  background: inherit;\n  cursor: inherit;\n}\n\n/* Selected Tags */\n.vs__selected {\n  display: flex;\n  align-items: center;\n  color: #333;\n  line-height: 1.8;\n  z-index: 0;\n}\n[dir] .vs__selected {\n  background-color: #7367f0;\n  border: 0 solid rgba(60, 60, 60, 0.26);\n  border-radius: 0.357rem;\n  margin: 4px 2px 0px 2px;\n  padding: 0 0.25em;\n}\n.vs__deselect {\n  display: inline-flex;\n  appearance: none;\n  fill: rgba(60, 60, 60, 0.5);\n}\n[dir] .vs__deselect {\n  padding: 0;\n  border: 0;\n  cursor: pointer;\n  background: none;\n  text-shadow: 0 1px 0 #fff;\n}\n[dir=ltr] .vs__deselect {\n  margin-left: 4px;\n}\n[dir=rtl] .vs__deselect {\n  margin-right: 4px;\n}\n\n/* States */\n[dir] .vs--single .vs__selected {\n  background-color: transparent;\n  border-color: transparent;\n}\n.vs--single.vs--open .vs__selected, .vs--single.vs--loading .vs__selected {\n  position: absolute;\n  opacity: 0.4;\n}\n.vs--single.vs--searching .vs__selected {\n  display: none;\n}\n\n/* Search Input */\n/**\n * Super weird bug... If this declaration is grouped\n * below, the cancel button will still appear in chrome.\n * If it's up here on it's own, it'll hide it.\n */\n.vs__search::-webkit-search-cancel-button {\n  display: none;\n}\n.vs__search::-webkit-search-decoration,\n.vs__search::-webkit-search-results-button,\n.vs__search::-webkit-search-results-decoration,\n.vs__search::-ms-clear {\n  display: none;\n}\n.vs__search,\n.vs__search:focus {\n  appearance: none;\n  line-height: 1.8;\n  font-size: 1em;\n  outline: none;\n  width: 0;\n  max-width: 100%;\n  flex-grow: 1;\n  z-index: 1;\n}\n[dir] .vs__search, [dir] .vs__search:focus {\n  border: 1px solid transparent;\n  margin: 4px 0 0 0;\n  padding: 0 7px;\n  background: none;\n  box-shadow: none;\n}\n[dir=ltr] .vs__search, [dir=ltr] .vs__search:focus {\n  border-left: none;\n}\n[dir=rtl] .vs__search, [dir=rtl] .vs__search:focus {\n  border-right: none;\n}\n.vs__search::placeholder {\n  color: #6e6b7b;\n}\n\n/**\n    States\n */\n.vs--unsearchable .vs__search {\n  opacity: 1;\n}\n[dir] .vs--unsearchable:not(.vs--disabled) .vs__search {\n  cursor: pointer;\n}\n.vs--single.vs--searching:not(.vs--open):not(.vs--loading) .vs__search {\n  opacity: 0.2;\n}\n\n/* Loading Spinner */\n.vs__spinner {\n  align-self: center;\n  opacity: 0;\n  font-size: 5px;\n  text-indent: -9999em;\n  overflow: hidden;\n  transition: opacity 0.1s;\n}\n[dir] .vs__spinner {\n  border-top: 0.9em solid rgba(100, 100, 100, 0.1);\n  border-bottom: 0.9em solid rgba(100, 100, 100, 0.1);\n  transform: translateZ(0);\n}\n[dir=ltr] .vs__spinner {\n  border-right: 0.9em solid rgba(100, 100, 100, 0.1);\n  border-left: 0.9em solid rgba(60, 60, 60, 0.45);\n  animation:  vSelectSpinner-ltr 1.1s infinite linear;\n}\n[dir=rtl] .vs__spinner {\n  border-left: 0.9em solid rgba(100, 100, 100, 0.1);\n  border-right: 0.9em solid rgba(60, 60, 60, 0.45);\n  animation:  vSelectSpinner-rtl 1.1s infinite linear;\n}\n.vs__spinner,\n.vs__spinner:after {\n  width: 5em;\n  height: 5em;\n}\n[dir] .vs__spinner, [dir] .vs__spinner:after {\n  border-radius: 50%;\n}\n\n/* Loading Spinner States */\n.vs--loading .vs__spinner {\n  opacity: 1;\n}\n.vs__open-indicator {\n  fill: none;\n}\n[dir] .vs__open-indicator {\n  margin-top: 0.15rem;\n}\n.vs__dropdown-toggle {\n  transition: all 0.25s ease-in-out;\n}\n[dir] .vs__dropdown-toggle {\n  padding: 0.59px 0 4px 0;\n}\n[dir=ltr] .vs--single .vs__dropdown-toggle {\n  padding-left: 6px;\n}\n[dir=rtl] .vs--single .vs__dropdown-toggle {\n  padding-right: 6px;\n}\n.vs__dropdown-option--disabled {\n  opacity: 0.5;\n}\n[dir] .vs__dropdown-option--disabled.vs__dropdown-option--selected {\n  background: #7367f0 !important;\n}\n.vs__dropdown-option {\n  color: #6e6b7b;\n}\n[dir] .vs__dropdown-option, [dir] .vs__no-options {\n  padding: 7px 20px;\n}\n.vs__dropdown-option--selected {\n  background-color: #7367f0;\n  color: #fff;\n  position: relative;\n}\n.vs__dropdown-option--selected::after {\n  content: \"\";\n  height: 1.1rem;\n  width: 1.1rem;\n  display: inline-block;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  right: 20px;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 1.1rem;\n}\n[dir=rtl] .vs__dropdown-option--selected::after {\n  left: 20px;\n  right: unset;\n}\n.vs__dropdown-option--selected.vs__dropdown-option--highlight {\n  color: #fff !important;\n  background-color: #7367f0 !important;\n}\n.vs__clear svg {\n  color: #6e6b7b;\n}\n.vs__selected {\n  color: #fff;\n}\n.v-select.vs--single .vs__selected {\n  color: #6e6b7b;\n  transition: transform 0.2s ease;\n}\n[dir] .v-select.vs--single .vs__selected {\n  margin-top: 5px;\n}\n[dir=ltr] .v-select.vs--single .vs__selected input {\n  padding-left: 0;\n}\n[dir=rtl] .v-select.vs--single .vs__selected input {\n  padding-right: 0;\n}\n[dir=ltr] .vs--single.vs--open .vs__selected {\n  transform: translateX(5px);\n}\n[dir=rtl] .vs--single.vs--open .vs__selected {\n  transform: translateX(-5px);\n}\n.vs__selected .vs__deselect {\n  color: inherit;\n}\n.v-select:not(.vs--single) .vs__selected {\n  font-size: 0.9rem;\n}\n[dir] .v-select:not(.vs--single) .vs__selected {\n  border-radius: 3px;\n  padding: 0 0.6em;\n}\n[dir=ltr] .v-select:not(.vs--single) .vs__selected {\n  margin: 5px 2px 2px 5px;\n}\n[dir=rtl] .v-select:not(.vs--single) .vs__selected {\n  margin: 5px 5px 2px 2px;\n}\n.v-select:not(.vs--single) .vs__deselect svg {\n  vertical-align: text-top;\n}\n[dir] .v-select:not(.vs--single) .vs__deselect svg {\n  transform: scale(0.8);\n}\n.vs__dropdown-menu {\n  top: calc(100% + 1rem);\n}\n[dir] .vs__dropdown-menu {\n  border: none;\n  border-radius: 6px;\n  padding: 0;\n}\n[dir] .vs--open .vs__dropdown-toggle {\n  border-color: #7367f0;\n  border-bottom-color: #7367f0;\n  box-shadow: 0 3px 10px 0 rgba(34, 41, 47, 0.1);\n}\n[dir=ltr] .vs--open .vs__dropdown-toggle {\n  border-bottom-left-radius: 0.357rem;\n  border-bottom-right-radius: 0.357rem;\n}\n[dir=rtl] .vs--open .vs__dropdown-toggle {\n  border-bottom-right-radius: 0.357rem;\n  border-bottom-left-radius: 0.357rem;\n}\n.select-size-lg .vs__selected {\n  font-size: 1rem !important;\n}\n[dir] .select-size-lg.vs--single.vs--open .vs__selected {\n  margin-top: 6px;\n}\n.select-size-lg .vs__dropdown-toggle,\n.select-size-lg .vs__selected {\n  font-size: 1.25rem;\n}\n[dir] .select-size-lg .vs__dropdown-toggle {\n  padding: 5px;\n}\n[dir] .select-size-lg .vs__dropdown-toggle input {\n  margin-top: 0;\n}\n.select-size-lg .vs__deselect svg {\n  vertical-align: middle !important;\n}\n[dir] .select-size-lg .vs__deselect svg {\n  transform: scale(1) !important;\n}\n[dir] .select-size-sm .vs__dropdown-toggle {\n  padding-bottom: 0;\n  padding: 1px;\n}\n[dir] .select-size-sm.vs--single .vs__dropdown-toggle {\n  padding: 2px;\n}\n.select-size-sm .vs__dropdown-toggle,\n.select-size-sm .vs__selected {\n  font-size: 0.9rem;\n}\n[dir] .select-size-sm .vs__actions {\n  padding-top: 2px;\n  padding-bottom: 2px;\n}\n.select-size-sm .vs__deselect svg {\n  vertical-align: middle !important;\n}\n[dir] .select-size-sm .vs__search {\n  margin-top: 0;\n}\n.select-size-sm.v-select .vs__selected {\n  font-size: 0.75rem;\n}\n[dir] .select-size-sm.v-select .vs__selected {\n  padding: 0 0.3rem;\n}\n[dir] .select-size-sm.v-select:not(.vs--single) .vs__selected {\n  margin: 4px 5px;\n}\n[dir] .select-size-sm.v-select.vs--single .vs__selected {\n  margin-top: 1px;\n}\n[dir] .select-size-sm.vs--single.vs--open .vs__selected {\n  margin-top: 4px;\n}\n.dark-layout .vs__dropdown-toggle {\n  color: #b4b7bd;\n}\n[dir] .dark-layout .vs__dropdown-toggle {\n  background: #283046;\n  border-color: #404656;\n}\n.dark-layout .vs__selected-options input {\n  color: #b4b7bd;\n}\n.dark-layout .vs__selected-options input::placeholder {\n  color: #676d7d;\n}\n.dark-layout .vs__actions svg {\n  fill: #404656;\n}\n[dir] .dark-layout .vs__dropdown-menu {\n  background: #283046;\n}\n.dark-layout .vs__dropdown-menu li {\n  color: #b4b7bd;\n}\n.dark-layout .v-select:not(.vs--single) .vs__selected {\n  color: #7367f0;\n}\n[dir] .dark-layout .v-select:not(.vs--single) .vs__selected {\n  background-color: rgba(115, 103, 240, 0.12);\n}\n.dark-layout .v-select.vs--single .vs__selected {\n  color: #b4b7bd !important;\n}\n.dark-layout .vs--disabled .vs__dropdown-toggle,\n.dark-layout .vs--disabled .vs__clear,\n.dark-layout .vs--disabled .vs__search,\n.dark-layout .vs--disabled .vs__selected,\n.dark-layout .vs--disabled .vs__open-indicator {\n  opacity: 0.5;\n}\n[dir] .dark-layout .vs--disabled .vs__dropdown-toggle, [dir] .dark-layout .vs--disabled .vs__clear, [dir] .dark-layout .vs--disabled .vs__search, [dir] .dark-layout .vs--disabled .vs__selected, [dir] .dark-layout .vs--disabled .vs__open-indicator {\n  background-color: #283046;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=style&index=0&id=855d0284&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=style&index=0&id=855d0284&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "[data-v-855d0284] .sidebar-lg {\n  width: 800px !important;\n}\n[dir] .header-section[data-v-855d0284] {\n  background-color: #d4edda;\n  border-bottom: 1px solid #c3e6cb;\n}\n[dir] .content-section[data-v-855d0284] {\n  background-color: #ffffff;\n}\n.status-dot[data-v-855d0284] {\n  width: 10px;\n  height: 10px;\n  display: inline-block;\n}\n[dir] .status-dot[data-v-855d0284] {\n  border-radius: 50%;\n}\n.detail-item .detail-label[data-v-855d0284] {\n  font-weight: 600;\n}\n[dir] .detail-item .detail-label[data-v-855d0284] {\n  margin-bottom: 0.25rem;\n}\n.detail-item .detail-value[data-v-855d0284] {\n  color: #6e6b7b;\n}\n[dir] .cursor-pointer[data-v-855d0284] {\n  cursor: pointer;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=0&id=3d0aa666&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=0&id=3d0aa666&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=0&id=3d0aa666&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=0&id=3d0aa666&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=1&id=3d0aa666&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=1&id=3d0aa666&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=1&id=3d0aa666&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=1&id=3d0aa666&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=style&index=0&id=855d0284&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=style&index=0&id=855d0284&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AvvikDetailsSidebar.vue?vue&type=style&index=0&id=855d0284&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=style&index=0&id=855d0284&lang=scss&scoped=true&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue?vue&type=template&id=5a7aca50&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue?vue&type=template&id=5a7aca50& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
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
    "b-card",
    { staticClass: "text-center" },
    [
      _c(
        "b-avatar",
        {
          staticClass: "mb-1",
          attrs: { variant: "light-" + _vm.color, size: "45" },
        },
        [_c("feather-icon", { attrs: { size: "21", icon: _vm.icon } })],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "truncate" }, [
        _c("h5", { staticClass: "mb-25 " }, [
          _vm._v("\n      " + _vm._s(_vm.statistic) + "\n    "),
        ]),
        _vm._v(" "),
        _c("span", [_vm._v(_vm._s(_vm.statisticTitle))]),
      ]),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/Index.vue?vue&type=template&id=3d0aa666&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/avvik-listings/Index.vue?vue&type=template&id=3d0aa666& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
      _c("avvik-details-sidebar", {
        attrs: {
          "is-visible": _vm.isDetailsSidebarVisible,
          "avvik-details": _vm.selectedAvvikDetails,
          loading: _vm.detailsLoading,
        },
        on: {
          "update:isVisible": function ($event) {
            _vm.isDetailsSidebarVisible = $event
          },
          "update:is-visible": function ($event) {
            _vm.isDetailsSidebarVisible = $event
          },
        },
      }),
      _vm._v(" "),
      _vm.isEditAvvikListingActive
        ? _c("EditAvvikListing", {
            attrs: {
              "is-edit-avvik-listing-active": _vm.isEditAvvikListingActive,
              "avvik-listing-id": _vm.avvikData.id,
            },
            on: {
              "update:isEditAvvikListingActive": function ($event) {
                _vm.isEditAvvikListingActive = $event
              },
              "update:is-edit-avvik-listing-active": function ($event) {
                _vm.isEditAvvikListingActive = $event
              },
              "refetch-data": _vm.fetchAvvikListings,
            },
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.isAddAvvikListingActive
        ? _c("CreateAvvikListing", {
            attrs: {
              "is-add-avvik-listing-active": _vm.isAddAvvikListingActive,
            },
            on: {
              "update:isAddAvvikListingActive": function ($event) {
                _vm.isAddAvvikListingActive = $event
              },
              "update:is-add-avvik-listing-active": function ($event) {
                _vm.isAddAvvikListingActive = $event
              },
              "refetch-data": _vm.fetchAvvikListings,
            },
          })
        : _vm._e(),
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
                      attrs: { cols: "12", md: "4" },
                    },
                    [
                      _c("v-select", {
                        staticClass: "per-page-selector d-inline-block mx-50",
                        attrs: {
                          dir: _vm.$store.state.appConfig.isRTL ? "rtl" : "ltr",
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
                      _c("label", [_vm._v(_vm._s(_vm.t("records per page")))]),
                      _vm._v(" "),
                      _c(
                        "b-button",
                        {
                          staticClass: "ml-2",
                          attrs: { variant: "primary" },
                          on: {
                            click: function ($event) {
                              return _vm.$router.push({
                                name: "avvik-listings-create",
                              })
                            },
                          },
                        },
                        [
                          _c("span", { staticClass: "text-nowrap" }, [
                            _vm._v("Add Avvik / RUH"),
                          ]),
                        ]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    {
                      staticClass: "mb-md-0 mb-2",
                      attrs: { cols: "12", md: "2" },
                    },
                    [
                      _c("flat-pickr", {
                        staticClass: "form-control",
                        attrs: {
                          config: _vm.pickerConfig,
                          id: "month",
                          placeholder: _vm.t("Select Date Range"),
                        },
                        model: {
                          value: _vm.filters.range,
                          callback: function ($$v) {
                            _vm.$set(_vm.filters, "range", $$v)
                          },
                          expression: "filters.range",
                        },
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    {
                      staticClass: "mb-md-0 mb-2",
                      attrs: { cols: "12", md: "2" },
                    },
                    [
                      _c(
                        "b-button",
                        {
                          attrs: { variant: "primary" },
                          on: { click: _vm.filterRecords },
                        },
                        [
                          _vm._v(
                            "\n            " +
                              _vm._s(_vm.t("Filter")) +
                              "\n          "
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "b-button",
                        {
                          attrs: { variant: "warning" },
                          on: { click: _vm.resetFilter },
                        },
                        [
                          _vm._v(
                            "\n            " +
                              _vm._s(_vm.t("Reset")) +
                              "\n          "
                          ),
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
                          staticClass: "d-inline-block mr-1 md-2",
                          attrs: { placeholder: _vm.t("Search...") },
                          model: {
                            value: _vm.searchQuery,
                            callback: function ($$v) {
                              _vm.searchQuery = $$v
                            },
                            expression: "searchQuery",
                          },
                        }),
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
                  items: _vm.avvikruhListings,
                  responsive: "",
                  fields: _vm.tableColumns,
                  "primary-key": "id",
                  "sort-by": _vm.sortBy,
                  "show-empty": "",
                  "empty-text": _vm.t("No matching records found"),
                  "sort-desc": _vm.isSortDirDesc,
                  "tbody-tr-class": "item-row cursor-pointer",
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
                  "row-clicked": _vm.onRowClicked,
                },
                scopedSlots: _vm._u([
                  {
                    key: "head()",
                    fn: function (data) {
                      return [_c("span", [_vm._v(_vm._s(_vm.$t(data.label)))])]
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
                              class:
                                "text-" +
                                _vm.resolveStatus(data.item.close_status),
                            },
                            [
                              _c(
                                "b-badge",
                                {
                                  attrs: {
                                    variant: _vm.resolveStatus(
                                      data.item.close_status
                                    ),
                                  },
                                },
                                [
                                  _c("span", [
                                    _vm._v(_vm._s(data.item.close_status)),
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
                    key: "cell(lending)",
                    fn: function (data) {
                      return [
                        _c(
                          "b-button",
                          {
                            attrs: { variant: "flat-primary", size: "sm" },
                            on: {
                              click: function ($event) {
                                return _vm.lendingEquipment(data.item)
                              },
                            },
                          },
                          [_vm._v("\n            Show\n          ")]
                        ),
                      ]
                    },
                  },
                  {
                    key: "cell(actions)",
                    fn: function (data) {
                      return [
                        _c(
                          "b-dropdown",
                          {
                            attrs: { variant: "link", "no-caret": "" },
                            nativeOn: {
                              click: function ($event) {
                                $event.stopPropagation()
                              },
                            },
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
                            _vm.$can("avvik-edit", "all")
                              ? _c(
                                  "b-dropdown-item",
                                  {
                                    on: {
                                      click: function ($event) {
                                        return _vm.$router.push({
                                          name: "avvik-listings-edit",
                                          params: { id: data.item.id },
                                        })
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
                                      [_vm._v(_vm._s(_vm.t("Edit")))]
                                    ),
                                  ],
                                  1
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.$can("avvik-delete", "all")
                              ? _c(
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
                                      [_vm._v(_vm._s(_vm.t("Delete")))]
                                    ),
                                  ],
                                  1
                                )
                              : _vm._e(),
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=template&id=855d0284&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=template&id=855d0284&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
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
  return _c("b-sidebar", {
    attrs: {
      id: "sidebar-avvik-details",
      visible: _vm.isVisible,
      "bg-variant": "white",
      "sidebar-class": "sidebar-lg",
      shadow: "",
      backdrop: "",
      "no-header": "",
      right: "",
    },
    on: {
      change: function (val) {
        return _vm.$emit("update:is-visible", val)
      },
    },
    scopedSlots: _vm._u([
      {
        key: "default",
        fn: function (ref) {
          var hide = ref.hide
          return [
            _vm.avvikDetails
              ? _c("div", [
                  _c("div", { staticClass: "header-section p-2" }, [
                    _c(
                      "div",
                      {
                        staticClass:
                          "d-flex justify-content-between align-items-start",
                      },
                      [
                        _c("div", [
                          _c("h4", { staticClass: "font-weight-bolder mb-0" }, [
                            _vm._v(
                              _vm._s(
                                _vm.avvikDetails.title || "Deviation title"
                              )
                            ),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "mt-1 font-weight-bold mb-0" },
                            [_vm._v(_vm._s(_vm.avvikDetails.type || "-"))]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "mt-1 text-grey mb-1 text-lg" },
                            [_vm._v(_vm._s(_vm.avvikDetails.date || "-"))]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c("span", {
                                staticClass: "status-dot mr-1",
                                class: _vm.getStatusDotClass(
                                  _vm.avvikDetails.close_status
                                ),
                              }),
                              _vm._v(" "),
                              _c(
                                "span",
                                {
                                  staticClass: "mr-2",
                                  staticStyle: { "font-size": "0.85rem" },
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.avvikDetails.close_status || "Status"
                                    )
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "span",
                                { staticStyle: { "font-size": "0.85rem" } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.avvikDetails.user
                                        ? _vm.avvikDetails.user.name
                                        : "-"
                                    )
                                  ),
                                ]
                              ),
                            ]
                          ),
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "d-flex flex-column align-items-end" },
                          [
                            _c(
                              "div",
                              { staticClass: "d-flex align-items-center mb-1" },
                              [
                                _c(
                                  "b-button",
                                  {
                                    staticClass:
                                      "mr-1 d-flex align-items-center",
                                    attrs: { variant: "primary", size: "md" },
                                    on: { click: _vm.viewReport },
                                  },
                                  [
                                    _c("feather-icon", {
                                      staticClass: "mr-50",
                                      attrs: {
                                        icon: "FileTextIcon",
                                        size: "14",
                                      },
                                    }),
                                    _vm._v(
                                      "\n                " +
                                        _vm._s(_vm.t("View Report")) +
                                        "\n              "
                                    ),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "b-button",
                                  {
                                    staticClass: "mr-1 px-75",
                                    attrs: {
                                      variant: "outline-secondary",
                                      size: "md",
                                    },
                                    on: { click: _vm.downloadReport },
                                  },
                                  [
                                    _c("feather-icon", {
                                      attrs: {
                                        icon: "DownloadIcon",
                                        size: "14",
                                      },
                                    }),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "b-dropdown",
                                  {
                                    attrs: {
                                      variant: "link",
                                      "no-caret": "",
                                      right: "",
                                      "toggle-class": "p-0",
                                    },
                                    scopedSlots: _vm._u(
                                      [
                                        {
                                          key: "button-content",
                                          fn: function () {
                                            return [
                                              _c("feather-icon", {
                                                staticClass: "text-body",
                                                attrs: {
                                                  icon: "MoreVerticalIcon",
                                                  size: "18",
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
                                            return _vm.$router.push({
                                              name: "avvik-listings-edit",
                                              params: {
                                                id: _vm.avvikDetails.id,
                                              },
                                            })
                                          },
                                        },
                                      },
                                      [
                                        _c("feather-icon", {
                                          staticClass: "mr-50",
                                          attrs: {
                                            icon: "EditIcon",
                                            size: "14",
                                          },
                                        }),
                                        _vm._v(
                                          "\n                  " +
                                            _vm._s(_vm.t("Edit")) +
                                            "\n                "
                                        ),
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-dropdown-item",
                                      { on: { click: hide } },
                                      [
                                        _c("feather-icon", {
                                          staticClass: "mr-50",
                                          attrs: { icon: "XIcon", size: "14" },
                                        }),
                                        _vm._v(
                                          "\n                  " +
                                            _vm._s(_vm.t("Close")) +
                                            "\n                "
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
                            _vm._v(" "),
                            _c("div", [
                              _c(
                                "span",
                                { staticClass: "font-weight-bolder" },
                                [_vm._v("ID")]
                              ),
                              _vm._v(": S-" + _vm._s(_vm.avvikDetails.id)),
                            ]),
                          ]
                        ),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "content-section p-2" }, [
                    _c("div", { staticClass: "detail-item mb-3" }, [
                      _c("div", { staticClass: "detail-label" }, [
                        _vm._v(_vm._s(_vm.t("Severity")) + ":"),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "detail-value" }, [
                        _vm._v(_vm._s(_vm.avvikDetails.severity || "-")),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "detail-item mb-3" }, [
                      _c("div", { staticClass: "detail-label" }, [
                        _vm._v(_vm._s(_vm.t("Category event")) + ":"),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "detail-value" }, [
                        _vm._v(_vm._s(_vm.avvikDetails.event_type || "-")),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "detail-item mb-3" }, [
                      _c("div", { staticClass: "detail-label" }, [
                        _vm._v(
                          _vm._s(_vm.t("Description and consequence")) + ":"
                        ),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "detail-value" }, [
                        _vm._v(_vm._s(_vm.avvikDetails.description || "-")),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "detail-item mb-3" }, [
                      _c("div", { staticClass: "detail-label" }, [
                        _vm._v(_vm._s(_vm.t("Equipment")) + ":"),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "detail-value" }, [
                        _vm.avvikDetails.equipment
                          ? _c(
                              "a",
                              {
                                staticClass: "text-primary",
                                attrs: { href: "#" },
                              },
                              [
                                _vm._v(
                                  "\n              " +
                                    _vm._s(_vm.avvikDetails.equipment.name) +
                                    _vm._s(
                                      _vm.avvikDetails.equipment.supplier
                                        ? " - " +
                                            _vm.avvikDetails.equipment.supplier
                                        : ""
                                    ) +
                                    _vm._s(
                                      _vm.avvikDetails.equipment.serial_number
                                        ? " - " +
                                            _vm.avvikDetails.equipment
                                              .serial_number
                                        : ""
                                    ) +
                                    "\n            "
                                ),
                              ]
                            )
                          : _c("span", [_vm._v("-")]),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "detail-item mb-3" }, [
                      _c("div", { staticClass: "detail-label" }, [
                        _vm._v(_vm._s(_vm.t("Supplier")) + ":"),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "detail-value" }, [
                        _vm._v(
                          _vm._s(
                            _vm.avvikDetails.supplier
                              ? _vm.avvikDetails.supplier.name
                              : "-"
                          )
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "detail-item mb-3" }, [
                      _c("div", { staticClass: "detail-label" }, [
                        _vm._v(_vm._s(_vm.t("Responsible person")) + ":"),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "detail-value" }, [
                        _vm._v(
                          _vm._s(
                            _vm.avvikDetails.user
                              ? _vm.avvikDetails.user.name
                              : "-"
                          )
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "detail-item mb-3" }, [
                      _c("div", { staticClass: "detail-label" }, [
                        _vm._v(_vm._s(_vm.t("Closed date")) + ":"),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "detail-value" }, [
                        _vm._v(_vm._s(_vm.avvikDetails.close_date || "-")),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "detail-item mb-3" }, [
                      _c("div", { staticClass: "detail-label" }, [
                        _vm._v(_vm._s(_vm.t("Closed by")) + ":"),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "detail-value" }, [
                        _vm._v(
                          _vm._s(
                            _vm.avvikDetails.closed_by
                              ? _vm.avvikDetails.closed_by.name
                              : "-"
                          )
                        ),
                      ]),
                    ]),
                  ]),
                ])
              : _c(
                  "div",
                  {
                    staticClass:
                      "d-flex justify-content-center align-items-center p-5",
                  },
                  [
                    _vm.loading
                      ? _c("b-spinner")
                      : _c("span", [
                          _vm._v(_vm._s(_vm.t("No data available"))),
                        ]),
                  ],
                  1
                ),
          ]
        },
      },
    ]),
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue":
/*!**************************************************************************************!*\
  !*** ./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StatisticCardVertical_vue_vue_type_template_id_5a7aca50___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StatisticCardVertical.vue?vue&type=template&id=5a7aca50& */ "./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue?vue&type=template&id=5a7aca50&");
/* harmony import */ var _StatisticCardVertical_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StatisticCardVertical.vue?vue&type=script&lang=js& */ "./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StatisticCardVertical_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StatisticCardVertical_vue_vue_type_template_id_5a7aca50___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StatisticCardVertical_vue_vue_type_template_id_5a7aca50___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatisticCardVertical_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./StatisticCardVertical.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatisticCardVertical_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue?vue&type=template&id=5a7aca50&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue?vue&type=template&id=5a7aca50& ***!
  \*********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StatisticCardVertical_vue_vue_type_template_id_5a7aca50___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./StatisticCardVertical.vue?vue&type=template&id=5a7aca50& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/@core/components/statistics-cards/StatisticCardVertical.vue?vue&type=template&id=5a7aca50&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StatisticCardVertical_vue_vue_type_template_id_5a7aca50___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StatisticCardVertical_vue_vue_type_template_id_5a7aca50___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/avvik-listings/Index.vue":
/*!*********************************************************!*\
  !*** ./resources/js/src/views/avvik-listings/Index.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_3d0aa666___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=3d0aa666& */ "./resources/js/src/views/avvik-listings/Index.vue?vue&type=template&id=3d0aa666&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/src/views/avvik-listings/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Index_vue_vue_type_style_index_0_id_3d0aa666_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Index.vue?vue&type=style&index=0&id=3d0aa666&lang=scss& */ "./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=0&id=3d0aa666&lang=scss&");
/* harmony import */ var _Index_vue_vue_type_style_index_1_id_3d0aa666_lang_scss___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Index.vue?vue&type=style&index=1&id=3d0aa666&lang=scss& */ "./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=1&id=3d0aa666&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_3d0aa666___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_3d0aa666___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/avvik-listings/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/avvik-listings/Index.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/src/views/avvik-listings/Index.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=0&id=3d0aa666&lang=scss&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=0&id=3d0aa666&lang=scss& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_3d0aa666_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=0&id=3d0aa666&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=0&id=3d0aa666&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_3d0aa666_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_3d0aa666_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_3d0aa666_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_3d0aa666_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=1&id=3d0aa666&lang=scss&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=1&id=3d0aa666&lang=scss& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_3d0aa666_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=1&id=3d0aa666&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/Index.vue?vue&type=style&index=1&id=3d0aa666&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_3d0aa666_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_3d0aa666_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_3d0aa666_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_1_id_3d0aa666_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/avvik-listings/Index.vue?vue&type=template&id=3d0aa666&":
/*!****************************************************************************************!*\
  !*** ./resources/js/src/views/avvik-listings/Index.vue?vue&type=template&id=3d0aa666& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_3d0aa666___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=3d0aa666& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/Index.vue?vue&type=template&id=3d0aa666&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_3d0aa666___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_3d0aa666___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue":
/*!*******************************************************************************!*\
  !*** ./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AvvikDetailsSidebar_vue_vue_type_template_id_855d0284_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AvvikDetailsSidebar.vue?vue&type=template&id=855d0284&scoped=true& */ "./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=template&id=855d0284&scoped=true&");
/* harmony import */ var _AvvikDetailsSidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AvvikDetailsSidebar.vue?vue&type=script&lang=js& */ "./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _AvvikDetailsSidebar_vue_vue_type_style_index_0_id_855d0284_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AvvikDetailsSidebar.vue?vue&type=style&index=0&id=855d0284&lang=scss&scoped=true& */ "./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=style&index=0&id=855d0284&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AvvikDetailsSidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AvvikDetailsSidebar_vue_vue_type_template_id_855d0284_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AvvikDetailsSidebar_vue_vue_type_template_id_855d0284_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "855d0284",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvvikDetailsSidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AvvikDetailsSidebar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvvikDetailsSidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=style&index=0&id=855d0284&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************!*\
  !*** ./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=style&index=0&id=855d0284&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvvikDetailsSidebar_vue_vue_type_style_index_0_id_855d0284_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AvvikDetailsSidebar.vue?vue&type=style&index=0&id=855d0284&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=style&index=0&id=855d0284&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvvikDetailsSidebar_vue_vue_type_style_index_0_id_855d0284_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvvikDetailsSidebar_vue_vue_type_style_index_0_id_855d0284_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvvikDetailsSidebar_vue_vue_type_style_index_0_id_855d0284_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AvvikDetailsSidebar_vue_vue_type_style_index_0_id_855d0284_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=template&id=855d0284&scoped=true&":
/*!**************************************************************************************************************************!*\
  !*** ./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=template&id=855d0284&scoped=true& ***!
  \**************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AvvikDetailsSidebar_vue_vue_type_template_id_855d0284_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AvvikDetailsSidebar.vue?vue&type=template&id=855d0284&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/avvik-listings/sidebar/AvvikDetailsSidebar.vue?vue&type=template&id=855d0284&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AvvikDetailsSidebar_vue_vue_type_template_id_855d0284_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AvvikDetailsSidebar_vue_vue_type_template_id_855d0284_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);