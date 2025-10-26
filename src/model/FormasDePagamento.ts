// models/FormasDePagamento.js

/**
 * Classe Base para todas as formas de pagamento.
 * @abstract
 */
export class FormaDePagamento {
    /**
     * @param {"PIX" | "CARTAO_CREDITO" | "CARTAO_DEBITO" | "BOLETO"} tipo - O tipo da forma de pagamento.
     */
    constructor(tipo) {
        // Propriedades comuns a todas as formas de pagamento
        this.id = crypto.randomUUID(); 
        this.tipo = tipo;
        this.dataCriacao = new Date().toISOString();
    }

    /**
     * Simula a validação específica de cada forma de pagamento.
     * @returns {boolean}
     */
    validar() {
        // Implementar validação real em cada subclasse
        return true; 
    }
}

/**
 * Forma de pagamento PIX.
 */
export class Pix extends FormaDePagamento {
    /**
     * @param {string} chave_pix - A chave PIX.
     */
    constructor(chave_pix) {
        super("PIX");
        this.chave_pix = chave_pix;
    }

    validar() {
        return typeof this.chave_pix === 'string' && this.chave_pix.length > 5;
    }
}

/**
 * Forma de pagamento Cartão de Crédito.
 */
export class CartaoCredito extends FormaDePagamento {
    /**
     * @param {string} numero_cartao - Número completo do cartão.
     * @param {string} nome_titular - Nome impresso no cartão.
     * @param {string} validade - Data de validade (MM/AA).
     * @param {string} cvv - Código CVV.
     */
    constructor(numero_cartao, nome_titular, validade, cvv) {
        super("CARTAO_CREDITO");
        // Armazenamos apenas os últimos 4 dígitos por segurança
        this.numero_cartao_final = numero_cartao.slice(-4); 
        this.nome_titular = nome_titular;
        this.validade = validade;
        this.cvv = cvv; // Em um sistema real, o CVV não seria armazenado.
    }

    validar() {
        return (
            typeof this.nome_titular === 'string' && this.nome_titular.length > 0 &&
            this.validade &&
            this.cvv.length >= 3
        );
    }
}

/**
 * Forma de pagamento Cartão de Débito.
 */
export class CartaoDebito extends FormaDePagamento {
    /**
     * @param {string} numero_cartao - Número completo do cartão.
     * @param {string} nome_titular - Nome impresso no cartão.
     * @param {string} validade - Data de validade (MM/AA).
     * @param {string} cvv - Código CVV.
     */
    constructor(numero_cartao, nome_titular, validade, cvv) {
        super("CARTAO_DEBITO");
        this.numero_cartao_final = numero_cartao.slice(-4);
        this.nome_titular = nome_titular;
        this.validade = validade;
        this.cvv = cvv;
    }
    
    validar() {
        // Usa a mesma validação do crédito, garantindo que os campos essenciais estejam preenchidos
        return CartaoCredito.prototype.validar.call(this);
    }
}

/**
 * Forma de pagamento Boleto.
 */
export class Boleto extends FormaDePagamento {
    /**
     * @param {string} codigo_barras - O código de barras.
     */
    constructor(codigo_barras) {
        super("BOLETO");
        this.codigo_barras = codigo_barras;
        // Data de vencimento simulada
        const dataVencimento = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
        this.dataVencimento = dataVencimento.toISOString().split('T')[0];
    }

    validar() {
        return typeof this.codigo_barras === 'string' && this.codigo_barras.length > 20;
    }
}
