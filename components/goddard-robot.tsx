import { RoundedBox } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type Point = [number, number, number];
const steel = "#617987";
const gold = "#dca22c";

class CoilCurve extends THREE.Curve<THREE.Vector3> {
  constructor(private height: number, private radius: number, private turns: number) { super(); }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2 * this.turns;
    return target.set(Math.cos(angle) * this.radius, (t - 0.5) * this.height, Math.sin(angle) * this.radius);
  }
}

function Spring({ height, radius, turns = 3.5 }: { height: number; radius: number; turns?: number }) {
  const curve = useMemo(() => new CoilCurve(height, radius, turns), [height, radius, turns]);
  return <mesh castShadow><tubeGeometry args={[curve, 64, 0.043, 7, false]} /><meshStandardMaterial color="#372448" metalness={0.72} roughness={0.31} /></mesh>;
}

/** Repeated rivets and eye perforations share a draw call per material. */
function Studs({ points, radius = 0.018, color = "#a6b4bb" }: { points: Point[]; radius?: number; color?: string }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const matrix = new THREE.Matrix4();
    points.forEach((point, index) => mesh.current!.setMatrixAt(index, matrix.makeTranslation(...point)));
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.computeBoundingSphere();
  }, [points]);
  return <instancedMesh ref={mesh} args={[undefined, undefined, points.length]}><sphereGeometry args={[radius, 7, 5]} /><meshStandardMaterial color={color} metalness={0.7} roughness={0.4} /></instancedMesh>;
}

function Collar({ y, radius = 0.19 }: { y: number; radius?: number }) {
  return <mesh position={[0, y, 0]}><cylinderGeometry args={[radius, radius, 0.065, 20]} /><meshStandardMaterial color={gold} metalness={0.78} roughness={0.32} /></mesh>;
}

function RobotEye({ x }: { x: number }) {
  const dots = useMemo(() => {
    const points: Point[] = [];
    for (let row = -3; row <= 3; row++) for (let col = -3; col <= 3; col++) {
      const px = col * 0.042 + (row % 2 ? 0.021 : 0);
      const py = row * 0.038;
      if (px * px + py * py < 0.018) points.push([px, py, 0.031]);
    }
    return points;
  }, []);
  return <group position={[x, 0.48, 0.75]} rotation={[0, x * 0.3, 0]}>
    <mesh><torusGeometry args={[0.205, 0.036, 8, 28]} /><meshStandardMaterial color={gold} metalness={0.8} roughness={0.3} /></mesh>
    <mesh position={[0, 0, 0.012]}><torusGeometry args={[0.176, 0.021, 7, 28]} /><meshStandardMaterial color="#a92f28" metalness={0.55} roughness={0.36} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.163, 0.163, 0.035, 28]} /><meshStandardMaterial color="#202c31" metalness={0.35} roughness={0.65} /></mesh>
    <Studs points={dots} radius={0.016} color="#e1dfc6" />
  </group>;
}

function FoldedEar({ side }: { side: number }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(side * 0.32, 0.39);
    s.quadraticCurveTo(side * 0.48, 0.75, side * 0.63, 1.1);
    s.lineTo(side * 0.44, 1.16);
    s.lineTo(side * 0.43, 1.28);
    s.quadraticCurveTo(side * 0.65, 1.29, side * 0.82, 1.18);
    s.quadraticCurveTo(side * 0.85, 1.06, side * 0.72, 0.81);
    s.lineTo(side * 0.49, 0.35);
    s.closePath();
    return s;
  }, [side]);
  return <mesh position={[0, 0, -0.12]} rotation={[0, side * 0.18, 0]} castShadow><extrudeGeometry args={[shape, { depth: 0.055, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2, steps: 1 }]} /><meshStandardMaterial color="#73828e" metalness={0.83} roughness={0.42} side={THREE.DoubleSide} /></mesh>;
}

