(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[101],{

/***/ "./node_modules/@vueuse/core/dist/index.esm.js":
/*!*****************************************************!*\
  !*** ./node_modules/@vueuse/core/dist/index.esm.js ***!
  \*****************************************************/
/*! exports provided: assert, biSyncRef, bypassFilter, clamp, controlledComputed, createFilterWrapper, debounceFilter, debouncedWatch, extendRef, ignorableWatch, invoke, isBoolean, isClient, isDef, isFunction, isNumber, isObject, isString, isWindow, makeDestructurable, noop, now, pausableFilter, pausableWatch, promiseTimeout, syncRef, throttleFilter, throttledWatch, timestamp, tryOnMounted, tryOnUnmounted, useCounter, useDebounce, useDebounceFn, useInterval, useIntervalFn, useThrottle, useThrottleFn, useTimeout, useTimeoutFn, useToggle, watchWithFilter, when, TransitionPresets, asyncComputed, createGlobalState, onClickOutside, onStartTyping, useAsyncState, useBattery, useBrowserLocation, useClipboard, useCssVar, useDeviceLight, useDeviceMotion, useDeviceOrientation, useDevicePixelRatio, useDocumentVisibility, useElementBounding, useElementSize, useElementVisibility, useEventListener, useEventSource, useFavicon, useFullscreen, useGeolocation, useIdle, useIntersectionObserver, useLocalStorage, useManualRefHistory, useMediaQuery, useMouse, useMouseInElement, useMousePressed, useMutationObserver, useNetwork, useOnline, usePageLeave, useParallax, usePermission, usePreferredColorScheme, usePreferredDark, usePreferredLanguages, useRafFn, useRefHistory, useResizeObserver, useSessionStorage, useShare, useSpeechRecognition, useStorage, useTimestamp, useTitle, useTransition, useVModel, useWebSocket, useWebWorker, useWebWorkerFn, useWindowScroll, useWindowSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransitionPresets", function() { return TransitionPresets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncComputed", function() { return asyncComputed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGlobalState", function() { return createGlobalState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onClickOutside", function() { return onClickOutside; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onStartTyping", function() { return onStartTyping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useAsyncState", function() { return useAsyncState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useBattery", function() { return useBattery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useBrowserLocation", function() { return useBrowserLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useClipboard", function() { return useClipboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useCssVar", function() { return useCssVar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDeviceLight", function() { return useDeviceLight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDeviceMotion", function() { return useDeviceMotion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDeviceOrientation", function() { return useDeviceOrientation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDevicePixelRatio", function() { return useDevicePixelRatio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDocumentVisibility", function() { return useDocumentVisibility; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useElementBounding", function() { return useElementBounding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useElementSize", function() { return useElementSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useElementVisibility", function() { return useElementVisibility; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useEventListener", function() { return useEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useEventSource", function() { return useEventSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFavicon", function() { return useFavicon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFullscreen", function() { return useFullscreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useGeolocation", function() { return useGeolocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useIdle", function() { return useIdle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useIntersectionObserver", function() { return useIntersectionObserver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLocalStorage", function() { return useLocalStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useManualRefHistory", function() { return useManualRefHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMediaQuery", function() { return useMediaQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMouse", function() { return useMouse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMouseInElement", function() { return useMouseInElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMousePressed", function() { return useMousePressed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMutationObserver", function() { return useMutationObserver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useNetwork", function() { return useNetwork; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useOnline", function() { return useOnline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usePageLeave", function() { return usePageLeave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useParallax", function() { return useParallax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usePermission", function() { return usePermission; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usePreferredColorScheme", function() { return usePreferredColorScheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usePreferredDark", function() { return usePreferredDark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usePreferredLanguages", function() { return usePreferredLanguages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRafFn", function() { return useRafFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRefHistory", function() { return useRefHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useResizeObserver", function() { return useResizeObserver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSessionStorage", function() { return useSessionStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useShare", function() { return useShare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSpeechRecognition", function() { return useSpeechRecognition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useStorage", function() { return useStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTimestamp", function() { return useTimestamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTitle", function() { return useTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTransition", function() { return useTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useVModel", function() { return useVModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useWebSocket", function() { return useWebSocket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useWebWorker", function() { return useWebWorker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useWebWorkerFn", function() { return useWebWorkerFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useWindowScroll", function() { return useWindowScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useWindowSize", function() { return useWindowSize; });
/* harmony import */ var vue_demi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-demi */ "./node_modules/vue-demi/lib/index.mjs");
/* harmony import */ var _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vueuse/shared */ "./node_modules/@vueuse/shared/dist/index.esm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["assert"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "biSyncRef", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["biSyncRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bypassFilter", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["bypassFilter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["clamp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "controlledComputed", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["controlledComputed"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFilterWrapper", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["createFilterWrapper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "debounceFilter", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["debounceFilter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "debouncedWatch", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["debouncedWatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extendRef", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["extendRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ignorableWatch", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["ignorableWatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "invoke", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["invoke"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isBoolean"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isClient", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isClient"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDef", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isDef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isFunction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isWindow", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isWindow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "makeDestructurable", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["makeDestructurable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["noop"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "now", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["now"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pausableFilter", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["pausableFilter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pausableWatch", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["pausableWatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "promiseTimeout", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["promiseTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "syncRef", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["syncRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "throttleFilter", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["throttleFilter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "throttledWatch", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["throttledWatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timestamp", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["timestamp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tryOnMounted", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnMounted"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tryOnUnmounted", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnUnmounted"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCounter", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["useCounter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useDebounce", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["useDebounce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useDebounceFn", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["useDebounceFn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useInterval", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["useInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useIntervalFn", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["useIntervalFn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useThrottle", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["useThrottle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useThrottleFn", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["useThrottleFn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTimeout", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["useTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTimeoutFn", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["useTimeoutFn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useToggle", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["useToggle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchWithFilter", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["watchWithFilter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "when", function() { return _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["when"]; });





/**
 * Create an asynchronous computed dependency.
 *
 * @see   {@link https://vueuse.js.org/asyncComputed}
 * @param evaluationCallback     The promise-returning callback which generates the computed value
 * @param initialState           The initial state, used until the first evaluation finishes
 * @param optionsOrRef           Additional options or a ref passed to receive the updates of the async evaluation
 */
function asyncComputed(evaluationCallback, initialState, optionsOrRef) {
    let options;
    if (Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["isRef"])(optionsOrRef)) {
        options = {
            evaluating: optionsOrRef,
        };
    }
    else {
        options = optionsOrRef !== null && optionsOrRef !== void 0 ? optionsOrRef : {};
    }
    const { lazy = false, evaluating = undefined, } = options;
    const started = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(!lazy);
    const current = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(initialState);
    let counter = 0;
    Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watchEffect"])(async (onInvalidate) => {
        if (!started.value)
            return;
        counter++;
        const counterAtBeginning = counter;
        let hasFinished = false;
        try {
            // Defer initial setting of `evaluating` ref
            // to avoid having it as a dependency
            if (evaluating) {
                Promise.resolve().then(() => {
                    evaluating.value = true;
                });
            }
            const result = await evaluationCallback((cancelCallback) => {
                onInvalidate(() => {
                    if (evaluating)
                        evaluating.value = false;
                    if (!hasFinished)
                        cancelCallback();
                });
            });
            if (counterAtBeginning === counter)
                current.value = result;
        }
        finally {
            if (evaluating)
                evaluating.value = false;
            hasFinished = true;
        }
    });
    if (lazy) {
        return Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["computed"])(() => {
            started.value = true;
            return current.value;
        });
    }
    else {
        return current;
    }
}

function withScope(factory) {
    const container = document.createElement('div');
    let state = null;
    Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["createApp"])({
        setup() {
            state = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["reactive"])(factory());
        },
        render: () => null,
    }).mount(container);
    return state;
}
/**
 * Keep states in the global scope to be reusable across Vue instances.
 *
 * @see   {@link https://vueuse.js.org/createGlobalState}
 * @param stateFactory A factory function to create the state
 */
function createGlobalState(stateFactory) {
    let state;
    return () => {
        if (state == null)
            state = withScope(stateFactory);
        return state;
    };
}

const defaultWindow = /* #__PURE__ */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isClient"] ? window : undefined;
const defaultDocument = /* #__PURE__ */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isClient"] ? window.document : undefined;
const defaultNavigator = /* #__PURE__ */ _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isClient"] ? window.navigator : undefined;

function useEventListener(...args) {
    let target;
    let event;
    let listener;
    let options;
    if (Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isString"])(args[0])) {
        [event, listener, options] = args;
        target = defaultWindow;
    }
    else {
        [target, event, listener, options] = args;
    }
    if (!target)
        return;
    let stopped = false;
    target.addEventListener(event, listener, options);
    const stop = () => {
        if (stopped)
            return;
        target.removeEventListener(event, listener, options);
        stopped = true;
    };
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnUnmounted"])(stop);
    return stop;
}

const events = ['mousedown', 'touchstart'];
/**
 * Listen for clicks outside of an element.
 *
 * @see   {@link https://vueuse.js.org/onClickOutside}
 * @param target
 * @param handler
 * @param options
 */
function onClickOutside(target, handler, options = {}) {
    const { window = defaultWindow } = options;
    if (!window)
        return;
    const targetRef = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(target);
    const listener = (event) => {
        if (!targetRef.value)
            return;
        const elements = event.composedPath();
        if (targetRef.value === event.target || elements.includes(targetRef.value))
            return;
        handler(event);
    };
    let disposables = events
        .map(event => useEventListener(window, event, listener, { passive: true }));
    const stop = () => {
        disposables.forEach(stop => stop());
        disposables = [];
    };
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnUnmounted"])(stop);
    return stop;
}

/* this implementation is original ported from https://github.com/streamich/react-use by Vadim Dalecky */
const isFocusedElementEditable = () => {
    const { activeElement, body } = document;
    if (!activeElement)
        return false;
    // If not element has focus, we assume it is not editable, too.
    if (activeElement === body)
        return false;
    // Assume <input> and <textarea> elements are editable.
    switch (activeElement.tagName) {
        case 'INPUT':
        case 'TEXTAREA':
            return true;
    }
    // Check if any other focused element id editable.
    return activeElement.hasAttribute('contenteditable');
};
const isTypedCharGood = ({ keyCode, metaKey, ctrlKey, altKey, }) => {
    if (metaKey || ctrlKey || altKey)
        return false;
    // 0...9
    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105))
        return true;
    // a...z
    if (keyCode >= 65 && keyCode <= 90)
        return true;
    // All other keys.
    return false;
};
/**
 * Fires when users start typing on non-editable elements.
 *
 * @see   {@link https://vueuse.js.org/onStartTyping}
 * @param callback
 * @param options
 */
function onStartTyping(callback, { document = defaultDocument } = {}) {
    const keydown = (event) => {
        !isFocusedElementEditable()
            && isTypedCharGood(event)
            && callback(event);
    };
    if (document)
        useEventListener(document, 'keydown', keydown, { passive: true });
}

/**
 * Reactive async state. Will not block your setup function and will triggers changes once
 * the promise is ready.
 *
 * @see   {@link https://vueuse.js.org/useAsyncState}
 * @param promise         The promise / async function to be resolved
 * @param initialState    The initial state, used until the first evaluation finishes
 * @param delay           Delay (ms)
 * @param catchFn         Error handling callback
 */
function useAsyncState(promise, initialState, delay = 0, catchFn = (e) => { }) {
    const state = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(initialState);
    const ready = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    function run() {
        promise
            .then((data) => {
            // @ts-ignore
            state.value = data;
            ready.value = true;
        })
            .catch(catchFn);
    }
    if (!delay)
        run();
    else
        setTimeout(run, delay);
    return { state, ready };
}

/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */
/**
 * Reactive Battery Status API.
 *
 * @see   {@link https://vueuse.js.org/useBattery}
 * @param options
 */
function useBattery({ navigator = defaultNavigator } = {}) {
    const events = ['chargingchange', 'chargingtimechange', 'dischargingtimechange', 'levelchange'];
    const isSupported = navigator && 'getBattery' in navigator;
    const charging = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    const chargingTime = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const dischargingTime = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const level = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(1);
    let battery;
    function updateBatteryInfo() {
        charging.value = this.charging;
        chargingTime.value = this.chargingTime || 0;
        dischargingTime.value = this.dischargingTime || 0;
        level.value = this.level;
    }
    if (isSupported) {
        navigator
            .getBattery()
            .then((_battery) => {
            battery = _battery;
            updateBatteryInfo.call(battery);
            for (const event of events)
                useEventListener(battery, event, updateBatteryInfo, { passive: true });
        });
    }
    return {
        isSupported,
        charging,
        chargingTime,
        dischargingTime,
        level,
    };
}

/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */
/**
 * Reactive browser location.
 *
 * @see   {@link https://vueuse.js.org/useBrowserLocation}
 * @param options
 */
function useBrowserLocation({ window = defaultWindow } = {}) {
    const buildState = (trigger) => {
        const { state, length } = (window === null || window === void 0 ? void 0 : window.history) || {};
        const { hash, host, hostname, href, origin, pathname, port, protocol, search } = (window === null || window === void 0 ? void 0 : window.location) || {};
        return {
            trigger,
            state,
            length,
            hash,
            host,
            hostname,
            href,
            origin,
            pathname,
            port,
            protocol,
            search,
        };
    };
    const state = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(buildState('load'));
    if (window)
        useEventListener(window, 'popstate', () => state.value = buildState('popstate'), { passive: true });
    return state;
}

/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */
/**
 * Reactive Clipboard API.
 *
 * @see   {@link https://vueuse.js.org/useClipboard}
 * @param options
 */
function useClipboard({ navigator = defaultNavigator } = {}) {
    const events = ['copy', 'cut'];
    const isSupported = navigator && 'clipboard' in navigator;
    const text = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])('');
    function updateText() {
        // @ts-expect-error untyped API
        navigator.clipboard.readText().then((value) => {
            text.value = value;
        });
    }
    if (isSupported) {
        for (const event of events)
            useEventListener(event, updateText);
    }
    async function copy(txt) {
        if (isSupported) {
            // @ts-expect-error untyped API
            await navigator.clipboard.writeText(txt);
            text.value = txt;
        }
    }
    return {
        isSupported,
        text,
        copy,
    };
}

/**
 * Manipulate CSS variables.
 *
 * @see   {@link https://vueuse.js.org/useCssVar}
 * @param prop
 * @param el
 * @param options
 */
function useCssVar(prop, el, { window = defaultWindow } = {}) {
    if (!window)
        return Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])('');
    const varRef = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])('');
    const elRef = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["unref"])(el) || window.document.documentElement);
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnMounted"])(() => {
        varRef.value = window.getComputedStyle(elRef.value).getPropertyValue(prop);
    });
    Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(varRef, (val) => {
        var _a;
        if ((_a = elRef.value) === null || _a === void 0 ? void 0 : _a.style)
            elRef.value.style.setProperty(prop, val);
    });
    return varRef;
}

/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */
/**
 * Reactive DeviceLightEvent.
 *
 * @see   {@link https://vueuse.js.org/useDeviceLight}
 * @param options
 */
function useDeviceLight({ window = defaultWindow } = {}) {
    const light = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    if (window) {
        useEventListener(window, 'devicelight', (event) => {
            light.value = event.value;
        });
    }
    return light;
}

/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */
/**
 * Reactive DeviceMotionEvent.
 *
 * @see   {@link https://vueuse.js.org/useDeviceMotion}
 * @param options
 */
function useDeviceMotion(options = {}) {
    const { window = defaultWindow, eventFilter = _vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["bypassFilter"], } = options;
    const acceleration = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])({ x: null, y: null, z: null });
    const rotationRate = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])({ alpha: null, beta: null, gamma: null });
    const interval = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const accelerationIncludingGravity = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])({
        x: null,
        y: null,
        z: null,
    });
    if (window) {
        const onDeviceMotion = Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["createFilterWrapper"])(eventFilter, (event) => {
            acceleration.value = event.acceleration;
            accelerationIncludingGravity.value = event.accelerationIncludingGravity;
            rotationRate.value = event.rotationRate;
            interval.value = event.interval;
        });
        useEventListener(window, 'devicemotion', onDeviceMotion);
    }
    return {
        acceleration,
        accelerationIncludingGravity,
        rotationRate,
        interval,
    };
}

