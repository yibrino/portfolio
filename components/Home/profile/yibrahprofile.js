import React, { useEffect, useState } from "react";
import TeamsProfile from "../../TeamsProfile/TeamsProfile";
import { getData } from "../../../utlis/getData";
import LoadingSpinner from "../../../utlis/loadingSpinner";
import styles from "../../../styles/our_teams.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeams } from "../../../features/team/helpers";

const YibrahProfile = () => {
  const dispatch = useDispatch();
  const [team, setTeam] = useState(null); // Initialize as null to handle loading state
  const { teams } = useSelector((state) => state.teams);
  console.log("teams", teams);

  useEffect(() => {
    dispatch(getAllTeams());
    setTeam(teams[0]);
  }, [dispatch]);
  if (!team) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.teamprofile}>
      <TeamsProfile
        id={team.teamprofile_id}
        key={team.teamprofile_id}
        // Spread team data as props to TeamsProfile
      />
    </div>
  );
};

export default YibrahProfile;
