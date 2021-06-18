(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ 1020:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/react-redux/es/index.js + 21 modules
var es = __webpack_require__(58);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/prop-types/index.js
var prop_types = __webpack_require__(1);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/classnames/index.js
var classnames = __webpack_require__(17);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/platform/core/src/index.js + 28 modules
var src = __webpack_require__(16);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/platform/core/src/DICOMSR/index.js + 8 modules
var DICOMSR = __webpack_require__(241);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/platform/core/src/extensions/MODULE_TYPES.js
var MODULE_TYPES = __webpack_require__(608);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/platform/ui/src/index.js + 123 modules
var ui_src = __webpack_require__(13);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/jpeg-js/index.js
var jpeg_js = __webpack_require__(1044);
var jpeg_js_default = /*#__PURE__*/__webpack_require__.n(jpeg_js);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/moment/moment.js
var moment = __webpack_require__(6);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/react-i18next/dist/es/index.js + 9 modules
var dist_es = __webpack_require__(34);

// EXTERNAL MODULE: ./connectedComponents/ToolbarRow.css
var connectedComponents_ToolbarRow = __webpack_require__(1049);

// EXTERNAL MODULE: ./App.js + 31 modules
var App = __webpack_require__(252);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/cornerstone-tools/dist/cornerstoneTools.js
var cornerstoneTools = __webpack_require__(7);
var cornerstoneTools_default = /*#__PURE__*/__webpack_require__.n(cornerstoneTools);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/lodash.clonedeep/index.js
var lodash_clonedeep = __webpack_require__(30);
var lodash_clonedeep_default = /*#__PURE__*/__webpack_require__.n(lodash_clonedeep);

// CONCATENATED MODULE: ./connectedComponents/ConnectedCineDialog.js




 // Our target output kills the `as` and "import" throws a keyword error
// import { import as toolImport, getToolState } from 'cornerstone-tools';


var toolImport = cornerstoneTools_default.a.import;
var scrollToIndex = toolImport('util/scrollToIndex');
var setViewportSpecificData = src["b" /* default */].redux.actions.setViewportSpecificData; // Why do I need or care about any of this info?
// A dispatch action should be able to pull this at the time of an event?
// `isPlaying` and `cineFrameRate` might matter, but I think we can prop pass for those.

var ConnectedCineDialog_mapStateToProps = function mapStateToProps(state) {
  // Get activeViewport's `cine` and `stack`
  var _state$viewports = state.viewports,
      viewportSpecificData = _state$viewports.viewportSpecificData,
      activeViewportIndex = _state$viewports.activeViewportIndex;

  var _ref = viewportSpecificData[activeViewportIndex] || {},
      cine = _ref.cine;

  var dom = App["a" /* commandsManager */].runCommand('getActiveViewportEnabledElement');
  var cineData = cine || {
    isPlaying: false,
    cineFrameRate: 24
  }; // New props we're creating?

  return {
    activeEnabledElement: dom,
    activeViewportCineData: cineData,
    activeViewportIndex: state.viewports.activeViewportIndex
  };
};

var ConnectedCineDialog_mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchSetViewportSpecificData: function dispatchSetViewportSpecificData(viewportIndex, data) {
      dispatch(setViewportSpecificData(viewportIndex, data));
    }
  };
};

var ConnectedCineDialog_mergeProps = function mergeProps(propsFromState, propsFromDispatch, ownProps) {
  var activeEnabledElement = propsFromState.activeEnabledElement,
      activeViewportCineData = propsFromState.activeViewportCineData,
      activeViewportIndex = propsFromState.activeViewportIndex;
  return {
    cineFrameRate: activeViewportCineData.cineFrameRate,
    isPlaying: activeViewportCineData.isPlaying,
    onPlayPauseChanged: function onPlayPauseChanged(isPlaying) {
      var cine = lodash_clonedeep_default()(activeViewportCineData);
      cine.isPlaying = !cine.isPlaying;
      propsFromDispatch.dispatchSetViewportSpecificData(activeViewportIndex, {
        cine: cine
      });
    },
    onFrameRateChanged: function onFrameRateChanged(frameRate) {
      var cine = lodash_clonedeep_default()(activeViewportCineData);
      cine.cineFrameRate = frameRate;
      propsFromDispatch.dispatchSetViewportSpecificData(activeViewportIndex, {
        cine: cine
      });
    },
    onClickNextButton: function onClickNextButton() {
      var stackData = cornerstoneTools_default.a.getToolState(activeEnabledElement, 'stack');
      if (!stackData || !stackData.data || !stackData.data.length) return;
      var _stackData$data$ = stackData.data[0],
          currentImageIdIndex = _stackData$data$.currentImageIdIndex,
          imageIds = _stackData$data$.imageIds;
      if (currentImageIdIndex >= imageIds.length - 1) return;
      scrollToIndex(activeEnabledElement, currentImageIdIndex + 1);
    },
    onClickBackButton: function onClickBackButton() {
      var stackData = cornerstoneTools_default.a.getToolState(activeEnabledElement, 'stack');
      if (!stackData || !stackData.data || !stackData.data.length) return;
      var currentImageIdIndex = stackData.data[0].currentImageIdIndex;
      if (currentImageIdIndex === 0) return;
      scrollToIndex(activeEnabledElement, currentImageIdIndex - 1);
    },
    onClickSkipToStart: function onClickSkipToStart() {
      var stackData = cornerstoneTools_default.a.getToolState(activeEnabledElement, 'stack');
      if (!stackData || !stackData.data || !stackData.data.length) return;
      scrollToIndex(activeEnabledElement, 0);
    },
    onClickSkipToEnd: function onClickSkipToEnd() {
      var stackData = cornerstoneTools_default.a.getToolState(activeEnabledElement, 'stack');
      if (!stackData || !stackData.data || !stackData.data.length) return;
      var lastIndex = stackData.data[0].imageIds.length - 1;
      scrollToIndex(activeEnabledElement, lastIndex);
    }
  };
};

var ConnectedCineDialog = Object(es["b" /* connect */])(ConnectedCineDialog_mapStateToProps, ConnectedCineDialog_mapDispatchToProps, ConnectedCineDialog_mergeProps)(ui_src["b" /* CineDialog */]);
/* harmony default export */ var connectedComponents_ConnectedCineDialog = (ConnectedCineDialog);
// CONCATENATED MODULE: ./connectedComponents/ConnectedLayoutButton.js



var _OHIF$redux$actions = src["b" /* default */].redux.actions,
    setLayout = _OHIF$redux$actions.setLayout,
    setViewportActive = _OHIF$redux$actions.setViewportActive;

var ConnectedLayoutButton_mapStateToProps = function mapStateToProps(state) {
  return {
    currentLayout: state.viewports.layout,
    activeViewportIndex: state.viewports.activeViewportIndex
  };
};

var ConnectedLayoutButton_mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    // TODO: Change if layout switched becomes more complex
    onChange: function onChange(selectedCell, currentLayout, activeViewportIndex) {
      var viewports = [];
      var numRows = selectedCell.row + 1;
      var numColumns = selectedCell.col + 1;
      var numViewports = numRows * numColumns;

      for (var i = 0; i < numViewports; i++) {
        // Hacky way to allow users to exit MPR "mode"
        var viewport = currentLayout.viewports[i];
        var plugin = viewport && viewport.plugin;

        if (viewport && viewport.vtk) {
          plugin = 'cornerstone';
        }

        viewports.push({
          plugin: plugin
        });
      }

      var layout = {
        numRows: numRows,
        numColumns: numColumns,
        viewports: viewports
      };
      var maxActiveIndex = numViewports - 1;

      if (activeViewportIndex > maxActiveIndex) {
        dispatch(setViewportActive(0));
      }

      dispatch(setLayout(layout));
    }
  };
};

var ConnectedLayoutButton_mergeProps = function mergeProps(propsFromState, propsFromDispatch) {
  var onChangeFromDispatch = propsFromDispatch.onChange;
  var currentLayout = propsFromState.currentLayout,
      activeViewportIndex = propsFromState.activeViewportIndex;
  return {
    onChange: function onChange(selectedCell) {
      return onChangeFromDispatch(selectedCell, currentLayout, activeViewportIndex);
    }
  };
};

var ConnectedLayoutButton = Object(es["b" /* connect */])(ConnectedLayoutButton_mapStateToProps, ConnectedLayoutButton_mapDispatchToProps, ConnectedLayoutButton_mergeProps)(ui_src["i" /* LayoutButton */]);
/* harmony default export */ var connectedComponents_ConnectedLayoutButton = (ConnectedLayoutButton);
// EXTERNAL MODULE: ./context/AppContext.js
var AppContext = __webpack_require__(76);

// CONCATENATED MODULE: ./connectedComponents/ToolbarRow.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












var ToolbarRow_ToolbarRow =
/*#__PURE__*/
function (_Component) {
  _inherits(ToolbarRow, _Component);

  // TODO: Simplify these? isOpen can be computed if we say "any" value for selected,
  // closed if selected is null/undefined
  function ToolbarRow(props) {
    var _this2;

    _classCallCheck(this, ToolbarRow);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ToolbarRow).call(this, props));

    _defineProperty(_assertThisInitialized(_this2), "closeCineDialogIfNotApplicable", function () {
      var dialog = _this2.props.dialog;
      var _this2$state = _this2.state,
          dialogId = _this2$state.dialogId,
          activeButtons = _this2$state.activeButtons,
          toolbarButtons = _this2$state.toolbarButtons;

      if (dialogId) {
        var cineButtonPresent = toolbarButtons.find(function (button) {
          return button.options && button.options.behavior === 'CINE';
        });

        if (!cineButtonPresent) {
          dialog.dismiss({
            id: dialogId
          });
          activeButtons = activeButtons.filter(function (button) {
            return button.options && button.options.behavior !== 'CINE';
          });

          _this2.setState({
            dialogId: null,
            activeButtons: activeButtons
          });
        }
      }
    });

    var toolbarButtonDefinitions = _getVisibleToolbarButtons.call(_assertThisInitialized(_this2)); // TODO:
    // If it's a tool that can be active... Mark it as active?
    // - Tools that are on/off?
    // - Tools that can be bound to multiple buttons?
    // Normal ToolbarButtons...
    // Just how high do we need to hoist this state?
    // Why ToolbarRow instead of just Toolbar? Do we have any others?


    _this2.state = {
      toolbarButtons: toolbarButtonDefinitions,
      activeButtons: []
    };
    _this2.seriesPerStudyCount = [];
    _this2._handleBuiltIn = _handleBuiltIn.bind(_assertThisInitialized(_this2));

    _this2.updateButtonGroups();

    return _this2;
  }

  _createClass(ToolbarRow, [{
    key: "updateButtonGroups",
    value: function updateButtonGroups() {
      var _this3 = this;

      var panelModules = App["c" /* extensionManager */].modules[MODULE_TYPES["a" /* default */].PANEL];
      this.buttonGroups = {
        left: [],
        right: []
      }; // ~ FIND MENU OPTIONS

      panelModules.forEach(function (panelExtension) {
        var panelModule = panelExtension.module;
        var defaultContexts = Array.from(panelModule.defaultContext);
        panelModule.menuOptions.forEach(function (menuOption) {
          var contexts = Array.from(menuOption.context || defaultContexts);

          var hasActiveContext = _this3.props.activeContexts.some(function (actx) {
            return contexts.includes(actx);
          }); // It's a bit beefy to pass studies; probably only need to be reactive on `studyInstanceUIDs` and activeViewport?
          // Note: This does not cleanly handle `studies` prop updating with panel open


          var isDisabled = typeof menuOption.isDisabled === 'function' && menuOption.isDisabled(_this3.props.studies, _this3.props.activeViewport);

          if (hasActiveContext && !isDisabled) {
            var menuOptionEntry = {
              value: menuOption.target,
              icon: menuOption.icon,
              bottomLabel: menuOption.label
            };
            var from = menuOption.from || 'right';

            _this3.buttonGroups[from].push(menuOptionEntry);
          }
        });
      }); // TODO: This should come from extensions, instead of being baked in

      this.buttonGroups.left.unshift({
        value: 'studies',
        icon: 'th-large',
        bottomLabel: this.props.t('Series')
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var activeContextsChanged = prevProps.activeContexts !== this.props.activeContexts;
      var prevStudies = prevProps.studies;
      var prevActiveViewport = prevProps.activeViewport;
      var activeViewport = this.props.activeViewport;
      var studies = this.props.studies;
      var seriesPerStudyCount = this.seriesPerStudyCount;
      var shouldUpdate = false;

      if (prevStudies.length !== studies.length || prevActiveViewport !== activeViewport) {
        shouldUpdate = true;
      } else {
        for (var i = 0; i < studies.length; i++) {
          if (studies[i].series.length !== seriesPerStudyCount[i]) {
            seriesPerStudyCount[i] = studies[i].series.length;
            shouldUpdate = true;
            break;
          }
        }
      }

      if (shouldUpdate) {
        this.updateButtonGroups();
      }

      if (activeContextsChanged) {
        this.setState({
          toolbarButtons: _getVisibleToolbarButtons.call(this)
        }, this.closeCineDialogIfNotApplicable);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var buttonComponents = _getButtonComponents.call(this, this.state.toolbarButtons, this.state.activeButtons);

      var onPress = function onPress(side, value) {
        _this4.props.handleSidePanelChange(side, value);
      };

      var onPressLeft = onPress.bind(this, 'left');
      var onPressRight = onPress.bind(this, 'right');
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
        className: "ToolbarRow"
      }, react_default.a.createElement("div", {
        className: "pull-left m-t-1 p-y-1",
        style: {
          padding: '10px'
        }
      }, react_default.a.createElement(ui_src["q" /* RoundedButtonGroup */], {
        options: this.buttonGroups.left,
        value: this.props.selectedLeftSidePanel || '',
        onValueChanged: onPressLeft
      })), react_default.a.createElement(ui_src["C" /* ToolbarButton */], {
        label: "New study",
        icon: "th",
        isActive: true,
        onClick: this.props.handleNewStudy
      }), buttonComponents, this.props.studies.length > 0 && react_default.a.createElement(ui_src["C" /* ToolbarButton */], {
        label: this.props.maximized ? 'Minimize' : 'Maximize',
        icon: "maximize",
        isActive: this.props.studies.length > 0,
        onClick: this.props.handleMaximize
      }), this.props.studies.length > 0 && react_default.a.createElement(ui_src["C" /* ToolbarButton */], {
        label: "Upload image",
        icon: "create-screen-capture",
        isActive: this.props.studies.length > 0,
        onClick: this.props.handleUpload
      }), react_default.a.createElement("div", {
        className: "pull-right m-t-1 rm-x-1",
        style: {
          marginLeft: 'auto'
        }
      }, this.buttonGroups.right.length && react_default.a.createElement(ui_src["q" /* RoundedButtonGroup */], {
        options: this.buttonGroups.right,
        value: this.props.selectedRightSidePanel || '',
        onValueChanged: onPressRight
      }))));
    }
  }]);

  return ToolbarRow;
}(react["Component"]);

