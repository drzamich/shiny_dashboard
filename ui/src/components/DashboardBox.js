import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSync,
  faExpandArrowsAlt,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import MonthSelect from './controls/MonthSelect';

export default function DashboardBox({
  name,
  title,
  children,
  onMonthChange,
  onRefresh,
  className = '',
}) {
  const [expanded, setExpand] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const onExpand = () => {
    setExpand((expanded) => !expanded);
  };

  const onSlide = () => {
    setHidden((hidden) => !hidden);
  };

  return (
    <section
      className={`${name} grid__item dashboard-box ${
        className ? className : ''
      } ${expanded ? 'dashboard-box--expanded' : ''} ${
        hidden ? 'dashboard-box--hidden' : ''
      }`}
    >
      <div className="dashboard-box__header">
        <h3>{title}</h3>
        <div className="dahsboard-box__controls">
          <button
            type="button"
            onClick={onRefresh}
            className="dashboard-box__control-button dashboard-box__control-button--refresh"
          >
            <FontAwesomeIcon icon={faSync} />
          </button>
          <button
            type="button"
            onClick={onExpand}
            className="dashboard-box__control-button dashboard-box__control-button--expand"
          >
            <FontAwesomeIcon icon={faExpandArrowsAlt} />
          </button>
          <button
            type="button"
            onClick={onSlide}
            className="dashboard-box__control-button dashboard-box__control-button--slide"
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
      </div>
      <div className="dashboard-box__content">{children}</div>
      <div className="dashboard-box__footer">
        <MonthSelect onChange={onMonthChange} />
      </div>
    </section>
  );
}
