import React from 'react';
import Svg, { Line, Path, Circle, Rect, Polyline, G, Defs, Stop } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

// --- Electrical ---
export const ElectricalSwitch = ({ size = 24, color = '#000', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <Circle cx="12" cy="12" r="3" />
    <Line x1="12" y1="8" x2="12" y2="12" />
  </Svg>
);

export const CeilingFan = ({ size = 24, color = '#000', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="3" />
    <Path d="M12 9v-6" />
    <Path d="M9 12h-6" />
    <Path d="M15 12h6" />
    <Path d="M12 15v6" />
  </Svg>
);

export const LEDBulb = ({ size = 24, color = '#000', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 18h6" />
    <Path d="M10 22h4" />
    <Path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A6 6 0 1 0 7.5 11.5c.76.76 1.23 1.52 1.41 2.5h6.18z" />
  </Svg>
);

// --- Plumbing ---
export const WaterTap = ({ size = 24, color = '#000', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 4v4" />
    <Path d="M8 8h8" />
    <Path d="M16 8v4a4 4 0 0 1-4 4h-4" />
    <Circle cx="8" cy="18" r="1" />
  </Svg>
);

export const Shower = ({ size = 24, color = '#000', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 4v4" />
    <Path d="M8 8h8" />
    <Path d="M10 12v2" />
    <Path d="M14 12v2" />
    <Path d="M12 14v2" />
  </Svg>
);

// --- Home Appliance ---
export const ACIndoorUnit = ({ size = 24, color = '#000', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="2" y="6" width="20" height="10" rx="2" ry="2" />
    <Path d="M6 10h12" />
    <Path d="M8 16v2" />
    <Path d="M12 16v3" />
    <Path d="M16 16v2" />
  </Svg>
);

export const Refrigerator = ({ size = 24, color = '#000', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <Path d="M5 10h14" />
    <Path d="M9 14v4" />
  </Svg>
);

export const Microwave = ({ size = 24, color = '#000', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
    <Rect x="6" y="9" width="8" height="6" rx="1" ry="1" />
    <Path d="M18 9v.01" />
    <Path d="M18 12v.01" />
    <Path d="M18 15v.01" />
  </Svg>
);

export const WashingMachine = ({ size = 24, color = '#000', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <Circle cx="12" cy="13" r="5" />
    <Path d="M12 13h.01" />
    <Path d="M8 6h.01" />
    <Path d="M10 6h.01" />
  </Svg>
);

// --- Cleaning ---
export const VacuumCleaner = ({ size = 24, color = '#000', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9Z" />
    <Path d="M12 12v10" />
    <Path d="M8 22h8" />
  </Svg>
);

// --- Salon ---
export const HairClipper = ({ size = 24, color = '#000', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="8" y="10" width="8" height="12" rx="2" ry="2" />
    <Path d="M8 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
    <Path d="M10 2v2" />
    <Path d="M14 2v2" />
  </Svg>
);

export const Mirror = ({ size = 24, color = '#000', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="6" y="3" width="12" height="18" rx="6" ry="6" />
    <Path d="M10 8l4-4" />
  </Svg>
);

// Generic Fallback wrapper
export const getCustomServiceIcon = (name: string, props: IconProps) => {
  switch (name) {
    case 'electrical-switch': return <ElectricalSwitch {...props} />;
    case 'ceiling-fan': return <CeilingFan {...props} />;
    case 'led-bulb': return <LEDBulb {...props} />;
    case 'water-tap': return <WaterTap {...props} />;
    case 'shower': return <Shower {...props} />;
    case 'ac-indoor-unit': return <ACIndoorUnit {...props} />;
    case 'refrigerator': return <Refrigerator {...props} />;
    case 'microwave': return <Microwave {...props} />;
    case 'washing-machine': return <WashingMachine {...props} />;
    case 'vacuum-cleaner': return <VacuumCleaner {...props} />;
    case 'hair-clipper': return <HairClipper {...props} />;
    case 'mirror': return <Mirror {...props} />;
    default: return null;
  }
};
