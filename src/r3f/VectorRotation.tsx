import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export type VectorRotationProps = {
  /** Rotation speed (radians per second). */
  speed?: number
  /** Length of the rotating vector. */
  length?: number
  /** Vector color (hex). */
  vectorColor?: string
  /** Show coordinate grid. */
  showGrid?: boolean
}

const DEFAULT: Required<VectorRotationProps> = {
  speed: 0.6,
  length: 2,
  vectorColor: '#ff8a65',
  showGrid: true,
}

function Arrow({ length, color }: { length: number; color: string }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += DEFAULT.speed * delta
  })
  return (
    <group ref={ref}>
      <mesh position={[length / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, length, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[length, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.12, 0.3, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}

export function VectorRotation(props: VectorRotationProps = {}) {
  const merged = { ...DEFAULT, ...props }
  return (
    <Canvas camera={{ position: [3, 2.5, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />
      {merged.showGrid && <gridHelper args={[6, 6, '#444', '#222']} />}
      <axesHelper args={[2.5]} />
      <Arrow length={merged.length} color={merged.vectorColor} />
      <OrbitControls />
    </Canvas>
  )
}
