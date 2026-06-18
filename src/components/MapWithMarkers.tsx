import { MapContainer, TileLayer, CircleMarker, Tooltip, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// This component uses Leaflet dynamically to avoid SSR issues
export default function MapWithMarkers({
  data,
  center = [-2.5489, 118.0149], // Center of Indonesia
  zoom = 5,
}: {
  data: { port: string; freq: number; volume: number; coords: [number, number] }[];
  center?: [number, number];
  zoom?: number;
}) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false} // We will manually place the zoom control to match the UI if needed
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <ZoomControl position="topleft" />
      {data.map((item) => (
        <CircleMarker
          key={item.port}
          center={item.coords}
          radius={8}
          pathOptions={{
            color: "#ffffff", // White border
            weight: 2,
            fillColor: "#2d7dd2", // Blue fill
            fillOpacity: 0.8,
          }}
        >
          <Tooltip>
            <div className="text-sm p-1">
              <strong className="block mb-1">{item.port}</strong>
              <div className="text-gray-600">Freq: {item.freq} Activities</div>
              <div className="text-gray-600">
                Vol: {item.volume.toLocaleString("id-ID", { maximumFractionDigits: 2 })} KL
              </div>
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
