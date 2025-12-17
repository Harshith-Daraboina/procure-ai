'use client';
import { Tags, Check, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockRFPs } from '@/data/mockData';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ClassificationPage() {
    const router = useRouter();

    return (
        <div className="p-6 space-y-6">
            <div><h1 className="text-2xl font-bold flex items-center gap-2"><Tags className="h-6 w-6 text-primary" /> Classification & Spend View</h1><p className="text-muted-foreground">Review and approve AI classifications</p></div>

            <div className="space-y-4">
                {mockRFPs.map((rfp) => (
                    <Card key={rfp.id} className="border-border/50 hover:border-primary/30 transition-colors">
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-mono text-xs text-muted-foreground">{rfp.id}</span>
                                        <Badge variant={rfp.urgency === 'high' ? 'destructive' : rfp.urgency === 'medium' ? 'warning' : 'secondary'}>{rfp.urgency}</Badge>
                                    </div>
                                    <h3 className="font-semibold">{rfp.title}</h3>
                                    <p className="text-sm text-muted-foreground">{rfp.department} • {rfp.estimatedBudget} {rfp.budgetUnit}</p>
                                </div>
                                <div className="grid grid-cols-4 gap-6 text-center">
                                    <div><p className="text-xs text-muted-foreground">Category</p><Badge variant="outline">{rfp.category}</Badge></div>
                                    <div><p className="text-xs text-muted-foreground">Spend</p><Badge variant={rfp.spendType === 'CAPEX' ? 'info' : 'secondary'}>{rfp.spendType}</Badge></div>
                                    <div><p className="text-xs text-muted-foreground">Complexity</p><Badge variant={rfp.complexity === 'critical' ? 'destructive' : rfp.complexity === 'high' ? 'warning' : 'success'}>{rfp.complexity}</Badge></div>
                                    <div><p className="text-xs text-muted-foreground">Risk</p><span className={`font-mono text-sm ${rfp.riskScore >= 70 ? 'text-destructive' : rfp.riskScore >= 40 ? 'text-yellow-500' : 'text-green-500'}`}>{rfp.riskScore}</span></div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => toast.info('Classification rejected')}><X className="h-4 w-4" /></Button>
                                    <Button size="sm" onClick={() => { toast.success('Classification approved'); router.push('/rfp/insights'); }}><Check className="h-4 w-4 mr-1" />Accept</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
