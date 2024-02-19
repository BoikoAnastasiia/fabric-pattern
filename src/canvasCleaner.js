export const CanvasCleaner = (canvas) => {
  [
    canvas.lowerCanvasEl,
    canvas.cacheCanvasEl,
    canvas.upperCanvasEl,
    canvas.contextCache.canvas,
    canvas.contextContainer.canvas,
    canvas.contextTop.canvas,
    // fabric._measuringContext.canvas
  ].forEach((el) => {
    el.width = 1;
    el.height = 1;
    let elemCTX = el.getContext('2d');
    elemCTX.clearRect(0, 0, 1, 1);
    el = null;
    elemCTX = null;
  });

  canvas._objects.forEach((element) => {
    clearCanvas(element);
  });

  function clearCanvas(element) {
    element.objectCaching = false;
    if (element._cacheCanvas) {
      element._cacheCanvas.width = 1;
      element._cacheCanvas.height = 1;
      element._cacheContext.clearRect(0, 0, 1, 1);
      element._cacheCanvas.remove();
      element._cacheCanvas = null;
      element._cacheContext = null;
    }

    if (element.clipPath && element.clipPath._cacheCanvas) {
      element.clipPath._cacheCanvas.width = 1;
      element.clipPath._cacheCanvas.height = 1;
      element.clipPath._cacheContext.clearRect(0, 0, 1, 1);
      element.clipPath._cacheCanvas.remove();
      element.clipPath._cacheCanvas = null;
      element.clipPath._cacheContext = null;
    }

    if (element._element && element._element.tagName === 'CANVAS') {
      element._element.width = 1;
      element._element.height = 1;
      let elemCTX = element._element.getContext('2d');
      elemCTX.clearRect(0, 0, 1, 1);
      element._element.remove();
      element._element = null;
      elemCTX = null;
    }

    if (element._filteredEl) {
      element._filteredEl.width = 1;
      element._filteredEl.height = 1;
      let elemCTX = element._filteredEl.getContext('2d');
      elemCTX.clearRect(0, 0, 1, 1);
      element._filteredEl.remove();
      element._filteredEl = null;
      elemCTX = null;
    }
  }

  if (canvas.freeDrawingBrush) {
    let element = canvas.freeDrawingBrush.canvas;
    if (element.clipPath) {
      element.clipPath._cacheCanvas.width = 1;
      element.clipPath._cacheCanvas.height = 1;
      element.clipPath._cacheContext.clearRect(0, 0, 1, 1);
      element.clipPath._cacheCanvas.remove();
      element.clipPath._cacheCanvas = null;
      element.clipPath._cacheContext = null;
    }
  }

  if (canvas.clipPath && canvas.clipPath._cacheCanvas) {
    let canvasElement = canvas.clipPath._cacheCanvas;
    let canvasElementCTX = canvas.clipPath._cacheContext;

    canvasElement.width = 1;
    canvasElement.height = 1;
    canvasElementCTX.clearRect(0, 0, 1, 1);
    canvasElement.remove();
    canvasElement = null;
    canvasElementCTX = null;
  }

  canvas.dispose();
};
