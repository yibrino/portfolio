import React from "react";
import { Container, Row, Col } from "reactstrap";
import Image from "next/image";
import SectionSubtitle from "./SectionSubtitle";
import network from "../../public/images/Connected world.jpg";
import Slider from "react-slick";
import classes from "../../styles/testimonial.module.css";

const Testimonial = () => {
  const settings = {
    dots: false,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    infinite: true,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6" className={`${classes.testimonial__img}`}>
            <Image alt="network-img" src={network} width="400" height="400" />
          </Col>

          <Col lg="6" md="6">
            <SectionSubtitle subtitle="Testimonials" />
            {/* <h4 className="mt-4 mb-5">What my client says</h4> */}

            <Slider {...settings}>
              <div className={`${classes.testimonial__item}`}>
                <div className={`${classes.testimonial__client}`}>
                  <Image
                    alt="client-img"
                    src="/images/hero.jpg"
                    width="50"
                    height="50"
                    className=" rounded-2"
                  />

                  <div>
                    <h6>Yibrah Mehari | Second Batch </h6>
                    <h6> Software Engineer|Network Administrator</h6>
                  </div>
                </div>

                <p>
                  Advanced engineering certificates in quality compliance cover
                  topics such as quality control, statistical process control,
                  risk management, and Six Sigma methodologies. These
                  certificates can equip you with the necessary knowledge and
                  skills to develop and implement effective quality management
                  systems, improve operational efficiency, and drive continuous
                  improvement initiatives..
                </p>
              </div>

              <div className={`${classes.testimonial__item}`}>
                <div className={`${classes.testimonial__client}`}>
                  <Image
                    alt="client-img"
                    src="/images/hero.jpg"
                    width="50"
                    height="50"
                    className=" rounded-2"
                  />

                  <div>
                    <h6>girmay godifey | First Batch</h6>
                    <h6>Mechanical Engineer</h6>
                  </div>
                </div>

                <p>
                  Advanced engineering certificates in quality compliance cover
                  topics such as quality control, statistical process control,
                  risk management, and Six Sigma methodologies. These
                  certificates can equip you with the necessary knowledge and
                  skills to develop and implement effective quality management
                  systems, improve operational efficiency, and drive continuous
                  improvement initiatives.
                </p>
              </div>

              <div className={`${classes.testimonial__item}`}>
                <div className={`${classes.testimonial__client}`}>
                  <Image
                    alt="client-img"
                    src="/images/hero.jpg"
                    width="50"
                    height="50"
                    className=" rounded-2"
                  />

                  <div>
                    <h6>Mulugeta Ale | Second Batch</h6>
                    <h6>
                      Chemical Engineer | Norwegian University of Science and
                      Technology | Trondheim, Norway
                    </h6>
                  </div>
                </div>
                <p>
                  Advanced engineering certificates in quality compliance cover
                  topics such as quality control, statistical process control,
                  risk management, and Six Sigma methodologies. These
                  certificates can equip you with the necessary knowledge and
                  skills to develop and implement effective quality management
                  systems, improve operational efficiency, and drive continuous
                  improvement initiatives..
                </p>
              </div>
            </Slider>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonial;
