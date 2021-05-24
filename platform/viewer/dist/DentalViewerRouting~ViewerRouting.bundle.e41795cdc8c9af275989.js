(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 1013:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return usePrevious; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function usePrevious(value) {
  var ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/***/ }),

/***/ 1014:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GoogleCloudApi =
/*#__PURE__*/
function () {
  function GoogleCloudApi() {
    _classCallCheck(this, GoogleCloudApi);
  }

  _createClass(GoogleCloudApi, [{
    key: "setAccessToken",
    value: function setAccessToken(accessToken) {
      if (!accessToken) console.error('Access token is empty');
      this.accessToken = accessToken;
    }
  }, {
    key: "getUrlBaseDicomWeb",
    value: function getUrlBaseDicomWeb(project, location, dataset, dicomStore) {
      return this.urlBase + "/projects/".concat(project, "/locations/").concat(location, "/datasets/").concat(dataset, "/dicomStores/").concat(dicomStore, "/dicomWeb");
    }
  }, {
    key: "getUrlPath",
    value: function getUrlPath(project, location, dataset, dicomStore) {
      "/projects/".concat(project, "/locations/").concat(location, "/datasets/").concat(dataset, "/dicomStores/").concat(dicomStore);
    }
  }, {
    key: "doRequest",
    value: function () {
      var _doRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(urlStr) {
        var config,
            params,
            url,
            data,
            response,
            subPage,
            key,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                params = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
                url = new URL(urlStr);
                data = null;
                url.search = new URLSearchParams(params);
                _context.prev = 5;
                _context.next = 8;
                return fetch(url, _objectSpread({}, this.fetchConfig, {
                  config: config
                }));

              case 8:
                response = _context.sent;
                _context.prev = 9;
                _context.next = 12;
                return response.json();

              case 12:
                data = _context.sent;
                _context.next = 17;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](9);

              case 17:
                if (!(response.status >= 200 && response.status < 300 && data != null)) {
                  _context.next = 27;
                  break;
                }

                if (!(data.nextPageToken != null)) {
                  _context.next = 24;
                  break;
                }

                params.pageToken = data.nextPageToken;
                _context.next = 22;
                return this.doRequest(urlStr, config, params);

              case 22:
                subPage = _context.sent;

                for (key in data) {
                  if (data.hasOwnProperty(key)) {
                    data[key] = data[key].concat(subPage.data[key]);
                  }
                }

              case 24:
                return _context.abrupt("return", {
                  isError: false,
                  status: response.status,
                  data: data
                });

              case 27:
                return _context.abrupt("return", {
                  isError: true,
                  status: response.status,
                  message: data && data.error && data.error.message || 'Unknown error'
                });

              case 28:
                _context.next = 35;
                break;

              case 30:
                _context.prev = 30;
                _context.t1 = _context["catch"](5);

                if (!(data && data.error)) {
                  _context.next = 34;
                  break;
                }

                return _context.abrupt("return", {
                  isError: true,
                  status: _context.t1.status,
                  message: _context.t1.response.data.error.message || 'Unspecified error'
                });

              case 34:
                return _context.abrupt("return", {
                  isError: true,
                  message: _context.t1 && _context.t1.message || 'Oops! Something went wrong'
                });

              case 35:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 30], [9, 15]]);
      }));

      function doRequest(_x) {
        return _doRequest.apply(this, arguments);
      }

      return doRequest;
    }()
  }, {
    key: "loadProjects",
    value: function () {
      var _loadProjects = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.doRequest('https://cloudresourcemanager.googleapis.com/v1/projects'));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadProjects() {
        return _loadProjects.apply(this, arguments);
      }

      return loadProjects;
    }()
  }, {
    key: "loadLocations",
    value: function () {
      var _loadLocations = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(projectId) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.doRequest("".concat(this.urlBaseProject, "/").concat(projectId, "/locations")));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadLocations(_x2) {
        return _loadLocations.apply(this, arguments);
      }

      return loadLocations;
    }()
  }, {
    key: "loadDatasets",
    value: function () {
      var _loadDatasets = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(projectId, locationId) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.doRequest("".concat(this.urlBaseProject, "/").concat(projectId, "/locations/").concat(locationId, "/datasets")));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function loadDatasets(_x3, _x4) {
        return _loadDatasets.apply(this, arguments);
      }

      return loadDatasets;
    }()
  }, {
    key: "loadDicomStores",
    value: function () {
      var _loadDicomStores = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(dataset) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.doRequest("".concat(this.urlBase, "/").concat(dataset, "/dicomStores")));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function loadDicomStores(_x5) {
        return _loadDicomStores.apply(this, arguments);
      }

      return loadDicomStores;
    }()
  }, {
    key: "fetchConfig",
    get: function get() {
      var access_token = this.accessToken || window.access_token;
      if (!access_token) throw new Error('OIDC access_token is not set');
      return {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + access_token
        }
      };
    }
  }, {
    key: "urlBase",
    get: function get() {
      return this.healthcareApiEndpoint || 'https://healthcare.googleapis.com/v1beta1';
    },
    set: function set(url) {
      this.healthcareApiEndpoint = url;
    }
  }, {
    key: "urlBaseProject",
    get: function get() {
      return this.urlBase + "/projects";
    }
  }]);

  return GoogleCloudApi;
}();

