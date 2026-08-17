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

## Estado da turma fundadora

O bloco `FOUNDING` no topo de `app/page.jsx` controla o estado da campanha:

```js
const FOUNDING = { slotsOpen: true, slotsLeft: 6 };
```

Ele dirige, em toda a página, os CTAs, o badge de vagas e o aviso do agendador.
Quando `slotsLeft` chega a `0` (ou `slotsOpen` é `false`), o CTA passa a apontar
para o WhatsApp e o agendador mostra o aviso de turma completa. Na fase de
produção, esse estado deve vir do CMS ou do inventário de vagas.

## Integrações

- **Agendador HubSpot Meetings** — embed real (agenda de lançamento EGESCON,
  `diego-rodrigues4/lancamentoegescon`), único caminho de conversão, carregado
  via `next/script` (`MeetingsEmbedCode.js`).

GTM / GA4 / UTM ainda a instrumentar.
