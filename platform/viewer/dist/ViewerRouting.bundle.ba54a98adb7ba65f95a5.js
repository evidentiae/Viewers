(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ 1028:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(12);

exports.__esModule = true;
exports["default"] = exports.ReactReduxContext = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var ReactReduxContext = _react["default"].createContext(null);

exports.ReactReduxContext = ReactReduxContext;
var _default = ReactReduxContext;
exports["default"] = _default;

/***/ }),

/***/ 1069:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createDispatchHook = createDispatchHook;
exports.useDispatch = void 0;

var _Context = __webpack_require__(1028);

var _useStore = __webpack_require__(1070);

/**
 * Hook factory, which creates a `useDispatch` hook bound to a given context.
 *
 * @param {Function} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useDispatch` hook bound to the specified context.
 */
function createDispatchHook(context) {
  if (context === void 0) {
    context = _Context.ReactReduxContext;
  }

  var useStore = context === _Context.ReactReduxContext ? _useStore.useStore : (0, _useStore.createStoreHook)(context);
  return function useDispatch() {
    var store = useStore();
    return store.dispatch;
  };
}
/**
 * A hook to access the redux `dispatch` function.
 *
 * @returns {any|function} redux store's `dispatch` function
 *
 * @example
 *
 * import React, { useCallback } from 'react'
 * import { useDispatch } from 'react-redux'
 *
 * export const CounterComponent = ({ value }) => {
 *   const dispatch = useDispatch()
 *   const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
 *   return (
 *     <div>
 *       <span>{value}</span>
 *       <button onClick={increaseCounter}>Increase counter</button>
 *     </div>
 *   )
 * }
 */


var useDispatch = createDispatchHook();
exports.useDispatch = useDispatch;

/***/ }),

/***/ 1070:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createStoreHook = createStoreHook;
exports.useStore = void 0;

var _react = __webpack_require__(0);

var _Context = __webpack_require__(1028);

var _useReduxContext2 = __webpack_require__(1071);

/**
 * Hook factory, which creates a `useStore` hook bound to a given context.
 *
 * @param {Function} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useStore` hook bound to the specified context.
 */
function createStoreHook(context) {
  if (context === void 0) {
    context = _Context.ReactReduxContext;
  }

  var useReduxContext = context === _Context.ReactReduxContext ? _useReduxContext2.useReduxContext : function () {
    return (0, _react.useContext)(context);
  };
  return function useStore() {
    var _useReduxContext = useReduxContext(),
        store = _useReduxContext.store;

    return store;
  };
}
/**
 * A hook to access the redux store.
 *
 * @returns {any} the redux store
 *
 * @example
 *
 * import React from 'react'
 * import { useStore } from 'react-redux'
 *
 * export const ExampleComponent = () => {
 *   const store = useStore()
 *   return <div>{store.getState()}</div>
 * }
 */


var useStore = createStoreHook();
exports.useStore = useStore;

/***/ }),

/***/ 1071:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(12);

exports.__esModule = true;
exports.useReduxContext = useReduxContext;

var _react = __webpack_require__(0);

var _invariant = _interopRequireDefault(__webpack_require__(11));

var _Context = __webpack_require__(1028);

/**
 * A hook to access the value of the `ReactReduxContext`. This is a low-level
 * hook that you should usually not need to call directly.
 *
 * @returns {any} the value of the `ReactReduxContext`
 *
 * @example
 *
 * import React from 'react'
 * import { useReduxContext } from 'react-redux'
 *
 * export const CounterComponent = ({ value }) => {
 *   const { store } = useReduxContext()
 *   return <div>{store.getState()}</div>
 * }
 */
function useReduxContext() {
  var contextValue = (0, _react.useContext)(_Context.ReactReduxContext);
  (0, _invariant["default"])(contextValue, 'could not find react-redux context value; please ensure the component is wrapped in a <Provider>');
  return contextValue;
}

/***/ }),