_defineProperty(ToolbarRow_ToolbarRow, "propTypes", {
  isLeftSidePanelOpen: prop_types_default.a.bool.isRequired,
  isRightSidePanelOpen: prop_types_default.a.bool.isRequired,
  selectedLeftSidePanel: prop_types_default.a.string.isRequired,
  selectedRightSidePanel: prop_types_default.a.string.isRequired,
  handleSidePanelChange: prop_types_default.a.func.isRequired,
  handleMaximize: prop_types_default.a.func.isRequired,
  handleNewStudy: prop_types_default.a.func.isRequired,
  handleUpload: prop_types_default.a.func.isRequired,
  activeContexts: prop_types_default.a.arrayOf(prop_types_default.a.string).isRequired,
  studies: prop_types_default.a.array,
  t: prop_types_default.a.func.isRequired,
  // NOTE: withDialog, withModal HOCs
  dialog: prop_types_default.a.any,
  modal: prop_types_default.a.any,
  maximized: prop_types_default.a.bool.isRequired
});

_defineProperty(ToolbarRow_ToolbarRow, "defaultProps", {
  studies: []
});

function _getCustomButtonComponent(button, activeButtons) {
  var CustomComponent = button.CustomComponent;
  var isValidComponent = typeof CustomComponent === 'function'; // Check if its a valid customComponent. Later on an CustomToolbarComponent interface could be implemented.

  if (isValidComponent) {
    var parentContext = this;
    var activeButtonsIds = activeButtons.map(function (button) {
      return button.id;
    });
    var isActive = activeButtonsIds.includes(button.id);
    return react_default.a.createElement(CustomComponent, {
      parentContext: parentContext,
      toolbarClickCallback: _handleToolbarButtonClick.bind(this),
      button: button,
      key: button.id,
      activeButtons: activeButtonsIds,
      isActive: isActive
    });
  }
}

function _getExpandableButtonComponent(button, activeButtons) {
  var _this5 = this;

  // Iterate over button definitions and update `onClick` behavior
  var activeCommand;
  var childButtons = button.buttons.map(function (childButton) {
    childButton.onClick = _handleToolbarButtonClick.bind(_this5, childButton);

    if (activeButtons.map(function (button) {
      return button.id;
    }).indexOf(childButton.id) > -1) {
      activeCommand = childButton.id;
    }

    return childButton;
  });
  return react_default.a.createElement(ui_src["g" /* ExpandableToolMenu */], {
    key: button.id,
    label: button.label,
    icon: button.icon,
    buttons: childButtons,
    activeCommand: activeCommand
  });
}

function _getDefaultButtonComponent(button, activeButtons) {
  return react_default.a.createElement(ui_src["C" /* ToolbarButton */], {
    key: button.id,
    label: button.label,
    icon: button.icon,
    onClick: _handleToolbarButtonClick.bind(this, button),
    isActive: activeButtons.map(function (button) {
      return button.id;
    }).includes(button.id)
  });
}
/**
 * Determine which extension buttons should be showing, if they're
 * active, and what their onClick behavior should be.
 */


function _getButtonComponents(toolbarButtons, activeButtons) {
  var _this = this;

  return toolbarButtons.map(function (button) {
    var hasCustomComponent = button.CustomComponent;
    var hasNestedButtonDefinitions = button.buttons && button.buttons.length;

    if (hasCustomComponent) {
      return _getCustomButtonComponent.call(_this, button, activeButtons);
    }

    if (hasNestedButtonDefinitions) {
      return _getExpandableButtonComponent.call(_this, button, activeButtons);
    }

    return _getDefaultButtonComponent.call(_this, button, activeButtons);
  });
}
/**
 * TODO: DEPRECATE
 * This is used exclusively in `extensions/cornerstone/src`
 * We have better ways with new UI Services to trigger "builtin" behaviors
 *
 * A handy way for us to handle different button types. IE. firing commands for
 * buttons, or initiation built in behavior.
 *
 * @param {*} button
 * @param {*} evt
 * @param {*} props
 */


function _handleToolbarButtonClick(button, evt, props) {
  var activeButtons = this.state.activeButtons;

  if (button.commandName) {
    var options = Object.assign({
      evt: evt
    }, button.commandOptions);
    App["a" /* commandsManager */].runCommand(button.commandName, options);
  } // TODO: Use Types ENUM
  // TODO: We can update this to be a `getter` on the extension to query
  //       For the active tools after we apply our updates?


  if (button.type === 'setToolActive') {
    var toggables = activeButtons.filter(function (_ref) {
      var options = _ref.options;
      return options && !options.togglable;
    });
    this.setState({
      activeButtons: [].concat(_toConsumableArray(toggables), [button])
    });
  } else if (button.type === 'builtIn') {
    this._handleBuiltIn(button);
  }
}
/**
 *
 */


function _getVisibleToolbarButtons() {
  var _this6 = this;

  var toolbarModules = App["c" /* extensionManager */].modules[MODULE_TYPES["a" /* default */].TOOLBAR];
  var toolbarButtonDefinitions = [];
  toolbarModules.forEach(function (extension) {
    var _extension$module = extension.module,
        definitions = _extension$module.definitions,
        defaultContext = _extension$module.defaultContext;
    definitions.forEach(function (definition) {
      var context = definition.context || defaultContext;

      if (_this6.props.activeContexts.includes(context)) {
        toolbarButtonDefinitions.push(definition);
      }
    });
  });
  return toolbarButtonDefinitions;
}

function _handleBuiltIn(button) {
  /* TODO: Keep cine button active until its unselected. */
  var _this$props = this.props,
      dialog = _this$props.dialog,
      t = _this$props.t;
  var dialogId = this.state.dialogId;
  var id = button.id,
      options = button.options;

  if (options.behavior === 'CINE') {
    if (dialogId) {
      dialog.dismiss({
        id: dialogId
      });
      this.setState(function (state) {
        return {
          dialogId: null,
          activeButtons: _toConsumableArray(state.activeButtons.filter(function (button) {
            return button.id !== id;
          }))
        };
      });
    } else {
      var spacing = 20;

      var _document$querySelect = document.querySelector(".ViewerMain").getBoundingClientRect(),
          x = _document$querySelect.x,
          y = _document$querySelect.y;

      var newDialogId = dialog.create({
        content: connectedComponents_ConnectedCineDialog,
        defaultPosition: {
          x: x + spacing || 0,
          y: y + spacing || 0
        }
      });
      this.setState(function (state) {
        return {
          dialogId: newDialogId,
          activeButtons: [].concat(_toConsumableArray(state.activeButtons), [button])
        };
      });
    }
  }

  if (options.behavior === 'DOWNLOAD_SCREEN_SHOT') {
    App["a" /* commandsManager */].runCommand('showDownloadViewportModal', {
      title: t('Download High Quality Image')
    });
  }
}

/* harmony default export */ var connectedComponents_ToolbarRow_0 = (Object(dist_es["d" /* withTranslation */])(['Common', 'ViewportDownloadForm'])(Object(ui_src["M" /* withModal */])(Object(ui_src["L" /* withDialog */])(Object(AppContext["e" /* withAppContext */])(ToolbarRow_ToolbarRow)))));
// CONCATENATED MODULE: ./connectedComponents/findDisplaySetByUID.js
/**
 * Finds displaySet by UID across all displaySets inside studyMetadata
 * @param {Array} studyMetadata
 * @param {string} displaySetInstanceUID
 */
function findDisplaySetByUID(studyMetadata, displaySetInstanceUID) {
  if (!Array.isArray(studyMetadata)) return null;
  var allDisplaySets = studyMetadata.reduce(function (all, current) {
    var currentDisplaySet = [];

    if (current && Array.isArray(current.displaySets)) {
      currentDisplaySet = current.displaySets;
    }

    return all.concat(currentDisplaySet);
  }, []);

  var bySetInstanceUID = function bySetInstanceUID(ds) {
    return ds.displaySetInstanceUID === displaySetInstanceUID;
  };

  var displaySet = allDisplaySets.find(bySetInstanceUID);
  return displaySet || null;
}
// EXTERNAL MODULE: ./connectedComponents/makeLayout.js
var makeLayout = __webpack_require__(1021);

// CONCATENATED MODULE: ./connectedComponents/ConnectedStudyBrowser.js






var studyMetadataManager = src["a" /* OHIF */].utils.studyMetadataManager;
var ConnectedStudyBrowser_OHIF$redux$actions = src["a" /* OHIF */].redux.actions,
    clearViewportSpecificData = ConnectedStudyBrowser_OHIF$redux$actions.clearViewportSpecificData,
    setActiveViewportSpecificData = ConnectedStudyBrowser_OHIF$redux$actions.setActiveViewportSpecificData,
    setViewportLayoutAndData = ConnectedStudyBrowser_OHIF$redux$actions.setViewportLayoutAndData,
    setActiveSeries = ConnectedStudyBrowser_OHIF$redux$actions.setActiveSeries; // TODO
// - Determine in which display set is active from Redux (activeViewportIndex and layout viewportData)
// - Pass in errors and stack loading progress from Redux

