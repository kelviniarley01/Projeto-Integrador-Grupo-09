// Leggings
import leggingPreto from "@/assets/legging-preto2.png";
import leggingPreto2 from "@/assets/legging-preto2 imagem2.png";
import leggingPreto3 from "@/assets/legging-preto2 imagem3.png";

import leggingRosa from "@/assets/legging-rosa1.png";
import leggingRosa2 from "@/assets/legging-rosa1 Imagem2.png";
import leggingRosa3 from "@/assets/legging-rosa1 imagem3.png";

import leggingVermelho from "@/assets/legging-vermelho4.png";
import leggingVermelho2 from "@/assets/legging-vermelho4 imagem2.png";
import leggingVermelho3 from "@/assets/legging-vermelho4 imagem3.png";

import leggingVinho from "@/assets/legging-vinho3.png";
import leggingVinho2 from "@/assets/legging-vinho3 imagem2.png";
import leggingVinho3 from "@/assets/legging-vinho3 imagem3.png";

// Tops
import topPreto from "@/assets/tops-preto3.png";
import topPreto2 from "@/assets/tops-preto3 imagem2.png";
import topPreto3 from "@/assets/tops-preto3 imagem3.png";

import topRosa from "@/assets/tops-rosa2.png";
import topRosa2 from "@/assets/tops-rosa2 imagem2.png";
import topRosa3 from "@/assets/tops-rosa2 imagem3.png";

import topVermelho from "@/assets/tops-vermelho1.png";
import topVermelho2 from "@/assets/tops-vermelho1 imagem2.png";
import topVermelho3 from "@/assets/tops-vermelho1 imagem3.png";

import topVinho from "@/assets/tops-vinho4.png";

// Shorts
import shortsPreto from "@/assets/shorts-preto3.png";
import shortsPreto2 from "@/assets/shorts-preto3 imagem2.png";
import shortsPreto3 from "@/assets/shorts-preto3 imagem3.png";

import shortsRosa from "@/assets/shorts-rosa2.png";
import shortsRosa2 from "@/assets/shorts-rosa2 imagem2.png";

import shortsVermelho from "@/assets/shorts-vermelho1.png";
import shortsVermelho2 from "@/assets/shorts-vermelho1 imagem2.png";

