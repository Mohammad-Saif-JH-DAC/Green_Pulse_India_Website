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
            'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2017/03/05/Pictures/_f64834fe-019e-11e7-abb0-ce03674c2ba4.jpg',
    'https://th.bing.com/th/id/OIP.befUGFHYude2T6wKWyE5kAHaEK',
    'https://th.bing.com/th/id/OIP.kRABHH1ZWDD6mPJTIYY3RQHaFj'],
        alt: 'Beach cleanup by Green Pulse India volunteers',
        caption: 'Volunteers cleaning plastic waste from Mumbai`s coastline.',
    },
    {
        images: [
            'https://th.bing.com/th/id/OIP.YYAty6CQV9Yo8D_jGdJZ6AHaEB?w=303&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            'https://th.bing.com/th/id/OIP.n8F7SSb351lJYxuFV59hCAHaEK?w=333&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            'https://th.bing.com/th/id/OIP.7TKtC8sSTlUq2FUwsGwGyQHaEK?w=288&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        ],
        alt: 'Tree planting event',
        caption: 'Planting 10,000 saplings in Navi Mumbai to combat air pollution.',
    },
    {
        images: [
            'https://w.ndtvimg.com/sites/3/2018/05/23100437/Plastic-and-waste-free-village2.jpg',
            'https://th.bing.com/th/id/OIP.uukuo8Ya0hNDjhikfpMtngHaDV?w=1280&h=576&rs=1&pid=ImgDetMain',
            'https://im.indiatimes.in/content/2023/Jun/This-is-the-first-time-that-the-villagers-of-Betul-district-are-dealing-with-such-a-large-order-for-mahua-flowers-Photo---Nandkishor-Pawar-101Reporters_64855fada4247.jpg',
        ],
        alt: 'Community workshop on waste management',
        caption: 'Educating rural communities on waste segregation.',
    },
    {
        images: [
            'https://th.bing.com/th/id/OIP.h8xOJ0crORyDj2TbTCM7-AHaE7?w=165&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            'https://th.bing.com/th/id/OIP.2lEYnX-ONh1kFwZfuO6YDQHaEJ?w=320&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            'https://th.bing.com/th/id/OIP._FqxMda8o3Jk_ZYmk95znQHaEr?w=273&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        ],
        alt: 'River cleanup initiative',
        caption: 'Restoring local rivers by removing pollutants.',
    },
    {
        images: [
            'https://th.bing.com/th/id/OIP.zajNwDa6zxzQqYBqyzqn6AHaE8?w=294&h=196&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            'https://th.bing.com/th/id/OIP.eHbwib31CiOhhRiPpUDcQwAAAA?w=267&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
        ],
        alt: 'Eco-friendly workshop for kids',
        caption: 'Teaching children about recycling and sustainability.',
    },
    {
        images: [
            'https://th.bing.com/th/id/OIP.417a1ygp-OUYa87q9-0w2QHaHa?w=174&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            'https://th.bing.com/th/id/OIP._DXXBxpX_t75-R6BOZxXNgHaE7?w=232&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            'https://th.bing.com/th/id/OIP.NI3ISJZZVy1bYDc7NmeIBQHaE8?w=290&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7',
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