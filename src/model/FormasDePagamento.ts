export abstract class FormaDePagamento {
    constructor(public tipo : "PIX" | "CARTAO_CREDITO" | "CARTAO_DEBITO" | "BOLETO") {}
}

export class Pix extends FormaDePagamento {
    constructor(public chave_pix: string) {
        super("PIX");
    }
}

export class CartaoCredito extends FormaDePagamento {
    constructor(
        public numero_cartao: string,
        public nome_titular: string,
        public validade: string,
        public cvv: string
    ) {
        super("CARTAO_CREDITO");
    }
}

export class CartaoDebito extends FormaDePagamento {
    constructor(
        public numero_cartao: string,
        public nome_titular: string,
        public validade: string,
        public cvv: string
    ) {
        super("CARTAO_DEBITO");
    }
}