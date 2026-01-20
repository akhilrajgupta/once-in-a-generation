import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";
import { useMealsForWeek } from "@/hooks/useMeals";
import { useGoals } from "@/hooks/useGoals";
import { getLast7Days, getDayName } from "@/lib/storage";
import { useMemo } from "react";

export function WeeklyChart() {
  const days = getLast7Days();
  const { data: allMeals = [], isLoading: mealsLoading } = useMealsForWeek(days);
  const { data: goals, isLoading: goalsLoading } = useGoals();

  const data = useMemo(() => {
    const currentGoals = goals || { calories: 2000, protein: 150, carbs: 200, fat: 65 };
    
    return days.map(date => {
      const mealsForDay = allMeals.filter(m => m.date === date);
      const total = mealsForDay.reduce((sum, m) => sum + m.calories, 0);
      return {
        day: getDayName(date),
        calories: total,
        overGoal: total > currentGoals.calories,
      };
    });
  }, [days, allMeals, goals]);

  if (mealsLoading || goalsLoading) {
    return (
      <div className="bg-card rounded-xl p-4 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Last 7 Days</h3>
        <div className="h-40 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-4 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Last 7 Days</h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={24}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Bar 
              dataKey="calories" 
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={entry.overGoal ? 'hsl(var(--destructive))' : 'hsl(var(--primary))'}
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-primary" />
          <span>Under goal</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-destructive" />
          <span>Over goal</span>
        </div>
      </div>
    </div>
  );
}
