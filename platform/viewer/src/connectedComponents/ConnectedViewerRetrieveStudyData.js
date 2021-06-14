import { connect } from 'react-redux';
import ViewerRetrieveStudyData from './ViewerRetrieveStudyData.js';
import OHIF from '@ohif/core';

const { clearViewportSpecificData, setStudyData, setActiveSeries, setViewportLayoutAndData } = OHIF.redux.actions;
const isActive = a => a.active === true;

const mapStateToProps = (state, ownProps) => {
  const activeServer = state.servers.servers.find(isActive);
  const studyInstanceUIDs = Object.keys(state.studies.studyData);

  return {
    server: ownProps.server || activeServer,
    studyInstanceUIDs: studyInstanceUIDs
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setStudyData: (StudyInstanceUID, data) => {
      dispatch(setStudyData(StudyInstanceUID, data));
    },
    clearViewportSpecificData: () => {
      dispatch(clearViewportSpecificData());
    },
    doneLoadingStudies: (studies) => {
      console.log("doneLoadingStudies()");
      console.log(studies);
      if (studies.length > 0 && studies[0].displaySets.length > 0) {
        var displaySets = studies[0].displaySets;
        var numFrames = 0;
        for (var i = 0; i < displaySets.length; i++) {
          if (!displaySets[i].Maximized) numFrames++;
        }

        // XXX: copied from ConnectedStudyBrowser
        // XXX: clean up, handle all cases, and share code

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

        if (studies[0].series.length > 0) {
          console.log("dispatching setActiveSeries");
          console.log(studies[0]);
          dispatch(setActiveSeries(studies[0].series[0].SeriesInstanceUID));
        }
      }
    }
  };
};

const ConnectedViewerRetrieveStudyData = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerRetrieveStudyData);

export default ConnectedViewerRetrieveStudyData;
