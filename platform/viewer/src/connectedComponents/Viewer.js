import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import OHIF, { MODULE_TYPES, DICOMSR } from '@ohif/core';
import { withDialog } from '@ohif/ui';
import jpeg from 'jpeg-js';
import moment from 'moment';
import ToolbarRow from './ToolbarRow.js';
import ConnectedStudyBrowser from './ConnectedStudyBrowser.js';
import ConnectedViewerMain from './ConnectedViewerMain.js';
import SidePanel from './../components/SidePanel.js';
import ErrorBoundaryDialog from './../components/ErrorBoundaryDialog';
import LayoutPickerDialog from './../components/LayoutPickerDialog';
import { extensionManager } from './../App.js';
import { user, utils } from '@ohif/core';
import { api } from 'dicomweb-client';
import dcmjs from 'dcmjs';
const { DicomMessage, DicomMetaDictionary, DicomDict, WriteBufferStream } = dcmjs.data;

// Contexts
import WhiteLabelingContext from '../context/WhiteLabelingContext.js';
import UserManagerContext from '../context/UserManagerContext';
import AppContext from '../context/AppContext';

import './Viewer.css';
import { finished } from 'stream';

const { guid } = utils;

class Viewer extends Component {
  static propTypes = {
    studies: PropTypes.arrayOf(
      PropTypes.shape({
        StudyInstanceUID: PropTypes.string.isRequired,
        StudyDate: PropTypes.string,
        PatientID: PropTypes.string,
        series: PropTypes.arrayOf(
          PropTypes.shape({
            SeriesInstanceUID: PropTypes.string.isRequired
          })
        ),
        displaySets: PropTypes.arrayOf(
          PropTypes.shape({
            displaySetInstanceUID: PropTypes.string.isRequired,
            SeriesInstanceUID: PropTypes.string.isRequired,
            SeriesDescription: PropTypes.string,
            SeriesNumber: PropTypes.number,
            InstanceNumber: PropTypes.number,
            numImageFrames: PropTypes.number,
            Modality: PropTypes.string.isRequired,
            images: PropTypes.arrayOf(
              PropTypes.shape({
                getImageId: PropTypes.func.isRequired
              })
            ),
          })
        ),
      })
    ),
    studyInstanceUIDs: PropTypes.array,
    activeServer: PropTypes.shape({
      type: PropTypes.string,
      wadoRoot: PropTypes.string,
    }),
    onTimepointsUpdated: PropTypes.func,
    onMeasurementsUpdated: PropTypes.func,
    onMaximize: PropTypes.func,
    onNewStudy: PropTypes.func,
    afterUpload: PropTypes.func,
    // window.store.getState().viewports.viewportSpecificData
    viewports: PropTypes.object.isRequired,
    // window.store.getState().viewports.activeViewportIndex
    activeViewportIndex: PropTypes.number.isRequired,
    isStudyLoaded: PropTypes.bool,
    dialog: PropTypes.object,
    maximized: PropTypes.bool.isRequired,
    patientID: PropTypes.string
  };

  constructor(props) {
    super(props);

    const { activeServer } = this.props;
    const server = Object.assign({}, activeServer);

    OHIF.measurements.MeasurementApi.setConfiguration({
      dataExchange: {
        retrieve: DICOMSR.retrieveMeasurements,
        store: DICOMSR.storeMeasurements,
      },
      server,
    });

    OHIF.measurements.TimepointApi.setConfiguration({
      dataExchange: {
        retrieve: this.retrieveTimepoints,
        store: this.storeTimepoints,
        remove: this.removeTimepoint,
        update: this.updateTimepoint,
        disassociate: this.disassociateStudy,
      },
    });

    this._getActiveViewport = this._getActiveViewport.bind(this);
  }

  state = {
    isLeftSidePanelOpen: true,
    isRightSidePanelOpen: false,
    isSelectingLayout: false,
    selectedRightSidePanel: '',
    selectedLeftSidePanel: 'studies', // TODO: Don't hardcode this
    thumbnails: [],
  };

