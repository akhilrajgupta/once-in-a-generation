import { MealCard } from "@/components/MealCard";
import { useMeals } from "@/hooks/useMeals";
import { useGoals } from "@/hooks/useGoals";
import { getTodayString, formatDate } from "@/lib/storage";
import { useMemo } from "react";

export default function FoodLog() {
  const today = getTodayString();
  const { data: meals = [], isLoading } = useMeals(today);
  const { data: goals } = useGoals();

  const sortedMeals = useMemo(() => {
    return [...meals].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [meals]);

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

  if (isLoading) {
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
          <h1 className="text-3xl font-bold text-foreground">Food Log</h1>
        </div>

        {/* Today's Summary */}
        <div className="bg-card rounded-xl p-4 mb-6 border border-border">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-xl font-bold text-foreground">{totals.calories}</p>
              <p className="text-xs text-muted-foreground">Calories</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[hsl(var(--protein))]">{totals.protein}g</p>
              <p className="text-xs text-muted-foreground">Protein</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[hsl(var(--carbs))]">{totals.carbs}g</p>
              <p className="text-xs text-muted-foreground">Carbs</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[hsl(var(--fat))]">{totals.fat}g</p>
              <p className="text-xs text-muted-foreground">Fat</p>
            </div>
          </div>
        </div>

        {/* Meals List */}
        <div className="space-y-3">
          {sortedMeals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No meals logged today</p>
              <p className="text-sm text-muted-foreground mt-1">
                Tap the + button to add your first meal
              </p>
            </div>
          ) : (
            sortedMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
