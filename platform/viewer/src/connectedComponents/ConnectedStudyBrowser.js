import { OHIF, utils } from '@ohif/core';
import { connect } from 'react-redux';
import { StudyBrowser } from '@ohif/ui';
import cloneDeep from 'lodash.clonedeep';
import findDisplaySetByUID from './findDisplaySetByUID';
import makeLayout from './makeLayout.js';

const { studyMetadataManager } = OHIF.utils;

const { clearViewportSpecificData, setActiveViewportSpecificData, setViewportLayoutAndData, setActiveSeries } = OHIF.redux.actions;

// TODO
// - Determine in which display set is active from Redux (activeViewportIndex and layout viewportData)
// - Pass in errors and stack loading progress from Redux
const mapStateToProps = (state, ownProps) => {
  // If we know that the stack loading progress details have changed,
  // we can try to update the component state so that the thumbnail
  // progress bar is updated
  const stackLoadingProgressMap = state.loading.progress;
  const studiesWithLoadingData = cloneDeep(ownProps.studies);

  studiesWithLoadingData.forEach(study => {
    study.thumbnails.forEach(data => {
      const { displaySetInstanceUID } = data;
      const stackId = `StackProgress:${displaySetInstanceUID}`;
      const stackProgressData = stackLoadingProgressMap[stackId];

      let stackPercentComplete = 0;
      if (stackProgressData) {
        stackPercentComplete = stackProgressData.percentComplete;
      }

      data.stackPercentComplete = stackPercentComplete;
    });
  });

  return {
    studies: studiesWithLoadingData,
    activeSeries: state.studies.activeSeries,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onThumbnailClick: (displaySetInstanceUID, seriesInstanceUID) => {
      var stuff = makeLayout(ownProps.studyMetadata, seriesInstanceUID);
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
    },
  };
};

const ConnectedStudyBrowser = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudyBrowser);

export default ConnectedStudyBrowser;
