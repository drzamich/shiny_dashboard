import React from 'react';
import { numberWithSpaces } from '../utilities/helpers';
import defaultData from '../mocks/metrics.json';
import RangeSelect, { METRICS_TYPES } from './RangeSelect';

const defaultTimespans = {};
Object.keys(METRICS_TYPES).forEach((type) => {
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

  const cards = Object.keys(METRICS_TYPES).map((type) => {
    const timespan = timespans[type];
    const { value, change } = data[timespan][type];
    const props = { type, value, change, onTimespanChange };
    return <Card {...props} key={type} />;
  });

  return <section className="cards">{cards}</section>;
}

function Card({ type, value, change, onTimespanChange }) {
  const { name, valPrefix } = METRICS_TYPES[type];
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
          <RangeSelect onChange={(event) =>  onTimespanChange(event, type)} />
        </div>
      </div>
    </div>
  );
}
