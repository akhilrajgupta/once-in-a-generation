import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Meal {
  id: string;
  user_id: string;
  date: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  photo: string | null;
  created_at: string;
}

export type MealInsert = Omit<Meal, "id" | "user_id" | "created_at">;

export function useMeals(date: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["meals", date, user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("meals")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", date)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Meal[];
    },
    enabled: !!user,
  });
}

export function useMealsForWeek(dates: string[]) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["meals-week", dates, user?.id],
    queryFn: async () => {
      if (!user || dates.length === 0) return [];
      
      const { data, error } = await supabase
        .from("meals")
        .select("*")
        .eq("user_id", user.id)
        .in("date", dates);

      if (error) throw error;
      return data as Meal[];
    },
    enabled: !!user && dates.length > 0,
  });
}

export function useAddMeal() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (meal: MealInsert) => {
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("meals")
        .insert({
          ...meal,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"] });
      queryClient.invalidateQueries({ queryKey: ["meals-week"] });
    },
    onError: (error) => {
      toast.error("Failed to add meal: " + error.message);
    },
  });
}

export function useDeleteMeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mealId: string) => {
      const { error } = await supabase
        .from("meals")
        .delete()
        .eq("id", mealId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"] });
      queryClient.invalidateQueries({ queryKey: ["meals-week"] });
      toast.success("Meal deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete meal: " + error.message);
    },
  });
}
