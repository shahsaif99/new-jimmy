(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[109],{

/***/ "./resources/js/src/composables/projects.js":
/*!**************************************************!*\
  !*** ./resources/js/src/composables/projects.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useProjects; });
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.search.js */ "./node_modules/core-js/modules/es.string.search.js");
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.json.stringify.js */ "./node_modules/core-js/modules/es.json.stringify.js");
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @axios */ "./resources/js/src/libs/axios.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var ziggy_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ziggy-js */ "./node_modules/ziggy-js/dist/index.js");
/* harmony import */ var ziggy_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(ziggy_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _toaster__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./toaster */ "./resources/js/src/composables/toaster.js");
/* harmony import */ var _schemas_projectSchema__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @/schemas/projectSchema */ "./resources/js/src/schemas/projectSchema.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_19__);




















var statusOptions = [{
  value: "in_progress",
  text: "In progress"
}, {
  value: "completed",
  text: "Completed "
}];
var initialState = {
  project_name: "",
  status: "",
  customer: null,
  project_no: null,
  project_manager: null,
  project_hse_manager: null,
  start_date: "",
  end_date: "",
  description: "",
  cost: "",
  hours: ""
};
var filters = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["reactive"])({
  date: "",
  search: "",
  dateShortcuts: [{
    text: "Today",
    onClick: function onClick() {
      var today = new Date();
      return [today, today];
    }
  }, {
    text: "Yesterday",
    onClick: function onClick() {
      var today = new Date();
      var yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      return [yesterday, yesterday];
    }
  }, {
    text: "This Week",
    onClick: function onClick() {
      var today = new Date();
      var firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - today.getDay());
      var lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      return [firstDayOfWeek, lastDayOfWeek];
    }
  }, {
    text: "Last 7 Days",
    onClick: function onClick() {
      var today = new Date();
      var lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);
      return [lastWeek, today];
    }
  }, {
    text: "Last 2 Weeks",
    onClick: function onClick() {
      var today = new Date();
      var lastTwoWeeks = new Date();
      lastTwoWeeks.setDate(today.getDate() - 14);
      return [lastTwoWeeks, today];
    }
  }, {
    text: "This Month",
    onClick: function onClick() {
      var today = new Date();
      var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return [firstDayOfMonth, lastDayOfMonth];
    }
  }, {
    text: "Last 30 Days",
    onClick: function onClick() {
      var today = new Date();
      var last30Days = new Date();
      last30Days.setDate(today.getDate() - 30);
      return [last30Days, today];
    }
  }, {
    text: "Last 2 Months",
    onClick: function onClick() {
      var today = new Date();
      var firstDayLastTwoMonths = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      var lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      return [firstDayLastTwoMonths, lastDayOfLastMonth];
    }
  }],
  showOpen: false,
  expandAll: false,
  customer_id: "",
  sortBy: 'project_no',
  sortDesc: false,
  accordion: [{
    id: 1,
    key: "status",
    label: "Project Status",
    options: ["in_progress", "completed"],
    model: "",
    isExpand: false,
    computedHeight: 0
  }],
  toggleExpand: function toggleExpand() {
    filters.accordion.forEach(function (item) {
      item.isExpand = !filters.expandAll;
    });
    filters.expandAll = !filters.expandAll;
  },
  get: function get(pagination) {
    var data = {};
    filters.accordion.forEach(function (_ref) {
      var key = _ref.key,
        model = _ref.model;
      if (model !== "" && model !== false) {
        data[key] = model;
      }
    });
    if (Array.isArray(filters.date) && filters.date.length === 2) {
      var _filters$date = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(filters.date, 2),
        startDate = _filters$date[0],
        endDate = _filters$date[1];
      if (startDate) data["date[0]"] = moment__WEBPACK_IMPORTED_MODULE_19___default()(startDate).format("YYYY-MM-DD");
      if (endDate) data["date[1]"] = moment__WEBPACK_IMPORTED_MODULE_19___default()(endDate).format("YYYY-MM-DD");
    }
    if (filters.search) {
      data.search = filters.search;
    }
    if (filters.customer_id) {
      data.customer_id = filters.customer_id;
    }
    if (pagination) {
      data.page = pagination.current_page || 1;
      data.perPage = pagination.per_page || 10;
    }
    if (filters.sortBy) {
      data.sortBy = filters.sortBy;
      data.sortDesc = filters.sortDesc ? "true" : "false";
    }
    return data;
  }
});
var form = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["reactive"])(Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__["default"])({}, initialState), {}, {
  getData: function getData() {
    return {
      name: this.project_name,
      status: this.status,
      customer_id: this.customer,
      project_no: this.project_no !== "" ? this.project_no : null,
      project_manager_id: this.project_manager,
      project_hse_manager_id: this.project_hse_manager,
      start_date: this.start_date,
      end_date: this.end_date,
      description: this.description,
      cost: this.cost,
      hour: this.hours
    };
  },
  getDataUpdate: function getDataUpdate() {
    return {
      name: this.project_name,
      status: this.status,
      customer_id: this.customer,
      project_no: this.project_no !== "" ? this.project_no : null,
      project_manager_id: this.project_manager,
      project_hse_manager_id: this.project_hse_manager,
      start_date: this.start_date,
      end_date: this.end_date,
      description: this.description,
      cost: this.cost,
      hour: this.hours
    };
  },
  set: function set(data) {
    Object.assign(this, Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_2__["default"])({}, initialState), data));
  },
  reset: function reset() {
    Object.assign(this, initialState);
  }
}));
var dialog = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["reactive"])({
  show: {
    project: {
      add: false,
      edit: false,
      "delete": false
    }
  },
  toggleDialog: function toggleDialog(section, action) {
    if (this.show.hasOwnProperty(section) && this.show[section].hasOwnProperty(action)) {
      this.show[section][action] = !this.show[section][action];
    }
  },
  closeDialog: function closeDialog(section, action) {
    if (this.show.hasOwnProperty(section) && this.show[section].hasOwnProperty(action)) {
      this.show[section][action] = false;
    }
  },
  temp: {
    project: {
      data: null,
      id: null
    }
  }
});
var apiHelpers = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["reactive"])({
  loading: false,
  toast: Object(_toaster__WEBPACK_IMPORTED_MODULE_17__["default"])(),
  errors: {},
  respResult: null,
  refresh: false
});
var columns = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["ref"])([{
  label: "id",
  field: "id",
  visible: true
}, {
  label: "No.",
  field: "project_no",
  visible: true,
  sortable: true
}, {
  label: "Project name",
  field: "name",
  visible: true
}, {
  label: "Customer",
  field: "customer_name",
  visible: true
}, {
  label: "start_date",
  field: "start_date",
  visible: true
}, {
  label: "end_date",
  field: "end_date",
  visible: true
}, {
  label: "status",
  field: "status",
  visible: true
}, {
  label: "Cost",
  field: "cost",
  visible: true
}, {
  label: "Action",
  field: "action",
  visible: true
}]);
var errorHandler = function errorHandler(error) {
  if (error.message === "Network Error") {
    return apiHelpers.toast.error(error.message);
  }
  if (error.response) {
    if (error.response.status === 422) {
      apiHelpers.errors.value = error.response.data.errors;
    }
    if (error.response.data && error.response.data.message) {
      return apiHelpers.toast.error(error.response.data.message);
    }
  }

  // Fallback error message for unexpected cases
  apiHelpers.toast.error("An unexpected error occurred.");
};
var projects = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["ref"])([]);
var project = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["ref"])(null);
var availableData = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["computed"])(function () {
  var visibleColumns = columns.value.filter(function (_ref2) {
    var visible = _ref2.visible;
    return visible;
  });
  var filteredRows = projects.value.map(function (task) {
    var filteredTask = {};
    visibleColumns.forEach(function (column) {
      filteredTask[column.label] = task[column.field];
    });
    return filteredTask;
  });
  console.log(visibleColumns);
  return {
    columns: visibleColumns,
    rows: filteredRows
  };
});
var pagination = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["reactive"])({
  current_page: 1,
  total: 0,
  per_page: 10,
  reset: function reset() {
    this.current_page = 1;
    this.total = 0;
    this.per_page = 10;
  }
});
function useProjects() {
  var busy = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["ref"])(false);
  var respResult = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["ref"])(null);
  var errors = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["ref"])({});
  var toast = Object(_toaster__WEBPACK_IMPORTED_MODULE_17__["default"])();
  var perPage = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["ref"])(10);
  var totalRecords = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["ref"])(0);
  var currentPage = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["ref"])(1);
  var perPageOptions = [10, 25, 50, 100];
  var searchQuery = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["ref"])("");
  var sortBy = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["ref"])("project_no");
  var isSortDirDesc = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["ref"])(true);
  var refListTable = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["ref"])(null);
  var tableColumns = [{
    key: "id",
    sortable: false
  }, {
    key: "name",
    sortable: true
  }, {
    key: "start_date",
    sortable: false
  }, {
    key: "end_date",
    sortable: false
  }, {
    key: "customer",
    sortable: false
  }, {
    key: "actions"
  }];
  var dataMeta = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["computed"])(function () {
    var localItemsCount = refListTable.value ? refListTable.value.localItems.length : 0;
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalRecords.value
    };
  });
  var fetchProjects = /*#__PURE__*/function () {
    var _ref3 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
      var queryParams, response;
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              apiHelpers.loading = true;
              queryParams = filters.get(pagination);
              _context.next = 5;
              return _axios__WEBPACK_IMPORTED_MODULE_14__["default"].get(ziggy_js__WEBPACK_IMPORTED_MODULE_16___default()("projects.index"), {
                params: queryParams
              });
            case 5:
              response = _context.sent;
              projects.value = response.data.data;
              pagination.current_page = response.data.meta.current_page;
              pagination.total = response.data.meta.total;
              pagination.per_page = response.data.meta.per_page;
              _context.next = 15;
              break;
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              if (_context.t0.name === "ValidationError") {
                apiHelpers.toast.error(JSON.stringify(_context.t0.errors));
              } else {
                errorHandler(_context.t0);
              }
            case 15:
              _context.prev = 15;
              apiHelpers.loading = false;
              return _context.finish(15);
            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 12, 15, 18]]);
    }));
    return function fetchProjects() {
      return _ref3.apply(this, arguments);
    };
  }();
  var getProject = /*#__PURE__*/function () {
    var _ref4 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2(id) {
      var response;
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              apiHelpers.loading = true;
              _context2.next = 4;
              return _axios__WEBPACK_IMPORTED_MODULE_14__["default"].get(ziggy_js__WEBPACK_IMPORTED_MODULE_16___default()("projects.show", {
                id: id
              }));
            case 4:
              response = _context2.sent;
              project.value = response.data.data;
              _context2.next = 11;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              if (_context2.t0.name === "ValidationError") {
                apiHelpers.toast.error(JSON.stringify(_context2.t0.errors));
              } else {
                errorHandler(_context2.t0);
              }
            case 11:
              _context2.prev = 11;
              apiHelpers.loading = false;
              return _context2.finish(11);
            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8, 11, 14]]);
    }));
    return function getProject(_x) {
      return _ref4.apply(this, arguments);
    };
  }();
  var storeProject = /*#__PURE__*/function () {
    var _ref5 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee3() {
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              apiHelpers.loading = true;
              _context3.next = 4;
              return _schemas_projectSchema__WEBPACK_IMPORTED_MODULE_18__["default"].validate(form.getData(), {
                abortEarly: false
              });
            case 4:
              _context3.next = 6;
              return _axios__WEBPACK_IMPORTED_MODULE_14__["default"].post(ziggy_js__WEBPACK_IMPORTED_MODULE_16___default()("projects.store"), form.getData());
            case 6:
              dialog.toggleDialog("project", "add");
              fetchProjects();
              form.reset();
              toast.success("Project successfully created.");
              _context3.next = 15;
              break;
            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              if (_context3.t0.name === "ValidationError") {
                apiHelpers.toast.error(JSON.stringify(_context3.t0.errors));
              } else {
                errorHandler(_context3.t0);
              }
            case 15:
              _context3.prev = 15;
              apiHelpers.loading = false;
              return _context3.finish(15);
            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 12, 15, 18]]);
    }));
    return function storeProject() {
      return _ref5.apply(this, arguments);
    };
  }();
  var updateProject = /*#__PURE__*/function () {
    var _ref6 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee4() {
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              apiHelpers.loading = true;
              _context4.next = 4;
              return _schemas_projectSchema__WEBPACK_IMPORTED_MODULE_18__["default"].validate(form.getDataUpdate(), {
                abortEarly: false
              });
            case 4:
              _context4.next = 6;
              return _axios__WEBPACK_IMPORTED_MODULE_14__["default"].put(ziggy_js__WEBPACK_IMPORTED_MODULE_16___default()("projects.update", dialog.temp.project.id), form.getDataUpdate());
            case 6:
              fetchProjects();
              dialog.toggleDialog("project", "edit");
              form.reset();
              toast.success("Project successfully updated.");
              _context4.next = 17;
              break;
            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](0);
              console.log(form);
              console.log(form.getDataUpdate());
              if (_context4.t0.name === "ValidationError") {
                apiHelpers.toast.error(JSON.stringify(_context4.t0.errors));
              } else {
                errorHandler(_context4.t0);
              }
            case 17:
              _context4.prev = 17;
              apiHelpers.loading = false;
              return _context4.finish(17);
            case 20:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 12, 17, 20]]);
    }));
    return function updateProject() {
      return _ref6.apply(this, arguments);
    };
  }();
  var uploadDocument = /*#__PURE__*/function () {
    var _ref7 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee5(data, id) {
      var response;
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              errors.value = "";
              _context5.prev = 1;
              busy.value = true;
              _context5.next = 5;
              return _axios__WEBPACK_IMPORTED_MODULE_14__["default"].post(ziggy_js__WEBPACK_IMPORTED_MODULE_16___default()("projects.upload.documents", id), data);
            case 5:
              response = _context5.sent;
              respResult.value = response;
              toast.success(response.data.message);
              _context5.next = 13;
              break;
            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](1);
              if (_context5.t0.message === "Network Error") {
                toast.error(_context5.t0.message);
              } else {
                if (_context5.t0.response.status === 422) {
                  errors.value = _context5.t0.response.data.errors;
                }
                respResult.value = _context5.t0;
                toast.error(_context5.t0.response.data.message);
              }
            case 13:
              _context5.prev = 13;
              busy.value = false;
              return _context5.finish(13);
            case 16:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 10, 13, 16]]);
    }));
    return function uploadDocument(_x2, _x3) {
      return _ref7.apply(this, arguments);
    };
  }();
  var deleteProject = /*#__PURE__*/function () {
    var _ref8 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee6(id) {
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              busy.value = true;
              _context6.next = 4;
              return _axios__WEBPACK_IMPORTED_MODULE_14__["default"]["delete"](ziggy_js__WEBPACK_IMPORTED_MODULE_16___default()("projects.destroy", id));
            case 4:
              toast.success("Project successfully deleted.");
              fetchProjects();
              _context6.next = 11;
              break;
            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);
              if (_context6.t0.message === "Network Error") {
                toast.error(_context6.t0.message);
              } else {
                respResult.value = _context6.t0;
                toast.error(_context6.t0.response.data.message);
              }
            case 11:
              _context6.prev = 11;
              busy.value = false;
              return _context6.finish(11);
            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 8, 11, 14]]);
    }));
    return function deleteProject(_x4) {
      return _ref8.apply(this, arguments);
    };
  }();
  var resolveProjectstatus = function resolveProjectstatus(status) {
    if (status === "Pending") {
      return "warning";
    }
    if (status === "Complete Information") {
      return "danger";
    }
    return "primary";
  };
  var fetchProjectsList = /*#__PURE__*/function () {
    var _ref9 = Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee7() {
      var searchString,
        response,
        _args7 = arguments;
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              searchString = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : "";
              busy.value = true;
              _context7.prev = 2;
              _context7.next = 5;
              return _axios__WEBPACK_IMPORTED_MODULE_14__["default"].get(ziggy_js__WEBPACK_IMPORTED_MODULE_16___default()("projects.index"), {
                params: {
                  q: searchString
                }
              });
            case 5:
              response = _context7.sent;
              projects.value = response.data.data;
              _context7.next = 12;
              break;
            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](2);
              toast.error(_context7.t0.response.data.message);
            case 12:
              _context7.prev = 12;
              busy.value = false;
              return _context7.finish(12);
            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[2, 9, 12, 15]]);
    }));
    return function fetchProjectsList() {
      return _ref9.apply(this, arguments);
    };
  }();
  var attachmentFields = [{
    key: "name"
  }, {
    key: "attachment"
  }];
  var attachmentData = [{
    name: "hello.png",
    attachment: "hello"
  }, {
    name: "hello.png",
    attachment: "hello"
  }];
  Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_15__["watch"])([currentPage, searchQuery], function () {
    pagination.current_page = currentPage.value;
    fetchProjects();
  });
  return {
    busy: busy,
    sortBy: sortBy,
    errors: errors,
    perPage: perPage,
    project: project,
    dataMeta: dataMeta,
    projects: projects,
    getProject: getProject,
    respResult: respResult,
    currentPage: currentPage,
    searchQuery: searchQuery,
    totalRecords: totalRecords,
    tableColumns: tableColumns,
    deleteProject: deleteProject,
    isSortDirDesc: isSortDirDesc,
    updateProject: updateProject,
    fetchProjects: fetchProjects,
    storeProject: storeProject,
    perPageOptions: perPageOptions,
    attachmentData: attachmentData,
    uploadDocument: uploadDocument,
    attachmentFields: attachmentFields,
    fetchProjectsList: fetchProjectsList,
    resolveProjectstatus: resolveProjectstatus,
    form: form,
    dialog: dialog,
    statusOptions: statusOptions,
    apiHelpers: apiHelpers,
    filters: filters,
    columns: columns,
    availableData: availableData,
    pagination: pagination
  };
}

