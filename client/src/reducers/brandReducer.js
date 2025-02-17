const initialState = [
  {
    res: [],
    loading: false,
    error: null,
    isOtpSend: false,
  },
];

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_OTP_SUCCESS":
      console.log("otp success");
      return {
        ...state,
        res: action.payload,
        loading: false,
        error: null,
        statusCode: action.statusCode,
        isOtpSend: true,
      };
    case "SEND_OTP_FAILURE":
      console.log("otp failure");
      return {
        res: [],
        loading: false,
        error: action.payload,
      };
    case "VERIFY_OTP_SUCCESS":
      console.log("verify otp success");
      return {
        res: action.payload,
        loading: false,
        statusCode: action.statusCode,
        isOtpVerified: action.isOtpVerified,
        invalidOtp: false,
      };
    case "VERIFY_OTP_FAILURE":
      console.log("verify otp failure");
      return {
        loading: true,
        error: action.payload,
        statusCode: action.statusCode,
        isOtpVerified: action.isOtpVerified,
        invalidOtp: true,
      };
    case "BRAND_PROFILE_SUCCESS":
      console.log("brand profile success action payload", action.payload);
      return {
        res: action.payload,
        loading: false,
        error: "",
        statusCode: action.statusCode,
        urlsArray: action.urlsArray,
      };
    case "BRAND_PROFILE_FAILURE":
      console.log("brand profile failure");
      return {
        res: action.payload,
        loading: false,
        error: "",
        statusCode: action.statusCode,
      };

    case "BRAND_REGISTER_SUCCESS":
      return {
        res: action.payload,
        loading: false,
        error: "",
        statusCode: action.statusCode,
      };
    case "BRAND_REGISTER_FAULURE":
      return {
        res: action.payload,
        loading: false,
        error: "",
        statusCode: action.statusCode,
      };
    case "CAMPAIGN_CREATE_SUCCESS":
      return {
        res: action.payload,
        loading: false,
        error: "",
        statusCode: action.statusCode,
      };
    case "CAMPAIGN_CREATE_FAILURE":
      return {
        res: action.payload,
        loading: false,
        error: action.payload,
      };
    case "CAMPAIGN_LIST_SUCCESS":
      return {
        res: action.payload,
        loading: false,
        error: "",
        statusCode: action.statusCode,
      };
    case "CAMPAIGN_LIST_FAILURE":
      return {
        res: action.payload,
        loading: true,
        error: action.payload,
      };
    case "CAMPAIGN_DETAILS_ID_SUCCESS":
      return {
        res: action.payload,
        loading: false,
        error: "",
        statusCode: action.statusCode,
      };
    case "CAMPAIGN_DETAILS_ID_FAILURE":
      return {
        res: action.payload,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_CAMPAIGN_SUCCESS":
      return {
        res: action.payload,
        loading: false,
        error: action.payload,
        statusCode: action.statusCode,
      };
    case "UPDATE_CAMPAIGN_FAILURE":
      return {
        loading: true,
        error: action.payload,
      };
    case "BI_PROFILE_SUCCESS":
      console.log(" profile success action payload", action.payload);
      return {
        profileRes: action.payload,
        loading: false,
        error: "",
        profileResStatusCode: action.statusCode,
        profileRole: action.role,
        profileName: action.name,
        profileMobileNumber: action.mobile_number,
      };
    case "BI_PROFILE_FAILURE":
      console.log(" profile failure");
      return {
        profileRes: action.payload,
        loading: true,
        error: "",
        profileResStatusCode: action.statusCode,
        profileRole: action.role,
      };

    default:
      return state;
  }
};

export default brandReducer;
