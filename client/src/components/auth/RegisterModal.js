import axios from "axios";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { REGISTER_SUCCESS, USER_LOADING } from "../../actions/types";
import { useDispatch } from "react-redux";

const RegisterModal = ({ showRegister, handleCloseRegister, weatherCall }) => {
  const dispatch = useDispatch();

  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    home: "",
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
          home: loginCreds.home,
        })
        .then((response) => {
          console.log("response login: ", response);
          if (response.status === 200) {
            dispatch({ type: REGISTER_SUCCESS, payload: response.data });
            alert("Signed Up! You are now logged in");
            setLoginCreds({
              username: "",
              password: "",
              passwordConfirm: "",
              home: ""
            });
            weatherCall(response.data.user.home);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Passwords should match!");
    }
  };

  return (
    <Modal className="" show={showRegister} onHide={handleCloseRegister}>
      <Form className="p-4 bg-dark">
        <Form.Text className="mb-1 text-light">
          Your username can be whatever you want, an email, your name, or a
          screen name
        </Form.Text>
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
        <Form.Text className="mb-1 text-light">
          Your password should NOT be a password you use for anything important,
          just something you can remember for this site
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
        <Form.Text className="mb-1 text-light">
          Please confirm your password
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
        <Form.Text className="mb-1 text-light">
          Please enter your Hometown
        </Form.Text>
        <Form.Group>
          <Form.Control
            type="input"
            name="home"
            id="inputHome"
            defaultValue={loginCreds.home}
            placeholder="Hometown"
            onChange={handleChange}
          />
        </Form.Group>
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
