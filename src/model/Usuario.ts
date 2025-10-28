import { Carrinho } from "../model/carrinho"; 

const carrinhoRepository: Map<string, Carrinho> = new Map();

export class CarrinhoService {

    constructor() {
    }

    public async buscarCarrinhoPorUsuario(idUsuario: string): Promise<Carrinho | null> {
        return carrinhoRepository.get(idUsuario) || null;
    }

    public async criarCarrinho(idUsuario: string): Promise<Carrinho> {
        const novoCarrinho = new Carrinho(idUsuario);
        carrinhoRepository.set(idUsuario, novoCarrinho);
        return novoCarrinho;
    }

    public async adicionarItem(idUsuario: string, idProduto: string, quantidade: number, precoUnitario: number): Promise<Carrinho> {
        let carrinho = await this.buscarCarrinhoPorUsuario(idUsuario);

        if (!carrinho) {
            carrinho = await this.criarCarrinho(idUsuario);
        }

        carrinho.adicionarOuAtualizarItem(idProduto, precoUnitario, quantidade);
        carrinhoRepository.set(idUsuario, carrinho); 
        
        return carrinho;
    }

    public async removerItem(idUsuario: string, idProduto: string): Promise<Carrinho | null> {
        const carrinho = await this.buscarCarrinhoPorUsuario(idUsuario);

        if (!carrinho) {
            return null;
        }

        carrinho.removerItem(idProduto);
        
        if (carrinho.getItens().length === 0) {
            carrinhoRepository.delete(idUsuario);
            return null;
        }

        carrinhoRepository.set(idUsuario, carrinho);
        return carrinho;
    }

    public async finalizarCarrinho(idUsuario: string): Promise<boolean> {
        const carrinho = await this.buscarCarrinhoPorUsuario(idUsuario);

        if (!carrinho || carrinho.getItens().length === 0) {
            return false;
        }

        carrinhoRepository.delete(idUsuario);
        return true;
    }
}