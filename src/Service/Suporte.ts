import { Suporte } from "../model/Suporte";

export class SuporteService {
    private listaSuportes: Suporte[] = [];

    /**
     * Cria uma nova solicitação de suporte
     */
    criarSuporte(dados: {
        id_usuario: string;
        tipo_solicitacao: string;
        mensagem: string;
    }): Suporte {
        const novoSuporte = Suporte.create(
            dados.id_usuario,
            dados.tipo_solicitacao,
            dados.mensagem
        );

        this.listaSuportes.push(novoSuporte);
        return novoSuporte;
    }

    /**
     * Retorna todas as solicitações de suporte
     */
    listarSuportes(): Suporte[] {
        return this.listaSuportes;
    }

    /**
     * Busca uma solicitação específica pelo ID
     */
    buscarPorId(id_suporte: string): Suporte | undefined {
        return this.listaSuportes.find(s => s.getIdSuporte() === id_suporte);
    }

    /**
     * Atualiza o status de uma solicitação
     */
    atualizarStatus(id_suporte: string, novoStatus: string): Suporte | undefined {
        const suporte = this.buscarPorId(id_suporte);
        if (suporte) {
            suporte.setStatusSolicitacao(novoStatus);
        }
        return suporte;
    }

    /**
     * Adiciona uma resposta à solicitação
     */
    responderSolicitacao(id_suporte: string, resposta: string): Suporte | undefined {
        const suporte = this.buscarPorId(id_suporte);
        if (suporte) {
            suporte.setResposta(resposta);
            suporte.setStatusSolicitacao("Respondida");
        }
        return suporte;
    }

    /**
     * Remove uma solicitação de suporte
     */
    removerSuporte(id_suporte: string): boolean {
        const indice = this.listaSuportes.findIndex(s => s.getIdSuporte() === id_suporte);
        if (indice !== -1) {
            this.listaSuportes.splice(indice, 1);
            return true;
        }
        return false;
    }
}