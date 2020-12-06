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
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginCreds({ ...loginCreds, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        }
      })
      .catch((err) => console.log(err));
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
        <Row>
          <Col className="d-flex">
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
