import baseUrl from "./config";
import axios from "axios";

export async function deleteData(endpoint, id) {
  console.log("Endpoint", endpoint);
  console.log("Id", id);

  try {
    const response = await axios.delete(`${baseUrl}/${endpoint}/${id}/`);
    console.log("Response `", response);

    return response;
  } catch (error) {
    return rejectWithValue(error.response.data.errors[0]);
  }
}
