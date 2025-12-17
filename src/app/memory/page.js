'use client';
import { Database, TrendingUp, TrendingDown, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockMemoryRecords } from '@/data/mockData';

export default function MemoryPage() {
    return (
        <div className="p-6 space-y-6">
            <div><h1 className="text-2xl font-bold flex items-center gap-2"><Database className="h-6 w-6 text-primary" /> Memory & History</h1><p className="text-muted-foreground">Past decisions and learnings for AI improvement</p></div>

            <div className="grid gap-4">
                {mockMemoryRecords.map((record) => (
                    <Card key={record.id} className="border-border/50">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${record.outcome === 'won' ? 'bg-green-500/20' : 'bg-destructive/20'}`}>
                                    {record.outcome === 'won' ? <TrendingUp className="h-5 w-5 text-green-500" /> : <TrendingDown className="h-5 w-5 text-destructive" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1"><span className="font-mono text-xs text-muted-foreground">{record.rfpId}</span><Badge variant={record.outcome === 'won' ? 'success' : 'destructive'}>{record.outcome}</Badge></div>
                                    <h3 className="font-semibold">{record.rfpTitle}</h3>
                                    <p className="text-sm text-muted-foreground">{record.category} • {record.vendor}</p>
                                    <div className="mt-2 flex gap-4 text-sm"><span>Value: <span className="font-mono text-primary">₹{(record.finalValue / 10000000).toFixed(1)}Cr</span></span><span>Range: <span className="font-mono">₹{(record.pricingBand.min / 10000000).toFixed(1)}-{(record.pricingBand.max / 10000000).toFixed(1)}Cr</span></span></div>
                                    <div className="mt-2 flex flex-wrap gap-1">{record.lessons.map((l, i) => <Badge key={i} variant="outline" className="text-xs">{l}</Badge>)}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
