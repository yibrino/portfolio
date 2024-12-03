import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import classes from "../../styles/projects.module.css";
import Subtitle from "../../components/UI/SectionSubtitle";
import LoadingSpinner from "../../utlis/loadingSpinner";
import SectionList from "../../components/Section/sectionlist";
import DynamicTabs from "../../components/UI/Dynamictabs";
import OverView from "../../components/Common/Button/Content/OverView";
import Video from "../../components/video/video";
import { useDispatch, useSelector } from "react-redux";
const Project = ({ id }) => {
  const dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects } = useSelector((state) => state.projects);
  console.log("Projects", projects);

  // Use `useEffect` to fetch data on component mount
  useEffect(() => {
    const project = projects.find((project) => project.project_id == id);
    setSelectedProject(project);
  }, [id, projects]);

  // Display a loading state until the projects data is fetched
  if (!selectedProject) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.profileCard}>
      <div>
        <Row className={`${classes.profileRow}`}>
          <Subtitle subtitle={selectedProject.project_title} />
          <Col className="mt-4 mb-4" md="6">
            <Video youtube_url={selectedProject.project_youtube_url} />
          </Col>

          <Col md="6">
            <DynamicTabs
              tabs={[
                {
                  key: "Description",
                  label: "Description",
                  content: (
                    <OverView content={selectedProject.project_description} />
                  ),
                },
                {
                  key: "Tech",
                  label: "Tech Used",
                  content: (
                    <SectionList projecttechs={selectedProject.projecttechs} />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Project;
