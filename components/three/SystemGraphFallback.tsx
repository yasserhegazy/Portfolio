'use client';

import { useReducedMotion } from 'framer-motion';

// Static 2D projection of the same architecture graph — no WebGL.
// Used on mobile and when prefers-reduced-motion is set. When motion is
// allowed, an amber "request packet" flows along a representative route.

type N = { id: string; label: string; x: number; y: number; c: string };

const NODES: N[] = [
  { id: 'yasser', label: 'Yasser', x: 215, y: 150, c: '#fef3c7' },
  { id: 'reliability', label: 'Self-Healing', x: 150, y: 46, c: '#fbbf24' },
  { id: 'wakib', label: 'WAKIB.ai', x: 300, y: 52, c: '#fb923c' },
  { id: 'api', label: 'Backend APIs', x: 74, y: 96, c: '#fbbf24' },
  { id: 'ai', label: 'AI Systems', x: 352, y: 104, c: '#a78bfa' },
  { id: 'agents', label: 'Multi-Agent', x: 392, y: 52, c: '#a78bfa' },
  { id: 'rag', label: 'RAG·Vector', x: 400, y: 150, c: '#a78bfa' },
  { id: 'bridge', label: 'BridgeAI', x: 38, y: 158, c: '#fb923c' },
  { id: 'azm', label: 'Azm', x: 388, y: 206, c: '#fb923c' },
  { id: 'data', label: 'Data Layer', x: 78, y: 214, c: '#38bdf8' },
  { id: 'realtime', label: 'Realtime', x: 322, y: 224, c: '#fbbf24' },
  { id: 'postgres', label: 'PostgreSQL', x: 128, y: 264, c: '#38bdf8' },
  { id: 'raad', label: 'Raad', x: 215, y: 270, c: '#fb923c' },
  { id: 'redis', label: 'Redis', x: 300, y: 262, c: '#38bdf8' },
];

const EDGES: [string, string][] = [
  ['yasser', 'reliability'],
  ['yasser', 'wakib'],
  ['yasser', 'api'],
  ['yasser', 'ai'],
  ['yasser', 'bridge'],
  ['yasser', 'azm'],
  ['yasser', 'data'],
  ['yasser', 'raad'],
  ['yasser', 'realtime'],
  ['wakib', 'agents'],
  ['wakib', 'reliability'],
  ['wakib', 'rag'],
  ['ai', 'agents'],
  ['ai', 'rag'],
  ['data', 'postgres'],
  ['realtime', 'redis'],
  ['reliability', 'redis'],
  ['raad', 'agents'],
  ['bridge', 'rag'],
];

const byId = (id: string) => NODES.find((n) => n.id === id) as N;

// Representative request path: Yasser → WAKIB → Multi-Agent → RAG
const ROUTE = ['yasser', 'wakib', 'agents', 'rag'];
const ROUTE_PATH = ROUTE.map((id, i) => {
  const n = byId(id);
  return `${i === 0 ? 'M' : 'L'}${n.x},${n.y}`;
}).join(' ');

export default function SystemGraphFallback() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 430 300"
      className="w-full h-full max-h-[420px]"
      role="img"
      aria-label="Portfolio systems diagram centered on Yasser, connected to WAKIB.ai, AI systems, multi-agent and RAG pipelines, backend APIs, realtime flows, data, and featured projects"
    >
      {EDGES.map(([a, b], i) => {
        const na = byId(a);
        const nb = byId(b);
        const onRoute =
          ROUTE.includes(a) &&
          ROUTE.includes(b) &&
          Math.abs(ROUTE.indexOf(a) - ROUTE.indexOf(b)) === 1;
        return (
          <line
            key={i}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke={onRoute && !reduce ? '#f59e0b' : 'var(--border-strong)'}
            strokeWidth={onRoute && !reduce ? 1.6 : 1}
            strokeOpacity={onRoute && !reduce ? 0.8 : 1}
          />
        );
      })}

      {NODES.map((n, i) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r={6}
            fill={n.c}
            className={reduce ? undefined : 'animate-pulse-dot'}
            style={reduce ? undefined : { animationDelay: `${i * 0.2}s` }}
          />
          <circle cx={n.x} cy={n.y} r={11} fill="none" stroke={n.c} strokeOpacity={0.25} />
          <text
            x={n.x}
            y={n.y - 12}
            textAnchor="middle"
            fontFamily="var(--font-mono), monospace"
            fontSize="9"
            fill="var(--text-muted)"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Flowing request packet (skipped under reduced-motion) */}
      {!reduce && (
        <>
          <circle r={7} fill="#fde68a" opacity={0.35}>
            <animateMotion dur="2.8s" repeatCount="indefinite" path={ROUTE_PATH} />
          </circle>
          <circle r={3.5} fill="#fde68a">
            <animateMotion dur="2.8s" repeatCount="indefinite" path={ROUTE_PATH} />
          </circle>
          <circle r={3.5} fill="#34d399">
            <animateMotion
              dur="2.8s"
              begin="1.4s"
              repeatCount="indefinite"
              path={ROUTE_PATH}
            />
          </circle>
        </>
      )}

      <text
        x={215}
        y={295}
        textAnchor="middle"
        fontFamily="var(--font-mono), monospace"
        fontSize="9"
        fill="var(--text-faint)"
      >
        {reduce ? 'portfolio systems map' : 'POST /wakib/story/generate  ->  live trace'}
      </text>
    </svg>
  );
}
