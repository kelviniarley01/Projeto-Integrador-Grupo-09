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
        // Validações
        if (!nome_produto || nome_produto.length < 3) throw new Error("Nome do produto é obrigatório e deve ter pelo menos 3 caracteres.");
        if (!descricao) throw new Error("Descrição é obrigatória.");
        if (preco <= 0) throw new Error("Preço deve ser um valor positivo.");
        if (quantidade_estoque < 0) throw new Error("Quantidade em estoque não pode ser negativa.");
        if (!Array.isArray(fotos)) throw new Error("Fotos deve ser um array.");

        this.id_produto = id_produto; // Em um cenário real, o ID provavelmente não seria passado aqui.
        this.nome_produto = nome_produto;
        this.descricao = descricao;
        this.medidas = medidas;
        this.cor = cor;
        this.preco = preco;
        this.quantidade_estoque = quantidade_estoque;
        this.fotos = fotos;
    }

    /**
     * Método estático para criar uma nova instância de Produto.
     * @param nome_produto - Nome do produto.
     * @param descricao - Descrição do produto.
     * @param medidas - Medidas do produto.
     * @param cor - Cor do produto.
     * @param preco - Preço do produto.
     * @param quantidade_estoque - Quantidade em estoque.
     * @param fotos - Array de URLs/caminhos das fotos.
     * @returns Nova instância de Produto.
     */
    static create(
        nome_produto: string,
        descricao: string,
        medidas: string,
        cor: string,
        preco: number,
        quantidade_estoque: number,
        fotos: string[]
    ) {
        // Gera um ID simulado (em um app real, isso viria do DB ou de um gerador de UUID/ID)
        // Usamos Math.random() para simular, mas um ID único seria melhor.
        const id_produto = Math.floor(Math.random() * 1000000); 

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

    // Getters
    getIdProduto(): number {
        return this.id_produto;
    }

    getNomeProduto(): string {
        return this.nome_produto;
    }

    getDescricao(): string {
        return this.descricao;
    }

    getMedidas(): string {
        return this.medidas;
    }

    getCor(): string {
        return this.cor;
    }

    getPreco(): number {
        return this.preco;
    }

    getQuantidadeEstoque(): number {
        return this.quantidade_estoque;
    }

    getFotos(): string[] {
        return this.fotos;
    }

    // Setters
    setNomeProduto(nome_produto: string): void {
        if (!nome_produto || nome_produto.length < 3) throw new Error("Nome deve ter pelo menos 3 caracteres.");
        this.nome_produto = nome_produto;
    }

    setDescricao(descricao: string): void {
        if (!descricao) throw new Error("Descrição é obrigatória.");
        this.descricao = descricao;
    }

    setMedidas(medidas: string): void {
        this.medidas = medidas;
    }

    setCor(cor: string): void {
        this.cor = cor;
    }

    setPreco(preco: number): void {
        if (preco <= 0) throw new Error("Preço deve ser um valor positivo.");
        this.preco = preco;
    }

    setQuantidadeEstoque(quantidade_estoque: number): void {
        if (quantidade_estoque < 0) throw new Error("Quantidade em estoque não pode ser negativa.");
        this.quantidade_estoque = quantidade_estoque;
    }
    
    setFotos(fotos: string[]): void {
        if (!Array.isArray(fotos)) throw new Error("Fotos deve ser um array.");
        this.fotos = fotos;
    }

    addFoto(foto: string): void {
        this.fotos.push(foto);
    }
}