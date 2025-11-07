import { Link, useLocation } from "react-router-dom";
import { Heart, ShoppingBag, User, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

const Navigation = () => {
  const location = useLocation();
  const { totalItems } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b-2 border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Heart className="w-8 h-8 text-primary animate-pulse-slow" fill="currentColor" />
            <h1 className="text-3xl font-bold text-gradient">Unique</h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/produtos" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/produtos") ? "text-primary" : "text-foreground"
              }`}
            >
              Produtos
            </Link>
            <Link 
              to="/faq" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/faq") ? "text-primary" : "text-foreground"
              }`}
            >
              SAC
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/carinho" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse-slow">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/auth">
              <Button variant="gradient" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Entrar</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-around mt-4 pt-4 border-t border-primary/20">
          <Link to="/" className="flex flex-col items-center gap-1 text-xs">
            <Heart className={`w-5 h-5 ${isActive("/") ? "text-primary" : "text-muted-foreground"}`} />
            <span>Home</span>
          </Link>
          <Link to="/produtos" className="flex flex-col items-center gap-1 text-xs">
            <ShoppingBag className={`w-5 h-5 ${isActive("/produtos") ? "text-primary" : "text-muted-foreground"}`} />
            <span>Produtos</span>
          </Link>
          <Link to="/faq" className="flex flex-col items-center gap-1 text-xs">
            <HelpCircle className={`w-5 h-5 ${isActive("/faq") ? "text-primary" : "text-muted-foreground"}`} />
            <span>SAC</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
