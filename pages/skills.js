import CertificateTitle from "../components/Section/ContactSection/CertificateTitle/CertificateTitle";
import TitleSection from "../components/Section/TitleSection";
import { useEffect, useState } from "react";
import styles from "../styles/skills.module.css";
import { getData } from "../utlis/getData";
import BasicCertificates from "../components/Certificates/BasicCertificates/BasicCertificates";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getData("skills")
      .then((data) => {
        if (data) {
          console.log("skills data", data);
          setSkills(data);
        } else {
          console.error("No data returned for skills");
        }
      })
      .catch((error) => {
        console.error("Error fetching skills data:", error);
      });
  }, []);
  return (
    <div className={styles.skills}>
      <div className={styles.skillrow}>
        <TitleSection title="Key Areas of Expertise" />
        {skills.map((skill, index) => (
          <div className={styles.skill} key={index}>
            <CertificateTitle certificatename={skill.skill_title} />
            <BasicCertificates certification={skill.skill_description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
