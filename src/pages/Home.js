import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Form,
} from "react-bootstrap";
import destinations from "../data/destinations";
import DestinationModal from "../components/DestinationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Home = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Tất cả");
  const itemsPerPage = 12;

  const handleShowModal = (destination) => {
    setSelectedDestination(destination);
    setModalShow(true);
  };

  const regions = ["Tất cả", ...new Set(destinations.map((d) => d.region))];

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRegion === "Tất cả" || destination.region === selectedRegion)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDestinations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const currentYear = new Date().getFullYear();

  return (
    <Container className="mt-5">
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 animate__animated animate__fadeIn">
            Phượt Thủ Việt Nam
          </h1>
          <p className="lead text-muted animate__animated animate__fadeIn animate__delay-1s">
            Khám phá những địa điểm tuyệt đẹp để đi phượt tại Việt Nam.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={{ span: 3, offset: 3 }}>
          <Form.Select
            aria-label="Chọn khu vực"
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setCurrentPage(1);
            }}
            className="shadow-sm mb-3"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm địa điểm..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="shadow-sm mb-3"
          />
        </Col>
      </Row>

      <Row>
        {currentItems.length > 0 ? (
          currentItems.map((destination) => (
            <Col
              xl={4}
              lg={4}
              md={6}
              sm={6}
              key={destination.id}
              className="mb-4"
            >
              <Card className="d-flex flex-column h-100 shadow-lg animate__animated animate__zoomIn">
                <div
                  className="custom-card-img rounded-top"
                  style={{ backgroundImage: `url(${destination.image})` }}
                ></div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mt-2">{destination.name}</Card.Title>
                  <Card.Text>{destination.description}</Card.Text>
                  <div className="mt-auto d-flex justify-content-start gap-3">
                    <Button
                      variant="primary"
                      onClick={() => handleShowModal(destination)}
                    >
                      <FontAwesomeIcon icon={faEye} className="me-2" />
                      Xem chi tiết
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p className="text-muted">Không tìm thấy địa điểm nào!</p>
          </Col>
        )}
      </Row>

      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((num) => (
            <Pagination.Item
              key={num + 1}
              active={num + 1 === currentPage}
              onClick={() => setCurrentPage(num + 1)}
            >
              {num + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}

      <DestinationModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        destination={selectedDestination}
      />

      <footer className="text-center mt-5">
        <p>
          &copy; {currentYear}{" "}
          <a
            className="text-decoration-none"
            href="https://tungpham42.github.io"
            target="_blank"
            rel="noreferrer"
          >
            Phạm Tùng
          </a>
          {", "}
          <a
            href="https://github.com/tungpham42/phuot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            <FontAwesomeIcon icon={faGithub} className="me-1" />
            MIT License
          </a>
        </p>
      </footer>
    </Container>
  );
};

export default Home;
