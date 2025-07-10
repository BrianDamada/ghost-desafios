"use client";

import { useEffect, useState } from "react";

const mensagens = [
  { titulo: "sério?", texto: "botão direito? parabéns por tentar o obvio" },
  {
    titulo: "DevTools? Passo!",
    texto: "isso já é mais inteligente, mas não essa não é a solução :D",
  },
  {
    titulo: "Nananinanão!",
    texto: "Salvar a pagina? isso é bem incomum, mas eu pensei nisso",
  },
  {
    titulo: "PrintScreen detectado",
    texto:
      "técnicamente não posso te impedir de tirar print, mas é bem patético fazer desta forma T_ T",
  },
];

const AntiLeakShield = () => {
  const [mensagem, setMensagem] = useState<{
    titulo: string;
    texto: string;
  } | null>(null);

  useEffect(() => {
    // Bloqueia botão direito
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setMensagem(mensagens[0]);
    };

    // Bloqueia F12, Ctrl+S, PrintScreen
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12") {
        e.preventDefault();
        setMensagem(mensagens[1]);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        setMensagem(mensagens[2]);
      }
      if (e.key === "PrintScreen") {
        e.preventDefault();
        setMensagem(mensagens[3]);
      }
    };

    // Detecta abertura de DevTools via resize hack
    let devtoolsOpen = false;
    const interval = setInterval(() => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;
      if ((widthThreshold || heightThreshold) && !devtoolsOpen) {
        devtoolsOpen = true;
        setMensagem(mensagens[1]);
      }
    }, 1000);

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {mensagem && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.85)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            {mensagem.titulo}
          </h1>
          <p style={{ fontSize: "1.25rem", maxWidth: "600px" }}>
            {mensagem.texto}
          </p>
          <button
            onClick={() => setMensagem(null)}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 2rem",
              background: "white",
              color: "black",
              border: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              borderRadius: "0.5rem",
            }}
          >
            Continuar
          </button>
        </div>
      )}
    </>
  );
};

export default AntiLeakShield;