var ConnectedStudyBrowser_mapStateToProps = function mapStateToProps(state, ownProps) {
  // If we know that the stack loading progress details have changed,
  // we can try to update the component state so that the thumbnail
  // progress bar is updated
  var stackLoadingProgressMap = state.loading.progress;
  var studiesWithLoadingData = lodash_clonedeep_default()(ownProps.studies);
  studiesWithLoadingData.forEach(function (study) {
    study.thumbnails.forEach(function (data) {
      var displaySetInstanceUID = data.displaySetInstanceUID;
      var stackId = "StackProgress:".concat(displaySetInstanceUID);
      var stackProgressData = stackLoadingProgressMap[stackId];
      var stackPercentComplete = 0;

      if (stackProgressData) {
        stackPercentComplete = stackProgressData.percentComplete;
      }

      data.stackPercentComplete = stackPercentComplete;
    });
  });
  console.log("MAPPING");
  console.log(state.studies.activeSeries);
  return {
    studies: studiesWithLoadingData,
    activeSeries: state.studies.activeSeries
  };
};

var ConnectedStudyBrowser_mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onThumbnailClick: function onThumbnailClick(displaySetInstanceUID, seriesInstanceUID) {
      var stuff = Object(makeLayout["a" /* default */])(ownProps.studyMetadata, seriesInstanceUID);
      console.log("mapping onThumbnailClick to layout state update: ");
      console.log(stuff.layout);
      dispatch(setViewportLayoutAndData(stuff.layout, stuff.data));
      dispatch(setActiveSeries(seriesInstanceUID));
      /*
      var displaySets = [];
      var numFrames = 0;
      for (var i=0; i<ownProps.studyMetadata.length; i++) {
        var study = ownProps.studyMetadata[i];
        for (var j=0; j<study.displaySets.length; j++) {
          var set = study.displaySets[j];
          if (set.SeriesInstanceUID === seriesInstanceUID) {
            displaySets.push(set);
            if (!set.Maximized) numFrames++;
          }
        }
      }
       var numRows = 2;
      var numColumns = 2;
       if (numFrames == 1) {
        numRows = 1;
        numColumns = 1;
      } else if (numFrames == 2) {
        numRows = 1;
        numColumns = 2;
      } else if (numFrames == 3) {
        numRows = 1;
        numColumns = 3;
      } else if (numFrames == 4) {
        numRows = 2;
        numColumns = 2;
      } else if (numFrames == 5) {
        numRows = 2;
        numColumns = 3;
      } else if (numFrames == 6) {
        numRows = 2;
        numColumns = 3;
      } else if (numFrames == 7) {
        numRows = 2;
        numColumns = 4;
      } else if (numFrames == 8) {
        numRows = 2;
        numColumns = 4;
      } else if (numFrames == 9) {
        numRows = 3;
        numColumns = 3;
      } else if (numFrames == 10) {
        numRows = 3;
        numColumns = 4;
      }
       var viewports = [];
      for (var i=0; i<numFrames; i++) {
        viewports.push({plugin: "cornerstone"});
      }
       dispatch(setViewportLayoutAndData(
        {numRows: numRows, numColumns: numColumns, viewports: viewports},
        displaySets
      ));
      dispatch(setActiveSeries(seriesInstanceUID));
      */
    }
  };
};

var ConnectedStudyBrowser = Object(es["b" /* connect */])(ConnectedStudyBrowser_mapStateToProps, ConnectedStudyBrowser_mapDispatchToProps)(ui_src["w" /* StudyBrowser */]);
/* harmony default export */ var connectedComponents_ConnectedStudyBrowser = (ConnectedStudyBrowser);
// EXTERNAL MODULE: ./connectedComponents/ViewerMain.css
var connectedComponents_ViewerMain = __webpack_require__(1050);

// EXTERNAL MODULE: ./components/DentalGrid/ViewportGrid.css
var DentalGrid_ViewportGrid = __webpack_require__(1051);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/platform/core/src/utils/index.js + 15 modules
var utils = __webpack_require__(133);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/react-dnd/dist/esm/index.js + 31 modules
var esm = __webpack_require__(192);

// EXTERNAL MODULE: ./components/DentalGrid/ViewportPane.css
var DentalGrid_ViewportPane = __webpack_require__(1052);

// CONCATENATED MODULE: ./components/DentalGrid/ViewportPane.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var ViewportPane_ViewportPane = function ViewportPane(props) {
  console.log("ViewportPane render");
  var children = props.children,
      onDrop = props.onDrop,
      _onClick = props.onClick,
      viewportIndex = props.viewportIndex,
      propClassName = props.className;

  var _useDrop = Object(esm["d" /* useDrop */])({
    accept: 'thumbnail',
    drop: function drop(droppedItem, monitor) {
      var canDrop = monitor.canDrop();
      var isOver = monitor.isOver();

      if (canDrop && isOver && onDrop) {
        var StudyInstanceUID = droppedItem.StudyInstanceUID,
            displaySetInstanceUID = droppedItem.displaySetInstanceUID;
        onDrop({
          viewportIndex: viewportIndex,
          StudyInstanceUID: StudyInstanceUID,
          displaySetInstanceUID: displaySetInstanceUID
        });
      }
    },
    // Monitor, and collect props.
    // Returned as values by `useDrop`
    collect: function collect(monitor) {
      return {
        highlighted: monitor.canDrop(),
        hovered: monitor.isOver()
      };
    }
  }),
      _useDrop2 = _slicedToArray(_useDrop, 2),
      _useDrop2$ = _useDrop2[0],
      hovered = _useDrop2$.hovered,
      highlighted = _useDrop2$.highlighted,
      drop = _useDrop2[1];

  return react_default.a.createElement("div", {
    className: classnames_default()('viewport-drop-target', {
      hovered: hovered
    }, {
      highlighted: highlighted
    }, propClassName),
    ref: drop,
    "data-cy": "viewport-container-".concat(viewportIndex),
    onClick: function onClick(ev) {
      return _onClick(viewportIndex);
    },
    style: {
      position: 'static',
      left: props.pos.x1 * 100 + '%',
      top: props.pos.y1 * 100 + '%',
      width: (props.pos.x2 - props.pos.x1) * 100 + '%',
      height: (props.pos.y1 - props.pos.y2) * 100 + '%'
    }
  }, children);
};

ViewportPane_ViewportPane.propTypes = {
  children: prop_types_default.a.node.isRequired,
  viewportIndex: prop_types_default.a.number.isRequired,
  onDrop: prop_types_default.a.func.isRequired,
  onClick: prop_types_default.a.func.isRequired,
  className: prop_types_default.a.string,
  pos: prop_types_default.a.object.isRequired
};
/* harmony default export */ var components_DentalGrid_ViewportPane = (ViewportPane_ViewportPane);
// CONCATENATED MODULE: ./components/DentalGrid/DefaultViewport.js
/**
 *
 *
 * @export
 * @param {*} props
 * @returns
 */
function DefaultViewport(props) {
  return React.createElement("div", null, JSON.stringify(props));
}
// EXTERNAL MODULE: ./components/DentalGrid/EmptyViewport.js
var EmptyViewport = __webpack_require__(1053);
var EmptyViewport_default = /*#__PURE__*/__webpack_require__.n(EmptyViewport);

// CONCATENATED MODULE: ./components/DentalGrid/ViewportGrid.js






 //




var loadAndCacheDerivedDisplaySets = utils["a" /* default */].loadAndCacheDerivedDisplaySets;

var ViewportGrid_ViewportGrid = function ViewportGrid(props) {
  var activeViewportIndex = props.activeViewportIndex,
      availablePlugins = props.availablePlugins,
      defaultPluginName = props.defaultPlugin,
      layout = props.layout,
      setViewportData = props.setViewportData,
      studies = props.studies,
      viewportData = props.viewportData,
      children = props.children,
      isStudyLoaded = props.isStudyLoaded,
      maximized = props.maximized,
      onSetActiveViewport = props.onSetActiveViewport;
  console.log("RENDER ViewportGrid");
  console.log(layout);
  /*
  const displaySet = viewportData[0];
   if (displaySet) {
    var numFrames = displaySet.numImageFrames;
    displaySet.frameIndex = 0;
     // try to find clones of display set in studies
    // use them to fill up grid (viewport data)
    var j = 1;
    studies.forEach(study => {
      study.displaySets.forEach(set => {
        if (set.clonedUID && set.clonedUID === displaySet.displaySetInstanceUID) {
          set.frameIndex = j; // reset index if it was changed by user
          viewportData[j] = set;
          j++;
        }
      });
    });
     // if we did not find any clone, make clones
    if (j == 1) {
      for (var i=1; i<numFrames; i++) {
        //layout.viewports.push({});
        var ds = cloneDeep(displaySet);
        ds.frameIndex = i;
        ds.displaySetInstanceUID = utils.guid();
        ds.clonedUID = displaySet.displaySetInstanceUID;
        viewportData[i] = ds;
      }
       // find study with this display set
      var relevantStudy;
      var relevantDisplaySet;
      studies.forEach(study => {
        study.displaySets.forEach(set => {
          if (set.displaySetInstanceUID === displaySet.displaySetInstanceUID) {
            relevantStudy = study;
            relevantDisplaySet = set;
          }
        });
      });
       // if found, add the cloned display sets
      if (relevantStudy) {
        for (var k=1; k < numFrames; k++) {
          var ds = viewportData[k];
          ds.images = relevantDisplaySet.images;
          relevantStudy.displaySets.push(ds);
        }
      }
    }
  }
  */

  /*
  const effectiveNumRows = maximized ? 1 : numRows;
  const effectiveNumColumns = maximized ? 1 : numColumns;
   const rowSize = 100 / effectiveNumRows;
  const colSize = 100 / effectiveNumColumns;
   console.log("EFFETIVE NUM ROWS");
  console.log(effectiveNumRows);
  console.log(rowSize);
  */
  // http://grid.malven.co/

  if (!viewportData || !viewportData.length) {
    return null;
  }

  var snackbar = Object(ui_src["K" /* useSnackbarContext */])();
  Object(react["useEffect"])(function () {
    if (isStudyLoaded) {
      viewportData.forEach(function (displaySet) {
        var promises = loadAndCacheDerivedDisplaySets(displaySet, studies);
        promises.forEach(function (promise) {
          promise.catch(function (error) {
            snackbar.show({
              title: 'Error loading derived display set:',
              message: error.message,
              type: 'error',
              error: error,
              autoClose: false
            });
          });
        });
      });
    }
  }, [studies, viewportData, isStudyLoaded, snackbar]);

  var getMaximizedViewportPane = function getMaximizedViewportPane(layout, viewportIndex) {
    var displaySet = viewportData[viewportIndex];

    for (var i = 0; i < viewportData.length; i++) {
      var set = viewportData[i];

      if (set.Maximized) {
        displaySet = set;
        break;
      }
    }

    set.frameIndex = viewportIndex;

    if (!displaySet) {
      return null;
    }

    var data = {
      displaySet: displaySet,
      studies: studies
    }; // JAMES TODO:
    // Use whichever plugin is currently in use in the panel
    // unless nothing is specified. If nothing is specified
    // and the display set has a plugin specified, use that.
    //
    // TODO: Change this logic to:
    // - Plugins define how capable they are of displaying a SopClass
    // - When updating a panel, ensure that the currently enabled plugin
    // in the viewport is capable of rendering this display set. If not
    // then use the most capable available plugin

    var pluginName = !layout.plugin && displaySet && displaySet.plugin ? displaySet.plugin : layout.plugin;

    var ViewportComponent = _getViewportComponent(data, // Why do we pass this as `ViewportData`, when that's not really what it is?
    viewportIndex, children, availablePlugins, pluginName, defaultPluginName);

    return react_default.a.createElement(components_DentalGrid_ViewportPane, {
      onDrop: setViewportData,
      onClick: function onClick() {
        return null;
      },
      viewportIndex: viewportIndex // Needed by `setViewportData`
      ,
      className: classnames_default()('viewport-container', {
        active: activeViewportIndex === viewportIndex
      }),
      key: viewportIndex,
      pos: {
        x1: 0,
        y1: 1,
        x2: 1,
        y2: 0
      }
    }, ViewportComponent);
  };

  var getViewportPane = function getViewportPane(layout, viewportIndex) {
    var displaySet = viewportData[viewportIndex];

    if (!displaySet) {
      console.log("NO DISPLAY SET - RETURNING EARLY");
      return null;
    }

    var data = {
      displaySet: displaySet,
      studies: studies
    }; // JAMES TODO:
    // Use whichever plugin is currently in use in the panel
    // unless nothing is specified. If nothing is specified
    // and the display set has a plugin specified, use that.
    //
    // TODO: Change this logic to:
    // - Plugins define how capable they are of displaying a SopClass
    // - When updating a panel, ensure that the currently enabled plugin
    // in the viewport is capable of rendering this display set. If not
    // then use the most capable available plugin

    var pluginName = !layout.plugin && displaySet && displaySet.plugin ? displaySet.plugin : layout.plugin;

    var ViewportComponent = _getViewportComponent(data, // Why do we pass this as `ViewportData`, when that's not really what it is?
    viewportIndex, children, availablePlugins, pluginName, defaultPluginName);

    return react_default.a.createElement(components_DentalGrid_ViewportPane, {
      onDrop: setViewportData,
      onClick: onSetActiveViewport,
      viewportIndex: viewportIndex // Needed by `setViewportData`
      ,
      className: classnames_default()('viewport-container', {
        active: activeViewportIndex === viewportIndex
      }),
      key: viewportIndex,
      pos: layout.pos
    }, ViewportComponent);
  };

  var getViewportPanes = function getViewportPanes() {
    if (maximized) {
      return [getMaximizedViewportPane(layout, activeViewportIndex)];
    } else {
      return layout.viewports.map(function (layout, idx) {
        return getViewportPane(layout, idx);
      });
    }
  };
  /*
  const ViewportPanes = React.useMemo(getViewportPanes, [
    layout,
    viewportData,
    studies,
    children,
    availablePlugins,
    defaultPluginName,
    setViewportData,
    activeViewportIndex,
    maximized
  ]);
  */


  var ViewportPanes = getViewportPanes();
  return react_default.a.createElement("div", {
    "data-cy": "viewprt-grid",
    style: {
      display: 'block',
      //display: 'grid',
      //gridTemplateRows: `repeat(${effectiveNumRows}, ${rowSize}%)`,
      //gridTemplateColumns: `repeat(${effectiveNumColumns}, ${colSize}%)`,
      height: '100%',
      width: '100%'
    }
  }, ViewportPanes);
};

