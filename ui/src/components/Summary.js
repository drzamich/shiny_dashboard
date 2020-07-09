import React from 'react';
import Chart from 'react-apexcharts';

import MonthSelect from './controls/MonthSelect';
import mockedData from '../mocks/top_sales.json';

export default function Summary() {
  const [data, setData] = React.useState(mockedData);

  window.SD_updateTopSales = (newData) => {
    setData(newData);
  };

  const onMonthChange = (newMonth) => {
    if (window.Shiny) {
      window.Shiny.setInputValue('topSalesMonth', newMonth);
    }
  };

  const cities = data.map(({ loc_city }) => loc_city);
  const profits = data.map(({ total_profit }) => total_profit);

  const series = [
    {
      name: 'Total profit',
      data: profits
    },
  ];
  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: cities
    },
  };

  return (
    <section className="summary">
      Top 3 cities by revenue
      <Chart type="bar" options={options} series={series} />
      <MonthSelect onChange={onMonthChange} />
    </section>
  );
}
