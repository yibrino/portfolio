import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (
    {
      teamprofile_fullname,
      teamprofile_title,

      teamprofile_email,
      teamprofile_location,
      teamprofile_phonenumber,
      teamprofile_overview,
      teamprofile_img_url,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/team/create/`, {
        teamprofile_title: teamprofile_title,
        teamprofile_fullname: teamprofile_fullname,
        teamprofile_email: teamprofile_email,
        teamprofile_location: teamprofile_location,
        teamprofile_phonenumber: teamprofile_phonenumber,
        teamprofile_overview: teamprofile_overview,
        teamprofile_img_url: teamprofile_img_url,
      });

      console.log("Response from  create team", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
