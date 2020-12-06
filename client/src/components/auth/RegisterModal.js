import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const RegisterModal = ({ showRegister, handleCloseRegister }) => {
  return (
    <Modal className="" show={showRegister} onHide={handleCloseRegister}>
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
              Sign Up
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default RegisterModal;
