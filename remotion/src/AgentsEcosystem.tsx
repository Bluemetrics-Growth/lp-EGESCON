import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_BODY, FONT_MONO } from "./theme";
import { FontLoader } from "./FontLoader";

const ico = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const IconERP = () => (
  <svg {...ico}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
    <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  </svg>
);
const IconBill = () => (
  <svg {...ico}>
    <path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" />
    <path d="M9 7h6M9 11h6" />
  </svg>
);
const IconDoc = () => (
  <svg {...ico}>
    <path d="M6 2h9l5 5v15H6z" />
    <path d="M14 2v6h6M9 13h6M9 17h4" />
  </svg>
);
const IconHonor = () => (
  <svg {...ico}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
    <path d="M11 8v6M8 11h6" />
  </svg>
);
const IconTax = () => (
  <svg {...ico}>
    <path d="M4 4h16v4H4z" />
    <path d="M4 12h10M4 16h10M4 20h6" />
    <path d="m16 15 2 2 4-4" />
  </svg>
);
const IconCheck = () => (
  <svg {...ico}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const IconReport = () => (
  <svg {...ico}>
    <path d="M4 4h16v16H4z" />
    <path d="M8 15v-3M12 15V9M16 15v-5" />
  </svg>
);
const IconUsers = () => (
  <svg {...ico}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.2a3.2 3.2 0 0 1 0 6M18.5 20a5.5 5.5 0 0 0-3-4.9" />
  </svg>
);

/* fade helper */
const fade = (frame: number, start: number, dur = 12) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/* Stage: um nó do fluxo (pill com ícone + rótulo). */
const Stage: React.FC<{
  appear: number;
  icon?: React.ReactNode;
  label: string;
  sub?: string;
  chips?: string[];
  variant?: "source" | "agent" | "result";
}> = ({ appear, icon, label, sub, chips, variant = "source" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - appear, fps, config: { damping: 200, stiffness: 90, mass: 0.8 } });
  const op = s;
  const ty = interpolate(s, [0, 1], [22, 0]);

  const isAgent = variant === "agent";
  const isResult = variant === "result";

  const glow = isAgent ? 0.5 + 0.5 * Math.abs(Math.sin((frame / fps) * Math.PI)) : 0;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: isAgent ? "22px 24px" : "18px 20px",
        borderRadius: 20,
        minWidth: isAgent ? 300 : 190,
        background: isAgent
          ? "radial-gradient(120% 90% at 100% 0%, rgba(0,212,255,0.20), transparent 60%), rgba(0,212,255,0.08)"
          : isResult
          ? "rgba(0,212,255,0.07)"
          : "rgba(255,255,255,0.04)",
        border: isAgent
          ? "1.5px solid rgba(0,212,255,0.6)"
          : isResult
          ? "1px solid rgba(0,212,255,0.4)"
          : "1px solid rgba(255,255,255,0.14)",
        boxShadow: isAgent
          ? `0 30px 70px -34px rgba(0,0,0,0.7), 0 0 ${18 + glow * 26}px -6px rgba(0,212,255,${0.25 + glow * 0.35})`
          : "0 20px 44px -30px rgba(0,0,0,0.6)",
        opacity: op,
        transform: `translateY(${ty}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {icon && (
          <span
            style={{
              flex: "none",
              width: isAgent ? 52 : 40,
              height: isAgent ? 52 : 40,
              borderRadius: isAgent ? 14 : 11,
              background: isAgent || isResult ? COLORS.ciano : "rgba(255,255,255,0.08)",
              color: isAgent || isResult ? COLORS.azul : COLORS.claro,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </span>
        )}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: FONT_BODY,
              fontSize: isAgent ? 26 : 20,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: COLORS.branco,
              lineHeight: 1.15,
            }}
          >
            {label}
          </div>
          {sub && (
            <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: "rgba(234,246,255,0.6)", marginTop: 3 }}>
              {sub}
            </div>
          )}
        </div>
      </div>
      {chips && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {chips.map((c, i) => (
            <span
              key={c}
              style={{
                fontFamily: FONT_MONO,
                fontSize: 13,
                fontWeight: 600,
                padding: "5px 11px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                color: COLORS.claro,
                border: "1px solid rgba(255,255,255,0.16)",
                opacity: fade(frame, appear + 8 + i * 4, 8),
              }}
            >
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/* Connector: linha horizontal que "desenha" e com pontos de dados fluindo. */
const Connector: React.FC<{ drawAt: number }> = ({ drawAt }) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [drawAt, drawAt + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flowing = frame > drawAt + 10;
  const period = 46;
  const dots = [0, period / 2];

  return (
    <div style={{ flex: "0 0 74px", position: "relative", height: 40, alignSelf: "center" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 2,
          transform: `scaleX(${draw})`,
          transformOrigin: "left center",
          background:
            "linear-gradient(90deg, rgba(0,212,255,0.15), rgba(0,212,255,0.55))",
        }}
      />
      {flowing &&
        dots.map((offset, i) => {
          const p = ((frame - drawAt + offset) % period) / period;
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: `${p * 100}%`,
                width: 8,
                height: 8,
                marginTop: -4,
                marginLeft: -4,
                borderRadius: "50%",
                background: COLORS.ciano,
                boxShadow: "0 0 10px 2px rgba(0,212,255,0.7)",
                opacity: interpolate(p, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
              }}
            />
          );
        })}
      {/* seta */}
      <span
        style={{
          position: "absolute",
          top: "50%",
          right: -2,
          marginTop: -5,
          width: 10,
          height: 10,
          borderTop: "2px solid rgba(0,212,255,0.6)",
          borderRight: "2px solid rgba(0,212,255,0.6)",
          transform: "rotate(45deg)",
          opacity: draw,
        }}
      />
    </div>
  );
};

const Lane: React.FC<{
  base: number;
  eyebrow: string;
  stages: React.ComponentProps<typeof Stage>[];
}> = ({ base, eyebrow, stages }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, opacity: fade(frame, base - 6, 12) }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          fontFamily: FONT_MONO,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(234,246,255,0.55)",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.ciano }} />
        {eyebrow}
      </div>
      <div style={{ display: "flex", alignItems: "stretch" }}>
        {stages.map((st, i) => (
          <React.Fragment key={i}>
            <Stage {...st} appear={base + i * 8} />
            {i < stages.length - 1 && <Connector drawAt={base + i * 8 + 6} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const AgentsEcosystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const outro = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.azul, opacity: outro }}>
      <FontLoader />
      {/* atmosfera */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(55% 65% at 85% -5%, rgba(0,212,255,0.16), transparent 60%), radial-gradient(50% 60% at 6% 108%, rgba(0,212,255,0.10), transparent 65%)",
          opacity: fade(frame, 0, 16),
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.3), transparent 70%)",
          WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.3), transparent 70%)",
          opacity: fade(frame, 4, 20),
        }}
      />

      <AbsoluteFill style={{ padding: "44px 88px", justifyContent: "center" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 30,
            opacity: fade(frame, 6, 14),
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
            Ecossistema do Hub
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
            <span style={{ color: COLORS.branco }}>Kontiva</span>
            <span style={{ color: COLORS.ciano }}>.ai</span>
          </div>
        </div>

        {/* Moldura escritório → clientes */}
        <div style={{ display: "flex", alignItems: "stretch", gap: 26 }}>
          <SideLabel text="Seu escritório" icon={<IconERP />} appear={14} />

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 40 }}>
            <Lane
              base={26}
              eyebrow="Agente de Honorários"
              stages={[
                { label: "Entradas", sub: "ERP · cobrança", icon: <IconBill />, variant: "source" },
                { label: "Conciliador de Honorários", sub: "contrato × cobrança", icon: <IconHonor />, variant: "agent" },
                { label: "Acha o não cobrado", sub: "+R$ a cobrar", icon: <IconCheck />, variant: "result" },
              ]}
            />
            <Lane
              base={58}
              eyebrow="Agente Tributário"
              stages={[
                { label: "Entradas", sub: "ERP · notas", icon: <IconDoc />, variant: "source" },
                {
                  label: "Tributário / ICMS",
                  sub: "regime + créditos",
                  icon: <IconTax />,
                  variant: "agent",
                  chips: ["Simples", "Presumido", "Real", "IBS / CBS"],
                },
                { label: "Relatório pronto", sub: "com memória de cálculo", icon: <IconReport />, variant: "result" },
              ]}
            />
          </div>

          <SideLabel text="Seus clientes" icon={<IconUsers />} appear={20} accent />
        </div>

        {/* Assinatura */}
        <div
          style={{
            marginTop: 36,
            textAlign: "center",
            fontFamily: FONT_MONO,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: "rgba(234,246,255,0.6)",
            opacity: fade(frame, 150, 18),
          }}
        >
          Dois agentes rodando hoje · você aprova antes de cobrar · Setup EGESCON
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const SideLabel: React.FC<{ text: string; icon: React.ReactNode; appear: number; accent?: boolean }> = ({
  text,
  icon,
  appear,
  accent,
}) => {
  const frame = useCurrentFrame();
  const op = fade(frame, appear, 14);
  return (
    <div
      style={{
        flex: "0 0 150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "24px 12px",
        borderRadius: 22,
        border: `1px ${accent ? "solid rgba(0,212,255,0.4)" : "dashed rgba(255,255,255,0.18)"}`,
        background: accent ? "rgba(0,212,255,0.06)" : "rgba(255,255,255,0.03)",
        opacity: op,
      }}
    >
      <span
        style={{
          width: 60,
          height: 60,
          borderRadius: 16,
          background: accent ? COLORS.ciano : "rgba(255,255,255,0.08)",
          color: accent ? COLORS.azul : COLORS.claro,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 19,
          fontWeight: 700,
          color: COLORS.branco,
          textAlign: "center",
          letterSpacing: "-0.01em",
        }}
      >
        {text}
      </span>
    </div>
  );
};