ViewportGrid_ViewportGrid.propTypes = {
  viewportData: prop_types_default.a.array.isRequired,
  supportsDrop: prop_types_default.a.bool.isRequired,
  activeViewportIndex: prop_types_default.a.number.isRequired,
  layout: prop_types_default.a.object.isRequired,
  availablePlugins: prop_types_default.a.object.isRequired,
  setViewportData: prop_types_default.a.func.isRequired,
  studies: prop_types_default.a.array,
  children: prop_types_default.a.node,
  defaultPlugin: prop_types_default.a.string,
  maximized: prop_types_default.a.bool.isRequired
};
ViewportGrid_ViewportGrid.defaultProps = {
  viewportData: [],
  layout: {
    viewports: [{}]
  },
  activeViewportIndex: 0,
  supportsDrop: true,
  availablePlugins: {
    DefaultViewport: DefaultViewport
  },
  defaultPlugin: 'defaultViewportPlugin',
  maximized: false
};
/**
 *
 *
 * @param {*} plugin
 * @param {*} viewportData
 * @param {*} viewportIndex
 * @param {*} children
 * @returns
 */

function _getViewportComponent(viewportData, viewportIndex, children, availablePlugins, pluginName, defaultPluginName) {
  if (viewportData.displaySet) {
    pluginName = pluginName || defaultPluginName;
    var ViewportComponent = availablePlugins[pluginName];

    if (!ViewportComponent) {
      throw new Error("No Viewport Component available for name ".concat(pluginName, ".\n         Available plugins: ").concat(JSON.stringify(availablePlugins)));
    }

    return react_default.a.createElement(ViewportComponent, {
      viewportData: viewportData,
      viewportIndex: viewportIndex,
      children: [children]
    });
  }

  return react_default.a.createElement(EmptyViewport_default.a, null);
}

/* harmony default export */ var components_DentalGrid_ViewportGrid = (ViewportGrid_ViewportGrid);
// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/lodash/memoize.js
var memoize = __webpack_require__(633);
var memoize_default = /*#__PURE__*/__webpack_require__.n(memoize);

// CONCATENATED MODULE: ./components/DentalGrid/ConnectedViewportGrid.js






var ConnectedViewportGrid_setViewportActive = src["b" /* default */].redux.actions.setViewportActive;
var getAvailableViewportModules = memoize_default()(function (viewportModules) {
  var availableViewportModules = {};
  viewportModules.forEach(function (moduleDefinition) {
    availableViewportModules[moduleDefinition.extensionId] = moduleDefinition.module;
  });
  return availableViewportModules;
});

var ConnectedViewportGrid_mapStateToProps = function mapStateToProps(state) {
  var viewportModules = App["c" /* extensionManager */].modules[MODULE_TYPES["a" /* default */].VIEWPORT];
  var availableViewportModules = getAvailableViewportModules(viewportModules); // TODO: Use something like state.plugins.defaultPlugin[MODULE_TYPES.VIEWPORT]

  var defaultPlugin;

  if (viewportModules.length) {
    defaultPlugin = viewportModules[0].extensionId;
  }

  var _state$viewports = state.viewports,
      layout = _state$viewports.layout,
      activeViewportIndex = _state$viewports.activeViewportIndex;
  console.log("layout mapping from state to ViewportGrid:");
  console.log(layout);
  return {
    layout: layout,
    activeViewportIndex: activeViewportIndex,
    // TODO: rename `availableViewportModules`
    availablePlugins: availableViewportModules,
    // TODO: rename `defaultViewportModule`
    defaultPlugin: defaultPlugin
  };
};

var ConnectedViewportGrid_mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSetActiveViewport: function onSetActiveViewport(index) {
      dispatch(ConnectedViewportGrid_setViewportActive(index));
    }
  };
};

var ConnectedViewportGrid = Object(es["b" /* connect */])(ConnectedViewportGrid_mapStateToProps, ConnectedViewportGrid_mapDispatchToProps)(components_DentalGrid_ViewportGrid);
/* harmony default export */ var DentalGrid_ConnectedViewportGrid = (ConnectedViewportGrid);
// CONCATENATED MODULE: ./components/DentalGrid/index.js


/* harmony default export */ var DentalGrid = (components_DentalGrid_ViewportGrid);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/lodash/values.js
var values = __webpack_require__(1054);
var values_default = /*#__PURE__*/__webpack_require__.n(values);

// CONCATENATED MODULE: ./connectedComponents/ViewerMain.js
function ViewerMain_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ViewerMain_typeof = function _typeof(obj) { return typeof obj; }; } else { ViewerMain_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ViewerMain_typeof(obj); }

function ViewerMain_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ViewerMain_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ViewerMain_createClass(Constructor, protoProps, staticProps) { if (protoProps) ViewerMain_defineProperties(Constructor.prototype, protoProps); if (staticProps) ViewerMain_defineProperties(Constructor, staticProps); return Constructor; }

function ViewerMain_possibleConstructorReturn(self, call) { if (call && (ViewerMain_typeof(call) === "object" || typeof call === "function")) { return call; } return ViewerMain_assertThisInitialized(self); }

function ViewerMain_getPrototypeOf(o) { ViewerMain_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ViewerMain_getPrototypeOf(o); }

function ViewerMain_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ViewerMain_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ViewerMain_setPrototypeOf(subClass, superClass); }

function ViewerMain_setPrototypeOf(o, p) { ViewerMain_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ViewerMain_setPrototypeOf(o, p); }

function ViewerMain_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var ViewerMain_values = memoize_default()(values_default.a);

