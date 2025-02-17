import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Headers from "../components/header";
import { sendOtp, verifyOtp } from "../actions/brandActions";
import { useNavigate } from "react-router-dom";

const BrandLogin = () => {
  const [mobile_number, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [role, setRole] = useState("brand");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    res,
    loading,
    error,
    statusCode,
    isOtpSend,
    isOtpVerified,
    invalidOtp,
  } = useSelector((state) => state.brand);

  const otpSend = async () => {
    console.log("otp send button click");
    if (mobile_number) {
      dispatch(sendOtp(mobile_number));
      console.log("res", res);
    } else {
      alert("please enter mobile number");
    }
  };

  const otpVerify = async () => {
    setRole("brand");
    if (mobile_number && otp) {
      dispatch(verifyOtp(mobile_number, otp, role));
    } else {
      alert("Please check mobile number and otp");
    }
  };

  if (isOtpVerified && res && res.token) {
    localStorage.setItem("authToken", res.token);
    if (res.is_user_already_exist && res.is_profile_completed) {
      navigate("/brand/profile");
    } else {
      navigate("/brand/register");
    }
  }
  return (
    <div>
      <Headers />
      <p class="h1" style={{ marginTop: "90px", marginLeft: "40%" }}>
        Brand Login
      </p>
      <div class="loginFormContainer">
        <form>
          <div>
            <div class="mb-3">
              <label for="mobile_number" class="form-label ">
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
                    style={{ width: "80%" }}
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
              <label for="exampleInputPassword1" class="form-label">
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
                {invalidOtp ? "invalid or expired otp " : ""}
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

export default BrandLogin;
