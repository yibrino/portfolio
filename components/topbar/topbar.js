import Language from "@mui/icons-material/Language";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import Settings from "@mui/icons-material/Settings";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signOutHandler } from "../../features/auth/authSlice";
import styles from "./topbar.module.css";
import { useRouter } from "next/router";

export default function Topbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    console.log("Signout clicked");
    dispatch(signOutHandler());
    router.push("/login");
  };

  const toggleSettingsMenu = () => {
    setIsSettingsOpen(!isSettingsOpen); // Toggle the dropdown menu visibility
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarWrapper}>
        <div className={styles.topLeft}>
          <span className={styles.logo}> </span>
        </div>
        <div className={styles.topRight}>
          <div className={styles.topbarIconContainer}>
            <NotificationsNone />
            <span className={styles.topIconBadge}>2</span>
          </div>

          {/* Settings icon with dropdown menu */}
          <div
            className={styles.topbarIconContainer}
            onClick={toggleSettingsMenu}
          >
            <Settings />
          </div>

          {/* Dropdown menu for settings */}
          {isSettingsOpen && (
            <div className={styles.settingsDropdown}>
              <button
                className={styles.settingsLogoutButton}
                onClick={handleSignOut}
              >
                <span className={styles.logoutIcon}>🔒</span> Logout
              </button>
            </div>
          )}

          <img
            src="/publishly_logo.jpg"
            alt="avatar"
            className={styles.topAvatar}
          />
        </div>
      </div>
    </div>
  );
}
