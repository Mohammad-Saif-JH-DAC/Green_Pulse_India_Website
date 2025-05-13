import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../assets/Green_Pulse_bg.jpg';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().matches(/^[8-9][0-9]{9}$/, 'Phone must be 10 digits and should start with 9 or 8'),
      subject: Yup.string().required('Subject is required'),
      message: Yup.string().required('Message is required').min(20, 'Message must be at least 20 characters')
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        await axios.post('http://localhost:9000/contact', values);

        toast.success('Message sent successfully! We will contact you soon.', {
          position: "top-center",
          autoClose: 5000
        });
        setSubmitted(true);
        resetForm();
      } catch (error) {
        toast.error('Failed to send message. Please try again later.', {
          position: "top-center",
          autoClose: 5000
        });
        console.error('Error sending message:', error);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '20px',
      overflow: 'hidden'
    }}>
      {/* Blurred Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        filter: 'blur(8px)',
        zIndex: -2,
        transform: 'scale(1.05)'
      }} />

      {/* Semi-transparent Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        zIndex: -1
      }} />

      <Container>
        <h2 className="text-center mb-5" style={{ color: '#2c3e50', textShadow: '0 1px 2px rgba(255,255,255,0.5)' }}>
          Contact <span style={{ color: '#27ae60' }}>Green Pulse India</span>
        </h2>
        <p className="text-center mb-5" style={{ color: '#2c3e50', fontSize: '1.1rem' }}>
          Have questions or want to get involved? Reach out to us through any of these channels.
        </p>

        <Row className="g-4">
          {/* Contact Information Column */}
          <Col md={5}>
            <Card className="h-100" style={{
              backgroundColor: 'rgba(24, 23, 23, 0.85)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              borderRadius: '15px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <Card.Body style={{ color: 'white' }}>
                <div className="contact-info">
                  <div className="info-item mb-4">
                    <div className="info-icon text-success">
                      <FaMapMarkerAlt size={20} />
                    </div>
                    <div className="info-content">
                      <h5>Our Location</h5>
                      <p>Raintree Marg, near Bharati Vidyapeeth, Sector 7, CBD Belapur, Navi Mumbai, Maharashtra 400614</p>
                    </div>
                  </div>

                  <div className="info-item mb-4">
                    <div className="info-icon text-success">
                      <FaPhone size={20} />
                    </div>
                    <div className="info-content">
                      <h5>Phone Number</h5>
                      <p>+91 99125 26547 (Mohammad Saif - Owner)</p>
                      <p>+91 98765 43210 (Office)</p>
                    </div>
                  </div>

                  <div className="info-item mb-4">
                    <div className="info-icon text-success">
                      <FaEnvelope size={20} />
                    </div>
                    <div className="info-content">
                      <h5>Email Address</h5>
                      <p>contact@greenpulseindia.org</p>
                      <p>saif@greenpulseindia.org (Owner)</p>
                    </div>
                  </div>

                  <div className="info-item mb-4">
                    <div className="info-icon text-success">
                      <FaClock size={20} />
                    </div>
                    <div className="info-content">
                      <h5>Working Hours</h5>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon text-success">
                      <MdOutlineSupportAgent size={20} />
                    </div>
                    <div className="info-content">
                      <h5>Support</h5>
                      <p>For urgent matters, please call our hotline: +91 87654 32109</p>
                      <p>General inquiries: support@greenpulseindia.org</p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Form Column */}
          <Col md={7}>
            <Card style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              borderRadius: '15px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <Card.Body>
                <h4 className="mb-4" style={{ color: '#2c3e50' }}>Send us a message</h4>
                {submitted ? (
                  <Alert variant="success" className="text-center">
                    Thank you for contacting us! We'll get back to you soon.
                  </Alert>
                ) : (
                  <Form onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                      <Col md={6} className="mb-3 mb-md-0">
                        <Form.Group controlId="name">
                          <Form.Label>Your Name *</Form.Label>
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
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="email">
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            isInvalid={formik.touched.email && !!formik.errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group controlId="phone" className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        isInvalid={formik.touched.phone && !!formik.errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="subject" className="mb-3">
                      <Form.Label>Subject *</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        placeholder="What's this about?"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.subject}
                        isInvalid={formik.touched.subject && !!formik.errors.subject}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.subject}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="message" className="mb-4">
                      <Form.Label>Your Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        placeholder="Type your message here..."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                        isInvalid={formik.touched.message && !!formik.errors.message}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="text-center">
                      <Button
                        variant="success"
                        type="submit"
                        disabled={loading}
                        style={{
                          backgroundColor: '#27ae60',
                          borderColor: '#27ae60',
                          padding: '10px 30px',
                          fontSize: '1.1rem'
                        }}
                      >
                        {loading ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          <>
                            <FaPaperPlane className="me-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Embedded Map */}
        <Row className="mt-5">
          <Col>
            <Card style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              borderRadius: '15px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <Card.Body>
                <h5 className="mb-3" style={{ color: '#2c3e50' }}>Our Location on Map</h5>
                <div className="map-container">
                  <iframe
                    title="Green Pulse India Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.781156437678!2d73.0542462!3d19.0258994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c24cce39457b%3A0x8bd69eab297890b0!2sCentre%20for%20Development%20of%20Advanced%20Computing%20(CDAC)!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: '10px' }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};