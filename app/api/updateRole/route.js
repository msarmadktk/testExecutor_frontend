import { clerkClient } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { userId, role } = await req.json();

    // Update user's metadata with their role
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: role
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
} 