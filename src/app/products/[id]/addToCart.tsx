'use client';
import { useState } from "react";
import { ShoppingBag, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

interface AddToCartProps {
  productId: string;
  variant?: "small" | "large";
}

interface CartItem {
  productId: string;
  amount: number;
}

export default function AddToCart({ productId, variant = "small" }: AddToCartProps) {
  const [amount, setAmount] = useState<number>(1);

  const handleAddClick = () => {
    const existingCart = localStorage.getItem("cart");
    const cart = existingCart ? JSON.parse(existingCart) : [];
    if (cart.some((item: CartItem) => item.productId === productId)) {
      const updatedCart = cart.map((item: CartItem) => {
        if (item.productId === productId) {
          return { ...item, amount: item.amount + amount };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newCartItem = { productId, amount: 1 };
      localStorage.setItem("cart", JSON.stringify([...cart, newCartItem]));
    }
    toast.success("Item added to cart");
  }

  if (variant === "small") {
    return (
      <button
        onClick={handleAddClick}
        className="flex"
        aria-label="Add to cart"
      >
        <ShoppingBag size={20} />
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <div className="flex items-center rounded-full p-2 bg-gray-200">
        <button
          onClick={() => {
            if (amount > 1) setAmount(Math.max(1, amount - 1))
          }}
          className="flex"
          aria-label="Decrease amount"
        >
          <Minus size={20} />
        </button>
        <span className="mx-2">{amount}</span>
        <button
          onClick={() => setAmount(amount + 1)}
          className="flex"
          aria-label="Increase amount"
        >
          <Plus size={20} />
        </button>
      </div>
      <button
        onClick={handleAddClick}
        className="w-full rounded-full text-white bg-black"
        aria-label="Add to cart"
      >
        Add to cart
      </button>
    </div>
  );
}