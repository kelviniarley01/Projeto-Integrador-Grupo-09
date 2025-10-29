import { Carrinho, ItemCarrinho, Cliente } from "../model/Carrinho";

export class CarrinhoService {
    private carrinhos: Carrinho[] = [];

    public getOrCreateCarrinho(cliente: Cliente): Carrinho {
        let carrinho = this.carrinhos.find(c => c.cliente.id === cliente.id);
        if (!carrinho) {
            carrinho = new Carrinho(cliente);
            this.carrinhos.push(carrinho);
        }
        return carrinho;
    }

    public adicionarItem(clienteId: string, idProduto: string, precoUnitario: number, quantidade: number): Carrinho | null {
        const carrinho = this.carrinhos.find(c => c.cliente.id === clienteId);
        if (!carrinho) return null;

        carrinho.adicionarOuAtualizarItem(idProduto, precoUnitario, quantidade);
        return carrinho;
    }

    public removerItem(clienteId: string, idProduto: string): Carrinho | null {
        const carrinho = this.carrinhos.find(c => c.cliente.id === clienteId);
        if (!carrinho) return null;

        carrinho.removerItem(idProduto);
        return carrinho;
    }

    public limparCarrinho(clienteId: string): Carrinho | null {
        const carrinho = this.carrinhos.find(c => c.cliente.id === clienteId);
        if (!carrinho) return null;

        carrinho.limparCarrinho();
        return carrinho;
    }

    public listarCarrinhos(): Carrinho[] {
        return this.carrinhos;
    }

    public buscarCarrinho(clienteId: string): Carrinho | null {
        return this.carrinhos.find(c => c.cliente.id === clienteId) || null;
    }
}
