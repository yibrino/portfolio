import React from "react";
import ReactPlayer from "react-player";
import styles from "./video.module.css"; // CSS Module for styling

const Video = ({ youtube_url, title }) => {
  return (
    <div className={styles.videoContainer}>
      <ReactPlayer url={youtube_url} controls={true} width="90%" height="90%" />
    </div>
  );
};

export default Video;