/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */
/**
 * Reactive DeviceOrientationEvent.
 *
 * @see   {@link https://vueuse.js.org/useDeviceOrientation}
 * @param options
 */
function useDeviceOrientation(options = {}) {
    const { window = defaultWindow } = options;
    const isSupported = Boolean(window && 'DeviceOrientationEvent' in window);
    const isAbsolute = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    const alpha = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    const beta = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    const gamma = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    if (window && isSupported) {
        useEventListener(window, 'deviceorientation', (event) => {
            isAbsolute.value = event.absolute;
            alpha.value = event.alpha;
            beta.value = event.beta;
            gamma.value = event.gamma;
        });
    }
    return {
        isSupported,
        isAbsolute,
        alpha,
        beta,
        gamma,
    };
}

/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */
/**
 * Reactive Media Query.
 *
 * @see   {@link https://vueuse.js.org/useMediaQuery}
 * @param query
 * @param options
 */
function useMediaQuery(query, options = {}) {
    const { window = defaultWindow } = options;
    if (!window)
        return Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    const mediaQuery = window.matchMedia(query);
    const matches = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(mediaQuery.matches);
    const handler = (event) => {
        matches.value = event.matches;
    };
    if ('addEventListener' in mediaQuery) {
        mediaQuery.addEventListener('change', handler);
    }
    else {
        // @ts-expect-error - fallback for Safari < 14 and older browsers
        mediaQuery.addListener(handler);
    }
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnUnmounted"])(() => {
        if ('removeEventListener' in mediaQuery) {
            mediaQuery.removeEventListener('change', handler);
        }
        else {
            // @ts-expect-error - fallback for Safari < 14 and older browsers
            mediaQuery.removeListener(handler);
        }
    });
    return matches;
}

// device pixel ratio statistics from https://www.mydevice.io/
const DEVICE_PIXEL_RATIO_SCALES = [
    1,
    1.325,
    1.4,
    1.5,
    1.8,
    2,
    2.4,
    2.5,
    2.75,
    3,
    3.5,
    4,
];
/**
 * Reactively track `window.devicePixelRatio`.
 *
 * @see   {@link https://vueuse.js.org/useDevicePixelRatio}
 * @param options
 */
function useDevicePixelRatio({ window = defaultWindow, } = {}) {
    if (!window) {
        return {
            pixelRatio: Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(1),
        };
    }
    const pixelRatio = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(window.devicePixelRatio);
    const handleDevicePixelRatio = () => {
        pixelRatio.value = window.devicePixelRatio;
    };
    useEventListener(window, 'resize', handleDevicePixelRatio, { passive: true });
    DEVICE_PIXEL_RATIO_SCALES.forEach((dppx) => {
        // listen mql events in both sides
        const mqlMin = useMediaQuery(`screen and (min-resolution: ${dppx}dppx)`);
        const mqlMax = useMediaQuery(`screen and (max-resolution: ${dppx}dppx)`);
        Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])([mqlMin, mqlMax], handleDevicePixelRatio);
    });
    return { pixelRatio };
}

/**
 * Reactively track `document.visibilityState`.
 *
 * @see   {@link https://vueuse.js.org/useDocumentVisibility}
 * @param options
 */
function useDocumentVisibility({ document = defaultDocument } = {}) {
    if (!document)
        return Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])('visible');
    const visibility = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(document.visibilityState);
    useEventListener(document, 'visibilitychange', () => {
        visibility.value = document.visibilityState;
    });
    return visibility;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

/**
 * Reports changes to the dimensions of an Element's content or the border-box
 *
 * @see   {@link https://vueuse.js.org/useResizeObserver}
 * @param target
 * @param callback
 * @param options
 */
function useResizeObserver(target, callback, options = {}) {
    const { window = defaultWindow } = options, observerOptions = __rest(options, ["window"]);
    let observer;
    const targetRef = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(target);
    const isSupported = window && 'ResizeObserver' in window;
    const cleanup = () => {
        if (observer) {
            observer.disconnect();
            observer = undefined;
        }
    };
    const stopWatch = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(targetRef, (newValue) => {
        cleanup();
        if (isSupported && window && newValue) {
            // @ts-expect-error missing type
            observer = new window.ResizeObserver(callback);
            observer.observe(newValue, observerOptions);
        }
    }, { immediate: true });
    const stop = () => {
        cleanup();
        stopWatch();
    };
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnUnmounted"])(stop);
    return {
        isSupported,
        stop,
    };
}

/**
 * Reactive size of an HTML element.
 *
 * @see   {@link https://vueuse.js.org/useElementSize}
 * @param target
 * @param callback
 * @param options
 */
function useElementBounding(target, options = {}) {
    const height = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const bottom = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const left = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const right = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const top = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const width = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const x = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const y = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    useResizeObserver(target, ([entry]) => {
        height.value = entry.contentRect.height;
        bottom.value = entry.contentRect.bottom;
        left.value = entry.contentRect.left;
        right.value = entry.contentRect.right;
        top.value = entry.contentRect.top;
        width.value = entry.contentRect.width;
        x.value = entry.contentRect.x;
        y.value = entry.contentRect.y;
    }, options);
    return {
        x,
        y,
        top,
        right,
        bottom,
        left,
        width,
        height,
    };
}

