import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Switch } from "./ui/switch";

// Toggle de tema (light/dark)
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2" role="group" aria-label="Alternar tema">
      {/* Ícone Sol */}
      <Sun
        className={`h-5 w-5 transition-all duration-700 ${
          theme === "dark" ? "text-muted-foreground scale-75" : "text-foreground scale-100"
        }`}
        aria-hidden="true"
      />
      
      {/* Switch */}
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label={`Alternar para tema ${theme === "dark" ? "claro" : "escuro"}`}
        className="transition-all duration-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      />
      
      {/* Ícone Lua */}
      <Moon
        className={`h-5 w-5 transition-all duration-700 ${
          theme === "light" ? "text-muted-foreground scale-75" : "text-foreground scale-100"
        }`}
        aria-hidden="true"
      />
      
      {/* Texto para screen readers */}
      <span className="sr-only">
        Tema atual: {theme === "dark" ? "escuro" : "claro"}
      </span>
    </div>
  );
}