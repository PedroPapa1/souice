import instagramLogo from "../../assets/icons8-instagram.svg";
import facebookLogo from "../../assets/icons8-facebook.svg";
import whatsappLogo from "../../assets/icons8-whatsapp.svg";
import "./Footer.css";

export function Footer() {
  return (
    <section id="footer" className="bg-red-600 w-full mt-auto">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-center items-center gap-6 mb-4">
          <a href="https://www.instagram.com/souicescs/" target="_blank">
            <img src={instagramLogo} alt="logo do instagram" className="w-10 h-10 hover:opacity-80 transition" />
          </a>
          <a href="https://www.facebook.com/souicescs/" target="_blank">
            <img src={facebookLogo} alt="logo do facebook" className="w-10 h-10 hover:opacity-80 transition" />
          </a>
          <a href="https://wa.me/+5511989485882?text=Olá,%20queria%20fazer%20um%20pedido!" target="_blank">
            <img src={whatsappLogo} alt="logo do whatsapp" className="w-10 h-10 hover:opacity-80 transition" />
          </a>
        </div>
        <div className="text-center">
          <p className="text-stone-100 text-sm">&copy; 2025 Sou ice SCS, Inc.</p>
        </div>
      </div>
    </section>
  );
}
