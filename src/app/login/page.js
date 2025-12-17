'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Zap, Mail, Lock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

const roles = [
    { value: 'requestor', label: 'Requestor', description: 'Create and submit RFT/RFP requests' },
    { value: 'procurement', label: 'Procurement', description: 'Manage and process procurement workflows' },
    { value: 'finance', label: 'Finance', description: 'Review budgets and approve financials' },
    { value: 'executive', label: 'Executive', description: 'Final approvals and strategic oversight' },
];

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState('procurement');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Using NextAuth for real authentication
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            // We pass the role so the backend could theoretically use it, 
            // though typically auth determines role from DB. 
            // For this demo, we'll assume the user is logging in AS this role.
            role: selectedRole
        });

        if (result?.ok) {
            toast.success('Login successful', {
                description: `Welcome back! Logged in as ${selectedRole}`,
            });
            router.push('/dashboard');
        } else {
            toast.error('Login failed', {
                description: "Invalid credentials. Try admin@procure.ai / admin"
            });
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
                        <CardTitle className="text-2xl">Welcome back</CardTitle>
                        <CardDescription>Sign in to your account to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-6">
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
                                        Signing in...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Sign in
                                        <ChevronRight className="h-4 w-4" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Forgot password?
                            </button>
                        </div>

                        <div className="mt-2 text-center text-sm">
                            <span className="text-muted-foreground">Don't have an account? </span>
                            <a href="/signup" className="text-primary hover:underline font-medium">
                                Sign up
                            </a>
                        </div>

                        <div className="mt-4 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full mt-4" type="button">
                            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Azure AD / SSO
                        </Button>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-muted-foreground mt-6">
                    Enterprise Procurement Intelligence Platform
                </p>
            </div>
        </div>
    );
}
