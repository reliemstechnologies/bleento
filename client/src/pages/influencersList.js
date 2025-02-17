import { useEffect, useState } from "react";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";
import { getInfluencerList } from "../actions/influencerActions.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const InfluencerList = () => {
  const authToken = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : "";
  const [token, setToken] = useState(authToken);
  const dispatch = useDispatch();

  const [influencer_id, setInfluencerId] = useState("");

  const { res, statusCode, error, loading } = useSelector(
    (state) => state.influencer
  );

  useEffect(() => {
    dispatch(getInfluencerList(token));
  }, [dispatch]);

  const onDelete = async (influencer_id) => {
    const baseurl = "http://localhost:3031";
    const deleteCampaignContextPath = "/api/influencer/delete";
    console.log("on delete influencer id", influencer_id);
    let bdy = {
      influencer_id: influencer_id,
    };
    try {
      const response = await axios({
        method: "delete",
        url: baseurl + deleteCampaignContextPath,
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
          influencer_id: influencer_id,
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
          <div style={{ padding: "20px", marginTop: "56px" }}>
            <p class="h3">Influencer List </p>
            <table class="table" style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Influencer Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Location</th>
                  <th scope="col">Reach</th>
                  <th scope="col">No Of Followers</th>
                  <th scope="col">Social Media Url</th>
                  <th scope="col">Budget</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {res.map((row, index) => (
                  <tr>
                    <td scope="row">1</td>
                    <td>{row.influencer_name}</td>
                    <td>{row.type}</td>
                    <td>{row.location}</td>
                    <td>{row.reach}</td>
                    <td>{row.no_of_followers}</td>
                    <td>{row.social_media_url}</td>
                    <td>{row.budget}</td>
                    <td>{row.status}</td>
                    <td>
                      <button
                        type="button"
                        id="deletebtn"
                        name="deletebtn"
                        onClick={(e) => {
                          onDelete(row.user_id);
                        }}
                      >
                        Delete
                      </button>
                      <button>Edit</button>
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

export default InfluencerList;