/**
 * Reactive size of an HTML element.
 *
 * @see   {@link https://vueuse.js.org/useElementSize}
 * @param target
 * @param callback
 * @param options
 */
function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
    const width = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(initialSize.width);
    const height = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(initialSize.height);
    useResizeObserver(target, ([entry]) => {
        width.value = entry.contentRect.width;
        height.value = entry.contentRect.height;
    }, options);
    return {
        width,
        height,
    };
}

/**
 * Tracks the visibility of an element within the viewport.
 *
 * @see   {@link https://vueuse.js.org/useElementVisibility}
 * @param element
 * @param options
 */
function useElementVisibility(element, { window = defaultWindow, scrollTarget } = {}) {
    const elementIsVisible = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    const testBounding = () => {
        if (!window)
            return;
        const document = window.document;
        if (!element.value) {
            elementIsVisible.value = false;
        }
        else {
            const rect = element.value.getBoundingClientRect();
            elementIsVisible.value = (rect.top <= (window.innerHeight || document.documentElement.clientHeight)
                && rect.left <= (window.innerWidth || document.documentElement.clientWidth)
                && rect.bottom >= 0
                && rect.right >= 0);
        }
    };
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnMounted"])(testBounding);
    if (window)
        Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnMounted"])(() => useEventListener((scrollTarget === null || scrollTarget === void 0 ? void 0 : scrollTarget.value) || window, 'scroll', testBounding, { capture: false, passive: true }));
    return elementIsVisible;
}

/**
 * Reactive wrapper for EventSource.
 *
 * @see   {@link https://vueuse.js.org/useEventSource}
 * @see   {@link https://developer.mozilla.org/en-US/docs/Web/API/EventSource/EventSource|EventSource}
 * @param url
 * @param events
 */
function useEventSource(url, events = []) {
    const event = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    const data = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    const status = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])('CONNECTING');
    const eventSource = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    const error = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    const close = () => {
        if (eventSource.value) {
            eventSource.value.close();
            eventSource.value = null;
            status.value = 'CLOSED';
        }
    };
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnMounted"])(() => {
        const es = new EventSource(url);
        eventSource.value = es;
        es.onopen = () => {
            status.value = 'OPEN';
            error.value = null;
        };
        es.onerror = (e) => {
            status.value = 'CLOSED';
            error.value = e;
        };
        es.onmessage = (e) => {
            event.value = null;
            data.value = e.data;
        };
        for (const event_name of events) {
            useEventListener(es, event_name, (e) => {
                event.value = event_name;
                data.value = e.data || null;
            });
        }
    });
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnUnmounted"])(() => {
        close();
    });
    return {
        eventSource,
        event,
        data,
        status,
        error,
        close,
    };
}

/**
 * Reactive favicon.
 *
 * @see   {@link https://vueuse.js.org/useFavicon}
 * @param newIcon
 * @param options
 */
function useFavicon(newIcon = null, options = {}) {
    const { baseUrl = '', rel = 'icon', document = defaultDocument, } = options;
    const favicon = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["isRef"])(newIcon)
        ? newIcon
        : Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(newIcon);
    const applyIcon = (icon) => {
        document === null || document === void 0 ? void 0 : document.head.querySelectorAll(`link[rel*="${rel}"]`).forEach(el => el.href = `${baseUrl}${icon}`);
    };
    Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(favicon, (i, o) => {
        if (Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isString"])(i) && i !== o)
            applyIcon(i);
    }, { immediate: true });
    return favicon;
}

/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */
/**
 * Reactive Fullscreen API.
 *
 * @see   {@link https://vueuse.js.org/useFullscreen}
 * @param target
 * @param options
 */
function useFullscreen(target, options = {}) {
    const { document = defaultDocument } = options;
    const targetRef = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(target || (document === null || document === void 0 ? void 0 : document.querySelector('html')));
    const isFullscreen = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    async function exit() {
        if (document === null || document === void 0 ? void 0 : document.fullscreenElement)
            await document.exitFullscreen();
        isFullscreen.value = false;
    }
    async function enter() {
        exit();
        if (targetRef.value) {
            await targetRef.value.requestFullscreen();
            isFullscreen.value = true;
        }
    }
    async function toggle() {
        if (isFullscreen.value)
            await exit();
        else
            await enter();
    }
    return {
        isFullscreen,
        enter,
        exit,
        toggle,
    };
}

/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */
/**
 * Reactive Geolocation API.
 *
 * @see   {@link https://vueuse.js.org/useGeolocation}
 * @param options
 */
function useGeolocation(options = {}) {
    const { enableHighAccuracy = true, maximumAge = 30000, timeout = 27000, navigator = defaultNavigator, } = options;
    const isSupported = navigator && 'geolocation' in navigator;
    const locatedAt = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    const error = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    const coords = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])({
        accuracy: 0,
        latitude: 0,
        longitude: 0,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
    });
    function updatePosition(position) {
        locatedAt.value = position.timestamp;
        coords.value = position.coords;
        error.value = null;
    }
    let watcher;
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnMounted"])(() => {
        if (isSupported) {
            watcher = navigator.geolocation.watchPosition(updatePosition, err => error.value = err, {
                enableHighAccuracy,
                maximumAge,
                timeout,
            });
        }
    });
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnUnmounted"])(() => {
        if (watcher && navigator)
            navigator.geolocation.clearWatch(watcher);
    });
    return {
        isSupported,
        coords,
        locatedAt,
        error,
    };
}

const defaultEvents = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];
const oneMinute = 60000;
/**
 * Tracks whether the user is being inactive.
 *
 * @see   {@link https://vueuse.js.org/useIdle}
 * @param timeout default to 1 minute
 * @param options IdleOptions
 */
function useIdle(timeout = oneMinute, options = {}) {
    const { initialState = false, listenForVisibilityChange = true, events = defaultEvents, window = defaultWindow, eventFilter = Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["throttleFilter"])(50), } = options;
    const idle = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(initialState);
    const lastActive = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["timestamp"])());
    let timer;
    const onEvent = Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["createFilterWrapper"])(eventFilter, () => {
        idle.value = false;
        lastActive.value = Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["timestamp"])();
        clearTimeout(timer);
        timer = setTimeout(() => idle.value = true, timeout);
    });
    if (window) {
        const document = window.document;
        for (const event of events)
            useEventListener(window, event, onEvent, { passive: true });
        if (listenForVisibilityChange) {
            useEventListener(document, 'visibilitychange', () => {
                if (!document.hidden)
                    onEvent();
            });
        }
    }
    timer = setTimeout(() => idle.value = true, timeout);
    return { idle, lastActive };
}

/**
 * Detects that a target element's visibility.
 *
 * @see   {@link https://vueuse.js.org/useIntersectionObserver}
 * @param target
 * @param callback
 * @param options
 */
function useIntersectionObserver(target, callback, options = {}) {
    const { root, rootMargin = '0px', threshold = 0.1, window = defaultWindow, } = options;
    let observer;
    const targetRef = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(target);
    const isSupported = window && 'IntersectionObserver' in window;
    const cleanup = () => {
        if (observer) {
            observer.disconnect();
            observer = undefined;
        }
    };
    const stopWatch = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(targetRef, (newValue) => {
        cleanup();
        if (isSupported && window && newValue) {
            // @ts-expect-error missing type
            observer = new window.IntersectionObserver(callback, {
                root: Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["unref"])(root),
                rootMargin,
                threshold,
            });
            observer.observe(newValue);
        }
    });
    const stop = () => {
        cleanup();
        stopWatch();
    };
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnUnmounted"])(stop);
    return {
        isSupported,
        stop,
    };
}

const Serializers = {
    boolean: {
        read: (v, d) => v != null ? v === 'true' : d,
        write: (v) => String(v),
    },
    object: {
        read: (v, d) => v ? JSON.parse(v) : d,
        write: (v) => JSON.stringify(v),
    },
    number: {
        read: (v, d) => v != null ? Number.parseFloat(v) : d,
        write: (v) => String(v),
    },
    any: {
        read: (v, d) => v !== null && v !== void 0 ? v : d,
        write: (v) => String(v),
    },
    string: {
        read: (v, d) => v !== null && v !== void 0 ? v : d,
        write: (v) => String(v),
    },
};
/**
 * Reactive LocalStorage/SessionStorage.
 *
 * @see   {@link https://vueuse.js.org/useStorage}
 * @param key
 * @param defaultValue
 * @param storage
 * @param options
 */
