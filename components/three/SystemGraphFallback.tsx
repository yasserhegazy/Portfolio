'use client';

import { useReducedMotion } from 'framer-motion';

// Static 2D projection of the same architecture graph — no WebGL.
// Used on mobile and when prefers-reduced-motion is set. When motion is
// allowed, an amber "request packet" flows along a representative route.

type N = { id: string; label: string; x: number; y: number; c: string };

const NODES: N[] = [
  { id: 'yasser', label: 'Yasser', x: 215, y: 150, c: '#fef3c7' },
  { id: 'api', label: 'API Systems', x: 92, y: 92, c: '#fbbf24' },
  { id: 'saas', label: 'SaaS', x: 215, y: 46, c: '#fbbf24' },
  { id: 'ai', label: 'AI Agents', x: 338, y: 92, c: '#a78bfa' },
  { id: 'realtime', label: 'Realtime', x: 340, y: 214, c: '#fbbf24' },
  { id: 'data', label: 'Data Layer', x: 88, y: 214, c: '#38bdf8' },
  { id: 'dashboard', label: 'Dashboards', x: 215, y: 258, c: '#fbbf24' },
  { id: 'ibra', label: 'IbraAgent', x: 390, y: 150, c: '#fb923c' },
  { id: 'azzm', label: 'Azzm PM', x: 40, y: 150, c: '#fb923c' },
  { id: 'bridge', label: 'BridgeAI', x: 305, y: 36, c: '#fb923c' },
  { id: 'clinic', label: 'Clinic SaaS', x: 124, y: 270, c: '#fb923c' },
  { id: 'fastapi', label: 'FastAPI', x: 285, y: 132, c: '#f59e0b' },
  { id: 'laravel', label: 'Laravel', x: 145, y: 132, c: '#f59e0b' },
  { id: 'rag', label: 'RAG·Vector', x: 382, y: 48, c: '#a78bfa' },
  { id: 'postgres', label: 'PostgreSQL', x: 128, y: 214, c: '#38bdf8' },
  { id: 'redis', label: 'Redis', x: 286, y: 224, c: '#38bdf8' },
];

const EDGES: [string, string][] = [
  ['yasser', 'api'],
  ['yasser', 'saas'],
  ['yasser', 'ai'],
  ['yasser', 'realtime'],
  ['yasser', 'data'],
  ['yasser', 'dashboard'],
  ['yasser', 'ibra'],
  ['yasser', 'azzm'],
  ['yasser', 'bridge'],
  ['yasser', 'clinic'],
  ['api', 'laravel'],
  ['api', 'fastapi'],
  ['ai', 'rag'],
  ['ibra', 'fastapi'],
  ['ibra', 'realtime'],
  ['azzm', 'laravel'],
  ['bridge', 'rag'],
  ['clinic', 'dashboard'],
  ['data', 'postgres'],
  ['realtime', 'redis'],
];

const byId = (id: string) => NODES.find((n) => n.id === id) as N;

// Representative request path: Yasser → IbraAgent → FastAPI → AI → RAG
const ROUTE = ['yasser', 'ibra', 'fastapi', 'ai', 'rag'];
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
      aria-label="Portfolio systems diagram centered on Yasser, connected to SaaS, API systems, AI agents, dashboards, realtime flows, data, and featured projects"
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
        {reduce ? 'portfolio systems map' : 'POST /projects/ibra-agent/message  ->  live trace'}
      </text>
    </svg>
  );
}
