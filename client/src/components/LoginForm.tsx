// src/pages/Login.tsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { loginUser } from "../api/userApi";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setUser } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userData: any = await loginUser(email, password);
      if (userData) {
        setUser(userData);
        setIsLoggedIn(true);
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Failed to login");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
