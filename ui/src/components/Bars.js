import React from 'react';
import MonthSelect from './controls/MonthSelect';
import mockedDates from '../mocks/production_dates.json';
import mockedValues from '../mocks/production_values.json';
import Chart from 'react-apexcharts';

const DAYS_TO_DISPLAY = ['01', '15']; // and implicitly 30/31

export default function Bars() {
  const [dates, setDates] = React.useState(mockedDates);
  const [values, setValues] = React.useState(mockedValues);

  window.SD_updateProductionData = (newDates, newValues) => {
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
      labels: {
        hideOverlappingLabels: true,
        formatter: (value, ts, index) => {
          const [, month, day] = value.split('-');
          if (DAYS_TO_DISPLAY.includes(day) || dates.length - 1 === index) {
            return `${month}-${day}`;
          } return '';
        }
      }
    },
    tooltip: {
      x: {
        formatter: label => label,
      }
    },
    dataLabels: {
      enabled: false
    }
  };

  const series = [
    {
      name: 'Units produced',
      data: values,
    },
  ];

  return (
    <section className="dashboard-box bars">
      <div className="dashboard-box__header">
        <h3>Production</h3>
      </div>
      <div className="dashboard-box__content">
      <Chart type="bar" options={options} series={series} />
      <MonthSelect onChange={onMonthChange} />
      </div>
    </section>
  );
};
