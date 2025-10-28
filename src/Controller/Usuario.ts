import { Router } from 'express';
import { Usuario } from '../service/Usuario'; // Corrigido: import do modelo Usuario
import { UsuarioService } from '../service/UsuarioService';

// A boa prática é usar uma classe para encapsular o controlador
export default class UsuarioController {
  public router: Router;
  private service: UsuarioService;

  constructor() {
    this.router = Router();
    this.service = new UsuarioService();
    this.initRoutes();
  }

  // Método para inicializar e definir as rotas
  private initRoutes() {
    // GET /usuarios - lista todos ou filtra por nome
    this.router.get('/usuarios', async (req, res) => {
      try {
        const { nome } = req.query;
        let usuarios: Usuario[] = [];

        if (nome && typeof nome === 'string') {
          usuarios = await this.service.filtrarUsuariosPorNome(nome);
        } else {
          usuarios = await this.service.listarUsuarios();
        }

        // Mapeia para remover a senha do retorno
        const usuariosSemSenha = usuarios.map((usuario) => ({
          id: usuario.getId(),
          nome: usuario.getNome(),
          email: usuario.getEmail(),
        }));

        return res.json(usuariosSemSenha);
      } catch (e: any) {
        return res.status(500).json({
          error: e.message || 'Erro interno ao buscar usuários.',
        });
      }
    });

    // POST /usuarios - cria novo usuário
    this.router.post('/usuarios', async (req, res) => {
      try {
        const dadosUsuario = req.body;
        const novoUsuario = await this.service.criarUsuario(dadosUsuario);
        res.status(201).json({
          id: novoUsuario.getId(),
          nome: novoUsuario.getNome(),
          email: novoUsuario.getEmail(),
        });
      } catch (e: any) {
        return res.status(400).json({ error: e.message });
      }
    });

    // PUT /usuarios/:email - atualiza usuário por email
    this.router.put('/usuarios/:email', async (req, res) => {
      try {
        const { email } = req.params;
        const dados = req.body;
        const usuarioAtualizado = await this.service.editarUsuario(email, dados);
        res.json({
          id: usuarioAtualizado.getId(),
          nome: usuarioAtualizado.getNome(),
          email: usuarioAtualizado.getEmail(),
        });
      } catch (e: any) {
        return res.status(404).json({ error: e.message });
      }
    });

    // POST /usuarios/autenticacao - login
    this.router.post('/usuarios/autenticacao', async (req, res) => {
      try {
        const { email, senha } = req.body;
        const usuarioAutenticado = await this.service.autenticarUsuario(email, senha);
        res.json({
          status: 'Autenticado com sucesso',
          dados: {
            id: usuarioAutenticado.getId(),
            nome: usuarioAutenticado.getNome(),
            email: usuarioAutenticado.getEmail(),
          },
        });
      } catch (e: any) {
        return res.status(401).json({ error: e.message });
      }
    });
  }
}
