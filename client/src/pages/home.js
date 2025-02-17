import Header from "../components/header.js";
import "../assets/main.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Header />
      <div class="homePage">
        <Link to="/brand/login">
          <button
            type="button"
            class="btn btn-dark"
            style={{ marginTop: "20px", width: "220px" }}
          >
            Login Brand
          </button>
        </Link>
        <Link to="/influencer/login">
          <button
            type="button"
            class="btn btn-dark"
            style={{ marginTop: "20px", width: "220px" }}
          >
            Login Influencer
          </button>
        </Link>
      </div>
    </div>
  );
}
