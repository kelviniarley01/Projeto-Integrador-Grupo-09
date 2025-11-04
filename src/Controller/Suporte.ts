import { SuporteService } from "../Service/Suporte";

export class SuporteController {
    private service: SuporteService;

    constructor(service: SuporteService) {
        this.service = service;
    }

    /**
     * Cria uma nova solicitação de suporte
     */
    public criarSuporte(dados: {
        id_usuario: string;
        tipo_solicitacao: string;
        mensagem: string;
    }) {
        try {
            const suporte = this.service.criarSuporte(dados);
            return {
                mensagem: "Solicitação de suporte criada com sucesso!",
                suporte
            };
        } catch (error) {
            return { erro: (error as Error).message };
        }
    }

    /**
     * Lista todas as solicitações de suporte
     */
    public listarSuportes() {
        const suportes = this.service.listarSuportes();
        return {
            mensagem: "Solicitações de suporte listadas com sucesso!",
            suportes
        };
    }

    /**
     * Busca uma solicitação específica pelo ID
     */
    public buscarPorId(id_suporte: string) {
        const suporte = this.service.buscarPorId(id_suporte);
        if (!suporte) {
            return { erro: "Solicitação de suporte não encontrada." };
        }
        return suporte;
    }

    /**
     * Atualiza o status de uma solicitação
     */
    public atualizarStatus(id_suporte: string, novoStatus: string) {
        const suporte = this.service.atualizarStatus(id_suporte, novoStatus);
        if (!suporte) {
            return { erro: "Solicitação de suporte não encontrada." };
        }
        return {
            mensagem: `Status da solicitação atualizado para: ${novoStatus}`,
            suporte
        };
    }

    /**
     * Adiciona uma resposta à solicitação
     */
    public responderSolicitacao(id_suporte: string, resposta: string) {
        const suporte = this.service.responderSolicitacao(id_suporte, resposta);
        if (!suporte) {
            return { erro: "Solicitação de suporte não encontrada." };
        }
        return {
            mensagem: "Resposta enviada com sucesso!",
            suporte
        };
    }

    /**
     * Remove uma solicitação de suporte
     */
    public removerSuporte(id_suporte: string) {
        const removido = this.service.removerSuporte(id_suporte);
        if (!removido) {
            return { erro: "Solicitação de suporte não encontrada." };
        }
        return { mensagem: "Solicitação de suporte removida com sucesso!" };
    }
}