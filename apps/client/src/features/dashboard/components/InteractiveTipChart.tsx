import React, { useState, useMemo, useRef } from 'react';
import { formatNaira } from '@tiply-ng/shared';
import { TrendingUp, BarChart2, Activity, Calendar } from 'lucide-react';

export type ChartTimeframe = '7d' | '30d' | '90d' | 'all';
export type ChartViewType = 'curve' | 'bars';

interface DataPoint {
  date: string;
  fullDate: string;
  amount: number;
  tips: number;
}

const datasets: Record<ChartTimeframe, DataPoint[]> = {
  '7d': [
    { date: 'Mon', fullDate: 'Mon, Sep 15', amount: 12500, tips: 4 },
    { date: 'Tue', fullDate: 'Tue, Sep 16', amount: 18000, tips: 6 },
    { date: 'Wed', fullDate: 'Wed, Sep 17', amount: 32500, tips: 11 },
    { date: 'Thu', fullDate: 'Thu, Sep 18', amount: 8000, tips: 3 },
    { date: 'Fri', fullDate: 'Fri, Sep 19', amount: 24000, tips: 8 },
    { date: 'Sat', fullDate: 'Sat, Sep 20', amount: 38500, tips: 14 },
    { date: 'Sun', fullDate: 'Sun, Sep 21', amount: 29000, tips: 10 },
  ],
  '30d': [
    { date: 'Aug 24', fullDate: 'Aug 24', amount: 14000, tips: 5 },
    { date: 'Aug 26', fullDate: 'Aug 26', amount: 21000, tips: 7 },
    { date: 'Aug 28', fullDate: 'Aug 28', amount: 16500, tips: 6 },
    { date: 'Aug 30', fullDate: 'Aug 30', amount: 31000, tips: 9 },
    { date: 'Sep 02', fullDate: 'Sep 02', amount: 28500, tips: 8 },
    { date: 'Sep 05', fullDate: 'Sep 05', amount: 19000, tips: 6 },
    { date: 'Sep 08', fullDate: 'Sep 08', amount: 42000, tips: 15 },
    { date: 'Sep 11', fullDate: 'Sep 11', amount: 26000, tips: 8 },
    { date: 'Sep 14', fullDate: 'Sep 14', amount: 33500, tips: 11 },
    { date: 'Sep 16', fullDate: 'Sep 16', amount: 22000, tips: 7 },
    { date: 'Sep 18', fullDate: 'Sep 18', amount: 18500, tips: 6 },
    { date: 'Sep 21', fullDate: 'Sep 21', amount: 49000, tips: 16 },
  ],
  '90d': [
    { date: 'Jul W1', fullDate: 'Jul 1 - 7', amount: 62000, tips: 21 },
    { date: 'Jul W2', fullDate: 'Jul 8 - 14', amount: 78500, tips: 26 },
    { date: 'Jul W3', fullDate: 'Jul 15 - 21', amount: 54000, tips: 19 },
    { date: 'Jul W4', fullDate: 'Jul 22 - 28', amount: 89000, tips: 31 },
    { date: 'Aug W1', fullDate: 'Jul 29 - Aug 4', amount: 95000, tips: 34 },
    { date: 'Aug W2', fullDate: 'Aug 5 - 11', amount: 71000, tips: 24 },
    { date: 'Aug W3', fullDate: 'Aug 12 - 18', amount: 84500, tips: 29 },
    { date: 'Aug W4', fullDate: 'Aug 19 - 25', amount: 112000, tips: 38 },
    { date: 'Sep W1', fullDate: 'Aug 26 - Sep 1', amount: 98000, tips: 33 },
    { date: 'Sep W2', fullDate: 'Sep 2 - 8', amount: 125000, tips: 42 },
    { date: 'Sep W3', fullDate: 'Sep 9 - 15', amount: 104000, tips: 36 },
    { date: 'Sep W4', fullDate: 'Sep 16 - 22', amount: 142000, tips: 48 },
  ],
  all: [
    { date: 'May', fullDate: 'May 2026', amount: 165000, tips: 58 },
    { date: 'Jun', fullDate: 'Jun 2026', amount: 284000, tips: 96 },
    { date: 'Jul', fullDate: 'Jul 2026', amount: 345000, tips: 118 },
    { date: 'Aug', fullDate: 'Aug 2026', amount: 482000, tips: 154 },
    { date: 'Sep', fullDate: 'Sep 2026', amount: 520000, tips: 172 },
  ],
};

// Smooth cubic bezier spline calculation
function getSplinePath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;

    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return path;
}

