import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
const Login = () => {
  // Firebase config (cấu hình Firebase)
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

  // State để lưu trạng thái đăng nhập và thông báo
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false); // State kiểm tra đăng nhập thành công
  const [errorMessage, setErrorMessage] = useState(""); // Lưu lỗi
  // Hàm đăng nhập và lấy ID token
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

      // Gửi ID token lên server để xác thực
      const response = await fetch("http://localhost:8080/auth/verifyToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = await response.json();
      console.log("Xác thực trên server: ", data);

      // Nếu xác thực thành công, cập nhật state đăng nhập thành công
      setLoginSuccess(true);
      setErrorMessage(""); // Xóa thông báo lỗi nếu có
      console.log("ID token: ", idToken); // In ra token trong console
    } catch (error) {
      console.error("Error logging in: ", error);
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
    <div>
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

      {/* In ra thông báo nếu đăng nhập thành công */}
      {loginSuccess && <p style={{ color: "green" }}>Login success</p>}

      {/* In ra lỗi nếu có */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