/* harmony default export */ __webpack_exports__["a"] = (new GoogleCloudApi());

/***/ }),

/***/ 1017:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/react-redux/es/index.js + 21 modules
var es = __webpack_require__(58);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/platform/core/src/classes/metadata/index.js + 3 modules
var metadata = __webpack_require__(85);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/platform/core/src/studies/index.js + 8 modules
var src_studies = __webpack_require__(163);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/platform/core/src/utils/index.js + 15 modules
var utils = __webpack_require__(133);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/platform/core/src/log.js
var log = __webpack_require__(8);

// EXTERNAL MODULE: ./customHooks/usePrevious.js
var usePrevious = __webpack_require__(1013);

// EXTERNAL MODULE: ./connectedComponents/ConnectedViewer.js + 18 modules
var ConnectedViewer = __webpack_require__(1019);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/prop-types/index.js
var prop_types = __webpack_require__(1);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./App.js + 32 modules
var App = __webpack_require__(252);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/platform/ui/src/index.js + 123 modules
var src = __webpack_require__(13);

// EXTERNAL MODULE: ./context/AppContext.js
var AppContext = __webpack_require__(76);

// EXTERNAL MODULE: ./routes/NotFound.js
var NotFound = __webpack_require__(253);

// CONCATENATED MODULE: ./connectedComponents/ViewerRetrieveStudyData.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }







 // Contexts



var OHIFStudyMetadata = metadata["a" /* default */].OHIFStudyMetadata,
    OHIFSeriesMetadata = metadata["a" /* default */].OHIFSeriesMetadata;
var retrieveStudiesMetadata = src_studies["a" /* default */].retrieveStudiesMetadata,
    deleteStudyMetadataPromise = src_studies["a" /* default */].deleteStudyMetadataPromise;
var studyMetadataManager = utils["a" /* default */].studyMetadataManager,
    makeCancelable = utils["a" /* default */].makeCancelable;

var _promoteToFront = function _promoteToFront(list, values, searchMethod) {
  var listCopy = _toConsumableArray(list);

  var response = [];
  var promotedCount = 0;
  var arrayValues = values.split(',');
  arrayValues.forEach(function (value) {
    var index = listCopy.findIndex(searchMethod.bind(undefined, value));

    if (index >= 0) {
      var _listCopy$splice = listCopy.splice(index, 1),
          _listCopy$splice2 = _slicedToArray(_listCopy$splice, 1),
          itemToPromote = _listCopy$splice2[0];

      response[promotedCount] = itemToPromote;
      promotedCount++;
    }
  });
  return {
    promoted: promotedCount === arrayValues.length,
    data: [].concat(response, _toConsumableArray(listCopy))
  };
};
/**
 * Promote series to front if find found equivalent on filters object
 * @param {Object} study - study reference to promote series against
 * @param {Object} [filters] - Object containing filters to be applied
 * @param {string} [filter.seriesInstanceUID] - series instance uid to filter results against
 * @param {boolean} isFilterStrategy - if filtering by query param strategy ON
 */


