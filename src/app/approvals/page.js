'use client';
import { CheckSquare, Check, X, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockApprovals } from '@/data/mockData';
import { toast } from 'sonner';

export default function ApprovalsPage() {
    return (
        <div className="p-6 space-y-6">
            <div><h1 className="text-2xl font-bold flex items-center gap-2"><CheckSquare className="h-6 w-6 text-primary" /> Approval Workflow</h1><p className="text-muted-foreground">Review and approve pending requests</p></div>

            <div className="space-y-4">
                {mockApprovals.map((approval) => (
                    <Card key={approval.id} className="border-border/50">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-6">
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${approval.riskScore >= 70 ? 'bg-destructive/20' : approval.riskScore >= 40 ? 'bg-yellow-500/20' : 'bg-green-500/20'}`}>
                                    {approval.riskScore >= 70 ? <AlertTriangle className="h-6 w-6 text-destructive" /> : <Clock className="h-6 w-6 text-yellow-500" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1"><Badge variant="outline" className="font-mono">{approval.level}</Badge><span className="text-xs text-muted-foreground">{approval.id}</span></div>
                                    <h3 className="font-semibold text-lg">{approval.rfpTitle}</h3>
                                    <p className="text-sm text-muted-foreground">Requested by {approval.requestedBy} • {new Date(approval.requestedAt).toLocaleDateString()}</p>
                                    <div className="mt-3 p-3 rounded-lg bg-secondary/50 text-sm">{approval.aiSummary}</div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`font-mono text-lg font-bold ${approval.riskScore >= 70 ? 'text-destructive' : approval.riskScore >= 40 ? 'text-yellow-500' : 'text-green-500'}`}>Risk: {approval.riskScore}</span>
                                    <div className="flex gap-2 mt-2">
                                        <Button variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => toast.error('Rejected')}><X className="h-4 w-4 mr-1" />Reject</Button>
                                        <Button onClick={() => toast.success('Approved!')} className="bg-green-600 hover:bg-green-700"><Check className="h-4 w-4 mr-1" />Approve</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
