import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { listLogEntries } from './API';
//require('dotenv').config();

const App = () => {
  const [logEntries, setLogEntries] = useState([])

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
      console.log(process.env.REACT_APP_MAPBOX_TOKEN);
    })();
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map
        mapboxAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{ width: '100%', height: '100%' }}
      >
        {logEntries.map(entry => (
          <Marker key={entry._id} longitude={entry.longitude} latitude={entry.latitude} anchor="bottom">

          </Marker>
        ))}
      </Map>
    </div>
  );
}

export default App;
