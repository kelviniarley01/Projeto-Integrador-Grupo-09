import * as bcrypt from "bcryptjs"; 
import { randomUUID } from "crypto";

export class Compra {
  constructor(
    private id: string,
    private nomeCliente: string,
    private telefoneCliente: string,
    private emailCliente: string,
    private valorTotal: number, // Novo campo
    private dataCompra: Date, // Novo campo
    private frete?: string,
    private enderecoEntrega?: string, // Novo nome de campo
  ) {
    if (!nomeCliente) throw new Error("nomeCliente obrigatório");
    if (!telefoneCliente) throw new Error("telefoneCliente obrigatório");
    if (!emailCliente) throw new Error("emailCliente obrigatório");
    if (valorTotal <= 0) throw new Error("valorTotal deve ser positivo");
    if (nomeCliente.length < 3) throw new Error("nomeCliente muito curto");
  }

  static create(
    nomeCliente: string,
    telefoneCliente: string,
    emailCliente: string,
    valorTotal: number,
    frete?: string,
    enderecoEntrega?: string
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
      frete,
      enderecoEntrega
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

  getEnderecoEntrega(): string | undefined {
    return this.enderecoEntrega;
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
    this.enderecoEntrega = enderecoEntrega;
  }

  setFrete(frete: string): void {
    this.frete = frete;
  }

  setValorTotal(valorTotal: number): void {
    if (valorTotal <= 0) throw new Error("valorTotal deve ser positivo");
    this.valorTotal = valorTotal;
  }
}