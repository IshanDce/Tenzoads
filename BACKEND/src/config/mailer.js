import nodemailer from 'nodemailer';

let transporter = null;

export const getMailer = () => {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  } else {
    // Development / mock fallback transporter
    transporter = {
      sendMail: async (options) => {
        console.log('\n[Mailer Dev Log] =====================================');
        console.log(`To: ${options.to}`);
        console.log(`From: ${options.from || 'hello@yourdomain.com'}`);
        console.log(`Subject: ${options.subject}`);
        console.log('Text content:\n', options.text);
        console.log('=====================================================\n');
        return { messageId: `dev-mock-${Date.now()}` };
      },
    };
  }

  return transporter;
};

export const sendContactNotifications = async (contact) => {
  const mailer = getMailer();
  const adminEmail = process.env.ADMIN_EMAIL || 'hello@yourdomain.com';

  // 1. Admin notification
  const adminMail = {
    from: `"TenzoAds Inquiry" <${adminEmail}>`,
    to: adminEmail,
    subject: `New Project Quote Request: ${contact.name} (${contact.service})`,
    text: `
You have received a new project quote request on TenzoAds:

Name: ${contact.name}
Email: ${contact.email}
Phone: ${contact.phone || 'Not provided'}
Service Needed: ${contact.service}
Budget: ${contact.budget}
Preferred Discussion Time: ${contact.preferredDateTime || 'Not specified'}

Project Details:
${contact.message}

Received at: ${new Date().toISOString()}
    `,
  };

  // 2. User auto-reply
  const userMail = {
    from: `"TenzoAds Team" <${adminEmail}>`,
    to: contact.email,
    subject: `Thanks for reaching out to TenzoAds, ${contact.name}!`,
    text: `
Hi ${contact.name},

Thank you for contacting TenzoAds. We have received your project inquiry for "${contact.service}".

Our technical team reviews every project request carefully. One of our solution architects will reach out to you within 24 hours with initial thoughts and next steps.

Summary of your submission:
- Service: ${contact.service}
- Budget Range: ${contact.budget}
- Preferred Time: ${contact.preferredDateTime || 'Flexible'}

If you have any urgent attachments or requirements, reply directly to this email.

Best regards,
The TenzoAds Team
hello@yourdomain.com
https://tenzoads.com
    `,
  };

  try {
    await mailer.sendMail(adminMail);
    await mailer.sendMail(userMail);
  } catch (error) {
    console.error('[Mailer] Error sending emails:', error.message);
    // Don't crash request if mail fails
  }
};

