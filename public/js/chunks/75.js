(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[75],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/customer/auth/Login.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/customer/auth/Login.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var _composables_customer_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/composables/customer/auth */ "./resources/js/src/composables/customer/auth.js");
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @validations */ "./resources/js/src/@core/utils/validations/validations.js");
/* harmony import */ var _core_comp_functions_forms_form_validation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @core/comp-functions/forms/form-validation */ "./resources/js/src/@core/comp-functions/forms/form-validation.js");
/* harmony import */ var _core_components_toastification_ToastificationContent_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @core/components/toastification/ToastificationContent.vue */ "./resources/js/src/@core/components/toastification/ToastificationContent.vue");




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    BOverlay: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__["BOverlay"],
    ValidationProvider: vee_validate__WEBPACK_IMPORTED_MODULE_5__["ValidationProvider"],
    ValidationObserver: vee_validate__WEBPACK_IMPORTED_MODULE_5__["ValidationObserver"]
  },
  setup: function setup(props, _ref) {
    var root = _ref.root;

    var _useAuth = Object(_composables_customer_auth__WEBPACK_IMPORTED_MODULE_7__["default"])(),
        busy = _useAuth.busy,
        login = _useAuth.login,
        responseStatus = _useAuth.responseStatus;

    var loginData = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_6__["reactive"])({
      email: '',
      password: ''
    });

    var _formValidation = Object(_core_comp_functions_forms_form_validation__WEBPACK_IMPORTED_MODULE_9__["default"])(),
        refFormObserver = _formValidation.refFormObserver,
        getValidationState = _formValidation.getValidationState,
        resetForm = _formValidation.resetForm;

    var onSubmit = /*#__PURE__*/function () {
      var _ref2 = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee() {
        var _responseStatus$value, userData, token;

        return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return login(loginData);

              case 2:
                if (responseStatus.value.status === 200) {
                  _responseStatus$value = responseStatus.value.data, userData = _responseStatus$value.userData, token = _responseStatus$value.token; // useJwt.setToken(token)
                  // useJwt.setUserData(JSON.stringify(userData))

                  root.$router.replace({
                    name: 'customer-profile'
                  }).then(function () {
                    root.$toast({
                      component: _core_components_toastification_ToastificationContent_vue__WEBPACK_IMPORTED_MODULE_10__["default"],
                      position: 'top-right',
                      props: {
                        title: "Welcome ".concat(userData.first_name),
                        icon: 'CoffeeIcon',
                        variant: 'success',
                        text: 'You have successfully logged in.'
                      }
                    });
                  });
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

    return {
      email: _validations__WEBPACK_IMPORTED_MODULE_8__["email"],
      busy: busy,
      required: _validations__WEBPACK_IMPORTED_MODULE_8__["required"],
      onSubmit: onSubmit,
      loginData: loginData,
      resetForm: resetForm,
      refFormObserver: refFormObserver,
      getValidationState: getValidationState
    };
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/customer/auth/Login.vue?vue&type=template&id=2c576859&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/customer/auth/Login.vue?vue&type=template&id=2c576859& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
  return _c("main", { staticClass: "main-website-wrap" }, [
    _c(
      "section",
      {
        staticClass:
          "vh-100 d-flex align-items-center justify-content-stretch login-wrapper",
      },
      [
        _c("div", { staticClass: "container" }, [
          _c("div", { staticClass: "row justify-content-center" }, [
            _c(
              "div",
              { staticClass: "col-md-8 col-lg-7 col-xl-6 px-xl-4" },
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
                                "form",
                                {
                                  staticClass: "bg-white p-md-5 rounded-4",
                                  on: {
                                    submit: function ($event) {
                                      $event.preventDefault()
                                      return handleSubmit(_vm.onSubmit)
                                    },
                                  },
                                },
                                [
                                  _c("div", { staticClass: "p-4" }, [
                                    _c("div", { staticClass: "text-center" }, [
                                      _c(
                                        "a",
                                        {
                                          staticClass:
                                            "logo d-inline-block mb-4",
                                          attrs: { href: "index.html" },
                                        },
                                        [
                                          _c("img", {
                                            attrs: {
                                              src: "/images/logo.jpg",
                                              width: "200",
                                            },
                                          }),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c("h6", [_vm._v("Login Your Account")]),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "form-outline mb-4" },
                                      [
                                        _c(
                                          "label",
                                          {
                                            staticClass: "form-label",
                                            attrs: { for: "emailaddress" },
                                          },
                                          [_vm._v("Email")]
                                        ),
                                        _vm._v(" "),
                                        _c("validation-provider", {
                                          attrs: {
                                            name: "Email",
                                            rules: "required|email",
                                          },
                                          scopedSlots: _vm._u(
                                            [
                                              {
                                                key: "default",
                                                fn: function (ref) {
                                                  var errors = ref.errors
                                                  return [
                                                    _c("input", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value:
                                                            _vm.loginData.email,
                                                          expression:
                                                            "loginData.email",
                                                        },
                                                      ],
                                                      staticClass:
                                                        "form-control py-2 rounded-0",
                                                      attrs: {
                                                        type: "email",
                                                        id: "emailaddress",
                                                        placeholder:
                                                          "Enter Your Email",
                                                      },
                                                      domProps: {
                                                        value:
                                                          _vm.loginData.email,
                                                      },
                                                      on: {
                                                        input: function (
                                                          $event
                                                        ) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.loginData,
                                                            "email",
                                                            $event.target.value
                                                          )
                                                        },
                                                      },
                                                    }),
                                                    _vm._v(" "),
                                                    _c(
                                                      "small",
                                                      {
                                                        staticClass:
                                                          "text-danger",
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(errors[0])
                                                        ),
                                                      ]
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
                                      "div",
                                      { staticClass: "form-outline mb-4" },
                                      [
                                        _c(
                                          "label",
                                          {
                                            staticClass: "form-label",
                                            attrs: { for: "password" },
                                          },
                                          [_vm._v("Password")]
                                        ),
                                        _vm._v(" "),
                                        _c("validation-provider", {
                                          attrs: {
                                            name: "Password",
                                            rules: "required",
                                          },
                                          scopedSlots: _vm._u(
                                            [
                                              {
                                                key: "default",
                                                fn: function (ref) {
                                                  var errors = ref.errors
                                                  return [
                                                    _c("input", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value:
                                                            _vm.loginData
                                                              .password,
                                                          expression:
                                                            "loginData.password",
                                                        },
                                                      ],
                                                      staticClass:
                                                        "form-control py-2 rounded-0",
                                                      attrs: {
                                                        type: "password",
                                                        id: "password",
                                                        placeholder:
                                                          "Enter Your Password",
                                                      },
                                                      domProps: {
                                                        value:
                                                          _vm.loginData
                                                            .password,
                                                      },
                                                      on: {
                                                        input: function (
                                                          $event
                                                        ) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.loginData,
                                                            "password",
                                                            $event.target.value
                                                          )
                                                        },
                                                      },
                                                    }),
                                                    _vm._v(" "),
                                                    _c(
                                                      "small",
                                                      {
                                                        staticClass:
                                                          "text-danger",
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(errors[0])
                                                        ),
                                                      ]
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
                                      "div",
                                      {
                                        staticClass:
                                          "d-flex justify-content-end mb-4",
                                      },
                                      [
                                        _c("a", { attrs: { href: "#!" } }, [
                                          _vm._v("Forgot password?"),
                                        ]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn btn-prime btn-block border-0 w-100 py-2 rounded-0",
                                        attrs: { type: "submit" },
                                      },
                                      [
                                        _c(
                                          "span",
                                          { staticClass: "d-block py-1" },
                                          [_vm._v("Sign in")]
                                        ),
                                      ]
                                    ),
                                  ]),
                                ]
                              ),
                            ]
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
        ]),
      ]
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/composables/customer/auth.js":
/*!*******************************************************!*\
  !*** ./resources/js/src/composables/customer/auth.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useAuth; });
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js */ "./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js");
/* harmony import */ var E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @axios */ "./resources/js/src/libs/axios.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var ziggy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ziggy-js */ "./node_modules/ziggy-js/dist/index.js");
/* harmony import */ var ziggy_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ziggy_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _toaster__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toaster */ "./resources/js/src/composables/customer/toaster.js");






function useAuth() {
  var busy = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(false);
  var inviteUserData = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])([]);
  var responseStatus = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(null);
  var toast = Object(_toaster__WEBPACK_IMPORTED_MODULE_5__["default"])();
  var errors = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])({});

  var login = /*#__PURE__*/function () {
    var _ref = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee(loginData) {
      var response;
      return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              busy.value = true;
              _context.next = 4;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('customer.login'), loginData);

            case 4:
              response = _context.sent;
              responseStatus.value = response;
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);

              if (_context.t0.message === 'Network Error') {
                toast.error(_context.t0.message);
              } else {
                if (_context.t0.response.status === 422) {
                  errors.value = _context.t0.response.data.errors;
                }

                responseStatus.value = _context.t0;
                toast.error(_context.t0.response.data.message);
              }

            case 11:
              _context.prev = 11;
              busy.value = false;
              return _context.finish(11);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8, 11, 14]]);
    }));

    return function login(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var forgotPassword = /*#__PURE__*/function () {
    var _ref2 = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee2(email) {
      var response;
      return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              busy.value = true;
              _context2.next = 4;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('customer.password.email'), {
                email: email
              });

            case 4:
              response = _context2.sent;
              toast.success(response.data.message);
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);

              if (_context2.t0.message === 'Network Error') {
                toast.error(_context2.t0.message);
              } else {
                responseStatus.value = _context2.t0;
                toast.error(_context2.t0.response.data.message);
              }

            case 11:
              _context2.prev = 11;
              busy.value = false;
              return _context2.finish(11);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8, 11, 14]]);
    }));

    return function forgotPassword(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var resetPassword = /*#__PURE__*/function () {
    var _ref3 = Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().mark(function _callee3(formData) {
      var response;
      return Object(E_Projects_PriorityHome_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_0__["default"])().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              busy.value = true;
              _context3.next = 4;
              return _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post(ziggy_js__WEBPACK_IMPORTED_MODULE_4___default()('customer.password.reset'), formData);

            case 4:
              response = _context3.sent;
              responseStatus.value = response;
              toast.success(response.data.message);
              _context3.next = 12;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);

              if (_context3.t0.message === 'Network Error') {
                toast.error(_context3.t0.message);
              } else {
                responseStatus.value = _context3.t0;
                toast.error(_context3.t0.response.data.message);
              }

            case 12:
              _context3.prev = 12;
              busy.value = false;
              return _context3.finish(12);

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9, 12, 15]]);
    }));

    return function resetPassword(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    login: login,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    busy: busy,
    responseStatus: responseStatus,
    inviteUserData: inviteUserData
  };
}

