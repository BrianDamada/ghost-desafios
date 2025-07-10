"use client";

import { useEffect, useState } from "react";

const PixelImage = () => {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    fetch("/imagem/pixelFragment.html")
      .then((res) => res.text())
      .then((text) => setHtml(text));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default PixelImage;
