import React from "react";
import classes from "./contactsection.module.css";

const ContactSection = (props) => {
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    props.address
  )}`;

  // Create
  const emailLink = "https://gmail.com/";

  return (
    <div className={classes.sectionListContainer}>
      <div className={classes.contactSection}>
        <ul className={`${classes.contact__info__list}`}>
          <li className={`${classes.info__item}`}>
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <p>
              <a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.info__item}
              >
                {props.address}
              </a>
            </p>
          </li>
          <li className={`${classes.info__item}`}>
            <span>
              <i className="ri-mail-line"></i>
            </span>
            <p>
              <a
                href={emailLink}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.info__item}
              >
                {props.email}
              </a>
            </p>
          </li>
          <li className={`${classes.info__item}`}>
            <span>
              <i className="ri-phone-line"></i>
            </span>
            <p>{props.phone}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactSection;
