import React from "react";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import styles from "./AdminDashboard.module.css"; // Correct import for CSS module

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import LoadingSpinner from "../../utlis/loadingSpinner";

export default function Home() {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11 (January is 0)
  const currentYear = currentDate.getFullYear();

  return (
    <div className={styles.home}>
      {" "}
      {/* Use styles from the module */}
      <FeaturedInfo />
      {/* <Chart
        data={userData}
        title="User Analytics"
        grid
        datakey={"Active User"}
      /> */}
      <div className={styles.homeWidgets}>
        <div>
          <h2 className="widgetLgTitle">New Members</h2>

          {/* <div className="widgetSmList">
            {filteredUsers.map((user) => (
              <div key={user.user_id} className="widgetListItem">
                <WidgetSm user={user} />
              </div>
            ))}
          </div> */}
        </div>
        {/* <div>
          {posts.map((post) => (
            <div key={post.user_id}>
              <WidgetLg post={post} />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
