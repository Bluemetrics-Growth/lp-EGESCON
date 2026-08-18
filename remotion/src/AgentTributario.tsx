import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_BODY, FONT_MONO } from "./theme";
import { FontLoader } from "./FontLoader";

const fade = (frame: number, start: number, dur = 12) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const YEARS = ["2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033"];
const REGIMES = ["Simples", "Presumido", "Real"];

export const AgentTributario: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const pulse = 0.5 + 0.5 * Math.abs(Math.sin((frame / fps) * Math.PI));
  const outro = interpolate(frame, [durationInFrames - 14, durationInFrames], [1, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Progresso da transição da reforma (ano a ano): entra e segura no fim.
  const reforma = interpolate(frame, [44, 168], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Bar "modelo atual" (ICMS/ISS) encolhe; "reforma" (IBS/CBS) cresce.
  const atualW = interpolate(reforma, [0, 1], [100, 26]);
  const reformaW = interpolate(reforma, [0, 1], [0, 74]);
  const headYears = Math.min(YEARS.length - 1, Math.floor(reforma * (YEARS.length - 1) + 0.001));

  return (
    <AbsoluteFill style={{ background: COLORS.azul, opacity: outro }}>
      <FontLoader />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(70% 55% at 12% -5%, rgba(0,212,255,0.18), transparent 60%), radial-gradient(55% 55% at 100% 108%, rgba(0,212,255,0.10), transparent 65%)",
          opacity: fade(frame, 0, 14),
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.3), transparent 70%)",
          WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.3), transparent 70%)",
          opacity: fade(frame, 4, 18),
        }}
      />

      <AbsoluteFill style={{ padding: 64, justifyContent: "space-between" }}>
        {/* Topo */}
        <div style={{ opacity: fade(frame, 6, 14) }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontFamily: FONT_MONO,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(234,246,255,0.6)",
              }}
            >
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: COLORS.ciano }} />
              Agente Tributário
            </div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                fontFamily: FONT_MONO,
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "8px 16px 8px 12px",
                borderRadius: 999,
                background: COLORS.ciano,
                color: COLORS.azul,
              }}
            >
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: COLORS.azul, opacity: pulse }} />
              Ativo
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span
              style={{
                width: 78,
                height: 78,
                borderRadius: 20,
                background: COLORS.ciano,
                color: COLORS.azul,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 16px 34px -14px rgba(0,212,255,0.8)",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16v4H4z" />
                <path d="M4 12h10M4 16h10M4 20h6" />
                <path d="m16 15 2 2 4-4" />
              </svg>
            </span>
            <div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 46, fontWeight: 800, letterSpacing: "-0.03em", color: COLORS.branco, lineHeight: 1.05 }}>
                Tributário / ICMS
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 24, color: COLORS.ciano, marginTop: 8, fontWeight: 600 }}>
                Foco na Reforma Tributária, ano a ano.
              </div>
            </div>
          </div>
        </div>

        {/* Timeline da reforma IBS / CBS */}
        <div
          style={{
            borderRadius: 22,
            border: "1px solid rgba(0,212,255,0.28)",
            background: "rgba(0,212,255,0.05)",
            padding: "28px 30px 32px",
            opacity: fade(frame, 22, 16),
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              fontFamily: FONT_MONO,
              fontSize: 15,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(234,246,255,0.55)",
              marginBottom: 22,
            }}
          >
            <span>Cenários da reforma · IBS e CBS</span>
            <span style={{ color: COLORS.ciano }}>Transição {YEARS[headYears]}</span>
          </div>

          {/* Eixo de anos */}
          <div style={{ position: "relative", marginBottom: 24 }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 7, height: 2, background: "rgba(255,255,255,0.14)" }} />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 7,
                height: 2,
                width: `${reforma * 100}%`,
                background: COLORS.ciano,
                boxShadow: "0 0 10px 1px rgba(0,212,255,0.6)",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
              {YEARS.map((y, i) => {
                const on = i <= headYears;
                return (
                  <div key={y} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: on ? COLORS.ciano : "rgba(255,255,255,0.12)",
                        border: on ? "none" : "1px solid rgba(255,255,255,0.2)",
                        boxShadow: on ? "0 0 0 5px rgba(0,212,255,0.16)" : "none",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 16,
                        fontWeight: 700,
                        color: on ? COLORS.branco : "rgba(234,246,255,0.45)",
                      }}
                    >
                      {y}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Barras: modelo atual encolhe, reforma cresce */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <BarRow label="ICMS · ISS (modelo atual)" width={atualW} tone="muted" />
            <BarRow label="IBS · CBS (reforma)" width={reformaW} tone="accent" />
          </div>
        </div>

        {/* Regimes + saída */}
        <div style={{ opacity: fade(frame, 80, 16) }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 15, color: "rgba(234,246,255,0.55)", marginRight: 4 }}>
              Simula os regimes:
            </span>
            {REGIMES.map((r) => {
              const rec = r === "Real";
              return (
                <span
                  key={r}
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 17,
                    fontWeight: 700,
                    padding: "10px 18px",
                    borderRadius: 999,
                    background: rec ? COLORS.ciano : "rgba(255,255,255,0.05)",
                    color: rec ? COLORS.azul : COLORS.claro,
                    border: rec ? "none" : "1px solid rgba(255,255,255,0.16)",
                  }}
                >
                  {r}
                  {rec ? " · cenário" : ""}
                </span>
              );
            })}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            {["Créditos recuperáveis", "Memória de cálculo", "Relatório pronto"].map((c, i) => (
              <React.Fragment key={c}>
                {i > 0 && <span style={{ color: "rgba(0,212,255,0.7)", fontSize: 22 }}>→</span>}
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 17,
                    fontWeight: 600,
                    padding: "10px 18px",
                    borderRadius: 999,
                    background: i === 2 ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.05)",
                    color: COLORS.claro,
                    border: `1px solid ${i === 2 ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.16)"}`,
                  }}
                >
                  {c}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const BarRow: React.FC<{ label: string; width: number; tone: "muted" | "accent" }> = ({ label, width, tone }) => {
  const accent = tone === "accent";
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: FONT_BODY, fontSize: 18, fontWeight: 600, color: accent ? COLORS.branco : "rgba(234,246,255,0.6)" }}>
          {label}
        </span>
      </div>
      <div style={{ height: 22, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            borderRadius: 999,
            background: accent
              ? "linear-gradient(90deg, color-mix(in oklab, #00D4FF 70%, #0A1F3F), #00D4FF)"
              : "rgba(234,246,255,0.22)",
            boxShadow: accent ? "0 0 16px -2px rgba(0,212,255,0.6)" : "none",
          }}
        />
      </div>
    </div>
  );
};
