import CertificateTitle from "../components/Section/ContactSection/CertificateTitle/CertificateTitle";
import TitleSection from "../components/Section/TitleSection";
import { useEffect, useState } from "react";
import styles from "../styles/skills.module.css";
import { getData } from "../utlis/getData";
import BasicCertificates from "../components/Certificates/BasicCertificates/BasicCertificates";
import LoadingSpinner from "../utlis/loadingSpinner";
import { useSelector } from "react-redux";

const Skills = () => {
  const { skills } = useSelector((state) => state.skills);

  if (!skills) return <LoadingSpinner />;
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
