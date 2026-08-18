# Kontiva EGESCON · Motion graphic (Remotion)

Motion graphic dos dois agentes que já rodam no Hub Kontiva (Conciliador de
Honorários e Tributário / ICMS), no design system oficial (Inter + JetBrains
Mono, ciano + azul-profundo). Feito com [Remotion](https://remotion.dev).

Composição: `AgentsRoadmap` · 1920x1080 · 30fps · 10s.

## Rodar

```bash
cd remotion
npm install
npm run studio      # abre o Remotion Studio para editar/pré-visualizar
```

## Renderizar (mp4)

```bash
npm run render                 # usa o Chrome que o Remotion baixa
```

Em ambientes sem o download do Chrome do Remotion (ex.: CI, sandbox), aponte
para um Chrome "headless shell" já instalado:

```bash
npm run render:chromium        # usa /opt/pw-browsers/chromium
# ou diretamente o headless shell:
npx remotion render AgentsRoadmap out/agents-roadmap.mp4 \
  --browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
```

Saída em `out/agents-roadmap.mp4` (a pasta `out/` é ignorada no git).

## Estrutura

- `src/Root.tsx` — registra a composição
- `src/AgentsRoadmap.tsx` — a animação
- `src/FontLoader.tsx` — carrega as webfonts (best-effort, com timeout)
- `src/theme.ts` — tokens de cor e fontes espelhados da LP
