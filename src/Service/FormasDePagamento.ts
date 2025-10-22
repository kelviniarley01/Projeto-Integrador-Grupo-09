export class FormasDePagamento {
    static criarPix(chave_pix: string) {
        return new Pix(chave_pix);
    }   

    static criarCartaoCredito(
        numero_cartao: string,
        nome_titular: string,
        validade: string,
        cvv: string
    ) {
        return new CartaoCredito(numero_cartao, nome_titular, validade, cvv);
    }

    static criarCartaoDebito(
        numero_cartao: string,
        nome_titular: string,
        validade: string,
        cvv: string
    ) {
        return new CartaoDebito(numero_cartao, nome_titular, validade, cvv);
    }
}

export class Boleto extends FormaDePagamento {
    constructor(public codigo_barras: string) {
        super("BOLETO");
    }
}

import { FormaDePagamento, Pix, CartaoCredito, CartaoDebito } from "../model/FormasDePagamento"; 