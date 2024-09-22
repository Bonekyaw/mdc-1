import { API_URL } from "@/config";

export const fetchApi = async (
  endpoint: string,
  method = "GET",
  token = "Hey it's me, baby.", // Fake token
  data = {}
) => {
  // const url = "http://localhost:4000/products";
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
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to fetch api");
    }

    const response = await res.json();
    // console.log("Response", response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
