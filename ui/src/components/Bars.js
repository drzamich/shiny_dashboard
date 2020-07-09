import React from 'react';
import ReactFrappeChart from 'react-frappe-charts';
import MonthSelect from './MonthSelect';
import mockedDates from '../mocks/production_dates.json';
import mockedValues from '../mocks/production_values.json';

export default function Bars() {
  const [dates, setDates] = React.useState(mockedDates);
  const [values, setValues] = React.useState(mockedValues);

  window.SD_updateProductionData = (newDates, newValues) => {
    console.log(newDates, newValues);
    setDates(newDates);
    setValues(newValues);
  };

  const onMonthChange = (newMonth) => {};

  return (
    <section className="bars">
    <ReactFrappeChart
      type="bar"
      colors={['#21ba45']}
      axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: 1 }}
      height={250}
      data={{
        labels: dates,
        datasets: [{ values }]
      }}
    />
      <MonthSelect onChange={onMonthChange} />
    </section>
  );
}
