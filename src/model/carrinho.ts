import { Carrinho } from "../model/carrinho"; // Assumindo que você tem este modelo
import { app } from "../service"; // Assumindo 'app' é a instância do Express/Framework
import { CarrinhoService } from "../service/CarrinhoService"; // Assumindo este serviço

export function CarrinhoController() {
    // Inicializa o serviço que lida com a lógica de negócios e persistência do carrinho
    const service = new CarrinhoService(app);

    // Rota para buscar um carrinho específico pelo ID do usuário
    app.get("/carrinho/:idUsuario", async (req, res) => {
        try {
            const idUsuario = req.params.idUsuario;
            const carrinho = await service.buscarCarrinhoPorUsuario(idUsuario);

            if (!carrinho) {
                return res.status(404).json({ mensagem: "Carrinho não encontrado para este usuário." });
            }

            return res.status(200).json(carrinho);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro interno ao buscar carrinho." });
        }
    });

    // Rota para adicionar um item ao carrinho
    app.post("/carrinho/:idUsuario/item", async (req, res) => {
        try {
            const idUsuario = req.params.idUsuario;
            const { idProduto, quantidade, precoUnitario } = req.body;

            // Validação básica dos dados recebidos
            if (!idProduto || !quantidade || !precoUnitario) {
                return res.status(400).json({ mensagem: "Dados do item (produto, quantidade, preço) são obrigatórios." });
            }

            const carrinhoAtualizado = await service.adicionarItem(idUsuario, idProduto, quantidade, precoUnitario);
            
            return res.status(200).json({ 
                mensagem: "Item adicionado ao carrinho com sucesso.",
                carrinho: carrinhoAtualizado 
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro interno ao adicionar item ao carrinho." });
        }
    });

    // Rota para remover um item do carrinho
    app.delete("/carrinho/:idUsuario/item/:idProduto", async (req, res) => {
        try {
            const idUsuario = req.params.idUsuario;
            const idProduto = req.params.idProduto;

            const carrinhoAtualizado = await service.removerItem(idUsuario, idProduto);

            return res.status(200).json({ 
                mensagem: "Item removido do carrinho com sucesso.",
                carrinho: carrinhoAtualizado 
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro interno ao remover item do carrinho." });
        }
    });
    
    // Rota para finalizar e limpar o carrinho (simulando um checkout)
    app.post("/carrinho/:idUsuario/checkout", async (req, res) => {
        try {
            const idUsuario = req.params.idUsuario;
            
            // Lógica de checkout: criar pedido, processar pagamento, e depois limpar o carrinho
            await service.finalizarCarrinho(idUsuario);

            return res.status(200).json({ mensagem: "Checkout concluído. Carrinho limpo com sucesso." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: "Erro interno ao finalizar carrinho." });
        }
    });
}