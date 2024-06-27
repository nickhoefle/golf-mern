const mongoose = require('mongoose');

const CourseReviewSchema = new mongoose.Schema({
    user: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfCourse', required: true },
    overallExperienceRating: { type: Number, required: true },
    valueRating: { type: Number, required: true },
    grassRating: { type: Number, required: true },
    greensRating: { type: Number, required: true },
    difficultyMatchesSkillRating: { type: Number, required: true },
    congestionRating: { type: Number, required: true },
});

const CourseReview = mongoose.model('CourseReview', CourseReviewSchema);

module.exports = CourseReview;