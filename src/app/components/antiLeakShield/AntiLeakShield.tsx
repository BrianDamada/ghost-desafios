"use client";
import React, { useEffect, useState, useRef } from "react";

export default function AntiLeakShield() {
  // MENSAGENS DE BLOQUEIO!
  let mensagens = {
    f12: {
      title: "F12 aqui não!",
      mensage: "Não vai ser tão fácil assim, amigo :)",
    },
    savePage: {
      title: "Quase lá!",
      mensage: "Ctrl+S é algo bem incomum, mas eu previ isso.",
    },
    botaoDireito: {
      title: "Sério mesmo?",
      mensage:
        "Você realmente tentou o botão direito? Parabéns por tentar o mais óbvio possível!",
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
  // ==========================================================================================
  // variaveis
  // ==========================================================================================

  const [mensagemAtual, setMensagemAtual] = useState<null | {
    title: string;
    mensage: string;
  }>(null);
  const [visivel, setVisivel] = useState(false);

  // ==========================================================================================
  // função para mostrar mensagem
  // ==========================================================================================

  let time = 3000;
  function showMensage(tipo: keyof typeof mensagens) {
    setMensagemAtual(mensagens[tipo]);
    setVisivel(true);

    console.log(visivel);
    console.log(mensagemAtual);

    setTimeout(() => {
      setVisivel(false);
    }, time);

    setTimeout(() => {
      setMensagemAtual(null);
    }, time + 1000);
  }

  // ==========================================================================================
  // apertou f12
  // ==========================================================================================
  useEffect(() => {
    const apertouF12 = (e: KeyboardEvent) => {
      if (e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        showMensage("f12");
      }
    };

    document.addEventListener("keydown", apertouF12);

    return () => {
      document.removeEventListener("keydown", apertouF12);
    };
  }, []);

  // ==========================================================================================
  // tentou Ctrl+Shift+I
  // ==========================================================================================
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const ctrlOrCommand = isMac ? event.metaKey : event.ctrlKey;

      const isDevToolsShortcut =
        ctrlOrCommand && event.shiftKey && event.key.toLowerCase() === "i";

      if (isDevToolsShortcut) {
        event.preventDefault();
        showMensage("ctrlShiftI");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ==========================================================================================
  // clicou com o botão direito
  // ==========================================================================================
  useEffect(() => {
    const handleRighClick = (event: MouseEvent) => {
      event.preventDefault();
      showMensage("botaoDireito");
    };
    document.addEventListener("contextmenu", handleRighClick);

    return () => {
      document.removeEventListener("contextmenu", handleRighClick);
    };
  }, []);

  // ==========================================================================================
  // tentou salvar a tela
  // ==========================================================================================
  useEffect(() => {
    const handleSavePage = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const ctrlOrCommand = isMac ? event.metaKey : event.ctrlKey;

      if (ctrlOrCommand && event.key.toLowerCase() === "s") {
        event.preventDefault();
        showMensage("savePage");
      }
    };
    document.addEventListener("keydown", handleSavePage);

    return () => {
      document.removeEventListener("keydown", handleSavePage);
    };
  }, []);

  // ==========================================================================================
  // função para saber que o usuario está com o DevTools aberto
  // ==========================================================================================
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [initialSize, setInitialSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // 1. Armazena tamanho inicial
  useEffect(() => {
    setInitialSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  // 2. Detecta alterações e marca devTools como aberto/fechado
  useEffect(() => {
    if (!initialSize) return;

    const threshold = 160;

    const handleResize = () => {
      const widthDiff = Math.abs(window.innerWidth - initialSize.width);
      const heightDiff = Math.abs(window.innerHeight - initialSize.height);
      setDevToolsOpen(widthDiff > threshold || heightDiff > threshold);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initialSize]);

  // 3. se o usuario estiver com o devTools aberto aparecer uma tela preta em cima de tudo

  const mensagensDevToolsAberto = [
    {
      title: "CONSIDERE ISSO UMA AMEAÇA!",
      text: "loc: -21.059591393041167, -49.06299778895578; link maps.app.goo.gl/ktoAdt2gNwp2hH88A",
    },
  ];

  const [mensagemIndex, setMensagemIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const observer = new MutationObserver(() => {
      const stillInDOM = document.body.contains(target);
      if (!stillInDOM) {
        setMensagemIndex((prev) => (prev + 1) % mensagensDevToolsAberto.length);

        // reanexa a div removida (React cuida da renderização)
        setDevToolsOpen(true); // força exibir a nova mensagem
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [containerRef.current]);

  const mensagem = mensagensDevToolsAberto[mensagemIndex];

  // ==========================================================================================
  // abriu pelo menu de ferramentas
  // ==========================================================================================
  useEffect(() => {
    const detectDevToolsOpen = () => {
      const threshold = 160;
      const devToolsAberto =
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold;
    };
    window.addEventListener("resize", detectDevToolsOpen);
    detectDevToolsOpen();

    return () => {
      window.removeEventListener("resize", detectDevToolsOpen);
    };
  }, []);

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
        ${devToolsOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      >
        <h1 className="text-3xl font-bold mb-4">{mensagem.title}</h1>
        <p className="text-lg">{mensagem.text}</p>
      </div>
    </div>
  );
}