  componentWillUnmount() {
    if (this.props.dialog) {
      this.props.dialog.dismissAll();
    }
  }

  retrieveTimepoints = filter => {
    OHIF.log.info('retrieveTimepoints');

    // Get the earliest and latest study date
    let earliestDate = new Date().toISOString();
    let latestDate = new Date().toISOString();
    if (this.props.studies) {
      latestDate = new Date('1000-01-01').toISOString();
      this.props.studies.forEach(study => {
        const StudyDate = moment(study.StudyDate, 'YYYYMMDD').toISOString();
        if (StudyDate < earliestDate) {
          earliestDate = StudyDate;
        }
        if (StudyDate > latestDate) {
          latestDate = StudyDate;
        }
      });
    }

    // Return a generic timepoint
    return Promise.resolve([
      {
        timepointType: 'baseline',
        timepointId: 'TimepointId',
        studyInstanceUIDs: this.props.studyInstanceUIDs,
        PatientID: filter.PatientID,
        earliestDate,
        latestDate,
        isLocked: false,
      },
    ]);
  };

  storeTimepoints = timepointData => {
    OHIF.log.info('storeTimepoints');
    return Promise.resolve();
  };

  updateTimepoint = (timepointData, query) => {
    OHIF.log.info('updateTimepoint');
    return Promise.resolve();
  };

  removeTimepoint = timepointId => {
    OHIF.log.info('removeTimepoint');
    return Promise.resolve();
  };

  disassociateStudy = (timepointIds, StudyInstanceUID) => {
    OHIF.log.info('disassociateStudy');
    return Promise.resolve();
  };

  onTimepointsUpdated = timepoints => {
    if (this.props.onTimepointsUpdated) {
      this.props.onTimepointsUpdated(timepoints);
    }
  };

  onMeasurementsUpdated = measurements => {
    if (this.props.onMeasurementsUpdated) {
      this.props.onMeasurementsUpdated(measurements);
    }
  };

