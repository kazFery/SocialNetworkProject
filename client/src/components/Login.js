import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import validator from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const emailValidator = (value) => {
  if (!validator.isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        ${value} is not a valid email.
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          navigate("/");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <div className="card border-0 bg-transparent">
        <h1 className="text-center mt-4 mb-0" style={{ fontFamily: 'Julius Sans One', color: "#0277CC", fontSize: "3rem" }}>Social Network Project</h1>
        <hr className="mt-0" style={{ border: 'none', height: '3px', background: '#BBD0FA' }} />
        <Form className="mt-5 text-center" onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label for="email" className="form-label mt-4 fw-bold" style={{fontSize: "20px", color: "#0277CC", letterSpacing: "1.3px"}}>Email Address</label>
            <Input
              type="text"
              className="form-control mx-auto"
              style={{background: '#CDE4FB', width: "600px"}}
              name="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="Email"
              validations={[required, emailValidator]}
            />
          </div>

          <div className="form-group">
            <label for="email" className="form-label mt-4 fw-bold" style={{fontSize: "20px", color: "#0277CC", letterSpacing: "1.3px"}}>Password</label>
            <Input
              type="password"
              className="form-control mx-auto"
              style={{background: '#CDE4FB', width: "600px"}}
              name="password"
              value={password}
              onChange={onChangePassword}
              placeholder="Password"
              validations={[required]}
            />
          </div>

          <div className="form-group text-center">
            <button
              className="btn btn-primary mt-3 fw-bold" 
              style={{letterSpacing: '1.3px', width: "120px"}}
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;