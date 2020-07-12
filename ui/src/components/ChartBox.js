import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'react-apexcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import DashboardBox from './DashboardBox';

export default function ChartBox({
  name,
  title,
  chartOptions,
  chartSeries,
  onMonthChange,
}) {
  const footerRef = React.useRef(null);

  React.useLayoutEffect(() => {
    // Move chart toolbar to footer
    const toolbarSelector = `.${name} .apexcharts-toolbar`;
    const toolbarnode = document.querySelector(toolbarSelector);
    const footerSelector = `.${name} .dashboard-box__footer`;
    const footerNode = document.querySelector(footerSelector);
    console.log(footerSelector);
    footerNode && footerNode.appendChild(toolbarnode);

    // Change icon
    const apexIconContainer = document.querySelector(
      `.${name} .apexcharts-menu-icon`
    );
    const apexIcon = document.querySelector(
      `.${name} .apexcharts-menu-icon svg`
    );
    apexIconContainer.removeChild(apexIcon);
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
