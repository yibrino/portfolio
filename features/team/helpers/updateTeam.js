import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async (
    {
      teamprofile_id,
      teamprofile_title,
      teamprofile_fullname,
      teamprofile_location,
      teamprofile_email,
      teamprofile_phonenumber,
      teamprofile_img_url,
      teamprofile_overview,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${baseUrl}/team/update/${teamprofile_id}/`,
        {
          teamprofile_fullname: teamprofile_fullname,
          teamprofile_title: teamprofile_title,
          teamprofile_location: teamprofile_location,
          teamprofile_email: teamprofile_email,
          teamprofile_phonenumber: teamprofile_phonenumber,
          teamprofile_img_url: teamprofile_img_url,
          teamprofile_overview: teamprofile_overview,
        }
      );
      console.log("Response from  update team", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
