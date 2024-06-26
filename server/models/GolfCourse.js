const mongoose = require('mongoose');

const GolfCourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    holes: { type: Number, required: true },
    pars: [{ type: Number, required: true }],
    teeBoxes: [
        {
            color: { type: String, required: true },
            yardages: [{ type: Number, required: true }]
        }
    ]
});

const GolfCourse = mongoose.model('GolfCourse', GolfCourseSchema);

module.exports = GolfCourse;
