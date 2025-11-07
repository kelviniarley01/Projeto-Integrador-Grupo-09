import { useState, useEffect } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  color?: string;
  colorName?: string;
}

const CART_STORAGE_KEY = "cart";

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Carrega o carrinho do localStorage ao montar
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setItems(parsedCart);
        }
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
      }
    };
    loadCart();
  }, []);

  // Salva no localStorage sempre que items mudar
  const saveToLocalStorage = (cartItems: CartItem[]) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Erro ao salvar carrinho:", error);
    }
  };

  // Adiciona item ao carrinho
  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((i) => i.id === item.id);

      let updatedItems: CartItem[];
      if (existingItem) {
        // Se já existe, incrementa a quantidade
        updatedItems = currentItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Se não existe, adiciona com quantidade 1
        updatedItems = [...currentItems, { ...item, quantity: 1 }];
      }

      saveToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  // Remove item do carrinho
  const removeItem = (id: number) => {
    setItems((currentItems) => {
      const updatedItems = currentItems.filter((item) => item.id !== id);
      saveToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  // Atualiza quantidade de um item
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((currentItems) => {
      const updatedItems = currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      saveToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  // Limpa o carrinho
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  // Calcula o total de itens
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Calcula o valor total
  const totalValue = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalValue,
  };
};
