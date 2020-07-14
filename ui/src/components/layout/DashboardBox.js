import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExpandArrowsAlt,
  faCompressArrowsAlt,
  faChevronDown,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import MonthSelect from 'components/controls/MonthSelect';

export default function DashboardBox({
  name,
  title,
  children,
  onMonthChange,
  className = '',
}) {
  const [expanded, setExpand] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const onExpand = () => {
    setExpand((curExpanded) => !curExpanded);
  };

  const onCollapse = () => {
    setCollapsed((hidden) => !hidden);
  };

  const onPrint = () => {
    document.querySelectorAll('.printable').forEach(
      (element) => element.classList.remove('printable'),
    );
    document.querySelector(`.${name}`).classList.add('printable');
    window.print();
  };

  const classNames = [name, 'grid__item', 'dashboard-box',
    className || '',
    expanded ? 'dashboard-box--expanded' : '',
    collapsed ? 'dashboard-box--collapsed' : ''].join(' ');

  return (
    <section className={classNames}>
      <div className="dashboard-box__header">
        <h3 className="dashboard-box__title">{title}</h3>
        <div className="dahsboard-box__controls">
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
      <div className="dashboard-box__content">
        {children}
      </div>
      <div className="dashboard-box__footer">
        <div className="dashboard-box__range-selection">
          <MonthSelect onChange={onMonthChange} />
        </div>
        <div className="dashboard-box__export-buttons">
          <button
            type="button"
            onClick={onPrint}
            className="dashboard-box__export-button dashboard-box__export-button--print"
          >
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>
      </div>
    </section>
  );
}
