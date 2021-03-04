import OHIF from '@ohif/core';
import { connect } from 'react-redux';
import { StudyBrowser } from '@ohif/ui';
import cloneDeep from 'lodash.clonedeep';
import findDisplaySetByUID from './findDisplaySetByUID';
import { servicesManager } from './../App.js';

const { studyMetadataManager } = OHIF.utils;

const { clearViewportSpecificData, setActiveViewportSpecificData, setViewportLayoutAndData } = OHIF.redux.actions;

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
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onThumbnailClick: displaySetInstanceUID => {
      console.log("onThumbnailClick");
      console.log(ownProps.studyMetadata);

      let displaySet = findDisplaySetByUID(
        ownProps.studyMetadata,
        displaySetInstanceUID
      );

      if (displaySet.isDerived) {
        const { Modality } = displaySet;
        if (Modality === 'SEG' && servicesManager) {
          const {LoggerService, UINotificationService} = servicesManager.services;
          const onDisplaySetLoadFailureHandler = error => {
            LoggerService.error({ error, message: error.message });
            UINotificationService.show({
              title: 'DICOM Segmentation Loader',
              message: error.message,
              type: 'error',
              autoClose: true,
            });
          };

          const {referencedDisplaySet, activatedLabelmapPromise} = displaySet.getSourceDisplaySet(
            ownProps.studyMetadata,
            true,
            onDisplaySetLoadFailureHandler
          );
          displaySet = referencedDisplaySet;

          activatedLabelmapPromise.then((activatedLabelmapIndex) => {
            const selectionFired = new CustomEvent("extensiondicomsegmentationsegselected", {
              "detail": {"activatedLabelmapIndex":activatedLabelmapIndex}
            });
            document.dispatchEvent(selectionFired);
          });

        } else {
          displaySet = displaySet.getSourceDisplaySet(ownProps.studyMetadata);
        }

        if (!displaySet) {
          throw new Error(
            `Referenced series for ${Modality} dataset not present.`
          );
        }

        if (!displaySet) {
          throw new Error('Source data not present');
        }
      }

      var numFrames = displaySet.numImageFrames;

      console.log("numFrames in display set found");
      console.log(numFrames);
      console.log(displaySet);

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

      var displaySets = [];
      var viewports = [];

      for (var i=0; i<numFrames; i++) {
        var set = cloneDeep(displaySet);
        set.frameIndex = i;
        displaySets.push(set);
        viewports.push({});
      }
      console.log(sets);

      dispatch(clearViewportSpecificData(0));
      dispatch(setViewportLayoutAndData(
        {numRows: numRows, numColumns: numColumns, viewports: viewports},
        displaySets
      ));

      //dispatch(setActiveViewportSpecificData(displaySet));
    },
  };
};

const ConnectedStudyBrowser = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudyBrowser);

export default ConnectedStudyBrowser;