var _promoteList = function _promoteList(study, studyMetadata, filters, isFilterStrategy) {
  var promoted = false; // Promote only if no filter should be applied

  if (!isFilterStrategy) {
    promoted = _promoteStudyDisplaySet(study, studyMetadata, filters);
  }

  return promoted;
};

var _promoteStudyDisplaySet = function _promoteStudyDisplaySet(study, studyMetadata, filters) {
  var promoted = false;
  var queryParamsLength = Object.keys(filters).length;
  var shouldPromoteToFront = queryParamsLength > 0;

  if (shouldPromoteToFront) {
    var seriesInstanceUID = filters.seriesInstanceUID;

    var _seriesLookup = function _seriesLookup(valueToCompare, displaySet) {
      return displaySet.SeriesInstanceUID === valueToCompare;
    };

    var promotedResponse = _promoteToFront(studyMetadata.getDisplaySets(), seriesInstanceUID, _seriesLookup);

    study.displaySets = promotedResponse.data;
    promoted = promotedResponse.promoted;
  }

  return promoted;
};
/**
 * Method to identify if query param (from url) was applied to given list
 * @param {Object} study - study reference to promote series against
 * @param {Object} [filters] - Object containing filters to be applied
 * @param {string} [filter.seriesInstanceUID] - series instance uid to filter results against
 * @param {boolean} isFilterStrategy - if filtering by query param strategy ON
 */


var _isQueryParamApplied = function _isQueryParamApplied(study) {
  var filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var isFilterStrategy = arguments.length > 2 ? arguments[2] : undefined;
  var seriesInstanceUID = filters.seriesInstanceUID;
  var applied = true; // skip in case no filter or no toast manager

  if (!seriesInstanceUID) {
    return applied;
  }

  var seriesInstanceUIDs = seriesInstanceUID.split(',');

  var validateFilterApplied = function validateFilterApplied() {
    var sameSize = arrayToInspect.length === seriesInstanceUIDs.length;

    if (!sameSize) {
      return;
    }

    return arrayToInspect.every(function (item) {
      return seriesInstanceUIDs.some(function (seriesInstanceUIDStr) {
        return seriesInstanceUIDStr === item.SeriesInstanceUID;
      });
    });
  };

  var validatePromoteApplied = function validatePromoteApplied() {
    var isValid = true;

    for (var index = 0; index < seriesInstanceUIDs.length; index++) {
      var seriesInstanceUIDStr = seriesInstanceUIDs[index];
      var resultSeries = arrayToInspect[index];

      if (!resultSeries || resultSeries.SeriesInstanceUID !== seriesInstanceUIDStr) {
        isValid = false;
        break;
      }
    }

    return isValid;
  };

  var _study$series = study.series,
      series = _study$series === void 0 ? [] : _study$series,
      _study$displaySets = study.displaySets,
      displaySets = _study$displaySets === void 0 ? [] : _study$displaySets;
  var arrayToInspect = isFilterStrategy ? series : displaySets;
  var validateMethod = isFilterStrategy ? validateFilterApplied : validatePromoteApplied;

  if (!arrayToInspect) {
    applied = false;
  } else {
    applied = validateMethod();
  }

  return applied;
};

var _showUserMessage = function _showUserMessage(queryParamApplied, message) {
  var dialog = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (queryParamApplied) {
    return;
  }

  var _dialog$show = dialog.show,
      showUserMessage = _dialog$show === void 0 ? function () {} : _dialog$show;
  showUserMessage({
    message: message
  });
};

