import { useState } from "react";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Products = () => {
  const [selectedColor, setSelectedColor] = useState<string>("todas");

  const filteredProducts = selectedColor === "todas" 
    ? products 
    : products.filter(p => p.colorName === selectedColor);

  const colorTabs = [
    { value: "todas", label: "Todas", color: "bg-gradient-to-r from-primary via-accent to-secondary" },
    { value: "rosa", label: "Blush Bloom", color: "bg-[#F4A6D7]" },
    { value: "vermelho", label: "Cherry Pop ", color: "bg-[#C8102E]" },
    { value: "branco", label: "Vanilla Dream", color: "bg-[#F8F6F2]" },
    { value: "preto", label: "Dark Kiss", color: "bg-[#0B0B0C]" },
    { value: "vinho", label: "Berry Fever", color: "bg-[#7A0C2E]" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Nossa Coleção</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Escolha suas peças favoritas por cor
          </p>
        </div>

        <Tabs defaultValue="todas" className="w-full" onValueChange={setSelectedColor}>
          <TabsList className="w-full md:w-auto grid grid-cols-4 gap-2 mb-8 bg-muted/50 p-2 rounded-2xl">
            {colorTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-card data-[state=active]:shadow-playful rounded-xl transition-all duration-200 flex items-center gap-2"
              >
                <div className={`w-4 h-4 rounded-full ${tab.color} border-2 border-foreground/20`} />
                <span className="font-medium">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedColor} className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  images={product.images}
                  color={product.color}
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-muted-foreground">
                  Nenhum produto encontrado nesta cor
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Products;
