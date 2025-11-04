import { Request, Response, Router } from 'Carrinho'; 
import { CarrinhoService } from './CarrinhoService'; 
import { Carrinho } from './CarrinhoModel'; 

const carrinhoService = new CarrinhoService();
const router = Router();

export class CarrinhoController {
    
    constructor(private service: CarrinhoService) {
        this.service = service;
        this.initRoutes();
    }

    public initRoutes(): Router {
        router.get('/:idCliente', this.getCarrinho); 
        router.post('/:idCliente/item', this.adicionarItem); 
        router.put('/:idCliente/item', this.atualizarQuantidade); 
        router.delete('/:idCliente/item/:idProduto', this.removerItem); 
        router.delete('/:idCliente', this.limparCarrinho); 
        router.post('/:idCliente/checkout', this.checkout); 

        return router;
    }

    public async getCarrinho(req: Request, res: Response): Promise<Response> {
        try {
            const { idCliente } = req.params;
            const carrinho: Carrinho = carrinhoService.getCarrinho(idCliente);
            return res.status(200).json(carrinho);
        } catch (error) {
            console.error("Erro ao obter carrinho:", error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    public async adicionarItem(req: Request, res: Response): Promise<Response> {
        try {
            const { idCliente } = req.params;
            const { idProduto, precoUnitario, quantidade } = req.body;

            if (!idProduto || !precoUnitario || typeof quantidade !== 'number') {
                return res.status(400).json({ message: "Dados do item inválidos (idProduto, precoUnitario, e quantidade são obrigatórios)." });
            }

            const carrinhoAtualizado: Carrinho = carrinhoService.adicionarItem(
                idCliente, 
                idProduto, 
                Number(precoUnitario), 
                Number(quantidade)
            );

            return res.status(200).json(carrinhoAtualizado);
        } catch (error) {
            console.error("Erro ao adicionar item:", error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    public async atualizarQuantidade(req: Request, res: Response): Promise<Response> {
        try {
            const { idCliente } = req.params;
            const { idProduto, novaQuantidade } = req.body;

            if (!idProduto || typeof novaQuantidade !== 'number') {
                return res.status(400).json({ message: "Dados para atualização inválidos (idProduto e novaQuantidade são obrigatórios)." });
            }

            const carrinhoAtualizado: Carrinho = carrinhoService.atualizarQuantidade(
                idCliente, 
                idProduto, 
                Number(novaQuantidade)
            );

            return res.status(200).json(carrinhoAtualizado);
        } catch (error) {
            console.error("Erro ao atualizar quantidade:", error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    public async removerItem(req: Request, res: Response): Promise<Response> {
        try {
            const { idCliente, idProduto } = req.params;
            const carrinhoAtualizado: Carrinho = carrinhoService.removerItem(idCliente, idProduto);
            return res.status(200).json(carrinhoAtualizado);
        } catch (error) {
            console.error("Erro ao remover item:", error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    public async limparCarrinho(req: Request, res: Response): Promise<Response> {
        try {
            const { idCliente } = req.params;
            const carrinhoAtualizado: Carrinho = carrinhoService.limparCarrinho(idCliente);
            return res.status(200).json(carrinhoAtualizado);
        } catch (error) {
            console.error("Erro ao limpar carrinho:", error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    public async checkout(req: Request, res: Response): Promise<Response> {
        try {
            const { idCliente } = req.params;

            const total = carrinhoService.calcularTotal(idCliente);
            const sucesso: boolean = carrinhoService.checkout(idCliente);

            if (sucesso) {
                return res.status(200).json({ 
                    message: "Checkout realizado com sucesso. Carrinho finalizado.", 
                    totalCompra: total 
                });
            } else {
                return res.status(404).json({ message: "Carrinho não encontrado para checkout." });
            }
        } catch (error) {
            console.error("Erro ao realizar checkout:", error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}

export default router;