import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle, Package, Truck, CreditCard, RefreshCw } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce-slow" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">SAC - Atendimento</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Tire suas dúvidas sobre entregas, produtos e muito mais!
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-playful">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Rastreamento</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Acompanhe seu pedido em tempo real
                </p>
                <Button variant="outline" className="w-full">
                  Rastrear Pedido
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-playful">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Trocas e Devoluções</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  30 dias para trocar ou devolver
                </p>
                <Button variant="outline" className="w-full">
                  Solicitar Troca
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Truck className="w-8 h-8 text-primary" />
              Perguntas Frequentes sobre Entrega
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {deliveryFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`delivery-${index}`}
                  className="border-2 border-primary/20 rounded-2xl px-6 data-[state=open]:border-primary/40 transition-all"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="space-y-6 mt-12">
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-secondary" />
              Perguntas sobre Pagamento e Produtos
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {productFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`product-${index}`}
                  className="border-2 border-primary/20 rounded-2xl px-6 data-[state=open]:border-primary/40 transition-all"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Section */}
          <div className="mt-16 p-8 bg-dreamy rounded-3xl border-2 border-primary/30 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Ainda tem dúvidas?
            </h3>
            <p className="text-foreground/80 mb-6">
              Nossa equipe está pronta para te ajudar!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg">
                WhatsApp
              </Button>
              <Button variant="outline" size="lg">
                Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const deliveryFAQs = [
  {
    question: "Qual o prazo de entrega?",
    answer: "O prazo de entrega varia de acordo com a região. Em média, para o Sudeste é de 5 a 10 dias úteis, e para outras regiões de 10 a 15 dias úteis após a confirmação do pagamento."
  },
  {
    question: "Como posso rastrear meu pedido?",
    answer: "Após o envio, você receberá um código de rastreamento por email. Você também pode acompanhar seu pedido diretamente na área 'Meus Pedidos' após fazer login na sua conta."
  },
  {
    question: "Vocês entregam em todo o Brasil?",
    answer: "Sim! Realizamos entregas para todo o território nacional através dos Correios e transportadoras parceiras."
  },
  {
    question: "O frete é grátis?",
    answer: "Oferecemos frete grátis para compras acima de R$ 280,00 para todo o Brasil. Para valores inferiores, o frete é calculado automaticamente no carrinho de acordo com seu CEP."
  }
];

const productFAQs = [
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos cartão de crédito (em até 6x sem juros), cartão de débito, PIX e boleto bancário. Todas as transações são 100% seguras."
  },
  {
    question: "Posso trocar ou devolver um produto?",
    answer: "Sim! Você tem até 30 dias corridos após o recebimento para solicitar troca ou devolução. O produto deve estar sem uso, com etiqueta e na embalagem original."
  },
  {
    question: "Como funciona a tabela de tamanhos?",
    answer: "Todas as nossas peças seguem a numeração padrão brasileira (PP, P, M, G, GG). Nas páginas de cada produto você encontra informações detalhadas sobre as medidas. Em caso de dúvidas, nossa equipe pode te ajudar!"
  },
  {
    question: "Os produtos têm garantia?",
    answer: "Sim! Todos os nossos produtos têm garantia de 90 dias contra defeitos de fabricação, conforme o Código de Defesa do Consumidor."
  },
  {
    question: "As peças têm proteção UV?",
    answer: "Sim! A maioria das nossas peças possui proteção UV30+ ou UV50+, perfeitas para treinos ao ar livre. A informação está disponível na descrição de cada produto."
  }
];

export default FAQ;
