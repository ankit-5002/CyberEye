import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Calendar, BarChart2, PieChart as PieIcon, LineChart as LineIcon } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import PageHeader from "@/components/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

const Analytics = () => {
  const caseTypeData = [
    { name: "Cybercrime", value: 890, color: "hsl(217 91% 60%)" },
    { name: "Fraud", value: 720, color: "hsl(45 93% 58%)" },
    { name: "Identity Theft", value: 610, color: "hsl(160 84% 39%)" },
    { name: "Data Breach", value: 454, color: "hsl(330 81% 60%)" },
  ];

  const monthlyData = [
    { month: "Jan", convictions: 98 },
    { month: "Feb", convictions: 112 },
    { month: "Mar", convictions: 126 },
    { month: "Apr", convictions: 119 },
    { month: "May", convictions: 137 },
    { month: "Jun", convictions: 148 },
  ];

  const trendData = [
    { month: "Jan", cases: 220, resolved: 181 },
    { month: "Feb", cases: 245, resolved: 198 },
    { month: "Mar", cases: 268, resolved: 214 },
    { month: "Apr", cases: 251, resolved: 205 },
    { month: "May", cases: 287, resolved: 233 },
    { month: "Jun", cases: 304, resolved: 256 },
  ];

  const regionalData = [
    { region: "Central", cases: 412 },
    { region: "North", cases: 365 },
    { region: "South", cases: 329 },
    { region: "East", cases: 301 },
    { region: "West", cases: 344 },
  ];

  const downloadCsv = (filename: string, rows: Array<Record<string, any>>) => {
    const headers = Object.keys(rows[0] ?? {});
    const csv = [
      headers.join(","),
      ...rows.map((row) => headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Crime Analysis Overview"
          description="Comprehensive analytics and reporting"
          crumbs={[{ label: "Home", href: "/dashboard" }, { label: "Analytics", current: true }]}
          actions={
            <Button
              variant="hero"
              className="gap-2"
              onClick={() => {
                downloadCsv("analytics-summary.csv", [
                  { metric: "Total Cases", value: 2384 },
                  { metric: "Convictions", value: 148 + 137 + 119 + 126 + 112 + 98 },
                  { metric: "AvgResolveDays", value: 11.8 },
                ]);
                toast.success("Report exported");
              }}
            >
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          }
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Cases", value: "1,247" },
            { label: "Convictions", value: "892" },
            { label: "Avg. Resolve Time", value: "12.4d" },
            { label: "Anomalies Flagged", value: "31" },
          ].map((kpi, i) => (
            <Card key={i} className="bg-card border-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select>
                <SelectTrigger className="bg-background border-border">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <SelectValue placeholder="Date Range" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Case Type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="cybercrime">Cybercrime</SelectItem>
                  <SelectItem value="fraud">Fraud</SelectItem>
                  <SelectItem value="theft">Identity Theft</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Charts with Tabs */}
        <Tabs defaultValue="distribution">
          <TabsList>
            <TabsTrigger value="distribution" className="gap-2"><PieIcon className="w-4 h-4" />Distribution</TabsTrigger>
            <TabsTrigger value="monthly" className="gap-2"><BarChart2 className="w-4 h-4" />Monthly</TabsTrigger>
            <TabsTrigger value="trends" className="gap-2"><LineIcon className="w-4 h-4" />Trends</TabsTrigger>
            <TabsTrigger value="regional" className="gap-2"><BarChart2 className="w-4 h-4" />Regional</TabsTrigger>
          </TabsList>
          <TabsContent value="distribution" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Case Distribution by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={caseTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {caseTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="monthly" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Convictions per Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
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
                      <Bar dataKey="convictions" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="trends" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Case Trends Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
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
                      <Legend />
                      <Line type="monotone" dataKey="cases" stroke="hsl(217 91% 60%)" strokeWidth={3} />
                      <Line type="monotone" dataKey="resolved" stroke="hsl(160 84% 39%)" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="regional" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Regional Case Density</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={regionalData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                      <YAxis dataKey="region" type="category" stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="cases" fill="hsl(45 93% 58%)" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
