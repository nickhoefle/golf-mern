const mongoose = require('mongoose');

const GolfOutingSchema = new mongoose.Schema({
    user: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfCourse', required: true },
    scores: [{ type: Number, required: true }]
});

const GolfOuting = mongoose.model('GolfOuting', GolfOutingSchema);

module.exports = GolfOuting;
