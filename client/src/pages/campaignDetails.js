import Headers from "../components/header";
import Sidebar from "../components/sidebar";
import "../assets/main.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCampaignDetailsForIdAction } from "../actions/brandActions";
import { applyCampaignAction } from "../actions/influencerActions";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Dialog from "./../components/dialog";

let src =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMa16h8ToCiB1c9uBKaXW2R37fB81uUCMKvw&s";

const CampaignDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const authToken = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : "";

  const profileName = localStorage.getItem("name")
    ? localStorage.getItem("name")
    : "";

  const profileRole = localStorage.getItem("role")
    ? localStorage.getItem("role")
    : "";

  const [token, setToken] = useState(authToken);
  const [campaign_id, setCampaignId] = useState(id);
  const [campaign_name, setCampaignName] = useState("");
  const [name, setName] = useState(profileName);
  const [role, setRole] = useState(profileRole);

  const { res, statusCode, loading, error } = useSelector(
    (state) => state.brand
  );

  const { resApplyCampaign, applyCampaignStatusCode } = useSelector(
    (state) => state.influencer
  );

  useEffect(() => {
    dispatch(getCampaignDetailsForIdAction(campaign_id, token));
  }, [dispatch]);

  const applyCampaign = () => {
    let applyCampaignPayload = {
      status: "Pending Review",
      name: name,
      role: role,
      campaign_name: res.campaign_name,
    };

    dispatch(applyCampaignAction(applyCampaignPayload, token, campaign_id));
  };

  if (!resApplyCampaign && applyCampaignStatusCode == 400) {
    console.log("error");
    console.log(applyCampaignStatusCode);
    alert("Already applied to campaign");
  }

  if (resApplyCampaign && applyCampaignStatusCode) {
    console.log("resApplyCampaign success");
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
                {res.brand_name} - {res.campaign_name}
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
                      <p class="h6">Campaign Name</p>
                      <span>{res.campaign_name}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Brand Name</p>
                      <span>{res.brand_name}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Campaign Objective</p>
                      <span>{res.campaign_objective}</span>
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
                      <p class="h6">Campaign Industry</p>
                      <span>{res.campaign_industry}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Campaign Start Date</p>
                      <span>{res.campaign_start_date}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <p class="h6">Campaign End Date</p>
                      <span>{res.campaign_end_date}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Total Budget</p>
                      <span>{res.total_budget}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Payment Structure</p>
                      <span>{res.payment_structure}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <p class="h6">Prefered Influencer Type</p>
                      <span>{res.prefered_influencer_type}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Prefered Platform</p>
                      <span>{res.prefered_platform}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <div>
                        <p class="h6">Followers Count</p>
                        <span>{res.followers_count}</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <div>
                        <p class="h6">Engagement Rate</p>
                        <span>{res.engagement_rate}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div>
                      <div>
                        <p class="h6">Influencer Niche</p>
                        <span>{res.influencer_niche}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div>
                      <div>
                        <p class="h6">No Of Influencer</p>
                        <span>{res.no_of_influencers}</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <div>
                        <p class="h6">Expected Revenue</p>
                        <span>{res.expected_revenue}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div>
                      <div>
                        <p class="h6">Content Type</p>
                        <span>{res.content_type}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div>
                      <div>
                        <p class="h6">No Of Post</p>
                        <span>{res.number_of_posts}</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <div>
                        <p class="h6">HashTag Used</p>
                        <span>{res.hash_tag_used}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div>
                      <div>
                        <p class="h6">Mentioned Tags</p>
                        <span>{res.mentioned_tags}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div>
                      <div>
                        <p class="h6">Approval Process</p>
                        <span>{res.approval_required}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <button
                type="button"
                class="btn btn-dark"
                style={{ marginTop: "20px" }}
                onClick={applyCampaign}
              >
                Apply to Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;
