import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [noti, setNoti] = useState("");
  const navigate = useNavigate();

  const RegisUser = async (name, email, password) => {
    try {
      const response = await axios.post("https://coursemanagement-be.onrender.com/auth/signup", {
        name: name,
        email: email,
        password: password,
        role: "user",
      });
      setNoti("Register success!");
      // Chuyển hướng đến trang đăng nhập nếu thành công
      navigate("/login");
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      setNoti("Register failed!");
    }
  };
  const handleRegis = () => {
    if (name && email && password) {
      RegisUser(name, email, password);
    } else {
      setNoti("Vui lòng điền đầy đủ các trường.");
    }
  };
  return (
    <>
      <h2>Register</h2>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Lưu giá trị email
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Lưu giá trị password
      />
      <br />
      <button onClick={handleRegis}>Register</button>
      <span>
        You already have an account, <Link to="/login">log in here</Link>!
      </span>
      {/* In ra thông báo nếu đăng nhập thành công */}
      {noti && <p style={{ color: "green" }}>{noti}</p>}
    </>
  );
};

export default Register;
