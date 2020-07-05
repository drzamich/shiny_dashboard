import React, { Component } from "react";
import { numberWithSpaces } from '../utilities/helpers';

const CARD_TYPES = {
  totalProfit: {
    name: "Total profit",
    valPrefix: "$",
  },
  avgProfit: {
    name: "Average profit",
    valPrefix: "$",
  },
  unitsProduced: {
    name: "Units produced",
  },
  unitsSold: {
    name: "Units sold",
  },
};

const SCOPES = ['daily', 'monthly', 'yearly'];

const defaultData = {};
Object.keys(CARD_TYPES).forEach((type) => {
  defaultData[type] = { value: 234234232, change: 0 };
});

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: defaultData,
    };
  }

  onScopeChange = (event, type) => {
    const { value } = event.target;
    console.log("Scope changed for", type, 'to', value);
  };

  render() {
    const cards = Object.keys(CARD_TYPES).map((type) => {
      const { value, change } = this.state.data[type];
      const props = { type, value, change, onScopeChange: this.onScopeChange };
      return <Card {...props} key={type} />;
    });

    return <section className="cards">{cards}</section>;
  }
}

function Card({ type, value, change, onScopeChange }) {
  const { name, valPrefix } = CARD_TYPES[type];
  const changeType = change < 0 ? 'negative' : 'positive';

  return (
    <div className="card__container">
      <div className={`card card-${type}`}>
        <div className="card__header">
          <div className="card__value-container">
            <h3 className="card__value">{`${valPrefix || ""} ${numberWithSpaces(value)}`}</h3>
          </div>
          <div className="card__info-container">
            <h4 className="card__title">{name}</h4>
            <h4 className={`card__change--${changeType}`}>{change}%</h4>
          </div>
        </div>
        <div className="card__footer">
          <select name="scope" id="scope-select" onChange={(event) => onScopeChange(event, type)}>
            {SCOPES.map(scope => <option value={scope} key={scope}>{`${scope} stats`}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
