import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");

  const nameChange = (e) => {
    namechange(e.target.value);
  };
  const emailChange = (e) => {
    emailchange(e.target.value);
  };

  const passwordChange = (e) => {
    passwordchange(e.target.value);
  };

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const empData = { name, email, password };
    await axios.post("http://localhost:8082/reguser", empData);
    alert("Registered Successfully!");

    navigate("/");
  };

  return (
    <div className="home-con">
      <h1 style={{textAlign:"center"}}>SignUp !</h1>
      <form className="container" onSubmit={handlesubmit}>
        <div>
          <label className="label">Name </label>
          <input type="text" required onChange={nameChange}></input>
        </div>

        <div>
          <label className="label">Email</label>
          <input type="text" required onChange={emailChange}></input>
        </div>
        <div>
          <label className="label" required>
            Password
          </label>
          <input type="password" required onChange={passwordChange}></input>
        </div>
        <div className="login-div-con">
          <button type="submit" className="btn btn-primary" style={{marginLeft:"140px", marginTop:"10px"}}>
            Register
          </button>
        </div>
        <div className="log-div">
          Have an account? <Link to={"/"}>login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
