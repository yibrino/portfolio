import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row } from "reactstrap";
import classes from "./home.module.css";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import LoadingSpinner from "../../../utlis/loadingSpinner";
import CommentList from "../../UI/CommentList";
import CommentForm from "../../UI/CommentForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "../../../utlis/getData";
import TitleSection from "../../UI/Title";
import SectionContent from "../../Common/Button/Content/OverView";
import NewsLayout from "../../../layouts/newslayout";
import Table from "../../table/table";
import { useDispatch, useSelector } from "react-redux";
import Category from "../../UI/Category";
import { getAllTeams } from "../../../features/team/helpers";
import { getAllCarousels } from "../../../features/carousel/helpers";
import { getAllHeros } from "../../../features/heros/helpers";
const HomeSection = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { carousels } = useSelector((state) => state.carousels);
  const { teams } = useSelector((state) => state.teams);
  const { heros } = useSelector((state) => state.heros);
  console.log("carousels", carousels);
  const tabs = [
    {
      key: "carousels",
      label: "carousel",
    },
    {
      key: "heros",
      label: "hero",
    },
    {
      key: "teams",
      label: "team",
    },
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0]?.label);

  useEffect(() => {
    if (!selectedTab) return;

    dispatch(getAllCarousels());
    dispatch(getAllTeams());
    dispatch(getAllHeros());
  }, [selectedTab, dispatch]); // Run effect whenever `selectedTab` change

  const handleTabSelect = (tablabel) => {
    setSelectedTab(tablabel); // Update the selected tab state
  };

  const columnNamesCarousel = [
    "carousel_ID",
    "CAROUSEL_CAPTION",
    "created_at",
    "updated_at",
  ];

  const columnNamesHero = [
    "hero_id",
    "hero_title",
    "hero_about",
    "created_at",
    "updated_at",
  ];

  const columnNamesTeam = [
    "teamprofile_id",
    "teamprofile_fullname",
    "teamprofile_title",
    "teamprofile_location",
    "teamprofile_phonenumber",
    "teamprofile_overview",
    "created_at",
    "updated_at",
  ];

  // Map selectedTab to its corresponding column names dynamically
  const getColumnNames = () => {
    switch (selectedTab) {
      case "carousel":
        return columnNamesCarousel;
      case "hero":
        return columnNamesHero;
      case "team":
        return columnNamesTeam;
      default:
        return columnNamesCarousel; // Default column names in case no tab is selected
    }
  };

  const getRowId = () => {
    switch (selectedTab) {
      case "carousel":
        return "carousel_id"; // Use quotes for consistent string literals
      case "hero":
        return "hero_id"; // Corrected to return a string "hero_id"
      case "team": // Assuming this is another case
        return "teamprofile_id"; // Return the correct string identifier
      default:
        return "carousel_id"; // Ensure default value is quoted and consistent
    }
  };
  const getData = () => {
    switch (selectedTab) {
      case "carousel":
        return carousels;
      case "hero":
        return heros; // Replace with actual hero data when available
      case "team":
        return teams;
      default:
        return carousels;
    }
  };
  const getEditPage = () => {
    switch (selectedTab) {
      case "carousel":
        return "editCarousel";
      case "hero":
        return "editHero"; // Replace with actual hero data when available
      case "team":
        return "editTeam";
      default:
        return "editCarousel";
    }
  };
  const refreshActions = {
    carousel: () => dispatch(getAllCarousels()),
    hero: () => dispatch(getAllHeros()),
    team: () => dispatch(getAllTeams()),
  };
  if (!data) {
    return <LoadingSpinner />;
  }
  return (
    <div className={classes.home}>
      <Category
        selectedTab={selectedTab}
        onTabSelect={handleTabSelect}
        tabs={tabs}
      />
      <ToastContainer />
      <Table
        action={refreshActions[selectedTab]} // Dynamically set the refresh action
        editPage={getEditPage()}
        rowIdField={getRowId()}
        table={selectedTab}
        data={getData()}
        columnNames={getColumnNames()}
      />
    </div>
  );
};

export default HomeSection;