var ViewerRetrieveStudyData_addSeriesToStudy = function _addSeriesToStudy(studyMetadata, series) {
  var sopClassHandlerModules = App["c" /* extensionManager */].modules['sopClassHandlerModule'];
  var study = studyMetadata.getData();
  var seriesMetadata = new OHIFSeriesMetadata(series, study);
  var existingSeries = studyMetadata.getSeriesByUID(series.SeriesInstanceUID);

  if (existingSeries) {
    studyMetadata.updateSeries(series.SeriesInstanceUID, seriesMetadata);
  } else {
    studyMetadata.addSeries(seriesMetadata);
  }

  studyMetadata.createAndAddDisplaySetsForSeries(sopClassHandlerModules, seriesMetadata);
  study.displaySets = studyMetadata.getDisplaySets();
  study.derivedDisplaySets = studyMetadata.getDerivedDatasets({
    Modality: series.Modality
  });

  _updateStudyMetadataManager(study, studyMetadata);
};

var _updateStudyMetadataManager = function _updateStudyMetadataManager(study, studyMetadata) {
  var StudyInstanceUID = study.StudyInstanceUID;

  if (!studyMetadataManager.get(StudyInstanceUID)) {
    studyMetadataManager.add(studyMetadata);
  }
};

var ViewerRetrieveStudyData_updateStudyDisplaySets = function _updateStudyDisplaySets(study, studyMetadata) {
  console.log("_updateStudyDisplaySets");
  console.log(study);
  console.log(studyMetadata);
  var sopClassHandlerModules = App["c" /* extensionManager */].modules['sopClassHandlerModule'];

  if (!study.displaySets) {
    study.displaySets = studyMetadata.createDisplaySets(sopClassHandlerModules); // returns [] for our layout study
  }

  if (study.derivedDisplaySets) {
    studyMetadata._addDerivedDisplaySets(study.derivedDisplaySets);
  }
};

var _thinStudyData = function _thinStudyData(study) {
  return {
    StudyInstanceUID: study.StudyInstanceUID,
    series: study.series.map(function (item) {
      return {
        SeriesInstanceUID: item.SeriesInstanceUID
      };
    })
  };
};

