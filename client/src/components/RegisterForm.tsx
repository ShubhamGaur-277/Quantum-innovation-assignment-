// src/components/RegisterForm.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/registerForm.css";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import person_icon from "./Assets/person.png";
import logo_icon from "./Assets/logo.png";
import waves_icon from "./Assets/wave.svg"

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3001/register", {
        name,
        dob,
        email,
        password,
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    window.location.href = '/';
  };

  return (
    <form className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="img">
          <img className="logo" src={logo_icon} alt="" />
          <img className="waves" src={waves_icon} alt="" />
        </div>
        <div className="inputs">
          <div className="input">
            <img src={person_icon} alt="" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <img src={person_icon} alt="" />
            <input
              type="date"
              placeholder="Date Of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleRegister}>sign up</div>
          <button type="button" className="submit" onClick={handleClick}>Log in</button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
