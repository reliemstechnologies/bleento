import React, { useState } from "react";
import Header from "../components/header.js";
import "../assets/main.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerInfluencerAction } from "../actions/influencerActions.js";

const InfluencerUpdate = () => {
  const [influencer_name, setInfluencerName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [profile_image, setProfileImage] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [social_media_platform_name, setSocialMediaPlatformName] = useState("");
  const [social_media_platform_link, setSocialMediaPlatformLink] = useState("");
  const [social_media_platform_followers, setSocialMediaPlatformFollowers] =
    useState("");
  const [social_media_platform_category, setSocialMediaPlatformCategory] =
    useState("");
  const [
    social_media_platform_engagement_rate,
    setSocialMediaPlatformEngagementRate,
  ] = useState("");
  const [social_media_platform_age_group, setSocialMediaPlatformAgeGroup] =
    useState("");
  const [prefered_brand_categories, setPreferedBrandCategory] = useState("");
  const [selectedoptions, setSelectedOptions] = useState([]);

  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : "";
  const [token, setToken] = useState(authToken);

  const { res, statusCode } = useSelector((state) => state.influencer);

  const dispatch = useDispatch();

  const profilePhotoFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfileImage(e.target.files[0]);
    }
  };
  const addSocialMedia = () => {
    if (selectedoptions.length < 5) {
      setSelectedOptions([
        ...selectedoptions,
        social_media_platform_name +
          "-" +
          social_media_platform_link +
          "-" +
          social_media_platform_followers +
          "-" +
          social_media_platform_engagement_rate +
          "-" +
          social_media_platform_age_group,
      ]);
      console.log(selectedoptions);
    }
  };
  const removeSocialMediaOption = (index) => {
    setSelectedOptions((prevState) =>
      prevState.filter((prevItem) => prevItem !== index)
    );
  };
  const newInfluencerAdd = () => {
    let influencerDetails = {
      influencer_name: influencer_name,
      email: email,
      dob: dob,
      gender: gender,
      address: address,
      city: city,
      state: state,
      pincode: pincode,
      prefered_brand_categories: prefered_brand_categories,
      selectedoptions: selectedoptions,
    };

    if (
      !influencer_name ||
      !email ||
      !dob ||
      !gender ||
      !profile_image ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !prefered_brand_categories ||
      !social_media_platform_name ||
      !social_media_platform_link ||
      !social_media_platform_followers
    ) {
      alert("Please fill in this mandatory field");
    } else {
      console.log(influencerDetails);
      var requestBodyData = new FormData();
      requestBodyData.append("file", profile_image);
      requestBodyData.append(
        "influencerDetails",
        JSON.stringify(influencerDetails)
      );
      dispatch(registerInfluencerAction(requestBodyData, token));
    }
  };

  if (res && statusCode) {
    navigate("/influencer/profile");
  }

  return (
    <div>
      <Header />
      <div class="formContent">
        <p class="h3" style={{ marginBottom: "30px", marginTop: "90px" }}>
          Influencer Register
        </p>
        <form>
          <div class="row">
            <div class="col-4">
              <div class="mb-3 form-group required">
                <label for="influencer_name" class="form-label control-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="influencer_name"
                  class="form-control"
                  value={influencer_name}
                  onChange={(e) => setInfluencerName(e.target.value)}
                />
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3 form-group required">
                <label for="email" class="form-label control-label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  class="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3 form-group required">
                <label for="dob" class="form-label control-label">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  class="form-control"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4">
              <div class="mb-3  form-group required">
                <label for="gender" class="form-label control-label">
                  Gender
                </label>
                <select
                  required
                  class="form-select"
                  aria-label="social_media_type"
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option selected>Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3 form-group required">
                <label for="profile_image" class="form-label control-label">
                  Profile Photo
                </label>
                <input
                  type="file"
                  id="profile_image"
                  name="profile_image"
                  class="form-control"
                  accept="image/*"
                  onChange={profilePhotoFileChange}
                ></input>
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3 form-group required">
                <label for="address" class="form-label control-label">
                  Address
                </label>
                <input
                  required
                  type="text"
                  id="address"
                  class="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4">
              <div class="mb-3 form-group required">
                <label for="city" class="form-label control-label">
                  City
                </label>
                <input
                  required
                  type="text"
                  id="city"
                  class="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></input>
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3 form-group required">
                <label for="state" class="form-label control-label">
                  State
                </label>
                <select
                  required
                  class="form-select"
                  aria-label="designation"
                  id="state"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option>Select state</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Dadra and Nagar Haveli">
                    Dadra and Nagar Haveli
                  </option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3 form-group required">
                <label for="pincode" class="form-label control-label">
                  Pincode
                </label>
                <input
                  required
                  type="text"
                  id="pincode"
                  class="form-control"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4">
              <div class="mb-3 form-group required">
                <label
                  for="prefered_brand_categories"
                  class="form-label control-label"
                >
                  Prefered Brand Category
                </label>
                <select
                  class="form-select"
                  aria-label="industry_type"
                  id="prefered_brand_categories"
                  name="prefered_brand_categories"
                  value={prefered_brand_categories}
                  onChange={(e) => setPreferedBrandCategory(e.target.value)}
                >
                  <option value="">Please select an industry</option>
                  <optgroup label="Business & Finance">
                    <option value="banking-finance">Banking & Finance</option>
                    <option value="consulting">Consulting</option>
                    <option value="insurance">Insurance</option>
                    <option value="legal">Legal</option>
                    <option value="marketing-advertising">
                      Marketing & Advertising
                    </option>
                    <option value="accounting">Accounting</option>
                    <option value="investment-management">
                      Investment Management
                    </option>
                  </optgroup>
                  <optgroup label="Health & Wellness">
                    <option value="healthcare">Healthcare</option>
                    <option value="pharmaceuticals">Pharmaceuticals</option>
                    <option value="wellness">Wellness</option>
                    <option value="medical-devices">Medical Devices</option>
                    <option value="biotechnology">Biotechnology</option>
                  </optgroup>
                  <optgroup label="Technology & IT">
                    <option value="information-technology">
                      Information Technology
                    </option>
                    <option value="software-development">
                      Software Development
                    </option>
                    <option value="telecommunications">
                      Telecommunications
                    </option>
                    <option value="technology">Technology</option>
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="cloud-computing">Cloud Computing</option>
                  </optgroup>
                  <optgroup label="Creative Industries">
                    <option value="arts-culture">Arts & Culture</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="fashion-apparel">Fashion & Apparel</option>
                    <option value="media-publishing">Media & Publishing</option>
                    <option value="design">Design</option>
                    <option value="advertising">Advertising</option>
                  </optgroup>
                  <optgroup label="Industrial & Manufacturing">
                    <option value="agriculture">Agriculture</option>
                    <option value="automotive">Automotive</option>
                    <option value="aviation">Aviation</option>
                    <option value="construction">Construction</option>
                    <option value="energy-utilities">Energy & Utilities</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="mining-metals">Mining & Metals</option>
                    <option value="chemicals">Chemicals</option>
                    <option value="pulp-paper">Pulp & Paper</option>
                  </optgroup>
                  <optgroup label="Services & Tourism">
                    <option value="education">Education</option>
                    <option value="government-public-sector">
                      Government & Public Sector
                    </option>
                    <option value="hospitality-tourism">
                      Hospitality & Tourism
                    </option>
                    <option value="non-profit">Non-Profit</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="retail">Retail</option>
                    <option value="sports-recreation">
                      Sports & Recreation
                    </option>
                    <option value="transportation-logistics">
                      Transportation & Logistics
                    </option>
                    <option value="personal-care">Personal Care</option>
                    <option value="cleaning-services">Cleaning Services</option>
                  </optgroup>
                  <optgroup label="Education & Training">
                    <option value="primary-secondary-education">
                      Primary & Secondary Education
                    </option>
                    <option value="higher-education">Higher Education</option>
                    <option value="vocational-training">
                      Vocational Training
                    </option>
                    <option value="online-learning">Online Learning</option>
                    <option value="educational-services">
                      Educational Services
                    </option>
                  </optgroup>
                  <optgroup label="Other">
                    <option value="defense-security">Defense & Security</option>
                    <option value="e-commerce">E-Commerce</option>
                    <option value="environmental-services">
                      Environmental Services
                    </option>
                    <option value="food-beverage">Food & Beverage</option>
                    <option value="gaming">Gaming</option>
                    <option value="home-improvement">Home Improvement</option>
                    <option value="marine">Marine</option>
                    <option value="research-development">
                      Research & Development
                    </option>
                    <option value="supply-chain-management">
                      Supply Chain Management
                    </option>
                    <option value="consulting">Consulting</option>
                    <option value="startups">Startups</option>
                    <option value="other">Other</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4">
              <div class="mb-3 form-group required">
                <label
                  for="social_media_platform_name"
                  class="form-label control-label"
                >
                  Platform Name
                </label>
                <select
                  class="form-select"
                  aria-label="social_media_platform_name"
                  id="social_media_platform_name"
                  name="social_media_platform_name"
                  value={social_media_platform_name}
                  onChange={(e) => setSocialMediaPlatformName(e.target.value)}
                >
                  <option selected>Select</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="snapchat">SnapChat</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3 form-group required">
                <label
                  for="social_media_platform_link"
                  class="form-label control-label"
                >
                  Platform Link
                </label>
                <input
                  type="text"
                  id="social_media_platform_link"
                  class="form-control"
                  value={social_media_platform_link}
                  onChange={(e) => setSocialMediaPlatformLink(e.target.value)}
                />
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3 form-group required">
                <label
                  for="social_media_platform_followers"
                  class="form-label control-label"
                >
                  Platform Followers
                </label>
                <select
                  class="form-select"
                  aria-label="social_media_platform_followers"
                  id="social_media_platform_followers"
                  name="social_media_platform_followers"
                  value={social_media_platform_followers}
                  onChange={(e) =>
                    setSocialMediaPlatformFollowers(e.target.value)
                  }
                >
                  <option selected>Select</option>
                  <option value="1-10k">1-10k</option>
                  <option value="10k-100k">10k-100k</option>
                  <option value="200k-500k">200k-500k</option>
                  <option value="500k-1M">500k-1M</option>
                  <option value="1M-10M">1M-10M</option>
                  <option value="10M-100M">10M-100M</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4">
              <div class="mb-3">
                <label
                  for="social_media_platform_engagement_rate"
                  class="form-label"
                >
                  Platform Engagement Rate
                </label>
                <select
                  class="form-select"
                  aria-label="social_media_platform_engagement_rate"
                  id="social_media_platform_engagement_rate"
                  name="social_media_platform_engagement_rate"
                  value={social_media_platform_engagement_rate}
                  onChange={(e) =>
                    setSocialMediaPlatformEngagementRate(e.target.value)
                  }
                >
                  <option selected>Select</option>
                  <option value="1-5">1%-5%</option>
                  <option value="5-10">5%-10%</option>
                  <option value="10-20">10%-20%</option>
                  <option value="20-30">20%-30%</option>
                  <option value="30-40">30%-40%</option>
                  <option value="40-100">40%-100%</option>
                </select>
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3">
                <label for="social_media_platform_age_group" class="form-label">
                  Age Group
                </label>
                <select
                  class="form-select"
                  aria-label="industry_type"
                  id="social_media_platform_age_group"
                  name="social_media_platform_age_group"
                  value={social_media_platform_age_group}
                  onChange={(e) =>
                    setSocialMediaPlatformAgeGroup(e.target.value)
                  }
                >
                  <option selected>Select</option>
                  <option value="1-10">1-10</option>
                  <option value="10-18">10-18</option>
                  <option value="18-32">18-32</option>
                  <option value="32-65">32-65</option>
                  <option value="65+">65+</option>
                </select>
              </div>
            </div>

            <div
              class="col-4"
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <button
                type="button"
                class="btn btn-primary"
                onClick={addSocialMedia}
              >
                Add More
              </button>
            </div>
          </div>

          <div
            class="row"
            style={{ paddingTop: "10px", paddingBottom: "40px" }}
          >
            <ul class="list-group">
              {selectedoptions.map((item, index) => (
                <li
                  key={index}
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {item}
                  <button
                    type="button"
                    class="btn btn-secondary"
                    style={{ marginLeft: "20px" }}
                    onClick={() => removeSocialMediaOption(item)}
                  >
                    remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            class="btn btn-dark mb-5"
            style={{ width: "100%" }}
            onClick={newInfluencerAdd}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default InfluencerUpdate;
