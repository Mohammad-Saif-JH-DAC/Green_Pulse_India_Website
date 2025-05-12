import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import backgroundImage from '../assets/Green_Pulse_bg.jpg';
import '../assets/Gallery.css';
import hero1 from '../assets/img1.jpg';
import hero2 from '../assets/img2.jpg';
import hero3 from '../assets/img3.jpg';
import hero4 from '../assets/img4.jpg';
import hero5 from '../assets/img5.jpg';
import hero6 from '../assets/img6.jpg';




// Hero images - replace these with your actual local image paths
const heroImages = [
    {
        id: 1,
        src: hero1, // Replace with your actual path
        alt: "Hero of Coastal Cleanup Crusade",
        title: "Coastal Cleanup Crusade",
        subtitle: "Mrunali Kale, Volunteer Lead",
        description: "Mrunali mobilized 500 volunteers to remove 2 tons of plastic from Mumbai's beaches, inspiring coastal conservation."
    },
    {
        id: 2,
        src: hero2, // Replace with your actual path
        alt: "Hero of Green Lungs Initiative",
        title: "Green Lungs Initiative",
        subtitle: "Arjun Patel, Community Organizer",
        description: "Arjun led the planting of 10,000 trees in Navi Mumbai, boosting air quality and green cover."
    },
    {
        id: 3,
        src: hero3, // Replace with your actual path
        alt: "Hero of River Revival Rally",
        title: "River Revival Rally",
        subtitle: "Sneha Rao, Campaign Coordinator",
        description: "Sneha rallied 1,000 citizens to clean local rivers, removing pollutants and restoring ecosystems."
    },
    {
        id: 4,
        src: hero4, // Replace with your actual path
        alt: "Eco-Education Pioneer",
        title: "Eco-Education Program",
        subtitle: "Rahul Verma, Education Director",
        description: "Rahul developed environmental curriculum reaching 50 schools and 10,000 students annually."
    },
    {
        id: 5,
        src: hero5, // Replace with your actual path
        alt: "Waste Management Innovator",
        title: "Zero Waste Communities",
        subtitle: "Ananya Gupta, Sustainability Officer",
        description: "Ananya implemented recycling programs diverting 15 tons of waste from landfills each month."
    },
    {
        id: 6,
        src: hero6, // Replace with your actual path
        alt: "Clean Energy Champion",
        title: "Solar for Villages",
        subtitle: "Vikram Singh, Energy Specialist",
        description: "Vikram brought solar power to 20 remote villages, replacing kerosene lamps with clean energy."
    }
];

// Updated gallery images with working URLs
const galleryImages = [
    {
        images: [
            'https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1526779259212-939e64788e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
        ],
        alt: 'Beach cleanup by Green Pulse India volunteers',
        caption: 'Volunteers cleaning plastic waste from Mumbai`s coastline.',
    },
    {
        images: [
            'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
        ],
        alt: 'Tree planting event',
        caption: 'Planting 10,000 saplings in Navi Mumbai to combat air pollution.',
    },
    {
        images: [
            'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
        ],
        alt: 'Community workshop on waste management',
        caption: 'Educating rural communities on waste segregation.',
    },
    {
        images: [
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1536939459926-301728717817?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
        ],
        alt: 'River cleanup initiative',
        caption: 'Restoring local rivers by removing pollutants.',
    },
    {
        images: [
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
        ],
        alt: 'Eco-friendly workshop for kids',
        caption: 'Teaching children about recycling and sustainability.',
    },
    {
        images: [
            'https://images.unsplash.com/photo-1508514177221-188b1cfd5af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
            'https://images.unsplash.com/photo-1508514177221-188b1cfd5af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
        ],
        alt: 'Solar panel installation',
        caption: 'Promoting clean energy with solar installations in villages.',
    }
];

