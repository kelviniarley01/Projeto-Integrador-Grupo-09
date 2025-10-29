import { CarrinhoService } from "../Service/Carrinho";
import { Cliente } from "../model/Carrinho";

export class CarrinhoController {
    private service: CarrinhoService;

    constructor(service: CarrinhoService) {
        this.service = service;
    }

    /**
     * Cria ou recupera o carrinho de um cliente
     */
    public criarOuObterCarrinho(cliente: Cliente) {
        const carrinho = this.service.getOrCreateCarrinho(cliente);
        return {
            mensagem: "Carrinho obtido ou criado com sucesso!",
            carrinho
        };
    }

    /**
     * Adiciona um item ao carrinho de um cliente
     */
    public adicionarItem(
        clienteId: string,
        idProduto: string,
        precoUnitario: number,
        quantidade: number
    ) {
        const carrinho = this.service.adicionarItem(clienteId, idProduto, precoUnitario, quantidade);
        if (!carrinho) {
            return { erro: "Carrinho não encontrado para o cliente informado." };
        }

        return {
            mensagem: `Item adicionado/atualizado com sucesso no carrinho do cliente ${clienteId}.`,
            carrinho
        };
    }

    /**
     * Remove um item do carrinho de um cliente
     */
    public removerItem(clienteId: string, idProduto: string) {
        const carrinho = this.service.removerItem(clienteId, idProduto);
        if (!carrinho) {
            return { erro: "Carrinho não encontrado ou produto inexistente." };
        }

        return {
            mensagem: `Item removido com sucesso do carrinho do cliente ${clienteId}.`,
            carrinho
        };
    }

    /**
     * Limpa todos os itens do carrinho de um cliente
     */
    public limparCarrinho(clienteId: string) {
        const carrinho = this.service.limparCarrinho(clienteId);
        if (!carrinho) {
            return { erro: "Carrinho não encontrado para o cliente informado." };
        }

        return {
            mensagem: `Carrinho do cliente ${clienteId} foi limpo com sucesso.`,
            carrinho
        };
    }

    /**
     * Lista todos os carrinhos registrados no sistema
     */
    public listarCarrinhos() {
        return this.service.listarCarrinhos();
    }

    /**
     * Busca o carrinho de um cliente específico
     */
    public buscarCarrinho(clienteId: string) {
        const carrinho = this.service.buscarCarrinho(clienteId);
        if (!carrinho) {
            return { erro: "Carrinho não encontrado para o cliente informado." };
        }

        return carrinho;
    }
}
