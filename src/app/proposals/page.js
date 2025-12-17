'use client';
import { FileOutput, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockProposals } from '@/data/mockData';
import { toast } from 'sonner';

export default function ProposalsPage() {
    return (
        <div className="p-6 space-y-6">
            <div><h1 className="text-2xl font-bold flex items-center gap-2"><FileOutput className="h-6 w-6 text-primary" /> Proposals</h1><p className="text-muted-foreground">Generated proposal documents</p></div>

            <div className="grid md:grid-cols-2 gap-4">
                {mockProposals.map((proposal) => (
                    <Card key={proposal.id} className="border-border/50">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between"><CardTitle className="text-base">{proposal.title}</CardTitle><Badge variant={proposal.status === 'finalized' ? 'success' : 'warning'}>{proposal.status}</Badge></div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground line-clamp-2">{proposal.executiveSummary}</p>
                            <div className="flex items-center justify-between p-2 rounded bg-secondary/50"><span className="text-sm text-muted-foreground">Total Value</span><span className="font-mono font-semibold">₹{(proposal.commercials.totalValue / 100000).toFixed(1)}L</span></div>
                            <div className="flex gap-2"><Button size="sm" variant="outline"><Eye className="h-4 w-4 mr-1" />Preview</Button><Button size="sm" onClick={() => toast.success('Downloading...')}><Download className="h-4 w-4 mr-1" />Download</Button></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
