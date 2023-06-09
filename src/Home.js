import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");

  const emailChange = (e) => {
    emailchange(e.target.value);
  };

  const passwordChange = (e) => {
    passwordchange(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `http://localhost:8082/getresponse/${email}/${password}`
    );
    if (res.data === "wrong mail") {
      alert("Email doesn't exist");
    } else if (res.data === "wrong pass") {
      alert("Wrong Password");
    } else {
      navigate("/employees");
    }
  };

  const registerPage = () => {
    navigate("/register");
  };

  return (
    <div className="home-con">
      <h1 style={{textAlign:"center"}}>Sign In !</h1>
      <div className="raj">
      <form className="container" onSubmit={handlesubmit}>
        <div>
          <label className="label">Email :</label>
          <input type="text" required onChange={emailChange}></input>
        </div>
        <div>
          <label className="label" required>
            Password :
          </label>
          <input type="password" required onChange={passwordChange}></input>
        </div>
        <div>
          <button type="submit" className="btn btn-primary" style={{marginLeft:"150px"}}>
            Login
          </button>
        </div>
      </form>
      </div>
      <button className="btn btn-outline-primary" onClick={registerPage} style={{marginLeft:"130px",marginTop:"10px"}}>
        Create Account
      </button>
    </div>
  );
};

export default Home;
