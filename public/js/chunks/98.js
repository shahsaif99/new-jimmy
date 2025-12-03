(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[98],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/projects/project.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/projects/project.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var _composables_projects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/composables/projects */ "./resources/js/src/composables/projects.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/router */ "./resources/js/src/router/index.js");
/* harmony import */ var _views_tasks_index_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/views/tasks/index.vue */ "./resources/js/src/views/tasks/index.vue");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "ProjectDashboard",
  components: {
    BTabs: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BTabs"],
    BTab: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BTab"],
    BNav: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BNav"],
    BNavItem: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BNavItem"],
    BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BRow"],
    BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BCol"],
    BCard: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BCard"],
    BButton: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BButton"],
    BCardTitle: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BCardTitle"],
    BCardText: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BCardText"],
    Tasks: _views_tasks_index_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    BSkeleton: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__["BSkeleton"]
  },
  setup: function setup() {
    var _useProjects = Object(_composables_projects__WEBPACK_IMPORTED_MODULE_3__["default"])(),
      getProject = _useProjects.getProject,
      projectData = _useProjects.project,
      apiHelpers = _useProjects.apiHelpers;
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_2__["onMounted"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getProject(_router__WEBPACK_IMPORTED_MODULE_4__["default"].history.current.params.id);
            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    var formatDate = function formatDate(date) {
      if (!date) return "N/A";
      var options = {
        year: "numeric",
        month: "short",
        day: "numeric"
      };
      return new Date(date).toLocaleDateString(undefined, options);
    };
    var getStatusClass = function getStatusClass(status) {
      switch (status) {
        case "in_progress":
          return "text-warning";
        case "completed":
          return "text-success";
        case "pending":
          return "text-secondary";
        default:
          return "text-muted";
      }
    };
    var statusData = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_2__["ref"])({
      openTasks: 0,
      submittedChecklists: 0,
      safeJobAnalysis: 0,
      pictures: 0
    });
    var handleEdit = function handleEdit() {
      console.log("Edit button clicked");
    };
    return {
      projectData: projectData,
      handleEdit: handleEdit,
      formatDate: formatDate,
      getStatusClass: getStatusClass,
      statusData: statusData,
      apiHelpers: apiHelpers
    };
  }
});

/***/ }),

/***/ "./node_modules/core-js/internals/same-value.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/same-value.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.search.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.search.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var sameValue = __webpack_require__(/*! ../internals/same-value */ "./node_modules/core-js/internals/same-value.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js");

