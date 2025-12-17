import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

        let rfpData = null;
        const body = await request.json();

        if (body.rfpData) {
            rfpData = body.rfpData;
        } else {
            // 1. Trigger Sales Agent (RFP Discovery)
            const salesRes = await fetch(`${baseUrl}/api/agents/sales`, {
                method: 'POST', body: JSON.stringify({})
            });
            rfpData = await salesRes.json();
        }

        if (!rfpData || !rfpData.scopeOfSupply) {
            throw new Error("Sales agent failed to find RFP");
        }

        // 2. Trigger Technical Agent
        const techRes = await fetch(`${baseUrl}/api/agents/technical`, {
            method: 'POST',
            body: JSON.stringify({ scopeOfSupply: rfpData.scopeOfSupply })
        });
        const techData = await techRes.json();

        // 3. Trigger Pricing Agent
        const pricingRes = await fetch(`${baseUrl}/api/agents/pricing`, {
            method: 'POST',
            body: JSON.stringify({
                selectedItems: techData.matches,
                testingRequirements: rfpData.testingRequirements
            })
        });
        const pricingData = await pricingRes.json();

        // 4. Consolidate Proposal (Main Agent Logic)
        const proposal = {
            rfpTitle: rfpData.rfpTitle,
            dueDate: rfpData.dueDate,
            technicalAnalysis: techData.matches,
            pricingAnalysis: pricingData,
            status: "Draft",
            confidenceLevel: "High", // Mock
            riskScore: 15 // Mock
        };

        // Save to DB (mock for now, or use Prisma if DB is connected)
        // await prisma.proposal.create({ ... })

        return NextResponse.json({ success: true, proposal });

    } catch (error) {
        console.error("Orchestrator Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
