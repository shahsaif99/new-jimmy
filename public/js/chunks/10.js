(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./resources/js/src/composables/projects.js":
/*!**************************************************!*\
  !*** ./resources/js/src/composables/projects.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useProjects; });
/* harmony import */ var _home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @axios */ "./resources/js/src/libs/axios.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var ziggy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ziggy-js */ "./node_modules/ziggy-js/dist/index.js");
/* harmony import */ var ziggy_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ziggy_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _toaster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toaster */ "./resources/js/src/composables/toaster.js");






function useProjects() {
  var busy = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(false);
  var respResult = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(null);
  var projects = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])([]);
  var project = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(null);
  var errors = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])({});
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
    key: 'name',
    sortable: true
  }, {
    key: 'start_date',
    sortable: false
  }, {
    key: 'end_date',
    sortable: false
  }, {
    key: 'customer',
    sortable: false
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
  var fetchProjects = /*#__PURE__*/function () {
    var _ref = Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
      var response, total;
      return Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              busy.value = true;
              _context.next = 4;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('projects.index'), {
                params: {
                  q: searchQuery.value,
                  perPage: perPage.value,
                  page: currentPage.value,
                  sortBy: sortBy.value,
                  sortDesc: isSortDirDesc.value
                }
              });
            case 4:
              response = _context.sent;
              projects.value = response.data.data;
              if (response.data.meta) {
                total = response.data.meta.total;
                totalRecords.value = total;
              }
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
              _context.prev = 13;
              busy.value = false;
              return _context.finish(13);
            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9, 13, 16]]);
    }));
    return function fetchProjects() {
      return _ref.apply(this, arguments);
    };
  }();
  var getProject = /*#__PURE__*/function () {
    var _ref2 = Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2(id) {
      var response;
      return Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('projects.show', {
                id: id
              }));
            case 3:
              response = _context2.sent;
              project.value = response.data.data;
              _context2.next = 10;
              break;
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              if (_context2.t0.message === 'Network Error') {
                toast.error(_context2.t0.message);
              } else {
                if (_context2.t0.response.status === 422) {
                  errors.value = _context2.t0.response.data.errors;
                }
                respResult.value = _context2.t0;
                toast.error(_context2.t0.response.data.message);
              }
            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));
    return function getProject(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var storeProject = /*#__PURE__*/function () {
    var _ref3 = Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee3(data) {
      var response;
      return Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              errors.value = '';
              _context3.prev = 1;
              busy.value = true;
              _context3.next = 5;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('projects.store'), data);
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
                if (_context3.t0.response.status === 422) {
                  errors.value = _context3.t0.response.data.errors;
                }
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
    return function storeProject(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  var updateProject = /*#__PURE__*/function () {
    var _ref4 = Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee4(data) {
      var response;
      return Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              errors.value = '';
              _context4.prev = 1;
              busy.value = true;
              _context4.next = 5;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].put(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('projects.update', data.id), data);
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
    return function updateProject(_x3) {
      return _ref4.apply(this, arguments);
    };
  }();
  var uploadDocument = /*#__PURE__*/function () {
    var _ref5 = Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee5(data, id) {
      var response;
      return Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              console.log(data);
              errors.value = '';
              _context5.prev = 2;
              busy.value = true;
              _context5.next = 6;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('projects.upload.documents', id), data);
            case 6:
              response = _context5.sent;
              respResult.value = response;
              toast.success(response.data.message);
              _context5.next = 15;
              break;
            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](2);
              console.log(_context5.t0);
              if (_context5.t0.message === 'Network Error') {
                toast.error(_context5.t0.message);
              } else {
                if (_context5.t0.response.status === 422) {
                  errors.value = _context5.t0.response.data.errors;
                }
                respResult.value = _context5.t0;
                toast.error(_context5.t0.response.data.message);
              }
            case 15:
              _context5.prev = 15;
              busy.value = false;
              return _context5.finish(15);
            case 18:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[2, 11, 15, 18]]);
    }));
    return function uploadDocument(_x4, _x5) {
      return _ref5.apply(this, arguments);
    };
  }();
  var deleteProject = /*#__PURE__*/function () {
    var _ref6 = Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee6(id) {
      var response;
      return Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              busy.value = true;
              _context6.next = 4;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"]["delete"](ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('projects.destroy', id));
            case 4:
              response = _context6.sent;
              toast.success(response.data.message);
              respResult.value = response;
              _context6.next = 12;
              break;
            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              if (_context6.t0.message === 'Network Error') {
                toast.error(_context6.t0.message);
              } else {
                respResult.value = _context6.t0;
                toast.error(_context6.t0.response.data.message);
              }
            case 12:
              _context6.prev = 12;
              busy.value = false;
              return _context6.finish(12);
            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 9, 12, 15]]);
    }));
    return function deleteProject(_x6) {
      return _ref6.apply(this, arguments);
    };
  }();
  var resolveProjectstatus = function resolveProjectstatus(status) {
    if (status === 'Pending') {
      return 'warning';
    }
    if (status === 'Complete Information') {
      return 'danger';
    }
    return 'primary';
  };
  var fetchProjectsList = /*#__PURE__*/function () {
    var _ref7 = Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee7() {
      var searchString,
        response,
        _args7 = arguments;
      return Object(_home_syed_saif_Documents_projects_checklist_checklist_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              searchString = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : '';
              busy.value = true;
              _context7.prev = 2;
              _context7.next = 5;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('projects.index'), {
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
      return _ref7.apply(this, arguments);
    };
  }();
  var attachmentFields = [{
    key: 'name'
  }, {
    key: 'attachment'
  }];
  var attachmentData = [{
    name: 'hello.png',
    attachment: 'hello'
  }, {
    name: 'hello.png',
    attachment: 'hello'
  }];
  Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["watch"])([currentPage, searchQuery], function () {
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
    resolveProjectstatus: resolveProjectstatus
  };
}

/***/ })

}]);