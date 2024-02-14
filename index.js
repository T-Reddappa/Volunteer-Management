const express = require("express");
const app = express();
require("./db.js");

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const Volunteer = require("./models/volunteerModel");
const Event = require("./models/eventModel");

app.get("/", (req, res) => {
  res.send("Volunteer Management Application");
});

app.get("/volunteers", async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json({ volunteers: volunteers });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/volunteers/:id", async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    res.status(200).json({ volunteer: volunteer });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/volunteers", async (req, res) => {
  const volunteer = new Volunteer(req.body);
  try {
    const savedVolunteer = await volunteer.save();
    res.status(200).json({ volunteer: savedVolunteer });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.put("/volunteers/:id", async (req, res) => {
  const volunteerId = req.params.id;
  const updatedVolunteerDetails = req.body;
  try {
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      volunteerId,
      updatedVolunteerDetails,
      { new: true },
    );
    res.status(200).json({ volunteer: updatedVolunteer });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.delete("/volunteers/:id", async (req, res) => {
  const volunteerId = req.params.id;
  try {
    const deletedVolunteer = await Volunteer.findByIdAndDelete(volunteerId);
    res.status(200).json({ volunteer: deletedVolunteer });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events: events });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/events/:id", async (req, res) => {
  try {
    console.log;
    const event = await Event.findById(req.params.id);
    res.status(200).json({ event: event });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/events", async (req, res) => {
  const event = new Event(req.body);
  try {
    const savedEvent = await event.save();
    res.status(200).json({ event: savedEvent });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.put("/events/:id", async (req, res) => {
  const eventId = req.params.id;
  const updatedEventDetails = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      updatedEventDetails,
      { new: true },
    );
    res.status(200).json({ event: updatedEvent });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.delete("/events/:id", async (req, res) => {
  const eventId = req.params.id;
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    res.status(200).json({ event: deletedEvent });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
