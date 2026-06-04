export type GraphNode = {
  id: string;
  label: string;
  position: [number, number, number];
  kind: 'edge' | 'service' | 'data' | 'ai';
};

export type GraphEdge = [string, string];

// A small architecture map: client → gateway → services → data / ai.
export const NODES: GraphNode[] = [
  { id: 'client', label: 'Client', position: [0, 3.0, 0], kind: 'edge' },
  { id: 'gateway', label: 'API Gateway', position: [0, 1.4, 0.2], kind: 'edge' },
  { id: 'auth', label: 'Auth · RBAC', position: [-2.2, 0.6, -0.6], kind: 'service' },
  { id: 'fastapi', label: 'FastAPI', position: [1.9, 0.4, 0.8], kind: 'service' },
  { id: 'laravel', label: 'Laravel', position: [-1.4, -0.4, 1.4], kind: 'service' },
  { id: 'postgres', label: 'PostgreSQL', position: [-2.4, -1.6, -0.2], kind: 'data' },
  { id: 'redis', label: 'Redis', position: [0.4, -1.5, -1.6], kind: 'data' },
  { id: 'queue', label: 'Queue', position: [2.4, -1.2, -0.6], kind: 'data' },
  { id: 'ai', label: 'AI Agent', position: [2.0, 1.6, -1.2], kind: 'ai' },
  { id: 'rag', label: 'RAG · Vector', position: [3.0, 0.2, -1.8], kind: 'ai' },
];

export const EDGES: GraphEdge[] = [
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

export const KIND_COLOR: Record<GraphNode['kind'], string> = {
  edge: '#fbbf24', // amber
  service: '#f59e0b', // amber-600-ish
  data: '#38bdf8', // sky
  ai: '#a78bfa', // violet for AI
};

// A request trace = an ordered walk of nodes a real request takes through the
// system, plus the HTTP-style readout shown while it's in flight / on response.
export type Route = {
  method: 'GET' | 'POST' | 'PUT';
  path: string;
  status: string; // shown on completion, e.g. '200 OK · 42ms'
  ok: boolean; // true → green response flash, false → amber/red
  hops: string[]; // node ids, in order
};

export const ROUTES: Route[] = [
  { method: 'POST', path: '/auth/login', status: '200 OK · 28ms', ok: true, hops: ['client', 'gateway', 'auth', 'postgres'] },
  { method: 'GET', path: '/api/tenants', status: '200 OK · 42ms', ok: true, hops: ['client', 'gateway', 'fastapi', 'postgres'] },
  { method: 'GET', path: '/api/dashboard', status: '200 · 11ms · cache', ok: true, hops: ['client', 'gateway', 'fastapi', 'redis'] },
  { method: 'POST', path: '/api/agent/query', status: '200 OK · 1.2s', ok: true, hops: ['client', 'gateway', 'fastapi', 'ai', 'rag'] },
  { method: 'POST', path: '/api/jobs/export', status: '202 Accepted', ok: true, hops: ['client', 'gateway', 'laravel', 'queue'] },
];

// Short descriptor + headline metric shown when a node is clicked/inspected.
export const NODE_META: Record<string, { role: string; metric: string }> = {
  client: { role: 'User / Browser', metric: '1,500+ daily active users' },
  gateway: { role: 'API Gateway', metric: 'routes 5,000+ req / day' },
  auth: { role: 'Auth · RBAC', metric: 'JWT · role-based access' },
  fastapi: { role: 'FastAPI service', metric: 'async Python APIs' },
  laravel: { role: 'Laravel service', metric: 'multi-tenant SaaS core' },
  postgres: { role: 'PostgreSQL', metric: 'tenant-isolated data' },
  redis: { role: 'Redis cache', metric: 'sub-15ms cache hits' },
  queue: { role: 'Queue worker', metric: 'async background jobs' },
  ai: { role: 'AI Agent', metric: 'LangGraph multi-agent' },
  rag: { role: 'RAG · Vector', metric: 'semantic retrieval' },
};
