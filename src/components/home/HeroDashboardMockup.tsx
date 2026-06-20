"use client";

import React, { useRef } from "react";
import { Terminal, Activity, ArrowUpRight, Cpu, Sparkles, Play, Code } from "lucide-react";

export function HeroDashboardMockup() {
  const chartPathRef = useRef<SVGPathElement>(null);
  const chartAreaRef = useRef<SVGPathElement>(null);

  return (
    <div className="hero-dashboard-container relative mx-auto mt-0 max-w-7xl rounded-2xl border border-border/50 bg-surface/30 shadow-elegant glass overflow-hidden">
      {/* Top window controls and tab bar */}
      <div className="flex items-center justify-between border-b border-border/40 bg-surface/80 px-4 py-3 select-none">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/50 px-3 py-1 text-[0.6rem] font-medium text-muted-foreground">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span>turn2grow-growth-engine.ts</span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse ml-1" />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 font-mono">
          <span>UTF-8</span>
          <span className="hidden sm:inline">· TypeScript</span>
        </div>
      </div>

      {/* Grid Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border/40">
        {/* Left Column: Code Editor (3 cols) */}
        <div className="p-5 md:col-span-3 font-mono text-[0.5rem] md:text-[0.7rem] leading-relaxed text-foreground/80 overflow-x-auto min-h-[250px] bg-background/20">
          <div className="flex items-center justify-between mb-4 border-b border-border/20 pb-2">
            <span className="text-muted-foreground/60 text-[10px] uppercase tracking-wider flex items-center gap-1">
              <Code className="h-3 w-3 text-muted-foreground/60" /> Source Editor
            </span>
            <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded flex items-center gap-1">
              <Play className="h-2 w-2 fill-primary" /> Live compilation
            </span>
          </div>

          <div className="space-y-1 select-none">
            {/* Line-by-line formatted mock code */}
            <div className="code-line flex gap-4">
              <span className="w-5 text-right text-muted-foreground/30 select-none">1</span>
              <span><span className="text-primary font-semibold">import</span> &#123; <span className="text-blue-400">Agent</span>, <span className="text-blue-400">SaaSPlatform</span>, <span className="text-blue-400">CloudEngine</span> &#125; <span className="text-primary">from</span> <span className="text-emerald-400">&quot;@turn2grow/core&quot;</span>;</span>
            </div>
            <div className="code-line flex gap-4">
              <span className="w-5 text-right text-muted-foreground/30 select-none">2</span>
              <span></span>
            </div>
            <div className="code-line flex gap-4">
              <span className="w-5 text-right text-muted-foreground/30 select-none">3</span>
              <span><span className="text-zinc-500">{"// Initialize client scaling workflow"}</span></span>
            </div>
            <div className="code-line flex gap-4">
              <span className="w-5 text-right text-muted-foreground/30 select-none">4</span>
              <span><span className="text-primary font-semibold">const</span> <span className="text-amber-400">growthWorkflow</span> = <span className="text-primary font-semibold">new</span> <span className="text-blue-400">Agent</span>(&#123;</span>
            </div>
            <div className="code-line flex gap-4 font-semibold">
              <span className="w-5 text-right text-muted-foreground/30 select-none">5</span>
              <span className="pl-4">id: <span className="text-emerald-400">&quot;turn2grow-usa-engine&quot;</span>,</span>
            </div>
            <div className="code-line flex gap-4">
              <span className="w-5 text-right text-muted-foreground/30 select-none">6</span>
              <span className="pl-4">objective: <span className="text-emerald-400">&quot;scale_operations_nationwide&quot;</span>,</span>
            </div>
            <div className="code-line flex gap-4">
              <span className="w-5 text-right text-muted-foreground/30 select-none">7</span>
              <span className="pl-4">modules: [<span className="text-blue-400">SaaSPlatform</span>, <span className="text-blue-400">CloudEngine</span>],</span>
            </div>
            <div className="code-line flex gap-4">
              <span className="w-5 text-right text-muted-foreground/30 select-none">8</span>
              <span className="pl-4">optimization: <span className="text-purple-400">true</span>,</span>
            </div>
            <div className="code-line flex gap-4">
              <span className="w-5 text-right text-muted-foreground/30 select-none">9</span>
              <span>&#125;);</span>
            </div>
            <div className="code-line flex gap-4">
              <span className="w-5 text-right text-muted-foreground/30 select-none">10</span>
              <span></span>
            </div>
            <div className="code-line flex gap-4">
              <span className="w-5 text-right text-muted-foreground/30 select-none">11</span>
              <span><span className="text-zinc-500">{"// Run autonomous platform orchestration"}</span></span>
            </div>
            <div className="code-line flex gap-4">
              <span className="w-5 text-right text-muted-foreground/30 select-none">12</span>
              <span><span className="text-primary font-semibold">async function</span> <span className="text-amber-400">executeScale</span>() &#123;</span>
            </div>
            <div className="code-line flex gap-4">
              <span className="w-5 text-right text-muted-foreground/30 select-none">13</span>
              <span className="pl-4"><span className="text-primary font-semibold">const</span> result = <span className="text-primary font-semibold">await</span> <span className="text-amber-400 font-semibold">growthWorkflow</span>.<span className="text-blue-400">optimize</span>();</span>
            </div>
            <div className="code-line flex gap-4">
              <span className="w-5 text-right text-muted-foreground/30 select-none">14</span>
              <span className="pl-4"><span className="text-amber-400">console</span>.<span className="text-blue-400">log</span>(<span className="text-emerald-400">`System optimized in {<br/>} $&#123;result.time&#125;ms`</span>);</span>
            </div>
            <div className="code-line flex gap-4 text-emerald-400 font-semibold">
              <span className="w-5 text-right text-muted-foreground/30 select-none">15</span>
              <span className="pl-4">{"// >> Uptime: 99.95% | SOC 2 Compliant"}</span>
            </div>
            <div className="code-line flex gap-4">
              <span className="w-5 text-right text-muted-foreground/30 select-none">16</span>
              <span>&#125;</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Live Metrics (2 cols) */}
        <div className="below-code p-5 md:col-span-2 flex flex-col justify-between gap-6 bg-surface/10">
          {/* Top Metric: Scaling Graph */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-primary" /> Throughput Scale
              </span>
              <span className="text-[0.55rem] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                +148.5% Growth
              </span>
            </div>

            {/* Glowing SVG Chart */}
            <div className="relative h-28 w-full border border-border/20 rounded-xl bg-background/40 p-2 overflow-hidden">
              <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                <defs>
                  {/* Glowing orange gradient */}
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.17 42)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="oklch(0.72 0.17 42)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="25" x2="300" y2="25" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4" />
                <line x1="0" y1="75" x2="300" y2="75" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4" />

                {/* Area under curve (filled) */}
                <path
                  ref={chartAreaRef}
                  d="M 0 100 L 0 85 Q 40 82 60 70 T 120 72 T 180 50 T 240 35 L 300 12 L 300 100 Z"
                  fill="url(#chartGlow)"
                  className="mockup-chart-area"
                />

                {/* Curved line */}
                <path
                  ref={chartPathRef}
                  d="M 0 85 Q 40 82 60 70 T 120 72 T 180 50 T 240 35 L 300 12"
                  fill="none"
                  stroke="oklch(0.72 0.17 42)"
                  strokeWidth="2.5"
                  className="mockup-chart-line"
                  strokeDasharray="400"
                  strokeDashoffset="400"
                />
              </svg>

              {/* Dot at the peak of the chart */}
              <div className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)] animate-pulse" />
            </div>
          </div>

          {/* Bottom Metrics Details */}
          <div className="grid grid-cols-2 gap-4 border-t border-border/30 pt-4">
            <div className="mockup-metric-card border border-border/20 rounded-lg p-1 bg-background/20 flex flex-col justify-center">
              <span className="text-[10px] uppercase text-muted-foreground tracking-wider font-semibold flex items-center gap-1">
                <Cpu className="h-3 w-3 text-primary" /> Active Nodes
              </span>
              <span className="metric-number text-lg font-bold text-foreground mt-1">48</span>
              <span className="text-[7px] text-muted-foreground">Orchestrated instances</span>
            </div>

            <div className="mockup-metric-card border border-border/20 rounded-lg p-1 bg-background/20 flex flex-col justify-center">
              <span className="text-[10px] uppercase text-muted-foreground tracking-wider font-semibold flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-primary" /> Optimization
              </span>
              <span className="metric-number text-lg font-bold text-foreground mt-1">98.2%</span>
              <span className="text-[7px] text-muted-foreground">Resource efficiency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
