import { useState } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";

function RequestFood() {
  const [form, setForm] = useState({ requesterName: "", foodNeeded: "", peopleCount: "", location: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/requests", form);
    alert("Food request submitted!");
    setForm({ requesterName: "", foodNeeded: "", peopleCount: "", location: "" });
  };

  return (
    <Container className="mt-5">
      <h2>Request Food</h2>
      <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow">
        <input className="form-control mb-2" placeholder="Your Name" value={form.requesterName} onChange={e => setForm({ ...form, requesterName: e.target.value })} />
        <input className="form-control mb-2" placeholder="Food Needed" value={form.foodNeeded} onChange={e => setForm({ ...form, foodNeeded: e.target.value })} />
        <input className="form-control mb-2" type="number" placeholder="People Count" value={form.peopleCount} onChange={e => setForm({ ...form, peopleCount: e.target.value })} />
        <input className="form-control mb-2" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
        <Button type="submit" variant="primary">Submit Request</Button>
      </form>
    </Container>
  );
}
export default RequestFood;
