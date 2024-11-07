import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
// import { loginUser } from '../redux/actions'; // Assuming a Redux action is set up

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    // const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors

        try {
            const response = await axios.post('/user/login/', { username, password });
            const userData = response.data;
            console.log(userData)
            // dispatch(loginUser(userData)); // Store user data in Redux
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors || { general: 'An error occurred' });
            } else {
                setErrors({ general: 'An error occurred' });
            }
        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100">
        <Row className="d-flex justify-content-center align-items-center w-100 h-90">
            <Col md={6} lg={5} xl={5}>

            <Card className="bg-dark text-white my-5" style={{ borderRadius: '1rem' }}>
                <Card.Body className="p-5 d-flex flex-column align-items-center">

                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5 text-center">Please enter your login and password!</p>

                <Form onSubmit={handleLogin} className="d-flex flex-column align-items-center">

                    <Form.Group className="mb-4" >
                    <Form.Label className="text-white">User Name</Form.Label>
                    <Form.Control
                        type="username"
                        size="lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control
                        type="password"
                        size="lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                    </Form.Group>

                    <p className="small mx-auto">
                    <a href="#!" className="text-white-50">Forgot password?</a>
                    </p>
                    
                    <Button variant="outline-light" className="px-5" size="lg" type="submit">Login</Button>

                    {errors.general && (
                    <div className="text-danger mt-3">{errors.general}</div>
                    )}

                </Form>
                </Card.Body>
            </Card>

            </Col>
        </Row>
    </Container>
    );
}

export default Login;
