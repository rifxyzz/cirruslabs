export default function Sparkline({ up = true }) {
  const d = up
    ? "M2 28 C 20 26, 32 22, 48 18 S 78 12, 98 9 S 118 7, 128 5"
    : "M2 8 C 24 10, 40 16, 60 20 S 96 26, 128 30";

  return (
    <svg className="spark" viewBox="0 0 130 36" preserveAspectRatio="none">
      <defs>
        <linearGradient id="kerSpark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00c805" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00c805" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L128 36 L2 36 Z`} fill="url(#kerSpark)" />
      <path
        d={d}
        fill="none"
        stroke="#00c805"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}