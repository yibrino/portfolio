import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./widgetSm.module.css";
export default function WidgetSm({ user }) {
  return (
    <div className={styles.widgetSm}>
      <div className={styles.widgetListItem}>
        <img
          // src={userprofile?.user_profile_picture} // Default image if none is provided
          // alt={user.user_firstname}
          className={styles.widgetSmImg}
        />
        <div className={styles.widgetSmUser}>
          <span className={styles.widgetSmUsername}>
            {/* {user.user_firstname} {user.user_lastname} */}
          </span>
          <span className={styles.widgetSmUserTitle}>
            {/* {userprofile?.user_bio} */}
          </span>{" "}
          {/* Use a field for job title */}
        </div>
      </div>
    </div>
  );
}