function Tongue() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.15, 0); s.lineTo(0.15, 0);
    s.bezierCurveTo(0.17, -0.22, 0.16, -0.65, 0, -0.7);
    s.bezierCurveTo(-0.15, -0.69, -0.17, -0.22, -0.15, 0);
    return s;
  }, []);
  return <group position={[0, -0.34, 0.88]} rotation={[-0.12, 0, -0.07]}>
    <mesh castShadow><extrudeGeometry args={[shape, { depth: 0.025, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.012, bevelSegments: 2, steps: 1 }]} /><meshStandardMaterial color="#9d365d" roughness={0.65} metalness={0.08} side={THREE.DoubleSide} /></mesh>
    <mesh position={[0, -0.21, 0.043]}><boxGeometry args={[0.009, 0.36, 0.008]} /><meshStandardMaterial color="#702744" roughness={0.8} /></mesh>
  </group>;
}

function SnoutPlate() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.43, 0.02);
    s.quadraticCurveTo(-0.44, 0.3, -0.08, 0.31);
    s.quadraticCurveTo(0.4, 0.32, 0.43, 0.04);
    [[0.4, -0.19], [0.31, -0.15], [0.24, -0.25], [0.16, -0.2], [0.08, -0.3], [0, -0.24], [-0.1, -0.28], [-0.2, -0.19], [-0.3, -0.23], [-0.4, -0.14]].forEach(([x,y]) => s.lineTo(x,y));
    s.closePath();
    return s;
  }, []);
  return <mesh position={[0, -0.05, 0.79]} castShadow><extrudeGeometry args={[shape, { depth: 0.035, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.018, bevelSegments: 2, steps: 1 }]} /><meshStandardMaterial color="#c9952a" metalness={0.75} roughness={0.44} /></mesh>;
}

function RobotHead() {
  const snoutRivets = useMemo(() => Array.from({ length: 16 }, (_, i): Point => {
    const angle = i / 16 * Math.PI * 2;
    return [Math.cos(angle) * 0.49, -0.12 + Math.sin(angle) * 0.4, 0.72];
  }), []);
  return <group position={[-0.91, 0.71, 0.04]} rotation={[0.03, -0.14, 0.11]}>
    <FoldedEar side={-1} /><FoldedEar side={1} />
    <mesh position={[0, 0.22, 0]} scale={[1, 1.02, 0.84]} castShadow><sphereGeometry args={[0.59, 28, 20]} /><meshPhysicalMaterial color="#443c91" metalness={0.65} roughness={0.35} clearcoat={0.5} /></mesh>
    <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.582, 0.038, 8, 36]} /><meshStandardMaterial color={gold} metalness={0.8} roughness={0.3} /></mesh>
    <mesh position={[0, 0.22, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[0.58, 0.034, 8, 36]} /><meshStandardMaterial color={gold} metalness={0.8} roughness={0.3} /></mesh>
    <mesh position={[0, -0.11, 0.36]} scale={[1.12, 0.92, 0.72]} castShadow><sphereGeometry args={[0.56, 28, 20]} /><meshStandardMaterial color={steel} metalness={0.78} roughness={0.44} /></mesh>
    <mesh position={[0, -0.13, 0.7]} scale={[1.1, 0.92, 0.24]}><sphereGeometry args={[0.48, 24, 16]} /><meshStandardMaterial color="#252f35" metalness={0.6} roughness={0.55} /></mesh>
    <SnoutPlate />
    {[-0.14, 0.14].map((x) => <mesh key={x} position={[x, 0.035, 0.855]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.056, 0.056, 0.012, 16]} /><meshStandardMaterial color="#252a28" metalness={0.2} roughness={0.8} /></mesh>)}
    <mesh position={[0, -0.13, 0.7]} scale={[1.1, 0.92, 1]}><torusGeometry args={[0.49, 0.055, 8, 36]} /><meshStandardMaterial color={steel} metalness={0.8} roughness={0.4} /></mesh>
    <Studs points={snoutRivets} radius={0.019} />
    <RobotEye x={-0.29} /><RobotEye x={0.29} />
    <Tongue />
    <group position={[0, 0.81, 0]} rotation={[0, 0, -0.16]}>
      <mesh position={[0, 0.16, 0]}><cylinderGeometry args={[0.018, 0.025, 0.36, 8]} /><meshStandardMaterial color={gold} metalness={0.85} roughness={0.3} /></mesh>
      {[0.1, 0.21].map((y) => <mesh key={y} position={[0, y, 0]} rotation={[0.2, 0, -0.4]}><torusGeometry args={[0.075, 0.012, 6, 16]} /><meshStandardMaterial color={gold} metalness={0.8} roughness={0.3} /></mesh>)}
      <mesh position={[0, 0.36, 0]}><sphereGeometry args={[0.04, 12, 8]} /><meshStandardMaterial color={gold} metalness={0.8} roughness={0.3} /></mesh>
    </group>
  </group>;
}

