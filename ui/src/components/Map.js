import React from 'react';
import { Map, Tooltip, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MonthSelect from './controls/MonthSelect';
import mockedData from '../mocks/sales.json';

export default function SalesMap() {
  const [data, setData] = React.useState(mockedData);
  window.SD_updateMapData = (newData) => { console.log(newData); setData(newData); };

  let lats, lngs, mapCenter, mapBounds;
  mapCenter = [0, 0];

  if(data.length) {
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
    if(window.Shiny) {
      window.Shiny.setInputValue('salesMonth', newMonth);
    }
  };

  return (
      <section className="map">
        Map
        <div className="map__container">
          <Map center={mapCenter} bounds={mapBounds} zoom={1}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              data.map(({ loc_city, loc_lat, loc_lng, rank, total_profit }) => (
                <CircleMarker center={[loc_lat, loc_lng]} fillOpacity={0.5} stroke={false} radius={rank * 25 + 10} key={loc_city}>
                  <Tooltip>
                    <h3>{loc_city}</h3>
                    <p><b>Total profit:</b> {total_profit}</p>
                  </Tooltip>
                </CircleMarker>
              ))
            }
          </Map>
        </div>
        <div className="map__controls">
            <MonthSelect onChange={onMonthChange} />
        </div>
      </section>
    );
}
