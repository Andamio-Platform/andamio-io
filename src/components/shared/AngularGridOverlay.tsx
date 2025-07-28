import React from "react";

export default function AngularGridOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 opacity-10">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      <div className="grid h-full grid-cols-16">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="border-r border-white/20"></div>
        ))}
      </div>
      <div className="absolute inset-0">
        <div className="flex h-full flex-col">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="flex-1 border-b border-white/10"></div>
          ))}
        </div>
      </div>
      {/* Additional vertical accent lines */}
      <div className="absolute left-1/4 top-0 h-full w-px bg-white/15"></div>
      <div className="absolute left-1/2 top-0 h-full w-px bg-white/20"></div>
      <div className="absolute left-3/4 top-0 h-full w-px bg-white/15"></div>
    </div>
  );
}