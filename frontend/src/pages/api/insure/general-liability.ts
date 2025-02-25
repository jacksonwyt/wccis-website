import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Create Nodemailer transporter - with fallback for local development
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'test@example.com',
        pass: process.env.SMTP_PASS || 'password',
      },
    });

    // Format the email content based on simple form structure
    const emailContent = `
      New General Liability Quote Request

      Company Name: ${data.companyName}
      Contact Name: ${data.contactName}
      Email: ${data.email}
      Phone: ${data.phone}
      Additional Information: ${data.message || 'None provided'}
    `;

    // For development, log the email content instead of sending if SMTP isn't configured
    if (process.env.NODE_ENV !== 'production' || !process.env.SMTP_HOST) {
      console.log('Email would be sent with the following content:');
      console.log(emailContent);
      return res.status(200).json({ message: 'Quote request submitted successfully (development mode)' });
    }

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@example.com',
      to: process.env.QUOTE_REQUEST_EMAIL || 'quotes@example.com',
      subject: `New General Liability Quote Request - ${data.companyName}`,
      text: emailContent,
    });

    res.status(200).json({ message: 'Quote request submitted successfully' });
  } catch (error) {
    console.error('Error processing quote request:', error);
    res.status(500).json({ message: 'Failed to process quote request' });
  }
}
