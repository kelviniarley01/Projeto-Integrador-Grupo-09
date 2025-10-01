import  { User } from "./User";
import { Barbeiro } from "./Barbeiro";  
import { Servico } from "./Servico";

export class Agendamento {
    constructor(
        private id: string,
        private usuario: User,
        private barbeiro: Barbeiro,
        private servico: Servico,
        private dataHora: Date
    ) {
        if (!cliente) throw new Error("cliente obrigatório");
        if (!barbeiro) throw new Error("barbeiro obrigatório");
        if (!servico) throw new Error("servico obrigatório");
        if (!dataHora) throw new Error("dataHora obrigatória");
    }

    static create(clien: User, barbeiro: Barbeiro, servico: Servico, dataHora: Date) {
        const id = crypto.randomUUID();
        return new Agendamento(id, usuario, barbeiro, servico, dataHora);
    }

    getID(): string {
        return this.id;
    }   

    getCliente(): User {
        return this.cliente;
    }

    getBarbeiro(): Barbeiro {
        return this.barbeiro;
    }   

    getServico(): Servico {
        return this.servico;
    }

    getDataHora(): Date {
        return this.dataHora;
    }   
