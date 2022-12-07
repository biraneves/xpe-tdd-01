function calcularMontante(capital, taxa, periodos) {
    let montante = arredondar(capital * Math.pow(1 + taxa, periodos - 1));

    return montante;
}

function arredondar(valor) {
    const precisao = 100;
    const valorArredondado =
        Math.round((valor + Number.EPSILON) * precisao) / precisao;

    return valorArredondado;
}

function calcularPrestacoes(montante, numeroParcelas) {
    const prestacaoBase = arredondar(montante / numeroParcelas);
    const resultado = Array(numeroParcelas).fill(prestacaoBase);

    let somaPrestacoes = resultado.reduce((a, t) => a + t);
    let diferenca = montante - somaPrestacoes;
    let i = 0;

    while (diferenca != 0) {
        resultado[i] += 0.01;
        somaPrestacoes = resultado.reduce((a, t) => a + t);
        diferenca = montante - somaPrestacoes;
        i++;
    }

    return resultado;
}

module.exports = {
    calcularMontante,
    arredondar,
    calcularPrestacoes,
};
