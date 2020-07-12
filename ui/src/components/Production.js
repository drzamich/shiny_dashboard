import React from 'react';
import mockedDates from '../mocks/production_dates.json';
import mockedValues from '../mocks/production_values.json';
import ChartBox from './ChartBox';
import { LABELS } from './ChartBox';

const DAYS_TO_DISPLAY = ['01', '15']; // and implicitly 30/31

export default function Production() {
  const [dates, setDates] = React.useState(mockedDates);
  const [values, setValues] = React.useState(mockedValues);

  window.SD_updateProductionData = (newDates, newValues) => {
    setDates(newDates);
    setValues(newValues);
  };

  const onMonthChange = (newMonth) => {
    if (window.Shiny) {
      window.Shiny.setInputValue('productionMonth', newMonth);
    }
  };

  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: dates,
      labels: {
        hideOverlappingLabels: true,
        formatter: (value, ts, index) => {
          const [, month, day] = value.split('-');
          if (DAYS_TO_DISPLAY.includes(day) || dates.length - 1 === index) {
            return `${day}/${month}`;
          }
          return '';
        },
        ...LABELS,
      },
    },
    yaxis: {
      labels: LABELS,
    },
    tooltip: {
      x: {
        formatter: (label) => label,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: 'Units produced',
      data: values,
    },
  ];

  return (
    <ChartBox
      name="production"
      title="Production"
      chartOptions={options}
      chartSeries={series}
      onMonthChange={onMonthChange}
    />
  );
}
