import { Fragment } from "react";
import Hero from "../components/Home/Hero/Hero";
import Contact from "../components/Home/Contact/Contact";
import ImageSlider from "../components/Home/Slider/ImageSlider";
import YibrahProfile from "../components/Home/profile/yibrahprofile";
export default function Home() {
  return (
    <Fragment>
      <ImageSlider />
      <Hero />
      <YibrahProfile />
      <Contact />
    </Fragment>
  );
}
