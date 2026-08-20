# Vídeos isolados dos cards animados (Meta Ads)

Vídeos com fundo transparente (alpha) dos dois cards animados da LP, para compor criativos de Meta Ads. **Não têm relação com a LP em runtime** e não alteram nenhum arquivo do projeto: o gerador apenas replica os estilos do componente `RadarCard` (mesmas cores, fontes e keyframes `scan`/`pulse`).

## Arquivos entregues

| Card | webm (VP9 alpha) | ProRes 4444 (.mov, alpha) |
|------|------------------|---------------------------|
| Simulação da Reforma | `kontiva-simulacao.webm` (1088×920) | `kontiva-simulacao-prores.mov` (624px) |
| Conciliação de Honorários | `kontiva-conciliacao.webm` (1088×920) | `kontiva-conciliacao-prores.mov` (624px) |

- **webm**: formato principal, resolução cheia, quase sem perdas. CapCut, DaVinci, Canva, Premiere/AE (com plugin).
- **ProRes .mov**: fallback universal para editores. Dimensionado a 624px só por causa do limite de 30 MB do canal de entrega.
- Loop perfeito de **3,6s** (sem emenda). Feixe de varredura + ponto "live" pulsando.

## Regenerar / gerar variações

```bash
npm i ffmpeg-static playwright-core   # já usa o Chromium pré-instalado do ambiente
node card.mjs
```

Parâmetros no topo do `card.mjs`: `FPS`, `W` (largura), `SCALE` (nitidez). Os dados de cada card ficam em `CARDS`.

Para ProRes em resolução cheia (~75 MB cada), encode direto dos frames:

```bash
ffmpeg -framerate 30 -i frames/simulacao/f_%04d.png \
  -c:v prores_ks -profile:v 4444 -pix_fmt yuva444p10le -vendor apl0 kontiva-simulacao.mov
```

`frames/` e os `.mov` full-res são ignorados pelo git (regeneráveis).
