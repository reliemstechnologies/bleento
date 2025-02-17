const initialState = [
  {
    res: [],
    error: null,
    loading: false,
  },
];

const influencerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INFLUENCER_SEND_OTP_SUCCESS":
      console.log("otp success");
      return {
        ...state,
        res: action.payload,
        loading: false,
        error: null,
        statusCode: action.statusCode,
        isOtpSend: true,
      };
    case "INFLUENCER_SEND_OTP_FAILURE":
      console.log("otp failure");
      return {
        res: [],
        loading: false,
        error: action.payload,
      };
    case "INFLUENCER_VERIFY_OTP_SUCCESS":
      console.log("verify otp success");
      return {
        res: action.payload,
        loading: false,
        error: [],
        isOtpVerified: true,
        statusCode: action.statusCode,
      };
    case "INFLUENCER_VERIFY_OTP_FAILURE":
      console.log("verify otp failure");
      return {
        res: action.payload,
        loading: true,
        error: action.payload,
        statusCode: action.payload,
      };
    case "INFLUENCER_PROFILE_SUCCESS":
      console.log("influencer profile success action payload", action.payload);
      return {
        res: action.payload,
        loading: false,
        error: "",
        statusCode: action.statusCode,
        urlsArray: action.urlsArray,
      };
    case "INFLUENCER_PROFILE_FAILURE":
      console.log("influencer profile failure");
      return {
        res: action.payload,
        loading: false,
        error: "",
        statusCode: action.statusCode,
      };
    case "INFLUENCER_REGISTER_SUCCESS":
      return {
        res: action.payload,
        loading: false,
        error: "",
        statusCode: action.statusCode,
      };
    case "INFLUENCER_REGISTER_FAULURE":
      return {
        res: action.payload,
        loading: false,
        error: "",
        statusCode: action.statusCode,
      };
    case "INFLUENCER_LIST_SUCCESS":
      return {
        res: action.payload,
        loading: false,
        error: "",
        statusCode: action.statusCode,
      };
    case "INFLUENCER_LIST_FAILURE":
      return {
        res: action.payload,
        loading: true,
        error: action.payload,
      };
    case "INFLUENCER_APPLY_CAMPAIGN_SUCCESS":
      return {
        res: action.payload,
        loading: false,
        error: "",
        applyCampaignStatusCode: action.statusCode,
        resApplyCampaign: true,
      };
    case "INFLUENCER_APPLY_CAMPAIGN_FAILURE":
      return {
        res: action.payload,
        loading: true,
        error: action.payload,
        resApplyCampaign: false,
        applyCampaignStatusCode: action.statusCode,
      };

    case "ENGAGEMENT_CREATE_PROPOSAL_SUCCESS":
      return {
        res: action.payload,
        loading: false,
        error: "",
        statusCode: action.statusCode,
      };
    case "ENGAGEMENT_CREATE_PROPOSAL_FAILURE":
      return {
        res: action.payload,
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default influencerReducer;
