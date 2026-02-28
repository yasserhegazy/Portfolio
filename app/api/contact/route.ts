import { NextRequest, NextResponse } from 'next/server';
import { ResendEmailService } from '@/lib/email-service';

const emailService = new ResendEmailService();

// Rate limiting: in-memory store
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateBody(body: unknown): { valid: true; data: { name: string; email: string; message: string } } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body.' };
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    return { valid: false, error: 'Name must be between 2 and 100 characters.' };
  }
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 5000) {
    return { valid: false, error: 'Message must be between 10 and 5000 characters.' };
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    },
  };
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429, headers: corsHeaders }
      );
    }

    const body = await request.json().catch(() => null);
    const validation = validateBody(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400, headers: corsHeaders }
      );
    }

    const result = await emailService.sendContactEmail(validation.data);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to send email. Please try again.' },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email. Please try again.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
