'use client';
import { useState } from 'react';
import { Sparkles, Wand2, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { categories } from '@/data/mockData';
import { toast } from 'sonner';

export default function GenerateRFTPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generated, setGenerated] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);
        await new Promise(r => setTimeout(r, 2500));
        setIsGenerating(false);
        setGenerated(true);
        toast.success('RFT Generated!', { description: 'Review the AI-generated content below' });
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" /> Generate RFT with AI
                </h1>
                <p className="text-muted-foreground">Let AI create comprehensive RFT documents</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-border/50">
                    <CardHeader><CardTitle className="text-base">Input Parameters</CardTitle><CardDescription>Define the scope for AI generation</CardDescription></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2"><Label>Category</Label>
                            <Select><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                                <SelectContent>{categories.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2"><Label>Budget Range</Label>
                            <Select><SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                                <SelectContent><SelectItem value="small">Under 50 Lakhs</SelectItem><SelectItem value="medium">50L - 2Cr</SelectItem><SelectItem value="large">Above 2Cr</SelectItem></SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2"><Label>Urgency</Label>
                            <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2"><Label>Additional Context</Label><Textarea placeholder="Any specific requirements..." rows={3} /></div>
                        <Button className="w-full" size="lg" onClick={handleGenerate} disabled={isGenerating}>
                            {isGenerating ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />Generating...</> : <><Wand2 className="h-4 w-4 mr-2" />Generate RFT</>}
                        </Button>
                    </CardContent>
                </Card>

                <Card className={`border-border/50 ${generated ? 'border-green-500/50' : ''}`}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Generated Output</CardTitle>
                            {generated && <Badge variant="success"><CheckCircle className="h-3 w-3 mr-1" />Ready</Badge>}
                        </div>
                    </CardHeader>
                    <CardContent>
                        {generated ? (
                            <div className="space-y-4 text-sm">
                                <div><h4 className="font-semibold text-primary mb-1">Scope</h4><p className="text-muted-foreground">Implementation of enterprise-grade cloud infrastructure with multi-region redundancy, automated scaling, and 99.99% uptime SLA.</p></div>
                                <div><h4 className="font-semibold text-primary mb-1">Technical Specifications</h4><ul className="list-disc list-inside text-muted-foreground space-y-1"><li>Kubernetes-based container orchestration</li><li>CI/CD pipeline integration</li><li>Real-time monitoring and alerting</li></ul></div>
                                <div><h4 className="font-semibold text-primary mb-1">Evaluation Criteria</h4><div className="grid grid-cols-2 gap-2">{['Technical Capability (30%)', 'Price (25%)', 'Experience (20%)', 'Support (25%)'].map(c => <Badge key={c} variant="outline" className="justify-start">{c}</Badge>)}</div></div>
                                <div className="flex gap-2 pt-2"><Button size="sm">Use This RFT</Button><Button size="sm" variant="outline">Download DOCX</Button></div>
                            </div>
                        ) : (
                            <div className="h-64 flex items-center justify-center text-muted-foreground">
                                <div className="text-center"><FileText className="h-12 w-12 mx-auto mb-2 opacity-30" /><p>Configure parameters and generate</p></div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
