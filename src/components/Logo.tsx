export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img src="/logo.png" alt="Turn2Grow" className="h-7 w-auto object-contain" />
    </div>
  );
}
