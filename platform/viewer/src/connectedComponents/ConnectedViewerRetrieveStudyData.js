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
    studyInstanceUIDs: studyInstanceUIDs,
    activeSeries: state.studies.activeSeries,
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
    doneLoadingStudies: (studies, activeSeries) => {
      console.log("doneLoadingStudies()");
      console.log(studies);
      console.log(activeSeries);

      var studyUID = null;
      var seriesUID = activeSeries;
      var displaySets;
      var found = false;
      if (seriesUID) {
        for (var i=0; i<studies.length; i++) {
          for (var j=0; j<studies[i].series.length; j++) {
            if (studies[i].series[j].SeriesInstanceUID === seriesUID) {
              console.log("found active series");
              studyUID = studies[i].StudyInstanceUID;
              displaySets = studies[i].displaySets;
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
        displaySets = studies[0].displaySets;
      }

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

      if (seriesUID) {
        console.log("dispatching setActiveSeries");
        dispatch(setActiveSeries(seriesUID));
      }
    }
  };
};

const ConnectedViewerRetrieveStudyData = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerRetrieveStudyData);

export default ConnectedViewerRetrieveStudyData;