function useStorage(key, defaultValue, storage = defaultWindow === null || defaultWindow === void 0 ? void 0 : defaultWindow.localStorage, options = {}) {
    const { flush = 'pre', deep = true, listenToStorageChanges = true, window = defaultWindow, eventFilter, } = options;
    const data = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(defaultValue);
    const type = defaultValue == null
        ? 'any'
        : typeof defaultValue === 'boolean'
            ? 'boolean'
            : typeof defaultValue === 'string'
                ? 'string'
                : typeof defaultValue === 'object'
                    ? 'object'
                    : Array.isArray(defaultValue)
                        ? 'object'
                        : !Number.isNaN(defaultValue)
                            ? 'number'
                            : 'any';
    function read() {
        if (!storage)
            return;
        try {
            let rawValue = storage.getItem(key);
            if (rawValue === undefined && defaultValue) {
                rawValue = Serializers[type].write(defaultValue);
                storage.setItem(key, rawValue);
            }
            else {
                data.value = Serializers[type].read(rawValue, defaultValue);
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    read();
    if (window && listenToStorageChanges)
        useEventListener(window, 'storage', read);
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["watchWithFilter"])(data, () => {
        if (!storage) // SSR
            return;
        try {
            if (data.value == null)
                storage.removeItem(key);
            else
                storage.setItem(key, Serializers[type].write(data.value));
        }
        catch (e) {
            console.warn(e);
        }
    }, {
        flush,
        deep,
        eventFilter,
    });
    return data;
}

/**
 * Reactive LocalStorage.
 *
 * @see   {@link https://vueuse.js.org/useLocalStorage}
 * @param key
 * @param defaultValue
 * @param options
 */
function useLocalStorage(key, defaultValue, options = {}) {
    const { window = defaultWindow } = options;
    return useStorage(key, defaultValue, window === null || window === void 0 ? void 0 : window.localStorage, options);
}

const fnClone = (v) => JSON.parse(JSON.stringify(v));
const fnBypass = (v) => v;
const fnSetSource = (source, value) => source.value = value;
function defaultDump(clone) {
    return (clone ? Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(clone) ? clone : fnClone : fnBypass);
}
function defaultParse(clone) {
    return (clone ? Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(clone) ? clone : fnClone : fnBypass);
}
/**
 * Track the change history of a ref, also provides undo and redo functionality.
 *
 * @see   {@link https://vueuse.js.org/useManualRefHistory}
 * @param source
 * @param options
 */
function useManualRefHistory(source, options = {}) {
    const { clone = false, dump = defaultDump(clone), parse = defaultParse(clone), setSource = fnSetSource, } = options;
    function _createHistoryRecord() {
        return Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["markRaw"])({
            snapshot: dump(source.value),
            timestamp: Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["timestamp"])(),
        });
    }
    const last = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(_createHistoryRecord());
    const undoStack = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])([]);
    const redoStack = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])([]);
    const _setSource = (record) => {
        setSource(source, parse(record.snapshot));
        last.value = record;
    };
    const commit = () => {
        undoStack.value.unshift(last.value);
        last.value = _createHistoryRecord();
        if (options.capacity && undoStack.value.length > options.capacity)
            undoStack.value.splice(options.capacity, Infinity);
        if (redoStack.value.length)
            redoStack.value.splice(0, redoStack.value.length);
    };
    const clear = () => {
        undoStack.value.splice(0, undoStack.value.length);
        redoStack.value.splice(0, redoStack.value.length);
    };
    const undo = () => {
        const state = undoStack.value.shift();
        if (state) {
            redoStack.value.unshift(last.value);
            _setSource(state);
        }
    };
    const redo = () => {
        const state = redoStack.value.shift();
        if (state) {
            undoStack.value.unshift(last.value);
            _setSource(state);
        }
    };
    const reset = () => {
        _setSource(last.value);
    };
    const history = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["computed"])(() => [last.value, ...undoStack.value]);
    const canUndo = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["computed"])(() => undoStack.value.length > 0);
    const canRedo = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["computed"])(() => redoStack.value.length > 0);
    return {
        source,
        undoStack,
        redoStack,
        last,
        history,
        canUndo,
        canRedo,
        clear,
        commit,
        reset,
        undo,
        redo,
    };
}

/**
 * Reactive mouse position.
 *
 * @see   {@link https://vueuse.js.org/useMouse}
 * @param options
 */
function useMouse(options = {}) {
    const { touch = true, resetOnTouchEnds = false, initialValue = { x: 0, y: 0 }, window = defaultWindow, } = options;
    const x = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(initialValue.x);
    const y = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(initialValue.y);
    const sourceType = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    const mouseHandler = (event) => {
        x.value = event.pageX;
        y.value = event.pageY;
        sourceType.value = 'mouse';
    };
    const reset = () => {
        x.value = initialValue.x;
        y.value = initialValue.y;
    };
    const touchHandler = (event) => {
        if (event.touches.length > 0) {
            x.value = event.touches[0].clientX;
            y.value = event.touches[0].clientY;
            sourceType.value = 'touch';
        }
    };
    if (window) {
        useEventListener(window, 'mousemove', mouseHandler, { passive: true });
        if (touch) {
            useEventListener(window, 'touchstart', touchHandler, { passive: true });
            useEventListener(window, 'touchmove', touchHandler, { passive: true });
            if (resetOnTouchEnds)
                useEventListener(window, 'touchend', reset, { passive: true });
        }
    }
    return {
        x,
        y,
        sourceType,
    };
}

/**
 * Reactive mouse position related to an element.
 *
 * @see   {@link https://vueuse.js.org/useMouseInElement}
 * @param target
 * @param options
 */
function useMouseInElement(target, options = {}) {
    const { handleOutside = true } = options;
    const { x, y, sourceType } = useMouse(options);
    const targetRef = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(target || (window === null || window === void 0 ? void 0 : window.document.body));
    const elementX = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const elementY = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const elementPositionX = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const elementPositionY = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const elementHeight = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const elementWidth = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    const isOutside = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    let stop = () => { };
    if (window) {
        stop = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])([targetRef, x, y], () => {
            const el = targetRef.value;
            if (!el)
                return;
            const { left, top, width, height, } = el.getBoundingClientRect();
            elementPositionX.value = left + window.pageXOffset;
            elementPositionY.value = top + window.pageYOffset;
            elementHeight.value = height;
            elementWidth.value = width;
            const elX = x.value - elementPositionX.value;
            const elY = y.value - elementPositionY.value;
            isOutside.value = elX < 0 || elY < 0 || elX > elementWidth.value || elY > elementHeight.value;
            if (handleOutside || !isOutside.value) {
                elementX.value = elX;
                elementY.value = elY;
            }
        }, { immediate: true });
    }
    return {
        x,
        y,
        sourceType,
        elementX,
        elementY,
        elementPositionX,
        elementPositionY,
        elementHeight,
        elementWidth,
        isOutside,
        stop,
    };
}

/**
 * Reactive mouse position.
 *
 * @see   {@link https://vueuse.js.org/useMousePressed}
 * @param options
 */
function useMousePressed(options = {}) {
    const { touch = true, initialValue = false, window = defaultWindow, } = options;
    const target = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(options.target);
    const pressed = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(initialValue);
    const sourceType = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    let listeners = [];
    if (window) {
        const cleanup = () => {
            listeners.forEach(f => f());
            listeners = [];
        };
        const onReleased = () => {
            pressed.value = false;
            sourceType.value = null;
        };
        Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(target, () => {
            cleanup();
            const t = target.value || window;
            listeners.push(useEventListener(t, 'mousedown', () => {
                pressed.value = true;
                sourceType.value = 'mouse';
            }, { passive: true }));
            if (touch) {
                listeners.push(useEventListener(t, 'touchstart', () => {
                    pressed.value = true;
                    sourceType.value = 'touch';
                }, { passive: true }));
            }
        }, { immediate: true });
        useEventListener(window, 'mouseleave', onReleased, { passive: true });
        useEventListener(window, 'mouseup', onReleased, { passive: true });
        if (touch) {
            useEventListener(window, 'touchend', onReleased, { passive: true });
            useEventListener(window, 'touchcancel', onReleased, { passive: true });
        }
    }
    return {
        pressed,
        sourceType,
    };
}

/**
 * Watch for changes being made to the DOM tree.
 *
 * @see   {@link https://vueuse.js.org/useMutationObserver}
 * @see   {@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver|MutationObserver MDN}
 * @param el
 * @param callback
 * @param options
 */
function useMutationObserver(el, callback, options = {}) {
    const { window = defaultWindow } = options, mutationOptions = __rest(options, ["window"]);
    const elRef = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(el);
    let observer;
    const isSupported = window && 'IntersectionObserver' in window;
    const cleanup = () => {
        if (observer) {
            observer.disconnect();
            observer = undefined;
        }
    };
    const stopWatch = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(elRef, (newEl) => {
        cleanup();
        if (isSupported && window && newEl) {
            // @ts-expect-error missing type
            observer = new window.MutationObserver(callback);
            observer.observe(newEl, mutationOptions);
        }
    }, { immediate: true });
    const stop = () => {
        cleanup();
        stopWatch();
    };
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnUnmounted"])(stop);
    return {
        isSupported,
        stop,
    };
}

/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */
/**
 * Reactive Network status.
 *
 * @see   {@link https://vueuse.js.org/useNetwork}
 * @param options
 */
function useNetwork(options = {}) {
    const { window = defaultWindow } = options;
    const navigator = window === null || window === void 0 ? void 0 : window.navigator;
    const isSupported = Boolean(navigator && 'connection' in navigator);
    const isOnline = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(true);
    const saveData = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    const offlineAt = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(undefined);
    const downlink = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(undefined);
    const downlinkMax = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(undefined);
    const effectiveType = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(undefined);
    const type = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])('unknown');
    const connection = isSupported && navigator.connection;
    function updateNetworkInformation() {
        if (!navigator)
            return;
        isOnline.value = navigator.onLine;
        offlineAt.value = isOnline.value ? undefined : Date.now();
        if (connection) {
            downlink.value = connection.downlink;
            downlinkMax.value = connection.downlinkMax;
            effectiveType.value = connection.effectiveType;
            saveData.value = connection.saveData;
            type.value = connection.type;
        }
    }
    if (window) {
        useEventListener(window, 'offline', () => {
            isOnline.value = false;
            offlineAt.value = Date.now();
        });
        useEventListener(window, 'online', () => {
            isOnline.value = true;
        });
    }
    if (connection)
        useEventListener(connection, 'change', updateNetworkInformation, false);
    updateNetworkInformation();
    return {
        isSupported,
        isOnline,
        saveData,
        offlineAt,
        downlink,
        downlinkMax,
        effectiveType,
        type,
    };
}

/**
 * Reactive online state.
 *
 * @see   {@link https://vueuse.js.org/useOnline}
 * @param options
 */
function useOnline(options = {}) {
    const { isOnline } = useNetwork(options);
    return isOnline;
}

/**
 * Reactive state to show whether mouse leaves the page.
 *
 * @see   {@link https://vueuse.js.org/usePageLeave}
 * @param options
 */
function usePageLeave(options = {}) {
    const { window = defaultWindow } = options;
    const isLeft = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    const handler = (event) => {
        if (!window)
            return;
        event = event || window.event;
        // @ts-ignore
        const from = event.relatedTarget || event.toElement;
        isLeft.value = !from;
    };
    if (window) {
        useEventListener(window, 'mouseout', handler, { passive: true });
        useEventListener(window.document, 'mouseleave', handler, { passive: true });
        useEventListener(window.document, 'mouseenter', handler, { passive: true });
    }
    return isLeft;
}

/**
 * Create parallax effect easily. It uses `useDeviceOrientation` and fallback to `useMouse`
 * if orientation is not supported.
 *
 * @param target
 * @param options
 */
function useParallax(target, options = {}) {
    const { deviceOrientationTiltAdjust = i => i, deviceOrientationRollAdjust = i => i, mouseTiltAdjust = i => i, mouseRollAdjust = i => i, window, } = options;
    const orientation = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["reactive"])(useDeviceOrientation({ window }));
    const { elementX: x, elementY: y, elementWidth: width, elementHeight: height, } = useMouseInElement(target, { handleOutside: false, window });
    const source = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["computed"])(() => {
        if (orientation.isSupported
            && ((orientation.alpha != null && orientation.alpha !== 0) || (orientation.gamma != null && orientation.gamma !== 0)))
            return 'deviceOrientation';
        return 'mouse';
    });
    const roll = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["computed"])(() => {
        if (source.value === 'deviceOrientation') {
            const value = -orientation.beta / 90;
            return deviceOrientationRollAdjust(value);
        }
        else {
            const value = -(y.value - height.value / 2) / height.value;
            return mouseRollAdjust(value);
        }
    });
    const tilt = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["computed"])(() => {
        if (source.value === 'deviceOrientation') {
            const value = orientation.gamma / 90;
            return deviceOrientationTiltAdjust(value);
        }
        else {
            const value = (x.value - width.value / 2) / width.value;
            return mouseTiltAdjust(value);
        }
    });
    return { roll, tilt, source };
}

