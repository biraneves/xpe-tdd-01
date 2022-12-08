const request = require('supertest');
const app = require('../src/app');

describe('Testes de integração', () => {
    test('Responder HTTP 200 na raiz.', () => {
        return request(app)
            .get('/')
            .then((res) => expect(res.status).toBe(200));
    });

    test('Responder HTTP 200 na raiz', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
    });
});
