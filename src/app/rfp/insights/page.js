'use client';
import { Brain, Beaker, DollarSign, AlertTriangle, TrendingUp, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockRFPs } from '@/data/mockData';

export default function InsightsPage() {
    const rfp = mockRFPs[0];
    const insights = rfp.aiInsights;

    return (
        <div className="p-6 space-y-6">
            <div><h1 className="text-2xl font-bold flex items-center gap-2"><Brain className="h-6 w-6 text-primary" /> AI Insights Panel</h1><p className="text-muted-foreground">{rfp.title}</p></div>

            <Tabs defaultValue="technical" className="space-y-4">
                <TabsList className="grid grid-cols-3 w-fit"><TabsTrigger value="technical"><Beaker className="h-4 w-4 mr-2" />Technical</TabsTrigger><TabsTrigger value="pricing"><DollarSign className="h-4 w-4 mr-2" />Pricing</TabsTrigger><TabsTrigger value="risk"><AlertTriangle className="h-4 w-4 mr-2" />Risk</TabsTrigger></TabsList>

                <TabsContent value="technical">
                    <Card className="border-border/50">
                        <CardHeader><CardTitle className="text-base">Technical Evaluation</CardTitle><CardDescription>AI-powered technical assessment</CardDescription></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4"><span className="text-4xl font-bold text-primary">{insights.technicalScore}</span><div className="flex-1"><p className="text-sm text-muted-foreground mb-1">Technical Feasibility Score</p><Progress value={insights.technicalScore} className="h-2" /></div></div>
                            <div className="grid md:grid-cols-2 gap-4">{['Vendor technical capability verified', 'Integration complexity: Medium', 'Resource requirements identified', 'Timeline feasibility: High'].map((item, i) => <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50"><CheckCircle className="h-4 w-4 text-green-500" /><span className="text-sm">{item}</span></div>)}</div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pricing">
                    <Card className="border-border/50">
                        <CardHeader><CardTitle className="text-base">Pricing & Margin Analysis</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="p-4 rounded-lg bg-secondary/50 text-center"><p className="text-2xl font-bold text-primary">{insights.pricingAnalysis.competitiveness}%</p><p className="text-sm text-muted-foreground">Competitiveness</p></div>
                                <div className="p-4 rounded-lg bg-secondary/50 text-center"><p className="text-2xl font-bold text-green-500">{insights.pricingAnalysis.marginEstimate}%</p><p className="text-sm text-muted-foreground">Est. Margin</p></div>
                                <div className="p-4 rounded-lg bg-secondary/50 text-center"><p className="text-2xl font-bold">{rfp.estimatedBudget}</p><p className="text-sm text-muted-foreground">{rfp.budgetUnit}</p></div>
                            </div>
                            <div className="p-4 rounded-lg border border-primary/30 bg-primary/5"><p className="text-sm">{insights.pricingAnalysis.recommendation}</p></div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="risk">
                    <Card className="border-border/50">
                        <CardHeader><CardTitle className="text-base">Risk Assessment & Go/No-Go</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5">
                                <div><p className="font-semibold">Recommendation</p><p className="text-sm text-muted-foreground">Based on {insights.riskAssessment.confidence}% confidence</p></div>
                                <Badge variant={insights.riskAssessment.goNoGo === 'go' ? 'success' : insights.riskAssessment.goNoGo === 'no-go' ? 'destructive' : 'warning'} className="text-lg px-4 py-1">{insights.riskAssessment.goNoGo.toUpperCase()}</Badge>
                            </div>
                            <div><p className="text-sm font-medium mb-2">Risk Factors</p><div className="space-y-2">{insights.riskAssessment.factors.map((f, i) => <div key={i} className="flex items-center gap-2 p-2 rounded bg-destructive/10"><AlertTriangle className="h-4 w-4 text-yellow-500" /><span className="text-sm">{f}</span></div>)}</div></div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
