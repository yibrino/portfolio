import React from "react";
import ReactPlayer from "react-player";
import styles from "./video.module.css"; // CSS Module for styling

const Video = ({ youtube_url, title }) => {
  return (
    <div className={styles.videoContainer}>
      <ReactPlayer
        url={youtube_url}
        controls={true}
        width="100%"
        height="100%"
        className={styles.videoPlayer}
      />
    </div>
  );
};

export default Video;
