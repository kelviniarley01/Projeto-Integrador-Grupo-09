import bcrypt from 'bcryptjs';

export class Usuario {
    constructor(
        private id: string,
        private nome: string,
        private email: string,
        private senha: string
    ) {
        if (!nome) throw new Error("Nome é obrigatório.");
        if (!email) throw new Error("Email é obrigatório.");
        if (!senha) throw new Error("Senha é obrigatória.");
        if (nome.length < 3) throw new Error("Nome deve ter pelo menos 3 caracteres.");
        if (senha.length < 6) throw new Error("Senha deve ter pelo menos 6 caracteres.");
    }

    static create(
        id: string,
        nome: string,
        email: string,
        senha: string
    ){
        const id = crypto.randomUUID();
        const hashedPassword = bcrypt.hashSync(senha);
        return new Usuario(id, nome, email, hashedPassword);
    }

    verifyPassword(senha: string): boolean {
        return bcrypt.compareSync(senha, this.senha);
    }

    //Getters
    getId(): string {
        return this.id;
    }

    getNome(): string {
        return this.nome;
    }

    getEmail(): string {
        return this.email;
    }

    getSenha(): string {
        return this.senha;
    }

    //Setters
    setNome(nome: string): void {
        this.nome = nome;
    }
    setEmail(email: string): void {
        this.email = email;
    }

    setSenha(senha: string): void {
        this.senha = senha;
    }
