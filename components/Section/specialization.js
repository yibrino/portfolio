import React from "react";
import classes from "./specialization.module.css";

const SpecializationSection = ({ career_specializations }) => {
  return (
    <div className={classes.sectionListContainer}>
      {career_specializations.map((career_specialization, index) => (
        <div className={classes.sectionList} key={index}>
          <div className={classes.iconContainer}>
            <div className={classes.icon}></div>
          </div>
          <div className={classes.content}>
            <h3 className={classes.title}>
              {career_specialization.careerspecialization_description}:
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpecializationSection;
