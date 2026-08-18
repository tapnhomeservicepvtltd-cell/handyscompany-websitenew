// components/icons/SvgIcons.tsx
// Comprehensive collection of crisp vector SVG Icons using react-native-svg for HandysCompany
import React from "react";
import Svg, {
  Circle,
  Path,
  Polygon,
  Rect,
} from "react-native-svg";
import { getCustomServiceIcon } from "./ServiceIcons";

export interface SvgIconProps {
  size?: number;
  color?: string;
  secondaryColor?: string;
}

// 1. OFFERS SVG ICON
export function SvgOffersIcon({ size = 24, color = "#00A651" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.25 12c0-2.4 0-3.6.75-4.35C3.75 6.9 4.95 6.9 7.35 6.9h9.3c2.4 0 3.6 0 4.35.75.75.75.75 1.95.75 4.35 0 2.4 0 3.6-.75 4.35-.75.75-1.95.75-4.35.75h-9.3c-2.4 0-3.6 0-4.35-.75C2.25 15.6 2.25 14.4 2.25 12z"
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M9 10.5l6 3M15 10.5l-6 3"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Circle cx={8.5} cy={9.5} r={1} fill={color} />
      <Circle cx={15.5} cy={14.5} r={1} fill={color} />
    </Svg>
  );
}

