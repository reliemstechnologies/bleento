import React, { useEffect, useState } from "react";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newCampaign } from "../actions/brandActions.js";

const CampaignCreat = () => {
  const [campaign_name, setCampaignName] = useState("");
  const [brand_name, setBrandName] = useState("");
  const [campaign_objective, setCampaignObjective] = useState("");
  const [campaign_description, setCampaignDescription] = useState("");
  const [campaign_industry, setCampaignIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [campaign_start_date, setCampaignStartDate] = useState("");
  const [campaign_end_date, setCampaignEndtDate] = useState("");
  const [total_budget, setTotalBudget] = useState("");
  const [payment_structure, setPaymentStructure] = useState("");
  const [prefered_influencer_type, setPreferdInfluencerType] = useState("");
  const [prefered_platform, setPreferedPlatform] = useState("");
  const [followers_count, setFollowerCount] = useState("");
  const [engagement_rate, setEngagementRate] = useState("");
  const [influencer_niche, setInfluencerNiche] = useState("");
  const [no_of_influencers, setNumberOfInfluencers] = useState("");
  const [expected_revenue, setExpectedRevenue] = useState("");
  const [content_type, setContentType] = useState("");
  const [number_of_posts, setNumberOfPosts] = useState("");
  const [hash_tag_used, setHashTagUsed] = useState("");
  const [mentioned_tags, setMentionedTags] = useState("");
  const [approval_required, setApprovalRequired] = useState("");

  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : "";

  const [token, setToken] = useState(authToken);

  const dispatch = useDispatch();

  const { res, statusCode, loading, err } = useSelector((state) => state.brand);

  const addCampaign = () => {
    if (
      !campaign_name ||
      !brand_name ||
      !campaign_objective ||
      !campaign_description ||
      !campaign_industry ||
      !campaign_start_date ||
      !campaign_end_date ||
      !total_budget ||
      !prefered_influencer_type ||
      !prefered_platform ||
      !followers_count ||
      !influencer_niche ||
      !no_of_influencers ||
      !expected_revenue ||
      !content_type ||
      !number_of_posts ||
      !approval_required
    ) {
      alert("Please fill required fields");
    }

    let CampaignDetails = {
      campaign_name: campaign_name,
      brand_name: brand_name,
      campaign_objective: campaign_objective,
      campaign_description: campaign_description,
      campaign_industry: campaign_industry,
      location: location,
      campaign_start_date: campaign_start_date,
      campaign_end_date: campaign_end_date,
      total_budget: total_budget,
      payment_structure: payment_structure,
      prefered_influencer_type: prefered_influencer_type,
      prefered_platform: prefered_platform,
      followers_count: followers_count,
      engagement_rate: engagement_rate,
      influencer_niche: influencer_niche,
      no_of_influencers: no_of_influencers,
      expected_revenue: expected_revenue,
      content_type: content_type,
      number_of_posts: number_of_posts,
      hash_tag_used: hash_tag_used,
      mentioned_tags: mentioned_tags,
      approval_required: approval_required,
    };

    dispatch(newCampaign(CampaignDetails, token));
  };

  if (res && statusCode) {
    navigate("/brand/campaign/list");
  }

  return (
    <div>
      <Header />
      <Sidebar />
      <div style={{ padding: "20px", marginTop: "56px" }}>
        <div class="formContent">
          <p class="h3" style={{ marginBottom: "30px", marginTop: "20px" }}>
            Campaign Create
          </p>
          <form>
            <div class="row">
              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label for="campaign_name" class="form-label control-label">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    id="campaign_name"
                    name="campaign_name"
                    value={campaign_name}
                    onChange={(e) => setCampaignName(e.target.value)}
                    class="form-control"
                  ></input>
                </div>
              </div>

              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label for="brand_name" class="form-label control-label">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    id="brand_name"
                    name="brand_name"
                    value={brand_name}
                    onChange={(e) => setBrandName(e.target.value)}
                    class="form-control"
                  ></input>
                </div>
              </div>

              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label
                    for="campaign_objective"
                    class="form-label control-label"
                  >
                    Campaign Objective
                  </label>
                  <select
                    required
                    class="form-select"
                    aria-label="campaign_objective"
                    id="campaign_objective"
                    name={campaign_objective}
                    value={campaign_objective}
                    onChange={(e) => setCampaignObjective(e.target.value)}
                  >
                    <option selected>Select</option>
                    <option value="Brand Awareness">Brand Awareness</option>
                    <option value="Lead Generation">Lead Generation</option>
                    <option value="Sales & Conversions">
                      Sales & Conversions
                    </option>
                    <option value="Product Launch">Product Launch</option>
                    <option value="Website Traffic">Website Traffic</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label
                    for="campaign_description"
                    class="form-label control-label"
                  >
                    Campaign Description
                  </label>
                  <textarea
                    type="textarea"
                    id="campaign_description"
                    name="campaign_description"
                    value={campaign_description}
                    onChange={(e) => setCampaignDescription(e.target.value)}
                    class="form-control"
                  ></textarea>
                </div>
              </div>

              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label
                    for="campaign_industry"
                    class="form-label control-label"
                  >
                    Campaign Industry
                  </label>
                  <select
                    required
                    class="form-select"
                    aria-label="campaign_industry"
                    id="campaign_industry"
                    value={campaign_industry}
                    onChange={(e) => setCampaignIndustry(e.target.value)}
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
                      <option value="media-publishing">
                        Media & Publishing
                      </option>
                      <option value="design">Design</option>
                      <option value="advertising">Advertising</option>
                    </optgroup>
                    <optgroup label="Industrial & Manufacturing">
                      <option value="agriculture">Agriculture</option>
                      <option value="automotive">Automotive</option>
                      <option value="aviation">Aviation</option>
                      <option value="construction">Construction</option>
                      <option value="energy-utilities">
                        Energy & Utilities
                      </option>
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
                      <option value="cleaning-services">
                        Cleaning Services
                      </option>
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
                      <option value="defense-security">
                        Defense & Security
                      </option>
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
                  <label for="location" class="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    class="form-control"
                  ></input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label
                    for="campaign_start_date"
                    class="form-label control-label"
                  >
                    Campaign Start Date
                  </label>
                  <input
                    type="date"
                    id="campaign_start_date"
                    name="campaign_start_date"
                    value={campaign_start_date}
                    onChange={(e) => setCampaignStartDate(e.target.value)}
                    class="form-control"
                  ></input>
                </div>
              </div>

              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label
                    for="campaign_end_date"
                    class="form-label control-label"
                  >
                    Campaign End Date
                  </label>
                  <input
                    type="date"
                    id="campaign_end_date"
                    name="campaign_end_date"
                    value={campaign_end_date}
                    onChange={(e) => setCampaignEndtDate(e.target.value)}
                    class="form-control"
                  ></input>
                </div>
              </div>

              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label for="total_budget" class="form-label control-label">
                    Total Budget
                  </label>
                  <input
                    type="number"
                    id="total_budget"
                    name="total_budget"
                    value={total_budget}
                    onChange={(e) => setTotalBudget(e.target.value)}
                    class="form-control"
                  ></input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="mb-3">
                  <label for="payment_structure" class="form-label">
                    Payment Structure
                  </label>
                  <select
                    required
                    class="form-select"
                    aria-label="payment_structure"
                    id="payment_structure"
                    value={payment_structure}
                    onChange={(e) => setPaymentStructure(e.target.value)}
                  >
                    <option selected>Select</option>
                    <option value="Fixed Payment">Fixed Payment</option>
                    <option value="Performance Based">Performance-Based</option>
                    <option value="Free Product Collaboration">
                      Free Product Collaboration
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label
                    for="prefered_influencer_type"
                    class="form-label control-label"
                  >
                    Prefered Influencer Type
                  </label>
                  <select
                    required
                    class="form-select"
                    aria-label="prefered_influencer_type"
                    id="prefered_influencer_type"
                    value={prefered_influencer_type}
                    onChange={(e) => setPreferdInfluencerType(e.target.value)}
                  >
                    <option selected>Select</option>
                    <option value="Nano">Nano (1K-10K followers)</option>
                    <option value="Micro">Micro (10K-100K)</option>
                    <option value="Macro">Macro (100K-1M)</option>
                    <option value="Celebrity">Celebrity (1M+)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label
                    for="prefered_platform"
                    class="form-label control-label"
                  >
                    Prefered Platform
                  </label>
                  <select
                    required
                    class="form-select"
                    aria-label="prefered_platform"
                    id="prefered_platform"
                    value={prefered_platform}
                    onChange={(e) => setPreferedPlatform(e.target.value)}
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
            </div>
            <div class="row">
              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label for="followers_count" class="form-label control-label">
                    Follower Count
                  </label>
                  <select
                    class="form-select"
                    aria-label="social_media_platform_followers"
                    id="followers_count"
                    name="followers_count"
                    value={followers_count}
                    onChange={(e) => setFollowerCount(e.target.value)}
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

              <div class="col-4">
                <div class="mb-3">
                  <label for="engagement_rate" class="form-label">
                    Engagement Rate
                  </label>
                  <select
                    class="form-select"
                    aria-label="social_media_platform_engagement_rate"
                    id="engagement_rate"
                    name="engagement_rate"
                    value={engagement_rate}
                    onChange={(e) => setEngagementRate(e.target.value)}
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
                <div class="mb-3 form-group required">
                  <label
                    for="influencer_niche"
                    class="form-label control-label"
                  >
                    Influencer Niche
                  </label>
                  <select
                    required
                    class="form-select"
                    aria-label="influencer_niche"
                    id="influencer_niche"
                    value={influencer_niche}
                    onChange={(e) => setInfluencerNiche(e.target.value)}
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
                      <option value="media-publishing">
                        Media & Publishing
                      </option>
                      <option value="design">Design</option>
                      <option value="advertising">Advertising</option>
                    </optgroup>
                    <optgroup label="Industrial & Manufacturing">
                      <option value="agriculture">Agriculture</option>
                      <option value="automotive">Automotive</option>
                      <option value="aviation">Aviation</option>
                      <option value="construction">Construction</option>
                      <option value="energy-utilities">
                        Energy & Utilities
                      </option>
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
                      <option value="cleaning-services">
                        Cleaning Services
                      </option>
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
                      <option value="defense-security">
                        Defense & Security
                      </option>
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
                    for="no_of_influencers"
                    class="form-label control-label"
                  >
                    No Of Influencers Needed
                  </label>
                  <input
                    type="number"
                    id="no_of_influencers"
                    name="no_of_influencers"
                    value={no_of_influencers}
                    onChange={(e) => setNumberOfInfluencers(e.target.value)}
                    class="form-control"
                  ></input>
                </div>
              </div>

              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label
                    for="expected_revenue"
                    class="form-label control-label"
                  >
                    Expected Revenue
                  </label>
                  <input
                    type="number"
                    id="expected_revenue"
                    name="expected_revenue"
                    value={expected_revenue}
                    onChange={(e) => setExpectedRevenue(e.target.value)}
                    class="form-control"
                  ></input>
                </div>
              </div>

              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label for="content_type" class="form-label control-label">
                    Content Type
                  </label>
                  <select
                    required
                    class="form-select"
                    aria-label="content_type"
                    id="content_type"
                    value={content_type}
                    onChange={(e) => setContentType(e.target.value)}
                  >
                    <option selected>Select</option>
                    <option value="Stories">Stories</option>
                    <option value="Reels">Reels</option>
                    <option value="Feed Posts">Feed Posts</option>
                    <option value="Blog Posts">Blog Posts</option>
                    <option value="Video Reviews">Video Reviews</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label for="number_of_posts" class="form-label control-label">
                    No Of Posts
                  </label>
                  <input
                    type="number"
                    id="number_of_posts"
                    name="number_of_posts"
                    value={number_of_posts}
                    onChange={(e) => setNumberOfPosts(e.target.value)}
                    class="form-control"
                  ></input>
                </div>
              </div>

              <div class="col-4">
                <div class="mb-3">
                  <label for="hash_tag_used" class="form-label">
                    Hash Tag Used
                  </label>
                  <textarea
                    type="text"
                    id="hash_tag_used"
                    name="hash_tag_used"
                    placeholder="Please add hashtags comma separated"
                    value={hash_tag_used}
                    onChange={(e) => setHashTagUsed(e.target.value)}
                    class="form-control"
                  ></textarea>
                </div>
              </div>

              <div class="col-4">
                <div class="mb-3">
                  <label for="mentioned_tags" class="form-label">
                    Mentioned Tags
                  </label>
                  <textarea
                    type="text"
                    id="mentioned_tags"
                    name="mentioned_tags"
                    placeholder="Hashtag other than brand hashtag"
                    value={mentioned_tags}
                    onChange={(e) => setMentionedTags(e.target.value)}
                    class="form-control"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="mb-3">
                  <label for="approval_required" class="form-label">
                    Approval Process
                  </label>
                  <select
                    required
                    class="form-select"
                    aria-label="approval_required"
                    id="approval_required"
                    value={approval_required}
                    onChange={(e) => setApprovalRequired(e.target.value)}
                  >
                    <option selected>Select</option>
                    <option value="Yes">Yes, brand approval needed</option>
                    <option value="No">
                      No, influencers can post directly
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="button"
              class="btn btn-dark"
              style={{ width: "100%" }}
              onClick={addCampaign}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampaignCreat;
