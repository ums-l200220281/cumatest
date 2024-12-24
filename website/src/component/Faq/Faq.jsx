import { Accordion, Row, Col, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import './Faq.css';

const Faq = () => {
  const [faq, setFaq] = useState([]);

  const fetchFaqData = () => {
    fetch('http://localhost:8000/api/faq/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFaq(data);
      })
      .catch((error) => {
        console.error('Error fetching FAQ data:', error);
      });
  };

  useEffect(() => {
    fetchFaqData();
  }, []);

  return (
    <Container className="faq-section" id='faq'>
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <Row>
        {faq.map((item) => (
          <Col md={6} className="pt-4" key={item.id}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey={item.id.toString()}>
                <Accordion.Header>{item.question}</Accordion.Header>
                <Accordion.Body>{item.answer}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Faq;