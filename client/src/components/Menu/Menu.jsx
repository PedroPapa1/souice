import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartSidebar } from "../CartSideBar.jsx";
import { useContentful } from "../../hooks/useContentful.js";
import { useCartContext } from "../../contexts/useCartContext.js";
import logo from "/logo.png";
import { ProductCard } from "../ProductCard.jsx";
import "./menu.css";

export function Menu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { categories, products } = useContentful();
  const { totalItems } = useCartContext();

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <header className="gradient-background h-24 w-full" />

      <div className="flex flex-col items-center -mt-12">
        <img src={logo} alt="logo da Sou ice" className="w-24 h-24 rounded-full border-4 border-white shadow-md" />
      </div>

      <div className="p-8 w-full max-w-6xl">
        <h2 className="text-4xl font-bold mb-6 text-red-700 text-center">Cardápio</h2>

        {categories.map((category) => (
          <div key={category.sys.id} className="mb-12 bg-gray-50 shadow-xl rounded-xl p-6">
            <h3 className="text-3xl font-semibold text-red-600 mb-6">{category.fields.title}</h3>

            <div className="flex flex-col gap-0">
              {products
                .filter((product) => product.fields.category.sys.id === category.sys.id)
                .map((product) => (
                  <ProductCard key={product.sys.id} product={product} />
                ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 bg-red-600 p-4 rounded-full text-white text-2xl shadow-lg hover:bg-red-500"
      >
        <FaShoppingCart />
        {totalItems > 0 && (
          <div className="absolute top-0 right-0 bg-red-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </div>
        )}
      </button>

      <CartSidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
    </div>
  );
}
