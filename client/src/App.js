import "./App.css";
import { Routes, Route, Link, useHistory } from "react-router-dom";
import Home from "./pages/home.js";
import BrandLogin from "./pages/brandlogin.js";
import InfluencerLogin from "./pages/influencerlogin.js";
import BrandRegister from "./pages/brandRegister.js";
import CampaignCreate from "./pages/campaignCreate.js";
import CampaignList from "./pages/campaignList.js";
import BrandProfile from "./pages/brandProfile";
import InfluencerList from "./pages/influencersList.js";
import EngagementList from "./pages/engagementList.js";
import CampaignDetails from "./pages/campaignDetails.js";
import InfluencerDetails from "./pages/influencerDetails.js";
import CampaignUpdate from "./pages/campaignUpdate.js";
import InfluencerProfile from "./pages/influencerProfile.js";
import InfluencerRegister from "./pages/influencerRegister.js";
import EngagementUpdate from "./pages/engagementUpdate.js";
import EngagementDetails from "./pages/engagementDetails.js";
import ProposalCreate from "./pages/proposalCreate.js";
import Dialog from "./components/dialog.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/influencer/login" element={<InfluencerLogin />} />
        <Route path="/influencer/list" element={<InfluencerList />} />
        <Route path="/influencer/details" element={<InfluencerDetails />} />
        <Route path="/influencer/profile" element={<InfluencerProfile />} />
        <Route path="/influencer/register" element={<InfluencerRegister />} />
        <Route
          path="/influencer/proposal/create/:id"
          element={<ProposalCreate />}
        />

        <Route path="/brand/login" element={<BrandLogin />} />
        <Route path="/brand/profile" element={<BrandProfile />} />
        <Route path="/brand/register" element={<BrandRegister />} />
        <Route path="/brand/campaign/create" element={<CampaignCreate />} />
        <Route path="/brand/campaign/update/:id" element={<CampaignUpdate />} />
        <Route path="/brand/campaign/list" element={<CampaignList />} />
        <Route
          path="/brand/campaign/details/:id"
          element={<CampaignDetails />}
        />
        <Route path="/brand/engagement/list" element={<EngagementList />} />
        <Route
          path="/brand/engagement/update/:id"
          element={<EngagementUpdate />}
        />
        <Route
          path="/brand/engagement/details/:id"
          element={<EngagementDetails />}
        />

        <Route path="/dialog" element={<Dialog />} />
      </Routes>
    </div>
  );
}

export default App;