// @@search logic
fixRegExpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative(nativeSearch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/projects/project.vue?vue&type=style&index=0&id=c18abce4&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/projects/project.vue?vue&type=style&index=0&id=c18abce4&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "[dir] .project-dashboard {\n  padding: 20px;\n}\n.project-dashboard .project-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: start;\n}\n.project-dashboard .project-header .project-title {\n  font-size: 1.5rem;\n  font-weight: 600;\n}\n[dir] .project-dashboard .project-header .project-title {\n  margin-bottom: 0.5rem;\n}\n.project-dashboard .project-header .project-company {\n  font-size: 1.1rem;\n  color: #666;\n}\n.project-dashboard .project-header .project-location {\n  color: #666;\n}\n[dir=ltr] .project-dashboard .project-header .project-location i {\n  margin-right: 5px;\n}\n[dir=rtl] .project-dashboard .project-header .project-location i {\n  margin-left: 5px;\n}\n[dir] .project-dashboard .status-cards .status-card {\n  border-radius: 8px;\n  border: none;\n}\n.project-dashboard .status-cards .status-card h6 {\n  color: #666;\n  font-size: 0.9rem;\n}\n.project-dashboard .status-cards .status-card h3 {\n  font-weight: 600;\n}\n.project-dashboard .status-cards .status-card i {\n  font-size: 1.5rem;\n}\n[dir] .project-dashboard .status-cards .status-card.open-tasks {\n  background-color: #ffe4e4;\n}\n[dir] .project-dashboard .status-cards .status-card.submitted-checklists {\n  background-color: #fff3e0;\n}\n[dir] .project-dashboard .status-cards .status-card.safe-job-analysis {\n  background-color: #f3e5f5;\n}\n[dir] .project-dashboard .status-cards .status-card.pictures {\n  background-color: #e0f2f1;\n}\n.project-dashboard .project-details .detail-item {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n}\n[dir] .project-dashboard .project-details .detail-item {\n  margin-bottom: 0.75rem;\n}\n.project-dashboard .project-details .detail-item strong {\n  color: #495057;\n}\n[dir] .project-dashboard .project-details .b-skeleton {\n  margin: 0px;\n}\n.project-dashboard .map-container {\n  height: 100%;\n  min-height: 300px;\n}\n.project-dashboard .map-container img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/projects/project.vue?vue&type=style&index=0&id=c18abce4&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/projects/project.vue?vue&type=style&index=0&id=c18abce4&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./project.vue?vue&type=style&index=0&id=c18abce4&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/projects/project.vue?vue&type=style&index=0&id=c18abce4&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/projects/project.vue?vue&type=template&id=c18abce4&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/projects/project.vue?vue&type=template&id=c18abce4& ***!
  \******************************************************************************************************************************************************************************************************************/
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
  return _vm.projectData
    ? _c(
        "div",
        { staticClass: "project-dashboard" },
        [
          _c("div", { staticClass: "project-header mb-4" }, [
            _c(
              "div",
              { staticClass: "w-100" },
              [
                !_vm.apiHelpers.loading
                  ? _c("h2", { staticClass: "project-title" }, [
                      _vm._v(
                        "\n                " +
                          _vm._s(_vm.projectData.project_no) +
                          " - " +
                          _vm._s(_vm.projectData.name) +
                          "\n            "
                      ),
                    ])
                  : _c("b-skeleton", {
                      attrs: { animation: "wave", width: "20%" },
                    }),
                _vm._v(" "),
                !_vm.apiHelpers.loading
                  ? _c("div", { staticClass: "project-company" }, [
                      _vm._v(
                        "\n                " +
                          _vm._s(_vm.projectData.customer_name) +
                          "\n            "
                      ),
                    ])
                  : _c("b-skeleton", {
                      attrs: { animation: "wave", width: "10%" },
                    }),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "rounded text-capitalize text-center",
                class:
                  _vm.projectData.status == "completed"
                    ? "completed"
                    : "incompleted",
                staticStyle: { width: "120px", padding: "5px" },
              },
              [
                _vm._v(
                  "\n            " +
                    _vm._s(_vm.projectData.status.replace(/_/g, " ")) +
                    "\n        "
                ),
              ]
            ),
          ]),
          _vm._v(" "),
          _c(
            "BTabs",
            [
              _c(
                "BTab",
                { attrs: { title: "Dashboard", active: "" } },
                [
                  _c(
                    "BCard",
                    { staticClass: "p-2", attrs: { "no-body": "" } },
                    [
                      _c(
                        "div",
                        { staticClass: "status-cards" },
                        [
                          _c(
                            "BRow",
                            [
                              _c(
                                "BCol",
                                { attrs: { md: "3" } },
                                [
                                  _c(
                                    "BCard",
                                    { staticClass: "status-card open-tasks" },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "d-flex justify-content-between align-items-center",
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "w-100" },
                                            [
                                              _c(
                                                "h4",
                                                { staticClass: "mb-1" },
                                                [_vm._v("Open tasks")]
                                              ),
                                              _vm._v(" "),
                                              !_vm.apiHelpers.loading
                                                ? _c(
                                                    "h3",
                                                    { staticClass: "mb-0" },
                                                    [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(
                                                            _vm.projectData
                                                              .task_count
                                                          ) +
                                                          "\n                                        "
                                                      ),
                                                    ]
                                                  )
                                                : _c("b-skeleton", {
                                                    attrs: {
                                                      animation: "wave",
                                                      width: "40%",
                                                    },
                                                  }),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c("i", {
                                            staticClass: "bi bi-pencil-square",
                                          }),
                                        ]
                                      ),
                                    ]
                                  ),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "BCol",
                                { attrs: { md: "3" } },
                                [
                                  _c(
                                    "BCard",
                                    {
                                      staticClass:
                                        "status-card submitted-checklists",
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "d-flex justify-content-between align-items-center",
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "w-100" },
                                            [
                                              _c(
                                                "h4",
                                                { staticClass: "mb-1" },
                                                [
                                                  _vm._v(
                                                    "\n                                            Submitted checklists\n                                        "
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              !_vm.apiHelpers.loading
                                                ? _c(
                                                    "h3",
                                                    { staticClass: "mb-0" },
                                                    [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(
                                                            _vm.statusData
                                                              .submittedChecklists
                                                          ) +
                                                          "\n                                        "
                                                      ),
                                                    ]
                                                  )
                                                : _c("b-skeleton", {
                                                    attrs: {
                                                      animation: "wave",
                                                      width: "40%",
                                                    },
                                                  }),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c("i", {
                                            staticClass:
                                              "bi bi-question-circle",
                                          }),
                                        ]
                                      ),
                                    ]
                                  ),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "BCol",
                                { attrs: { md: "3" } },
                                [
                                  _c(
                                    "BCard",
                                    {
                                      staticClass:
                                        "status-card safe-job-analysis",
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "d-flex justify-content-between align-items-center",
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "w-100" },
                                            [
                                              _c(
                                                "h4",
                                                { staticClass: "mb-1" },
                                                [
                                                  _vm._v(
                                                    "\n                                            Safe Job Analysis\n                                        "
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              !_vm.apiHelpers.loading
                                                ? _c(
                                                    "h3",
                                                    { staticClass: "mb-0" },
                                                    [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(
                                                            _vm.statusData
                                                              .safeJobAnalysis
                                                          ) +
                                                          "\n                                        "
                                                      ),
                                                    ]
                                                  )
                                                : _c("b-skeleton", {
                                                    attrs: {
                                                      animation: "wave",
                                                      width: "40%",
                                                    },
                                                  }),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c("i", {
                                            staticClass: "bi bi-x-circle",
                                          }),
                                        ]
                                      ),
                                    ]
                                  ),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "BCol",
                                { attrs: { md: "3" } },
                                [
                                  _c(
                                    "BCard",
                                    { staticClass: "status-card pictures" },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "d-flex justify-content-between align-items-center",
                                        },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "w-100" },
                                            [
                                              _c(
                                                "h4",
                                                { staticClass: "mb-1" },
                                                [_vm._v("Pictures")]
                                              ),
                                              _vm._v(" "),
                                              !_vm.apiHelpers.loading
                                                ? _c(
                                                    "h3",
                                                    { staticClass: "mb-0" },
                                                    [
                                                      _vm._v(
                                                        "\n                                            " +
                                                          _vm._s(
                                                            _vm.statusData
                                                              .pictures
                                                          ) +
                                                          "\n                                        "
                                                      ),
                                                    ]
                                                  )
                                                : _c("b-skeleton", {
                                                    attrs: {
                                                      animation: "wave",
                                                      width: "40%",
                                                    },
                                                  }),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c("i", {
                                            staticClass: "bi bi-check-circle",
                                          }),
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
                      _vm._v(" "),
                      _c(
                        "BRow",
                        [
                          _c("BCol", [
                            _c("div", { staticClass: "project-details" }, [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "d-flex justify-content-between mb-1",
                                },
                                [_c("h3", [_vm._v("Project Details")])]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "detail-item" },
                                [
                                  _c("strong", [_vm._v("Start date:")]),
                                  _vm._v(" "),
                                  !_vm.apiHelpers.loading
                                    ? _c("span", [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(
                                              _vm.formatDate(
                                                _vm.projectData.start_date
                                              )
                                            ) +
                                            "\n                                "
                                        ),
                                      ])
                                    : _c("b-skeleton", {
                                        attrs: {
                                          animation: "wave",
                                          width: "5%",
                                        },
                                      }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "detail-item" },
                                [
                                  _c("strong", [_vm._v("End date:")]),
                                  _vm._v(" "),
                                  !_vm.apiHelpers.loading
                                    ? _c("span", [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(
                                              _vm.formatDate(
                                                _vm.projectData.end_date
                                              )
                                            ) +
                                            "\n                                "
                                        ),
                                      ])
                                    : _c("b-skeleton", {
                                        attrs: {
                                          animation: "wave",
                                          width: "5%",
                                        },
                                      }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "detail-item" },
                                [
                                  _c("strong", [_vm._v("Project manager:")]),
                                  _vm._v(" "),
                                  !_vm.apiHelpers.loading
                                    ? _c("span", [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(
                                              _vm.projectData
                                                .project_manager_name
                                            ) +
                                            "\n                                "
                                        ),
                                      ])
                                    : _c("b-skeleton", {
                                        attrs: {
                                          animation: "wave",
                                          width: "5%",
                                        },
                                      }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "detail-item" },
                                [
                                  _c("strong", [_vm._v("HSE manager:")]),
                                  _vm._v(" "),
                                  !_vm.apiHelpers.loading
                                    ? _c("span", [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(
                                              _vm.projectData
                                                .project_hse_manager_name
                                            ) +
                                            "\n                                "
                                        ),
                                      ])
                                    : _c("b-skeleton", {
                                        attrs: {
                                          animation: "wave",
                                          width: "5%",
                                        },
                                      }),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "mt-3" },
                                [
                                  _c("strong", [
                                    _vm._v("Project description:"),
                                  ]),
                                  _vm._v(" "),
                                  !_vm.apiHelpers.loading
                                    ? _c("p", { staticClass: "mt-2" }, [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(
                                              _vm.projectData.description
                                            ) +
                                            "\n                                "
                                        ),
                                      ])
                                    : _c("b-skeleton", {
                                        staticClass: "mt-1",
                                        attrs: {
                                          animation: "wave",
                                          width: "20%",
                                        },
                                      }),
                                ],
                                1
                              ),
                            ]),
                          ]),
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
              _c("BTab", { attrs: { title: "Task" } }, [_c("Tasks")], 1),
              _vm._v(" "),
              _c(
                "BTab",
                { attrs: { title: "Documents" } },
                [
                  _c(
                    "BCard",
                    { staticClass: "p-2", attrs: { "no-body": "" } },
                    [
                      _c("BCardTitle", [_vm._v("Documents")]),
                      _vm._v(" "),
                      _c("BCardText", [
                        _vm._v("Document management content goes here"),
                      ]),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "BTab",
                { attrs: { title: "Checklists" } },
                [
                  _c(
                    "BCard",
                    { staticClass: "p-2", attrs: { "no-body": "" } },
                    [
                      _c("BCardTitle", [_vm._v("Checklists")]),
                      _vm._v(" "),
                      _c("BCardText", [_vm._v("Checklist content goes here")]),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "BTab",
                { attrs: { title: "Safe Job Analysis" } },
                [
                  _c(
                    "BCard",
                    { staticClass: "p-2", attrs: { "no-body": "" } },
                    [
                      _c("BCardTitle", [_vm._v("Safe Job Analysis")]),
                      _vm._v(" "),
                      _c("BCardText", [
                        _vm._v("Safe job analysis content goes here"),
                      ]),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "BTab",
                { attrs: { title: "Deviation" } },
                [
                  _c(
                    "BCard",
                    { staticClass: "p-2", attrs: { "no-body": "" } },
                    [
                      _c("BCardTitle", [_vm._v("Deviation")]),
                      _vm._v(" "),
                      _c("BCardText", [
                        _vm._v("Deviation tracking content goes here"),
                      ]),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "BTab",
                { attrs: { title: "Crew list" } },
                [
                  _c(
                    "BCard",
                    { staticClass: "p-2", attrs: { "no-body": "" } },
                    [
                      _c("BCardTitle", [_vm._v("Crew List")]),
                      _vm._v(" "),
                      _c("BCardText", [
                        _vm._v("Crew management content goes here"),
                      ]),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "BTab",
                { attrs: { title: "Pictures" } },
                [
                  _c(
                    "BCard",
                    { staticClass: "p-2", attrs: { "no-body": "" } },
                    [
                      _c("BCardTitle", [_vm._v("Pictures")]),
                      _vm._v(" "),
                      _c("BCardText", [
                        _vm._v("Project pictures gallery goes here"),
                      ]),
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
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/projects/project.vue":
/*!*****************************************************!*\
  !*** ./resources/js/src/views/projects/project.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _project_vue_vue_type_template_id_c18abce4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.vue?vue&type=template&id=c18abce4& */ "./resources/js/src/views/projects/project.vue?vue&type=template&id=c18abce4&");
/* harmony import */ var _project_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.vue?vue&type=script&lang=js& */ "./resources/js/src/views/projects/project.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _project_vue_vue_type_style_index_0_id_c18abce4_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project.vue?vue&type=style&index=0&id=c18abce4&lang=scss& */ "./resources/js/src/views/projects/project.vue?vue&type=style&index=0&id=c18abce4&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _project_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _project_vue_vue_type_template_id_c18abce4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _project_vue_vue_type_template_id_c18abce4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/projects/project.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/projects/project.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/src/views/projects/project.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_project_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./project.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/projects/project.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_project_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/projects/project.vue?vue&type=style&index=0&id=c18abce4&lang=scss&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/views/projects/project.vue?vue&type=style&index=0&id=c18abce4&lang=scss& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_project_vue_vue_type_style_index_0_id_c18abce4_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./project.vue?vue&type=style&index=0&id=c18abce4&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/projects/project.vue?vue&type=style&index=0&id=c18abce4&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_project_vue_vue_type_style_index_0_id_c18abce4_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_project_vue_vue_type_style_index_0_id_c18abce4_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_project_vue_vue_type_style_index_0_id_c18abce4_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_project_vue_vue_type_style_index_0_id_c18abce4_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/projects/project.vue?vue&type=template&id=c18abce4&":
/*!************************************************************************************!*\
  !*** ./resources/js/src/views/projects/project.vue?vue&type=template&id=c18abce4& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_project_vue_vue_type_template_id_c18abce4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./project.vue?vue&type=template&id=c18abce4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/projects/project.vue?vue&type=template&id=c18abce4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_project_vue_vue_type_template_id_c18abce4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_project_vue_vue_type_template_id_c18abce4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);