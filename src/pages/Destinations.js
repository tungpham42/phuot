import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import destinations from "../data/destinations";
import DestinationModal from "../components/DestinationModal";

const Destinations = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const handleShowModal = (destination) => {
    setSelectedDestination(destination);
    setModalShow(true);
  };

  return (
    <Container className="mt-4">
      <Row className="text-center mb-4">
        <Col>
          <h1>Danh sách điểm đến</h1>
          <p>Khám phá những địa điểm tuyệt đẹp để đi phượt tại Việt Nam.</p>
        </Col>
      </Row>
      <Row>
        {destinations.map((destination) => (
          <Col md={4} key={destination.id} className="mb-4">
            <Card className="d-flex flex-column h-100 shadow-lg">
              <div
                className="custom-card-img rounded-top"
                style={{
                  backgroundImage: `url(${destination.image})`,
                }}
              ></div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{destination.name}</Card.Title>
                <Card.Text>{destination.description}</Card.Text>
                <div className="mt-auto d-flex justify-content-start gap-3">
                  <Button
                    variant="primary"
                    onClick={() => handleShowModal(destination)}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <DestinationModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        destination={selectedDestination}
      />
    </Container>
  );
};

export default Destinations;
