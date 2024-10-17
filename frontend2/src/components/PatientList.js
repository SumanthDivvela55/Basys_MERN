import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const patientsPerPage = 8;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
            const res = await axios.get('https://basys-mern.onrender.com/api/patients');
            setPatients(res.data);
        };
        fetchPatients();
    }, []);

    // Filter patients based on search term
    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

    // Get current patients for the page
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Dynamic page numbers, show 4 at a time
    const getPageNumbers = () => {
        let startPage, endPage;

        if (currentPage <= 3) {
            startPage = 1;
            endPage = Math.min(4, totalPages);
        } else if (currentPage > totalPages - 2) {
            startPage = Math.max(1, totalPages - 3);
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 1;
        }

        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    // Check if the user is logged in
    const isLoggedIn = !!localStorage.getItem('token');

    // Handle logout
    const handleLogout = async () => {
        // Call the backend to log out the user (if necessary)
        try {
            await axios.post('https://basys-mern.onrender.com/api/logout');
        } catch (error) {
            console.error('Logout failed:', error);
        }
        // Remove the token from local storage
        localStorage.removeItem('token');
        // Redirect to login or home page
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-5xl font-bold text-gray-800">Patient List</h1>
                    {isLoggedIn ? (
                        <div className="flex space-x-2">
                            <Link to="/add-patient">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                                    Add Patient
                                </button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                                Login
                            </button>
                        </Link>
                    )}
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-6">
                    <input
                        type="text"
                        placeholder="Search patients..."
                        className="w-full p-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 ease-in-out"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Patient List */}
                <ul className="space-y-4 max-w-4xl mx-auto">
                    {currentPatients.map(patient => (
                        <li
                            key={patient._id}
                            className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out"
                        >
                            <Link
                                to={`/patient/${patient._id}`}
                                className="flex justify-between items-center text-blue-700 font-semibold text-3xl hover:text-blue-900"
                            >
                                <span>{patient.name}</span>
                                <span className="text-lg text-gray-500">{patient.age} years</span>
                            </Link>
                            <p className="mt-2 text-gray-600 text-xl">
                                <span className="font-medium">Condition:</span>
                                <span className="text-red-500"> {patient.condition}</span>
                            </p>
                        </li>
                    ))}
                </ul>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                    >
                        Previous
                    </button>
                    {getPageNumbers().map((number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-4 py-2 mx-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded hover:bg-gray-400 transition`}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PatientList;
