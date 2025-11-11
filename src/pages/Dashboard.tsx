import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, TrendingUp, AlertCircle, ArrowUp, ArrowDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const stats = [
    { title: "Total Cases", value: "2,384", change: "+9.4%", trend: "up", icon: FileText, gradient: "from-blue-500 to-cyan-500" },
    { title: "Pending Cases", value: "612", change: "+2.1%", trend: "up", icon: AlertCircle, gradient: "from-amber-500 to-orange-500" },
    { title: "Closed Cases", value: "1,772", change: "+14.7%", trend: "up", icon: TrendingUp, gradient: "from-emerald-500 to-teal-500" },
    { title: "Active Users", value: "124", change: "+5.6%", trend: "up", icon: Users, gradient: "from-purple-500 to-pink-500" },
  ];

  const chartData = [
    { month: "Jan", cases: 210 },
    { month: "Feb", cases: 238 },
    { month: "Mar", cases: 268 },
    { month: "Apr", cases: 251 },
    { month: "May", cases: 287 },
    { month: "Jun", cases: 304 },
  ];

  const recentUpdates = [
    { id: "2215", message: "Hospital EMR Breach – Indicators of Compromise updated", time: "1 hour ago" },
    { id: "2209", message: "Dark Web Data Sale – New batch of credentials identified", time: "3 hours ago" },
    { id: "2205", message: "Crypto Wallet Drainer – Funds traced to mixing service", time: "Yesterday" },
  ];

  const tasks = [
    { title: "Validate BEC email headers and DKIM results", due: "Today" },
    { title: "Draft interim report for C-2205 (Crypto Wallet Drainer)", due: "Tomorrow" },
    { title: "Coordinate with bank for UPI mule account freeze", due: "This week" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Dashboard Overview"
          description="Real-time conviction case management and analytics. Note: Currently running on demo data."
          crumbs={[{ label: "Home", href: "/dashboard" }, { label: "Dashboard", current: true }]}
          actions={
            <>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  toast.success("Data refreshed");
                }}
              >
                <RefreshCcw className="w-4 h-4" />
                Refresh
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => navigate("/settings")}
              >
                <Bell className="w-4 h-4" />
                Alerts
              </Button>
              <Button
                variant="hero"
                className="gap-2"
                onClick={() => navigate("/cases")}
              >
                <Plus className="w-4 h-4" />
                New Case
              </Button>
              <Button
                variant="destructive"
                className="gap-2"
                onClick={() => {
                  localStorage.removeItem("auth");
                  toast.success("Logged out successfully");
                  navigate("/");
                }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          }
        />

        {/* Demo Mode Banner */}
        <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4">
          <p className="text-sm">
            <span className="font-semibold text-destructive">Note:</span>{" "}
            <span className="text-foreground">Currently running on demo data.</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-primary/10`}>
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-emerald-500" : "text-amber-500"
                  }`}>
                    {stat.trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Case Trends - Last 6 Months</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cases"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Lower Grid: Updates, Tasks, Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-all duration-200"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <AlertCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-medium">{update.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{update.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.map((task, i) => (
                  <div key={i} className="flex items-center justify-between rounded-md border border-border p-3">
                    <div className="text-sm text-foreground">{task.title}</div>
                    <div className="text-xs text-muted-foreground">{task.due}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button variant="outline" className="justify-start" onClick={() => navigate("/cases")}>Create case</Button>
                <Button variant="outline" className="justify-start" onClick={() => navigate("/evidence")}>Upload evidence</Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    navigate("/analytics");
                    toast.message("Opening reports", { description: "Navigate to Analytics to generate reports" });
                  }}
                >
                  Generate report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
