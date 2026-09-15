export default function Sparkline({ up = false, points }) {
  const data =
    points ||
    (up
      ? [8, 12, 10, 16, 14, 20, 18, 24, 22, 28]
      : [28, 24, 26, 20, 22, 16, 18, 12, 14, 8]);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 158;
  const h = 64;
  const path = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const color = up ? "#0239FF" : "#FF0044";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="spark" preserveAspectRatio="none">
      <path d={path} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}
