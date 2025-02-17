import axios from "axios";

export const influencerSendOtp = (mobile_number) => async (dispatch) => {
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
      type: "INFLUENCER_SEND_OTP_SUCCESS",
      payload: data,
      statusCode: statusCode,
    });
  } catch (err) {
    console.log("error in send otp api call", err);
  }
};

export const influencerVerifyOtp =
  (mobile_number, otp, role) => async (dispatch) => {
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
      console.log("data", data);
      if (response.status == 200) {
        console.log("success otp verify");
        dispatch({
          type: "INFLUENCER_VERIFY_OTP_SUCCESS",
          payload: data,
        });
      }
    } catch (err) {
      console.log("error in otp verify ", err);
      dispatch({
        type: "INFLUENCER_VERIFY_OTP_FAILURE",
        payload: err,
      });
    }
  };

export const influencerProfileAction = (token) => async (dispatch) => {
  const baseurl = "http://localhost:3031";
  const getInfluencerProfileContextPath = "/api/influencer/details";

  try {
    const response = await axios({
      method: "GET",
      url: baseurl + getInfluencerProfileContextPath,
      headers: {
        authorization: "Bearer " + token,
      },
    });

    console.log("response action", response.data);
    const data = response.data;
    const statusCode = response.status;
    const influencer_name = response.data.influencer_name;
    const user_id = response.data.user_id;

    if (statusCode == 200) {
      let social_medi_urls = data.social_media_urls;
      let urlsArray = social_medi_urls.split("~");
      console.log("urls array");
      console.log(urlsArray);

      localStorage.setItem("role", "influencer");
      localStorage.setItem("name", influencer_name);
      localStorage.setItem("mobile_number", user_id);
      dispatch({
        type: "INFLUENCER_PROFILE_SUCCESS",
        payload: data,
        statusCode: statusCode,
        role: "influencer",
        urlsArray: urlsArray,
      });
    }
  } catch (err) {
    console.log("error in api call", err);
    dispatch({
      type: "INFLUENCER_PROFILE_FAILURE",
      res: err.message,
      statusCode: 400,
    });
  }
};

export const registerInfluencerAction =
  (influencerDetails, token) => async (dispatch) => {
    const baseurl = "http://localhost:3031";
    const influencerRegisterContextPath = "/api/influencer/registration";

    try {
      const response = await axios({
        method: "POST",
        url: baseurl + influencerRegisterContextPath,
        headers: {
          authorization: "Bearer " + token,
        },
        data: influencerDetails,
      });

      console.log("response", response.data);
      const data = response.data;
      const statusCode = response.status;
      console.log("statuscode", response.status);
      const influencer_name = response.data.influencer_name;
      const user_id = response.data.user_id;

      if (statusCode == 200) {
        localStorage.setItem("role", "influencer");
        localStorage.setItem("name", influencer_name);
        localStorage.setItem("mobile_number", user_id);

        dispatch({
          type: "INFLUENCER_REGISTER_SUCCESS",
          payload: data,
          statusCode: statusCode,
          error: "",
        });
      }
    } catch (error) {
      dispatch({
        type: "INFLUENCER_REGISTER_FAILURE",
        payload: error,
      });

      console.log("error in register brand api call", error);
    }
  };

export const getInfluencerList = (token) => async (dispatch) => {
  const baseurl = "http://localhost:3031";
  const getInfluencerListContextPath = "/api/influencer/list";

  try {
    const response = await axios({
      method: "get",
      url: baseurl + getInfluencerListContextPath,
      headers: {
        authorization: "Bearer " + token,
      },
    });

    const data = response.data;
    const statusCode = response.status;
    console.log("response ", response.data);
    console.log("statusCode", statusCode);

    dispatch({
      type: "INFLUENCER_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "INFLUENCER_LIST_FAILURE",
      payload: error,
    });
    console.log("error in get campaign list api call", error);
  }
};

export const applyCampaignAction =
  (applyCampaignDetails, token, campaign_id) => async (dispatch) => {
    const baseurl = "http://localhost:3031";
    const applyCampaignContextPath = "/api/campaign/apply";

    try {
      const response = await axios({
        method: "POST",
        url: baseurl + applyCampaignContextPath,
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
          campaign_id: campaign_id,
        },
        data: applyCampaignDetails,
      });

      const data = response.data;
      const statusCode = response.status;
      console.log("response ", response.data);
      console.log("statusCode", statusCode);

      dispatch({
        type: "INFLUENCER_APPLY_CAMPAIGN_SUCCESS",
        payload: data,
        statusCode: statusCode,
      });
    } catch (error) {
      console.log("error in apply campaign api call", error);
      console.log(error.status);
      dispatch({
        type: "INFLUENCER_APPLY_CAMPAIGN_FAILURE",
        payload: error,
        statusCode: error.status,
      });
    }
  };

export const createProposalAction =
  (formData, token, engagement_id) => async (dispatch) => {
    const baseurl = "http://localhost:3031";
    const createProposal = "/engagement/create/proposal";

    try {
      const response = await axios({
        method: "POST",
        url: baseurl + createProposal,
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
          engagement_id: engagement_id,
        },
        data: formData,
      });

      const data = response.data;
      const statusCode = response.status;
      console.log("response ", response.data);
      console.log("statusCode", statusCode);

      dispatch({
        type: "ENGAGEMENT_CREATE_PROPOSAL_SUCCESS",
        payload: data,
        statusCode: statusCode,
      });
    } catch (error) {
      dispatch({
        type: "ENGAGEMENT_CREATE_PROPOSAL_FAILURE",
        payload: error,
      });
      console.log("error in apply campaign api call", error);
    }
  };
