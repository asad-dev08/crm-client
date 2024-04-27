import axios from "axios";
import { BASE_URL } from "./actionTypes";
import jwtService from "../jwtService";

import { Util } from "../util/Util";
import { startLoading, stopLoading } from "../redux/loader/loadingSlice";
import toast from "react-hot-toast";

const util = new Util();

export const makeApiCall = async (method, url, data = null, headers = {}) => {
  try {
    const store = require("../redux/store").default;
    store.dispatch(startLoading()); // Dispatch startLoading action
    // Get the authentication token from the AuthContext
    const accessToken = jwtService.getAccessToken();
    const pathsToSkipTokenCheck = [
      "/auth/verifyLogin",
      "/user",
      "/user/3",
      "/user/8",
      "/user/10",
      "/user-pagination",
    ];
    const isInvalid = util.invalidUser();
    const isAuthValid = jwtService.isAuthTokenValid(accessToken);

    // Check if accessToken is null or undefined and if the current path is not in pathsToSkipTokenCheck
    if (!accessToken && !pathsToSkipTokenCheck.includes(url)) {
      // Show error message
      toast.error("Access token Invalid. Please log in.", { duration: 4000 });

      jwtService.setSession(null);
      jwtService.removeUserData();

      //store.dispatch(stopLoading());
      window.location.href = "/";
      return; // Stop further execution
    }
    if (isInvalid && !pathsToSkipTokenCheck.includes(url)) {
      toast.error("Access token Invalid. Please log in.", { duration: 4000 });

      jwtService.setSession(null);
      jwtService.removeUserData();

      //store.dispatch(stopLoading());
      window.location.href = "/";
      return; // Stop further execution
    }
    if (!isAuthValid && !pathsToSkipTokenCheck.includes(url)) {
      toast.error("Access token Invalid. Please log in.", { duration: 4000 });

      jwtService.setSession(null);
      jwtService.removeUserData();

      //store.dispatch(stopLoading());
      window.location.href = "/";
      return; // Stop further execution
    }

    // Add your API base URL or any other default configurations here
    const baseUrl = BASE_URL;

    // Merge default headers, authentication headers, and provided headers
    const mergedHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    };

    // Set up Axios request configuration
    const config = {
      method: method.toUpperCase(),
      url: `${baseUrl}${url}`,
      data,
      headers: mergedHeaders,
      // Add any other configurations here
    };

    // Make the API call using Axios
    const response = await axios(config);

    if (response && response.status === 401) {
      toast.error(response && response.statusText, { duration: 3000 });
      return;
    }

    store.dispatch(stopLoading());
    // Handle the response as needed
    return response;
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);
    toast.error(error.message, { duration: 3000 });
    //throw error;
  } finally {
    const store = require("../redux/store").default;
    // Dispatch stopLoading action
    store.dispatch(stopLoading());
  }
};
