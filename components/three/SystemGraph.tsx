'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Line, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import {
  NODES,
  EDGES,
  ROUTES,
  NODE_META,
  KIND_COLOR,
  type GraphNode,
} from './graph-data';

const nodeById = (id: string) => NODES.find((n) => n.id === id) as GraphNode;
const vecOf = (id: string) => new THREE.Vector3(...nodeById(id).position);
const setSmartCursor = (label: string | null) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('smart-cursor-label', { detail: label }));
};

// Shared, render-free channel: trace controller stamps a node's id with the
// elapsed time it was "hit"; nodes read it each frame and flare, no re-render.
type Activations = Map<string, number>;

export type TraceInfo = {
  method: string;
  path: string;
  status: string;
  ok: boolean;
  phase: 'inflight' | 'response';
};

function Node({
  node,
  activations,
  hovered,
  selected,
  dimmed,
  onHover,
  onSelect,
}: {
  node: GraphNode;
  activations: Activations;
  hovered: boolean;
  selected: boolean;
  dimmed: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const color = KIND_COLOR[node.kind];
  const meta = NODE_META[node.id];
  const radius =
    node.kind === 'core' ? 0.34 : node.kind === 'project' ? 0.25 : node.kind === 'domain' ? 0.22 : 0.2;

  useFrame((state) => {
    const m = meshRef.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const last = activations.get(node.id) ?? -10;
    const since = t - last;
    const ping = since >= 0 && since < 0.7 ? 1 - since / 0.7 : 0;

    const base = 1 + Math.sin(t * 1.4 + node.position[0]) * 0.05;
    const scaleTarget = selected ? 1.55 : hovered ? 1.28 : base + ping * 0.45;
    m.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), 0.18);

    const mat = m.material as THREE.MeshStandardMaterial;
    const emissive =
      (selected ? 2.6 : hovered ? 2.0 : 0.65 + ping * 2.8) - (dimmed ? 0.4 : 0);
    mat.emissiveIntensity = THREE.MathUtils.lerp(
      mat.emissiveIntensity,
      Math.max(0.12, emissive),
      0.2
    );

    const h = haloRef.current;
    if (h) {
      const hm = h.material as THREE.MeshBasicMaterial;
      const hop =
        0.1 + ping * 0.55 + (selected ? 0.32 : hovered ? 0.2 : 0) - (dimmed ? 0.06 : 0);
      hm.opacity = THREE.MathUtils.lerp(hm.opacity, Math.max(0.04, hop), 0.2);
      const hs = 1 + ping * 0.9 + (selected ? 0.5 : 0);
      h.scale.lerp(new THREE.Vector3(hs, hs, hs), 0.2);
    }
  });

  return (
    <group position={node.position}>
      {/* additive glow halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[radius * 1.95, 18, 18]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
          setSmartCursor('inspect');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onHover(null);
          setSmartCursor('orbit');
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSmartCursor(selected ? 'inspect' : 'selected');
          onSelect(node.id);
        }}
      >
        <icosahedronGeometry args={[radius, node.kind === 'core' ? 2 : 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          roughness={0.28}
          metalness={0.35}
        />
      </mesh>

      {node.kind === 'core' && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.58, 0.008, 8, 96]} />
            <meshBasicMaterial color={color} transparent opacity={0.55} />
          </mesh>
          <mesh rotation={[0.2, Math.PI / 2, 0.2]}>
            <torusGeometry args={[0.76, 0.006, 8, 96]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.24} />
          </mesh>
        </>
      )}

      <Html
        center
        distanceFactor={9}
        position={[0, 0.46, 0]}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            color: selected || hovered ? '#fafaf9' : dimmed ? '#57534e' : '#a8a29e',
            background: 'rgba(12,10,9,0.55)',
            padding: '1px 6px',
            borderRadius: '4px',
            border: `1px solid ${selected || hovered ? color : 'transparent'}`,
            transition: 'color .2s, border-color .2s',
          }}
        >
          {node.label}
        </span>
      </Html>

      {selected && meta && (
        <Html
          center
          distanceFactor={8}
          position={[0, -0.5, 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              width: '150px',
              textAlign: 'center',
              background: 'rgba(12,10,9,0.92)',
              border: `1px solid ${color}`,
              borderRadius: '8px',
              padding: '8px 10px',
              boxShadow: `0 0 18px ${color}55`,
            }}
          >
            <div style={{ color: '#fafaf9', fontSize: '12px', fontWeight: 700 }}>
              {meta.role}
            </div>
            <div style={{ color: '#a8a29e', fontSize: '10px', marginTop: '3px' }}>
              {meta.metric}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function BackgroundParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(150 * 3);

    for (let i = 0; i < 150; i++) {
      const radius = 4.2 + Math.random() * 4.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    const p = pointsRef.current;
    if (!p) return;
    p.rotation.y += delta * 0.025;
    p.rotation.x += delta * 0.008;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#fbbf24"
        size={0.018}
        transparent
        opacity={0.45}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function OrbitRings() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y += delta * 0.045;
    g.rotation.z -= delta * 0.018;
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.35, 0.004, 8, 160]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[1.08, 0.18, 0.5]}>
        <torusGeometry args={[4.45, 0.003, 8, 160]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.11} />
      </mesh>
      <mesh rotation={[0.45, 1.2, 0.1]}>
        <torusGeometry args={[2.45, 0.003, 8, 160]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Edges({ activeHops }: { activeHops: string[] }) {
  const active = useMemo(() => {
    const s = new Set<string>();
    for (let i = 0; i < activeHops.length - 1; i++) {
      s.add(`${activeHops[i]}|${activeHops[i + 1]}`);
      s.add(`${activeHops[i + 1]}|${activeHops[i]}`);
    }
    return s;
  }, [activeHops]);

  return (
    <>
      {EDGES.map(([a, b], i) => {
        const on = active.has(`${a}|${b}`);
        return (
          <Line
            key={i}
            points={[nodeById(a).position, nodeById(b).position]}
            color={on ? '#fbbf24' : '#57534e'}
            lineWidth={on ? 2 : 1}
            transparent
            opacity={on ? 0.95 : 0.28}
          />
        );
      })}
    </>
  );
}

const SPEED = 2.6; // world units / sec
const HOLD = 1.15; // response dwell before next route

function Trace({
  activations,
  routeIndex,
  onAdvance,
  onPhase,
}: {
  activations: Activations;
  routeIndex: number;
  onAdvance: () => void;
  onPhase: (phase: 'inflight' | 'response') => void;
}) {
  const route = ROUTES[routeIndex];
  const pts = useMemo(() => route.hops.map(vecOf), [routeIndex]); // eslint-disable-line react-hooks/exhaustive-deps
  const segLens = useMemo(
    () => pts.slice(1).map((p, i) => p.distanceTo(pts[i])),
    [pts]
  );
  const cum = useMemo(() => {
    const c = [0];
    segLens.forEach((l, i) => c.push(c[i] + l));
    return c;
  }, [segLens]);
  const total = cum[cum.length - 1];

  const headRef = useRef<THREE.Group>(null);
  const startRef = useRef<number | null>(null);
  const pingedRef = useRef(0);
  const phaseRef = useRef<'inflight' | 'response'>('inflight');
  const advancedRef = useRef(false);

  useFrame((state) => {
    const head = headRef.current;
    if (!head) return;
    const t = state.clock.elapsedTime;

    if (startRef.current == null) {
      startRef.current = t;
      pingedRef.current = 0;
      phaseRef.current = 'inflight';
      advancedRef.current = false;
      activations.set(route.hops[0], t);
      pingedRef.current = 1;
      onPhase('inflight');
    }

    const lt = t - startRef.current;
    const dist = lt * SPEED;

    if (dist < total) {
      let seg = 0;
      while (seg < segLens.length - 1 && dist > cum[seg + 1]) seg++;
      const segT = THREE.MathUtils.clamp((dist - cum[seg]) / segLens[seg], 0, 1);
      head.position.lerpVectors(pts[seg], pts[seg + 1], segT);

      const reached = seg + (segT >= 0.96 ? 1 : 0);
      while (pingedRef.current <= reached && pingedRef.current < route.hops.length) {
        activations.set(route.hops[pingedRef.current], t);
        pingedRef.current++;
      }
    } else {
      head.position.copy(pts[pts.length - 1]);
      while (pingedRef.current < route.hops.length) {
        activations.set(route.hops[pingedRef.current], t);
        pingedRef.current++;
      }
      if (phaseRef.current !== 'response') {
        phaseRef.current = 'response';
        onPhase('response');
      }
      if (lt > total / SPEED + HOLD && !advancedRef.current) {
        advancedRef.current = true;
        startRef.current = null;
        onAdvance();
      }
    }
  });

  const responding = phaseRef.current === 'response';
  const headColor = responding ? (route.ok ? '#34d399' : '#f87171') : '#fde68a';

  return (
    <group ref={headRef}>
      <mesh>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshBasicMaterial color={headColor} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial
          color={headColor}
          transparent
          opacity={0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function Scene({ onTrace }: { onTrace: (info: TraceInfo) => void }) {
  const activations = useRef<Activations>(new Map()).current;
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [routeIndex, setRouteIndex] = useState(0);
  const groupRef = useRef<THREE.Group>(null);
  const spinRef = useRef(0.16);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const targetSpin = selected ? 0.01 : 0.16;
    spinRef.current = THREE.MathUtils.lerp(spinRef.current, targetSpin, 0.04);
    g.rotation.y += spinRef.current * delta;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.y * 0.16, 0.05);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, pointer.x * 0.05, 0.05);
  });

  const route = ROUTES[routeIndex];

  return (
    <>
      <fog attach="fog" args={['#0c0a09', 7.5, 14]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]} intensity={40} color="#fbbf24" />
      <pointLight position={[-6, -3, -4]} intensity={25} color="#38bdf8" />
      <BackgroundParticles />

      {/* click-away backdrop to deselect */}
      <mesh position={[0, 0, -4]} onClick={() => setSelected(null)}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <group ref={groupRef}>
        <OrbitRings />
        <Edges activeHops={route.hops} />
        <Trace
          activations={activations}
          routeIndex={routeIndex}
          onAdvance={() => setRouteIndex((i) => (i + 1) % ROUTES.length)}
          onPhase={(phase) =>
            onTrace({
              method: route.method,
              path: route.path,
              status: route.status,
              ok: route.ok,
              phase,
            })
          }
        />
        {NODES.map((n) => (
          <Node
            key={n.id}
            node={n}
            activations={activations}
            hovered={hovered === n.id}
            selected={selected === n.id}
            dimmed={selected != null && selected !== n.id}
            onHover={setHovered}
            onSelect={(id) => setSelected((s) => (s === id ? null : id))}
          />
        ))}
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        dampingFactor={0.08}
        enableDamping
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
      />

      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.32}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function SystemGraph({
  onTrace,
}: {
  onTrace: (info: TraceInfo) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.25, 9.6], fov: 44 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
      onPointerEnter={() => setSmartCursor('orbit')}
      onPointerLeave={() => setSmartCursor(null)}
    >
      <Scene onTrace={onTrace} />
    </Canvas>
  );
}
