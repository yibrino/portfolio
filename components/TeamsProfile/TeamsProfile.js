import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import classes from "./teamsprofile.module.css";
import ContactSection from "../Section/ContactSection/ContactSection";
import Subtitle from "../UI/SectionSubtitle";
import { getData } from "../../utlis/getData";
import WorkExperience from "../Section/experience";
import DynamicTabs from "../UI/Dynamictabs";
import OverView from "../Common/Button/Content/OverView";
import SpecializationSection from "../Section/specialization";
import EducationList from "../Section/education";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../utlis/loadingSpinner";
const TeamsProfile = ({ id }) => {
  const { teams } = useSelector((state) => state.teams);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    // Filter teams based on the given `id`
    const team = teams.find((team) => team.teamprofile_id === id);
    setSelectedTeam(team);
  }, [id, teams]); // Effect will run whenever `id` or `teams` changes

  if (!selectedTeam) {
    return <LoadingSpinner />; // You can return a loading state or a message if the team is not found
  }

  const tabs = [
    {
      key: "overview",
      label: "Overview",
      content: <OverView content={selectedTeam.teamprofile_overview} />,
    },
    {
      key: "Educational",
      label: "Educational Background",
      content: (
        <EducationList educations={selectedTeam.education_backgrounds} />
      ),
    },
    {
      key: "Specialization",
      label: "Specialization",
      content: (
        <SpecializationSection
          career_specializations={selectedTeam.career_specializations}
        />
      ),
    },
    {
      key: "Experience",
      label: "Experience",
      content: <WorkExperience experiences={selectedTeam.work_experiences} />,
    },
    {
      key: "Contact",
      label: "Contact",
      content: (
        <ContactSection
          address={selectedTeam.teamprofile_location}
          email={selectedTeam.teamprofile_email}
          phone={selectedTeam.teamprofile_phonenumber}
        />
      ),
    },
  ];
  return (
    <div className={classes.profileCard}>
      <div>
        <Row className={`${classes.profileRow}`}>
          <Subtitle subtitle={selectedTeam.teamprofile_title} />
          <Col className="mt-4 mb-4" md="4">
            <img
              src={selectedTeam.teamprofile_img_url}
              alt="Portrait"
              className={classes.portrait}
            />
            <div>
              <ContactSection
                address={selectedTeam.teamprofile_location}
                email={selectedTeam.teamprofile_email}
                phone={selectedTeam.teamprofile_phonenumber}
              />
            </div>
          </Col>
          <Col className="mt-4 mb-4" md="8">
            <DynamicTabs tabs={tabs} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TeamsProfile;
