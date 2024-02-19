import React, { useEffect, useRef, useState, useCallback } from 'react';
import { fabric } from 'fabric';
import { initializeFabric } from './initializeFabric';
import { CanvasCleaner } from './canvasCleaner';

const CanvasWithCirclePattern = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const [circle, setCircle] = useState(null);
  const [editableImage, setEditableImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [pattern, setPattern] = useState(null);

  useEffect(() => {
    window.fabricCanvas = initializeFabric({
      element: canvasRef.current,
    });
    const canvas = window.fabricCanvas;

    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        img.scaleToHeight(300);
        const patternSourceCanvas = new fabric.StaticCanvas();
        patternSourceCanvas.add(img);
        patternSourceCanvas.setDimensions({
          width: img.getScaledWidth(),
          height: img.getScaledHeight(),
        });
        patternSourceCanvas.renderAll();

        const newPattern = new fabric.Pattern({
          source: patternSourceCanvas.getElement(),
          repeat: 'no-repeat',
        });

        const newCircle = new fabric.Circle({
          radius: 150,
          left: 150,
          top: 150,
          fill: newPattern,
          id: 'circle',
        });
        canvas.add(newCircle);
        setPattern(newPattern);
        setCircle(newCircle);
      },
      { crossOrigin: 'anonymous' }
    );

    return () => {
      CanvasCleaner(window.fabricCanvas);
    };
  }, [imageUrl]);

  const toggleEdit = useCallback(() => {
    const canvas = window.fabricCanvas;

    if (!isEditing) {
      circle.set({ visible: false });
      fabric.Image.fromURL(
        imageUrl,
        (img) => {
          console.log(pattern);
          const newEditableImage = new fabric.Image(img.getElement(), {
            left: circle.left,
            top: circle.top,
            scaleX: pattern.source.width / img.getScaledWidth() || 1,
            scaleY: pattern.source.height / img.getScaledHeight() || 1,
            angle: circle.angle,
            selectable: true,
            hasControls: true,
            id: 'editableImage',
          });
          canvas.add(newEditableImage).setActiveObject(newEditableImage);
          setEditableImage(newEditableImage);
        },
        { crossOrigin: 'anonymous' }
      );
      setIsEditing(true);
    } else {
      // Hide the editable image and show the circle
      if (editableImage) {
        // Update the pattern source with transformations applied to the editable image
        const patternSourceCanvas = new fabric.StaticCanvas();
        patternSourceCanvas.add(editableImage);
        patternSourceCanvas.setDimensions({
          width: editableImage.width * editableImage.scaleX,
          height: editableImage.height * editableImage.scaleY,
        });
        patternSourceCanvas.renderAll();
        patternSourceCanvas.setZoom(editableImage.scaleX);
        // Update the circle's pattern and make it visible again
        const updatedPattern = new fabric.Pattern({
          source: patternSourceCanvas.getElement(),
          repeat: 'no-repeat',
          offsetX: -editableImage.left, // Use negative offsets to counter the movement of the image
          offsetY: -editableImage.top,
        });
        circle.set({ fill: updatedPattern, visible: true });

        canvas.remove(editableImage);
        setEditableImage(null);
      }
      setIsEditing(false);
    }
    canvas.requestRenderAll();
  }, [isEditing, circle, editableImage, imageUrl]);

  return (
    <div className="canvas_container">
      <button onClick={toggleEdit}>
        {isEditing ? 'Finish Editing' : 'Edit Pattern'}
      </button>
      <canvas ref={canvasRef} width="800" height="600" />
    </div>
  );
};

export default CanvasWithCirclePattern;
