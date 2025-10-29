import { ProdutoService } from "../Service/ProdutoService";
import { Produto } from "../model/Produto";

export class ProdutoController {
    private service: ProdutoService;

    constructor(service: ProdutoService) {
        this.service = service;
    }

    // Criar um novo produto
    criarProduto(dados: {
        nome_produto: string;
        descricao: string;
        medidas: string;
        cor: string;
        preco: number;
        quantidade_estoque: number;
        fotos: string[];
    }): Produto {
        return this.service.criarProduto(dados);
    }

    // Listar todos os produtos
    listarProdutos(): Produto[] {
        return this.service.listarProdutos();
    }

    // Buscar produto por ID
    buscarPorId(id_produto: number): Produto | null {
        const produto = this.service.buscarPorId(id_produto);
        return produto || null;
    }

    // Atualizar produto
    atualizarProduto(id_produto: number, dados: Partial<{
        nome_produto: string;
        descricao: string;
        medidas: string;
        cor: string;
        preco: number;
        quantidade_estoque: number;
        fotos: string[];
    }>): Produto {
        return this.service.atualizarProduto(id_produto, dados);
    }

    // Remover produto
    removerProduto(id_produto: number): boolean {
        return this.service.removerProduto(id_produto);
    }

    // Buscar produtos por nome
    buscarPorNome(termo: string): Produto[] {
        return this.service.buscarPorNome(termo);
    }
}