export function Gallery() {
    const [visibleImages, setVisibleImages] = useState([]);
    const [currentImageIndices, setCurrentImageIndices] = useState(
        galleryImages.map(() => 0)
    );
    const [activeIndex, setActiveIndex] = useState(0);

    // Split heroes into groups of 3 for the carousel
    const heroGroups = [];
    for (let i = 0; i < heroImages.length; i += 3) {
        heroGroups.push(heroImages.slice(i, i + 3));
    }

    useEffect(() => {
        // Sequentially show cards with a delay
        galleryImages.forEach((_, index) => {
            setTimeout(() => {
                setVisibleImages((prev) => [...prev, index]);
            }, index * 300);
        });

        // Cycle through images for each gallery item independently
        const imageIntervals = galleryImages.map((_, i) => {
            return setInterval(() => {
                setCurrentImageIndices(prev => {
                    const newIndices = [...prev];
                    newIndices[i] = (newIndices[i] + 1) % galleryImages[i].images.length;
                    return newIndices;
                });
            }, 5000);
        });

        // Auto-advance carousel every 6 seconds
        const carouselInterval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % heroGroups.length);
        }, 6000);

        return () => {
            imageIntervals.forEach(interval => clearInterval(interval));
            clearInterval(carouselInterval);
        };
    }, [heroGroups.length]);

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    return (
        <div
            style={{
                position: 'relative',
                minHeight: '100vh',
                padding: '20px',
                overflow: 'hidden',
            }}
        >
            {/* Blurred Background */}
            <div
                style={{
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
                    transform: 'scale(1.05)',
                }}
            />
            {/* Semi-transparent Overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    zIndex: -1,
                }}
            />

            <Container>
                {/* Gallery Section */}
                <h2
                    className="text-center mb-5"
                    style={{
                        color: '#2c3e50',
                        textShadow: '0 1px 2px rgba(255,255,255,0.5)',
                        fontSize: '2.5rem',
                        fontWeight: 600,
                    }}
                >
                    Green Pulse India <span style={{ color: '#27ae60' }}>Gallery</span>
                </h2>
                <p
                    className="text-center mb-5"
                    style={{ color: '#2c3e50', fontSize: '1.1rem' }}
                >
                    Explore our efforts to combat pollution and promote sustainability across India.
                </p>

                <Row className="g-4">
                    {galleryImages.map((item, index) => (
                        <Col xs={12} sm={6} md={4} key={index}>
                            <Card
                                className={`gallery-card ${visibleImages.includes(index) ? 'visible' : ''
                                    }`}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                                    backdropFilter: 'blur(5px)',
                                    WebkitBackdropFilter: 'blur(5px)',
                                    borderRadius: '15px',
                                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                }}
                            >
                                <Card.Img
                                    variant="top"
                                    src={item.images[currentImageIndices[index]]}
                                    alt={item.alt}
                                    loading="lazy"
                                    style={{
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderTopLeftRadius: '15px',
                                        borderTopRightRadius: '15px',
                                        transition: 'opacity 0.5s ease-in-out',
                                    }}
                                />
                                <Card.Body>
                                    <Card.Text style={{ color: '#2c3e50', fontSize: '0.9rem' }}>
                                        {item.caption}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Spotlight Carousel Section */}
                <h2
                    className="text-center mt-5 mb-5"
                    style={{
                        color: '#2c3e50',
                        textShadow: '0 1px 2px rgba(255,255,255,0.5)',
                        fontSize: '2.5rem',
                        fontWeight: 600,
                    }}
                >
                    Spotlight: <span style={{ color: '#27ae60' }}>Our Heroes</span>
                </h2>
                <p
                    className="text-center mb-5"
                    style={{ color: '#2c3e50', fontSize: '1.1rem' }}
                >
                    Celebrating the champions who drive our environmental initiatives.
                </p>

                <Carousel
                    activeIndex={activeIndex}
                    onSelect={handleSelect}
                    indicators={false}
                    interval={null} // We handle interval manually
                    className="mb-5"
                >
                    {heroGroups.map((group, index) => (
                        <Carousel.Item key={index}>
                            <Row className="g-4 justify-content-center">
                                {group.map((hero) => (
                                    <Col xs={12} md={4} key={hero.id}>
                                        <Card
                                            style={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                                                backdropFilter: 'blur(5px)',
                                                WebkitBackdropFilter: 'blur(5px)',
                                                borderRadius: '15px',
                                                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                                textAlign: 'center',
                                                height: '100%',
                                            }}
                                        >
                                            <Card.Img
                                                variant="top"
                                                src={hero.src}
                                                alt={hero.alt}
                                                style={{
                                                    height: '200px',
                                                    objectFit: 'cover',
                                                    borderTopLeftRadius: '15px',
                                                    borderTopRightRadius: '15px',
                                                }}
                                            />
                                            <Card.Body>
                                                <Card.Title style={{ color: '#2c3e50', fontSize: '1.25rem' }}>
                                                    {hero.title}
                                                </Card.Title>
                                                <Card.Subtitle
                                                    style={{ color: '#27ae60', fontSize: '1rem', marginBottom: '8px' }}
                                                >
                                                    {hero.subtitle}
                                                </Card.Subtitle>
                                                <Card.Text style={{ color: '#2c3e50', fontSize: '0.9rem' }}>
                                                    {hero.description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>

                {/* Carousel navigation dots */}
                <div className="text-center mb-5">
                    {heroGroups.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            className={`mx-1 rounded-circle ${activeIndex === idx ? 'bg-success' : 'bg-secondary'}`}
                            style={{
                                width: '12px',
                                height: '12px',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={() => setActiveIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* YouTube Video Section */}
                <Row className="mt-5">
                    <Col>
                        <Card
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                                backdropFilter: 'blur(5px)',
                                WebkitBackdropFilter: 'blur(5px)',
                                borderRadius: '15px',
                                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            <Card.Body>
                                <h5 className="mb-3" style={{ color: '#2c3e50' }}>
                                    Why We Must Protect Our Earth from Pollution
                                </h5>
                                <div className="ratio ratio-16x9">
                                    <iframe
                                        title="YouTube video on protecting Earth from pollution"
                                        src="https://www.youtube.com/embed/WmVLcj-XKnM"
                                        allowFullScreen
                                        style={{ borderRadius: '10px' }}
                                    ></iframe>
                                </div>
                                <p
                                    className="mt-3"
                                    style={{ color: '#2c3e50', fontSize: '0.9rem' }}
                                >
                                    This video highlights the urgent need to address pollution and protect our planet's ecosystems.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}