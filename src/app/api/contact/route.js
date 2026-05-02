import { NextResponse } from 'next/server';
import { submitContactForm } from '@/lib/firestore';

export async function POST(req) {
  try {
    const data = await req.json();
    await submitContactForm(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
