import axios from "axios";

export const sendOtp = (mobile_number) => async (dispatch) => {
  console.log("sendotp action", mobile_number);
  const baseurl = "http://localhost:3031";
  const contextpath = "/api/brand/send/otp";

  try {
    // alert("axios post call");
    const response = await axios({
      method: "POST",
      url: baseurl + contextpath,
      headers: {
        mobile_number: mobile_number,
      },
    });

    console.log("response ", response);
    const data = response.data;
    const statusCode = response.status;
    console.log("data ", data);
    console.log("statusCode", statusCode);

    dispatch({
      type: "SEND_OTP_SUCCESS",
      payload: data,
      statusCode: statusCode,
    });
  } catch (err) {
    console.log("error in send otp api call", err);
  }
};

export const verifyOtp = (mobile_number, otp, role) => async (dispatch) => {
  const baseurl = "http://localhost:3031";
  const otpVerifyContextPath = "/api/brand/login";
  try {
    const response = await axios({
      method: "POST",
      url: baseurl + otpVerifyContextPath,
      headers: {
        mobile_number: mobile_number,
        otp: otp,
        role: role,
      },
    });

    const data = response.data;
    console.log("verify otp data", data);
    if (response.status == 200) {
      const is_user_already_exist = data.is_user_already_exist;
      const is_profile_completed = data.is_profile_completed;

      if (is_user_already_exist && is_profile_completed) {
        const brand_name = data.brand_name;
        const user_id = data.user_id;

        localStorage.setItem("role", "brand");
        localStorage.setItem("name", brand_name);
        localStorage.setItem("mobile_number", user_id);
      }
      console.log("success otp verify");
      dispatch({
        type: "VERIFY_OTP_SUCCESS",
        payload: data,
        isOtpVerified: true,
      });
    }
  } catch (err) {
    console.log("error in otp verify ", err.response);
    dispatch({
      type: "VERIFY_OTP_FAILURE",
      payload: err.response.data,
      isOtpVerified: false,
      statusCode: err.response.status,
    });
  }
};

export const brandProfile = (token) => async (dispatch) => {
  const baseurl = "http://localhost:3031";
  const getBrandProfileContextPath = "/api/brand/profile";

  try {
    const response = await axios({
      method: "GET",
      url: baseurl + getBrandProfileContextPath,
      headers: {
        authorization: "Bearer " + token,
      },
    });

    console.log("response action", response.data);
    const data = response.data;
    const statusCode = response.status;
    const brand_name = response.data.brand_name;
    const user_id = response.data.user_id;

    if (statusCode == 200) {
      let social_medi_urls = data.social_media_urls;
      let urlsArray = social_medi_urls.split("~");
      console.log("urls array");
      console.log(urlsArray);

      localStorage.setItem("role", "brand");
      localStorage.setItem("name", brand_name);
      localStorage.setItem("mobile_number", user_id);
      dispatch({
        type: "BRAND_PROFILE_SUCCESS",
        payload: data,
        statusCode: statusCode,
        urlsArray: urlsArray,
        role: "brand",
      });
    }
  } catch (err) {
    console.log("error in api call", err);
    dispatch({
      type: "BRAND_PROFILE_FAILURE",
      res: err.message,
      statusCode: err.response.status,
    });
  }
};

export const registerBrandAction =
  (brandDetails, token) => async (dispatch) => {
    const baseurl = "http://localhost:3031";
    const brandRegisterContextPath = "/api/brand/register";

    console.log(brandDetails);

    try {
      const response = await axios({
        method: "POST",
        url: baseurl + brandRegisterContextPath,
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
        data: brandDetails,
      });

      console.log("response", response.data);
      const data = response.data;
      const statusCode = response.status;
      console.log("statuscode", response.status);

      dispatch({
        type: "BRAND_REGISTER_SUCCESS",
        payload: data,
        statusCode: statusCode,
        error: "",
      });
    } catch (error) {
      dispatch({
        type: "BRAND_REGISTER_FAILURE",
        payload: error,
      });

      console.log("error in register brand api call", error);
    }
  };

export const newCampaign = (campaignDetails, token) => async (dispatch) => {
  try {
    const baseurl = "http://localhost:3031";
    const createNewCampaignContextPath = "/api/brand/campaign/create";

    const response = await axios({
      method: "POST",
      url: baseurl + createNewCampaignContextPath,
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: campaignDetails,
    });

    const data = response.data;
    console.log("data", data);
    const statusCode = response.status;
    console.log("statuscode", statusCode);

    dispatch({
      type: "CAMPAIGN_CREATE_SUCCESS",
      payload: data,
      statusCode: statusCode,
    });
  } catch (error) {
    console.log("add new campaign api call error", error);
    dispatch({
      type: "CAMPAIGN_CREATE_FAILURE",
      payload: error,
    });
  }
};

