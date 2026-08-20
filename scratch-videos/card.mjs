// Gera vídeos isolados (alpha) dos dois cards animados da LP Kontiva EGESCON.
// Reproduz fielmente o componente RadarCard (feixe "scan" + ponto "live" pulsando).
// NÃO toca na LP — usa apenas cópia dos estilos.
import { chromium } from "playwright-core";
import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync, existsSync } from "node:fs";
import ffmpegPath from "ffmpeg-static";

const OUT = new URL("./", import.meta.url).pathname;
const FRAMES = OUT + "frames";
const FPS = 30;
const SCAN_MS = 3600;          // período do feixe (loop perfeito)
const FRAMES_N = (SCAN_MS / 1000) * FPS; // 108 frames = 1 loop sem emenda
const W = 544;                 // largura do card
const SCALE = 2;               // nitidez (saída ~2x)

const CARDS = {
  simulacao: {
    title: "Simulação da Reforma · Cliente exemplo",
    live: "Cenários IBS/CBS",
    rows: [
      { idx: "01", name: "Simples Nacional",      amount: "R$ 41.200", badge: "atual",       flagged: false },
      { idx: "02", name: "Lucro Presumido",       amount: "R$ 36.900", badge: "cenário",     flagged: false },
      { idx: "03", name: "Lucro Real",            amount: "R$ 33.610", badge: "recomendado", flagged: true  },
      { idx: "04", name: "IBS + CBS · 2027",      amount: "R$ 34.980", badge: "projeção",    flagged: true  },
      { idx: "05", name: "Créditos recuperáveis", amount: "+R$ 7.300", badge: "a recuperar", flagged: true  },
    ],
    summaryLabel: "Melhor cenário / ano",
    summaryValue: "R$ 33.610",
  },
  conciliacao: {
    title: "Conciliação de honorários",
    live: "Varredura ativa",
    rows: [
      { idx: "01", name: "Contrato · Cliente A",     amount: "R$ 890",   badge: "ok",       flagged: false },
      { idx: "02", name: "Honorário · Cliente B",    amount: "+R$ 420",  badge: "a cobrar", flagged: true  },
      { idx: "03", name: "Contrato · Cliente C",     amount: "R$ 1.240", badge: "ok",       flagged: false },
      { idx: "04", name: "Serviço extra · Cliente D",amount: "+R$ 310",  badge: "a cobrar", flagged: true  },
      { idx: "05", name: "Contrato · Cliente E",     amount: "R$ 640",   badge: "ok",       flagged: false },
    ],
    summaryLabel: "Receita encontrada / ano",
    summaryValue: "R$ 29 mil",
  },
};

const row = (r) => `
  <div class="radar-row${r.flagged ? " flagged" : ""}">
    <span class="idx">${r.idx}</span>
    <span class="name">${r.name}</span>
    <span class="amount">${r.amount}</span>
    <span class="badge">${r.badge}</span>
  </div>`;

