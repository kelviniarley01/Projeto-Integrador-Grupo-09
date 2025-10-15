export class Usuario {
    constructor(
        private id: string,
        private nome: string,
        private email: string,
        private senha: number
    ) {
        if (!nome) throw new Error("nome obrigatório");
        if (!email) throw new Error("email obrigatório");
        if (senha == undefined || senha == null) throw new Error("senha obrigatória");

        if (nome.length < 3) throw new Error("nome muito curto");
        if (senha < 6) throw new Error("senha muito curta");
        if (!email.includes("@")) throw new Error("email inválido");
        }

    static create(nome: string, email: string, senha: number) {
        const id = crypto.randomUUID();
        return new Servico(id, nome, email, senha);        
    }

    getID(): string {
        return this.id;
    }

    getNome(): string {
        return this.nome;
    }

    getEmail(): string {
        return this.email;
    }

        getSenha(): string | undefined {
            return this.senha?.toString();
        }
    }