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

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/profile");
    }
  });

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
    if(login === "admin@gmail.com") {
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
      </InputGroup>
      <Form.Label>Пароль</Form.Label>
      <InputGroup>
        <FormControl
          placehoder="Пароль"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
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
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
