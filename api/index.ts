import { API_URL } from "@/config";
import * as SecureStore from "expo-secure-store";

async function fetchWithRetry(url: string, options = {}, retries = 5) {
  try {
    // Try making the API call
    const response = await fetch(url, options);

    // If the response is not OK, throw an error to trigger retry
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    // If token is expired, reponse status is received
    // Sign out logic

    // Return the successful response
    return response.json(); // or return response.text(), response.blob(), etc., based on your needs
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${retries} retries left)`);

      // Wait for the specified delay before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Retry the API call recursively
      return fetchWithRetry(url, options, retries - 1);
    } else {
      // If all retries fail, rethrow the error
      console.error("All retries failed");
      throw error;
    }
  }
}

export const fetchApi = async (
  endpoint: string,
  method = "GET",
  token = "Hey it's me, baby.", // Fake token
  data = {}
) => {
  // const url = "http://localhost:4000/products";
  const getToken = await SecureStore.getItemAsync("token");
  console.log("Token --------", getToken);

  const url = API_URL + endpoint;
  const headers = {
    accept: "application/json",
    Authorization: "Bearer " + token,
  };
  const options =
    Object.keys(data).length === 0
      ? {
          method,
          headers,
        }
      : {
          method,
          headers,
          body: JSON.stringify(data),
        };
  try {
    const response = await fetchWithRetry(url, options, 5); // 3 retries with 1-second delay
    return response;
  } catch (error) {
    console.error("Failed to fetch API:", error);
  }

  // try {
  //   const res = await fetch(url, options);

  //   if (!res.ok) {
  //     throw new Error("Failed to fetch api");
  //   }

  //   const response = await res.json();
  //   // console.log("Response", response);
  //   return response;
  // } catch (error) {
  //   console.error(error);
  // }
};
