import React from "react";
import styles from "./widgetLg.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function WidgetLg({ post }) {
  // Format the date to a short format (e.g., "6/22/2022")
  const formattedDate = new Date(post.created_at).toLocaleDateString();

  // Trim the post content to 10 characters and add "..."
  const shortContent =
    post.post_content.length > 10
      ? post.post_content.substring(0, 10) + "..."
      : post.post_content;

  return (
    <div className={styles.widgetLg}>
      <h3 className={styles.widgetLgTitle}>Latest Posts</h3>
      <table className={styles.widgetLgTable}>
        <thead>
          <tr className={styles.widgetLgTr}>
            <th className={styles.widgetLgTh}>User</th>
            <th className={styles.widgetLgTh}>Date</th>
            <th className={styles.widgetLgTh}>Content</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.widgetLgTr} key={post.id}>
            <td className={styles.widgetLgUser}>
              <img
                // src={userprofile?.user_profile_picture}
                alt="profile"
                className={styles.widgetLgImg}
              />
              <span className={styles.widgetLgName}>
                {/* {currentUser?.user_username} */}
              </span>
            </td>
            {/* <td className={styles.widgetLgDate}>{formattedDate}</td> */}
            {/* <td className={styles.widgetLgAmount}>{shortContent}</td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
