import React from 'react';
import Map from 'components/sections/Map';
import Header from 'components/sections/Header';
import Cards from 'components/sections/Cards';
import Production from 'components/sections/Production';
import TopCities from 'components/sections/TopCities';
import Loading from 'components/sections/Loading';
import mockedMonths from 'mocks/months.json';

export const MonthContext = React.createContext([]);

const INIT_LOADING_STATE = process.env.REACT_APP_DEV_MODE !== '1';

function App() {
  const [loading, setLoading] = React.useState(INIT_LOADING_STATE);
  const [monthCodes, setMonthCodes] = React.useState(mockedMonths);

  window.SD_setMonthCodes = (newMonthCodes) => { setMonthCodes(newMonthCodes); };
  window.SD_setLoading = (isLoading) => { setLoading(isLoading); };

  return (
    <>
      <div className={`app grid__container ${loading ? ' grid__container--loading' : ''}`}>
        <MonthContext.Provider value={monthCodes}>
          <Header setLoading={setLoading} />
          <Cards />
          <Production />
          <TopCities />
          <Map />
        </MonthContext.Provider>
      </div>
      <Loading visible={loading} />
    </>
  );
}

export default App;
