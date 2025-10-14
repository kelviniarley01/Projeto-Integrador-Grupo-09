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
