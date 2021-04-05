import './ViewportGrid.css';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { utils } from '@ohif/core';
import { useSnackbarContext } from '@ohif/ui';
import cloneDeep from 'lodash.clonedeep';
//
import ViewportPane from './ViewportPane.js';
import DefaultViewport from './DefaultViewport.js';
import EmptyViewport from './EmptyViewport.js';

const { loadAndCacheDerivedDisplaySets } = utils;

const ViewportGrid = function (props) {
  var {
    activeViewportIndex,
    availablePlugins,
    defaultPlugin: defaultPluginName,
    layout,
    numRows,
    numColumns,
    setViewportData,
    studies,
    viewportData,
    children,
    isStudyLoaded,
  } = props;

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

  const rowSize = 100 / numRows;
  const colSize = 100 / numColumns;

  // http://grid.malven.co/
  if (!viewportData || !viewportData.length) {
    return null;
  }

  const snackbar = useSnackbarContext();

  useEffect(() => {
    if (isStudyLoaded) {
      viewportData.forEach(displaySet => {
        const promises = loadAndCacheDerivedDisplaySets(displaySet, studies);

        promises.forEach(promise => {
          promise.catch(error => {
            snackbar.show({
              title: 'Error loading derived display set:',
              message: error.message,
              type: 'error',
              error,
              autoClose: false,
            });
          });
        });
      });
    }
  }, [studies, viewportData, isStudyLoaded, snackbar]);

  const getViewportPanes = () =>
    layout.viewports.map((layout, viewportIndex) => {
      var displaySet = viewportData[viewportIndex];

      if (!displaySet) {
        return null;
      }

      const data = {
        displaySet,
        studies,
      };

      // JAMES TODO:

      // Use whichever plugin is currently in use in the panel
      // unless nothing is specified. If nothing is specified
      // and the display set has a plugin specified, use that.
      //
      // TODO: Change this logic to:
      // - Plugins define how capable they are of displaying a SopClass
      // - When updating a panel, ensure that the currently enabled plugin
      // in the viewport is capable of rendering this display set. If not
      // then use the most capable available plugin

      const pluginName =
        !layout.plugin && displaySet && displaySet.plugin
          ? displaySet.plugin
          : layout.plugin;

      const ViewportComponent = _getViewportComponent(
        data, // Why do we pass this as `ViewportData`, when that's not really what it is?
        viewportIndex,
        children,
        availablePlugins,
        pluginName,
        defaultPluginName
      );

      return (
        <ViewportPane
          onDrop={setViewportData}
          viewportIndex={viewportIndex} // Needed by `setViewportData`
          className={classNames('viewport-container', {
            active: activeViewportIndex === viewportIndex,
          })}
          key={viewportIndex}
        >
          {ViewportComponent}
        </ViewportPane>
      );
    });

  const ViewportPanes = React.useMemo(getViewportPanes, [
    layout,
    viewportData,
    studies,
    children,
    availablePlugins,
    defaultPluginName,
    setViewportData,
    activeViewportIndex,
  ]);

  return (
    <div
      data-cy="viewprt-grid"
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${numRows}, ${rowSize}%)`,
        gridTemplateColumns: `repeat(${numColumns}, ${colSize}%)`,
        height: '100%',
        width: '100%',
      }}
    >
      {ViewportPanes}
    </div>
  );
};

ViewportGrid.propTypes = {
  viewportData: PropTypes.array.isRequired,
  supportsDrop: PropTypes.bool.isRequired,
  activeViewportIndex: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  availablePlugins: PropTypes.object.isRequired,
  setViewportData: PropTypes.func.isRequired,
  studies: PropTypes.array,
  children: PropTypes.node,
  defaultPlugin: PropTypes.string,
  numRows: PropTypes.number.isRequired,
  numColumns: PropTypes.number.isRequired,
};
ViewportGrid.defaultProps = {
  viewportData: [],
  numRows: 1,
  numColumns: 1,
  layout: {
    viewports: [{}],
  },
  activeViewportIndex: 0,
  supportsDrop: true,
  availablePlugins: {
    DefaultViewport,
  },
  defaultPlugin: 'defaultViewportPlugin',
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
function _getViewportComponent(
  viewportData,
  viewportIndex,
  children,
  availablePlugins,
  pluginName,
  defaultPluginName
) {
  if (viewportData.displaySet) {
    pluginName = pluginName || defaultPluginName;
    const ViewportComponent = availablePlugins[pluginName];

    if (!ViewportComponent) {
      throw new Error(
        `No Viewport Component available for name ${pluginName}.
         Available plugins: ${JSON.stringify(availablePlugins)}`
      );
    }

    return (
      <ViewportComponent
        viewportData={viewportData}
        viewportIndex={viewportIndex}
        children={[children]}
      />
    );
  }

  return <EmptyViewport />;
}

export default ViewportGrid;
