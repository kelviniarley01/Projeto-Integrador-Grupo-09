import { Usuario } from "../model/Usuario";

export class UsuarioService {
    private usuarios: Map<string, Usuario> = new Map();

    // Cria um novo usuário
    public criarUsuario(id: string, nome: string, email: string, senha: string): Usuario {
        if (this.usuarios.has(id)) {
            throw new Error("Usuário já existe");
        }
        const usuario = Usuario.create(id, nome, email, senha);
        this.usuarios.set(id, usuario);
        return usuario;
    }

    // Busca um usuário pelo ID
    public buscarUsuarioPorId(id: string): Usuario | null {
        return this.usuarios.get(id) || null;
    }

    // Atualiza nome ou email de um usuário
    public atualizarUsuario(id: string, nome?: string, email?: string, senha?: string): Usuario | null {
        const usuario = this.usuarios.get(id);
        if (!usuario) return null;

        if (nome) usuario.setNome(nome);
        if (email) usuario.setEmail(email);
        if (senha) usuario.setSenha(senha);

        return usuario;
    }

    // Autentica usuário pelo email e senha
    public autenticarUsuario(email: string, senha: string): Usuario | null {
        for (const usuario of this.usuarios.values()) {
            if (usuario.getEmail() === email && usuario.verifyPassword(senha)) {
                return usuario;
            }
        }
        return null;
    }

    // Deleta usuário
    public deletarUsuario(id: string): boolean {
        return this.usuarios.delete(id);
    }

    // Lista todos os usuários
    public listarUsuarios(): Usuario[] {
        return Array.from(this.usuarios.values());
    }
}

// Exemplo de uso sem framework
const usuarioService = new UsuarioService();

// Criando um usuário
const u1 = usuarioService.criarUsuario("1", "Kelvin", "kelvin@example.com", "1234");
console.log(u1);

// Autenticando
const auth = usuarioService.autenticarUsuario("kelvin@example.com", "1234");
console.log(auth ? "Autenticado" : "Falha na autenticação");

// Atualizando usuário
usuarioService.atualizarUsuario("1", "Kelvin Bezerra");
console.log(usuarioService.buscarUsuarioPorId("1"));

// Listando usuários
console.log(usuarioService.listarUsuarios());
