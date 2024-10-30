import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function Login() {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100">
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col xs={10} sm={10} md={10} lg={10} xl={10}> {/* Adjusts width based on screen size */}

          <Card className="bg-dark text-white my-5 mx-auto" style={{ borderRadius: '1rem' }}>
            <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <Form.Group className="mb-4 mx-5 w-100">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control type="email" size="lg" />
              </Form.Group>

              <Form.Group className="mb-4 mx-5 w-100">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control type="password" size="lg" />
              </Form.Group>

              <p className="small mb-3 pb-lg-2"><a href="#!" className="text-white-50">Forgot password?</a></p>
              
              <Button variant="outline-light" className="mx-2 px-5" size="lg">Login</Button>

            </Card.Body>
          </Card>

        </Col>
      </Row>
    </Container>
  );
}

export default Login;
