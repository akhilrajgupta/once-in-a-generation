import { LayoutDashboard, UtensilsCrossed, Settings, Plus } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  onAddClick: () => void;
}

export function BottomNav({ onAddClick }: BottomNavProps) {
  const linkClass = "flex flex-col items-center justify-center gap-1 py-2 px-4 text-muted-foreground transition-colors";
  const activeClass = "text-primary";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <NavLink to="/" className={linkClass} activeClassName={activeClass}>
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-xs">Dashboard</span>
        </NavLink>
        
        <NavLink to="/log" className={linkClass} activeClassName={activeClass}>
          <UtensilsCrossed className="w-5 h-5" />
          <span className="text-xs">Food Log</span>
        </NavLink>
        
        <button
          onClick={onAddClick}
          className="flex items-center justify-center w-14 h-14 -mt-6 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="w-6 h-6" />
        </button>
        
        <NavLink to="/settings" className={linkClass} activeClassName={activeClass}>
          <Settings className="w-5 h-5" />
          <span className="text-xs">Settings</span>
        </NavLink>
        
        <div className="w-14" /> {/* Spacer for balance */}
      </div>
    </nav>
  );
}
