import { useCartContext } from "../contexts/useCartContext";

export function ProductCard({ product }) {
  const { addToCart } = useCartContext();

  const { fields } = product;
  const name = fields?.name;
  const price = fields?.price;
  const description = fields?.description;
  const imageUrl = fields?.image?.fields?.file?.url;

  function handleAddToCart() {
    addToCart(product);
  }

  return (
    <div className="flex items-center justify-between w-full py-4">
      {imageUrl ? (
        <img src={`https:${imageUrl}`} alt={name} className="w-40 h-40 object-cover rounded-xl" />
      ) : (
        <div className="w-40 h-40 bg-gray-300 flex items-center justify-center text-white rounded-xl">Sem imagem</div>
      )}

      <div className="flex-1 px-6">
        <h3 className="font-bold text-xl">{name}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <p className="text-lg font-semibold mt-2 text-red-600">R$ {price?.toFixed(2)}</p>
      </div>

      <button onClick={handleAddToCart} className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
        Adicionar
      </button>
    </div>
  );
}
