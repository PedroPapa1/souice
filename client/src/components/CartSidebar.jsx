import { useCartContext } from "../contexts/useCartContext";

export function CartSidebar({ isOpen, closeSidebar }) {
  const { cartItems = [], removeFromCart, updateQuantity } = useCartContext();

  const total = cartItems.reduce((acc, item) => {
    return acc + item.fields.price * item.quantity;
  }, 0);

  async function handleCheckout(items) {
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("Carrinho vazio ou inválido");
      return;
    }

    // 🔧 Aqui transformamos os dados antes de enviar para o backend
    const payload = items.map((item) => ({
      title: item.fields.name,
      unit_price: item.fields.price,
      quantity: item.quantity,
    }));

    try {
      const res = await fetch("http://localhost:3000/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: payload }),
      });

      const data = await res.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        console.error("Erro ao obter init_point:", data);
      }
    } catch (error) {
      console.error("Erro no checkout:", error);
    }
  }

  return (
    <div
      className={`fixed top-0 right-0 w-80 bg-white shadow-xl transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out h-full z-50`}
    >
      <div className="p-6 relative h-full flex flex-col">
        <h2 className="text-xl font-bold mb-6">Carrinho</h2>
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-gray-600 text-xl font-bold"
          aria-label="Fechar carrinho"
        >
          ×
        </button>

        {cartItems.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <div className="space-y-6 overflow-y-auto pr-2 max-h-[80%] flex-grow">
            {cartItems.map((item) => {
              const { sys, fields, quantity } = item;
              const imageUrl = fields?.image?.fields?.file?.url;

              return (
                <div key={sys.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center">
                    <img
                      src={imageUrl || "/no-image.png"}
                      alt={fields?.name}
                      className="h-16 w-16 object-cover rounded-lg mr-3"
                    />
                    <div>
                      <h3 className="font-semibold text-sm">{fields?.name}</h3>
                      <p className="text-sm text-gray-600">R$ {fields?.price?.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(sys.id, "decrease")}
                        className="text-red-600 px-2"
                        aria-label={`Diminuir quantidade de ${fields?.name}`}
                      >
                        -
                      </button>
                      <span className="px-2">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(sys.id, "increase")}
                        className="text-red-600 px-2"
                        aria-label={`Aumentar quantidade de ${fields?.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(sys.id)}
                      className="text-xs text-red-500"
                      aria-label={`Remover ${fields?.name} do carrinho`}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {cartItems.length > 0 && (
          <>
            <div className="flex justify-between mt-4 text-lg font-bold">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => handleCheckout(cartItems)}
              className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Finalizar Compra
            </button>
          </>
        )}
      </div>
    </div>
  );
}
