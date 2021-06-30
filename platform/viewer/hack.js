  if (minPixelValue < 0) {
    while (storedPixelDataIndex < numPixels) {
      canvasImageDataData[canvasImageDataIndex++] = lut[pixelData[storedPixelDataIndex++] + -minPixelValue]; // Red

      canvasImageDataData[canvasImageDataIndex++] = lut[pixelData[storedPixelDataIndex++] + -minPixelValue]; // Green

      canvasImageDataData[canvasImageDataIndex++] = lut[pixelData[storedPixelDataIndex] + -minPixelValue]; // Blue
      canvasImageDataData[canvasImageDataIndex++] = 255;

      storedPixelDataIndex += 2;
    }
  } else {
    while (storedPixelDataIndex < numPixels) {
      canvasImageDataData[canvasImageDataIndex++] = lut[pixelData[storedPixelDataIndex++]]; // Red

      canvasImageDataData[canvasImageDataIndex++] = lut[pixelData[storedPixelDataIndex++]]; // Green

      canvasImageDataData[canvasImageDataIndex++] = lut[pixelData[storedPixelDataIndex]]; // Blue
      canvasImageDataData[canvasImageDataIndex++] = 255; // Alpha

      storedPixelDataIndex += 2;
    }
  }














/* harmony default export */ __webpack_exports__["default"] = (function (enabledElement, image) {
  var renderCanvas = enabledElement.renderingTools.renderCanvas; // Resize the canvas

  renderCanvas.width = image.width;
  renderCanvas.height = image.height;
  var canvasContext = renderCanvas.getContext('2d'); // NOTE - we need to fill the render canvas with white pixels since we
  // control the luminance using the alpha channel to improve rendering performance.

  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(0, 0, renderCanvas.width, renderCanvas.height);
  //var renderCanvasData = canvasContext.getImageData(0, 0, image.width, image.height);
  enabledElement.renderingTools.renderCanvasContext = canvasContext;
  //enabledElement.renderingTools.renderCanvasData = renderCanvasData;
  //enabledElement.renderingTools.renderCanvasData = new Uint32Array(image.width*image.height);

  var imageData = canvasContext.createImageData(image.width, image.height);
  /*
  imageData.data.fill(0xffffffff);
  for (let i=0; i<imageData.data.length; i += 4) {
    imageData.data[i+0] = 255; // R value
    imageData.data[i+1] = 255; // G value
    imageData.data[i+2] = 255; // B value
    imageData.data[i+3] = 255; // A value
  }
  */
  enabledElement.renderingTools.renderCanvasData = imageData;
});
