import React, { useEffect, useState } from "react";
import logo from "../assets/images/bleento-logo.png";
import "../assets/main.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Headers = () => {
  const profileName = localStorage.getItem("name")
    ? localStorage.getItem("name")
    : "";

  const [name, setName] = useState(profileName);

  return (
    <nav class="navbar navbar-expand-lg fixed-top shadow-sm p-3 rounded justify-content-between">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img
            src={logo}
            width="100"
            height="40"
            style={{ marginLeft: "25px" }}
          />
        </a>

        <ul class="navbar-nav mr-auto">
          <li class="nav-item iconhover" style={{ marginRight: 20 }}>
            <i
              class="bi-question-circle"
              style={{ fontSize: 25, padding: 5 }}
            />
          </li>
          <li class="nav-item iconhover" style={{ marginRight: 20 }}>
            <i class="bi-bell" style={{ fontSize: 25, padding: 5 }} />
          </li>
          <li class="nav-item iconhover" style={{ marginRight: 20 }}>
            <i class="bi-gear" style={{ fontSize: 25, padding: 5 }} />
          </li>
          <li class="nav-item" style={{ marginRight: 20 }}>
            <a href="/home" type="button" class="btn btn-primary">
              Home
            </a>
          </li>
          <li class="nav-item">
            <div class="profileIcon">
              <span>{name ? name.charAt(0) : "P"}</span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Headers;
