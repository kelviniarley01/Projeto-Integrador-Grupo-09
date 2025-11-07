import { Link } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  color: string;
}

const ProductCard = ({ id, name, price, image, images, color }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const productImages = images && images.length > 0 ? images : [image];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <Card className="group overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-playful">
      <CardContent className="p-0">
        <Link to={`/produto/${id}`}>
          <div className="relative overflow-hidden bg-muted aspect-square">
            <img
              src={productImages[currentImageIndex]}
              alt={name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />

            {/* Botões de navegação do carrossel */}
            {productImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                {/* Indicadores de imagem */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {productImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-primary w-4"
                          : "bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground"
              onClick={(e) => e.preventDefault()}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border-2 border-foreground/20"
                style={{ backgroundColor: color }}
              />
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>
            </div>
            <p className="text-2xl font-bold text-primary">
              R$ {price.toFixed(2)}
            </p>
            <Button variant="gradient" className="w-full">
              Ver Detalhes
            </Button>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
