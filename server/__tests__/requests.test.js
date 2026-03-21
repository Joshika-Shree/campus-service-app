const request = require('supertest');
const app = require('../server');
const db = require('../database');

describe('Requests API', () => {
    afterAll((done) => {
        db.close(done);
    });

    it('should pass health check', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('ok');
    });

    it('should create a new service request', async () => {
        const res = await request(app)
            .post('/api/requests')
            .send({
                category: 'IT',
                description: 'Wi-Fi is down in the library',
                priority: 'High'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe('success');
        expect(res.body.data).toHaveProperty('id');
    });
});
