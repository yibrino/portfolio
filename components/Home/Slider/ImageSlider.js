import React, { useState, useEffect } from "react";
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import styles from "./imageslider.module.css";
import baseUrl from "../../../utlis/config";
import Subtitle from "../../UI/SectionSubtitle";
import { getData } from "../../../utlis/getData";
import LoadingSpinner from "../../../utlis/loadingSpinner";
const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [items, setItems] = useState([]);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  // Fetch data from the API
  useEffect(() => {
    getData("carousels")
      .then((data) => {
        if (data) {
          setItems(data);
        } else {
          console.error("No data returned for carousels");
        }
      })
      .catch((error) => {
        console.error("Error fetching carousel data:", error);
      });
  }, []);
  const slides = items.map((item) => {
    return (
      <CarouselItem
        className="carousel-item"
        key={item.carousel_id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <img src={item.carousel_url} alt={item.carousel_alt} />
        <div className={styles.caption}>
          <Subtitle subtitle={item.carousel_caption} />
        </div>
      </CarouselItem>
    );
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }, 7000);
    return () => clearInterval(interval);
  }, [activeIndex, items.length]);
  if (!items) return <LoadingSpinner />;

  return (
    <div className={styles.slider}>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        {slides}
        <CarouselControl direction="prev" onClickHandler={previous} />
        <CarouselControl direction="next" onClickHandler={next} />
      </Carousel>
      <CSSTransition
        in={animating}
        timeout={500}
        classNames={{
          enter: styles.fadeEnter,
          enterActive: styles.fadeEnterActive,
          exit: styles.fadeExit,
          exitActive: styles.fadeExitActive,
        }}
        unmountOnExit
      >
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default ImageSlider;
