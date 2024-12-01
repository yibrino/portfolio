import { useState, useEffect } from "react";
import classes from "./overview.module.css";
const OverView = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return <p className={classes.paragraph__content}>{props.content}</p>;
};
export default OverView;
