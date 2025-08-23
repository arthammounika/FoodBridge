const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// -------------------- MongoDB Connection --------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error(err));

// -------------------- SCHEMAS & MODELS --------------------

// Donations
const donationSchema = new mongoose.Schema({
  donorName: String,
  foodType: String,
  quantity: String,
  location: String,
  status: { type: String, default: "Pending" }
}, { timestamps: true });

const Donation = mongoose.model("Donation", donationSchema);

// Food Requests
const requestSchema = new mongoose.Schema({
  name: String,
  address: String,
  foodType: String,
  quantity: String,
  mobile: String,
  status: { type: String, default: "Pending" }
}, { timestamps: true });

const Request = mongoose.model("Request", requestSchema);

// Contact Messages
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

// -------------------- ROUTES --------------------

// --- Donations ---
app.get("/donations", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/donations", async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    await newDonation.save();
    res.json(newDonation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Food Requests ---
app.get("/requests", async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/requests", async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Contact Messages ---
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/contacts", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json(newContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- SERVER START --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