/***/ 993:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(133);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(41);
/* harmony import */ var _connectedComponents_ConnectedViewerRetrieveStudyData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1017);
/* harmony import */ var _customHooks_useServer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1023);
/* harmony import */ var _customHooks_useQuery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1039);
/* harmony import */ var react_redux_lib_hooks_useDispatch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1069);
/* harmony import */ var react_redux_lib_hooks_useDispatch__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_redux_lib_hooks_useDispatch__WEBPACK_IMPORTED_MODULE_8__);


 //





var UrlUtil = _ohif_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].urlUtil;
var setStudyData = _ohif_core__WEBPACK_IMPORTED_MODULE_3__[/* OHIF */ "a"].redux.actions.setStudyData;
/**
 * Get array of seriesUIDs from param or from queryString
 * @param {*} seriesInstanceUIDs
 * @param {*} location
 */

var getSeriesInstanceUIDs = function getSeriesInstanceUIDs(seriesInstanceUIDs, routeLocation) {
  var queryFilters = UrlUtil.queryString.getQueryFilters(routeLocation);
  var querySeriesUIDs = queryFilters && queryFilters['seriesInstanceUID'];

  var _seriesInstanceUIDs = seriesInstanceUIDs || querySeriesUIDs;

  return UrlUtil.paramString.parseParam(_seriesInstanceUIDs);
};

function ViewerRouting(_ref) {
  var routeMatch = _ref.match,
      routeLocation = _ref.location;
  var _routeMatch$params = routeMatch.params,
      token = _routeMatch$params.token,
      project = _routeMatch$params.project,
      location = _routeMatch$params.location,
      dataset = _routeMatch$params.dataset,
      dicomStore = _routeMatch$params.dicomStore,
      patientID = _routeMatch$params.patientID,
      studyInstanceUIDs = _routeMatch$params.studyInstanceUIDs,
      seriesInstanceUIDs = _routeMatch$params.seriesInstanceUIDs;
  /*
  // Waern: token in query parameters seems to end up in studyInstanceUIDs.
  // So instead of using the below code snippet, we add token as a path component.
  //
  // Set the user's default authToken for outbound DICOMWeb requests.
  // Is only applied if target server does not set `requestOptions` property.
  //
  // See: `getAuthorizationHeaders.js`
  let query = useQuery();
  const authToken = query.get('token');
  console.log(authToken);
  */

  if (token) {
    console.log("setting token");
    console.log(token);

    _ohif_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].getAccessToken = function () {
      return token;
    };

    window.access_token = token;
  }

  var server = Object(_customHooks_useServer__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])({
    project: project,
    location: location,
    dataset: dataset,
    dicomStore: dicomStore
  });
  var studyUIDs = studyInstanceUIDs ? UrlUtil.paramString.parseParam(studyInstanceUIDs) : [];
  var seriesUIDs = seriesInstanceUIDs ? getSeriesInstanceUIDs(seriesInstanceUIDs, routeLocation) : [];
  console.log("studyUIDs:");
  console.log(studyUIDs);
  var dispatch = Object(react_redux_lib_hooks_useDispatch__WEBPACK_IMPORTED_MODULE_8__["useDispatch"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    console.log("test");
    studyUIDs.forEach(function (uid) {
      console.log(uid);
      dispatch(setStudyData(uid, {}));
    });
  });

  if (server && studyUIDs) {
    //studyInstanceUIDs={studyUIDs}
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_connectedComponents_ConnectedViewerRetrieveStudyData__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
      seriesInstanceUIDs: seriesUIDs,
      patientID: patientID
    });
  }

  return null;
}

ViewerRouting.propTypes = {
  match: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    params: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
      studyInstanceUIDs: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
      seriesInstanceUIDs: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
      dataset: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
      dicomStore: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
      location: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
      project: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
    })
  }),
  location: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any
};
/* harmony default export */ __webpack_exports__["default"] = (ViewerRouting);

/***/ })

}]);