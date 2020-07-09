import React from 'react';

export const TIMESPANS = ['day', 'month', 'year'];
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
  return (
    <div class="range-select__comtainer">
        <select name="scope" id="scope-select" onChange={onChange} defaultValue={DEFAULT_TIMESPAN}>
            {TIMESPANS.map(timespan => <option value={timespan} key={timespan}>{`${timespan} stats`}</option>)}
        </select>
    </div>
  );
}
