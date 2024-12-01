import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row } from "reactstrap";
import classes from "../../components/UI/newsDetail.module.css";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import LoadingSpinner from "../../utlis/loadingSpinner";
import CommentList from "../../components/UI/CommentList";
import CommentForm from "../../components/UI/CommentForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "../../utlis/getData";

import TitleSection from "../../components/UI/Title";
import SectionContent from "../../components/Common/Button/Content/OverView";
import { successMessage } from "../../utlis/sucessMessage";
import {
  createComment,
  addLike,
  removeLike,
  getAllNews,
} from "../../features/news/helpers";
import { useDispatch, useSelector } from "react-redux";
const NewsDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query; // Extract `id` from the path
  console.log("ID", id);
  const [userEmail, setUserEmail] = useState(null);

  const [newsItem, setNewsItem] = useState(null);
  const [content, setContent] = useState("");
  const [liked, setLiked] = useState(false);
  const [isEmailPromptOpen, setIsEmailPromptOpen] = useState(false); // Modal state
  const [emailInput, setEmailInput] = useState(""); // Email input field value
  const [error, setError] = useState(""); // Error message for email validation
  const { news, comments, isLoading, likes } = useSelector(
    (state) => state.news
  );

  console.log("All News", news);
  useEffect(() => {
    if (!id) return;

    // Dispatch the action to get all news only once when id changes
    if (news.length === 0) {
      dispatch(getAllNews());
    }

    // Wait until news is available before filtering
    if (news) {
      const selectedNews = news.find((item) => item.news_id == id);
      console.log("Selected News", selectedNews);

      if (selectedNews) {
        userEmail = localStorage.getItem("userEmail");
        setUserEmail(userEmail);
        console.log("userEmail", userEmail);

        console.log("Selected News", selectedNews);
        setNewsItem(selectedNews);
        const isLiked = selectedNews.like_for_news.some(
          (like) => like.liked_by === userEmail
        );
        setLiked(isLiked);
      }
    }
  }, [id, dispatch, news, userEmail]); // Trigger when id, news, or userEmail changes

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = () => {
    if (!validateEmail(emailInput)) {
      setError("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("userEmail", emailInput);
    setIsEmailPromptOpen(false);
    if (content) {
      // Dispatch the createComment action to add the comment
      dispatch(
        createComment({
          news: id,
          commented_by: userEmail,
          comment_content: content,
        })
      )
        .then(() => {
          // After comment is created, refetch the news to reflect updated comments
          dispatch(getAllNews())
            .then(() => {
              successMessage("Comment Added Successfully!");
              setContent(""); // Reset the content after successful comment
            })
            .catch((error) => {
              console.error("Error fetching news after comment:", error);
            });
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
        });
    }
    if (liked) {
      // If not liked, add the like
      dispatch(addLike({ news: id, liked_by: userEmail }))
        .then(() => {
          successMessage("Like Added Successfully!");
          // Re-fetch news after like is added
          dispatch(getAllNews()).catch((error) => {
            console.error("Error fetching news after adding like:", error);
          });
        })
        .catch((error) => {
          console.error("Error adding like:", error);
        });
    }
    setError("");
    console.log("Email added");
  };

  const handleLike = () => {
    setLiked(!liked);

    userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      setIsEmailPromptOpen(true);
      return;
    }
    console.log("news,liked_by", id, userEmail);
    if (liked) {
      const likeToDelete = newsItem.like_for_news.find(
        (like) => like.liked_by === userEmail
      );
      if (likeToDelete) {
        dispatch(removeLike({ like_id: likeToDelete.like_id })) // Remove like
          .then(() => {
            // After removing like, dispatch to get all news
            dispatch(getAllNews())
              .then(() => {
                // Show success message after both actions
                successMessage("Like Removed Successfully!");
              })
              .catch((error) => {
                console.error(
                  "Error fetching news after removing like:",
                  error
                );
              });
          })
          .catch((error) => {
            console.error("Error removing like:", error);
          });
      }
    } else {
      // If not liked, add the like
      dispatch(addLike({ news: id, liked_by: userEmail }))
        .then(() => {
          successMessage("Like Added Successfully!");
          // Re-fetch news after like is added
          dispatch(getAllNews()).catch((error) => {
            console.error("Error fetching news after adding like:", error);
          });
        })
        .catch((error) => {
          console.error("Error adding like:", error);
        });
    }

    // Persist like status (e.g., API call)
  };

  const handleAddComment = (commentContent) => {
    setContent(commentContent);
    console.log("commentContent", commentContent);
    userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      setIsEmailPromptOpen(true);
      return;
    }
    console.log("commented_by,comment_content", userEmail, content);

    // Dispatch the createComment action to add the comment
    dispatch(
      createComment({
        news: id,
        commented_by: userEmail,
        comment_content: commentContent,
      })
    )
      .then(() => {
        // After comment is created, refetch the news to reflect updated comments
        dispatch(getAllNews())
          .then(() => {
            successMessage("Comment Added Successfully!");
            setContent(""); // Reset the content after successful comment
          })
          .catch((error) => {
            console.error("Error fetching news after comment:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!newsItem) {
    return <div>No news found</div>;
  }

  return (
    <div className={classes.newsDetail}>
      <ToastContainer />
      <Row className={classes.details}>
        <TitleSection title={newsItem.news_title} />
        <SectionContent content={newsItem.news_content} />
        {/* News Image */}
        {newsItem.news_img_url && (
          <div className={classes.imageContainer}>
            <img src={newsItem.news_img_url} alt={newsItem.news_title} />
          </div>
        )}
        {/* Like Section */}
        <div className={classes.likeSection}>
          {liked ? (
            <BsSuitHeartFill
              size={24}
              className={classes.liked}
              onClick={handleLike}
            />
          ) : (
            <BsSuitHeart
              className={classes.like}
              size={24}
              onClick={handleLike}
            />
          )}
          <span className={classes.text}>
            {newsItem.like_for_news.length} Likes
          </span>
        </div>
        {/* Comments Section */}
        <div className={classes.commentsSection}>
          <h4>Comments ({newsItem.comment_for_news.length})</h4>
          <CommentList
            action={() => dispatch(getAllNews())}
            table="comment"
            currentUser={userEmail}
            comments={newsItem.comment_for_news}
          />
          <CommentForm
            newsId={id}
            content={content}
            onAddComment={handleAddComment}
          />
        </div>
        {/* Email Prompt Modal */}
        {isEmailPromptOpen && (
          <div
            className={classes.emailModal}
            onClick={(e) => {
              if (e.target.className.includes(classes.emailModal)) {
                setIsEmailPromptOpen(false);
              }
            }}
          >
            <div className={classes.emailPrompt}>
              <h3 className={classes.modalHeading}>Enter Your Email</h3>
              <input
                className={classes.emailInput}
                type="email"
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              {error && <p className={classes.error}>{error}</p>}
              <div className={classes.buttonContainer}>
                <button
                  className={classes.submitButtton}
                  onClick={handleEmailSubmit}
                >
                  Submit
                </button>
                <button
                  className={classes.submitButtton}
                  onClick={() => setIsEmailPromptOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Row>
    </div>
  );
};

export default NewsDetail;
