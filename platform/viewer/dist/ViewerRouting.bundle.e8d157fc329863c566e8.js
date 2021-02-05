(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ 994:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(133);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41);
/* harmony import */ var _connectedComponents_ConnectedViewerRetrieveStudyData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1017);
/* harmony import */ var _customHooks_useServer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1023);
/* harmony import */ var _customHooks_useQuery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1038);


 //




var UrlUtil = _ohif_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].urlUtil;
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
      project = _routeMatch$params.project,
      location = _routeMatch$params.location,
      dataset = _routeMatch$params.dataset,
      dicomStore = _routeMatch$params.dicomStore,
      studyInstanceUIDs = _routeMatch$params.studyInstanceUIDs,
      seriesInstanceUIDs = _routeMatch$params.seriesInstanceUIDs; // Set the user's default authToken for outbound DICOMWeb requests.
  // Is only applied if target server does not set `requestOptions` property.
  //
  // See: `getAuthorizationHeaders.js`

  var query = Object(_customHooks_useQuery__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])();
  var authToken = query.get('token');

  if (authToken) {
    _ohif_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].getAccessToken = function () {
      return authToken;
    };
  }

  var server = Object(_customHooks_useServer__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])({
    project: project,
    location: location,
    dataset: dataset,
    dicomStore: dicomStore
  });
  console.log(studyInstanceUIDs);
  var studyUIDs = UrlUtil.paramString.parseParam(studyInstanceUIDs);
  console.log(studyUIDs);
  var seriesUIDs = getSeriesInstanceUIDs(seriesInstanceUIDs, routeLocation);

  if (server && studyUIDs) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_connectedComponents_ConnectedViewerRetrieveStudyData__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
      studyInstanceUIDs: studyUIDs,
      seriesInstanceUIDs: seriesUIDs
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