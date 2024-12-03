import { Fragment, useEffect, useState } from "react";
import Hero from "../components/Home/Hero/Hero";
import Contact from "../components/Home/Contact/Contact";
import ImageSlider from "../components/Home/Slider/ImageSlider";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeams } from "../features/team/helpers";
import TeamsProfile from "../components/TeamsProfile/TeamsProfile";
import { getAllCarousels } from "../features/carousel/helpers";
import { getAllCategories } from "../features/categories/helpers";
import { getAllEducations } from "../features/education/helpers";
import { getAllProjects } from "../features/projects/helpers";
import { getAllNews } from "../features/news/helpers";
import { getAllSkills } from "../features/skill/helpers";
export default function Home() {
  const dispatch = useDispatch();
  const [selectedTeam, setSelectedTeam] = useState(null); // Initialize as null to handle loading state
  const { teams } = useSelector((state) => state.teams);
  console.log("teams inside yibrah profile", teams);

  useEffect(() => {
    // Dispatch to get all teams
    dispatch(getAllTeams());
    dispatch(getAllCarousels());
    dispatch(getAllCategories());
    dispatch(getAllEducations());
    dispatch(getAllProjects());
    dispatch(getAllNews());
    dispatch(getAllSkills());

    // Filter the first team where teamprofile_id equals 0
    const first_team = teams[0];
    setSelectedTeam(first_team);
    // Optionally, you can do something with the selectedTeam here
    console.log(selectedTeam);
  }, [dispatch, teams]); // Ensure 'teams' is part of the dependency array

  return (
    <Fragment>
      <ImageSlider />
      <Hero />
      <div>
        {selectedTeam && (
          <TeamsProfile
            id={selectedTeam.teamprofile_id}
            key={selectedTeam.teamprofile_id} // Use team's id as key
            // Spread selectedTeam data as props to TeamsProfile
            {...selectedTeam}
          />
        )}
      </div>
      <Contact />
    </Fragment>
  );
}
