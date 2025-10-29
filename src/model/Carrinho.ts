export class Cliente {
    constructor(
        public id: string,
        public nome: string,
        public email: string,
        public telefone?: string,
        public endereco?: string
    ) {}
}

export class ItemCarrinho {
    public readonly idProduto: string; 
    public readonly precoUnitario: number; 
    private quantidade: number; 

    constructor(idProduto: string, precoUnitario: number, quantidade: number = 1) {
        this.quantidade = quantidade > 0 ? quantidade : 1;
        this.idProduto = idProduto;
        this.precoUnitario = precoUnitario;
    }

    public getSubtotal(): number {
        return this.precoUnitario * this.quantidade;
    }
    
    public getQuantidade(): number {
        return this.quantidade;
    }

    public setQuantidade(novaQuantidade: number): void {
        this.quantidade = novaQuantidade >= 0 ? novaQuantidade : 0;
    }
}

export class Carrinho {
    public readonly id: string; 
    public readonly cliente: Cliente; // Agora guarda os dados do cliente
    private itens: ItemCarrinho[]; 
    public ultimaAtualizacao: string;

    constructor(cliente: Cliente, id: string = globalThis.crypto?.randomUUID() ?? `car-${cliente.id}`, itens: ItemCarrinho[] = []) {
        this.id = id;
        this.cliente = cliente;
        this.itens = itens;
        this.ultimaAtualizacao = new Date().toISOString();
    }

    public getItens(): ItemCarrinho[] {
        return this.itens;
    }

    public adicionarOuAtualizarItem(idProduto: string, precoUnitario: number, quantidade: number): void {
        const itemExistente = this.itens.find(item => item.idProduto === idProduto);

        if (itemExistente) {
            itemExistente.setQuantidade(itemExistente.getQuantidade() + quantidade);
        } else {
            const novoItem = new ItemCarrinho(idProduto, precoUnitario, quantidade);
            this.itens.push(novoItem);
        }
        this.ultimaAtualizacao = new Date().toISOString();
    }

    public removerItem(idProduto: string): void {
        this.itens = this.itens.filter(item => item.idProduto !== idProduto);
        this.ultimaAtualizacao = new Date().toISOString();
    }

    public limparCarrinho(): void {
        this.itens = [];
        this.ultimaAtualizacao = new Date().toISOString();
    }
    
    public getTotal(): number {
        return this.itens.reduce((total, item) => total + item.getSubtotal(), 0);
    }

    public getQuantidadeTotalDeProdutos(): number {
        return this.itens.reduce((total, item) => total + item.getQuantidade(), 0);
    }
}
