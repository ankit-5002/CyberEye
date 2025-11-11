import { ReactNode, useState } from "react";
import { Shield, LayoutDashboard, FolderOpen, Upload, BarChart3, Settings, LogOut, Menu, X, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Cases", path: "/cases", icon: FolderOpen },
    { name: "Evidence", path: "/evidence", icon: Upload },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-card border-r border-border transition-all duration-300 flex flex-col shadow-sm relative overflow-hidden`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <img src="/favicon.ico" alt="Logo" className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">CDMS</h2>
                <p className="text-xs text-muted-foreground">CyberEye</p>
              </div>
            </div>
          ) : (
            <div className="p-2 rounded-lg bg-primary/10 mx-auto">
              <img src="/favicon.ico" alt="Logo" className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200"
              activeClassName="bg-primary/10 text-foreground"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Vertical UNDER PROGRESS label */}
        <div className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2">
          <span className="[writing-mode:vertical-rl] rotate-180 text-yellow-400 font-extrabold tracking-widest text-3xl">
            UNDER PROGRESS
          </span>
        </div>

        {/* Sidebar Notice */}
        <div className="p-4">
          <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-background to-secondary/20 p-4 shadow-sm">
            <div className="text-2xl font-extrabold tracking-tight text-foreground">
              Under Progress
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Still working on the project. Currently this is just for the demo purpose.
            </p>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-muted-foreground"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">Officer Ankit Rathore</p>
              <p className="text-xs text-muted-foreground">Senior Crime Analyst</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
