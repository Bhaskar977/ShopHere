import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormaData] = useState(initialState);

  const login = async () => {
    console.log("LogIn");
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });
    if(responseData.success){
      localStorage.setItem("authToken",responseData.token)
      window.location.replace("/")
    }else{
      alert(responseData.errors)
    }
  };

  const signUp = async () => {
    console.log("SignUp");
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });
    if(responseData.success){
      localStorage.setItem("authToken",responseData.token)
      window.location.replace("/")
    }else{
      alert(responseData.errors)
    }
  };

  const handleChange = (e) => {
    setFormaData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginsignup">
      <div className="loginsinup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Your Name"
              onChange={handleChange}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email Address"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signUp();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        )}
        <div className="loginsingnup-agree">
          <input type="checkbox" name="" id="" />
          <p>By Continuing, i agree to the term of use and privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
