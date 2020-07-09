import React from 'react';
import Dropdown from './Dropdown';

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
  },
  mean_profit: {
    name: 'Average profit',
    valPrefix: '$',
  },
  units_produced: {
    name: 'Units produced',
  },
  units_sold: {
    name: 'Units sold',
  },
};

export default function RangeSelect({ onChange }) {
  const [timespan, setTimespan] = React.useState('month');

  const onItemClick = (timespan) => {
    setTimespan(timespan);
    onChange(timespan);
  };

  return (
    <div class="range-select__comtainer">
      <Dropdown keyValues={TIMESPANS} currentKey={timespan} onChange={onItemClick} />
    </div>
  );
}
