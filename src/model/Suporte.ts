export class Suporte {
    constructor(
        private id_suporte: string,
        private id_usuario: string,
        private tipo_solicitacao: string,
        private mensagem: string,
        private status_solicitacao: string,
        private data_envio: Date,
        private resposta?: string
    ) {
        if (!id_usuario) throw new Error("ID do Usuário é obrigatório.");
        if (!mensagem) throw new Error("Mensagem é obrigatória.");
        if (!tipo_solicitacao) throw new Error("Tipo de solicitação é obrigatório.");
        if (!status_solicitacao) throw new Error("Status da solicitação é obrigatório.");
        if (!data_envio) throw new Error("Data de envio é obrigatória.");
    }

    static create(
        id_usuario: string,
        tipo_solicitacao: string,
        mensagem: string
    ) {
        // Gera um ID único e define valores padrão para os novos campos
        const id_suporte = crypto.randomUUID(); // Necessário importar 'crypto'
        const data_envio = new Date();
        const status_solicitacao = "Pendente"; // Status inicial padrão

        return new Suporte(
            id_suporte,
            id_usuario,
            tipo_solicitacao,
            mensagem,
            status_solicitacao,
            data_envio
        );
    }

    // Getters
    getIdSuporte(): string {
        return this.id_suporte;
    }

    getIdUsuario(): string {
        return this.id_usuario;
    }

    getTipoSolicitacao(): string {
        return this.tipo_solicitacao;
    }

    getMensagem(): string {
        return this.mensagem;
    }

    getStatusSolicitacao(): string {
        return this.status_solicitacao;
    }

    getDataEnvio(): Date {
        return this.data_envio;
    }

    getResposta(): string | undefined {
        return this.resposta;
    }

    // Setters
    setTipoSolicitacao(tipo_solicitacao: string): void {
        this.tipo_solicitacao = tipo_solicitacao;
    }

    setMensagem(mensagem: string): void {
        this.mensagem = mensagem;
    }

    setStatusSolicitacao(status_solicitacao: string): void {
        this.status_solicitacao = status_solicitacao;
    }
    
    setResposta(resposta: string): void {
        this.resposta = resposta;
    }
}