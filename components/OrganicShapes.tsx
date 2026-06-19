// Decorative warm blobs that float slowly behind hero / CTA sections. Purely
// presentational and pointer-events:none; respects prefers-reduced-motion via
// the global media query in globals.css.

type Shape = {
  size: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  delay?: number;
  opacity?: number;
};

export function OrganicShapes({ shapes }: { shapes: Shape[] }) {
  return (
    <div className="organic-shapes" aria-hidden="true">
      {shapes.map((s, i) => (
        <div
          key={i}
          className="organic-shape"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            bottom: s.bottom,
            left: s.left,
            right: s.right,
            animationDelay: s.delay ? `${s.delay}s` : undefined,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}
