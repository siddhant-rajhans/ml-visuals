import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export type TokenStreamProps = {
  /** Number of tokens in the sequence. */
  numTokens?: number
  /** Number of transformer layers stacked. */
  numLayers?: number
  /** Animation speed multiplier. */
  speed?: number
  /** Color for the token particles. */
  tokenColor?: string
}

const DEFAULT: Required<TokenStreamProps> = {
  numTokens: 8,
  numLayers: 4,
  speed: 0.7,
  tokenColor: '#7aa2ff',
}

function Tokens({ numTokens, numLayers, speed, tokenColor }: Required<TokenStreamProps>) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const count = numTokens * numLayers

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    for (let layer = 0; layer < numLayers; layer++) {
      for (let i = 0; i < numTokens; i++) {
        const idx = layer * numTokens + i
        const x = i - (numTokens - 1) / 2
        const y = layer * 0.8 + Math.sin(t + i * 0.4 + layer) * 0.05
        const z = Math.cos(t * 0.5 + layer) * 0.1
        dummy.position.set(x, y, z)
        dummy.updateMatrix()
        ref.current.setMatrixAt(idx, dummy.matrix)
      }
    }
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.12, 12, 12]} />
      <meshStandardMaterial color={tokenColor} emissive={tokenColor} emissiveIntensity={0.2} />
    </instancedMesh>
  )
}

function LayerPlanes({ numLayers }: { numLayers: number }) {
  return (
    <>
      {Array.from({ length: numLayers }, (_, i) => (
        <mesh key={i} position={[0, i * 0.8 - 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 1.2]} />
          <meshStandardMaterial color="#1a1f3a" transparent opacity={0.2} />
        </mesh>
      ))}
    </>
  )
}

export function TokenStream(props: TokenStreamProps = {}) {
  const merged = { ...DEFAULT, ...props }
  return (
    <Canvas camera={{ position: [6, 3, 6], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 8, 5]} intensity={1} />
      <LayerPlanes numLayers={merged.numLayers} />
      <Tokens {...merged} />
      <OrbitControls />
    </Canvas>
  )
}
