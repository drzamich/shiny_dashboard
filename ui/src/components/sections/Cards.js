import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faChartLine, faCartArrowDown, faMoneyBill  } from '@fortawesome/free-solid-svg-icons';
import { numberWithSpaces } from 'utilities/helpers';
import defaultData from 'mocks/metrics.json';
import RangeSelect from 'components/controls/RangeSelect';

export const CARD_TYPES = {
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

const defaultTimespans = {};
Object.keys(CARD_TYPES).forEach((type) => {
  defaultTimespans[type] = 'month';
});

export default function Cards() {
  const [data, setData] = React.useState(defaultData);
  const [timespans, setTimespans] = React.useState(defaultTimespans);

  window.SD_updateCardsData = (newData) => { setData(newData); };

  const onTimespanChange = (timespan, type) => {
    setTimespans(timespans => ({ ...timespans, [type]: timespan }));
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
  const changePercent = `${(change * 100).toFixed(2)} %`;

  const displayValue = numberWithSpaces(value.toFixed(0));
  const isBigValue = value >= 10 ** 8;

  return (
    <div className="grid__item card__container">
      <div className={`card card-${type}`}>
        <div className="card__header">
          <div className={`card__value${isBigValue ? ' card__value--big' : ''}`}>
            {`${valPrefix || ''}${displayValue}`}
          </div>
          <div className="card__info-container">
            <h4 className="card__title">{name}</h4>
            <h4 className={`card__change card__change--${changeType}`}>{changePercent}</h4>
          </div>
        </div>
        <div className="card__footer">
          <RangeSelect onChange={(timespan) => onTimespanChange(timespan, type)} />
          <div className={`card__icon card__icon--${type}`}>
            <FontAwesomeIcon icon={CARD_TYPES[type].icon} size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
