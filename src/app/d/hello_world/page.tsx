"use client";

import { useState } from "react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";

function generateRotor(position: number): Record<string, string> {
  const map: Record<string, string> = {};
  for (let i = 0; i < alphabet.length; i++) {
    const originalChar = alphabet[i];
    const shiftedChar = alphabet[(i + position) % alphabet.length];
    map[originalChar] = shiftedChar;
  }
  return map;
}

// Função que simula o texto "cifrado" como na máquina Enigma
function encryptText(input: string): string {
  let result = "";
  for (let i = 0; i < input.length; i++) {
    const rotor = generateRotor(i + 1); // rotor rotaciona a cada caractere
    const char = input[i];
    result += rotor[char] || char; // mantém caractere original se fora do alfabeto
  }
  return result;
}

export default function EnigmaSimulator() {
  const [userInput, setUserInput] = useState("");

  const displayText = encryptText(userInput);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(e.target.value);
  }

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col text-center items-center justify-center">
      <div className="h-[100px]">
        <h1>{displayText}</h1>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        style={{
          fontSize: "1.5rem",
          padding: "0.5rem",
          width: "300px",
          display: "block",
          marginTop: "1rem",
        }}
        placeholder="Digite Hello World"
      />
      <p style={{ marginTop: "1rem" }}>
        O texto acima é cifrado como uma máquina Enigma. Cada tecla muda o
        resultado.
      </p>
    </div>
  );
}
