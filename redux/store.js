import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categories/categorySlice";
import pageReducer from "../features/pages/pageSlice";
import newsReducer from "../features/news/newsSlice";
import carouselReducer from "../features/carousel/carouselSlice";
import teamReducer from "../features/team/teamSlice";
import heroReducer from "../features/heros/heroSlice";
import messageReducer from "../features/mesage/messageSlice";
import skillReducer from "../features/skill/skillSlice";
import projectReducer from "../features/projects/projectSlice";
import experienceReducer from "../features/experience/experienceSlice";
import educationReducer from "../features/education/educationSlice";
import specializationReducer from "../features/specialization/specializationSlice";
import authReducer from "../features/auth/authSlice";
import projecttechReducer from "../features/projecttech/projecttechSlice";
export default configureStore({
  reducer: {
    categories: categoryReducer,
    carousels: carouselReducer,
    pages: pageReducer,
    news: newsReducer,
    teams: teamReducer,
    heros: heroReducer,
    messages: messageReducer,
    skills: skillReducer,
    projects: projectReducer,
    experiences: experienceReducer,
    educations: educationReducer,
    specializations: specializationReducer,
    auth: authReducer,
    projecttechs: projecttechReducer,
  },
});
