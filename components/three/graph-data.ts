export type GraphNode = {
  id: string;
  label: string;
  position: [number, number, number];
  kind: 'core' | 'domain' | 'project' | 'service' | 'data' | 'ai';
};

export type GraphEdge = [string, string];

// A portfolio-native architecture map: Yasser at the center, with the AI
// products, systems, and infrastructure that show up across real work.
export const NODES: GraphNode[] = [
  { id: 'yasser', label: 'Yasser', position: [0, 0.3, 0], kind: 'core' },
  { id: 'ai', label: 'AI Systems', position: [2.8, 1.2, -0.5], kind: 'ai' },
  { id: 'agents', label: 'Multi-Agent', position: [3.0, 2.3, -1.8], kind: 'ai' },
  { id: 'rag', label: 'RAG · Vector', position: [3.9, 0.1, -1.4], kind: 'ai' },
  { id: 'api', label: 'Backend APIs', position: [-2.8, 1.3, 0.4], kind: 'domain' },
  { id: 'realtime', label: 'Realtime', position: [2.4, -1.5, 0.8], kind: 'domain' },
  { id: 'reliability', label: 'Self-Healing', position: [0.2, 2.6, -0.8], kind: 'domain' },
  { id: 'data', label: 'Data Layer', position: [-2.5, -1.5, -0.7], kind: 'data' },
  { id: 'wakib', label: 'WAKIB.ai', position: [1.6, 3.3, 0.8], kind: 'project' },
  { id: 'bridge', label: 'BridgeAI', position: [-3.8, -0.2, 1.4], kind: 'project' },
  { id: 'raad', label: 'Raad', position: [-1.7, -3.2, -0.9], kind: 'project' },
  { id: 'azm', label: 'Azm', position: [3.8, -0.2, 1.4], kind: 'project' },
  { id: 'fastapi', label: 'FastAPI', position: [1.2, 0.9, 1.6], kind: 'service' },
  { id: 'langgraph', label: 'LangGraph', position: [-1.1, 0.9, 1.7], kind: 'ai' },
  { id: 'postgres', label: 'PostgreSQL', position: [-1.1, -0.9, -1.7], kind: 'data' },
  { id: 'redis', label: 'Redis', position: [1.2, -0.9, -1.5], kind: 'data' },
];

export const EDGES: GraphEdge[] = [
  ['yasser', 'ai'],
  ['yasser', 'api'],
  ['yasser', 'realtime'],
  ['yasser', 'reliability'],
  ['yasser', 'data'],
  ['yasser', 'wakib'],
  ['yasser', 'bridge'],
  ['yasser', 'raad'],
  ['yasser', 'azm'],
  ['ai', 'agents'],
  ['ai', 'rag'],
  ['ai', 'langgraph'],
  ['api', 'fastapi'],
  ['data', 'postgres'],
  ['data', 'redis'],
  ['reliability', 'redis'],
  ['wakib', 'agents'],
  ['wakib', 'reliability'],
  ['wakib', 'rag'],
  ['bridge', 'langgraph'],
  ['bridge', 'rag'],
  ['raad', 'agents'],
  ['raad', 'realtime'],
  ['azm', 'api'],
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
  { method: 'POST', path: '/wakib/story/generate', status: '200 OK · bilingual · verified', ok: true, hops: ['yasser', 'wakib', 'agents', 'rag'] },
  { method: 'GET', path: '/wakib/publish', status: '200 · ISR · edge-cached', ok: true, hops: ['yasser', 'wakib', 'reliability', 'redis'] },
  { method: 'POST', path: '/raad/reply', status: '200 OK · dialect-aware', ok: true, hops: ['yasser', 'raad', 'agents', 'realtime'] },
  { method: 'POST', path: '/bridge/requirements/draft', status: '200 OK · multi-agent', ok: true, hops: ['yasser', 'bridge', 'langgraph', 'rag'] },
  { method: 'GET', path: '/api/health', status: '200 · self-healing queues', ok: true, hops: ['yasser', 'api', 'fastapi', 'data', 'postgres'] },
];

// Short descriptor + headline metric shown when a node is clicked/inspected.
export const NODE_META: Record<string, { role: string; metric: string }> = {
  yasser: { role: 'Applied AI Engineer', metric: 'AI products · backend · reliability' },
  ai: { role: 'AI Systems', metric: 'RAG · agents · evaluation' },
  agents: { role: 'Multi-Agent', metric: 'LangGraph orchestration' },
  rag: { role: 'RAG · Vector', metric: 'semantic retrieval · ChromaDB' },
  api: { role: 'Backend APIs', metric: 'FastAPI · Laravel · REST' },
  realtime: { role: 'Realtime Flows', metric: 'WebSockets · Redis pub-sub' },
  reliability: { role: 'Self-Healing', metric: 'durable queues · retries · alerts' },
  data: { role: 'Data Layer', metric: 'PostgreSQL · Redis · ChromaDB' },
  wakib: { role: 'WAKIB.ai', metric: '1,000+ daily users · bilingual' },
  bridge: { role: 'BridgeAI', metric: 'requirements multi-agent platform' },
  raad: { role: 'Raad', metric: 'Arabic AI customer service' },
  azm: { role: 'Azm Alinjaz', metric: 'construction management SaaS' },
  fastapi: { role: 'FastAPI Service', metric: 'async Python APIs' },
  langgraph: { role: 'LangGraph', metric: 'agent graphs · tool routing' },
  postgres: { role: 'PostgreSQL', metric: 'tenant-aware schemas' },
  redis: { role: 'Redis', metric: 'cache · pub-sub · queues' },
};
