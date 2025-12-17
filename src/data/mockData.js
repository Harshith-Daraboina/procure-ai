export const dashboardStats = {
    totalRFPs: 156,
    pendingApprovals: 8,
    avgProcessingTime: '3.2',
    highRiskAlerts: 3,
    winRate: 68,
    totalValue: 124500000,
};

export const mockRFPs = [
    {
        id: 'RFP-2024-001',
        title: 'Cloud Infrastructure Migration',
        department: 'IT Infrastructure',
        estimatedBudget: 85,
        budgetUnit: 'Lakhs',
        status: 'pending_approval',
        riskScore: 45,
        urgency: 'high',
        category: 'Software',
        spendType: 'CAPEX',
        complexity: 'high',
        aiInsights: {
            technicalScore: 88,
            pricingAnalysis: {
                competitiveness: 92,
                marginEstimate: 18,
                recommendation: 'Pricing is within 5% of market benchmark. Strong positive signal.'
            },
            riskAssessment: {
                confidence: 94,
                goNoGo: 'go',
                factors: ['Vendor stability verified', 'Clear SLA definitions']
            }
        }
    },
    {
        id: 'RFP-2024-002',
        title: 'Industrial Pump Procurement',
        department: 'Manufacturing',
        estimatedBudget: 45,
        budgetUnit: 'Lakhs',
        status: 'approved',
        riskScore: 12,
        urgency: 'medium',
        category: 'Machinery',
        spendType: 'CAPEX',
        complexity: 'medium',
        aiInsights: {
            technicalScore: 92,
            pricingAnalysis: {
                competitiveness: 85,
                marginEstimate: 22,
                recommendation: 'Technical specs well matched. Pricing slightly higher but justified.'
            },
            riskAssessment: {
                confidence: 98,
                goNoGo: 'go',
                factors: ['Standard specifications']
            }
        }
    },
    {
        id: 'RFP-2024-003',
        title: 'HR Management System Upgrade',
        department: 'HR',
        estimatedBudget: 25,
        budgetUnit: 'Lakhs',
        status: 'rejected',
        riskScore: 78,
        urgency: 'low',
        category: 'Software',
        spendType: 'OPEX',
        complexity: 'medium',
        aiInsights: {
            technicalScore: 65,
            pricingAnalysis: {
                competitiveness: 40,
                marginEstimate: 10,
                recommendation: 'Vendor lacks specific compliance certifications.'
            },
            riskAssessment: {
                confidence: 85,
                goNoGo: 'no-go',
                factors: ['Compliance mismatch', 'Timeline unrealistic']
            }
        }
    },
    {
        id: 'RFP-2024-004',
        title: 'Facility Security Services',
        department: 'Facilities',
        estimatedBudget: 12,
        budgetUnit: 'Lakhs',
        status: 'approved',
        riskScore: 25,
        urgency: 'high',
        category: 'Services',
        spendType: 'OPEX',
        complexity: 'low',
        aiInsights: {
            technicalScore: 90,
            pricingAnalysis: {
                competitiveness: 95,
                marginEstimate: 15,
                recommendation: 'Competitive bid from established vendor.'
            },
            riskAssessment: {
                confidence: 90,
                goNoGo: 'go',
                factors: []
            }
        }
    }
];

export const mockApprovals = [
    {
        id: 'APR-001',
        rfpTitle: 'Cloud Infrastructure Migration',
        requestedBy: 'Amit Patel',
        requestedAt: '2023-12-10T10:00:00Z',
        level: 'L2 Finance',
        riskScore: 45,
        aiSummary: 'Budget exceeds Q4 allocation by 10%. Technical justification is strong due to legacy system end-of-life.'
    },
    {
        id: 'APR-002',
        rfpTitle: 'Q1 Office Supplies Bulk Order',
        requestedBy: 'Sarah Jenkins',
        requestedAt: '2023-12-12T14:30:00Z',
        level: 'L1 Procurement',
        riskScore: 10,
        aiSummary: 'Standard replenishment. Volume discount applied (15%).'
    },
    {
        id: 'APR-003',
        rfpTitle: 'Hydraulic Press Replacement',
        requestedBy: 'Rajiv Kumar',
        requestedAt: '2023-12-11T09:15:00Z',
        level: 'L3 Executive',
        riskScore: 82,
        aiSummary: 'High capital expenditure. Single vendor source identified. Validated against market rates but supply chain risk is high.'
    }
];

export const categories = [
    { name: 'Software' },
    { name: 'Hardware' },
    { name: 'Machinery' },
    { name: 'Services' },
    { name: 'Facilities' },
    { name: 'Logistics' },
];

export const mockMemoryRecords = [
    {
        id: 'MEM-001',
        rfpId: 'RFP-2023-089',
        rfpTitle: 'CRM Implementation 2023',
        outcome: 'won',
        category: 'Software',
        vendor: 'Salesforce',
        finalValue: 45000000,
        pricingBand: { min: 40000000, max: 50000000 },
        lessons: ['Negotiated 3yr lock-in', 'Implementation partner critical']
    },
    {
        id: 'MEM-002',
        rfpId: 'RFP-2023-054',
        rfpTitle: 'Factory Automation A2',
        outcome: 'lost',
        category: 'Machinery',
        vendor: 'Siemens',
        finalValue: 120000000,
        pricingBand: { min: 90000000, max: 110000000 },
        lessons: ['Bid over budget by 20%', 'Underestimated integration costs']
    }
];

export const mockProposals = [
    {
        id: 'PROP-001',
        title: 'Proposal for Cloud Migration',
        client: 'Internal IT',
        status: 'finalized',
        executiveSummary: 'Comprehensive migration plan to AWS with 18-month ROI. Includes redundancy planning and legacy data archival.',
        commercials: {
            totalValue: 8500000
        }
    },
    {
        id: 'PROP-002',
        title: 'Fleet Maintenance Contract',
        client: 'Logistics Dept',
        status: 'draft',
        executiveSummary: 'Annual maintenance contract for delivery fleet. Includes quarterly preventative maintenance and 24/7 breakdown support.',
        commercials: {
            totalValue: 3200000
        }
    }
];
