const express = require('express');
const router = express.Router();
const GolfCourse = require('../models/GolfCourse');

// Get all golf courses
router.get('/golf-courses', async (req, res) => {
  try {
    const golfCourses = await GolfCourse.find();
    res.json(golfCourses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new golf course
router.post('/golf-courses', async (req, res) => {
  const golfCourse = new GolfCourse({
    name: req.body.name,
    location: req.body.location,
    holes: req.body.holes
  });
  try {
    const newGolfCourse = await golfCourse.save();
    res.status(201).json(newGolfCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
