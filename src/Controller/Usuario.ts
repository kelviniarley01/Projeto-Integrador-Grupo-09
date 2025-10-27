import { Usuario } from "../model/carrinho"; // Assumindo que o model é de fato Usuario, mas o caminho sugere carrinho
import { app } from "../service"; // Assumindo que 'app' é a instância do Express/Framework
import { UsuarioService } from "../service/Usuario";

/**
 * Define e configura as rotas (endpoints) HTTP para gerenciamento de Usuários.
 * @returns void
 */
export function UsuarioController() {
    // Inicializa a instância do serviço de usuário
    const service = new UsuarioService(app);

    // Rota GET para listar todos os usuários ou filtrar por nome
    app.get("/usuarios", (req, res) => {
        try {
            const { nome } = req.query;
            let usuarios: Usuario[] = [];

            // Se houver o parâmetro 'nome' na query, filtra
            if (nome && typeof nome === 'string') {
                // Assumindo que o service tem o método filtrarUsuariosPorNome
                usuarios = service.filtrarUsuariosPorNome(nome);
            } else {
                // Caso contrário, lista todos os usuários
                usuarios = service.listarUsuarios();
            }

            // Mapeia para remover a senha antes de retornar a resposta
            const usuariosSemSenha = usuarios.map((usuario) => ({
                id: usuario.getId(),
                nome: usuario.getNome(),
                email: usuario.getEmail()
            }));

            return res.json(usuariosSemSenha);

        } catch (e: any) {
             // Retorna 500 se houver algum erro inesperado no servidor
             return res.status(500).json({ error: e.message || "Erro interno ao buscar usuários." });
        }
    });

    // Rota POST para criar um novo usuário
    app.post("/usuarios", (req, res) => {
        try {
            const dadosUsuario = req.body;
            // O service deve lidar com a validação e criação
            const novoUsuario = service.criarUsuario(dadosUsuario);

            // Retorna o novo usuário com status 201 (Created)
            res.status(201).json({
                id: novoUsuario.getId(),
                nome: novoUsuario.getNome(),
                email: novoUsuario.getEmail()
            });
        } catch (e: any) {
            // Corrigido: Adicionado 'res' antes de .status(400)
            return res.status(400).json({ error: e.message });
        }
    });

    // Rota PUT para atualizar um usuário por email
    app.put("/usuarios/:email", (req, res) => {
        try {
            const { email } = req.params;
            const dados = req.body;
            // Corrigido: Mudado 'editarusuario' para 'editarUsuario' (camelCase)
            const usuarioAtualizado = service.editarUsuario(email, dados);

            // Retorna os dados do usuário atualizado (sem a senha)
            res.json({
                id: usuarioAtualizado.getId(),
                nome: usuarioAtualizado.getNome(),
                email: usuarioAtualizado.getEmail()
            });
        } catch (e: any) {
            // Retorna 404 se o usuário não for encontrado
            return res.status(404).json({ error: e.message });
        }
    });

    // Rota POST para autenticação do usuário (login)
    // Corrigido: Mudado '/auteticacao' para '/autenticacao'
    app.post("/usuarios/autenticacao", (req, res) => {
        try {
            const { email, senha } = req.body;
            // O service deve validar o email e a senha
            const usuarioAutenticado = service.autenticarUsuario(email, senha);

            // Retorna sucesso na autenticação com os dados do usuário (sem a senha)
            res.json({
                status: "Autenticado com sucesso",
                dados: {
                    id: usuarioAutenticado.getId(),
                    nome: usuarioAutenticado.getNome(),
                    email: usuarioAutenticado.getEmail()
                }
            });
        } catch (e: any) {
            // Retorna 401 (Unauthorized) em caso de falha na autenticação
            return res.status(401).json({ error: e.message });
        }
    });
}
