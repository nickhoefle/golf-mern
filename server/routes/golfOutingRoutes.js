const express = require('express');
const router = express.Router();
const GolfOuting = require ('../models/GolfOuting');

// Get all golf outings
router.get('/golf-outings', async (req, res) => {
    try {
        const golfOutings = await GolfOuting.find();
        res.json(golfOutings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get golf outing by id
router.get('/golf-outings/course/:courseId', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const golfOutings = await GolfOuting.find({ course: courseId });

        if (!golfOutings || golfOutings.length === 0) {
            return res.status(404).json({ message: 'No golf outings found for this course' });
        }

        res.json(golfOutings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new golf course
router.post('/golf-outings', async (req, res) => {
    const { user, course, scores } = req.body;
    const golfOuting = new GolfOuting({
        user,
        course,
        scores
    });

    try {
        const newGolfOuting = await golfOuting.save();
        res.status(201).json(newGolfOuting);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
