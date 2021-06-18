import ViewportGrid from './ViewportGrid.js';
import { MODULE_TYPES } from '@ohif/core';
import { connect } from 'react-redux';
import { extensionManager } from './../../App.js';
import memoize from 'lodash/memoize';
import OHIF from '@ohif/core';
const { setViewportActive } = OHIF.redux.actions;

const getAvailableViewportModules = memoize(viewportModules => {
  const availableViewportModules = {};
  viewportModules.forEach(moduleDefinition => {
    availableViewportModules[moduleDefinition.extensionId] =
      moduleDefinition.module;
  });
  return availableViewportModules;
});

const mapStateToProps = state => {
  const viewportModules = extensionManager.modules[MODULE_TYPES.VIEWPORT];
  const availableViewportModules = getAvailableViewportModules(viewportModules);

  // TODO: Use something like state.plugins.defaultPlugin[MODULE_TYPES.VIEWPORT]
  let defaultPlugin;
  if (viewportModules.length) {
    defaultPlugin = viewportModules[0].extensionId;
  }

  const { layout, activeViewportIndex } = state.viewports;

  console.log("layout mapping from state to ViewportGrid:");
  console.log(layout);

  return {
    layout,
    activeViewportIndex,
    // TODO: rename `availableViewportModules`
    availablePlugins: availableViewportModules,
    // TODO: rename `defaultViewportModule`
    defaultPlugin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetActiveViewport: index => {
      dispatch(setViewportActive(index));
    }
  };
};

const ConnectedViewportGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewportGrid);

export default ConnectedViewportGrid;
