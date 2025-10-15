export class Produto {
  private id_produto: number;
  private nome_produto: string;
  private descricao: string;
  private medidas: string;
  private cor: string;
  private preco: number;
  private quantidade_estoque: number; 
  private fotos: string[];

  constructor(
    id_produto: number,
    nome_produto: string,
    descricao: string,
    medidas: string,
    cor: string,
    preco: number,
    quantidade_estoque: number,
    fotos: string[]
  ) {
    this.id_produto = id_produto;
    this.nome_produto = nome_produto;
    this.descricao = descricao;
    this.medidas = medidas;
    this.cor = cor;
    this.preco = preco;
    this.quantidade_estoque = quantidade_estoque;
    this.fotos = fotos;
  }

  static create(
    id_produto: number,
    nome_produto: string,
    descricao: string,
    medidas: string,
    cor: string,
    preco: number,
    quantidade_estoque: number,
    fotos: string[]
  ) {
    return new Produto(
      id_produto,
      nome_produto,
      descricao,
      medidas,
      cor,
      preco,
      quantidade_estoque,
      fotos
    );
  }
}