import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import styles from "../../../styles/commonform.module.css";
import {
  getAllSpecializations,
  createSpecialization,
  updateSpecialization,
} from "../../../features/specialization/helpers";
import { getAllTeams } from "../../../features/team/helpers";
import { successMessage } from "../../../utlis/sucessMessage";

export default function SpecializationForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query; // Fetch the experience ID from the URL
  const { teams } = useSelector((state) => state.teams);
  const { specializations } = useSelector((state) => state.specializations);

  const [formData, setFormData] = useState({
    careerspecialization_description: "",
    team: "",
  });

  useEffect(() => {
    // Fetch teams and specializations on mount
    dispatch(getAllTeams());
    dispatch(getAllSpecializations());
  }, [dispatch]);

  useEffect(() => {
    if (id && specializations) {
      const selectedSpecialization = specializations.find(
        (specialization) => specialization.careerspecialization_id == id
      );
      if (selectedSpecialization) {
        setFormData({
          careerspecialization_description:
            selectedSpecialization.careerspecialization_description || "",

          team: selectedSpecialization.team || "",
        });
      }
    }
  }, [id, specializations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      careerspecialization_description,

      team,
    } = formData;

    if (!careerspecialization_description || !team) {
      toast.error("All required fields must be filled!");
      return;
    }

    const specializationData = {
      ...formData,
    };
    console.log("specializationData", specializationData);

    if (id) {
      console.log("Form Data", formData);
      dispatch(
        updateSpecialization({
          careerspecialization_description:
            specializationData.careerspecialization_description,
          careerspecialization_id: id,
        })
      )
        .then(() => {
          dispatch(getAllSpecializations()).then(() => {
            successMessage("specialization updated successfully!");
          });
        })
        .catch((error) => {
          toast.error("Failed to update specialization!");
          console.error("Error updating specialization:", error);
        });
    } else {
      dispatch(
        createSpecialization({
          careerspecialization_description:
            specializationData.careerspecialization_description,
          team: specializationData.team,
        })
      )
        .then(() => {
          dispatch(getAllSpecializations()).then(() => {
            successMessage("specialization created successfully!");
          });
        })
        .catch((error) => {
          toast.error("Failed to create specialization!");
          console.error("Error creating specialization:", error);
        });
    }

    router.push("/admin/specialization");
  };

  return (
    <div className={styles.formContainer}>
      <h1>{id ? "Edit Specialization" : "Create Specialization"}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.containerItem}>
          <label>Description</label>
          <textarea
            name="careerspecialization_description"
            value={formData.careerspecialization_description}
            onChange={handleChange}
            placeholder="Describe the specialization"
          ></textarea>
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
          {id ? "Update Specialization" : "Create Specialization"}
        </button>
      </form>
    </div>
  );
}
