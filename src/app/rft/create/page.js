'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Building2, DollarSign, Clock, Shield, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/mockData';
import { toast } from 'sonner';

export default function CreateRFTPage() {
    const router = useRouter();
    const [category, setCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 1000));
        toast.success('RFT Created Successfully', { description: 'Redirecting to classification...' });
        setIsSubmitting(false);
        router.push('/rfp/classification');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <FileText className="h-6 w-6 text-primary" /> Create RFT / RFP
                </h1>
                <p className="text-muted-foreground">Submit a new request for tender or proposal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="border-border/50">
                    <CardHeader><CardTitle className="text-base flex items-center gap-2"><Building2 className="h-4 w-4" /> Company Context</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Department</Label>
                            <Select required><SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                                <SelectContent>{['Manufacturing', 'IT', 'HR', 'Facilities', 'Logistics'].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select value={category} onValueChange={setCategory} required><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                                <SelectContent>{categories.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50">
                    <CardHeader><CardTitle className="text-base flex items-center gap-2"><DollarSign className="h-4 w-4" /> Budget & Timeline</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2"><Label>Estimated Budget</Label><Input type="number" placeholder="Enter amount" required /></div>
                        <div className="space-y-2"><Label>Unit</Label>
                            <Select defaultValue="lakhs"><SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent><SelectItem value="lakhs">Lakhs INR</SelectItem><SelectItem value="crores">Crores INR</SelectItem></SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2"><Label>Urgency</Label>
                            <Select required><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50">
                    <CardHeader><CardTitle className="text-base">Use Case & Requirements</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2"><Label>Title</Label><Input placeholder="Brief descriptive title" required /></div>
                        <div className="space-y-2"><Label>Use Case Description</Label><Textarea placeholder="Describe the business need..." rows={4} required /></div>
                        <div className="space-y-2"><Label>Timeline</Label><Input placeholder="e.g., 6 months" required /></div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => router.push('/dashboard')}>Cancel</Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : <><Send className="h-4 w-4 mr-2" /> Submit RFT</>}
                    </Button>
                </div>
            </form>
        </div>
    );
}
