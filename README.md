# lp-EGESCON — Kontiva.ai

Landing page da **Kontiva.ai** (by BlueMetrics) para o 9º EGESCON: seleção dos
escritórios contábeis fundadores do Hub de agentes de IA.

Construída em **Next.js (App Router)** a partir do design exportado do Claude
Design, recriando o protótipo fiel ao pixel e herdando o design system Kontiva
(lockup, ciano como acento único, RadarCard, tipografia Inter / Instrument Serif
/ JetBrains Mono).

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # build de produção
```

## Estrutura

```
app/
  layout.jsx            # metadata + <html>/<body>, importa globals.css
  page.jsx              # a landing inteira (client component)
  globals.css           # importa o design system + estilos da página
  components/
    RadarCard.jsx        # mock escuro de varredura do hero
  ds/                    # design system Kontiva (tokens + css)
project/                 # bundle de design original (referência)
chats/                   # transcrições do design (provenance)
```

## Estado do grupo de lançamento

O bloco `LAUNCH` no topo de `app/page.jsx` controla o estado da campanha:

```js
const LAUNCH = { slotsOpen: true, slotsLeft: 6 };
```

Ele dirige, em toda a página, os CTAs, o badge de vagas, as headlines, o
destaque da lista de espera e o aviso do agendador. Quando `slotsLeft` chega a
`0`, a lista de espera libera automaticamente (mesmo com `slotsOpen: true`). Na
fase de produção, esse estado deve vir do CMS ou do inventário de vagas.

## Integrações (fase Code)

Duas integrações ficaram como stubs visuais na marca, com hooks marcados no
código:

- **Agendador HubSpot Meetings** — card placeholder em `app/page.jsx` (Caminho
  A). Substituir pelo embed via `next/script`.
- **Lista de espera** — form visual (Caminho B). Ligar o `onWaitlistSubmit` ao
  POST da Forms Submission API v3 do HubSpot.

GTM / GA4 / UTM ainda a instrumentar.
