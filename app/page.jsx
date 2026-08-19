"use client";

import { useEffect, useState } from "react";
import RadarCard from "./components/RadarCard";

/* Links oficiais (iguais à versão no ar) */
const SCHED_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0kpfY8t-ZWwCKHVpHAGk5otbhfpSBn1QUCMWT6L9Xy9EPHfAlONkyfJfR2wb1hLoHgpaH8F1L0?gv=true";
const WHATS_URL =
  "https://wa.me/5551926343014?text=" + encodeURIComponent("Quero saber mais sobre o Kontiva");
const INSTA_URL = "https://www.instagram.com/kontiva.ai?igsh=MWo4N3ZuMW55Ymlncg%3D%3D";
const LINKEDIN_URL = "https://www.linkedin.com/company/kontivaai/";

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

/* O que é o Kontiva: três eixos, com a reforma tributária à frente. */
const BENEFITS = [
  {
    title: "Pronto para a reforma",
    body: (
      <>
        Simule os cenários da reforma (<strong>IBS e CBS</strong>) na carteira dele, ano a ano.
        Seu escritório chega com número na mão, não com susto.
      </>
    ),
    icon: (
      <svg {...svgProps}>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
  },
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
];

/* Agentes do Hub: dois rodando hoje, o resto no roadmap. */
const AGENTS = [
  {
    name: "Agente Tributário (reforma)",
    tag: "Ativo · Beta",
    state: "beta",
    body: "É o agente da reforma tributária. Simula os cenários de IBS e CBS ano a ano, o regime atual e os créditos recuperáveis, com relatório da sua marca pronto para levar ao cliente.",
    icon: (
      <svg {...svgProps}>
        <path d="M4 4h16v4H4z" />
        <path d="M4 12h10M4 16h10M4 20h6" />
        <path d="m16 15 2 2 4-4" />
      </svg>
    ),
  },
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

const FAQ = [
  {
    q: "Como o Kontiva ajuda na reforma tributária?",
    a: "O Agente Tributário simula os cenários de IBS e CBS ano a ano, compara com o regime atual e aponta os créditos recuperáveis, com relatório da sua marca para levar ao cliente. É simulação e estimativa com base nos dados fornecidos, não substitui parecer profissional.",
  },
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
  { idx: "01", name: "Simples Nacional", amount: "R$ 41.200", badge: "atual", flagged: false },
  { idx: "02", name: "Lucro Presumido", amount: "R$ 36.900", badge: "cenário", flagged: false },
  { idx: "03", name: "Lucro Real", amount: "R$ 33.610", badge: "recomendado", flagged: true },
  { idx: "04", name: "IBS + CBS · 2027", amount: "R$ 34.980", badge: "projeção", flagged: true },
  { idx: "05", name: "Créditos recuperáveis", amount: "+R$ 7.300", badge: "a recuperar", flagged: true },
];

export default function Page() {
  const [openFaq, setOpenFaq] = useState(0);
  const toggleFaq = (i) => setOpenFaq((cur) => (cur === i ? null : i));

  const heroCtaLabel = "Agende seu setup sem custo";
  const headerCtaLabel = "Reservar vaga";
  const slotsBadge = "Vagas limitadas · Setup EGESCON";

  // Agendador: abre em um popup (modal com iframe) dentro da própria LP.
  const [schedOpen, setSchedOpen] = useState(false);
  const [schedLoaded, setSchedLoaded] = useState(false);
  const openScheduler = (e) => {
    if (e) e.preventDefault();
    setSchedLoaded(false);
    setSchedOpen(true);
  };
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    document.body.style.overflow = schedOpen ? "hidden" : "";
    const onKey = (ev) => {
      if (ev.key === "Escape") setSchedOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [schedOpen]);

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
            href={SCHED_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openScheduler}
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
                <span style={{ color: "var(--ciano)" }}>De verdade.</span>
              </h1>
              <p
                className="lead"
                style={{ margin: "0 0 32px", maxWidth: 540, color: "rgba(234,246,255,0.72)" }}
              >
                O Hub já nasce com dois agentes: um roda a simulação da reforma tributária (IBS e
                CBS) dos seus clientes, o outro acha os honorários que você deixa de cobrar. Tudo com
                relatório da sua marca. E o Hub está só começando.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
                <a
                  className="btn btn-primary"
                  style={{ padding: "17px 26px", fontSize: 16 }}
                  href={SCHED_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={openScheduler}
                >
                  {heroCtaLabel}
                </a>
              </div>
              {/* Gancho do evento: o Setup de Teste montado no 9º EGESCON */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  marginTop: 28,
                  padding: "16px 18px",
                  borderRadius: 14,
                  background: "color-mix(in oklab, var(--ciano) 9%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--ciano) 28%, transparent)",
                  maxWidth: 520,
                }}
              >
                <span
                  style={{
                    flex: "none",
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "var(--ciano)",
                    color: "var(--azul-profundo)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
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
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(234,246,255,0.82)" }}>
                  <strong style={{ color: "var(--branco)" }}>Exclusivo do 9º EGESCON:</strong>{" "}
                  montamos seu Setup de Teste com uma amostra dos seus próprios dados.{" "}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "baseline",
                      gap: 8,
                      marginTop: 6,
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(234,246,255,0.55)",
                        textDecoration: "line-through",
                        textDecorationColor: "var(--ciano)",
                      }}
                    >
                      R$ 1.500,00
                    </span>
                    <strong
                      style={{
                        color: "var(--azul-profundo)",
                        background: "var(--ciano)",
                        padding: "2px 10px",
                        borderRadius: 999,
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      Grátis no evento
                    </strong>
                  </span>
                </div>
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
                  title="Simulação da reforma · cliente exemplo"
                  live="Cenários IBS/CBS"
                  rows={RADAR_ROWS}
                  summaryLabel="Melhor cenário / ano"
                  summaryValue="R$ 33.610"
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
                Amostra ilustrativa de simulação. No Setup de Teste, roda nos números dos seus
                clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1b. A REFORMA TRIBUTÁRIA */}
      <section className="lp-section" id="reforma" style={{ background: "var(--ciano-suave)" }}>
        <div className="lp-shell">
          <div style={{ maxWidth: 780, marginBottom: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              <span className="dot-cyan" /> A reforma já começou
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.08, marginBottom: 16 }}>
              De 2026 a 2033, cada cliente vai repensar regime, créditos e caixa.
            </h2>
            <p style={{ color: "var(--cinza-escuro)", fontSize: 17, lineHeight: 1.55, margin: 0 }}>
              A reforma troca o modelo atual por IBS e CBS de forma gradual. Ano a ano muda o que
              cada CNPJ paga e quanto de crédito dá para recuperar. O escritório que chega nessa
              conversa com simulação na mão vira o consultor da vez, não o que corre atrás.
            </p>
          </div>
          <div className="lp-grid-3">
            {[
              {
                stat: "2026 a 2033",
                label: "A transição para IBS e CBS acontece por etapas, ano a ano.",
              },
              {
                stat: "Regime + créditos",
                label: "Muda o melhor regime e os créditos recuperáveis de cada cliente.",
              },
              {
                stat: "Simulação na mão",
                label:
                  "O Agente Tributário roda os cenários e entrega o relatório com a sua marca.",
              },
            ].map((r) => (
              <div
                key={r.stat}
                className="card"
                style={{
                  padding: 26,
                  height: "100%",
                  borderTop: "3px solid var(--ciano)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--azul-profundo)",
                    letterSpacing: "-0.01em",
                    marginBottom: 10,
                  }}
                >
                  {r.stat}
                </div>
                <div style={{ fontSize: 14.5, color: "var(--cinza-escuro)", lineHeight: 1.5 }}>
                  {r.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <a
              className="btn btn-primary"
              style={{ padding: "15px 24px", fontSize: 15 }}
              href={SCHED_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openScheduler}
            >
              Agende seu setup sem custo
            </a>
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
              contábeis. Cada agente assume um processo inteiro. Uma plataforma que cresce agente
              a agente.
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
              O primeiro é o da reforma tributária. Cada agente faz o processo inteiro, com
              aprovação humana no que você definir.
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

      {/* 9. RODAPÉ (igual à versão no ar) */}
      <footer
        style={{
          background: "var(--azul-profundo)",
          color: "rgba(234,246,255,0.65)",
          padding: "56px 0 44px",
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
            <div style={{ fontSize: 14, color: "rgba(234,246,255,0.7)" }}>Kontiva by BlueMetrics</div>
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              {[
                { href: INSTA_URL, label: "Instagram", icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                  </svg>
                ) },
                { href: LINKEDIN_URL, label: "LinkedIn", icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 13v4" />
                  </svg>
                ) },
                { href: WHATS_URL, label: "WhatsApp", icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.2A8.5 8.5 0 1 1 21 11.5z" />
                    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1s-1.2-1-1.7-1.2c-.4-.1-.6.4-.9.6-.9-.4-1.6-1.1-2-2 .2-.3.7-.5.6-.9C10.4 10 10 8.8 9.5 8.8s-.5.4-.5 .7z" />
                  </svg>
                ) },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--claro-escuro)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
            <a
              className="btn btn-primary"
              style={{ padding: "12px 20px", fontSize: 14 }}
              href={SCHED_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openScheduler}
            >
              Reservar vaga
            </a>
            <a href={WHATS_URL} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(234,246,255,0.8)", fontSize: 14 }}>
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

      {/* Botão flutuante: abre o agendador em um popup dentro da LP */}
      <a
        className="fab"
        href={SCHED_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={openScheduler}
        aria-label="Agende seu setup"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <span>Agende seu setup</span>
      </a>

      {/* Popup do agendador (iframe do Google Calendar) dentro da LP */}
      {schedOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Agendar Setup Kontiva"
          onClick={() => setSchedOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(8,24,50,0.72)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 760,
              height: "min(880px, 92vh)",
              background: "var(--branco)",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 40px 100px -30px rgba(0,0,0,0.6)",
            }}
          >
            <button
              type="button"
              onClick={() => setSchedOpen(false)}
              aria-label="Fechar"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 3,
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                background: "var(--azul-profundo)",
                color: "var(--branco)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 10px rgba(10,31,63,0.35)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            {!schedLoaded && (
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  background: "var(--branco)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <span className="gcal-spinner" />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--cinza-texto)",
                  }}
                >
                  Carregando agenda...
                </span>
              </div>
            )}
            <iframe
              src={SCHED_URL}
              title="Agendar Setup Kontiva"
              loading="eager"
              onLoad={() => setSchedLoaded(true)}
              style={{
                border: 0,
                width: "100%",
                height: "100%",
                opacity: schedLoaded ? 1 : 0,
                transition: "opacity .3s ease",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
