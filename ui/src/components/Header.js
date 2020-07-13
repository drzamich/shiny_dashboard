import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const onRefresh = () => {
    if (window.Shiny) {
      window.Shiny.setInputValue('dataRefresh', Date.now());
    }
  };

  return (
    <header className="header grid__item">
      <h1 className="header__page-title">Enterprise Shiny Dashboards</h1>
      <button
            type="button"
            onClick={onRefresh}
            className="dashboard-box__control-button dashboard-box__control-button--refresh"
          >
            <FontAwesomeIcon icon={faSync} size="lg" />
      </button>
    </header>
  );
}
