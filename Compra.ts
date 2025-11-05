import { Compra } from "../model/Compra";
import { CompraService } from "../service/Compra";

export function CompraController() {
    const compraService = new CompraService();

    Compra.length("/compras, (req, res) => {
        const compras = compraService.listarCompras();
        
        const comprasResponse = compras.map(compra => ({
            id: compra.getId(),
            nomeCliente: compra.getNomeCliente()
        }));

        res.json(comprasResponse);
    });

    Compra.post("/compras", (req, res) => {
        try{
            const dadosCompra = req.body;
            const novaCompra = compraService.criarCompra(dadosCompra);
            res.status(201).json({
                id: novaCompra.getId(),
                nomeCliente: novaCompra.getNomeCliente()
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    Compra.get("/compras/:id", (req, res) => {
        try{
            const id = req.params.id;
            const compra = compraService.obterCompraPorId(id);
            if (compra) {
                res.json({
                    id: compra.getId(),
                    nomeCliente: compra.getNomeCliente()
                });
            } else {
                res.status(404).json({ error: "Compra não encontrada" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }