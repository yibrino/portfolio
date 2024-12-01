import React, { useState, useEffect } from "react";
import classes from "./skills.module.css";
import LoadingSpinner from "../../../utlis/loadingSpinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../../table/table";
import { getAllSkills } from "../../../features/skill/helpers";
import { useDispatch, useSelector } from "react-redux";

const Skills = () => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.skills);

  // Use `useEffect` to fetch data on component mount
  useEffect(() => {
    dispatch(getAllSkills());
  }, []);

  const columnNamesSkill = [
    "skill_id",
    "skill_title",
    "skill_description",
    "created_at",
    "updated_at",
  ];

  if (!skills) {
    return <LoadingSpinner />;
  }
  return (
    <div className={classes.home}>
      <ToastContainer />
      <Table
        action={() => dispatch(getAllSkills())}
        editPage="editSkill"
        rowIdField="skill_id"
        table="skill"
        data={skills}
        columnNames={columnNamesSkill}
      />
    </div>
  );
};

export default Skills;
