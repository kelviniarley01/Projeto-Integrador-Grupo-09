import * as bcrypt from "bcryptjs"; 
import { randomUUID } from "crypto";

export class Compra {
  constructor(
    private id: string,
    private nomeCliente: string,
    private telefoneCliente: string,
    private emailCliente: string,
    private valorTotal: number,
    private dataCompra: Date,
    private endereco_de_entrega: string,
    private frete?: string,
  ) {
    if (nomeCliente.length < 2) throw new Error("nome do cliente obrigatório");
    if (!telefoneCliente) throw new Error("telefone do cliente obrigatório");
    if (!emailCliente) throw new Error("email do cliente obrigatório");
    if (valorTotal <= 0) throw new Error("valor Total deve ser maior que 0");
    if (!endereco_de_entrega) throw new Error("endereço de entrega obrigatório");
  }

  static create(
    nomeCliente: string,
    telefoneCliente: string,
    emailCliente: string,
    valorTotal: number,
    endereco_de_entrega: string,
    frete?: string,
  ) {
    const id = randomUUID();
    const dataCompra = new Date();
    return new Compra(
      id,
      nomeCliente,
      telefoneCliente,
      emailCliente,
      valorTotal,
      dataCompra,
      endereco_de_entrega,
      frete
    );
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getNomeCliente(): string {
    return this.nomeCliente;
  }

  getTelefoneCliente(): string {
    return this.telefoneCliente;
  }

  getEmailCliente(): string {
    return this.emailCliente;
  }

  getValorTotal(): number {
    return this.valorTotal;
  }

  getDataCompra(): Date {
    return this.dataCompra;
  }

  getEnderecoEntrega(): string {
    return this.endereco_de_entrega;
  }

  getFrete(): string | undefined {
    return this.frete;
  }

  // Setters
  setNomeCliente(nomeCliente: string): void {
    this.nomeCliente = nomeCliente;
  }

  setTelefoneCliente(telefoneCliente: string): void {
    this.telefoneCliente = telefoneCliente;
  }

  setEmailCliente(emailCliente: string): void {
    this.emailCliente = emailCliente;
  }

  setEnderecoEntrega(enderecoEntrega: string): void {
    this.endereco_de_entrega = enderecoEntrega;
  }

  setFrete(frete: string): void {
    this.frete = frete;
  }

  setValorTotal(valorTotal: number): void {
    if (valorTotal <= 0) throw new Error("valorTotal deve ser positivo");
    this.valorTotal = valorTotal;
  }
}
