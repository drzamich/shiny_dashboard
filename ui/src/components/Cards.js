import React from 'react';
import { numberWithSpaces } from '../utilities/helpers';

const CARD_TYPES = {
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

const TIMESPANS = ['day', 'month', 'year'];
const DEFAULT_TIMESPAN = TIMESPANS[1];

const defaultData = {};
TIMESPANS.forEach(timespan => {
  defaultData[timespan] = {};
  for (const type in CARD_TYPES) {
    defaultData[timespan][type] = { value: 0, change: 0 };
  }
});

const defaultTimespans = {};
Object.keys(CARD_TYPES).forEach((type) => {
  defaultTimespans[type] = 'month';
});

export default function Cards() {
  const [data, setData] = React.useState(defaultData);
  const [timespans, setTimespans] = React.useState(defaultTimespans);

  window.SD_updateCardsData = (newData) => { setData(newData); };

  const onTimespanChange = (event, type) => {
    const { value } = event.target;
    setTimespans(timespans => ({ ...timespans, [type]: value }));
  };

  const cards = Object.keys(CARD_TYPES).map((type) => {
    const timespan = timespans[type];
    const { value, change } = data[timespan][type];
    const props = { type, value, change, onTimespanChange };
    return <Card {...props} key={type} />;
  });

  return <section className="cards">{cards}</section>;
}

function Card({ type, value, change, onTimespanChange }) {
  const { name, valPrefix } = CARD_TYPES[type];
  const changeType = change < 0 ? 'negative' : 'positive';

  return (
    <div className="card__container">
      <div className={`card card-${type}`}>
        <div className="card__header">
          <div className="card__value-container">
            <h3 className="card__value">{`${valPrefix || ''} ${numberWithSpaces(value)}`}</h3>
          </div>
          <div className="card__info-container">
            <h4 className="card__title">{name}</h4>
            <h4 className={`card__change--${changeType}`}>{change}%</h4>
          </div>
        </div>
        <div className="card__footer">
          <select name="scope" id="scope-select" onChange={(event) => onTimespanChange(event, type)} defaultValue={DEFAULT_TIMESPAN}>
            {TIMESPANS.map(timespan => <option value={timespan} key={timespan}>{`${timespan} stats`}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
