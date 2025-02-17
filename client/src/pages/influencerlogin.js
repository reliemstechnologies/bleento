import React, { useState } from "react";
import Headers from "../components/header";
import "../assets/main.css";
import { useNavigate } from "react-router-dom";
import {
  influencerSendOtp,
  influencerVerifyOtp,
} from "../actions/influencerActions";
import { useDispatch, useSelector } from "react-redux";

const InfluencerLogin = () => {
  const [mobile_number, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [role, setRole] = useState("influencer");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { res, loading, error, statusCode, isOtpSend, isOtpVerified } =
    useSelector((state) => state.influencer);

  const otpSend = async () => {
    console.log("otp send button click");
    if (mobile_number) {
      dispatch(influencerSendOtp(mobile_number));
      console.log("res", res);
    } else {
      alert("please enter mobile number");
    }
  };

  const otpVerify = async () => {
    setRole("influencer");
    if (mobile_number && otp) {
      dispatch(influencerVerifyOtp(mobile_number, otp, role));
    } else {
      alert("Please check mobile number and otp");
    }
  };

  if (isOtpVerified && res && res.token) {
    console.log("token", res.token);
    localStorage.setItem("authToken", res.token);
    localStorage.setItem("role", "influencer");
    if (res.is_user_already_exist && res.is_profile_completed) {
      navigate("/influencer/profile");
    } else {
      navigate("/influencer/register");
    }
  }

  return (
    <div>
      <Headers />
      <p class="h1" style={{ marginTop: "90px", marginLeft: "40%" }}>
        Influencer Login
      </p>
      <div class="loginFormContainer">
        <form>
          <div>
            <div class="mb-3">
              <label for="mobile_number" class="form-label">
                Mobile Number
              </label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    value={mobile_number}
                    type="text"
                    class="form-control"
                    id="mobile_number"
                    name="mobile_number"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    aria-describedby="mobile_number_help"
                    style={{ width: "100%" }}
                  />
                  <small id="mobile_number_help" class="form-text text-muted">
                    {isOtpSend ? "otp send successfully" : ""}
                  </small>
                </div>

                <button
                  class="btn btn-dark"
                  type="button"
                  style={{ width: "40%", marginLeft: "20px" }}
                  onClick={otpSend}
                >
                  GET OTP
                </button>
              </div>
            </div>
            <div class="mb-3">
              <label for="otp" class="form-label">
                OTP
              </label>
              <input
                type="text"
                class="form-control"
                id="otp"
                name="otp"
                onChange={(e) => setOtp(e.target.value)}
              />
              <small id="otp_help" class="form-text text-muted">
                {isOtpVerified ? "otp verified" : ""}
              </small>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-dark"
            style={{ width: "100%" }}
            onClick={otpVerify}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default InfluencerLogin;