var ViewerMain_ViewerMain =
/*#__PURE__*/
function (_Component) {
  ViewerMain_inherits(ViewerMain, _Component);

  function ViewerMain(props) {
    var _this;

    ViewerMain_classCallCheck(this, ViewerMain);

    _this = ViewerMain_possibleConstructorReturn(this, ViewerMain_getPrototypeOf(ViewerMain).call(this, props));

    ViewerMain_defineProperty(ViewerMain_assertThisInitialized(_this), "fillEmptyViewportPanes", function () {
      // TODO: Here is the entry point for filling viewports on load.
      var dirtyViewportPanes = [];
      var _this$props = _this.props,
          layout = _this$props.layout,
          viewportSpecificData = _this$props.viewportSpecificData;
      var displaySets = _this.state.displaySets;

      if (!displaySets || !displaySets.length) {
        return;
      }

      for (var i = 0; i < layout.viewports.length; i++) {
        var viewportPane = viewportSpecificData[i];
        var isNonEmptyViewport = viewportPane && viewportPane.StudyInstanceUID && viewportPane.displaySetInstanceUID;

        if (isNonEmptyViewport) {
          dirtyViewportPanes.push({
            StudyInstanceUID: viewportPane.StudyInstanceUID,
            displaySetInstanceUID: viewportPane.displaySetInstanceUID
          });
          continue;
        }

        var foundDisplaySet = displaySets.find(function (ds) {
          return !dirtyViewportPanes.some(function (v) {
            return v.displaySetInstanceUID === ds.displaySetInstanceUID;
          });
        }) || displaySets[displaySets.length - 1];
        dirtyViewportPanes.push(foundDisplaySet);
      }

      dirtyViewportPanes.forEach(function (vp, i) {
        if (vp && vp.StudyInstanceUID) {
          _this.setViewportData({
            viewportIndex: i,
            StudyInstanceUID: vp.StudyInstanceUID,
            displaySetInstanceUID: vp.displaySetInstanceUID
          });
        }
      });
    });

    ViewerMain_defineProperty(ViewerMain_assertThisInitialized(_this), "setViewportData", function (_ref) {
      var viewportIndex = _ref.viewportIndex,
          StudyInstanceUID = _ref.StudyInstanceUID,
          displaySetInstanceUID = _ref.displaySetInstanceUID;

      var displaySet = _this.findDisplaySet(_this.props.studies, StudyInstanceUID, displaySetInstanceUID);

      if (displaySet) {
        if (displaySet.isDerived) {
          var _displaySet = displaySet,
              Modality = _displaySet.Modality;
          displaySet = displaySet.getSourceDisplaySet(_this.props.studies);

          if (!displaySet) {
            throw new Error("Referenced series for ".concat(Modality, " dataset not present."));
          }
        }

        _this.props.setViewportSpecificData(viewportIndex, displaySet);
      }
    });

    _this.state = {
      displaySets: []
    };
    return _this;
  }

  ViewerMain_createClass(ViewerMain, [{
    key: "getDisplaySets",
    value: function getDisplaySets(studies) {
      if (!studies || studies.length == 0) return [];
      var study = studies[0];
      if (!study.displaySets || study.displaySets.length == 0) return [];
      var seriesNumber = study.displaySets[0].SeriesNumber;
      var displaySets = [];
      study.displaySets.forEach(function (dSet) {
        if (dSet.SeriesNumber === seriesNumber) {
          if (!dSet.plugin) {
            dSet.plugin = 'cornerstone';
          }

          displaySets.push(dSet);
        }
      });
      return displaySets;
    }
  }, {
    key: "findDisplaySet",
    value: function findDisplaySet(studies, StudyInstanceUID, displaySetInstanceUID) {
      var study = studies.find(function (study) {
        return study.StudyInstanceUID === StudyInstanceUID;
      });

      if (!study) {
        return;
      }

      return study.displaySets.find(function (displaySet) {
        return displaySet.displaySetInstanceUID === displaySetInstanceUID;
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // Add beforeUnload event handler to check for unsaved changes
      //window.addEventListener('beforeunload', unloadHandlers.beforeUnload);
      // Get all the display sets for the viewer studies
      if (this.props.studies) {
        var displaySets = this.getDisplaySets(this.props.studies);
        this.setState({
          displaySets: displaySets
        }, this.fillEmptyViewportPanes);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevViewportAmount = prevProps.layout.viewports.length;
      var viewportAmount = this.props.layout.viewports.length;
      var isVtk = this.props.layout.viewports.some(function (vp) {
        return !!vp.vtk;
      });

      if (this.props.studies !== prevProps.studies || viewportAmount !== prevViewportAmount && !isVtk) {
        var displaySets = this.getDisplaySets(this.props.studies);
        this.setState({
          displaySets: displaySets
        }, this.fillEmptyViewportPanes);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var viewportSpecificData = this.props.viewportSpecificData;
      var viewportData = ViewerMain_values(viewportSpecificData);
      return react_default.a.createElement("div", {
        className: "ViewerMain"
      }, this.state.displaySets.length && react_default.a.createElement(DentalGrid_ConnectedViewportGrid, {
        isStudyLoaded: this.props.isStudyLoaded,
        studies: this.props.studies,
        viewportData: viewportData,
        setViewportData: this.setViewportData,
        maximized: this.props.maximized
      }));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this2 = this;

      // Clear the entire viewport specific data
      var viewportSpecificData = this.props.viewportSpecificData;
      Object.keys(viewportSpecificData).forEach(function (viewportIndex) {
        _this2.props.clearViewportSpecificData(viewportIndex);
      }); // TODO: These don't have to be viewer specific?
      // Could qualify for other routes?
      // hotkeys.destroy();
      // Remove beforeUnload event handler...
      //window.removeEventListener('beforeunload', unloadHandlers.beforeUnload);
      // Destroy the synchronizer used to update reference lines
      //OHIF.viewer.updateImageSynchronizer.destroy();
      // TODO: Instruct all plugins to clean up themselves
      //
      // Clear references to all stacks in the StackManager
      //StackManager.clearStacks();
      // @TypeSafeStudies
      // Clears OHIF.viewer.Studies collection
      //OHIF.viewer.Studies.removeAll();
      // @TypeSafeStudies
      // Clears OHIF.viewer.StudyMetadataList collection
      //OHIF.viewer.StudyMetadataList.removeAll();
    }
  }]);

  return ViewerMain;
}(react["Component"]);

ViewerMain_defineProperty(ViewerMain_ViewerMain, "propTypes", {
  activeViewportIndex: prop_types_default.a.number.isRequired,
  studies: prop_types_default.a.array,
  viewportSpecificData: prop_types_default.a.object.isRequired,
  layout: prop_types_default.a.object.isRequired,
  setViewportSpecificData: prop_types_default.a.func.isRequired,
  clearViewportSpecificData: prop_types_default.a.func.isRequired,
  maximized: prop_types_default.a.bool.isRequired
});

/* harmony default export */ var connectedComponents_ViewerMain_0 = (ViewerMain_ViewerMain);
// CONCATENATED MODULE: ./connectedComponents/ConnectedViewerMain.js



var ConnectedViewerMain_OHIF$redux$actions = src["b" /* default */].redux.actions,
    _setViewportSpecificData = ConnectedViewerMain_OHIF$redux$actions.setViewportSpecificData,
    _clearViewportSpecificData = ConnectedViewerMain_OHIF$redux$actions.clearViewportSpecificData;

var ConnectedViewerMain_mapStateToProps = function mapStateToProps(state) {
  var _state$viewports = state.viewports,
      activeViewportIndex = _state$viewports.activeViewportIndex,
      layout = _state$viewports.layout,
      viewportSpecificData = _state$viewports.viewportSpecificData,
      maximized = _state$viewports.maximized;
  return {
    activeViewportIndex: activeViewportIndex,
    layout: layout,
    viewportSpecificData: viewportSpecificData,
    viewports: state.viewports,
    maximized: maximized
  };
};

var ConnectedViewerMain_mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setViewportSpecificData: function setViewportSpecificData(viewportIndex, data) {
      dispatch(_setViewportSpecificData(viewportIndex, data));
    },
    clearViewportSpecificData: function clearViewportSpecificData() {
      dispatch(_clearViewportSpecificData());
    }
  };
};

var ConnectedViewerMain = Object(es["b" /* connect */])(ConnectedViewerMain_mapStateToProps, ConnectedViewerMain_mapDispatchToProps)(connectedComponents_ViewerMain_0);
/* harmony default export */ var connectedComponents_ConnectedViewerMain = (ConnectedViewerMain);
// EXTERNAL MODULE: ./components/SidePanel.css
var components_SidePanel = __webpack_require__(1056);

// CONCATENATED MODULE: ./components/SidePanel.js





var SidePanel_SidePanel = function SidePanel(_ref) {
  var from = _ref.from,
      isOpen = _ref.isOpen,
      children = _ref.children,
      width = _ref.width;
  var fromSideClass = from === 'right' ? 'from-right' : 'from-left';
  var styles = width ? {
    maxWidth: width,
    marginRight: isOpen ? '0' : Number.parseInt(width) * -1
  } : {};
  return react_default.a.createElement("section", {
    style: styles,
    className: classnames_default()('sidepanel', fromSideClass, {
      'is-open': isOpen
    })
  }, children);
};

SidePanel_SidePanel.propTypes = {
  from: prop_types_default.a.string.isRequired,
  isOpen: prop_types_default.a.bool.isRequired,
  children: prop_types_default.a.node,
  width: prop_types_default.a.string
};
/* harmony default export */ var components_SidePanel_0 = (SidePanel_SidePanel);
// EXTERNAL MODULE: ./components/ErrorBoundaryDialog/ErrorBoundaryDialog.css
var ErrorBoundaryDialog_ErrorBoundaryDialog = __webpack_require__(1057);

// CONCATENATED MODULE: ./components/ErrorBoundaryDialog/ErrorBoundaryDialog.js
function ErrorBoundaryDialog_slicedToArray(arr, i) { return ErrorBoundaryDialog_arrayWithHoles(arr) || ErrorBoundaryDialog_iterableToArrayLimit(arr, i) || ErrorBoundaryDialog_nonIterableRest(); }

function ErrorBoundaryDialog_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function ErrorBoundaryDialog_iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function ErrorBoundaryDialog_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var UIModalService = App["d" /* servicesManager */].services.UIModalService;

var ErrorBoundaryDialog_ErrorBoundaryDialog_ErrorBoundaryDialog = function ErrorBoundaryDialog(_ref) {
  var context = _ref.context,
      children = _ref.children;

  var handleOnError = function handleOnError(error, componentStack) {
    var ErrorDialog = function ErrorDialog() {
      var _useState = Object(react["useState"])(false),
          _useState2 = ErrorBoundaryDialog_slicedToArray(_useState, 2),
          open = _useState2[0],
          setOpen = _useState2[1];

      return react_default.a.createElement("div", {
        className: "ErrorFallback",
        role: "alert"
      }, react_default.a.createElement("div", {
        className: "ErrorBoundaryDialog"
      }, react_default.a.createElement("h3", {
        className: "ErrorBoundaryDialogTitle"
      }, context, ": ", react_default.a.createElement("span", null, error.message))), react_default.a.createElement("button", {
        className: "btn btn-primary btn-sm ErrorBoundaryDialogButton",
        onClick: function onClick() {
          return setOpen(function (s) {
            return !s;
          });
        }
      }, react_default.a.createElement(ui_src["h" /* Icon */], {
        name: "chevron-down",
        className: classnames_default()('ErrorBoundaryDialogIcon', {
          opened: open
        })
      }), "Stack Trace"), open && react_default.a.createElement("pre", null, componentStack));
    };

    UIModalService.show({
      content: ErrorDialog,
      title: "Something went wrong in ".concat(context)
    });
  };

  var fallbackComponent = function fallbackComponent() {
    return react_default.a.createElement("div", {
      className: "ErrorFallback",
      role: "alert"
    }, react_default.a.createElement("p", null, "Error rendering ", context, ". ", react_default.a.createElement("br", null), " Check the browser console for more details."));
  };

  return react_default.a.createElement(ui_src["e" /* ErrorBoundary */], {
    fallbackComponent: fallbackComponent,
    context: context,
    onError: handleOnError
  }, children);
};

ErrorBoundaryDialog_ErrorBoundaryDialog_ErrorBoundaryDialog.propTypes = {
  context: prop_types_default.a.string.isRequired,
  children: prop_types_default.a.node.isRequired
};
/* harmony default export */ var components_ErrorBoundaryDialog_ErrorBoundaryDialog = (ErrorBoundaryDialog_ErrorBoundaryDialog_ErrorBoundaryDialog);
// CONCATENATED MODULE: ./components/ErrorBoundaryDialog/index.js

/* harmony default export */ var components_ErrorBoundaryDialog = (components_ErrorBoundaryDialog_ErrorBoundaryDialog);
// EXTERNAL MODULE: ./components/SimpleDialog/SimpleDialog.js
var SimpleDialog = __webpack_require__(492);

// EXTERNAL MODULE: ./components/LayoutPickerDialog/LayoutPickerDialog.css
var LayoutPickerDialog_LayoutPickerDialog = __webpack_require__(1058);

// CONCATENATED MODULE: ./components/LayoutPickerDialog/LayoutPickerDialog.js
function LayoutPickerDialog_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { LayoutPickerDialog_typeof = function _typeof(obj) { return typeof obj; }; } else { LayoutPickerDialog_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return LayoutPickerDialog_typeof(obj); }

function LayoutPickerDialog_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function LayoutPickerDialog_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function LayoutPickerDialog_createClass(Constructor, protoProps, staticProps) { if (protoProps) LayoutPickerDialog_defineProperties(Constructor.prototype, protoProps); if (staticProps) LayoutPickerDialog_defineProperties(Constructor, staticProps); return Constructor; }

function LayoutPickerDialog_possibleConstructorReturn(self, call) { if (call && (LayoutPickerDialog_typeof(call) === "object" || typeof call === "function")) { return call; } return LayoutPickerDialog_assertThisInitialized(self); }

function LayoutPickerDialog_getPrototypeOf(o) { LayoutPickerDialog_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return LayoutPickerDialog_getPrototypeOf(o); }

function LayoutPickerDialog_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function LayoutPickerDialog_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) LayoutPickerDialog_setPrototypeOf(subClass, superClass); }

function LayoutPickerDialog_setPrototypeOf(o, p) { LayoutPickerDialog_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return LayoutPickerDialog_setPrototypeOf(o, p); }

function LayoutPickerDialog_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var LayoutPickerDialog_LayoutPickerDialog_LayoutPickerDialog =
/*#__PURE__*/
function (_Component) {
  LayoutPickerDialog_inherits(LayoutPickerDialog, _Component);

  function LayoutPickerDialog(props) {
    var _this;

    LayoutPickerDialog_classCallCheck(this, LayoutPickerDialog);

    _this = LayoutPickerDialog_possibleConstructorReturn(this, LayoutPickerDialog_getPrototypeOf(LayoutPickerDialog).call(this, props));

    LayoutPickerDialog_defineProperty(LayoutPickerDialog_assertThisInitialized(_this), "onClose", function () {
      _this.props.onCancel();
    });

    LayoutPickerDialog_defineProperty(LayoutPickerDialog_assertThisInitialized(_this), "onConfirm", function (e) {
      e.preventDefault();
      var layout = _this.state.pick < 0 ? null : _this.state.layouts[_this.state.pick];

      _this.props.onConfirm(layout);
    });

    _this.state = {
      layouts: ['Panoramic', 'Four Bitewings', 'FMX'],
      pick: -1
    };
    return _this;
  }
  /*
  componentDidUpdate(prevProps) {
    if (this.props.description !== prevProps.description) {
      this.setState({
        description: this.props.description,
      });
    }
  }
  */


  LayoutPickerDialog_createClass(LayoutPickerDialog, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return react_default.a.createElement(SimpleDialog["a" /* default */], {
        headerTitle: "Pick Layout",
        onClose: this.onClose,
        onConfirm: this.onConfirm,
        rootClass: "LayoutPickerDialog"
      }, react_default.a.createElement(ui_src["y" /* TableList */], {
        headless: true
      }, this.state.layouts.map(function (name, index) {
        return react_default.a.createElement(ui_src["z" /* TableListItem */], {
          itemClass: index == _this2.state.pick ? "SelectedLayoutPickerItem" : "LayoutPickerItem",
          itemMetaClass: "LayoutPickerItemMeta",
          onItemClick: function onItemClick() {
            return _this2.setState({
              pick: index
            });
          }
        }, name);
      })));
    }
  }]);

  return LayoutPickerDialog;
}(react["Component"]);

