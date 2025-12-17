'use client';
import {
    FileText,
    Clock,
    AlertTriangle,
    TrendingUp,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Target,
    Users,
    Zap,
    BarChart3
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { dashboardStats, mockRFPs, mockApprovals } from '@/data/mockData';
import { useRouter } from 'next/navigation';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const trendData = [
    { month: 'Aug', rfps: 32, value: 85 },
    { month: 'Sep', rfps: 28, value: 72 },
    { month: 'Oct', rfps: 45, value: 120 },
    { month: 'Nov', rfps: 38, value: 95 },
    { month: 'Dec', rfps: 52, value: 145 },
    { month: 'Jan', rfps: 47, value: 152 },
];

const categoryData = [
    { name: 'Software', value: 35, color: 'hsl(187, 92%, 50%)' },
    { name: 'Machinery', value: 28, color: 'hsl(142, 70%, 45%)' },
    { name: 'Services', value: 20, color: 'hsl(38, 92%, 55%)' },
    { name: 'Facilities', value: 17, color: 'hsl(280, 70%, 55%)' },
];

const statusData = [
    { status: 'Draft', count: 5 },
    { status: 'Review', count: 12 },
    { status: 'Approval', count: 8 },
    { status: 'Active', count: 15 },
    { status: 'Complete', count: 7 },
];

export default function DashboardPage() {
    const router = useRouter();

    const formatCurrency = (value) => {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(1)}Cr`;
        }
        return `₹${(value / 100000).toFixed(1)}L`;
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Command Center</h1>
                    <p className="text-muted-foreground">Real-time procurement intelligence</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        Live
                    </Badge>
                    <span className="text-sm text-muted-foreground font-mono">
                        {new Date().toLocaleString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                <Card className="stat-card border-border/50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <FileText className="h-5 w-5 text-primary" />
                            <Badge variant="success" className="text-xs">+12%</Badge>
                        </div>
                        <div className="mt-3">
                            <p className="text-3xl font-bold font-mono">{dashboardStats.totalRFPs}</p>
                            <p className="text-sm text-muted-foreground">Total RFPs</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="stat-card border-border/50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <Clock className="h-5 w-5 text-yellow-500" />
                            <Badge variant="warning" className="text-xs">Action</Badge>
                        </div>
                        <div className="mt-3">
                            <p className="text-3xl font-bold font-mono">{dashboardStats.pendingApprovals}</p>
                            <p className="text-sm text-muted-foreground">Pending Approvals</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="stat-card border-border/50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <Activity className="h-5 w-5 text-blue-500" />
                            <span className="text-xs text-muted-foreground">days</span>
                        </div>
                        <div className="mt-3">
                            <p className="text-3xl font-bold font-mono">{dashboardStats.avgProcessingTime}</p>
                            <p className="text-sm text-muted-foreground">Avg Process Time</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="stat-card border-border/50 border-destructive/30">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                            <Badge variant="critical" className="text-xs">Alert</Badge>
                        </div>
                        <div className="mt-3">
                            <p className="text-3xl font-bold font-mono text-destructive">{dashboardStats.highRiskAlerts}</p>
                            <p className="text-sm text-muted-foreground">High Risk</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="stat-card border-border/50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <Target className="h-5 w-5 text-green-500" />
                            <div className="flex items-center gap-1 text-green-500 text-xs">
                                <ArrowUpRight className="h-3 w-3" />
                                5%
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-3xl font-bold font-mono">{dashboardStats.winRate}%</p>
                            <p className="text-sm text-muted-foreground">Win Rate</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="stat-card border-border/50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <span className="text-xs text-muted-foreground">YTD</span>
                        </div>
                        <div className="mt-3">
                            <p className="text-3xl font-bold font-mono">{formatCurrency(dashboardStats.totalValue)}</p>
                            <p className="text-sm text-muted-foreground">Total Value</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-4">
                {/* Trend Chart */}
                <Card className="lg:col-span-2 border-border/50">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base">RFP Trend</CardTitle>
                                <CardDescription>Volume and value over time</CardDescription>
                            </div>
                            <div className="flex gap-4 text-xs">
                                <span className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-primary" />
                                    RFPs
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-green-500" />
                                    Value (L)
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData}>
                                    <defs>
                                        <linearGradient id="colorRfps" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(187, 92%, 50%)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(187, 92%, 50%)" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
                                    <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                                    <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                                    <Area
                                        type="monotone"
                                        dataKey="rfps"
                                        stroke="hsl(187, 92%, 50%)"
                                        fillOpacity={1}
                                        fill="url(#colorRfps)"
                                        strokeWidth={2}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="hsl(142, 70%, 45%)"
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card className="border-border/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">By Category</CardTitle>
                        <CardDescription>RFP distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[140px] flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={60}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {categoryData.map((cat) => (
                                <div key={cat.name} className="flex items-center gap-2 text-xs">
                                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                                    <span className="text-muted-foreground">{cat.name}</span>
                                    <span className="ml-auto font-mono">{cat.value}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Pipeline Status */}
                <Card className="border-border/50">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Pipeline Status</CardTitle>
                            <Badge variant="outline" className="font-mono text-xs">47 Active</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[160px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={statusData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" horizontal={false} />
                                    <XAxis type="number" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                                    <YAxis dataKey="status" type="category" stroke="hsl(215, 20%, 55%)" fontSize={12} width={60} />
                                    <Bar dataKey="count" fill="hsl(187, 92%, 50%)" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent RFPs */}
                <Card className="border-border/50">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Recent Activity</CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => router.push('/rfp/classification')}>
                                View all
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {mockRFPs.slice(0, 4).map((rfp) => (
                            <div
                                key={rfp.id}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer data-row"
                                onClick={() => router.push(`/rfp/${rfp.id}`)}
                            >
                                <div
                                    className={`h-2 w-2 rounded-full ${rfp.riskScore >= 70
                                            ? 'bg-destructive'
                                            : rfp.riskScore >= 40
                                                ? 'bg-yellow-500' // Warning
                                                : 'bg-green-500' // Success
                                        }`}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{rfp.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {rfp.department} • {rfp.estimatedBudget} {rfp.budgetUnit}
                                    </p>
                                </div>
                                <Badge
                                    variant={
                                        rfp.status === 'approved'
                                            ? 'success'
                                            : rfp.status === 'pending_approval'
                                                ? 'warning'
                                                : rfp.status === 'rejected'
                                                    ? 'destructive'
                                                    : 'secondary'
                                    }
                                    className="text-xs"
                                >
                                    {rfp.status.replace('_', ' ')}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Pending Approvals */}
            {mockApprovals.length > 0 && (
                <Card className="border-yellow-500/30 bg-yellow-500/5">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-yellow-500" />
                            <CardTitle className="text-base">Pending Your Approval</CardTitle>
                            <Badge variant="warning" className="ml-auto">{mockApprovals.length} items</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-3">
                            {mockApprovals.map((approval) => (
                                <div
                                    key={approval.id}
                                    className="p-3 rounded-lg border border-border bg-card hover:border-primary/50 transition-all cursor-pointer"
                                    onClick={() => router.push('/approvals')}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <Badge variant="outline" className="font-mono text-xs">
                                            {approval.level}
                                        </Badge>
                                        <span className={`text-xs font-mono ${approval.riskScore >= 70 ? 'text-destructive' :
                                                approval.riskScore >= 40 ? 'text-yellow-500' : 'text-green-500'
                                            }`}>
                                            Risk: {approval.riskScore}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium truncate">{approval.rfpTitle}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Requested by {approval.requestedBy}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
