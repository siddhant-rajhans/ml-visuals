import { LossBowl, VectorRotation, TokenStream } from '../src'

export default function App() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#e6ecff', background: '#0b1020', minHeight: '100vh' }}>
      <header style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>ml-visuals — gallery</h1>
        <p style={{ opacity: 0.7 }}>
          Interactive 3D building blocks for ML teaching. Drag to orbit. <a href="https://github.com/siddhant-rajhans/ml-visuals" style={{ color: '#7aa2ff' }}>Source</a>.
        </p>
      </header>

      <Demo title="LossBowl" desc="A 3D paraboloid + a ball doing SGD. Used in calculus, optimization, gradient descent explanations.">
        <LossBowl />
      </Demo>

      <Demo title="VectorRotation" desc="A 3D arrow rotated continuously — building intuition for matrices as transformations.">
        <VectorRotation />
      </Demo>

      <Demo title="TokenStream" desc="Tokens flowing through stacked transformer layers. Use for attention / transformer intuition videos.">
        <TokenStream />
      </Demo>
    </div>
  )
}

function Demo({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 22, marginBottom: 4 }}>{title}</h2>
      <p style={{ opacity: 0.7, marginBottom: 16 }}>{desc}</p>
      <div style={{ width: '100%', height: 480, borderRadius: 12, overflow: 'hidden', background: '#0e1530' }}>
        {children}
      </div>
    </section>
  )
}
