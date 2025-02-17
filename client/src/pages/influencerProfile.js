import Header from "../components/header.js";
import "../assets/main.css";
import Sidebar from "../components/sidebar.js";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { influencerProfileAction } from "./../actions/influencerActions";

let src = "";

const InfluencerProfile = () => {
  const dispatch = useDispatch();

  const authToken = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : "";
  const [token, setToken] = useState(authToken);

  const { res, statusCode, loading, error, urlsArray } = useSelector(
    (state) => state.influencer
  );

  useEffect(() => {
    if (token) {
      dispatch(influencerProfileAction(token));
    } else {
      alert("token is not provided");
    }
  }, [dispatch]);

  if (res && res.influencer_name && res.user_id) {
    localStorage.setItem("role", "influencer");
    localStorage.setItem("name", res.influencer_name);
    localStorage.setItem("mobile_number", res.user_id);
  }

  return (
    <div>
      {res && (
        <div>
          <Header />
          <Sidebar
            role="influencer"
            name={res.influencer_name}
            mobile_number={res.user_id}
          />
          <div
            style={{ marginLeft: "280px", padding: "20px", marginTop: "56px" }}
          >
            <div class="avatarContainer">
              <img src={src} class="avatar" />
              <p
                class="h3"
                style={{ alignContent: "center", marginLeft: "10px" }}
              >
                Influencer Name - {res.influencer_name}
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
                      <p class="h6">Email</p>
                      <span>{res.email}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Date Of Birth</p>
                      <span>{res.dob}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Gender</p>
                      <span>{res.gender}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Address</p>
                      <span>{res.address}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <p class="h6">City</p>
                      <span>{res.city}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">State</p>
                      <span>{res.state}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Pincode</p>
                      <span>{res.pincode}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Social Media URL</p>
                      <span>
                        {res.social_media_urls && urlsArray
                          ? urlsArray.map((item, index) => (
                              <ul class="list-group">
                                <li class="list-group-item">
                                  {item.split("-")[0]} : {item.split("-")[1]}
                                </li>
                              </ul>
                            ))
                          : ""}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <p class="h6">Prefered Brand Categories</p>
                      <span>{res.prefered_brand_categories}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Profile Completed</p>
                      <span>
                        {res.is_profile_completed == 1 ? "True" : "False"}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Profile Active</p>
                      <span>
                        {res.is_profile_active == 1 ? "True" : "False"}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
              <button
                type="button"
                class="btn btn-dark"
                style={{ marginTop: "20px" }}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfluencerProfile;
