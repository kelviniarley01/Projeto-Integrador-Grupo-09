export class Usuario {
    private id: string;
    private nome: string;
    private email: string;
    private senha: string;

    private constructor(id: string, nome: string, email: string, senha: string) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    static create(id: string, nome: string, email: string, senha: string): Usuario {
        return new Usuario(id, nome, email, senha);
    }

    getId(): string {
        return this.id;
    }

    getNome(): string {
        return this.nome;
    }

    getEmail(): string {
        return this.email;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setSenha(senha: string): void {
        this.senha = senha;
    }

    verifyPassword(senha: string): boolean {
        return this.senha === senha;
    }
}
