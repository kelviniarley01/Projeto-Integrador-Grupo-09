export class CarrinhoService {
    private carrinhos: Map<string, Carrinho> = new Map();

    public getCarrinho(idCliente: string): Carrinho {
        let carrinho = this.carrinhos.get(idCliente);

        if (!carrinho) {
            carrinho = new Carrinho(idCliente);
            this.carrinhos.set(idCliente, carrinho);
        }
        return carrinho;
    }

    public adicionarItem(idCliente: string, idProduto: string, precoUnitario: number, quantidade: number = 1): carrinho {
        const carrinho = this.getCarrinho(idCliente);
        
        carrinho.adicionarOuAtualizarItem(idProduto, precoUnitario, quantidade);
        
        return carrinho;
    }

    public removerItem(idCliente: string, idProduto: string): carrinho {
        const carrinho = this.getCarrinho(idCliente);
        
        carrinho.removerItem(idProduto);
        
        return carrinho;
    }

    public atualizarQuantidade(idCliente: string, idProduto: string, novaQuantidade: number): carrinho {
        const carrinho = this.getCarrinho(idCliente);
        const item = carrinho.getItens().find(i => i.idProduto === idProduto);

        if (item) {
            if (novaQuantidade <= 0) {
                return this.removerItem(idCliente, idProduto);
            } else {
                item.setQuantidade(novaQuantidade);
                carrinho.ultimaAtualizacao = new Date().toISOString(); 
            }
        }
        
        return carrinho;
    }

    public calcularTotal(idCliente: string): number {
        const carrinho = this.getCarrinho(idCliente);
        return carrinho.getTotal();
    }
    
    public limparCarrinho(idCliente: string): carrinho {
        const carrinho = this.getCarrinho(idCliente);
        carrinho.limparCarrinho();
        return carrinho;
    }

    public checkout(idCliente: string): boolean {
        return this.carrinhos.delete(idCliente);
    }
}