import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Carousel } from 'react-bootstrap'; // Added Carousel
import {
    FaLeaf,
    FaHandsHelping,
    FaPeace,
    FaTree,
    FaUsers,
    FaGlobeAmericas,
    FaSeedling,
    FaHeart,
    FaDove,
    FaQuoteLeft
} from 'react-icons/fa';
import '../assets/Home.css';
import background from '../assets/Green_Pulse_bg.jpg';
import test1 from '../assets/test1.jpg';
import test2 from '../assets/test2.jpg';
import test3 from '../assets/test3.jpg';
import test4 from '../assets/test4.jpg';
import { useNavigate } from 'react-router-dom';


export function Home() {
    const [volunteerCount, setVolunteerCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVolunteerCount = async () => {
            try {
                const response = await fetch('http://localhost:9000/VolunteerCount'); // To calculate volunteer count
                if (!response.ok) {
                    throw new Error('Failed to fetch volunteer count');
                }
                const data = await response.json();
                setVolunteerCount(data.count);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchVolunteerCount();
    }, []);

    const testimonials = [
        {
            id: 1,
            name: "Owais",
            role: "Environmental Activist",
            quote: "Green Pulse India changed my perspective on sustainability. Their beach cleanup initiatives helped me connect with like-minded individuals who care about our planet.",
            image: test1
        },
        {
            id: 2,
            name: "Fahad",
            role: "Corporate Volunteer",
            quote: "The tree plantation drives organized by GPI are extremely well-managed. I've participated in 3 events and each time I leave feeling accomplished and inspired.",
            image: test2
        },
        {
            id: 3,
            name: "Ilam Mirza",
            role: "University Student",
            quote: "As a student, I appreciate how GPI makes environmental activism accessible. Their workshops taught me practical ways to reduce my carbon footprint.",
            image: test3
        },
        {
            id: 4,
            name: "Mrunali Jangam",
            role: "Community Leader",
            quote: "Working with Green Pulse India has transformed our village. Their solar energy project brought light to 50 homes that previously had no electricity.",
            image: test4
        }
    ];
    const navigate = useNavigate();

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            width: '100%'
        }}>
            <div style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                minHeight: '100vh',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.7)'
            }}>
                <section className="hero-section text-center" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    padding: '100px 0',
                    marginBottom: '30px'
                }}>
                    <Container>
                        <h1 className="display-4" style={{ color: "#155724" }}>Welcome to Green Pulse India</h1>
                        <p className="lead" style={{ color: "#155724" }}>Building a greener tomorrow through awareness, action, and community.</p>
                        {loading && <p style={{ color: "#155724" }}>Loading volunteer count...</p>}
                        {error && <p style={{ color: "#dc3545" }}>Error: {error}</p>}
                        {volunteerCount !== null && (
                            <Badge
                                bg="success"
                                className="mt-3 py-2 px-3 volunteer-badge"
                                style={{
                                    fontSize: '1.2rem',
                                    display: 'inline-flex',
                                    alignItems: 'center'
                                }}
                            >
                                <FaUsers className="me-2" />
                                {volunteerCount} Volunteers
                            </Badge>
                        )}
                        <div className="mt-4">
                            <Button variant="success" size="lg" className="move-down" onClick={() => {

                                navigate('/Signup');
                            }}>
                                <FaHandsHelping className="me-2" /> Join Us
                            </Button>
                        </div>
                    </Container>
                </section>

                <section>
                    <Container className="my-5 py-4" style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        borderRadius: '15px',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                    }}>
                        <Row>
                            <Col md={8}>
                                <h5 className="text-success">
                                    <FaLeaf className="me-2" /> Our Mission
                                </h5>
                                <p>At the Global Pulse India, we are more than an organization—we are a movement for change. Founded in India in 2025, we are an international non-profit committed to creating a sustainable future where people and the planet thrive together. With innovation, collaboration, and a passion for protecting our world, we are building a better tomorrow, one action at a time.</p>

                                <h5 className="text-success">
                                    <FaGlobeAmericas className="me-2" /> Our Purpose
                                </h5>
                                <p>We are driven by a bold mission: to inspire and empower individuals, communities, and organizations to embrace sustainable living. By fostering a deeper connection between humanity and the environment, we aim to reduce our collective footprint and promote harmony with our planet. Together, we can ensure a sustainable future for generations to come.</p>

                                <h5 className="text-success">
                                    <FaSeedling className="me-2" /> Our Vision
                                </h5>
                                <p>Our vision rests on three interconnected pillars:</p>
                                <ul className="vision-pillars">
                                    <li>
                                        <span className="text-success fw-bold">
                                            <FaTree className="me-2" /> Environmental Protection
                                        </span> – Safeguarding our planet's natural resources through impactful projects and advocacy.
                                    </li>
                                    <li>
                                        <span className="text-warning fw-bold">
                                            <FaHeart className="me-2" /> Diversity & Inclusion
                                        </span> – Creating a global network of changemakers, united by their unique perspectives and shared commitment to sustainability.
                                    </li>
                                    <li>
                                        <span className="text-primary fw-bold">
                                            <FaDove className="me-2" /> Peace
                                        </span> – Building a world where humans coexist peacefully with nature and each other.
                                    </li>
                                </ul>
                                <p>Through hands-on initiatives, educational programmes, and community-driven events, we empower individuals to take meaningful action and become guardians of the Earth.</p>
                            </Col>

                            <Col md={4} className="text-center">
                                <div className="logo-container mb-4">
                                    <FaLeaf className="text-success" size={80} />
                                    <h4 className="mt-3">Green Pulse India</h4>
                                </div>
                                <div className="ratio ratio-16x9">
                                    <iframe
                                        src="https://www.youtube.com/embed/a7-SiEo6RcE"
                                        title="Green Pulse India Presentation Video"
                                        allowFullScreen

                                    ></iframe>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="py-5">
                    <Container>
                        <h2 className="text-center mb-5">WHAT WE DO</h2>

                        <Row className="text-center">
                            <Col md={4}>
                                <Card style={{
                                    backgroundColor: 'rgba(40, 167, 69, 0.85)',
                                    color: 'white',
                                    border: 'none',
                                    height: '100%'
                                }}>
                                    <Card.Body>
                                        <div className="icon-container">
                                            <FaTree size={50} className="mb-3" />
                                        </div>
                                        <Card.Title>ENVIRONMENT PROTECTION</Card.Title>
                                        <Card.Text>
                                            At the Green Pulse India, we are devoted to protecting our planet and fostering universal awareness of environmental issues. Our mission is to inspire community engagement, promote sustainable practices, and encourage individual and collective action for a healthier planet.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={4}>
                                <Card style={{
                                    backgroundColor: 'rgba(40, 167, 69, 0.85)',
                                    color: 'white',
                                    border: 'none',
                                    height: '100%'
                                }}>
                                    <Card.Body>
                                        <div className="icon-container">
                                            <FaUsers size={50} className="mb-3" />
                                        </div>
                                        <Card.Title>DIVERSITY AND INCLUSION</Card.Title>
                                        <Card.Text>
                                            GPI values the richness of human diversity and the essential role it plays in shaping a better world. We are dedicated to fostering inclusivity, promoting tolerance, and celebrating the cultural and social heritage of communities around the globe.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={4}>
                                <Card style={{
                                    backgroundColor: 'rgba(40, 167, 69, 0.85)',
                                    color: 'white',
                                    border: 'none',
                                    height: '100%'
                                }}>
                                    <Card.Body>
                                        <div className="icon-container">
                                            <FaPeace size={50} className="mb-3" />
                                        </div>
                                        <Card.Title>PEACE</Card.Title>
                                        <Card.Text>
                                            Achieving global peace and security is at the core of GPI's mission. We firmly believe that development, sustainability, and a hopeful future are only possible in a world free from conflict.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="py-5" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    marginTop: '30px'
                }}>
                    <Container>
                        <h2 className="text-center mb-5">WHAT PEOPLE SAY</h2>
                        <Carousel indicators={false} interval={5000}>
                            {/* Group testimonials into pairs */}
                            {[...Array(Math.ceil(testimonials.length / 2))].map((_, index) => (
                                <Carousel.Item key={index}>
                                    <Row className="justify-content-center">
                                        {/* Take 2 testimonials at a time */}
                                        {testimonials.slice(index * 2, index * 2 + 2).map((item) => (
                                            <Col md={6} key={item.id} className="mb-4">
                                                <Card style={{
                                                    border: 'none',
                                                    backgroundColor: 'rgba(245, 245, 245, 0.9)',
                                                    height: '100%'
                                                }}>
                                                    <Card.Body className="text-center">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="rounded-circle mb-3"
                                                            style={{
                                                                width: '100px',
                                                                height: '100px',
                                                                objectFit: 'cover',
                                                                border: '3px solid #28a745'
                                                            }}
                                                        />
                                                        <FaQuoteLeft className="text-success mb-3" size={24} />
                                                        <Card.Text style={{ fontStyle: 'italic' }}>
                                                            "{item.quote}"
                                                        </Card.Text>
                                                        <Card.Title>{item.name}</Card.Title>
                                                        <Card.Subtitle className="text-muted">{item.role}</Card.Subtitle>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Container>
                </section>
            </div>
        </div>
    );
}