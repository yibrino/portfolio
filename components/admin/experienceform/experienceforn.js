import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import styles from "../../../styles/commonform.module.css";
import {
  getAllExperiences,
  updateExperience,
  createExperience,
} from "../../../features/experience/helpers";
import { getAllTeams } from "../../../features/team/helpers";
import { successMessage } from "../../../utlis/sucessMessage";

export default function ExperienceForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query; // Fetch the experience ID from the URL
  const { teams } = useSelector((state) => state.teams);
  const { experiences } = useSelector((state) => state.experiences);

  const [formData, setFormData] = useState({
    workexperience_company_name: "",
    workexperience_company_location: "",
    workexperience_company_country: "",
    workexperience_position: "",
    workexperience_description: "",
    workexperience_from_date: "",
    workexperience_to_date: "",
    team: "",
  });

  useEffect(() => {
    // Fetch teams and experiences on mount
    dispatch(getAllTeams());
    dispatch(getAllExperiences());
  }, [dispatch]);
  console.log("Experiences", experiences);

  useEffect(() => {
    if (id && experiences) {
      const selectedExperience = experiences.find(
        (experience) => experience.workexperience_id == id
      );
      if (selectedExperience) {
        setFormData({
          workexperience_company_name:
            selectedExperience.workexperience_company_name || "",
          workexperience_company_location:
            selectedExperience.workexperience_company_location || "",
          workexperience_company_country:
            selectedExperience.workexperience_company_country || "",
          workexperience_position:
            selectedExperience.workexperience_position || "",
          workexperience_description:
            selectedExperience.workexperience_description || "",
          workexperience_from_date:
            selectedExperience.workexperience_from_date || "",
          workexperience_to_date:
            selectedExperience.workexperience_to_date || "",
          team: selectedExperience.team || "",
        });
      }
    }
  }, [id, experiences]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      workexperience_company_name,
      workexperience_company_location,
      workexperience_company_country,
      workexperience_position,
      workexperience_description,
      workexperience_from_date,
      workexperience_to_date,
      team,
    } = formData;

    if (
      !workexperience_company_name ||
      !workexperience_position ||
      !workexperience_from_date ||
      !workexperience_to_date ||
      !workexperience_company_location ||
      !workexperience_company_country ||
      !workexperience_description ||
      !team
    ) {
      toast.error("All required fields must be filled!");
      return;
    }

    const experienceData = {
      ...formData,
    };
    console.log("experinceData", experienceData);

    if (id) {
      console.log("Form Data", formData);
      dispatch(updateExperience({ ...experienceData, workexperience_id: id }))
        .then(() => {
          dispatch(getAllExperiences());
          successMessage("Experience updated successfully!");
        })
        .catch((error) => {
          toast.error("Failed to update experience!");
          console.error("Error updating experience:", error);
        });
    } else {
      dispatch(createExperience(experienceData))
        .then(() => {
          dispatch(getAllExperiences());
          successMessage("Experience created successfully!");
        })
        .catch((error) => {
          toast.error("Failed to create experience!");
          console.error("Error creating experience:", error);
        });
    }

    router.push("/admin/experience");
  };

  return (
    <div className={styles.formContainer}>
      <h1>{id ? "Edit Work Experience" : "Create Work Experience"}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Company Name</label>
          <input
            type="text"
            name="workexperience_company_name"
            value={formData.workexperience_company_name}
            onChange={handleChange}
            placeholder="Enter the company name"
          />
        </div>
        <div className={styles.containerItem}>
          <label>Company Location</label>
          <input
            type="text"
            name="workexperience_company_location"
            value={formData.workexperience_company_location}
            onChange={handleChange}
            placeholder="Enter the company location"
          />
        </div>
        <div className={styles.containerItem}>
          <label>Country</label>
          <input
            type="text"
            className={styles.formInput}
            name="workexperience_company_country"
            value={formData.workexperience_company_country}
            onChange={handleChange}
            placeholder="Enter the country"
          />
        </div>
        <div className={styles.containerItem}>
          <label>Position</label>
          <input
            type="text"
            name="workexperience_position"
            value={formData.workexperience_position}
            onChange={handleChange}
            placeholder="Enter the position"
          />
        </div>
        <div className={styles.containerItem}>
          <label>Description</label>
          <textarea
            name="workexperience_description"
            value={formData.workexperience_description}
            onChange={handleChange}
            placeholder="Describe the experience"
          ></textarea>
        </div>
        <div className={styles.containerItem}>
          <label>From Date</label>
          <input
            type="date"
            name="workexperience_from_date"
            value={formData.workexperience_from_date}
            onChange={handleChange}
          />
        </div>
        <div className={styles.containerItem}>
          <label>To Date</label>
          <input
            type="date"
            name="workexperience_to_date"
            value={formData.workexperience_to_date}
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
          {id ? "Update Experience" : "Create Experience"}
        </button>
      </form>
    </div>
  );
}
