(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[83],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attempt/overview.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/tasks/attempt/overview.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _composables_tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/composables/tasks */ "./resources/js/src/composables/tasks.js");
/* harmony import */ var _composables_users__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/composables/users */ "./resources/js/src/composables/users.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var _core_utils_filter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/utils/filter */ "./resources/js/src/@core/utils/filter.js");
/* harmony import */ var _auth_jwt_useJwt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/auth/jwt/useJwt */ "./resources/js/src/auth/jwt/useJwt.js");


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    BOverlay: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BOverlay"],
    BAvatar: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BAvatar"],
    BLink: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BLink"],
    BMedia: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BMedia"],
    BCard: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["BCard"]
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
      root = _ref.root;
    var _useTasks = Object(_composables_tasks__WEBPACK_IMPORTED_MODULE_2__["default"])(),
      task = _useTasks.task,
      getTaskById = _useTasks.getTaskById,
      updateTaskStatus = _useTasks.updateTaskStatus;
    var _useUsers = Object(_composables_users__WEBPACK_IMPORTED_MODULE_3__["default"])(),
      resolveUserRoleVariant = _useUsers.resolveUserRoleVariant;
    var userData = JSON.parse(_auth_jwt_useJwt__WEBPACK_IMPORTED_MODULE_7__["default"].getUserData());
    var statusIcons = {
      open: "bi-circle text-primary",
      completed: "bi-circle text-warning",
      "in progress": "bi-circle text-dark",
      "on hold": "bi-circle text-success"
    };
    var priorityIcons = {
      critical: "bi-thermometer-high text-danger",
      high: "bi-reception-4 text-warning",
      medium: "bi-reception-3 text-secondary",
      low: "bi-reception-2 text-info",
      none: "bi-reception-0 text-primary"
    };
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["onMounted"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
      return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getTaskById(root.$route.params.id);
            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    return {
      task: task,
      userData: userData,
      avatarText: _core_utils_filter__WEBPACK_IMPORTED_MODULE_6__["avatarText"],
      resolveUserRoleVariant: resolveUserRoleVariant,
      statusIcons: statusIcons,
      priorityIcons: priorityIcons,
      updateTaskStatus: updateTaskStatus
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

/***/ "./node_modules/core-js/modules/es.regexp.to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var flags = __webpack_require__(/*! ../internals/regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attempt/overview.vue?vue&type=style&index=0&id=6a587866&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/tasks/attempt/overview.vue?vue&type=style&index=0&id=6a587866&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".list[data-v-6a587866] {\n  display: flex;\n  list-style: none;\n  gap: 40px;\n}[dir] .list[data-v-6a587866] {\n  margin-bottom: 15px;\n}\n.list .label[data-v-6a587866] {\n  font-size: medium;\n  font-weight: 600;\n  text-transform: capitalize;\n  min-width: 200px;\n}\n.list .value[data-v-6a587866] {\n  font-size: medium;\n  text-transform: capitalize;\n}\n[dir] ul[data-v-6a587866] {\n  padding: 0;\n  margin: 0;\n}\n[dir] .card-custom[data-v-6a587866] {\n  background-color: #f4f4f4 !important;\n}\n[dir] .dark-layout .card-custom[data-v-6a587866] {\n  background-color: #283046 !important;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attempt/overview.vue?vue&type=style&index=0&id=6a587866&lang=scss&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/sass-loader/dist/cjs.js??ref--11-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/tasks/attempt/overview.vue?vue&type=style&index=0&id=6a587866&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./overview.vue?vue&type=style&index=0&id=6a587866&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attempt/overview.vue?vue&type=style&index=0&id=6a587866&lang=scss&scoped=true&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attempt/overview.vue?vue&type=template&id=6a587866&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/tasks/attempt/overview.vue?vue&type=template&id=6a587866&scoped=true& ***!
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
  return _vm.task.data
    ? _c(
        "div",
        { staticClass: "mt-2" },
        [
          _c(
            "b-card",
            [
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
                  _c("div", [
                    _c("h2", [
                      _vm._v(_vm._s(_vm.task.data.title || "No Title")),
                    ]),
                    _vm._v(" "),
                    _c("ul", { staticClass: "mt-2" }, [
                      _vm.task.data.img
                        ? _c("li", { staticClass: "list" }, [
                            _c(
                              "span",
                              { staticClass: "value border rounded" },
                              [
                                _c("img", {
                                  staticClass: "rounded",
                                  attrs: {
                                    width: "250",
                                    src: _vm.task.data.img,
                                    alt: "Task Image",
                                  },
                                }),
                              ]
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.task.data.location
                        ? _c("li", { staticClass: "list" }, [
                            _c("span", { staticClass: "label" }, [
                              _vm._v("Location"),
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "value" }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.task.data.location.area || "N/A") +
                                  "\n                            " +
                                  _vm._s(_vm.task.data.location.floor || "") +
                                  "\n                            " +
                                  _vm._s(_vm.task.data.location.room || "") +
                                  "\n                        "
                              ),
                            ]),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.task.data.category
                        ? _c("li", { staticClass: "list" }, [
                            _c("span", { staticClass: "label" }, [
                              _vm._v("Category"),
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "value" }, [
                              _vm._v(
                                _vm._s(
                                  _vm.task.data.category.name || "Uncategorized"
                                )
                              ),
                            ]),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.task.data.priority
                        ? _c("li", { staticClass: "list" }, [
                            _c("span", { staticClass: "label" }, [
                              _vm._v("Priority"),
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "value" }, [
                              _vm.priorityIcons[
                                _vm.task.data.priority.toLowerCase()
                              ]
                                ? _c("i", {
                                    class:
                                      "bi " +
                                      _vm.priorityIcons[
                                        _vm.task.data.priority.toLowerCase()
                                      ],
                                  })
                                : _vm._e(),
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.task.data.priority) +
                                  "\n                        "
                              ),
                            ]),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.task.data.status
                        ? _c("li", { staticClass: "list" }, [
                            _c("span", { staticClass: "label" }, [
                              _vm._v("Status"),
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "value" }, [
                              _vm.statusIcons[_vm.task.data.status]
                                ? _c("i", {
                                    class:
                                      "bi " +
                                      _vm.statusIcons[_vm.task.data.status],
                                  })
                                : _vm._e(),
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.task.data.status) +
                                  "\n                        "
                              ),
                            ]),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.task.data.description
                        ? _c("li", { staticClass: "list" }, [
                            _c("span", { staticClass: "label" }, [
                              _vm._v("Description"),
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "value" }, [
                              _vm._v(
                                _vm._s(
                                  _vm.task.data.description ||
                                    "No description available"
                                )
                              ),
                            ]),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.task.data.users && _vm.task.data.users.length > 0
                        ? _c("li", { staticClass: "list" }, [
                            _c("span", { staticClass: "label" }, [
                              _vm._v("Assigned to"),
                            ]),
                            _vm._v(" "),
                            _c(
                              "span",
                              { staticClass: "value" },
                              [
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
                                              _vm.task.data.users[0].avatar
                                                ? _c("b-avatar", {
                                                    attrs: {
                                                      size: "32",
                                                      src: _vm.task.data
                                                        .users[0].avatar,
                                                      text: _vm.avatarText(
                                                        _vm.task.data.users[0]
                                                          .name || "User"
                                                      ),
                                                      variant:
                                                        "light-" +
                                                        _vm.resolveUserRoleVariant(
                                                          _vm.task.data.users[0]
                                                            .name || "User"
                                                        ),
                                                      to: {
                                                        name: "users-edit",
                                                        params: {
                                                          id: _vm.task.data
                                                            .users[0].id,
                                                        },
                                                      },
                                                    },
                                                  })
                                                : _vm._e(),
                                            ]
                                          },
                                          proxy: true,
                                        },
                                      ],
                                      null,
                                      false,
                                      597183692
                                    ),
                                  },
                                  [
                                    _vm._v(" "),
                                    _vm.task.data.users[0].id
                                      ? _c(
                                          "b-link",
                                          {
                                            attrs: {
                                              to: {
                                                name: "users-edit",
                                                params: {
                                                  id: _vm.task.data.users[0].id,
                                                },
                                              },
                                            },
                                          },
                                          [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(
                                                  _vm.task.data.users[0].name ||
                                                    "Unnamed User"
                                                ) +
                                                "\n                                "
                                            ),
                                          ]
                                        )
                                      : _vm._e(),
                                  ],
                                  1
                                ),
                              ],
                              1
                            ),
                          ])
                        : _vm._e(),
                    ]),
                  ]),
                  _vm._v(" "),
                  _vm.task.data.checklist
                    ? _c(
                        "b-card",
                        {
                          staticClass: "d-flex card-custom",
                          staticStyle: { "max-width": "500px" },
                        },
                        [
                          _c("div", { staticClass: "d-flex" }, [
                            _vm.task.data.checklist.color
                              ? _c(
                                  "div",
                                  {
                                    staticClass: "rounded",
                                    style: {
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      width: "50px",
                                      height: "50px",
                                      background: _vm.task.data.checklist.color,
                                    },
                                  },
                                  [
                                    _vm.task.data.checklist.icon
                                      ? _c("i", {
                                          class: _vm.task.data.checklist.icon,
                                          style: {
                                            color: "#fff",
                                            fontSize: "20px",
                                          },
                                        })
                                      : _vm._e(),
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticStyle: {
                                  display: "flex",
                                  "flex-direction": "column",
                                  "align-items": "start",
                                },
                              },
                              [
                                _c(
                                  "span",
                                  {
                                    staticClass:
                                      "ml-2 text-capitalize text-truncate",
                                    staticStyle: {
                                      "font-size": "16px",
                                      "font-weight": "600",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(
                                          _vm.task.data.checklist.name ||
                                            "Unnamed Checklist"
                                        ) +
                                        "\n                        "
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  { staticClass: "ml-2 text-capitalize" },
                                  [
                                    _vm.task.data.checklist.sections
                                      ? _c("strong", [
                                          _vm._v(
                                            _vm._s(
                                              _vm.task.data.checklist.sections
                                                .length
                                            )
                                          ),
                                        ])
                                      : _vm._e(),
                                    _vm._v(
                                      "\n                            Items\n                        "
                                    ),
                                  ]
                                ),
                              ]
                            ),
                          ]),
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.task.data.project
                    ? _c(
                        "b-card",
                        { staticClass: "mt-4 p-1 border-primary shadow-sm" },
                        [
                          _c(
                            "h3",
                            {
                              staticClass:
                                "text-primary border-bottom pb-2 mb-3",
                            },
                            [_vm._v("Project Details")]
                          ),
                          _vm._v(" "),
                          _c("ul", { staticClass: "list-unstyled" }, [
                            _c("li", { staticClass: "mb-2" }, [
                              _c("strong", [_vm._v("Project No:")]),
                              _vm._v(
                                " " + _vm._s(_vm.task.data.project.project_no)
                              ),
                            ]),
                            _vm._v(" "),
                            _c("li", { staticClass: "mb-2" }, [
                              _c("strong", [_vm._v("Name:")]),
                              _vm._v(" " + _vm._s(_vm.task.data.project.name)),
                            ]),
                            _vm._v(" "),
                            _c(
                              "li",
                              {
                                staticClass:
                                  "mb-2 d-flex align-items-center gx-5",
                              },
                              [
                                _c("strong", [_vm._v("Status:")]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "rounded text-capitalize text-center ml-1",
                                    class:
                                      _vm.task.data.project.status ==
                                      "completed"
                                        ? "completed"
                                        : "incompleted",
                                    staticStyle: {
                                      width: "120px",
                                      padding: "5px",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n\n                            " +
                                        _vm._s(
                                          _vm.task.data.project.status.replace(
                                            /_/g,
                                            " "
                                          )
                                        ) +
                                        "\n                        "
                                    ),
                                  ]
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c("li", { staticClass: "mb-2" }, [
                              _c("strong", [_vm._v("Customer:")]),
                              _vm._v(
                                " " +
                                  _vm._s(_vm.task.data.project.customer_name)
                              ),
                            ]),
                            _vm._v(" "),
                            _c("li", { staticClass: "mb-2" }, [
                              _c("strong", [_vm._v("Project Manager:")]),
                              _vm._v(
                                " " +
                                  _vm._s(
                                    _vm.task.data.project.project_manager_name
                                  ) +
                                  "\n                    "
                              ),
                            ]),
                            _vm._v(" "),
                            _c("li", { staticClass: "mb-2" }, [
                              _c("strong", [_vm._v("Start Date:")]),
                              _vm._v(
                                " " + _vm._s(_vm.task.data.project.start_date)
                              ),
                            ]),
                            _vm._v(" "),
                            _c("li", { staticClass: "mb-2" }, [
                              _c("strong", [_vm._v("End Date:")]),
                              _vm._v(
                                " " + _vm._s(_vm.task.data.project.end_date)
                              ),
                            ]),
                            _vm._v(" "),
                            _c("li", { staticClass: "mb-2" }, [
                              _c("strong", [_vm._v("Cost:")]),
                              _vm._v(" $" + _vm._s(_vm.task.data.project.cost)),
                            ]),
                            _vm._v(" "),
                            _c("li", { staticClass: "mb-2" }, [
                              _c("strong", [_vm._v("Description:")]),
                              _vm._v(
                                " " + _vm._s(_vm.task.data.project.description)
                              ),
                            ]),
                          ]),
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.userData.role !== "Admin"
                    ? _c("div", [
                        _vm.task.data.status === "in progress"
                          ? _c(
                              "button",
                              { staticClass: "btn btn-primary mt-4" },
                              [
                                _c(
                                  "router-link",
                                  {
                                    staticClass: "text-white",
                                    attrs: { to: "perform-task" },
                                  },
                                  [_vm._v("Continue task")]
                                ),
                              ],
                              1
                            )
                          : _vm.task.data.status === "completed"
                          ? _c(
                              "button",
                              { staticClass: "btn btn-primary mt-4" },
                              [
                                _c(
                                  "router-link",
                                  {
                                    staticClass: "text-white",
                                    attrs: { to: "perform-task" },
                                  },
                                  [_vm._v("View task")]
                                ),
                              ],
                              1
                            )
                          : _c(
                              "button",
                              {
                                staticClass: "btn btn-primary mt-4",
                                on: {
                                  click: function ($event) {
                                    return _vm.updateTaskStatus(
                                      "in progress",
                                      _vm.task.data.id
                                    )
                                  },
                                },
                              },
                              [
                                _vm._v(
                                  "\n                    Start task\n                "
                                ),
                              ]
                            ),
                      ])
                    : _c("div", [
                        _c(
                          "button",
                          { staticClass: "btn btn-primary mt-4" },
                          [
                            _c(
                              "router-link",
                              {
                                staticClass: "text-white",
                                attrs: { to: "perform-task" },
                              },
                              [_vm._v("View task")]
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
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/@core/utils/filter.js":
/*!************************************************!*\
  !*** ./resources/js/src/@core/utils/filter.js ***!
  \************************************************/
/*! exports provided: kFormatter, title, avatarText, changeDateFormat, formatDate, formatDateToMonthShort, filterTags */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kFormatter", function() { return kFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "title", function() { return title; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avatarText", function() { return avatarText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeDateFormat", function() { return changeDateFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDateToMonthShort", function() { return formatDateToMonthShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterTags", function() { return filterTags; });
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils */ "./resources/js/src/@core/utils/utils.js");











var kFormatter = function kFormatter(num) {
  return num > 999 ? "".concat((num / 1000).toFixed(1), "k") : num;
};
var title = function title(value) {
  var replacer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
  if (!value) return '';
  var str = value.toString();
  var arr = str.split(replacer);
  var capitalizedArray = [];
  arr.forEach(function (word) {
    var capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    capitalizedArray.push(capitalized);
  });
  return capitalizedArray.join(' ');
};
var avatarText = function avatarText(value) {
  if (!value) return '';
  var nameArray = value.split(' ');
  return nameArray.map(function (word) {
    return word.charAt(0).toUpperCase();
  }).join('');
};
var changeDateFormat = function changeDateFormat(userDate) {
  var newDate = new Date(userDate);
  var date = newDate.getDate();
  var month = newDate.getMonth();
  var year = newDate.getFullYear();
  return [year, month, date].join('-');
};

/**
 * Format and return date in Humanize format
 * Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 * Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
var formatDate = function formatDate(value) {
  var formatting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
  if (!value) return value;
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

/**
 * Return short human friendly month representation of date
 * Can also convert date to only time if date is of today (Better UX)
 * @param {String} value date to format
 * @param {Boolean} toTimeForCurrentDay Shall convert to time if day is today/current
 */
var formatDateToMonthShort = function formatDateToMonthShort(value) {
  var toTimeForCurrentDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var date = new Date(value);
  var formatting = {
    month: 'short',
    day: 'numeric'
  };
  if (toTimeForCurrentDay && Object(_utils__WEBPACK_IMPORTED_MODULE_10__["isToday"])(date)) {
    formatting = {
      hour: 'numeric',
      minute: 'numeric'
    };
  }
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

// Strip all the tags from markup and return plain text
var filterTags = function filterTags(value) {
  return value.replace(/<\/?[^>]+(>|$)/g, '');
};

/***/ }),

/***/ "./resources/js/src/@core/utils/utils.js":
/*!***********************************************!*\
  !*** ./resources/js/src/@core/utils/utils.js ***!
  \***********************************************/
/*! exports provided: isObject, isToday, getRandomBsVariant, isDynamicRouteActive, dateFormat, useRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isToday", function() { return isToday; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomBsVariant", function() { return getRandomBsVariant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDynamicRouteActive", function() { return isDynamicRouteActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateFormat", function() { return dateFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRouter", function() { return useRouter; });
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/router */ "./resources/js/src/router/index.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");




// eslint-disable-next-line object-curly-newline

var isObject = function isObject(obj) {
  return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj) === 'object' && obj !== null;
};
var isToday = function isToday(date) {
  var today = new Date();
  return (/* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

var getRandomFromArray = function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
};

// ? Light and Dark variant is not included
// prettier-ignore
var getRandomBsVariant = function getRandomBsVariant() {
  return getRandomFromArray(['primary', 'secondary', 'success', 'warning', 'danger', 'info']);
};
var isDynamicRouteActive = function isDynamicRouteActive(route) {
  var _router$resolve = _router__WEBPACK_IMPORTED_MODULE_3__["default"].resolve(route),
    resolvedRoute = _router$resolve.route;
  return resolvedRoute.path === _router__WEBPACK_IMPORTED_MODULE_3__["default"].currentRoute.path;
};
var dateFormat = function dateFormat(date) {
  var d = new Date(date);
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1; // Months are zero based
  var curr_year = d.getFullYear();
  return "".concat(curr_date, "/").concat(curr_month, "/").concat(curr_year);
};

// Thanks: https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
var useRouter = function useRouter() {
  var vm = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["getCurrentInstance"])().proxy;
  var state = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["reactive"])({
    route: vm.$route
  });
  Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["watch"])(function () {
    return vm.$route;
  }, function (r) {
    state.route = r;
  });
  return Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_home_aadilsafi_sandbox_saif_new_jimmy_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["toRefs"])(state)), {}, {
    router: vm.$router
  });
};

/**
 * This is just enhancement over Object.extend [Gives deep extend]
 * @param {target} a Object which contains values to be overridden
 * @param {source} b Object which contains values to override
 */
// export const objectExtend = (a, b) => {
//   // Don't touch 'null' or 'undefined' objects.
//   if (a == null || b == null) {
//     return a
//   }

//   Object.keys(b).forEach(key => {
//     if (Object.prototype.toString.call(b[key]) === '[object Object]') {
//       if (Object.prototype.toString.call(a[key]) !== '[object Object]') {
//         // eslint-disable-next-line no-param-reassign
//         a[key] = b[key]
//       } else {
//         // eslint-disable-next-line no-param-reassign
//         a[key] = objectExtend(a[key], b[key])
//       }
//     } else {
//       // eslint-disable-next-line no-param-reassign
//       a[key] = b[key]
//     }
//   })

//   return a
// }

/***/ }),

/***/ "./resources/js/src/views/tasks/attempt/overview.vue":
/*!***********************************************************!*\
  !*** ./resources/js/src/views/tasks/attempt/overview.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _overview_vue_vue_type_template_id_6a587866_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./overview.vue?vue&type=template&id=6a587866&scoped=true& */ "./resources/js/src/views/tasks/attempt/overview.vue?vue&type=template&id=6a587866&scoped=true&");
/* harmony import */ var _overview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overview.vue?vue&type=script&lang=js& */ "./resources/js/src/views/tasks/attempt/overview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _overview_vue_vue_type_style_index_0_id_6a587866_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overview.vue?vue&type=style&index=0&id=6a587866&lang=scss&scoped=true& */ "./resources/js/src/views/tasks/attempt/overview.vue?vue&type=style&index=0&id=6a587866&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _overview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _overview_vue_vue_type_template_id_6a587866_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _overview_vue_vue_type_template_id_6a587866_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6a587866",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/tasks/attempt/overview.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/tasks/attempt/overview.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/src/views/tasks/attempt/overview.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_overview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./overview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attempt/overview.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_overview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/tasks/attempt/overview.vue?vue&type=style&index=0&id=6a587866&lang=scss&scoped=true&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/src/views/tasks/attempt/overview.vue?vue&type=style&index=0&id=6a587866&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_overview_vue_vue_type_style_index_0_id_6a587866_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--11-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./overview.vue?vue&type=style&index=0&id=6a587866&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attempt/overview.vue?vue&type=style&index=0&id=6a587866&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_overview_vue_vue_type_style_index_0_id_6a587866_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_overview_vue_vue_type_style_index_0_id_6a587866_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_overview_vue_vue_type_style_index_0_id_6a587866_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_sass_loader_dist_cjs_js_ref_11_0_node_modules_vue_loader_lib_index_js_vue_loader_options_overview_vue_vue_type_style_index_0_id_6a587866_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/src/views/tasks/attempt/overview.vue?vue&type=template&id=6a587866&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/views/tasks/attempt/overview.vue?vue&type=template&id=6a587866&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_overview_vue_vue_type_template_id_6a587866_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./overview.vue?vue&type=template&id=6a587866&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/tasks/attempt/overview.vue?vue&type=template&id=6a587866&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_overview_vue_vue_type_template_id_6a587866_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_overview_vue_vue_type_template_id_6a587866_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);