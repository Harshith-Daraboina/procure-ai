'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Zap, Mail, Lock, ChevronRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import Link from 'next/link';

const roles = [
    { value: 'requestor', label: 'Requestor', description: 'Submit RFP requests' },
    { value: 'procurement', label: 'Procurement', description: 'Process workflows' },
    { value: 'finance', label: 'Finance', description: 'Approve budgets' },
    { value: 'executive', label: 'Executive', description: 'Strategic oversight' },
];

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState('procurement');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role: selectedRole })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Account created successfully', {
                    description: 'You can now sign in with your new account.',
                });
                router.push('/login');
            } else {
                toast.error('Signup failed', {
                    description: data.error || 'Something went wrong.',
                });
            }
        } catch (err) {
            toast.error('Network error', { description: 'Could not connect to server.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background grid-pattern flex items-center justify-center p-4">
            {/* Background effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-glow">
                        <Zap className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h1 className="text-3xl font-bold">
                        Procure<span className="text-primary">AI</span>
                    </h1>
                </div>

                <Card className="border-border/50 bg-card/80 backdrop-blur">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>Get started with enterprise procurement</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignup} className="space-y-6">
                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john.doe@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-3">
                                <Label>Select your role</Label>
                                <RadioGroup
                                    value={selectedRole}
                                    onValueChange={(v) => setSelectedRole(v)}
                                    className="grid grid-cols-2 gap-3"
                                >
                                    {roles.map((role) => (
                                        <Label
                                            key={role.value}
                                            htmlFor={role.value}
                                            className={`flex flex-col cursor-pointer rounded-lg border p-3 transition-all ${selectedRole === role.value
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                                                }`}
                                        >
                                            <RadioGroupItem value={role.value} id={role.value} className="sr-only" />
                                            <span className="font-medium text-sm">{role.label}</span>
                                            <span className="text-xs text-muted-foreground line-clamp-1">
                                                {role.description}
                                            </span>
                                        </Label>
                                    ))}
                                </RadioGroup>
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        Creating account...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Create Account
                                        <ChevronRight className="h-4 w-4" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-muted-foreground">Already have an account? </span>
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Sign in
                            </Link>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