function ViewerRetrieveStudyData(_ref) {
  var server = _ref.server,
      studyInstanceUIDs = _ref.studyInstanceUIDs,
      seriesInstanceUIDs = _ref.seriesInstanceUIDs,
      clearViewportSpecificData = _ref.clearViewportSpecificData,
      setStudyData = _ref.setStudyData,
      patientID = _ref.patientID;

  // hooks
  var _useState = Object(react["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = Object(react["useState"])([]),
      _useState4 = _slicedToArray(_useState3, 2),
      studies = _useState4[0],
      setStudies = _useState4[1];

  var _useState5 = Object(react["useState"])(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isStudyLoaded = _useState6[0],
      setIsStudyLoaded = _useState6[1];

  var refreshVar = Object(react["useState"])(false);
  var snackbarContext = Object(src["K" /* useSnackbarContext */])();

  var _useContext = Object(react["useContext"])(AppContext["c" /* default */]),
      _useContext$appConfig = _useContext.appConfig,
      appConfig = _useContext$appConfig === void 0 ? {} : _useContext$appConfig;

  var _appConfig$filterQuer = appConfig.filterQueryParam,
      isFilterStrategy = _appConfig$filterQuer === void 0 ? false : _appConfig$filterQuer,
      maxConcurrentMetadataRequests = appConfig.maxConcurrentMetadataRequests;
  console.log("ViewerRetrieveStudyData()");
  console.log(studyInstanceUIDs);
  var cancelableSeriesPromises;
  var cancelableStudiesPromises;
  /**
   * Callback method when study is totally loaded
   * @param {object} study study loaded
   * @param {object} studyMetadata studyMetadata for given study
   * @param {Object} [filters] - Object containing filters to be applied
   * @param {string} [filter.seriesInstanceUID] - series instance uid to filter results against
   */

  var studyDidLoad = function studyDidLoad(study, studyMetadata, filters) {
    // User message
    var promoted = _promoteList(study, studyMetadata, filters, isFilterStrategy); // Clear viewport to allow new promoted one to be displayed


    if (promoted) {
      clearViewportSpecificData(0);
    }

    var isQueryParamApplied = _isQueryParamApplied(study, filters, isFilterStrategy); // Show message in case not promoted neither filtered but should to


    _showUserMessage(isQueryParamApplied, 'Query parameters were not totally applied. It might be using original series list for given study.', snackbarContext);

    setStudies([].concat(_toConsumableArray(studies), [study]));
    setIsStudyLoaded(true);
  };
  /**
   * Method to process studies. It will update displaySet, studyMetadata, load remaining series, ...
   * @param {Array} studiesData Array of studies retrieved from server
   * @param {Object} [filters] - Object containing filters to be applied
   * @param {string} [filters.seriesInstanceUID] - series instance uid to filter results against
   */


  var processStudies = function processStudies(studiesData, filters) {
    console.log("processStudies");
    console.log(studiesData);

    if (Array.isArray(studiesData) && studiesData.length > 0) {
      // Map studies to new format, update metadata manager?
      var studiesData_ = studiesData.filter(function (study) {
        return study !== null;
      });

      var _studies = studiesData_.map(function (study) {
        setStudyData(study.StudyInstanceUID, _thinStudyData(study));
        var studyMetadata = new OHIFStudyMetadata(study, study.StudyInstanceUID);

        ViewerRetrieveStudyData_updateStudyDisplaySets(study, studyMetadata);

        _updateStudyMetadataManager(study, studyMetadata); // Attempt to load remaning series if any


        cancelableSeriesPromises[study.StudyInstanceUID] = makeCancelable(loadRemainingSeries(studyMetadata)).then(function (result) {
          if (result && !result.isCanceled) {
            studyDidLoad(study, studyMetadata, filters);
          }
        }).catch(function (error) {
          if (error && !error.isCanceled) {
            setError(error);
            log["a" /* default */].error(error);
          }
        });
        return study;
      });

      setStudies(_studies);
    }
  };

  var forceRerender = function forceRerender() {
    return setStudies(function (studies) {
      return _toConsumableArray(studies);
    });
  };

  var loadRemainingSeries =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(studyMetadata) {
      var _studyMetadata$getDat, seriesLoader, loadNextSeries, concurrentRequestsAllowed, promises;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _studyMetadata$getDat = studyMetadata.getData(), seriesLoader = _studyMetadata$getDat.seriesLoader;

              if (seriesLoader) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return");

            case 3:
              loadNextSeries =
              /*#__PURE__*/
              function () {
                var _ref3 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  var series;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (seriesLoader.hasNext()) {
                            _context.next = 2;
                            break;
                          }

                          return _context.abrupt("return");

                        case 2:
                          _context.next = 4;
                          return seriesLoader.next();

                        case 4:
                          series = _context.sent;

                          ViewerRetrieveStudyData_addSeriesToStudy(studyMetadata, series);

                          forceRerender();
                          return _context.abrupt("return", loadNextSeries());

                        case 8:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function loadNextSeries() {
                  return _ref3.apply(this, arguments);
                };
              }();

              concurrentRequestsAllowed = maxConcurrentMetadataRequests || studyMetadata.getSeriesCount();
              promises = Array(concurrentRequestsAllowed).fill(null).map(loadNextSeries);
              _context2.next = 8;
              return Promise.all(promises);

            case 8:
              return _context2.abrupt("return", _context2.sent);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function loadRemainingSeries(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var loadStudies =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var filters, seriesInstanceUID, retrieveParams, separateUIDFilters;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log("loadStudies()");

              try {
                filters = {}; // Use the first, discard others

                seriesInstanceUID = seriesInstanceUIDs && seriesInstanceUIDs[0];
                retrieveParams = [server, studyInstanceUIDs];

                if (seriesInstanceUID) {
                  filters.seriesInstanceUID = seriesInstanceUID; // Query param filtering controlled by appConfig property

                  if (isFilterStrategy) {
                    retrieveParams.push(filters);
                  }
                }

                separateUIDFilters = appConfig.splitQueryParameterCalls || appConfig.enableGoogleCloudAdapter;
                retrieveParams.push(separateUIDFilters); // Seperate SeriesInstanceUID filter calls.

                console.log("refresh param:");
                console.log(refreshVar[0]);
                retrieveParams.push(refreshVar[0]);
                cancelableStudiesPromises[studyInstanceUIDs] = makeCancelable(retrieveStudiesMetadata.apply(void 0, retrieveParams)).then(function (result) {
                  if (result && !result.isCanceled) {
                    processStudies(result, filters);
                  }
                }).catch(function (error) {
                  if (error && !error.isCanceled) {
                    setError(error);
                    log["a" /* default */].error(error);
                  }
                });
              } catch (error) {
                if (error) {
                  setError(error);
                  log["a" /* default */].error(error);
                }
              }

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function loadStudies() {
      return _ref4.apply(this, arguments);
    };
  }();

  var purgeCancellablePromises = Object(react["useCallback"])(function () {
    for (var _studyInstanceUIDs in cancelableStudiesPromises) {
      if ('cancel' in cancelableStudiesPromises[_studyInstanceUIDs]) {
        cancelableStudiesPromises[_studyInstanceUIDs].cancel();
      }
    }

    for (var _studyInstanceUIDs2 in cancelableSeriesPromises) {
      if ('cancel' in cancelableSeriesPromises[_studyInstanceUIDs2]) {
        cancelableSeriesPromises[_studyInstanceUIDs2].cancel();

        deleteStudyMetadataPromise(_studyInstanceUIDs2);
        studyMetadataManager.remove(_studyInstanceUIDs2);
      }
    }
  });
  var prevStudyInstanceUIDs = Object(usePrevious["a" /* default */])(studyInstanceUIDs);
  var reloadStudies = refreshVar[0] || !(prevStudyInstanceUIDs && prevStudyInstanceUIDs.every(function (e) {
    return studyInstanceUIDs.includes(e);
  }) && studyInstanceUIDs.every(function (e) {
    return prevStudyInstanceUIDs.includes(e);
  }));
  console.log("RELOAD STUDIES: ");
  console.log(reloadStudies);
  console.log(refreshVar[0]);
  Object(react["useEffect"])(function () {
    if (reloadStudies) {
      studyMetadataManager.purge();
      purgeCancellablePromises();
    }
  }, [refreshVar[0], prevStudyInstanceUIDs, purgeCancellablePromises, studyInstanceUIDs]);
  Object(react["useEffect"])(function () {
    if (reloadStudies) {
      refreshVar[0] = false;
      cancelableSeriesPromises = {};
      cancelableStudiesPromises = {};
      loadStudies();
      return function () {
        purgeCancellablePromises();
      };
    }
  }, [refreshVar[0], studyInstanceUIDs]);

  if (error) {
    var content = JSON.stringify(error);

    if (content.includes('404') || content.includes('NOT_FOUND')) {
      return react_default.a.createElement(NotFound["a" /* default */], null);
    }

    return react_default.a.createElement(NotFound["a" /* default */], {
      message: "Failed to retrieve study data"
    });
  }

  return react_default.a.createElement(ConnectedViewer["a" /* default */], {
    studies: studies,
    isStudyLoaded: isStudyLoaded,
    studyInstanceUIDs: studyInstanceUIDs,
    patientID: patientID,
    afterUpload: function afterUpload() {
      console.log("AFTER UPLOAD");
      refreshVar[1](true);
    }
  });
}

ViewerRetrieveStudyData.propTypes = {
  studyInstanceUIDs: prop_types_default.a.array.isRequired,
  seriesInstanceUIDs: prop_types_default.a.array,
  server: prop_types_default.a.object,
  clearViewportSpecificData: prop_types_default.a.func.isRequired,
  setStudyData: prop_types_default.a.func.isRequired
};
/* harmony default export */ var connectedComponents_ViewerRetrieveStudyData = (ViewerRetrieveStudyData);
// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/platform/core/src/index.js + 28 modules
var core_src = __webpack_require__(16);

// CONCATENATED MODULE: ./connectedComponents/ConnectedViewerRetrieveStudyData.js



var _OHIF$redux$actions = core_src["b" /* default */].redux.actions,
    _clearViewportSpecificData = _OHIF$redux$actions.clearViewportSpecificData,
    _setStudyData = _OHIF$redux$actions.setStudyData;

var isActive = function isActive(a) {
  return a.active === true;
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var activeServer = state.servers.servers.find(isActive);
  console.log("mapStateToProps for ConnectedViewerRetrieveStudyData");
  console.log(state.studies.studyData);
  var studyInstanceUIDs = Object.keys(state.studies.studyData);
  return {
    server: ownProps.server || activeServer,
    studyInstanceUIDs: studyInstanceUIDs
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setStudyData: function setStudyData(StudyInstanceUID, data) {
      dispatch(_setStudyData(StudyInstanceUID, data));
    },
    clearViewportSpecificData: function clearViewportSpecificData() {
      dispatch(_clearViewportSpecificData());
    }
  };
};

var ConnectedViewerRetrieveStudyData = Object(es["b" /* connect */])(mapStateToProps, mapDispatchToProps)(connectedComponents_ViewerRetrieveStudyData);
/* harmony default export */ var connectedComponents_ConnectedViewerRetrieveStudyData = __webpack_exports__["a"] = (ConnectedViewerRetrieveStudyData);

/***/ }),

/***/ 1023:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useServer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _googleCloud_api_GoogleCloudApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1014);
/* harmony import */ var _usePrevious__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1013);
/* harmony import */ var _googleCloud_utils_getServers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1024);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(58);
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(225);
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_isequal__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _context_AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(76);





 // Contexts



