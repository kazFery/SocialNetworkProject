import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import validator from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const validPassword = (value) => {
  if (
    !validator.isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }) ||
    !validator.isLength(value, { min: 8, max: 40 })
  )
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 8 and 40 characters. Password must have at
        least one number, one capital letter, one small letter and one symbole.
      </div>
    );
};
const validBirthDate = (value) => {
  var today = new Date();
  var ddd = new Date(today.setFullYear(today.getFullYear() - 18));
  if (!validator.isBefore(value, ddd.toString)) {
    return (
      <div className="alert alert-danger" role="alert">
        ERRRRRRRRRRRRRRRRRRO
      </div>
    );
  }
};

const otherValidation = (p1, p2, bod) => {
  const errors = {};
  if (!(p1 === p2)) {
    errors.password2 = "The password and confirmation password do not match.";
    errors.password = "";
  }
  var today = new Date();
  var ddd = new Date(today.setFullYear(today.getFullYear() - 18));
  if (!(new Date(bod) < ddd)) {
    errors.birthDate = "You must be older than 18 years.";
  }
  return errors;
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [errorval, setErrorval] = useState(false);
  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePassword2 = (e) => {
    const password2 = e.target.value;
    setPassword2(password2);
  };
  const onChangeBirthDate = (e) => {
    const birthDate = e.target.value;
    setBirthDate(birthDate);
  };

  const handleRegister = (e) => {
    debugger;
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    setFormErrors(otherValidation(password, password2, birthDate));

    form.current.validateAll();
    // var failMessage = document.getElementById("fail-added");
    // if (!validBirthDate(birthDate)) {
    //   failMessage.innerHTML = "Date is not valid";
    // }
    if (Object.keys(formErrors).length === 0) {
      setErrorval(false);
    } else {
      setErrorval(true);
    }
    if (
      checkBtn.current.context._errors.length === 0 &&
      Object.keys(formErrors).length === 0
    ) {
      AuthService.register(
        firstName,
        lastName,
        email,
        password,
        birthDate
      ).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="container">
      <div className="card border-0 bg-transparent">
        <div className="card-header">
          <h1>Register New Account</h1>
        </div>
        <div className="card-body">
          <Form className="g-3 m-5" onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group row">
                  <label for="firstName" className="col-sm-2 col-form-label fw-bold" style={{ fontSize: "2.2vmin" }}>First Name</label>
                  <div className="col-sm-10">
                    <Input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={firstName}
                      onChange={onChangeFirstName}
                      placeholder="First Name"
                      validations={[required]}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label for="lastName" className="col-sm-2 col-form-label fw-bold" style={{ fontSize: "2.2vmin" }}>Last Name</label>
                  <div className="col-sm-10">
                    <Input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={lastName}
                      onChange={onChangeLastName}
                      placeholder="Last Name"
                      validations={[required]}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label for="email" className="col-sm-2 col-form-label fw-bold" style={{ fontSize: "2.2vmin" }}>Email</label>
                  <div className="col-sm-10">
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={onChangeEmail}
                      placeholder="Email"
                      validations={[required, validEmail]}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label for="birthDate" className="col-sm-2 col-form-label fw-bold" style={{ fontSize: "2.2vmin" }}>Birth Date</label>
                  <div className="col-sm-10">
                    <input
                      type="date"
                      className="form-control"
                      name="birthDate"
                      value={birthDate}
                      onChange={onChangeBirthDate}
                      validations={[required, validBirthDate]}
                    />
                  </div>

                  <p
                    className="alert alert-danger"
                    role="alert"
                    style={{ display: errorval ? "block" : "none" }}
                  >
                    {formErrors.birthDate}
                  </p>
                </div>

                <div className="form-group row">
                  <label for="password" className="col-sm-2 col-form-label fw-bold" style={{ fontSize: "2.2vmin" }}>Password</label>
                  <div className="col-sm-10">
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      placeholder="Password"
                      onChange={onChangePassword}
                      validations={[required, validPassword]}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label for="password2" className="col-sm-2 col-form-label fw-bold" style={{ fontSize: "2.2vmin" }}>Confirm Password</label>
                  <div className="col-sm-10">
                    <Input
                      type="password"
                      className="form-control"
                      name="password2"
                      value={password2}
                      placeholder="Confirm Password"
                      onChange={onChangePassword2}
                      validations={[required]}
                    />
                  </div>

                  <p
                    id="failAlert"
                    className="alert alert-danger"
                    role="alert"
                    style={{ display: errorval ? "block" : "none" }}
                  >
                    {formErrors.password2}
                  </p>
                </div>

                <div className="row form-group justify-content-center w-25 m-auto">
                  <button className="btn btn-primary btn-block mt-3 ">
                    Register
                  </button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
