import {
  Compass,
  Hammer,
  Settings,
  TrendingUp,
  Lightbulb,
  Building2,
  Server,
  Users,
  IdCard,
  Scale,
  Calculator,
  Layers,
  Landmark,
  UsersRound,
  MapPin,
  type LucideIcon,
} from 'lucide-react';

// Maps the icon names used in site-data.ts (Website Brief Part 0.4 / C6) to
// lucide-react components, so content data can stay plain strings.
export const ICON_MAP: Record<string, LucideIcon> = {
  compass: Compass,
  hammer: Hammer,
  settings: Settings,
  'trending-up': TrendingUp,
  lightbulb: Lightbulb,
  'building-2': Building2,
  server: Server,
  users: Users,
  'id-card': IdCard,
  scale: Scale,
  calculator: Calculator,
  layers: Layers,
  landmark: Landmark,
  'users-round': UsersRound,
  'map-pin': MapPin,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Compass;
}
