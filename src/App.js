import React, { useState } from 'react';
import './App.css';
import CanvasWithPattern from './CanvasWithPattern';

function App() {
  const [image, setImage] = useState(
    'https://d2tyu887lcxnka.cloudfront.net/59A3A53CD8C45E6EE7723936089FC571.jpg'
  );

  return (
    <div className="App">
      <header className="App-header">
        <div className="input_container"></div>

        <CanvasWithPattern imageUrl={image} />
      </header>
    </div>
  );
}

export default App;
