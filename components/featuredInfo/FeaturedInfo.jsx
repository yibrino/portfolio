import React from "react";
import { useSelector } from "react-redux";
import styles from "./featuredInfo.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
export default function FeaturedInfo() {
  return (
    <div className={styles.featured}>
      {/* Total Users */}
      <div className={styles.featuredItem}>
        <span className={styles.featuredTitle}>Teams</span>
        <div className={styles.featuredMoneyContainer}>
          <span className={styles.featuredMoney}></span>
        </div>
      </div>

      {/* Total Posts */}
      <div className={styles.featuredItem}>
        <span className={styles.featuredTitle}> Posts</span>
        <div className={styles.featuredMoneyContainer}>
          <span className={styles.featuredMoney}></span>
        </div>
      </div>

      {/* Total Categories */}
      <div className={styles.featuredItem}>
        <span className={styles.featuredTitle}>Customers</span>
        <div className={styles.featuredMoneyContainer}>
          <span className={styles.featuredMoney}></span>
        </div>
      </div>
    </div>
  );
}
