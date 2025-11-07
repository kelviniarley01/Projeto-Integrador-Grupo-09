import {Compra, ItemCompra} from "../model/Compra";

export class CompraService {
  lista: Compra[] = [];

  criarCompra(compra:{
    nomeCliente: string;
    telefoneCliente: string;
    emailCliente: string;
    valorTotal: number;
    endereco_de_entrega: string;
    frete?: string;
    itens?: ItemCompra[];
  }): Compra {
    const novacompra = Compra.create(
      compra.nomeCliente,
      compra.telefoneCliente,
      compra.emailCliente,
      compra.valorTotal,
      compra.endereco_de_entrega,
      compra.frete,
      compra.itens
    );
    this.lista.push(novacompra);
    return novacompra;
  }

  autenticar(email: string, telefone: string): Compra | null {
    const compra  = this.lista.find((compra) => compra.getEmailCliente() === email);
    if (!compra || compra.getTelefoneCliente() !== telefone) {
      throw new Error("Telefone ou Email inválidos.");
    }
    return compra;
  }

  editarCompra(
    id: string,
    dados:{
      nomeCliente?: string;
      telefoneCliente?: string;
      emailCliente?: string;
    }
  ): Compra {
    const compra = this.lista.find((compra) => compra.getId() === id);
    if (!compra) {
      throw new Error("Compra não encontrada.");
    }

    if (dados.nomeCliente) compra.setNomeCliente(dados.nomeCliente);
    if (dados.telefoneCliente) compra.setTelefoneCliente(dados.telefoneCliente);
    if (dados.emailCliente) compra.setEmailCliente(dados.emailCliente); 
    return compra;
  }

  listarCompras(): Compra[] {
    return this.lista;
  }

  buscarPorId(id: string): Compra | null {
    const compra = this.lista.find((compra) => compra.getId() === id);
    return compra || null;
  }

  deletarCompra(id: string): boolean {
    const index = this.lista.findIndex((compra) => compra.getId() === id);
    if (index === -1) {
      return false;
    }
    this.lista.splice(index, 1);
    return true;
  }
}