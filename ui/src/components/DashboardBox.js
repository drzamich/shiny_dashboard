import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSync,
  faExpandArrowsAlt,
  faCompressArrowsAlt,
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
  const [collapsed, setCollapsed] = React.useState(false);

  const onExpand = () => {
    setExpand((expanded) => !expanded);
  };

  const onCollapse = () => {
    setCollapsed((hidden) => !hidden);
  };

  return (
    <section
      className={`${name} grid__item dashboard-box ${
        className ? className : ''
      } ${expanded ? 'dashboard-box--expanded' : ''} ${
        collapsed ? 'dashboard-box--collapsed' : ''
      }`}
    >
      <div className="dashboard-box__header">
        <h3 className="dashboard-box__title">{title}</h3>
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
            <FontAwesomeIcon icon={expanded ? faCompressArrowsAlt : faExpandArrowsAlt} />
          </button>
          <button
            type="button"
            onClick={onCollapse}
            className="dashboard-box__control-button dashboard-box__control-button--collapse"
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
