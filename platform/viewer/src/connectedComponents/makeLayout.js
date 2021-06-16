// if seriesInstanceUID is null, we use first series
export default function makeLayout(studies, seriesInstanceUID) {
  console.log("MAKE_LAYOUT");
  console.log(studies);
  console.log(seriesInstanceUID);

  var studyUID = null;
  var seriesUID = seriesInstanceUID;
  var series;
  var displaySets;
  var found = false;
  if (seriesUID) {
    for (var i=0; i<studies.length; i++) {
      for (var j=0; j<studies[i].series.length; j++) {
        if (studies[i].series[j].SeriesInstanceUID === seriesUID) {
          console.log("found active series");
          studyUID = studies[i].StudyInstanceUID;
          displaySets = studies[i].displaySets;
          series = studies[i].series[j];
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
    series = studies[0].series[0];
    displaySets = studies[0].displaySets;
  }

  var numFrames = 0;
  var numRows = 1;
  var numColumns = 1;
  var foundStructuredDisplay = false;

  for (var i=0; i<series.instances.length; i++) {
    var instance = series.instances[i];
    if (instance.metadata.MediaStorageSOPClassUID === '1.2.840.10008.5.1.4.1.1.131') {
      // structured display
      foundStructuredDisplay = true;
      numFrames = instance.metadata.StructuredDisplayImageBoxSequence.length;
      // TODO: take position etc, change our layout data format in store
      if (numFrames === 4) { // HACK
        numRows = 1;
        numColumns = 4;
      }
    }
  }

  if (!foundStructuredDisplay) {
    numFrames = 0;
    for (var i = 0; i < displaySets.length; i++) {
      if (!displaySets[i].Maximized) numFrames++;
    }

    // XXX: copied from ConnectedStudyBrowser
    // XXX: clean up, handle all cases, and share code

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
  }

  var viewports = [];
  for (var i=0; i<numFrames; i++) {
    viewports.push({plugin: "cornerstone"});
  }

  return {
    layout: {numRows: numRows, numColumns: numColumns, viewports: viewports},
    data: displaySets,
    activeSeriesUID: seriesUID 
  };
}
