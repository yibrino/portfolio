import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillImageFill } from "react-icons/bs";
import styles from "./teamform.module.css";
import { createHero } from "../../../features/heros/helpers";
import {
  createTeam,
  getAllTeams,
  updateTeam,
} from "../../../features/team/helpers";
import { successMessage } from "../../../utlis/sucessMessage";
import { useRouter } from "next/router";
export default function TeamForm() {
  const router = useRouter();
  const { id } = router.query;
  const { teams } = useSelector((state) => state.teams);
  const [teamFullname, setTeamFullname] = useState("");
  const [teamLocation, setTeamLocation] = useState("");
  const [teamEmail, setTeamEmail] = useState("");
  const [teamPhonenumber, setTeamPhoneNumber] = useState("");
  const [teamOverView, setTeamOverView] = useState("");
  const [teamImgUrl, setTeamImgUrl] = useState("");
  console.log("Teams", teams);
  const [teamImage, setTeamImage] = useState("");

  const dispatch = useDispatch();
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/daklnsxdc/image/upload";

  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);

  useEffect(() => {
    if (id && teams) {
      const selectedTeam = teams.find((team) => team.teamprofile_id == id);
      if (selectedTeam) {
        setTeamFullname(selectedTeam.teamprofile_fullname);
        setTeamLocation(selectedTeam.teamprofile_location);
        setTeamEmail(selectedTeam.teamprofile_email);
        setTeamPhoneNumber(selectedTeam.teamprofile_phonenumber);
        setTeamOverView(selectedTeam.teamprofile_overview);
        setTeamImgUrl(selectedTeam.teamprofile_img_url);
      }
    }
  }, [id, teams]);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.log("No file selected");
      return;
    }

    setTeamImage(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio"); // Ensure this preset exists in Cloudinary
    formData.append("folder", "portfolio");

    try {
      const res = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorDetails = await res.json();
        console.error("Cloudinary Error:", errorDetails);
        toast.error(
          `Failed to upload image: ${
            errorDetails.error?.message || "Unknown error"
          }`
        );
        return;
      }

      const { url } = await res.json();
      setTeamImgUrl(url);
      console.log("Image Url", url);
      successMessage("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      toast.error("Failed to upload image");
    }
  };

  const CreateTeamHandler = (e) => {
    e.preventDefault();
    console.log("teamImgUrl", teamImgUrl);
    if (
      !teamFullname ||
      !teamLocation ||
      !teamPhonenumber ||
      !teamPhonenumber ||
      !teamOverView ||
      !teamImgUrl
    ) {
      toast.error("All fields are required");
      return;
    }
    if (id) {
      dispatch(
        updateTeam({
          teamprofile_id: id,
          teamprofile_fullname: teamFullname,
          teamprofile_email: teamEmail,
          teamprofile_location: teamLocation,
          teamprofile_phonenumber: teamPhonenumber,
          teamprofile_overview: teamOverView,
          teamprofile_img_url: teamImgUrl,
        })
      )
        .then(() => {
          // Fetch the updated teams list
          return dispatch(getAllTeams());
        })
        .then(() => {
          // Show the success message after fetching updated data
          successMessage("Team updated successfully!");
        })
        .catch((error) => {
          // Handle any errors during update or fetch
          toast.error("Failed to update Hero. Please try again.");
          console.error("Error updating Hero:", error);
        });
    } else {
      dispatch(
        createTeam({
          teamprofile_fullname: teamFullname,
          teamprofile_email: teamEmail,
          teamprofile_location: teamLocation,
          teamprofile_phonenumber: teamPhonenumber,
          teamprofile_overview: teamOverView,
          teamprofile_img_url: teamImgUrl,
        })
      )
        .then(() => {
          dispatch(getAllTeams());
        })
        .then(() => {
          // Show the success message after  Created data
          successMessage("Team Created successfully!");
        });
    }

    router.push("/admin/home/");
  };

  return (
    <div className={styles.newCarousel}>
      <h1 className={styles.newCarouselTitle}>Create New Team</h1>

      <form
        className={styles.newCarouselForm}
        onSubmit={CreateTeamHandler}
        encType="multipart/form-data"
      >
        {/* Image Upload Section */}
        <div className={styles.newCarouselItem}>
          <label>Upload Image</label>
          <div className={styles.imagePreviewContainer}>
            {teamImage ? (
              <img
                src={URL.createObjectURL(teamImage)}
                alt="preview"
                className={styles.imagePreview}
              />
            ) : teamImgUrl ? (
              <img
                src={teamImgUrl}
                alt="team"
                className={styles.imagePreview}
              />
            ) : (
              <div className={styles.imagePlaceholder}>No image selected</div>
            )}
          </div>
          <label className={styles.fileUploadLabel}>
            <input
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleImageUpload}
            />
            <BsFillImageFill className={styles.uploadIcon} />
          </label>
        </div>

        {/* Alternative Text */}
        <div className={styles.newCarouselItem}>
          <label>Team FullName</label>
          <input
            className={styles.carouselInput}
            type="text"
            placeholder="Write your fullname"
            value={teamFullname}
            onChange={(e) => setTeamFullname(e.target.value)}
          />
        </div>

        {/* Team Location */}
        <div className={styles.newCarouselItem}>
          <label>Team Location</label>
          <input
            className={styles.carouselInput}
            type="text"
            placeholder="Enter location"
            value={teamLocation}
            onChange={(e) => setTeamLocation(e.target.value)}
          />
        </div>

        {/* Team Email */}
        <div className={styles.newCarouselItem}>
          <label>Team Email</label>
          <input
            className={styles.carouselInput}
            type="email"
            placeholder="Enter email"
            value={teamEmail}
            onChange={(e) => setTeamEmail(e.target.value)}
          />
        </div>

        {/* Team Phone Number */}
        <div className={styles.newCarouselItem}>
          <label>Team Phone Number</label>
          <input
            className={styles.carouselInput}
            type="tel"
            placeholder="Enter phone number"
            value={teamPhonenumber}
            onChange={(e) => setTeamPhoneNumber(e.target.value)}
          />
        </div>

        {/* Caption */}
        <div className={styles.newCarouselItem}>
          <label>Team OverView</label>
          <textarea
            className={styles.carouselInput}
            placeholder="Write a about for the team"
            value={teamOverView}
            onChange={(e) => setTeamOverView(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          className={styles.newCarouselButton}
          onClick={CreateTeamHandler}
          type="submit"
        >
          {id ? "Update Team" : "Create Team"}
        </button>
      </form>
    </div>
  );
}
