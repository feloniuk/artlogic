"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Check,
  FileText,
  MessageSquareText,
  ShoppingBag,
  Store,
  Truck,
  Wallet,
  Webhook,
} from "lucide-react";

/* One "order" travels through the pipeline per cycle:
   source → core (0–0.9s) → fan-out to every output (1.2s+) → logged in the feed (2.7s). */
const CYCLE_S = 4.6;
const IN_S = 0.9;
const OUT_START_S = 1.2;
const OUT_STAGGER_S = 0.14;
const OUT_S = 0.8;
const LOG_S = 2.7;
const FIRST_ORDER_NO = 1042;

const SOURCES = [
  { key: "horoshop", label: "Horoshop", icon: ShoppingBag },
  { key: "prom", label: "Prom.ua", icon: Store },
  { key: "api", label: "API", icon: Webhook },
] as const;

const OUTPUTS = [
  { key: "invoice", icon: FileText },
  { key: "ttn", icon: Truck },
  { key: "notify", icon: MessageSquareText },
  { key: "finance", icon: Wallet },
] as const;

const ORDERS = [
  { source: 0, amount: 2480 },
  { source: 1, amount: 915 },
  { source: 0, amount: 6730 },
  { source: 2, amount: 1290 },
  { source: 1, amount: 3360 },
  { source: 0, amount: 540 },
] as const;

const BASE_STATS = { orders: 126, invoices: 18, ttn: 42 };

function orderAt(index: number) {
  const n = ORDERS.length;
  return { ...ORDERS[((index % n) + n) % n], no: FIRST_ORDER_NO + index };
}

