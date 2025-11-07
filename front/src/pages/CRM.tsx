import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { compraAPI } from "@/services/api";
import { toast } from "sonner";
import { ShoppingCart, TrendingUp, Package, DollarSign, Calendar, User, Phone, Mail, MapPin } from "lucide-react";

interface ItemCompra {
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
  cor?: string;
}

interface Compra {
  id: string;
  nomeCliente: string;
  telefoneCliente: string;
  emailCliente: string;
  valorTotal: number;
  dataCompra: string;
  enderecoEntrega: string;
  frete?: string;
  itens?: ItemCompra[];
}

const CRM = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    carregarCompras();
  }, []);

  const carregarCompras = async () => {
    setIsLoading(true);
    try {
      const dados = await compraAPI.listar();
      setCompras(dados);
    } catch (error: any) {
      toast.error("Erro ao carregar compras", {
        description: error.message || "Tente novamente mais tarde",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Cálculos de estatísticas
  const totalCompras = compras.length;
  const faturamentoTotal = compras.reduce((acc, compra) => acc + compra.valorTotal, 0);
  const ticketMedio = totalCompras > 0 ? faturamentoTotal / totalCompras : 0;

  const totalProdutosVendidos = compras.reduce((acc, compra) => {
    if (compra.itens) {
      return acc + compra.itens.reduce((sum, item) => sum + item.quantidade, 0);
    }
    return acc;
  }, 0);

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">CRM - Gestão de Vendas</h1>
          <p className="text-muted-foreground">Acompanhe suas vendas e indicadores</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total de Compras */}
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 border-2 border-primary/20 shadow-playful">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total de Compras</h3>
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{totalCompras}</p>
            <p className="text-xs text-muted-foreground mt-1">pedidos realizados</p>
          </div>

          {/* Faturamento Total */}
          <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl p-6 border-2 border-secondary/20 shadow-playful">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Faturamento Total</h3>
              <DollarSign className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-3xl font-bold text-foreground">R$ {faturamentoTotal.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">em vendas</p>
          </div>

          {/* Ticket Médio */}
          <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl p-6 border-2 border-accent/20 shadow-playful">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Ticket Médio</h3>
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold text-foreground">R$ {ticketMedio.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">por pedido</p>
          </div>

          {/* Produtos Vendidos */}
          <div className="bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl p-6 border-2 border-primary/30 shadow-playful">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Produtos Vendidos</h3>
              <Package className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{totalProdutosVendidos}</p>
            <p className="text-xs text-muted-foreground mt-1">unidades totais</p>
          </div>
        </div>

        {/* Lista de Compras */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Lista de Compras</h2>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando compras...</p>
            </div>
          ) : compras.length === 0 ? (
            <div className="bg-muted/50 rounded-2xl p-12 border-2 border-primary/10 text-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl font-medium text-muted-foreground">Nenhuma compra realizada ainda</p>
            </div>
          ) : (
            compras.map((compra) => (
              <div
                key={compra.id}
                className="bg-muted/50 rounded-2xl p-6 border-2 border-primary/10 shadow-sm hover:shadow-playful transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Informações do Cliente */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-foreground">Pedido #{compra.id.substring(0, 8)}</h3>
                      <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                        Confirmado
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-foreground/80">
                        <User className="w-4 h-4 text-primary" />
                        <span>{compra.nomeCliente}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/80">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>{compra.telefoneCliente}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/80">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>{compra.emailCliente}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/80">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{formatarData(compra.dataCompra)}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-foreground/80">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{compra.enderecoEntrega}</span>
                    </div>

                    {/* Itens da Compra */}
                    {compra.itens && compra.itens.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Itens do Pedido:</h4>
                        <div className="space-y-2">
                          {compra.itens.map((item, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-foreground/80">
                                  {item.quantidade}x {item.nome}
                                </span>
                                {item.cor && (
                                  <span className="text-xs text-muted-foreground">({item.cor})</span>
                                )}
                              </div>
                              <span className="font-medium text-primary">
                                R$ {(item.preco * item.quantidade).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Resumo Financeiro */}
                  <div className="lg:w-64 bg-card rounded-xl p-4 border border-primary/20">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3">Resumo Financeiro</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground/80">Frete:</span>
                        <span className="font-medium">{compra.frete || "N/A"}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-border">
                        <span className="font-semibold text-foreground">Total:</span>
                        <span className="text-lg font-bold text-gradient">
                          R$ {compra.valorTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CRM;
