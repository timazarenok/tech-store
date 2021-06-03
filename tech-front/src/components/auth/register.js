import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import { Form, FormControl, Button } from "react-bootstrap";

import "./register.css";

const Register = (props) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({email: "", password: ""});

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/orders");
    }
  }, [errors != {email: "", password: ""}]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: login,
      email: email,
      password: password,
      password2: password2,
    };
    props.registerUser(newUser, props.history);
    setErrors(props.errors);
  };

  return (
    <Form className="register-form" onSubmit={onSubmit}>
      <h1>Регистрация</h1>
      <Form.Row>
        <Form.Group>
          <Form.Label>Логин</Form.Label>
          <FormControl
            onChange={onChangeLogin}
            value={login}
            error={errors.name}
            id="name"
            type="text"
            placeholder="Логин"
          />
          <span className="text-danger font-weight-bold">{errors.name}</span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Почта</Form.Label>
          <FormControl
            onChange={onChangeEmail}
            value={email}
            error={errors.email}
            id="email"
            type="email"
            placeholder="Почта"
          />
          <span className="text-danger font-weight-bold">{errors.email}</span>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group>
          <Form.Label>Пароль</Form.Label>
          <FormControl
            onChange={onChangePassword}
            value={password}
            error={errors.password}
            id="password"
            type="password"
            placeholder="Пароль"
          />
          <span className="text-danger font-weight-bold">
            {errors.password}
          </span>
        </Form.Group>
        <Form.Group>
          <Form.Label>Подтверждение пароля</Form.Label>
          <FormControl
            onChange={onChangePassword2}
            value={password2}
            error={errors.password2}
            id="password2"
            type="password"
            placeholder="Подтверждение пароля"
          />
          <span className="text-danger font-weight-bold">
            {errors.password2}
          </span>
        </Form.Group>
      </Form.Row>
      <Button onClick={onSubmit}>Регистрация</Button>
    </Form>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.auth.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
