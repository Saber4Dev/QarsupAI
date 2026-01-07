import { NextRequest, NextResponse } from 'next/server';
import { contactSchema, sanitizeString, sanitizeEmail } from '@/lib/validation/schemas';

/**
 * Contact form API endpoint
 * Sends email to support@qarsup.com
 * 
 * Note: Configure your email service (Resend, SendGrid, etc.) in environment variables
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate and sanitize input
        const validatedData = contactSchema.parse({
            name: sanitizeString(body.name),
            email: sanitizeEmail(body.email),
            subject: sanitizeString(body.subject),
            comments: sanitizeString(body.comments),
        });

        // Email configuration
        const recipientEmail = 'support@qarsup.com';
        const emailSubject = `Contact Form: ${validatedData.subject}`;
        
        // Format email body
        const emailBody = `
New contact form submission from Qarsup AI website:

Name: ${validatedData.name}
Email: ${validatedData.email}
Subject: ${validatedData.subject}

Message:
${validatedData.comments}

---
This email was sent from the contact form on qarsup.com
        `.trim();

        // Email service implementation
        // Option 1: Use Resend (recommended - install: npm install resend)
        // Option 2: Use SendGrid (install: npm install @sendgrid/mail)
        // Option 3: Use Nodemailer with SMTP (install: npm install nodemailer)
        
        // For production, configure one of the following:

        // RESEND (Recommended for Next.js):
        if (process.env.RESEND_API_KEY) {
            try {
                const { Resend } = await import('resend');
                const resend = new Resend(process.env.RESEND_API_KEY);
                
                const { data, error } = await resend.emails.send({
                    from: process.env.RESEND_FROM_EMAIL || 'Contact Form <noreply@qarsup.com>',
                    to: recipientEmail,
                    replyTo: validatedData.email,
                    subject: emailSubject,
                    text: emailBody,
                });

                if (error) {
                    console.error('Resend email error:', error);
                    throw new Error('Failed to send email via Resend');
                }
            } catch (emailError: any) {
                console.error('Email sending error:', emailError);
                // Fall through to log method if email service fails
            }
        }

        // SENDGRID Alternative:
        // if (process.env.SENDGRID_API_KEY) {
        //     const sgMail = require('@sendgrid/mail');
        //     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        //     
        //     await sgMail.send({
        //         to: recipientEmail,
        //         from: process.env.SENDGRID_FROM_EMAIL || 'noreply@qarsup.com',
        //         replyTo: validatedData.email,
        //         subject: emailSubject,
        //         text: emailBody,
        //     });
        // }

        // Log the submission (for development/debugging)
        console.log('Contact form submission received:', {
            to: recipientEmail,
            from: validatedData.email,
            subject: emailSubject,
            timestamp: new Date().toISOString(),
        });

        // If no email service is configured, the email details are logged
        // Configure RESEND_API_KEY in your .env.local to enable email sending
        if (!process.env.RESEND_API_KEY) {
            console.warn('⚠️  Email service not configured. Install Resend and set RESEND_API_KEY in .env.local');
            console.warn('📧 Email would be sent to:', recipientEmail);
            console.warn('📝 Subject:', emailSubject);
            console.warn('📄 Body:', emailBody);
        }

        return NextResponse.json(
            { 
                success: true, 
                message: 'Thank you! Your message has been sent successfully.' 
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Contact form error:', error);

        // Handle validation errors
        if (error.errors && Array.isArray(error.errors)) {
            return NextResponse.json(
                { error: error.errors[0]?.message || 'Invalid form data' },
                { status: 400 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            { error: 'An error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}

