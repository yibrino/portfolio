import React from "react";
import classes from "./experience.module.css";
import { MapPin, Globe, Calendar } from "lucide-react";
const ExperienceList = ({ experiences }) => {
  return (
    <div className={classes.sectionListContainer}>
      {experiences.map((experience, index) => (
        <div className={classes.sectionList} key={index}>
          <div className={classes.iconContainer}>
            <div className={classes.icon}></div>
          </div>
          <div className={classes.content}>
            <h3 className={classes.title}>
              {experience.workexperience_company_name}
            </h3>
            <h4 className={classes.title}>
              {experience.workexperience_position}
            </h4>
            <div className={classes.details}>
              <div className={classes.institution}>
                <MapPin className={classes.detailIcon} />
                <span>{experience.workexperience_company_location}</span>
              </div>
              <div className={classes.institution}>
                <Globe className={classes.detailIcon} />
                <span>{experience.workexperience_company_country}</span>
              </div>
              <div className={classes.dateRange}>
                <Calendar className={classes.detailIcon} />
                <span>{`${experience.workexperience_from_date} - ${experience.workexperience_to_date}`}</span>
              </div>
            </div>
            <p className={classes.description}>
              {experience.workexperience_description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceList;