  componentDidMount() {
    const { studies, isStudyLoaded } = this.props;
    const { TimepointApi, MeasurementApi } = OHIF.measurements;
    const currentTimepointId = 'TimepointId';

    const timepointApi = new TimepointApi(currentTimepointId, {
      onTimepointsUpdated: this.onTimepointsUpdated,
    });

    const measurementApi = new MeasurementApi(timepointApi, {
      onMeasurementsUpdated: this.onMeasurementsUpdated,
    });

    this.currentTimepointId = currentTimepointId;
    this.timepointApi = timepointApi;
    this.measurementApi = measurementApi;

    if (studies) {
      const PatientID = studies[0] && studies[0].PatientID;

      timepointApi.retrieveTimepoints({ PatientID });
      if (isStudyLoaded) {
        this.measurementApi.retrieveMeasurements(PatientID, [
          currentTimepointId,
        ]);
      }

      this.setState({
        thumbnails: _mapStudiesToThumbnails(studies),
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { studies, isStudyLoaded } = this.props;

    if (studies !== prevProps.studies) {
      this.setState({
        thumbnails: _mapStudiesToThumbnails(studies),
      });
    }
    if (isStudyLoaded && isStudyLoaded !== prevProps.isStudyLoaded) {
      const PatientID = studies[0] && studies[0].PatientID;
      const { currentTimepointId } = this;

      this.timepointApi.retrieveTimepoints({ PatientID });
      this.measurementApi.retrieveMeasurements(PatientID, [currentTimepointId]);
    }
  }

  _getActiveViewport() {
    return this.props.viewports[this.props.activeViewportIndex];
  }

  getClient(url) {
    const token = window.access_token;
    const headers = {Authorization: 'Bearer ' + token};
    return new api.DICOMwebClient({url, headers});
  }

  createNewStudy(layout) {
    // dialog should return some representation of layout, like frames, positions, etc
    // then we create new study, series, structured display from that
    // http://dicom.nema.org/medical/dicom/current/output/html/part18.html#chapter_F
    
    const fileMetaInformationVersionArray = new Uint8Array(2);
    fileMetaInformationVersionArray[1] = 1;

    const metadata = {
      "00020001": { Value: [fileMetaInformationVersionArray.buffer], vr: "OB" },
      "00020012": { Value: ["1.2.840.113819.7.1.1997.1.0"], vr: "UI" }, // TODO: update (Implementation Class UID)
      "00020002": { Value: ["1.2.840.10008.5.1.4.1.1.131"], vr: "UI" }, // Media Storage SOP Class UID = Basic Structured Display Storage
      "00020003": { Value: [DicomMetaDictionary.uid()], vr: "UI" },  // Media Storage SOP Instance UID = new uid
      "00020010": { Value: ["1.2.840.10008.1.2"], vr: "UI" } // Transfer Syntax UID
    };

    var numImageBoxes = 1;
    var imageBoxes = [];

    if (layout === 'Panoramic') {
      numImageBoxes = 1;
      imageBoxes = [{
        "00720302": {vr: "US", Value: [0]},
        "00720108": {vr: "FD", Value: [0, 1, 1, 0]} // (x1,y1), (x2,y2)
      }];
    }
    else if (layout === 'Four Bitewings') {
      numImageBoxes = 4;
      var m=0.02;
      var h=0.25;
      imageBoxes = [
        {
          "00720302": {vr: "US", Value: [0]},
          "00720108": {vr: "FD", Value: [0+m, 1-h, 0.25-m/2, 0+h]}
        },
        {
          "00720302": {vr: "US", Value: [1]},
          "00720108": {vr: "FD", Value: [0.25+m/2, 1-h, 0.5-m/2, 0+h]}
        },
        {
          "00720302": {vr: "US", Value: [2]},
          "00720108": {vr: "FD", Value: [0.5+m/2, 1-h, 0.75-m/2, 0+h]}
        },
        {
          "00720302": {vr: "US", Value: [3]},
          "00720108": {vr: "FD", Value: [0.75+m/2, 1-h, 1-m, 0+h]}
        }
      ];
    }
    else if (layout === 'FMX') {
      numImageBoxes = 21;
      var m=0.02;
      var hm=0.03;
      var w=1/7;
      var h=1/3;
      imageBoxes = [
        // left six boxes
        {
          "00720302": {vr: "US", Value: [0]},
          "00720108": {vr: "FD", Value: [0+m, 1-hm, w-m/2, 1+hm/2-h]}
        },
        {
          "00720302": {vr: "US", Value: [1]},
          "00720108": {vr: "FD", Value: [w+m/2, 1-hm, w*2-m/2, 1+hm/2-h]}
        },
        {
          "00720302": {vr: "US", Value: [2]},
          "00720108": {vr: "FD", Value: [0+m, 1-hm/2-h, w-m/2, 1+hm/2-h*2]}
        },
        {
          "00720302": {vr: "US", Value: [3]},
          "00720108": {vr: "FD", Value: [w+m/2, 1-hm/2-h, w*2-m/2, 1+hm/2-h*2]}
        },
        {
          "00720302": {vr: "US", Value: [4]},
          "00720108": {vr: "FD", Value: [0+m, 1-hm/2-h*2, w-m/2, 1+hm/2-h*3]}
        },
        {
          "00720302": {vr: "US", Value: [5]},
          "00720108": {vr: "FD", Value: [w+m/2, 1-hm/2-h*2, w*2-m/2, 1+hm/2-h*3]}
        },
        // middle top boxes
        {
          "00720302": {vr: "US", Value: [6]},
          "00720108": {vr: "FD", Value: [w*2+m/2, 1-hm, w*3-m/2, 1+hm/2-h]}
        },
        {
          "00720302": {vr: "US", Value: [7]},
          "00720108": {vr: "FD", Value: [w*3+m/2, 1-hm, w*4-m/2, 1+hm/2-h]}
        },
        {
          "00720302": {vr: "US", Value: [8]},
          "00720108": {vr: "FD", Value: [w*4+m/2, 1-hm, w*5-m/2, 1+hm/2-h]}
        },
        // middle bottom boxes
        {
          "00720302": {vr: "US", Value: [9]},
          "00720108": {vr: "FD", Value: [w*2+m/2, 1-hm/2-h*2, w*3-m/2, 1+hm/2-h*3]}
        },
        {
          "00720302": {vr: "US", Value: [10]},
          "00720108": {vr: "FD", Value: [w*3+m/2, 1-hm/2-h*2, w*4-m/2, 1+hm/2-h*3]}
        },
        {
          "00720302": {vr: "US", Value: [11]},
          "00720108": {vr: "FD", Value: [w*4+m/2, 1-hm/2-h*2, w*5-m/2, 1+hm/2-h*3]}
        },
        // right six boxes
        {
          "00720302": {vr: "US", Value: [12]},
          "00720108": {vr: "FD", Value: [w*5+m/2, 1-hm, w*6-m/2, 1+hm/2-h]}
        },
        {
          "00720302": {vr: "US", Value: [13]},
          "00720108": {vr: "FD", Value: [w*6+m/2, 1-hm, w*7-m, 1+hm/2-h]}
        },
        {
          "00720302": {vr: "US", Value: [14]},
          "00720108": {vr: "FD", Value: [w*5+m/2, 1-hm/2-h, w*6-m/2, 1+hm/2-h*2]}
        },
        {
          "00720302": {vr: "US", Value: [15]},
          "00720108": {vr: "FD", Value: [w*6+m/2, 1-hm/2-h, w*7-m, 1+hm/2-h*2]}
        },
        {
          "00720302": {vr: "US", Value: [16]},
          "00720108": {vr: "FD", Value: [w*5+m/2, 1-hm/2-h*2, w*6-m/2, 1+hm/2-h*3]}
        },
        {
          "00720302": {vr: "US", Value: [17]},
          "00720108": {vr: "FD", Value: [w*6+m/2, 1-hm/2-h*2, w*7-m, 1+hm/2-h*3]}
        },
      ];
    }

    var structuredDisplay = {
      StudyInstanceUID: guid(),
      SeriesInstanceUID: guid(),
      SOPInstanceUID: guid(),
      SOPClassUID: "1.2.840.10008.5.1.4.1.1.131", // Structured Display
      ImageBoxes: imageBoxes
    };

    var dict = new DicomDict(metadata);
    dict.upsertTag("0020000D", "UI", [structuredDisplay.StudyInstanceUID]); // Study Instance UID
    dict.upsertTag("0020000E", "UI", [structuredDisplay.SeriesInstanceUID]); // Series Instance UID
    dict.upsertTag("00200013", "IS", ["0"]); // Instance Number
    dict.upsertTag("00080018", "UI", [structuredDisplay.SOPInstanceUID]); // SOP Instance UID
    dict.upsertTag("00080016", "UI", [structuredDisplay.SOPClassUID]); 
    dict.upsertTag("00720422", "SQ", structuredDisplay.ImageBoxes); // Structured Display Image Box Sequence
    dict.upsertTag("00100020", "LO", [this.props.patientID]);

    var buffer = dict.write();

    const url = this.props.activeServer.wadoRoot;

    const client = this.getClient(url);
    const props = this.props;
    //var encoder = new TextEncoder();
    //const buffer = encoder.encode(JSON.stringify(dataset));

    client.storeInstances({ datasets: [buffer] }).then(function (result) {
      props.onNewStudy(structuredDisplay);
    });

    // then make dicomWeb call to create these in google healthcare
    // after call, update redux state with new study, series and structured display
    // that state should automatically be reflected by study browser and viewer
  }

  uploadImage() {
    var index = this.props.activeViewportIndex;
    var self = this;
    this.loadImage(function (imageData) {
      self.createNewImageInstance(index, imageData);
    });
  }

  loadImage(onSuccess) {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = e => { 
      var file = e.target.files[0]; 
      var reader = new FileReader();
      reader.onerror = ev => {
        console.log(ev);
      };
      reader.onload = ev => {
        const image = document.createElement('img');
        image.src = ev.target.result;
        image.decode()
          .then(() => {
            var canvas = document.createElement("canvas");
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);
            var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
            onSuccess(imageData);
          })
          .catch(err => {
            console.log(err);
          });
      };
      reader.readAsDataURL(file);
    }

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  }

  createNewImageInstance(index, imageData) {
    var viewport = this.props.viewports[index];
    const fileMetaInformationVersionArray = new Uint8Array(2);
    fileMetaInformationVersionArray[1] = 1;
    const metadata = {
      "00020001": { Value: [fileMetaInformationVersionArray.buffer], vr: "OB" },
      "00020012": { Value: ["1.2.840.113819.7.1.1997.1.0"], vr: "UI" }, // TODO: update (Implementation Class UID)
      "00020002": { Value: ["1.2.840.10008.5.1.4.1.1.1.1"], vr: "UI" }, // Media Storage SOP Class UID = Digital X-Ray Image Storage - For Presentation
      "00020003": { Value: [DicomMetaDictionary.uid()], vr: "UI" },  // Media Storage SOP Instance UID = new uid
      //"00020010": { Value: ["1.2.840.10008.1.2"], vr: "UI" } // Transfer Syntax UID
      "00020010": { Value: ["1.2.840.10008.1.2.4.50"], vr: "UI" } // Transfer Syntax UID
    };

    /*
    var data = {
      SOPInstanceUID: guid(),
      StudyInstanceUID: viewport.StudyInstanceUID,
      SeriesInstanceUID: viewport.SeriesInstanceUID,
    };
    */

    var dict = new DicomDict(metadata);
    dict.upsertTag("00100020", "LO", [this.props.patientID]);
    dict.upsertTag("0020000D", "UI", [viewport.StudyInstanceUID]); // Study Instance UID
    dict.upsertTag("0020000E", "UI", [viewport.SeriesInstanceUID]); // Series Instance UID
    dict.upsertTag("00200013", "IS", [index.toString()]); // Instance Number
    dict.upsertTag("00080018", "UI", [guid()]); // SOP Instance UID
    // Media Storage SOP Class UID = Digital X-Ray Image Storage - For Presentation
    dict.upsertTag("00080016", "UI", ["1.2.840.10008.5.1.4.1.1.1.1"]); 
    dict.upsertTag("00280006", "US", [0]); // Planar Configuration
    dict.upsertTag("00280004", "CS", ["YBR_RCT"]); // Photometric Interpretation
    //dict.upsertTag("00280004", "CS", ["RGB"]); // Photometric Interpretation
    dict.upsertTag("00280002", "US", [3]); // Samples per Pixel
    dict.upsertTag("00280010", "US", [imageData.height]); // Rows
    dict.upsertTag("00280011", "US", [imageData.width]); // Columns
    dict.upsertTag("00280100", "US", [8]); // Bits Allocated
    dict.upsertTag("00280101", "US", [8]); // Bits Stored
    dict.upsertTag("00280102", "US", [7]); // High Bit
    dict.upsertTag("00280103", "US", [0]); // Pixel Representation
    dict.upsertTag("00282110", "CS", ["01"]); // Lossy Image Compression
    dict.upsertTag("00282114", "CS", ["ISO_10918_1"]); // Lossy Image Compression Method
    // TODO instance creation time

    /*
    var argb_buffer = new Uint32Array(imageData.data.buffer);
    var rgb_buffer  = new Uint8Array(new ArrayBuffer(imageData.height*imageData.width*4));
    var j = 0;
    for (var i=0; i<argb_buffer.length; i++) {
      var word = argb_buffer[i];
      rgb_buffer[j+0] = (word & 0x000000ff);
      rgb_buffer[j+1] = (word & 0x0000ff00) >> 8;
      rgb_buffer[j+2] = (word & 0x00ff0000) >> 16;
        j+= 3;
    }
    */
    var jpegImageData = jpeg.encode(imageData, 90);

    // We need to manually pad the buffer to avoid complaints from Google even
    // though dcmjs also adds padding (could be a bug in dcmjs encapsulation logic).
    var buf;
    if (jpegImageData.data.buffer.byteLength & 1) {
      buf = new ArrayBuffer(jpegImageData.data.buffer.byteLength + 1);
      new Uint8Array(buf).set(new Uint8Array(jpegImageData.data.buffer));
    } else {
      buf = jpegImageData.data.buffer;
    }

    //dict.upsertTag("7FE00010", "OB", [rgb_buffer.buffer]); // Pixel Data
    dict.upsertTag("7FE00010", "OB", [buf]); // Pixel Data

    var buffer = dict.write({
      fragmentMultiframe: false, // storeInstances does not seem to work with multiframes
      allowInvalidVRLength: true
    });
    //this.download("test.dcm", buffer);

    const url = this.props.activeServer.wadoRoot;
    const client = this.getClient(url);
    const props = this.props;
    // XXX: we need a spinner here
    client.storeInstances({ datasets: [buffer] }).then(function (result) {
      //var ohifInstanceMetadata = new OHIFInstanceMetadata(data, [], [], data.SOPInstanceUID);
      //viewport.images = [ohifInstanceMetadata]; 
      props.afterUpload();
    });
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  download(filename, buffer) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/dicom;base64,' + this.arrayBufferToBase64(buffer));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  render() {
    var maxDisplaySet;
    for (var i=0; i<this.props.viewports.length; i++) {
      if (this.props.viewports[i].Maximized) {
        maxDisplaySet = this.props.viewports[i];
        break;
      }
    }

    let VisiblePanelLeft, VisiblePanelRight;
    const panelExtensions = extensionManager.modules[MODULE_TYPES.PANEL];

    panelExtensions.forEach(panelExt => {
      panelExt.module.components.forEach(comp => {
        if (comp.id === this.state.selectedRightSidePanel) {
          VisiblePanelRight = comp.component;
        } else if (comp.id === this.state.selectedLeftSidePanel) {
          VisiblePanelLeft = comp.component;
        }
      });
    });

    return (
      <>
        {/* LAYOUT DIALOG */}
        {this.state.isSelectingLayout &&
          <LayoutPickerDialog
            onCancel={() => {
              this.setState({isSelectingLayout: false});
            }}
            onConfirm={result => {
              this.setState({isSelectingLayout: false});
              this.createNewStudy(result);
            }}
          />
        }
        {/* TOOLBAR */}
        <ErrorBoundaryDialog context="ToolbarRow">
          <ToolbarRow
            activeViewport={
              this.props.viewports[this.props.activeViewportIndex]
            }
            isLeftSidePanelOpen={this.state.isLeftSidePanelOpen}
            isRightSidePanelOpen={this.state.isRightSidePanelOpen}
            selectedLeftSidePanel={
              this.state.isLeftSidePanelOpen
                ? this.state.selectedLeftSidePanel
                : ''
            }
            selectedRightSidePanel={
              this.state.isRightSidePanelOpen
                ? this.state.selectedRightSidePanel
                : ''
            }
            handleSidePanelChange={(side, selectedPanel) => {
              const sideClicked = side && side[0].toUpperCase() + side.slice(1);
              const openKey = `is${sideClicked}SidePanelOpen`;
              const selectedKey = `selected${sideClicked}SidePanel`;
              const updatedState = Object.assign({}, this.state);

              const isOpen = updatedState[openKey];
              const prevSelectedPanel = updatedState[selectedKey];
              // RoundedButtonGroup returns `null` if selected button is clicked
              const isSameSelectedPanel =
                prevSelectedPanel === selectedPanel || selectedPanel === null;

              updatedState[selectedKey] = selectedPanel || prevSelectedPanel;

              const isClosedOrShouldClose = !isOpen || isSameSelectedPanel;
              if (isClosedOrShouldClose) {
                updatedState[openKey] = !updatedState[openKey];
              }

              this.setState(updatedState);
            }}
            handleMaximize={this.props.onMaximize}
            handleNewStudy={() => { this.setState({isSelectingLayout: true}); }}
            handleUpload={this.uploadImage.bind(this)}
            studies={this.props.studies}
            maximized={this.props.maximized}
            showMaxMin={
              maxDisplaySet &&
              this.props.activeViewportIndex < maxDisplaySet.numImageFrames
            }
          />
        </ErrorBoundaryDialog>

        {/*<ConnectedStudyLoadingMonitor studies={this.props.studies} />*/}
        {/*<StudyPrefetcher studies={this.props.studies} />*/}

        {/* VIEWPORTS + SIDEPANELS */}
        <div className="FlexboxLayout">
          {/* LEFT */}
          <ErrorBoundaryDialog context="LeftSidePanel">
            <SidePanel from="left" isOpen={this.state.isLeftSidePanelOpen}>
              {VisiblePanelLeft ? (
                <VisiblePanelLeft
                  viewports={this.props.viewports}
                  studies={this.props.studies}
                  activeIndex={this.props.activeViewportIndex}
                />
              ) : (
                <div>
                  <ConnectedStudyBrowser
                    studies={this.state.thumbnails}
                    studyMetadata={this.props.studies}
                  />
                </div>
              )}
            </SidePanel>
          </ErrorBoundaryDialog>

          {/* MAIN */}
          <div className={classNames('main-content')}>
            {this.state.isSelectingLayout ?
              <p>Please select layout...</p> :
              <ErrorBoundaryDialog context="ViewerMain">
                <ConnectedViewerMain
                  studies={this.props.studies}
                  isStudyLoaded={this.props.isStudyLoaded}
                />
              </ErrorBoundaryDialog>
            }
          </div>

          {/* RIGHT */}
          <ErrorBoundaryDialog context="RightSidePanel">
            <SidePanel from="right" isOpen={this.state.isRightSidePanelOpen}>
              {VisiblePanelRight && (
                <VisiblePanelRight
                  isOpen={this.state.isRightSidePanelOpen}
                  viewports={this.props.viewports}
                  studies={this.props.studies}
                  activeIndex={this.props.activeViewportIndex}
                  activeViewport={
                    this.props.viewports[this.props.activeViewportIndex]
                  }
                  getActiveViewport={this._getActiveViewport}
                />
              )}
            </SidePanel>
          </ErrorBoundaryDialog>
        </div>
      </>
    );
  }
}

export default withDialog(Viewer);

/**
 * What types are these? Why do we have "mapping" dropped in here instead of in
 * a mapping layer?
 *
 * TODO[react]:
 * - Add showStackLoadingProgressBar option
 *
 * @param {Study[]} studies
 * @param {DisplaySet[]} studies[].displaySets
 */
const _mapStudiesToThumbnails = function(studies) {
  return studies.map(study => {
    const { StudyInstanceUID } = study;

    const thumbnails = study.series.map(series => {
      var displaySet = undefined
      var numImageFrames = 1;
      for (var i=0; i<study.displaySets.length; i++) {
        const set = study.displaySets[i];
        if (set.SeriesInstanceUID === series.SeriesInstanceUID) {
          if (!displaySet) displaySet = set;
          if (set.Maximized) numImageFrames = set.numImageFrames;
        }
      }

      if (!displaySet) {
        return null;
      }

      const {
        displaySetInstanceUID,
        SeriesDescription,
        InstanceNumber,
        SeriesInstanceUID,
        SeriesNumber,
      } = displaySet;

      let imageId;
      let altImageText;

      if (displaySet.Modality && displaySet.Modality === 'SEG') {
        // TODO: We want to replace this with a thumbnail showing
        // the segmentation map on the image, but this is easier
        // and better than what we have right now.
        altImageText = 'SEG';
      } else if (displaySet.images && displaySet.images.length) {
        const imageIndex = Math.floor(displaySet.images.length / 2);

        imageId = displaySet.images[imageIndex].getImageId();
      } else {
        altImageText = displaySet.Modality ? displaySet.Modality : '';
      }

      return {
        imageId,
        altImageText,
        displaySetInstanceUID,
        SeriesDescription,
        InstanceNumber,
        numImageFrames,
        SeriesInstanceUID,
        SeriesNumber,
      };
    }).filter(x => x);

    return {
      StudyInstanceUID,
      thumbnails,
    };
  });
};
