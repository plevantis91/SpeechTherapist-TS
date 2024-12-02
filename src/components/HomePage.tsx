import { Container, Row, Col } from "react-bootstrap";
import ImageCarousel from "./Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

function HomePage() {
  return (
    <Container fluid className="my-4">
      <Row className="mb-4">
        <Col>
          <ImageCarousel />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
