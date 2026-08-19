# lp-EGESCON — Kontiva.ai

Landing page da **Kontiva.ai** (by BlueMetrics) para o 9º EGESCON: grupo de
lançamento dos escritórios contábeis do Hub de agentes de IA.

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

## Comunicação

A página segue o material do 9º EGESCON: hero "Agentes de IA que trabalham no
seu escritório. De verdade.", o gancho do Setup de Teste grátis do evento, os
agentes do Hub (Honorários e Tributário da reforma), a vaga de lançamento e a
condição de preço. As vagas são comunicadas como limitadas, sem contagem
exposta e sem lista de espera.

## Integrações (fase Code)

- **Agendador HubSpot Meetings** — card placeholder em `app/page.jsx` (seção
  "Reserve agora"). Substituir pelo embed via `next/script`.

GTM / GA4 / UTM ainda a instrumentar.
