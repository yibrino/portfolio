import { Container } from "reactstrap";
import { useState, useEffect } from "react";
import styles from "./certificatetitle.module.css";

const CertificateTitle = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${isVisible ? styles.visible : ""}`}>
        {props.certificatename}
      </h1>
    </div>
  );
};

export default CertificateTitle;
