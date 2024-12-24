import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { AiFillFacebook, AiFillTwitterCircle, AiFillInstagram, AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import './Home.css'; // Import the CSS file

const Home = () => {
  const [profile, setProfile] = useState([]);

  const fetchProfileData = () => {
    fetch('http://localhost:8000/api/profile/')
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      });
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div id='home'>
      {profile.map((profil) => (
        <Container fluid key={profil.id}>
          <Row className="align-items-center">
            <Col sm={12} className="text-section">
              <h4 className="title-box">{profil.name}</h4>
              <hr />
              <p className="description">{profil.about_us}</p> {/* Display full description */}
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <AiFillFacebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <AiFillTwitterCircle />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <AiFillInstagram />
                </a>
                <a href="tel:+1234567890">
                  <AiFillPhone />
                </a>
                <a href="mailto:example@example.com">
                  <AiOutlineMail />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      ))}
    </div>
  );
};

export default Home;