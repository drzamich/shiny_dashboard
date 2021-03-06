/* eslint-disable camelcase */
import React from 'react';
import mockedData from 'mocks/top_sales.json';
import ChartBox, { LABELS } from 'components/layout/ChartBox';
import { numberWithSpaces } from 'utilities/helpers';

const valueFormatter = (value) => `$${numberWithSpaces(value.toFixed(0))}`;

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
      data: profits,
    },
  ];
  const options = {
    chart: {
      type: 'bar',
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
      categories: cities,
      labels: {
        formatter: valueFormatter,
        ...LABELS,
      },
    },
    yaxis: {
      labels: LABELS,
    },
    tooltip: {
      y: {
        formatter: valueFormatter,
      },
    },
  };

  return (
    <ChartBox
      name="top-cities"
      title="Top cities by revenue"
      chartOptions={options}
      chartSeries={series}
      onMonthChange={onMonthChange}
    />
  );
}
