import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface SendConfirmationParams {
  to: string;
  name: string;
  ticketNumber: string;
  qrToken: string;
  eventName: string;
  eventDate: string;
  venue: string;
}

export async function sendRegistrationConfirmation(params: SendConfirmationParams) {
  if (!resend) {
    console.log("Resend not configured. Skipping email.");
    return { success: false, reason: "Email not configured" };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const ticketUrl = `${appUrl}/ticket/${params.qrToken}`;

  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME || "Event Team"} <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
      to: params.to,
      subject: `Registration Confirmed – ${params.eventName}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h1 style="color: #0ea5e9; margin-bottom: 8px;">You're registered!</h1>
          <p style="font-size: 16px; color: #334155;">Hi ${params.name},</p>
          <p style="font-size: 16px; color: #334155;">
            Thank you for registering for <strong>${params.eventName}</strong>.
          </p>
          
          <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 8px; color: #64748b; font-size: 14px;">Ticket Number</p>
            <p style="margin: 0; font-size: 20px; font-weight: 700; color: #0f172a;">${params.ticketNumber}</p>
          </div>

          <p style="font-size: 15px; color: #334155;">
            <strong>Date:</strong> ${params.eventDate}<br/>
            <strong>Venue:</strong> ${params.venue}
          </p>

          <p style="margin: 28px 0;">
            <a href="${ticketUrl}" 
               style="background: #0ea5e9; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              View Your Ticket & QR Code
            </a>
          </p>

          <p style="font-size: 13px; color: #94a3b8; margin-top: 32px;">
            Please keep this email safe. Show the QR code at the entrance for check-in.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, reason: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("Email send failed:", err);
    return { success: false, reason: "Failed to send email" };
  }
}
