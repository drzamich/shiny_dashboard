import React from 'react';
import SalesMap from './SalesMap';

function App() {
  return (
    <div className="App">
      Hello world2!
      <SalesMap ref={(map) => { window.map = map }} />
    </div>
  );
}

export default App;
