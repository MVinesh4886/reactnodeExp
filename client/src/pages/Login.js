import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(true);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      localStorage.setItem(
        "Expenses-User",
        JSON.stringify({ ...response.data, password: "" })
      );
      setLoading(false);
      message.success("Successfully logged in");
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Login Failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("Expenses-User")) {
      navigate("/");
    }
  });
  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>EXPENSE LOGIN</h1>
            <hr />

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">
                Not Registered Yet, Click here to Register
              </Link>
              <button className="primary" type="submit">
                Login
              </button>
            </div>
          </Form>
        </div>
        <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://lottie.host/6db5c860-2483-4b25-ba9e-fa6895ce9c0d/Ow2qjm4C9Z.json"
              background="transparent"
              speed="1"
              loop
              autoplay
              direction="1"
              mode="normal"
            ></lottie-player>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
