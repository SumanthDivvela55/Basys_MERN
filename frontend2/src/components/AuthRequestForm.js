import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AuthRequestForm() {
    const [formData, setFormData] = useState({
        treatmentType: '',
        insurancePlan: '',
        dateOfService: '',
        diagnosisCode: '',
        doctorNotes: ''
    });
    const [errors, setErrors] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const patientId = new URLSearchParams(location.search).get('patientId');

    // Form validation function
    const validate = () => {
        let formErrors = {};

        if (!formData.treatmentType) {
            formErrors.treatmentType = 'Treatment type is Required';
        }
        if (!formData.insurancePlan) {
            formErrors.insurancePlan = 'Insurance plan is Required';
        }
        if (!formData.dateOfService) {
            formErrors.dateOfService = 'Date of service is Required';
        }
        if (!formData.diagnosisCode) {
            formErrors.diagnosisCode = 'Diagnosis code is Required';
        } else if (!/^[A-Za-z0-9]+$/.test(formData.diagnosisCode)) {
            formErrors.diagnosisCode = 'Diagnosis code must be alphanumeric';
        }

        return formErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                await axios.post('http://localhost:5000/api/auth/request', {
                    ...formData,
                    patientId
                });
                navigate(`/patient/${patientId}`);
            } catch (err) {
                console.error('Error submitting auth request:', err);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 py-10 flex items-center justify-center">
            <div className="bg-white p-10 max-w-2xl mx-auto rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center animate-slide-up">
                    Submit Prior Authorization Request
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            Treatment Type
                        </label>
                        <input
                            type="text"
                            name="treatmentType"
                            value={formData.treatmentType}
                            onChange={handleChange}
                            
                            className={`w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300 ${errors.treatmentType ? 'border-red-500' : ''}`}
                        />
                        {errors.treatmentType && <p className="text-red-500 text-sm">{errors.treatmentType}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            Insurance Plan
                        </label>
                        <input
                            type="text"
                            name="insurancePlan"
                            value={formData.insurancePlan}
                            onChange={handleChange}
                            
                            className={`w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300 ${errors.insurancePlan ? 'border-red-500' : ''}`}
                        />
                        {errors.insurancePlan && <p className="text-red-500 text-sm">{errors.insurancePlan}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            Date of Service
                        </label>
                        <input
                            type="date"
                            name="dateOfService"
                            value={formData.dateOfService}
                            onChange={handleChange}
                            
                            className={`w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300 ${errors.dateOfService ? 'border-red-500' : ''}`}
                        />
                        {errors.dateOfService && <p className="text-red-500 text-sm">{errors.dateOfService}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            Diagnosis Code
                        </label>
                        <input
                            type="text"
                            name="diagnosisCode"
                            value={formData.diagnosisCode}
                            onChange={handleChange}
                            
                            className={`w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300 ${errors.diagnosisCode ? 'border-red-500' : ''}`}
                        />
                        {errors.diagnosisCode && <p className="text-red-500 text-sm">{errors.diagnosisCode}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            Doctor's Notes
                        </label>
                        <textarea
                            name="doctorNotes"
                            value={formData.doctorNotes}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-transform duration-300 hover:bg-purple-700 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AuthRequestForm;
