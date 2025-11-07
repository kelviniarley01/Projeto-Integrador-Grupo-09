const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface ItemCompra {
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
  cor?: string;
}

export interface CompraData {
  nomeCliente: string;
  telefoneCliente: string;
  emailCliente: string;
  valorTotal: number;
  endereco_de_entrega: string;
  frete?: string;
  itens?: ItemCompra[];
}

export interface CompraResponse {
  id: string;
  nomeCliente: string;
  telefoneCliente: string;
  emailCliente: string;
  valorTotal: number;
  dataCompra: Date;
  enderecoEntrega: string;
  frete?: string;
  itens?: ItemCompra[];
}

export const compraAPI = {
  // Criar uma nova compra
  criar: async (dados: CompraData): Promise<CompraResponse> => {
    const response = await fetch(`${API_URL}/compras`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erro ao criar compra");
    }

    return response.json();
  },

  // Listar todas as compras
  listar: async (): Promise<CompraResponse[]> => {
    const response = await fetch(`${API_URL}/compras`);

    if (!response.ok) {
      throw new Error("Erro ao listar compras");
    }

    return response.json();
  },

  // Buscar compra por ID
  buscarPorId: async (id: string): Promise<CompraResponse> => {
    const response = await fetch(`${API_URL}/compras/${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Compra não encontrada");
    }

    return response.json();
  },

  // Editar compra
  editar: async (id: string, dados: Partial<CompraData>): Promise<CompraResponse> => {
    const response = await fetch(`${API_URL}/compras/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erro ao editar compra");
    }

    return response.json();
  },

  // Deletar compra
  deletar: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/compras/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erro ao deletar compra");
    }
  },
};
