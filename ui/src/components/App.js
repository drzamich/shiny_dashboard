import React from 'react';
import Map from './Map';
import Header from './Header';
import Cards from './Cards';
import Bars from './Bars';
import Summary from './Summary';
import Loading from './Loading';

function App() {
  const [loading, setLoading] = React.useState(true);
  window.setLoading = (isLoading) => { setLoading(isLoading); };

  if (loading) return <Loading />;

  return (
    <div className="app" data-testid="app">
      <Header />
      <Cards ref={(cards) => { window.cards = cards; }} />
      <Bars />
      <Summary />
      <Map ref={(map) => { window.map = map; }} />
    </div>
  );
}

export default App;
