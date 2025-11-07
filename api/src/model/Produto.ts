import { randomUUID } from "crypto";

export class Produto {
  constructor(
    private id: string,
    private nome: string,
    private preco: number,
    private cor: string,
    private corNome: string,
    private descricao: string,
    private detalhes: string[],
    private imagens: string[],
    private categoria: string,
    private estoque: number = 0,
  ) {
    if (nome.length < 3) throw new Error("Nome do produto deve ter no mínimo 3 caracteres");
    if (preco <= 0) throw new Error("Preço deve ser maior que 0");
    if (!cor) throw new Error("Cor obrigatória");
    if (!corNome) throw new Error("Nome da cor obrigatório");
    if (!descricao) throw new Error("Descrição obrigatória");
    if (!categoria) throw new Error("Categoria obrigatória");
    if (imagens.length === 0) throw new Error("Produto deve ter pelo menos uma imagem");
    if (estoque < 0) throw new Error("Estoque não pode ser negativo");
  }

  static create(
    nome: string,
    preco: number,
    cor: string,
    corNome: string,
    descricao: string,
    detalhes: string[],
    imagens: string[],
    categoria: string,
    estoque: number = 0,
  ) {
    const id = randomUUID();
    return new Produto(
      id,
      nome,
      preco,
      cor,
      corNome,
      descricao,
      detalhes,
      imagens,
      categoria,
      estoque
    );
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getPreco(): number {
    return this.preco;
  }

  getCor(): string {
    return this.cor;
  }

  getCorNome(): string {
    return this.corNome;
  }

  getDescricao(): string {
    return this.descricao;
  }

  getDetalhes(): string[] {
    return this.detalhes;
  }

  getImagens(): string[] {
    return this.imagens;
  }

  getCategoria(): string {
    return this.categoria;
  }

  getEstoque(): number {
    return this.estoque;
  }

  // Setters
  setNome(nome: string): void {
    if (nome.length < 3) throw new Error("Nome do produto deve ter no mínimo 3 caracteres");
    this.nome = nome;
  }

  setPreco(preco: number): void {
    if (preco <= 0) throw new Error("Preço deve ser maior que 0");
    this.preco = preco;
  }

  setCor(cor: string): void {
    if (!cor) throw new Error("Cor obrigatória");
    this.cor = cor;
  }

  setCorNome(corNome: string): void {
    if (!corNome) throw new Error("Nome da cor obrigatório");
    this.corNome = corNome;
  }

  setDescricao(descricao: string): void {
    if (!descricao) throw new Error("Descrição obrigatória");
    this.descricao = descricao;
  }

  setDetalhes(detalhes: string[]): void {
    this.detalhes = detalhes;
  }

  setImagens(imagens: string[]): void {
    if (imagens.length === 0) throw new Error("Produto deve ter pelo menos uma imagem");
    this.imagens = imagens;
  }

  setCategoria(categoria: string): void {
    if (!categoria) throw new Error("Categoria obrigatória");
    this.categoria = categoria;
  }

  setEstoque(estoque: number): void {
    if (estoque < 0) throw new Error("Estoque não pode ser negativo");
    this.estoque = estoque;
  }

  // Métodos auxiliares
  adicionarImagem(imagem: string): void {
    this.imagens.push(imagem);
  }

  removerImagem(imagem: string): void {
    this.imagens = this.imagens.filter(img => img !== imagem);
  }

  adicionarEstoque(quantidade: number): void {
    if (quantidade <= 0) throw new Error("Quantidade deve ser maior que 0");
    this.estoque += quantidade;
  }

  removerEstoque(quantidade: number): void {
    if (quantidade <= 0) throw new Error("Quantidade deve ser maior que 0");
    if (this.estoque < quantidade) throw new Error("Estoque insuficiente");
    this.estoque -= quantidade;
  }

  temEstoque(): boolean {
    return this.estoque > 0;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      preco: this.preco,
      cor: this.cor,
      corNome: this.corNome,
      descricao: this.descricao,
      detalhes: this.detalhes,
      imagens: this.imagens,
      categoria: this.categoria,
      estoque: this.estoque,
    };
  }
}
