import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation
import classes from "../../styles/news.module.css";
import { getData } from "../../utlis/getData";
import LoadingSpinner from "../../utlis/loadingSpinner";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { selectSelectedCategory } from "../../features/categories/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import TitleSection from "../../components/UI/Title";
import SectionContent from "../../components/Common/Button/Content/OverView";
import NewsLayout from "../../layouts/newslayout";
import categories from "../admin/categories";

const News = () => {
  const [news, setNews] = useState(null);
  const [likedNews, setLikedNews] = useState({});
  const [filteredNews, setFilteredNews] = useState([]);
  const dispatch = useDispatch();
  const activeCategory = useSelector(selectSelectedCategory);
  const { categories } = useSelector((state) => state.categories);
  console.log("Selected Category", activeCategory);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    getData("news")
      .then((data) => {
        if (data && data.length > 0) {
          setNews(data);
          // Check if user email exists in likes
          const userEmail = localStorage.getItem("userEmail");
          if (userEmail) {
            const likesMap = {};
            data.forEach((item) => {
              likesMap[item.news_id] = item.like_for_news.some(
                (like) => like.liked_by === userEmail
              );
            });
            setLikedNews(likesMap);
          }
        } else {
          console.error("No data returned for news");
        }
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (news && activeCategory) {
      const filtered = news.filter((item) => {
        // Find the matching category from the categories array
        const matchingCategory = categories.find(
          (cat) => cat.category_id === item.category
        );

        // Check if the category's name matches the activeCategory
        return (
          matchingCategory && matchingCategory.category_name === activeCategory
        );
      });

      setFilteredNews(filtered);
    } else {
      setFilteredNews(news || []);
    }
  }, [activeCategory, news, categories]);

  if (!news) {
    return <LoadingSpinner />;
  }

  const handleNavigate = (newsId, newsTitle) => {
    router.push(`/news/${newsId}?title=${encodeURIComponent(newsTitle)}/`);
  };

  return (
    <NewsLayout>
      <div className={classes.news}>
        <div className={classes.container}>
          <div className={classes.grid}>
            {filteredNews.map((item) => (
              <div
                key={item.news_id}
                className={classes.card}
                onClick={() => handleNavigate(item.news_id, item.news_title)} // Add onClick for navigation
                style={{ cursor: "pointer" }}
              >
                <TitleSection title={item.news_title} />
                <SectionContent content={item.news_content} />
                {item.news_img_url && (
                  <div className={classes.cardImage}>
                    <img
                      width="100%"
                      height="100%"
                      src={item.news_img_url}
                      alt={item.news_title}
                    />
                  </div>
                )}
                <div className={classes.cardFooter}>
                  <div>
                    {likedNews[item.news_id] ? (
                      <BsSuitHeartFill
                        className={classes.likeIconFilled}
                        size={24}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <BsSuitHeart
                        className={classes.likeIcon}
                        size={24}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                    <span className={classes.text}>
                      {likedNews[item.news_id]
                        ? item.like_for_news.length
                        : item.like_for_news.length}{" "}
                      Likes
                    </span>
                  </div>
                  <div>
                    <GoComment className={classes.commentIcon} size={24} />
                    <span className={classes.text}>
                      {item.comment_for_news?.length || 0} Comments
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </NewsLayout>
  );
};

export default News;
// const News = () => {
//   return (
//     <NewsLayout>
//       <h3>hey</h3>
//     </NewsLayout>
//   );
// };
// export default News;