// Manual grouping keeps server and client output identical (no ICU differences).
function formatAmount(value: number) {
  return "₴" + String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function buildGeometry(w: number, h: number) {
  const narrow = w < 430;
  const pad = narrow ? 12 : 18;
  const srcW = narrow ? 80 : 112;
  const outW = narrow ? 116 : 158;
  const r = narrow ? 28 : 38;
  const srcEdge = pad + srcW;
  const outEdge = w - pad - outW;
  const cx = (srcEdge + outEdge) / 2;
  const cy = h / 2;
  const srcY = SOURCES.map((_, i) => h * (0.2 + i * 0.3));
  const outY = OUTPUTS.map((_, j) => h * (0.125 + j * 0.25));

  const inPaths = srcY.map((y) => {
    const x1 = cx - r - 6;
    const m = (srcEdge + x1) / 2;
    return `M${srcEdge} ${y}C${m} ${y} ${m} ${cy} ${x1} ${cy}`;
  });
  const outPaths = outY.map((y) => {
    const x0 = cx + r + 6;
    const m = (x0 + outEdge) / 2;
    return `M${x0} ${cy}C${m} ${cy} ${m} ${y} ${outEdge} ${y}`;
  });

  return { narrow, pad, srcW, outW, r, srcEdge, outEdge, cx, cy, srcY, outY, inPaths, outPaths };
}

function Packet({ d, delay, duration }: { d: string; delay: number; duration: number }) {
  return (
    <motion.span
      className="pointer-events-none absolute left-0 top-0 h-2 w-2 rounded-full bg-violet-100"
      style={{
        offsetPath: `path("${d}")`,
        offsetRotate: "0deg",
        boxShadow: "0 0 14px 3px rgba(167,139,250,0.8)",
      }}
      initial={{ offsetDistance: "0%", opacity: 0 }}
      animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
      transition={{
        offsetDistance: { delay, duration, ease: [0.45, 0, 0.2, 1] },
        opacity: { delay, duration, times: [0, 0.12, 0.85, 1] },
      }}
    />
  );
}

function LitWire({ d, delay, duration }: { d: string; delay: number; duration: number }) {
  return (
    <motion.path
      d={d}
      stroke="url(#al-flow-grad)"
      strokeWidth={1.5}
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
      transition={{
        pathLength: { delay, duration, ease: [0.45, 0, 0.2, 1] },
        opacity: { delay, duration: duration + 1.5, times: [0, 0.05, 0.6, 1] },
      }}
    />
  );
}

export function AutomationFlow() {
  const t = useTranslations("hero.flow");
  const reducedMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.2 });

  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [cycle, setCycle] = useState(0);
  const [feed, setFeed] = useState<number[]>([-1, -2, -3]);
  const [completed, setCompleted] = useState(0);

  const running = inView && !reducedMotion && size !== null;

  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const log = setTimeout(() => {
      setFeed((prev) => (prev[0] === cycle ? prev : [cycle, ...prev].slice(0, 3)));
      setCompleted((c) => c + 1);
    }, LOG_S * 1000);
    const next = setTimeout(() => setCycle((c) => c + 1), CYCLE_S * 1000);
    return () => {
      clearTimeout(log);
      clearTimeout(next);
    };
  }, [cycle, running]);

  const geo = useMemo(() => (size ? buildGeometry(size.w, size.h) : null), [size]);
  const order = orderAt(cycle);

  // Subtle pointer tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 20 });
  const sy = useSpring(py, { stiffness: 120, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  const stats = [
    { key: "orders", value: BASE_STATS.orders + completed },
    { key: "invoices", value: BASE_STATS.invoices + completed },
    { key: "ttn", value: BASE_STATS.ttn + completed },
  ] as const;

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label={t("aria")}
      className="relative"
      style={{ perspective: 1400 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Ambient glow */}
      <div className="absolute inset-6 -z-10 rounded-[2rem] bg-violet-600/15 blur-3xl" />

      <motion.div
        style={{ rotateX, rotateY }}
        className="relative rounded-[2rem] border border-white/[0.07] bg-white/[0.03] p-1.5"
      >
        <div
          className="relative overflow-hidden rounded-[calc(2rem-6px)] bg-brand-surface"
          style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08)" }}
        >
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "radial-gradient(ellipse at 50% 38%, black 25%, transparent 72%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 38%, black 25%, transparent 72%)",
            }}
          />

          {/* Header */}
          <div className="relative flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
            <span className="flex items-center gap-2 text-[11px] font-medium text-white/55">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {t("live")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
              {t("orderLabel")} #{order.no}
            </span>
          </div>

          {/* Flow */}
          <div ref={flowRef} className="relative h-[250px] sm:h-[300px]">
            {geo && size && (
              <>
                <svg
                  className="absolute inset-0"
                  width={size.w}
                  height={size.h}
                  viewBox={`0 0 ${size.w} ${size.h}`}
                  fill="none"
                >
                  <defs>
                    <linearGradient
                      id="al-flow-grad"
                      gradientUnits="userSpaceOnUse"
                      x1={geo.srcEdge}
                      y1={0}
                      x2={geo.outEdge}
                      y2={0}
                    >
                      <stop offset="0" stopColor="#7c3aed" />
                      <stop offset="0.5" stopColor="#c4b5fd" />
                      <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>

                  {[...geo.inPaths, ...geo.outPaths].map((d) => (
                    <path key={d} d={d} stroke="rgba(255,255,255,0.09)" strokeWidth={1} />
                  ))}
                  {geo.srcY.map((y) => (
                    <circle key={`s${y}`} cx={geo.srcEdge} cy={y} r={2.5} fill="#8b5cf6" fillOpacity={0.6} />
                  ))}
                  {geo.outY.map((y) => (
                    <circle key={`o${y}`} cx={geo.outEdge} cy={y} r={2.5} fill="#22d3ee" fillOpacity={0.5} />
                  ))}

                  {/* Orbit rings around the core */}
                  <circle
                    cx={geo.cx}
                    cy={geo.cy}
                    r={geo.r + 16}
                    stroke="rgba(167,139,250,0.28)"
                    strokeWidth={1}
                    strokeDasharray="2 7"
                    className="animate-[spin_24s_linear_infinite] motion-reduce:animate-none"
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  />
                  <circle
                    cx={geo.cx}
                    cy={geo.cy}
                    r={geo.r + 30}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={1}
                    strokeDasharray="1 11"
                    className="animate-[spin_40s_linear_infinite_reverse] motion-reduce:animate-none"
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  />

                  {running && (
                    <g key={cycle}>
                      <LitWire d={geo.inPaths[order.source]} delay={0} duration={IN_S} />
                      {geo.outPaths.map((d, j) => (
                        <LitWire
                          key={d}
                          d={d}
                          delay={OUT_START_S + j * OUT_STAGGER_S}
                          duration={OUT_S}
                        />
                      ))}
                    </g>
                  )}
                </svg>

                {/* Sources */}
                {SOURCES.map((src, i) => (
                  <div
                    key={src.key}
                    className="absolute -translate-y-1/2"
                    style={{ top: geo.srcY[i], left: geo.pad, width: geo.srcW }}
                  >
                    <div className="relative flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0f0f26] px-2.5">
                      {running && order.source === i && (
                        <motion.span
                          key={cycle}
                          className="absolute inset-0 rounded-xl border border-violet-400/60 bg-violet-500/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 1, 0] }}
                          transition={{ duration: 1.8, times: [0, 0.1, 0.6, 1] }}
                        />
                      )}
                      {!geo.narrow && <src.icon className="relative h-3.5 w-3.5 flex-shrink-0 text-violet-300" strokeWidth={1.75} />}
                      <span className="relative truncate text-[11px] font-semibold text-white/75">
                        {src.label}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Core */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: geo.cx, top: geo.cy, width: geo.r * 2, height: geo.r * 2 }}
                >
                  {running && (
                    <motion.span
                      key={cycle}
                      className="absolute inset-0 rounded-[1.25rem] border border-violet-300"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: [1, 1, 1.75], opacity: [0, 0.7, 0] }}
                      transition={{ duration: 1.6, times: [0, 0.52, 1], ease: "easeOut" }}
                    />
                  )}
                  <div
                    className="relative flex h-full w-full flex-col items-center justify-center rounded-[1.25rem] border border-violet-300/30"
                    style={{
                      background: "linear-gradient(145deg, #8b5cf6 0%, #6d28d9 55%, #4c1d95 100%)",
                      boxShadow:
                        "0 12px 40px rgba(124,58,237,0.45), inset 0 1px 1px rgba(255,255,255,0.35)",
                    }}
                  >
                    <span className="text-[15px] font-extrabold leading-none tracking-tight text-white sm:text-[17px]">
                      CRM
                    </span>
                    <span className="mt-1 text-[8px] font-bold leading-none tracking-[0.16em] text-white/75 sm:text-[9px]">
                      FINANCE
                    </span>
                  </div>
                </div>

                {/* Outputs */}
                {OUTPUTS.map((out, j) => {
                  const arrive = OUT_START_S + j * OUT_STAGGER_S + OUT_S;
                  const times = [0, arrive / CYCLE_S, (arrive + 0.25) / CYCLE_S, 0.93, 1];
                  return (
                    <div
                      key={out.key}
                      className="absolute -translate-y-1/2"
                      style={{ top: geo.outY[j], left: geo.outEdge, width: geo.outW }}
                    >
                      <div className="relative flex h-11 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#0f0f26] px-2.5">
                        {running ? (
                          <motion.span
                            key={cycle}
                            className="absolute inset-0 rounded-xl border border-emerald-400/40 bg-emerald-400/[0.06]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0, 1, 1, 0] }}
                            transition={{ duration: CYCLE_S, times, ease: "linear" }}
                          />
                        ) : null}
                        {!geo.narrow && <out.icon className="relative h-3.5 w-3.5 flex-shrink-0 text-cyan-300/80" strokeWidth={1.75} />}
                        <span className="relative min-w-0 flex-1">
                          <span className="block truncate text-[11px] font-semibold leading-tight text-white/80">
                            {t(`out.${out.key}.label`)}
                          </span>
                          {!geo.narrow && (
                            <span className="block truncate text-[10px] leading-tight text-white/30">
                              {t(`out.${out.key}.sub`)}
                            </span>
                          )}
                        </span>
                        <span className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-white/10">
                          <motion.span
                            key={running ? cycle : "static"}
                            className="absolute inset-[-1px] flex items-center justify-center rounded-full bg-emerald-400 text-[#07071a]"
                            initial={{ opacity: running ? 0 : 1, scale: running ? 0.4 : 1 }}
                            animate={
                              running
                                ? { opacity: [0, 0, 1, 1, 0], scale: [0.4, 0.4, 1, 1, 0.8] }
                                : { opacity: 1, scale: 1 }
                            }
                            transition={{ duration: CYCLE_S, times, ease: "linear" }}
                          >
                            <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                          </motion.span>
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Packets */}
                {running && (
                  <div key={cycle} className="pointer-events-none absolute inset-0">
                    <Packet d={geo.inPaths[order.source]} delay={0} duration={IN_S} />
                    {geo.outPaths.map((d, j) => (
                      <Packet
                        key={d}
                        d={d}
                        delay={OUT_START_S + j * OUT_STAGGER_S}
                        duration={OUT_S}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Processed orders feed */}
          <ul className="relative h-[120px] overflow-hidden border-t border-white/[0.06]">
            <AnimatePresence initial={false} mode="popLayout">
              {feed.map((index) => {
                const item = orderAt(index);
                return (
                  <motion.li
                    key={index}
                    layout
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-10 items-center gap-3 px-5 text-[11px]"
                  >
                    <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    <span className="font-mono text-white/80">#{item.no}</span>
                    <span className="text-white/40">{SOURCES[item.source].label}</span>
                    <span className="ml-auto hidden truncate text-white/30 sm:block">{t("steps")}</span>
                    <span className="ml-auto w-16 text-right font-semibold tabular-nums text-white/80 sm:ml-0">
                      {formatAmount(item.amount)}
                    </span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          {/* Counters */}
          <dl className="relative grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06]">
            {stats.map((stat) => (
              <div key={stat.key} className="px-5 py-4">
                <dd className="relative h-6 overflow-hidden text-lg font-bold leading-6 tabular-nums text-white">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.span
                      key={stat.value}
                      className="block"
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {stat.value}
                    </motion.span>
                  </AnimatePresence>
                </dd>
                <dt className="mt-0.5 truncate text-[10px] uppercase tracking-[0.12em] text-white/35">
                  {t(`stats.${stat.key}`)}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </div>
  );
}
