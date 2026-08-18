import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_BODY, FONT_MONO } from "./theme";
import { FontLoader } from "./FontLoader";

const svg = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const AGENTS = [
  {
    name: "Conciliador de Honorários",
    desc: "Cruza contrato e cobrança, acha o que faltou.",
    chips: ["Contrato × cobrança", "Você aprova antes de cobrar"],
    icon: (
      <svg {...svg}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    name: "Tributário / ICMS",
    desc: "Confere apuração e regime contra o que foi lançado.",
    chips: ["Simples", "Presumido", "Real", "IBS / CBS"],
    icon: (
      <svg {...svg}>
        <path d="M4 4h16v4H4z" />
        <path d="M4 12h10M4 16h10M4 20h6" />
        <path d="m16 15 2 2 4-4" />
      </svg>
    ),
  },
];

const fade = (frame: number, start: number, dur = 14) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const AgentCard: React.FC<{ agent: (typeof AGENTS)[number]; startFrame: number }> = ({
  agent,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 200, stiffness: 90, mass: 0.9 },
  });
  const translateY = interpolate(enter, [0, 1], [60, 0]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);

  // Varredura ciano vertical, em loop, depois do card aparecer.
  const visible = frame > startFrame + 4;
  const sweep = ((frame - startFrame) % 120) / 120;
  const sweepY = interpolate(sweep, [0, 1], [-15, 115]);

  // Pulso do dot "ativo".
  const pulse = 0.55 + 0.45 * Math.abs(Math.sin((frame / fps) * Math.PI * 1.1));

  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 26,
        padding: 44,
        borderRadius: 28,
        overflow: "hidden",
        background:
          "radial-gradient(120% 80% at 100% 0%, rgba(0,212,255,0.16), transparent 60%), rgba(0,212,255,0.06)",
        border: "1px solid rgba(0,212,255,0.45)",
        boxShadow: "0 50px 110px -50px rgba(0,0,0,0.7)",
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {/* Varredura */}
      {visible && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${sweepY}%`,
            height: "22%",
            background:
              "linear-gradient(180deg, transparent, rgba(0,212,255,0.22) 50%, transparent)",
            pointerEvents: "none",
          }}
        />
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            width: 74,
            height: 74,
            borderRadius: 20,
            background: COLORS.ciano,
            color: COLORS.azul,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 16px 34px -14px rgba(0,212,255,0.8)",
          }}
        >
          {agent.icon}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontFamily: FONT_MONO,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            padding: "9px 18px 9px 14px",
            borderRadius: 999,
            background: COLORS.ciano,
            color: COLORS.azul,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: COLORS.azul,
              opacity: pulse,
            }}
          />
          Ativo
        </span>
      </div>

      <div>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: COLORS.branco,
            lineHeight: 1.1,
          }}
        >
          {agent.name}
        </div>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 24,
            color: "rgba(234,246,255,0.72)",
            marginTop: 14,
            lineHeight: 1.45,
          }}
        >
          {agent.desc}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: "auto" }}>
        {agent.chips.map((c, i) => {
          const chipOp = fade(frame, startFrame + 14 + i * 6, 10);
          return (
            <span
              key={c}
              style={{
                fontFamily: FONT_MONO,
                fontSize: 18,
                fontWeight: 600,
                padding: "10px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                color: COLORS.claro,
                border: "1px solid rgba(255,255,255,0.16)",
                opacity: chipOp,
                transform: `translateY(${interpolate(chipOp, [0, 1], [10, 0])}px)`,
              }}
            >
              {c}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const AgentsRoadmap: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Título com revelação por máscara.
  const titleReveal = interpolate(frame, [18, 44], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out geral no fim.
  const outro = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.azul, opacity: outro }}>
      <FontLoader />

      {/* Atmosfera: brilhos ciano em camadas */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(60% 70% at 85% -5%, rgba(0,212,255,0.16), transparent 60%), radial-gradient(50% 60% at 8% 108%, rgba(0,212,255,0.10), transparent 65%)",
          opacity: fade(frame, 0, 16),
        }}
      />
      {/* Grade sutil */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.35), transparent 65%)",
          WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.35), transparent 65%)",
          opacity: fade(frame, 4, 20),
        }}
      />

      <AbsoluteFill style={{ padding: "96px 120px", justifyContent: "center" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: fade(frame, 8, 14),
            transform: `translateY(${interpolate(fade(frame, 8, 14), [0, 1], [-14, 0])}px)`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              fontFamily: FONT_BODY,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(234,246,255,0.66)",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: COLORS.ciano,
                boxShadow: "0 0 0 6px rgba(0,212,255,0.18)",
              }}
            />
            Roadmap do Hub
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>
            <span style={{ color: COLORS.branco }}>Kontiva</span>
            <span style={{ color: COLORS.ciano }}>.ai</span>
          </div>
        </div>

        {/* Título */}
        <div style={{ margin: "30px 0 12px", overflow: "hidden" }}>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: 82,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              color: COLORS.branco,
              clipPath: `inset(0 ${100 - titleReveal}% 0 0)`,
            }}
          >
            Dois agentes rodando hoje.
          </div>
        </div>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 28,
            color: "rgba(234,246,255,0.7)",
            opacity: fade(frame, 40, 14),
            marginBottom: 56,
          }}
        >
          Quem entra agora influencia quais agentes vêm depois.
        </div>

        {/* Dois agentes */}
        <div style={{ display: "flex", gap: 32 }}>
          <AgentCard agent={AGENTS[0]} startFrame={48} />
          <AgentCard agent={AGENTS[1]} startFrame={62} />
        </div>

        {/* Rodapé / marca do evento */}
        <div
          style={{
            marginTop: 52,
            fontFamily: FONT_MONO,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: "rgba(234,246,255,0.6)",
            opacity: fade(frame, 200, 18),
          }}
        >
          Vagas limitadas · Setup EGESCON
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