var getActiveServer = function getActiveServer(servers) {
  var isActive = function isActive(a) {
    return a.active === true;
  };

  return servers && servers.servers && servers.servers.find(isActive);
};

var getServers = function getServers(appConfig, project, location, dataset, dicomStore) {
  var servers = [];

  if (appConfig.enableGoogleCloudAdapter) {
    _googleCloud_api_GoogleCloudApi__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].urlBase = appConfig.healthcareApiEndpoint;
    var pathUrl = _googleCloud_api_GoogleCloudApi__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getUrlBaseDicomWeb(project, location, dataset, dicomStore);
    var data = {
      project: project,
      location: location,
      dataset: dataset,
      dicomStore: dicomStore,
      wadoUriRoot: pathUrl,
      qidoRoot: pathUrl,
      wadoRoot: pathUrl
    };
    servers = _googleCloud_utils_getServers__WEBPACK_IMPORTED_MODULE_3__[/* getServers */ "a"](data, dicomStore);

    if (!isValidServer(servers[0], appConfig)) {
      return;
    }
  }

  return servers;
};

var isValidServer = function isValidServer(server, appConfig) {
  if (appConfig.enableGoogleCloudAdapter) {
    return _googleCloud_utils_getServers__WEBPACK_IMPORTED_MODULE_3__[/* isValidServer */ "c"](server);
  }

  return !!server;
};

