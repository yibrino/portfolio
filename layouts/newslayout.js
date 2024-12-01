import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../features/categories/helpers";
import LoadingSpinner from "../utlis/loadingSpinner";
import classes from "./newslayout.module.css";
import Category from "../components/UI/Category";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import {
  selectSelectedCategory,
  setSelectedCategory,
} from "../features/categories/categorySlice";
const NewsLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.categories);
  console.log("categories", categories);
  const activeCategory = useSelector(selectSelectedCategory);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  useEffect(() => {
    if (categories.length > 0) {
      dispatch(setSelectedCategory(categories[0]?.category_name));
    }
  }, [dispatch, categories]);
  const handleTabClick = (key) => {
    dispatch(setSelectedCategory(key)); // Update the selected category
    console.log("Selected Category inside ", activeCategory);
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.layout}>
      {/* Category Section */}
      <div className={classes.content}>
        <div className={classes.buttons}>
          {categories.map((category) => (
            <Button
              key={category.category_slug}
              className={`${
                activeCategory === category.category_name ? classes.active : ""
              }`}
              onClick={() => handleTabClick(category.category_name)}
            >
              {category.category_name}
            </Button>
          ))}
        </div>
      </div>
      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default NewsLayout;