/** Riveted steel, brass fittings, spring limbs, and the reference's playful face. */
export function GoddardRobot() {
  const bodyRivets = useMemo(() => {
    const points: Point[] = [];
    for (const side of [-1, 1]) for (const x of [-0.59, -0.3, -0.14, 0.14, 0.3, 0.59]) for (const y of [-0.23, 0.23]) points.push([x, y, side * 0.405]);
    return points;
  }, []);
  return <group>
    <group rotation={[0, 0, -0.13]}>
      <RoundedBox args={[1.4, 0.72, 0.8]} radius={0.06} smoothness={3} castShadow><meshStandardMaterial color="#344957" metalness={0.75} roughness={0.5} /></RoundedBox>
      {[-1, 1].flatMap((side) => [-0.46, 0, 0.46].flatMap((x) => [-0.17, 0.17].map((y) => <RoundedBox key={`${side}-${x}-${y}`} position={[x, y, side * 0.397]} args={[0.445, 0.325, 0.025]} radius={0.015} smoothness={2}><meshStandardMaterial color={steel} metalness={0.78} roughness={0.46} /></RoundedBox>)))}
      {[-0.46, 0, 0.46].map((x) => <RoundedBox key={x} position={[x, 0.365, 0]} args={[0.445, 0.026, 0.76]} radius={0.01} smoothness={2}><meshStandardMaterial color="#7b909b" metalness={0.8} roughness={0.43} /></RoundedBox>)}
      <Studs points={bodyRivets} />
    </group>
    <group position={[-0.67, 0.39, 0.02]} rotation={[0, 0, -0.65]}><Spring height={0.47} radius={0.16} turns={3} /><Collar y={-0.24} radius={0.22} /><Collar y={0.24} radius={0.22} /></group>
    <RobotHead />
    {([-1, 1] as const).flatMap((xSide) => ([-1, 1] as const).map((zSide) => <group key={`${xSide}-${zSide}`} position={[xSide * 0.46, -0.61, zSide * 0.32]} rotation={[0, 0, xSide * -0.08]}>
      <Spring height={0.34} radius={0.13} /><Collar y={0.2} /><Collar y={-0.2} />
      <mesh position={[0, -0.34, 0.03]} castShadow><sphereGeometry args={[0.22, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color={steel} metalness={0.8} roughness={0.42} /></mesh>
      <mesh position={[0, -0.34, 0.03]}><cylinderGeometry args={[0.22, 0.23, 0.065, 20]} /><meshStandardMaterial color={gold} metalness={0.8} roughness={0.34} /></mesh>
      {[-0.13, 0, 0.13].map((x) => <mesh key={x} position={[x, -0.39, 0.18]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.028, 0.12, 7]} /><meshStandardMaterial color="#9ca9ad" metalness={0.8} roughness={0.4} /></mesh>)}
    </group>))}
    <mesh position={[0.91, 0.18, 0]} rotation={[0, 0, -0.9]} castShadow><coneGeometry args={[0.09, 0.7, 12]} /><meshStandardMaterial color="#443354" metalness={0.75} roughness={0.3} /></mesh>
  </group>;
}
