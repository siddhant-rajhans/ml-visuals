import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

export type LossBowlProps = {
  /** Coefficient of the paraboloid z = a*(x^2 + y^2). Bigger = steeper bowl. */
  steepness?: number
  /** SGD learning rate. */
  learningRate?: number
  /** Auto-replay the descent every N seconds. Set to 0 to disable. */
  autoReplaySeconds?: number
  /** Where the ball starts (x, y). The z is computed from the surface. */
  startXY?: [number, number]
  /** Surface color (hex). */
  surfaceColor?: string
  /** Ball color (hex). */
  ballColor?: string
}

const DEFAULT: Required<LossBowlProps> = {
  steepness: 0.4,
  learningRate: 0.15,
  autoReplaySeconds: 6,
  startXY: [1.8, 1.8],
  surfaceColor: '#7aa2ff',
  ballColor: '#ff8a65',
}

function f(x: number, y: number, a: number) {
  return a * (x * x + y * y)
}

function gradF(x: number, y: number, a: number): [number, number] {
  return [2 * a * x, 2 * a * y]
}

function Surface({ steepness, color }: { steepness: number; color: string }) {
  const geometry = useMemo(() => {
    const size = 4
    const segs = 64
    const geo = new THREE.PlaneGeometry(size, size, segs, segs)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      pos.setZ(i, f(x, y, steepness))
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [steepness])

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color={color} wireframe transparent opacity={0.85} />
    </mesh>
  )
}

function Ball(props: Required<LossBowlProps>) {
  const ref = useRef<THREE.Mesh>(null)
  const [tick, setTick] = useState(0)
  const pos = useRef({ x: props.startXY[0], y: props.startXY[1] })
  const lastReplay = useRef(0)

  useFrame((state, delta) => {
    if (!ref.current) return
    // SGD step
    const [gx, gy] = gradF(pos.current.x, pos.current.y, props.steepness)
    pos.current.x -= props.learningRate * gx * delta * 5
    pos.current.y -= props.learningRate * gy * delta * 5
    const z = f(pos.current.x, pos.current.y, props.steepness)
    ref.current.position.set(pos.current.x, z + 0.05, pos.current.y)

    // Replay
    if (props.autoReplaySeconds > 0) {
      lastReplay.current += delta
      if (lastReplay.current > props.autoReplaySeconds) {
        pos.current = { x: props.startXY[0], y: props.startXY[1] }
        lastReplay.current = 0
        setTick(t => t + 1)
      }
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 24, 24]} />
      <meshStandardMaterial color={props.ballColor} />
    </mesh>
  )
}

export function LossBowl(props: LossBowlProps = {}) {
  const merged: Required<LossBowlProps> = { ...DEFAULT, ...props }
  return (
    <Canvas camera={{ position: [4, 3.5, 4], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 8, 5]} intensity={1.2} />
      <Surface steepness={merged.steepness} color={merged.surfaceColor} />
      <Ball {...merged} />
      <OrbitControls enablePan={false} />
    </Canvas>
  )
}
