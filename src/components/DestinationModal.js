import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faTimes } from "@fortawesome/free-solid-svg-icons";

// Fix icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const DestinationModal = ({ show, handleClose, destination }) => {
  const [terrainView, setTerrainView] = useState(false);

  if (!destination) return null;

  const toggleTerrain = () => {
    setTerrainView(!terrainView);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{destination.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{destination.description}</p>

        {/* Hiển thị hướng dẫn phượt */}
        <div dangerouslySetInnerHTML={{ __html: destination.travelGuide }} />

        {/* Hiển thị bản đồ */}
        <h4 className="mt-4">Vị trí trên bản đồ</h4>
        <Button onClick={toggleTerrain} variant="secondary" className="mb-3">
          <FontAwesomeIcon icon={faMap} className="me-2" />
          {terrainView ? "Chế độ Mặc định" : "Chế độ Địa hình"}
        </Button>
        <MapContainer
          center={[
            destination.coordinates.latitude,
            destination.coordinates.longitude,
          ]}
          zoom={12}
          style={{ height: "420px", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url={
              terrainView
                ? "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker
            position={[
              destination.coordinates.latitude,
              destination.coordinates.longitude,
            ]}
          >
            <Popup>{destination.name}</Popup>
          </Marker>
        </MapContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} className="me-2" />
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DestinationModal;
