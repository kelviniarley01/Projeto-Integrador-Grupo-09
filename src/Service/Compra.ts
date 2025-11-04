import { Compra } from "../model/Compra";

export class CompraService {
  private compras: compra[] = [];

  criarCompras(compras: {
    id: string;
    nome: string;
    telefone: string;
    email: string;
    CPF: number;
    frete?: number;
  }): Compra {
    const userCreated = Compra.criarCompra(
      compras.nome,
      compras.telefone,
      compras.email,
      compras.CPF,
      compras.frete
    );
    this.compras.push(userCreated);
    return userCreated;
  }

  autenticar(email: string, senha: string): Compra {
    const compraEncontrada = this.compras.find(
      c => c.email === email && (c as any).senha === senha
    );
    if (!compraEncontrada || !(compraEncontrada as any).verifyPassword?.(senha)) {
      throw new Error("Email ou senha inválidos");
    }
    return compraEncontrada;
  }

  editarCompra(
    id: string,
    dados:{
      nome?: string;
      telefone?: string;
      email?: string;
    }
  ) {
    const compra = this.compras.find(compra => compra.id === id);
    if (!compra) {
      throw new Error("Compra não encontrada");
}

if (dados.nome) compra.setNome(dados.nome);
if (dados.telefone) compra.setTelefone(dados.telefone);
if (dados.email) compra.setEmail(dados.email);

    return compra;
  }

  listarCompras(): Compra[] {
    return this.compras;
  }

  buscarPorId(id: string): Compra | undefined {
    return this.compras.find(compra => compra.getId() === id);
  }

  buscarPorEmail(email: string): Compra | undefined {
    return this.compras.find(compra => compra.getEmail() === email);
  }

  buscarPorNome(nome: string): Compra | undefined {
    return this.compras.find(compra => compra.getNome() === nome);
  }

  buscarPorTelefone(telefone: string): Compra | undefined {
    return this.compras.find(compra => compra.getTelefone() === telefone);
  }

  buscarPorFrete(frete: string): Compra | undefined {
    return this.compras.find(compra => compra.getFrete() === frete);
  }

  buscarPorEndereco(endereco: string): Compra | undefined {
    return this.compras.find(compra => compra.getEndereco() === endereco);
  }

  buscarPorSenha(senha: string): Compra | undefined {
    return this.compras.find(compra => compra.getSenha() === senha);
  }

  buscarPorIdade(idade: number): Compra | undefined {
    return this.compras.find(compra => (compra as any).getIdade?.() === idade);
  }

  buscarPorCPF(CPF: number): Compra | undefined {
    return this.compras.find(compra => (compra as any).getCPF?.() === CPF);
  }

  //Métodos de filtro que retornam listas
  filtrarPorNome(nome: string): Compra[] {
    return this.compras.filter(compra => compra.getNome() === nome);
  }

  filtrarPorTelefone(telefone: string): Compra[] {
    return this.compras.filter(compra => compra.getTelefone() === telefone);
  }

  filtrarPorEmail(email: string): Compra[] {
    return this.compras.filter(compra => compra.getEmail() === email);
  }

  filtrarPorFrete(frete: string): Compra[] {
    return this.compras.filter(compra => compra.getFrete() === frete);
  }

  filtrarPorEndereco(endereco: string): Compra[] {
    return this.compras.filter(compra => compra.getEndereco() === endereco);
  }

  filtrarPorIdade(idade: number): Compra[] {
    return this.compras.filter(compra => (compra as any).getIdade?.() === idade);
  }

  filtrarPorCPF(CPF: number): Compra[] {
    return this.compras.filter(compra => (compra as any).getCPF?.() === CPF);
  }
}