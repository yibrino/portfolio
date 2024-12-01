import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./skillform.module.css";
import { successMessage } from "../../../utlis/sucessMessage";
import { useRouter } from "next/router";
import {
  getAllSkills,
  updateSkill,
  createSkill,
} from "../../../features/skill/helpers";

export default function SkillForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { skills } = useSelector((state) => state.skills);

  const [skillTitle, setSkillTitle] = useState("");
  const [skillDescription, setSkillDescription] = useState("");

  useEffect(() => {
    dispatch(getAllSkills());
  }, [dispatch]);

  useEffect(() => {
    if (id && skills) {
      const selectedSkill = skills.find((skill) => skill.skill_id == id);
      if (selectedSkill) {
        setSkillTitle(selectedSkill.skill_title);
        setSkillDescription(selectedSkill.skill_description);
      }
    }
  }, [id, skills]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!skillTitle || !skillDescription) {
      toast.error("All fields are required");
      return;
    }
    if (id) {
      dispatch(
        updateSkill({
          skill_id: id,
          skill_title: skillTitle,
          skill_description: skillDescription,
        })
      )
        .then(() => {
          // Fetch the updated skill list
          return dispatch(getAllSkills());
        })
        .then(() => {
          // Show the success message after fetching updated data
          successMessage("Skill updated successfully!");
        })
        .catch((error) => {
          // Handle any errors during update or fetch
          toast.error("Failed to update skill. Please try again.");
          console.error("Error updating skill:", error);
        });
    } else {
      dispatch(
        createSkill({
          skill_title: skillTitle,
          skill_description: skillDescription,
        })
      )
        .then(() => {
          dispatch(getAllSkills());
        })
        .then(() => {
          // Show the success message after  Created data
          successMessage("Skill Created successfully!");
        });
    }

    router.push("/admin/skills");
  };

  return (
    <div className={styles.newCarousel}>
      <h1 className={styles.newCarouselTitle}>
        {id ? "Edit Skill" : "Create Skill"}
      </h1>

      <form
        className={styles.newCarouselForm}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* Alternative Text */}
        <div className={styles.newCarouselItem}>
          <label>Skill Title</label>
          <input
            className={styles.carouselInput}
            type="text"
            placeholder="Write the title of the skill"
            value={skillTitle}
            onChange={(e) => setSkillTitle(e.target.value)}
          />
        </div>

        {/* Caption */}
        <div className={styles.newCarouselItem}>
          <label>Skill Description</label>
          <textarea
            className={styles.carouselInput}
            placeholder="Write a description for the skill"
            value={skillDescription}
            onChange={(e) => setSkillDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Submit */}
        <button className={styles.newCarouselButton} type="submit">
          {id ? "Update Skill" : "Create Skill"}
        </button>
      </form>
    </div>
  );
}
