import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const { scopeOfSupply } = await request.json();

        // Read product data
        const productsPath = path.join(process.cwd(), 'src', 'data', 'products.json');
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

        const matches = scopeOfSupply.map(reqItem => {
            // Simple keyword matching logic
            const candidates = products.filter(p => {
                const itemKeywords = reqItem.item.toLowerCase().split(' ');
                const productWords = p.name.toLowerCase().split(' ');
                // Check if basic category keywords match
                return itemKeywords.some(k => productWords.includes(k)) ||
                    (reqItem.item.toLowerCase().includes("pump") && p.category === "Pumps") ||
                    (reqItem.item.toLowerCase().includes("valve") && p.category === "Valves");
            });

            // Calculate score based on spec match (Mock logic)
            const scannedCandidates = candidates.map(c => {
                let matchCount = 0;
                let totalSpecs = 0; // In reality, parse 'reqItem.spec'
                let score = 0;

                // Very basic heuristic for demo
                if (reqItem.spec.includes("Pressure > 140 bar") && c.specs.maxPressure) {
                    const pVal = parseInt(c.specs.maxPressure);
                    if (pVal >= 140) matchCount++;
                }
                if (reqItem.spec.includes("Flow > 450 L/min") && c.specs.flowRate) {
                    const fVal = parseInt(c.specs.flowRate);
                    if (fVal >= 450) matchCount++;
                }

                if (reqItem.spec.includes("DN50") && c.specs.size === "DN50") matchCount++;
                if (reqItem.spec.includes("Pneumatic") && c.specs.actuatorType === "Pneumatic") matchCount++;

                // Assign mock scores if specific logic is too complex for string parsing
                if (c.id === "SKU-1001" && reqItem.item.includes("Pump")) score = 95;
                if (c.id === "SKU-1002" && reqItem.item.includes("Pump")) score = 100; // Better match
                if (c.id === "SKU-2001" && reqItem.item.includes("Valve")) score = 90;
                if (c.id === "SKU-2002" && reqItem.item.includes("Valve")) score = 60; // Wrong actuator

                return {
                    sku: c.id,
                    name: c.name,
                    score: score,
                    reason: `Matched based on keywords and specs in ${reqItem.spec}`
                };
            });

            // Sort by score
            scannedCandidates.sort((a, b) => b.score - a.score);

            return {
                reqItem: reqItem.item,
                qty: reqItem.qty,
                selected: scannedCandidates[0] || null, // Pick top 1
                alternatives: scannedCandidates.slice(1, 3)
            };
        });

        return NextResponse.json({ matches });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
