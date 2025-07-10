"use client";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import DescriptionMenu from "../descriptionMenu/DescriptionMenu";

interface Props {
  title?: string;
  children?: ReactNode;
}

export default function ChallengeHeader({ title, children }: Props) {
  const fullPath = usePathname();
  const path = fullPath.replaceAll("_", " ").split("/").pop();
  const displayTitle = title || path;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="mb-10">{displayTitle?.toUpperCase()}!</h1>
      <DescriptionMenu>{children}</DescriptionMenu>
    </div>
  );
}
