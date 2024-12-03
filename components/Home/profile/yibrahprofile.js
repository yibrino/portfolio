import React, { useEffect, useState } from "react";
import TeamsProfile from "../../TeamsProfile/TeamsProfile";
import { getData } from "../../../utlis/getData";
import LoadingSpinner from "../../../utlis/loadingSpinner";
import styles from "../../../styles/our_teams.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeams } from "../../../features/team/helpers";

const YibrahProfile = () => {
  const dispatch = useDispatch();
  const [selectedTeam, setSelectedTeam] = useState(null); // Initialize as null to handle loading state
  const { teams } = useSelector((state) => state.teams);
  console.log("teams", teams);

  useEffect(() => {
    // Dispatch to get all teams
    dispatch(getAllTeams());

    // Filter the first team where teamprofile_id equals 0
    const first_team = teams.find((team) => team.teamprofile_id === 0);
    setSelectedTeam(first_team);
    // Optionally, you can do something with the selectedTeam here
    console.log(selectedTeam);
  }, [dispatch, teams]); // Ensure 'teams' is part of the dependency array

  return (
    <div className={styles.teamprofile}>
      <TeamsProfile
        id={0}
        key={selectedTeam.teamprofile_id}
        // Spread team data as props to TeamsProfile
      />
    </div>
  );
};

export default YibrahProfile;
