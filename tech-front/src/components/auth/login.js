import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";

import "./login.css";

const Login = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({email: "", password: ""});

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/profile");
    }
  }, [errors != {email: "", password: ""}]);

  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const userData = {
      email: login,
      password: password,
    };
    props.loginUser(userData);
    setErrors(props.errors);
    console.log(props.errors)
    if (login === "admin@gmail.com" && props.auth.isAuthenticated) {
      props.history.push("/admin");
    }
  };

  return (
    <Form className="login-from" onSubmit={onSubmitForm}>
      <h1>Вход</h1>
      <Form.Label>Логин</Form.Label>
      <InputGroup>
        <FormControl
          placehoder="Логин"
          value={login}
          onChange={onChangeLogin}
        />
        <span className="text-danger font-weight-bold">{errors.email}</span>
      </InputGroup>
      <Form.Label>Пароль</Form.Label>
      <InputGroup>
        <FormControl
          placehoder="Пароль"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        <span className="text-danger font-weight-bold">{errors.password}</span>
      </InputGroup>
      <Button onClick={onSubmitForm}>Войти</Button>
      <Button
        className="register-button"
        onClick={() => props.history.push("/register")}
      >
        Регистрация
      </Button>
    </Form>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.auth.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
