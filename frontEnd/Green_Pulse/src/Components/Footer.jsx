import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaLeaf } from 'react-icons/fa';

export function Footer() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
        window.scrollTo(0, 0); // Scroll to top on navigation
    };

    return (
        <footer className="bg-dark text-white py-5 mt-5">
            <Container>
                <Row>
                    {/* About Section */}
                    <Col lg={4} md={6} className="mb-4">
                        <div className="d-flex align-items-center mb-3">
                            <FaLeaf className="text-success fs-3 me-2" />
                            <h5 className="mb-0 text-success">Green Pulse India</h5>
                        </div>
                        <p>
                            Committed to creating sustainable communities through environmental
                            education, conservation projects, and community engagement.
                        </p>
                        <div className="social-icons">
                            <a href="https://facebook.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                                <FaFacebook />
                            </a>
                            <a href="https://x.com/MeanderingNinja" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </a>
                            <a href="https://www.instagram.com/precocious_warrior" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                            <a href="https://www.linkedin.com/in/mohammadsaif25" className="text-white" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                        </div>
                    </Col>

                    {/* Quick Links Section */}
                    <Col lg={4} md={6} className="mb-4">
                        <h5 className="text-success mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Button
                                    variant="link"
                                    className="text-white p-0 text-decoration-none text-start"
                                    onClick={() => handleNavigation('/events')}
                                >
                                    Join Upcoming Events
                                </Button>
                            </li>
                            <li className="mb-2">
                                <Button
                                    variant="link"
                                    className="text-white p-0 text-decoration-none text-start"
                                    onClick={() => handleNavigation('/signup')}
                                >
                                    Become a Volunteer
                                </Button>
                            </li>
                            <li className="mb-2">
                                <Button
                                    variant="link"
                                    className="text-white p-0 text-decoration-none text-start"
                                    onClick={() => handleNavigation('/about')}
                                >
                                    About Us
                                </Button>
                            </li>
                            <li className="mb-2">
                                <Button
                                    variant="link"
                                    className="text-white p-0 text-decoration-none text-start"
                                    onClick={() => handleNavigation('/gallery')}
                                >
                                    Event Gallery
                                </Button>
                            </li>
                            <li className="mb-2">
                                <Button
                                    variant="link"
                                    className="text-white p-0 text-decoration-none text-start"
                                    onClick={() => handleNavigation('/login')}
                                >
                                    Login
                                </Button>
                            </li>
                        </ul>
                    </Col>

                    {/* Contact Section */}
                    <Col lg={4} className="mb-4">
                        <h5 className="text-success mb-3">Contact Us</h5>
                        <address>
                            <p className="mb-2">
                                <i className="fas fa-map-marker-alt me-2 text-success"></i>
                                Raintree Marg, near Bharati Vidyapeeth, Sector 7, CBD Belapur, Navi Mumbai, Maharashtra 400614
                            </p>
                            <p className="mb-2">
                                <i className="fas fa-phone me-2 text-success"></i>
                                +91 98765 43210 (Office)
                            </p>
                            <p className="mb-3">
                                <i className="fas fa-envelope me-2 text-success"></i>
                                contact@greenpulseindia.org
                            </p>
                        </address>
                        <Button
                            variant="success"
                            onClick={() => handleNavigation('/contact')}
                            className="w-100"
                        >
                            Get In Touch
                        </Button>
                    </Col>
                </Row>

                <hr className="my-4 bg-secondary" />

                <Row>
                    <Col className="text-center">
                        <p className="mb-0">
                            &copy; {new Date().getFullYear()} Green Pulse India. All rights reserved.
                        </p>
                        <div className="mt-2">
                            <Button
                                variant="link"
                                className="text-white text-decoration-none"
                                onClick={() => handleNavigation('/privacy')}
                            >
                                Privacy Policy
                            </Button>
                            <span className="mx-2">|</span>
                            <Button
                                variant="link"
                                className="text-white text-decoration-none"
                                onClick={() => handleNavigation('/terms')}
                            >
                                Terms of Service
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}