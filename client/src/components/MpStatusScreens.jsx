import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

export function MpStatusScreens() {
  const location = useLocation();
  const [query] = useSearchParams();
  const navigate = useNavigate();

  const paymentId = query.get("payment_id");
  const status = query.get("status");
  const error = query.get("error");

  const path = location.pathname;

  let icon, title, message, bgColor, color, btnColor, btnText;

  if (path === "/success") {
    icon = "✅";
    title = "Pagamento Aprovado!";
    message = (
      <>
        Obrigado pela sua compra.
        <br />
        <strong>ID do pagamento:</strong> {paymentId}
        <br />
        <strong>Status:</strong> {status}
      </>
    );
    bgColor = "#e0f8e9";
    color = "#2f6627";
    btnColor = "#2f6627";
    btnText = "Voltar ao Menu";
  } else if (path === "/failure") {
    icon = "❌";
    title = "Pagamento Falhou";
    message = error || "Ocorreu um erro no pagamento.";
    bgColor = "#fdecea";
    color = "#b00020";
    btnColor = "#b00020";
    btnText = "Tentar Novamente";
  } else if (path === "/pending") {
    icon = "⏳";
    title = "Pagamento Pendente";
    message = status || "Aguardando confirmação do pagamento.";
    bgColor = "#fff4e5";
    color = "#b36b00";
    btnColor = "#b36b00";
    btnText = "Voltar ao Menu";
  } else {
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: bgColor,
          color: color,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "6rem", marginBottom: "1rem" }}>{icon}</div>
        <h1>{title}</h1>
        <p style={{ whiteSpace: "pre-line" }}>{message}</p>
        <button
          onClick={() => navigate("/menu")}
          style={{
            marginTop: "2rem",
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            backgroundColor: btnColor,
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {btnText}
        </button>
      </main>
    </div>
  );
}
