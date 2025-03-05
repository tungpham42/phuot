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

const Home = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State cho thanh tìm kiếm
  const itemsPerPage = 12; // Số lượng item mỗi trang

  const handleShowModal = (destination) => {
    setSelectedDestination(destination);
    setModalShow(true);
  };

  // Lọc địa điểm dựa trên từ khóa tìm kiếm
  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDestinations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <Row className="text-center mb-4">
        <Col>
          <h1>Phượt Việt Nam</h1>
          <p>Khám phá những địa điểm tuyệt đẹp để đi phượt tại Việt Nam.</p>
        </Col>
      </Row>

      {/* Thanh Tìm Kiếm */}
      <Row className="mb-3">
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm địa điểm..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
            }}
          />
        </Col>
      </Row>

      {/* Danh sách địa điểm */}
      <Row>
        {currentItems.length > 0 ? (
          currentItems.map((destination) => (
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
          ))
        ) : (
          <Col className="text-center">
            <p>Không tìm thấy địa điểm nào!</p>
          </Col>
        )}
      </Row>

      {/* Phân trang */}
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

      {/* Modal chi tiết điểm đến */}
      <DestinationModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        destination={selectedDestination}
      />
    </Container>
  );
};

export default Home;
