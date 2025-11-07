import { Link } from "react-router-dom";
import { Sparkles, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border-2 border-primary/30">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Nova Coleção 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-gradient">Fitness</span>
              <br />
              <span className="text-foreground">com Estilo</span>
              <Heart className="inline-block w-12 h-12 md:w-16 md:h-16 text-primary ml-2 animate-bounce-slow" fill="currentColor" />
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground">
              Roupas de academia femininas que combinam conforto, qualidade e muito estilo ✨
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/produtos">
                <Button variant="gradient" size="lg" className="text-lg gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Ver Produtos
                </Button>
              </Link>
              <Link to="/faq">
                <Button variant="outline" size="lg" className="text-lg">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-card rounded-2xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-playful group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dreamy">
        <div className="container mx-auto px-4 text-center">
          <Star className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse-slow" fill="currentColor" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Pronta para Arrasar?
          </h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Cadastre-se e receba 10% de desconto na primeira compra!
          </p>
          <Link to="/auth">
            <Button variant="default" size="lg" className="text-lg gap-2">
              <Heart className="w-5 h-5" />
              Criar Conta Agora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const ShoppingBag = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const features = [
  {
    icon: Sparkles,
    title: "Qualidade Premium",
    description: "Tecidos de alta performance com tecnologia de ponta para máximo conforto"
  },
  {
    icon: Heart,
    title: "Brinde Exclusivo",
    description: "Em compras à partir de R$380,00 ganhe uma linda bolsa exclusiva de brinde"
  },
  {
    icon: Star,
    title: "Frete Grátis",
    description: "Frete grátis nas suas compras à partir de R$280,00  "
  }
];

export default Index;
