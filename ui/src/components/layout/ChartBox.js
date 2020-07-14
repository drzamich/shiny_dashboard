import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'react-apexcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import DashboardBox from 'components/layout/DashboardBox';

export const LABELS = {
  style: {
    cssClass: 'dashboard-box__chart-label',
    fontSize: '16px',
  },
  hideOverlappingLabels: true,
};

export default function ChartBox({
  name,
  title,
  chartOptions,
  chartSeries,
  onMonthChange,
}) {
  const footerRef = React.useRef(null);

  React.useEffect(() => {
    // Move chart toolbar to footer
    const toolbarSelector = `.${name} .apexcharts-toolbar`;
    const toolbarnode = document.querySelector(toolbarSelector);
    const footerSelector = `.${name} .dashboard-box__export-buttons`;
    const footerNode = document.querySelector(footerSelector);
    if (footerNode) {
      footerNode.appendChild(toolbarnode);
    }

    // Change icon
    const apexIconContainer = document.querySelector(
      `.${name} .apexcharts-menu-icon`,
    );
    const apexIcon = document.querySelector(
      `.${name} .apexcharts-menu-icon svg`,
    );
    apexIconContainer.removeChild(apexIcon);
    apexIconContainer.classList.add('dashboard-box__export-button',
      'dashboard-box__export-button--import');
    const downloadIcon = <FontAwesomeIcon icon={faDownload} />;
    ReactDOM.render(downloadIcon, apexIconContainer);
  }, [name]);

  return (
    <DashboardBox
      name={name}
      className="chart-box"
      title={title}
      onMonthChange={onMonthChange}
      footerRef={footerRef}
    >
      <Chart type="bar" options={chartOptions} series={chartSeries} />
    </DashboardBox>
  );
}
