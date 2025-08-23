// src/pages/Donate.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

function Donate() {
  const [formData, setFormData] = useState({
    functionName: '',
    foodName: '',
    mobileNo: '',
    description: '',
    persons: '',
    hygieneLevel: 5,
    foodType: 'Beverage',
    cookedTime: '',
    expiryTime: '',
    city: '',
    area: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/donations', formData); // Backend endpoint
      alert('Donation submitted successfully!');
      setFormData({
        functionName: '',
        foodName: '',
        mobileNo: '',
        description: '',
        persons: '',
        hygieneLevel: 5,
        foodType: 'Beverage',
        cookedTime: '',
        expiryTime: '',
        city: '',
        area: '',
      });
    } catch (err) {
      console.error(err);
      alert('Error submitting donation.');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center text-danger">Enter following details to Donate Food</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Function Name</Form.Label>
          <Form.Control
            type="text"
            name="functionName"
            value={formData.functionName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Food Name</Form.Label>
          <Form.Control
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mobile No.</Form.Label>
          <Form.Control
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>How many Persons can feed?</Form.Label>
          <Form.Control
            type="number"
            name="persons"
            value={formData.persons}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hygiene Level</Form.Label>
          <Form.Select
            name="hygieneLevel"
            value={formData.hygieneLevel}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5].map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Food Type</Form.Label>
          <Form.Select
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
          >
            {['Beverage', 'Snacks', 'Meal'].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cooked Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="cookedTime"
            value={formData.cookedTime}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Expected Expiry Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="expiryTime"
            value={formData.expiryTime}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Area</Form.Label>
          <Form.Control
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary">Submit Donation</Button>
      </Form>
    </Container>
  );
}

export default Donate;