LayoutPickerDialog_defineProperty(LayoutPickerDialog_LayoutPickerDialog_LayoutPickerDialog, "propTypes", {
  //description: PropTypes.string,
  //measurementData: PropTypes.object.isRequired,
  onCancel: prop_types_default.a.func.isRequired,
  onConfirm: prop_types_default.a.func.isRequired
});


// CONCATENATED MODULE: ./components/LayoutPickerDialog/index.js

/* harmony default export */ var components_LayoutPickerDialog = (LayoutPickerDialog_LayoutPickerDialog_LayoutPickerDialog);
// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/dicomweb-client/build/dicomweb-client.es.js
var dicomweb_client_es = __webpack_require__(48);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/dcmjs/build/dcmjs.es.js
var dcmjs_es = __webpack_require__(35);

// EXTERNAL MODULE: ./context/WhiteLabelingContext.js + 1 modules
var WhiteLabelingContext = __webpack_require__(234);

// EXTERNAL MODULE: ./context/UserManagerContext.js
var UserManagerContext = __webpack_require__(255);

// EXTERNAL MODULE: ./connectedComponents/Viewer.css
var connectedComponents_Viewer = __webpack_require__(1059);

// EXTERNAL MODULE: /home/david/dev/evs/viewer/ohif/node_modules/stream-browserify/index.js
var stream_browserify = __webpack_require__(1060);

// CONCATENATED MODULE: ./connectedComponents/Viewer.js
function Viewer_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Viewer_typeof = function _typeof(obj) { return typeof obj; }; } else { Viewer_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Viewer_typeof(obj); }

function Viewer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Viewer_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Viewer_createClass(Constructor, protoProps, staticProps) { if (protoProps) Viewer_defineProperties(Constructor.prototype, protoProps); if (staticProps) Viewer_defineProperties(Constructor, staticProps); return Constructor; }

function Viewer_possibleConstructorReturn(self, call) { if (call && (Viewer_typeof(call) === "object" || typeof call === "function")) { return call; } return Viewer_assertThisInitialized(self); }

function Viewer_getPrototypeOf(o) { Viewer_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Viewer_getPrototypeOf(o); }

function Viewer_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Viewer_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Viewer_setPrototypeOf(subClass, superClass); }

function Viewer_setPrototypeOf(o, p) { Viewer_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Viewer_setPrototypeOf(o, p); }

function Viewer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


















var _dcmjs$data = dcmjs_es["a" /* default */].data,
    DicomMessage = _dcmjs$data.DicomMessage,
    DicomMetaDictionary = _dcmjs$data.DicomMetaDictionary,
    DicomDict = _dcmjs$data.DicomDict,
    WriteBufferStream = _dcmjs$data.WriteBufferStream; // Contexts






var guid = utils["a" /* default */].guid;