/***/ }),

/***/ "./resources/js/src/composables/customer/toaster.js":
/*!**********************************************************!*\
  !*** ./resources/js/src/composables/customer/toaster.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return toaster; });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core_components_toastification_ToastificationContent_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/components/toastification/ToastificationContent.vue */ "./resources/js/src/@core/components/toastification/ToastificationContent.vue");
/* harmony import */ var vue_toastification_composition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-toastification/composition */ "./node_modules/vue-toastification/composition/index.js");
/* harmony import */ var vue_toastification_composition__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue_toastification_composition__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vue_toastification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/esm/index.js");
/* harmony import */ var _core_scss_vue_libs_toastification_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @core/scss/vue/libs/toastification.scss */ "./resources/js/src/@core/scss/vue/libs/toastification.scss");
/* harmony import */ var _core_scss_vue_libs_toastification_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_core_scss_vue_libs_toastification_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");








var ProviderSymbol = Symbol('Vue Toastification');
function toaster() {
  var provideRoot = function provideRoot(root) {
    return Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__["provide"])(ProviderSymbol, root);
  };

  var injectRoot = function injectRoot() {
    return Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__["inject"])(ProviderSymbol);
  };

  var toast = Object(vue_toastification_composition__WEBPACK_IMPORTED_MODULE_4__["useToast"])(); // const pluginOptions = {
  //   timeout: 4000,
  // }
  // // Create the interface
  // const toast = createToastInterface(pluginOptions)

  var success = function success(msg) {
    toast({
      component: _core_components_toastification_ToastificationContent_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
      timeout: 5000,
      props: {
        text: msg,
        title: 'Success',
        icon: 'AlertTriangleIcon',
        variant: 'success'
      }
    });
  };

  var error = function error(msg) {
    toast({
      component: _core_components_toastification_ToastificationContent_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
      timeout: 5000,
      props: {
        text: msg,
        title: 'Error',
        icon: 'AlertTriangleIcon',
        variant: 'danger'
      }
    });
  };

  return {
    provideRoot: provideRoot,
    injectRoot: injectRoot,
    success: success,
    error: error
  };
}

/***/ }),

/***/ "./resources/js/src/views/customer/auth/Login.vue":
/*!********************************************************!*\
  !*** ./resources/js/src/views/customer/auth/Login.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_2c576859___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=2c576859& */ "./resources/js/src/views/customer/auth/Login.vue?vue&type=template&id=2c576859&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js& */ "./resources/js/src/views/customer/auth/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_2c576859___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_2c576859___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/customer/auth/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/customer/auth/Login.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/src/views/customer/auth/Login.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/customer/auth/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/customer/auth/Login.vue?vue&type=template&id=2c576859&":
/*!***************************************************************************************!*\
  !*** ./resources/js/src/views/customer/auth/Login.vue?vue&type=template&id=2c576859& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_2c576859___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=template&id=2c576859& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/customer/auth/Login.vue?vue&type=template&id=2c576859&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_2c576859___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_2c576859___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);