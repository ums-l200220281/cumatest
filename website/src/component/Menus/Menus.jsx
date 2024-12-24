import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import './Menus.css'; // Import the CSS file

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenuData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/menus/');
      if (!response.ok) {
        throw new Error('Failed to fetch menu data');
      }
      const data = await response.json();
      setMenus(data);
    } catch (error) {
      console.error('Error fetching menu data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const displayMenusByCategory = (category) => {
    const filteredMenu = menus.filter((menu) => menu.category === category);

    if (filteredMenu.length === 0) {
      return <p>No menu available for {category}</p>;
    }

    return (
      <Row className="show-grid row-no-padding flex-row pt-4" lg={4} gap={3}>
        {filteredMenu.map((menu) => (
          <Col md={4} className="pt-4" key={menu.id}>
            <Card className="menu-card">
              <Card.Img
                variant="top"
                src={menu.image}
                className="img-thumbnail"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
              <Card.Body className="text-center"> {/* Center text in card body */}
                <Card.Title className="menu-title">{menu.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted price">
                  Rp.{menu.price}000,- {/* Centered price */}
                </Card.Subtitle>
                <Card.Text className="menu-description">
                  {menu.description.length > 100 ? `${menu.description.substring(0, 100)}...` : menu.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Container>
      <h2 id="utama-menu">Utama</h2>
      {loading ? <p>Loading...</p> : displayMenusByCategory('Utama')}

      <h2 id="pembuka-menu">Pembuka</h2>
      {loading ? <p>Loading...</p> : displayMenusByCategory('Pembuka')}

      <h2 id="penutup-menu">Penutup</h2>
      {loading ? <p>Loading...</p> : displayMenusByCategory('Penutup')}
    </Container>
  );
};

export default Menus;