var Viewer_Viewer =
/*#__PURE__*/
function (_Component) {
  Viewer_inherits(Viewer, _Component);

  function Viewer(props) {
    var _this;

    Viewer_classCallCheck(this, Viewer);

    _this = Viewer_possibleConstructorReturn(this, Viewer_getPrototypeOf(Viewer).call(this, props));

    Viewer_defineProperty(Viewer_assertThisInitialized(_this), "state", {
      isLeftSidePanelOpen: true,
      isRightSidePanelOpen: false,
      isSelectingLayout: false,
      selectedRightSidePanel: '',
      selectedLeftSidePanel: 'studies',
      // TODO: Don't hardcode this
      thumbnails: []
    });

    Viewer_defineProperty(Viewer_assertThisInitialized(_this), "retrieveTimepoints", function (filter) {
      src["b" /* default */].log.info('retrieveTimepoints'); // Get the earliest and latest study date

      var earliestDate = new Date().toISOString();
      var latestDate = new Date().toISOString();

      if (_this.props.studies) {
        latestDate = new Date('1000-01-01').toISOString();

        _this.props.studies.forEach(function (study) {
          var StudyDate = moment_default()(study.StudyDate, 'YYYYMMDD').toISOString();

          if (StudyDate < earliestDate) {
            earliestDate = StudyDate;
          }

          if (StudyDate > latestDate) {
            latestDate = StudyDate;
          }
        });
      } // Return a generic timepoint


      return Promise.resolve([{
        timepointType: 'baseline',
        timepointId: 'TimepointId',
        studyInstanceUIDs: _this.props.studyInstanceUIDs,
        PatientID: filter.PatientID,
        earliestDate: earliestDate,
        latestDate: latestDate,
        isLocked: false
      }]);
    });

    Viewer_defineProperty(Viewer_assertThisInitialized(_this), "storeTimepoints", function (timepointData) {
      src["b" /* default */].log.info('storeTimepoints');
      return Promise.resolve();
    });

    Viewer_defineProperty(Viewer_assertThisInitialized(_this), "updateTimepoint", function (timepointData, query) {
      src["b" /* default */].log.info('updateTimepoint');
      return Promise.resolve();
    });

    Viewer_defineProperty(Viewer_assertThisInitialized(_this), "removeTimepoint", function (timepointId) {
      src["b" /* default */].log.info('removeTimepoint');
      return Promise.resolve();
    });

    Viewer_defineProperty(Viewer_assertThisInitialized(_this), "disassociateStudy", function (timepointIds, StudyInstanceUID) {
      src["b" /* default */].log.info('disassociateStudy');
      return Promise.resolve();
    });

    Viewer_defineProperty(Viewer_assertThisInitialized(_this), "onTimepointsUpdated", function (timepoints) {
      if (_this.props.onTimepointsUpdated) {
        _this.props.onTimepointsUpdated(timepoints);
      }
    });

    Viewer_defineProperty(Viewer_assertThisInitialized(_this), "onMeasurementsUpdated", function (measurements) {
      if (_this.props.onMeasurementsUpdated) {
        _this.props.onMeasurementsUpdated(measurements);
      }
    });

    var activeServer = _this.props.activeServer;
    var server = Object.assign({}, activeServer);
    src["b" /* default */].measurements.MeasurementApi.setConfiguration({
      dataExchange: {
        retrieve: DICOMSR["a" /* default */].retrieveMeasurements,
        store: DICOMSR["a" /* default */].storeMeasurements
      },
      server: server
    });
    src["b" /* default */].measurements.TimepointApi.setConfiguration({
      dataExchange: {
        retrieve: _this.retrieveTimepoints,
        store: _this.storeTimepoints,
        remove: _this.removeTimepoint,
        update: _this.updateTimepoint,
        disassociate: _this.disassociateStudy
      }
    });
    _this._getActiveViewport = _this._getActiveViewport.bind(Viewer_assertThisInitialized(_this));
    return _this;
  }

  Viewer_createClass(Viewer, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.dialog) {
        this.props.dialog.dismissAll();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          studies = _this$props.studies,
          isStudyLoaded = _this$props.isStudyLoaded;
      var _OHIF$measurements = src["b" /* default */].measurements,
          TimepointApi = _OHIF$measurements.TimepointApi,
          MeasurementApi = _OHIF$measurements.MeasurementApi;
      var currentTimepointId = 'TimepointId';
      var timepointApi = new TimepointApi(currentTimepointId, {
        onTimepointsUpdated: this.onTimepointsUpdated
      });
      var measurementApi = new MeasurementApi(timepointApi, {
        onMeasurementsUpdated: this.onMeasurementsUpdated
      });
      this.currentTimepointId = currentTimepointId;
      this.timepointApi = timepointApi;
      this.measurementApi = measurementApi;

      if (studies) {
        var PatientID = studies[0] && studies[0].PatientID;
        timepointApi.retrieveTimepoints({
          PatientID: PatientID
        });

        if (isStudyLoaded) {
          this.measurementApi.retrieveMeasurements(PatientID, [currentTimepointId]);
        }

        this.setState({
          thumbnails: _mapStudiesToThumbnails(studies)
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          studies = _this$props2.studies,
          isStudyLoaded = _this$props2.isStudyLoaded;

      if (studies !== prevProps.studies) {
        this.setState({
          thumbnails: _mapStudiesToThumbnails(studies)
        });
      }

      if (isStudyLoaded && isStudyLoaded !== prevProps.isStudyLoaded) {
        var PatientID = studies[0] && studies[0].PatientID;
        var currentTimepointId = this.currentTimepointId;
        this.timepointApi.retrieveTimepoints({
          PatientID: PatientID
        });
        this.measurementApi.retrieveMeasurements(PatientID, [currentTimepointId]);
      }
    }
  }, {
    key: "_getActiveViewport",
    value: function _getActiveViewport() {
      return this.props.viewports[this.props.activeViewportIndex];
    }
  }, {
    key: "getClient",
    value: function getClient(url) {
      var token = window.access_token;
      var headers = {
        Authorization: 'Bearer ' + token
      };
      return new dicomweb_client_es["a" /* api */].DICOMwebClient({
        url: url,
        headers: headers
      });
    }
  }, {
    key: "createNewStudy",
    value: function createNewStudy(layout) {
      // dialog should return some representation of layout, like frames, positions, etc
      // then we create new study, series, structured display from that
      // http://dicom.nema.org/medical/dicom/current/output/html/part18.html#chapter_F
      var fileMetaInformationVersionArray = new Uint8Array(2);
      fileMetaInformationVersionArray[1] = 1;
      var metadata = {
        "00020001": {
          Value: [fileMetaInformationVersionArray.buffer],
          vr: "OB"
        },
        "00020012": {
          Value: ["1.2.840.113819.7.1.1997.1.0"],
          vr: "UI"
        },
        // TODO: update (Implementation Class UID)
        "00020002": {
          Value: ["1.2.840.10008.5.1.4.1.1.131"],
          vr: "UI"
        },
        // Media Storage SOP Class UID = Basic Structured Display Storage
        "00020003": {
          Value: [DicomMetaDictionary.uid()],
          vr: "UI"
        },
        // Media Storage SOP Instance UID = new uid
        "00020010": {
          Value: ["1.2.840.10008.1.2"],
          vr: "UI"
        } // Transfer Syntax UID

      };
      var numImageBoxes = 1;
      var imageBoxes = [];

      if (layout === 'Panoramic') {
        numImageBoxes = 1;
        imageBoxes = [{
          "00720302": {
            vr: "US",
            Value: [0]
          },
          "00720108": {
            vr: "FD",
            Value: [0, 1, 1, 0]
          } // (x1,y1), (x2,y2)

        }];
      } else if (layout === 'Four Bitewings') {
        numImageBoxes = 4;
        imageBoxes = [{
          "00720302": {
            vr: "US",
            Value: [0]
          },
          "00720108": {
            vr: "FD",
            Value: [0, 1, 0.25, 0]
          }
        }, {
          "00720302": {
            vr: "US",
            Value: [0]
          },
          "00720108": {
            vr: "FD",
            Value: [0.25, 1, 0.5, 0]
          }
        }, {
          "00720302": {
            vr: "US",
            Value: [0]
          },
          "00720108": {
            vr: "FD",
            Value: [0.5, 1, 0.75, 0]
          }
        }, {
          "00720302": {
            vr: "US",
            Value: [0]
          },
          "00720108": {
            vr: "FD",
            Value: [0.75, 1, 1, 0]
          }
        }];
      } else if (layout === 'FMX') {
        numImageBoxes = 21;
      }

      var structuredDisplay = {
        StudyInstanceUID: guid(),
        SeriesInstanceUID: guid(),
        SOPInstanceUID: guid(),
        SOPClassUID: "1.2.840.10008.5.1.4.1.1.131",
        // Structured Display
        ImageBoxes: imageBoxes
      };
      var dict = new DicomDict(metadata);
      dict.upsertTag("0020000D", "UI", [structuredDisplay.StudyInstanceUID]); // Study Instance UID

      dict.upsertTag("0020000E", "UI", [structuredDisplay.SeriesInstanceUID]); // Series Instance UID

      dict.upsertTag("00200013", "IS", ["0"]); // Instance Number

      dict.upsertTag("00080018", "UI", [structuredDisplay.SOPInstanceUID]); // SOP Instance UID

      dict.upsertTag("00080016", "UI", [structuredDisplay.SOPClassUID]);
      dict.upsertTag("00720422", "SQ", structuredDisplay.ImageBoxes); // Structured Display Image Box Sequence

      dict.upsertTag("00100020", "LO", [this.props.patientID]);
      var buffer = dict.write();
      var url = this.props.activeServer.wadoRoot;
      var client = this.getClient(url);
      var props = this.props; //var encoder = new TextEncoder();
      //const buffer = encoder.encode(JSON.stringify(dataset));

      client.storeInstances({
        datasets: [buffer]
      }).then(function (result) {
        props.onNewStudy(structuredDisplay);
      }); // then make dicomWeb call to create these in google healthcare
      // after call, update redux state with new study, series and structured display
      // that state should automatically be reflected by study browser and viewer
    }
  }, {
    key: "uploadImage",
    value: function uploadImage() {
      var index = this.props.activeViewportIndex;
      var self = this;
      this.loadImage(function (imageData) {
        self.createNewImageInstance(index, imageData);
      });
    }
  }, {
    key: "loadImage",
    value: function loadImage(onSuccess) {
      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      input.onchange = function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onerror = function (ev) {
          console.log(ev);
        };

        reader.onload = function (ev) {
          var image = document.createElement('img');
          image.src = ev.target.result;
          image.decode().then(function () {
            var canvas = document.createElement("canvas");
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            onSuccess(imageData);
          }).catch(function (err) {
            console.log(err);
          });
        };

        reader.readAsDataURL(file);
      };

      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    }
  }, {
    key: "createNewImageInstance",
    value: function createNewImageInstance(index, imageData) {
      var viewport = this.props.viewports[index];
      var fileMetaInformationVersionArray = new Uint8Array(2);
      fileMetaInformationVersionArray[1] = 1;
      var metadata = {
        "00020001": {
          Value: [fileMetaInformationVersionArray.buffer],
          vr: "OB"
        },
        "00020012": {
          Value: ["1.2.840.113819.7.1.1997.1.0"],
          vr: "UI"
        },
        // TODO: update (Implementation Class UID)
        "00020002": {
          Value: ["1.2.840.10008.5.1.4.1.1.1.1"],
          vr: "UI"
        },
        // Media Storage SOP Class UID = Digital X-Ray Image Storage - For Presentation
        "00020003": {
          Value: [DicomMetaDictionary.uid()],
          vr: "UI"
        },
        // Media Storage SOP Instance UID = new uid
        //"00020010": { Value: ["1.2.840.10008.1.2"], vr: "UI" } // Transfer Syntax UID
        "00020010": {
          Value: ["1.2.840.10008.1.2.4.50"],
          vr: "UI"
        } // Transfer Syntax UID

      };
      /*
      var data = {
        SOPInstanceUID: guid(),
        StudyInstanceUID: viewport.StudyInstanceUID,
        SeriesInstanceUID: viewport.SeriesInstanceUID,
      };
      */

      var dict = new DicomDict(metadata);
      dict.upsertTag("00100020", "LO", [this.props.patientID]);
      dict.upsertTag("0020000D", "UI", [viewport.StudyInstanceUID]); // Study Instance UID

      dict.upsertTag("0020000E", "UI", [viewport.SeriesInstanceUID]); // Series Instance UID

      dict.upsertTag("00200013", "IS", [index.toString()]); // Instance Number

      dict.upsertTag("00080018", "UI", [guid()]); // SOP Instance UID
      // Media Storage SOP Class UID = Digital X-Ray Image Storage - For Presentation

      dict.upsertTag("00080016", "UI", ["1.2.840.10008.5.1.4.1.1.1.1"]);
      dict.upsertTag("00280006", "US", [0]); // Planar Configuration

      dict.upsertTag("00280004", "CS", ["YBR_RCT"]); // Photometric Interpretation
      //dict.upsertTag("00280004", "CS", ["RGB"]); // Photometric Interpretation

      dict.upsertTag("00280002", "US", [3]); // Samples per Pixel

      dict.upsertTag("00280010", "US", [imageData.height]); // Rows

      dict.upsertTag("00280011", "US", [imageData.width]); // Columns

      dict.upsertTag("00280100", "US", [8]); // Bits Allocated

      dict.upsertTag("00280101", "US", [8]); // Bits Stored

      dict.upsertTag("00280102", "US", [7]); // High Bit

      dict.upsertTag("00280103", "US", [0]); // Pixel Representation

      dict.upsertTag("00282110", "CS", ["01"]); // Lossy Image Compression

      dict.upsertTag("00282114", "CS", ["ISO_10918_1"]); // Lossy Image Compression Method
      // TODO instance creation time

      /*
      var argb_buffer = new Uint32Array(imageData.data.buffer);
      var rgb_buffer  = new Uint8Array(new ArrayBuffer(imageData.height*imageData.width*4));
      var j = 0;
      for (var i=0; i<argb_buffer.length; i++) {
        var word = argb_buffer[i];
        rgb_buffer[j+0] = (word & 0x000000ff);
        rgb_buffer[j+1] = (word & 0x0000ff00) >> 8;
        rgb_buffer[j+2] = (word & 0x00ff0000) >> 16;
          j+= 3;
      }
      */

      var jpegImageData = jpeg_js_default.a.encode(imageData, 90); // We need to manually pad the buffer to avoid complaints from Google even
      // though dcmjs also adds padding (could be a bug in dcmjs encapsulation logic).

      var buf;

      if (jpegImageData.data.buffer.byteLength & 1) {
        buf = new ArrayBuffer(jpegImageData.data.buffer.byteLength + 1);
        new Uint8Array(buf).set(new Uint8Array(jpegImageData.data.buffer));
      } else {
        buf = jpegImageData.data.buffer;
      } //dict.upsertTag("7FE00010", "OB", [rgb_buffer.buffer]); // Pixel Data


      dict.upsertTag("7FE00010", "OB", [buf]); // Pixel Data

      var buffer = dict.write({
        fragmentMultiframe: false,
        // storeInstances does not seem to work with multiframes
        allowInvalidVRLength: true
      }); //this.download("test.dcm", buffer);

      var url = this.props.activeServer.wadoRoot;
      var client = this.getClient(url);
      var props = this.props; // XXX: we need a spinner here

      client.storeInstances({
        datasets: [buffer]
      }).then(function (result) {
        //var ohifInstanceMetadata = new OHIFInstanceMetadata(data, [], [], data.SOPInstanceUID);
        //viewport.images = [ohifInstanceMetadata]; 
        props.afterUpload();
      });
    }
  }, {
    key: "arrayBufferToBase64",
    value: function arrayBufferToBase64(buffer) {
      var binary = '';
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;

      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }

      return window.btoa(binary);
    }
  }, {
    key: "download",
    value: function download(filename, buffer) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:application/dicom;base64,' + this.arrayBufferToBase64(buffer));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var VisiblePanelLeft, VisiblePanelRight;
      var panelExtensions = App["c" /* extensionManager */].modules[MODULE_TYPES["a" /* default */].PANEL];
      panelExtensions.forEach(function (panelExt) {
        panelExt.module.components.forEach(function (comp) {
          if (comp.id === _this2.state.selectedRightSidePanel) {
            VisiblePanelRight = comp.component;
          } else if (comp.id === _this2.state.selectedLeftSidePanel) {
            VisiblePanelLeft = comp.component;
          }
        });
      });
      return react_default.a.createElement(react_default.a.Fragment, null, this.state.isSelectingLayout && react_default.a.createElement(components_LayoutPickerDialog, {
        onCancel: function onCancel() {
          _this2.setState({
            isSelectingLayout: false
          });
        },
        onConfirm: function onConfirm(result) {
          _this2.setState({
            isSelectingLayout: false
          });

          _this2.createNewStudy(result);
        }
      }), react_default.a.createElement(components_ErrorBoundaryDialog, {
        context: "ToolbarRow"
      }, react_default.a.createElement(connectedComponents_ToolbarRow_0, {
        activeViewport: this.props.viewports[this.props.activeViewportIndex],
        isLeftSidePanelOpen: this.state.isLeftSidePanelOpen,
        isRightSidePanelOpen: this.state.isRightSidePanelOpen,
        selectedLeftSidePanel: this.state.isLeftSidePanelOpen ? this.state.selectedLeftSidePanel : '',
        selectedRightSidePanel: this.state.isRightSidePanelOpen ? this.state.selectedRightSidePanel : '',
        handleSidePanelChange: function handleSidePanelChange(side, selectedPanel) {
          var sideClicked = side && side[0].toUpperCase() + side.slice(1);
          var openKey = "is".concat(sideClicked, "SidePanelOpen");
          var selectedKey = "selected".concat(sideClicked, "SidePanel");
          var updatedState = Object.assign({}, _this2.state);
          var isOpen = updatedState[openKey];
          var prevSelectedPanel = updatedState[selectedKey]; // RoundedButtonGroup returns `null` if selected button is clicked

          var isSameSelectedPanel = prevSelectedPanel === selectedPanel || selectedPanel === null;
          updatedState[selectedKey] = selectedPanel || prevSelectedPanel;
          var isClosedOrShouldClose = !isOpen || isSameSelectedPanel;

          if (isClosedOrShouldClose) {
            updatedState[openKey] = !updatedState[openKey];
          }

          _this2.setState(updatedState);
        },
        handleMaximize: this.props.onMaximize,
        handleNewStudy: function handleNewStudy() {
          _this2.setState({
            isSelectingLayout: true
          });
        },
        handleUpload: this.uploadImage.bind(this),
        studies: this.props.studies,
        maximized: this.props.maximized
      })), react_default.a.createElement("div", {
        className: "FlexboxLayout"
      }, react_default.a.createElement(components_ErrorBoundaryDialog, {
        context: "LeftSidePanel"
      }, react_default.a.createElement(components_SidePanel_0, {
        from: "left",
        isOpen: this.state.isLeftSidePanelOpen
      }, VisiblePanelLeft ? react_default.a.createElement(VisiblePanelLeft, {
        viewports: this.props.viewports,
        studies: this.props.studies,
        activeIndex: this.props.activeViewportIndex
      }) : react_default.a.createElement("div", null, react_default.a.createElement(connectedComponents_ConnectedStudyBrowser, {
        studies: this.state.thumbnails,
        studyMetadata: this.props.studies
      })))), react_default.a.createElement("div", {
        className: classnames_default()('main-content')
      }, this.state.isSelectingLayout ? react_default.a.createElement("p", null, "Please select layout...") : react_default.a.createElement(components_ErrorBoundaryDialog, {
        context: "ViewerMain"
      }, react_default.a.createElement(connectedComponents_ConnectedViewerMain, {
        studies: this.props.studies,
        isStudyLoaded: this.props.isStudyLoaded
      }))), react_default.a.createElement(components_ErrorBoundaryDialog, {
        context: "RightSidePanel"
      }, react_default.a.createElement(components_SidePanel_0, {
        from: "right",
        isOpen: this.state.isRightSidePanelOpen
      }, VisiblePanelRight && react_default.a.createElement(VisiblePanelRight, {
        isOpen: this.state.isRightSidePanelOpen,
        viewports: this.props.viewports,
        studies: this.props.studies,
        activeIndex: this.props.activeViewportIndex,
        activeViewport: this.props.viewports[this.props.activeViewportIndex],
        getActiveViewport: this._getActiveViewport
      })))));
    }
  }]);

  return Viewer;
}(react["Component"]);

