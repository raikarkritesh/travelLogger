import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { listLogEntries } from './API';
import LogEntryForm from './LogEntryForm';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [newLocation, setNewLocation] = useState(null);

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat.toArray();
    setNewLocation({
      latitude,
      longitude,
    });
    console.log(`${latitude}lat ${longitude}long`);
  }

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
        onDblClick={showAddMarkerPopup}
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

        {newLocation ? (
          <>
            <Marker
              longitude={newLocation.longitude}
              latitude={newLocation.latitude}
              anchor="bottom"
            >
            </Marker>
            <Popup
              latitude={newLocation.latitude}
              longitude={newLocation.longitude}
              closeOnClick={false}
              onClose={() => setNewLocation(null)}
              anchor="top" >
              <div className="popup">
                <LogEntryForm onClose={() => {
                  setNewLocation(null);
                  getEntries();
                }} location={newLocation}/>
              </div>
            </Popup>
          </>
        ) : null}
        
      </Map>
    </div>
  );
}

export default App;
