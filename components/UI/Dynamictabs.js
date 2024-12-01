import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classes from "./Dynamictabs.module.css";
import {
  selectSelectedCategory,
  setSelectedCategory,
} from "../../features/categories/categorySlice";
import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
const DynamicTabs = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]?.key);

  const handleTabClick = (key) => {
    setSelectedTab(key);
    console.log("Selected tab", selectedTab);
  };

  return (
    <div className={classes.content}>
      <div className={classes.buttons}>
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            className={` ${selectedTab === tab.key ? classes.active : ""}`}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className={classes.pageContent}>
        {tabs.map(
          (tab) => selectedTab === tab.key && tab.content // Directly render tab.content
        )}
      </div>
    </div>
  );
};

DynamicTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default DynamicTabs;
