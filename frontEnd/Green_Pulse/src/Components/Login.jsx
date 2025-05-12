import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import backgroundImage from '../assets/Green_Pulse_bg.jpg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
    const [loading, setLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const navigate = useNavigate();

    // Validation schema for login form
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
    });

    // Validation schema for reset form
    const resetValidationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters')
            .max(30, 'Name cannot exceed 30 characters')
            .required('Full name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('New password is required')
    });

    // Formik for login form
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await axios.post('http://localhost:9000/login', values, {
                    validateStatus: function (status) {
                        return status < 500;
                    }
                });

                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    toast.success('Login successful! Redirecting...', {
                        position: "top-center",
                        autoClose: 2000,
                        onClose: () => navigate('/profile')
                    });
                } else {
                    setLoading(false);
                    const errorMessage = response.data.message || 'Login failed';
                    toast.error(errorMessage, {
                        position: "top-center",
                        autoClose: 3000
                    });
                }
            } catch (error) {
                setLoading(false);
                let errorMessage = 'An unexpected error occurred';
                if (error.response) {
                    errorMessage = error.response.status === 401 || error.response.status === 404
                        ? error.response.data.message || 'Invalid credentials'
                        : 'Login failed';
                } else if (error.request) {
                    errorMessage = 'Network error - please check your connection';
                }
                toast.error(errorMessage, {
                    position: "top-center",
                    autoClose: 3000
                });
            }
        }
    });

    // Formik for reset form
    const resetFormik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: resetValidationSchema,
        onSubmit: async (values) => {
            setResetLoading(true);
            try {
                const response = await axios.post('http://localhost:9000/reset-password', values, {
                    validateStatus: function (status) {
                        return status < 500;
                    }
                });

                if (response.status === 200) {
                    toast.success('Password reset successfully! Please log in with your new password.', {
                        position: "top-center",
                        autoClose: 5000
                    });
                    setShowResetModal(false);
                    resetFormik.resetForm();
                } else {
                    const errorMessage = response.data.message || 'Password reset failed';
                    toast.error(errorMessage, {
                        position: "top-center",
                        autoClose: 3000
                    });
                }
            } catch (error) {
                let errorMessage = 'An unexpected error occurred';
                if (error.response) {
                    errorMessage = error.response.data.message || 'Password reset failed';
                } else if (error.request) {
                    errorMessage = 'Network error - please check your connection';
                }
                toast.error(errorMessage, {
                    position: "top-center",
                    autoClose: 3000
                });
            } finally {
                setResetLoading(false);
            }
        }
    });

    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <Container style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(5px)',
                padding: '30px',
                borderRadius: '15px',
                maxWidth: '600px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
                <h2 className="text-center mb-4" style={{ color: '#2c3e50' }}>Welcome Back! 🌱</h2>

                <Form onSubmit={formik.handleSubmit}>
                    {/* Email Field */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="username"
                            placeholder="Enter your email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            isInvalid={formik.touched.username && !!formik.errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            isInvalid={formik.touched.password && !!formik.errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 py-2 mb-3"
                        style={{
                            backgroundColor: '#27ae60',
                            borderColor: '#27ae60',
                            fontSize: '1.1rem'
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Logging in...
                            </>
                        ) : 'Login'}
                    </Button>

                    <div className="text-center mt-3">
                        <p style={{ color: '#2c3e50' }}>
                            Don't have an account?{' '}
                            <Link to="/signup" style={{ color: '#27ae60', fontWeight: 500 }}>
                                Sign up here
                            </Link>
                        </p>
                        <p style={{ color: '#2c3e50' }}>
                            Forgot your password?{' '}
                            <Button
                                variant="link"
                                style={{ color: '#27ae60', fontWeight: 500, padding: 0 }}
                                onClick={() => setShowResetModal(true)}
                            >
                                Reset password
                            </Button>
                        </p>
                    </div>
                </Form>
            </Container>

            {/* Password Reset Modal */}
            <Modal show={showResetModal} onHide={() => setShowResetModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Enter your full name, email, and new password to reset your password</p>
                    <Form onSubmit={resetFormik.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                onChange={resetFormik.handleChange}
                                onBlur={resetFormik.handleBlur}
                                value={resetFormik.values.name}
                                isInvalid={resetFormik.touched.name && !!resetFormik.errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {resetFormik.errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={resetFormik.handleChange}
                                onBlur={resetFormik.handleBlur}
                                value={resetFormik.values.email}
                                isInvalid={resetFormik.touched.email && !!resetFormik.errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {resetFormik.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter your new password"
                                onChange={resetFormik.handleChange}
                                onBlur={resetFormik.handleBlur}
                                value={resetFormik.values.password}
                                isInvalid={resetFormik.touched.password && !!resetFormik.errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {resetFormik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowResetModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={resetLoading}
                                style={{ backgroundColor: '#27ae60', borderColor: '#27ae60' }}
                            >
                                {resetLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Resetting...
                                    </>
                                ) : 'Reset Password'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}