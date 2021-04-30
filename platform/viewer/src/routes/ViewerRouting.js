import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { utils, user } from '@ohif/core';
//
import ConnectedViewerRetrieveStudyData from '../connectedComponents/ConnectedViewerRetrieveStudyData';
import useServer from '../customHooks/useServer';
import useQuery from '../customHooks/useQuery';
const { urlUtil: UrlUtil } = utils;
const { setStudyData } = OHIF.redux.actions;

/**
 * Get array of seriesUIDs from param or from queryString
 * @param {*} seriesInstanceUIDs
 * @param {*} location
 */
const getSeriesInstanceUIDs = (seriesInstanceUIDs, routeLocation) => {
  const queryFilters = UrlUtil.queryString.getQueryFilters(routeLocation);
  const querySeriesUIDs = queryFilters && queryFilters['seriesInstanceUID'];
  const _seriesInstanceUIDs = seriesInstanceUIDs || querySeriesUIDs;

  return UrlUtil.paramString.parseParam(_seriesInstanceUIDs);
};

function ViewerRouting({ match: routeMatch, location: routeLocation }) {
  const {
    token,
    project,
    location,
    dataset,
    dicomStore,
    patientID,
    studyInstanceUIDs,
    seriesInstanceUIDs,
  } = routeMatch.params;

  /*
  // Waern: token in query parameters seems to end up in studyInstanceUIDs.
  // So instead of using the below code snippet, we add token as a path component.
  //
  // Set the user's default authToken for outbound DICOMWeb requests.
  // Is only applied if target server does not set `requestOptions` property.
  //
  // See: `getAuthorizationHeaders.js`
  let query = useQuery();
  const authToken = query.get('token');
  console.log(authToken);
  */

  if (token) {
    console.log("setting token");
    console.log(token);
    user.getAccessToken = () => token;
    window.access_token = token;
  }

  const server = useServer({ project, location, dataset, dicomStore });

  const studyUIDs = studyInstanceUIDs ? UrlUtil.paramString.parseParam(studyInstanceUIDs) : [];
  const seriesUIDs = seriesInstanceUIDs ? getSeriesInstanceUIDs(seriesInstanceUIDs, routeLocation) : [];

  console.log("studyUIDs:");
  console.log(studyUIDs);

  useEffect(() => {
    studyUIDs.forEach(uid => {
      dispatch(setStudyData(uid, {}));
    });
  });

  if (server && studyUIDs) {
    //studyInstanceUIDs={studyUIDs}
    return (
      <ConnectedViewerRetrieveStudyData
        seriesInstanceUIDs={seriesUIDs}
        patientID={patientID}
      />
    );
  }

  return null;
}

ViewerRouting.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      studyInstanceUIDs: PropTypes.string.isRequired,
      seriesInstanceUIDs: PropTypes.string,
      dataset: PropTypes.string,
      dicomStore: PropTypes.string,
      location: PropTypes.string,
      project: PropTypes.string,
    }),
  }),
  location: PropTypes.any,
};

export default ViewerRouting;
