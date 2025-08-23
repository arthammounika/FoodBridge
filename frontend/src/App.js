import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Nav, Container, Button, Card, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// -------------------- HOME PAGE --------------------
function Home() {
  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Food Saver</h1>
          <p>Join us in the mission to eliminate hunger and save food</p>
        </div>
      </div>

      <Container className="my-5">
        <h2 className="text-center mb-4">Our Blogs</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="blog-card h-100">
              <Card.Img variant="top" src="/images/fight.jpeg" alt="Fight Hunger" />
              <Card.Body>
                <Card.Title>Fight Hunger</Card.Title>
                <Card.Text>
                  Join us in making sure no food goes to waste while people go hungry.
                </Card.Text>
                <Button variant="primary">Read More</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="blog-card h-100">
              <Card.Img variant="top" src="/images/volunteer.webp" alt="Be a Volunteer" />
              <Card.Body>
                <Card.Title>Be a Volunteer</Card.Title>
                <Card.Text>
                  Contribute your time to help distribute meals to the needy.
                </Card.Text>
                <Button variant="primary">Read More</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="blog-card h-100">
              <Card.Img variant="top" src="/images/community.jpeg" alt="Build Community" />
              <Card.Body>
                <Card.Title>Build Community</Card.Title>
                <Card.Text>
                  Together, we can create a supportive network to end hunger.
                </Card.Text>
                <Button variant="primary">Read More</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

// -------------------- DONATE PAGE --------------------
function Donate() {
  const [donations, setDonations] = useState([]);
  const [form, setForm] = useState({ donorName: "", foodType: "", quantity: "", location: "" });

  useEffect(() => { fetchDonations(); }, []);

  const fetchDonations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/donations");
      setDonations(res.data);
    } catch (err) { console.error("Error fetching donations:", err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/donations", form);
      setForm({ donorName: "", foodType: "", quantity: "", location: "" });
      fetchDonations();
    } catch (err) { console.error("Error submitting donation:", err); }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">🍲 Donate Food</h2>
      <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow mb-5">
        <input className="form-control mb-2" placeholder="Donor Name" value={form.donorName} onChange={(e)=>setForm({...form, donorName:e.target.value})} required />
        <input className="form-control mb-2" placeholder="Food Type" value={form.foodType} onChange={(e)=>setForm({...form, foodType:e.target.value})} required />
        <input className="form-control mb-2" placeholder="Quantity" value={form.quantity} onChange={(e)=>setForm({...form, quantity:e.target.value})} required />
        <input className="form-control mb-2" placeholder="Location" value={form.location} onChange={(e)=>setForm({...form, location:e.target.value})} required />
        <Button type="submit" variant="success" className="w-100">Donate</Button>
      </form>

      <h3 className="text-center mb-4">📋 Recent Donations</h3>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {donations.length>0 ? donations.map((d)=>(
          <Card key={d._id} style={{width:"18rem"}} className="shadow">
            <Card.Body>
              <Card.Title>{d.donorName}</Card.Title>
              <Card.Text>
                {d.quantity} of {d.foodType}<br/>
                📍 {d.location}<br/>
                Status: {d.status || "Pending"}
              </Card.Text>
            </Card.Body>
          </Card>
        )) : <p className="text-muted">No donations yet.</p>}
      </div>
    </Container>
  );
}

// -------------------- REQUEST FOOD PAGE --------------------
function Request() {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({ name: "", address: "", foodType: "", quantity: "", mobile: "" });

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/requests");
      setRequests(res.data);
    } catch (err) { console.error("Error fetching requests:", err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/requests", formData);
      setFormData({ name: "", address: "", foodType: "", quantity: "", mobile: "" });
      fetchRequests();
    } catch (err) { console.error("Error submitting request:", err); }
  };

  const handleRemoveOldest = async () => {
    try {
      await axios.delete("http://localhost:5000/requests/oldest");
      fetchRequests(); // refresh list after deletion
    } catch (err) { console.error("Error removing oldest request:", err); }
  };

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Request for Food</h2>

      <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow mb-3">
        <input className="form-control mb-2" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
        <input className="form-control mb-2" placeholder="Address" name="address" value={formData.address} onChange={handleChange} required />
        <input className="form-control mb-2" placeholder="Food Type" name="foodType" value={formData.foodType} onChange={handleChange} required />
        <input className="form-control mb-2" placeholder="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
        <input className="form-control mb-2" placeholder="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
        <Button type="submit" variant="primary" className="w-100">Submit Request</Button>
      </form>

      {/* Remove Oldest Request Button */}
      {requests.length > 0 && (
        <Button variant="danger" className="mb-3 w-100" onClick={handleRemoveOldest}>
          Remove Oldest Request
        </Button>
      )}

      <h3 className="text-center mb-4">📋 Recent Food Requests</h3>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {requests.length>0 ? requests.map((r)=>(
          <Card key={r._id} style={{width:"18rem"}} className="shadow">
            <Card.Body>
              <Card.Title>{r.name}</Card.Title>
              <Card.Text>
                {r.quantity} of {r.foodType}<br/>
                📍 {r.address}<br/>
                📞 {r.mobile}<br/>
                Status: {r.status || "Pending"}
              </Card.Text>
            </Card.Body>
          </Card>
        )) : <p className="text-muted">No food requests yet.</p>}
      </div>
    </Container>
  );
}

// -------------------- CONTRIBUTORS PAGE --------------------
function Contributors() {
  const contributors = [
    { name: "Alice", contribution: "Food Donation" },
    { name: "Bob", contribution: "Volunteer" },
    { name: "Charlie", contribution: "Logistics" }
  ];

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Contributors</h2>
      <Row className="g-4">
        {contributors.map((c,i)=>(
          <Col md={4} key={i}>
            <Card className="h-100 shadow">
              <Card.Body>
                <Card.Title>{c.name}</Card.Title>
                <Card.Text>{c.contribution}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

// -------------------- CONTACT PAGE --------------------
function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [messages, setMessages] = useState([]);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/contacts");
      setMessages(res.data);
    } catch (err) { console.error(err); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/contacts", formData);
      setFormData({ name: "", email: "", message: "" });
      fetchMessages();
    } catch (err) { console.error(err); }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow mb-4">
        <input className="form-control mb-2" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
        <input className="form-control mb-2" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
        <textarea className="form-control mb-2" placeholder="Message" name="message" value={formData.message} onChange={handleChange} rows="4" required />
        <Button type="submit" variant="success" className="w-100">Send Message</Button>
      </form>

      <h3 className="text-center mb-4">📋 Recent Messages</h3>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {messages.length>0 ? messages.map((m)=>(
          <Card key={m._id} style={{width:"18rem"}} className="shadow">
            <Card.Body>
              <Card.Title>{m.name}</Card.Title>
              <Card.Text>
                📧 {m.email}<br/>
                {m.message}<br/>
                🕒 {new Date(m.createdAt).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        )) : <p className="text-muted">No messages yet.</p>}
      </div>
    </Container>
  );
}

// -------------------- MAIN APP --------------------
function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">🍴 FoodSaver</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/donate">Donate</Nav.Link>
              <Nav.Link as={Link} to="/request">Request Food</Nav.Link>
              <Nav.Link as={Link} to="/contributors">Contributors</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
            </Nav>
            <Button variant="outline-light" className="me-2">Profile</Button>
            <Button variant="danger">Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/request" element={<Request />} />
        <Route path="/contributors" element={<Contributors />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
