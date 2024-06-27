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

//Get golf course by id
router.get('/golf-courses/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        const golfCourse = await GolfCourse.findById(courseId); 
        if (!golfCourse) {
            return res.status(404).json({ message: 'Golf course not found' });
        }
        res.json(golfCourse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new golf course
router.post('/golf-courses', async (req, res) => {
    const { name, location, holes, pars, teeBoxes } = req.body;
    const golfCourse = new GolfCourse({
        name,
        location,
        holes,
        pars,
        teeBoxes
    });

    try {
        const newGolfCourse = await golfCourse.save();
        res.status(201).json(newGolfCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update golf course by id
router.put('/golf-courses/:id', async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body; 

    try {
        const updatedCourse = await GolfCourse.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Golf course not found' });
        }

        res.json(updatedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
