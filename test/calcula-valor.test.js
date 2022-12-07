const calculaValor = require('../src/calcula-valor');

describe('calcularMontante', () => {
    test('Com uma prestação, o montante é igual ao capital', () => {
        // Operação
        const montante = calculaValor.calcularMontante(100, 0.0175, 1);

        // Resultado ou comportamento esperado
        expect(montante).toBe(100);
    });

    test('Com 4 prestações, o montante é acrescido de juro.', () => {
        // Operação
        const montante = calculaValor.calcularMontante(500, 0.025, 4);

        // Resultado ou comportamento esperado
        expect(montante).toBe(538.45);
    });
});

describe('arredondar', () => {
    test('Arredondar para duas casas decimais', () => {
        const resultado = calculaValor.arredondar(538.4453124999998);
        expect(resultado).toBe(538.45);
    });
});
