'use client';

import { useReducedMotion } from 'framer-motion';

// Static 2D projection of the same architecture graph — no WebGL.
// Used on mobile and when prefers-reduced-motion is set. When motion is
// allowed, an amber "request packet" flows along a representative route.

type N = { id: string; label: string; x: number; y: number; c: string };

const NODES: N[] = [
  { id: 'client', label: 'Client', x: 200, y: 30, c: '#fbbf24' },
  { id: 'gateway', label: 'API Gateway', x: 200, y: 95, c: '#fbbf24' },
  { id: 'auth', label: 'Auth·RBAC', x: 70, y: 160, c: '#f59e0b' },
  { id: 'fastapi', label: 'FastAPI', x: 330, y: 160, c: '#f59e0b' },
  { id: 'laravel', label: 'Laravel', x: 200, y: 175, c: '#f59e0b' },
  { id: 'postgres', label: 'PostgreSQL', x: 70, y: 255, c: '#38bdf8' },
  { id: 'redis', label: 'Redis', x: 200, y: 270, c: '#38bdf8' },
  { id: 'queue', label: 'Queue', x: 330, y: 255, c: '#38bdf8' },
  { id: 'ai', label: 'AI Agent', x: 330, y: 95, c: '#a78bfa' },
  { id: 'rag', label: 'RAG·Vector', x: 360, y: 30, c: '#a78bfa' },
];

const EDGES: [string, string][] = [
  ['client', 'gateway'],
  ['gateway', 'auth'],
  ['gateway', 'fastapi'],
  ['gateway', 'laravel'],
  ['fastapi', 'postgres'],
  ['fastapi', 'redis'],
  ['fastapi', 'ai'],
  ['laravel', 'postgres'],
  ['laravel', 'queue'],
  ['auth', 'postgres'],
  ['redis', 'queue'],
  ['ai', 'rag'],
];

const byId = (id: string) => NODES.find((n) => n.id === id) as N;

// Representative request path: Client → Gateway → FastAPI → PostgreSQL
const ROUTE = ['client', 'gateway', 'fastapi', 'postgres'];
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
      aria-label="System architecture diagram: client to API gateway to services, databases, and AI agents"
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
        {reduce ? 'system architecture map' : 'GET /api/tenants  →  live trace'}
      </text>
    </svg>
  );
}
