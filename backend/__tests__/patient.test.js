const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Patient = require('../models/Patient');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Patient API', () => {
    it('should create a new patient', async () => {
        const res = await request(app)
            .post('/api/patients')
            .send({
                name: 'Test Patient',
                age: 30,
                condition: 'Test Condition'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    it('should get a list of patients', async () => {
        const res = await request(app).get('/api/patients');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.patients)).toBeTruthy();
    });
});