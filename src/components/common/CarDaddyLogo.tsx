import React from 'react';

interface CarDaddyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  lightModeForce?: boolean;
}

export const CarDaddyLogo: React.FC<CarDaddyLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false,
  lightModeForce = false,
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  return (
    <div className={`inline-flex items-center gap-2 select-none font-bold tracking-tight ${className}`}>
      {/* Modern Automotive Tachometer / Shield Badge */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700/60 shadow-sm p-1.5 ${iconSizes[size]}`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          {/* Gauge arc */}
          <path
            d="M5 16A8 8 0 1 1 19 16"
            stroke="#76bc21"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Speed needle pointing up-right */}
          <path
            d="M12 14L15.5 8"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Central hub */}
          <circle cx="12" cy="14" r="2" fill="#76bc21" />
          {/* Accent pulse tick */}
          <circle cx="17.5" cy="10.5" r="1.2" fill="#38bdf8" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className={`font-black tracking-tight leading-none ${sizeClasses[size]}`}>
          <span className={lightModeForce ? 'text-neutral-900' : 'text-white'}>Card</span>
          <span className="text-[#76bc21]">addy</span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-semibold mt-0.5">
            Digital Bill Book & Auto Tech
          </span>
        )}
      </div>
    </div>
  );
};
