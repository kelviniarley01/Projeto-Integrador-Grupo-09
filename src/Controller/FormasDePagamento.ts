import { FormasDePagamentoService } from "../Service/FormasDePagamento";
import { TipoPagamento } from "../model/FormasDePagamento";

interface DadosNovaForma {
    tipo: TipoPagamento;
    numero_cartao?: string;
    nome_titular?: string;
    validade?: string;
    cvv?: string;
    chave_pix?: string;
    codigo_barras?: string;
}

export class FormasDePagamentoController {
    private service: FormasDePagamentoService;

    constructor(service: FormasDePagamentoService) {
        this.service = service;
    }

    /**
     * Lista todas as formas de pagamento de um usuário
     */
    public listarFormasPorUsuario(idUsuario: string | number) {
        const formas = this.service.listarFormasPorUsuario(idUsuario);
        return {
            mensagem: `Formas de pagamento do usuário ${idUsuario} listadas com sucesso!`,
            formas
        };
    }

    /**
     * Cria e adiciona uma nova forma de pagamento
     */
    public criarEAdicionarForma(idUsuario: string | number, dados: DadosNovaForma) {
        try {
            const formas = this.service.criarEAdicionarForma(idUsuario, dados);
            return {
                mensagem: `Forma de pagamento ${dados.tipo} adicionada com sucesso!`,
                formas
            };
        } catch (error) {
            return { erro: (error as Error).message };
        }
    }

    /**
     * Remove uma forma de pagamento
     */
    public removerFormaDePagamento(idUsuario: string | number, idForma: string) {
        const formas = this.service.removerFormaDePagamento(idUsuario, idForma);
        return {
            mensagem: "Forma de pagamento removida com sucesso!",
            formas
        };
    }
}