import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ImageCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/800x400/4CAF50/ffffff?text=Welcome+To+The+Speech+Therapy+Center"
          alt="Welcome To The Speech Therapy Center"
        />
        <Carousel.Caption>
          <h3>Welcome To The Speech Therapy Center</h3>
          <p>Thank you for considering The Speech Therapy Center for your speech needs</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/800x400/2196F3/ffffff?text=Services"
          alt="Services"
        />
        <Carousel.Caption>
          <h3>Services</h3>
          <p>We offer Speech and Lanuage Therapy for all ages</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/800x400/FF9800/ffffff?text=Getting+Started"
          alt="Getting Started"
        />
        <Carousel.Caption>
          <h3>Getting Started</h3>
          <p>Schedule an appointment </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageCarousel;
