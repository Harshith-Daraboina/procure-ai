'use client';
import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function UploadRFPPage() {
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [parsed, setParsed] = useState(false);

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        for (let i = 0; i <= 100; i += 10) { await new Promise(r => setTimeout(r, 200)); setProgress(i); }
        setUploading(false);
        setParsed(true);
        toast.success('Document Parsed', { description: 'Metadata extracted successfully' });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2"><Upload className="h-6 w-6 text-primary" /> Upload RFP</h1>
                <p className="text-muted-foreground">Upload and parse RFP documents for processing</p>
            </div>

            <Card className="border-border/50">
                <CardContent className="p-8">
                    <div className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${file ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                        <input type="file" id="file" className="hidden" accept=".pdf,.docx,.xlsx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                        <label htmlFor="file" className="cursor-pointer">
                            {file ? <>
                                <FileText className="h-16 w-16 mx-auto text-primary mb-4" />
                                <p className="font-medium">{file.name}</p>
                                <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </> : <>
                                <Upload className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                <p className="font-medium">Drop files here or click to upload</p>
                                <p className="text-sm text-muted-foreground">PDF, DOCX, XLSX supported</p>
                            </>}
                        </label>
                    </div>
                    {uploading && <div className="mt-4"><Progress value={progress} className="h-2" /><p className="text-sm text-center mt-2 text-muted-foreground">Processing... {progress}%</p></div>}
                    {file && !uploading && !parsed && <Button className="w-full mt-4" onClick={handleUpload}>Process Document</Button>}
                </CardContent>
            </Card>

            {parsed && (
                <Card className="border-green-500/50 bg-green-500/5">
                    <CardHeader><CardTitle className="text-base flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Extracted Metadata</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        {[['Title', 'Cloud Infrastructure Migration RFP'], ['Vendor', 'Tech Solutions Ltd'], ['Value', '₹85 Lakhs'], ['Category', 'Software'], ['Deadline', '15 Feb 2024'], ['Pages', '24']].map(([k, v]) => (
                            <div key={k} className="flex justify-between p-2 rounded bg-secondary/50"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>
                        ))}
                        <Button className="md:col-span-2" onClick={() => router.push('/rfp/classification')}>Continue to Classification</Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
