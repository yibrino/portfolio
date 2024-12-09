import React from "react";
import { Row, Col } from "reactstrap";
import classes from "./contact.module.css";
import Form from "./Form/Form";
import Link from "next/link";
import socialLinks from "../../../utlis/sociallinks";
const Contact = () => {
  return (
    <div className={classes.contactus}>
      <Row className={`${classes.contactRow}`}>
        <Col lg="6" md="6">
          {/* <SectionSubtitle subtitle="Contact me" /> */}
          <h3 className=" ">Drop a Message, We’ll Respond Promptly</h3>

          <ul className={`${classes.contact__info__list}`}>
            <li className={`${classes.info__item}`}>
              <span>
                <i className="ri-map-pin-line"></i>
              </span>
              <p>Via Rosario Salerno 256, 87036 Rende Cosenza, Italy</p>
            </li>
            <li className={`${classes.info__item}`}>
              <span>
                <i className="ri-mail-line"></i>
              </span>
              <p>yibrahmehari128@gmail.com</p>
            </li>
            <li className={`${classes.info__item}`}>
              <span>
                <i className="ri-phone-line"></i>
              </span>
              <p>+393278020805</p>
            </li>
            <li className={`${classes.info__item}`}>
              <span>
                <i className="ri-skype-line"></i>
              </span>
              <p>https://join.skype.com/invite/ET3eSwXeLnCt</p>
            </li>
          </ul>
          <div className={`${classes.social__links}`}>
            {socialLinks.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={link.icon}></i>
              </Link>
            ))}
          </div>
        </Col>

        <Col className={classes.formContact} lg="6" md="6">
          <Form />
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
