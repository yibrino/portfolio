import React, { useState } from "react";
import classes from "./commentsform.module.css";

const CommentForm = ({ content, onAddComment }) => {
  const [commetcontent, setCommentContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commetcontent.trim()) return;
    // Simulate an API call to add the comment
    onAddComment(commetcontent);
    setSubmitted(true);
  };
  const commentValue = submitted ? content : commetcontent;

  return (
    <form onSubmit={handleSubmit} className={classes.commentForm}>
      <textarea
        className={classes.commentArea}
        value={commentValue}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Write your comment..."
      ></textarea>
      <button className={classes.submitButtton} type="submit">
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