// 2. MEMBERSHIP SVG ICON
export function SvgMembershipIcon({ size = 24, color = "#2563EB" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={2.5}
        y={5}
        width={19}
        height={14}
        rx={3}
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={1.8}
      />
      <Path d="M2.5 9.5h19" stroke={color} strokeWidth={1.8} />
      <Path
        d="M6.5 14.5h4M15.5 14.5h2"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// 3. TECHNICIAN SVG ICON
export function SvgTechnicianIcon({ size = 24, color = "#15803D" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3a6 6 0 00-6 6v1.5h12V9a6 6 0 00-6-6z"
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M4 11h16v2.5a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 13.5V11z"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M6 16v3a2 2 0 002 2h8a2 2 0 002-2v-3"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// 4. REFER & EARN SVG ICON
export function SvgReferEarnIcon({ size = 24, color = "#D97706" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={10}
        width={18}
        height={11}
        rx={2}
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M12 10V21M3 15h18"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M12 10C10 7 7 6 7 4a2.5 2.5 0 015 0c0 2 2 3 0 6z"
        fill={color}
        fillOpacity={0.3}
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M12 10C14 7 17 6 17 4a2.5 2.5 0 00-5 0c0 2-2 3 0 6z"
        fill={color}
        fillOpacity={0.3}
        stroke={color}
        strokeWidth={1.5}
      />
    </Svg>
  );
}

// 5. SUPPORT SVG ICON
export function SvgSupportIcon({ size = 24, color = "#6D28D9" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 12a9 9 0 1118 0"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Rect
        x={2.5}
        y={12}
        width={4}
        height={7}
        rx={2}
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={1.8}
      />
      <Rect
        x={17.5}
        y={12}
        width={4}
        height={7}
        rx={2}
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M19.5 19c0 1.5-1.5 2.5-3 2.5h-2"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// 6. ELECTRICAL SVG ICON
export function SvgElectricalIcon({ size = 24, color = "#00A651" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M13 2L4 14h7v8l9-12h-7V2z"
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// 7. PLUMBING SVG ICON
export function SvgPlumbingIcon({ size = 24, color = "#00A651" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.7 3.3a1 1 0 011.4 0l4.6 4.6a1 1 0 010 1.4l-3.2 3.2-6-6 3.2-3.2z"
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M11.5 6.5L3.8 14.2a3 3 0 000 4.2l1.8 1.8a3 3 0 004.2 0l7.7-7.7"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Circle cx={7.5} cy={16.5} r={1.5} fill={color} />
    </Svg>
  );
}

// 8. CARPENTER SVG ICON
export function SvgCarpenterIcon({ size = 24, color = "#00A651" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 4l5 5-3.5 3.5-5-5L15 4z"
        fill={color}
        fillOpacity={0.25}
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M11.5 7.5L3.5 15.5V20.5H8.5L16.5 12.5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// 9. APPLIANCE REPAIR SVG ICON
export function SvgApplianceIcon({ size = 24, color = "#00A651" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={4}
        y={3}
        width={16}
        height={18}
        rx={3}
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={1.8}
      />
      <Circle cx={12} cy={13} r={4} stroke={color} strokeWidth={1.8} />
      <Circle cx={12} cy={13} r={1.5} fill={color} />
      <Circle cx={8} cy={6.5} r={1} fill={color} />
      <Circle cx={12} cy={6.5} r={1} fill={color} />
    </Svg>
  );
}

// 10. CLEANING SVG ICON
export function SvgCleaningIcon({ size = 24, color = "#00A651" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 3L5 17"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M4 18c0-1.1.9-2 2-2h4l4 4v2c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-4z"
        fill={color}
        fillOpacity={0.25}
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M16 6l2-2M13 3l.5 2.5M20 8l-2.5-.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// 11. INSPECTION SVG ICON
export function SvgInspectionIcon({ size = 24, color = "#00A651" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={4}
        y={4}
        width={16}
        height={17}
        rx={2.5}
        fill={color}
        fillOpacity={0.12}
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M9 2h6v4H9V2z"
        fill={color}
        fillOpacity={0.3}
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M8 10h8M8 14h4"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Circle cx={15.5} cy={15.5} r={2.5} stroke={color} strokeWidth={1.5} />
      <Path d="M17.5 17.5L20 20" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

// 12. MAID SVG ICON
export function SvgMaidIcon({ size = 24, color = "#E11D48" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={7} r={3.5} fill={color} fillOpacity={0.25} stroke={color} strokeWidth={1.8} />
      <Path
        d="M5 21v-3a4 4 0 014-4h6a4 4 0 014 4v3"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path d="M9 14l3 4 3-4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

// 13. MEN SALON SVG ICON
export function SvgMenSalonIcon({ size = 24, color = "#2563EB" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={6} cy={6} r={3} stroke={color} strokeWidth={1.8} />
      <Circle cx={6} cy={18} r={3} stroke={color} strokeWidth={1.8} />
      <Path
        d="M8.5 8.5L20 20M8.5 15.5L20 4"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// 14. WOMEN SALON SVG ICON
export function SvgWomenSalonIcon({ size = 24, color = "#D946EF" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21a9 9 0 100-18 9 9 0 000 18z"
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M12 6c-2 2-3 4-3 6a3 3 0 006 0c0-2-1-4-3-6z"
        fill={color}
        fillOpacity={0.4}
        stroke={color}
        strokeWidth={1.5}
      />
    </Svg>
  );
}

// 15. PEST CONTROL SVG ICON
export function SvgPestIcon({ size = 24, color = "#D97706" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3v18M6 8l12 8M18 8L6 16"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Rect
        x={8.5}
        y={7}
        width={7}
        height={10}
        rx={3.5}
        fill={color}
        fillOpacity={0.25}
        stroke={color}
        strokeWidth={1.8}
      />
    </Svg>
  );
}

// 16. PAINTING SVG ICON
export function SvgPaintingIcon({ size = 24, color = "#0284C7" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={4}
        y={3}
        width={14}
        height={7}
        rx={2}
        fill={color}
        fillOpacity={0.25}
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M18 6.5h2a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5H11v8.5a1.5 1.5 0 01-3 0V12.5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// 17. INSTALLATION SVG ICON
export function SvgInstallationIcon({ size = 24, color = "#475569" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={7}
        width={18}
        height={13}
        rx={2.5}
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path d="M12 11v5M9.5 13.5h5" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

// 18. SHOWER / BATHROOM SVG ICON
export function SvgShowerIcon({ size = 24, color = "#0284C7" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 12V6a3 3 0 013-3h7a3 3 0 013 3v2" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M14 8h6l-1 4h-4l-1-4z" fill={color} fillOpacity={0.3} stroke={color} strokeWidth={1.8} />
      <Circle cx={15} cy={16} r={1} fill={color} />
      <Circle cx={17} cy={16} r={1} fill={color} />
      <Circle cx={19} cy={16} r={1} fill={color} />
      <Circle cx={16} cy={19} r={1} fill={color} />
      <Circle cx={18} cy={19} r={1} fill={color} />
    </Svg>
  );
}

// 19. KITCHEN / COUNTERTOP SVG ICON
export function SvgKitchenIcon({ size = 24, color = "#E11D48" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={11} width={18} height={10} rx={2} fill={color} fillOpacity={0.15} stroke={color} strokeWidth={1.8} />
      <Path d="M3 11V6a2 2 0 012-2h14a2 2 0 012 2v5" stroke={color} strokeWidth={1.8} />
      <Circle cx={8} cy={16} r={2} stroke={color} strokeWidth={1.5} />
      <Circle cx={16} cy={16} r={2} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

// 20. SOFA / FURNITURE SVG ICON
export function SvgSofaIcon({ size = 24, color = "#8B5CF6" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={4} y={12} width={16} height={6} rx={2} fill={color} fillOpacity={0.25} stroke={color} strokeWidth={1.8} />
      <Path d="M5 12V7a3 3 0 013-3h8a3 3 0 013 3v5" stroke={color} strokeWidth={1.8} />
      <Path d="M3 12v6M21 12v6M6 18v3M18 18v3" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

// 21. BABY CARE SVG ICON
export function SvgBabyCareIcon({ size = 24, color = "#F43F5E" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={10} r={6} fill={color} fillOpacity={0.2} stroke={color} strokeWidth={1.8} />
      <Circle cx={9.5} cy={9.5} r={1} fill={color} />
      <Circle cx={14.5} cy={9.5} r={1} fill={color} />
      <Path d="M10 12.5a2 2 0 004 0" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M12 4v-2M15 4.5l1.5-1.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

// 22. COOK / CHEF SVG ICON
export function SvgCookIcon({ size = 24, color = "#EA580C" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 13h12v7a1 1 0 01-1 1H7a1 1 0 01-1-1v-7z" fill={color} fillOpacity={0.2} stroke={color} strokeWidth={1.8} />
      <Path d="M6 13c-2 0-3-2-2-4 1-2 3-3 4-3 1-2 4-3 6-1 2-2 5-1 6 1 1 1 2 3 0 4-1 2-2 3-4 3H6z" fill={color} fillOpacity={0.1} stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

// 23. LOCATION PIN SVG ICON
export function SvgLocationPinIcon({ size = 20, color = "#00A651" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21.5c-4.5-5-7.5-8.5-7.5-12a7.5 7.5 0 1115 0c0 3.5-3 7-7.5 12z"
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={9.5} r={2.5} fill={color} />
    </Svg>
  );
}

// 24. SEARCH SVG ICON
export function SvgSearchIcon({ size = 20, color = "#64748B" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={2} />
      <Path
        d="M16 16l4.5 4.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// 25. FILTER SVG ICON
export function SvgFilterIcon({ size = 20, color = "#00A651" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 6h16M7 12h10M10 18h4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle cx={8} cy={6} r={2} fill="#FFF" stroke={color} strokeWidth={1.8} />
      <Circle cx={15} cy={12} r={2} fill="#FFF" stroke={color} strokeWidth={1.8} />
      <Circle cx={11} cy={18} r={2} fill="#FFF" stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

// 26. NOTIFICATION BELL SVG ICON
export function SvgNotificationBellIcon({ size = 22, color = "#0F172A" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3a5 5 0 00-5 5v3.5L5 15v1h14v-1l-2-3.5V8a5 5 0 00-5-5z"
        fill={color}
        fillOpacity={0.12}
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path
        d="M10 19a2 2 0 004 0"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// 27. CROWN SVG ICON
export function SvgCrownIcon({ size = 24, color = "#F59E0B" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 18l2.5-9 4.5 4 4-7 4 7 4.5-4L21 18H3z"
        fill={color}
        fillOpacity={0.25}
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Rect x={3} y={18} width={18} height={2.5} rx={1} fill={color} />
      <Circle cx={3} cy={9} r={1.2} fill={color} />
      <Circle cx={12} cy={5} r={1.2} fill={color} />
      <Circle cx={21} cy={9} r={1.2} fill={color} />
    </Svg>
  );
}

// 28. STAR SVG ICON
export function SvgStarIcon({ size = 12, color = "#F59E0B" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </Svg>
  );
}

// 29. ARROW RIGHT SVG ICON
export function SvgArrowRightIcon({ size = 14, color = "#00A651" }: SvgIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12h14M13 6l6 6-6 6"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// 30-34. TAB BAR SVG ICONS
export function SvgHomeTabIcon({ size = 22, color = "#00A651", focused = false }: SvgIconProps & { focused?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 01-1.5 1.5h-4A1.5 1.5 0 0114 20v-4h-4v4a1.5 1.5 0 01-1.5 1.5h-4A1.5 1.5 0 013 20v-9.5z"
        fill={focused ? color : "none"}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SvgExploreTabIcon({ size = 22, color = "#64748B", focused = false }: SvgIconProps & { focused?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} fill={focused ? color : "none"} fillOpacity={0.15} />
      <Polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill={color} />
    </Svg>
  );
}

export function SvgBookingsTabIcon({ size = 22, color = "#64748B", focused = false }: SvgIconProps & { focused?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={5} width={18} height={16} rx={2.5} stroke={color} strokeWidth={2} fill={focused ? color : "none"} fillOpacity={0.15} />
      <Path d="M3 9.5h18M8 3v4M16 3v4" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function SvgWalletTabIcon({ size = 22, color = "#64748B", focused = false }: SvgIconProps & { focused?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={6} width={18} height={14} rx={3} stroke={color} strokeWidth={2} fill={focused ? color : "none"} fillOpacity={0.15} />
      <Path d="M16 13h2" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={16.5} cy={13} r={1} fill={color} />
    </Svg>
  );
}

export function SvgProfileTabIcon({ size = 22, color = "#64748B", focused = false }: SvgIconProps & { focused?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={2} fill={focused ? color : "none"} fillOpacity={0.2} />
      <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

// Dynamic SvgIcon Resolver that intelligently matches any icon name
export function SvgIcon({
  name,
  size = 24,
  color = "#00A651",
}: {
  name?: string;
  size?: number;
  color?: string;
}) {
  const iconStr = (name || "").toLowerCase();

  if (iconStr.includes("offer") || iconStr.includes("ticket") || iconStr.includes("coupon")) {
    return <SvgOffersIcon size={size} color={color} />;
  }
  if (iconStr.includes("member") || iconStr.includes("card") || iconStr.includes("crown")) {
    return <SvgMembershipIcon size={size} color={color} />;
  }
  if (iconStr.includes("tech") || iconStr.includes("hard-hat") || iconStr.includes("worker")) {
    return <SvgTechnicianIcon size={size} color={color} />;
  }
  if (iconStr.includes("refer") || iconStr.includes("gift") || iconStr.includes("earn")) {
    return <SvgReferEarnIcon size={size} color={color} />;
  }
  if (iconStr.includes("support") || iconStr.includes("headset") || iconStr.includes("phone")) {
    return <SvgSupportIcon size={size} color={color} />;
  }

  // 1. Try Custom Service Icons First
  const customIcon = getCustomServiceIcon(iconStr, { size, color, strokeWidth: 1.8 });
  if (customIcon) return customIcon;

  // 2. Fallback to generic categories
  if (iconStr.includes("electr") || iconStr.includes("bolt") || iconStr.includes("flash") || iconStr.includes("plug") || iconStr.includes("light")) {
    return <SvgElectricalIcon size={size} color={color} />;
  }
  if (iconStr.includes("plumb") || iconStr.includes("pipe") || iconStr.includes("wrench") || iconStr.includes("tap") || iconStr.includes("faucet")) {
    return <SvgPlumbingIcon size={size} color={color} />;
  }
  if (iconStr.includes("carpenter") || iconStr.includes("saw") || iconStr.includes("hammer") || iconStr.includes("wood")) {
    return <SvgCarpenterIcon size={size} color={color} />;
  }
  if (iconStr.includes("appliance") || iconStr.includes("washing") || iconStr.includes("fridge") || iconStr.includes("tv") || iconStr.includes("microwave") || iconStr.includes("ac") || iconStr.includes("conditioner")) {
    return <SvgApplianceIcon size={size} color={color} />;
  }
  if (iconStr.includes("shower") || iconStr.includes("bathroom") || iconStr.includes("toilet")) {
    return <SvgShowerIcon size={size} color={color} />;
  }
  if (iconStr.includes("kitchen") || iconStr.includes("countertop") || iconStr.includes("stove")) {
    return <SvgKitchenIcon size={size} color={color} />;
  }
  if (iconStr.includes("sofa") || iconStr.includes("chair") || iconStr.includes("couch") || iconStr.includes("rug")) {
    return <SvgSofaIcon size={size} color={color} />;
  }
  if (iconStr.includes("baby") || iconStr.includes("toddler") || iconStr.includes("nanny")) {
    return <SvgBabyCareIcon size={size} color={color} />;
  }
  if (iconStr.includes("cook") || iconStr.includes("chef") || iconStr.includes("food")) {
    return <SvgCookIcon size={size} color={color} />;
  }
  if (iconStr.includes("maid") || iconStr.includes("housekeeping") || iconStr.includes("supervisor") || iconStr.includes("full-time")) {
    return <SvgMaidIcon size={size} color={color} />;
  }
  if (iconStr.includes("men") || iconStr.includes("barber") || iconStr.includes("haircut") || iconStr.includes("shave") || iconStr.includes("beard")) {
    return <SvgMenSalonIcon size={size} color={color} />;
  }
  if (iconStr.includes("women") || iconStr.includes("threading") || iconStr.includes("facial") || iconStr.includes("wax") || iconStr.includes("eyebrow")) {
    return <SvgWomenSalonIcon size={size} color={color} />;
  }
  if (iconStr.includes("pest") || iconStr.includes("bug") || iconStr.includes("cockroach") || iconStr.includes("termite")) {
    return <SvgPestIcon size={size} color={color} />;
  }
  if (iconStr.includes("paint") || iconStr.includes("palette") || iconStr.includes("wall")) {
    return <SvgPaintingIcon size={size} color={color} />;
  }
  if (iconStr.includes("install") || iconStr.includes("tool") || iconStr.includes("drill")) {
    return <SvgInstallationIcon size={size} color={color} />;
  }
  if (iconStr.includes("inspect") || iconStr.includes("check") || iconStr.includes("report") || iconStr.includes("clip")) {
    return <SvgInspectionIcon size={size} color={color} />;
  }
  if (iconStr.includes("clean") || iconStr.includes("broom") || iconStr.includes("vacuum") || iconStr.includes("spray")) {
    return <SvgCleaningIcon size={size} color={color} />;
  }

  // Fallback default
  return <SvgCleaningIcon size={size} color={color} />;
}
