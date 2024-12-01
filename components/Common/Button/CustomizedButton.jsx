import React from "react";
import classes from "./CustomizedButton.module.css";
import Link from "next/link";

const CustomizedButton = ({ title, path }) => {
  return (
    <button className={`${classes.button__list}`}>
      <Link href={path}>
        <h5>{title}</h5>
      </Link>
    </button>
  );
};

export default CustomizedButton;
