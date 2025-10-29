export type TipoPagamento = "PIX" | "CARTAO_CREDITO" | "CARTAO_DEBITO" | "BOLETO";

export class FormaDePagamento {
    public id: string;
    public tipo: TipoPagamento;
    public dataCriacao: string;

    constructor(tipo: TipoPagamento) {
        this.id = globalThis.crypto?.randomUUID() ?? `fp-${Date.now()}`; 
        this.tipo = tipo;
        this.dataCriacao = new Date().toISOString();
    }

    public validar(): boolean {
        return true; 
    }
}

export class Pix extends FormaDePagamento {
    public chave_pix: string;

    constructor(chave_pix: string) {
        super("PIX");
        this.chave_pix = chave_pix;
    }

    public validar(): boolean {
        return typeof this.chave_pix === 'string' && this.chave_pix.length > 5;
    }
}

export class CartaoCredito extends FormaDePagamento {
    public numero_cartao_final: string;
    public nome_titular: string;
    public validade: string;
    public cvv: string; 

    constructor(numero_cartao: string, nome_titular: string, validade: string, cvv: string) {
        super("CARTAO_CREDITO");
        
        this.numero_cartao_final = numero_cartao.slice(-4); 
        this.nome_titular = nome_titular;
        this.validade = validade;
        this.cvv = cvv;
    }

    public validar(): boolean {
        return (
            typeof this.nome_titular === 'string' && this.nome_titular.trim().length > 0 &&
            !!this.validade &&
            this.cvv?.length >= 3
        );
    }
}

export class CartaoDebito extends FormaDePagamento {
    public numero_cartao_final: string;
    public nome_titular: string;
    public validade: string;
    public cvv: string;

    constructor(numero_cartao: string, nome_titular: string, validade: string, cvv: string) {
        super("CARTAO_DEBITO");
        
        this.numero_cartao_final = numero_cartao.slice(-4);
        this.nome_titular = nome_titular;
        this.validade = validade;
        this.cvv = cvv;
    }
    
    public validar(): boolean {
        return (
            typeof this.nome_titular === 'string' && this.nome_titular.trim().length > 0 &&
            !!this.validade &&
            this.cvv?.length >= 3
        );
    }
}

export class Boleto extends FormaDePagamento {
    public codigo_barras: string;
    public dataVencimento: string;

    constructor(codigo_barras: string) {
        super("BOLETO");
        this.codigo_barras = codigo_barras;
        
        const dataVencimento = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
        this.dataVencimento = dataVencimento.toISOString().split('T')[0];
    }

    public validar(): boolean {
        return typeof this.codigo_barras === 'string' && this.codigo_barras.length >= 40;
    }
}