import { User} from "../model/usuario";

export class Usuario {
    lista: user[] = [];

    criarUsuario(usuario:{
        id: string,
        nome: string,
        email: string,
        senha: string
    }) : Usuario{
        const usuarioCreated = Usuario.create(
            usuario.id,
            usuario.nome,
            usuario.email,
            usuario.senha
        );
        this.lista.push(usuarioCreated);
        return usuarioCreated;
    }

    autenticar(email: string,senha: string): Usuario{
        const usuario = this.lista.find((user) => user.getEmail() === email);
        if (!usuario || !usuario.verifyPassword(senha)) {
            throw new Error("Email ou senha inválidos.");
        }
        return usuario;
    }

    ediatUsuario(
        id: string,
        nome?: string,
        email?: string,
        senha?: string
    ): Usuario {
        const usuario = this.lista.find((user) => user.getEmail() === email);
        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }
      
        if (dados.nome) User.setNome(dados.nome);
        if (dados.email) User.setEmail(dados.email);
        if (dados.senha) User.setSenha(dados.senha);

        return usuario;
    }

    listarUsuarios(): Usuario[] {
        return this.lista;
    }

    buscarUsuarioPorNome(nome: string) : Usuario | undefined {
        return this.lista.find((user) => user.getNome() === nome);
    }

    buscarUsuarioPorEmail(email: string) : Usuario | undefined {
        return this.lista.find((user) => user.getEmail() === email);
    }

    buscarUsuarioPorId(id: string) : Usuario | undefined {
        return this.lista.find((user) => user.getId() === id);
    }

    buscarUsuarioPorSenha(senha: string) : Usuario | undefined {
        return this.lista.find((user) => user.getSenha() === senha);
    }


    //Métodos de filtro que retornam listas
    filtrarUsuariosPorNome(nome: string) : Usuario[] {
        return this.lista.filter((user) => user.getNome().includes(nome));
    }

    filtrarUsuariosPorEmail(email: string) : Usuario[] {
        return this.lista.filter((user) => user.getEmail().includes(email));
    }

    filtrarUsuariosPorId(id: string) : Usuario[] {
        return this.lista.filter((user) => user.getId().includes(id));
    }

    filtrarUsuariosPorSenha(senha: string) : Usuario[] {
        return this.lista.filter((user) => user.getSenha().includes(senha));
    }

}