import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const { selectedItems, testingRequirements } = await request.json(); // Array of { sku: 'ID', qty: 5 }

        const pricingPath = path.join(process.cwd(), 'src', 'data', 'pricing.json');
        const pricingData = JSON.parse(fs.readFileSync(pricingPath, 'utf8'));

        let totalMaterialCost = 0;
        let totalServiceCost = 0;
        const lineItems = [];

        // Calculate Material Cost
        selectedItems.forEach(item => {
            const priceInfo = pricingData[item.selected.sku];
            if (priceInfo) {
                const lineTotal = priceInfo.unitPrice * item.qty;
                totalMaterialCost += lineTotal;
                lineItems.push({
                    sku: item.selected.sku,
                    name: item.selected.name,
                    qty: item.qty,
                    unitPrice: priceInfo.unitPrice,
                    total: lineTotal
                });
            }
        });

        // Calculate Testing/Service Cost
        if (testingRequirements && Array.isArray(testingRequirements)) {
            testingRequirements.forEach(req => {
                if (pricingData.testing[req]) {
                    totalServiceCost += pricingData.testing[req];
                }
            });
        }

        const consolidated = {
            lineItems,
            materialCost: totalMaterialCost,
            serviceCost: totalServiceCost,
            totalProjectCost: totalMaterialCost + totalServiceCost,
            currency: "USD"
        };

        return NextResponse.json(consolidated);

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
