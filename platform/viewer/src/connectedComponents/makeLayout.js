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
  var foundStructuredDisplay = false;
  var viewports = [];

  for (var i=0; i<series.instances.length; i++) {
    var instance = series.instances[i];
    if (instance.metadata.MediaStorageSOPClassUID === '1.2.840.10008.5.1.4.1.1.131') {
      // structured display
      foundStructuredDisplay = true;
      numFrames = instance.metadata.StructuredDisplayImageBoxSequence.length;
      for (var j=0; j<numFrames; j++) {
        var imageBox = instance.metadata.StructuredDisplayImageBoxSequence[j];
        var position = imageBox.DisplayEnvironmentSpatialPosition;
        var pos = {x1: position[0], y1: position[1], x2: position[2], y2: position[3]};
        //var imageInstanceUID = imageBox.ReferencedImageSequence && imageBox.ReferencedImageSequence.length > 0 ? imageBox.ReferencedImageSequence[0] : null;
        viewports.push({
          pos: pos,
          instanceNumber: imageBox.ImageBoxNumber,
          plugin: "cornerstone"
        });
      }
    }
  }

  if (!foundStructuredDisplay) {
    numFrames = 0;
    for (var i = 0; i < displaySets.length; i++) {
      if (!displaySets[i].Maximized) numFrames++;
    }

    var numRows = 1;
    var numColumns = 1;

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

    var width = 1/numColumns;
    var height = 1/numRows;
    var number = 0;
    for (var y=0; y<numRows; y++) {
      for (var x=0; x<numColumns; x++) {
        var pos = {x1: x*width, y1: 1 - y*height, x2: (x+1)*width, y2: 1 - (y+1)*height};
        viewports.push({
          pos: pos,
          instanceNumber: number++,
          plugin: "cornerstone"
        });
      }
    }
  }

  /*
  var viewports = [];
  for (var i=0; i<numFrames; i++) {
    viewports.push({plugin: "cornerstone"});
  }
  */

  return {
    layout: viewports, //{numRows: numRows, numColumns: numColumns, viewports: viewports},
    data: displaySets,
    activeSeriesUID: seriesUID 
  };
}
