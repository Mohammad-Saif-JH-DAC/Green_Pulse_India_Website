import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Spinner, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './assets/events.css';
import Swal from 'sweetalert2';

// Import all event images (add these to your assets folder)
import beachCleanupImg from './assets/beach.jpg';
import treePlantingImg from './assets/Earth day.jpg';
import recyclingImg from './assets/recycle.jpg';
import ecoWorkshopImg from './assets/eco.jpg';
import riverCleanupImg from './assets/river.jpg';
import greenFestivalImg from './assets/exhibit.jpg';
import solarPanelImg from './assets/solar.jpg';


export function Events() {
    // Complete list of 8 events with images and details
    const [events] = useState([
        {
            id: 1,
            name: "Beach Cleanup",
            description: "Help clean our beautiful beaches and protect marine life from plastic pollution",
            location: "Juhu Beach, Mumbai",
            date: "2023-11-15",
            image: beachCleanupImg,
            participants: 120
        },
        {
            id: 2,
            name: "Tree Planting",
            description: "Plant native trees to increase green cover and combat urban heat islands",
            location: "Sanjay Gandhi National Park",
            date: "2023-11-20",
            image: treePlantingImg,
            participants: 80
        },
        {
            id: 3,
            name: "Recycling Drive",
            description: "Learn proper waste segregation and help collect recyclable materials",
            location: "Community Center, Andheri",
            date: "2023-11-25",
            image: recyclingImg,
            participants: 65
        },
        {
            id: 4,
            name: "Eco Workshop",
            description: "Hands-on workshop teaching sustainable living practices for urban dwellers",
            location: "Green Hub, Bandra",
            date: "2023-12-02",
            image: ecoWorkshopImg,
            participants: 45
        },
        {
            id: 5,
            name: "River Cleanup",
            description: "Help remove trash from our rivers and restore aquatic ecosystems",
            location: "Mithi River, Kurla",
            date: "2023-12-10",
            image: riverCleanupImg,
            participants: 95
        },
        {
            id: 6,
            name: "Green Festival",
            description: "Celebrate eco-friendly living with workshops, exhibits, and local vendors",
            location: "Town Square, Dadar",
            date: "2023-12-15",
            image: greenFestivalImg,
            participants: 200
        },
        {
            id: 7,
            name: "Solar Panel Install",
            description: "Help install solar panels at a local school and learn about renewable energy",
            location: "Municipal School, Powai",
            date: "2023-12-20",
            image: solarPanelImg,
            participants: 30
        }
    ]);

    const [loadingStates, setLoadingStates] = useState({});
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        //const token = localStorage.getItem('token');
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

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({
                id: payload.adminId,
                username: payload.username,
                name: payload.name
            });
        } catch (error) {
            console.error("Token error:", error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }, [token, navigate]);

    const handleJoinEvent = async (eventId, eventName) => {
        if (!user || loadingStates[eventId]) return;

        setLoadingStates(prev => ({ ...prev, [eventId]: true }));
        const token = localStorage.getItem('token');

        try {
            // Get complete user details
            const profileRes = await axios.get(`http://localhost:9000/profile/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userData = profileRes.data.data[0];

            // Register for event
            await axios.post('http://localhost:9000/events', {
                id: user.id,
                name: userData.name,
                username: userData.volunteer_username,
                phone: userData.phone,
                event_name: eventName,
                address: userData.address
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success(`🎉 You've successfully joined ${eventName}!`, {
                position: "top-center",
                autoClose: 3000,
                icon: "✅"
            });
        } catch (error) {
            console.error("Join error:", error);
            toast.error(error.response?.data?.message || "Failed to join event. Please try again.", {
                position: "top-center",
                autoClose: 3000,
                icon: "❌"
            });
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } finally {
            setLoadingStates(prev => ({ ...prev, [eventId]: false }));
        }
    };

    if (!user) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Spinner animation="border" />
                <span className="ms-2">Loading events...</span>
            </div>
        );
    }

    return (
        <Container className="py-4" fluid>
            <ToastContainer />
            <h1 className="text-center mb-3">Eco-Friendly Events</h1>
            <p className="text-center text-muted mb-5">
                Join hands with your community to make a positive environmental impact
            </p>

            <Row className="event-grid">
                {events.map(event => (
                    <Col key={event.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="h-100 shadow-sm event-card">
                            <Card.Img
                                variant="top"
                                src={event.image}
                                alt={event.name}
                                className="event-image"
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="mb-3">{event.name}</Card.Title>
                                <Card.Text className="flex-grow-1">{event.description}</Card.Text>

                                <div className="event-details mb-3">
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>📍 {event.location}</span>
                                        <span>🗓 {event.date}</span>
                                    </div>
                                    <Badge bg="success" className="mt-2">
                                        {event.participants}+ attending
                                    </Badge>
                                </div>

                                <Button
                                    variant="primary"
                                    onClick={() => handleJoinEvent(event.id, event.name)}
                                    disabled={loadingStates[event.id]}
                                    className="join-button"
                                >
                                    {loadingStates[event.id] ? (
                                        <>
                                            <Spinner
                                                animation="border"
                                                size="sm"
                                                className="me-2"
                                            />
                                            Joining...
                                        </>
                                    ) : (
                                        'Join Event'
                                    )}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <style jsx>{`
                .event-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border: none;
                    border-radius: 10px;
                    overflow: hidden;
                }
                .event-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                .event-image {
                    height: 180px;
                    object-fit: cover;
                }
                .join-button {
                    font-weight: 500;
                    border-radius: 8px;
                    padding: 8px 16px;
                }
            `}</style>
        </Container>
    );
}