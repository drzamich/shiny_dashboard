/* eslint-disable camelcase */
import React from 'react';
import {
  Map, Tooltip, TileLayer, CircleMarker,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import mockedData from 'mocks/sales.json';
import DashboardBox from 'components/layout/DashboardBox';
import { numberWithSpaces } from 'utilities/helpers';

export default function SalesMap() {
  const [data, setData] = React.useState(mockedData);
  window.SD_updateMapData = (newData) => {
    setData(newData);
  };

  let lats; let lngs; let mapCenter; let
    mapBounds;
  mapCenter = [0, 0];

  if (data.length) {
    lats = data.map(({ loc_lat }) => loc_lat);
    lngs = data.map(({ loc_lng }) => loc_lng);
    mapCenter = [
      (Math.max(...lats) + Math.min(...lats)) / 2,
      (Math.max(...lngs) + Math.min(...lngs)) / 2,
    ];

    mapBounds = [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)],
    ];
  }

  const onMonthChange = (newMonth) => {
    if (window.Shiny) {
      window.Shiny.setInputValue('salesMonth', newMonth);
    }
  };

  return (
    <DashboardBox name="map" title="Sales map" onMonthChange={onMonthChange}>
      <Map center={mapCenter} bounds={mapBounds} zoom={1}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map(({
          loc_city, loc_lat, loc_lng, rank, total_profit,
        }) => (
          <CircleMarker
            center={[loc_lat, loc_lng]}
            fillOpacity={0.7}
            stroke={false}
            radius={rank * 25 + 10}
            key={loc_city}
          >
            <MapTooltip total_profit={total_profit} loc_city={loc_city} />
          </CircleMarker>
        ))}
      </Map>
    </DashboardBox>
  );
}

const MapTooltip = ({ total_profit, loc_city, forPrinting = false }) => (
  <Tooltip permanent={forPrinting}>
    <div className={`map__tooltip${forPrinting ? ' printable' : ''}`}>
      <h3 className="map__tooltip-title">{loc_city}</h3>
      <p className="map__tooltip-text">
        <b>Total profit:</b>
        {' '}
        {`$${numberWithSpaces(total_profit.toFixed(0))}`}
      </p>
    </div>
  </Tooltip>
);
