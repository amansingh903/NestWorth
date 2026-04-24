// src/components/LocationMap.jsx
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";

/* Marker fix */
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

/* 👇 This component updates map when city changes */
function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 11, { animate: true });
    }
  }, [center, map]);

  return null;
}

/* Click handler */
function ClickHandler({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function LocationMap({
  center,
  position,
  setPosition,
  height = 360,
}) {
  return (
    <div className="pc-map" style={{ height }}>
      <MapContainer
        center={center}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 🔥 Auto move map on city change */}
        <RecenterMap center={center} />

        {/* Click to set marker */}
        <ClickHandler setPosition={setPosition} />

        {position && (
          <Marker
            position={position}
            icon={markerIcon}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const { lat, lng } = e.target.getLatLng();
                setPosition([lat, lng]);
              },
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
