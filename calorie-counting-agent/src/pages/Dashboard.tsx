import { useMemo } from "react";
import { CalorieRing } from "@/components/CalorieRing";
import { MacroBar } from "@/components/MacroBar";
import { WeeklyChart } from "@/components/WeeklyChart";
import { useMeals } from "@/hooks/useMeals";
import { useGoals } from "@/hooks/useGoals";
import { getTodayString, formatDate } from "@/lib/storage";

export default function Dashboard() {
  const today = getTodayString();
  const { data: meals = [], isLoading: mealsLoading } = useMeals(today);
  const { data: goals, isLoading: goalsLoading } = useGoals();

  const totals = useMemo(() => {
    return meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fat: acc.fat + meal.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [meals]);

  const defaultGoals = { calories: 2000, protein: 150, carbs: 200, fat: 65 };
  const currentGoals = goals || defaultGoals;
  const remaining = Math.max(0, currentGoals.calories - totals.calories);

  if (mealsLoading || goalsLoading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto pb-24">
      <div className="px-4 py-6 max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            {formatDate(today)}
          </p>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        </div>

        {/* Calorie Ring */}
        <div className="bg-card rounded-2xl p-6 mb-6 border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
            Food Log Focus
          </h2>
          
          <div className="flex items-center justify-center mb-6">
            <CalorieRing consumed={totals.calories} target={currentGoals.calories} />
          </div>

          {/* Stats Row */}
          <div className="flex justify-around text-center mb-6">
            <div>
              <p className="text-2xl font-bold text-foreground">{remaining}</p>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{totals.calories}</p>
              <p className="text-sm text-muted-foreground">Consumed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{currentGoals.calories}</p>
              <p className="text-sm text-muted-foreground">Target</p>
            </div>
          </div>

          {/* Macro Bars */}
          <div className="flex gap-4">
            <MacroBar 
              label="Protein" 
              current={totals.protein} 
              target={currentGoals.protein} 
              color="protein" 
            />
            <MacroBar 
              label="Fat" 
              current={totals.fat} 
              target={currentGoals.fat} 
              color="fat" 
            />
            <MacroBar 
              label="Carbs" 
              current={totals.carbs} 
              target={currentGoals.carbs} 
              color="carbs" 
            />
          </div>
        </div>

        {/* Weekly Chart */}
        <WeeklyChart />
      </div>
    </main>
  );
}
