import { cn } from '@/lib/utils';

type Variant = 'default' | 'success' | 'warning' | 'danger' | 'muted' | 'amazon' | 'reddit' | 'youtube' | 'expert';

const variants: Record<Variant, string> = {
  default: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  success: 'bg-green-500/15 text-green-400 border-green-500/25',
  warning: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  danger: 'bg-red-500/15 text-red-400 border-red-500/25',
  muted: 'bg-gray-500/15 text-gray-400 border-gray-500/25',
  amazon: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  reddit: 'bg-red-500/15 text-red-400 border-red-500/25',
  youtube: 'bg-red-600/15 text-red-400 border-red-600/25',
  expert: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
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
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
