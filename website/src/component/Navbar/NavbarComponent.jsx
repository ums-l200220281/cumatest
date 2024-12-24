import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { FaBars } from 'react-icons/fa';
import './NavbarComponent.css';

const NavbarComponent = () => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrolled, setScrolled] = useState(false); // State to track scroll

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/profile/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Handle scroll event
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}> {/* Add scrolled class */}
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        profile.map((profileData, index) => (
          <Navbar key={index} expand="lg" className="custom-navbar">
            <Container>
              <Navbar.Brand className="brand-container">
                <img
                  alt="Logo"
                  src={profileData.logo}
                  className="navbar-logo"
                />
                <span className="brand-name">{profileData.name}</span>
              </Navbar.Brand>
              
              <Navbar.Toggle aria-controls="main-navbar-nav">
                <FaBars />
              </Navbar.Toggle>

              <Navbar.Collapse id="main-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link as={Link} to="home" smooth={true} duration={500}>
                    Home
                  </Nav.Link>
                  
                  <NavDropdown title="Menu" id="navbar-menu-dropdown">
                    <NavDropdown.Item as={Link} to="utama-menu" smooth={true} duration={500}>
                      Menu Utama
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="pembuka-menu" smooth={true} duration={500}>
                      Menu Pembuka
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="penutup-menu" smooth={true} duration={500}>
                      Menu Penutup
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link as={Link} to="faq" smooth={true} duration={500}>
                    FAQ
                  </Nav.Link>

                  <Nav.Link as={Link} to="footer" smooth={true} duration={500}>
                    Contact Us
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        ))
      )}
    </div>
  );
};

export default NavbarComponent;