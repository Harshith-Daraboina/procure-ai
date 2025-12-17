'use client';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockRFPs } from '@/data/mockData';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function RFPDiscoveryPage() {
    const router = useRouter();

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Search className="h-6 w-6 text-primary" /> RFP Discovery
                    </h1>
                    <p className="text-muted-foreground">Find and analyze new opportunities</p>
                </div>
                <Button onClick={() => toast.info('Scanning for new sources...')}>
                    Scan New Sources
                </Button>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search RFPs by keywords, creating agency..." className="pl-10" />
                </div>
                <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" /> Filters
                </Button>
            </div>

            <div className="space-y-4">
                {mockRFPs.map((rfp) => (
                    <Card key={rfp.id} className="border-border/50 hover:border-primary/50 transition-colors">
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono text-muted-foreground">{rfp.id}</span>
                                        <Badge variant="outline">{rfp.category}</Badge>
                                        <Badge variant={rfp.urgency === 'high' ? 'destructive' : 'secondary'}>{rfp.urgency}</Badge>
                                    </div>
                                    <h3 className="font-semibold text-lg">{rfp.title}</h3>
                                    <p className="text-sm text-muted-foreground">{rfp.department} • Budget: {rfp.estimatedBudget} {rfp.budgetUnit}</p>
                                </div>
                                <Button variant="secondary" onClick={() => router.push(`/rfp/insights`)}>
                                    View Insights <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
