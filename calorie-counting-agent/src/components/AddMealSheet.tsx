import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddMeal, type MealInsert } from "@/hooks/useMeals";
import { getTodayString } from "@/lib/storage";
import { Camera, Sparkles, Loader2, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface AddMealSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface EstimationResult {
  status: string;
  food: FoodItem[];
  total: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export function AddMealSheet({ open, onOpenChange }: AddMealSheetProps) {
  const [type, setType] = useState<MealType>('breakfast');
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimationResult, setEstimationResult] = useState<EstimationResult | null>(null);

  const addMealMutation = useAddMeal();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEstimateCalories = async () => {
    if (!photoFile) {
      toast.error("Please add a photo first");
      return;
    }

    setIsEstimating(true);
    try {
      const formData = new FormData();
      formData.append("image", photoFile);

      const response = await fetch(
        "https://akhilrajgupta.app.n8n.cloud/webhook/fddc93a3-5da9-4ce6-b03b-8ee0161a517c",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to estimate calories");
      }

      const data = await response.json();
      console.log("Estimation response:", data);
      
      // Parse the response - handle both array and direct object formats
      const output = Array.isArray(data) ? data[0]?.output : data?.output;
      if (output?.status === "success") {
        setEstimationResult(output);
        toast.success("Calories estimated!");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error estimating calories:", error);
      toast.error("Failed to estimate calories");
    } finally {
      setIsEstimating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    const meal: MealInsert = {
      date: getTodayString(),
      type,
      description: description.trim(),
      calories: parseInt(calories) || 0,
      protein: parseInt(protein) || 0,
      carbs: parseInt(carbs) || 0,
      fat: parseInt(fat) || 0,
      photo,
    };

    addMealMutation.mutate(meal, {
      onSuccess: () => {
        toast.success("Meal added successfully!");
        resetForm();
        onOpenChange(false);
      },
    });
  };

  const resetForm = () => {
    setType('breakfast');
    setDescription('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    setPhoto(null);
    setPhotoFile(null);
    setEstimationResult(null);
  };

  const handleAcceptEstimation = () => {
    if (!estimationResult) return;
    
    // Build description from food items
    const foodNames = estimationResult.food.map(f => `${f.name} (${f.quantity})`).join(", ");
    setDescription(foodNames);
    
    // Set totals
    setCalories(String(Math.round(estimationResult.total.calories)));
    setProtein(String(Math.round(estimationResult.total.protein)));
    setCarbs(String(Math.round(estimationResult.total.carbs)));
    setFat(String(Math.round(estimationResult.total.fat)));
    
    setEstimationResult(null);
    toast.success("Values applied!");
  };

  const handleDismissEstimation = () => {
    setEstimationResult(null);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Add Meal</SheetTitle>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-5 overflow-y-auto pb-8">
          <div className="space-y-2">
            <Label>Meal Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as MealType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">🌅 Breakfast</SelectItem>
                <SelectItem value="lunch">☀️ Lunch</SelectItem>
                <SelectItem value="dinner">🌙 Dinner</SelectItem>
                <SelectItem value="snack">🍎 Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What did you eat?"
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Photo (optional)</Label>
            <div className="flex items-center gap-3">
              {photo ? (
                <img src={photo} alt="Meal" className="w-20 h-20 object-cover rounded-lg" />
              ) : (
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="flex-1"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleEstimateCalories}
              disabled={!photoFile || isEstimating}
              className="w-full mt-2"
            >
              {isEstimating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Estimating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Estimate calories from photo
                </>
              )}
            </Button>
          </div>

          {estimationResult && (
            <Card className="p-4 space-y-3 border-primary/50 bg-primary/5">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Detected Foods</h4>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleDismissEstimation}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAcceptEstimation}
                    className="h-8"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Use These Values
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {estimationResult.food.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm py-1 border-b border-border/50 last:border-0">
                    <span className="text-muted-foreground">
                      {item.name} <span className="text-xs">({item.quantity})</span>
                    </span>
                    <span className="font-medium">{item.calories} kcal</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-2 border-t border-border">
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div>
                    <p className="font-bold text-lg">{Math.round(estimationResult.total.calories)}</p>
                    <p className="text-muted-foreground">Calories</p>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-[hsl(var(--protein))]">{Math.round(estimationResult.total.protein)}g</p>
                    <p className="text-muted-foreground">Protein</p>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-[hsl(var(--carbs))]">{Math.round(estimationResult.total.carbs)}g</p>
                    <p className="text-muted-foreground">Carbs</p>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-[hsl(var(--fat))]">{Math.round(estimationResult.total.fat)}g</p>
                    <p className="text-muted-foreground">Fat</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Calories</Label>
              <Input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Protein (g)</Label>
              <Input
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Carbs (g)</Label>
              <Input
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Fat (g)</Label>
              <Input
                type="number"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-semibold"
            disabled={addMealMutation.isPending}
          >
            {addMealMutation.isPending ? "Adding..." : "Add Meal"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
