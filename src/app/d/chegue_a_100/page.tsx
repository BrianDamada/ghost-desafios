import ChallengeHeader from "@/app/components/chalengeHeader/ChallengeHeader";
import Shield from "@/app/components/shield/Shield";
import React from "react";
import CounterChallenge from "./CounterChallenge";

export default function page() {
  return (
    <div>
      <Shield all={true} />
      <div className="h-[300px] mt-28">
        <ChallengeHeader>
          <h2>Chegue Ao Numero 100!</h2>
          <p>esse desafio é bem simples, clique no +1 até chegar a 100 😇</p>
        </ChallengeHeader>
      </div>
      <CounterChallenge />
    </div>
  );
}
