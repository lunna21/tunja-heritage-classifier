import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import type { PatrimonioResponse } from "../types/patrimonio";

interface LocationMapProps {
  items: PatrimonioResponse[];
  height?: string;
}

export default function LocationMap({ items, height = "320px" }: LocationMapProps) {
  const locatedItems = items.filter((item) => item.ubicacion?.coordenadas?.coordinates?.length === 2);
  if (locatedItems.length === 0) {
    return (
      <div className="map-empty" role="status">
        <span aria-hidden="true">⌖</span>
        <p>Aún no hay coordenadas disponibles para mostrar en el mapa.</p>
      </div>
    );
  }

  const first = locatedItems[0].ubicacion.coordenadas.coordinates;
  const center: [number, number] = [first[1], first[0]];

  return (
    <div className="map-wrap" style={{ height }}>
      <MapContainer center={center} zoom={15} scrollWheelZoom={false} className="map">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locatedItems.map((item) => {
          const [longitude, latitude] = item.ubicacion.coordenadas.coordinates;
          return (
            <CircleMarker
              key={item._id}
              center={[latitude, longitude]}
              radius={8}
              pathOptions={{ color: "#173b3f", fillColor: "#e5b96d", fillOpacity: 0.9 }}
            >
              <Popup>
                <strong>{item.nombre}</strong>
                <br />
                {item.ubicacion.direccion}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