/**
 * Reactive Permissions API.
 *
 * @see   {@link https://vueuse.js.org/usePermission}
 * @param permissionDesc
 * @param options
 */
function usePermission(permissionDesc, options = {}) {
    const { navigator = defaultNavigator } = options;
    let permissionStatus = null;
    const desc = typeof permissionDesc === 'string'
        ? { name: permissionDesc }
        : permissionDesc;
    const state = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])('');
    const onChange = () => {
        if (permissionStatus)
            state.value = permissionStatus.state;
    };
    if (navigator && 'permissions' in navigator) {
        navigator.permissions
            .query(desc)
            .then((status) => {
            permissionStatus = status;
            useEventListener(permissionStatus, 'change', onChange);
            onChange();
        })
            .catch(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["noop"]);
    }
    return state;
}

/**
 * Reactive prefers-color-scheme media query.
 *
 * @see   {@link https://vueuse.js.org/usePreferredColorScheme}
 * @param [options]
 */
function usePreferredColorScheme(options) {
    const isLight = useMediaQuery('(prefers-color-scheme: light)', options);
    const isDark = useMediaQuery('(prefers-color-scheme: dark)', options);
    return Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["computed"])(() => {
        if (isDark.value)
            return 'dark';
        if (isLight.value)
            return 'light';
        return 'no-preference';
    });
}

/**
 * Reactive dark theme preference.
 *
 * @see   {@link https://vueuse.js.org/usePreferredDark}
 * @param [options]
 */
function usePreferredDark(options) {
    return useMediaQuery('(prefers-color-scheme: dark)', options);
}

/**
 * Reactive Navigator Languages.
 *
 * @see   {@link https://vueuse.js.org/usePreferredLanguages}
 * @param options
 */
function usePreferredLanguages(options = {}) {
    const { window = defaultWindow } = options;
    if (!window)
        return Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])('en');
    const navigator = window.navigator;
    const value = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(navigator.languages);
    useEventListener(window, 'languagechange', () => {
        value.value = navigator.languages;
    });
    return value;
}

/**
 * Call function on every `requestAnimationFrame`. With controls of pausing and resuming.
 *
 * @see   {@link https://vueuse.js.org/useRafFn}
 * @param fn
 * @param options
 */
function useRafFn(fn, options = {}) {
    const { immediate = true, window = defaultWindow, } = options;
    const isActive = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    function loop() {
        if (!isActive.value)
            return;
        fn();
        if (window)
            window.requestAnimationFrame(loop);
    }
    function resume() {
        if (!isActive.value) {
            isActive.value = true;
            loop();
        }
    }
    function pause() {
        isActive.value = false;
    }
    if (immediate)
        resume();
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnUnmounted"])(pause);
    return {
        isActive,
        pause,
        resume,
        stop: pause,
        start: resume,
    };
}

/**
 * Track the change history of a ref, also provides undo and redo functionality.
 *
 * @see   {@link https://vueuse.js.org/useRefHistory}
 * @param source
 * @param options
 */
function useRefHistory(source, options = {}) {
    const { deep = false, flush = 'pre', } = options;
    const setSource = (source, value) => {
        // Support changes that are done after the last history operation
        // examples:
        //   undo, modify
        //   undo, undo, modify
        // If there were already changes in the state, they will be ignored
        // examples:
        //   modify, undo
        //   undo, modify, undo
        ignorePrevAsyncUpdates();
        ignoreUpdates(() => {
            source.value = value;
        });
    };
    const manualHistory = useManualRefHistory(source, Object.assign(Object.assign({}, options), { clone: options.clone || deep, setSource }));
    const { clear, commit: manualCommit } = manualHistory;
    const commit = () => {
        // This guard only applies for flush 'pre' and 'post'
        // If the user triggers a commit manually, then reset the watcher
        // so we do not trigger an extra commit in the async watcher
        ignorePrevAsyncUpdates();
        manualCommit();
    };
    const { eventFilter, pause, resume: resumeTracking, isActive: isTracking } = Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["pausableFilter"])();
    const { ignoreUpdates, ignorePrevAsyncUpdates, stop } = Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["ignorableWatch"])(source, commit, { deep, flush, eventFilter });
    const resume = (commitNow) => {
        resumeTracking();
        if (commitNow)
            commit();
    };
    const batch = (fn) => {
        let canceled = false;
        const cancel = () => canceled = true;
        ignoreUpdates(() => {
            fn(cancel);
        });
        if (!canceled)
            commit();
    };
    const dispose = () => {
        stop();
        clear();
    };
    return Object.assign(Object.assign({}, manualHistory), { isTracking,
        pause,
        resume,
        commit,
        batch,
        dispose });
}

/**
 * Reactive SessionStorage.
 *
 * @see   {@link https://vueuse.js.org/useSessionStorage}
 * @param key
 * @param defaultValue
 * @param options
 */
function useSessionStorage(key, defaultValue, options = {}) {
    const { window = defaultWindow } = options;
    return useStorage(key, defaultValue, window === null || window === void 0 ? void 0 : window.sessionStorage, options);
}

/**
 * Reactive Web Share API.
 *
 * @use   {@link https://vueuse.js.org/useShare}
 * @param shareOptions
 * @param options
 */
function useShare(shareOptions = {}, options = {}) {
    const { navigator = defaultNavigator } = options;
    const _navigator = navigator;
    const isSupported = 'canShare' in _navigator;
    const share = async (overrideOptions = {}) => {
        if (isSupported) {
            const data = Object.assign(Object.assign({}, Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["unref"])(shareOptions)), Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["unref"])(overrideOptions));
            let granted = true;
            if (data.files && _navigator.canShare)
                granted = _navigator.canShare({ files: data.files });
            if (granted)
                return _navigator.share(data);
        }
    };
    return {
        isSupported,
        share,
    };
}

// ported from https://www.reddit.com/r/vuejs/comments/jksizl/speech_recognition_as_a_vue_3_hook
/**
 * Reactive SpeechRecognition.
 *
 * @see   {@link https://vueuse.js.org/useSpeechRecognition}
 * @see   {@link https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition|SpeechRecognition}
 * @param options
 */
function useSpeechRecognition(options = {}) {
    const { lang = 'en-US', interimResults = true, continuous = true, } = options;
    const isListening = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    const isFinal = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    const result = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])('');
    const error = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    const toggle = (value = !isListening.value) => {
        isListening.value = value;
    };
    const start = () => {
        isListening.value = true;
    };
    const stop = () => {
        isListening.value = false;
    };
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const isSupported = Boolean(SpeechRecognition);
    let recognition;
    if (isSupported) {
        recognition = new SpeechRecognition();
        recognition.continuous = continuous;
        recognition.interimResults = interimResults;
        recognition.lang = lang;
        recognition.onstart = () => {
            isFinal.value = false;
        };
        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => {
                isFinal.value = result.isFinal;
                return result[0];
            })
                .map(result => result.transcript)
                .join('');
            result.value = transcript;
            error.value = null;
        };
        recognition.onerror = (event) => {
            error.value = event.error;
        };
        recognition.onend = () => {
            isListening.value = false;
        };
        Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(isListening, () => {
            if (isListening.value)
                recognition.start();
            else
                recognition.stop();
        });
    }
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnUnmounted"])(() => {
        isListening.value = false;
    });
    return {
        isSupported,
        isListening,
        isFinal,
        recognition,
        result,
        error,
        toggle,
        start,
        stop,
    };
}

/**
 * Reactive current timestamp.
 *
 * @see   {@link https://vueuse.js.org/useTimestamp}
 * @param options
 */
function useTimestamp(options = {}) {
    const { offset = 0 } = options;
    const ts = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["timestamp"])() + offset);
    const controls = useRafFn(() => ts.value = Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["timestamp"])() + offset, { immediate: true });
    return Object.assign({ timestamp: ts }, controls);
}

/**
 * Reactive document title.
 *
 * @see   {@link https://vueuse.js.org/useTitle}
 * @param newTitle
 * @param options
 */
function useTitle(newTitle = null, { document = defaultDocument } = {}) {
    var _a;
    const title = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])((_a = newTitle !== null && newTitle !== void 0 ? newTitle : document === null || document === void 0 ? void 0 : document.title) !== null && _a !== void 0 ? _a : null);
    Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(title, (t, o) => {
        if (Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isString"])(t) && t !== o && document)
            document.title = t;
    }, { immediate: true });
    return title;
}

/**
 * Create an easing function from cubic bezier points.
 */
function createEasingFunction([p0, p1, p2, p3]) {
    const a = (a1, a2) => 1 - 3 * a2 + 3 * a1;
    const b = (a1, a2) => 3 * a2 - 6 * a1;
    const c = (a1) => 3 * a1;
    const calcBezier = (t, a1, a2) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
    const getSlope = (t, a1, a2) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);
    const getTforX = (x) => {
        let aGuessT = x;
        for (let i = 0; i < 4; ++i) {
            const currentSlope = getSlope(aGuessT, p0, p2);
            if (currentSlope === 0)
                return aGuessT;
            const currentX = calcBezier(aGuessT, p0, p2) - x;
            aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
    };
    return (x) => p0 === p1 && p2 === p3 ? x : calcBezier(getTforX(x), p1, p3);
}
/**
 * Common transitions
 *
 * @see   {@link https://easings.net}
 */
const TransitionPresets = {
    linear: [0, 0, 1, 1],
    easeInSine: [0.12, 0, 0.39, 0],
    easeOutSine: [0.61, 1, 0.88, 1],
    easeInQuad: [0.11, 0, 0.5, 0],
    easeOutQuad: [0.5, 1, 0.89, 1],
    easeInCubic: [0.32, 0, 0.67, 0],
    easeOutCubic: [0.33, 1, 0.68, 1],
    easeInOutCubic: [0.65, 0, 0.35, 1],
    easeInQuart: [0.5, 0, 0.75, 0],
    easeOutQuart: [0.25, 1, 0.5, 1],
    easeInOutQuart: [0.76, 0, 0.24, 1],
    easeInQuint: [0.64, 0, 0.78, 0],
    easeOutQuint: [0.22, 1, 0.36, 1],
    easeInOutQuint: [0.83, 0, 0.17, 1],
    easeInExpo: [0.7, 0, 0.84, 0],
    easeOutExpo: [0.16, 1, 0.3, 1],
    easeInOutExpo: [0.87, 0, 0.13, 1],
    easeInCirc: [0.55, 0, 1, 0.45],
    easeOutCirc: [0, 0.55, 0.45, 1],
    easeInOutCirc: [0.85, 0, 0.15, 1],
    easeInBack: [0.36, 0, 0.66, -0.56],
    easeOutBack: [0.34, 1.56, 0.64, 1],
    easeInOutBack: [0.68, -0.6, 0.32, 1.6],
};
/**
 * Transition between values.
 *
 * @see   {@link https://vueuse.js.org/useTransition}
 * @param source
 * @param options
 */
