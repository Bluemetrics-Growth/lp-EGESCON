import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_BODY, FONT_MONO } from "./theme";
import { FontLoader } from "./FontLoader";

const fade = (frame: number, start: number, dur = 12) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const ROWS = [
  { name: "Contrato · Cliente A", amount: "R$ 890", tag: "ok", flag: false },
  { name: "Honorário · Cliente B", amount: "+R$ 420", tag: "a cobrar", flag: true },
  { name: "Serviço extra · Cliente D", amount: "+R$ 310", tag: "a cobrar", flag: true },
  { name: "Contrato · Cliente C", amount: "R$ 1.240", tag: "ok", flag: false },
];

export const AgentHonorarios: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const pulse = 0.5 + 0.5 * Math.abs(Math.sin((frame / fps) * Math.PI));
  const outro = interpolate(frame, [durationInFrames - 14, durationInFrames], [1, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // varredura sobre a lista
  const scanY = interpolate((frame % 120) / 120, [0, 1], [-12, 112]);

  return (
    <AbsoluteFill style={{ background: COLORS.azul, opacity: outro }}>
      <FontLoader />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(70% 60% at 90% -5%, rgba(0,212,255,0.16), transparent 60%), radial-gradient(50% 50% at 0% 108%, rgba(0,212,255,0.10), transparent 65%)",
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 26,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontFamily: FONT_MONO,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(234,246,255,0.6)",
              }}
            >
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: COLORS.ciano }} />
              Agente de Honorários
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
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </span>
            <div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 46, fontWeight: 800, letterSpacing: "-0.03em", color: COLORS.branco, lineHeight: 1.05 }}>
                Conciliador de Honorários
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 24, color: "rgba(234,246,255,0.72)", marginTop: 8 }}>
                Cruza contrato × cobrança e acha o que ficou sem cobrar.
              </div>
            </div>
          </div>
        </div>

        {/* Painel de conciliação */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 22,
            border: "1px solid rgba(0,212,255,0.28)",
            background: "rgba(0,212,255,0.05)",
            padding: 26,
            opacity: fade(frame, 24, 16),
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${scanY}%`,
              height: "20%",
              background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.20) 50%, transparent)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: FONT_MONO,
              fontSize: 15,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(234,246,255,0.55)",
              marginBottom: 16,
            }}
          >
            <span>Conciliação de honorários</span>
            <span style={{ color: COLORS.ciano }}>Varredura ativa</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ROWS.map((r, i) => (
              <div
                key={r.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto",
                  gap: 18,
                  alignItems: "center",
                  padding: "16px 20px",
                  borderRadius: 14,
                  background: r.flag ? "rgba(0,212,255,0.10)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${r.flag ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                  opacity: fade(frame, 30 + i * 8, 10),
                }}
              >
                <span style={{ fontFamily: FONT_BODY, fontSize: 22, fontWeight: 500, color: COLORS.claro }}>{r.name}</span>
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 22,
                    fontWeight: 700,
                    color: r.flag ? COLORS.ciano : "rgba(234,246,255,0.75)",
                  }}
                >
                  {r.amount}
                </span>
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    padding: "5px 12px",
                    borderRadius: 999,
                    background: r.flag ? COLORS.ciano : "transparent",
                    color: r.flag ? COLORS.azul : "rgba(234,246,255,0.6)",
                    border: r.flag ? "none" : "1px solid rgba(255,255,255,0.16)",
                  }}
                >
                  {r.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé: fluxo */}
        <div style={{ opacity: fade(frame, 70, 16) }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            {["Contrato × cobrança", "Acha o não cobrado", "Você aprova antes de cobrar"].map((c, i) => (
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
          <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: "rgba(234,246,255,0.45)", marginTop: 14 }}>
            Amostra ilustrativa. No Setup de Teste, roda nos seus números.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
