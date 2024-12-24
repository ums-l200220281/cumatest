import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillPhone,
  AiOutlineMail,
} from 'react-icons/ai';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  const [profile, setProfile] = useState([]);

  const fetchProfileData = () => {
    fetch('http://localhost:8000/api/profile/')
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <footer className="footer">
      <Container>
        {profile.map((profil) => (
          <Row key={profil.id} className="footer-content">
            <Col md={6} className="contact-info">
              <h4>Contact Us</h4>
              <hr />
              <p>{profil.address}</p>
              <p>
                <AiFillPhone size={27} /> {profil.phone}
              </p>
              <p>
                <AiOutlineMail size={27} /> {profil.email}
              </p>
            </Col>
            <Col md={6} className="social-media">
              <h4>Social Media</h4>
              <hr />
              <p>
                <AiFillFacebook size={35} />
                <a href={profil.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                  Facebook
                </a>
              </p>
              <p>
                <AiFillTwitterCircle size={35} />
                <a href={profil.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                  Twitter
                </a>
              </p>
              <p>
                <AiFillInstagram size={35} />
                <a href={profil.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                  Instagram
                </a>
              </p>
            </Col>
          </Row>
        ))}
      </Container>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()}Dibuat Oleh Kelompok Ono Gawean</p>
      </div>
    </footer>
  );
};

export default Footer;