import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Spinner, Alert, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/Green_Pulse_bg.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export function Profile() {
    const [userData, setUserData] = useState(null);
    const [eventsData, setEventsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, [navigate]);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire({
                    title: 'Authentication Required',
                    text: 'Please login to join events',
                    icon: 'error',
                    confirmButtonText: 'Go to Login',
                    confirmButtonColor: '#dc3545',
                    background: '#fff',
                    backdrop: `
        rgba(0,0,0,0.6)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
                    customClass: {
                        container: 'my-swal'
                    }
                }).then(() => {
                    navigate('/login');
                });
                return;
            }

            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.adminId;

            const response = await axios.get(`http://localhost:9000/profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.data && response.data.data.length > 0) {
                // The first item contains user data
                const userInfo = response.data.data[0];
                setUserData({
                    id: userInfo.volunteer_id,
                    name: userInfo.name,
                    email: userInfo.volunteer_username,
                    phone: userInfo.phone,
                    address: userInfo.address
                });

                setFormData({
                    name: userInfo.name,
                    email: userInfo.volunteer_username,
                    phone: userInfo.phone,
                    address: userInfo.address
                });

                // All items contain event data (some might have null events_name)
                const events = response.data.data
                    .filter(item => item.events_name)
                    .map(item => ({
                        name: item.events_name,
                        status: 'completed' // Default status for Past_Event
                    }));

                setEventsData(events);
            }
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch profile');
            setLoading(false);
            if (err.response?.status === 401) {
                handleLogoutConfirmed();
            }
        }
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirmed = () => {
        localStorage.removeItem('token');
        setShowLogoutModal(false);
        toast.success('Logged out successfully! Redirecting to login...', {
            position: "top-center",
            autoClose: 2000,
            onClose: () => navigate('/login')
        });
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirmed = async () => {
        try {
            const token = localStorage.getItem('token');
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.adminId;

            await axios.delete(`http://localhost:9000/profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setShowDeleteModal(false);
            toast.success('Account deleted successfully! Redirecting to login...', {
                position: "top-center",
                autoClose: 2000,
                onClose: () => {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete account. Please try again.', {
                position: "top-center",
                autoClose: 3000
            });
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.adminId;

            // Only send fields that are allowed to be updated
            const updateData = {
                name: formData.name,
                phone: formData.phone,
                address: formData.address
            };

            await axios.put(`http://localhost:9000/profile/${userId}`, updateData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setShowEditModal(false);
            toast.success('Profile updated successfully!', {
                position: "top-center",
                autoClose: 2000
            });
            fetchProfile(); // Refresh profile data
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update profile. Please try again.', {
                position: "top-center",
                autoClose: 3000
            });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
                <Button variant="primary" onClick={() => window.location.reload()}>
                    Try Again
                </Button>
            </Container>
        );
    }

    if (!userData) {
        return (
            <Container className="mt-5">
                <Alert variant="info">No profile data found</Alert>
                <Button variant="primary" onClick={() => navigate('/login')}>
                    Go to Login
                </Button>
            </Container>
        );
    }

    return (
        <div style={{
            background: `
        linear-gradient(rgba(0, 0, 0, 0.3), 
        rgba(0, 0, 0, 0.3)
    ), 
    url(${backgroundImage}) center/cover no-repeat fixed`,
            minHeight: '100vh',
            width: '100%',
            padding: '20px',
            position: 'relative'
        }}>
            <ToastContainer />
            <Container>
                <Row className="mb-3">
                    <Col className="d-flex justify-content-end gap-2">
                        <Button
                            variant="warning"
                            onClick={() => setShowEditModal(true)}
                            style={{
                                fontWeight: 'bold',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                            }}
                        >
                            <i className="bi bi-pencil-square me-2"></i> Edit Profile
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleDeleteClick}
                            style={{
                                fontWeight: 'bold',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                            }}
                        >
                            <i className="bi bi-trash me-2"></i> Delete Account
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleLogoutClick}
                            style={{
                                fontWeight: 'bold',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                            }}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i> Logout
                        </Button>
                    </Col>
                </Row>

                {/* Profile Card */}
                <Card className="mb-4" style={{
                    backdropFilter: 'blur(5px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                    <Card.Body>
                        <Card.Title className="mb-4" style={{ fontSize: '1.8rem', color: '#2c3e50' }}>
                            <i className="bi bi-person-circle me-2"></i>
                            My Profile
                        </Card.Title>
                        <Table bordered hover responsive>
                            <tbody>
                                <tr>
                                    <th style={{ width: '30%' }}>Name</th>
                                    <td>{userData.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{userData.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{userData.phone || 'Not provided'}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{userData.address || 'Not provided'}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                {/* Events Card */}
                <Card style={{
                    backdropFilter: 'blur(5px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                    <Card.Body>
                        <Card.Title className="mb-4" style={{ fontSize: '1.8rem', color: '#2c3e50' }}>
                            <i className="bi bi-calendar-event me-2"></i>
                            My Events
                        </Card.Title>
                        {eventsData.length > 0 ? (
                            <Table striped bordered hover responsive>
                                <thead className="table-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Event Name</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventsData.map((event, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{event.name}</td>
                                            <td>
                                                <span className={`badge ${event.status === 'completed' ? 'bg-success' :
                                                        event.status === 'pending' ? 'bg-warning' : 'bg-secondary'
                                                    }`}>
                                                    {event.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <Alert variant="info" className="text-center">
                                <i className="bi bi-info-circle-fill me-2"></i>
                                You haven't attended any events yet
                            </Alert>
                        )}
                    </Card.Body>
                </Card>
            </Container>

            {/* Edit Profile Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleEditSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                minLength="3"
                                maxLength="30"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                pattern="[0-9]{10}"
                                title="Please enter exactly 10 digits"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                maxLength="100"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Account Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="danger">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        <strong>Warning:</strong> This action cannot be undone!
                    </Alert>
                    <p>Are you sure you want to permanently delete your account?</p>
                    <ul>
                        <li>All your personal data will be erased</li>
                        <li>Your event participation records will be removed</li>
                        <li>You will need to register again to use our services</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirmed}>
                        <i className="bi bi-trash-fill me-2"></i> Delete Permanently
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Logout Confirmation Modal */}
            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to log out?</p>
                    <p>You'll need to log in again to access your profile.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLogoutConfirmed}>
                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}