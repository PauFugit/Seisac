import {
  Activity,
  BadgeCheck,
  Cable,
  Cctv,
  DoorOpen,
  Gauge,
  Headset,
  House,
  KeyRound,
  Lock,
  MapPin,
  Mountain,
  RadioTower,
  Router,
  Satellite,
  ScanFace,
  ShieldCheck,
  Truck,
  Video,
  Wifi,
  Wrench,
  type LucideProps,
} from "lucide-react";

const ICONS = {
  activity: Activity,
  badgeCheck: BadgeCheck,
  cable: Cable,
  cctv: Cctv,
  doorOpen: DoorOpen,
  gauge: Gauge,
  headset: Headset,
  house: House,
  keyRound: KeyRound,
  lock: Lock,
  mapPin: MapPin,
  mountain: Mountain,
  radioTower: RadioTower,
  router: Router,
  satellite: Satellite,
  scanFace: ScanFace,
  shieldCheck: ShieldCheck,
  truck: Truck,
  video: Video,
  wifi: Wifi,
  wrench: Wrench,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, strokeWidth = 1.5, ...props }: { name: IconName } & LucideProps) {
  const Cmp = ICONS[name];
  return <Cmp aria-hidden="true" strokeWidth={strokeWidth} {...props} />;
}