function useTransition(source, options = {}) {
    const { duration = 500, transition = (n) => n, } = options;
    const output = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(source.value);
    const getValue = Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(transition)
        ? transition
        : createEasingFunction(transition);
    let diff = 0;
    let endAt = 0;
    let startAt = 0;
    let startValue = 0;
    const { resume, pause } = useRafFn(() => {
        const now = Date.now();
        const progress = Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["clamp"])(1 - ((endAt - now) / duration), 0, 1);
        output.value = startValue + (diff * getValue(progress));
        if (progress >= 1)
            pause();
    }, { immediate: false });
    Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(source, () => {
        pause();
        diff = source.value - output.value;
        startValue = output.value;
        startAt = Date.now();
        endAt = startAt + duration;
        resume();
    });
    return output;
}

/**
 * Shorthand for v-model binding, props + emit -> ref
 *
 * @see   {@link https://vueuse.js.org/useVModel}
 * @param props
 * @param key
 * @param emit
 */
function useVModel(props, key, emit) {
    var _a;
    const vueCurrentInstance = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["getCurrentInstance"])();
    // @ts-expect-error mis-alignment with @vue/composition-api
    const _emit = emit || vue_demi__WEBPACK_IMPORTED_MODULE_0__["isVue3"] ? vueCurrentInstance === null || vueCurrentInstance === void 0 ? void 0 : vueCurrentInstance.emit : (_a = vueCurrentInstance === null || vueCurrentInstance === void 0 ? void 0 : vueCurrentInstance.$emit) === null || _a === void 0 ? void 0 : _a.bind(vueCurrentInstance);
    return Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["computed"])({
        get() {
            return props[key];
        },
        set(value) {
            _emit(`update:${key}`, value);
        },
    });
}

/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */
/**
 * Reactive simple WebSocket client.
 *
 * @see   {@link https://vueuse.js.org/useWebSocket}
 * @param url
 */
function useWebSocket(url) {
    const data = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    const state = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])('CONNECTING');
    let ws;
    const close = function close(code, reason) {
        if (!ws)
            return;
        ws.close(code, reason);
    };
    const send = function send(data) {
        if (!ws)
            return;
        ws.send(data);
    };
    ws = new WebSocket(url);
    ws.onopen = () => {
        state.value = 'OPEN';
    };
    ws.onclose = ws.onerror = () => {
        state.value = 'CLOSED';
    };
    ws.onmessage = (e) => {
        data.value = e.data;
    };
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnUnmounted"])(() => {
        ws.close();
    });
    return {
        data,
        state,
        close,
        send,
        ws,
    };
}

/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */
/**
 * Simple Web Workers registration and communication.
 *
 * @see   {@link https://vueuse.js.org/useWebWorker}
 * @param url
 */
function useWebWorker(url) {
    const data = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(null);
    let worker;
    const post = function post(val) {
        if (!worker)
            return;
        worker.postMessage(val);
    };
    const terminate = function terminate() {
        if (!worker)
            return;
        worker.terminate();
    };
    worker = new Worker(url);
    worker.onmessage = (e) => {
        data.value = e.data;
    };
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnUnmounted"])(() => {
        worker.terminate();
    });
    return {
        data,
        post,
        terminate,
    };
}

/**
 * This function accepts as a parameter a function "userFunc"
 * And as a result returns an anonymous function.
 * This anonymous function, accepts as arguments,
 * the parameters to pass to the function "useArgs" and returns a Promise
 * This function can be used as a wrapper, only inside a Worker
 * because it depends by "postMessage".
 *
 * @param {Function} userFunc {Function} fn the function to run with web worker
 *
 * @returns {Function} returns a function that accepts the parameters
 * to be passed to the "userFunc" function
 */
const jobRunner = (userFunc) => (e) => {
    const userFuncArgs = e.data[0];
    // eslint-disable-next-line prefer-spread
    return Promise.resolve(userFunc.apply(undefined, userFuncArgs))
        .then((result) => {
        // @ts-ignore
        postMessage(['SUCCESS', result]);
    })
        .catch((error) => {
        // @ts-ignore
        postMessage(['ERROR', error]);
    });
};

/**
 *
 * Concatenates the dependencies into a comma separated string.
 * this string will then be passed as an argument to the "importScripts" function
 *
 * @param {Array.<String>}} deps array of string
 * @returns {String} a string composed by the concatenation of the array
 * elements "deps" and "importScripts".
 *
 * @example
 * depsParser(['demo1', 'demo2']) // return importScripts('demo1, demo2')
 */
const depsParser = (deps) => {
    if (deps.length === 0)
        return '';
    const depsString = deps.map(dep => `${dep}`).toString();
    return `importScripts('${depsString}')`;
};

/**
 * Converts the "fn" function into the syntax needed to be executed within a web worker
 *
 * @param {Function} fn the function to run with web worker
 * @param {Array.<String>} deps array of strings, imported into the worker through "importScripts"
 *
 * @returns {String} a blob url, containing the code of "fn" as a string
 *
 * @example
 * createWorkerBlobUrl((a,b) => a+b, [])
 * // return "onmessage=return Promise.resolve((a,b) => a + b)
 * .then(postMessage(['SUCCESS', result]))
 * .catch(postMessage(['ERROR', error])"
 */
const createWorkerBlobUrl = (fn, deps) => {
    const blobCode = `${depsParser(deps)}; onmessage=(${jobRunner})(${fn})`;
    const blob = new Blob([blobCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    return url;
};

/* this implementation is a vue port of https://github.com/alewin/useWorker by Alessio Koci */
/**
 * Run expensive function without blocking the UI, using a simple syntax that makes use of Promise.
 *
 * @see   {@link https://vueuse.js.org/useWebWorkerFn}
 * @param fn
 * @param options
 */
const useWebWorkerFn = (fn, { dependencies = [], timeout, window = defaultWindow, } = {}) => {
    const worker = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(undefined);
    const workerStatus = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])('PENDING');
    const promise = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])({});
    const timeoutId = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(undefined);
    const workerTerminate = (status = 'PENDING') => {
        if (worker.value && worker.value._url && window) {
            worker.value.terminate();
            URL.revokeObjectURL(worker.value._url);
            promise.value = {};
            worker.value = undefined;
            window.clearTimeout(timeoutId.value);
            workerStatus.value = status;
        }
    };
    workerTerminate();
    Object(_vueuse_shared__WEBPACK_IMPORTED_MODULE_1__["tryOnUnmounted"])(() => {
        workerTerminate();
    });
    const generateWorker = () => {
        const blobUrl = createWorkerBlobUrl(fn, dependencies);
        const newWorker = new Worker(blobUrl);
        newWorker._url = blobUrl;
        newWorker.onmessage = (e) => {
            const { resolve = () => { }, reject = () => { }, } = promise.value;
            const [status, result] = e.data;
            switch (status) {
                case 'SUCCESS':
                    resolve(result);
                    workerTerminate(status);
                    break;
                default:
                    reject(result);
                    workerTerminate('ERROR');
                    break;
            }
        };
        newWorker.onerror = (e) => {
            const { reject = () => { }, } = promise.value;
            reject(e);
            workerTerminate('ERROR');
        };
        if (timeout) {
            timeoutId.value = setTimeout(() => workerTerminate('TIMEOUT_EXPIRED'), timeout);
        }
        return newWorker;
    };
    const callWorker = (...fnArgs) => new Promise((resolve, reject) => {
        promise.value = {
            resolve,
            reject,
        };
        worker.value && worker.value.postMessage([[...fnArgs]]);
        workerStatus.value = 'RUNNING';
    });
    const workerFn = (...fnArgs) => {
        if (workerStatus.value === 'RUNNING') {
            /* eslint-disable-next-line no-console */
            console.error('[useWebWorkerFn] You can only run one instance of the worker at a time.');
            /* eslint-disable-next-line prefer-promise-reject-errors */
            return Promise.reject();
        }
        worker.value = generateWorker();
        return callWorker(...fnArgs);
    };
    return {
        workerFn,
        workerStatus,
        workerTerminate,
    };
};

/**
 * Reactive window scroll.
 *
 * @see   {@link https://vueuse.js.org/useWindowScroll}
 * @param options
 */
function useWindowScroll({ window = defaultWindow } = {}) {
    if (!window) {
        return {
            x: Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0),
            y: Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0),
        };
    }
    const x = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(window.pageXOffset);
    const y = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(window.pageYOffset);
    useEventListener('scroll', () => {
        x.value = window.pageXOffset;
        y.value = window.pageYOffset;
    }, {
        capture: false,
        passive: true,
    });
    return { x, y };
}

/**
 * Reactive window size.
 *
 * @see   {@link https://vueuse.js.org/useWindowSize}
 * @param options
 */
function useWindowSize({ window = defaultWindow, initialWidth = Infinity, initialHeight = Infinity } = {}) {
    if (!window) {
        return {
            width: Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(initialWidth),
            height: Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(initialHeight),
        };
    }
    const width = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(window.innerWidth);
    const height = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(window.innerHeight);
    useEventListener('resize', () => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    }, { passive: true });
    return { width, height };
}




/***/ }),

/***/ "./node_modules/@vueuse/shared/dist/index.esm.js":
/*!*******************************************************!*\
  !*** ./node_modules/@vueuse/shared/dist/index.esm.js ***!
  \*******************************************************/
