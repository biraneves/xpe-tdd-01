const calculaValor = require('./calcula-valor');
const db = require('./db');

const taxaDeJuro = 0.025;

const consultar = async (nome, cpf, valor, parcelas) => {
    let cliente = await db.cliente.findOne({
        where: { CPF: cpf },
    });

    if (cliente == null) {
        cliente = await db.cliente.create({
            Nome: nome,
            CPF: cpf,
        });
    }

    const ultimaConsulta = await db.consulta.findOne({
        where: { ClienteCPF: cpf },
        order: [[db.sequelize.col('createdAt'), 'DESC']],
    });

    if (ultimaConsulta) {
        const diferenca = Math.abs(
            ultimaConsulta.createdAt.getTime() - new Date().getTime(),
        );
        const diferencaDias = Math.round(diferenca / (1000 * 60 * 60 * 24));

        if (diferencaDias <= 30) {
            throw new Error(
                `Última consulta realizada há ${diferencaDias} dias.`,
            );
        }
    }

    const montante = calculaValor.calcularMontante(valor, taxaDeJuro, parcelas);
    const prestacoes = calculaValor.calcularPrestacoes(montante, parcelas);

    const novaConsulta = {
        Valor: valor,
        NumPrestacoes: parcelas,
        Juro: taxaDeJuro,
        Prestacoes: prestacoes.join(', '),
        ClienteCPF: cliente.CPF,
        Montante: montante,
    };

    await db.consulta.create(novaConsulta);

    return {
        montante: montante,
        juro: taxaDeJuro,
        parcelas: prestacoes.length,
        primeiraPrestacao: prestacoes[0],
        prestacoes: prestacoes,
    };
};

module.exports = {
    consultar,
};