export const InteractiveTipChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>('7d');
  const [viewType, setViewType] = useState<ChartViewType>('curve');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const data = datasets[timeframe];

  // Aggregated totals
  const totalAmount = useMemo(() => data.reduce((acc, d) => acc + d.amount, 0), [data]);
  const totalTips = useMemo(() => data.reduce((acc, d) => acc + d.tips, 0), [data]);
  const averageAmount = useMemo(() => Math.round(totalAmount / data.length), [totalAmount, data.length]);

  // Max value with nice padding for the Y axis
  const maxVal = useMemo(() => {
    const max = Math.max(...data.map((d) => d.amount));
    return Math.ceil((max * 1.15) / 1000) * 1000;
  }, [data]);

  // SVG dimensions
  const width = 800;
  const height = 240;
  const padLeft = 10;
  const padRight = 10;
  const padTop = 20;
  const padBottom = 30;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  // Compute point coordinates
  const points = useMemo(() => {
    return data.map((d, i) => {
      const x = padLeft + (i / (data.length - 1)) * chartW;
      const y = padTop + chartH - (d.amount / maxVal) * chartH;
      return { x, y, data: d, index: i };
    });
  }, [data, maxVal, chartW, chartH]);

  // Paths
  const linePath = useMemo(() => getSplinePath(points), [points]);
  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const first = points[0];
    const last = points[points.length - 1];
    const baseline = padTop + chartH;
    return `${linePath} L ${last.x} ${baseline} L ${first.x} ${baseline} Z`;
  }, [linePath, points, padTop, chartH]);

  // Peak index
  const peakIdx = useMemo(() => {
    let max = -1;
    let idx = 0;
    data.forEach((d, i) => {
      if (d.amount > max) {
        max = d.amount;
        idx = i;
      }
    });
    return idx;
  }, [data]);

  // Currently focused point
  const activeIdx = hoveredIdx !== null ? hoveredIdx : points.length - 1;
  const activePoint = points[activeIdx];

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    const rawIdx = ratio * (points.length - 1);
    const closestIdx = Math.round(rawIdx);
    setHoveredIdx(closestIdx);
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-6 shadow-2xs space-y-5 select-none">
      {/* Chart Header with Interactive Selected State */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-zinc-950">Tip Activity</h3>
          </div>
          <p className="text-xs text-zinc-500">
            Real-time supporter volume and tip frequencies over time
          </p>
        </div>

        {/* Controls: Timeframe & View Mode */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* View toggle (Curve vs Bars) */}
          <div className="flex items-center p-0.5 bg-stone-100 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setViewType('curve')}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewType === 'curve'
                  ? 'bg-white text-zinc-950 shadow-2xs font-semibold'
                  : 'text-zinc-400 hover:text-zinc-700'
              }`}
              title="Area Spline Curve"
            >
              <Activity className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewType('bars')}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewType === 'bars'
                  ? 'bg-white text-zinc-950 shadow-2xs font-semibold'
                  : 'text-zinc-400 hover:text-zinc-700'
              }`}
              title="Bar Chart"
            >
              <BarChart2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl text-xs font-semibold">
            {(['7d', '30d', '90d', 'all'] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => {
                  setTimeframe(tf);
                  setHoveredIdx(null);
                }}
                className={`px-2.5 sm:px-3 py-1 rounded-lg transition-all cursor-pointer uppercase text-[11px] ${
                  timeframe === tf
                    ? 'bg-white text-zinc-950 shadow-2xs font-bold'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {tf === 'all' ? 'All' : tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Summary Metric Banner */}
      <div className="flex items-baseline justify-between pt-1">
        <div>
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
            {hoveredIdx !== null ? `Date: ${activePoint.data.fullDate}` : `Total Volume (${timeframe.toUpperCase()})`}
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono tracking-tight">
              {formatNaira(hoveredIdx !== null ? activePoint.data.amount : totalAmount)}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/50">
              {hoveredIdx !== null ? `${activePoint.data.tips} tips` : `${totalTips} total tips`}
            </span>
          </div>
        </div>

        {/* Peak indicator */}
        <div className="hidden sm:block text-right">
          <span className="text-[11px] text-zinc-400 font-mono block">Period Peak</span>
          <span className="text-xs font-mono font-bold text-zinc-800">
            {formatNaira(data[peakIdx].amount)} ({data[peakIdx].date})
          </span>
        </div>
      </div>

      {/* Interactive Chart Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden pt-2"
        style={{ touchAction: 'none' }}
      >
        {/* Floating Tooltip Follower */}
        {activePoint && hoveredIdx !== null && (
          <div
            className="absolute top-0 pointer-events-none transition-transform duration-75 z-20"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              transform: 'translate(-50%, -8px)',
            }}
          >
            <div className="bg-zinc-950 text-white rounded-xl px-3 py-1.5 shadow-xl border border-zinc-800 text-xs font-mono whitespace-nowrap space-y-0.5">
              <div className="text-[10px] text-zinc-400 font-sans flex items-center justify-between gap-3">
                <span>{activePoint.data.fullDate}</span>
                <span className="text-emerald-400 font-bold">{activePoint.data.tips} tips</span>
              </div>
              <div className="text-sm font-bold text-white">
                {formatNaira(activePoint.data.amount)}
              </div>
            </div>
          </div>
        )}

        {/* Vector SVG Surface */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-48 sm:h-56 cursor-crosshair overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            {/* Linear Area Gradient */}
            <linearGradient id="tiplyAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.28" />
              <stop offset="60%" stopColor="#10B981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#09090b" />
              <stop offset="100%" stopColor="#27272a" />
            </linearGradient>
            <linearGradient id="barHoverGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines & Scales */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padTop + chartH - ratio * chartH;
            const val = Math.round(ratio * maxVal);
            return (
              <g key={ratio}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#E7E5E4"
                  strokeWidth="1"
                  strokeDasharray={ratio === 0 ? 'none' : '3 4'}
                />
                <text
                  x={width - padRight}
                  y={y - 4}
                  textAnchor="end"
                  fontSize="9"
                  fontFamily="monospace"
                  fill="#A8A29E"
                >
                  {formatNaira(val)}
                </text>
              </g>
            );
          })}

          {/* VIEW TYPE: SPLINE CURVE */}
          {viewType === 'curve' && (
            <>
              {/* Gradient Area Fill */}
              <path d={areaPath} fill="url(#tiplyAreaGradient)" />

              {/* Main Spline Line */}
              <path
                d={linePath}
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Peak Marker Dot */}
              {peakIdx >= 0 && points[peakIdx] && (
                <g>
                  <circle
                    cx={points[peakIdx].x}
                    cy={points[peakIdx].y}
                    r="4"
                    fill="#047857"
                  />
                  <circle
                    cx={points[peakIdx].x}
                    cy={points[peakIdx].y}
                    r="8"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                  />
                </g>
              )}

              {/* Interactive Vertical Scrubber and Cursor Dot */}
              {activePoint && (
                <g>
                  <line
                    x1={activePoint.x}
                    y1={padTop}
                    x2={activePoint.x}
                    y2={padTop + chartH}
                    stroke="#059669"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    strokeOpacity={hoveredIdx !== null ? '0.8' : '0.2'}
                  />
                  <circle
                    cx={activePoint.x}
                    cy={activePoint.y}
                    r="6"
                    fill="#FFFFFF"
                    stroke="#059669"
                    strokeWidth="3"
                  />
                </g>
              )}
            </>
          )}

          {/* VIEW TYPE: MINIMAL BARS */}
          {viewType === 'bars' && (
            <g>
              {points.map((p, i) => {
                const barWidth = Math.max(12, Math.min(36, chartW / points.length - 8));
                const barH = (p.data.amount / maxVal) * chartH;
                const isHovered = i === activeIdx;
                return (
                  <g key={i}>
                    <rect
                      x={p.x - barWidth / 2}
                      y={padTop + chartH - barH}
                      width={barWidth}
                      height={barH}
                      rx="6"
                      fill={isHovered ? 'url(#barHoverGradient)' : 'url(#barGradient)'}
                      className="transition-all duration-200"
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* X Axis Labels */}
          {points.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={height - 6}
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fontWeight={i === activeIdx ? '700' : '500'}
              fill={i === activeIdx ? '#09090b' : '#78716C'}
            >
              {p.data.date}
            </text>
          ))}
        </svg>
      </div>

      {/* Micro Metrics Row */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-stone-100 text-center text-xs">
        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 space-y-0.5">
          <span className="text-[10px] text-zinc-400 uppercase font-mono block">Daily Average</span>
          <span className="font-bold text-zinc-900 font-mono">{formatNaira(averageAmount)}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 space-y-0.5">
          <span className="text-[10px] text-zinc-400 uppercase font-mono block">Total Supporters</span>
          <span className="font-bold text-zinc-900 font-mono">{totalTips}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 space-y-0.5">
          <span className="text-[10px] text-zinc-400 uppercase font-mono block">Settlement Rail</span>
          <span className="font-bold text-emerald-700 font-mono">Monnify NGN</span>
        </div>
      </div>
    </div>
  );
};
