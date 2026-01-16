import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGoals, useUpdateGoals, type Goals } from "@/hooks/useGoals";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Target, Beef, Wheat, Droplets, LogOut } from "lucide-react";

export default function SettingsPage() {
  const { data: savedGoals, isLoading } = useGoals();
  const updateGoalsMutation = useUpdateGoals();
  const { signOut, user } = useAuth();
  const [goals, setGoals] = useState<Goals>({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 65,
  });

  useEffect(() => {
    if (savedGoals) {
      setGoals(savedGoals);
    }
  }, [savedGoals]);

  const handleSave = () => {
    updateGoalsMutation.mutate(goals);
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
  };

  const updateGoal = (key: keyof Goals, value: string) => {
    setGoals(prev => ({
      ...prev,
      [key]: parseInt(value) || 0,
    }));
  };

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Set your daily nutrition goals</p>
          {user?.email && (
            <p className="text-sm text-muted-foreground mt-2">
              Signed in as {user.email}
            </p>
          )}
        </div>

        <div className="space-y-6">
          {/* Calories Goal */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <Label className="text-base font-semibold">Daily Calories</Label>
                <p className="text-xs text-muted-foreground">Your daily calorie target</p>
              </div>
            </div>
            <Input
              type="number"
              value={goals.calories}
              onChange={(e) => updateGoal('calories', e.target.value)}
              className="text-lg font-semibold"
            />
          </div>

          {/* Protein Goal */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--protein))]/10 flex items-center justify-center">
                <Beef className="w-5 h-5 text-[hsl(var(--protein))]" />
              </div>
              <div>
                <Label className="text-base font-semibold">Protein (g)</Label>
                <p className="text-xs text-muted-foreground">Daily protein target in grams</p>
              </div>
            </div>
            <Input
              type="number"
              value={goals.protein}
              onChange={(e) => updateGoal('protein', e.target.value)}
              className="text-lg font-semibold"
            />
          </div>

          {/* Carbs Goal */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--carbs))]/10 flex items-center justify-center">
                <Wheat className="w-5 h-5 text-[hsl(var(--carbs))]" />
              </div>
              <div>
                <Label className="text-base font-semibold">Carbs (g)</Label>
                <p className="text-xs text-muted-foreground">Daily carbohydrate target in grams</p>
              </div>
            </div>
            <Input
              type="number"
              value={goals.carbs}
              onChange={(e) => updateGoal('carbs', e.target.value)}
              className="text-lg font-semibold"
            />
          </div>

          {/* Fat Goal */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--fat))]/10 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-[hsl(var(--fat))]" />
              </div>
              <div>
                <Label className="text-base font-semibold">Fat (g)</Label>
                <p className="text-xs text-muted-foreground">Daily fat target in grams</p>
              </div>
            </div>
            <Input
              type="number"
              value={goals.fat}
              onChange={(e) => updateGoal('fat', e.target.value)}
              className="text-lg font-semibold"
            />
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full h-12 text-lg font-semibold"
            disabled={updateGoalsMutation.isPending}
          >
            {updateGoalsMutation.isPending ? "Saving..." : "Save Goals"}
          </Button>

          {/* Logout Button */}
          <Button 
            onClick={handleLogout} 
            variant="outline"
            className="w-full h-12 text-lg font-semibold"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </main>
  );
}
