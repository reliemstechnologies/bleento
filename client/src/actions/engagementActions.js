import axios from "axios";

export const getEngagementListAction = (role, token) => async (dispatch) => {
  const baseurl = "http://localhost:3031";
  const getEngagementListContextPath = "/api/engagements/list";

  try {
    const response = await axios({
      method: "GET",
      url: baseurl + getEngagementListContextPath,
      headers: {
        authorization: "Bearer " + token,
        role: role,
      },
    });

    console.log("response action", response.data);
    const data = response.data;
    const statusCode = response.status;

    if (statusCode == 200) {
      dispatch({
        type: "ENGAGEMENT_LIST_SUCCESS",
        payload: data,
        statusCode: statusCode,
      });
    }
  } catch (err) {
    console.log("error in get engagement api call", err);
    dispatch({
      type: "ENGAGEMENT_LIST_FAILURE",
      res: err.message,
      statusCode: 400,
    });
  }
};

export const engagementStatusUpdateAction =
  (engagement_id, engagement_status, token) => async (dispatch) => {
    const baseurl = "http://localhost:3031";
    const updateEngagementStatus = "/api/engagements/update/status";

    try {
      const response = await axios({
        method: "GET",
        url: baseurl + updateEngagementStatus,
        headers: {
          authorization: "Bearer " + token,
          engagement_id: engagement_id,
          engagement_status: engagement_status,
          role: "Brand",
        },
      });

      console.log("response action", response.data);
      const data = response.data;
      const statusCode = response.status;

      if (statusCode == 200) {
        console.log("inside 200");
        dispatch({
          type: "ENGAGEMENT_UPDATE_SUCCESS",
          payload: data,
          statusCode: statusCode,
          engagementStatusUpdate: true,
        });
      }
    } catch (err) {
      console.log("error in get engagement api call", err);
      dispatch({
        type: "ENGAGEMENT_UPDATE_FAILURE",
        res: err.message,
        statusCode: 400,
        engagementStatusUpdate: false,
      });
    }
  };
