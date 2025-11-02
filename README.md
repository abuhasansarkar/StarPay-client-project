This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Email Configuration

The contact form uses email functionality to send inquiries. You need to configure SMTP settings to enable this feature.

### Setup Instructions

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure your SMTP settings in `.env.local`:**

   **For Gmail:**
   - Enable 2-Factor Authentication in your Google Account
   - Generate an App Password at https://myaccount.google.com/apppasswords
   - Use these settings:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-character-app-password
   SMTP_FROM_EMAIL=noreply@yourdomain.com
   CONTACT_EMAIL=admin@yourdomain.com
   SEND_CUSTOMER_CONFIRMATION=true
   ```

   **For SendGrid:**
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=apikey
   SMTP_PASSWORD=your-sendgrid-api-key
   ```

   **For Mailgun:**
   ```env
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-mailgun-username
   SMTP_PASSWORD=your-mailgun-password
   ```

3. **Environment Variables:**

   | Variable | Required | Description |
   |----------|----------|-------------|
   | `SMTP_HOST` | Yes | SMTP server hostname |
   | `SMTP_PORT` | Yes | SMTP server port (usually 587 or 465) |
   | `SMTP_SECURE` | Yes | Use TLS (true for port 465, false for 587) |
   | `SMTP_USER` | Yes | SMTP username/email |
   | `SMTP_PASSWORD` | Yes | SMTP password or API key |
   | `SMTP_FROM_EMAIL` | Yes | Sender email address |
   | `CONTACT_EMAIL` | Yes | Email address to receive contact form submissions |
   | `SEND_CUSTOMER_CONFIRMATION` | No | Send confirmation email to customer (default: false) |

4. **Restart your development server** after updating environment variables.

### Testing Email Functionality

1. Fill out the contact form at `/buy` or `/lease` pages
2. Check the server console for any error messages
3. Verify emails are received at the configured `CONTACT_EMAIL`
4. If customer confirmation is enabled, verify the customer receives a confirmation email

### Production Deployment

For production (Vercel, etc.), add environment variables in your hosting platform's dashboard:
- Navigate to your project settings
- Add all required environment variables
- Redeploy your application

**Security Note:** Never commit `.env.local` or any file containing real credentials to version control.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

