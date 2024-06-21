import axios from "axios";
import { BASE_URL } from "./actionTypes";
import jwtService from "../jwtService";

import { Util } from "../util/Util";
import { startLoading, stopLoading } from "../redux/loader/loadingSlice";
import toast from "react-hot-toast";

const util = new Util();

export const makeApiCall = async (method, url, data = null, headers = {}) => {
  const pathsToSkipTokenCheck = ["/auth/verifyLogin"];
  const publicUrls = [/^\/campaign-form\/?.*/];

  try {
    const store = require("../redux/store").default;
    store.dispatch(startLoading()); // Dispatch startLoading action
    // Get the authentication token from the AuthContext
    const accessToken = jwtService.getAccessToken();
    const isInvalid = util.invalidUser();
    const isAuthValid = jwtService.isAuthTokenValid(accessToken);

    if (!publicUrls.some((pattern) => pattern.test(url))) {
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
    let config = null;

    if (
      pathsToSkipTokenCheck.includes(url) ||
      publicUrls.some((pattern) => pattern.test(url))
    ) {
      config = {
        method: method.toUpperCase(),
        url: `${baseUrl}${url}`,
        data,
      };
    } else {
      config = {
        method: method.toUpperCase(),
        url: `${baseUrl}${url}`,
        data,
        headers: mergedHeaders,
        // Add any other configurations here
      };
    }

    // Make the API call using Axios
    //axios.defaults.withCredentials = true;
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

    if (pathsToSkipTokenCheck.includes(url)) {
      toast.error(error && error.response && error.response.data.message);
      return { data: error.response, hasError: true };
    } else {
      if (util.hasException(error)) {
        console.error("Error:", error.response.data.message);
        toast.error(error.response.data.message, { duration: 3000 });
        return Promise.reject(error.data);
      }
    }
    //throw error;
  } finally {
    const store = require("../redux/store").default;
    // Dispatch stopLoading action
    store.dispatch(stopLoading());
  }
};
