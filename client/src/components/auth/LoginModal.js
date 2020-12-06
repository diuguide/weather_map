import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useDispatch} from "react-redux";
import axios from "axios";
import { LOGIN_SUCCESS, USER_LOADING } from "../../actions/types";

const LoginModal = ({ showLogin, handleCloseLogin }) => {
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
    handleCloseLogin();
    dispatch({ type: USER_LOADING })
    
    axios
      .post("/auth/User", {
        username: loginCreds.username,
        password: loginCreds.password,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: LOGIN_SUCCESS, payload: response.data})
          alert('Logged in!');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal show={showLogin} onHide={handleCloseLogin}>
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
              Login
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default LoginModal;
