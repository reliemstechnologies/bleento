import Headers from "../components/header";
import Sidebar from "../components/sidebar";
import "../assets/main.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { getEngagementDetailsForIdAction } from "../actions/brandActions";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { engagementStatusUpdateAction } from "../actions/engagementActions";

let src =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMa16h8ToCiB1c9uBKaXW2R37fB81uUCMKvw&s";

const EngagementUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const authToken = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : "";

  const [token, setToken] = useState(authToken);
  const [engagement_id, setEngagementId] = useState(id);
  const [engagement_status, setEngagementStatus] = useState(id);

  const { res, statusCode, loading, error, engagementStatusUpdate } =
    useSelector((state) => state.engagement);

  useEffect(() => {
    dispatch(getEngagementDetailsForIdAction(engagement_id, token));
  }, [dispatch]);

  const updateEngagement = () => {
    console.log("submit to your proposal");
    setEngagementId(engagement_id);
    setEngagementStatus(engagement_status);
    dispatch(
      engagementStatusUpdateAction(engagement_id, engagement_status, token)
    );
    console.log(engagementStatusUpdate, statusCode);
  };

  if (engagementStatusUpdate) {
    navigate("/brand/engagement/list");
  }

  return (
    <div>
      {res && (
        <div>
          <Headers />
          <Sidebar />
          <div
            style={{ marginLeft: "280px", padding: "20px", marginTop: "85px" }}
          >
            <div class="avatarContainer">
              <p
                class="h3"
                style={{ alignContent: "center", marginLeft: "10px" }}
              >
                Engagement Name - {res.engagement_name}
              </p>
            </div>
            <div class="text-success">
              <hr />
            </div>
            <div class="brtableContainer">
              <table class="brTable">
                <tr class="tableRow">
                  <td>
                    <div>
                      <p class="h6">Engagement Name</p>
                      <span>{res.engagement_name}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Campaign Id</p>
                      <span>{res.campaign_id}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Campaign Id</p>
                      <span>{res.campaign_id}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <p class="h6">Campaign Description</p>
                      <span>{res.campaign_description}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Campaign Start Date</p>
                      <span>{res.campaign_start_date}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Campaign End Date</p>
                      <span>{res.campaign_end_date}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <p class="h6">No of Post Required</p>
                      <span>{res.number_of_posts}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Campaign Type</p>
                      <span>{res.campaign_industry}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">User Id</p>
                      <span>{res.user_id}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <div class="mb-3 form-group required">
                        <label
                          for="engagement_status"
                          class="form-label control-label"
                        >
                          Campaign Objective
                        </label>
                        <select
                          required
                          class="form-select"
                          aria-label="engagement_status"
                          id="engagement_status"
                          name={engagement_status}
                          value={engagement_status}
                          onChange={(e) => setEngagementStatus(e.target.value)}
                        >
                          <option selected>Select</option>
                          <option value="Pending Review">Pending Review</option>
                          <option value="Submit Proposal">
                            Submit Proposal
                          </option>
                          <option value="Proposal Submitted">
                            Proposal Submitted
                          </option>
                          <option value="Proposal Approved">
                            Proposal Approved
                          </option>
                          <option value="Proposal Rejected">
                            Proposal Rejected
                          </option>
                          <option value="Go Live">Go Live</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  </td>
                </tr>

                {res.status == "Proposal Submitted" ||
                res.status == "Proposal Approved" ||
                res.status == "Proposal Rejected" ||
                res.status == "Go Live" ||
                res.status == "Completed" ? (
                  <tr>
                    <td>
                      <div>
                        <p class="h6">Proposal Description</p>
                        <span>{res.proposal_description}</span>
                      </div>
                    </td>

                    <td>
                      <div>
                        <p class="h6">Proposal Id</p>
                        <span>{res.proposal_id}</span>
                      </div>
                    </td>

                    <td>
                      <div>
                        <p class="h6">Post File</p>
                        {res.post_file_path ? (
                          <img
                            src={res.post_file_path}
                            alt="Uploaded"
                            width="200"
                          />
                        ) : (
                          <p>Loading image...</p>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </table>

              <button
                type="button"
                class="btn btn-dark"
                style={{ marginTop: "20px" }}
                onClick={updateEngagement}
              >
                Update Engagement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngagementUpdate;
