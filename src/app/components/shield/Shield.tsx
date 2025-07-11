"use client";
import React, { useEffect, useRef, useState } from "react";

type ShieldProps = {
  all?: boolean;
  f12?: boolean;
  ctrlShiftI?: boolean;
  botaoDireito?: boolean;
  savePage?: boolean;
  barraDeFerramentas?: boolean;
};

export default function Shield({
  all = false,
  f12 = false,
  ctrlShiftI = false,
  botaoDireito = false,
  savePage = false,
  barraDeFerramentas = false,
}: ShieldProps) {
  const ativar = {
    f12: all || f12,
    ctrlShiftI: all || ctrlShiftI,
    botaoDireito: all || botaoDireito,
    savePage: all || savePage,
    barraDeFerramentas: all || barraDeFerramentas,
  };

  const mensagens = {
    f12: {
      title: "F12 aqui não!",
      mensage: "Trapacear só tira a graça do desafio",
    },
    savePage: {
      title: "Quase lá!",
      mensage: "Por que você quer salvar a página?",
    },
    botaoDireito: {
      title: "Noop",
      mensage: "Por via das dúvidas, melhor você não ter acesso a isso",
    },
    ctrlShiftI: {
      title: "Essa foi boa!",
      mensage:
        "Caramba! Nunca vi alguém abrir o DevTools pelo 'Ctrl + Shift + I'.",
    },
    barraDeFerramentas: {
      title: "NOOOOOO!",
      mensage: "DEVTOOLS PELA BARRA DE FERRAMENTAS! MINHA MAIOR FRAQUEZA!",
    },
  };

  const [mensagemAtual, setMensagemAtual] = useState<null | {
    title: string;
    mensage: string;
  }>(null);
  const [visivel, setVisivel] = useState(false);
  const [devToolsOpen, setDevToolsOpen] = useState(false);

  function showMensage(tipo: keyof typeof mensagens) {
    setMensagemAtual(mensagens[tipo]);
    setVisivel(true);
    setTimeout(() => setVisivel(false), 3000);
    setTimeout(() => setMensagemAtual(null), 4000);
  }

  useEffect(() => {
    if (!ativar.f12) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "F12") {
        e.preventDefault();
        showMensage("f12");
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [ativar.f12]);

  useEffect(() => {
    if (!ativar.ctrlShiftI) return;
    const handler = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const ctrlOrCommand = isMac ? event.metaKey : event.ctrlKey;
      if (ctrlOrCommand && event.shiftKey && event.key.toLowerCase() === "i") {
        event.preventDefault();
        showMensage("ctrlShiftI");
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [ativar.ctrlShiftI]);

  useEffect(() => {
    if (!ativar.botaoDireito) return;
    const handler = (event: MouseEvent) => {
      event.preventDefault();
      showMensage("botaoDireito");
    };
    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, [ativar.botaoDireito]);

  useEffect(() => {
    if (!ativar.savePage) return;
    const handler = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const ctrlOrCommand = isMac ? event.metaKey : event.ctrlKey;
      if (ctrlOrCommand && event.key.toLowerCase() === "s") {
        event.preventDefault();
        showMensage("savePage");
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [ativar.savePage]);

  // DevTools detection
  const [initialSize, setInitialSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [mensagemIndex, setMensagemIndex] = useState(0);
  const mensagensDevToolsAberto = [
    {
      title: "CONSIDERE ISSO UMA AMEAÇA!",
      text: "loc: -21.059591393041167, -49.06299778895578; link maps.app.goo.gl/ktoAdt2gNwp2hH88A",
    },
  ];
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ativar.barraDeFerramentas) return;
    setInitialSize({ width: window.innerWidth, height: window.innerHeight });
  }, [ativar.barraDeFerramentas]);

  useEffect(() => {
    if (!ativar.barraDeFerramentas || !initialSize) return;
    const threshold = 160;
    const resizeHandler = () => {
      const widthDiff = Math.abs(window.innerWidth - initialSize.width);
      const heightDiff = Math.abs(window.innerHeight - initialSize.height);
      setDevToolsOpen(widthDiff > threshold || heightDiff > threshold);
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [initialSize, ativar.barraDeFerramentas]);

  useEffect(() => {
    if (!ativar.barraDeFerramentas || !containerRef.current) return;

    const observer = new MutationObserver(() => {
      if (!document.body.contains(containerRef.current!)) {
        setMensagemIndex((prev) => (prev + 1) % mensagensDevToolsAberto.length);
        setDevToolsOpen(true);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [ativar.barraDeFerramentas]);

  const mensagem = mensagensDevToolsAberto[mensagemIndex];

  return (
    <div>
      {mensagemAtual && (
        <div
          className={`
            fixed left-0 top-0 w-[100vw] h-[100vh] z-50
            flex flex-col items-center justify-center
            bg-black/75 text-white
            transition-all duration-700 ease-in-out
            ${visivel ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <h1 className="text-3xl font-bold mb-4 animate-pulse">
            {mensagemAtual.title}
          </h1>
          <p className="text-lg">{mensagemAtual.mensage}</p>
        </div>
      )}

      <div
        ref={containerRef}
        className={`
          fixed left-0 top-0 w-[100vw] h-[100vh] z-50
          flex flex-col items-center justify-center
          bg-black/95 text-white text-center px-4
          transition-all duration-700 ease-in-out
          ${
            devToolsOpen && ativar.barraDeFerramentas
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        <h1 className="text-3xl font-bold mb-4">{mensagem.title}</h1>
        <p className="text-lg">{mensagem.text}</p>
      </div>
    </div>
  );
}
