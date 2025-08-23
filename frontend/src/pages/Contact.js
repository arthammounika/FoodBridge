import { useState } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/contacts", form);
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Container className="mt-5">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow">
        <input className="form-control mb-2" placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="form-control mb-2" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <textarea className="form-control mb-2" rows="3" placeholder="Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}></textarea>
        <Button type="submit" variant="info">Send</Button>
      </form>
    </Container>
  );
}
export default Contact;
