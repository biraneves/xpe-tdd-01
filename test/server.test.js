const supertest = require('supertest');

const request = supertest('http://localhost:3000');

test('Servidor na porta 3000', async () => {
    const resposta = await request.get('/');
    expect(resposta.status).toBe(200);
});