var setServers = function setServers(dispatch, servers) {
  var action = {
    type: 'SET_SERVERS',
    servers: servers
  };
  dispatch(action);
};

var useServerFromUrl = function useServerFromUrl() {
  var servers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var previousServers = arguments.length > 1 ? arguments[1] : undefined;
  var activeServer = arguments.length > 2 ? arguments[2] : undefined;
  var urlBasedServers = arguments.length > 3 ? arguments[3] : undefined;
  var appConfig = arguments.length > 4 ? arguments[4] : undefined;
  var project = arguments.length > 5 ? arguments[5] : undefined;
  var location = arguments.length > 6 ? arguments[6] : undefined;
  var dataset = arguments.length > 7 ? arguments[7] : undefined;
  var dicomStore = arguments.length > 8 ? arguments[8] : undefined;

  // update state from url available only when gcloud on
  if (!appConfig.enableGoogleCloudAdapter) {
    return false;
  }

  var serverHasChanged = previousServers !== servers && previousServers; // do not update from url. use state instead.

  if (serverHasChanged) {
    return false;
  } // if no valid urlbased servers


  if (!urlBasedServers || !urlBasedServers.length) {
    return false;
  } else if (!servers.length || !activeServer) {
    // no current valid server
    return true;
  }

  var newServer = urlBasedServers[0];
  var exists = servers.some(_googleCloud_utils_getServers__WEBPACK_IMPORTED_MODULE_3__[/* isEqualServer */ "b"].bind(undefined, newServer));
  return !exists;
};

