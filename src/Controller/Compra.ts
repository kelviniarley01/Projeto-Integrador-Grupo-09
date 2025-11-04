import { Request, Response } from 'express';
import { CompraService } from '../Service/Compra';
import { Compra } from '../model/Compra';

const compraService = new CompraService();

export class CompraController {

  // POST /compras
  async criarCompra(req: Request, res: Response): Promise<Response> {
    const { nome, telefone, email, senha, frete } = req.body;

    if (!nome || !telefone || !email || !senha) {
      return res.status(400).json({ error: "Campos obrigatórios: nome, telefone, email, senha." });
    }

    try {
      const novaCompra = new Compra(nome, telefone, email, senha, frete);
      
      await compraService.adicionarCompra(novaCompra);

      return res.status(201).json({
        id: novaCompra.getId(),
        nome: novaCompra.getNome(),
        email: novaCompra.getEmail(),
        telefone: novaCompra.getTelefone(),
        frete: novaCompra.getFrete(),
        endereco: novaCompra.getEndereco(),
        message: "Compra criada com sucesso."
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido ao criar compra.";
      return res.status(500).json({ error: errorMessage });
    }
  }

  // GET /compras
  async listarCompras(req: Request, res: Response): Promise<Response> {
    try {
      const compras = await compraService.listarCompras();
      
      const comprasSeguras = compras.map(c => ({
        id: c.getId(),
        nome: c.getNome(),
        email: c.getEmail(),
        telefone: c.getTelefone(),
        frete: c.getFrete(),
        endereco: c.getEndereco(),
      }));

      return res.status(200).json(comprasSeguras);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao listar compras.";
      return res.status(500).json({ error: errorMessage });
    }
  }

  // GET /compras/:id
  async buscarCompraPorId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const compraEncontrada = await compraService.buscarPorId(id);

      if (!compraEncontrada) {
        return res.status(404).json({ error: "Compra não encontrada." });
      }

      return res.status(200).json({
        id: compraEncontrada.getId(),
        nome: compraEncontrada.getNome(),
        email: compraEncontrada.getEmail(),
        telefone: compraEncontrada.getTelefone(),
        frete: compraEncontrada.getFrete(),
        endereco: compraEncontrada.getEndereco(),
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao buscar compra por ID.";
      return res.status(500).json({ error: errorMessage });
    }
  }

  // PUT /compras/:id
  async editarCompra(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nome, telefone, email, frete, endereco, senha } = req.body;

    if (!nome && !telefone && !email && !frete && !endereco && !senha) {
      return res.status(400).json({ error: "Nenhum dado de edição fornecido." });
    }

    try {
      const dadosParaAtualizar = { nome, telefone, email, frete, endereco, senha };
      const compraAtualizada = await compraService.editarCompra(id, dadosParaAtualizar);

      return res.status(200).json({
        id: compraAtualizada.getId(),
        nome: compraAtualizada.getNome(),
        email: compraAtualizada.getEmail(),
        telefone: compraAtualizada.getTelefone(),
        frete: compraAtualizada.getFrete(),
        endereco: compraAtualizada.getEndereco(),
        message: "Compra atualizada com sucesso."
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao editar compra.";
      if (errorMessage.includes("Compra não encontrada")) {
        return res.status(404).json({ error: errorMessage });
      }
      return res.status(500).json({ error: errorMessage });
    }
  }

  // POST /login
  async autenticar(req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    try {
      const compraAutenticada = await compraService.autenticar(email, senha);

      return res.status(200).json({
        id: compraAutenticada.getId(),
        nome: compraAutenticada.getNome(),
        email: compraAutenticada.getEmail(),
        message: "Login realizado com sucesso."
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro durante a autenticação.";
      if (errorMessage.includes("Email ou senha inválidos")) {
        return res.status(401).json({ error: errorMessage }); 
      }
      return res.status(500).json({ error: errorMessage });
    }
  }
}