import { useEffect, useState } from "react";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";
import {
  getCampaignList,
  getSidebarProfileAction,
} from "../actions/brandActions.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CampaignList = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : "";

  const profileRole = localStorage.getItem("role")
    ? localStorage.getItem("role")
    : "";
  const [role, setRole] = useState(profileRole);
  const [token, setToken] = useState(authToken);

  const dispatch = useDispatch();

  const [campaign_id, setCampaignId] = useState("");

  const { res, statusCode, error, loading } = useSelector(
    (state) => state.brand
  );

  useEffect(() => {
    // console.log(role, mobile_number, name);
    dispatch(getCampaignList(token));
  }, [dispatch]);

  const onEdit = (campaign_id) => {
    setCampaignId(campaign_id);
    navigate(`/brand/campaign/update/${campaign_id}`);
  };

  const onDetails = (campaign_id) => {
    setCampaignId(campaign_id);
    navigate(`/brand/campaign/details/${campaign_id}`);
  };

  const onDelete = async (campaign_id) => {
    setCampaignId(campaign_id);
    const baseurl = "http://localhost:3031";
    const deleteCampaignContextPath = "/api/brand/campaign/delete";
    console.log("on delete campaign id", campaign_id);
    let bdy = {
      campaign_id: campaign_id,
    };
    try {
      const response = await axios({
        method: "delete",
        url: baseurl + deleteCampaignContextPath,
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
          campaign_id: campaign_id,
        },
      });

      console.log("response", response);
      const data = response.data;
      const statusCode = response.status;
      console.log("data", data);
      console.log("statusCode", statusCode);
      if (statusCode == 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log("error in campaign delete api call", error);
    }
  };

  return (
    <div>
      {res && (
        <div>
          <Header />
          <Sidebar />
          <div
            style={{
              marginLeft: "280px",
              padding: "20px",
              marginTop: "85px",
            }}
          >
            <p class="h3">Campaigns List </p>
            <table class="table" style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Campaign Name</th>

                  <th scope="col">Campaign Objective</th>
                  <th scope="col">Campaign Industry</th>
                  <th scope="col">Campaign Start Date</th>
                  <th scope="col">Campaign End Date</th>
                  <th scope="col">Total Budget</th>
                  <th scope="col">prefered_platform</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {res.length > 0 &&
                  res.map((row, index) => (
                    <tr>
                      <td scope="row">{index + 1}</td>
                      <td>{row.campaign_name}</td>

                      <td>{row.campaign_objective}</td>
                      <td>{row.campaign_industry}</td>
                      <td>{row.campaign_start_date}</td>
                      <td>{row.campaign_end_date}</td>
                      <td>{row.total_budget}</td>
                      <td>{row.prefered_platform}</td>
                      <td
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "80px",
                        }}
                      >
                        <button
                          type="button"
                          class="btn btn-secondary btn-sm mb-1"
                          id="deletebtn"
                          name="deletebtn"
                          onClick={(e) => {
                            onDelete(row.campaign_id);
                          }}
                        >
                          Delete
                        </button>
                        {role == "brand" ? (
                          <button
                            type="button"
                            class="btn btn-secondary btn-sm mb-1"
                            id="editbtn"
                            name="editbtn"
                            onClick={(e) => onEdit(row.campaign_id)}
                          >
                            Edit
                          </button>
                        ) : (
                          ""
                        )}

                        <button
                          type="button"
                          class="btn btn-secondary btn-sm mb-1"
                          id="detailbtn"
                          name="detailbtn"
                          onClick={(e) => onDetails(row.campaign_id)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignList;
