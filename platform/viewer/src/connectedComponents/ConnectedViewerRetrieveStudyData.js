import { connect } from 'react-redux';
import ViewerRetrieveStudyData from './ViewerRetrieveStudyData.js';
import OHIF from '@ohif/core';
import makeLayout from './makeLayout.js';

const { clearViewportSpecificData, setStudyData, setActiveSeries } = OHIF.redux.actions;
const isActive = a => a.active === true;

const mapStateToProps = (state, ownProps) => {
  const activeServer = state.servers.servers.find(isActive);
  const studyInstanceUIDs = Object.keys(state.studies.studyData);

  console.log('mapStateToProps:');
  console.log(state.viewports.activeSeries);

  return {
    server: ownProps.server || activeServer,
    studyInstanceUIDs: studyInstanceUIDs,
    activeSeries: state.viewports.activeSeries,
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
      // TODO: maybe move makeLayout logic to reducers? We should be able to find
      // eveything in the 'studies' part of the store.
      console.log('doneLoadingStudies:');
      console.log(activeSeries);
      var stuff = makeLayout(studies, activeSeries);
      dispatch(setActiveSeries(stuff.activeSeriesUID, stuff.layout, stuff.data));
    }
  };
};

const ConnectedViewerRetrieveStudyData = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerRetrieveStudyData);

export default ConnectedViewerRetrieveStudyData;
