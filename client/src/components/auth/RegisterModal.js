import axios from "axios";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { REGISTER_SUCCESS, USER_LOADING } from "../../actions/types";
import { useDispatch } from "react-redux";

const RegisterModal = ({ showRegister, handleCloseRegister }) => {
  const dispatch = useDispatch();

  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginCreds({ ...loginCreds, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (loginCreds.password === loginCreds.passwordConfirm) {
      handleCloseRegister();
      dispatch({ type: USER_LOADING });
      axios
        .post("/api/User", {
          username: loginCreds.username,
          password: loginCreds.password,
        })
        .then((response) => {
          console.log("response login: ", response);
          if (response.status === 200) {
            dispatch({ type: REGISTER_SUCCESS, payload: response.data });
            alert("Signed Up! You are now logged in");
            setLoginCreds({
              username: "",
              password: "",
              passwordConfirm: ""
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert('Passwords should match!');
    }
  };

  return (
    <Modal className="" show={showRegister} onHide={handleCloseRegister}>
      <Form className="p-4 bg-dark">
        <Form.Group>
          <Form.Control
            type="username"
            name="username"
            id="inputEmail"
            defaultValue={loginCreds.username}
            placeholder="Enter email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Text className="mb-3 text-light">
          Your username can be whatever you want, an email, your name, or a
          screen name
        </Form.Text>
        <Form.Group>
          <Form.Control
            type="password"
            name="password"
            id="inputPassword"
            defaultValue={loginCreds.password}
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Text className="mb-3 text-light">
          Your password should NOT be a password you use for anything important,
          just something you can remember for this site
        </Form.Text>
        <Form.Text className="mb-3 text-light">
          DO NOT USE IMPORTANT PASSWORDS FOR THIS LOGIN
        </Form.Text>
        <Form.Group>
          <Form.Control
            type="password"
            name="passwordConfirm"
            id="inputPasswordConfirm"
            defaultValue={loginCreds.passwordConfirm}
            placeholder="Re-enter your Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Text className="mt-3 text-light">
          Please confirm your password
        </Form.Text>
        <Row>
          <Col className="mt-2 d-flex">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Sign Up
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default RegisterModal;
