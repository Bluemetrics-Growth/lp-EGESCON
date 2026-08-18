"use client";

import { useEffect, useState } from "react";
import RadarCard from "./components/RadarCard";
import Reveal from "./components/Reveal";
import CountUp from "./components/CountUp";


/* Link de agendamento (Google Calendar Appointment Scheduling). */
const SCHEDULER_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2-qsOojrD73dO48zSXLJ_hiu91ZSD5fNqo0s24NOJq4zc6n7XtKrQUF_2rECb8Gm50l258XovZ?gv=true";

const svgProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const BENEFITS = [
  {
    title: "Achar dinheiro",
    body: "A conciliação de honorários acha receita que o escritório deixa de cobrar, contrato por contrato.",
    icon: (
      <svg {...svgProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="M11 7v4l2.5 1.5" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
  {
    title: "Multiplicar capacidade",
    body: "Mais clientes atendidos com as mesmas pessoas. O agente faz o trabalho repetitivo.",
    icon: (
      <svg {...svgProps}>
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M3 12l9 4 9-4" />
        <path d="M3 17l9 4 9-4" />
      </svg>
    ),
  },
  {
    title: "Vitrine de IA de verdade",
    body: "O escritório mostra à carteira dele que opera com agentes reais, não com promessa.",
    icon: (
      <svg {...svgProps}>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="m8 11 2 2 4-4" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    n: "01",
    title: "Reserva a vaga",
    body: "Sem cartão, sem assinar nada agora. Você só garante o lugar no Setup EGESCON.",
  },
  {
    n: "02",
    title: "A gente faz o Setup de Teste",
    body: "Gratuito, com uma amostra dos seus dados. A equipe Kontiva monta e roda.",
  },
  {
    n: "03",
    title: "Você vê rodando nos SEUS números",
    body: "O Kontiva funcionando na sua carteira, antes de pagar qualquer coisa.",
  },
  {
    n: "04",
    title: "7 dias para decidir",
    body: "Após o setup. Se não seguir, a vaga volta pra fila, sem ruído.",
  },
];

/* Dois agentes já rodando hoje: as estrelas da seção. */
const ACTIVE_AGENTS = [
  {
    key: "honorarios",
    name: "Conciliador de Honorários",
    desc: "Cruza contrato e cobrança, acha o que faltou.",
    chips: ["Contrato × cobrança", "Você aprova antes de cobrar"],
    icon: (
      <svg {...svgProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    key: "tributario",
    name: "Tributário / ICMS",
    desc: "Confere apuração e regime contra o que foi lançado.",
    chips: ["Simples", "Presumido", "Real", "IBS / CBS"],
    icon: (
      <svg {...svgProps}>
        <path d="M4 4h16v4H4z" />
        <path d="M4 12h10M4 16h10M4 20h6" />
        <path d="m16 15 2 2 4-4" />
      </svg>
    ),
  },
];

/* Próximos no Hub: papel secundário. */
const UPCOMING_AGENTS = [
  {
    name: "Simulação em Massa da carteira",
    desc: "Roda cenários tributários em toda a base de clientes.",
    tag: "Est. Q4 2026",
    icon: (
      <svg {...svgProps}>
        <path d="M3 3v18h18" />
        <path d="m7 14 3-4 3 3 4-6" />
      </svg>
    ),
  },
  {
    name: "Próximo agente",
    desc: "Definido com os escritórios do Setup EGESCON.",
    tag: "Est. Q1 2027",
    icon: (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
  },
];

const PRICING = [
  { tier: "Até 100 clientes", price: "R$ 497", per: "/mês" },
  { tier: "101 a 300 clientes", price: "R$ 797", per: "/mês" },
  { tier: "300+ clientes", price: "R$ 990", per: "/mês + R$ 30 por CNPJ ativo" },
];

const FAQ = [
  {
    q: "Já tenho sistema (Domínio / Alterdata)?",
    a: "A gente lê os dados dele. Seu sistema executa a cobrança; o Kontiva confere se ela está certa contra o contrato. Ninguém faz essa conferência hoje.",
  },
  {
    q: "Quanto custa depois do beta?",
    a: "Tabela a partir de R$ 900/mês para carteiras menores. Quem reserva no EGESCON trava a Condição Setup EGESCON por 12 meses após o beta. É a melhor condição que o Hub vai ter.",
  },
  {
    q: "Preciso pagar ou assinar algo agora?",
    a: "Nada. Você reserva a vaga e marca o Setup de Teste. O pagamento do primeiro mês vai por link depois do setup e confirma a vaga em até 7 dias. O contrato a gente assina junto na reunião.",
  },
  {
    q: "Não tenho tempo pra implantar?",
    a: "Por isso a turma é de 15: nós fazemos o setup. Você participa de 2 reuniões de 1h e recebe a primeira análise pronta.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Dados no seu ambiente de nuvem, termo de confidencialidade no contrato, LGPD by design. Somos a BlueMetrics: 10 anos e 200+ projetos de IA.",
  },
  {
    q: "Essa condição vale depois do evento?",
    a: "Não. A Condição Setup EGESCON é exclusiva de quem reserva durante o 9º EGESCON. Depois do evento, entra a tabela cheia.",
  },
];

const RADAR_ROWS = [
  { idx: "01", name: "Contrato · Cliente A", amount: "R$ 890", badge: "ok", flagged: false },
  { idx: "02", name: "Honorário · Cliente B", amount: "+R$ 420", badge: "a cobrar", flagged: true },
  { idx: "03", name: "Contrato · Cliente C", amount: "R$ 1.240", badge: "ok", flagged: false },
  { idx: "04", name: "Serviço extra · Cliente D", amount: "+R$ 310", badge: "a cobrar", flagged: true },
  { idx: "05", name: "Contrato · Cliente E", amount: "R$ 640", badge: "ok", flagged: false },
];

export default function Page() {
  const [openFaq, setOpenFaq] = useState(0);
  const toggleFaq = (i) => setOpenFaq((cur) => (cur === i ? null : i));

  const heroCtaLabel = "Reservar meu Setup EGESCON";
  const heroCtaHref = SCHEDULER_URL;
  const headerCtaLabel = "Reservar vaga";
  const slotsBadge = "Vagas limitadas · Setup EGESCON";

  /* Modal do agendador: abre o Google Calendar num iframe, sem sair da página.
     O href é mantido como fallback caso o JS esteja desabilitado. */
  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const openScheduler = (e) => {
    e.preventDefault();
    setSchedulerOpen(true);
  };

  useEffect(() => {
    if (!schedulerOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSchedulerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [schedulerOpen]);

  /* Header condensado e barra de CTA mobile aparecem depois que o hero sai da tela. */
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Movimento reduzido: não dá autoplay no vídeo do ecossistema. */
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return (
    <div
      style={{
        background: "var(--branco)",
        color: "var(--azul-profundo)",
        fontFamily: "var(--font-body)",
        overflowX: "hidden",
      }}
    >
      {/* STICKY HEADER */}
      <nav className={`nav${pastHero ? " condensed" : ""}`}>
        <div className="lp-shell nav-inner">
          <span className="brand-lockup">
            <span className="k">Kontiva</span>
            <span className="dot">.</span>
            <span className="ai">ai</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span className="nav-scarcity">{slotsBadge}</span>
            <a
              className="btn btn-primary"
              style={{ padding: "10px 16px", fontSize: 14 }}
              href={heroCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openScheduler}
            >
              {headerCtaLabel}
            </a>
          </div>
        </div>
      </nav>

      {/* 1. HERO */}
      <section
        className="lp-section lp-section--ample"
        style={{ background: "var(--branco)", position: "relative", overflow: "hidden" }}
      >
        <div className="hero-glow" aria-hidden="true" />
        <div className="lp-shell" style={{ position: "relative" }}>
          <div className="lp-grid-2">
            {/* Conteúdo above-the-fold: visível de imediato, sem gate de JS/observer (protege LCP). */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "7px 14px",
                  borderRadius: 99,
                  background: "var(--ciano-suave)",
                  border: "1px solid color-mix(in oklab, var(--ciano) 35%, transparent)",
                  marginBottom: 26,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--ciano)",
                    boxShadow: "0 0 0 4px color-mix(in oklab, var(--ciano) 20%, transparent)",
                    flex: "none",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    color: "var(--azul-profundo)",
                  }}
                >
                  {slotsBadge}
                </span>
              </div>
              <h1
                style={{
                  fontSize: "clamp(38px, 5.6vw, 62px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                  margin: "0 0 22px",
                }}
              >
                O Hub de agentes de IA que recupera o dinheiro que o seu
                escritório deixa na mesa.
              </h1>
              <p className="lead" style={{ margin: "0 0 32px", maxWidth: 520 }}>
                Estamos selecionando os escritórios do Hub para o Setup EGESCON. Vagas limitadas.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
                <a
                  className="btn btn-primary"
                  style={{ padding: "17px 26px", fontSize: 16 }}
                  href={heroCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={openScheduler}
                >
                  {heroCtaLabel}
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  marginTop: 28,
                }}
              >
                {["AWS Advanced Partner", "LGPD by design", "200+ projetos de IA entregues"].map(
                  (chip) => (
                    <span key={chip} className="trust-chip">
                      <span className="tick" aria-hidden="true" />
                      {chip}
                    </span>
                  )
                )}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <span className="hero-watermark" aria-hidden="true">
                +
              </span>
              <div className="radar-lift" style={{ borderRadius: 22 }}>
                <RadarCard
                  title="Conciliação de honorários"
                  live="Varredura ativa"
                  rows={RADAR_ROWS}
                  summaryLabel="Receita encontrada / ano"
                  summaryCountTo={29}
                  summaryFormat={(v) => `R$ ${v} mil`}
                />
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--cinza-texto)",
                  margin: "14px 4px 0",
                  textAlign: "center",
                }}
              >
                Amostra ilustrativa. No Setup de Teste, roda nos seus números.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRÊS EIXOS DE BENEFÍCIO (bento assimétrico) */}
      <section className="lp-section lp-section--medium surface-1">
        <div className="lp-shell">
          <Reveal style={{ maxWidth: 720, marginBottom: 44 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              <span className="dot-cyan" /> Por que agora
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4.2vw, 46px)" }}>
              Três coisas que mudam no dia seguinte.
            </h2>
          </Reveal>
          <div className="lp-grid-bento">
            {BENEFITS.map((b, i) => (
              <Reveal
                key={b.title}
                delay={i * 80}
                className={`card${i === 0 ? " card--featured bento-big" : ""}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  padding: 28,
                  height: "100%",
                  justifyContent: i === 0 ? "space-between" : "flex-start",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "color-mix(in oklab, var(--ciano) 16%, transparent)",
                      color: "var(--azul-profundo)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {b.icon}
                  </span>
                  <h3 style={{ fontSize: 20, letterSpacing: "-0.02em" }}>{b.title}</h3>
                  <p style={{ fontSize: 15.5, margin: 0 }}>{b.body}</p>
                </div>
                {i === 0 && (
                  <div
                    className="hairline"
                    style={{ paddingTop: 18, marginTop: 8 }}
                  >
                    <div
                      className="num-display"
                      style={{ fontSize: 40, color: "var(--azul-profundo)" }}
                    >
                      <CountUp to={29} format={(v) => `R$ ${v} mil`} />
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--cinza-texto)", marginTop: 4 }}>
                      Amostra ilustrativa. No Setup de Teste, roda nos seus números.
                    </div>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMO FUNCIONA O SETUP EGESCON (stepper conectado) */}
      <section className="lp-section lp-section--medium surface-0" id="como-funciona">
        <div className="lp-shell">
          <Reveal style={{ maxWidth: 720, marginBottom: 44 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              <span className="dot-cyan" /> Como funciona o Setup EGESCON
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4.2vw, 46px)" }}>
              Você vê funcionando antes de pagar.
            </h2>
          </Reveal>
          <div className="stepper lp-grid-4">
            <div className="stepper-track" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 80}
                className={`step-card${i === 2 ? " step-card--key" : ""}`}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: 8,
                    top: -6,
                    fontSize: 46,
                    fontWeight: 800,
                    color: "rgba(10,31,63,0.05)",
                    fontFamily: "var(--font-mono)",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {s.n}
                </span>
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "var(--azul-profundo)",
                    color: "var(--ciano)",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: 15,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {s.n}
                </span>
                <div>
                  <h3 style={{ fontSize: 17, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14.5, margin: 0 }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ROADMAP DO HUB (lane com eixo temporal) */}
      <section
        className="lp-section lp-section--medium surface-2-dark edge-glow"
        id="roadmap"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div className="atmo-mesh" aria-hidden="true" />
        <div className="lp-shell" style={{ position: "relative" }}>
          <Reveal style={{ maxWidth: 640, marginBottom: 40 }}>
            <div
              className="eyebrow light"
              style={{ marginBottom: 18, color: "rgba(234,246,255,0.66)" }}
            >
              <span className="dot-cyan" /> Roadmap do Hub
            </div>
            <h2
              style={{
                fontSize: "clamp(30px, 4.2vw, 46px)",
                color: "var(--branco)",
                marginBottom: 12,
              }}
            >
              Dois agentes rodando hoje. Mais dois a caminho.
            </h2>
            <p style={{ color: "rgba(234,246,255,0.7)", fontSize: 16, margin: 0 }}>
              Quem entra agora influencia quais agentes vêm depois.
            </p>
          </Reveal>
          {/* Esquema visual do ecossistema (motion graphic Remotion) */}
          <Reveal className="eco-video-frame" style={{ marginBottom: 18 }}>
            <video
              src="/agents-ecosystem.mp4"
              poster="/agents-ecosystem-poster.jpg"
              autoPlay={!reduceMotion}
              muted
              loop
              playsInline
              controls={reduceMotion}
              preload="metadata"
              aria-label="Ecossistema do Hub Kontiva. O agente de Honorários lê ERP e cobrança, cruza contrato e cobrança e acha o que ficou sem cobrar. O agente Tributário lê ERP e notas, simula regime (Simples, Presumido, Real, IBS e CBS) e entrega relatório pronto. Tudo do seu escritório para os seus clientes."
            />
          </Reveal>
          {/* Legenda acessível dos dois agentes ativos */}
          <Reveal
            delay={80}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            {ACTIVE_AGENTS.map((a) => (
              <span
                key={a.key}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(234,246,255,0.75)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--ciano)",
                    boxShadow: "0 0 0 4px color-mix(in oklab, var(--ciano) 20%, transparent)",
                  }}
                />
                {a.name}
                <span style={{ color: "rgba(234,246,255,0.4)" }}>· Ativo</span>
              </span>
            ))}
          </Reveal>

          {/* Próximos no Hub: secundários */}
          <Reveal
            className="eyebrow light"
            delay={120}
            style={{ marginBottom: 14, color: "rgba(234,246,255,0.5)" }}
          >
            <span className="dot-cyan" /> Próximos no Hub
          </Reveal>
          <div className="upcoming-row">
            {UPCOMING_AGENTS.map((u, i) => (
              <Reveal key={u.name} delay={140 + i * 80} className="upcoming-item">
                <span className="up-icon">{u.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "rgba(234,246,255,0.85)",
                      }}
                    >
                      {u.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "4px 9px",
                        borderRadius: 99,
                        color: "rgba(234,246,255,0.6)",
                        border: "1px solid rgba(255,255,255,0.16)",
                      }}
                    >
                      {u.tag}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(234,246,255,0.5)",
                      marginTop: 4,
                      lineHeight: 1.5,
                    }}
                  >
                    {u.desc}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONDIÇÃO SETUP EGESCON (preço) */}
      <section
        className="lp-section lp-section--ample surface-2-dark edge-glow"
        id="preco"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div className="atmo-mesh" aria-hidden="true" />
        <div className="lp-shell" style={{ position: "relative" }}>
          <Reveal style={{ maxWidth: 720, marginBottom: 40 }}>
            <div
              className="eyebrow light"
              style={{ marginBottom: 18, color: "rgba(234,246,255,0.66)" }}
            >
              <span className="dot-cyan" /> Condição Setup EGESCON
            </div>
            <h2
              style={{
                fontSize: "clamp(30px, 4.2vw, 46px)",
                color: "var(--branco)",
                marginBottom: 12,
              }}
            >
              O preço que só existe no 9º EGESCON.
            </h2>
            <p style={{ color: "rgba(234,246,255,0.7)", fontSize: 16, margin: 0 }}>
              12 meses, com os 2 agentes que já rodam. Sem fidelidade.
            </p>
          </Reveal>
          <div className="lp-grid-3" style={{ marginBottom: 24 }}>
            {PRICING.map((p, i) => (
              <Reveal
                key={p.tier}
                delay={i * 80}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  padding: 28,
                  borderRadius: 16,
                  background: "color-mix(in oklab, var(--ciano) 8%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--ciano) 55%, transparent)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "rgba(234,246,255,0.7)",
                  }}
                >
                  {p.tier}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                  <span className="num-display" style={{ fontSize: 42, color: "var(--branco)" }}>
                    {p.price}
                  </span>
                  <span style={{ fontSize: 14, color: "rgba(234,246,255,0.7)" }}>{p.per}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "stretch",
              marginBottom: 36,
            }}
          >
            <div
              style={{
                flex: "1 1 260px",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                padding: 18,
                borderRadius: 14,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span
                style={{
                  flex: "none",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--ciano)",
                  paddingTop: 2,
                }}
              >
                Trava
              </span>
              <span style={{ fontSize: 14.5, color: "rgba(234,246,255,0.85)", lineHeight: 1.5 }}>
                Condição garantida por 12 meses após o beta. Depois, tabela cheia.
              </span>
            </div>
            <div
              style={{
                flex: "1 1 260px",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                padding: 18,
                borderRadius: 14,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span
                style={{
                  flex: "none",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--ciano)",
                  paddingTop: 2,
                }}
              >
                Setup
              </span>
              <span style={{ fontSize: 14.5, color: "rgba(234,246,255,0.85)", lineHeight: 1.5 }}>
                Setup de Teste (R$ 1.500 de tabela) grátis para quem entra no Setup EGESCON.
              </span>
            </div>
          </Reveal>
          <Reveal style={{ textAlign: "center" }}>
            <a
              className="btn btn-primary"
              style={{ padding: "17px 26px", fontSize: 16 }}
              href={heroCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openScheduler}
            >
              {heroCtaLabel}
            </a>
          </Reveal>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="lp-section lp-section--medium surface-1" id="faq">
        <div className="lp-shell lp-narrow">
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              <span className="dot-cyan" /> Perguntas frequentes
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: 28 }}>
              O que fica de dúvida.
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQ.map((f, i) => {
              const open = openFaq === i;
              const panelId = `faq-panel-${i}`;
              const triggerId = `faq-trigger-${i}`;
              return (
                <Reveal
                  key={f.q}
                  delay={Math.min(i, 4) * 50}
                  style={{
                    border: "1px solid var(--border-on-light)",
                    borderRadius: 14,
                    overflow: "hidden",
                    background: "var(--branco)",
                  }}
                >
                  <button
                    type="button"
                    id={triggerId}
                    onClick={() => toggleFaq(i)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    style={{
                      width: "100%",
                      minHeight: 44,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: 20,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "inherit",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--azul-profundo)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        flex: "none",
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: "var(--cinza-claro)",
                        color: "var(--azul-profundo)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        fontWeight: 500,
                        transition: "transform .2s ease-out",
                        transform: open ? "rotate(180deg)" : "none",
                      }}
                    >
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    style={{
                      display: "grid",
                      gridTemplateRows: open ? "1fr" : "0fr",
                      transition: "grid-template-rows .25s ease-out",
                    }}
                  >
                    <div style={{ overflow: "hidden", minHeight: 0 }}>
                      <div
                        style={{
                          padding: "0 20px 20px",
                          fontSize: 15,
                          lineHeight: 1.55,
                          color: "var(--cinza-escuro)",
                        }}
                      >
                        {f.a}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal
            style={{
              marginTop: 28,
              padding: 22,
              borderRadius: 14,
              border: "1px dashed var(--border-on-light-strong)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 15, color: "var(--cinza-escuro)" }}>
              Ainda com dúvida?
            </span>
            <a
              className="btn btn-ghost"
              style={{ padding: "10px 18px", fontSize: 14 }}
              href="https://wa.me/5551926343014"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </Reveal>
        </div>
      </section>

      {/* 7. BANDA DE CTA FINAL (recombina copy existente, sem headline nova) */}
      <section
        className="lp-section lp-section--ample surface-2-dark edge-glow"
        style={{ position: "relative", overflow: "hidden", textAlign: "center" }}
      >
        <div className="atmo-mesh" aria-hidden="true" />
        <div className="lp-shell" style={{ position: "relative" }}>
          <Reveal
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "7px 14px",
              borderRadius: 99,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
              marginBottom: 26,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--ciano)",
                boxShadow: "0 0 0 4px color-mix(in oklab, var(--ciano) 25%, transparent)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: "var(--claro-escuro)",
              }}
            >
              {slotsBadge}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                color: "var(--branco)",
                marginBottom: 32,
              }}
            >
              O preço que só existe no 9º EGESCON.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <a
              className="btn btn-primary"
              style={{ padding: "17px 26px", fontSize: 16 }}
              href={heroCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openScheduler}
            >
              {heroCtaLabel}
            </a>
          </Reveal>
        </div>
      </section>

      {/* 8. RODAPÉ */}
      <footer
        style={{
          background: "var(--azul-profundo)",
          color: "rgba(234,246,255,0.65)",
          padding: "56px 0 48px",
        }}
      >
        <div
          className="lp-shell"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span className="brand-lockup" style={{ fontSize: 18 }}>
              <span className="k" style={{ color: "#EAF6FF" }}>
                Kontiva
              </span>
              <span className="dot" style={{ color: "var(--ciano)" }}>
                .
              </span>
              <span className="ai" style={{ color: "var(--ciano)" }}>
                ai
              </span>
            </span>
            <div style={{ fontSize: 14, color: "rgba(234,246,255,0.7)" }}>
              Kontiva by BlueMetrics
            </div>
            <div style={{ fontSize: 13, color: "rgba(234,246,255,0.55)", maxWidth: 320 }}>
              LGPD by design · dados no seu ambiente de nuvem
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 14 }}>
            <a href="mailto:contato@kontiva.ai" style={{ color: "rgba(234,246,255,0.8)" }}>
              contato@kontiva.ai
            </a>
            <a href="https://wa.me/5551926343014" style={{ color: "rgba(234,246,255,0.8)" }}>
              WhatsApp
            </a>
            <div className="social-row" style={{ marginTop: 2 }}>
              <a
                className="social-btn"
                href="https://www.instagram.com/kontiva.ai?igsh=MWo4N3ZuMW55Ymlncg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Kontiva.ai"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                className="social-btn"
                href="https://www.linkedin.com/company/kontivaai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn da Kontiva.ai"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 21 10.9 21 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9z" />
                </svg>
              </a>
              <a
                className="social-btn"
                href="https://api.whatsapp.com/send/?phone=5551926343014&text=Ol%C3%A1%2C+gostaria+de+conhecer+a+Kontiva.ai&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Kontiva.ai"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.76.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2zm5.8 14.1c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.24-3.67-.77-3.09-1.22-5.06-4.36-5.22-4.57-.15-.2-1.25-1.66-1.25-3.17s.79-2.25 1.07-2.56c.28-.31.61-.38.81-.38.2 0 .41 0 .59.01.19.01.44-.07.69.53.24.6.83 2.07.9 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.39-.44.53-.15.15-.3.31-.13.6.18.3.79 1.3 1.69 2.1 1.17 1.04 2.15 1.36 2.45 1.51.3.15.48.13.66-.08.18-.2.76-.89.96-1.19.2-.3.4-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.22.57.35.07.12.07.72-.17 1.4z" />
                </svg>
              </a>
            </div>
          </div>
          <a
            className="btn btn-primary"
            style={{ padding: "12px 20px", fontSize: 14 }}
            href={heroCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openScheduler}
          >
            {headerCtaLabel}
          </a>
        </div>
        <div
          className="lp-shell"
          style={{
            fontSize: 12,
            color: "rgba(234,246,255,0.4)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 20,
            marginTop: 36,
          }}
        >
          © 2026 Kontiva.ai · 9º EGESCON
        </div>
      </footer>

      {/* Botão flutuante de reserva, acompanha o scroll da página */}
      <a
        className="btn btn-primary fab-reservar"
        href={SCHEDULER_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={openScheduler}
        aria-label="Reservar meu Setup EGESCON"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <span>Reservar vaga</span>
      </a>

      {/* Barra de CTA fixa no mobile, aparece depois do hero */}
      <div className={`sticky-cta-bar${pastHero ? " visible" : ""}`}>
        <span className="scarcity">{slotsBadge}</span>
        <a
          className="btn btn-primary"
          style={{ padding: "10px 16px", fontSize: 14, flex: "none" }}
          href={heroCtaHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={openScheduler}
        >
          {headerCtaLabel}
        </a>
      </div>

      {/* Textura de grão sobre a página inteira (profundidade sutil) */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Modal do agendador, abre o Google Calendar num iframe, sem sair da página */}
      {schedulerOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Agendar Setup de Teste"
          onClick={() => setSchedulerOpen(false)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <span>Agende seu Setup de Teste</span>
              <button
                type="button"
                className="modal-close"
                onClick={() => setSchedulerOpen(false)}
                aria-label="Fechar"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <iframe
              className="modal-frame"
              src={SCHEDULER_URL}
              title="Agendar Setup de Teste"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
}
