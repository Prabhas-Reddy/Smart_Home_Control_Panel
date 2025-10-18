const { useState, useEffect } = React;

function SmartHomeApp() {
  const initializeDevices = () => {
    // Set all devices to OFF initially
    const offDevices = {};
    Object.keys(mockDevices).forEach((roomId) => {
      offDevices[roomId] = mockDevices[roomId].map((d) => ({ ...d, on: false }));
    });
    return offDevices;
  };

  const [rooms] = useState(mockRooms);
  const [devicesData, setDevicesData] = useState(initializeDevices());
  const [selectedRoom, setSelectedRoom] = useState(mockRooms[0].id);
  const [devices, setDevices] = useState(initializeDevices()[mockRooms[0].id]);
  const [weather, setWeather] = useState(null);
  const [greeting] = useState(getGreeting());

  useEffect(() => { fetchWeather(); }, []);

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=12.97&longitude=77.59&current_weather=true"
      );
      const data = await res.json();
      setWeather(data.current_weather.temperature + "°C");
    } catch (err) {
      setWeather("Unavailable");
    }
  };

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
    setDevices([...devicesData[roomId]]);
  };

  const toggleDevice = (id) => {
    const updatedDevices = devices.map((d) =>
      d.id === id ? { ...d, on: !d.on } : d
    );

    const updatedData = { ...devicesData, [selectedRoom]: updatedDevices };
    setDevices(updatedDevices);
    setDevicesData(updatedData);
  };

  const countActive = (roomId) => {
    return devicesData[roomId]?.filter((d) => d.on).length || 0;
  };

  return (
    <div>
      <div className="dashboard">
        <div className="greeting">{greeting}</div>
        <div className="weather">
          🌡️ Current Temp: {weather ? weather : "Loading..."}
        </div>
      </div>

      <div className="rooms">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`room-card ${selectedRoom === room.id ? "active" : ""}`}
            onClick={() => handleRoomSelect(room.id)}
          >
            <div style={{ fontSize: "2em" }}>{room.image}</div>
            <div>{room.name}</div>
            <div className="rooms-count">
              {devicesData[room.id]?.length || 0} Devices, {countActive(room.id)} Active
            </div>
          </div>
        ))}
      </div>

      <div className="devices">
        {devices.map((device) => (
          <div
            key={device.id}
            className={`device-card ${device.on ? "on" : ""}`}
          >
            <div style={{ fontSize: "1.5em" }}>🔌</div>
            <h4>{device.name}</h4>
            <button
              className={`toggle-btn ${device.on ? "" : "off"}`}
              onClick={() => toggleDevice(device.id)}
            >
              {device.on ? "Turn Off" : "Turn On"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<SmartHomeApp />);
