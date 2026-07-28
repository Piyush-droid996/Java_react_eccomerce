import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <Badge bg="primary" pill className="hero-badge">
              🔥 New Collection 2026
            </Badge>

            <h1 className="hero-title mt-4">
              Shop Smarter with <br />
              EazyStore
            </h1>

            <p className="hero-description">
              Discover electronics and home appliances at unbeatable prices.
              Enjoy secure shopping, fast delivery, and a seamless experience.
            </p>

            <div className="d-flex gap-3 mt-4">
              <Button as={Link} to="/about" variant="outline-primary" size="lg">
                Learn More
              </Button>
            </div>
          </Col>

          <Col lg={6} className="text-center">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
              alt="Shopping"
              className="img-fluid hero-img"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;
