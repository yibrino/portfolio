import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import classes from "./category.module.css";
import { Button } from "reactstrap";
import {
  selectSelectedCategory,
  setSelectedCategory,
} from "../../features/categories/categorySlice";

const Category = ({ onTabSelect, tabs }) => {
  const [selectedTab, SetSelectedTab] = useState(tabs[0]?.label);

  const handleTabClick = (label) => {
    SetSelectedTab(label); // Update the selected tab
    onTabSelect(label);
    console.log("Selected tab inside ", selectedTab);
  };

  return (
    <div className={classes.content}>
      <div className={classes.buttons}>
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            className={`${selectedTab === tab.label ? classes.active : ""}`}
            onClick={() => handleTabClick(tab.label)}
          >
            {tab.key}
          </Button>
        ))}
      </div>
    </div>
  );
};

Category.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired, // Unique identifier for the tab
      label: PropTypes.string.isRequired, // Display label for the tab
    })
  ).isRequired,
  onTabSelect: PropTypes.func.isRequired, // Callback function to notify parent component of tab selection
};

export default Category;
