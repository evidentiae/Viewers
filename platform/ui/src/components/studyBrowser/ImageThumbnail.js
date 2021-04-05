/* global cornerstone */
import './ImageThumbnail.styl';

import { utils } from '@ohif/core';
import React, { useState, useEffect, createRef } from 'react';
import classNames from 'classnames';

import PropTypes from 'prop-types';
import ViewportErrorIndicator from '../../viewer/ViewportErrorIndicator';
import ViewportLoadingIndicator from '../../viewer/ViewportLoadingIndicator';

// TODO: How should we have this component depend on Cornerstone?
// - Passed in as a prop?
// - Set as external dependency?
// - Pass in the entire load and render function as a prop?
//import cornerstone from 'cornerstone-core';
function ImageThumbnail(props) {
  const {
    active,
    width,
    height,
    imageSrc,
    imageId,
    stackPercentComplete,
    error: propsError,
  } = props;

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState({});
  const canvasRef = createRef();

  let loadingOrError;
  let cancelablePromise;

  if (propsError || error) {
    loadingOrError = <ViewportErrorIndicator />;
  } else if (isLoading) {
    loadingOrError = <ViewportLoadingIndicator />;
  }

  const showStackLoadingProgressBar = stackPercentComplete !== undefined;

  const shouldRenderToCanvas = () => {
    return imageId && !imageSrc;
  };

  const fetchImagePromise = () => {
    if (!cancelablePromise) {
      return;
    }

    setLoading(true);
    cancelablePromise
      .then(response => {
        setImage(response);
      })
      .catch(error => {
        if (error.isCanceled) {
          // If there is an actual error in loading the image,
          // then isCanceled is still true (for some reason).
          // In that case we must still set the error flag to
          // signal that we should not retry the image fetch.
          if (error.hasOwnProperty('error')) {
            setLoading(false);
            setError(true);
          }
          return;
        }
        setLoading(false);
        setError(true);
        //throw new Error(error);
      });
  };

  const setImagePromise = () => {
    if (shouldRenderToCanvas()) {
      cancelablePromise = utils.makeCancelable(
        cornerstone.loadAndCacheImage(imageId)
      );
    }
  };

  const purgeCancelablePromise = () => {
    if (cancelablePromise) {
      cancelablePromise.cancel();
    }
  };

  useEffect(() => {
    return () => {
      purgeCancelablePromise();
    };
  }, [purgeCancelablePromise]);

  useEffect(() => {
    if (image.imageId) {
      cornerstone.renderToCanvas(canvasRef.current, image);
      setLoading(false);
    }
  }, [canvasRef, image, image.imageId]);

  useEffect(() => {
    if (!error && (!image.imageId || image.imageId !== imageId)) {
      purgeCancelablePromise();
      setImagePromise();
      fetchImagePromise();
    }
  }, [fetchImagePromise, image.imageId, imageId, purgeCancelablePromise, setImagePromise, error]);

  return (
    <div className={classNames('ImageThumbnail', { active: active })}>
      <div className="image-thumbnail-canvas">
        {shouldRenderToCanvas() ? (
          <canvas ref={canvasRef} width={width} height={height} />
        ) : (
            <img
              className="static-image"
              src={imageSrc}
              //width={this.props.width}
              height={height}
              alt={''}
            />
          )}
      </div>
      {loadingOrError}
      {showStackLoadingProgressBar && (
        <div className="image-thumbnail-progress-bar">
          <div
            className="image-thumbnail-progress-bar-inner"
            style={{ width: `${stackPercentComplete}%` }}
          />
        </div>
      )}
      {isLoading && <div className="image-thumbnail-loading-indicator"></div>}
    </div>
  );
}

ImageThumbnail.propTypes = {
  active: PropTypes.bool,
  imageSrc: PropTypes.string,
  imageId: PropTypes.string,
  error: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  stackPercentComplete: PropTypes.number.isRequired,
};

ImageThumbnail.defaultProps = {
  active: false,
  error: false,
  stackPercentComplete: 0,
  width: 217,
  height: 123,
};

export default ImageThumbnail;
