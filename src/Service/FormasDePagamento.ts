import { 
    FormaDePagamento, 
    Pix, 
    CartaoCredito, 
    CartaoDebito, 
    Boleto, 
    TipoPagamento
} from "../model/FormasDePagamento";

interface DadosNovaForma {
    tipo: TipoPagamento; 
    numero_cartao?: string;
    nome_titular?: string;
    validade?: string;
    cvv?: string;
    chave_pix?: string;
    codigo_barras?: string;
}

export class FormasDePagamentoService {
    private armazenamento: Map<string | number, FormaDePagamento[]> = new Map();

    public listarFormasPorUsuario(idUsuario: string | number): FormaDePagamento[] {
        return this.armazenamento.get(idUsuario) ?? [];
    }

    public adicionarFormaDePagamento(
        idUsuario: string | number, 
        forma: FormaDePagamento
    ): FormaDePagamento[] {
        if (!forma.validar()) {
            throw new Error(`Dados da forma de pagamento '${forma.tipo}' inválidos.`);
        }
        const formas = [...this.listarFormasPorUsuario(idUsuario), forma];
        this.armazenamento.set(idUsuario, formas);
        return formas;
    }

    public criarEAdicionarForma(
        idUsuario: string | number, 
        dados: DadosNovaForma
    ): FormaDePagamento[] {
        const { tipo, numero_cartao, nome_titular, validade, cvv, chave_pix, codigo_barras } = dados;
        let novaForma: FormaDePagamento;

        switch (tipo) {
            case "PIX":
                if (!chave_pix) throw new Error("Chave PIX é obrigatória.");
                novaForma = new Pix(chave_pix);
                break;

            case "CARTAO_CREDITO":
                if (!numero_cartao || !nome_titular || !validade || !cvv) {
                    throw new Error("Dados incompletos para Cartão de Crédito.");
                }
                novaForma = new CartaoCredito(numero_cartao, nome_titular, validade, cvv);
                break;

            case "CARTAO_DEBITO":
                if (!numero_cartao || !nome_titular || !validade || !cvv) {
                    throw new Error("Dados incompletos para Cartão de Débito.");
                }
                novaForma = new CartaoDebito(numero_cartao, nome_titular, validade, cvv);
                break;

            case "BOLETO":
                // Gerando um código de barras válido (>=40 caracteres)
                const codigo = codigo_barras?.padEnd(40, '0') ?? `BOLETO${Date.now()}${'0'.repeat(25)}`;
                novaForma = new Boleto(codigo);
                break;

            default:
                throw new Error(`Tipo de pagamento não suportado: ${tipo}`);
        }

        return this.adicionarFormaDePagamento(idUsuario, novaForma);
    }

    public removerFormaDePagamento(idUsuario: string | number, idForma: string): FormaDePagamento[] {
        const formas = this.listarFormasPorUsuario(idUsuario);
        const novasFormas = formas.filter(f => f.id !== idForma);
        this.armazenamento.set(idUsuario, novasFormas);
        return novasFormas;
    }
}