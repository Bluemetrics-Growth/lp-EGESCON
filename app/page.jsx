"use client";

import { useState } from "react";
import RadarCard from "./components/RadarCard";

/* ------------------------------------------------------------------ *
 * Estado do grupo de lançamento.
 * Na fase Code isto vem do CMS / inventário de vagas. Mudar aqui
 * reflete em toda a página: CTAs, badge, headlines, destaque da lista
 * de espera e aviso do agendador.
 *   slotsOpen  - grupo aceitando reservas
 *   slotsLeft  - vagas restantes (0 a 15). Em 0, a lista de espera abre
 *                automaticamente mesmo com slotsOpen = true.
 * ------------------------------------------------------------------ */
const LAUNCH = { slotsOpen: true, slotsLeft: 6 };

/* Cor de acento do selo beta (dourado do material do evento). */
const AMBAR = "#F5C451";

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

/* O que é o Kontiva: três eixos, na linguagem do material do evento. */
const BENEFITS = [
  {
    title: "Ache dinheiro",
    body: (
      <>
        Lê seus contratos, cruza com o faturamento e aponta, <strong>em reais</strong>, o
        honorário que você deixa de cobrar.
      </>
    ),
    icon: (
      <svg {...svgProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="M11 7v4l2.5 1.5" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
  {
    title: "Multiplique a capacidade",
    body: (
      <>
        Atenda mais clientes com o mesmo time. Os <strong>agentes assumem</strong> o trabalho
        repetitivo.
      </>
    ),
    icon: (
      <svg {...svgProps}>
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M3 12l9 4 9-4" />
        <path d="M3 17l9 4 9-4" />
      </svg>
    ),
  },
  {
    title: "Mostre IA de verdade",
    body: (
      <>
        Entregue relatórios com IA <strong>e a sua marca</strong>. É a sua vitrine para
        conquistar contas.
      </>
    ),
    icon: (
      <svg {...svgProps}>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="m8 11 2 2 4-4" />
      </svg>
    ),
  },
];

/* Agentes do Hub: dois rodando hoje, o resto no roadmap. */
const AGENTS = [
  {
    name: "Agente de Honorários",
    tag: "Ativo",
    state: "active",
    body: "Lê contratos, calcula reajustes e concilia cobranças. Acha o que você deixa de faturar.",
    icon: (
      <svg {...svgProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    name: "Agente Tributário",
    tag: "Ativo · Beta",
    state: "beta",
    body: "Simula regime e créditos de impostos, com relatório da sua marca pronto para apresentar.",
    icon: (
      <svg {...svgProps}>
        <path d="M4 4h16v4H4z" />
        <path d="M4 12h10M4 16h10M4 20h6" />
        <path d="m16 15 2 2 4-4" />
      </svg>
    ),
  },
  {
    name: "Simulação em massa",
    tag: "Em breve",
    state: "soon",
    body: "A simulação tributária rodada para toda a sua carteira, com ranking de impacto.",
    icon: (
      <svg {...svgProps}>
        <path d="M3 3v18h18" />
        <path d="m7 14 3-4 3 3 4-6" />
      </svg>
    ),
  },
  {
    name: "Próximos agentes",
    tag: "Roadmap",
    state: "roadmap",
    chips: ["documentos", "atendimento", "reforma"],
    icon: (
      <svg {...svgProps}>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
  },
];

const ACTIVE_BG = "color-mix(in oklab, var(--ciano) 8%, transparent)";
const ACTIVE_BORDER = "1px solid color-mix(in oklab, var(--ciano) 55%, transparent)";
const SOFT_BG = "rgba(255,255,255,0.02)";
const SOFT_BORDER = "1px dashed rgba(255,255,255,0.14)";

/* Como funciona a vaga de lançamento: 4 passos. */
const STEPS = [
  {
    n: "1",
    title: "Você reserva sua vaga",
    body: (
      <>
        Uma das <strong>15 vagas</strong> do grupo de lançamento, sem pagar nada na hora.
      </>
    ),
  },
  {
    n: "2",
    title: "Fazemos o Setup de Teste, grátis",
    body: (
      <>
        Configuramos o Kontiva com uma amostra dos seus próprios dados. Valor de tabela{" "}
        <strong>R$ 1.500</strong>, gratuito para membros de lançamento.
      </>
    ),
  },
  {
    n: "3",
    title: "Você vê funcionando nos seus números",
    body: (
      <>
        Só decide pagar depois de ver o resultado. Você tem <strong>7 dias</strong> após o setup
        para confirmar.
      </>
    ),
  },
  {
    n: "4",
    title: "Você entra como membro de lançamento",
    body: (
      <>
        Condição de preço <strong>travada por 12 meses</strong> após o beta, e influência direta
        nos próximos agentes do Hub.
      </>
    ),
    dark: true,
  },
];

/* Sua condição de lançamento: tabela do material do evento. */
const PRICING = [
  { range: "até 100 clientes", price: "R$ 497", per: "/mês" },
  { range: "101 a 300 clientes", price: "R$ 797", per: "/mês" },
  { range: "acima de 300 clientes", price: "condição Enterprise", dark: true },
];

const PROOF = [
  { stat: "10 anos", label: "de estrada em IA aplicada" },
  { stat: "200+", label: "projetos de IA entregues" },
  { stat: "AWS", label: "Advanced Partner" },
  { stat: "Claude", label: "Partner" },
  { stat: "Sisense", label: "Gold Partner" },
];

const FAQ = [
  {
    q: "Já tenho sistema (Domínio / Alterdata)?",
    a: "A gente lê os dados dele. Seu sistema executa a cobrança; o Kontiva confere se está certa contra o contrato.",
  },
  {
    q: "Quanto custa a condição de lançamento?",
    a: "R$ 497/mês até 100 clientes e R$ 797/mês de 101 a 300. Acima disso, condição Enterprise. Quem entra no grupo de lançamento mantém o preço travado por 12 meses após o beta.",
  },
  {
    q: "Preciso pagar ou assinar algo agora?",
    a: "Nada. Você reserva a vaga e marca o setup. O pagamento vai por link depois, e confirma a vaga em até 7 dias.",
  },
  {
    q: "Não tenho tempo pra implantar?",
    a: "Por isso o grupo de lançamento é de 15 escritórios: nós fazemos o setup. Você participa de 2 reuniões de 1h.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Dados no seu ambiente de nuvem, termo de confidencialidade no contrato, LGPD by design.",
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
  const slotsOpenEff = LAUNCH.slotsOpen && LAUNCH.slotsLeft > 0;

  const heroCtaLabel = slotsOpenEff
    ? "Reservar minha vaga de lançamento"
    : "Entrar na lista de espera";
  const heroCtaHref = slotsOpenEff ? "#agendador" : "#lista-espera";
  const headerCtaLabel = slotsOpenEff ? "Reservar vaga" : "Lista de espera";

  const slotsBadge = slotsOpenEff
    ? `Restam ${LAUNCH.slotsLeft} de 15 vagas de lançamento`
    : "Grupo de lançamento completo · lista de espera aberta";

  const pathsHeadline = slotsOpenEff
    ? "Reserve agora, ou entre na lista de espera."
    : "Grupo de lançamento completo. Entre na lista de espera.";

  const waitlistHeadline = slotsOpenEff
    ? "Quer decidir depois? Entre na lista."
    : "Vagas esgotadas? Garanta seu lugar.";

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
      {/* STICKY HEADER (escuro, acompanha o hero do material do evento) */}
      <nav className="nav nav--dark">
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

      {/* 1. HERO: escuro, na comunicação do evento */}
      <section
        className="lp-section"
        style={{
          background: "var(--azul-profundo)",
          color: "var(--claro-escuro)",
          paddingTop: 56,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(680px circle at 88% 8%, color-mix(in oklab, var(--ciano) 16%, transparent), transparent 60%)",
            pointerEvents: "none",
          }}
        />
        {/* Círculos concêntricos do material do evento */}
        <svg
          aria-hidden
          viewBox="0 0 400 400"
          style={{
            position: "absolute",
            top: -80,
            right: -60,
            width: 520,
            height: 520,
            opacity: 0.14,
            pointerEvents: "none",
          }}
        >
          {[60, 110, 160, 200].map((r) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke="var(--ciano)"
              strokeWidth="1"
            />
          ))}
        </svg>
        <div className="lp-shell" style={{ position: "relative" }}>
          <div className="lp-grid-2">
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "7px 14px",
                  borderRadius: 99,
                  background: "color-mix(in oklab, var(--ciano) 12%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--ciano) 40%, transparent)",
                  marginBottom: 26,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--ciano)",
                    boxShadow: "0 0 0 4px color-mix(in oklab, var(--ciano) 24%, transparent)",
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
              </div>
              <h1
                style={{
                  fontSize: "clamp(38px, 5.6vw, 62px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                  margin: "0 0 22px",
                  color: "var(--branco)",
                }}
              >
                Agentes de IA que trabalham no seu escritório.{" "}
                <span
                  className="serif-accent"
                  style={{ color: "var(--ciano)", fontSize: "1.06em" }}
                >
                  De verdade.
                </span>
              </h1>
              <p
                className="lead"
                style={{ margin: "0 0 32px", maxWidth: 520, color: "rgba(234,246,255,0.72)" }}
              >
                O Hub de agentes de IA para escritórios contábeis. Cada agente assume um processo
                inteiro, e a plataforma cresce agente a agente.
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
                      color: "rgba(234,246,255,0.7)",
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    }}
                  >
                    Prefiro entrar na lista de espera
                  </a>
                )}
              </div>
            </div>
            <div>
              <div
                style={{
                  borderRadius: 22,
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.06), 0 40px 90px -40px rgba(0,0,0,0.6)",
                }}
              >
                <RadarCard
                  title="Conciliação de honorários"
                  live="Varredura ativa"
                  rows={RADAR_ROWS}
                  summaryLabel="Receita encontrada / ano"
                  summaryValue="R$ 29 mil"
                />
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(234,246,255,0.6)",
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

      {/* 2. O QUE É O KONTIVA */}
      <section className="lp-section" style={{ background: "var(--branco)" }}>
        <div className="lp-shell">
          <div style={{ maxWidth: 760, marginBottom: 44 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              <span className="dot-cyan" /> O que é o Kontiva
            </div>
            <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", lineHeight: 1.12 }}>
              Um <strong style={{ fontWeight: 700 }}>Hub de agentes de IA</strong> para escritórios
              contábeis. Cada agente assume um processo inteiro. Uma{" "}
              <span className="serif-accent" style={{ color: "var(--azul-profundo)" }}>
                plataforma que cresce agente a agente.
              </span>
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
                  borderTop: "3px solid var(--ciano)",
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
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                  }}
                >
                  {b.title}
                </h3>
                <p style={{ fontSize: 15, margin: 0 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. UM AGENTE POR PROCESSO */}
      <section
        className="lp-section"
        id="agentes"
        style={{
          background: "var(--azul-profundo)",
          color: "var(--claro-escuro)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(700px circle at 80% 0%, color-mix(in oklab, var(--ciano) 12%, transparent), transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div className="lp-shell" style={{ position: "relative" }}>
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <div
              className="eyebrow light"
              style={{ marginBottom: 18, color: "rgba(234,246,255,0.66)" }}
            >
              <span className="dot-cyan" /> Agentes do Hub
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4.2vw, 46px)", marginBottom: 12 }}>
              <span style={{ color: "var(--branco)" }}>Um agente por processo.</span>{" "}
              <span style={{ color: "rgba(234,246,255,0.45)" }}>Dois já rodando hoje.</span>
            </h2>
            <p style={{ color: "rgba(234,246,255,0.7)", fontSize: 16, margin: 0 }}>
              Cada agente faz o processo inteiro, com aprovação humana no que você definir.
            </p>
          </div>
          <div className="lp-grid-2" style={{ alignItems: "stretch" }}>
            {AGENTS.map((a) => {
              const on = a.state === "active" || a.state === "beta";
              const isBeta = a.state === "beta";
              return (
                <div
                  key={a.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    padding: 26,
                    borderRadius: 16,
                    background: on ? ACTIVE_BG : SOFT_BG,
                    border: on ? ACTIVE_BORDER : SOFT_BORDER,
                    opacity: on ? 1 : 0.72,
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
                        background: on ? "var(--ciano)" : "rgba(255,255,255,0.06)",
                        color: on ? "var(--azul-profundo)" : "rgba(234,246,255,0.55)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {a.icon}
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
                        background: isBeta
                          ? AMBAR
                          : a.state === "active"
                            ? "var(--ciano)"
                            : "transparent",
                        color: on ? "var(--azul-profundo)" : "rgba(234,246,255,0.6)",
                        border: on ? "none" : "1px solid rgba(255,255,255,0.16)",
                      }}
                    >
                      {a.tag}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: on ? "var(--branco)" : "rgba(234,246,255,0.75)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {a.name}
                    </div>
                    {a.body && (
                      <div
                        style={{
                          fontSize: 14,
                          color: "rgba(234,246,255,0.6)",
                          marginTop: 8,
                          lineHeight: 1.5,
                        }}
                      >
                        {a.body}
                      </div>
                    )}
                    {a.chips && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                        {a.chips.map((c) => (
                          <span
                            key={c}
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 11,
                              letterSpacing: "0.02em",
                              color: "rgba(234,246,255,0.65)",
                              padding: "6px 12px",
                              borderRadius: 99,
                              border: "1px solid rgba(255,255,255,0.16)",
                            }}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. VAGA DE LANÇAMENTO DO HUB · 9º EGESCON */}
      <section className="lp-section" id="como-funciona" style={{ background: "var(--branco)" }}>
        <div className="lp-shell">
          <div style={{ maxWidth: 720, marginBottom: 44 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              <span className="dot-cyan" /> A oferta do evento
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4.2vw, 46px)", marginBottom: 12 }}>
              Vaga de lançamento do Hub · 9º EGESCON
            </h2>
            <p style={{ color: "var(--cinza-texto)", fontSize: 16, margin: 0 }}>
              Como funciona a vaga de lançamento.
            </p>
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
                    borderRadius: "50%",
                    background: s.dark ? "var(--azul-profundo)" : "var(--ciano-suave)",
                    color: s.dark ? "var(--ciano)" : "var(--azul-profundo)",
                    border: s.dark
                      ? "none"
                      : "1px solid color-mix(in oklab, var(--ciano) 40%, transparent)",
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
                  <h3 style={{ fontSize: 16.5, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SUA CONDIÇÃO DE LANÇAMENTO */}
      <section className="lp-section" id="condicao" style={{ background: "var(--cinza-claro)" }}>
        <div className="lp-shell">
          <div className="eyebrow" style={{ marginBottom: 26 }}>
            <span className="dot-cyan" /> Sua condição de lançamento
          </div>
          <div className="lp-grid-3">
            {PRICING.map((p) => (
              <div
                key={p.range}
                style={{
                  padding: 32,
                  borderRadius: 18,
                  minHeight: 168,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 18,
                  background: p.dark ? "var(--azul-profundo)" : "var(--branco)",
                  border: p.dark ? "none" : "1px solid var(--border-on-light)",
                  boxShadow: p.dark ? "var(--shadow-dark)" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: p.dark ? "rgba(234,246,255,0.7)" : "var(--cinza-texto)",
                  }}
                >
                  {p.range}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span
                    style={{
                      fontSize: p.dark ? 26 : 40,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                      color: p.dark ? "var(--ciano)" : "var(--azul-profundo)",
                    }}
                  >
                    {p.price}
                  </span>
                  {p.per && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 13,
                        color: "var(--cinza-texto)",
                      }}
                    >
                      {p.per}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 18,
              padding: "16px 24px",
              borderRadius: 14,
              background: "var(--ciano-suave)",
              border: "1px solid color-mix(in oklab, var(--ciano) 30%, transparent)",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.02em",
              color: "var(--azul-profundo)",
              textAlign: "center",
            }}
          >
            Setup de Teste grátis · sem fidelidade · condição travada por 12 meses após o beta
          </div>
        </div>
      </section>

      {/* 6. PROVA / QUEM SOMOS */}
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
                    fontSize: 22,
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

      {/* 7. DOIS CAMINHOS: Agendador (A) + Lista de espera (B) */}
      <section className="lp-section" style={{ background: "var(--branco)" }}>
        <div className="lp-shell">
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              <span className="dot-cyan" /> Reserve agora
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: 12 }}>{pathsHeadline}</h2>
            <p style={{ color: "var(--cinza-escuro)", fontSize: 16, margin: 0 }}>
              Grupo de lançamento limitado a{" "}
              <strong style={{ color: "var(--azul-profundo)" }}>15 escritórios</strong>. Os demais
              entram por lista de espera.
            </p>
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
                    Grupo de lançamento completo, entre na lista de espera.
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
                  [ Agendador HubSpot: integração na fase Code ]
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
                  Caminho B · Lista de espera
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
                    Aberta
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: 22, letterSpacing: "-0.02em", marginBottom: 6 }}>
                {waitlistHeadline}
              </h3>
              <p style={{ fontSize: 14.5, color: "var(--cinza-escuro)", margin: "0 0 20px" }}>
                Garanta seu lugar no próximo grupo. A gente avisa quando abrir.
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
                    <option value="ate-100">até 100</option>
                    <option value="101-300">101 a 300</option>
                    <option value="300+">acima de 300</option>
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
              Kontiva é uma solução BlueMetrics
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
            fontFamily: "var(--font-mono)",
            fontSize: 12.5,
            letterSpacing: "0.02em",
            color: "rgba(234,246,255,0.6)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
            marginTop: 36,
          }}
        >
          10 anos · 200+ projetos de IA · AWS Advanced Partner · Claude Partner · Sisense Gold
          Partner
        </div>
        <div
          className="lp-shell"
          style={{
            fontSize: 12,
            color: "rgba(234,246,255,0.4)",
            paddingTop: 16,
          }}
        >
          © 2026 Kontiva.ai · 9º EGESCON
        </div>
      </footer>
    </div>
  );
}
