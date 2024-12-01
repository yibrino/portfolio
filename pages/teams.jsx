import React, { useEffect, useState } from "react";
import TeamsProfile from "../components/TeamsProfile/TeamsProfile";
import TitleSection from "../components/Section/TitleSection";
import { getData } from "../utlis/getData";
import LoadingSpinner from "../utlis/loadingSpinner";
import styles from "../styles/our_teams.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllTeams } from "../features/team/helpers";

const TeamsPage = () => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.teams);
  console.log("Teams", teams);
  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);

  return (
    <div className={styles.teamprofile}>
      <TitleSection title="Our Professional Teams " />
      <div>
        {teams.length > 0 ? (
          teams.map((team) => (
            <TeamsProfile
              id={team.teamprofile_id}
              key={team.teamprofile_id}
              {...team}
            />
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
