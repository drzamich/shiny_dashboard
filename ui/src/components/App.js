import React from 'react';
import Map from './Map';
import Header from './Header';
import Cards from './Cards';
import Bars from './Bars';
import Summary from './Summary';

function App() {
  return (
    <>
      <Header />
      <Cards />
      <Bars />
      <Summary />
      <Map ref={(map) => { window.map = map }} />
    </>
  );
}

export default App;
