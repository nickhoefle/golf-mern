const express = require('express');
const router = express.Router();
const CourseReview = require('../models/CourseReview');

// Get course reviews
router.get('/course-reviews', async (req, res) => {
    try {
        const { course, user } = req.query;
        let courseReviews;

        if (user) {
            // If both course and user are provided, filter by both
            courseReviews = await CourseReview.find({ course, user });
        } else if (course) {
            // If only course is provided, filter by course
            courseReviews = await CourseReview.find({ course });
        } else {
            // If neither course nor user is provided, return an error
            return res.status(400).json({ message: 'Course ID is required' });
        }

        res.json(courseReviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new course review
router.post('/course-reviews', async (req, res) => {
    const {
        user,
        course,
        overallExperienceRating,
        valueRating,
        grassRating,
        greensRating,
        difficultyMatchesSkillRating,
        congestionRating
    } = req.body;

    const courseReview = new CourseReview({
        user,
        course,
        overallExperienceRating,
        valueRating,
        grassRating,
        greensRating,
        difficultyMatchesSkillRating,
        congestionRating,
    });

    try {
        const newCourseReview = await courseReview.save();
        res.status(201).json(newCourseReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update course review by ID
router.put('/course-reviews/:id', async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
        const updatedReview = await CourseReview.findByIdAndUpdate(id, updateFields, { new: true });
        res.json(updatedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
