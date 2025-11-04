import { Produto } from "../model/Produto";

export class ProdutoService {
    private produtos: Produto[] = [];

    /**
     * Cria um novo produto e o adiciona à lista.
     * @param dados Dados do novo produto
     * @returns O produto criado
     */
    public criarProduto(dados: {
        nome_produto: string;
        descricao: string;
        medidas: string;
        cor: string;
        preco: number;
        quantidade_estoque: number;
        fotos: string[];
    }): Produto {
        const novoProduto = Produto.create(
            dados.nome_produto,
            dados.descricao,
            dados.medidas,
            dados.cor,
            dados.preco,
            dados.quantidade_estoque,
            dados.fotos
        );

        this.produtos.push(novoProduto);
        return novoProduto;
    }

    /**
     * Retorna todos os produtos cadastrados.
     */
    public listarProdutos(): Produto[] {
        return this.produtos;
    }

    /**
     * Busca um produto pelo ID.
     * @param id_produto ID do produto
     * @returns O produto encontrado ou undefined
     */
    public buscarPorId(id_produto: number): Produto | undefined {
        return this.produtos.find(p => p.getIdProduto() === id_produto);
    }

    /**
     * Atualiza as informações de um produto existente.
     * @param id_produto ID do produto a ser atualizado
     * @param dados Novos dados para atualização
     * @returns O produto atualizado
     */
    public atualizarProduto(id_produto: number, dados: Partial<{
        nome_produto: string;
        descricao: string;
        medidas: string;
        cor: string;
        preco: number;
        quantidade_estoque: number;
        fotos: string[];
    }>): Produto {
        const produto = this.buscarPorId(id_produto);
        if (!produto) {
            throw new Error("Produto não encontrado.");
        }

        if (dados.nome_produto) produto.setNomeProduto(dados.nome_produto);
        if (dados.descricao) produto.setDescricao(dados.descricao);
        if (dados.medidas) produto.setMedidas(dados.medidas);
        if (dados.cor) produto.setCor(dados.cor);
        if (dados.preco !== undefined) produto.setPreco(dados.preco);
        if (dados.quantidade_estoque !== undefined) produto.setQuantidadeEstoque(dados.quantidade_estoque);
        if (dados.fotos) produto.setFotos(dados.fotos);

        return produto;
    }

    /**
     * Remove um produto pelo ID.
     * @param id_produto ID do produto a ser removido
     * @returns true se o produto foi removido, false caso contrário
     */
    public removerProduto(id_produto: number): boolean {
        const index = this.produtos.findIndex(p => p.getIdProduto() === id_produto);
        if (index === -1) return false;

        this.produtos.splice(index, 1);
        return true;
    }

    /**
     * Filtra produtos por nome.
     * @param termo Termo de busca (parte do nome)
     * @returns Lista de produtos correspondentes
     */
    public buscarPorNome(termo: string): Produto[] {
        const termoLower = termo.toLowerCase();
        return this.produtos.filter(p => p.getNomeProduto().toLowerCase().includes(termoLower));
    }
}