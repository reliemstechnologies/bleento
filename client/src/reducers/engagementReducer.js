const initialState = [
  {
    res: [],
    loading: false,
    error: null,
  },
];

const engagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ENGAGEMENT_LIST_SUCCESS":
      return {
        res: action.payload,
        error: "",
        loading: false,
      };

    case "ENGAGEMENT_LIST_FAILURE":
      return {
        res: action.payload,
        error: "",
        loading: true,
      };

    case "ENGAGEMENT_DETAILS_SUCCESS":
      return {
        res: action.payload,
        error: "",
        loading: false,
      };

    case "ENGAGEMENT_DETAILS_FAILURE":
      return {
        res: action.payload,
        error: "",
        loading: true,
      };

    case "ENGAGEMENT_UPDATE_SUCCESS":
      console.log("success reducer engagemnt");
      return {
        res: action.payload,
        error: "",
        loading: false,
        engagementStatusUpdate: true,
      };

    case "ENGAGEMENT_UPDATE_FAILURE":
      return {
        res: action.payload,
        error: "",
        loading: true,
        engagementStatusUpdate: false,
      };
    default:
      return state;
  }
};

export default engagementReducer;
