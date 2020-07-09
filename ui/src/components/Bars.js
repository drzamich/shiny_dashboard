import React from 'react';
import MonthSelect from './controls/MonthSelect';
import mockedDates from '../mocks/production_dates.json';
import mockedValues from '../mocks/production_values.json';
import Chart from 'react-apexcharts';

export default function Bars() {
  const [dates, setDates] = React.useState(mockedDates);
  const [values, setValues] = React.useState(mockedValues);

  window.SD_updateProductionData = (newDates, newValues) => {
    console.log(newDates, newValues);
    setDates(newDates);
    setValues(newValues);
  };

  const onMonthChange = (newMonth) => {
    if(window.Shiny) {
      window.Shiny.setInputValue('productionMonth', newMonth);
    }
  };

  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: dates,
    },
  };

  const series = [
    {
      name: 'Units produced',
      data: values,
    },
  ];

  return (
    <section className="bars">
      <Chart type="bar" options={options} series={series} />
      <MonthSelect onChange={onMonthChange} />
    </section>
  );
}
