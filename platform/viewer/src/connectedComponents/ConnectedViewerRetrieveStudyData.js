import { connect } from 'react-redux';
import ViewerRetrieveStudyData from './ViewerRetrieveStudyData.js';
import OHIF from '@ohif/core';
import makeLayout from './makeLayout.js';

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
      var stuff = makeLayout(studies, activeSeries);
      dispatch(setViewportLayoutAndData(stuff.layout, stuff.data));
      if (stuff.activeSeriesUID) {
        console.log("setActiveSeries (in doneLoadingStudies):");
        console.log(stuff.activeSeriesUID);
        dispatch(setActiveSeries(stuff.activeSeriesUID));
      }
    }
  };
};

const ConnectedViewerRetrieveStudyData = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerRetrieveStudyData);

export default ConnectedViewerRetrieveStudyData;
