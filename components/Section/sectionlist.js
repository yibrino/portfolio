import React from "react";
import classes from "./sectionlist.module.css";

const SectionList = ({ projecttechs }) => {
  return (
    <div className={classes.sectionListContainer}>
      {projecttechs.map((projecttech, index) => (
        <div className={classes.sectionList} key={index}>
          <div className={classes.iconContainer}>
            <div className={classes.icon}></div>
          </div>
          <div className={classes.content}>
            <h3 className={classes.title}>
              {projecttech.projecttech_category}:
            </h3>
            <p className={classes.description}>
              {projecttech.projecttech_description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionList;
