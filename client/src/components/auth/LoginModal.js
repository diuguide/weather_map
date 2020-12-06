import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const LoginModal = ({ showLogin, handleCloseLogin }) => {
  return (
    <Modal className="" show={showLogin} onHide={handleCloseLogin}>
      <Form className="p-4 bg-dark">
        <Form.Group>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Row>
          <Col className="d-flex">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default LoginModal;