import { useNavigate } from "react-router-dom";

export function AccessButton() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <button
        onClick={() => navigate("/menu")}
        className="px-10 py-3 rounded-lg bg-red-600 text-white text-lg font-semibold hover:bg-red-500 transition-colors duration-200 shadow-md"
      >
        Acesse o cardápio
      </button>
    </div>
  );
}
