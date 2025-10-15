export class Suporte {
    constructor(
        public id_suporte: string,
        public id_usuario: string,
        public tipo_solicitacao: string,
        public mensagem: string,
        public status_solicitacao: string,
        public data_envio: Date,
        public resposta?: string
    ) {
        if (!id_usuario) throw new Error("Usuário é obrigatório");
        if (!mensagem) throw new Error("Mensagem é obrigatória");
    }
    static create (
        id_suporte: string,
        id_usuario: string,
        tipo_solicitacao: string,
        mensagem: string,
        status_solicitacao: string,
        data_envio: Date,
        resposta?: string
    ) {
        return new Suporte(
            id_suporte,
            id_usuario,
            tipo_solicitacao,
            mensagem,
            status_solicitacao,
            data_envio,
            resposta
        );
    }
}