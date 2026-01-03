import { Code2, FileCode2, Sun, Moon } from "lucide-react";
import { useNavigationStore, useThemeStore } from "@/store";
import { FeatureRoute } from "@/types";

type NavItem = {
  id: FeatureRoute;
  label: string;
  icon: JSX.Element;
};

const navItems: NavItem[] = [
  {
    id: "request-to-curl",
    label: "Request to cURL",
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    id: "curl-to-snippets",
    label: "cURL to Snippets",
    icon: <FileCode2 className="w-5 h-5" />,
  },
];

export const Sidebar = () => {
  const { currentRoute, setRoute } = useNavigationStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-app-sidebar border-r border-app-accent/30 flex flex-col">
      <div className="p-6 border-b border-app-accent/30">
        <h1 className="text-xl font-bold text-app-text">Toolbox for Devs</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setRoute(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                  ${
                    currentRoute === item.id
                      ? "bg-app-accent text-white"
                      : "text-app-text hover:bg-app-input"
                  }
                `}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-app-accent/30 space-y-4">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-app-accent hover:bg-app-accent/90 text-white rounded-lg transition-colors"
        >
          {theme === "dark" ? (
            <>
              <Sun className="w-4 h-4" />
              <span className="text-sm font-medium">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              <span className="text-sm font-medium">Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
