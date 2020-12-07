import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { SET_HOME } from "../../actions/types";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

const HomeModal = ({ showHome, handleCloseHome }) => {
  const store = useSelector((store) => store, shallowEqual);
  const dispatch = useDispatch();
  const [home, setHome] = useState("");

  const handleChange = (e) => setHome(e.target.value);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    handleCloseHome();
    let config = {
      headers: {
        "x-auth-token": `${store.auth.token}`,
      },
    };
    axios
      .put(
        "/api/updateHome",
        {
          username: store.auth.user.username,
          home,
        },
        config
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: SET_HOME, payload: home})
          setHome('');
          alert("Home set!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal show={showHome} onHide={handleCloseHome}>
      <Form className="p-4 bg-dark">
        <Form.Group>
          <Form.Control
            type="home"
            name="home"
            id="inputHome"
            defaultValue={home}
            placeholder="Enter Home"
            onChange={handleChange}
          />
        </Form.Group>
        <Row>
          <Col className="d-flex">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Set Home
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default HomeModal;
