// AddPatient.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [condition, setCondition] = useState('');
    const [medicalHistory, setMedicalHistory] = useState(['']);
    const [treatmentPlan, setTreatmentPlan] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/patients', {
                name,
                age,
                condition,
                medicalHistory,
                treatmentPlan,
            });
            setName('');
            setAge('');
            setCondition('');
            setMedicalHistory(['']);
            setTreatmentPlan('');
            navigate('/');
        } catch (error) {
            console.error("There was an error adding the patient!", error);
        }
    };

    const handleMedicalHistoryChange = (index, value) => {
        const newMedicalHistory = [...medicalHistory];
        newMedicalHistory[index] = value;
        setMedicalHistory(newMedicalHistory);
    };

    const addMedicalHistoryField = () => {
        setMedicalHistory([...medicalHistory, '']);
    };

    const removeMedicalHistoryField = (index) => {
        const newMedicalHistory = medicalHistory.filter((_, i) => i !== index);
        setMedicalHistory(newMedicalHistory);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">Add Patient</h1>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            min={4}
                            max={86}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="condition">Condition</label>
                        <input
                            type="text"
                            id="condition"
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Medical History Fields */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Medical History</label>
                        {medicalHistory.map((history, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={history}
                                    onChange={(e) => handleMedicalHistoryChange(index, e.target.value)}
                                    className="flex-grow p-3 border border-gray-300 rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeMedicalHistoryField(index)}
                                    className="ml-2 text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addMedicalHistoryField}
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Add Medical History
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="treatmentPlan">Treatment Plan</label>
                        <input
                            type="text"
                            id="treatmentPlan"
                            value={treatmentPlan}
                            onChange={(e) => setTreatmentPlan(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Add Patient
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPatient;
