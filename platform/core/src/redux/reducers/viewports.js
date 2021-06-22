import cloneDeep from 'lodash.clonedeep';
import produce, { setAutoFreeze } from 'immer';

import {
  CLEAR_VIEWPORT,
  SET_ACTIVE_SPECIFIC_DATA,
  SET_SPECIFIC_DATA,
  SET_VIEWPORT,
  SET_VIEWPORT_ACTIVE,
  SET_VIEWPORT_LAYOUT,
  SET_VIEWPORT_LAYOUT_AND_DATA,
  TOGGLE_MAXIMIZE
} from './../constants/ActionTypes.js';

setAutoFreeze(false);

export const DEFAULT_STATE = {
  activeViewportIndex: 0,
  layout: {
    viewports: [{pos: {x1: 0, y1: 1, x2: 1, y2: 0}, instanceNumber: 0}],
  },
  viewportSpecificData: {},
  maximized: false
};

/**
 *  Take the new number of Rows and Columns, delete all not used viewport data and also set
 *  active viewport as default in case current one is not available anymore.
 *
 * @param {Number} numRows
 * @param {Number} numColumns
 * @param {Object} currentViewportSpecificData
 * @returns
 */
const findActiveViewportSpecificData = (
  numRows,
  numColumns,
  currentViewportSpecificData = {}
) => {
  const numberOfViewports = numRows * numColumns;
  const viewportSpecificData = cloneDeep(currentViewportSpecificData);

  if (numberOfViewports < Object.keys(viewportSpecificData).length) {
    Object.keys(viewportSpecificData).forEach(key => {
      if (key > numberOfViewports - 1) {
        delete viewportSpecificData[key];
      }
    });
  }

  return viewportSpecificData;
};
/**
 *  Take new number of Rows and Columns and make sure the current active viewport index is still available, if not, return the default
 *
 * @param {Number} numRows
 * @param {Number} numColumns
 * @param {Number} currentActiveViewportIndex
 * @returns
 */
const getActiveViewportIndex = (
  viewports,
  currentActiveViewportIndex
) => {
  const numberOfViewports = viewports.length;

  return currentActiveViewportIndex > numberOfViewports - 1
    ? DEFAULT_STATE.activeViewportIndex
    : currentActiveViewportIndex;
};

/**
 * The definition of a viewport action.
 *
 * @typedef {Object} ViewportAction
 * @property {string} type -
 * @property {Object} data -
 * @property {Object} layout -
 * @property {number} viewportIndex -
 * @property {Object} viewportSpecificData -
 */

/**
 * @param {Object} [state=DEFAULT_STATE] The current viewport state.
 * @param {ViewportAction} action A viewport action.
 */
const viewports = (state = DEFAULT_STATE, action) => {
  let useActiveViewport = false;

  switch (action.type) {
    /**
     * Sets the active viewport index.
     *
     * @return {Object} New state.
     */
    case SET_VIEWPORT_ACTIVE: {
      return produce(state, draftState => {
        draftState.activeViewportIndex = getActiveViewportIndex(
          draftState.layout.viewports,
          action.viewportIndex
        );
      });
    }

    /**
     * Sets viewport layout.
     *
     * @return {Object} New state.
     */
    case SET_VIEWPORT_LAYOUT: {
      console.log("SET_VIEWPORT_LAYOUT");
      console.log(action);
      const { viewports } = action;
      /*
      const viewportSpecificData = findActiveViewportSpecificData(
        numRows,
        numColumns,
        state.viewportSpecificData
      );
      */
      const activeViewportIndex = getActiveViewportIndex(
        viewports,
        state.activeViewportIndex
      );

      return {
        ...state,
        layout: { viewports: [...action.viewports] },
        activeViewportIndex,
      };
    }

    /**
     * Sets viewport layout and data.
     *
     * @return {Object} New state.
     */
    case SET_VIEWPORT_LAYOUT_AND_DATA: {
      console.log("SET_VIEWPORT_LAYOUT_AND_DATA");
      console.log(action);
      const { viewports } = action;
      const viewportSpecificData = cloneDeep(action.viewportSpecificData);
      /*
      const viewportSpecificData = findActiveViewportSpecificData(
        numRows,
        numColumns,
        action.viewportSpecificData
      );
      */
      const activeViewportIndex = getActiveViewportIndex(
        viewports,
        state.activeViewportIndex
      );

      return {
        ...state,
        layout: { viewports: [...action.viewports] },
        viewportSpecificData,
        activeViewportIndex,
        maximized: false
      };
    }

    case TOGGLE_MAXIMIZE: {
      var next_state = Object.assign({}, state, {maximized: !state.maximized});
      return next_state;
    }

    /**
     * Sets viewport specific data of active viewport.
     *
     * @return {Object} New state.
     */
    case SET_VIEWPORT: {
      console.log("SET_VIEWPORT");
      console.log(action);
      return produce(state, draftState => {
        if (state.maximized) {
          var maxData;
          for (var i=0; i<draftState.viewportSpecificData.length; i++) {
            if (draftState.viewportSpecificData[i].Maximized) {
              maxData = draftState.viewportSpecificData[i];
              break;
            }
          }
          if (maxData) {
            Object.keys(action.viewportSpecificData).forEach(key => {
              maxData[key] = action.viewportSpecificData[key];
            });
          }
        } else {
          draftState.viewportSpecificData[action.viewportIndex] =
            draftState.viewportSpecificData[action.viewportIndex] || {};

          Object.keys(action.viewportSpecificData).forEach(key => {
            draftState.viewportSpecificData[action.viewportIndex][key] =
              action.viewportSpecificData[key];
          });

          if (action.viewportSpecificData && action.viewportSpecificData.plugin) {
            draftState.layout.viewports[action.viewportIndex].plugin =
              action.viewportSpecificData.plugin;
          }
        }
      });
    }

    /**
     * Sets viewport specific data of active/any viewport.
     *
     * @return {Object} New state.
     */
    case SET_ACTIVE_SPECIFIC_DATA: {
      console.log("SET_ACTIVE_SPECIFIC_DATA");
      console.log(action);
      useActiveViewport = true;
    }
    // Allow fall-through
    // eslint-disable-next-line
    case SET_SPECIFIC_DATA: {
      console.log("SET_SPECIFIC_DATA");
      console.log(action);
      const layout = cloneDeep(state.layout);
      const viewportIndex = useActiveViewport
        ? state.activeViewportIndex
        : action.viewportIndex;

      let viewportSpecificData = cloneDeep(state.viewportSpecificData);
      viewportSpecificData[viewportIndex] = {
        ...action.viewportSpecificData,
      };

      if (action.viewportSpecificData && action.viewportSpecificData.plugin) {
        layout.viewports[viewportIndex].plugin =
          action.viewportSpecificData.plugin;
      }

      return { ...state, layout, viewportSpecificData };
    }

    /**
     * Clears viewport specific data of any viewport.
     *
     * @return {Object} New state.
     */
    case CLEAR_VIEWPORT: {
      let viewportSpecificData = cloneDeep(state.viewportSpecificData);

      if (action.viewportIndex) {
        viewportSpecificData[action.viewportIndex] = {};
        return { ...state, viewportSpecificData };
      } else {
        return DEFAULT_STATE;
      }
    }

    /**
     * Returns the current application state.
     *
     * @return {Object} The current state.
     */
    default: {
      return state;
    }
  }
};

export default viewports;
