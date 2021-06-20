import cloneDeep from 'lodash.clonedeep';

const defaultState = {
  studyData: {},
  activeSeries: null
};

const servers = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_STUDY_DATA': {
      const updatedStudyData = cloneDeep(state.studyData);
      updatedStudyData[action.StudyInstanceUID] = cloneDeep(action.data);

      return Object.assign({}, state, { studyData: updatedStudyData });
    }
    case 'SET_ACTIVE_SERIES': {
      var r = Object.assign({}, state, { activeSeries: action.SeriesInstanceUID }); 
      return r;
    }
    default:
      return state;
  }
};

export default servers;
