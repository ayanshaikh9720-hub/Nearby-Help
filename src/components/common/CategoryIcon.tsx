import React from 'react';
import {
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  Sparkles,
  Wind,
  Disc,
  Tv,
  ShieldAlert,
  Home,
  Droplets,
  Car,
  Bike,
  CircleDot,
  BatteryCharging,
  Waves,
  Truck,
  Scissors,
  HeartHandshake,
  BookOpen,
  Activity,
  Camera,
  Palette,
  Laptop,
  Printer,
  Shield,
  Wifi,
  Flame,
  Package,
  FileText,
  HelpCircle,
  Snowflake
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Zap': return <Zap className={className} />;
    case 'Wrench': return <Wrench className={className} />;
    case 'Hammer': return <Hammer className={className} />;
    case 'Paintbrush': return <Paintbrush className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Wind': return <Wind className={className} />;
    case 'Refrigerator': return <Snowflake className={className} />;
    case 'Disc': return <Disc className={className} />;
    case 'Tv': return <Tv className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'Home': return <Home className={className} />;
    case 'Droplets': return <Droplets className={className} />;
    case 'Tool': return <Wrench className={className} />;
    case 'Car': return <Car className={className} />;
    case 'Bike': return <Bike className={className} />;
    case 'CircleDot': return <CircleDot className={className} />;
    case 'BatteryCharging': return <BatteryCharging className={className} />;
    case 'Waves': return <Waves className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'Scissors': return <Scissors className={className} />;
    case 'HeartHandshake': return <HeartHandshake className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Camera': return <Camera className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Laptop': return <Laptop className={className} />;
    case 'Printer': return <Printer className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Wifi': return <Wifi className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'Package': return <Package className={className} />;
    case 'FileText': return <FileText className={className} />;
    default: return <HelpCircle className={className} />;
  }
};
