import axios from "axios";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  //use
  const navigate = useNavigate();

  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyBI09t8K00FTwlQM8r-PJ7AUfD4tpj9i5o",
    authDomain: "coursemanagement-59047.firebaseapp.com",
    projectId: "coursemanagement-59047",
    storageBucket: "coursemanagement-59047.appspot.com",
    messagingSenderId: "536108533132",
    appId: "1:536108533132:web:09bd9dfa73c0f0a32742a9",
    measurementId: "G-BBGPZTSW8D",
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app); // Lấy Firebase Auth instance

 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false); // State kiểm tra đăng nhập thành công
  const [errorMessage, setErrorMessage] = useState(""); // Lưu lỗi

  useEffect(() => {
    if (loginSuccess) {
      const role = localStorage.getItem("role");
      console.log("role", role);
      if (role === "admin") navigate("/admin");
      else navigate("/");
    } else {
      const uid = localStorage.getItem("uid");
      const expriresAt = localStorage.getItem("expiresAt");
      if (uid && expriresAt) {
        if (Date.now() < expriresAt) {
          //token is valid
          setLoginSuccess(true);
          const role = localStorage.getItem("role");

          if (role === "admin") navigate("/admin");
          else navigate("/");
        } else {
          //token is expired
          localStorage.removeItem("idToken");
          localStorage.removeItem("uid");
          localStorage.removeItem("name");
          localStorage.removeItem("expiresAt");
          localStorage.removeItem("role");
        }
      }
    }
  }, []);

  // Hàm đăng nhập và lấy ID token
  const loginUser = async (email, password) => {
    try {
      // Đăng nhập với email và password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Lấy ID token
      const idToken = await userCredential.user.getIdToken();

      console.log("id token:", idToken);
      // Gửi ID token lên server để xác thực
      const response = await axios.post(
        "http://localhost:8080/auth/verifyToken",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      console.log("response: ", response.data);

      const data = await response.data;
      console.log("Xác thực trên server: ", data);

      // Lưu ID token và thời gian hết hạn vào Local Storage
      const expiresAt = Date.now() + 60 * 60 * 1000; // 60 phút tính bằng milliseconds
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("uid", data.uid);
      localStorage.setItem("name", data.name);
      localStorage.setItem("expiresAt", expiresAt);
      localStorage.setItem("role", data.role.trim());

      console.log("ID token: ", idToken); 
      setErrorMessage("");
      setLoginSuccess(true);
      if (data.role.trim() === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in: ", error.message);
      setLoginSuccess(false);
      setErrorMessage("Đăng nhập thất bại. Vui lòng kiểm tra lại.");
    }
  };

  // Xử lý khi nhấn nút login
  const handleLogin = () => {
    if (email && password) {
      loginUser(email, password);
    } else {
      setErrorMessage("Vui lòng điền đầy đủ email và mật khẩu.");
    }
  };

  return (
    <>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <span>
        You do not have an account, <Link to="/register">register here</Link>!
      </span>
    
      {loginSuccess && <p style={{ color: "green" }}>Login success</p>}

    
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  );
};

export default Login;
