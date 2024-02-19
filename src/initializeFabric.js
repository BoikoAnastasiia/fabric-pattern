import { fabric } from 'fabric';

export const initializeFabric = ({ element }) => {
  fabric.Object.NUM_FRACTION_DIGITS = 20;

  const canvas = new fabric.Canvas(element, {
    preserveObjectStacking: true,
    includeDefaultValues: false,
    controlsAboveOverlay: true,
  });
  // window.fabricCanvas = canvas;
  return canvas;
};
