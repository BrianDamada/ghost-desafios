import React from "react";
import Links from "./Links";

export default function HomePainel() {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <h1>Painel de Desafios</h1>
      <div className="bg-slate-950 border border-slate-700 w-96 p-7">
        <Links />
      </div>
    </div>
  );
}
