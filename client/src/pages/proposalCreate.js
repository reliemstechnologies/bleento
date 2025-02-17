import React, { useState } from "react";
import Headers from "../components/header";
import Sidebar from "../components/sidebar";
import "../assets/main.css";
import { useDispatch, useSelector } from "react-redux";
import { createProposalAction } from "../actions/influencerActions";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

let src =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMa16h8ToCiB1c9uBKaXW2R37fB81uUCMKvw&s";

const ProposalCreate = () => {
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
  const [proposal_description, setProposalDescription] = useState("");
  const [post, setUploadPost] = useState(null);
  const [video, setUploadVideo] = useState("");
  const [engagement_id, setEngagementId] = useState(id);
  const [name, setName] = useState(profileName);
  const [role, setRole] = useState(profileRole);

  const { res, erro, loading, statusCode } = useSelector(
    (state) => state.influencer
  );

  const handleVideoChange = (e) => {
    setUploadVideo(e.target.files[0]);
  };

  const handlePostChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setUploadPost(e.target.files[0]);
      console.log(post);
    }
  };

  const handleUpload = (e) => {
    if (!proposal_description || !post) {
      alert("Please select mandatory fields");
    }

    let proposalDetails = {
      proposal_description: proposal_description,
    };
    const formData = new FormData();

    formData.append("post", post);
    formData.append("proposalDetails", JSON.stringify(proposalDetails));

    if (post) {
      console.log("--inside post selcted---");
    }
    if (video) {
      formData.append("video", video);
    }

    dispatch(createProposalAction(formData, token, engagement_id));
  };

  if (res && statusCode != 200) {
    alert(res.message);
  }

  if (res && statusCode == 200) {
    navigate("/brand/campaign/list");
  }

  return (
    <div>
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
              Submit Proposal
            </p>
          </div>
          <div class="text-success">
            <hr />
          </div>
          <form>
            <div class="row">
              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label
                    for="proposal_description"
                    class="form-label control-label"
                  >
                    Proposal Description
                  </label>
                  <textarea
                    type="text"
                    id="proposal_description"
                    name="proposal_description"
                    value={proposal_description}
                    onChange={(e) => setProposalDescription(e.target.value)}
                    class="form-control"
                  ></textarea>
                </div>
              </div>

              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label htmlFor="post" className="form-label control-label">
                    Upload Post
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="post"
                    name="post"
                    onChange={handlePostChange}
                    class="form-control"
                  ></input>
                </div>
              </div>

              <div class="col-4">
                <div class="mb-3 form-group required">
                  <label for="video" class="form-label ">
                    Upload Video
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    id="video"
                    name="video"
                    value={video}
                    onChange={handleVideoChange}
                    class="form-control"
                  ></input>
                </div>
              </div>
            </div>
          </form>
          <button
            type="button"
            class="btn btn-dark"
            style={{
              width: "50%",
            }}
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalCreate;
