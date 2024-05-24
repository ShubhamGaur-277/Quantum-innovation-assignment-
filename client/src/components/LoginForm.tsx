// src/components/LoginForm.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/loginForm.css";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import logo_icon from "./Assets/logo.png";
import waves_icon from "./Assets/wave.svg"

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      const accessToken = response.data.token;
      authService.setToken(accessToken);
      navigate("/user-table");
    } catch (error) {
      console.log(error);
      window.alert("not registered")
      navigate("/register");
    }
  };

  const handleClick = () => {
    window.location.href = '/register';
  };

  return (
    <form className="container">
      <div className="header">
        <div className="text">SIGN IN</div>
        <div className="img">
          <img className="logo" src={logo_icon} alt=""/>
          <img className="waves" src={waves_icon} alt="" />
        </div>
        <div className="inputs">
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
        <div className="forgot-password">
          forget password? <span>click here</span>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleClick}>sign up</div>
          <button type="button" className="submit" onClick={handleLogin}>Log in</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
