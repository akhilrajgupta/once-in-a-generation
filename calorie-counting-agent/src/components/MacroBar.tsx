import { cn } from "@/lib/utils";

interface MacroBarProps {
  label: string;
  current: number;
  target: number;
  color: 'protein' | 'fat' | 'carbs';
}

const colorMap = {
  protein: 'bg-[hsl(var(--protein))]',
  fat: 'bg-[hsl(var(--fat))]',
  carbs: 'bg-[hsl(var(--carbs))]',
};

export function MacroBar({ label, current, target, color }: MacroBarProps) {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-300", colorMap[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-1 text-center">
        <span className="text-sm font-semibold text-foreground">{current}</span>
        <span className="text-xs text-muted-foreground"> / {target}g</span>
      </div>
    </div>
  );
}
