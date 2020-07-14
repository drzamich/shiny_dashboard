import React from 'react';
import Map from './Map';
import Header from './Header';
import Cards from './Cards';
import Production from './Production';
import TopCities from './TopCities';
import Loading from './Loading';
import mockedMonths from '../mocks/months.json';

export const MonthContext = React.createContext([]);

const INIT_LOADING_STATE = process.env.REACT_APP_DEV_MODE !== '1';

function App() {
  const [loading, setLoading] = React.useState(INIT_LOADING_STATE);
  const [monthCodes, setMonthCodes] = React.useState(mockedMonths);

  window.SD_setMonthCodes = (newMonthCodes) => { setMonthCodes(newMonthCodes); };
  window.SD_setLoading = (isLoading) => { setLoading(isLoading); };

  if (loading) return <Loading />;

  return (
    <div className="app grid__container" data-testid="app">
      <MonthContext.Provider value={monthCodes}>
        <Header setLoading={setLoading} />
        <Cards />
        <Production />
        <TopCities />
        <Map />
      </MonthContext.Provider>
    </div>
  );
};

export default App;
