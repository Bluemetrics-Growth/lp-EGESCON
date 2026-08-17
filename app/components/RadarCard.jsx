/* Mock escuro com varredura — coração da identidade Kontiva.
   rows: [{ idx, name, amount, badge, flagged }] */
export default function RadarCard({
  title = "Contratos · varredura",
  live = "Varredura ativa",
  rows = [],
  summaryLabel,
  summaryValue,
  scan = true,
}) {
  return (
    <div
      style={{
        position: "relative",
        background: "var(--azul-profundo)",
        borderRadius: 22,
        padding: 28,
        color: "#EAF6FF",
        overflow: "hidden",
        boxShadow: "var(--shadow-dark)",
        minHeight: 520,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(600px circle at 85% 15%, color-mix(in oklab, var(--ciano) 18%, transparent), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      {scan && (
        <div
          style={{
            position: "absolute",
            inset: "80px 0 0 0",
            background:
              "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--ciano) 22%, transparent) 48%, color-mix(in oklab, var(--ciano) 40%, transparent) 50%, transparent 100%)",
            animation: "scan 3.6s cubic-bezier(.7,0,.3,1) infinite",
            pointerEvents: "none",
          }}
        />
      )}
      <div
        className="radar-head"
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "rgba(224,249,255,0.6)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 20,
          position: "relative",
        }}
      >
        <span>{title}</span>
        <span className="live" style={{ color: "var(--ciano)" }}>
          {live}
        </span>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {rows.map((r, i) => (
          <div
            key={i}
            className={`radar-row${r.flagged ? " flagged" : ""}`}
            style={{
              display: "grid",
              gridTemplateColumns: "34px 1fr auto auto",
              gap: 14,
              alignItems: "center",
              padding: "14px 16px",
              background: r.flagged
                ? "color-mix(in oklab, var(--ciano) 8%, transparent)"
                : "rgba(255,255,255,0.03)",
              border: `1px solid ${
                r.flagged
                  ? "color-mix(in oklab, var(--ciano) 55%, transparent)"
                  : "rgba(255,255,255,0.06)"
              }`,
              borderRadius: 12,
              fontSize: 14,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "rgba(224,249,255,0.5)",
              }}
            >
              {r.idx}
            </span>
            <span style={{ color: "#EAF6FF", fontWeight: 500 }}>{r.name}</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: r.flagged ? "var(--ciano)" : "rgba(224,249,255,0.75)",
                fontWeight: r.flagged ? 600 : 400,
              }}
            >
              {r.amount}
            </span>
            <span
              style={{
                padding: "3px 8px",
                borderRadius: 99,
                fontSize: 10,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                ...(r.flagged
                  ? {
                      background: "var(--ciano)",
                      color: "var(--azul-profundo)",
                      fontWeight: 700,
                    }
                  : {
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(224,249,255,0.7)",
                    }),
              }}
            >
              {r.badge}
            </span>
          </div>
        ))}
      </div>
      {summaryValue && (
        <div
          style={{
            marginTop: 20,
            padding: "16px 18px 0",
            borderTop: "1px dashed rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(224,249,255,0.55)",
            }}
          >
            {summaryLabel}
          </span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "var(--ciano)",
              letterSpacing: "-0.02em",
            }}
          >
            {summaryValue}
          </span>
        </div>
      )}
    </div>
  );
}
