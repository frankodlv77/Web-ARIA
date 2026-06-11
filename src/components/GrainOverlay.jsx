export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
        opacity: 0.038,
        pointerEvents: 'none',
        zIndex: 9996,
        animation: 'grain 8s steps(10) infinite',
      }}
    />
  )
}
