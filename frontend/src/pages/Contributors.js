import { useState } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";

function Contributors() {
  const [form, setForm] = useState({ name: "", contributionType: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/contributors", form);
    alert("Contributor details saved!");
    setForm({ name: "", contributionType: "", email: "" });
  };

  return (
    <Container className="mt-5">
      <h2>Become a Contributor</h2>
      <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow">
        <input className="form-control mb-2" placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="form-control mb-2" placeholder="Contribution Type (Money, Food, Service)" value={form.contributionType} onChange={e => setForm({ ...form, contributionType: e.target.value })} />
        <input className="form-control mb-2" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <Button type="submit" variant="warning">Submit</Button>
      </form>
    </Container>
  );
}
export default Contributors;
