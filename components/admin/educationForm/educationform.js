import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import styles from "../../../styles/commonform.module.css";
import {
  getAllEducations,
  createEducation,
  updateEducation,
} from "../../../features/education/helpers";
import { getAllTeams } from "../../../features/team/helpers";
import { successMessage } from "../../../utlis/sucessMessage";

export default function ExperienceForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query; // Fetch the experience ID from the URL
  const { teams } = useSelector((state) => state.teams);
  const { educations } = useSelector((state) => state.educations);

  const [formData, setFormData] = useState({
    educationbackground_degree_level: "",
    educationbackground_institution: "",
    educationbackground_degree_description: "",
    educationbackground_degree_type: "",
    educationbackground_from_date: "",
    educationbackground_to_date: "",

    team: "",
  });

  useEffect(() => {
    // Fetch teams and educations on mount
    dispatch(getAllTeams());
    dispatch(getAllEducations());
  }, [dispatch]);
  console.log("Educations", educations);

  useEffect(() => {
    if (id && educations) {
      const selectedEducation = educations.find(
        (education) => education.educationbackground_id == id
      );
      if (selectedEducation) {
        setFormData({
          educationbackground_degree_level:
            selectedEducation.educationbackground_degree_level || "",
          educationbackground_institution:
            selectedEducation.educationbackground_institution || "",
          educationbackground_degree_type:
            selectedEducation.educationbackground_degree_type || "",

          educationbackground_degree_description:
            selectedEducation.educationbackground_degree_description || "",
          educationbackground_from_date:
            selectedEducation.educationbackground_from_date || "",
          educationbackground_to_date:
            selectedEducation.educationbackground_to_date || "",
          team: selectedEducation.team || "",
        });
      }
    }
  }, [id, educations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      educationbackground_degree_level,
      educationbackground_institution,
      educationbackground_degree_description,
      educationbackground_degree_type,
      educationbackground_from_date,
      educationbackground_to_date,
      team,
    } = formData;

    if (
      !educationbackground_degree_level ||
      !educationbackground_institution ||
      !educationbackground_degree_description ||
      !educationbackground_degree_type ||
      !educationbackground_from_date ||
      !educationbackground_to_date ||
      !team
    ) {
      toast.error("All required fields must be filled!");
      return;
    }

    const educationData = {
      ...formData,
    };
    console.log("educationData", educationData);

    if (id) {
      console.log("Form Data", formData);
      dispatch(
        updateEducation({ ...educationData, educationbackground_id: id })
      )
        .then(() => {
          dispatch(getAllEducations());
          successMessage("Education updated successfully!");
        })
        .catch((error) => {
          toast.error("Failed to update education!");
          console.error("Error updating education:", error);
        });
    } else {
      dispatch(createEducation(educationData))
        .then(() => {
          dispatch(getAllEducations());
          successMessage("Education created successfully!");
        })
        .catch((error) => {
          toast.error("Failed to create education!");
          console.error("Error creating education:", error);
        });
    }

    router.push("/admin/education");
  };

  return (
    <div className={styles.formContainer}>
      <h1>{id ? "Edit Education" : "Create Education"}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Degree Level</label>
          <input
            type="text"
            name="educationbackground_degree_level"
            value={formData.educationbackground_degree_level}
            onChange={handleChange}
            placeholder="Enter the degree level"
          />
        </div>
        <div className={styles.containerItem}>
          <label>Institution</label>
          <input
            type="text"
            name="educationbackground_institution"
            value={formData.educationbackground_institution}
            onChange={handleChange}
            placeholder="Enter the company location"
          />
        </div>
        <div className={styles.containerItem}>
          <label>Degree Type</label>
          <input
            type="text"
            className={styles.formInput}
            name="educationbackground_degree_type"
            value={formData.educationbackground_degree_type}
            onChange={handleChange}
            placeholder="Enter your degree Type"
          />
        </div>

        <div className={styles.containerItem}>
          <label>Description</label>
          <textarea
            name="educationbackground_degree_description"
            value={formData.educationbackground_degree_description}
            onChange={handleChange}
            placeholder="Describe the your educational background"
          ></textarea>
        </div>
        <div className={styles.containerItem}>
          <label>From Date</label>
          <input
            type="date"
            name="educationbackground_from_date"
            value={formData.educationbackground_from_date}
            onChange={handleChange}
          />
        </div>
        <div className={styles.containerItem}>
          <label>To Date</label>
          <input
            type="date"
            name="educationbackground_to_date"
            value={formData.educationbackground_to_date}
            onChange={handleChange}
          />
        </div>
        <div className={styles.containerItem}>
          <label>Team</label>
          {id ? (
            // For edit mode: Disable the dropdown and show the selected team's name
            <select
              name="team"
              value={formData.team}
              onChange={handleChange}
              required
              disabled
            >
              <option value={formData.team}>
                {teams?.find(
                  (team) => team.teamprofile_fullname === formData.team
                )?.teamprofile_fullname || "Unknown Team"}
              </option>
            </select>
          ) : (
            // For create mode: Show a selectable dropdown
            <select
              name="team"
              value={formData.team}
              onChange={handleChange}
              required
            >
              <option value="">Select a team</option>{" "}
              {/* Default placeholder option */}
              {teams &&
                teams.map((team) => (
                  <option key={team.teamprofile_id} value={team.teamprofile_id}>
                    {team.teamprofile_fullname}
                  </option>
                ))}
            </select>
          )}
        </div>

        <button className={styles.Button} type="submit">
          {id ? "Update Education" : "Create Education"}
        </button>
      </form>
    </div>
  );
}
