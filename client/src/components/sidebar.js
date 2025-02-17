import React, { useEffect, useState } from "react";
import "../assets/main.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getSidebarProfileAction } from "../actions/brandActions.js";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [options, setOptions] = useState("");

  const profileRole = localStorage.getItem("role")
    ? localStorage.getItem("role")
    : "";

  const profileMobileNumber = localStorage.getItem("mobile_number")
    ? localStorage.getItem("mobile_number")
    : "";

  const profileName = localStorage.getItem("name")
    ? localStorage.getItem("name")
    : "";

  const [role, setRole] = useState(profileRole);
  const [mobile_number, setMobileNumber] = useState(profileMobileNumber);
  const [name, setName] = useState(profileName);

  useEffect(() => {
    setOptions(location.pathname);
  }, []);

  const logout = () => {
    localStorage.clear("authToken");
    localStorage.clear("role");
    localStorage.clear("name");
    localStorage.clear("mobile_number");
    navigate("/home");
  };

  return (
    <div class="sidebar">
      <div class="headerProfile">
        <div class="profileIcon">
          <span>{name ? name.charAt(0) : "P"}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "18px" }}>{name}</span>
          <span style={{ fontSize: "16px" }}>{mobile_number}</span>
        </div>
      </div>
      <hr />
      <ul>
        {role == "brand" ? (
          <li>
            <a
              href="/brand/profile"
              className={options == "/brand/profile" ? "active" : ""}
            >
              <i
                class="bi bi-person-circle"
                style={{ marginRight: "10px", fontSize: "20px" }}
              ></i>
              Your Account
            </a>
          </li>
        ) : (
          <li>
            <a
              href="/influencer/profile"
              className={options == "/influencer/profile" ? "active" : ""}
            >
              <i
                class="bi bi-person-circle"
                style={{ marginRight: "10px", fontSize: "20px" }}
              ></i>
              Your Account
            </a>
          </li>
        )}

        {role == "brand" ? (
          <li>
            <a
              href="/brand/campaign/create"
              className={options == "/brand/campaign/create" ? "active" : ""}
            >
              <i
                class="bi bi-megaphone"
                style={{ marginRight: "10px", fontSize: "20px" }}
              ></i>
              Create Campaign
            </a>
          </li>
        ) : (
          ""
        )}
        <li>
          <a
            href="/brand/campaign/list"
            className={options == "/brand/campaign/list" ? "active" : ""}
          >
            {" "}
            <i
              class="bi bi-card-checklist"
              style={{ marginRight: "10px", fontSize: "20px" }}
            ></i>
            Campaign List
          </a>
        </li>
        <li>
          <a
            href="/brand/engagement/list"
            className={options == "/brand/engagement/list" ? "active" : ""}
          >
            {" "}
            <i
              class="bi bi-chat-left-text"
              style={{ marginRight: "10px", fontSize: "20px" }}
            ></i>
            Engagement List
          </a>
        </li>
        <li>
          <a href="/home" onClick={logout}>
            {" "}
            <i
              class="bi bi-box-arrow-left"
              style={{ marginRight: "10px", fontSize: "20px" }}
            ></i>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
