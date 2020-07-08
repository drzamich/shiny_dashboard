import React from 'react';
import Map from './Map';
import Header from './Header';
import Cards from './Cards';
import Bars from './Bars';
import Summary from './Summary';
import Loading from './Loading';
import mockedMonths from '../mocks/months.json'

export const MonthContext = React.createContext([]);

function App() {
  const [loading, setLoading] = React.useState(false);
  const [monthCodes, setMonthCodes] = React.useState(mockedMonths);

  window.SD_setMonthCodes = (newMonthCodes) => { setMonthCodes(newMonthCodes); };
  window.SD_setLoading = (isLoading) => { setLoading(isLoading); };

  if (loading) return <Loading />;

  return (
    <div className="app" data-testid="app">
      <MonthContext.Provider value={monthCodes}>
        <Header />
        <Cards />
        <Bars />
        <Summary />
        <Map />
      </MonthContext.Provider>
    </div>
  );
}

export default App;
