import { Produto } from "./Produto";

export class Carrinho {
    constructor(
        public id_carrinho: string,
        public id_usuario: string,
        public lista_produtos: Produto[],
        public quantidade: number,
        public valor_total: number,
        public data_compra: Date,
        public status_pedido: string
    ) {
        if (!id_usuario) throw new Error("Usuário é obrigatório");
        if (!lista_produtos || lista_produtos.length === 0)
            throw new Error("Carrinho deve conter ao menos um produto");
    }
}

    static create(
        id_carrinho: string,
        id_usuario: string,
        lista_produtos: Produto[],
        quantidade: number,
        valor_total: number,
        data_compra: Date,
        status_pedido: string
    ) {
        return new Carrinho(
            id_carrinho,
            id_usuario,
            lista_produtos,
            quantidade,
            valor_total,
            data_compra,
            status_pedido
        );
    }
}   