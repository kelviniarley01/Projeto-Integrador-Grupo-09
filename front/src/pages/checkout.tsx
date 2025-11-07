import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { compraAPI } from "@/services/api";
import { useCart } from "@/hooks/use-cart";

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    cep: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { items: cartItems, updateQuantity, removeItem, clearCart, totalValue } = useCart();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subtotal = totalValue;
  const shipping = subtotal > 300 ? 0 : 25;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.cep) {
      toast.error("Preencha todos os campos antes de finalizar!");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }

    setIsLoading(true);

    try {
      const enderecoCompleto = `${form.address}, ${form.city} - CEP: ${form.cep}`;
      const freteTexto = shipping === 0 ? "Frete Grátis" : `R$ ${shipping.toFixed(2)}`;

      const compraData = {
        nomeCliente: form.name,
        telefoneCliente: form.phone,
        emailCliente: form.email,
        valorTotal: total,
        endereco_de_entrega: enderecoCompleto,
        frete: freteTexto,
        itens: cartItems.map(item => ({
          produtoId: item.id,
          nome: item.name,
          preco: item.price,
          quantidade: item.quantity,
          cor: item.colorName,
        })),
      };

      const compra = await compraAPI.criar(compraData);

      toast.success("Compra finalizada com sucesso!", {
        description: `Obrigado, ${form.name}! Seu pedido #${compra.id.substring(0, 8)} está confirmado 🚚`,
      });

      // Limpa carrinho após checkout
      clearCart();

      // Limpa o formulário
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        cep: "",
      });
    } catch (error: any) {
      toast.error("Erro ao finalizar compra", {
        description: error.message || "Tente novamente mais tarde",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <Link to="/produtos">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Produtos
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* --- Coluna 1: Dados do usuário --- */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground mb-4">Informações do Cliente</h2>

            <div className="bg-muted/50 rounded-2xl p-6 border-2 border-primary/10 space-y-4">
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ex: João da Silva"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Rua, número, bairro"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Cidade"
                  />
                </div>
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    name="cep"
                    value={form.cep}
                    onChange={handleChange}
                    placeholder="00000-000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- Coluna 2: Resumo da compra --- */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Resumo da Compra</h2>

            <div className="bg-muted/50 rounded-2xl p-6 border-2 border-primary/10 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Seu carrinho está vazio 🛒
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start border-b border-border pb-4 mb-3 gap-4"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-md object-cover border"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.name}</p>
                        {item.colorName && (
                          <p className="text-xs text-muted-foreground">{item.colorName}</p>
                        )}
                        <p className="text-sm font-semibold text-primary mt-1">
                          R$ {item.price.toFixed(2)}
                        </p>

                        {/* Controles de quantidade */}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive ml-2"
                            onClick={() => {
                              removeItem(item.id);
                              toast.info("Item removido do carrinho");
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <p className="font-semibold text-primary whitespace-nowrap">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              )}

              {cartItems.length > 0 && (
                <div className="pt-3 space-y-2">
                  <div className="flex justify-between text-foreground/80">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/80">
                    <span>Frete</span>
                    <span>{shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                    <span>Total</span>
                    <span className="text-gradient">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* --- Botão de Finalizar --- */}
            {cartItems.length > 0 && (
              <div className="mt-6 flex flex-col gap-4">
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full text-lg gap-2"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  <CreditCard className="w-5 h-5" />
                  {isLoading ? "Processando..." : "Finalizar Compra"}
                </Button>

                <div className="flex justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary" />
                    <span>Entrega Rápida</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-primary" />
                    <span>Pagamento Seguro</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
