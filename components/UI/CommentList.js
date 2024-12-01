import React, { useState } from "react";
import { Edit, Trash, Info } from "lucide-react";
import classes from "./commentlist.module.css";
import { deleteData } from "../../utlis/deleteData";
import { toast } from "react-toastify";
import { successMessage } from "../../utlis/sucessMessage";
import { getAllNews, updateComment } from "../../features/news/helpers";
import confirmAction from "../../utlis/confirmAction";
import { useDispatch } from "react-redux";
const CommentList = ({ comments, action, table, currentUser }) => {
  const dispatch = useDispatch();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  // Handle clicking the edit button
  const handleEditClick = (comment) => {
    setEditingCommentId(comment.comment_id);
    setEditContent(comment.comment_content);
  };

  // Handle changes to the input while editing
  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };
  const handleDeleteComment = (comment_id) => {
    console.log("Id", comment_id);
    confirmAction({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      confirmText: "Yes, delete it!",
      cancelText: "Cancel",
      onConfirm: async () => {
        try {
          const response = await deleteData(table, comment_id);
          console.log("response", response);
          if (response.status === 200) {
            successMessage(`${table} Deleted successfully!`);
            if (action) action(); // Dispatch the action to refresh data
          } else {
            toast.error("Failed to delete.");
          }
        } catch (error) {
          toast.error("An error occurred during deletion.");
          console.error("Delete error:", error);
        }
      },
    });
  };

  // Handle submitting the updated comment
  const handleEditComment = (comment_id) => {
    console.log("comment_id", comment_id);
    console.log("new comment", editContent);
    if (editContent.trim()) {
      dispatch(
        updateComment({ comment_id: comment_id, comment_content: editContent })
      ).then(() => {
        successMessage("Comment Edited Succesfully");
        dispatch(getAllNews());
      });
      setEditingCommentId(null); // Exit edit mode
      setEditContent(""); // Clear the input
    } else {
      alert("Comment content cannot be empty."); // Prevent empty submissions
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  return (
    <ul className={classes.commentList}>
      {comments.map((comment) => (
        <li key={comment.comment_id} className={classes.commentItem}>
          {editingCommentId === comment.comment_id ? (
            <div className={classes.editForm}>
              <textarea
                className={classes.editInput}
                value={editContent}
                onChange={handleEditChange}
              />
              <div className={classes.actions}>
                <button
                  className={classes.saveButton}
                  onClick={() => handleEditComment(comment.comment_id)}
                >
                  Save
                </button>
                <button
                  className={classes.cancelButton}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className={classes.commentContent}>
              <p className={classes.comment}>
                <span className={classes.authorName}>
                  {comment.commented_by}
                </span>
                : {comment.comment_content}
              </p>

              {currentUser === comment.commented_by && (
                <div className={classes.actions}>
                  <span
                    className={`${classes.actionIcon} ${classes.editIcon}`}
                    onClick={() => handleEditClick(comment)}
                  >
                    <Edit size={20} />
                  </span>
                  <span
                    className={`${classes.actionIcon} ${classes.deleteIcon}`}
                    onClick={() => handleDeleteComment(comment.comment_id)}
                  >
                    <Trash size={20} />
                  </span>
                </div>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