/*! exports provided: assert, biSyncRef, bypassFilter, clamp, controlledComputed, createFilterWrapper, debounceFilter, debouncedWatch, extendRef, ignorableWatch, invoke, isBoolean, isClient, isDef, isFunction, isNumber, isObject, isString, isWindow, makeDestructurable, noop, now, pausableFilter, pausableWatch, promiseTimeout, syncRef, throttleFilter, throttledWatch, timestamp, tryOnMounted, tryOnUnmounted, useCounter, useDebounce, useDebounceFn, useInterval, useIntervalFn, useThrottle, useThrottleFn, useTimeout, useTimeoutFn, useToggle, watchWithFilter, when */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return assert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "biSyncRef", function() { return biSyncRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bypassFilter", function() { return bypassFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controlledComputed", function() { return controlledComputed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilterWrapper", function() { return createFilterWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounceFilter", function() { return debounceFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debouncedWatch", function() { return debouncedWatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendRef", function() { return extendRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ignorableWatch", function() { return ignorableWatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invoke", function() { return invoke; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return isBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isClient", function() { return isClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDef", function() { return isDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWindow", function() { return isWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeDestructurable", function() { return makeDestructurable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "now", function() { return now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pausableFilter", function() { return pausableFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pausableWatch", function() { return pausableWatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "promiseTimeout", function() { return promiseTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "syncRef", function() { return syncRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttleFilter", function() { return throttleFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttledWatch", function() { return throttledWatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timestamp", function() { return timestamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tryOnMounted", function() { return tryOnMounted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tryOnUnmounted", function() { return tryOnUnmounted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useCounter", function() { return useCounter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDebounce", function() { return useDebounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDebounceFn", function() { return useDebounceFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useInterval", function() { return useInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useIntervalFn", function() { return useIntervalFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useThrottle", function() { return useThrottle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useThrottleFn", function() { return useThrottleFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTimeout", function() { return useTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTimeoutFn", function() { return useTimeoutFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useToggle", function() { return useToggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchWithFilter", function() { return watchWithFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "when", function() { return when; });
/* harmony import */ var vue_demi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-demi */ "./node_modules/vue-demi/lib/index.mjs");


/**
 * Two-way refs synchronization.
 *
 * @param a
 * @param b
 */
function biSyncRef(a, b) {
    const flush = 'sync';
    const stop1 = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(a, (newValue) => {
        b.value = newValue;
    }, {
        flush,
        immediate: true,
    });
    const stop2 = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(b, (newValue) => {
        a.value = newValue;
    }, {
        flush,
        immediate: true,
    });
    return () => {
        stop1();
        stop2();
    };
}

/**
 * Explicitly define the deps of computed.
 *
 * @param source
 * @param fn
 */
function controlledComputed(source, fn) {
    const v = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(fn());
    Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(source, () => v.value = fn(), {
        flush: 'sync',
    });
    return Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["computed"])(() => v.value);
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const isClient = typeof window !== 'undefined';
const isDef = (val) => typeof val !== 'undefined';
const assert = (condition, ...infos) => {
    if (!condition)
        console.warn(...infos);
};
const toString = Object.prototype.toString;
const isBoolean = (val) => typeof val === 'boolean';
const isFunction = (val) => typeof val === 'function';
const isNumber = (val) => typeof val === 'number';
const isString = (val) => typeof val === 'string';
const isObject = (val) => toString.call(val) === '[object Object]';
const isWindow = (val) => typeof window !== 'undefined' && toString.call(val) === '[object Window]';
const now = () => Date.now();
const timestamp = () => +Date.now();
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const noop = () => { };

/**
 * @internal
 */
function createFilterWrapper(filter, fn) {
    function wrapper(...args) {
        filter(() => fn.apply(this, args), { fn, thisArg: this, args });
    }
    return wrapper;
}
const bypassFilter = (invoke) => {
    return invoke();
};
/**
 * Create an EventFilter that debounce the events
 *
 * @param ms
 */
function debounceFilter(ms) {
    if (ms <= 0)
        return bypassFilter;
    let timer;
    const filter = (invoke) => {
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(invoke, ms);
    };
    return filter;
}
/**
 * Create an EventFilter that throttle the events
 *
 * @param ms
 * @param [trailing=true]
 */
function throttleFilter(ms, trailing = true) {
    if (ms <= 0)
        return bypassFilter;
    let lastExec = 0;
    let timer;
    const clear = () => {
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
        }
    };
    const filter = (invoke) => {
        const elapsed = Date.now() - lastExec;
        clear();
        if (elapsed > ms) {
            lastExec = Date.now();
            invoke();
        }
        else if (trailing) {
            timer = setTimeout(() => {
                clear();
                invoke();
            }, ms);
        }
    };
    return filter;
}
/**
 * EventFilter that gives extra controls to pause and resume the filter
 *
 * @param extendFilter  Extra filter to apply when the PauseableFilter is active, default to none
 *
 */
function pausableFilter(extendFilter = bypassFilter) {
    const isActive = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(true);
    function pause() {
        isActive.value = false;
    }
    function resume() {
        isActive.value = true;
    }
    const eventFilter = (...args) => {
        if (isActive.value)
            extendFilter(...args);
    };
    return { isActive, pause, resume, eventFilter };
}

function promiseTimeout(ms, throwOnTimeout = false, reason = 'Timeout') {
    return new Promise((resolve, reject) => {
        if (throwOnTimeout)
            setTimeout(() => reject(reason), ms);
        else
            setTimeout(resolve, ms);
    });
}
function invoke(fn) {
    return fn();
}

// implementation
function watchWithFilter(source, cb, options = {}) {
    const { eventFilter = bypassFilter } = options, watchOptions = __rest(options, ["eventFilter"]);
    return Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(source, createFilterWrapper(eventFilter, cb), watchOptions);
}

// implementation
function debouncedWatch(source, cb, options = {}) {
    const { debounce = 0 } = options, watchOptions = __rest(options, ["debounce"]);
    return watchWithFilter(source, cb, Object.assign(Object.assign({}, watchOptions), { eventFilter: debounceFilter(debounce) }));
}

// implementation
function extendRef(ref, extend, { enumerable = false, unwrap = true } = {}) {
    for (const [key, value] of Object.entries(extend)) {
        if (key === 'value')
            continue;
        if (Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["isRef"])(value) && unwrap) {
            Object.defineProperty(ref, key, {
                get() {
                    return value.value;
                },
                set(v) {
                    value.value = v;
                },
                enumerable,
            });
        }
        else {
            Object.defineProperty(ref, key, { value, enumerable });
        }
    }
    return ref;
}

function ignorableWatch(source, cb, options = {}) {
    const { eventFilter = bypassFilter } = options, watchOptions = __rest(options, ["eventFilter"]);
    const filteredCb = createFilterWrapper(eventFilter, cb);
    let ignoreUpdates;
    let ignorePrevAsyncUpdates;
    let stop;
    if (watchOptions.flush === 'sync') {
        const ignore = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
        // no op for flush: sync
        ignorePrevAsyncUpdates = () => { };
        ignoreUpdates = (updater) => {
            // Call the updater function and count how many sync updates are performed,
            // then add them to the ignore count
            ignore.value = true;
            updater();
            ignore.value = false;
        };
        stop = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(source, (...args) => {
            if (!ignore.value)
                filteredCb(...args);
        }, watchOptions);
    }
    else {
        // flush 'pre' and 'post'
        const disposables = [];
        // counters for how many following changes to be ignored
        // ignoreCounter is incremented before there is a history operation
        // affecting the source ref value (undo, redo, revert).
        // syncCounter is incremented in sync with every change to the
        // source ref value. This let us know how many times the ref
        // was modified and support chained sync operations. If there
        // are more sync triggers than the ignore count, the we now
        // there are modifications in the source ref value that we
        // need to commit
        const ignoreCounter = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
        const syncCounter = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
        ignorePrevAsyncUpdates = () => {
            ignoreCounter.value = syncCounter.value;
        };
        // Sync watch to count modifications to the source
        disposables.push(Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(source, () => {
            syncCounter.value++;
        }, Object.assign(Object.assign({}, watchOptions), { flush: 'sync' })));
        ignoreUpdates = (updater) => {
            // Call the updater function and count how many sync updates are performed,
            // then add them to the ignore count
            const syncCounterPrev = syncCounter.value;
            updater();
            ignoreCounter.value += syncCounter.value - syncCounterPrev;
        };
        disposables.push(Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(source, (...args) => {
            // If a history operation was performed (ignoreCounter > 0) and there are
            // no other changes to the source ref value afterwards, then ignore this commit
            const ignore = ignoreCounter.value > 0 && ignoreCounter.value === syncCounter.value;
            ignoreCounter.value = 0;
            syncCounter.value = 0;
            if (ignore)
                return;
            filteredCb(...args);
        }, watchOptions));
        stop = () => {
            disposables.forEach(fn => fn());
        };
    }
    return { stop, ignoreUpdates, ignorePrevAsyncUpdates };
}

function makeDestructurable(obj, arr) {
    if (typeof Symbol !== 'undefined') {
        const clone = Object.assign({}, obj);
        Object.defineProperty(clone, Symbol.iterator, {
            enumerable: false,
            value() {
                let index = 0;
                return {
                    next: () => ({
                        value: arr[index++],
                        done: index > arr.length,
                    }),
                };
            },
        });
        return clone;
    }
    else {
        return Object.assign([...arr], obj);
    }
}

// implementation
function pausableWatch(source, cb, options = {}) {
    const { eventFilter: filter } = options, watchOptions = __rest(options, ["eventFilter"]);
    const { eventFilter, pause, resume, isActive } = pausableFilter(filter);
    const stop = watchWithFilter(source, cb, Object.assign(Object.assign({}, watchOptions), { eventFilter }));
    return { stop, pause, resume, isActive };
}

/**
 * Keep target ref(s) in sync with the source ref
 *
 * @param source source ref
 * @param targets
 */
function syncRef(source, targets, { flush = 'sync', deep = false, immediate = true, } = {}) {
    if (!Array.isArray(targets))
        targets = [targets];
    return Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(source, (newValue) => {
        targets.forEach(target => target.value = newValue);
    }, {
        flush,
        deep,
        immediate,
    });
}

// implementation
function throttledWatch(source, cb, options = {}) {
    const { throttle = 0 } = options, watchOptions = __rest(options, ["throttle"]);
    return watchWithFilter(source, cb, Object.assign(Object.assign({}, watchOptions), { eventFilter: throttleFilter(throttle) }));
}

/**
 * Call onMounted() if it's inside a component lifecycle, if not, run just call the function
 *
 * @param fn
 * @param sync if set to false, it will run in the nextTick() of Vue
 */
function tryOnMounted(fn, sync = true) {
    if (Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["getCurrentInstance"])())
        Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["onMounted"])(fn);
    else if (sync)
        fn();
    else
        Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["nextTick"])(fn);
}

/**
 * Call onUnmounted() if it's inside a component lifecycle, if not, do nothing
 *
 * @param fn
 */
function tryOnUnmounted(fn) {
    if (Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["getCurrentInstance"])())
        Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["onUnmounted"])(fn);
}

/**
 * Basic counter with utility functions.
 *
 * @see   {@link https://vueuse.js.org/useCounter}
 * @param [initialValue=0]
 */
function useCounter(initialValue = 0) {
    const count = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(initialValue);
    const inc = (delta = 1) => (count.value += delta);
    const dec = (delta = 1) => (count.value -= delta);
    const get = () => count.value;
    const set = (val) => (count.value = val);
    const reset = (val = initialValue) => {
        initialValue = val;
        return set(val);
    };
    return { count, inc, dec, get, set, reset };
}

/**
 * Debounce execution of a function.
 *
 * @param  fn          A function to be executed after delay milliseconds debounced.
 * @param  ms          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 *
 * @return A new, debounce, function.
 */
function useDebounceFn(fn, ms = 200) {
    return createFilterWrapper(debounceFilter(ms), fn);
}

function useDebounce(value, ms = 200) {
    if (ms <= 0)
        return value;
    const debounced = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(value.value);
    const updater = useDebounceFn(() => {
        debounced.value = value.value;
    }, ms);
    Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(value, () => updater());
    return debounced;
}

/**
 * Wrapper for `setInterval` with controls
 *
 * @param cb
 * @param interval
 * @param immediate
 */
function useIntervalFn(cb, interval = 1000, immediate = true) {
    let timer = null;
    const isActive = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    function clean() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }
    function pause() {
        isActive.value = false;
        clean();
    }
    function resume() {
        isActive.value = true;
        clean();
        timer = setInterval(cb, interval);
    }
    if (immediate)
        resume();
    tryOnUnmounted(pause);
    return {
        isActive,
        pause,
        resume,
        start: resume,
        stop: pause,
    };
}

function useInterval(interval = 1000, immediate = true) {
    const counter = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(0);
    return Object.assign({ counter }, useIntervalFn(() => counter.value += 1, interval, immediate));
}

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param   fn             A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param   ms             A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 *
 * @return  A new, throttled, function.
 */
function useThrottleFn(fn, ms = 200, trailing = true) {
    return createFilterWrapper(throttleFilter(ms, trailing), fn);
}

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  delay  A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 */
function useThrottle(value, delay = 200) {
    if (delay <= 0)
        return value;
    const throttled = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(value.value);
    const updater = useThrottleFn(() => {
        throttled.value = value.value;
    }, delay);
    Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(value, () => updater());
    return throttled;
}

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @param cb
 * @param interval
 * @param immediate
 */
function useTimeoutFn(cb, interval, immediate) {
    const isActive = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    let timer = null;
    function clear() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }
    function stop() {
        isActive.value = false;
        clear();
    }
    function start() {
        clear();
        isActive.value = true;
        timer = setTimeout(() => {
            timer = null;
            cb();
        }, interval);
    }
    if (immediate)
        start();
    tryOnUnmounted(stop);
    return {
        isActive,
        start,
        stop,
    };
}

/**
 * Update value after a given time with controls.
 *
 * @param interval
 * @param immediate
 */
function useTimeout(interval = 1000, immediate = true) {
    const ready = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(false);
    const controls = useTimeoutFn(() => ready.value = true, interval, immediate);
    function stop() {
        ready.value = false;
        controls.stop();
    }
    function start() {
        ready.value = false;
        controls.start();
    }
    return {
        ready,
        isActive: controls.isActive,
        start,
        stop,
    };
}

/**
 * A boolean ref with a toggler
 *
 * @see   {@link https://vueuse.js.org/useToggle}
 * @param [initialValue=false]
 */
function useToggle(initialValue = false) {
    const boolean = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["ref"])(initialValue);
    const toggle = () => (boolean.value = !boolean.value);
    return [boolean, toggle];
}

function when(r) {
    let isNot = false;
    function toMatch(condition, { flush = 'sync', deep = false, timeout, throwOnTimeout } = {}) {
        let stop = null;
        const watcher = new Promise((resolve) => {
            stop = Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["watch"])(r, (v) => {
                if (condition(v) === !isNot) {
                    stop === null || stop === void 0 ? void 0 : stop();
                    resolve();
                }
            }, {
                flush,
                deep,
                immediate: true,
            });
        });
        const promises = [watcher];
        if (timeout) {
            promises.push(promiseTimeout(timeout, throwOnTimeout).finally(() => {
                stop === null || stop === void 0 ? void 0 : stop();
            }));
        }
        return Promise.race(promises);
    }
    function toBe(value, options) {
        return toMatch(v => v === Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["unref"])(value), options);
    }
    function toBeTruthy(options) {
        return toMatch(v => Boolean(v), options);
    }
    function toBeNull(options) {
        return toBe(null, options);
    }
    function toBeUndefined(options) {
        return toBe(undefined, options);
    }
    function toBeNaN(options) {
        return toMatch(Number.isNaN, options);
    }
    function toContains(value, options) {
        return toMatch((v) => {
            const array = Array.from(v);
            return array.includes(value) || array.includes(Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["unref"])(value));
        }, options);
    }
    function changed(options) {
        return changedTimes(1, options);
    }
    function changedTimes(n = 1, options) {
        let count = -1; // skip the immediate check
        return toMatch(() => {
            count += 1;
            return count >= n;
        }, options);
    }
    if (Array.isArray(Object(vue_demi__WEBPACK_IMPORTED_MODULE_0__["unref"])(r))) {
        const instance = {
            toMatch,
            toContains,
            changed,
            changedTimes,
            get not() {
                isNot = !isNot;
                return this;
            },
        };
        return instance;
    }
    else {
        const instance = {
            toMatch,
            toBe,
            toBeTruthy,
            toBeNull,
            toBeNaN,
            toBeUndefined,
            changed,
            changedTimes,
            get not() {
                isNot = !isNot;
                return this;
            },
        };
        return instance;
    }
}




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

/***/ "./node_modules/core-js/modules/es.array.slice.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.slice.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");
var arrayMethodUsesToLength = __webpack_require__(/*! ../internals/array-method-uses-to-length */ "./node_modules/core-js/internals/array-method-uses-to-length.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


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

/***/ "./node_modules/vue-demi/lib/index.mjs":
/*!*********************************************!*\
  !*** ./node_modules/vue-demi/lib/index.mjs ***!
  \*********************************************/
/*! exports provided: EffectScope, computed, createApp, createRef, customRef, defineAsyncComponent, defineComponent, del, effectScope, getCurrentInstance, getCurrentScope, h, inject, isRaw, isReactive, isReadonly, isRef, markRaw, nextTick, onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onScopeDispose, onServerPrefetch, onUnmounted, onUpdated, provide, proxyRefs, reactive, readonly, ref, set, shallowReactive, shallowReadonly, shallowRef, toRaw, toRef, toRefs, triggerRef, unref, useAttrs, useCSSModule, useCssModule, useSlots, warn, watch, watchEffect, watchPostEffect, watchSyncEffect, Vue, Vue2, isVue2, isVue3, version, install */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vue2", function() { return Vue2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVue2", function() { return isVue2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVue3", function() { return isVue3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "Vue", function() { return vue__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vue/composition-api/dist/vue-composition-api.mjs */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EffectScope", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["EffectScope"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computed", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["computed"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createApp", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["createApp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["createRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "customRef", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["customRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defineAsyncComponent", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["defineAsyncComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defineComponent", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["defineComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "del", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["del"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "effectScope", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["effectScope"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getCurrentInstance", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["getCurrentInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getCurrentScope", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["getCurrentScope"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "h", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inject", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["inject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isRaw", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["isRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isReactive", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["isReactive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isReadonly", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["isReadonly"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isRef", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["isRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "markRaw", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["markRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nextTick", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["nextTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onActivated", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["onActivated"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onBeforeMount", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["onBeforeMount"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onBeforeUnmount", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["onBeforeUnmount"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onBeforeUpdate", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["onBeforeUpdate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onDeactivated", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["onDeactivated"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onErrorCaptured", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["onErrorCaptured"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onMounted", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["onMounted"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onScopeDispose", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["onScopeDispose"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onServerPrefetch", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["onServerPrefetch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onUnmounted", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["onUnmounted"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onUpdated", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["onUpdated"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "provide", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["provide"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "proxyRefs", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["proxyRefs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reactive", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["reactive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "readonly", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["readonly"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ref", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["ref"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "set", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["set"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shallowReactive", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["shallowReactive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shallowReadonly", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["shallowReadonly"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shallowRef", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["shallowRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRaw", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["toRaw"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRef", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["toRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRefs", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["toRefs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "triggerRef", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["triggerRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unref", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["unref"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useAttrs", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["useAttrs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCSSModule", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["useCSSModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCssModule", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["useCssModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSlots", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["useSlots"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["warn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watch", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["watch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchEffect", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["watchEffect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchPostEffect", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["watchPostEffect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "watchSyncEffect", function() { return _vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["watchSyncEffect"]; });




function install(_vue) {
  _vue = _vue || vue__WEBPACK_IMPORTED_MODULE_0__
  if (_vue && !_vue['__composition_api_installed__'])
    _vue.use(_vue_composition_api_dist_vue_composition_api_mjs__WEBPACK_IMPORTED_MODULE_1__["default"])
}

install(vue__WEBPACK_IMPORTED_MODULE_0__)

var isVue2 = true
var isVue3 = false
var Vue2 = vue__WEBPACK_IMPORTED_MODULE_0__
var version = vue__WEBPACK_IMPORTED_MODULE_0__.version

/**VCA-EXPORTS**/

/**VCA-EXPORTS**/




/***/ }),

/***/ "./node_modules/vue-toastification/composition/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/vue-toastification/composition/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js"); // eslint-disable-line @typescript-eslint/no-var-requires
const { inject, provide } = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.mjs"); // eslint-disable-line @typescript-eslint/no-var-requires

const toastSymbol = Symbol("Vue Toastification");

let createToastInterface = () => {
  const toast = () =>
    console.warn("[Vue Toastification] This plugin does not support SSR!");
  return new Proxy(toast, {
    get: function() {
      return toast;
    }
  });
};

if (typeof window !== "undefined") {
  const toastification = __webpack_require__(/*! vue-toastification */ "./node_modules/vue-toastification/dist/esm/index.js"); // eslint-disable-line @typescript-eslint/no-var-requires
  createToastInterface = toastification.createToastInterface;
}

/** @type {ReturnType<typeof createToastInterface>} */
const interfaceFromBus = bus => {
  const VueClass = typeof Vue.prototype === "undefined" ? Vue.default : Vue;
  return bus instanceof VueClass ? createToastInterface(bus) : undefined;
};

// Generate provider and consumer
const provideToast = options =>
  provide(toastSymbol, createToastInterface(options));
const useToast = eventBus =>
  interfaceFromBus(eventBus) || inject(toastSymbol, interfaceFromBus(eventBus));

module.exports = { provideToast, useToast };


/***/ })

}]);