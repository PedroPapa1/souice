import "./Welcome.css";
import logo from "/logo.png";
import { AccessButton } from "../AccessButton";

export function Welcome({ status }) {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center text-center">
        <img src={logo} alt="logo da Sou ice" className="w-28 h-28 rounded-full border-4 border-white shadow-md mb-4" />
        <strong className="text-4xl font-extrabold text-red-700 drop-shadow-sm mb-2">Sou ice</strong>
        <p className="text-stone-500 text-lg max-w-md">Receba seu pedido em casa pagando pelo mesmo valor da loja!</p>
        <p className="mt-2 text-sm text-stone-400">{status}</p>
      </div>
      <div className="mt-8">
        <AccessButton />
      </div>
    </div>
  );
}
