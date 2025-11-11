import { Request, Response, Router } from "express";
import { CompraService } from "../service/Compra";

export class CompraController {
  private compraService: CompraService;
  public router: Router;

  constructor() {
    this.compraService = new CompraService();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/api/compras", this.listarCompras.bind(this));
    this.router.post("/api/compras", this.criarCompra.bind(this));
    this.router.get("/api/compras/:id", this.obterCompraPorId.bind(this));
    this.router.put("/api/compras/:id", this.editarCompra.bind(this));
    this.router.delete("/api/compras/:id", this.deletarCompra.bind(this));
  }

  private listarCompras(req: Request, res: Response) {
    try {
      const compras = this.compraService.listarCompras();
      const comprasResponse = compras.map((compra) => compra.toJSON());
      res.json(comprasResponse);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  private criarCompra(req: Request, res: Response) {
    try {
      const dadosCompra = req.body;
      const novaCompra = this.compraService.criarCompra(dadosCompra);
      res.status(201).json(novaCompra.toJSON());
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  private obterCompraPorId(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const compra = this.compraService.buscarPorId(id);
      if (compra) {
        res.json(compra.toJSON());
      } else {
        res.status(404).json({ error: "Compra não encontrada" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  private editarCompra(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const dados = req.body;
      const compra = this.compraService.editarCompra(id, dados);
      res.json(compra.toJSON());
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  private deletarCompra(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const sucesso = this.compraService.deletarCompra(id);
      if (sucesso) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Compra não encontrada" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
