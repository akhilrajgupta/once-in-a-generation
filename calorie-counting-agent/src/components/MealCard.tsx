import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteMeal, type Meal } from "@/hooks/useMeals";

interface MealCardProps {
  meal: Meal;
}

const mealTypeEmoji = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
};

const mealTypeLabel = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
};

export function MealCard({ meal }: MealCardProps) {
  const deleteMealMutation = useDeleteMeal();

  const handleDelete = () => {
    deleteMealMutation.mutate(meal.id);
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
      <div className="flex items-start gap-3">
        {meal.photo && (
          <img 
            src={meal.photo} 
            alt={meal.description} 
            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span>{mealTypeEmoji[meal.type]}</span>
            <span className="text-sm font-medium text-muted-foreground">
              {mealTypeLabel[meal.type]}
            </span>
          </div>
          <p className="text-foreground font-medium truncate">{meal.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{meal.calories} cal</span>
            <span>P: {meal.protein}g</span>
            <span>C: {meal.carbs}g</span>
            <span>F: {meal.fat}g</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={handleDelete}
          disabled={deleteMealMutation.isPending}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
