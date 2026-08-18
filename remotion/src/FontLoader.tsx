import React, { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";

/* Carrega Inter + JetBrains Mono do Google Fonts. Best-effort: se a rede
   estiver bloqueada no ambiente de render, libera após um timeout curto e
   cai no fallback do stack de fontes, sem travar o render. */
export const FontLoader: React.FC = () => {
  const [handle] = useState(() => delayRender("Carregando fontes"));

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);

    const done = () => continueRender(handle);
    const timeout = setTimeout(done, 2500);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        clearTimeout(timeout);
        done();
      });
    } else {
      link.onload = () => {
        clearTimeout(timeout);
        done();
      };
    }
    return () => clearTimeout(timeout);
  }, [handle]);

  return null;
};
