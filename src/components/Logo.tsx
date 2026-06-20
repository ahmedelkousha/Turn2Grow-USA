"use client";

import React from "react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="Turn2Grow" 
        className="h-6 w-auto object-contain hidden md:block" 
      />
      <img 
        src="/logo-icon.png" 
        alt="Turn2Grow" 
        className="h-10 w-auto object-contain block md:hidden" 
      />
    </div>
  );
}
