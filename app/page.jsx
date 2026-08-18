"use client";

import { useState } from "react";
import RadarCard from "./components/RadarCard";

/* ------------------------------------------------------------------ *
 * Estado da turma fundadora.
 * Na fase Code isto vem do CMS / inventário de vagas. Mudar aqui
 * reflete em toda a página: CTAs, badge, headlines, destaque da lista
 * de espera e aviso do agendador.
 *   slotsOpen  — turma aceitando reservas
 *   slotsLeft  — vagas restantes (0–15). Em 0, a lista de espera abre
 *                automaticamente mesmo com slotsOpen = true.
 * ------------------------------------------------------------------ */
const FOUNDING = { slotsOpen: true, slotsLeft: 6 };

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
    body: "Sem cartão, sem assinar nada agora. Você só garante o lugar na turma fundadora.",
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

const ROADMAP_BASE = [
  {
    name: "Conciliador de Honorários",
    desc: "Cruza contrato e cobrança, acha o que faltou.",
    tag: "Ativo",
    active: true,
    icon: (
      <svg {...svgProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    name: "Tributário / ICMS",
    desc: "Confere apuração e regime contra o que foi lançado.",
    tag: "Ativo",
    active: true,
    icon: (
      <svg {...svgProps}>
        <path d="M4 4h16v4H4z" />
        <path d="M4 12h10M4 16h10M4 20h6" />
        <path d="m16 15 2 2 4-4" />
      </svg>
    ),
  },
  {
    name: "Simulação em Massa da carteira",
    desc: "Roda cenários tributários em toda a base de clientes.",
    tag: "Est. Q4 2026",
    active: false,
    icon: (
      <svg {...svgProps}>
        <path d="M3 3v18h18" />
        <path d="m7 14 3-4 3 3 4-6" />
      </svg>
    ),
  },
  {
    name: "Próximo agente",
    desc: "Definido com os escritórios fundadores.",
    tag: "Est. Q1 2027",
    active: false,
    icon: (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
  },
];

const ACTIVE_BG = "color-mix(in oklab, var(--ciano) 8%, transparent)";
const ACTIVE_BORDER = "1px solid color-mix(in oklab, var(--ciano) 55%, transparent)";
const SOFT_BORDER = "1px dashed rgba(255,255,255,0.14)";

const ROADMAP = ROADMAP_BASE.map((r) => ({
  ...r,
  bg: r.active ? ACTIVE_BG : "rgba(255,255,255,0.02)",
  border: r.active ? ACTIVE_BORDER : SOFT_BORDER,
  opacity: r.active ? 1 : 0.62,
  iconBg: r.active ? "var(--ciano)" : "rgba(255,255,255,0.06)",
  iconColor: r.active ? "var(--azul-profundo)" : "rgba(234,246,255,0.55)",
  titleColor: r.active ? "var(--branco)" : "rgba(234,246,255,0.75)",
  tagBg: r.active ? "var(--ciano)" : "transparent",
  tagColor: r.active ? "var(--azul-profundo)" : "rgba(234,246,255,0.6)",
  tagBorder: r.active ? "none" : "1px solid rgba(255,255,255,0.16)",
}));

const PROOF = [
  { stat: "10 anos", label: "de estrada em IA aplicada" },
  { stat: "200+", label: "projetos de IA entregues" },
  { stat: "AWS", label: "Advanced Partner" },
  { stat: "LGPD", label: "by design, desde a origem" },
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
    a: "Tabela a partir de R$ 900/mês para carteiras menores. Quem reserva no EGESCON trava a Condição Fundadora EGESCON por 12 meses após o beta. É a melhor condição que o Hub vai ter.",
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
    a: "Não. A Condição Fundadora EGESCON é exclusiva de quem reserva durante o 9º EGESCON. Depois do evento, entra a tabela cheia.",
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

  // Lista de espera libera automaticamente quando as 15 vagas encerram.
  const slotsOpenEff = FOUNDING.slotsOpen && FOUNDING.slotsLeft > 0;

  const heroCtaLabel = slotsOpenEff
    ? "Reservar minha Vaga Fundadora EGESCON"
    : "Entrar na lista de espera";
  const heroCtaHref = slotsOpenEff ? "#agendador" : "#lista-espera";
  const headerCtaLabel = slotsOpenEff ? "Reservar vaga" : "Lista de espera";

  const slotsBadge = slotsOpenEff
    ? `Restam ${FOUNDING.slotsLeft} de 15 vagas · Turma Fundadora EGESCON`
    : "Turma Fundadora EGESCON completa · 2ª turma em fila";

  const pathsHeadline = slotsOpenEff
    ? "Reserve agora ou entre na fila da próxima."
    : "Turma Fundadora EGESCON completa. Garanta a 2ª turma.";

  const waitlistHeadline = slotsOpenEff
    ? "Prefere decidir depois? Garanta seu lugar na 2ª turma."
    : "Turma Fundadora EGESCON completa. Entre na fila da 2ª turma.";

  const waitlistBorder = slotsOpenEff
    ? "1px solid var(--border-on-light)"
    : "1.5px solid color-mix(in oklab, var(--ciano) 55%, transparent)";

  const showWaitlistLink = slotsOpenEff;
  const schedulerClosed = !slotsOpenEff;

  // HOOK (fase Code): ligar ao POST da Forms Submission API v3 do HubSpot.
  const onWaitlistSubmit = (e) => {
    e.preventDefault();
  };

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
      <nav className="nav">
        <div className="lp-shell nav-inner">
          <span className="brand-lockup">
            <span className="k">Kontiva</span>
            <span className="dot">.</span>
            <span className="ai">ai</span>
          </span>
          <a
            className="btn btn-primary"
            style={{ padding: "10px 16px", fontSize: 14 }}
            href={heroCtaHref}
          >
            {headerCtaLabel}
          </a>
        </div>
      </nav>

      {/* 1. HERO */}
      <section className="lp-section" style={{ background: "var(--branco)", paddingTop: 48 }}>
        <div className="lp-shell">
          <div className="lp-grid-2">
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "7px 14px",
                  borderRadius: 99,
                  background: "var(--ciano-suave)",
                  border: "1px solid color-mix(in oklab, var(--ciano) 35%, transparent)",
                  marginBottom: 26,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--ciano)",
                    boxShadow: "0 0 0 4px color-mix(in oklab, var(--ciano) 20%, transparent)",
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
                O Hub de agentes de IA que{" "}
                <span
                  className="serif-accent"
                  style={{ color: "var(--azul-profundo)", fontSize: "1.06em" }}
                >
                  recupera
                </span>{" "}
                o dinheiro que o seu escritório deixa na mesa.
              </h1>
              <p className="lead" style={{ margin: "0 0 32px", maxWidth: 520 }}>
                Estamos selecionando os escritórios fundadores do Hub no 9º EGESCON. 15 vagas.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
                <a
                  className="btn btn-primary"
                  style={{ padding: "17px 26px", fontSize: 16 }}
                  href={heroCtaHref}
                >
                  {heroCtaLabel}
                </a>
                {showWaitlistLink && (
                  <a
                    href="#lista-espera"
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--cinza-texto)",
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    }}
                  >
                    Não quer decidir agora? Entrar na lista de espera
                  </a>
                )}
              </div>
            </div>
            <div>
              <RadarCard
                title="Conciliação de honorários"
                live="Varredura ativa"
                rows={RADAR_ROWS}
                summaryLabel="Receita encontrada / ano"
                summaryValue="R$ 29 mil"
              />
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

      {/* 2. TRÊS EIXOS DE BENEFÍCIO */}
      <section className="lp-section" style={{ background: "var(--cinza-claro)" }}>
        <div className="lp-shell">
          <div style={{ maxWidth: 720, marginBottom: 44 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              <span className="dot-cyan" /> Por que agora
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4.2vw, 46px)" }}>
              Três coisas que mudam no dia seguinte.
            </h2>
          </div>
          <div className="lp-grid-3">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  padding: 28,
                  height: "100%",
                }}
              >
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
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMO FUNCIONA A VAGA FUNDADORA */}
      <section className="lp-section" id="como-funciona" style={{ background: "var(--branco)" }}>
        <div className="lp-shell">
          <div style={{ maxWidth: 720, marginBottom: 44 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              <span className="dot-cyan" /> Como funciona a Vaga Fundadora EGESCON
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4.2vw, 46px)" }}>
              Você{" "}
              <span className="serif-accent" style={{ color: "var(--azul-profundo)" }}>
                vê
              </span>{" "}
              funcionando antes de pagar.
            </h2>
          </div>
          <div className="lp-grid-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  padding: 26,
                  border: "1px solid var(--border-on-light)",
                  borderRadius: 16,
                  background: "var(--branco)",
                  height: "100%",
                }}
              >
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ROADMAP DO HUB */}
      <section
        className="lp-section"
        id="roadmap"
        style={{
          background: "var(--azul-profundo)",
          color: "var(--claro-escuro)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(700px circle at 80% 0%, color-mix(in oklab, var(--ciano) 12%, transparent), transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div className="lp-shell" style={{ position: "relative" }}>
          <div style={{ maxWidth: 640, marginBottom: 40 }}>
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
              Dois agentes rodando hoje. Mais chegando.
            </h2>
            <p style={{ color: "rgba(234,246,255,0.7)", fontSize: 16, margin: 0 }}>
              Quem entra agora influencia quais agentes vêm depois.
            </p>
          </div>
          <div className="lp-grid-3">
            {ROADMAP.map((r) => (
              <div
                key={r.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  padding: 24,
                  borderRadius: 16,
                  background: r.bg,
                  border: r.border,
                  opacity: r.opacity,
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: r.iconBg,
                      color: r.iconColor,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {r.icon}
                  </span>
                  <span
                    style={{
                      flex: "none",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "5px 10px",
                      borderRadius: 99,
                      background: r.tagBg,
                      color: r.tagColor,
                      border: r.tagBorder,
                    }}
                  >
                    {r.tag}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: r.titleColor,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {r.name}
                  </div>
                  <div
                    style={{
                      fontSize: 13.5,
                      color: "rgba(234,246,255,0.55)",
                      marginTop: 6,
                      lineHeight: 1.5,
                    }}
                  >
                    {r.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROVA / QUEM SOMOS */}
      <section className="lp-section" style={{ background: "var(--ciano-suave)" }}>
        <div className="lp-shell">
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              <span className="dot-cyan" /> Quem está por trás
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>Kontiva é da BlueMetrics.</h2>
          </div>
          <div className="lp-grid-stat" style={{ marginBottom: 20 }}>
            {PROOF.map((p) => (
              <div
                key={p.label}
                style={{
                  padding: 24,
                  border: "1px solid var(--border-on-light)",
                  borderRadius: 14,
                  background: "var(--branco)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "var(--azul-profundo)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {p.stat}
                </div>
                <div style={{ fontSize: 13, color: "var(--cinza-texto)", marginTop: 6 }}>
                  {p.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: 28,
              borderRadius: 18,
              background: "var(--azul-profundo)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(420px circle at 100% 0%, color-mix(in oklab, var(--ciano) 18%, transparent), transparent 65%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", maxWidth: 720 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ciano)",
                  marginBottom: 12,
                }}
              >
                Resultado real
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(19px, 2.4vw, 26px)",
                  lineHeight: 1.4,
                  color: "var(--branco)",
                  letterSpacing: "-0.01em",
                }}
              >
                Num escritório de 20 clientes no Sul, achamos{" "}
                <strong style={{ color: "var(--ciano)" }}>R$ 29 mil por ano</strong> em honorário
                não cobrado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONDIÇÃO FUNDADORA EGESCON (preço) */}
      <section
        className="lp-section"
        id="preco"
        style={{
          background: "var(--azul-profundo)",
          color: "var(--claro-escuro)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(700px circle at 20% 0%, color-mix(in oklab, var(--ciano) 12%, transparent), transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div className="lp-shell" style={{ position: "relative" }}>
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <div
              className="eyebrow light"
              style={{ marginBottom: 18, color: "rgba(234,246,255,0.66)" }}
            >
              <span className="dot-cyan" /> Condição Fundadora EGESCON
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
              6 meses, com os 2 agentes que já rodam. Sem fidelidade.
            </p>
          </div>
          <div className="lp-grid-3" style={{ marginBottom: 24 }}>
            {PRICING.map((p) => (
              <div
                key={p.tier}
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
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 30,
                      fontWeight: 700,
                      color: "var(--branco)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {p.price}
                  </span>
                  <span style={{ fontSize: 14, color: "rgba(234,246,255,0.7)" }}>{p.per}</span>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "stretch",
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
                Setup de Teste (R$ 1.500 de tabela) grátis para fundadores EGESCON.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DOIS CAMINHOS: Agendador (A) + Lista de espera (B) */}
      <section className="lp-section" style={{ background: "var(--branco)" }}>
        <div className="lp-shell">
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              <span className="dot-cyan" /> Dois caminhos
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>{pathsHeadline}</h2>
          </div>
          <div className="lp-paths">
            {/* Caminho A · Agendador — STUB.
                HOOK (fase Code): substituir o card stub abaixo pelo embed do
                HubSpot Meetings via next/script. Não carregar script externo aqui. */}
            <div
              id="agendador"
              style={{
                padding: 28,
                borderRadius: 20,
                background: "var(--cinza-claro)",
                border: "1px solid var(--border-on-light)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--cinza-texto)",
                  }}
                >
                  Caminho A · Reservar
                </span>
                {slotsOpenEff && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "5px 10px",
                      borderRadius: 99,
                      background: "var(--ciano)",
                      color: "var(--azul-profundo)",
                    }}
                  >
                    Recomendado
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: 22, letterSpacing: "-0.02em", marginBottom: 18 }}>
                Escolha o horário do seu Setup de Teste.
              </h3>

              {schedulerClosed && (
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    padding: 16,
                    borderRadius: 14,
                    background: "var(--antes-tag-bg)",
                    border: "1px solid rgba(162,64,26,0.2)",
                    marginBottom: 18,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--antes-tag-fg)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flex: "none", marginTop: 1 }}
                  >
                    <path d="M12 9v4M12 17h.01" />
                    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                  </svg>
                  <div style={{ fontSize: 14, color: "var(--antes-tag-fg)", fontWeight: 600 }}>
                    Turma Fundadora EGESCON completa. Entre na fila da 2ª turma.
                  </div>
                </div>
              )}

              <div
                style={{
                  position: "relative",
                  border: "1.5px dashed color-mix(in oklab, var(--ciano) 55%, var(--border-on-light-strong))",
                  borderRadius: 16,
                  background: "linear-gradient(135deg, var(--ciano-suave), var(--branco))",
                  minHeight: 260,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  padding: "36px 20px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: "var(--azul-profundo)",
                    color: "var(--ciano)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </span>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: "var(--azul-profundo)",
                    fontWeight: 600,
                    background: "var(--branco)",
                    padding: "8px 14px",
                    borderRadius: 8,
                    border: "1px solid var(--border-on-light)",
                  }}
                >
                  [ Agendador HubSpot · integração na fase Code ]
                </div>
                <div style={{ fontSize: 13, color: "var(--cinza-texto)", maxWidth: 320 }}>
                  Seleção de dia e horário aparece aqui quando o embed for conectado.
                </div>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--cinza-texto)",
                  margin: "16px 4px 0",
                  textAlign: "center",
                }}
              >
                Sem cartão. Você só decide pagar depois de ver funcionando.
              </p>
            </div>

            {/* Caminho B · Lista de espera — form visual, sem submit ligado */}
            <div
              id="lista-espera"
              style={{
                padding: 28,
                borderRadius: 20,
                background: "var(--branco)",
                border: waitlistBorder,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--cinza-texto)",
                  }}
                >
                  Caminho B · 2ª turma
                </span>
                {schedulerClosed && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "5px 10px",
                      borderRadius: 99,
                      background: "var(--ciano)",
                      color: "var(--azul-profundo)",
                    }}
                  >
                    Vagas abertas
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: 22, letterSpacing: "-0.02em", marginBottom: 6 }}>
                {waitlistHeadline}
              </h3>
              <p style={{ fontSize: 14.5, color: "var(--cinza-escuro)", margin: "0 0 20px" }}>
                A gente te chama assim que abrir a próxima leva de vagas, com prioridade por ordem de inscrição.
              </p>
              <form onSubmit={onWaitlistSubmit}>
                <div className="f-field">
                  <label htmlFor="wl-nome">Nome</label>
                  <input id="wl-nome" type="text" placeholder="Seu nome" />
                </div>
                <div className="f-row">
                  <div className="f-field">
                    <label htmlFor="wl-escritorio">Escritório</label>
                    <input id="wl-escritorio" type="text" placeholder="Nome do escritório" />
                  </div>
                  <div className="f-field">
                    <label htmlFor="wl-cidade">Cidade</label>
                    <input id="wl-cidade" type="text" placeholder="Cidade / UF" />
                  </div>
                </div>
                <div className="f-row">
                  <div className="f-field">
                    <label htmlFor="wl-whats">WhatsApp</label>
                    <input id="wl-whats" type="tel" placeholder="(00) 90000-0000" />
                  </div>
                  <div className="f-field">
                    <label htmlFor="wl-email">E-mail</label>
                    <input id="wl-email" type="email" placeholder="voce@escritorio.com.br" />
                  </div>
                </div>
                <div className="f-field">
                  <label htmlFor="wl-clientes">Quantos clientes ativos?</label>
                  <select id="wl-clientes" defaultValue="">
                    <option value="">Selecione</option>
                    <option value="ate-30">até 30</option>
                    <option value="31-100">31-100</option>
                    <option value="101-300">101-300</option>
                    <option value="300+">300+</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", padding: 16, fontSize: 16, marginTop: 6 }}
                >
                  Entrar na lista de espera
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="lp-section" id="faq" style={{ background: "var(--cinza-claro)" }}>
        <div className="lp-shell lp-narrow">
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            <span className="dot-cyan" /> Perguntas frequentes
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: 28 }}>
            O que fica de dúvida.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQ.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  style={{
                    border: "1px solid var(--border-on-light)",
                    borderRadius: 14,
                    overflow: "hidden",
                    background: "var(--branco)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={open}
                    style={{
                      width: "100%",
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
                      }}
                    >
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  {open && (
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
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. RODAPÉ */}
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
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
            <a href="mailto:contato@kontiva.ai" style={{ color: "rgba(234,246,255,0.8)" }}>
              contato@kontiva.ai
            </a>
            <a href="https://wa.me/5551926343014" style={{ color: "rgba(234,246,255,0.8)" }}>
              WhatsApp
            </a>
          </div>
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
    </div>
  );
}
