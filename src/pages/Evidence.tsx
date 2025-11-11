import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Image, File, Loader2, CheckCircle, History, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/PageHeader";
import { CardHeader, CardTitle } from "@/components/ui/card";

const Evidence = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; type: string } | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const recentHistory = [
    { name: "forensic_memory_dump_2205.bin", time: "Today, 09:42 AM" },
    { name: "phishing_email_headers_2201.eml", time: "Today, 08:57 AM" },
    { name: "upi_mule_accounts_2210.csv", time: "Yesterday, 6:21 PM" },
    { name: "wallet_drain_flow_2205.json", time: "Yesterday, 3:47 PM" },
    { name: "sim_swap_logs_2204.txt", time: "Mon, 11:18 AM" },
  ];
  const reRun = (name: string) => {
    if (!uploadedFile) {
      toast.message("Re-run", { description: `Re-analyzing ${name}` });
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisResult({
          keywords: ["re-run", "pattern-match"],
          category: "Re-analysis",
          riskScore: 72,
          sentiment: "Medium Risk",
        });
      }, 2000);
      return;
    }
    handleAnalyze();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({ name: file.name, type: file.type });
      toast.success("File uploaded successfully!");
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        keywords: ["fraud", "cybercrime", "digital evidence"],
        category: "Financial Crime",
        riskScore: 87,
        sentiment: "High Risk",
      });
      toast.success("Analysis complete!");
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Upload & Analyze Evidence"
          description="Upload case evidence for AI-powered analysis"
          crumbs={[{ label: "Home", href: "/dashboard" }, { label: "Evidence", current: true }]}
          actions={
            <Button variant="outline" className="gap-2" onClick={() => window.location.reload()}>
              <History className="w-4 h-4" />
              Clear Session
            </Button>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground">Upload</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-6">
                {/* Upload Zone */}
                <div
                  className="border-2 border-dashed border-primary/30 rounded-xl p-12 text-center hover:border-primary/60 transition-all duration-300 bg-background"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      setUploadedFile({ name: file.name, type: file.type });
                      toast.success("File dropped successfully!");
                    }
                  }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-primary/10">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Upload Evidence</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop files or click to browse
                      </p>
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept="image/*,.pdf,.txt,.doc,.docx"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("file-upload")?.click()}
                        className=""
                      >
                        Select File
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Supported: Images, PDF, Text, Documents
                    </p>
                  </div>
                </div>

                {/* Uploaded File Preview */}
                {uploadedFile && (
                  <Card className="bg-background border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            {uploadedFile.type.startsWith("image/") ? (
                              <Image className="w-5 h-5 text-primary" />
                            ) : uploadedFile.type.includes("pdf") ? (
                              <FileText className="w-5 h-5 text-primary" />
                            ) : (
                              <File className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{uploadedFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded {new Date().toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      </div>

                      <Button
                        variant="hero"
                        className="w-full mt-4"
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Analyzing...
                          </>
                        ) : (
                          "Analyze File"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">AI Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              {!analysisResult && !isAnalyzing && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Upload and analyze a file to see results</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Scanning document...</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-primary animate-pulse" style={{ width: "60%" }}></div>
                  </div>
                </div>
              )}

              {analysisResult && (
                <div className="space-y-4">
                  {/* Risk Score */}
                  <Card className="bg-background border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Risk Score</span>
                        <span className="text-2xl font-bold text-primary">{analysisResult.riskScore}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary"
                          style={{ width: `${analysisResult.riskScore}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Category */}
                  <Card className="bg-background border-border">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">Category</p>
                      <p className="text-lg font-semibold text-foreground">{analysisResult.category}</p>
                    </CardContent>
                  </Card>

                  {/* Keywords */}
                  <Card className="bg-background border-border">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-3">Extracted Keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywords.map((keyword: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm border border-primary/50"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sentiment */}
                  <Card className="bg-background border-border">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">Assessment</p>
                      <p className="text-lg font-semibold text-amber-500">{analysisResult.sentiment}</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Secondary Grid: History and Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-3">
                {recentHistory.map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-md border border-border p-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <File className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-foreground">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.time}</div>
                      </div>
                    </div>
                <Button variant="outline" size="sm" onClick={() => reRun(item.name)}>Re-run</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Evidence Tips</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="flex items-start gap-3 rounded-md border border-border p-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <HelpCircle className="w-4 h-4 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">
                  For best results, upload original files. Avoid screenshots of documents; prefer PDFs or raw text.
                </div>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                Supported: Images, PDF, Text, Documents. Max 25MB per file.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Evidence;
