import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(Number(id));
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Produto não encontrado</h1>
          <Link to="/produtos">
            <Button variant="gradient">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Produtos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.color,
      colorName: product.colorName,
    });

    toast.success("Produto adicionado ao carrinho!", {
      description: `${product.name} - R$ ${product.price.toFixed(2)}`
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.info(isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos!");
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
          {/* Product Image */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="bg-muted rounded-3xl overflow-hidden border-2 border-primary/20 shadow-playful">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-foreground/20"
                  style={{ backgroundColor: product.color }}
                />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {product.colorName}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-gradient mb-6">
                R$ {product.price.toFixed(2)}
              </p>
            </div>

            <div className="bg-muted/50 rounded-2xl p-6 border-2 border-primary/10">
              <p className="text-lg text-foreground/90 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">Características:</h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground/80">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                variant="gradient" 
                size="lg" 
                className="flex-1 text-lg gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                Adicionar ao Carrinho
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleToggleFavorite}
                className={isFavorite ? "border-primary bg-primary/10" : ""}
              >
                <Heart 
                  className="w-5 h-5" 
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </Button>
            </div>

            {/* Size Guide */}
            <div className="bg-secondary/20 rounded-2xl p-6 border-2 border-secondary/30">
              <h3 className="font-bold text-lg mb-3 text-foreground">Guia de Tamanhos</h3>
              <div className="grid grid-cols-4 gap-2 text-center text-sm">
                {["PP", "P", "M", "G"].map((size) => (
                  <button 
                    key={size}
                    className="py-3 px-4 bg-card rounded-lg border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all font-medium"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
