import crypto from "crypto"; // Corrigido: para usar randomUUID

export class Usuario {
  private id: string;
  private nome: string;
  private telefone: string;
  private email: string;
  private senha: string;
  private idade?: number;

  constructor(
    id: string,
    nome: string,
    telefone: string,
    email: string,
    senha: string,
    idade?: number
  ) {
    if (!nome) throw new Error("nome obrigatório");
    if (!telefone) throw new Error("telefone obrigatório");
    if (!email) throw new Error("email obrigatório");
    if (!senha) throw new Error("senha obrigatória");

    if (nome.length < 3) throw new Error("nome muito curto");
    if (senha.length < 6) throw new Error("senha muito curta");

    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.senha = senha;
    this.idade = idade;
  }

  static create(
    nome: string,
    telefone: string,
    email: string,
    senha: string,
    idade?: number
  ) {
    const id = crypto.randomUUID(); // Corrigido: randomUUID()
    return new Usuario(id, nome, telefone, email, senha, idade);
  }

  getID(): string {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getTelefone(): string {
    return this.telefone;
  }

  getIdade(): number | undefined {
    return this.idade;
  }

  getEmail(): string {
    return this.email;
  }

  getSenha(): string {
    return this.senha;
  }
}
