const AuthRequest = require('../models/AuthRequest');

exports.createAuthRequest = async (req, res) => {
    const authRequest = new AuthRequest(req.body);
    try {
        const newAuthRequest = await authRequest.save();
        res.status(201).json(newAuthRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAuthRequests = async (req, res) => {
    try {
        const authRequests = await AuthRequest.find().populate('patientId');
        res.json(authRequests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateAuthRequest = async (req, res) => {
    try {
        const updatedAuthRequest = await AuthRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAuthRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Add more methods as needed