import { useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal, CheckSquare, Square } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";

const Cases = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [newCase, setNewCase] = useState({ title: "", description: "", officer: "", status: "" });

  const cases = [
    { id: "C-2201", title: "Banking Phishing Ring Takedown", officer: "Det. A. Rathore", status: "investigating", updated: "2025-10-28" },
    { id: "C-2202", title: "Ransomware Attack on SME Cluster", officer: "Det. S. Mehra", status: "pending", updated: "2025-10-27" },
    { id: "C-2203", title: "Social Engineering Fraud (Senior Citizens)", officer: "Det. N. Iyer", status: "investigating", updated: "2025-10-27" },
    { id: "C-2204", title: "SIM Swap Identity Theft", officer: "Det. R. Kapoor", status: "closed", updated: "2025-10-26" },
    { id: "C-2205", title: "Crypto Wallet Drainer Scam", officer: "Det. A. Rathore", status: "investigating", updated: "2025-10-26" },
    { id: "C-2206", title: "Business Email Compromise (BEC)", officer: "Det. P. Singh", status: "pending", updated: "2025-10-25" },
    { id: "C-2207", title: "Card Skimming Network", officer: "Det. E. Das", status: "closed", updated: "2025-10-24" },
    { id: "C-2208", title: "Malware Distribution via Ads", officer: "Det. S. Mehra", status: "investigating", updated: "2025-10-23" },
    { id: "C-2209", title: "Dark Web Data Sale (Gov IDs)", officer: "Det. A. Rathore", status: "investigating", updated: "2025-10-23" },
    { id: "C-2210", title: "UPI Fraud – Money Mule Network", officer: "Det. R. Kapoor", status: "pending", updated: "2025-10-22" },
    { id: "C-2211", title: "Mobile Tower Refund Scam", officer: "Det. N. Iyer", status: "closed", updated: "2025-10-21" },
    { id: "C-2212", title: "Fake Loan Apps Harassment", officer: "Det. P. Singh", status: "investigating", updated: "2025-10-21" },
    { id: "C-2213", title: "Online Betting Money Laundering", officer: "Det. S. Mehra", status: "pending", updated: "2025-10-20" },
    { id: "C-2214", title: "Deepfake Extortion Attempt", officer: "Det. E. Das", status: "closed", updated: "2025-10-19" },
    { id: "C-2215", title: "Hospital EMR Breach", officer: "Det. A. Rathore", status: "investigating", updated: "2025-10-18" },
    { id: "C-2216", title: "E-Commerce Return Fraud", officer: "Det. R. Kapoor", status: "closed", updated: "2025-10-18" },
    { id: "C-2217", title: "Gaming Account Takeovers", officer: "Det. P. Singh", status: "pending", updated: "2025-10-17" },
    { id: "C-2218", title: "Telecom Spoofing Syndicate", officer: "Det. N. Iyer", status: "investigating", updated: "2025-10-16" },
    { id: "C-2219", title: "QR Code Payment Hijacking", officer: "Det. E. Das", status: "pending", updated: "2025-10-16" },
    { id: "C-2220", title: "Work-From-Home Job Scam", officer: "Det. S. Mehra", status: "closed", updated: "2025-10-15" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/20 text-amber-500 border-amber-500/50";
      case "investigating":
        return "bg-primary/20 text-primary border-primary/50";
      case "closed":
        return "bg-emerald-500/20 text-emerald-500 border-emerald-500/50";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCase.title || !newCase.officer || !newCase.status) {
      toast.error("Please complete required fields");
      return;
    }
    toast.success("Case added successfully!");
    setIsSheetOpen(false);
    setNewCase({ title: "", description: "", officer: "", status: "" });
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCases.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCases.map((c) => c.id));
    }
  };

  const filteredCases = useMemo(() => {
    let list = cases.slice();
    if (activeTab === "open") list = list.filter((c) => c.status !== "closed");
    if (activeTab === "closed") list = list.filter((c) => c.status === "closed");
    if (statusFilter) list = list.filter((c) => c.status === statusFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.officer.toLowerCase().includes(q)
      );
    }
    return list;
  }, [cases, activeTab, statusFilter, query]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Case Management"
          description="Track and manage conviction cases"
          crumbs={[{ label: "Home", href: "/dashboard" }, { label: "Cases", current: true }]}
          actions={
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="hero" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Case
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-card border-border overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="text-foreground">Add New Case</SheetTitle>
                </SheetHeader>
                <form onSubmit={handleAddCase} className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Case Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter case title"
                      className="bg-background border-border"
                      value={newCase.title}
                      onChange={(e) => setNewCase((s) => ({ ...s, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter case description"
                      rows={4}
                      className="bg-background border-border"
                      value={newCase.description}
                      onChange={(e) => setNewCase((s) => ({ ...s, description: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="officer">Assigned Officer</Label>
                    <Input
                      id="officer"
                      placeholder="Officer name"
                      className="bg-background border-border"
                      value={newCase.officer}
                      onChange={(e) => setNewCase((s) => ({ ...s, officer: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newCase.status} onValueChange={(v) => setNewCase((s) => ({ ...s, status: v }))}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="investigating">Under Investigation</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" variant="hero" className="w-full">Add Case</Button>
                </form>
              </SheetContent>
            </Sheet>
          }
        />

        {/* Controls */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-foreground">Search and Filters</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search cases..."
                className="pl-10 bg-background border-border"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                setStatusFilter((prev) =>
                  prev === "pending" ? "investigating" : prev === "investigating" ? "closed" : prev === "closed" ? null : "pending"
                );
                toast.message("Filter toggled");
              }}
            >
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Cases Table */}
        <Card className="bg-card border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th className="p-4">
                    <button onClick={toggleSelectAll} className="text-muted-foreground">
                      {selectedIds.length === filteredCases.length && filteredCases.length > 0 ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Case ID</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Title</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Officer</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground">Last Updated</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem, index) => (
                  <tr
                    key={index}
                    className="border-b border-border hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <td className="p-4">
                      <button onClick={() => toggleSelect(caseItem.id)} className="text-muted-foreground">
                        {selectedIds.includes(caseItem.id) ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-sm font-medium text-primary">{caseItem.id}</td>
                    <td className="p-4 text-sm text-foreground">{caseItem.title}</td>
                    <td className="p-4 text-sm text-muted-foreground">{caseItem.officer}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(caseItem.status)}>
                        {caseItem.status === "investigating" ? "Under Investigation" : caseItem.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{caseItem.updated}</td>
                    <td className="p-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2"
                        onClick={() => toast.message("Actions", { description: `More actions for ${caseItem.id}` })}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                        Actions
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Cases;