export const getCampaignList = (token) => async (dispatch) => {
  const baseurl = "http://localhost:3031";
  const getCampaignListContextPath = "/api/brand/campaign/list";

  try {
    const response = await axios({
      method: "get",
      url: baseurl + getCampaignListContextPath,
      headers: {
        authorization: "Bearer " + token,
      },
    });

    const data = response.data;
    const statusCode = response.status;
    console.log("response ", response.data);
    console.log("statusCode", statusCode);

    dispatch({
      type: "CAMPAIGN_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CAMPAIGN_LIST_FAILURE",
      payload: error,
    });
    console.log("error in get campaign list api call", error);
  }
};

export const updateCampaignAction =
  (campaignDetails, token) => async (dispatch) => {
    const baseurl = "http://localhost:3031";
    const updateCampaignActionContextPath = "/api/brand/campaign/update";

    console.log("brand Details", campaignDetails);
    try {
      const response = await axios({
        method: "put",
        url: baseurl + updateCampaignActionContextPath,
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        data: campaignDetails,
      });

      const data = response.data;
      console.log("response", data);
      const statusCode = response.status;
      console.log("statusCode", statusCode);

      dispatch({
        type: "UPDATE_CAMPAIGN_SUCCESS",
        payload: data,
        statusCode: statusCode,
      });
    } catch (error) {
      console.log("error in api call update campaign details", error);
      dispatch({
        type: "UPDATE_CAMPAIGN_FAILURE",
        error: error,
      });
    }
  };

export const getCampaignDetailsForIdAction =
  (campaign_id, token) => async (dispatch) => {
    console.log("campaign_id", campaign_id);
    console.log("token", token);
    const baseurl = "http://localhost:3031";
    const getCampaignDetailsForIdContextPath = "/api/brand/campaign/id";

    try {
      const response = await axios({
        method: "GET",
        url: baseurl + getCampaignDetailsForIdContextPath,
        headers: {
          authorization: "Bearer " + token,
          campaign_id: campaign_id,
        },
      });

      const data = response.data;
      const statusCode = response.status;

      if (statusCode == 200) {
        dispatch({
          type: "CAMPAIGN_DETAILS_ID_SUCCESS",
          payload: data,
          statusCode: statusCode,
        });
      }
    } catch (error) {
      dispatch({
        type: "CAMPAIGN_DETAILS_ID_FAILURE",
        payload: error,
      });
    }
  };

export const getSidebarProfileAction = (token) => async (dispatch) => {
  const baseurl = "http://localhost:3031";
  const getProfileContextPath = "/api/profile";

  try {
    const response = await axios({
      method: "GET",
      url: baseurl + getProfileContextPath,
      headers: {
        authorization: "Bearer " + token,
      },
    });

    console.log("response action", response.data);
    const data = response.data;
    const statusCode = response.status;
    const role = response.data.role;
    const mobile_number = response.data.user_id;
    console.log(mobile_number);
    let name;
    if (role == "brand") {
      name = response.data.brand_name;
    } else if (role == "influencer") {
      name = response.data.influencer_name;
    } else {
      name = "";
    }

    if (statusCode == 200) {
      dispatch({
        type: "BI_PROFILE_SUCCESS",
        payload: data,
        statusCode: statusCode,
        role: role,
        mobile_number: mobile_number,
        name: name,
      });
    }
  } catch (err) {
    console.log("error in api call", err);
    dispatch({
      type: "BI_PROFILE_FAILURE",
      res: err.message,
      statusCode: 400,
    });
  }
};

export const getEngagementDetailsForIdAction =
  (engagement_id, token) => async (dispatch) => {
    const baseurl = "http://localhost:3031";
    const getEngagementDetailsContextPath = "/api/engagements/details";

    try {
      const response = await axios({
        method: "GET",
        url: baseurl + getEngagementDetailsContextPath,
        headers: {
          authorization: "Bearer " + token,
          engagement_id: engagement_id,
        },
      });

      console.log("response action", response.data);
      const data = response.data;
      const statusCode = response.status;

      if (statusCode == 200) {
        dispatch({
          type: "ENGAGEMENT_DETAILS_SUCCESS",
          payload: data,
          statusCode: statusCode,
        });
      }
    } catch (err) {
      console.log("error in api call", err);
      dispatch({
        type: "ENGAGEMENT_DETAILS_FAILURE",
        res: err.message,
        statusCode: 400,
      });
    }
  };
