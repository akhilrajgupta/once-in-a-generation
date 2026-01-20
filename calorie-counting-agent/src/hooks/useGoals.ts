import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Goals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const DEFAULT_GOALS: Goals = {
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 65,
};

export function useGoals() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["goals", user?.id],
    queryFn: async () => {
      if (!user) return DEFAULT_GOALS;

      const { data, error } = await supabase
        .from("user_goals")
        .select("calories, protein, carbs, fat")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        // Create default goals for new user
        const { error: insertError } = await supabase
          .from("user_goals")
          .insert({
            user_id: user.id,
            ...DEFAULT_GOALS,
          });
        
        if (insertError) throw insertError;
        return DEFAULT_GOALS;
      }

      return data as Goals;
    },
    enabled: !!user,
  });
}

export function useUpdateGoals() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (goals: Goals) => {
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("user_goals")
        .upsert({
          user_id: user.id,
          ...goals,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goals saved successfully!");
    },
    onError: (error) => {
      toast.error("Failed to save goals: " + error.message);
    },
  });
}
