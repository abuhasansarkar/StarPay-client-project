import {NextRequest, NextResponse} from "next/server";
import nodemailer from "nodemailer";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (basic international format)
const phoneRegex = /^[\d\s+()-]+$/;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const {
            device,
            firstName,
            email,
            phone,
            lastName,
            businessName,
            companyNo,
            message,
            paymentMethods,
            type,
        } = body;

        // Validation
        if (!device || !firstName || !email || !phone || !type) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing required fields",
                },
                {status: 400}
            );
        }

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid email format",
                },
                {status: 400}
            );
        }

        if (!phoneRegex.test(phone)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid phone number format",
                },
                {status: 400}
            );
        }

        // Format device name
        const deviceNames: Record<string, string> = {
            "t3-small-smart-pos": "T3 Smart Desktop POS",
            "t1plus-compact-pos": "T1Plus - Compact All-in-One POS",
            "t6-dual-pos": "T6 Dual - Large Dual Screen POS",
            "telpo-c9-dual-screen-cash-register":
                "Telpo C9 - Dual Screen Cash Register",
        };

        const deviceName = deviceNames[device] || device;
        const purchaseType = type === "buy" ? "Purchase" : "Lease";

        // Format payment methods
        const paymentMethodLabels: Record<string, string> = {
            cards: "Cards (Visa, Mastercard, etc) - 0.69%",
            dankort: "Dankort - 0.3%",
            vipps: "Vipps/MobilePay - 0.69%",
            crypto: "Crypto - 0% commission",
            alipay: "Alipay - 0.99%",
        };

        const selectedPaymentMethods = Array.isArray(paymentMethods)
            ? paymentMethods
                  .map((method) => paymentMethodLabels[method] || method)
                  .join(", ")
            : "None selected";

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Email HTML template
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #482fea 0%, #6b4bff 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #e0e0e0;
        }
        .section {
            margin-bottom: 20px;
        }
        .label {
            font-weight: bold;
            color: #482fea;
            margin-bottom: 5px;
        }
        .value {
            background: white;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #e0e0e0;
        }
        .type-badge {
            display: inline-block;
            background: #482fea;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
        }
        .footer {
            background: #333;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 10px 10px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 New Contact Request - StarPay</h1>
            <span class="type-badge">${purchaseType} Inquiry</span>
        </div>
        
        <div class="content">
            <div class="section">
                <div class="label">📱 Device Selected:</div>
                <div class="value">${deviceName}</div>
            </div>

            <div class="section">
                <div class="label">👤 Customer Information:</div>
                <div class="value">
                    <strong>Name:</strong> ${firstName} ${lastName || ""}<br>
                    <strong>Email:</strong> ${email}<br>
                    <strong>Phone:</strong> ${phone}
                </div>
            </div>

            ${
                businessName || companyNo
                    ? `
            <div class="section">
                <div class="label">🏢 Business Information:</div>
                <div class="value">
                    ${
                        businessName
                            ? `<strong>Business Name:</strong> ${businessName}<br>`
                            : ""
                    }
                    ${
                        companyNo
                            ? `<strong>Company No:</strong> ${companyNo}`
                            : ""
                    }
                </div>
            </div>
            `
                    : ""
            }

            ${
                message
                    ? `
            <div class="section">
                <div class="label">💬 Message:</div>
                <div class="value">${message}</div>
            </div>
            `
                    : ""
            }

            <div class="section">
                <div class="label">💳 Payment Methods Interested:</div>
                <div class="value">${selectedPaymentMethods}</div>
            </div>

            <div class="section">
                <div class="label">📅 Submitted:</div>
                <div class="value">${new Date().toLocaleString("en-US", {
                    dateStyle: "full",
                    timeStyle: "short",
                })}</div>
            </div>
        </div>

        <div class="footer">
            <p><strong>StarPay</strong> - Payment Solutions</p>
            <p>This is an automated message from your website contact form.</p>
        </div>
    </div>
</body>
</html>
        `;

        // Email to admin
        const mailOptions = {
            from: `"StarPay Contact Form" <${process.env.SMTP_FROM_EMAIL}>`,
            to: process.env.CONTACT_EMAIL,
            subject: `New ${purchaseType} Inquiry - ${deviceName} from ${firstName}`,
            html: emailHtml,
            replyTo: email,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Optional: Send confirmation email to customer
        if (process.env.SEND_CUSTOMER_CONFIRMATION === "true") {
            const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #482fea 0%, #6b4bff 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #e0e0e0;
        }
        .footer {
            background: #333;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 10px 10px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Thank You for Your Inquiry!</h1>
        </div>
        
        <div class="content">
            <p>Hi ${firstName},</p>
            
            <p>Thank you for your interest in <strong>${deviceName}</strong>!</p>
            
            <p>We've received your ${purchaseType.toLowerCase()} inquiry and our team will get back to you within 24 hours.</p>
            
            <p>In the meantime, if you have any urgent questions, feel free to reach out to us directly.</p>
            
            <p>Best regards,<br><strong>The StarPay Team</strong></p>
        </div>

        <div class="footer">
            <p><strong>StarPay</strong> - Payment Solutions</p>
            <p>📧 ${process.env.CONTACT_EMAIL} | 📱 +45 XXX XXX XX</p>
        </div>
    </div>
</body>
</html>
            `;

            await transporter.sendMail({
                from: `"StarPay" <${process.env.SMTP_FROM_EMAIL}>`,
                to: email,
                subject: `Thank you for your inquiry - StarPay`,
                html: customerEmailHtml,
            });
        }

        return NextResponse.json(
            {
                success: true,
                message: "Your inquiry has been submitted successfully!",
            },
            {status: 200}
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to send your inquiry. Please try again later.",
            },
            {status: 500}
        );
    }
}
