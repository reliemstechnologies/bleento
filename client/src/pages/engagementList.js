import { useEffect, useState } from "react";
import Headers from "../components/header";
import Sidebar from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getEngagementListAction } from "../actions/engagementActions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "../components/dialog";

const authToken = localStorage.getItem("authToken")
  ? localStorage.getItem("authToken")
  : "";

const profileRole = localStorage.getItem("role")
  ? localStorage.getItem("role")
  : "";

const EngagementList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [token, setToken] = useState(authToken);
  const [engagement_id, setEngagementId] = useState("");
  const [role, setRole] = useState(profileRole);

  const [open, setOpen] = useState(false);

  const { res, statusCode, loading, error } = useSelector(
    (state) => state.engagement
  );

  useEffect(() => {
    dispatch(getEngagementListAction(role, token));
  }, [dispatch]);

  const onEdit = (engagement_id) => {
    setEngagementId(engagement_id);
    navigate(`/brand/engagement/update/${engagement_id}`);
  };

  const onDetails = (engagement_id) => {
    setEngagementId(engagement_id);
    navigate(`/brand/engagement/details/${engagement_id}`);
  };

  const onDelete = (engagement_id) => {
    setOpen(false);
    const baseurl = "http://localhost:3031";
    const deleteEngagementContextPath = "/api/engagements/delete";
    const response = axios({
      method: "delete",
      url: baseurl + deleteEngagementContextPath,
      headers: {
        authorization: "Bearer " + token,
        engagement_id: engagement_id,
      },
    });

    const data = response.data;
    const statusCode = response.status;

    if (statusCode && statusCode == 200) {
      window.location.reload();
    }

    console.log("ondelete get called", engagement_id);
  };

  return (
    <div>
      {res && (
        <div>
          <Headers />
          <Sidebar />
          <div
            style={{ marginLeft: "280px", padding: "20px", marginTop: "85px" }}
          >
            <p class="h3">Engagement List </p>
            <table class="table" style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Engagement Id</th>
                  <th scope="col">Engagement Name</th>
                  <th scope="col">campaign Id</th>
                  <th scope="col">user Id</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {res &&
                  res.length > 0 &&
                  res.map((row, index) => (
                    <tr>
                      <td scope="row">1</td>
                      <td>{row.engagement_id}</td>
                      <td>{row.engagement_name}</td>
                      <td>{row.campaign_id}</td>
                      <td>{row.user_id}</td>
                      <td>{row.status}</td>
                      <td>
                        <td
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100px",
                          }}
                        >
                          <button
                            type="button"
                            class="btn btn-secondary btn-sm mb-1"
                            id="deletebtn"
                            name="deletebtn"
                            onClick={() => setOpen(true)}
                          >
                            Delete
                          </button>
                          <div>
                            {open && (
                              <div className="dialog-overlay">
                                <div className="dialog-box">
                                  <h3>Delete</h3>
                                  <p>You want to delete engagement</p>
                                  <button
                                    type="button"
                                    style={{ marginRight: "5px" }}
                                    class="btn btn-secondary btn-sm mb-1"
                                    id="nodeletebtn"
                                    name="nodeletebtn"
                                    onClick={(e) => {
                                      setOpen(false);
                                    }}
                                  >
                                    No
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-secondary btn-sm mb-1"
                                    id="deletebtn"
                                    name="deletebtn"
                                    onClick={(e) => {
                                      onDelete(row.engagement_id);
                                    }}
                                  >
                                    Yes
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                          {role == "brand" ? (
                            <button
                              type="button"
                              class="btn btn-secondary btn-sm mb-1"
                              id="editbtn"
                              name="editbtn"
                              onClick={(e) => onEdit(row.engagement_id)}
                            >
                              Edit
                            </button>
                          ) : (
                            ""
                          )}

                          <button
                            type="button"
                            class="btn btn-secondary btn-sm mb-1"
                            onClick={(e) => onDetails(row.engagement_id)}
                          >
                            Details
                          </button>
                        </td>
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

export default EngagementList;
