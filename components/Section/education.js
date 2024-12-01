import React from "react";
import classes from "./education.module.css";
import { Calendar, Building, GraduationCap } from "lucide-react";

const EducationList = ({ educations }) => {
  return (
    <div className={classes.sectionListContainer}>
      {educations.map((education, index) => (
        <div className={classes.sectionList} key={index}>
          <div className={classes.iconContainer}>
            <div className={classes.icon}></div>
          </div>
          <div className={classes.content}>
            <h3 className={classes.title}>
              {education.educationbackground_degree_level}
            </h3>
            <div className={classes.details}>
              <div className={classes.institution}>
                <Building className={classes.detailIcon} />
                <span>{education.educationbackground_institution}</span>
              </div>
              <div className={classes.dateRange}>
                <Calendar className={classes.detailIcon} />
                <span>{`${education.educationbackground_from_date} - ${education.educationbackground_to_date}`}</span>
              </div>
              <div className={classes.institution}>
                <GraduationCap className={classes.detailIcon} />
                <span>{education.educationbackground_degree_type}</span>
              </div>
            </div>
            <p className={classes.description}>
              {education.educationbackground_degree_description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationList;
