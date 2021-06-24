import { connect } from 'react-redux';
import Viewer from './Viewer.js';
import OHIF from '@ohif/core';

const { setTimepoints, setMeasurements, maximize, setStudyData, setActiveSeries, setLayout } = OHIF.redux.actions;

const getActiveServer = servers => {
  const isActive = a => a.active === true;
  return servers.servers.find(isActive);
};

const mapStateToProps = state => {
  const { viewports, servers } = state;
  return {
    viewports: viewports.viewportSpecificData,
    activeViewportIndex: viewports.activeViewportIndex,
    activeServer: getActiveServer(servers),
    maximized: viewports.maximized
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTimepointsUpdated: timepoints => {
      dispatch(setTimepoints(timepoints));
    },
    onMeasurementsUpdated: measurements => {
      dispatch(setMeasurements(measurements));
    },
    onMaximize: () => {
      dispatch(maximize());
    },
    onNewStudy: (structuredDisplay, layout) => {
      // NOTE: order of dispatch matters
      dispatch(setActiveSeries(structuredDisplay.SeriesInstanceUID));
      dispatch(setStudyData(structuredDisplay.StudyInstanceUID, structuredDisplay));
      //dispatch(setLayout(layout)); let it be updated after retrieve study data is done
    },
  };
};

const ConnectedViewer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer);

export default ConnectedViewer;
