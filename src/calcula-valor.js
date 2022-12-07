function calcularMontante(capital, taxa, periodos) {
    let montante = arredondar(capital * Math.pow(1 + taxa, periodos - 1));

    return montante;
}

function arredondar(valor) {
    const precisao = 100;
    const valorArredondado = Math.round(valor * precisao) / precisao;

    return valorArredondado;
}

module.exports = {
    calcularMontante,
    arredondar,
};
