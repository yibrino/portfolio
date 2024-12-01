import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import styles from "./title.module.css";

const TitleSection = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Container className={styles.container}>
      <h1 className={`${styles.title} ${isVisible ? styles.visible : ""}`}>
        {props.title}
      </h1>
    </Container>
  );
};

export default TitleSection;
