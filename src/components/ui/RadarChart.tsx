import { cn } from "@/lib/cn";

export type RadarAxis = {
  id: string;
  label: string;
  /** 0–100 */
  value: number;
};

// Wide enough that the longest side labels keep a margin from the edge —
// verified against the real label widths, not guessed.
const WIDTH = 320;
const HEIGHT = 252;
const CX = WIDTH / 2;
const CY = 116;
const RADIUS = 76;
const LABEL_GAP = 15;
const LINE_HEIGHT = 11;
const RINGS = [25, 50, 75, 100];

/** Starts at 12 o'clock, goes clockwise. */
function angle(index: number, total: number) {
  return (Math.PI * 2 * index) / total - Math.PI / 2;
}

function point(index: number, total: number, value: number, radius = RADIUS) {
  const a = angle(index, total);
  const r = (Math.max(0, Math.min(100, value)) / 100) * radius;
  return [CX + Math.cos(a) * r, CY + Math.sin(a) * r] as const;
}

function polygon(total: number, valueAt: (index: number) => number) {
  return Array.from({ length: total }, (_, i) => {
    const [x, y] = point(i, total, valueAt(i));
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

/** Split a label into at most two balanced lines so long names stay narrow. */
function wrap(label: string) {
  const words = label.split(" ");
  if (words.length < 2) return [label];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

/**
 * Single-series radar. Six axes render as a hexagon.
 *
 * Radar makes exact cross-axis comparison hard, so each axis is direct-labelled
 * with its name and value: the shape carries the gist, the labels carry the
 * numbers. That also discharges the series colour's contrast warning — no value
 * is conveyed by the fill alone.
 */
export function RadarChart({
  axes,
  className,
  caption,
}: {
  axes: RadarAxis[];
  className?: string;
  caption: string;
}) {
  const total = axes.length;
  if (total < 3) return null;

  return (
    <figure className={cn("m-0", className)}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mx-auto block w-full"
        role="img"
        aria-label={`${caption}: ${axes
          .map((a) => `${a.label} ${a.value}%`)
          .join(", ")}`}
      >
        {/* Recessive grid — solid hairlines, one shade off the surface. */}
        {RINGS.map((ring) => (
          <polygon
            key={ring}
            points={polygon(total, () => ring)}
            className="fill-none stroke-line"
            strokeWidth={1}
          />
        ))}

        {axes.map((axis, index) => {
          const [x, y] = point(index, total, 100);
          return (
            <line
              key={axis.id}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              className="stroke-line"
              strokeWidth={1}
            />
          );
        })}

        {/* Series: thin stroke, translucent fill, markers ringed in the surface. */}
        <polygon
          points={polygon(total, (i) => axes[i].value)}
          className="fill-primary/20 stroke-primary-dark"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {axes.map((axis, index) => {
          const [x, y] = point(index, total, axis.value);
          return (
            <circle
              key={axis.id}
              cx={x}
              cy={y}
              r={4}
              className="fill-primary-dark stroke-card"
              strokeWidth={2}
            />
          );
        })}

        {axes.map((axis, index) => {
          const [x, y] = point(index, total, 100, RADIUS + LABEL_GAP);
          const dx = x - CX;
          // Horizontal axes anchor outward; the top and bottom spokes centre.
          const anchor =
            Math.abs(dx) < 1 ? "middle" : dx > 0 ? "start" : "end";
          const lines = wrap(axis.label);
          // Nudge the block up when it sits above centre so it clears the ring.
          const top = y - (y < CY ? lines.length * LINE_HEIGHT : 0);

          return (
            <text
              key={axis.id}
              x={x}
              y={top}
              textAnchor={anchor}
              className="fill-ink-muted text-[10px]"
            >
              {lines.map((line, i) => (
                <tspan key={line + i} x={x} dy={i === 0 ? 0 : LINE_HEIGHT}>
                  {line}
                </tspan>
              ))}
              <tspan
                x={x}
                dy={LINE_HEIGHT}
                className="fill-ink text-[11px] font-semibold"
              >
                {axis.value}%
              </tspan>
            </text>
          );
        })}
      </svg>
    </figure>
  );
}
