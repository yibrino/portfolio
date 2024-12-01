import React from "react";
import classes from "../../styles/subtitle.module.css";

const Subtitle = (props) => {
  return <h3 className={`${classes.section__subtitle}`}>{props.subtitle}</h3>;
};

export default Subtitle;
