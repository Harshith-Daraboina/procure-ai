import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const { email, password, role } = await request.json();

        if (!email || !password || !role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        // In a real app, HASH THE PASSWORD!
        // For this demo/hackathon context, we are storing plain text or mock
        const user = await prisma.user.create({
            data: {
                email,
                role,
                // We aren't storing password in the schema currently as per the prompt's schema
                // But for a real auth flow with credentials, we'd need it.
                // I will assume for now we just create the user record so they can "login"
                // In the login route, we mocked the password check.
            },
        });

        return NextResponse.json({ success: true, user });

    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
