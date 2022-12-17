const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');

describe('Testes de integração', () => {
    beforeEach(async () => {
        await db.cliente.destroy({ where: {} });
        await db.consulta.destroy({ where: {} });
    });

    afterAll(async () => await db.sequelize.close());

    const clienteJoao = {
        Nome: 'João Silva',
        CPF: '000.000.000-00',
    };

    const resultadoEsperado = {
        montante: 106.9,
        juro: 0.025,
        parcelas: 3,
        primeiraPrestacao: 35.64,
        prestacoes: [35.64, 35.63, 35.63],
    };

    const payloadRequest = {
        nome: clienteJoao.Nome,
        CPF: clienteJoao.CPF,
        valor: 101.75,
        parcelas: 3,
    };

    test('Responder HTTP 200 na raiz', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
    });

    // TODO: Teste do Cenário 1

    test('Cenário 2', async () => {
        db.cliente.create(clienteJoao);
        db.consulta.create({
            Valor: 1,
            NumPrestacoes: 2,
            Juro: 0.5,
            Prestacoes: '1, 1',
            ClienteCPF: clienteJoao.CPF,
            Montante: 2,
            createdAt: '2016-06-22 19:10:25-07',
        });

        const res = await request(app)
            .post('/consulta-credito')
            .send(payloadRequest);
        expect(res.body).toMatchSnapshot(resultadoEsperado);
        expect(res.status).toBe(201);

        const count = await db.consulta.count({
            where: { ClienteCPF: clienteJoao.CPF },
        });
        expect(count).toBe(2);
    });

    test('Cenário 3', async () => {
        const res1 = await request(app)
            .post('/consulta-credito')
            .send(payloadRequest);

        expect(res1.body).toMatchSnapshot(resultadoEsperado);

        const res2 = await request(app)
            .post('/consulta-credito')
            .send(payloadRequest);

        expect(res2.body.erro).toBeDefined();
        expect(res2.status).toBe(405);
    });

    test('Cenário 4', async () => {
        const res = await request(app).post('/consulta-credito').send({});

        expect(res.body.erro).toBeDefined();
        expect(res.status).toBe(400);
    });
});