// Macacão
import macacaoBranco from "@/assets/macacão-branco1.png";
import macacaoBranco2 from "@/assets/macacão-branco1 imagem2.png";
import macacaoBranco3 from "@/assets/macacão-branco1 imagem3.png";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  color: string;
  colorName: string;
  description: string;
  details: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Legging Soft FitWear Cintura Alta na cor Dark Kiss",
    price: 180.00,
    image: leggingPreto,
    images: [leggingPreto, leggingPreto2, leggingPreto3],
    color: "#0B0B0C",
    colorName: "preto",
    description: "Se o seu estilo favorito é o Fitwear com um toque fofo, estas leggings foram feitas para você. Confeccionadas em nosso tecido exclusivo Soft Active, elas oferecem respirabilidade, elasticidade e tecnologia que absorve a umidade, garantindo conforto o dia todo. O modelo tem cintura média com cós elástico de sustentação, além de recortes em formato de coração na parte de trás, que modelam e destacam a silhueta de forma sutil e charmosa.",
    details: [
      "Legging Soft Active",
      "Cintura média com cós elástico de suporte",
      "Costuras modeladoras frontais e traseiras",
      "Tecido leve, respirável e altamente elástico (68% poliéster, 32% elastano)",
      "Comprimento total — entrepernas de aprox. 69 cm (tamanho P regular) e 64 cm (tamanho PP)"
      
    ]
  },
  {
    id: 2,
    name: "Top Esportivo Soft Active com Decote em V na cor Dark Kiss",
    price: 103.00,
    image: topPreto,
    images: [topPreto, topPreto2, topPreto3],
    color: "#0B0B0C",
    colorName: "preto",
    description: "Conheça o seu novo top esportivo favorito. Desenvolvido para oferecer suporte leve e confeccionado com o nosso tecido exclusivo Soft Active, que possui propriedades de absorção de umidade e elasticidade, ele foi projetado com uma faixa inferior sem costuras para garantir conforto sem restrições. O modelo conta com alças largas e um recorte em formato de coração nas costas, preso por duplas alças cruzadas.",
    details: [
      "Top esportivo soft Active de suporte leve",
      "Decote em V",
      "Alças largas fixas",
      "Comprimento padrão de top esportivo: aprox. 14,4 cm (baseado no tamanho P)",
      "Tecido Soft Active leve, respirável e elástico (68% Poliéster, 32% Elastano)"
    ]
  },
  {
    id: 3,
    name: "Mini Shorts Soft Active na cor Dark Kiss",
    price: 115.00,
    image: shortsPreto,
    images: [shortsPreto, shortsPreto2, shortsPreto3],
    color: "#0B0B0C",
    colorName: "preto",
    description: "Short fitness com bolsos laterais e design moderno. Liberdade de movimento para seus treinos!",
    details: [
      "Shorts mini Soft Active",
      "Cintura alta com cós elástico de camada dupla",
      "* Costuras modeladoras flatlock na frente e nas costas",
      "Tecido Soft Active leve, respirável e elástico (68% Poliéster, 32% Elastano)",
      "* Comprimento mini, entreperna de aprox. 10,5 cm (baseado no tamanho P)s"
    ]
  },
 
  {
   id: 4,
    name: "Legging Soft FitWear Cintura Alta na cor Cherry Pop",
    price: 180.00,
    image: leggingVermelho,
    images: [leggingVermelho, leggingVermelho2, leggingVermelho3],
    color: "#C8102E",
    colorName: "vermelho",
    description: "Se o seu estilo favorito é o Fitwear com um toque fofo, estas leggings foram feitas para você. Confeccionadas em nosso tecido exclusivo Soft Active, elas oferecem respirabilidade, elasticidade e tecnologia que absorve a umidade, garantindo conforto o dia todo. O modelo tem cintura média com cós elástico de sustentação, além de recortes em formato de coração na parte de trás, que modelam e destacam a silhueta de forma sutil e charmosa.",
    details: [
      "Legging Soft Active",
      "Cintura média com cós elástico de suporte",
      "Costuras modeladoras frontais e traseiras",
      "Tecido leve, respirável e altamente elástico (68% poliéster, 32% elastano)",
      "Comprimento total — entrepernas de aprox. 69 cm (tamanho P regular) e 64 cm (tamanho PP)"
    ]
  },
  {
    id: 5,
    name: "Top Esportivo Soft Active com Decote em V na cor Cherry Pop",
    price: 103.00,
    image: topVermelho,
    images: [topVermelho, topVermelho2, topVermelho3],
    color: "#C8102E",
    colorName: "vermelho",
    description: "Conheça o seu novo top esportivo favorito. Desenvolvido para oferecer suporte leve e confeccionado com o nosso tecido exclusivo Soft Active, que possui propriedades de absorção de umidade e elasticidade, ele foi projetado com uma faixa inferior sem costuras para garantir conforto sem restrições. O modelo conta com alças largas e um recorte em formato de coração nas costas, preso por duplas alças cruzadas.",
    details: [
      "Top esportivo soft Active de suporte leve",
      "Decote em V",
      "Alças largas fixas",
      "Comprimento padrão de top esportivo: aprox. 14,4 cm (baseado no tamanho P)",
      "Tecido Soft Active leve, respirável e elástico (68% Poliéster, 32% Elastano)"
    ]
  },
   {
    id: 6,
    name: "Mini Shorts Soft Active na cor Cherry Pop",
    price: 115.00,
    image: shortsVermelho,
    images: [shortsVermelho, shortsVermelho2],
    color: "#C8102E",
    colorName: "vermelho",
    description: "Short fitness com bolsos laterais e design moderno. Liberdade de movimento para seus treinos!",
    details: [
      "Shorts mini Soft Active",
      "Cintura alta com cós elástico de camada dupla",
      "* Costuras modeladoras flatlock na frente e nas costas",
      "Tecido Soft Active leve, respirável e elástico (68% Poliéster, 32% Elastano)",
      "* Comprimento mini, entreperna de aprox. 10,5 cm (baseado no tamanho P)s"
      
    ]
  },
   {
   id: 7,
    name: "Legging Soft FitWear Cintura Alta na cor Berry Fever",
    price: 180.00,
    image: leggingVinho,
    images: [leggingVinho, leggingVinho2, leggingVinho3],
    color: "#7A0C2E",
    colorName: "vinho",
    description: "Se o seu estilo favorito é o Fitwear com um toque fofo, estas leggings foram feitas para você. Confeccionadas em nosso tecido exclusivo Soft Active, elas oferecem respirabilidade, elasticidade e tecnologia que absorve a umidade, garantindo conforto o dia todo. O modelo tem cintura média com cós elástico de sustentação, além de recortes em formato de coração na parte de trás, que modelam e destacam a silhueta de forma sutil e charmosa.",
    details: [
      "Legging Soft Active",
      "Cintura média com cós elástico de suporte",
      "Costuras modeladoras frontais e traseiras",
      "Tecido leve, respirável e altamente elástico (68% poliéster, 32% elastano)",
      "Comprimento total — entrepernas de aprox. 69 cm (tamanho P regular) e 64 cm (tamanho PP)"
    ]
  },
   {
    id: 8,
    name: "Legging Soft FitWear Cintura Alta na cor Blush Bloom",
    price: 180.00,
    image: leggingRosa,
    images: [leggingRosa, leggingRosa2, leggingRosa3],
    color: "#F4A6D7",
    colorName: "rosa",
    description: "Se o seu estilo favorito é o Fitwear com um toque fofo, estas leggings foram feitas para você. Confeccionadas em nosso tecido exclusivo Soft Active, elas oferecem respirabilidade, elasticidade e tecnologia que absorve a umidade, garantindo conforto o dia todo. O modelo tem cintura média com cós elástico de sustentação, além de recortes em formato de coração na parte de trás, que modelam e destacam a silhueta de forma sutil e charmosa.",
    details: [
      "Legging Soft Active",
      "Cintura média com cós elástico de suporte",
      "Costuras modeladoras frontais e traseiras",
      "Tecido leve, respirável e altamente elástico (68% poliéster, 32% elastano)",
      "Comprimento total — entrepernas de aprox. 69 cm (tamanho P regular) e 64 cm (tamanho PP)"
      
    ]
  },
   {
    id: 9,
    name: "Top Esportivo Soft Active com Decote em V na cor Blush Bloom",
    price: 103.00,
    image: topRosa,
    images: [topRosa, topRosa2, topRosa3],
    color: "#F4A6D7",
    colorName: "rosa",
    description: "Conheça o seu novo top esportivo favorito. Desenvolvido para oferecer suporte leve e confeccionado com o nosso tecido exclusivo Soft Active, que possui propriedades de absorção de umidade e elasticidade, ele foi projetado com uma faixa inferior sem costuras para garantir conforto sem restrições. O modelo conta com alças largas e um recorte em formato de coração nas costas, preso por duplas alças cruzadas.",
    details: [
      "Top esportivo soft Active de suporte leve",
      "Decote em V",
      "Alças largas fixas",
      "Comprimento padrão de top esportivo: aprox. 14,4 cm (baseado no tamanho P)",
      "Tecido Soft Active leve, respirável e elástico (68% Poliéster, 32% Elastano)"
    ]
  },
  {
    id: 10,
    name: "Mini Shorts Soft Active na cor Blush Bloom",
    price: 115.00,
    image: shortsRosa,
    images: [shortsRosa, shortsRosa2],
    color: "#F4A6D7",
    colorName: "rosa",
    description: "Short fitness com bolsos laterais e design moderno. Liberdade de movimento para seus treinos!",
    details: [
      "Shorts mini Soft Active",
      "Cintura alta com cós elástico de camada dupla",
      "* Costuras modeladoras flatlock na frente e nas costas",
      "Tecido Soft Active leve, respirável e elástico (68% Poliéster, 32% Elastano)",
      "* Comprimento mini, entreperna de aprox. 10,5 cm (baseado no tamanho P)s"

    ]
  },
  {
    id: 11,
    name: "Top Esportivo Soft Active na cor Berry Fever",
    price: 103.00,
    image: topVinho,
    images: [topVinho],
    color: "#7A0C2E",
    colorName: "vinho",
    description: "Conheça o seu novo top esportivo favorito. Desenvolvido para oferecer suporte leve e confeccionado com o nosso tecido exclusivo Soft Active, que possui propriedades de absorção de umidade e elasticidade, ele foi projetado com uma faixa inferior sem costuras para garantir conforto sem restrições. O modelo conta com alças largas e um recorte em formato de coração nas costas, preso por duplas alças cruzadas.",
    details: [
      "Top esportivo soft Active de suporte leve",
      "Decote em V",
      "Alças largas fixas",
      "Comprimento padrão de top esportivo: aprox. 14,4 cm (baseado no tamanho P)",
      "Tecido Soft Active leve, respirável e elástico (68% Poliéster, 32% Elastano)"
    ]
  },
  {
    id: 12,
    name: "Macacão Soft Active na cor Vanilla Dream",
    price: 250.00,
    image: macacaoBranco,
    images: [macacaoBranco, macacaoBranco2, macacaoBranco3],
    color: "#F8F6F2",
    colorName: "branco",
    description: "Macacão fitness completo para seus treinos. Design moderno e elegante, perfeito para academia ou atividades ao ar livre. Confeccionado em tecido Soft Active que oferece respirabilidade e conforto durante todo o dia.",
    details: [
      "Macacão Soft Active",
      "Cintura alta com cós elástico de suporte",
      "Alças ajustáveis",
      "Tecido leve, respirável e altamente elástico (68% poliéster, 32% elastano)",
      "Comprimento total adequado para todos os tipos de treino"
    ]
  }
 ];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByColor = (colorName: string): Product[] => {
  return products.filter(product => product.colorName === colorName);
};
