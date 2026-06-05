export type GraphNode = {
  id: string;
  label: string;
  position: [number, number, number];
  kind: 'core' | 'domain' | 'project' | 'service' | 'data' | 'ai';
};

export type GraphEdge = [string, string];

// A portfolio-native architecture map: Yasser at the center, with the systems,
// project domains, and infrastructure that show up across real client work.
export const NODES: GraphNode[] = [
  { id: 'yasser', label: 'Yasser', position: [0, 0.3, 0], kind: 'core' },
  { id: 'api', label: 'API Systems', position: [-2.8, 1.3, 0.4], kind: 'domain' },
  { id: 'saas', label: 'SaaS', position: [0.2, 2.5, -0.8], kind: 'domain' },
  { id: 'ai', label: 'AI Agents', position: [2.8, 1.2, -0.5], kind: 'ai' },
  { id: 'realtime', label: 'Realtime', position: [2.4, -1.5, 0.8], kind: 'domain' },
  { id: 'data', label: 'Data Layer', position: [-2.5, -1.5, -0.7], kind: 'data' },
  { id: 'dashboard', label: 'Dashboards', position: [0, -2.6, 0.2], kind: 'domain' },
  { id: 'ibra', label: 'IbraAgent', position: [3.8, 0, -1.5], kind: 'project' },
  { id: 'azzm', label: 'Azzm PM', position: [-3.8, -0.2, 1.4], kind: 'project' },
  { id: 'bridge', label: 'BridgeAI', position: [1.5, 3.3, 0.8], kind: 'project' },
  { id: 'clinic', label: 'Clinic SaaS', position: [-1.7, -3.2, -0.9], kind: 'project' },
  { id: 'laravel', label: 'Laravel', position: [-1.1, 0.9, 1.7], kind: 'service' },
  { id: 'fastapi', label: 'FastAPI', position: [1.2, 0.9, 1.6], kind: 'service' },
  { id: 'postgres', label: 'PostgreSQL', position: [-1.1, -0.9, -1.7], kind: 'data' },
  { id: 'redis', label: 'Redis', position: [1.2, -0.9, -1.5], kind: 'data' },
  { id: 'rag', label: 'RAG · Vector', position: [3.0, 2.2, -1.9], kind: 'ai' },
];

export const EDGES: GraphEdge[] = [
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
  ['data', 'postgres'],
  ['data', 'redis'],
  ['ai', 'rag'],
  ['ibra', 'ai'],
  ['ibra', 'realtime'],
  ['ibra', 'fastapi'],
  ['azzm', 'laravel'],
  ['azzm', 'dashboard'],
  ['bridge', 'ai'],
  ['bridge', 'rag'],
  ['clinic', 'dashboard'],
  ['clinic', 'laravel'],
];

export const KIND_COLOR: Record<GraphNode['kind'], string> = {
  core: '#fef3c7',
  domain: '#fbbf24',
  project: '#fb923c',
  service: '#f59e0b',
  data: '#38bdf8',
  ai: '#a78bfa',
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
  { method: 'POST', path: '/projects/ibra-agent/message', status: '200 OK · RAG grounded', ok: true, hops: ['yasser', 'ibra', 'fastapi', 'ai', 'rag'] },
  { method: 'GET', path: '/systems/saas-dashboard', status: '200 OK · 1.5k users', ok: true, hops: ['yasser', 'saas', 'dashboard', 'clinic', 'laravel'] },
  { method: 'PUT', path: '/workflows/construction/progress', status: '202 Accepted · queued', ok: true, hops: ['yasser', 'azzm', 'laravel', 'data', 'postgres'] },
  { method: 'POST', path: '/requirements/bridge-ai/generate', status: '200 OK · multi-agent', ok: true, hops: ['yasser', 'bridge', 'ai', 'rag'] },
  { method: 'GET', path: '/api/realtime/cache-hit', status: '200 · 11ms · redis', ok: true, hops: ['yasser', 'api', 'fastapi', 'realtime', 'redis'] },
];

// Short descriptor + headline metric shown when a node is clicked/inspected.
export const NODE_META: Record<string, { role: string; metric: string }> = {
  yasser: { role: 'Systems Builder', metric: 'backend · SaaS · AI workflows' },
  api: { role: 'API Systems', metric: '5,000+ daily requests' },
  saas: { role: 'SaaS Platforms', metric: 'multi-tenant delivery' },
  ai: { role: 'AI Agents', metric: 'LangGraph · RAG · Meta APIs' },
  realtime: { role: 'Realtime Flows', metric: 'WebSockets · Redis pub-sub' },
  data: { role: 'Data Layer', metric: 'PostgreSQL · MySQL · ChromaDB' },
  dashboard: { role: 'Dashboards', metric: 'role-based operational UIs' },
  ibra: { role: 'IbraAgent', metric: 'AI customer-service SaaS' },
  azzm: { role: 'Azzm / DesAzem', metric: 'construction PM workflows' },
  bridge: { role: 'BridgeAI', metric: 'requirements multi-agent platform' },
  clinic: { role: 'Clinic SaaS', metric: '1,500+ daily active users' },
  laravel: { role: 'Laravel Service', metric: 'RBAC · queues · Livewire' },
  fastapi: { role: 'FastAPI Service', metric: 'async Python APIs' },
  postgres: { role: 'PostgreSQL', metric: 'tenant-aware schemas' },
  redis: { role: 'Redis', metric: 'cache · pub-sub · queues' },
  rag: { role: 'RAG · Vector', metric: 'semantic retrieval' },
};
