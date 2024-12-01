import baseUrl from "./config";
export async function getData(endpoint) {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}/`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(`Error fetching ${endpoint}: ${response.statusText}`);
      return null; // Return null or an appropriate default value in case of an error
    }
    return await response.json(); // Directly return the parsed JSON response
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return null; // Return null or an appropriate default value in case of an error
  }
}
