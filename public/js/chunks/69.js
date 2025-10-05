(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[69],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/employees/Details.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/employees/Details.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var vue_ripple_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-ripple-directive */ "./node_modules/vue-ripple-directive/src/ripple.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony import */ var _composables_users__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/composables/users */ "./resources/js/src/composables/users.js");
/* harmony import */ var _core_libs_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/libs/i18n */ "./resources/js/src/@core/libs/i18n/index.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    BCardText: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BCardText"],
    BCard: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BCard"],
    BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BCol"],
    BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BRow"],
    BCardTitle: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__["BCardTitle"]
  },
  directives: {
    Ripple: vue_ripple_directive__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  setup: function setup(_, _ref) {
    var root = _ref.root;
    var _useUsers = Object(_composables_users__WEBPACK_IMPORTED_MODULE_3__["default"])(),
      getUser = _useUsers.getUser,
      user = _useUsers.user;
    var _useI18nUtils = Object(_core_libs_i18n__WEBPACK_IMPORTED_MODULE_4__["useUtils"])(),
      t = _useI18nUtils.t;
    Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_2__["onMounted"])(function () {
      getUser(root.$route.params.id);
    });
    return {
      t: t,
      user: user
    };
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/employees/Details.vue?vue&type=template&id=1aace804&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/employees/Details.vue?vue&type=template&id=1aace804& ***!
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
  return _vm.user
    ? _c(
        "b-row",
        [
          _c(
            "b-col",
            { attrs: { sm: "3" } },
            [
              _c(
                "b-card",
                [
                  _c("b-card-title", [_vm._v("\n        Details\n      ")]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " + _vm._s(_vm.t("ID")) + "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " + _vm._s(_vm.user.id) + "\n        "
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.t("First Name")) +
                            "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.user.first_name) +
                            "\n        "
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.t("Last Name")) +
                            "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.user.last_name) +
                            "\n        "
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " + _vm._s(_vm.t("Email")) + "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " + _vm._s(_vm.user.email) + "\n        "
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.t("Address")) +
                            "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.user.address) +
                            "\n        "
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.t("Post Address")) +
                            "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.user.post_address) +
                            "\n        "
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.t("Post Code")) +
                            "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.user.postal_code) +
                            "\n        "
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.t("Date of Birth")) +
                            "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " + _vm._s(_vm.user.dob) + "\n        "
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.t("Gender")) +
                            "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.user.gender) +
                            "\n        "
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " + _vm._s(_vm.t("Phone")) + "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " + _vm._s(_vm.user.phone) + "\n        "
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.t("Citizen Country")) +
                            "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.user.citizen_country) +
                            "\n        "
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
          ),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { sm: "3" } },
            [
              _c(
                "b-card",
                [
                  _c("b-card-title", [
                    _vm._v(
                      "\n        " +
                        _vm._s(_vm.t("Employment Details")) +
                        "\n      "
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.t("Employement Date")) +
                            "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.user.employement_date) +
                            "\n        "
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.t("End Date")) +
                            "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.user.end_date) +
                            "\n        "
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.t("Position Percentage")) +
                            "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.user.position_percentage) +
                            "\n        "
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mt-1" },
                    [
                      _c("h5", { staticClass: "text-capitalize m-0" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.t("Job Description")) +
                            "\n        "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("b-card-text", [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.user.description) +
                            "\n        "
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
          ),
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-ripple-directive/src/ripple.js":
/*!*********************************************************!*\
  !*** ./node_modules/vue-ripple-directive/src/ripple.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Ripple = {
    bind: function(el, binding){

        // Default values.
        var props = {
            event: 'mousedown',
            transition: 600
        };

        setProps(Object.keys(binding.modifiers),props);

        el.addEventListener(props.event, function(event) {
            rippler(event, el, binding.value);
        });

        var bg = binding.value || Ripple.color || 'rgba(0, 0, 0, 0.35)';
        var zIndex = Ripple.zIndex || '9999';

        function rippler(event, el) {
            var target = el;
            // Get border to avoid offsetting on ripple container position
            var targetBorder = parseInt((getComputedStyle(target).borderWidth).replace('px', ''));

            // Get necessary variables
            var rect        = target.getBoundingClientRect(),
                left        = rect.left,
                top         = rect.top,
                width       = target.offsetWidth,
                height      = target.offsetHeight,
                dx          = event.clientX - left,
                dy          = event.clientY - top,
                maxX        = Math.max(dx, width - dx),
                maxY        = Math.max(dy, height - dy),
                style       = window.getComputedStyle(target),
                radius      = Math.sqrt((maxX * maxX) + (maxY * maxY)),
                border      = (targetBorder > 0 ) ? targetBorder : 0;

            // Create the ripple and its container
            var ripple = document.createElement("div"),
                rippleContainer = document.createElement("div");
                rippleContainer.className = 'ripple-container';
                ripple.className = 'ripple';

            //Styles for ripple
            ripple.style.marginTop= '0px';
            ripple.style.marginLeft= '0px';
            ripple.style.width= '1px';
            ripple.style.height= '1px';
            ripple.style.transition= 'all ' + props.transition + 'ms cubic-bezier(0.4, 0, 0.2, 1)';
            ripple.style.borderRadius= '50%';
            ripple.style.pointerEvents= 'none';
            ripple.style.position= 'relative';
            ripple.style.zIndex= zIndex;
            ripple.style.backgroundColor  = bg;

            //Styles for rippleContainer
            rippleContainer.style.position= 'absolute';
            rippleContainer.style.left = 0 - border + 'px';
            rippleContainer.style.top = 0 - border + 'px';
            rippleContainer.style.height = '0';
            rippleContainer.style.width = '0';
            rippleContainer.style.pointerEvents = 'none';
            rippleContainer.style.overflow = 'hidden';

            // Store target position to change it after
            var storedTargetPosition =  ((target.style.position).length > 0) ? target.style.position : getComputedStyle(target).position;
            // Change target position to relative to guarantee ripples correct positioning
            if (storedTargetPosition !== 'relative') {
                target.style.position = 'relative';
            }

            rippleContainer.appendChild(ripple);
            target.appendChild(rippleContainer);

            ripple.style.marginLeft   = dx + "px";
            ripple.style.marginTop    = dy + "px";

            // No need to set positioning because ripple should be child of target and to it's relative position.
            // rippleContainer.style.left    = left + (((window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0)) || 0) + "px";
            // rippleContainer.style.top     = top + (((window.pageYOffset || document.scrollTop) - (document.clientTop || 0)) || 0) + "px";
            rippleContainer.style.width   = width + "px";
            rippleContainer.style.height  = height + "px";
            rippleContainer.style.borderTopLeftRadius  = style.borderTopLeftRadius;
            rippleContainer.style.borderTopRightRadius  = style.borderTopRightRadius;
            rippleContainer.style.borderBottomLeftRadius  = style.borderBottomLeftRadius;
            rippleContainer.style.borderBottomRightRadius  = style.borderBottomRightRadius;

            rippleContainer.style.direction = 'ltr';

            setTimeout(function() {
                ripple.style.width  = radius * 2 + "px";
                ripple.style.height = radius * 2 + "px";
                ripple.style.marginLeft   = dx - radius + "px";
                ripple.style.marginTop    = dy - radius + "px";
            }, 0);

            function clearRipple() {
                setTimeout(function() {
                    ripple.style.backgroundColor = "rgba(0, 0, 0, 0)";
                }, 250);

                // Timeout set to get a smooth removal of the ripple
                setTimeout(function() {
                    rippleContainer.parentNode.removeChild(rippleContainer);
                }, 850);

                el.removeEventListener('mouseup', clearRipple, false);

                // After removing event set position to target to it's original one
                // Timeout it's needed to avoid jerky effect of ripple jumping out parent target
                setTimeout(function () {

                    var clearPosition = true;
                    for(var i = 0; i < target.childNodes.length; i++) {
                        if(target.childNodes[i].className === 'ripple-container') {
                            clearPosition = false;
                        }
                    }

                    if(clearPosition) {
                        if(storedTargetPosition !== 'static') {
                            target.style.position = storedTargetPosition;
                        } else {
                            target.style.position = '';
                        }
                    }

                }, props.transition + 250)
            }

            if(event.type === 'mousedown') {
                el.addEventListener('mouseup', clearRipple, false);
            } else {
                clearRipple();
            }
        }
    }
};

function setProps(modifiers,props) {
    modifiers.forEach(function(item) {
        if(isNaN(Number(item)))
            props.event = item;
        else
            props.transition = item;
    });
}

/* harmony default export */ __webpack_exports__["default"] = (Ripple);

/***/ }),

/***/ "./resources/js/src/views/employees/Details.vue":
/*!******************************************************!*\
  !*** ./resources/js/src/views/employees/Details.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Details_vue_vue_type_template_id_1aace804___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Details.vue?vue&type=template&id=1aace804& */ "./resources/js/src/views/employees/Details.vue?vue&type=template&id=1aace804&");
/* harmony import */ var _Details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Details.vue?vue&type=script&lang=js& */ "./resources/js/src/views/employees/Details.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Details_vue_vue_type_template_id_1aace804___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Details_vue_vue_type_template_id_1aace804___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/employees/Details.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/employees/Details.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/src/views/employees/Details.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Details.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/employees/Details.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/employees/Details.vue?vue&type=template&id=1aace804&":
/*!*************************************************************************************!*\
  !*** ./resources/js/src/views/employees/Details.vue?vue&type=template&id=1aace804& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Details_vue_vue_type_template_id_1aace804___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Details.vue?vue&type=template&id=1aace804& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/employees/Details.vue?vue&type=template&id=1aace804&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Details_vue_vue_type_template_id_1aace804___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Details_vue_vue_type_template_id_1aace804___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);