const html = (c) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --azul-profundo:#0A1F3F; --ciano:#00D4FF; --accent-boost:1.05;
  --font-body:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
  --font-mono:'JetBrains Mono',ui-monospace,monospace;
}
*{box-sizing:border-box;}
html,body{margin:0;background:transparent;}
body{padding:${SCALE ? 8 : 8}px;font-family:var(--font-body);}
.radar-card{
  position:relative; width:${W}px; background:var(--azul-profundo);
  border-radius:22px; padding:28px; color:#EAF6FF; overflow:hidden;
  box-shadow:0 30px 80px -30px rgba(10,31,63,0.4), 0 0 0 1px rgba(10,31,63,0.08);
}
.radar-card::before{
  content:""; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(600px circle at 85% 15%, color-mix(in oklab, var(--ciano) calc(18% * var(--accent-boost)), transparent), transparent 60%),
    linear-gradient(180deg, transparent 0%, rgba(0,212,255,0.04) 100%);
}
.radar-card::after{
  content:""; position:absolute; inset:80px 0 0 0; pointer-events:none;
  background:linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--ciano) calc(22% * var(--accent-boost)), transparent) 48%, color-mix(in oklab, var(--ciano) calc(40% * var(--accent-boost)), transparent) 50%, transparent 100%);
  filter:blur(0.5px);
  animation:scan 3.6s cubic-bezier(.7,0,.3,1) infinite;
}
@keyframes scan{0%{transform:translateY(-30%);opacity:0;}20%,80%{opacity:1;}100%{transform:translateY(120%);opacity:0;}}
.radar-head{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:rgba(224,249,255,0.6);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:20px;position:relative;z-index:1;}
.radar-head .live{display:inline-flex;align-items:center;gap:6px;color:var(--ciano);}
.radar-head .live::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--ciano);box-shadow:0 0 0 0 currentColor;animation:pulse 1.8s ease-out infinite;}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(0,212,255,0.5);}100%{box-shadow:0 0 0 10px rgba(0,212,255,0);}}
.radar-list{position:relative;z-index:1;display:flex;flex-direction:column;gap:10px;}
.radar-row{display:grid;grid-template-columns:34px 1fr auto auto;gap:14px;align-items:center;padding:14px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;font-size:14px;}
.radar-row .idx{font-family:var(--font-mono);font-size:11px;color:rgba(224,249,255,0.5);letter-spacing:0.04em;}
.radar-row .name{color:#EAF6FF;font-weight:500;}
.radar-row .amount{font-family:var(--font-mono);font-size:13px;color:rgba(224,249,255,0.75);}
.radar-row .badge{padding:3px 8px;border-radius:99px;font-size:10px;letter-spacing:0.04em;text-transform:uppercase;border:1px solid rgba(255,255,255,0.1);color:rgba(224,249,255,0.7);white-space:nowrap;}
.radar-row.flagged{border-color:color-mix(in oklab, var(--ciano) calc(55% * var(--accent-boost)), transparent);background:color-mix(in oklab, var(--ciano) calc(8% * var(--accent-boost)), transparent);}
.radar-row.flagged .badge{background:var(--ciano);color:var(--azul-profundo);border-color:var(--ciano);font-weight:700;}
.radar-row.flagged .amount{color:var(--ciano);font-weight:600;}
.radar-summary{margin-top:20px;padding:16px 18px;border-top:1px dashed rgba(255,255,255,0.1);display:flex;justify-content:space-between;align-items:baseline;position:relative;z-index:1;}
.radar-summary .label{font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(224,249,255,0.55);}
.radar-summary .value{font-size:28px;font-weight:700;color:var(--ciano);letter-spacing:-0.02em;}
</style></head><body>
<div class="radar-card" id="card">
  <div class="radar-head"><span>${c.title}</span><span class="live">${c.live}</span></div>
  <div class="radar-list">${c.rows.map(row).join("")}</div>
  <div class="radar-summary"><span class="label">${c.summaryLabel}</span><span class="value">${c.summaryValue}</span></div>
</div>
</body></html>`;

const ff = (args) => {
  const r = spawnSync(ffmpegPath, args, { stdio: "inherit" });
  if (r.status !== 0) throw new Error("ffmpeg falhou: " + args.join(" "));
};

const run = async () => {
  const browser = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell",
    args: ["--force-color-profile=srgb", "--disable-lcd-text"],
  });
  const page = await browser.newPage({ deviceScaleFactor: SCALE, viewport: { width: W + 40, height: 720 } });

  for (const [key, cfg] of Object.entries(CARDS)) {
    console.log(`\n=== ${key} ===`);
    const dir = `${FRAMES}/${key}`;
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });

    await page.setContent(html(cfg), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const el = page.locator("#card");
    await el.waitFor();

    // Congela todas as animações e avança quadro a quadro (loop sem emenda).
    await page.evaluate(() => document.getAnimations().forEach((a) => a.pause()));
    for (let i = 0; i < FRAMES_N; i++) {
      const t = (i / FPS) * 1000;
      await page.evaluate((ms) => {
        document.getAnimations().forEach((a) => { a.currentTime = ms; });
      }, t);
      const n = String(i).padStart(4, "0");
      await el.screenshot({ path: `${dir}/f_${n}.png`, omitBackground: true });
    }
    console.log(`  ${FRAMES_N} frames capturados`);

    // ProRes 4444 (.mov) com alpha — para edição/composição
    ff(["-y", "-framerate", String(FPS), "-i", `${dir}/f_%04d.png`,
        "-c:v", "prores_ks", "-profile:v", "4444", "-pix_fmt", "yuva444p10le",
        "-vendor", "apl0", `${OUT}kontiva-${key}.mov`]);
    // VP9 (.webm) com alpha — versão leve
    ff(["-y", "-framerate", String(FPS), "-i", `${dir}/f_%04d.png`,
        "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", "18",
        "-auto-alt-ref", "0", `${OUT}kontiva-${key}.webm`]);
  }

  await browser.close();
  console.log("\nOK");
};

run().catch((e) => { console.error(e); process.exit(1); });
