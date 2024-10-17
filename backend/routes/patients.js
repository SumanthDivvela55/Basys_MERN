// server/routes/patients.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const Patient = require('../models/Patient');

// Route to get all patients
router.get('/', patientController.getPatients);

// Route to get a single patient by ID
router.get('/:id', patientController.getPatient);

// Route to create a new patient
router.post('/', patientController.createPatient);

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const patients = await Patient.find()
            .skip(skip)
            .limit(limit);

        const total = await Patient.countDocuments();

        res.json({
            patients,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPatients: total
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add update and delete methods as needed (optional for now)
// router.put('/:id', patientController.updatePatient);
// router.delete('/:id', patientController.deletePatient);

module.exports = router;
