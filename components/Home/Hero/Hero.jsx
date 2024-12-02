import { useState, useRef, useEffect } from "react";
import SectionSubtitle from "../../UI/SectionSubtitle";
import { Row, Col } from "reactstrap";
import CustomizedButton from "../../Common/Button/CustomizedButton";
import SectionContent from "../../Common/Button/Content/OverView";
import classes from "./hero.module.css";
import { getData } from "../../../utlis/getData";
import LoadingSpinner from "../../../utlis/loadingSpinner";
const Hero = () => {
  const ref = useRef(null);
  const [heroData, setHeroData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData("heros")
      .then((data) => {
        if (data) {
          setHeroData(data[0]);
        } else {
          console.error("No data returned for heros");
        }
      })
      .catch((error) => {
        console.error("Error fetching hero data:", error);
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!heroData) return <LoadingSpinner />;

  return (
    <section className={`${classes.hero}`}>
      <Row className={`${classes.heroRow}`}>
        <Col lg="6" md="6">
          <div className={classes.hero__content}>
            <SectionSubtitle subtitle={heroData.hero_title} />
            <SectionContent content={heroData.hero_about} />
            <div className={classes.services__container}>
              <CustomizedButton title="Software" path="#contact" />
              <CustomizedButton
                title="Artificial Intelligence"
                path="#contact"
              />
            </div>
          </div>
        </Col>

        <Col className={classes.columnImage} lg="6" md="6">
          <div ref={ref} className={classes.hero__img}>
            <img alt="hero-image" src={heroData.hero_img_url} />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Hero;
