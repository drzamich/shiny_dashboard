import React from 'react';
import Dropdown from './Dropdown';
import { faArchive, faChartLine, faCartArrowDown, faMoneyBill  } from '@fortawesome/free-solid-svg-icons';

export const TIMESPANS = {
  day: 'daily stats',
  month: 'monthly stats',
  year: 'yearly stats',
};

export const DEFAULT_TIMESPAN = TIMESPANS[1];

export const METRICS_TYPES = {
  total_profit: {
    name: 'Total profit',
    valPrefix: '$',
    icon: faMoneyBill,
  },
  mean_profit: {
    name: 'Average profit',
    valPrefix: '$',
    icon: faChartLine,
  },
  units_produced: {
    name: 'Units produced',
    icon: faArchive,
  },
  units_sold: {
    name: 'Units sold',
    icon: faCartArrowDown,
  },
};

export default function RangeSelect({ onChange }) {
  const [timespan, setTimespan] = React.useState('month');

  const onItemClick = (timespan) => {
    setTimespan(timespan);
    onChange(timespan);
  };

  return (
    <div className="range-select__container">
      <Dropdown keyValues={TIMESPANS} currentKey={timespan} onChange={onItemClick} transparent />
    </div>
  );
}
