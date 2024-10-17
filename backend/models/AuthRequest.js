const mongoose = require('mongoose');

const AuthRequestSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    treatmentType: { type: String, required: true },
    insurancePlan: { type: String, required: true },
    dateOfService: { type: Date, required: true },
    diagnosisCode: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
    doctorNotes: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuthRequest', AuthRequestSchema);