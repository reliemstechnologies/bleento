import Headers from "../components/header";
import Sidebar from "../components/sidebar";

function InfluencerDetails() {
  return (
    <div>
      <Headers />
      <Sidebar />
      <div style={{ padding: "20px", marginTop: "56px" }}>
        <div class="avatarContainer">
          <p class="h3" style={{ alignContent: "center", marginLeft: "10px" }}>
            Influencer - Influencer Name
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
                  <p class="h6">Influencer Name</p>
                  <span>Influencer name</span>
                </div>
              </td>

              <td>
                <div>
                  <p class="h6">username</p>
                  <span>username</span>
                </div>
              </td>

              <td>
                <div>
                  <p class="h6">location</p>
                  <span>location</span>
                </div>
              </td>

              <td>
                <div>
                  <p class="h6">no of followers</p>
                  <span>No of Followers</span>
                </div>
              </td>
              <td>
                <div>
                  <p class="h6">Location</p>
                  <span>Location</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <p class="h6">Reach</p>
                  <span>15 per post</span>
                </div>
              </td>

              <td>
                <div>
                  <p class="h6">mobile number</p>
                  <span>98536572276</span>
                </div>
              </td>

              <td>
                <div>
                  <p class="h6">profile photo</p>
                  <span>profile photo</span>
                </div>
              </td>

              <td>
                <div>
                  <p class="h6">date of birth</p>
                  <span>DOB</span>
                </div>
              </td>

              <td>
                <div>
                  <p class="h6">gender</p>
                  <span>Male/Female</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <p class="h6">category</p>
                  <span>category</span>
                </div>
              </td>

              <td>
                <div>
                  <div>
                    <p class="h6">speciality</p>
                    <span>speciality</span>
                  </div>
                </div>
              </td>

              <td>
                <div>
                  <div>
                    <p class="h6">prefered brand category</p>
                    <span>prefered brand category</span>
                  </div>
                </div>
              </td>

              <td>
                <div>
                  <div>
                    <p class="h6">price for a post</p>
                    <span>price for a post</span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          <button
            type="button"
            class="btn btn-dark"
            style={{ marginTop: "20px" }}
          >
            Update Influencer
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfluencerDetails;
