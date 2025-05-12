import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../assets/Green_Pulse_bg.jpg';

export function Signup() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name cannot exceed 30 characters')
      .required('Name is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone must be exactly 10 digits')
      .required('Phone is required'),
    address: Yup.string()
      .max(100, 'Address cannot exceed 100 characters')
      .required('Address is required'),
    username: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, 'Password must be alphanumeric')
      .max(50, 'Password cannot exceed 50 characters')
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      address: '',
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setShowConfirmationModal(true);
      setSubmitting(false);
    }
  });

  const handleFinalSubmission = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:9000/signup', formik.values, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        toast.success('Registration successful! Redirecting to login...', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          onClose: () => navigate('/login', { state: { newlyRegistered: true } })
        });

        formik.resetForm();
        setShowConfirmationModal(false);
      }
    } catch (error) {
      let errorMessage = 'Signup failed. Please try again.';
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your internet connection.';
      }

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000
      });
    }
  };

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

      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered size="lg">
        <Modal.Header closeButton style={{ borderBottom: 'none', padding: '25px 25px 15px' }}>
          <Modal.Title style={{ color: '#2c3e50', fontSize: '1.5rem', fontWeight: 600 }}>
            Terms & Final Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '0 25px', maxHeight: '60vh', overflowY: 'auto' }}>
          <div className="mb-4">
            <h5 style={{ color: '#27ae60', marginBottom: '15px' }}>Please Review Your Information:</h5>
            <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
              <p><strong>Full Name:</strong> {formik.values.name}</p>
              <p><strong>Phone:</strong> {formik.values.phone}</p>
              <p><strong>Email:</strong> {formik.values.username}</p>
              <p><strong>Address:</strong> {formik.values.address}</p>
            </div>
          </div>

          <div className="terms-content" style={{ marginBottom: '20px' }}>
            <h5 style={{ color: '#27ae60', marginBottom: '15px' }}>Terms & Conditions:</h5>
            <ol style={{ paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px' }}>
                <strong>Accuracy of Information:</strong> You certify that all provided information is accurate and complete.
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Data Responsibility:</strong> You are responsible for keeping your credentials secure.
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Conduct Agreement:</strong> You agree to use the platform for legitimate activities only.
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Age Requirement:</strong> You confirm you are at least 18 years old.
              </li>
              <li>
                <strong>Communication Consent:</strong> You agree to receive service-related emails.
              </li>
            </ol>
          </div>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="I agree to the Terms of Service and Privacy Policy"
              id="terms-agreement"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: 'none', padding: '15px 25px 25px' }}>
          <Button
            variant="outline-secondary"
            onClick={() => setShowConfirmationModal(false)}
            style={{ padding: '8px 20px', borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleFinalSubmission}
            style={{
              backgroundColor: '#27ae60',
              borderColor: '#27ae60',
              padding: '8px 25px',
              borderRadius: '8px',
              fontWeight: 500
            }}
          >
            Confirm Registration
          </Button>
        </Modal.Footer>
      </Modal>

      <Container style={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(5px)',
        padding: '30px',
        borderRadius: '15px',
        maxWidth: '600px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <h2 className="text-center mb-4" style={{ color: '#2c3e50' }}>Sign Up for a Good Cause 🌱</h2>

        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Enter 10-digit phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              isInvalid={formik.touched.phone && !!formik.errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              placeholder="Enter your address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              isInvalid={formik.touched.address && !!formik.errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.address}
            </Form.Control.Feedback>
          </Form.Group>

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

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter alphanumeric password"
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
            className="w-100 py-2"
            style={{
              backgroundColor: '#27ae60',
              borderColor: '#27ae60',
              fontSize: '1.1rem'
            }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Verifying...' : 'Sign Up'}
          </Button>

          <div className="text-center mt-3">
            <p style={{ color: '#2c3e50' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#27ae60', fontWeight: 500 }}>
                Login here
              </Link>
            </p>
          </div>
        </Form>
      </Container>
    </div>
  );
}