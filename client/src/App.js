import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});

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
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{ width: '100%', height: '100%' }}
      >
        {logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker
              key={entry._id}
              longitude={entry.longitude}
              latitude={entry.latitude}
              anchor="bottom"
              onClick={() => setShowPopup({
                // ...showPopup,
                [entry._id]: true,
              })}
            >
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeOnClick={false}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                    {entry.image && <img src={entry.image} alt={entry.title} />}
                  </div>
                </Popup>
              ) : null
            }

          </React.Fragment>

        ))}


      </Map>
    </div>
  );
}

export default App;
