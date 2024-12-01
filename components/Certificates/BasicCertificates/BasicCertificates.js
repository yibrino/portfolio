import { Col, Container, Row, Button } from "reactstrap";
import styles from "../../../styles/BasicCertificate.module.css";
import { useState } from "react";

export default function CertificationPage({ certification }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <div className={styles.certification}>
      <Row>
        <Col md="12">
          <p className={styles.description}>{certification}</p>
          <div className={styles.expander}>
            {expanded && (
              <>
                <h2>Topics Covered</h2>
                <ul>
                  {certification.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
                <h2>Benefits</h2>
                <ul>
                  {certification.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </>
            )}
            <Button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                textDecoration: hovered ? "underline" : "none",
                transition: "text-decoration 0.3s ease-in-out",
              }}
              href="/"
              className={styles.readMore}
            >
              Read more
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
