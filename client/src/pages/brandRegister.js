import React, { useState } from "react";
import Header from "../components/header.js";
import "../assets/main.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerBrandAction } from "../actions/brandActions.js";

const BrandRegister = () => {
  const [brand_name, setBrandName] = useState("");
  const [logo, setLogo] = useState("");
  const [website_url, setWebsiteUrl] = useState("");
  const [address, setAddress] = useState("");
  const [contact_person_name, setContactPersonName] = useState("");
  const [designation, setDesignation] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [gstn, setGstn] = useState("");
  const [social_media_handle_url, setSocialMediaHandleUrl] = useState("");
  const [social_media_type, setSocialMediaType] = useState("");
  const [industry_category, setIndustryCategory] = useState("");
  const [industry_type, setIndustryType] = useState("");
  const [company_size, setCompanySize] = useState("");
  const [selectedoptions, setSelectedOptions] = useState([]);

  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : "";
  const [token, setToken] = useState(authToken);

  const { res, statusCode } = useSelector((state) => state.brand);

  const dispatch = useDispatch();

  const addSocialMedia = () => {
    if (selectedoptions.length < 5) {
      setSelectedOptions([
        ...selectedoptions,
        social_media_type + "-" + social_media_handle_url,
      ]);
      console.log(selectedoptions);
    }
  };

  const removeSocialMediaOption = (index) => {
    setSelectedOptions((prevState) =>
      prevState.filter((prevItem) => prevItem !== index)
    );
  };

  const setFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  };

  const registerBrand = () => {
    if (
      !brand_name ||
      !gstn ||
      !contact_person_name ||
      !designation ||
      !email ||
      !mobile_number ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !industry_category ||
      !logo
    ) {
      alert("Please fill in this mandatory field");
    }

    let brandDetails = {
      brand_name: brand_name,
      website_url: website_url,
      address: address,
      email: email,
      mobile_number: mobile_number,
      gstn: gstn,
      social_media_handle_url: social_media_handle_url,
      industry_category: industry_category,
      industry_type: industry_type,
      social_media_type: social_media_type,
      designation: designation,
      state: state,
      contact_person_name: contact_person_name,
      pincode: pincode,
      city: city,
      selectedoptions: selectedoptions,
    };

    var requestBodyData = new FormData();
    requestBodyData.append("file", logo);
    requestBodyData.append("brandDetails", JSON.stringify(brandDetails));

    console.log(requestBodyData);
    dispatch(registerBrandAction(requestBodyData, token));
  };

  if (res && statusCode) {
    navigate("/brand/profile");
  }

  return (
    <div>
      <Header />
      <div class="formContent">
        <p class="h3" style={{ marginTop: "90px" }}>
          Brand Register
        </p>
        <form style={{ marginBottom: "40px" }}>
          <div class="row">
            <div class="col-4">
              <div class="mb-3 form-group required">
                <label for="brand_name" class="form-label control-label">
                  Brand Name
                </label>
                <input
                  required
                  type="text"
                  id="brand_name"
                  class="form-control"
                  name="brand_name"
                  value={brand_name}
                  onChange={(e) => setBrandName(e.target.value)}
                ></input>
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3">
                <label for="logo" class="form-label">
                  Logo
                </label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  class="form-control"
                  accept="image/*"
                  onChange={setFile}
                ></input>
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3">
                <label for="website_url" class="form-label">
                  Website URL
                </label>
                <input
                  type="text"
                  id="website_url"
                  class="form-control"
                  value={website_url}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4">
              <div class="mb-3 form-group required">
                <label for="gstn" class="form-label control-label">
                  GSTN
                </label>
                <input
                  required
                  type="text"
                  id="gstn"
                  class="form-control"
                  value={gstn}
                  onChange={(e) => setGstn(e.target.value)}
                ></input>
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3 form-group required">
                <label
                  for="contact_person_name"
                  class="form-label control-label"
                >
                  Contact Person Name
                </label>
                <input
                  required
                  type="text"
                  id="contact_person_name"
                  class="form-control"
                  value={contact_person_name}
                  onChange={(e) => setContactPersonName(e.target.value)}
                ></input>
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3 form-group required">
                <label for="designation" class="form-label control-label">
                  Designation
                </label>
                <select
                  required
                  class="form-select"
                  aria-label="designation"
                  id="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                >
                  <option selected>Select</option>
                  <option value="ceo">CEO</option>
                  <option value="owner">Owner</option>
                  <option value="sales_person">Sales Person</option>
                  <option value="developer">Developer</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4">
              <div class="mb-3 form-group required">
                <label for="email" class="form-label control-label">
                  Email
                </label>
                <input
                  required
                  type="text"
                  id="email"
                  class="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3 form-group required">
                <label for="mobile_number" class="form-label control-label">
                  Mobile Number
                </label>
                <input
                  required
                  type="text"
                  id="mobile_number"
                  class="form-control"
                  value={mobile_number}
                  onChange={(e) => setMobileNumber(e.target.value)}
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
              <div class="mb-3">
                <label for="industry_type" class="form-label">
                  Industry Type
                </label>
                <select
                  class="form-select"
                  aria-label="industry_type"
                  id="industry_type"
                  name="industry_type"
                  value={industry_type}
                  onChange={(e) => setIndustryType(e.target.value)}
                >
                  <option selected>Select</option>
                  <option value="service">Service</option>
                  <option value="product">Product</option>
                </select>
              </div>
            </div>

            <div class="col-4">
              <div class="mb-3 form-group required">
                <label for="industry_category" class="form-label control-label">
                  Industry Category
                </label>
                <select
                  required
                  class="form-select"
                  aria-label="industry_category"
                  id="industry_category"
                  name="industry_category"
                  value={industry_category}
                  onChange={(e) => setIndustryCategory(e.target.value)}
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

            <div class="col-4">
              <div class="mb-3">
                <label for="company_size" class="form-label">
                  Company Size
                </label>
                <select
                  class="form-select"
                  aria-label="company_size"
                  id="company_size"
                  name="company_size"
                  value={company_size}
                  onChange={(e) => setCompanySize(e.target.value)}
                >
                  <option selected>Select</option>
                  <option value="1-10">1-10</option>
                  <option value="10-50">10-50</option>
                  <option value="50-100">50-100</option>
                  <option value="100-200">100-200</option>
                  <option value="200-500">200-500</option>
                  <option value="500-1000">500-1000</option>
                  <option value="1000-10000">1000-10000</option>
                  <option value="10000+">10000+</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4">
              <div class="mb-3  form-group required">
                <label for="social_media_type" class="form-label control-label">
                  Social Media Type
                </label>
                <select
                  required
                  class="form-select"
                  aria-label="social_media_type"
                  id="social_media_type"
                  name="social_media_type"
                  value={social_media_type}
                  onChange={(e) => setSocialMediaType(e.target.value)}
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
                  for="social_media_handle_url"
                  class="form-label control-label"
                >
                  Social Media Handle URL
                </label>
                <input
                  required
                  type="text"
                  id="social_media_handle_url"
                  class="form-control"
                  value={social_media_handle_url}
                  onChange={(e) => setSocialMediaHandleUrl(e.target.value)}
                ></input>
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
          </div>

          <button
            type="button"
            class="btn btn-dark"
            style={{ width: "100%" }}
            onClick={registerBrand}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BrandRegister;
