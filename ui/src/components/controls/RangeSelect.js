import React from 'react';
import Dropdown from './Dropdown';

export const TIMESPANS = {
  day: 'daily stats',
  month: 'monthly stats',
  year: 'yearly stats',
};

export const DEFAULT_TIMESPAN = TIMESPANS[1];

export default function RangeSelect({ onChange }) {
  const [timespan, setTimespan] = React.useState('month');

  const onItemClick = (newTimespan) => {
    setTimespan(newTimespan);
    onChange(newTimespan);
  };

  return (
    <div className="range-select__container">
      <Dropdown keyValues={TIMESPANS} currentKey={timespan} onChange={onItemClick} transparent />
    </div>
  );
}