function useServer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      project = _ref.project,
      location = _ref.location,
      dataset = _ref.dataset,
      dicomStore = _ref.dicomStore;

  // Hooks
  var servers = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[/* useSelector */ "d"])(function (state) {
    return state && state.servers;
  });
  var previousServers = Object(_usePrevious__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(servers);
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[/* useDispatch */ "c"])();

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_AppContext__WEBPACK_IMPORTED_MODULE_6__[/* default */ "c"]),
      _useContext$appConfig = _useContext.appConfig,
      appConfig = _useContext$appConfig === void 0 ? {} : _useContext$appConfig;

  var activeServer = getActiveServer(servers);
  var urlBasedServers = getServers(appConfig, project, location, dataset, dicomStore) || [];
  var shouldUpdateServer = useServerFromUrl(servers.servers, previousServers, activeServer, urlBasedServers, appConfig, project, location, dataset, dicomStore);

  if (shouldUpdateServer) {
    setServers(dispatch, urlBasedServers);
  } else if (isValidServer(activeServer, appConfig)) {
    return activeServer;
  }
}

/***/ }),

/***/ 1024:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getServers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isValidServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isEqualServer; });
var getServers = function getServers(data, name) {
  var wadoUriRoot = data.wadoUriRoot,
      qidoRoot = data.qidoRoot,
      wadoRoot = data.wadoRoot,
      _data$dataset = data.dataset,
      dataset = _data$dataset === void 0 ? '' : _data$dataset,
      _data$dicomStore = data.dicomStore,
      dicomStore = _data$dicomStore === void 0 ? '' : _data$dicomStore,
      _data$location = data.location,
      location = _data$location === void 0 ? '' : _data$location,
      _data$project = data.project,
      project = _data$project === void 0 ? '' : _data$project;
  return [{
    name: name,
    dataset: dataset,
    dicomStore: dicomStore,
    location: location,
    project: project,
    imageRendering: 'wadors',
    thumbnailRendering: 'wadors',
    type: 'dicomWeb',
    active: true,
    wadoUriRoot: wadoUriRoot,
    qidoRoot: qidoRoot,
    wadoRoot: wadoRoot,
    supportsFuzzyMatching: false,
    qidoSupportsIncludeField: false
  }];
};

var isValidServer = function isValidServer(server) {
  return server && !!server.dataset && !!server.dicomStore && !!server.location && !!server.project;
};

var isEqualServer = function isEqualServer() {
  var server = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var toCompare = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var serverLength = Object.keys(server).length;
  var toCompareLength = Object.keys(toCompare).length;

  if (!serverLength || !toCompareLength) {
    return false;
  }

  return server.dataset === toCompare.dataset && server.dataset === toCompare.dataset && server.dicomStore === toCompare.dicomStore && server.location === toCompare.location && server.project === toCompare.project;
};



/***/ }),

/***/ 1038:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(75);

/**
 * hook that builds on useLocation to parse
 * the query string for you.
 *
 * @name useQuery
 */

/* harmony default export */ __webpack_exports__["a"] = (function () {
  return new URLSearchParams(Object(react_router_dom__WEBPACK_IMPORTED_MODULE_0__[/* useLocation */ "f"])().search);
});

/***/ })

}]);