Viewer_defineProperty(Viewer_Viewer, "propTypes", {
  studies: prop_types_default.a.arrayOf(prop_types_default.a.shape({
    StudyInstanceUID: prop_types_default.a.string.isRequired,
    StudyDate: prop_types_default.a.string,
    PatientID: prop_types_default.a.string,
    series: prop_types_default.a.arrayOf(prop_types_default.a.shape({
      SeriesInstanceUID: prop_types_default.a.string.isRequired
    })),
    displaySets: prop_types_default.a.arrayOf(prop_types_default.a.shape({
      displaySetInstanceUID: prop_types_default.a.string.isRequired,
      SeriesInstanceUID: prop_types_default.a.string.isRequired,
      SeriesDescription: prop_types_default.a.string,
      SeriesNumber: prop_types_default.a.number,
      InstanceNumber: prop_types_default.a.number,
      numImageFrames: prop_types_default.a.number,
      Modality: prop_types_default.a.string.isRequired,
      images: prop_types_default.a.arrayOf(prop_types_default.a.shape({
        getImageId: prop_types_default.a.func.isRequired
      }))
    }))
  })),
  studyInstanceUIDs: prop_types_default.a.array,
  activeServer: prop_types_default.a.shape({
    type: prop_types_default.a.string,
    wadoRoot: prop_types_default.a.string
  }),
  onTimepointsUpdated: prop_types_default.a.func,
  onMeasurementsUpdated: prop_types_default.a.func,
  onMaximize: prop_types_default.a.func,
  onNewStudy: prop_types_default.a.func,
  afterUpload: prop_types_default.a.func,
  // window.store.getState().viewports.viewportSpecificData
  viewports: prop_types_default.a.object.isRequired,
  // window.store.getState().viewports.activeViewportIndex
  activeViewportIndex: prop_types_default.a.number.isRequired,
  isStudyLoaded: prop_types_default.a.bool,
  dialog: prop_types_default.a.object,
  maximized: prop_types_default.a.bool.isRequired,
  patientID: prop_types_default.a.string
});

/* harmony default export */ var connectedComponents_Viewer_0 = (Object(ui_src["L" /* withDialog */])(Viewer_Viewer));
/**
 * What types are these? Why do we have "mapping" dropped in here instead of in
 * a mapping layer?
 *
 * TODO[react]:
 * - Add showStackLoadingProgressBar option
 *
 * @param {Study[]} studies
 * @param {DisplaySet[]} studies[].displaySets
 */

var _mapStudiesToThumbnails = function _mapStudiesToThumbnails(studies) {
  return studies.map(function (study) {
    var StudyInstanceUID = study.StudyInstanceUID;
    var thumbnails = study.series.map(function (series) {
      var displaySet = undefined;
      var numImageFrames = 1;

      for (var i = 0; i < study.displaySets.length; i++) {
        var set = study.displaySets[i];

        if (set.SeriesInstanceUID === series.SeriesInstanceUID) {
          if (!displaySet) displaySet = set;
          if (set.Maximized) numImageFrames = set.numImageFrames;
        }
      }

      if (!displaySet) {
        return null;
      }

      var _displaySet = displaySet,
          displaySetInstanceUID = _displaySet.displaySetInstanceUID,
          SeriesDescription = _displaySet.SeriesDescription,
          InstanceNumber = _displaySet.InstanceNumber,
          SeriesInstanceUID = _displaySet.SeriesInstanceUID,
          SeriesNumber = _displaySet.SeriesNumber;
      var imageId;
      var altImageText;

      if (displaySet.Modality && displaySet.Modality === 'SEG') {
        // TODO: We want to replace this with a thumbnail showing
        // the segmentation map on the image, but this is easier
        // and better than what we have right now.
        altImageText = 'SEG';
      } else if (displaySet.images && displaySet.images.length) {
        var imageIndex = Math.floor(displaySet.images.length / 2);
        imageId = displaySet.images[imageIndex].getImageId();
      } else {
        altImageText = displaySet.Modality ? displaySet.Modality : '';
      }

      return {
        imageId: imageId,
        altImageText: altImageText,
        displaySetInstanceUID: displaySetInstanceUID,
        SeriesDescription: SeriesDescription,
        InstanceNumber: InstanceNumber,
        numImageFrames: numImageFrames,
        SeriesInstanceUID: SeriesInstanceUID,
        SeriesNumber: SeriesNumber
      };
    }).filter(function (x) {
      return x;
    });
    return {
      StudyInstanceUID: StudyInstanceUID,
      thumbnails: thumbnails
    };
  });
};
// CONCATENATED MODULE: ./connectedComponents/ConnectedViewer.js



var ConnectedViewer_OHIF$redux$actions = src["b" /* default */].redux.actions,
    setTimepoints = ConnectedViewer_OHIF$redux$actions.setTimepoints,
    setMeasurements = ConnectedViewer_OHIF$redux$actions.setMeasurements,
    maximize = ConnectedViewer_OHIF$redux$actions.maximize,
    setStudyData = ConnectedViewer_OHIF$redux$actions.setStudyData,
    ConnectedViewer_setActiveSeries = ConnectedViewer_OHIF$redux$actions.setActiveSeries,
    ConnectedViewer_setLayout = ConnectedViewer_OHIF$redux$actions.setLayout;

var getActiveServer = function getActiveServer(servers) {
  var isActive = function isActive(a) {
    return a.active === true;
  };

  return servers.servers.find(isActive);
};

var ConnectedViewer_mapStateToProps = function mapStateToProps(state) {
  var viewports = state.viewports,
      servers = state.servers;
  return {
    viewports: viewports.viewportSpecificData,
    activeViewportIndex: viewports.activeViewportIndex,
    activeServer: getActiveServer(servers),
    maximized: viewports.maximized
  };
};

var ConnectedViewer_mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onTimepointsUpdated: function onTimepointsUpdated(timepoints) {
      dispatch(setTimepoints(timepoints));
    },
    onMeasurementsUpdated: function onMeasurementsUpdated(measurements) {
      dispatch(setMeasurements(measurements));
    },
    onMaximize: function onMaximize() {
      dispatch(maximize());
    },
    onNewStudy: function onNewStudy(structuredDisplay, layout) {
      dispatch(setStudyData(structuredDisplay.StudyInstanceUID, structuredDisplay));
      dispatch(ConnectedViewer_setActiveSeries(structuredDisplay.SeriesInstanceUID)); //dispatch(setLayout(layout)); let it be updated after retrieve study data is done
    }
  };
};

var ConnectedViewer = Object(es["b" /* connect */])(ConnectedViewer_mapStateToProps, ConnectedViewer_mapDispatchToProps)(connectedComponents_Viewer_0);
/* harmony default export */ var connectedComponents_ConnectedViewer = __webpack_exports__["a"] = (ConnectedViewer);

/***/ }),

/***/ 1021:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return makeLayout; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// if seriesInstanceUID is null, we use first series
function makeLayout(studies, seriesInstanceUID) {
  console.log("MAKE_LAYOUT");
  console.log(studies);
  console.log(seriesInstanceUID);
  var studyUID = null;
  var seriesUID = seriesInstanceUID;
  var series;
  var displaySets;
  var found = false;

  if (seriesUID) {
    for (var i = 0; i < studies.length; i++) {
      for (var j = 0; j < studies[i].series.length; j++) {
        if (studies[i].series[j].SeriesInstanceUID === seriesUID) {
          console.log("found active series");
          studyUID = studies[i].StudyInstanceUID;
          displaySets = studies[i].displaySets;
          series = studies[i].series[j];
          found = true;
          break;
        }
      }

      if (found) break;
    }
  } else if (studies.length > 0 && studies[0].series.length > 0) {
    console.log("picking first series");
    studyUID = studies[0].StudyInstanceUID;
    seriesUID = studies[0].series[0].SeriesInstanceUID;
    series = studies[0].series[0];
    displaySets = studies[0].displaySets;
  }

  var numFrames = 0;
  var foundStructuredDisplay = false;
  var viewports = [];

  for (var i = 0; i < series.instances.length; i++) {
    var instance = series.instances[i];

    if (instance.metadata.MediaStorageSOPClassUID === '1.2.840.10008.5.1.4.1.1.131') {
      // structured display
      foundStructuredDisplay = true;
      var imageBoxSeq = instance.metadata.StructuredDisplayImageBoxSequence;
      if (_typeof(imageBoxSeq) === 'object') imageBoxSeq = [imageBoxSeq];
      numFrames = imageBoxSeq.length;

      for (var j = 0; j < numFrames; j++) {
        var imageBox = imageBoxSeq[j];
        var position = imageBox.DisplayEnvironmentSpatialPosition;
        var pos = {
          x1: position[0],
          y1: position[1],
          x2: position[2],
          y2: position[3]
        }; //var imageInstanceUID = imageBox.ReferencedImageSequence && imageBox.ReferencedImageSequence.length > 0 ? imageBox.ReferencedImageSequence[0] : null;

        viewports.push({
          pos: pos,
          instanceNumber: imageBox.ImageBoxNumber,
          plugin: "cornerstone"
        });
      }
    }
  }

  console.log("Found structured display and viewports: ");
  console.log(foundStructuredDisplay);
  console.log(viewports);
  console.log(series);

  if (!foundStructuredDisplay) {
    numFrames = 0;

    for (var i = 0; i < displaySets.length; i++) {
      if (!displaySets[i].Maximized) numFrames++;
    }

    var numRows = 1;
    var numColumns = 1;

    if (numFrames == 1) {
      numRows = 1;
      numColumns = 1;
    } else if (numFrames == 2) {
      numRows = 1;
      numColumns = 2;
    } else if (numFrames == 3) {
      numRows = 1;
      numColumns = 3;
    } else if (numFrames == 4) {
      numRows = 2;
      numColumns = 2;
    } else if (numFrames == 5) {
      numRows = 2;
      numColumns = 3;
    } else if (numFrames == 6) {
      numRows = 2;
      numColumns = 3;
    } else if (numFrames == 7) {
      numRows = 2;
      numColumns = 4;
    } else if (numFrames == 8) {
      numRows = 2;
      numColumns = 4;
    } else if (numFrames == 9) {
      numRows = 3;
      numColumns = 3;
    } else if (numFrames == 10) {
      numRows = 3;
      numColumns = 4;
    }

    var width = 1 / numColumns;
    var height = 1 / numRows;
    var number = 0;

    for (var y = 0; y < numRows; y++) {
      for (var x = 0; x < numColumns; x++) {
        var pos = {
          x1: x * width,
          y1: 1 - y * height,
          x2: (x + 1) * width,
          y2: 1 - (y + 1) * height
        };
        viewports.push({
          pos: pos,
          instanceNumber: number++,
          plugin: "cornerstone"
        });
      }
    }
  }
  /*
  var viewports = [];
  for (var i=0; i<numFrames; i++) {
    viewports.push({plugin: "cornerstone"});
  }
  */


  return {
    layout: viewports,
    //{numRows: numRows, numColumns: numColumns, viewports: viewports},
    data: displaySets,
    activeSeriesUID: seriesUID
  };
}

/***/ }),

/***/ 1049:
/***/ (function(module, exports, __webpack_require__) {

// extracted by extract-css-chunks-webpack-plugin

/***/ }),

/***/ 1050:
/***/ (function(module, exports, __webpack_require__) {

// extracted by extract-css-chunks-webpack-plugin

/***/ }),

/***/ 1051:
/***/ (function(module, exports, __webpack_require__) {

// extracted by extract-css-chunks-webpack-plugin

/***/ }),

/***/ 1052:
/***/ (function(module, exports, __webpack_require__) {

// extracted by extract-css-chunks-webpack-plugin

/***/ }),

/***/ 1053:
/***/ (function(module, exports) {

/**
 *
 *
 * @returns
 */
function EmptyViewport() {
  return React.createElement("div", {
    className: "empty-viewport"
  }, React.createElement("p", null, "Please drag a stack here to view images."));
}

/***/ }),

/***/ 1056:
/***/ (function(module, exports, __webpack_require__) {

// extracted by extract-css-chunks-webpack-plugin

/***/ }),

/***/ 1057:
/***/ (function(module, exports, __webpack_require__) {

// extracted by extract-css-chunks-webpack-plugin

/***/ }),

/***/ 1058:
/***/ (function(module, exports, __webpack_require__) {

// extracted by extract-css-chunks-webpack-plugin

/***/ }),

/***/ 1059:
/***/ (function(module, exports, __webpack_require__) {

// extracted by extract-css-chunks-webpack-plugin

/***/ }),

/***/ 1061:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1063:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);