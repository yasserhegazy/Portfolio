import { Resend } from 'resend';
import { createContactEmailHtml } from './email-template';

export interface ContactEmailData {
  name: string;
  email: string;
  message: string;
}

export interface EmailResult {
  success: boolean;
  error?: string;
}

// Abstraction for email sending - follows Dependency Inversion principle
// Easy to swap providers (Resend → SendGrid → etc.)
export interface EmailService {
  sendContactEmail(data: ContactEmailData): Promise<EmailResult>;
}

export class ResendEmailService implements EmailService {
  private resend: Resend | null = null;

  private getClient(): Resend {
    if (!this.resend) {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        throw new Error('RESEND_API_KEY environment variable is not set');
      }
      this.resend = new Resend(apiKey);
    }
    return this.resend;
  }

  async sendContactEmail(data: ContactEmailData): Promise<EmailResult> {
    try {
      const timestamp = new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
      });

      const html = createContactEmailHtml(
        data.name,
        data.email,
        data.message,
        timestamp
      );

      const client = this.getClient();
      const { error } = await client.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'yasseranahegazy@gmail.com',
        replyTo: data.email,
        subject: `New Contact Message from ${data.name}`,
        html,
      });

      if (error) {
        console.error('Resend error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      console.error('Email send error:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }
}
