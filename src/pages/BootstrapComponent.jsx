/* eslint-disable no-unused-vars */
// src/components/BootstrapComponent.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const BootstrapComponent = () => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          <h1>Responsive Layout with Bootstrap</h1>
        </Col>
        <Col xs={6} md={4}>
          <p>Sidebar</p>
        </Col>
      </Row>
    </Container>
  );
};

export default BootstrapComponent;
