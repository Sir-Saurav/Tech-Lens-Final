import { cn } from '@/lib/utils';

type Variant = 'default' | 'success' | 'warning' | 'danger' | 'muted' | 'amazon' | 'reddit' | 'youtube' | 'expert';

const variants: Record<Variant, string> = {
  default: 'bg-[#EEF4FA] text-[#2D5986] border-[#CBDDF0]',
  success: 'bg-[#EBF5EE] text-[#2A6B4A] border-[#C3E0CE]',
  warning: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]',
  danger: 'bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]',
  muted: 'bg-[#F5F6F4] text-[#5C5C5C] border-[#DDE1E6]',
  amazon: 'bg-[#FFF7ED] text-[#9A3412] border-[#FDBA74]',
  reddit: 'bg-[#FEF2F2] text-[#991B1B] border-[#FCA5A5]',
  youtube: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]',
  expert: 'bg-[#F0FDF4] text-[#166534] border-[#86EFAC]',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
