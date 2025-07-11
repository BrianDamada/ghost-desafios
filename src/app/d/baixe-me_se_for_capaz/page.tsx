import ChallengeHeader from "@/app/components/chalengeHeader/ChallengeHeader";
import React from "react";
import AntiLeakShield from "@/app/components/antiLeakShield/AntiLeakShield";
import RenderImage from "./RenderImage";

export default function page() {
  let items = {
    title: "Descrição:",
    description:
      "esse desafio é bem 'simples' he he he... baixe a imagem a baixo se for capaz de faze-lo >:)         OBS: para o desafio ser concluido você deve ter a imagem em png jpg ou qualquer formato de imagem valido!",
    maxLength: 10,
  };

  return (
    <div>
      <AntiLeakShield />
      <div className="min-h-[350px] p-5">
        <ChallengeHeader>
          <p>
            <strong>BEM-VINDO AO PRIMEIRO DESAFIO!</strong> Baixe a imagem
            abaixo, se for capaz disso &gt;:^]
          </p>
          <br />
          <p className="text-[10px]">
            OBS: o desafio é considerado completo se você tiver um arquivo em
            PNG, JPG ou qualquer outro formato de imagem válido.{" "}
            <strong className="text-red-600">
              <em>(HTML não é um formato de imagem!).</em>
            </strong>{" "}
            <br />
            Outra coisa: eu não posso e não consigo te impedir de tirar print da
            tela — então isso não conta como solução.
          </p>
        </ChallengeHeader>
      </div>
      <hr className="border border-slate-500" />

      <div className="w-full flex flex-col justify-center items-center left-0">
        <RenderImage />
      </div>

      {/* <div className="w-full flex items-center justify-center mt-10 desafio-1">
        <img src="/imagens/image.png" />
      </div> */}
    </div>
  );
}
