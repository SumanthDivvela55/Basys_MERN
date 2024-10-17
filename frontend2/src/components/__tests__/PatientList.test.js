import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PatientList from '../PatientList';
import { getPatients } from '../../services/patientService';

jest.mock('../../services/patientService');

describe('PatientList Component', () => {
    it('renders patient list', async () => {
        getPatients.mockResolvedValue({
            data: {
                patients: [
                    { _id: '1', name: 'John Doe' },
                    { _id: '2', name: 'Jane Smith' }
                ],
                currentPage: 1,
                totalPages: 1
            }
        });

        render(<PatientList />);

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        });
    });
});