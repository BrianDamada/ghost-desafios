"use client";

import React, { useEffect, useState } from "react";

type ButtonType = "increment" | "decrement" | "reset";
type TempMode = "none" | "allReset" | "plus100" | "minus1000";

// === CONFIGURAÇÕES (painel de variáveis) === //
const CHANCE_SHUFFLE = 0.01; // 25% de chance de embaralhar
const CHANCE_ALL_RESET = 0.005; // 5% de chance de todos os botões virarem reset
const CHANCE_PLUS_100 = 0.03; // 30% de chance do botão +1 virar +100
const CHANCE_MINUS_1000 = 0.003; // 3% de chance de todos virarem -1000
const TEMP_MODE_DURATION = 2000; // Duração do efeito temporário em milissegundos
// ========================================== //

const BUTTON_LABELS: Record<ButtonType, string> = {
  increment: "+1",
  decrement: "-1",
  reset: "Reset",
};

export default function CounterChallenge() {
  const [count, setCount] = useState(0);
  const [buttonOrder, setButtonOrder] = useState<ButtonType[]>([
    "increment",
    "decrement",
    "reset",
  ]);
  const [tempMode, setTempMode] = useState<TempMode>("none");
  const [errorMsg, setErrorMsg] = useState("");
  const [vitoria, setVitoria] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("count");
    if (saved !== null) {
      const value = parseInt(saved);
      if (value >= 90 && value <= 110) {
        localStorage.setItem("count", "0"); // zera no próprio localStorage
        setCount(0);
      } else {
        setCount(value);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  useEffect(() => {
    if (tempMode !== "none") {
      const timer = setTimeout(() => setTempMode("none"), TEMP_MODE_DURATION);
      return () => clearTimeout(timer);
    }
  }, [tempMode]);

  const handleClick = (type: ButtonType) => {
    setErrorMsg("");

    // Aplica efeito do botão clicado
    if (type === "increment") {
      if (tempMode === "plus100") {
        setCount((c) => c + 100);
      } else if (tempMode === "minus1000") {
        setCount((c) => c - 1000);
      } else if (tempMode === "allReset") {
        if (count < 0 || count > 100) {
          setErrorMsg(
            "Você não pode resetar números negativos ou maior que 100"
          );
        } else {
          setCount(0);
        }
      } else {
        setCount((c) => c + 1);
      }
    } else if (type === "decrement") {
      if (tempMode === "minus1000") {
        setCount((c) => c - 1000);
      } else if (tempMode === "allReset") {
        setCount(0);
      } else {
        setCount((c) => c - 1);
      }
    } else if (type === "reset") {
      if (count < 0) {
        setErrorMsg("Você não pode resetar números negativos");
      } else if (count > 100) {
        setErrorMsg("Você não pode resetar numeros maires que 100");
      } else if (tempMode === "minus1000") {
        setCount((c) => c - 1000);
      } else {
        setCount(0);
      }
    }

    // Embaralha com chance configurável
    if (Math.random() < CHANCE_SHUFFLE) {
      setButtonOrder(shuffle([...buttonOrder]));
    }

    // Sorteia efeito temporário baseado nas chances
    const rand = Math.random();
    if (rand < CHANCE_MINUS_1000) {
      setTempMode("minus1000");
    } else if (rand < CHANCE_MINUS_1000 + CHANCE_ALL_RESET) {
      setTempMode("allReset");
    } else if (rand < CHANCE_MINUS_1000 + CHANCE_ALL_RESET + CHANCE_PLUS_100) {
      setTempMode("plus100");
    }
  };

  const shuffle = (array: ButtonType[]): ButtonType[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getButtonLabel = (type: ButtonType): string => {
    if (tempMode === "allReset") return "Reset";
    if (tempMode === "plus100" && type === "increment") return "+100";
    if (tempMode === "minus1000") return "-1000";
    return BUTTON_LABELS[type];
  };

  useEffect(() => {
    if (count === 100) {
      setVitoria(true);
    }
  }, [count]);

  return (
    <main style={{ textAlign: "center", marginTop: "3rem" }}>
      {vitoria && (
        <div className="fixed w-[100vw] h-[100vh] bg-black/95 top-0 left-0 flex flex-col items-center justify-center">
          <h1>PARABÉNS! você conseguiu!</h1>
          <p>Desculpe é só isso que tenho para dar ;-;</p>
        </div>
      )}

      {errorMsg && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>
      )}
      <h1>Me faça chegar a 100</h1>
      <p style={{ fontSize: "2rem" }}>{count}</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        {buttonOrder.map((type) => (
          <button
            key={type}
            onClick={() => handleClick(type)}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.5rem",
              cursor: "pointer",
              minWidth: "120px",
            }}
            className="bg-blue-600 rounded-md"
          >
            {getButtonLabel(type)}
          </button>
        ))}
      </div>
      <p className="fixed w-[100vw] p-7 bottom-0 text-slate-700">
        caso você esteja em uma situação muito ruim você pode resetar clicando
        em{" "}
        <button
          className="text-slate-900 cursor-pointer hover:text-red-600"
          onClick={() => setCount(0)}
        >
          SOU ARREGÃO
        </button>
      </p>
    </main>
  );
}
