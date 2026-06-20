"use client";

import React from "react";
import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image 
        src="/logo.png" 
        alt="Turn2Grow" 
        width={150}
        height={24}
        className="h-6 w-auto object-contain hidden md:block" 
      />
      <Image 
        src="/logo-icon.png" 
        alt="Turn2Grow" 
        width={40}
        height={40}
        className="h-10 w-auto object-contain block md:hidden" 
      />
    </div>
  );
}