/***/ }),

/***/ "./resources/js/src/schemas/projectSchema.js":
/*!***************************************************!*\
  !*** ./resources/js/src/schemas/projectSchema.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yup */ "./node_modules/yup/index.esm.js");

var projectSchema = yup__WEBPACK_IMPORTED_MODULE_0__["object"]().shape({
  name: yup__WEBPACK_IMPORTED_MODULE_0__["string"]().required("Project name is required").max(255, "Project name is too long"),
  status: yup__WEBPACK_IMPORTED_MODULE_0__["string"]().required("Project status is required"),
  customer_id: yup__WEBPACK_IMPORTED_MODULE_0__["number"]().integer().required(),
  project_no: yup__WEBPACK_IMPORTED_MODULE_0__["number"]().nullable(),
  start_date: yup__WEBPACK_IMPORTED_MODULE_0__["date"]().required("Start date is required"),
  end_date: yup__WEBPACK_IMPORTED_MODULE_0__["date"]().nullable("End date is required").min(yup__WEBPACK_IMPORTED_MODULE_0__["ref"]("start_date"), "End date cannot be before start date"),
  project_manager_id: yup__WEBPACK_IMPORTED_MODULE_0__["number"]().integer().required(),
  project_hse_manager_id: yup__WEBPACK_IMPORTED_MODULE_0__["number"]().integer().nullable()
});
/* harmony default export */ __webpack_exports__["default"] = (projectSchema);

/***/ })

}]);