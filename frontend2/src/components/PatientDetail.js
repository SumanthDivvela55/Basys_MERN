import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function PatientDetail() {
    const [patient, setPatient] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPatient = async () => {
            const res = await axios.get(`http://localhost:5000/api/patients/${id}`);
            setPatient(res.data);
        };
        fetchPatient();
    }, [id]);

    if (!patient) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 py-10 flex items-center justify-center">
            <div className="container mx-auto px-4 max-w-3xl bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                <h1 className="text-5xl font-bold text-gray-800 mb-4 animate-fade-in-down text-center">
                    {patient.name}
                </h1>
                <p className="text-lg text-gray-700 mb-2 text-center">
                    Age: <span className="text-green-600 font-semibold">{patient.age}</span>
                </p>
                <p className="text-lg text-gray-700 mb-6 text-center">
                    Condition: <span className="text-red-500 font-semibold">{patient.condition}</span>
                </p>

                <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4 border-b-2 border-green-300 pb-2">
                    Medical History
                </h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                    {patient.medicalHistory.map((item, index) => (
                        <li key={index} className="hover:text-green-500 transition-colors duration-300">
                            {item}
                        </li>
                    ))}
                </ul>

                <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4 border-b-2 border-green-300 pb-2">
                    Treatment Plan
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                    {patient.treatmentPlan || 'No treatment plan available'}
                </p>

                <div className="flex justify-center">
                    <Link
                        to={`/auth-request?patientId=${patient._id}`}
                        className="mt-6 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-xl"
                    >
                        Submit Prior Authorization Request
                    </Link>
                </div>
            </div>
        </div>



    );
}

export default PatientDetail;