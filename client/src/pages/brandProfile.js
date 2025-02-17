import Header from "../components/header.js";
import "../assets/main.css";
import Sidebar from "../components/sidebar.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { brandProfile } from "../actions/brandActions.js";
// import upload from "C:UsersDELLDesktop\reliemsprojects\brandserver";

let src = "C:UsersDELLDesktop\reliemsprojects\brandserver\\uploadsa.jpg";

const BrandProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : "";
  const [token, setToken] = useState(authToken);

  const { res, statusCode, loading, error, urlsArray } = useSelector(
    (state) => state.brand
  );

  useEffect(() => {
    if (token) {
      dispatch(brandProfile(token));
    } else {
      alert("token is not provided");
    }
  }, [dispatch]);

  if (statusCode != 200) {
    navigate("/home");
  }

  return (
    <div>
      {res && (
        <div>
          <Header />
          <Sidebar
            role="brand"
            name={res.brand_name}
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
                Brand Name - {res.brand_name}
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
                      <p class="h6">Address</p>
                      <span>{res.address}</span>
                    </div>
                  </td>

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
                </tr>
                <tr>
                  <td>
                    <div>
                      <p class="h6">Pincode</p>
                      <span>{res.pincode}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">GSTN</p>
                      <span>{res.gstn}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Contact Person Name</p>
                      <span>{res.contact_person_name}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Designation</p>
                      <span>{res.designation}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <p class="h6">Mobile Number</p>
                      <span>{res.user_id}</span>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p class="h6">Website URL</p>
                      <span>{res.website_url}</span>
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

                  <td>
                    <div>
                      <p class="h6">Industry Category</p>
                      <span>{res.industry_category}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <div>
                        <p class="h6">Industry Type</p>
                        <span>{res.industry_type}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div>
                      <div>
                        <p class="h6">Profile Completion</p>
                        <span>
                          {res.is_profile_completed == 1 ? "True" : "False"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div>
                      <div>
                        <p class="h6">Profile Active</p>
                        <span>
                          {res.is_profile_active == 1 ? "True" : "False"}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
              {/* <button
                type="button"
                class="btn btn-dark"
                style={{ marginTop: "20px" }}
              >
                Update Profile
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandProfile;
