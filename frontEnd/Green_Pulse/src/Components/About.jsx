import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/Green_Pulse_bg.jpg';
import saif from '../assets/saif.jpg';
import teamMember1 from '../assets/team-member1.jpg';
import teamMember2 from '../assets/team-member2.jpg';
import inspiration1 from '../assets/inspiration1.jpg';
import inspiration2 from '../assets/inspiration2.jpg';
import inspiration3 from '../assets/inspiration3.jpg';
import inspiration4 from '../assets/aniket.jpg';

// Styled components
const AboutContainer = styled.div`
  padding: 4rem 2rem;
  color: #333;
  position: relative;
  overflow: hidden;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  filter: blur(8px);
  z-index: -2;
  transform: scale(1.05);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: #2c3e50;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: #3498db;
  }
`;

const SectionSubtitle = styled.h3`
  text-align: center;
  margin: 3rem 0 1.5rem;
  font-size: 1.8rem;
  color: #2c3e50;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;
`;

const MemberCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(2px);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 1);
  }
`;

const MemberImage = styled.div`
  height: 320px;
  background: #eee;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const MemberInfo = styled.div`
  padding: 1.8rem;
  text-align: center;
`;

const MemberName = styled.h4`
  margin: 0 0 0.5rem;
  font-size: 1.4rem;
  color: #2c3e50;
`;

const MemberRole = styled.p`
  margin: 0 0 1.2rem;
  color: #3498db;
  font-weight: 600;
  font-size: 1rem;
`;

const MemberBio = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
`;

export function About() {
    const teamMembers = [
        {
            id: 1,
            name: "Nazmin Anwar Shaikh",
            role: "Front-End Developer",
            bio: "Nazmin builds the digital backbone of Green Pulse India, creating user-friendly platforms to drive our sustainability mission forward.",
            image: teamMember1
        },
        {
            id: 2,
            name: "Mohammad Saif",
            role: "Full Stack Development Team Lead",
            bio: "Technology expert with a Diploma in Advance Computing from CDAC Mumbai. Saif oversees all technical aspects of our projects and ensures we stay at the cutting edge of innovation.",
            image: saif
        },
        {
            id: 3,
            name: "Nitu Hiralal Patil",
            role: "Events Coordinator",
            bio: "Nitu orchestrates impactful events for Green Pulse India, uniting communities to promote sustainability and environmental awareness.",
            image: teamMember2 // Using local image
        }
    ];

    const inspirations = [
        {
            id: 1,
            name: "Dr. Liran Waghmare",
            role: "Program Manager at CDAC Mumbai",
            //bio: "His vision for sustainable energy and space exploration inspires us to think beyond conventional boundaries in our own technological pursuits.",
            image: inspiration1 // Using local image
        },
        {
            id: 2,
            name: "Manoj More",
            role: "Software Engineer at CDAC Mumbai",
            //bio: "Her groundbreaking research in radioactivity and relentless dedication to science motivates our commitment to research and discovery.",
            image: inspiration2 // Using local image
        },
        {
            id: 3,
            name: "Dr. C P Johnson",
            role: "Senior Director at CDAC Mumbai",
            //bio: "His philosophy of blending technology with liberal arts and focus on perfecting user experience deeply influences our product design approach.",
            image: inspiration3 // Keeping one URL as example
        },
        {
            id: 4,
            name: "Aniket Takmare",
            role: "Project Engineer at CDAC Mumbai",
            //bio: "His philosophy of blending technology with liberal arts and focus on perfecting user experience deeply influences our product design approach.",
            image: inspiration4 // Keeping one URL as example
        }
    ];

    return (
        <AboutContainer id="about">
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

            {/* White overlay to improve readability */}
            <BackgroundOverlay />

            <ContentWrapper>
                <SectionTitle>About Us</SectionTitle>

                <p style={{
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '0 auto 3rem',
                    lineHeight: '1.7',
                    fontSize: '1.1rem',
                    color: '#555'
                }}>
                    We are a passionate team dedicated to delivering exceptional solutions to our clients.
                    Founded in 2025, our company has grown from a small startup to an industry leader,
                    thanks to our commitment to innovation, quality, and customer satisfaction. Our diverse
                    team brings together expertise from various fields to create comprehensive solutions.
                </p>

                <SectionSubtitle>Our Team</SectionSubtitle>
                <TeamGrid>
                    {teamMembers.map(member => (
                        <MemberCard key={member.id}>
                            <MemberImage image={member.image} />
                            <MemberInfo>
                                <MemberName>{member.name}</MemberName>
                                <MemberRole>{member.role}</MemberRole>
                                <MemberBio>{member.bio}</MemberBio>
                            </MemberInfo>
                        </MemberCard>
                    ))}
                </TeamGrid>

                <SectionSubtitle>Our Inspirations</SectionSubtitle>
                <TeamGrid>
                    {inspirations.map(person => (
                        <MemberCard key={person.id}>
                            <MemberImage image={person.image} />
                            <MemberInfo>
                                <MemberName>{person.name}</MemberName>
                                <MemberRole>{person.role}</MemberRole>
                                <MemberBio>{person.bio}</MemberBio>
                            </MemberInfo>
                        </MemberCard>
                    ))}
                </TeamGrid>
            </ContentWrapper>
        </AboutContainer>
    );
}